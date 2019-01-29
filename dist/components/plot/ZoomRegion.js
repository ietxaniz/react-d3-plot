'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var ZoomRegion = function (_Component) {
    _inherits(ZoomRegion, _Component);

    function ZoomRegion(props) {
        _classCallCheck(this, ZoomRegion);

        var _this = _possibleConstructorReturn(this, (ZoomRegion.__proto__ || Object.getPrototypeOf(ZoomRegion)).call(this, props));

        _this.refMainWnd = _react2.default.createRef();

        _this.mouseDownEventHandler = _this.mouseDownEventHandler.bind(_this);
        _this.mouseUpEventHandler = _this.mouseUpEventHandler.bind(_this);
        _this.doubleClickEventHandler = _this.doubleClickEventHandler.bind(_this);

        _this.state = {
            x0: -1,
            y0: -1,
            x1: -1,
            y1: -1,
            pressed: false
        };
        return _this;
    }

    _createClass(ZoomRegion, [{
        key: 'mouseDownEventHandler',
        value: function mouseDownEventHandler() {
            this.setState({
                x0: -1,
                y0: -1,
                x1: -1,
                y1: -1,
                pressed: true
            });
            var main = this;
            d3.select(this.refMainWnd.current).on('mousemove', function () {
                if (main.state.pressed) {
                    var pos = d3.mouse(this);
                    if (main.state.x0 < 0) {
                        main.setState({ x0: pos[0], y0: pos[1] });
                    } else {
                        main.setState({ x1: pos[0], y1: pos[1] });
                    }
                }
            });
        }
    }, {
        key: 'mouseUpEventHandler',
        value: function mouseUpEventHandler() {
            this.setState({ pressed: false });
            d3.select(this.refMainWnd.current).on('mousemove', function () {});
            if (this.props.onZoom !== undefined) {
                if (Math.min(this.state.x0, this.state.x1, this.state.y0, this.state.y1) < 0) {
                    return;
                }
                var x0 = (Math.min(this.state.x0, this.state.x1) - this.props.x) / this.props.width;
                var x1 = (Math.max(this.state.x0, this.state.x1) - this.props.x) / this.props.width;
                var y0 = (Math.min(this.state.y0, this.state.y1) - this.props.y) / this.props.height;
                var y1 = (Math.max(this.state.y0, this.state.y1) - this.props.y) / this.props.height;
                this.props.onZoom({
                    x0: x0,
                    y0: y0,
                    x1: x1,
                    y1: y1
                });
            }
        }
    }, {
        key: 'doubleClickEventHandler',
        value: function doubleClickEventHandler() {
            if (this.props.onZoomReset !== undefined) {
                this.props.onZoomReset();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var x = this.props.x;
            var y = this.props.y;
            var height = this.props.height;
            var width = this.props.width;

            var xZoom = this.state.x0;
            var yZoom = this.state.y0;
            var heightZoom = this.state.y1 - this.state.y0;
            var widthZoom = this.state.x1 - this.state.x0;
            if (heightZoom < 0) {
                yZoom = yZoom + heightZoom;
                heightZoom = -heightZoom;
            }
            if (widthZoom < 0) {
                xZoom = xZoom + widthZoom;
                widthZoom = -widthZoom;
            }

            return _react2.default.createElement(
                'g',
                null,
                this.state.pressed && _react2.default.createElement('rect', {
                    x: xZoom,
                    y: yZoom,
                    height: heightZoom,
                    width: widthZoom,
                    style: {
                        fill: '#0000f0',
                        fillOpacity: 0.5,
                        stroke: '#ffffff' }
                }),
                _react2.default.createElement('rect', {
                    x: x,
                    y: y,
                    height: height,
                    width: width,
                    onMouseDown: this.mouseDownEventHandler,
                    onMouseUp: this.mouseUpEventHandler,
                    onDoubleClick: this.doubleClickEventHandler,
                    ref: this.refMainWnd,
                    style: {
                        fill: '#f0f0f0',
                        fillOpacity: 0.2,
                        stroke: '#ffffff' }
                })
            );
        }
    }]);

    return ZoomRegion;
}(_react.Component);

exports.default = ZoomRegion;