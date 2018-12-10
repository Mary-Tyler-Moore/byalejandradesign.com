import * as React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import ReactMarkdown from 'react-markdown';

import Layout from '../components/Layout';

import './markdown.sass';

class MarkdownPage extends React.Component {
  render() {
    return (
      <Layout
        location={this.props.location}
        title={this.props.data.markdownRemark.frontmatter.title}
      >
        <h3 className="h3-sourceSans">
          {this.props.data.markdownRemark.frontmatter.title}
        </h3>
        <section className="markdownPage">
          <ReactMarkdown
            source={this.props.data.markdownRemark.rawMarkdownBody}
            className="markdown-sourceSans"
          />
        </section>
      </Layout>
    );
  }
}

export default MarkdownPage;

export const fragment = graphql`
  fragment MarkdownFragment on MarkdownRemark {
    rawMarkdownBody
    frontmatter {
      slug
      title
    }
  }
`;

export const query = graphql`
  query MarkdownPage($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      ...MarkdownFragment
    }
  }
`;
