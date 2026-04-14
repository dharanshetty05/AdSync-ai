import { callGroq } from "@/lib/groq";

export async function POST(req) {
    const { original, generated, adAnalysis } = await req.json();

    const prompt = `
        You are a strict JSON generator.

        Check:
        1. Does it match the ad intent?
        2. Is CTA aligned with the offer?
        3. Any hallucinated or new claims?
        4. Tone consistency?

        Return ONLY valid JSON:
        No explanation.
        No markdown.
        No extra text.

        Format:
        {
            "valid": true or false,
            "issues": ["..."]
        }

        Ad:
        ${JSON.stringify(adAnalysis)}

        Generated:
        ${JSON.stringify(generated)}
    `;

    const result = await callGroq(prompt);

    console.log("RAW LLM OUTPUT", result);

    const cleaned = result
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return Response.json(JSON.parse(cleaned));
}