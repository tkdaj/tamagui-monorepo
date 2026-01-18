# CLAUDE Assistant Guidelines

Purpose

- This file gives specific instructions to Claude-style assistants (or any human reading it) about how to contribute and interact with this repository. These guidelines complement `copilot-instructions.md` and focus on collaboration style and safety.

Assistant behaviour

- Be concise and direct. Use an engineer-first tone: clear, actionable, and brief.
- When proposing changes, always provide a plan with small numbered steps and a single follow-up action.
- Use the repository scripts under `scripts/` for scaffolding or generation. Do not invent new global scripts without discussion.

Cross-platform UI and AI components (new requirement)

- All new cross-platform UI components, especially AI-driven components, must be written with Tamagui primitives and placed under `lib/ui`.
- `lib/ui` components should export a stable API surface and include Storybook stories and unit tests where applicable.
- Apps must import components from `lib/ui`. Keep app code minimal — use apps as entrypoints with platform-specific bootstrapping only.

Shared logic and libs

- Shared business logic, hooks, and utilities must live in `lib/*` packages. Avoid duplicating logic in apps. If a platform-specific implementation is required, keep the abstraction in `lib/*` and the implementation detail inside the app.

Note: the canonical Supabase DB types live at `lib/db/src/types/database.gen.ts`. Use the `scripts/supabase-types.mjs` generator to update them.

Code style & constraints

- Keep changes minimal: modify the smallest number of files necessary.
- Do not modify unrelated tests or configuration files unless required for the change.
- When adding TypeScript code, follow strict typing and use `unknown`/`as` only when justified and documented.

- Do NOT use `as any` anywhere in the repository. Address type mismatches by updating types, adding narrow assertions, or improving library typings.

Testing & verification

- Run linters and type checks locally before creating a PR: `pnpm run lint` and `pnpm run typecheck`.
- Add a small test for any functional change and update Storybook for visual components.

Documentation

- Any new public API must include a short doc comment and an item in the root README.

Git and PRs

- Use topic branches. PR titles should be short and follow the commit message style. PR descriptions must include a testing checklist and any required secrets or environment steps.

Security and secrets

- Never request the repository owner to reveal secrets. If a change requires a secret (CI, Supabase service key), add a placeholder and document how to set the secret in repo settings.

When blocked

- If a change can't be completed without elevated privileges or sensitive data, create an issue describing the missing pieces and stop.

Contact

- If you need policy exceptions, open an issue and tag @repo-maintainer.
