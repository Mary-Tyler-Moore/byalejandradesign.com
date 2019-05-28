import React from 'react';
import { graphql } from 'gatsby';

import westElm from '@byalejandradesign/assets/images/west-elm-broadway-7-20-2019.jpg';
import renegade from '@byalejandradesign/assets/images/renegade.gif';
import nyNow from '@byalejandradesign/assets/images/ny-now-8-10-2019.jpg';

import GridSection from '../layouts/GridSection';

import { PostExcerpt } from '../components/CloudStudio';
import { CollectionList } from '../components/Collections';
import { HeroMain } from '../components/Hero';
import Layout from '../components/Layout';
import Head from '../components/Head';

import './cloud-studio.sass';
import './index.sass';

const IndexPage = ({ data, location }) => (
  <React.Fragment>
    <Head location={location} />
    <Layout hero={HeroMain}>
      <GridSection
        className="news"
        heading={() => 'Upcoming Events'}
        copy={() =>
          'We are very excited to announce that we will be at the Renegade Craft Fair at the Brooklyn Expo Center!!! If you are in NYC stop by to see our collections on June 22-23 at the Brooklyn Expo Center. Also make sure you subscribe, we have more exciting news to share!'
        }
      >
        <img src={renegade} alt="Renegade Art Fair" />
        <img src={westElm} alt="West Elm Broadway July 20th 2019" />
        <img src={nyNow} alt="NY Now August 8 2019" />
      </GridSection>
      <CollectionList edges={data.allWordpressWpCollections.edges} />
      <GridSection heading={() => 'Cloud Studio'}>
        {data.allWordpressPost.edges.map(({ node }) => (
          <PostExcerpt key={node.id} node={node} />
        ))}
      </GridSection>
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
