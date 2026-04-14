import { scrapePage } from "@/lib/scraper";

export async function POST(req) {
    const { url } = await req.json();

    const data = await scrapePage(url);

    return Response.json(data);
}