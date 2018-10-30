# Business

This is a lerna managed monorepo for all of the code associated with the e-commerce site ByAlejandraDesigns. I am trying to take advantage of modern technological models by employing microservices architecture and using serverless platforms. I am using this monorepo architecture to help in code sharing between the front-end and back-end.

## Services

1. Site (Gatsby)
2. Checkout (Serverless)
3. Mail (Serverless)
4. API (Wordpress)

Unfortunately at the moment the API is bootstrapped using wordpress and the WP-API technology. This allowed to get running quickly and I would love to convert this part of the stack to something else. The other services handle different parts of interaction, authorization and automation on the front-end site.

The checkout service handles all of the transactions and communicates with braintree as the payment gateway. It uses shared code from the checkout-objects package so that validation, development objects and transformations are consisitent between the backend and frontend. Transformations include preparing different types of informational objects so that they match the shape of the intended consumer while validations are performed on the core object shapes that are consisitent throughout this codebase. As an example I use a consisitent address format internally that is validated. When sending these addresses to different consumers like paypal and braintree they must be transformed into the consumer's desired shape. Using these methods we can hopefully keep things simple, testable and easy to understand all while dealing with 3-4 different types of address formats.

The mail server handles all customer communication. Templates are shared via the templates package. They are then hosted by the mail server and served in the emailers. The corresponding templates can also be imported directly into the site where they can display the same information. The entire front-end has it's own deploy so templates are not shared in the way they are served. Each point of origin has it's own method for building, deploying and eventually serving the templates.
