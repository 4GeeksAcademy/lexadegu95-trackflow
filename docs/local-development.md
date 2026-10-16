# Run Locally

## Requirements

Use a Codespace or local environment with Node.js and npm installed (`npx` is included with npm). The repository's Codespaces devcontainer installs the Node.js LTS release and forwards ports `8000` and `8001`.

For an existing Codespace, rebuild the container after pulling this change using **Codespaces: Rebuild Container** so the Node.js feature is installed.

## Start the static site

From the repository root, run:

```bash
npx --yes http-server . -p 8001
```

Open the forwarded port `8001` in the Codespaces **Ports** panel, or visit `http://localhost:8001` locally. The homepage is `index.html`; the application page is available at `/application.html`.

Stop the server with `Ctrl+C`. `npx` downloads and runs `http-server` on first use; no project build or permanent dependency installation is required.

## Verify mobile performance

1. Start the site using the command above and open the forwarded port `8001` in a browser.
2. Open browser DevTools (right-click and choose **Inspect**), then select **Lighthouse**.
3. Choose **Mobile** and the **Performance** category, then run the audit on the homepage.
4. Record the Performance score. The acceptance target is **80 or higher**; repeat after performance changes.

The score depends on the browser, network, and external font/image delivery. Do not mark this target as passed until a Lighthouse run reports at least 80.

## Backend note

This command serves static files only. The application form posts to `POST /api/applications`, but this repository does not currently provide that backend endpoint. The application page can be viewed locally, but a successful application submission requires the backend to be implemented and running.
