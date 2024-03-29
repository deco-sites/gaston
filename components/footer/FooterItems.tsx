import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export default function FooterItems(
  { sections, justify = false }: { sections: Section[]; justify: boolean },
) {
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          <ul
            class={`hidden md:flex flex-row gap-6 lg:gap-12 lg:w-full ${
              justify && "lg:justify-between"
            }`}
          >
            {sections.map((section) => (
              <li class={`border-l border-gray-200 pl-10`}>
                <div class="flex flex-col gap-2">
                  <span class="font-bold text-lg text-primary-content">
                    {section.label}
                  </span>
                  <ul class={`flex flex-col gap-2 flex-wrap text-sm`}>
                    {section.items?.map((item) => (
                      <li>
                        <a
                          href={item.href}
                          class="block py-1 link link-hover text-primary-content"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile view */}
          <ul class="flex flex-col md:hidden gap-10">
            {sections.map((section) => (
              <li>
                <span class={"text-base text-primary-content font-bold"}>
                  {section.label}
                </span>
                <ul class={`flex flex-col gap-1 pt-2`}>
                  {section.items?.map((item) => (
                    <li>
                      <a
                        href={item.href}
                        class="text-black opacity-60 font-thin text-base"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
