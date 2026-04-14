import { callGroq } from "@/lib/groq";

export async function POST(req) {
    const { adText } = await req.json();

    const prompt = `
    Extract the following from this ad:
    - audience
    - offer
    - tone
    -intent
    
    Return ONLY JSON.

    Ad: ${adText}
    `;

    const result = await callGroq(prompt);

    // JSON output cleaned and returned
    const cleaned = result
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return Response.json(JSON.parse(cleaned));
}