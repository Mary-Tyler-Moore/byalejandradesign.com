const path = require('path');
const getEnv = require('./scripts/get-env');
const mapTaxonomyToPostType = require('./scripts/map-taxonomy-to-post-type');
const mapPostTypeToTaxonomies = require('./scripts/map-post-type-to-taxonomies');
const { compose } = require('smalldash');

getEnv();

const mapShopToTaxonomies = mapPostTypeToTaxonomies('shop');

const extractEntities = ({ entities }) => entities;

const normalizers = compose(
  mapShopToTaxonomies('sizes'),
  mapShopToTaxonomies('ceramics'),
  mapShopToTaxonomies('paintings'),
  mapShopToTaxonomies('collections'),
  extractEntities
);

module.exports = {
  siteMetadata: {
    siteUrl: 'https://byalejandradesign.com',
    title: 'By Alejandra',
    subTitle: 'Design Studio and Shop',
    navLayout: {
      mainNav: ['/home', '/cloud-studio', '/shop/collections', '/contact'],
      footerNav: [
        '/faq',
        '/privacy-policy',
        '/return-policy',
        'shipping-policy',
        '/contact',
      ],
    },
    design: {
      maxWidth: 1200, // px
      contentPadding: 40, // px
      mobileContentPadding: 15, // px
    },
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-sass',
      options: { precision: 8 },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/markdown`,
        name: 'markdown-pages',
      },
    },
    'gatsby-transformer-remark',
    {
      resolve: require.resolve(
        path.resolve(__dirname, '../gatsby-source-wordpress/package.json')
      ),
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
        verboseOutput: true,
        exludedRoutes: [
          '/*/*/comments',
          '/yoast/**',
          '/*/*/wp-rest-api-log/**',
          '/wp-rest-api-log/**',
        ],
        normalizer: normalizers,
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'By Alejandra: Design Studio and Shop',
        short_name: 'By Alejandra',
        start_url: '/',
        display: 'minimal-ui',
      },
    },
  ],
};
