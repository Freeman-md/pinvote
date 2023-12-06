"use strict";

var _express = _interopRequireDefault(require("express"));
var _indexController = require("../controllers/index-controller");
var _queryParamValidation = require("../middlewares/query-param-validation");
var _voteController = require("../controllers/vote-controller");
var _pollValidator = _interopRequireDefault(require("../requests/poll-validator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();

/* GET home page. */
router.get('/', _indexController.index);
router.get('/polls/:id', (0, _queryParamValidation.validateParam)('id'), _indexController.view);
router.post('/polls/:id/vote', (0, _queryParamValidation.validateParam)(['id']), _pollValidator["default"].validateOptionInPoll, _voteController.vote);
router.get('/polls/:id/voters', (0, _queryParamValidation.validateParam)('id'), _indexController.viewVoters);
router.get('/csrf-token', function (req, res, next) {
  res.json({
    csrfToken: req.csrfToken()
  });
});
module.exports = router;