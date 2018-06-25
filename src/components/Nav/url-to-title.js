import { kebabToSentence, compose, capitalize } from 'smalldash';

/**
 * Removes leading and trailing slash from url string
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
const removeSlash = (url) => {
  const regex = /\//gi;
  // console.log(url.split(regex));
  return url.split(regex)[1];
};

/**
 * Changes url to title case
 * @type {[type]}
 */
const URLToTitle = compose(
  capitalize,
  kebabToSentence,
  removeSlash
);

export default URLToTitle;
