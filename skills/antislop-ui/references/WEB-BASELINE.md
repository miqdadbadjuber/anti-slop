# Web Baseline

> Reference for antislop. Adapted from the MIT-licensed web-quality-skills by Addy Osmani (https://github.com/addyosmani/web-quality-skills); see LICENSE-web-quality-skills in the skill folder.

Page basics and security defaults. This is an optional checklist, not a Hard Gate rule: run it when the task asks for a production-ready page or a web-quality review. None of it shows in a screenshot, which is why it is easy to skip.

## Document basics

- `<!doctype html>` first, so the page never renders in quirks mode.
- `<meta charset="utf-8">` first in `<head>`.
- `<meta name="viewport" content="width=device-width, initial-scale=1">` (zoom stays allowed, R-39).
- Valid, semantic HTML with no duplicate `id`.

## Runtime

Console errors are already R-35.

- No deprecated APIs: `document.write`, synchronous XHR, `unload` listeners.
- Scroll and touch listeners are `{ passive: true }` where they do not call `preventDefault`.

## Security defaults

- HTTPS for every resource, with no mixed `http://` content.
- External links opened in a new tab carry `rel="noopener noreferrer"`.
- No secrets, API keys, or tokens in client code; they stay on the server.
- `textContent` or a sanitizer instead of `innerHTML` or `eval` with untrusted input.
- Third-party scripts and styles from a CDN you do not control are pinned with Subresource Integrity.
- Permissions (location, notifications, camera) are requested after a user action, never on page load.
