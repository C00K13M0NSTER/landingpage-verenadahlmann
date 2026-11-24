import type { Site } from "./sites";

export const FONT_PATH = "/fonts/inter-latin.woff2";

const CSS = `
@font-face{font-family:Inter;src:url(${FONT_PATH}) format("woff2");font-weight:100 900;font-display:swap}
*,*::before,*::after{box-sizing:border-box}
html{background:#000;color:#f5f5f7;color-scheme:dark}
body{margin:0;min-height:100vh;min-height:100svh;display:flex;flex-direction:column;font:400 17px/1.47 Inter,system-ui,-apple-system,"Segoe UI",Arial,sans-serif;letter-spacing:-.01em;-webkit-font-smoothing:antialiased}
main{flex:1;display:grid;place-content:center;padding:48px 22px;text-align:center}
h1{margin:0;font-size:clamp(40px,6.4vw,80px);font-weight:600;line-height:1.05;letter-spacing:-.032em;text-wrap:balance;overflow-wrap:anywhere;animation:settle 1s cubic-bezier(.2,.8,.2,1) both}
h1 span{display:block;color:#86868b}
footer{padding:20px 22px 28px;color:#86868b;font-size:12px;text-align:center}
@keyframes settle{from{opacity:0;transform:translateY(14px)}}
@media (prefers-reduced-motion:reduce){h1{animation:none}}
`;

export function renderPage(site: Site, nonce: string): string {
	const name = escapeHtml(site.name);

	return `<!doctype html>
<html lang="${escapeHtml(site.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<meta name="color-scheme" content="dark">
<meta name="theme-color" content="#000000">
<title>${name}</title>
<link rel="preload" href="${FONT_PATH}" as="font" type="font/woff2" crossorigin>
<link rel="icon" href="${favicon(site)}">
<style nonce="${nonce}">${CSS}</style>
</head>
<body>
<main><h1>${name} <span>${escapeHtml(site.message)}</span></h1></main>
<footer>© ${new Date().getFullYear()} ${name}</footer>
</body>
</html>`;
}

function favicon(site: Site): string {
	const letter = escapeHtml(site.name.charAt(0));
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><rect width="16" height="16" rx="3.5" fill="#1d1d1f"/><text x="8" y="12" text-anchor="middle" font-family="Segoe UI,Helvetica,Arial,sans-serif" font-size="12" font-weight="700" fill="#f5f5f7">${letter}</text></svg>`;
	return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function escapeHtml(value: string): string {
	return value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);
}
