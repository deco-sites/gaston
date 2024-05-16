import type { SectionProps } from "deco/types.ts";
import { HTMLWidget } from "apps/admin/widgets.ts";

export interface UxWriting {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  title: string;
  markupTitle?: boolean;
  description: HTMLWidget;
}

const DEFAULT_PROPS = {
  title: "Maculino",
  markupTitle: false,
  matcher: "/*",
  description:
    "Nulla vitae malesuada risus. Nam accumsan varius elementum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed nec quam quis nulla vehicula malesuada. Suspendisse sit amet lacus laoreet, interdum urna id, maximus arcu. Aliquam egestas porta ex, et tempus libero tempor vel. Morbi massa orci, faucibus nec venenatis in, cursus sit amet nibh. Ut sit amet metus libero.",
};

export interface Props {
  seoTexts?: UxWriting[];
}

function UxWriting(props: SectionProps<ReturnType<typeof loader>>) {
  const { seoText } = props;

  if (!seoText) {
    return null;
  }

  const { title, markupTitle, description } = seoText;

  return (
    <>
      <div class="w-full pt-6 pb-16 bg-base-300">
        <div
          class={`w-11/12 max-w-[1300px] mx-auto bg-base-100 rounded-3xl flex flex-col justify-center items-center gap-2.5 py-6 px-5 lg:py-8 lg:px-8 2xl:px-[124px] border border-black border-opacity-10`}
        >
          <h2
            class={`${
              markupTitle
                ? "bg-primary p-1 text-base-100"
                : "text-primary-content"
            } text-center italic font-bold text-2xl leading-7`}
          >
            {title}
          </h2>
          <div
            class={`text-sm uxWritingHref leading-[18px] text-primary-content font-normal text-center`}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </>
  );
}

export const loader = (props: Props, req: Request) => {
  const { seoTexts } = { ...DEFAULT_PROPS, ...props };

  const seoText = seoTexts?.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { seoText };
};

export default UxWriting;
