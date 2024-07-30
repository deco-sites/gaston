import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";
import ImageComponent from "apps/website/components/Image.tsx";
import { navbarHeight } from "deco-sites/gaston/components/header/constants.ts";

interface Props {
  h1?: string;
  isHome: boolean;
  src?: LiveImage;
  alt?: string;
}

export function LogoDesktop(props: Props) {
  const { h1, isHome, src, alt } = props;

  if (src == null || alt == null) {
    return null;
  }

  if (isHome) {
    return (
      <h1
        class="flex items-center py-3 h-[30px] w-[117px]"
        style={{ minHeight: navbarHeight }}
      >
        <span class={"sr-only"}>{h1}</span>
        <a
          href="/"
          aria-label="Store logo"
          class="flex-grow justify-center flex items-center w-full h-full"
          style={{ minHeight: navbarHeight }}
        >
          <ImageComponent
            class="w-full"
            src={src}
            alt={alt}
            width={110}
            height={28}
          />
        </a>
      </h1>
    );
  }

  return (
    <a
      href="/"
      aria-label="Store logo"
      class="flex items-center py-3 h-[30px] w-[117px]"
    >
      <ImageComponent
        class="w-full"
        src={src}
        alt={alt}
        width={117}
        height={30}
      />
    </a>
  );
}

export function LogoMobile(props: Props) {
  const { h1 = "Gaston", isHome, src, alt } = props;

  if (src == null || alt == null) {
    return null;
  }

  if (isHome) {
    return (
      <h1
        class="flex items-center py-3 h-[42px] w-[238px"
        style={{ minHeight: navbarHeight }}
      >
        <span class={"sr-only"}>{h1}</span>
        <a
          href="/"
          class="flex-grow justify-center flex items-center w-full h-full"
          style={{ minHeight: navbarHeight }}
          aria-label="Store logo"
        >
          <ImageComponent
            class="object-contain"
            src={src}
            alt={alt}
            width={110}
            height={28}
          />
        </a>
      </h1>
    );
  }

  return (
    <a
      href="/"
      class="flex-grow justify-center flex items-center h-[42px] w-[238px] object-contain"
      style={{ minHeight: navbarHeight }}
      aria-label="Store logo"
    >
      <ImageComponent
        class="object-contain"
        src={src}
        alt={alt}
        width={110}
        height={28}
      />
    </a>
  );
}
