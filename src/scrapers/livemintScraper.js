const cheerio = require("cheerio");
const fs = require("fs");
const {fetchDomContent} = require("../fetchDomContent")
const URL = "https://www.livemint.com/news/himachal-weather-1-000-vehic700-tourists-to-safe-places-as-heavy-snowfall-hits-manali-imd-issues-severe-coldwave-alert-11735005905364.html";
const BASE_URL = "https://www.livemint.com";

const parseLivemintPage = async () => {
    try{
        console.log('Parsing the html page using cheerio');

        const htmlContent = fs.readFileSync(`../../docs/livemint.html`, "utf-8");

        const $ = cheerio.load(htmlContent);
        const $meta = $('.midSec.ga-tracking')

        const endpoint = $meta.attr('data-weburl')
        const tags = $meta.attr('data-keyword').split(",")       
        const heading = $('#article-0').text();
        const subHead = $('.storyPage_summary__Ge5SX').text();
        const article = $('.storyPage_storyContent__m_MYl').text()

        console.log(`\nENDPOINT: ${endpoint}`);
        console.log(`\nTAGS: ${tags}`);
        console.log(`\nTITLE: ${heading}`);
        console.log(`\nSUBTITLE: ${subHead}`);
        console.log(`\nARTICLE:\n ${article}`);
    }catch(err){
        console.log(`ERROR: ${err}`);
    }
}

const orchestrateFlow = async () => {
    await fetchDomContent(URL, "livemint");
    await parseLivemintPage();
}

orchestrateFlow()
