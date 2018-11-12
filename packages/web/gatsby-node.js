/**
 * Implement Gatsby's Node APIs in this file.
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
const { pipeAsync } = require('smalldash');
const uploadToS3 = require('./upload-to-s3');

exports.createPages = ({ graphql, actions }) => {
  const { createRedirect, createPage } = actions;

  /** Creating Redirects */
  createRedirect({
    fromPath: '/home',
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/',
  });

  createRedirect({
    fromPath: '/collections',
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/shop/collections',
  });

  createRedirect({
    fromPath: '/shop',
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/shop/collections',
  });

  const stub = 'src/templates';

  // Create a request/callback api
  // We can define our queries/side effects with less boilerplate
  const createGatsbyPages = (query, callback) => () =>
    new Promise((res, rej) => {
      return query
        .then((results) => {
          if (results.errors) {
            rej(results.errors);
          } else {
            res(callback(results));
          }
        })
        .catch((errors) => rej(errors));
    });

  const createShop = createGatsbyPages(
    graphql(
      `
        {
          allWordpressWpShop {
            edges {
              node {
                id
                slug
              }
            }
          }
        }
      `
    ),
    (results) => {
      results.data.allWordpressWpShop.edges.forEach(({ node }) => {
        createPage({
          path: `shop/${node.slug}`,
          component: path.resolve(stub, 'shop-product.js'),
          context: {
            id: node.id,
          },
        });
      });
    }
  );

  const createCloudStudio = createGatsbyPages(
    graphql(
      `
        {
          allWordpressPost {
            edges {
              node {
                id
                slug
              }
            }
          }
        }
      `
    ),
    (result) => {
      result.data.allWordpressPost.edges.forEach(({ node }) => {
        createPage({
          path: `cloud-studio/${node.slug}`,
          component: path.resolve(stub, 'cloud-studio.js'),
          context: {
            id: node.id,
          },
        });
      });
    }
  );

  const createCollections = createGatsbyPages(
    graphql(
      `
        {
          allWordpressWpCollections {
            edges {
              node {
                id
                slug
              }
            }
          }
        }
      `
    ),
    (result) => {
      result.data.allWordpressWpCollections.edges.forEach(({ node }) => {
        createPage({
          path: `shop/collection/${node.slug}`,
          component: path.resolve(stub, 'collection-products.js'),
          context: {
            id: node.id,
          },
        });
      });
    }
  );

  const createMarkdown = createGatsbyPages(
    graphql(
      `
        {
          allMarkdownRemark {
            edges {
              node {
                frontmatter {
                  slug
                }
              }
            }
          }
        }
      `
    ),
    (result) => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.frontmatter.slug,
          component: path.resolve(stub, 'markdown.js'),
          context: {
            slug: node.frontmatter.slug,
          },
        });
      });
    }
  );

  const pipeline = pipeAsync(
    createShop,
    createCollections,
    createCloudStudio,
    createMarkdown
  );

  return pipeline();
};

exports.onPostBuild = () => {
  const stage = process.env.STAGE;

  if (stage === 'production' || stage === 'staging') {
    uploadToS3();
  }
};
