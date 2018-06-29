/**
 * @flow
 * Implement Gatsby's Node APIs in this file.
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');

exports.createPages = ({ boundActionCreators, graphql }) => {
  /** Creating Redirects */
  const { createRedirect } = boundActionCreators;
  const index = '/';
  const home = '/home';

  createRedirect({
    fromPath: home,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: index,
  });

  createRedirect({
    fromPath: '/collections',
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/shop/collections',
  });

  /** Creating Pages */
  const { createPage } = boundActionCreators;

  return new Promise((res, rej) => {
    const stub = 'src/templates';

    const shopItemTemplate = path.resolve(stub, 'shop-product.js');
    const cloudStudioTemplate = path.resolve(stub, 'cloud-studio.js');
    const collectionTemplate = path.resolve(stub, 'collection-products.js');

    res(
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
      )
        .then((result) => {
          if (result.errors) {
            rej(result.errors);
          }

          result.data.allWordpressWpShop.edges.forEach(({ node }) => {
            const path = `shop/${node.slug}`;

            createPage({
              path,
              component: shopItemTemplate,
              context: {
                id: node.id,
              },
            });
          });
        })
        .then(() => {
          return graphql(
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
          );
        })
        .then((result) => {
          if (result.errors) {
            rej(result.errors);
          }

          result.data.allWordpressPost.edges.forEach(({ node }) => {
            const path = `cloud-studio/${node.slug}`;

            createPage({
              path,
              component: cloudStudioTemplate,
              context: {
                id: node.id,
              },
            });
          });
        })
        .then(() => {
          return graphql(
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
          );
        })
        .then((result) => {
          if (result.errors) {
            rej(result.errors);
          }

          result.data.allWordpressWpCollections.edges.forEach(({ node }) => {
            const path = `shop/collection/${node.slug}`;

            createPage({
              path,
              component: collectionTemplate,
              context: {
                id: node.id,
              },
            });
          });
        })
        .catch((e) => console.log(e))
    );
  });
};
