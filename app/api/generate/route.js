import { callGroq } from "@/lib/groq";

export async function POST(req) {
    try {

        const { adAnalysis, pageContent } = await req.json();

        // Validating the input
        if (!adAnalysis || !pageContent) {
            return Response.json(
                { error: "Missing required inputs" },
                { status: 400 }
            );
        }

        const prompt = `
            You are an AI that improves landing page messaging to match ad intent.

            Goal:
            Align the landing page content with the ad while preserving structure.

            Return STRICT JSON:
            {
            "headline": "...",
            "cta": "...",
            "paragraph": "..."
            }

            Rules:
            - Do NOT change structure
            - Do NOT add new offers or claims
            - Use ONLY information present in the adAnalysis
            - Keep similar length to original
            - Maintain clarity and readability

            Focus:
            - Headline → reflect main offer + audience
            - CTA → align with action implied in ad
            - Paragraph → reinforce intent and tone


            Ad Analysis:
            ${JSON.stringify(adAnalysis)}

            Page Content:
            ${JSON.stringify(pageContent)}
        `;

        const result = await callGroq(prompt);

        // JSON output cleaned and returned
        const cleaned = result
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        let parsed;

        try {
            parsed = JSON.parse(cleaned);
        } catch {
            return Response.json(
                { error: "Invalid AI response format" },
                { status: 500 }
            );
        }

        // Validating the output
        const safeOutput = {
            headline: parsed.headline || pageContent.headline,
            cta: parsed.cta ||pageContent.cta,
            paragraph: parsed.paragraph || pageContent.paragraph
        };

        return Response.json(safeOutput);
    } catch (err) {
        return Reponse.json(
            { error: "Failed to generate content" },
            { status: 500 }
        );
    }
}