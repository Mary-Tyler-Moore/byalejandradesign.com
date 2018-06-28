module.exports = {
  siteMetadata: {
    title: 'Artetexture',
    subTitle: 'Design Studio and Shop',
    navLayout: {
      mainNav: ['/home', '/cloud-studio', '/shop', '/contact'],
      footerNav: [
        '/cloud-studio',
        '/shop',
        '/faq',
        '/privacy-policy',
        '/return-policy',
        '/contact',
      ],
    },
    design: {
      maxWidth: 1200, // px
      contentPadding: 40, // px
    },
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-next',
    {
      resolve: 'gatsby-plugin-sass',
      options: { precision: 8 },
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        // The base url to your WP site.
        baseUrl: 'api.artetexture.com',
        // WP.com sites set to true, WP.org set to false
        hostingWPCOM: false,
        // The protocol. This can be http or https.
        protocol: 'https',
        // Use 'Advanced Custom Fields' Wordpress plugin
        useACF: true,
        auth: {},
        // Set to true to debug endpoints on 'gatsby build'
        verboseOutput: false,
        exludedRoutes: [
          '/*/*/comments',
          '/yoast/**',
          '/*/*/wp-rest-api-log/**',
          '/wp-rest-api-log/**',
        ],
      },
    },
    // {
    //   resolve: 'gatsby-plugin-manifest',
    //   options: {
    //     name: 'Artetexture: Design Studio and Shop',
    //     short_name: 'Artetexture',
    //     start_url: '/',
    //     display: 'minimal-ui',
    //     icon: 'src/components/Logo/logo_white.png',
    //   },
    // },
    // 'gatsby-plugin-offline',
  ],
};
