import Avatar from "$store/components/ui/Avatar.tsx";
import { useState } from "preact/hooks";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { useUI } from "deco-sites/gaston/sdk/useUI.ts";
import Image from "apps/website/components/Image.tsx";

interface Props {
  product: Product;
}

function VariantSelector({ product }: Props) {
  const {
    skuIDCart,
    urlSkuVariant,
    productSimilar,
    imagesProductSimilar,
    productNameSimilar,
    productModelSimilar,
  } = useUI();
  const { url, isVariantOf, isSimilarTo } = product;
  const hasVariant = productSimilar.value?.isVariantOf?.hasVariant ??
    isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(
    hasVariant,
    productSimilar.value || product,
  );
  // Estado para controlar o estado ativo do Avatar
  const [activeVariant, setActiveVariant] = useState("");

  // Função para manipular o clique no botão
  function handleSku(skuID: string, value: string) {
    skuIDCart.value = skuID;
    // Atualizar o estado ativo
    setActiveVariant(value);
  }
  return (
    <ul class="flex flex-col-reverse gap-4">
      {Object.keys(possibilities).map((name) => (
        <>
          {name != "Cor" &&
            (
              <>
                <li class="flex flex-col gap-2 max-w-[100vw]">
                  <span class="text-sm leading-4 text-primary-content font-semibold">
                    {name == "Tamanho"
                      ? "Selecione o tamanho:"
                      : "Selecione a cor:"}
                  </span>
                  <ul class="flex flex-row gap-3 w-full overflow-x-scroll scrollbar-none pl-1">
                    {Object.entries(possibilities[name]).map(
                      ([value, link]) => {
                        return (
                          <li>
                            <button
                              class={`${
                                link.available == false
                                  ? "pointer-events-none"
                                  : ""
                              }`}
                              onClick={() => handleSku(link.productID, value)}
                            >
                              <Avatar
                                content={value}
                                variant={link.available == false
                                  ? "disabled"
                                  : (activeVariant === value
                                    ? "active"
                                    : "default")}
                              />
                            </button>
                          </li>
                        );
                      },
                    )}
                  </ul>
                </li>
              </>
            )}
        </>
      ))}
      {isSimilarTo && isSimilarTo.length > 0 &&
        (
          <li class="flex flex-col gap-2 max-w-[100vw]">
            <span class="text-sm leading-4 text-primary-content font-semibold">
              Selecione a cor:
            </span>
            <ul class="flex flex-row gap-3 w-full overflow-x-scroll scrollbar-none pl-1">
              {isSimilarTo?.map((product) => {
                return (
                  <>
                    <li>
                      {product.image &&
                        (
                          <>
                            {product.image[0] &&
                              (
                                <>
                                  <button
                                    class={`w-full flex`}
                                    onClick={() => {
                                      urlSkuVariant.value =
                                        product.url?.split("?")[0] || "";
                                      productSimilar.value = product;
                                      if (product.image) {
                                        imagesProductSimilar.value =
                                          product.image;
                                      }
                                      skuIDCart.value = "";
                                      productNameSimilar.value =
                                        product.isVariantOf?.name || "";
                                      productModelSimilar.value =
                                        product.isVariantOf?.model || "";
                                      setActiveVariant("");
                                    }}
                                  >
                                    <Image
                                      class={`w-[70px] h-[70px] rounded-lg ${
                                        urlSkuVariant.value != ""
                                          ? urlSkuVariant.value ==
                                              product.url?.split("?")[0]
                                            ? "border-2 border-primary"
                                            : ""
                                          : url?.split("?")[0] ==
                                              product.url?.split("?")[0] &&
                                            "border-2 border-primary"
                                      }`}
                                      src={product.image[0].url || ""}
                                      alt={product.isVariantOf?.name || ""}
                                      width={70}
                                      height={70}
                                      loading={"eager"}
                                    />
                                  </button>
                                </>
                              )}
                          </>
                        )}
                    </li>
                  </>
                );
              })}
            </ul>
          </li>
        )}
    </ul>
  );
}

export default VariantSelector;
