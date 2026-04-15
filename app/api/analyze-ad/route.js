import { callGroq } from "@/lib/groq";

export async function POST(req) {
    try {
        const { adText } = await req.json();
    
        // Validating the input
        if (!adText || typeof adText !== "string" || adText.trim().length === 0) {
            return Response.json(
                { error: "Ad text is required" },
                { status: 400 }
            );
        }
        const prompt = `
        Extract structured information from the ad.

        Return STRICT JSON in this format:
        {
            "audience: "...",
            "offer": "...",
            "tone": "...",
            "intent": "..."
        }
        
        Rules:
        - Do NOT add extra text
        - Do NOT skip any field
        - Keep values concise

        Ad: 
        ${adText}
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
        } catch (err) {
            return Response.json(
                { error: "Invalid AI response format" },
                { status: 500 }
            );
        }

        // Validating output
        const safeOutput = {
            audience: parsed.audience || "General audience",
            offer: parsed.offer ||  "No clear offer",
            tone: parsed.tone || "Neutral",
            intent: parsed.intent || "General engagement"
        };
        
        return Response.json(safeOutput);

    } catch (err) {
        return Response.json(
            { err: "Failed to analyze ad" },
            { status: 500 }
        );
    }
}