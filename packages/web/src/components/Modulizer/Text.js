import * as React from 'react';
import ReactHtmlParser from 'react-html-parser';

const excerpter = (text) => {
  const words = text.split(' ');
  const excerpt = words.slice(0, 25).join(' ');

  return words.length > 25 ? `${excerpt} ...` : excerpt;
};

const Text = ({ slide, excerpt }) => (
  <section className="parent-copy">
    {ReactHtmlParser(excerpt ? excerpter(slide.text) : slide.text)}
  </section>
);

export default Text;
