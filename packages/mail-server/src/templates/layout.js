/** @flow */
import css from './layout.sass';

type Head = {
  title: string,
  stylesheets: string,
};

const defaultHead = {
  title: 'Message from ByAlejandraDesign',
  stylesheets: '',
};

type Template = (body: string, head: Head) => string;

const template: Template = (body, head = defaultHead) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://fonts.googleapis.com/css?family=Amiri:400,400i,700,700i|Source+Sans+Pro:300,300i,600,600i" rel="stylesheet">
    <title>${head.title}</title>
    <style>
      ${css}
      ${head.stylesheets}
    </style>
  </head>
  <body>
    ${body}
  </body>
</html>
`;

export default template;
