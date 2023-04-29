"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _error = require("./helpers/error");
var _auth = require("./routes/auth.routes");
var _admin = require("./routes/admin.routes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var history = require('connect-history-api-fallback');
const app = (0, _express.default)();
app.use(history());
const PORT = process.env.PORT || 3000;
app.use((0, _cors.default)());

// para: req.body
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));

// static
app.use(_express.default.static('public'));
app.use((req, res) => {
  console.log(path.join(__dirname, 'public/index.html'));
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
// rutas
app.use('/api', _auth.RouteAuth);
app.use('/api/v1', _admin.RouteAdmin);
app.get("/error", (req, res) => {
  throw new _error.ErrorHandler(500, 'Error Interno del Servidor');
});
app.use((err, req, res, next) => {
  (0, _error.handleError)(err, res);
});
app.listen(PORT, () => {
  console.log('Servidor Corriendo');
});