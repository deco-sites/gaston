import { FreshContext } from "$fresh/server.ts";

export async function handler(
    req: Request,
    ctx: FreshContext<xpto>,
) {
    const resp = await ctx.next();
    resp.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    return resp;
}