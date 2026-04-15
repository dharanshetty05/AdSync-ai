export async function callGroq(prompt) {
    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}` ,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            throw new Error(`Groq API error: ${response.status}`);
        }
    
        const data = await response.json();
        
        const content = data?.choices?.[0]?.message?.content;

        if (!content) {
            throw new Error("Invalid Groq response structure");
        }

        return content;
    } catch (err) {
        console.error("Groq error:", err.message);

        // Retry once (optional)
        try {
            const retry = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [{ role: "user", content: prompt }],
                    temperature: 0.7,
                }),
            });

            const retryData = await retry.json();
            return retryData?.choices?.[0]?.message?.content || "";
        } catch {
            throw new Error("Groq request failed after retry");
        }
    }
}