# Artetexture E-Commerce Site

This site is an e-commerce site developed to sell ceramic pottery and paintings.

## Technology

The site is precompiled with Gatsby and deployed using Netlify CLI. The data is gathered from an API created using Wordpress and Trellis.

## Structure

The site tries to structure the elements (pages, components, layouts) in an organized manner that matches the structure of the data from graphql queries and fragments. I have also created flow type definitions for the data queries so we can compose the different elements and get immediate feedback about their validity

### Templates

The files in `src/templates` are used by `gatsby-node.js` to create the single pages of types. We create the following types.

- /shop/:product-slug
- /shop/collection/:collection-slug
- /cloud-studio/:blog-post-slug

As this is the final destination for the most exact a post type can live I have chosen to have the graphql fragments live in these files. The templates find the appropriate data and pass it on to a component as a react props called node

```js
<Product node={node} />
```

### Pages

The files in `src/pages` are used to create single page endpoints. I am creating the following pages that are collections of items.

- /shop
- /collections
- /cloud-studio

These are special cases with multiple data types

- /cart
- /index (redirect from /home)

And these are static pages

- /contact
- /faq
- /privacy-policy
- /return-policy

### Components

This is where the displays live. If the components need state we will create smart/dumb components. If a component renders a list of items it will be named `ProductList.js` or something similar. If it renders a single product it will be named `SingleProduct.js` or similar. In the component folders we have also included flow definitions for the shape of the expected graphql data structure. List type components recieve their data as an edge and Single type components received their data as a node.

```js
type ProductNode = {
  id,
  slug,
  // ... data structure
};

type ProductEdge = Array<{ node: ProductNode }>
```

### Composition

The idea is that this structure will make it easy for us to compose elements. For index page we can use fragments defined in templates and render either Lists or Single items. For example we can easily create a page which renders a single blog post a, a list of recent blogs as exerpts and then a featured product and/or category.
