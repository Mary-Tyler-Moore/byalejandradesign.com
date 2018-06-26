/**
 * Implement Gatsby's Node APIs in this file.
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return new Promise((res, rej) => {
    const shopItemTemplate = path.resolve('src/templates/shop-product.js');

    const cloudStudioTemplate = path.resolve('src/templates/cloud-studio.js');

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
            reject(result.errors);
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
            reject(result.errors);
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
    );
  });
};
