'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LeftAxis = function (_Component) {
    _inherits(LeftAxis, _Component);

    function LeftAxis(props) {
        _classCallCheck(this, LeftAxis);

        var _this = _possibleConstructorReturn(this, (LeftAxis.__proto__ || Object.getPrototypeOf(LeftAxis)).call(this, props));

        _this.textRef = _react2.default.createRef();
        _this.gridRef = _react2.default.createRef();

        _this.updateLeftAxis = _this.updateLeftAxis.bind(_this);
        _this.drawLabel = _this.drawLabel.bind(_this);
        return _this;
    }

    _createClass(LeftAxis, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.updateLeftAxis();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.updateLeftAxis();
        }
    }, {
        key: 'updateLeftAxis',
        value: function updateLeftAxis() {
            var domain = [0, 10];
            if (this.props.domain !== undefined) {
                domain = this.props.domain;
            }
            var scale = d3.scaleLinear().domain(domain).range([this.props.height, 0]);

            var axis = d3.axisLeft(scale);

            d3.select(this.textRef.current).call(axis.tickSizeOuter(-this.props.width));

            d3.select(this.gridRef.current).call(axis.tickSizeInner(-this.props.width).tickFormat(""));

            d3.select(this.gridRef.current).selectAll("line").attr("stroke", "#999").attr("stroke-dasharray", "2,2");

            var maxLength = 0;

            d3.select(this.textRef.current).selectAll('text').each(function (n) {
                // console.log(d3.select(this));
                var itemLength = 10;
                try {
                    d3.select(this).node().getComputedTextLength();
                } catch (err) {}

                if (itemLength > maxLength) {
                    maxLength = itemLength;
                }
            });

            if (this.props.x - Math.ceil(maxLength) < 15) {
                if (this.props.updateAxisWidth !== undefined) {
                    this.props.updateAxisWidth(Math.ceil(maxLength));
                }
            } else if (this.props.x - Math.ceil(maxLength) > 30) {
                if (this.props.updateAxisWidth !== undefined) {
                    this.props.updateAxisWidth(Math.ceil(maxLength));
                }
            }

            this.drawLabel();
        }
    }, {
        key: 'drawLabel',
        value: function drawLabel() {
            var label = { 'text': '' };
            label = _extends({}, label, this.props.label);
            if (label.text.length > 0) {}
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                x = _props.x,
                y = _props.y;

            return _react2.default.createElement(
                'g',
                null,
                _react2.default.createElement('g', { transform: 'translate(' + x + ', ' + y + ')', ref: this.textRef }),
                _react2.default.createElement('g', { transform: 'translate(' + x + ', ' + y + ')', className: 'grid', ref: this.gridRef })
            );
        }
    }]);

    return LeftAxis;
}(_react.Component);

exports.default = LeftAxis;