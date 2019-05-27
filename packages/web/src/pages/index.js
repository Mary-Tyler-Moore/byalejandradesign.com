import React from 'react';
import { graphql } from 'gatsby';
import { PostExcerpt } from '../components/CloudStudio';
import { CollectionList } from '../components/Collections';
import { HeroMain } from '../components/Hero';
import Layout from '../components/Layout';
import Head from '../components/Head';
import Iframe from '../components/Iframe';

import renegade from '../assets/renegade.gif';

import './cloud-studio.sass';
import './index.sass';

const IndexPage = ({ data, location }) => (
  <React.Fragment>
    <Head location={location} />
    <Layout hero={HeroMain}>
      <section className="news_headline">
        <h4 className="headline">Upcoming Events</h4>
        <p className="copy">
          We are very excited to announce that we will be at the Renegade Craft
          Fair at the Brooklyn Expo Center!!! If you are in NYC stop by to see
          our collections on June 22-23 at the Brooklyn Expo Center. Also make
          sure you subscribe, we have more exciting news to share!
        </p>
      </section>
      <section className="news">
        <img src={renegade} />
        <Iframe
          src="https://libs.a2zinc.net/Common/Widgets/ExhibitorBadge.aspx?applicationid=gM+M1z2efQdG+80vAgrVYldily4MF7jwI+voQf0xjKDx/f/3oqsywXi/TjKM5ggR&CompanyID=858315&BoothID=932807&EventID=1441"
          frameBorder="0"
          allowtransparency="true"
          scrolling="no"
          ratio={190 / 331}
        />
      </section>
      <CollectionList edges={data.allWordpressWpCollections.edges} />
      <h4 className="headline" style={{ marginTop: '2rem' }}>
        Cloud Studio
      </h4>
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
