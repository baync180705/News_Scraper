import * as fs from "fs"
import * as cheerio from "cheerio";
const BASE_URL = "https://www.livemint.com";

export const parseLivemintPage = async (URL) => {
    try{
        console.log('Parsing the html page using cheerio');

        const htmlContent = fs.readFileSync(`../docs/livemint.html`, "utf-8");

        const $ = cheerio.load(htmlContent);
        const $meta = $('.midSec.ga-tracking')

        const endpoint = $meta.attr('data-weburl') || URL
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
