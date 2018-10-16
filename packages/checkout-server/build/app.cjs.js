'use strict';

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var express = _interopDefault(require('express'));
var braintree = _interopDefault(require('braintree'));
var dotenv = _interopDefault(require('dotenv'));
var cors = _interopDefault(require('cors'));
var bodyParser = _interopDefault(require('body-parser'));
var serverless = _interopDefault(require('serverless-http'));

const router = express.Router();
router.all('/*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'not a valid endpoint',
  });
});

dotenv.config();
const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }

    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

const checkout =
  /*#__PURE__*/
  (function() {
    var _ref = _asyncToGenerator(function*(req, res) {
      const {
        paymentMethodNonce,
        amount,
        billing,
        shipping,
        customer,
        lineItems,
        orderId,
      } = req.body;

      try {
        // const customer = await gateway.customer;
        const result = yield gateway.transaction.sale({
          amount,
          paymentMethodNonce,
          billing,
          shipping,
          customer,
          lineItems,
          orderId,
          options: {
            submitForSettlement: true,
          },
        });
        res.status(200).json({
          result,
        });
      } catch (e) {
        console.log(e);
        res.status(404).json({
          status: 404,
          error: e,
        });
      }
    });

    return function checkout(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  })();

const clientToken =
  /*#__PURE__*/
  (function() {
    var _ref = _asyncToGenerator(function*(req, res) {
      try {
        const clientToken = yield gateway.clientToken.generate({});
        res.status(200).json(
          _objectSpread(
            {
              status: 200,
            },
            clientToken
          )
        );
      } catch (e) {
        res.status(404).json({
          status: 404,
          message: e,
        });
      }
    });

    return function clientToken(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  })();

// initialize router
const router$1 = express.Router();
router$1.get('/client_token', clientToken);
router$1.post('/checkout', checkout);

// types

/**
 * All of the routes in order as an array. !IMPORTANT in order...
 * Express will map through these and apply them with app.use()
 * @type {array}
 */
const routes = [router$1, router];

const origins = ['https://artetexture.netlify.com'];
const corsMiddleware = cors({
  origin: origins,
  methods: 'POST, GET',
  allowedHeaders: ['Content-Type', 'Authorization'],
});

const urlEncoded = bodyParser.urlencoded({
  extended: false,
});
const json = bodyParser.json();
var body = [urlEncoded, json];

const requestAPIKey = process.env.REQUEST_API_KEY;

const auth = (req, res, next) => {
  const key = req.get('Authorization');
  if (key === requestAPIKey) next();
  else
    res.status(401).json({
      status: 401,
      error: 'not authorized',
    });
};

function secure(req, res, next) {
  const isSecure = req.protocol;
  if (isSecure) next();
  else
    res.status(401).json({
      status: 401,
      error: 'only secure origins are allowed',
    });
}

function responseHeaders(req, res, next) {
  res.header({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  });
  next();
}

/**
 * All of the middleware in order. !IMPORTANT in order.
 * Express will map through and apply these with app.use();
 * @type {array}
 */

const middleware = [corsMiddleware, ...body, auth, secure, responseHeaders];

const app = express(); // apply all middleware

middleware.forEach((middlware) => app.use(middlware)); // apply all top level routes

routes.forEach((router) => app.use('/', router)); // export final route like this instead of using export for serverless

module.exports.handler = serverless(app);
//# sourceMappingURL=app.cjs.js.map
