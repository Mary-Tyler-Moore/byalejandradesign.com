import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware, ActionsObservable } from 'redux-observable';

import braintreeEpic from '../braintree-epic';
import { clientTokenRequest } from '../braintree-actions';

const epicMiddleware = createEpicMiddleware(braintreeEpic);
const mockStore = configureMockStore([epicMiddleware]);

const delay = (time = 500) =>
  new Promise((res, rej) =>
    setTimeout(() => {
      res();
    }, time)
  );

describe('observable testing for braintree token flow', () => {
  // let store;
  // beforeEach(() => {
  //   store = mockStore();
  // });
  // afterEach(() => {
  //   nock.cleanAll();
  //   epicMiddleware.replaceEpic(braintreeEpic);
  // });
  // test('it produces the request action', (done) => {
  //   const response = { clientToken: 'asdateaerawerawer' };
  //   nock(process.env.REACT_APP_BRAINTREE_URL)
  //     .get('/client_token')
  //     .reply(200, response);
  //   store.dispatch(clientTokenRequest());
  //   delay(1000).then(() => {
  //     expect(store.getActions()).toBe([{ object: 'value' }]);
  //     done();
  //   });
  // });
  // test('it produces the request action', (done) => {
  //   const response = { clientToken: 'asdateaerawerawer' };
  //   nock(process.env.REACT_APP_BRAINTREE_URL)
  //     .get('/client_token')
  //     .reply(200, response);
  //   store.dispatch(clientTokenRequest());
  //   delay(1000).then(() => {
  //     expect(store.getActions()).toBe([{ object: 'value' }]);
  //     done();
  //   });
  // });
});
