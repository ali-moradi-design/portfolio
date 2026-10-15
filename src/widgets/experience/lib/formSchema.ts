import { z } from "zod";

export type FieldType = "text" | "email" | "number" | "select" | "file";

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: readonly string[];
};

const MAX_FILE_BYTES = 2 * 1024 * 1024;

function fieldSchema(f: FieldConfig) {
  switch (f.type) {
    case "email":
      return z.email("Enter a valid email address.");
    case "number":
      return z.coerce.number("Enter a number.").min(0, "Must be 0 or more.");
    case "select":
      return z.enum(f.options ?? [], "Pick one option.");
    case "file":
      return z
        .instanceof(File, { message: "Attach a file." })
        .refine((file) => file.size > 0, "Attach a file.")
        .refine((file) => file.size <= MAX_FILE_BYTES, "Files up to 2 MB.");
    default:
      return z.string().trim().min(1, "This field is required.");
  }
}

/** Builds the validation schema from the form configuration. */
export function buildSchema(fields: readonly FieldConfig[]) {
  return z.object(
    Object.fromEntries(
      fields.map((f) => {
        const schema = fieldSchema(f);
        return [f.name, f.required ? schema : schema.optional()];
      }),
    ),
  );
}

/**
 * Reads FormData into plain values: empty strings and empty files count as
 * "not filled", so optional fields may stay empty.
 */
export function readForm(fields: readonly FieldConfig[], data: FormData) {
  const values: Record<string, unknown> = {};
  for (const f of fields) {
    const value = data.get(f.name);
    const empty =
      value === null ||
      (typeof value === "string" && value.trim() === "") ||
      (value instanceof File && value.size === 0);
    if (!empty) values[f.name] = value;
  }
  return values;
}

const MISSING: Record<FieldType, string> = {
  text: "This field is required.",
  email: "This field is required.",
  number: "This field is required.",
  select: "Pick one option.",
  file: "Attach a file.",
};

/** First error message per field. */
export function validate(fields: readonly FieldConfig[], data: FormData) {
  const values = readForm(fields, data);
  const result = buildSchema(fields).safeParse(values);
  if (result.success) return {};
  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0]);
    const field = fields.find((f) => f.name === key);
    errors[key] ??=
      field && !(key in values) ? MISSING[field.type] : issue.message;
  }
  return errors;
}
