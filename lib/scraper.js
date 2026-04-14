import axios from "axios";

const cheerio = require('cheerio');

export async function scrapePage(url) {
    try{
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
    
        return {
            headline: $("h1").first().text(),
            cta: $("button").first().text(),
            paragraph: $("p").first().text(),
        };
    } catch (err) {
        console.error("ERROR: ", err);
    }
}