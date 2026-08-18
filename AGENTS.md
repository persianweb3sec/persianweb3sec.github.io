# AGENTS.md — PersianWeb3Sec.github.io

## Project Overview

Persian-language Jekyll site for Web3/blockchain security community. Uses the **Simorq** theme. Content is in Farsi (right-to-left).

## Key Architecture

- **Source root**: `src/` (configured in `_config.yml` → `source: src`)
- **Posts**: `src/_posts/<category>/<date>-<slug>.md` — organized by subdirectory, NOT flat
- **Layouts/includes/sass**: `src/_layouts/`, `src/_includes/`, `src/_sass/`
- **Data**: `src/_data/menus.yml` (navigation)
- **Assets**: `assets/` at repo root (images, etc.)

## Build & Deploy

**Local development:**
```bash
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve
```

**Production build:**
```bash
bundle exec jekyll build --baseurl "/"
```

CI runs on push to `main` via `.github/workflows/jekyll.yml` (Ruby 3.1, GitHub Pages deploy).

## Post Front Matter

Required fields for new posts:
```yaml
---
title: "Post title in Farsi"
date: YYYY-MM-DD HH:MM:SS +03:30
modified: YYYY-MM-DD HH:MM:SS +03:30
tags: [tag1, tag2, tag3]
description: "Short description"
image: ""
---
```

- Dates use `Asia/Tehran` timezone (`+03:30`)
- Tags are Persian terms, with some English keywords mixed in
- Posts go in a subdirectory under `src/_posts/` matching the topic category

## Conventions

- All content is in **Persian (Farsi)** — write new content in Farsi unless explicitly creating English material
- The site uses `lang: fa` and `date_format: fa-IR` (Persian calendar)
- Default layout is `post` (set in `_config.yml` defaults)
- Comments are disabled by default (`comments: false`)
- Markdown with kramdown + rouge syntax highlighting
- License: MIT (original Simorq theme copyright 2019 Mahendrata Harpi)

## Dependencies

Ruby gems (install via `bundle install`):
- `jekyll ~> 4.1.0`
- `jekyll-feed`, `jekyll-sitemap`, `jekyll-postfiles`, `jekyll-compose`
- `jekyll-target-blank` (opens external links in new tabs)
- `ffi < 1.17.0` (workaround for ffi issue #1103)

## Gotchas

- The `url` in `_config.yml` is set to `https://example.anything` — leave it alone, GitHub Pages overrides it
- The Simorq theme is referenced but NOT installed as a gem; it's likely inlined or referenced directly
- Post filenames must follow Jekyll convention: `YYYY-MM-DD-title.md`
- Images referenced in posts should go in the post's directory or `assets/img/`
