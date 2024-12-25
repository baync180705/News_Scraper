const cheerio = require("cheerio");
const fs = require("fs");
const {fetchDomContent} = require("../fetchDomContent")
const URL = "https://timesofindia.indiatimes.com/world/rest-of-world/hong-kong-police-issue-arrest-warrants-and-bounties-for-six-activists/articleshow/116626079.cms";
const BASE_URL = "https://timesofindia.indiatimes.com"

const ParseToiPage = async () => {
    try{
        console.log('Parsing the html page using cheerio');

        const htmlContent = fs.readFileSync(`../../docs/toi.html`, "utf-8");

        const $ = cheerio.load(htmlContent);
        const $titleLink = $('link[rel="canonical"]')
        const $meta_tags = $('meta[name="keywords"]')
        const $meta_desc = $('meta[name="description"]')

        const endpoint = $titleLink.attr('href')
        const tags = $meta_tags.attr('content').split(",")       
        const heading = $('.HNMDR').text();
        const subHead = $meta_desc.attr("content");
        const article = $('._s30J.clearfix').text()

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
    await fetchDomContent(URL, "toi");
    await ParseToiPage();
}

orchestrateFlow()