import type { ComponentChildren } from "preact";

export interface Props {
  children: ComponentChildren;
}

export default function ContainerContent({ children }: Props) {
  return (
    <div class={`py-8 px-10 rounded-2xl gap-8 flex flex-col bg-base-100`}>
      {children}
    </div>
  );
}
