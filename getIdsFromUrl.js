var CryptoJS = require("crypto-js");
require("dotenv").config();
const csv = require("csv-parser");
const fs = require("fs");
const fetch = require("node-fetch");

var authClient = "Doorman-SHA256 Credential=" + process.env.clientID;
var authTimestamp = Math.floor(Date.now() / 1000);
var hash = CryptoJS.SHA256(
  process.env.clientID + process.env.clientSecret + authTimestamp
);
var authSignature = CryptoJS.enc.Hex.stringify(hash);

const headers = {
  Authorization: authClient,
  Timestamp: authTimestamp,
  Signature: authSignature,
  "Content-Type": "application/json",
};

const site_prefix = {
  "nature-trail": "nature-trail",
  "san-antonio-sounder": "san-antonio-sounder",
  "fort-worth-bugle": "fort-worth-bugle",
  "victoria-view": "victoria-view",
  "odessa-observer": "odessa-observer",
  "houston-post": "houston-post",
  "bug-tracking": "bug-tracking",
  "testing-world": "testing-world",
  "quality-times": "quality-times",
  "spring-summer": "spring-summer",
  "welcome-fall": "welcome-fall",
  "holiday-wonders": "holiday-wonders",
  nationalgeographic: "NAG-NL",
  biography: "BIO",
  "bountiful-gardens": "bountiful-gardens",
  modernliving: "ML-JP",
  menshealth: "MNH-GB",
  runnersworld: "RUW-GB",
  resin: "RSN",
  demo: "RSN-DM",
  bringatrailer: "BAT",
  altaonline: "alt",
  canadianblackbook: "CBB",
  thepioneerwoman: "TPW",
  cosmopolitan: "COS",
  "25ans": "ANS-JP",
  ellegirl: "ELG-JP",
  "hearst-autos-shopping-logic": "shoppinglogic",
  womenshealthmag: "WMH",
  wheelhouse: "WHE",
  autoweek: "AUT",
  harpersbazaar: "HAR",
  fujingaho: "FJG-JP",
  delish: "DEL",
  historychannel: "HSC-IT",
  citv: "CITV-IT",
  blazetv: "BZE-IT",
  salon: "ROA-PD",
  ellemen: "ELL-MN",
  ellechina: "ELL-CH",
  qpmagazine: "QP-GB",
  townandcountrymag: "TOC",
  quest: "QUE-NL",
  elleeten: "ETE-NL",
  quotenet: "QTE-NL",
  bicycling: "BKE",
  esquire: "ESQ",
  crfashionbook: "CRFB",
  "nuevo-estilo": "NET-ES",
  emprendedores: "EMP-ES",
  gearpatrol: "GP",
  jan: "JAN-NL",
  glamour: "GLAM-NL",
  vogue: "VOG-NL",
  fotogramas: "FOTO-ES",
  fre: "FRE",
  elledecor: "EDC",
  quo: "QUO-ES",
  micasarevista: "MCR-ES",
  oprahdaily: "OMG",
  quemedices: "QMD-ES",
  prevention: "PVN",
  elledecoration: "EDN-GB",
  ego: "EGO-ES",
  crecerfeliz: "CRF-ES",
  caranddriver: "CAD",
  shondaland: "SHO",
  elle: "ELL",
  womansday: "WDY",
  redonline: "RED-GB",
  marieclaire: "MAR",
  gioia: "GIO-IT",
  diezminutos: "DZM-ES",
  arrevista: "ARV-ES",
  goodhousekeeping: "GHK",
  housebeautiful: "HBU",
  bestproducts: "BP",
  wearesweet: "SWT",
  nationaldesk: "htv-national-desk",
  khtvnews: "khtv",
  wisn: "wisn",
  wtae: "wtae",
  wgal: "wgal",
  koco: "koco",
  wlwt: "wlwt",
  mynbc5: "wptz",
  koat: "koat",
  wmur: "wmur",
  ketv: "ketv",
  wxii12: "wxii",
  wyff4: "wyff",
  wapt: "wapt",
  kmbc: "kmbc",
  wmtw: "wmtw",
  wbaltv: "wbal",
  wcvb: "wcvb",
  wdsu: "wdsu",
  wlky: "wlky",
  kcci: "kcci",
  wjcl: "wjcl",
  wpbf: "wpbf",
  "mor-tv": "wmor",
  wesh: "wesh",
  ksbw: "ksbw",
  kcra: "kcra",
  "4029tv": "khbs",
  wvtm13: "wvtm",
  netdoctor: "NET-GB",
  digitalspy: "DIG-GB",
  prima: "PRI-GB",
  countryliving: "CLG",
  veranda: "VER",
  seventeen: "SVN",
  roadandtrack: "ROA",
  redbookmag: "RBK",
  popularmechanics: "POP",
};
function extractDomain(url) {
  var domain;
  if (url.indexOf("://") > -1) {
    domain = url.split("/")[2];
  } else {
    domain = url.split("/")[0];
  }
  domain = domain.split(":")[0];
  return domain.split(".")[1];
}

function extractSlug(url) {
  const arr = url.split("/");
  let slug = arr[arr.length - 1] || arr[arr.length - 2];
  if (slug.includes(" ")) {
    slug = slug.trim().replaceAll(" ", "-");
  }
  return slug;
}
async function fetchAllLinks(urls) {
  const promises = urls.map(async (url) => {
    const brand = extractDomain(url);
    const slug = extractSlug(url);
    const paramsObject = { slug: slug, "site.site_prefix": site_prefix[brand] };
    const params = new URLSearchParams(paramsObject);

    const res = await fetch(
      "https://rover.kubefeature.hearstapps.net/v2/content?" + params,
      {
        headers: headers,
      }
    );
    if (res.status !== 200) console.log(`URL not valid ${url}`);
    return { ...(await res.json()), fetchedUrl: url };
  });

  const results = await Promise.all(promises);
  const ids = results.map((content) => {
    const fetchedUrl = content["fetchedUrl"];
    if (content["data"].length === 0) {
      return `Content fail ${fetchedUrl}`;
    }
    return content["data"][0]["id"];
  });
  fs.writeFile("contentIds.txt", ids.join("\n"), () => {});
}

const urls = [];

fs.createReadStream("links.csv")
  .pipe(csv())
  .on("data", (data) => {
    urls.push(Object.values(data)[0]);
  })
  .on("end", () => {
    fetchAllLinks(urls);
  })
  .on("error", (err) => console.log(err));


