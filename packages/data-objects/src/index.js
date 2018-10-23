import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { graphql } from 'gatsby';

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  fragment SparsePostData on wordpress__POST {\n    id\n    slug\n    title\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var sparsePostData = graphql(_templateObject()); //

export { sparsePostData };
//# sourceMappingURL=index.js.map
