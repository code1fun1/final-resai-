import React from "react";
import { Helmet } from "react-helmet"



function lastSlashRemover(site) {
  return site.replace(/\/$/, "");
}

export const mainData = () => {
  return {
        htmlLang:"en-US",
        charset: "UTF-8",
        title: "ResAi",
        titleTemplate:"resai.co",
        description: "ResAi Description",
        keywords: "keyword1, keyword2, keyword3",
        author: "Nilesh",
        viewport: "width=device-width, initial-scale=1.0",
      };
};


export const ogData = () => {

  const siteMainData = mainData();

  const ogURL = "https://resai.co";
  const ogImage = "https://resai.co/image/resai.png";
  const ogImageWidth = "1912";
  const ogImageHeight = "841";
  const ogImageType = "image/png";

  const ogData = {
    ogLocal : "en_US",
    ogType : "website",
    ogTitle : siteMainData.title,
    ogDescription : siteMainData.description,
    ogURL : lastSlashRemover(ogURL),
    ogSiteName : siteMainData.title,
    ogImage : ogImage,
    ogImageWidth : ogImageWidth,
    ogImageHeight : ogImageHeight,
    ogImageType : ogImageType
  };
  return ogData;
};

export const twitterData = () => {

  const siteMainData = mainData();
  const twitterCard = "summary_large_image";
  const twitterUsername = "Nilesh";
  const twitterImage = "https://resai.co/image/resai.png";
  const twitterData = {  
    twitterCard : twitterCard,
    twitterUsername : twitterUsername,
    twitterTitle : siteMainData.title,
    twitterDescription : siteMainData.description,
    twitterImage : twitterImage,
  };
  return twitterData;
};

export const Seo = () => {
  const {
    htmlLang,
    charset,
    title,
    description,
    keywords,
    titleTemplate,
    author,
    viewport,
  } = mainData();

  const {
    ogLocal,
    ogType,
    ogTitle,
    ogDescription,
    ogURL,
    ogSiteName,
    ogImage,
    ogImageWidth,
    ogImageHeight,
    ogImageType,
  } = ogData();

  const { twitterCard, twitterUsername, twitterTitle, twitterDescription,twitterImage } =
    twitterData();

  var links = [];
  var meta = [];
  links.push({ rel: "canonical", href: decodeURIComponent(ogURL) });
  links.push({
    rel: "alternate",
    hreflang: "en",
    href: decodeURIComponent(ogURL),
  });
  links.push({ rel: "icon", href:decodeURIComponent("/favicon-logo2x.png") });


  return (
    <Helmet
      htmlAttributes={{
        lang: htmlLang,
      }}
      title={title}
      titleTemplate={titleTemplate}
      link={links}
      meta={[
        {
          name: `charset`,
          content: charset,
        },
        {
          name: `title`,
          content: title,
        },
        {
          name: `description`,
          content: description,
        },
        {
          name: `keywords`,
          content: keywords,
        },
        {
          name: `author`,
          content: author,
        },
        {
          name: `viewport`,
          content: viewport,
        },
        // {
        //   property: `og:local`,
        //   content: ogLocal,
        // },
        // {
        //   property: `og:type`,
        //   content: ogType,
        // },
        // {
        //   property: `og:title`,
        //   content: ogTitle,
        // },
        // {
        //   property: `og:description`,
        //   content: ogDescription,
        // },
        // {
        //   property: `og:url`,
        //   content: ogURL,
        // },
        // {
        //   property: `og:site_name`,
        //   content: ogSiteName,
        // },
        // {
        //   property: `og:image`,
        //   content: ogImage,
        // },
        // {
        //   property: `og:image:width`,
        //   content: ogImageWidth,
        // },
        // {
        //   property: `og:image:height`,
        //   content: ogImageHeight,
        // },
        // {
        //   property: `og:image:type`,
        //   content: ogImageType,
        // },
        // {
        //   name: `twitter:card`,
        //   content: twitterCard,
        // },
        // {
        //   name: `twitter:creator`,
        //   content: twitterUsername,
        // },
        // {
        //   name: `twitter:title`,
        //   content: twitterTitle,
        // },
        // {
        //   name: `twitter:description`,
        //   content: twitterDescription,
        // },
        // {
        //   name: `twitter:image`,
        //   content: twitterImage,
        // },
        {
          "http-equiv": `Cache-Control`,
          content: "no-cache, no-store, must-revalidate",
        },
        {
          "http-equiv": `Pragma`,
          content: "no-cache",
        },
        {
          "http-equiv": `Expires`,
          content: "0",
        },
      ].concat(meta)}
    />
  );
}

