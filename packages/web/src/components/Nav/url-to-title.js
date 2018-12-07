import { kebabToSentence, compose, capitalize } from 'smalldash';

const addNonBreakingSpace = (string) => {
  return string.replace(/\s/gi, '\u00A0');
};

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
  addNonBreakingSpace,
  capitalize,
  kebabToSentence,
  removeSlash
);

export default URLToTitle;
