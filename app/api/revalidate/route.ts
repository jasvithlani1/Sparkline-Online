import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

type SanityWebhookPayload = {
  _type?: string;
  slug?: string | { current?: string };
};

function slugFromPayload(payload: SanityWebhookPayload) {
  if (typeof payload.slug === "string") return payload.slug;
  return payload.slug?.current ?? "";
}

function uniquePaths(paths: string[]) {
  return Array.from(new Set(paths));
}

function pathsForPayload(payload: SanityWebhookPayload) {
  const slug = slugFromPayload(payload);

  switch (payload._type) {
    case "service":
      return uniquePaths(["/services", ...(slug ? [`/services/${slug}`] : [])]);
    case "portfolioProject":
      return uniquePaths(["/", "/portfolio", ...(slug ? [`/portfolio/${slug}`] : [])]);
    case "blogPost":
      return uniquePaths(["/blogs", ...(slug ? [`/blogs/${slug}`] : [])]);
    default:
      return ["/", "/services", "/portfolio", "/blogs"];
  }
}

function getRequestSecret(request: Request) {
  const url = new URL(request.url);
  return request.headers.get("x-revalidate-secret") ?? url.searchParams.get("secret");
}

export async function POST(request: Request) {
  const configuredSecret = process.env.SANITY_REVALIDATE_SECRET;

  if (!configuredSecret) {
    return NextResponse.json({ error: "Revalidation is not configured." }, { status: 500 });
  }

  if (getRequestSecret(request) !== configuredSecret) {
    return NextResponse.json({ error: "Invalid revalidation secret." }, { status: 401 });
  }

  let payload: SanityWebhookPayload = {};

  try {
    payload = (await request.json()) as SanityWebhookPayload;
  } catch {
    payload = {};
  }

  const paths = pathsForPayload(payload);

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ ok: true, revalidated: paths });
}
