// deno-lint-ignore-file no-explicit-any
import { useUI } from "$store/sdk/useUI.ts";
import Button from "$store/components/ui/Button.tsx";

function MenuProducts() {
  const { productsChild2, displayMenuProducts } = useUI();

  return (
    <div>
      <ul class="w-full h-full bg-white">
        {productsChild2.value.children.map((node: any) => (
          <li class="w-full">
            <a
              href={node.href}
              class="flex items-center justify-between w-full text-primary-content uppercase px-4 py-4 border-b-[1px] font-medium text-sm border-black border-opacity-10"
            >
              {node.label}
            </a>
          </li>
        ))}
        <li class="w-full">
          <Button
            class="py-3 border-none uppercase w-full text-primary-content bg-white hover:bg-inherit text-left"
            onClick={() => {
              displayMenuProducts.value = false;
            }}
          >
            {productsChild2.value.href && (
              <a
                class="uppercase font-bold w-full text-primary"
                href={productsChild2.value.href}
              >
                {`Ver tudo em ${productsChild2.value.label}`}
              </a>
            )}
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default MenuProducts;
