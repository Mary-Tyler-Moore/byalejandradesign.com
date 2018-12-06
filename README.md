# ByAlejandraDesigns.com

This is a lerna managed monorepo for all of the code associated with the e-commerce site ByAlejandraDesign. I aam using JAM stack fed by wordpress for the main site and employing the serverless platform for additional backend needs in the form of microservices. I am using the monorepo architecture to help with code sharing between the frontend and backend. All the models for object shapes are written and strongly typed using flow.js. These models can then be shared between front and backend code in order to faciliate development and reduce mistakes.

## The Services

1. Site (Gatsby)
2. Checkout Authentication (Serverless)
3. Mail Automation (Serverless)
4. Content API (Wordpress)

### Site Gatsby

Gatsby initially attracted me for this project because of their built-in tools for handling images. Since the work is of artistic quality I wanted to be able to resize and manipulate on the fly to provide the best quality images. Ultimately the development experience with Gatsby in this regard has become a little bit slow but the end result is really quite spectacular. I enjoy working in JAM stack as it provides speedy sites that greatly enhance the user experience. When working in e-commerce I think it is important to be as frictionless as possible.

### Checkout Authentication and Shared Code

Checkout is done using the braintree API. I needed a microservice to handle all of the authentication and to communicate with the braintree payment gateway. I chose serverless as this as it is not a full API, just a few endpoints and authentications. I used shared code from the checkout-objects package so that validation, objects shapes and transformations are consistent between the backend and frontend.

Transformations is the term I have given to preparing different types of informational objects so that they match the shape of the intended consumer. For example I use a consistent address format internally for storing address information. However, when sending these addresses to different consumers like paypal and braintree they must be transformed into the consumer's desired shape. Using these methods we can hopefully keep things simple, testable and easy to understand all while dealing with 3-4 different types of address formats across various parts of front and backend infrastructure.

Validations are shared and performed on the core object shapes so that they are consistent throughout the codebase and can be easily changed in the future.

Object shapes are provided along with default objects that have fake data for development purposes. Flowtypes can be imported and shared so that I can easily find errors when working with the objects.

### Mail Automation

I have created another microservice using the serverless package to handle emails. This package connects to mailgun and enables me to proxy mail requests from the frontend directly to the mailgun service.

The mail server handles all customer communication. Templates are shared via the templates package. They are built on the fly using react render to string methods and are sent out by the mail server as html strings. All design code is written in sass and is also rendered directly as strings in the head tag. Using this way of code sharing the corresponding templates can be imported directly into the site to achieve a consistent look and customer experience.

### Content API

Unfortunately at the moment the API is bootstrapped using wordpress and the WP-API framework. This allowed to get running quickly and I would love to convert this part of the stack to something else. Since this is basically only an admin panel for the client and a datasource for Gatsby I can alleviate some of the existing concerns regarding Wordpress. If everything progresses well it would be great to convert this to a custom graphql endpoint so the frontend can receive up to the second updates regarding production information. This would integrate well with Gatsby as all of the data queries are already written using graphql. Since graph is such an awesome flexible API it would be rather painless to convert and could also be done in steps. At the moment however the scope of the project simply did not require that and the build process is working quite well.
