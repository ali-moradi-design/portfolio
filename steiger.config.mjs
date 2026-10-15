import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

export default defineConfig([
  ...fsd.configs.recommended,
  {
    rules: {
      // A one-page site: most widgets and features are used once, and that is fine. They are slices
      // because each is a self-contained block, not because they are shared.
      "fsd/insignificant-slice": "off",
    },
  },
]);
