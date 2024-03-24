import { useSignal } from "@preact/signals";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";

export interface Props {
  productID: string;
  productGroupID?: string;
  variant?: "icon" | "full";
  removeItem: () => Promise<void>;
  addItem: () => Promise<void>;
  loading: boolean;
  inWishlist: boolean;
  isUserLoggedIn: boolean;
}

function ButtonCommon({
  variant = "icon",
  productGroupID,
  productID,
  loading,
  inWishlist,
  isUserLoggedIn,
  removeItem,
  addItem,
}: Props) {
  const fetching = useSignal(false);

  return (
    <Button
      class={`absolute right-3 top-3 ${
        variant === "icon"
          ? "btn-circle btn-ghost gap-2"
          : "btn-primary btn-outline gap-2"
      } bg-base-content h-11 min-h-11 w-11 lg:h-[42px] lg:min-h-[42px] lg:w-[42px]`}
      loading={fetching.value}
      aria-label="Add to wishlist"
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (!isUserLoggedIn) {
          globalThis.window.alert(
            "Please log in before adding to your wishlist",
          );

          return;
        }

        if (loading) {
          return;
        }

        try {
          fetching.value = true;

          if (inWishlist) {
            await removeItem();
          } else if (productID && productGroupID) {
            await addItem();

            sendEvent({
              name: "add_to_wishlist",
              params: {
                items: [
                  {
                    item_id: productID,
                    item_group_id: productGroupID,
                    quantity: 1,
                  },
                ],
              },
            });
          }
        } finally {
          fetching.value = false;
        }
      }}
    >
      <Icon
        id="Heart"
        stroke-width="1"
        class="w-5 h-[19px]"
        fill={inWishlist ? "text-primary" : "none"}
      />
      {variant === "icon" ? null : inWishlist ? "Remover" : "Favoritar"}
    </Button>
  );
}

export default ButtonCommon;
