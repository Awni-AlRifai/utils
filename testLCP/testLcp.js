// Import the `promises` module to use with dynamic imports
const { promises } = require("fs");

// An array of URLs to test
const urlsToTest = [
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43389065/birthday-girl-asks-for-donations-for-pugs-not-presents/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/tech/gadgets/g35604560/cheap-wireless-earbuds/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/tech/a39959951/sony-wh-1000xm5-wireless-headphones-review/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/tech/gadgets/a41847802/bose-quietcomfort-earbuds-ii-review/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/tech/gadgets/a25589216/iphone-buying-guide/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/tech/electronics/g158/best-samsung-phones-and-smartphones/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/home/a30122189/where-to-buy-plants-online/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/home/cleaning-organizing/g2749/stainless-steel-cleaners-polishes/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/home/cleaning-organizing/g1315/spring-cleaning-products-supplies/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/home/decor/g43251772/gh-best-amazon-deals-sales-march-2023/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/home/a43248095/tuft-and-needle-mattress-amazon-sale-march-2023/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/home/cleaning-organizing/g18675876/natural-organic-cleaning-products/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/home/a43276334/viral-tiktok-wall-mop-amazon-cleanwalls/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/home/decor/g79/best-linen-sheets-all-seasons/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/home/decor/g3141/best-standing-desks/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/sales-and-deals/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/easter-decorating-ideas-and-candy/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/gifting-news/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/gifting-etiquette/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/gift-ideas-for-every-occassion/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/tech/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/home/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/fitness/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/beauty/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/appliances/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/parenting/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/eats/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/product-news/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/i-tried-it-products/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/little-lifesavers/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/hype-meter/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/newsletter",
  "https://bestproducts-next-5972.cdn.hearstapps.net/en-espanol/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/g43483661/nordstrom-spring-sale-april-2023/                               ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/a43483122/untitled-content-1680298202/                                              ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43481272/how-to-return-a-gift-on-amazon/                                 ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/parenting/kids/a43480974/fidget-toy-easter-basket-sale-amazon-april-2023/           ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/a43480756/university-says-maybe-dont-say-gift-anymore-unrelated-publication-panics/ ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/parenting/kids/g43479226/dinosaur-easter-baskets/                                   ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/parenting/kids/g43479032/art-easter-baskets/                                        ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/parenting/kids/g43478645/stem-easter-baskets/                                       ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/g43470939/nordstrom-sale/                                                 ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43469756/mysterious-gift-tax-suggests-billionaire-secretly-died/         ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43467636/keanu-reeves-john-wick-chapter-4-stunt-crew-gifts/              ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/home/g43458561/lowes-spring-fest-2023/                                              ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43458335/sick-wife-asks-husband-for-house-cleaning-gift-backfires-reddit/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43457244/coworker-doesnt-contribute-to-office-gift-revenge-reddit/       ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/eats/gadgets-cookware/a43456783/always-pan-our-place-sale-march-2023/               ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43454525/mr-beast-tips-waitress-a-car-backlash/                          ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/home/decor/a43453913/easter-inflatable-sale-amazon-march-2023/                      ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43453095/supreme-court-justices-gift-disclosure-rules/                   ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/g43452954/tk-gifts-for-leaving-coworker-thatll-make-it-a-happy-send-off/            ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43444894/aeries-crossover-leggings-sale-2023/                            ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43442883/future-in-laws-offer-couple-house-propose-prenup-reddit-drama/  ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43442235/how-to-gift-an-audible-book/                                    ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43442129/mayim-bialik-star-trek-gift-from-leonard-nimoy-daughter/        ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/home/decor/g43431638/serena-and-lily-spring-design-event-march-2023/                ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/a/untitled-content-1679945686/                                                      ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43431488/why-david-furnish-gifted-elton-john-100-trees-for-his-birthday/ ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43431089/georgina-rodriguez-stops-buying-car-gfits-for-cristiano-ronaldo-b",
  "https://bestproducts-next-5972.cdn.hearstapps.net/tech/gadgets/g43430158/apple-tv-siri-remote-cases/                                  ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43430065/baby-shower-gift-drama/                                         ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/tech/gadgets/a43429773/focal-bathys-wireless-headphones-review/                     ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43429034/how-to-wrap-a-wine-bottle/                                      ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/g43428252/gifts-for-bride-to-be/                                          ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/g43413609/weatherman-umbrella-embed/                                                ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/home/outdoor/a43413561/weatherman-umbrella-review/                                  ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/g43412702/top-rated-outdoor-misting-fans/                                 ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43412294/fake-rich-grandma-facebook-gift-card-scam/                      ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43410455/jane-fonda-gifts-drew-barrymore-vibrator-sex-toy/               ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/home/decor/g43402167/coffee-tables-with-storage/                                    ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/a43400664/untitled-content-1679587515/                                              ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43400652/lush-super-mario-bros-collection-march-2023/                    ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43399199/royal-grandkids-coronation-gift-book-about-king-charles-pants/  ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43398423/taylor-swift-gifts-concert-tickets-to-fan-eras-tour/            ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/g43390604/peeps-products-easter-amazon-march-2023/                        ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/a/untitled-content-1679508126/                                                      ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43390580/why-you-shouldnt-give-rabbit-gift-for-easter/                   ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43389065/birthday-girl-asks-for-donations-for-pugs-not-presents/         ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43387923/succession-final-season-hbo-sweatshirt-gifts/                   ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/a43387656/untitled-content-1679495896/                                              ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/parenting/baby/g43386134/baby-lotion-gift/                                          ",
  "https://bestproducts-next-5972.cdn.hearstapps.netm/entertaining/g43273184/le-creuset-spring-collection/                               ",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43469756/mysterious-gift-tax-suggests-billionaire-secretly-died/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43442235/how-to-gift-an-audible-book/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43467636/keanu-reeves-john-wick-chapter-4-stunt-crew-gifts/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43458335/sick-wife-asks-husband-for-house-cleaning-gift-backfires-reddit/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43457244/coworker-doesnt-contribute-to-office-gift-revenge-reddit/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43454525/mr-beast-tips-waitress-a-car-backlash/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43442883/future-in-laws-offer-couple-house-propose-prenup-reddit-drama/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43444894/aeries-crossover-leggings-sale-2023/",
  "https://bestproducts-next-5972.cdn.hearstapps.net/lifestyle/a43453095/supreme-court-justices-gift-disclosure-rules/"
];

// Load Lighthouse as an ES module using dynamic imports
(async () => {
  const { default: lighthouse } = await import("lighthouse");
  const { default: chromeLauncher } = await import("chrome-launcher");

  // Launch Chrome using chrome-launcher
  const chrome = await chromeLauncher.launch();

  // Loop through the URLs and test each one using Lighthouse
  for (const url of urlsToTest) {
    // Set Lighthouse options to only test performance
    const options = {
      port: chrome.port,
      output: "html",
      onlyCategories: ["performance", "metrics"],
    };

    // Run Lighthouse against the URL
    const results = await lighthouse(url, options);

    // Print the performance score of the page
    console.log(
      `${url},${
        results.lhr.audits["largest-contentful-paint"].numericValue / 1000
      } s`
    );
  }

  //   // Kill the Chrome process
  //   await chrome.kill();
})();
