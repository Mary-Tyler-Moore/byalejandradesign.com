const mapTaxonomyToPostType = require('./map-taxonomy-to-post-type');

const mapPostTypeToTaxonomies = (postType) => (taxonomy) => (entities) =>
  mapTaxonomyToPostType(taxonomy)(postType)(entities);

module.exports = mapPostTypeToTaxonomies;
