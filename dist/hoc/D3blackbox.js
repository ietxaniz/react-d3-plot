"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function D3blackbox(D3render) {
    return function (_React$Component) {
        _inherits(Blackbox, _React$Component);

        function Blackbox(props) {
            _classCallCheck(this, Blackbox);

            var _this = _possibleConstructorReturn(this, (Blackbox.__proto__ || Object.getPrototypeOf(Blackbox)).call(this, props));

            _this.anchorRef = _react2.default.createRef();
            _this.gridRef = _react2.default.createRef();
            return _this;
        }

        _createClass(Blackbox, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                D3render.call(this);
            }
        }, {
            key: "componentDidUpdate",
            value: function componentDidUpdate() {
                D3render.call(this);
            }
        }, {
            key: "render",
            value: function render() {
                var _props = this.props,
                    x = _props.x,
                    y = _props.y;

                return _react2.default.createElement(
                    "g",
                    null,
                    _react2.default.createElement("g", { transform: "translate(" + x + ", " + y + ")", ref: this.anchorRef }),
                    _react2.default.createElement("g", { transform: "translate(" + x + ", " + y + ")", className: "grid", ref: this.gridRef })
                );
            }
        }]);

        return Blackbox;
    }(_react2.default.Component);
}

exports.default = D3blackbox;