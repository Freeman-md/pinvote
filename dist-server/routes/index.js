"use strict";

var _express = _interopRequireDefault(require("express"));
var _indexController = require("../controllers/index-controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();

/* GET home page. */
router.get('/', _indexController.index);
router.get('/:id', _indexController.view);
router.get('/:id/voters', _indexController.viewVoters);
module.exports = router;