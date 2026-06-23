# Nomula Kabeer Das, Campaign Website

A fast, multilingual (English / తెలుగు / हिन्दी / اردو) static website for the
ward councillor campaign of **Nomula Kabeer Das**. No build step, no framework,
just HTML, CSS, and a little JavaScript, ready to host on **Cloudflare Pages**.
Urdu renders right-to-left automatically.

## What's here

| File | Purpose |
|------|---------|
| `index.html` | The full single-page site (all sections + SEO/social tags) |
| `styles.css` | Styling and responsive layout |
| `i18n.js` | All text in EN / TE / HI / UR, **edit copy here** |
| `script.js` | Language switcher, scroll animations, mobile menu |
| `_headers` | Cloudflare Pages caching & security headers |
| `robots.txt` | Crawl rules, welcomes Google **and** AI/LLM crawlers |
| `sitemap.xml` | Sitemap for search engines |
| `llms.txt` | Plain-text summary for LLMs (AI answer engines) |
| `assets/img/` | Photos used on the site (incl. `og-image.jpg` for social) |

## View it locally

Just open `index.html` in a browser, or run a tiny local server:

```bash
cd kabeerdasnomula
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to Cloudflare Pages

### Option A, Connect your Git repo (recommended)
1. Push this folder to a GitHub/GitLab repo.
2. In the Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Pick the repo. For build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
4. **Save and Deploy.** Every push to the main branch redeploys automatically.

### Option B, Direct upload via Wrangler CLI
```bash
npm install -g wrangler
wrangler login
wrangler pages deploy . --project-name=kabeer-das-campaign
```

### Custom domain
In the Pages project → **Custom domains → Set up a domain**, add your domain
(e.g. `nomulakabeerdas.in`). If the domain is on Cloudflare, DNS is configured
automatically; otherwise follow the CNAME instructions shown.

## ⚠️ One required step: set your real domain

The SEO and social tags use a placeholder domain, **`https://www.nomulakabeerdas.in`**.
Find-and-replace it with your real domain in these files before launch:

- `index.html` (canonical, Open Graph, Twitter, JSON-LD)
- `robots.txt` (sitemap line)
- `sitemap.xml` (`<loc>`)
- `llms.txt` (website line)

```bash
# from the project folder, replace OLD with your real domain:
grep -rl "www.nomulakabeerdas.in" . --include="*.html" --include="*.txt" --include="*.xml" \
  | xargs sed -i '' 's#https://www.nomulakabeerdas.in#https://YOUR-REAL-DOMAIN#g'
```

## Before you go live, checklist

- [ ] **Set the real domain** (see the step above), needed for SEO & social previews.
- [ ] **Review translations.** The Telugu, Hindi and Urdu text in `i18n.js` is a
      first draft. Have a native speaker check it (especially names, the colony
      name, and party names). For Urdu, a reviewer may prefer the Arabic comma
      (،) over the Latin comma in a few places.
- [x] **Contact details**, phone `+91 94902 86474` and email `kdashyd@gmail.com`
      are set. Address: Doctors Colony, Saroor Nagar, Hyderabad - 500035.
- [ ] **Add social links.** Replace the `href="#"` in the `.social` block of
      `index.html` with real WhatsApp / Facebook / Instagram / YouTube URLs, and
      add those same URLs to the `"sameAs": []` array in the JSON-LD (helps Google
      and AI connect the site to the social profiles).
- [ ] **Confirm the office sought**, the copy says "Ward Councillor". Update
      if the correct term is Corporator/Councillor/etc. for your municipality.
- [ ] **Confirm the "35+ years" stat** and any other numbers are accurate.
- [ ] **Wire up the contact form.** It's a demo right now. Easiest options:
      a [Cloudflare Pages Function](https://developers.cloudflare.com/pages/functions/)
      with an email API, or a third-party form service (Formspree, Web3Forms).
- [ ] **Election compliance:** add the legally required "Published by /
      Authorised by" line in the footer (`footer.legal` in `i18n.js`).
- [ ] Optionally compress the JPEGs in `assets/img/` for faster loading.

## SEO, AI crawlers & social media

The site is built to rank locally for **Saroor Nagar / LB Nagar / Doctors Colony,
Hyderabad** and to be readable by AI answer engines (ChatGPT, Claude, Perplexity,
Google AI).

**What's already done in the code:**
- Local-SEO title, description, and keywords (English + Telugu + Hindi) targeting
  Saroor Nagar, LB Nagar, Doctors Colony and Jinkala Bavi Colony.
- Geo meta tags (`geo.region`, `geo.position`) pointing at Saroor Nagar.
- **Structured data (JSON-LD)**, a `Person`, campaign `Organization` (with
  `areaServed` = Saroor Nagar, LB Nagar, etc.), and `WebSite`. This is what Google
  and LLMs read to understand who he is and where he serves.
- **Open Graph + Twitter cards** with `og-image.jpg`, so links shared on Facebook,
  WhatsApp, Instagram (bio/DM links) and LinkedIn show a rich preview.
- `robots.txt` that explicitly **allows AI crawlers** (GPTBot, ClaudeBot,
  PerplexityBot, Google-Extended, CCBot, etc.), plus `sitemap.xml` and `llms.txt`.
- All visible copy is real HTML text (not loaded only by JS), so crawlers and LLMs
  read the full English content without running scripts.

**Do this after launch to actually rank & get crawled:**
1. **Google Search Console**, add the domain, verify, and *Submit sitemap*
   (`/sitemap.xml`). Same with **Bing Webmaster Tools**.
2. **Google Business Profile**, create one for the campaign office at Doctors
   Colony, Saroor Nagar. This is the single biggest lever for local "near me"
   search and Google Maps visibility.
3. **Custom OG image (recommended):** the current `assets/img/og-image.jpg` is a
   reused photo. For best results make a **1200×630px** branded image (name +
   photo + "Saroor Nagar · LB Nagar") and replace that file.
4. **Get inbound links** from local news, party pages, and directories, local
   backlinks are what move ranking the most.

**Social platforms (Facebook / Instagram / Snapchat):**
- These apps are **walled gardens**, Google can't crawl most of their content, and
  a website alone won't make you show up *inside* them. You need actual profiles:
  - **Facebook Page**, "Nomula Kabeer Das" (category: Politician). Link the website.
    Facebook reads the Open Graph tags, so shared links look good automatically.
  - **Instagram**, a Professional/Creator account; put the website in the bio link.
  - **Snapchat**, a Public Profile; optionally a geofilter for Saroor Nagar events.
- Use the **same name, photo, phone and locality** everywhere (consistency helps
  both people and search engines connect the profiles).
- Once the profiles exist, paste their URLs into the `.social` links **and** the
  JSON-LD `sameAs` array in `index.html` so search/AI tie them to the site.
- To preview how a shared link looks, use the
  [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and
  [X Card Validator](https://cards-dev.twitter.com/validator) after going live.

## Editing content

- **Text:** open `i18n.js`. Each phrase has an `en`, `te`, `hi`, and `ur` version
  under the same key. Change the value, keep the key.
- **Photos:** drop new images into `assets/img/` and update the `<img src="…">`
  paths in `index.html`.
- **Sections / layout:** edit `index.html` and `styles.css`.
