@AGENTS.md

## graphify

This repo has a knowledge graph in `graphify-out/` (code structure plus the docs). Use it to save tokens.

- Before reading or grepping source files for a question about the code, run
  `graphify query "<question>"` (or `graphify path "<A>" "<B>"`, `graphify explain "<concept>"`).
  Open only the files the answer points to.
- Read `graphify-out/GRAPH_REPORT.md` only for a broad architecture review.
- After changing code, run `graphify update .` (AST only, no LLM cost) and commit the updated graph
  with the change.
