"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouteAuth = void 0;
var _express = require("express");
var _auth = _interopRequireDefault(require("./../controllers/auth.controller"));
var authMiddleware = _interopRequireWildcard(require("./../middlewares/auth.middleware"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const RouteAuth = (0, _express.Router)();
exports.RouteAuth = RouteAuth;
RouteAuth.post('/auth/login', _auth.default.login);
RouteAuth.post('/auth/register', _auth.default.register);
RouteAuth.get('/auth/perfil', authMiddleware.auth, _auth.default.perfil);
RouteAuth.post('/auth/logout', authMiddleware.auth, _auth.default.logout);