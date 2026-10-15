# Code style

## Formatting: Prettier

- The project uses Prettier (`.prettierrc.json`) with
  `prettier-plugin-tailwindcss`, which sorts Tailwind classes.
- The user formats on save in VS Code. Write code that Prettier would leave
  unchanged: double quotes, semicolons, trailing commas, 80-column lines,
  Tailwind classes in the plugin's order.
- After writing or editing files, always run `pnpm format` (or
  `pnpm prettier --write <files>`) and then `pnpm format:check` before
  committing.
