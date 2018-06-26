import { kebabToSentence, compose, capitalize } from 'smalldash';

/**
 * Removes leading and trailing slash from url string
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
const removeSlash = (url) => {
  const regex = /\//gi;
  const split = url.split(regex);
  return split.length > 1 ? split[1] : split[0];
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
