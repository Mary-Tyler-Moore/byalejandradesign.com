/** @flow */
import * as React from 'react';
import Helmet from 'react-helmet';
import { graphql, StaticQuery } from 'gatsby';

// import Pixel from './Pixel';

class Head extends React.Component {
  get metadata() {
    return this.props.data.site.siteMetadata;
  }

  get pathname() {
    return this.props.location.pathname;
  }

  get title() {
    const { title, subTitle } = this.metadata;
    return `${title}: ${subTitle}${
      this.props.title ? ` | ${this.props.title}` : ``
    }`;
  }

  get canonical() {
    return `${this.metadata.siteUrl}${this.pathname}`;
  }

  get author() {
    return this.metadata.author;
  }

  get description() {
    return this.props.description || this.metadata.description;
  }

  get headerImage() {
    return this.props.data.allWordpressAcfOptions.edges[0].node.options
      .default_header;
  }

  get ogImage() {
    return `${this.metadata.siteUrl}${this.headerImage.localFile.publicURL}`;
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>{this.title}</title>
          <link
            href="https://fonts.googleapis.com/css?family=Amiri:400,400i,700,700i|Source+Sans+Pro:300,300i,600,600i"
            rel="stylesheet"
          />
          <link rel="canonical" href={this.canonical} />
          <meta name="author" content={this.author} />
          <meta name="description" content={this.description} />
          <meta itemprop="name" content={this.title} />
          <meta itemprop="description" content={this.description} />
          <meta itemprop="image" content={this.ogImage} />
          <meta name="og:site_name" content={this.title} />
          <meta name="og:type" content="article" />
          <meta name="og:title" content={this.title} />
          <meta name="og:description" content={this.description} />
          <meta name="og:url" content={this.canonical} />
          <meta name="og:image" content={this.ogImage} />
          <meta name="fb:admins" content="934241763325153" />
        </Helmet>
      </React.Fragment>
    );
  }
}

const HEAD = graphql`
  query Head {
    site {
      siteMetadata {
        siteUrl
        title
        subTitle
        description
        author
      }
    }
    allWordpressAcfOptions {
      edges {
        node {
          options {
            default_header {
              localFile {
                publicURL
              }
            }
          }
        }
      }
    }
  }
`;

const HeadQuery = (props) => (
  <StaticQuery
    query={HEAD}
    render={(data) => <Head data={data} {...props} />}
  />
);

export default HeadQuery;
