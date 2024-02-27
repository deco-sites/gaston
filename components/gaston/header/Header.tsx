import Icon from "$store/components/ui/Icon.tsx";
import Drawers from "$store/islands/Gaston/Drawers.tsx";
import { useId } from "$store/sdk/useId.ts";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import IconBrandInstagram from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/brand-instagram.tsx";
import IconBrandLine from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/brand-line.tsx";
import IconPhone from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/phone.tsx";
import IconSearch from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/search.tsx";
import Alert from "./Alert.tsx";
import NavBar from "./NavBar.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import NavItem from "./NavItem.tsx";

export interface NavItem {
  label: string;
  href?: string;
  children?: Array<{
    label: string;
    href?: string;
    children?: Array<{
      label: string;
      href?: string;
    }>;
  }>;
  image?: {
    src?: ImageWidget;
    alt?: string;
  };
}

export interface Social {
  Whatsapp: { href: string; isBlank?: boolean };
  Blog?: { href: string; blogName: string; isBlank?: boolean };
  Instagram: { href: string; isBlank?: boolean };
  Youtube: { href: string; isBlank?: boolean };
}

export interface Props {
  alerts: string[];

  /**
   * @title Social Media
   */
  social: Social;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems: NavItem[];

  /** @title Logo */
  logo?: { src: ImageWidget; alt: string };

  paths: { loginHref: string; favouriteHref: string };
  ShippingPrice: number;
}

function Header({
  alerts = ["alerts-0", "alerts-1"],
  navItems = [],
  logo,
  social,
  paths,
  ShippingPrice,
}: Props) {
  const platform = usePlatform();
  const id = useId();
  return (
    <>
      <header class="xl:h-[151px] h-[160px]">
        <Drawers
          menu={{ items: navItems }}
          logo={logo}
          paths={paths}
          ShippingPrice={ShippingPrice}
          platform={platform}
        >
          <div class="bg-base-100 w-full z-20 
              h-auto border-b border-[#552B9A1A] border-opacity-10">
            <div class="w-full bg-primary">
              <div class="w-11/12 max-w-[1300px] gap-6  flex m-auto items-center justify-between">
                <Alert alerts={alerts} />
                <ul class="hidden xl:flex items-center text-[0.56em] gap-6 justify-end uppercase text-white">
                  <li>
                    <a
                      href={social.Whatsapp.href}
                      target={social.Whatsapp.isBlank ? "_blank" : "_self"}
                      rel={social.Whatsapp.isBlank ? "noopener noreferrer" : ""}
                      class="flex items-center gap-1"
                    >
                      <IconPhone class="w-4 h-4 text-base-200" />
                      FALE CONOSCO
                    </a>
                  </li>
                  {social.Blog && (
                    <li>
                      <a
                        href={social.Blog?.href}
                        class="flex items-center gap-1"
                        target={social.Blog.isBlank ? "_blank" : "_self"}
                        rel={social.Blog.isBlank ? "noopener noreferrer" : ""}
                      >
                        <IconBrandLine class="w-4 h-4 text-base-200" />
                        BLOG {social.Blog?.blogName}
                      </a>
                    </li>
                  )}
                  <li>
                    <a
                      href={social.Instagram.href}
                      class="flex items-center gap-1"
                      target={social.Instagram.isBlank ? "_blank" : "_self"}
                      rel={social.Instagram.isBlank
                        ? "noopener noreferrer"
                        : ""}
                    >
                      <IconBrandInstagram class="w-4 h-4 text-base-200" />
                      INSTAGRAM
                    </a>
                  </li>
                  <li>
                    <a
                      href={social.Youtube.href}
                      class="flex items-center gap-1"
                      target={social.Youtube.isBlank ? "_blank" : "_self"}
                      rel={social.Youtube.isBlank ? "noopener noreferrer" : ""}
                    >
                      <Icon
                        id="youtube"
                        size={16}
                        class="w-4 h-4 text-base-200"
                      />
                      YOUTUBE
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="w-full">
              <NavBar paths={paths} logo={logo} />
            </div>
            {navItems.length > 0 &&
              (
                <ul class="hidden xl:flex justify-center m-auto w-11/12 max-w-[1300px] text-[#541693] uppercase items-center text-sm gap-5 min-h-[35px]">
                  {navItems.map((item, index) => (
                    <NavItem
                      item={item}
                      lastIndex={index === navItems.length - 1}
                    />
                  ))}
                </ul>
              )}
            <div className="w-[100%] xl:hidden relative px-4 py-1.5 border-b-[1px] border-solid border-gray-200">
              <form
                action="/s"
                method="GET"
                id={id}
                class="min-h-[40px] "
              >
                <input
                  className="w-full p-2 text-base text-black h-[41px] bg-base-300 rounded-full border border-solid border-gray-200"
                  type="text"
                  name="q" // Adicione o atributo 'name' com o valor 'q'
                  placeholder="Busque por tênis, mochila..."
                />
                <button type="submit" aria-label="Search">
                  <IconSearch
                    className="w-5 h-5 right-[33px] absolute -top-[1px] bottom-0 m-auto text-[#1e1e1e]"
                    style={{ position: "absolute" }}
                  />
                </button>
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
            </div>
          </div>
        </Drawers>
      </header>
    </>
  );
}

export default Header;
