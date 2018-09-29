const { compose } = require('smalldash');

/**
 * Global function for mapping taxonomy entities to postType
 * @param  {[type]} taxonomy [description]
 * @return {[type]}          [description]
 */
const mapTaxonomyToPostType = (taxonomy) => (postType) => (entities) => {
  const taxonomies = entities.filter(
    (e) => e.__type === `wordpress__wp_${taxonomy}`
  );

  return entities.map((e) => {
    if (e.__type === `wordpress__wp_${postType}`) {
      const hasTaxonomy =
        e[taxonomy] && Array.isArray(e[taxonomy]) && e[taxonomy].length;

      if (hasTaxonomy) {
        const key = `${taxonomy}___NODE`;
        e[key] = e[taxonomy].map(
          (tax) => taxonomies.find((gObj) => tax === gObj.wordpress_id).id
        );

        delete e[taxonomy];
      }
    }

    return e;
  });

  return entities;
};

const mapPostTypeToTaxonomies = (postType) => (taxonomy) => (entities) =>
  mapTaxonomyToPostType(taxonomy)(postType)(entities);

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
    siteUrl: 'https://artetexture.com',
    title: 'Artetexture',
    subTitle: 'Design Studio and Shop',
    navLayout: {
      mainNav: ['/home', '/cloud-studio', '/shop', '/contact'],
      footerNav: ['/faq', '/privacy-policy', '/return-policy', '/contact'],
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
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Artetexture: Design Studio and Shop',
        short_name: 'Artetexture',
        start_url: '/',
        display: 'minimal-ui',
        icon: 'src/components/Logo/logo_white.png',
      },
    },
    // 'gatsby-plugin-offline',
  ],
};
