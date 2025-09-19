# Repository Guidelines

## Project Structure & Module Organization

The Next.js App Router lives in `src/app`, with route segments such as `dashboard`, `reports`, `scan-qr`, and `users`. Shared UI and native-bridge helpers sit in `src/components` (see `src/components/nativeBridge.tsx` for React Native WebView integration), while hooks, data helpers, and providers are grouped under `src/hooks`, `src/lib`, and `src/providers`. Static assets, manifests, and audio samples belong in `public/`. Use the `@/` alias (configured in `tsconfig.json`) to reference items inside `src/`.

## Build, Test & Development Commands

Run `npm run dev` for the standard development server, or `npm run dev:https` when you need the experimental HTTPS preview for WebView clients. `npm run build` produces the production bundle, and `npm run start` serves the compiled output. Always finish with `npm run lint` to verify ESLint rules before raising a merge request.

## Coding Style & Naming Conventions

This codebase is strict TypeScript with React 19. Default to server components inside `src/app` and mark client files only when hooks or browser APIs are required. Follow the existing tab indentation, double-quoted strings, and trailing commas shown in current files. Declare functions as arrow expressions (`const handleScan = () => {}`); avoid `function` declarations and skip explicit return type annotations. Keep file names kebab-cased (for routes), and reuse composable UI primitives under `src/components/ui` instead of bespoke styling.

## Testing Guidelines

Tests are still being introduced; colocate new specs beside the code using the `.test.ts` or `.test.tsx` suffix and rely on Vitest or React Testing Library when you add the tooling. For now, validate critical flows by running `npm run build` and exercising the affected routes manually. Document manual test steps in the pull request until automated coverage lands.

## Commit & Pull Request Guidelines

Commit messages follow an imperative, lower-case style (e.g., `add pause feature for qrcode scanner`). Group related changes and avoid bundling refactors with features. Pull requests should include a concise summary, screenshots or screen recordings for UI changes, manual verification notes, and links to any tracked issues. Call out WebView-specific considerations—such as messaging contracts or HTTPS requirements—so reviewers can test inside the native shell.

## WebView Integration Notes

When touching the native bridge, confirm payload schemas in `useNativeBridge` and coordinate message formats with the host app team. Ensure any new windows APIs guard against `window` being undefined, and gate experimental features behind runtime checks for `__RN_WEBVIEW__` to keep desktop browsers functional.
