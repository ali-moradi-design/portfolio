import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import boundaries from "eslint-plugin-boundaries";

// Feature-Sliced Design layers, top to bottom. Next.js owns src/app (routes and
// the app layer), so the pages layer is called "views": a src/pages folder
// would be read as the Pages Router. Steiger checks the slices and their public
// APIs but does not know "views", so the import direction is checked here.
const layers = ["app", "views", "widgets", "features", "entities", "shared"];
const sliced = ["views", "widgets", "features", "entities"];

const fsd = {
  files: ["src/**/*.{ts,tsx}"],
  plugins: { boundaries },
  settings: {
    "import/resolver": { typescript: { alwaysTryTypes: true } },
    "boundaries/elements": [
      { type: "app", pattern: "src/app" },
      ...sliced.map((type) => ({
        type,
        pattern: `src/${type}/*`,
        capture: ["slice"],
      })),
      { type: "shared", pattern: "src/shared" },
    ],
  },
  rules: {
    "boundaries/dependencies": [
      2,
      {
        default: "disallow",
        policies: layers.map((layer, i) => ({
          from: { element: { type: layer } },
          allow: {
            to: {
              element: [
                // Any lower layer.
                { types: { anyOf: layers.slice(i + 1) } },
                // Inside the same slice (or the same unsliced layer).
                sliced.includes(layer)
                  ? {
                      type: layer,
                      captured: { slice: "{{ from.element.captured.slice }}" },
                    }
                  : { type: layer },
              ],
            },
          },
        })),
      },
    ],
  },
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  fsd,
  // Prettier owns formatting; turn off the ESLint rules that would fight it.
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "graphify-out/**",
  ]),
]);

export default eslintConfig;
