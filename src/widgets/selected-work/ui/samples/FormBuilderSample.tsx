"use client";

import { useId, useState, type FormEvent } from "react";
import { cn } from "@/shared/lib/cn";
import {
  validate,
  type FieldConfig,
  type FieldType,
} from "../../lib/formSchema";

const STARTER: FieldConfig[] = [
  { name: "company", label: "Company", type: "text", required: true },
  { name: "email", label: "Work email", type: "email", required: true },
  {
    name: "plan",
    label: "Plan",
    type: "select",
    required: true,
    options: ["Starter", "Team", "Enterprise"],
  },
  { name: "contract", label: "Contract (PDF)", type: "file", required: false },
];

const NEW_FIELD: Record<FieldType, Omit<FieldConfig, "name">> = {
  text: { label: "Notes", type: "text", required: false },
  email: { label: "Billing email", type: "email", required: false },
  number: { label: "Seats", type: "number", required: false },
  select: {
    label: "Region",
    type: "select",
    required: false,
    options: ["EU", "US", "Asia"],
  },
  file: { label: "Logo", type: "file", required: false },
};

const input =
  "w-full min-w-0 rounded-md border border-border-strong bg-surface px-2.5 py-1.5 text-body-sm text-text aria-invalid:border-bad";

/** Sample of a form builder: edit the configuration, the form follows it. */
export function FormBuilderSample() {
  const [fields, setFields] = useState(STARTER);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const formId = useId();

  const update = (next: FieldConfig[]) => {
    setFields(next);
    setErrors({});
    setSent(false);
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(fields, new FormData(e.currentTarget));
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  };

  return (
    <div className="grid gap-4 @lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <section
        aria-label="Form configuration"
        className="grid content-start gap-2"
      >
        <p className="text-xs tracking-[0.06em] text-muted uppercase">Config</p>
        <ul className="grid gap-1.5">
          {fields.map((f, i) => (
            <li
              key={f.name}
              className="flex items-center gap-2 rounded-md border border-border bg-surface px-2 py-1.5 text-xs"
            >
              <code className="w-12 shrink-0 text-muted">{f.type}</code>
              <span className="min-w-0 flex-1 truncate">{f.label}</span>
              <label className="flex cursor-pointer items-center gap-1 text-muted">
                <input
                  type="checkbox"
                  className="accent-(--accent)"
                  checked={f.required}
                  onChange={(e) =>
                    update(
                      fields.map((x, j) =>
                        j === i ? { ...x, required: e.target.checked } : x,
                      ),
                    )
                  }
                />
                required
              </label>
              <button
                type="button"
                aria-label={`Remove ${f.label}`}
                className="grid size-5 cursor-pointer place-items-center rounded-sm text-muted hover:bg-raised hover:text-text"
                onClick={() => update(fields.filter((_, j) => j !== i))}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
        <div
          className="flex flex-wrap gap-1.5"
          role="group"
          aria-label="Add a field"
        >
          {(Object.keys(NEW_FIELD) as FieldType[]).map((type) => (
            <button
              key={type}
              type="button"
              disabled={fields.some((f) => f.name === `extra-${type}`)}
              onClick={() =>
                update([
                  ...fields,
                  { ...NEW_FIELD[type], name: `extra-${type}` },
                ])
              }
              className="cursor-pointer rounded-md border border-dashed border-border-strong px-2 py-1 text-xs disabled:cursor-default disabled:opacity-40"
            >
              + {type}
            </button>
          ))}
        </div>
      </section>

      <form
        id={formId}
        noValidate
        onSubmit={submit}
        aria-label="Generated form"
        className="grid content-start gap-3 rounded-md border border-border bg-surface p-3"
      >
        {fields.map((f) => (
          <Field key={f.name} field={f} error={errors[f.name]} />
        ))}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="cursor-pointer rounded-md bg-accent px-3 py-1.5 text-body-sm text-on-accent"
          >
            Submit
          </button>
          <p
            role="status"
            className={cn("text-xs", sent ? "text-good" : "text-muted")}
          >
            {sent
              ? "Valid. This is a sample, so nothing is sent."
              : "Validated with a Zod schema built from the config."}
          </p>
        </div>
      </form>
    </div>
  );
}

function Field({ field: f, error }: { field: FieldConfig; error?: string }) {
  const id = useId();
  const errorId = `${id}-error`;
  const common = {
    id,
    name: f.name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  };
  return (
    <div className="grid gap-1">
      <label htmlFor={id} className="text-xs text-muted">
        {f.label}
        {f.required && <span aria-hidden="true"> *</span>}
      </label>
      {f.type === "select" ? (
        <select {...common} className={input} defaultValue="">
          <option value="" disabled>
            Choose…
          </option>
          {f.options?.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : f.type === "file" ? (
        <input
          {...common}
          type="file"
          accept="application/pdf"
          className={cn(
            input,
            "file:mr-2 file:rounded-sm file:border-0 file:bg-raised file:px-2 file:py-0.5 file:text-xs file:text-text",
          )}
        />
      ) : (
        <input {...common} type={f.type} className={input} />
      )}
      {error && (
        <p id={errorId} className="text-xs text-bad">
          {error}
        </p>
      )}
    </div>
  );
}
