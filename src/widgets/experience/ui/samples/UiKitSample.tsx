"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button";

type Tone = "neutral" | "good" | "warn" | "bad";
type Props = {
  variant: "primary" | "secondary";
  size: "default" | "small";
  tone: Tone;
  disabled: boolean;
  checked: boolean;
  invalid: boolean;
};

const STORIES = ["Button", "Badge", "Switch", "Input"] as const;
type Story = (typeof STORIES)[number];

/** Which controls each story shows. */
const CONTROLS: Record<Story, (keyof Props)[]> = {
  Button: ["variant", "size", "disabled"],
  Badge: ["tone"],
  Switch: ["checked", "disabled"],
  Input: ["invalid", "disabled"],
};

const OPTIONS = {
  variant: ["primary", "secondary"],
  size: ["default", "small"],
  tone: ["neutral", "good", "warn", "bad"],
} as const;

const TONE: Record<Tone, string> = {
  neutral: "bg-raised text-text",
  good: "bg-good/15 text-good",
  warn: "bg-warn/15 text-warn",
  bad: "bg-bad/15 text-bad",
};

const TONE_LABEL: Record<Tone, string> = {
  neutral: "Draft",
  good: "Healthy",
  warn: "Degraded",
  bad: "Down",
};

/**
 * Sample of a documented UI kit, Storybook style. The Button story renders the
 * button this site uses; every story follows the palette picked in the menu.
 */
export function UiKitSample() {
  const [story, setStory] = useState<Story>("Button");
  const [props, setProps] = useState<Props>({
    variant: "primary",
    size: "default",
    tone: "good",
    disabled: false,
    checked: true,
    invalid: false,
  });
  const set = <K extends keyof Props>(key: K, value: Props[K]) =>
    setProps((p) => ({ ...p, [key]: value }));

  return (
    <div className="grid overflow-hidden rounded-md border border-border bg-surface @md:grid-cols-[120px_minmax(0,1fr)]">
      <nav
        aria-label="Stories"
        className="flex gap-1 overflow-x-auto border-b border-border p-2 @md:flex-col @md:border-r @md:border-b-0"
      >
        <p className="hidden px-2 pb-1 text-xs tracking-[0.06em] text-muted uppercase @md:block">
          Components
        </p>
        {STORIES.map((s) => (
          <button
            key={s}
            type="button"
            aria-current={story === s ? "page" : undefined}
            onClick={() => setStory(s)}
            className="cursor-pointer rounded-sm px-2 py-1 text-left text-body-sm text-muted hover:text-text aria-[current=page]:bg-raised aria-[current=page]:text-text"
          >
            {s}
          </button>
        ))}
      </nav>
      <div className="grid min-w-0">
        <div className="grid min-h-40 place-items-center bg-bg bg-[radial-gradient(circle,color-mix(in_srgb,var(--muted)_25%,transparent)_1px,transparent_1.2px)] bg-size-[14px_14px] p-6">
          <Preview
            story={story}
            props={props}
            onToggle={(v) => set("checked", v)}
          />
        </div>
        <table className="w-full border-t border-border text-xs">
          <caption className="sr-only">Controls for {story}</caption>
          <tbody>
            {CONTROLS[story].map((key) => (
              <tr key={key} className="border-b border-border last:border-b-0">
                <th
                  scope="row"
                  className="w-24 px-3 py-2 text-left font-normal text-muted"
                >
                  {key}
                </th>
                <td className="px-3 py-1.5">
                  {key in OPTIONS ? (
                    <Segmented
                      label={key}
                      options={OPTIONS[key as keyof typeof OPTIONS]}
                      value={String(props[key])}
                      onChange={(v) => set(key, v as never)}
                    />
                  ) : (
                    <input
                      type="checkbox"
                      aria-label={key}
                      className="accent-(--accent)"
                      checked={Boolean(props[key])}
                      onChange={(e) => set(key, e.target.checked as never)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Preview({
  story,
  props,
  onToggle,
}: {
  story: Story;
  props: Props;
  onToggle: (value: boolean) => void;
}) {
  const id = useId();
  switch (story) {
    case "Button":
      return (
        <Button
          variant={props.variant}
          size={props.size}
          disabled={props.disabled}
        >
          Save changes
        </Button>
      );
    case "Badge":
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs",
            TONE[props.tone],
          )}
        >
          <span
            className="size-1.5 rounded-full bg-current"
            aria-hidden="true"
          />
          {TONE_LABEL[props.tone]}
        </span>
      );
    case "Switch":
      return (
        <label className="flex items-center gap-2.5 text-body-sm">
          <button
            type="button"
            role="switch"
            aria-checked={props.checked}
            disabled={props.disabled}
            onClick={() => onToggle(!props.checked)}
            className="relative h-5.5 w-9.5 cursor-pointer rounded-full bg-border-strong transition-colors disabled:cursor-not-allowed disabled:opacity-50 aria-checked:bg-accent"
          >
            <span
              className={cn(
                "absolute top-0.75 left-0.75 size-4 rounded-full bg-surface transition-transform",
                props.checked && "translate-x-4",
              )}
            />
          </button>
          Email alerts
        </label>
      );
    case "Input":
      return (
        <Wrap>
          <label htmlFor={id} className="text-xs text-muted">
            Dashboard name
          </label>
          <input
            id={id}
            defaultValue={props.invalid ? "" : "Sales overview"}
            disabled={props.disabled}
            aria-invalid={props.invalid || undefined}
            aria-describedby={props.invalid ? `${id}-error` : undefined}
            className="w-56 rounded-md border border-border-strong bg-surface px-2.5 py-1.5 text-body-sm disabled:opacity-50 aria-invalid:border-bad"
          />
          {props.invalid && (
            <p id={`${id}-error`} className="text-xs text-bad">
              Give the dashboard a name.
            </p>
          )}
        </Wrap>
      );
  }
}

function Wrap({ children }: { children: ReactNode }) {
  return <div className="grid gap-1">{children}</div>;
}

function Segmented({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex overflow-hidden rounded-sm border border-border-strong"
    >
      {options.map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={value === o}
          onClick={() => onChange(o)}
          className="cursor-pointer px-2 py-1 not-first:border-l not-first:border-border aria-pressed:bg-accent aria-pressed:text-on-accent"
        >
          {o}
        </button>
      ))}
    </div>
  );
}
