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
        <link rel="canonical" href={ctx.url.href || ""}/>
        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />

        {/* OmniChat */}
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: 'window.omnichatConfig = { retailerId: "1f28lzUSCu" };',
          }}
        />
        <script
          defer
          dangerouslySetInnerHTML={{
            __html:
              '!function() { var t = document.createElement("script"); t.type = "text/javascript"; t.defer = true; t.src = "https://static.omni.chat/web-chat/web-chat.min.js"; t.onload = function() { OmniChatWebChat.init(window.omnichatConfig); }; var e = document.getElementsByTagName("script")[0]; e.parentNode.insertBefore(t, e); }();',
          }}
        />
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
