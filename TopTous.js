const fs = require("fs");
const json = {
  metadata: {
    ciam: {
      clientId: {
        dev: "iv986r005oc4oapn9i3kosdim",
        prod: "24p2ki5gu9r2qsreq69536h59b",
        test: "iv986r005oc4oapn9i3kosdim",
        stage: "6tgemsnff71n1pt1ncqul7qd17",
      },
    },
    rsid: "hmagglobal",
    links: {
      hostnames: {
        fre: {
          dev: "bestproducts.kubefeature.hearstapps.net",
          prod: "www.bestproducts.com",
          stage: "www-stage.bestproducts.com",
        },
        edit: {
          dev: "edit-bestproducts.kubefeature.hearstapps.net",
          prod: "edit-bestproducts.kubeprod.hearstapps.com",
          stage: "edit-bestproducts.kubestage.hearstapps.net",
        },
      },
      includeLocalePath: false,
    },
    logos: {
      marquee: "@siteAssets/images/logos/logo-marquee.svg",
    },
    adUnit: {
      site: "hdm-bestproducts",
      networkID: "36117602",
    },
    router: {
      excludes: {
        routes: ["/preview/body/(.*)"],
        templates: [],
      },
      includes: {
        routes: [
          "/preview/draft/(.*)",
          "/preview/version/(.*)",
          "/preview/(/|.*/)(a|amp)(\\d{1,})/(.*)",
          "/search/(.*)",
          "/search",
          "(.*)(g|gmp)(\\d{1,})/(.*)",
        ],
        templates: [
          "standard-article",
          "longform-article",
          "section",
          "subsection",
          "collection",
          "recipe",
          "listicle",
          "gallery",
        ],
      },
    },
    social: {
      networks: {
        line: [],
        qzone: [],
        weibo: [],
        douyin: [],
        tumblr: [],
        twitter: {
          handle: "@BestProducts",
          socialUrl: "https://twitter.com/BestProducts",
        },
        youtube: {
          socialUrl: "https://www.youtube.com/c/bestproductsdotcom",
        },
        facebook: {
          appId: "603051583131144",
          iaAppId: "31911516300",
          socialUrl: "https://www.facebook.com/bestproductsdotcom",
        },
        instagram: {
          socialUrl: "https://www.instagram.com/bestproductsdotcom/",
        },
        pinterest: {
          suffix: "bestproductscom",
          socialUrl: "https://www.pinterest.com/bestproductscom/",
        },
        googleplus: {
          webmasterTools: "si8UFoon18tgEVYWaB3i5smgCK5BeH6jxTMFCmrpIPU",
        },
      },
    },
    spotim: {
      id: {
        dev: "sp_mujPqDPD",
        prod: "sp_ru0iV3bG",
        stage: "sp_mujPqDPD",
      },
      ssotoken: {
        dev: "03200723526qht.7c3899a5052765e99745ac962d848a1f9006458f82f86340bbc58d01a79f9761",
        prod: "03200723Y0dWfq.4c0032744b9d2667b139a645ccc7708eac3ebb11aba6e74b5d79156a86bf21a7",
        stage:
          "03200723526qht.7c3899a5052765e99745ac962d848a1f9006458f82f86340bbc58d01a79f9761",
      },
    },
    adConfig: {
      bu: "HDM",
      site: "bestproducts",
      zone: "/36117602/hdm-bestproducts/",
      bidders: {
        IX: {
          d: {
            ga: "670278",
            gb: "670282",
            la: "670277",
            lb: "670283",
            brk: "670280",
            garb: "670279",
            brkrr: "670281",
          },
          m: {
            ga: "670284",
            gb: "670285",
            lb: "670287",
            adh: "670288",
            brk: "670286",
          },
        },
        APN: {
          d: {
            ga: "10583026",
            gb: "10583027",
            la: "10583028",
            lb: "10583029",
            brk: "14402161",
            garb: "14355207",
            brkrr: "14402160",
          },
          m: {
            ga: "10583037",
            gb: "10583038",
            lb: "10583039",
            adh: "16120452",
            brk: "14402162",
          },
          v: "14734117",
        },
        IDX: "56507003895081",
        KAR: {
          m: {
            gb: "_ceM0XV82zI",
            lb: "_sgQip6TT6H",
            adh: "_xPHKgG7clL",
            gabrk: "_tm477YEqyK",
          },
        },
        MAG: {
          d: {
            ga: "2039664",
            gb: "2039674",
            la: "2039662",
            lb: "2039676",
            brk: "2039670",
            garb: "2039666",
            brkrr: "2039672",
          },
          m: {
            ga: "2039678",
            gb: "2039680",
            lb: "2039688",
            adh: "2039692",
            brk: "2039686",
          },
          siteId: "369856",
          accountId: "11636",
        },
        TDS: {
          d: {
            tdsArt: "112020",
            tdsBrk: "112019",
          },
          m: {
            tdsArt: "112019",
          },
          pageId: "103507",
          pageIdDesktop300: "113859",
        },
        TPL: {
          d: {
            ga: "bestproducts_templated_300x400_atf_PB",
            gb: "bestproducts_templated_300x400_btf_PB",
            lb: "bestproducts_970x250_btf_PB",
            brkrr: "bestproducts_templated_300x400_breaker_PB",
            la728: "bestproducts_728x90_HDX_PB",
            la970: "bestproducts_970x250_PB",
          },
          m: {
            ga: "bestproducts_templated_300x250_flex_atf_m_PB",
            lb: "bestproducts_templated_300x250_flex_btf_m_PB",
            adh: "BestProducts_320x50_HDX_PB",
            brk: "bestproducts_templated_300x250_flex_breaker_m_PB",
          },
        },
        TTD: {
          d: {
            ttd: "desktop",
          },
          m: {
            ttd: "mobile",
          },
          siteId: "hdm-bestproducts",
          supplySourceId: "hearstmagazines",
        },
        AMZN: "3049",
        AMZNgdpr: "3788",
      },
      modules: {
        habu: {
          propertyId: "f5c844b8-f100-483d-aa7f-6ea51194a351",
        },
        optable: {
          slug: "prod-bestproducts-com",
        },
        parsely: {
          siteId: "bestproducts.com",
        },
        actionIQ: {
          writeKey: "mediaos-bestproducts-prod",
          cnameRecord: "https://aiq-in.bestproducts.com",
        },
        comscore: {
          c2: 6035258,
        },
        oneTrust: {
          countries: {
            it: {
              declineButton: true,
              cookieExpiration: false,
            },
          },
          doNotSellUrlOverride:
            "/about/a42158393/do-not-sell-my-personal-information/",
        },
        permutive: {
          apiKey: "7d237500-e85c-4846-9eb8-5635df7b050c",
          locale: "US",
          currency: "USD",
          workspaceId: "eb036676-52ea-47b5-a2f6-fcfb4ece9c00",
          geoWhitelist: "US",
        },
        optimizely: {
          webSnippetId: "21018620252",
          webSnippetKey: "us_bestproducts",
        },
        googleAnalytics: {
          optimizeId: "GTM-MWGLQFF",
          propertyId: "UA-68240828-1",
          measurementId: "G-CP96TMJMMM",
          brandMeasurementId: "G-N8GPQVNDZ0",
        },
      },
      adBundle: [],
      siteList: ["www.bestproducts.com"],
      adBundleUrl: "https://assets.hearstapps.com/moapt/moapt-hdm.latest.js",
      disableAtfHero: true,
    },
    commerce: {
      affiliate: {
        url: "https://assets.hearstapps.com/commerce/release/affiliate-bundle.master.js",
        amazon: {
          market: "HMG-US",
          default: {
            sem: "bp-lift-20",
            tag: "bp_links-20",
            icxId: "2089",
            social: "bp-soc-lift-20",
          },
          section: {
            "promo-coupon-code": {
              sem: "bp-lift-20",
              tag: "bp_deals-20",
              icxId: "2089",
              social: "bp-soc-lift-20",
            },
          },
        },
        skimlinks: {
          market: "HMG-US",
          default: {
            url: "//s.skimresources.com/js/74968X1547195.skimlinks.js",
          },
        },
        trackonomics: {
          cipd2: "bp",
        },
      },
    },
    defaults: {
      source_site: "Best Products",
      editorial_source: "Hearst Editorial",
    },
    copyright: "Hearst Magazine Media, Inc. All Rights Reserved.",
    icxSiteId: "2089",
    permutive: {
      key: "82db4172-fb05-4917-8bee-338bbd997af3",
    },
    top_touts: {
      "387ef192-9d96-4d8a-8e5d-0b04d1dfc25d": {
        id: 1,
        "link-text": "Best Waffle Makers",
        frontend_link:
          "https://www.bestproducts.com/appliances/small/g395/best-waffle-makers-at-every-price/",
      },
      "9497a4d5-66f5-4047-b1ec-e9acf5311174": {
        id: 1,
        "link-text": "best kitchen carts",
        frontend_link:
          "https://www.bestproducts.com/lifestyle/g40719454/best-kitchen-carts/",
      },
      "0171740a-9e0e-4526-b14a-299d1928fb3f": {
        id: 3,
        "link-text": "best bathroom towel racks",
        frontend_link:
          "https://www.bestproducts.com/home/decor/g83/best-bathroom-towel-racks/",
      },
      "6efee9d3-f5f0-4cb5-9145-a54a78c2c0ff": {
        id: 4,
        "link-text": "cool alarm clocks",
        frontend_link:
          "https://www.bestproducts.com/appliances/small/g885/cool-alarm-clocks/",
      },
      "12500a0f-f0a6-4216-b9fc-15ef5d69a903": {
        id: 5,
        "link-text": "Best Soup Mugs",
        frontend_link:
          "https://www.bestproducts.com/eats/tabletop/g40796448/best-soup-mugs/",
      },
    },
    video_ads: {
      ad_throttle_duration: 90,
    },
    yieldmoId: "1615155341256145309",
    comScoreId: "6035258",
    chartbeatId: "39276",
    icxDomainId: "6863",
    networkName: "Hearst Lifestyle and Design Group",
    siteAcronym: "BP",
    lotameSiteId: "7582",
    burtAnalytics: "AMPS77OLU38N",
    payWallSchema: {
      freeTags: ["most-popular"],
    },
    disclaimerLink: "https://www.bestproducts.com/about/a86/about-us/",
    networkTagLine: "A Part of Hearst Digital Media",
    seekrIndexName: "bestproducts-en-us",
    networkLogoPath: "@siteAssets/images/logos/network-logo.png",
    icxVideoDomainId: "7351",
    oneTrustDomainId: "42ed0e40-f655-4a21-9521-f0af3b415c83",
    ensightenScriptUrl: "//nexus.ensighten.com/hearst/mag/Bootstrap.js",
    amazonAffiliateCode: "bp_links-20",
    indexExchangeSiteId: "297428",
    skimlinksPublisherId: "74968X1547195",
    ensightenDNTScriptUrl: "//nexus.ensighten.com/hearst/mag-dnt/Bootstrap.js",
    ensightenDevScriptUrl: "//nexus.ensighten.com/hearst/mag-dev/Bootstrap.js",
    ensightenGDPRScriptUrl:
      "//nexus.ensighten.com/hearst/mag-gdpr/Bootstrap.js",
    newsletter_preference_id: "715216B3-735F-4FC6-9BDD-33FF6C18858F",
    ensightenAdsFreeScriptUrl:
      "//nexus.ensighten.com/hearst/mag-af/Bootstrap.js",
    googleAnalyticsSiteAccount: "UA-68240828-1",
    googleAnalyticsVideoDiagTracking: "false",
    googleAnalyticsVideoTrackingBrandName: "Best Products",
  },
};

const obj = json;
const obj2 = {
  "387ef192-9d96-4d8a-8e5d-0b04d1dfc25d": {
    id: 1,
    "link-text": "Best Waffle Makers",
    frontend_link:
      "https://www.bestproducts.com/appliances/small/g395/best-waffle-makers-at-every-price/",
  },
  "9497a4d5-66f5-4047-b1ec-e9acf5311174": {
    id: 1,
    "link-text": "best kitchen carts",
    frontend_link:
      "https://www.bestproducts.com/lifestyle/g40719454/best-kitchen-carts/",
  },
  "0171740a-9e0e-4526-b14a-299d1928fb3f": {
    id: 3,
    "link-text": "best bathroom towel racks",
    frontend_link:
      "https://www.bestproducts.com/home/decor/g83/best-bathroom-towel-racks/",
  },
  "6efee9d3-f5f0-4cb5-9145-a54a78c2c0ff": {
    id: 4,
    "link-text": "cool alarm clocks",
    frontend_link:
      "https://www.bestproducts.com/appliances/small/g885/cool-alarm-clocks/",
  },
  "12500a0f-f0a6-4216-b9fc-15ef5d69a903": {
    id: 5,
    "link-text": "Best Soup Mugs",
    frontend_link:
      "https://www.bestproducts.com/eats/tabletop/g40796448/best-soup-mugs/",
  },
};


fs.writeFileSync("metadata.json", JSON.stringify(obj));
