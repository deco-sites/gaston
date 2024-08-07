import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import Theme from "$store/sections/Theme/Theme.tsx";
import { Context } from "deco/deco.ts";

const sw = () =>
  addEventListener("load", () =>
    navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));

export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();

  return (
    <>
      {/* Include default fonts and css vars */}
      <Theme />

      {/* Include Icons and manifest */}
      <Head>
        {/* Enable View Transitions API */}
        <meta name="view-transition" content="same-origin" />
        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />

        <script
          defer
          dangerouslySetInnerHTML={{
            __html:
              `!function(){function e(){var e;t&&((e=document.createElement("script")).src="https://tagloader.connectly.ai/?v=0.48.0",e.type="text/javascript",t.appendChild(e))}var t=document.getElementsByTagName("head")[0];window.__connectlyai={bId:"f3ac5d2a-4c4e-4aa4-9841-31435c72f539",loaded:!1,modules:{widget:{position:"fixed",parentElementClass:"connectlyai-widget-parent",positionRight:"8px"}}};"complete"!==document.readyState&&"interactive"!==document.readyState||e(),window.addEventListener("DOMContentLoaded",e)}();`,
          }}
        />
        <script
          defer
          type="text/javascript"
          id="getSelo"
          src="https://imgs.ebit.com.br/ebitBR/selo-ebit/js/getSelo.js?78316"
        />

        <style type="text/css"
          dangerouslySetInnerHTML={{
            __html:
              `@supports not(color: oklch(0 0 0)) {
              :root {
                    color-scheme: light;
                  --fallback-p: #e30613;
                  --fallback-pc: #1e1e1e;
                  --fallback-s: #ffed00;
                  --fallback-sc: #fffbc2;
                  --fallback-a: #21c05e;
                  --fallback-ac: #00100d;
                  --fallback-n: #f9f9f9;
                  --fallback-nc: #f9f9f9;
                  --fallback-b1: #ffffff;
                  --fallback-b2: #ffffff;
                  --fallback-b3: #f7f7f7;
                  --fallback-bc: #f1d9d9;
                  --fallback-in: #00b3f0;
                  --fallback-inc: #000000;
                  --fallback-su: #00ca92;
                  --fallback-suc: #000000;
                  --fallback-wa: #e08e00;
                  --fallback-wac: #000000;
                  --fallback-er: #ff6f70;
                  --fallback-erc: #000000;
                }`
          }}
        >

        </style>

      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />

      {/* Include service worker */}
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: `(${sw})();` }}
      />
    </>
  );
});
