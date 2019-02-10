import * as React from 'react';
import { graphql } from 'gatsby';
import ReactMarkdown from 'react-markdown';
import Layout from '../components/Layout';
import Head from '../components/Head';
import Header from '../components/Header';
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
        <Layout
          header={() => (
            <Header>
              <p>Shop Now</p>
            </Header>
          )}
        >
          <h3 className="h3-sourceSans">{this.title}</h3>
          <section className="markdownPage">
            <ReactMarkdown source={this.body} className="markdown-sourceSans" />
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
