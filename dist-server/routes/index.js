"use strict";

var _express = _interopRequireDefault(require("express"));
var _indexController = require("../controllers/index-controller");
var _expressValidator = require("express-validator");
var _queryParamValidation = require("../middlewares/query-param-validation");
var _voteController = require("../controllers/vote-controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();

/* GET home page. */
router.get('/', _indexController.index);
router.get('/polls/:id', (0, _queryParamValidation.validateParam)('id'), _indexController.view);
router.post('/polls/:pollId/vote/:optionId', (0, _queryParamValidation.validateParam)(['pollId', 'optionId']), _voteController.vote);
router.get('/polls/:id/voters', _indexController.viewVoters);
module.exports = router;