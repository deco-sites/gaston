import { FreshContext } from "$fresh/server.ts";

export async function handler(
    req: Request,
    ctx: FreshContext<xpto>,
) {

    const resp = await ctx.next();

    console.log("req", req.headers)

    if (req.headers.get("upgrade") === "websocket") {
        return resp;
    }

    action(resp);
    setLogger(null);

    return resp;
}

// Funções auxiliares (exemplos)
function action(response: Response) {
    // Modifica a resposta de alguma forma
    response.headers.set("Strict-Transport-Security", "max-age=604800; includeSubDomains; preload");
}

function setLogger(logger: any) {
    // Configura ou desativa o logger
    console.log("Logger set to:", logger);
}