import { SendEventOnView } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import AddToCartButtonLinx from "$store/islands/AddToCartButton/linx.tsx";
import AddToCartButtonShopify from "$store/islands/AddToCartButton/shopify.tsx";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "$store/islands/AddToCartButton/wake.tsx";
import AddToCartButtonNuvemshop from "$store/islands/AddToCartButton/nuvemshop.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import WishlistButtonVtex from "../../islands/WishlistButton/vtex.tsx";
import WishlistButtonWake from "../../islands/WishlistButton/wake.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "./ProductVariantSelector.tsx";
import { AppContext } from "$store/apps/site.ts";
import type { SectionProps } from "deco/types.ts";
import GallerySlider from "deco-sites/gaston/components/product/Gallery/ImageSlider.tsx";

interface Props {
  page: ProductDetailsPage | null;
  layout: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
}

function ProductInfo({ page, layout, device }: SectionProps<typeof loader>) {
  const platform = usePlatform();
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { product, breadcrumbList } = page;
  const {
    productID,
    offers,
    name = "",
    gtin,
    isVariantOf,
    additionalProperty = [],
    image: images = [],
  } = product;
  const description = product.description || isVariantOf?.description;
  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
  const model = isVariantOf?.model || "";
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const eventItem = mapProductToAnalyticsItem({
    product,
    price,
    listPrice,
  });

  return (
    <div class={`flex flex-col gap-4 bg-base-300`}>
      {device == "mobile" &&
        (
          <>
            <Breadcrumb
              itemListElement={breadcrumb.itemListElement}
              _class={`w-11/12 mx-auto max-w-[1300px]`}
            />
            <div class="w-11/12 mx-auto sm:mt-8">
              <h1 class={`text-xl leading-6 font-bold text-primary-content`}>
                {isVariantOf?.name}
              </h1>
              {model && (
                <span class="text-xs text-primary-content">Ref: {model}</span>
              )}
            </div>
          </>
        )}
      <div
        class={`flex flex-col gap-3 lg:flex-row lg:justify-between lg:w-11/12 lg:mx-auto lg:max-w-[1300px] lg:gap-10`}
      >
        <div class={`flex flex-col gap-3`}>
          {device == "desktop" &&
            (
              <>
                <Breadcrumb
                  itemListElement={breadcrumb.itemListElement}
                  _class={`mt-9 pt-0 pb-2.5 mb-2.5 border-b border-black border-opacity-15`}
                />
              </>
            )}
          <GallerySlider
            images={images}
            productID={productID}
            productGroupID={productGroupID}
          />
        </div>
        <div class={`flex flex-col gap-3 lg:w-[45%] lg:max-w-[530px] lg:mt-9`}>
          {device == "desktop" &&
            (
              <>
                <div class="flex flex-col gap-4">
                  {model && (
                    <span class="text-sm text-primary-content">
                      Ref: {model}
                    </span>
                  )}
                  <h1
                    class={`text-2xl leading-7 font-bold text-primary-content`}
                  >
                    {isVariantOf?.name}
                  </h1>
                </div>
                <div class="flex flex-col gap-2 border-b border-black border-opacity-15 pb-4">
                  <div class={`flex gap-2 items-end`}>
                    {(listPrice ?? 0) > price && (
                      <span class="line-through text-primary-content text-sm font-semibold leading-4">
                        {formatPrice(listPrice, offers?.priceCurrency)}
                      </span>
                    )}
                    <span class="font-bold text-2xl text-primary leading-7">
                      {formatPrice(price, offers?.priceCurrency)}
                    </span>
                  </div>
                  <span class="text-sm text-primary-content font-bold leading-4">
                    {installments}
                  </span>
                </div>
              </>
            )}
          {/* Sku Selector */}
          <div class="w-11/12 mx-auto lg:w-full">
            <ProductSelector product={product} />
          </div>
          {device == "desktop" &&
            (
              <>
                {availability === "https://schema.org/InStock"
                  ? (
                    <>
                      {platform === "vtex" && (
                        <>
                          <AddToCartButtonVTEX
                            eventParams={{ items: [eventItem] }}
                            productID={productID}
                            seller={seller}
                          />
                        </>
                      )}
                    </>
                  )
                  : <OutOfStock productID={productID} />}
              </>
            )}
          {/* Shipping Simulation */}
          <div class="w-11/12 mx-auto lg:w-full">
            {platform === "vtex" && (
              <ShippingSimulation
                items={[
                  {
                    id: Number(product.sku),
                    quantity: 1,
                    seller: seller,
                  },
                ]}
              />
            )}
          </div>
          {device == "mobile" &&
            (
              <>
                {/* Add to Cart and Favorites button */}
                <div class="z-40 fixed bottom-0 w-full bg-white border-t border-black border-opacity-10 flex flex-col gap-4 p-4">
                  {/* Prices */}
                  <div class="flex flex-row gap-2 items-center">
                    {(listPrice ?? 0) > price && (
                      <span class="line-through text-primary-content text-sm font-semibold leading-4">
                        {formatPrice(listPrice, offers?.priceCurrency)}
                      </span>
                    )}
                    <span class="font-bold text-2xl text-primary leading-7">
                      {formatPrice(price, offers?.priceCurrency)}
                    </span>
                    <span class="border-l border-black border-opacity-15 pl-3 text-sm text-primary-content font-bold leading-4">
                      {installments}
                    </span>
                  </div>
                  {availability === "https://schema.org/InStock"
                    ? (
                      <>
                        {platform === "vtex" && (
                          <>
                            <AddToCartButtonVTEX
                              eventParams={{ items: [eventItem] }}
                              productID={productID}
                              seller={seller}
                            />
                          </>
                        )}
                        {platform === "wake" && (
                          <>
                            <AddToCartButtonWake
                              eventParams={{ items: [eventItem] }}
                              productID={productID}
                            />
                            <WishlistButtonWake
                              variant="full"
                              productID={productID}
                              productGroupID={productGroupID}
                            />
                          </>
                        )}
                        {platform === "linx" && (
                          <AddToCartButtonLinx
                            eventParams={{ items: [eventItem] }}
                            productID={productID}
                            productGroupID={productGroupID}
                          />
                        )}
                        {platform === "vnda" && (
                          <AddToCartButtonVNDA
                            eventParams={{ items: [eventItem] }}
                            productID={productID}
                            additionalProperty={additionalProperty}
                          />
                        )}
                        {platform === "shopify" && (
                          <AddToCartButtonShopify
                            eventParams={{ items: [eventItem] }}
                            productID={productID}
                          />
                        )}
                        {platform === "nuvemshop" && (
                          <AddToCartButtonNuvemshop
                            productGroupID={productGroupID}
                            eventParams={{ items: [eventItem] }}
                            additionalProperty={additionalProperty}
                          />
                        )}
                      </>
                    )
                    : <OutOfStock productID={productID} />}
                </div>
              </>
            )}
          {/* Description card */}
          <div class="mt-4 sm:mt-6">
            <span class="text-sm">
              {description && (
                <details>
                  <summary class="cursor-pointer">Descrição</summary>
                  <div
                    class="ml-2 mt-2"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </details>
              )}
            </span>
          </div>
          {/* Analytics Event */}
          <SendEventOnView
            id={id}
            event={{
              name: "view_item",
              params: {
                item_list_id: "product",
                item_list_name: "Product",
                items: [eventItem],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};

export default ProductInfo;
