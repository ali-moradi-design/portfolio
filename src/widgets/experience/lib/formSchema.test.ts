import { describe, expect, it } from "vitest";
import { validate, type FieldConfig } from "./formSchema";

const fields: FieldConfig[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "seats", label: "Seats", type: "number", required: false },
  {
    name: "plan",
    label: "Plan",
    type: "select",
    required: true,
    options: ["Basic", "Pro"],
  },
];

const form = (entries: Record<string, string>) => {
  const data = new FormData();
  for (const [k, v] of Object.entries(entries)) data.set(k, v);
  return data;
};

describe("validate", () => {
  it("reports missing required fields and bad values", () => {
    const errors = validate(fields, form({ email: "nope", seats: "-1" }));
    expect(errors).toEqual({
      name: "This field is required.",
      email: "Enter a valid email address.",
      seats: "Must be 0 or more.",
      plan: "Pick one option.",
    });
  });

  it("accepts a complete form and empty optional fields", () => {
    const data = form({ name: "Ada", email: "ada@example.com", plan: "Pro" });
    expect(validate(fields, data)).toEqual({});
  });
});
