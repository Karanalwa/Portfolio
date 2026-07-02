# Portfolio v2 — apply to your local repo

## 1. Replace / add these files
- `src/App.tsx`  → overwrite
- `index.html`   → overwrite (new favicon, theme color, fonts, same SEO)
- `public/images/og-image.jpg` → overwrite (new v2 social preview)
- `public/resume.pdf` → ADD YOUR RESUME (the RESUME button points here)

## 2. Fill in two links (top of src/App.tsx, `LINKS` const)
- `certVerify` — your Credly / Microsoft Learn credential URL
- `mcpRepo`    — your MCP server GitHub repo (currently your profile)

## 3. Preview
    npm run dev

## 4. Push
    git add src/App.tsx index.html public/images/og-image.jpg public/resume.pdf
    git commit -m "Portfolio v2 — resume, cert verify, MCP link, new brand meta"
    git push origin main

## Notes
- Accent is now #5AD1FF (the blue you picked). Change `--ac` in App.tsx to swap.
- Dark-only by design. Old src/sections/ files are unused — delete anytime.

## Google Search Console (5 min, one time)
1. Go to https://search.google.com/search-console → Add property → "URL prefix" → enter https://karanalwa.vercel.app/
2. Choose the "HTML tag" verification method — copy the content token.
3. In index.html, uncomment the google-site-verification meta and paste the token. Push.
4. Back in Search Console click Verify, then Sitemaps → submit `sitemap.xml`.
Indexing typically takes a few days; ranking for your name improves over weeks.
