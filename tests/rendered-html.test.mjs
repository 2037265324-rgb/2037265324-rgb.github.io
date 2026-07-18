import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders Tian Jialin's portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="zh-CN">/i);
  assert.match(html, /<title>田嘉林 Tian Jialin — Product Designer<\/title>/i);
  assert.match(html, /DESIGN/);
  assert.match(html, /BEYOND/);
  assert.match(html, /乐事贵阳品牌馆/);
  assert.match(html, /百事长安城品牌馆/);
  assert.match(html, /132 7940 3213/);
  assert.match(html, /og:image/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("ships responsive styles and portfolio assets", async () => {
  const [page, layout, css, packageJson, workAssets] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readdir(new URL("../public/work/", import.meta.url)),
  ]);

  assert.match(page, /aria-label="主导航"/);
  assert.match(page, /loading="lazy"/);
  assert.match(page, /tel:\+8613279403213/);
  assert.match(layout, /generateMetadata/);
  assert.match(layout, /summary_large_image/);
  assert.match(css, /@media \(max-width: 680px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.ok(workAssets.length >= 12);
  assert.ok(workAssets.every((file) => file.endsWith(".webp")));
});
