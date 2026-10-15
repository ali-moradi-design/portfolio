"use client";

import { createContext, useContext } from "react";
import { TOKENS, type Mode, type Tokens } from "./tokens";

// Libraries that draw their own SVG (Highcharts) need real color values, not CSS variables.
export const TokensContext = createContext<{ tokens: Tokens; mode: Mode }>({ tokens: TOKENS.sage.light, mode: "light" });
export const useTokens = () => useContext(TokensContext);
