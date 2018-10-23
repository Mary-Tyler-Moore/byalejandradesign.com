// @flow
import mailgunJS from 'mailgun-js';

type Message = {
  to: string,
  from: string,
  subject: string,
  text?: string,
  html?: string,
};

type Member = {
  name: string,
  address: string,
  vars: {},
};

type Intitializer = {
  apiKey: string,
  domain: string,
};

type Method = (resource: string, data: {}) => Promise<string>;

const safeArray = (arg) => (Array.isArray(arg) ? arg : [arg]);

class Mailgun<T> {
  api: {
    //   messages: () => mixed,
    //   members: () => mixed,
    //   add: () => mixed,
    //   lists: () => mixed,
  };
  get: Method;
  post: Method;
  delete: Method;
  put: Method;

  constructor({ apiKey, domain, ...options }: Intitializer) {
    this.api = mailgunJS({ apiKey, domain });
  }

  // default sending function
  send = (message: Message): Promise<string> =>
    new Promise((res, rej) => {
      this.api.messages().send(message, (error, body) => {
        if (error) {
          rej(error);
        } else {
          res(body);
        }
      });
    });

  // list adder
  lists = (
    lists: string | Array<string>,
    members: Array<Member>
  ): Promise<string> =>
    new Promise((res, rej) => {
      this.api
        .lists(safeArray(lists))
        .members()
        .add(
          { members: safeArray(members), subscribed: true },
          (error, body) => {
            this.api.messages().send(message, (error, body) => {
              if (error) {
                rej(error);
              } else {
                res(body);
              }
            });
          }
        );
    });

  genericCreator: (type: string) => Method = (type) => (resource, data) =>
    new Promise((res, rej) => {
      this.api[type](resource, data, (error, body) => {
        if (error) {
          rej(error);
        } else {
          res(body);
        }
      });
    });

  // init generic requestors
  put = this.genericCreator('put');
  delete = this.genericCreator('delete');
  post = this.genericCreator('post');
  get = this.genericCreator('get');
}

export default Mailgun;
