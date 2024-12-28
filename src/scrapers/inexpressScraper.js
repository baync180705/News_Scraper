import * as fs from "fs"
import * as cheerio from "cheerio";
const BASE_URL = "https://indianexpress.com"


export const parseInxPage = async (URL) => {
    try{
        console.log('Parsing the html page using cheerio');

        const htmlContent = fs.readFileSync(`../docs/inx.html`, "utf-8");

        const $ = cheerio.load(htmlContent);
        const $titleLink = $('meta[property="og:title"]')
        const $meta_url = $('meta[property="og:url"]')
        const $meta_tags = $('meta[name="news_keywords"]')
        const $meta_desc = $('meta[property="og:description"]')
        const $article = $('#pcl-full-content')
        $article.find("#id_subscription_notifier, .osv-ad-class").remove();

        const endpoint = $meta_url.attr('content') || URL;
        const tags = $meta_tags.attr('content').split(",")       
        const heading = $titleLink.attr("content");
        const subHead = $meta_desc.attr("content");
        const article = $article.text();

        console.log(`\nENDPOINT: ${endpoint}`);
        console.log(`\nTAGS: ${tags}`);
        console.log(`\nTITLE: ${heading}`);
        console.log(`\nSUBTITLE: ${subHead}`);
        console.log(`\nARTICLE:\n ${article}`);
    }catch(err){
        console.log(`ERROR: ${err}`);
    }
}