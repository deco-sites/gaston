import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  alerts: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <div id={id} class="relative flex justify-center w-full xl:w-[50%]">
      <div class="flex md:justify-center w-11/12  xl:w-[50%]">
        <Slider class="carousel carousel-center bg-primary gap-6">
          {alerts.map((alert, index) => (
            <Slider.Item index={index} class="carousel-item w-full">
              <span class="text-secondary-content flex justify-center items-center h-[30px] w-full relative text-[0.7em]">
                {alert}
              </span>
            </Slider.Item>
          ))}
        </Slider>
        <Slider.PrevButton class="bg-transparent absolute -left-4 my-auto mx-0 h-[30px]">
          <Icon
            class="text-base-100"
            size={15}
            id="ChevronLeft"
            strokeWidth={3}
          />
        </Slider.PrevButton>
        <Slider.NextButton class="bg-transparent absolute -right-4 my-auto mx-0 h-[30px]">
          <Icon
            class="text-base-100"
            size={15}
            id="ChevronRight"
            strokeWidth={3}
          />
        </Slider.NextButton>
        <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
      </div>
    </div>
  );
}

export default Alert;
