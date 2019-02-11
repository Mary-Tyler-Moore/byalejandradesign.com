import React from 'react';
import { graphql, Link } from 'gatsby';
import { PostExcerpt } from '../components/CloudStudio';
import { CollectionList } from '../components/Collections';
import Button from '../components/Button';
import Layout from '../components/Layout';
import Head from '../components/Head';
import Iframe from '../components/Iframe';

import './cloud-studio.sass';
import './index.sass';

const IndexPage = ({ data, location }) => (
  <React.Fragment>
    <Head location={location} />
    <Layout>
      <h3 className="h3-roboto">West Elm Pop-Up Show</h3>
      <p className="body-sourceSans-1">
        Very excited to announce that we will be at the West Elm Pop Up show on
        February 24th from 2-5pm!
      </p>
      <section className="news">
        <Iframe
          src="https://www.youtube.com/embed/ZiuBDfmBtM8?controls=1&rel=0&modestbranding=1&showinfo=0"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <Iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.6452173426746!2d-73.99330298418744!3d40.703810679332854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a3141b489cf%3A0x137db3ff6c40dbae!2swest+elm!5e0!3m2!1sen!2sus!4v1548607544501"
          width="100%"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
        />
      </section>
      <CollectionList edges={data.allWordpressWpCollections.edges} />
      <h3 className="h3-roboto">Cloud Studio</h3>
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
