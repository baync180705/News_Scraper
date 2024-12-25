const cheerio = require("cheerio");
const fs = require("fs");
const {fetchDomContent} = require("../fetchDomContent")
const URL = "https://indianexpress.com/article/india/vice-president-jagdeep-dhankhar-reacts-to-oppositions-no-trust-motion-against-him-9742696/";
const BASE_URL = "https://indianexpress.com"


const ParseInxPage = async () => {
    try{
        console.log('Parsing the html page using cheerio');

        const htmlContent = fs.readFileSync(`../../docs/inx.html`, "utf-8");

        const $ = cheerio.load(htmlContent);
        const $titleLink = $('meta[property="og:title"]')
        const $meta_url = $('meta[property="og:url"]')
        const $meta_tags = $('meta[name="news_keywords"]')
        const $meta_desc = $('meta[property="og:description"]')
        const $article = $('#pcl-full-content')
        $article.find("#id_subscription_notifier, .osv-ad-class").remove();

        const endpoint = $meta_url.attr('content');
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

const orchestrateFlow = async () => {
    await fetchDomContent(URL, "inx");
    await ParseInxPage();
}

orchestrateFlow()