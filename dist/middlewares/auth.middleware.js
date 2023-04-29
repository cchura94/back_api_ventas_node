"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = void 0;
var _jsonwebtoken = _interopRequireWildcard(require("jsonwebtoken"));
var _error = require("../helpers/error");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const auth = function (req, res, next) {
  let token = null;
  if (req.headers.authorization) {
    // Bearer abx.xyz.123
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    /*return res.status(401).json(
        {
            auth: false,
            message: "No se proporcionó el token de seguridad"
        }
    )
    */
    throw new _error.ErrorHandler(401, 'No se proporcionó el token de seguridad');
  }
  _jsonwebtoken.default.verify(token, "MI_CODIGO_SECRETO", (error, decode) => {
    if (error) {
      /*
      return res.status(401).json({
          auth: false,
          message: "El token ingresado ha expirado"
      })*/
      throw new _error.ErrorHandler(401, 'El token ingresado ha expirado');
    }
    // correcto
    req.user = decode.user;
    next();
  });
};
exports.auth = auth;