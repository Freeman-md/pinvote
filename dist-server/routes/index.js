"use strict";

var _express = _interopRequireDefault(require("express"));
var _indexController = _interopRequireDefault(require("../controllers/index-controller"));
var _queryParamValidator = require("../requests/query-param-validator");
var _voteController = _interopRequireDefault(require("../controllers/vote-controller"));
var _pollValidator = _interopRequireDefault(require("../requests/poll-validator"));
var _validator = _interopRequireDefault(require("../requests/validator"));
var _notificationController = _interopRequireDefault(require("../controllers/notification-controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();

/* GET home page. */
router.get('/', (0, _queryParamValidator.validateQuery)('searchTerm'), _indexController["default"].index);
router.get('/polls/:id', (0, _queryParamValidator.validateParam)('id'), _indexController["default"].view);
router.post('/polls/:id/vote', (0, _queryParamValidator.validateParam)(['id']), _pollValidator["default"].validateOptionExistsAndPollIsActive, _voteController["default"].vote);
router.get('/polls/:id/voters', (0, _queryParamValidator.validateParam)('id'), _voteController["default"].view);
router.post('/notifications/:id/mark-as-read', (0, _queryParamValidator.validateParam)('id'), _notificationController["default"].markAsRead);
router.get('/csrf-token', function (req, res, next) {
  res.json({
    csrfToken: req.csrfToken()
  });
});
module.exports = router;