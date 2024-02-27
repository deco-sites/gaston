import IconHeart from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/heart.tsx";
import { CartButton, MenuButton } from "$store/islands/Gaston/Buttons.tsx";
import { navbarHeight } from "../../header/constants.ts";
import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";
import ImageComponent from "apps/website/components/Image.tsx";
import { useId } from "$store/sdk/useId.ts";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";
import LoginButton from "$store/islands/Gaston/LoginButton.tsx";
import Icon from "deco-sites/gaston/components/ui/Icon.tsx";

function Navbar({ paths, logo }: {
  logo?: { src: LiveImage; alt: string };
  paths: { loginHref: string; favouriteHref: string };
}) {
  const id = useId();
  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="xl:hidden w-full text-primary"
      >
        <div class="w-11/12 m-auto flex flex-row justify-between items-center gap-4">
          <MenuButton />

          {logo && (
            <a
              href="/"
              class="flex-grow justify-center flex items-center h-[42px] w-[238px] object-contain"
              style={{ minHeight: navbarHeight }}
              aria-label="Store logo"
            >
              <ImageComponent
                class="object-contain"
                src={logo.src}
                alt={logo.alt}
                width={110}
                height={28}
              />
            </a>
          )}

          <div class="flex gap-1">
            <a
              class="btn btn-circle btn-sm btn-ghost"
              href={paths.favouriteHref}
              aria-label="Wishlist"
            >
              <Icon id="Heart" strokeWidth={1} class="w-5 h-[19px]" />
            </a>
            <CartButton />
          </div>
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden xl:flex py-4 items-center m-auto w-11/12  max-w-[1300px] justify-between gap-8 max-h-[75px]">
        {logo && (
          <a
            href="/"
            aria-label="Store logo"
            class="flex items-center py-3 h-[42px] w-[238px]"
          >
            <ImageComponent
              class="w-full"
              src={logo.src}
              alt={logo.alt}
              width={238}
              height={42}
            />
          </a>
        )}
        <form
          action="/s"
          method="GET"
          id={id}
          class="flex-grow rounded-2xl border-[1px] border-gray-300 text-xs py-2 pl-2"
        >
          <input
            type="text"
            placeholder="O que você procura? Nós podemos te ajudar!"
            name="q"
            class="w-full border-none"
          >
          </input>
        </form>
        <script
          src={scriptAsDataURI((id: string) => {
            const elem = document.getElementById(id);
            if (!elem) return;
            // deno-lint-ignore no-explicit-any
            elem.addEventListener("submit", (e: any) => {
              window.DECO.events.dispatch({
                name: "search",
                params: {
                  search_term: e.currentTarget.elements["q"].value,
                },
              });
            });
          }, id)}
        />
        <div class="flex items-center gap-6">
          <LoginButton loginHref={paths.loginHref} />
          <a
            class="btn btn-circle btn-sm btn-ghost bg-primary-content p-1 w-9 h-9"
            href={paths.favouriteHref}
            aria-label="Wishlist"
          >
            <IconHeart class="w-6 h-6 text-base-300" />
          </a>
          <CartButton />
        </div>
      </div>
    </>
  );
}

export default Navbar;
