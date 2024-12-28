import * as puppeteer from "puppeteer";
import * as fs from "fs";
import * as path from "path";
import { parseLivemintPage } from "./scrapers/livemintScraper.js";
import { parseInxPage } from "./scrapers/inexpressScraper.js";
import { parseToiPage } from "./scrapers/toiScraper.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gnewsUrl =
  "https://news.google.com/read/CBMi7gFBVV95cUxNbUVJdnlXNmdXYkgtYTNtaXZ3UXVMQXlSendCZzRfUmlMcXNEcVp1cEllYVFJMWxra0VqcFJnZm11ZTJ0U29wRmxaYnFnZFVLUWZycTJLd2c3VXZNN255SUhPdEhZaEtuSUMyUGF5WFQ3Q1UzUXBIQUpoZno5cHJkLVRFVHZWX2g3c3BLd1NQR3VnaEo1b1gxM3F4NGxwMXJjQkN5ajM2SE4zOHVlVE5GN3VjZ24wcWk1QjJkdzJUZndNdjgyTV8tRGdWcVJsdHdYbEZ6VDhjbHFsa2VJTE1wUHctUkluX1RhWmFhN3pB0gHzAUFVX3lxTE80eHZNNFdoU0pZVi1Cb0d4QUJzQzZFZ2xJMDh5VWJpWVVaT19UUHR6X0pHX0ZlT2ZMeU1OYjl4SE9TY1h0d2E4OC1nNVV0UmlUSlRxeDlzRTVjSGRiVG81WDlkZUN0LWNwa0xuWU5oOElvNm1Oc0JsVTBnWTdIeTUtY2lYd0Qxd0tJaFR2VkVQb19XMmdqaHFydEpiM0lyODFmUmRleVl4QUhZS19fZGhyblpnMUR4SkVwRHpBNU5ieTA1TWhJQmlWRkY2VUQ3OWp4SmJuSDEwMm8xZzBseC1iWUdqczBrS3FnTTUtSkxnUTNKcw?hl=en-IN&gl=IN&ceid=IN%3Aen";

const fetchDomContent = async () => {
  console.log("Fetching DOM content");
  try {
    console.log("Launching browser");
    const browser = await puppeteer.launch();
    console.log("Opening a new page");
    const page = await browser.newPage();

    console.log("Searching the provided URL");
    await page.goto(gnewsUrl, {
      timeout: 30000,
      waitUntil: "domcontentloaded",
    });

    console.log("Waiting for redirections...");
    await new Promise((resolve) => setTimeout(resolve, 4000));

    const final_url = page.url();
    console.log(`Final URL: ${final_url}`);

    console.log("Fetching HTML...");
    const sourceCode = await page.content();
    console.log("Fetched HTML source");

    const docsDir = path.join(__dirname, "../docs");
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }

    fs.writeFileSync(path.join(docsDir, `file.html`), sourceCode, "utf-8");
    console.log("Saved the source code successfully");

    await browser.close();

    await parsefetchedPage(final_url.toString(), docsDir);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    throw err;
  }
};

const parsefetchedPage = async (final_url, docsDir) => {
  if (final_url.includes("livemint")) {
    fs.renameSync(
      path.join(docsDir, `file.html`),
      path.join(docsDir, `livemint.html`)
    );
    await parseLivemintPage(final_url);
    return;
  }
  if (final_url.includes("indianexpress")) {
    fs.renameSync(
      path.join(docsDir, `file.html`),
      path.join(docsDir, `inx.html`)
    );
    await parseInxPage(final_url);
    return;
  }
  if (final_url.includes("timesofindia")) {
    fs.renameSync(
      path.join(docsDir, `file.html`),
      path.join(docsDir, `toi.html`)
    );
    await parseToiPage(final_url);
    return;
  } else {
    console.log("The scraper for the given publisher is not ready yet.....");
  }
};

fetchDomContent();