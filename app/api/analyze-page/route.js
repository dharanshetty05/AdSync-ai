import { scrapePage } from "@/lib/scraper";

export async function POST(req) {
    try {
        const { url } = await req.json();

        // Validating the URL
        if (!url || typeof url !== "string") {
            return Response.json(
                { error: "URL is required" },
                { status: 400 }
            );
        }

        try {
            new URL(url);
        } catch {
            return Response.json(
                { error: "Invalid URL format" },
                { status: 400 }
            );
        }

        const data = await scrapePage(url);

        // Output structure
        const safeOutput = {
            headline: data?.headline || "No headline found",
            cta: data?.cta || "Learn More",
            paragraph: data?.paragraph || "No content available"
        };

        return Response.json(safeOutput);

    } catch (err) {
        return Response.json(
            { error: "Unable to fetch landing page" },
            { status: 500 }
        );
    }
}