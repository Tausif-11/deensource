# DeenSource Frontend

Simple static frontend scaffold using Tailwind CSS.

## Quick start (Windows PowerShell)

1. Install dev dependencies:

```powershell
npm install
```

2. Run Tailwind in watch mode (builds `public/styles.css`):

```powershell
npm run dev
```

3. Open the pages in your browser. Example: open `src/index.html` (it references `../public/styles.css`).

Optional: serve `public/` via `npm run start` after building.

Notes:
- HTML source files live in `src/`. Tailwind output CSS is written to `public/styles.css`.
- You can change paths in `tailwind.config.js` if you move files.
