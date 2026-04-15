import { callGroq } from "@/lib/groq";

export async function POST(req) {
    try {
        const { original, generated, adAnalysis } = await req.json();

        // Validating the input
        if (!original || !generated || !adAnalysis) {
            return Response.json(
                { error: "Missing required inputs" },
                { status: 400 }
            );
        }

        const prompt = `
            You are a strict validation system.

            Your job is to detect if the generated content is safe and aligned.

            Return STRICT JSON:
            {
                "valid": true or false,
                "issues": ["..."]
            }
            
            Mark valid = false if ANY of these occur:
            - Content does NOT match ad intent
            - CTA is NOT aligned with the offer
            - New claims or hallucinations are introduced
            - Tone is inconsistent with ad
            - Structure or meaning significantly deviates from original

            Rules:
            - Be strict (fail on small inconsistencies)
            - Do NOT be lenient
            - Do NOT explain outside JSON

            Ad:
            ${JSON.stringify(adAnalysis)}

            Original Content:
            ${JSON.stringify(original)}

            Generated:
            ${JSON.stringify(generated)}
        `;

        const result = await callGroq(prompt);

        const cleaned = result
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        let parsed;

        try {
            parsed = JSON.parse(cleaned);
        } catch {
            return Response.json(
                { valid: false, issues: ["Invalid verifier response"]},
                { status: 500}
            );
        }

        // Validating the output
        const safeOutput = {
            valid: typeof parsed.valid === "boolean" ? parsed.valid : false,
            issues: Array.isArray(parsed.issues) ? parsed.issues : ["Unknown issue"]
        };

        return Response.json(safeOutput);

    } catch (err) {
        return Response.json(
            { valid: false, issues: ["Verification failed"] },
            { status: 500 }
        );
    }
}