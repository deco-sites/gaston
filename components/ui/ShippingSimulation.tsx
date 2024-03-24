import { Signal, useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import Button from "$store/components/ui/Button.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import type { SimulationOrderForm, SKU, Sla } from "apps/vtex/utils/types.ts";
import Icon from "deco-sites/gaston/components/ui/Icon.tsx";

export interface Props {
  items: Array<SKU>;
}

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") return `${time} dias úteis`;
  if (type === "d") return `${time} dias`;
  if (type === "h") return `${time} horas`;
};

function ShippingContent({ simulation }: {
  simulation: Signal<SimulationOrderForm | null>;
}) {
  const { cart } = useCart();

  const methods = simulation.value?.logisticsInfo?.reduce(
    (initial, { slas }) => [...initial, ...slas],
    [] as Sla[],
  ) ?? [];

  const locale = cart.value?.clientPreferencesData.locale || "pt-BR";
  const currencyCode = cart.value?.storePreferencesData.currencyCode || "BRL";

  if (simulation.value == null) {
    return null;
  }

  if (methods.length === 0) {
    return (
      <div class="p-2">
        <span>CEP inválido</span>
      </div>
    );
  }

  return (
    <ul class="flex flex-col gap-3 py-3">
      {methods.map((method) => (
        <li class="flex justify-between items-center border-base-200 not-first-child:border-t">
          <span class="text-sm min-w-[110px]">
            {method.name}
          </span>
          <span class="text-sm min-w-[110px]">
            até {formatShippingEstimate(method.shippingEstimate)}
          </span>
          <span class="text-sm text-primary font-semibold min-w-[60px]">
            {method.price === 0 ? "Grátis" : (
              formatPrice(method.price / 100, currencyCode, locale)
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ShippingSimulation({ items }: Props) {
  const postalCode = useSignal("");
  const loading = useSignal(false);
  const simulateResult = useSignal<SimulationOrderForm | null>(null);
  const { simulate, cart } = useCart();

  const handleSimulation = useCallback(async () => {
    if (postalCode.value.length !== 8) {
      return;
    }

    try {
      loading.value = true;
      simulateResult.value = await simulate({
        items: items,
        postalCode: postalCode.value,
        country: cart.value?.storePreferencesData.countryCode || "BRA",
      });
    } finally {
      loading.value = false;
    }
  }, []);

  return (
    <div class="collapse collapse-arrow text-primary-content border border-black border-opacity-10 rounded-lg">
      <input type="checkbox" class={`h-[50px] min-h-[50px]`} />
      <div class="collapse-title min-h-[50px] flex gap-3">
        <Icon
          id="TruckFast"
          width="20"
          height="17"
          strokeWidth={1}
          class={`text-primary`}
        />
        <span class={`text-sm font-medium text-primary-content`}>
          Confira o prazo de entrega
        </span>
      </div>
      <div class={`collapse-content flex flex-col gap-3`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSimulation();
          }}
          class={`relative flex`}
        >
          <input
            as="input"
            type="text"
            class="input input-bordered join-item rounded-[100px] bg-transparent border-black border-opacity-10 w-full"
            placeholder="Informe seu CEP"
            value={postalCode.value}
            maxLength={8}
            size={8}
            onChange={(e: { currentTarget: { value: string } }) => {
              postalCode.value = e.currentTarget.value;
            }}
          />
          <Button
            type="submit"
            loading={loading.value}
            class="join-item absolute right-2.5 top-1.5 bg-primary rounded-full w-9 h-9 min-h-9"
          >
            OK
          </Button>
        </form>

        <div>
          <div>
            <ShippingContent simulation={simulateResult} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingSimulation;
