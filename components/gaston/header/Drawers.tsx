import Button from "$store/components/gaston/ui/Button.tsx";
import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";
import ImageComponent from "apps/website/components/Image.tsx";
import IconChevronLeft from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-left.tsx";
import IconX from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/x.tsx";
import type { ComponentChildren } from "preact";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { lazy, Suspense } from "preact/compat";
import IconSearch from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/search.tsx";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";
import { useId } from "deco-sites/gaston/sdk/useId.ts";

const Menu = lazy(() => import("$store/components/gaston/header/Menu.tsx"));
const MenuProducts = lazy(() =>
  import("$store/components/gaston/header/MenuProducts.tsx")
);
const MenuProductsChild = lazy(() =>
  import(
    "$store/components/gaston/header/MenuProductsChild.tsx"
  )
);
const Cart = lazy(() => import("$store/components/minicart/Cart.tsx"));

export interface Props {
  menu: MenuProps;
  ShippingPrice: number;

  logo?: { src: LiveImage; alt: string };
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  paths: { loginHref: string; favouriteHref: string };
  platform: ReturnType<typeof usePlatform>;
}

const Aside = (
  {
    logo,
    onClose,
    children,
    chevronClick,
    title,
    displayMenu,
    open,
    isMiniCart,
    subtitle,
    id,
  }: {
    logo?: { src: LiveImage; alt: string };
    onClose?: () => void;
    chevronClick?: () => void;
    children: ComponentChildren;
    title?: string;
    displayMenu: boolean;
    open: boolean;
    isMiniCart?: boolean;
    subtitle?: string;
    id: string;
  },
) => (
  <div class="bg-white grid grid-rows-[auto_1fr] max-w-[425px] w-11/12 min-h-[100%] max-h-[100vh] overflow-y-auto">
    <div
      class={`${
        !displayMenu || isMiniCart ? "" : "bg-base-100"
      } relative flex flex-col`}
    >
      <div
        class={`flex h-full ${
          isMiniCart ? "justify-start" : "justify-between"
        } items-center w-11/12 m-auto`}
      >
        {!displayMenu && (
          <>
            <Button
              class="btn-ghost p-2"
              onClick={chevronClick}
            >
              <Icon
                class="text-primary w-[13px] h-5"
                id="ChevronLeft"
                strokeWidth={1}
              />
            </Button>
            <div class="px-4 py-3">
              <span class="font-medium text-[13px] text-primary-content opacity-60">
                {title}
              </span>
            </div>
          </>
        )}
        {displayMenu && logo && (
          <a
            href="/"
            class="flex items-center justify-center"
            aria-label="Store logo"
          >
            <ImageComponent
              src={logo.src}
              alt={logo.alt}
              width={117}
              height={29}
            />
          </a>
        )}
        {!isMiniCart && onClose && (
          <Button
            class={`${!displayMenu && "text-white"} ${
              open ? "block" : "hidden"
            } btn-ghost h-fit p-2 rounded-full`}
            onClick={onClose}
          >
            <IconX class="w-[30px] h-[30px] text-primary" />
          </Button>
        )}
        {isMiniCart && onClose && (
          <>
            <button
              class="btn-ghost rounded-full flex justify-between items-center bg-white bg-opacity-10 h-[40px] w-[40px]"
              onClick={onClose}
            >
              <Icon
                id="XMark"
                class="w-[15px] h-5"
                strokeWidth={1}
              />
            </button>
            <Icon id="sacola" class="mx-4" width={14} height={16} />
            <div>
              <span class="leading-5 text-[18px] text-white font-bold">
                {title}
                <strong class="font-medium">{subtitle}</strong>
              </span>
            </div>
          </>
        )}
      </div>
      {displayMenu && logo && (
        <div className="w-[100%] xl:hidden relative px-4 py-1.5">
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
      )}
    </div>
    <Suspense
      fallback={
        <div class="w-full flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

function Drawers({ menu, logo, children, paths, platform }: Props) {
  const {
    displayMenu,
    displayMenuProducts,
    productsChild,
    displayMenuProductsChild,
    productsChild2,
    displayCart,
  } = useUI();
  const { cart } = useCart();
  const { items } = cart.value ?? { items: [] };
  const id = useId();

  return (
    <Drawer
      open={displayMenu.value || displayMenuProductsChild.value}
      onClose={() => {
        displayMenu.value = false;
        displayMenuProductsChild.value = false;
      }}
      aside={
        <Aside
          displayMenu={displayMenu.value}
          logo={logo}
          onClose={() => {
            displayMenu.value = false;
            displayMenuProductsChild.value = false;
          }}
          open={displayMenu.value || displayMenuProductsChild.value}
          title={productsChild2.value.label}
          chevronClick={() => {
            displayMenuProductsChild.value = false;
            displayMenuProducts.value = true;
          }}
          id={id}
        >
          {displayMenu.value && <Menu {...menu} paths={paths} />}
          {displayMenuProductsChild.value && <MenuProductsChild />}
        </Aside>
      }
    >
      <Drawer
        open={displayMenuProducts.value}
        onClose={() => displayMenuProducts.value = false}
        aside={
          <Aside
            displayMenu={displayMenu.value}
            title={productsChild.value.label}
            onClose={() => displayMenuProducts.value = false}
            chevronClick={() => {
              displayMenuProducts.value = false;
              displayMenu.value = true;
            }}
            open={displayMenuProducts.value}
            id={id}
          >
            <MenuProducts />
          </Aside>
        }
      >
        <Drawer // right drawer
          class="drawer-end"
          open={displayCart.value}
          onClose={() => displayCart.value = false}
          aside={
            <Aside
              title="SEU CARRINHO: "
              subtitle={`${items.length} ${
                items.length > 1 ? "ITENS" : "ITEM"
              }`}
              chevronClick={() => displayCart.value = false}
              onClose={() => displayCart.value = false}
              displayMenu={displayCart.value}
              open={displayCart.value}
              id={id}
              isMiniCart={true}
            >
              <Cart platform={platform} />
            </Aside>
          }
        >
          {children}
        </Drawer>
      </Drawer>
    </Drawer>
  );
}

export default Drawers;