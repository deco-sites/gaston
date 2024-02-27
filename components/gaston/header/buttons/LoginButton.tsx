import { useUI } from "$store/sdk/useUI.ts";
import IconUser from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/user.tsx";

export interface Props {
  loginHref: string;
}

export default function LoginButton({ loginHref }: Props) {
  const { userLogged, userEmail } = useUI();

  return (
    <a
      class="flex items-center gap-2"
      href={userLogged.value ? "/account" : loginHref}
      aria-label="Entre ou Cadastre-se"
    >
      <div class="bg-primary-content p-1 rounded-full">
        <IconUser class="w-6 h-6 text-base-300" />
      </div>
      <p class="text-[1rem] text-base-300">
        {!userLogged.value
          ? (
            <>
              Entre ou <br /> Cadastre-se
            </>
          )
          : (
            <>
              {userEmail.value}
            </>
          )}
      </p>
    </a>
  );
}
