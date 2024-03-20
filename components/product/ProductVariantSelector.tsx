import Avatar from "$store/components/ui/Avatar.tsx";
import { useState } from "preact/hooks";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { useUI } from "deco-sites/gaston/sdk/useUI.ts";

interface Props {
  product: Product;
}

function VariantSelector({ product }: Props) {
  const { url, isVariantOf, productID } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);
  const { skuIDCart } = useUI();
  // Estado para controlar o estado ativo do Avatar
  const [activeVariant, setActiveVariant] = useState("");

  // Função para manipular o clique no botão
  function handleSku(skuID: string, value: string) {
    skuIDCart.value = skuID;
    console.log(skuID);
    // Atualizar o estado ativo
    setActiveVariant(value);
  }

  return (
    <ul class="flex flex-col-reverse gap-4">
      {Object.keys(possibilities).map((name) => (
        <li class="flex flex-col gap-2">
          <span class="text-sm leading-4 text-primary-content font-semibold">
            {name == "Tamanho" ? "Selecione o tamanho:" : "Selecione a cor:"}
          </span>
          <ul class="flex flex-row gap-3">
            {Object.entries(possibilities[name]).map(([value, link]) => {
              return (
                <li>
                  <button
                    class={`${
                      link.available == false ? "pointer-events-none" : ""
                    }`}
                    onClick={() => handleSku(link.productID, value)}
                  >
                    <Avatar
                      content={value}
                      variant={link.available == false
                        ? "disabled"
                        : (activeVariant === value ? "active" : "default")}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default VariantSelector;
