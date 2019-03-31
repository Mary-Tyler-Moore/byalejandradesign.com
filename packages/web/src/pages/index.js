import React from 'react';
import { graphql } from 'gatsby';
import { PostExcerpt } from '../components/CloudStudio';
import { CollectionList } from '../components/Collections';
import { HeroMain } from '../components/Hero';
import Layout from '../components/Layout';
import Head from '../components/Head';
import Iframe from '../components/Iframe';

import photo from '../assets/west-elm-pop-up.jpg';

import './cloud-studio.sass';
import './index.sass';

const IndexPage = ({ data, location }) => (
  <React.Fragment>
    <Head location={location} />
    <Layout hero={HeroMain}>
      <section className="news_headline">
        <h3 className="h3-roboto">News</h3>
        <p className="body-sourceSans-1">
          Very excited to announce that we will be at the West Elm Broadway Pop
          Up show on May 4th from 12-5pm! I will be working with Poy T. Granati.
          She makes the most amazing paper flowers! See more of her work{' '}
          <a href="https://summerspace.studio/">here</a>
        </p>
      </section>
      <section className="news">
        <img src={photo} style={{ width: '100%' }} />
        <Iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30269.046148227888!2d-73.97753803400416!3d40.78261995760309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bcde4ee591%3A0xbf1b631afb8b1875!2swest+elm!5e0!3m2!1sen!2sus!4v1554056152842!5m2!1sen!2sus"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
        />
      </section>
      <CollectionList edges={data.allWordpressWpCollections.edges} />
      <h3 className="h3-roboto" style={{ marginTop: '2rem' }}>
        Cloud Studio
      </h3>
      <section className="postList">
        {data.allWordpressPost.edges.map(({ node }) => (
          <PostExcerpt key={node.id} node={node} />
        ))}
      </section>
    </Layout>
  </React.Fragment>
);

export default IndexPage;

export const query = graphql`
  query HomePageSample {
    allWordpressPost(limit: 3) {
      edges {
        node {
          ...PostExcerptFragment
        }
      }
    }
    allWordpressWpCollections {
      edges {
        node {
          ...CollectionExcerptFragment
        }
      }
    }
  }
`;
