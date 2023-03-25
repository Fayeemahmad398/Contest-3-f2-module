var puppeteer = require("puppeteer");

async function extractRepoFromGithub() {
  var browser = await puppeteer.launch({ headless: false },{
args:"__start-maximized"});
  var page = await browser.newPage();
  await page.goto("https://github.com/trending/javascript");

  var AllDeveloperRepo = await page.evaluate(function () {
    var language1 = Array.from(
      document.querySelectorAll("span[itemprop='programmingLanguage']")
    );

    var lang = [];
    language1.forEach((element) => {
      lang.push(element.textContent);
    });

    var title_ = [];
    var title1 = Array.from(
      document.querySelectorAll(".Box-row .lh-condensed>a")
    );

    title1.forEach((element) => {
      title_.push(element.textContent.trim());
    });

    var descrip = [];
    var description1 = Array.from(document.querySelectorAll(".lh-condensed+p"));

    description1.forEach((element) => {
      descrip.push(element.textContent.trim());
    });

    var star_ = [];
    var star1 = Array.from(
      document.querySelectorAll(".Box-row .color-fg-muted span+a")
    );

    star1.forEach((element) => {
      star_.push(element.textContent.trim());
    });

    var fork = [];

    var fork1 = Array.from(
      document.querySelectorAll(".Box-row .color-fg-muted span+a+a")
    );

    fork1.forEach((element) => {
      fork.push(element.textContent.trim());
    });

    var arrOfObject = [];

    for (let i = 0; i < 25; i++) {
      var obj = {
        title: title_[i],
        description: descrip[i],
        star: star_[i],
        fork: fork[i],
        language: lang[i],
      };
      arrOfObject.push(obj);
    }
    return arrOfObject;
  });

  // Printing All repos
  console.log(AllDeveloperRepo);

  // Lets Save data in json file

  const fs = require("fs");

  fs.writeFile("data.json", JSON.stringify(AllDeveloperRepo), (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Data has ben saved in json file format");
    }
  });
}
extractRepoFromGithub();
