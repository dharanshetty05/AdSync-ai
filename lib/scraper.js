import axios from "axios";
const cheerio = require('cheerio');

export async function scrapePage(url) {
    try{
        const { data } = await axios.get(url, {
            timeout: 8000,
            headers: {
                "User-Agent": "Mozilla/5.0",
            },
        });

        const $ = cheerio.load(data);

        // Fallback
        const headline =
            $("h1").first().text().trim() ||
            $("title").text().trim() ||
            "No headline found";            
    
        const cta =
            $("button").first().text().trim() ||
            $("a").text().trim() ||
            "Learn More";

        const paragraph =
            $("p").first().text().trim() ||
            $("meta[name='description']").attr("content") ||
            "No content available";

        return { headline, cta, paragraph };

    } catch (err) {
        console.error("Scraper Error: ", err.message);
        throw new Error("Unable to fetch landing page");
    }
}