import * as React from 'react';
import { graphql } from 'gatsby';
import ReactMarkdown from 'react-markdown';
import Layout from '../components/Layout';
import Head from '../components/Head';
// styles
import './markdown.sass';

class MarkdownPage extends React.Component {
  get title() {
    return this.props.data.markdownRemark.frontmatter.title;
  }

  get body() {
    return this.props.data.markdownRemark.rawMarkdownBody;
  }

  render() {
    return (
      <React.Fragment>
        <Head location={this.props.location} title={this.title} />
        <Layout>
          <h4 className="headline" style={{ margin: 0 }}>
            {this.title}
          </h4>
          <section className="markdownPage">
            <ReactMarkdown source={this.body} className="markdown-copy" />
          </section>
        </Layout>
      </React.Fragment>
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
