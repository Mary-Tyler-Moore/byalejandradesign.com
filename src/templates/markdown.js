import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import ReactMarkdown from 'react-markdown';

import '../sass/global.sass';

class MarkdownPage extends React.Component {
  render() {
    return (
      <Layout>
        <h2 className="h2-amiri">
          {this.props.data.markdownRemark.frontmatter.title}
        </h2>
        <section className="markdown-sourceSans">
          <ReactMarkdown
            source={this.props.data.markdownRemark.rawMarkdownBody}
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
