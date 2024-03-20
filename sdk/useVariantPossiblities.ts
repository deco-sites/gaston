import type { ProductLeaf, PropertyValue } from "apps/commerce/types.ts";
import { useOffer } from "deco-sites/gaston/sdk/useOffer.ts";

export type Possibilities = Record<
  string,
  Record<
    string,
    { url: string | undefined; available: boolean; productID: string }
  >
>;

const hash = ({ name, value }: PropertyValue) => `${name}::${value}`;

const omit = new Set(["category", "cluster", "RefId", "descriptionHtml"]);

export const useVariantPossibilities = (
  variants: ProductLeaf[],
  selected: ProductLeaf,
): Possibilities => {
  const possibilities: Possibilities = {};
  const selectedSpecs = new Set(selected.additionalProperty?.map(hash));
  for (const variant of variants) {
    const { url, additionalProperty = [], productID, offers } = variant;
    const { availability } = useOffer(offers);
    const isSelected = productID === selected.productID;
    const specs = additionalProperty.filter(({ name }) => !omit.has(name!));

    for (let it = 0; it < specs.length; it++) {
      const name = specs[it].name!;
      const value = specs[it].value!;
      if (omit.has(name)) continue;

      if (!possibilities[name]) {
        possibilities[name] = {};
      }

      // First row is always selectable
      const isSelectable = it === 0 ||
        specs.every((s) => s.name === name || selectedSpecs.has(hash(s)));

      possibilities[name][value] = {
        url: isSelected
          ? url
          : isSelectable
          ? possibilities[name][value]?.url || url
          : possibilities[name][value]?.url,
        available: availability == "https://schema.org/InStock", // Assuming availability is represented as a number indicating the quantity available
        productID: isSelected
          ? productID
          : possibilities[name][value]?.productID || productID,
      };
    }
  }

  return possibilities;
};
