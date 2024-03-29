'use strict';

import { Context } from 'egg';
import { resolve } from 'path';

const createHandler = require('../../lib/github-webhook-handler');
const isPlainObject = require('lodash/isPlainObject');
const forEach = require('lodash/forEach');

interface IEvent {
  [eventName: string]: Function;
}

interface IOption {
  path: string;
  secret: string;
  event?: IEvent;
}

module.exports = (option: IOption) => {
  const { path, secret, event } = option;
  const handler = createHandler({ path, secret });

  if (isPlainObject(event)) {
    forEach(event, (e, eventName) => {
      if (typeof e === 'function') {
        handler.on(eventName, e);
      } else if (typeof e === 'string') {
        handler.on(eventName, require(resolve(e)));
      }
    });
  }

  return handler;
};
