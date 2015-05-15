'use strict';

exports.__esModule = true;

/**
 * Creates a new relations on a model.
 *
 * @param {Bookshelf.Model} model - A bookshelf model instance
 * @param {String} relationName - An object containing the relations.
 * @param {Array} linkage - Linkage objects.
 * @returns {Promise.Bookshelf.Model} The updated model.
 */
exports['default'] = createRelation;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _id = require('./id');

var _id2 = _interopRequireDefault(_id);

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

var _relate = require('./relate');

var _relate2 = _interopRequireDefault(_relate);

var _related = require('./related');

var _related2 = _interopRequireDefault(_related);

var _transact = require('./_transact');

var _transact2 = _interopRequireDefault(_transact);

function createRelation(model, relationName, linkage) {
  if (!model) {
    throw new Error('No model provided.');
  }
  return _transact2['default'](model, function (transaction) {
    var existingLinkage = _related2['default'](model, relationName).map(function (rel) {
      return {
        id: _id2['default'](rel),
        type: _type2['default'](rel)
      };
    });
    var allLinkage = linkage.concat(existingLinkage);
    // TODO: should i be doing a deep comparison instead?
    var uniqueLinkage = _lodash2['default'].uniq(allLinkage, JSON.stringify.bind(null));
    return _relate2['default'](model, {
      name: relationName,
      linkage: uniqueLinkage
    }, 'add', transaction);
  });
}

module.exports = exports['default'];