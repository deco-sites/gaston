import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface SocialItem {
  label:
    | "Facebook"
    | "Instagram"
    | "Central";
  link: string;
}

export default function Social(
  { content, vertical = false }: {
    content?: { title?: HTMLWidget; items?: SocialItem[] };
    vertical?: boolean;
  },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-8 mt-8">
          <ul
            class={`flex justify-center ${
              vertical ? "lg:flex-col lg:items-start" : "items-center divide-x"
            }`}
          >
            {content.items.map((item) => {
              return (
                <li>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label} Logo`}
                    class="flex gap-2 items-center mx-9 lg:mx-5"
                  >
                    <span class="block p-1 rounded-full">
                      <Icon size={32} id={item.label} strokeWidth={1} />
                    </span>
                    {vertical && (
                      <div class="text-sm hidden lg:block">{item.label}</div>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
          {content.title &&
            (
              <>
                <div
                  class={`text-sm text-primary-content `}
                  dangerouslySetInnerHTML={{ __html: content.title }}
                />
              </>
            )}
        </div>
      )}
    </>
  );
}
