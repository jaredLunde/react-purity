'use strict'

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = pure

var _object = _interopRequireDefault(require('empty/object'))

var _cdllMemoize = _interopRequireWildcard(require('cdll-memoize'))

// provides memoization to pure SFCs
function pure(Component, opt) {
  if (opt === void 0) {
    opt = _object.default
  }

  var _opt = opt,
    _opt$size = _opt.size,
    size = _opt$size === void 0 ? 16 : _opt$size,
    _opt$isEqual = _opt.isEqual,
    _isEqual =
      _opt$isEqual === void 0 ? _cdllMemoize.shallowEqual : _opt$isEqual,
    _opt$debug = _opt.debug,
    debug = _opt$debug === void 0 ? false : _opt$debug

  return (0, _cdllMemoize.default)(Component, {
    size: size,
    debug: debug,
    isEqual: function isEqual(a, b) {
      // React components only take one arg (props)
      return _isEqual(a[0], b[0])
    },
  })
}
