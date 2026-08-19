# sec3.ir

**The first Persian reference for Web3 Security**

- Our Telegram Group: [Link](https://t.me/+_BZiDHeqUfliN2M0)
- Our Discord: [Link](https://discord.gg/gf5stdZ9Qa)

## Contributing

We welcome contributions from the community! Here's how to add a new post:

### Quick Start

1. **Fork** this repository
2. **Create a branch** for your post: `git checkout -b my-new-post`
3. **Add your content** in `src/_posts/` under the appropriate category directory
4. **Submit a Pull Request**

### Post Structure

Each post lives in a directory under `src/_posts/<category>/`. The filename must follow Jekyll's convention:

```
src/_posts/<category>/<YYYY-MM-DD>-<slug>.md
```

**Example:**
```
src/_posts/auditing/2025-08-15-smart-contract-audit-tips.md
```

### Post Template

Create a `.md` file with this front matter:

```markdown
---
title: "عنوان مطلب به فارسی"
date: 2025-08-15 10:00:00 +03:30
modified: 2025-08-15 10:00:00 +03:30
tags: [امنیت وب ۳, امنیت بلاکچین, قرارداد هوشمند]
description: "توضیح کوتاه درباره مطلب"
image: ""
---

# عنوان مطلب

محتوای مطلب شما اینجا قرار می‌گیرد...
```

### Front Matter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title in Farsi |
| `date` | Yes | Publication date with `+03:30` timezone |
| `modified` | Yes | Last modified date with `+03:30` timezone |
| `tags` | Yes | Array of relevant tags |
| `description` | Yes | Short description (shown on homepage) |
| `image` | No | Open Graph image path (leave empty for default) |

### Adding Images

Place images in your post's directory and reference them in your post:

```
src/_posts/auditing/
├── 2025-08-15-smart-contract-audit-tips.md
├── diagram.png
└── example.png
```

Reference in markdown:
```markdown
![توضیح تصویر](diagram.png)
```

### Category Directories

Use one of these categories for your post:
- `roadmap` - Learning paths and roadmaps
- `BugBountyOrContest` - Bug bounty and audit contests
- `auditing` - Smart contract auditing
- `tools` - Security tools and resources
- `vulnerabilities` - Vulnerability analysis

If your category doesn't exist, create a new directory under `src/_posts/`.

### Content Guidelines

- Write in **Persian (Farsi)** — this is a Persian-language community
- Use Markdown for formatting
- Include code blocks with syntax highlighting where relevant
- Add images to illustrate concepts
- Keep descriptions concise for homepage display

### Local Development

To preview your changes locally:

```bash
# Install dependencies
bundle config set --local path vendor/bundle
bundle install

# Start development server
bundle exec jekyll serve
```

Visit `http://localhost:4000` to preview.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Credits

This project uses the [Simorq](https://github.com/mhdzli/simorq) theme by [Mohammad Zeinali](https://github.com/mhdzli). We appreciate his contributions to the open-source community!

### Contributors

Thanks to all contributors who have helped improve this project:

- [@ely67](https://github.com/ely67) - Frontend redesign, modern layout, and contact icons

## Contact

For questions or feedback, you can reach out via [email](mailto:persianweb3sec@proton.me).
