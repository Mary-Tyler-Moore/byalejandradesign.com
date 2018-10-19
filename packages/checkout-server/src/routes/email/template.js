type Head = {
  title: string,
  style: string,
};

const defaultHead = {
  title: 'Message from Artetexture',
  style: '',
};

type Template = (body: string, head: Head) => string;

const template = (body, head = defaultHead) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://fonts.googleapis.com/css?family=Amiri:400,400i,700,700i|Source+Sans+Pro:300,300i,600,600i" rel="stylesheet">
    <title>${head.title}</title>
    <style>${head.style}</style>
  </head>
  <body>
    ${body}
  </body>
</html>
`;

export default template;
