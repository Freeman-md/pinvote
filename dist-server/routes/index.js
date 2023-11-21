"use strict";

var _express = _interopRequireDefault(require("express"));
var _indexController = require("../controllers/index-controller");
var _expressValidator = require("express-validator");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();

/* GET home page. */
router.get('/', _indexController.index);
router.get('/polls/:id', (0, _expressValidator.query)('id').trim().notEmpty().escape(), _indexController.view);
router.get('/polls/:id/voters', _indexController.viewVoters);
module.exports = router;