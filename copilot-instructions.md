# Copilot / AI Assistant Instructions

Purpose

- These instructions tell AI assistants (Copilot-style, code-generation agents, or contributors using AI) how to operate in this repository. Follow them strictly to keep the codebase consistent and safe.

High-level rules

- Do not change generated files (files under `lib/**/generated`, `*.gen.ts`, or the Supabase generated types at `lib/db/src/types/database.gen.ts`) unless the change is part of a documented regeneration flow.
- Preserve repository boundaries: apps may NOT import other apps. Apps import only from `lib/*` packages. Libraries may import other libraries but not apps.
- Keep changes minimal and focused: prefer small, local edits over wide-ranging refactors.

TypeScript / ESM

- Follow the repo `tsconfig.base.json` settings. Keep `strict` rules and do not relax them globally.
- Use `type` imports when possible: `import type { X } from '...'`.
- Prefer `ESNext`/ESM module syntax. Avoid adding CommonJS modules unless platform requires it.

Supabase types

- `lib/db/src/types/database.gen.ts` is the canonical DB type. If you need DB types, import `Database` from `@my/lib-db`.
- To regenerate types, run `pnpm run scripts:supabase-types` locally with valid Supabase credentials. Do not attempt to infer or hand-edit the generated file.

Env & Config

- Use `lib/config` Zod schemas for environment parsing. Do not read `process.env` directly in shared code; use the `env` abstractions per app.

UI and Tamagui

- Shared UI primitives live in `lib/ui`. For cross-platform components use Tamagui primitives and keep platform-specific divergence inside the app.

Cross-platform AI components and placement

- Any new AI-driven UI components or cross-platform UI controls must be authored as Tamagui components and placed under `lib/ui`.
- `lib/ui` must expose stable, well-typed component APIs and include Storybook stories and unit tests when relevant.
- Apps should import from `lib/ui`. Keep app folders minimal — only platform-specific adapters, navigation wiring, or native module shims should live in `apps/*`.

Shared logic and libraries

- Place shared hooks, utilities, business logic, and types inside `lib/*` packages and export them for reuse across apps.
- If a platform-specific implementation is needed, provide a small cross-platform abstraction in `lib/*` and implement the platform-specific module inside the app that imports the abstraction.

Linting, tests, CI

- Respect lint rules. If you change `eslint.config.ts`, update `tsconfig.json` includes if ESLint parses TypeScript config files.
- Add small unit tests for any behavioral change (Vitest preferred). If adding UI, add a Storybook story for the new component.

Type safety policy

- Never use `as any` anywhere in the repository. If types are missing or incorrect, fix the definitions or add narrow type assertions, not blanket casts.
- Prefer adding explicit props/type declarations or improving library types rather than bypassing the checker.

Commit and PR rules

- Follow conventional commits. Commit messages should be of form `type(scope): short description`.
- Keep changes small and include a description in the PR explaining why the change is necessary and how it was tested.

When generating code

- Include a short comment header on generated files explaining the generator and how to re-run it.
- Prefer adding generator scripts under `scripts/` and exposing them in the root `package.json`.

Safety & secrets

- Never add secrets or service keys to the repository. Use `.env.example` for placeholders and document required secrets in the README.

If you are unsure

- Ask for clarification before making large changes. When in doubt, propose a small change and a follow-up plan.
