module.exports = {
  siteMetadata: {
    title: `CrepPlug`,
    description: `A UK Footwear Community making buying & selling trainers easy.`,
    author: `@markmansour`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     // The property ID; the tracking code won't be generated without it
    //     trackingId: "UA-115326499-1",
    //     // Defines where to place the tracking script - `true` in the head and `false` in the body
    //     head: true,
    //     // Setting this parameter is optional
    //     anonymize: true,
    //     // Setting this parameter is also optional
    //     respectDNT: true,
    //     // Avoids sending pageview hits from custom paths
    //     exclude: ["/preview/**", "/do-not-track/me/too/"],
    //     // Delays sending pageview hits on route update (in milliseconds)
    //     pageTransitionDelay: 0,
    //     // Enables Google Optimize using your container Id
    //     optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
    //     // Enables Google Optimize Experiment ID
    //     experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
    //     // Set Variation ID. 0 for original 1,2,3....
    //     variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
    //     // Any additional optional fields
    //     sampleRate: 5,
    //     siteSpeedSampleRate: 10,
    //     cookieDomain: "example.com",
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        url: `http://markm105.sg-host.com/graphql`,
        verbose: true,
        develop: {
          hardCacheMediaFiles: true,
        },
        debug: {
          graphql: {
            writeQueriesToDisk: true,
          },
        },
        type: {
          Page: {
            // exclude: true,
          },
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: "WpSimpleProduct",
        imagePath: "image.sourceUrl",
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/account/*`, `/store/*`] },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    "gatsby-plugin-netlify", // make sure to keep it last in the array
  ],
}
