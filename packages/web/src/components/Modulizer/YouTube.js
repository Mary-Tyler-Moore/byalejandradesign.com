import React from 'react';
import queryString from 'query-string';
import './youtube.sass';

const YouTube = ({ slide } = {}) => {
  const stub = 'https://www.youtube.com/embed';

  const options = {
    rel: 0,
    modestbranding: 1,
  };

  const query = queryString.stringify(options);

  const source = `${stub}/${slide.video_id}?${query}`;

  return (
    <section className="youtube_container">
      <iframe
        title={`youtube-embed-${slide.video_id}`}
        className="youtube_iframe"
        type="text/html"
        width="100%"
        height="100%"
        src={source}
        frameBorder="0"
      />
    </section>
  );
};

export default YouTube;
