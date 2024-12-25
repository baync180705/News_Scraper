const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path")

const fetchDomContent = async(URL, publisher)=>{
    console.log("Fetching DOM content")
    try{
        console.log("Launching browser");
        const browser = await puppeteer.launch();
        console.log("Opening a new page");
        const page = await browser.newPage();
        console.log("Searching the provided URL")
        await page.goto(URL, {timeout:0, waitUntil: 'domcontentloaded'});
    
        console.log("Fetching HTML...");
        const sourceCode = await page.content();
        console.log("Fetched HTML source");

        fs.writeFileSync(path.join(__dirname, '../docs', `${publisher}.html`), sourceCode, 'utf-8');
        console.log("Save the source code successfully");

    }catch(err){
        console.log(`ERROR: ${err}`);
    }
}

module.exports = {fetchDomContent}