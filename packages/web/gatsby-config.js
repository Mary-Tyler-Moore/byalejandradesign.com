const path = require('path');
const mapTaxonomyToPostType = require('./scripts/map-taxonomy-to-post-type');
const mapPostTypeToTaxonomies = require('./scripts/map-post-type-to-taxonomies');
const { compose } = require('smalldash');

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
    title: 'By Alejandra Design',
    subTitle: 'Ceramic Studio and Shop',
    author: 'Alejandra Rojas Jaramillo',
    description:
      'By Alejandra Design is an NYC based ceramic studio specializing in 3D printing and slip-casting.',
    navLayout: {
      mainNav: [
        {
          link: '/',
          label: 'Home',
        },
        {
          link: '/cloud-studio',
          label: 'Cloud Studio',
        },
        {
          link: '/shop/collections',
          label: 'Collections',
        },
        {
          link: '/about',
          label: 'About',
        },
        {
          link: '/contact',
          label: 'Contact',
        },
      ],
      footerNav: [
        {
          link: '/faq',
          label: 'FAQ',
        },
        {
          link: '/privacy-policy',
          label: 'Privacy',
        },
        {
          link: '/return-policy',
          label: 'Returns',
        },
        {
          link: '/shipping-policy',
          label: 'Shipping',
        },
        {
          link: '/contact',
          label: 'Contact',
        },
      ],
    },
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-sass',
      options: { precision: 8, sourceMap: true },
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
        verboseOutput: true,
        exludedRoutes: [
          '/*/*/comments',
          '/yoast/**',
          '/*/*/wp-rest-api-log/**',
          '/wp-rest-api-log/**',
        ],
        normalizer: normalizers,
        concurrentRequests: 30,
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
        head: true,
      },
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
