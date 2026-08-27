# LingualSafety 1.0 - Official Website

> **ICON 2026 Shared Task**: Building Jailbreak Defences Against Multilingual Jailbreak Attacks

This repository contains the complete source code for the official public-facing website of the LingualSafety 1.0 shared task, hosted via **GitHub Pages**.

---

## File Structure

```
icon/
├── index.html          - Main (single-page) website
├── css/
│   └── style.css       - All styles and design tokens
├── js/
│   ├── config.js       - CONFIGURATION - edit this before publishing
│   └── main.js         - Navigation, animations, dynamic link injection
├── assets/
│   └── favicon.svg     - SVG favicon (shield + "L" motif)
└── README.md           - This file
```

---

## Before Publishing - What to Change

### 1. js/config.js - Primary configuration file

Open `js/config.js` and replace every value currently set to `"TODO"` with the real information:

| Field | Description |
|---|---|
| `codabenchURL` | Already set to `https://www.codabench.org/competitions/17783/` |
| `githubURL` | Your GitHub repository URL |
| `baselineURL` | URL to the baseline system repository |
| `datasetURL` | Dataset download link |
| `iconConferenceURL` | Official ICON 2026 website URL |
| `contactEmail` | Organizer contact email address |
| `registrationURL` | Competition registration form URL |
| `dates.*` | All competition dates (registration open, data release, submission deadline, etc.) |
| `submission.*` | Submission format, max submissions, evaluation instructions |

### 2. index.html - Metadata

Update the following tags near the top of `index.html`:

```html
<!-- Line ~14: Update to your deployed URL -->
<meta property="og:url" content="https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO-NAME/" />

<!-- Line ~23: Update canonical URL -->
<link rel="canonical" href="https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO-NAME/" />
```

### 3. Social preview image

Create an `assets/og-image.png` (recommended: 1200x630 px) for social media link previews. This is referenced in the Open Graph and Twitter Card meta tags.

---

## Deploying to GitHub Pages

### Option A - Deploy from the main branch root (simplest)

1. Push the entire project to a GitHub repository root.
2. Go to **Settings -> Pages**.
3. Under **Source**, select **Deploy from a branch**.
4. Choose **main** branch and **/ (root)** folder.
5. Click **Save**.
6. Your site will be live at: `https://<username>.github.io/<repo-name>/`

### Option B - Deploy from a docs/ folder

1. Move all files into a `docs/` subfolder.
2. Go to **Settings -> Pages -> Source -> main branch -> /docs**.

### Option C - GitHub Actions (recommended for CI/CD)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - uses: actions/deploy-pages@v4
```

---

## Key Links

| Resource | URL |
|---|---|
| CodaBench Competition | https://www.codabench.org/competitions/17783/ |
| Llama-3.1-8B-Instruct | https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct |
| Qwen3-4B | https://huggingface.co/Qwen/Qwen3-4B |
| Gemma-3-4B-IT | https://huggingface.co/google/gemma-3-4b-it |
| Sarvam-1 | https://huggingface.co/sarvamai/sarvam-1 |
| Krutrim-1-Instruct | https://huggingface.co/krutrim-ai-labs/Krutrim-1-instruct |
| Param-1 | https://huggingface.co/bharatgenai/Param-1 |

---

## Adding Leaderboard Data Later

When results are available:

1. In `index.html`, find `<div id="leaderboard-table-wrap"` and change `display: none` to `display: block` (or remove the CSS rule in `style.css`).
2. Hide the placeholder `<div class="leaderboard-coming">` by adding `style="display:none"`.
3. Populate `<tbody id="leaderboard-tbody">` with result rows.

Example row:

```html
<tr>
  <td>1</td>
  <td>TeamName</td>
  <td>Closed</td>
  <td>0.91</td>
  <td>0.05</td>
  <td>0.87</td>
</tr>
```

---

## Accessibility

The site uses:
- Semantic HTML5 elements (<nav>, <main>, <section>, <article>, <footer>)
- ARIA labels on all interactive elements
- role attributes on landmark elements
- Keyboard navigation (Escape closes mobile menu)
- focus-visible outlines
- Sufficient colour contrast for text

---

## No Build Step Required

This is a fully static website. No npm install, no build step, no server.
Open index.html directly in any browser to preview locally.

---

## License & Attribution

(c) 2026 LingualSafety 1.0 Shared Task Organizers.
