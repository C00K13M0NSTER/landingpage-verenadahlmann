# landingpage-verenadahlmann

Schlichte Parkseite für **verenadahlmann.de** (Stil wie dhlmnn.de), ausgeliefert von einem Cloudflare Worker.

- Zeigt den Hostnamen und „Diese Domain ist geparkt.“ – Text und Sprache in [src/sites.ts](src/sites.ts).
- Inter wird selbst ausgeliefert, keine externen Ressourcen (keine Skripte, Tracker oder CDNs).
- `www.` leitet per 301 auf die Hauptdomain um.
- Nicht in Suchmaschinen: `X-Robots-Tag: noindex, nofollow, …` plus `<meta name="robots">`. Die `robots.txt` erlaubt das Crawlen bewusst, sonst sehen Suchmaschinen das `noindex` nicht.

## Domains

In [wrangler.jsonc](wrangler.jsonc) unter `routes`. `custom_domain` funktioniert nur, wenn der Hostname noch keinen A/AAAA/CNAME-Eintrag hat. Sonst eine Route über den vorhandenen, proxied Eintrag nutzen und den Eintrag stehen lassen.

## Entwicklung

```sh
npm install
npm run dev     # lokal
npm run check   # TypeScript + Deploy-Dry-Run
```

## Deployment

Workers Builds führt bei jedem Push auf `main` `npx wrangler deploy` aus. Der `name` in [wrangler.jsonc](wrangler.jsonc) muss dem Worker-Namen im Cloudflare-Dashboard entsprechen.
