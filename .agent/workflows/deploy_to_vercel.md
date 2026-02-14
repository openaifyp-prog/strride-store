---
description: How to sync local code to GitHub and deploy to Vercel
---

# Deploying Strride to Vercel (Syncing to GitHub)

It looks like your local folder isn't connected to Git yet (even if the project exists on GitHub). Here is how to link them so you can deploy.

## Step 1: Initialize Git and Commit Changes

Run these commands in your terminal to save your recent work (Curated Products, etc.):

```bash
git init
git add .
git commit -m "Final polish: 15 curated products, limits, admin link"
```

## Step 2: Link to Your GitHub Repository

1.  Go to your **GitHub Repository** page.
2.  Click the likely green **"Code"** button and copy the URL (e.g., `https://github.com/yourname/strride.git`).
3.  Back in your terminal, run:
    ```bash
    git branch -M main
    git remote add origin <PASTE_YOUR_GITHUB_URL_HERE>
    git push -u origin main --force
    ```
    _(Note: The `--force` flag ensures your local "perfect" version overwrites whatever is on GitHub)_.

## Step 3: Deploy on Vercel

1.  Go to [Vercel.com](https://vercel.com/new).
2.  **Import Git Repository**:
    - Find your `strride` repo in the list.
    - Click **Import**.
3.  **Deploy**:
    - Vercel detects **Vite**.
    - Click **Deploy**.
4.  Done! Your site is live.
