const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

const getHtml = async () => {
  try {
    return await axios.get("http://www.ubique.co.kr/portfolio");
  } catch (error) {
    console.error(error);
  }
};

getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.w-grid-list").children("article.w-grid-item");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
        title: $(this)
          .find("div.w-vwrapper h6")
          .text(),
        url: $(this)
          .find("a.w-grid-item-anchor")
          .attr("href"),
        image_url: $(this)
          .find("div.w-post-elm.post_image img")
          .attr("src"),
        image_alt: $(this)
          .find("div.w-post-elm.post_image img")
          .attr("alt")
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(res => log(res));
