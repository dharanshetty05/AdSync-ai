import { callGroq } from "@/lib/groq";

export async function POST(req) {
    const { adAnalysis, pageContent } = await req.json();

    const prompt = `
        Rewrite the landing page content to match the ad.

        Rules:
        - Do NOT change structure
        - Keep same meaning
        - Improve alignment

        Return ONLY JSON with:
        headline, cta, paragraph

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

    return Response.json(JSON.parse(cleaned));
}