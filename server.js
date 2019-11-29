
var request = require('request');
var cheerio = require('cheerio');
var express = require("express");
console.log("working!");

const mongojs = require('mongojs');
const db = mongojs('localhost:', [collections])

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});



request('https://www.nytimes.com/', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const world = $('.css-8atqhb');
        // '.css-8atqhb'

        // console.log(title);

        // console.log(title.html());

        // console.log(title.text());

        // const output = title.find('h2').text().split(".");

        // const output = title.find('h2').text().split(':');
        // // split(":");
        // console.log(output);
        // console.log("_______");
        // for (i = 0; i < output.length; i++){
        //     console.log(output[i]);

        //     // for (j = 0; i < output[i].length; j++){
        //     //     if (j == " ");
        //     //     console.log(output[i][j]);
        //     // }
        //     // if (output[i] == " "){
        //     //     console.log("found a space");
        //     // }
        // }

        $('.css-8atqhb').each((i, el) => {
            const title = $(el).find('h2').text();
            const paragraph = $(el).find('ul').text();
            const paragraph2 = $(el).find('p').text();
            // const item = $(el).text();

            console.log("     "); 
            console.log("___________________________________________________________");
            console.log(title);
            console.log("    ------------   ");
            console.log(paragraph);
            console.log(paragraph2);
            console.log("___________________________________________________________");
            console.log("     ");

            // Write Headers / Write Row to CSV
            // writeStream.write(`title, paragraph, paragraph2 \n`)
            // writeStream.write(`${title}, ${paragraph}, ${paragraph2} \n`);
        });

        console.log('Scraping Done...')
    }
});

// articles separated by article tabs 
const PORT = process.env.PORT || 3000;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./index.html'))


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});
// Send every other request to the React app
// Define any API routes before this runs

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});