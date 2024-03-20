import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Breadcrumb from "deco-sites/gaston/components/ui/Breadcrumb.tsx";
import { AppContext } from "$store/apps/site.ts";
import type { SectionProps } from "deco/types.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  layout: {
    width: number;
    height: number;
  };
}

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(
  { page, layout, device }: SectionProps<typeof loader>,
) {
  const id = useId();

  if (!page) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const { image: images = [], isVariantOf } = product;
  const model = isVariantOf?.model || "";
  const aspectRatio = `${layout.width} / ${layout.height}`;
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };
  return (
    <div class={`flex flex-col gap-4 bg-base-300`}>
      <Breadcrumb
        itemListElement={breadcrumb.itemListElement}
        _class={`w-11/12 mx-auto`}
      />
      {device == "mobile" &&
        (
          <>
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
      <div id={id} class="grid grid-flow-row sm:grid-flow-col">
        {/* Image Slider */}
        <div class="relative order-1 sm:order-2">
          <Slider class="carousel carousel-center gap-6 w-screen sm:w-[40vw]">
            {images.map((img, index) => (
              <Slider.Item
                index={index}
                class="carousel-item w-full"
              >
                <Image
                  class="w-full"
                  src={img.url!}
                  alt={img.alternateName}
                  width={520}
                  height={520}
                  // Preload LCP image for better web vitals
                  preload={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </Slider.Item>
            ))}
          </Slider>

          <div class="absolute top-2 right-2 bg-base-100 rounded-full">
            <ProductImageZoom
              images={images}
              width={700}
              height={Math.trunc(700 * layout.height / layout.width)}
            />
          </div>
        </div>

        {/* Dots */}
        <ul class="carousel carousel-center gap-3 p-4 sm:px-0 sm:flex-col order-2 sm:order-1">
          {images.map((img, index) => (
            <li class="carousel-item min-w-[63px] sm:min-w-[100px]">
              <Slider.Dot index={index}>
                <Image
                  class="group-disabled:border-primary border-2 rounded-lg"
                  width={86}
                  height={86}
                  src={img.url!}
                  alt={img.alternateName}
                />
              </Slider.Dot>
            </li>
          ))}
        </ul>

        <SliderJS rootId={id} />
      </div>
    </div>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};
