'use strict';

var moment = require('moment');
var _      = require('lodash');

const PROPS = {
  id: {
    nullable: false
  },
  description: {
    nullable: false
  },
  category: {
    default: 'uncategorized'
  },
  createdAt: {
    default: () => moment().format()
  },
  isComplete: {
    default: false
  }
};

function checkNullable(obj) {
  if (!obj) {
    throw new Error('Arguments must be provided.');
  }

  let key;
  for (key in PROPS) {
    if (PROPS[key].default === undefined &&
      PROPS[key].nullable === false &&
      obj[key] === undefined) {
      throw new Error(`'${key}' must be provided.`);
    }
  }
}

function Todo(obj) {
  checkNullable(obj);

  let key;
  for (key in PROPS) {
    let defaultValue;
    if (typeof PROPS[key].default === 'function') {
      defaultValue = PROPS[key].default();
    } else {
      defaultValue = PROPS[key].default;
    }
    this[key] = obj[key] || defaultValue;
  }
}

Todo.hasUnknownProperty = (obj) => {
  let result = false;

  if (!obj) {
    throw new Error('Arguments must be provided.');
  }

  let key;
  for (key in obj) {
    if (!PROPS.hasOwnProperty(key)) {
      result = true;
    }
  }

  return result;
};

Todo.prototype.update = function(obj) {
  this.description = obj.description || this.description;
  this.category = obj.category || this.category;
  this.isComplete = obj.isComplete || this.isComplete;
  return this;
};

module.exports = Todo;
