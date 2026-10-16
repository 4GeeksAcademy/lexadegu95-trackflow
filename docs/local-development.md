# Run Locally

## Requirements

Use a Codespace or local environment with Node.js and npm installed (`npx` is included with npm). The repository's Codespaces devcontainer installs the Node.js LTS release and forwards port `8000`.

For an existing Codespace, rebuild the container after pulling this change using **Codespaces: Rebuild Container** so the Node.js feature is installed.

## Start the static site

From the repository root, run:

```bash
npx --yes http-server . -p 8000
```

Open the forwarded port `8000` in the Codespaces **Ports** panel, or visit `http://localhost:8000` locally. The homepage is `index.html`; the application page is available at `/application.html`.

Stop the server with `Ctrl+C`. `npx` downloads and runs `http-server` on first use; no project build or permanent dependency installation is required.

## Backend note

This command serves static files only. The application form posts to `POST /api/applications`, but this repository does not currently provide that backend endpoint. The application page can be viewed locally, but a successful application submission requires the backend to be implemented and running.
