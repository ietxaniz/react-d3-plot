module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("d3");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _d = __webpack_require__(1);

var d3 = _interopRequireWildcard(_d);

var _Axis = __webpack_require__(3);

var _ZoomRegion = __webpack_require__(4);

var _ZoomRegion2 = _interopRequireDefault(_ZoomRegion);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Plot = function (_Component) {
    _inherits(Plot, _Component);

    function Plot(props) {
        _classCallCheck(this, Plot);

        var _this = _possibleConstructorReturn(this, (Plot.__proto__ || Object.getPrototypeOf(Plot)).call(this, props));

        _this.signalsRef = _react2.default.createRef();
        _this.parentDivRef = _react2.default.createRef();

        _this.zoomEventHandler = _this.zoomEventHandler.bind(_this);
        _this.zoomResetEventHandler = _this.zoomResetEventHandler.bind(_this);

        var outerXRange = [0, 1];
        var outerYRange = [0, 1];
        var signals = [];

        if (_this.props.signals !== undefined) {
            var minx = 1e100;
            var maxx = -1e100;
            var miny = 1e100;
            var maxy = -1e100;

            for (var i = 0; i < _this.props.signals.length; i++) {
                var signal = _this.props.signals[i];
                minx = Math.min(minx, Math.min.apply(Math, _toConsumableArray(signal.xData)));
                maxx = Math.max(maxx, Math.max.apply(Math, _toConsumableArray(signal.xData)));
                miny = Math.min(miny, Math.min.apply(Math, _toConsumableArray(signal.yData)));
                maxy = Math.max(maxy, Math.max.apply(Math, _toConsumableArray(signal.yData)));

                signals.push(parseSignal(_this.props.signals[i]));
            }

            outerXRange = [minx, maxx];
            outerYRange = [miny, maxy];
        }

        _this.state = {
            margin: {
                left: 40,
                top: 10,
                bottom: 25,
                right: 10
            },
            width: 510,
            height: 400,
            outerXRange: outerXRange,
            outerYRange: outerYRange,
            currentXRange: outerXRange,
            currentYRange: outerYRange,
            signals: signals,
            previousNumberOfSignals: 0
        };
        return _this;
    }

    _createClass(Plot, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.plotSignals();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.plotSignals();
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            window.addEventListener("resize", this.updateDimensions.bind(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener("resize", this.updateDimensions.bind(this));
        }
    }, {
        key: 'updateDimensions',
        value: function updateDimensions() {
            this.setState({ width: 100 });
        }
    }, {
        key: 'zoomEventHandler',
        value: function zoomEventHandler(event) {
            var rangeWidth = this.state.currentXRange[1] - this.state.currentXRange[0];
            var rangeHeight = this.state.currentYRange[1] - this.state.currentYRange[0];
            var newXRange = [rangeWidth * event.x0 + this.state.currentXRange[0], rangeWidth * event.x1 + this.state.currentXRange[0]];
            var newYRange = [this.state.currentYRange[1] - rangeHeight * event.y1, this.state.currentYRange[1] - rangeHeight * event.y0];
            this.setState({ currentXRange: newXRange, currentYRange: newYRange });
        }
    }, {
        key: 'zoomResetEventHandler',
        value: function zoomResetEventHandler() {
            this.setState({ currentXRange: this.state.outerXRange, currentYRange: this.state.outerYRange });
        }
    }, {
        key: 'plotSignals',
        value: function plotSignals() {
            var totalWidth = d3.select(this.parentDivRef.current).style('width').slice(0, -2);

            if (this.state.width != totalWidth) {
                this.setState({ width: totalWidth });
            }

            var colors = d3.schemeCategory10;
            if (this.state.signals.length > 10) {
                colors = d3.schemeCategory20;
            }

            // Create scales
            var xDomain = this.state.currentXRange;
            var yDomain = this.state.currentYRange;
            var xScale = d3.scaleLinear().domain(xDomain).range([0, this.state.width - this.state.margin.left - this.state.margin.right]);
            var yScale = d3.scaleLinear().domain(yDomain).range([this.state.height - this.state.margin.top - this.state.margin.bottom, 0]);

            var line = d3.line().defined(function (d) {
                return !isNaN(d.value);
            }).x(function (d) {
                return xScale(d.key);
            }).y(function (d) {
                return yScale(d.value);
            });

            for (var i = 0; i < this.state.previousNumberOfSignals; i++) {
                d3.select(this.signalsRef.current).select('path').remove();
            }

            for (var _i = 0; _i < this.state.signals.length; _i++) {
                d3.select(this.signalsRef.current).append('path').datum(this.state.signals[_i]).attr("fill", "none").attr("stroke", colors[_i % colors.length]).attr("d", line);
            }
            if (this.state.previousNumberOfSignals !== this.state.signals.length) {
                this.state.previousNumberOfSignals = this.state.signals.length;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var margin = this.state.margin;
            var width = this.state.width;
            var height = this.state.height;

            var graphWidth = width - margin.left - margin.right;
            var graphHeight = height - margin.top - margin.bottom;

            return _react2.default.createElement(
                'div',
                { ref: this.parentDivRef },
                _react2.default.createElement(
                    'svg',
                    { width: width, height: height },
                    _react2.default.createElement(_Axis.LinearBottomAxis, {
                        x: margin.left,
                        y: height - margin.bottom,
                        width: graphWidth,
                        height: graphHeight,
                        domain: this.state.currentXRange }),
                    _react2.default.createElement(_Axis.LinearLeftAxis, {
                        x: margin.left,
                        y: margin.top,
                        width: graphWidth,
                        height: graphHeight,
                        domain: this.state.currentYRange }),
                    _react2.default.createElement('rect', {
                        x: 0,
                        y: 0,
                        width: width,
                        height: height,
                        style: { fillOpacity: 0 } }),
                    _react2.default.createElement(
                        'g',
                        { transform: 'translate(' + this.state.margin.left + ', ' + this.state.margin.top + ')' },
                        _react2.default.createElement(
                            'svg',
                            { width: graphWidth, height: graphHeight },
                            _react2.default.createElement('g', { ref: this.signalsRef })
                        )
                    ),
                    _react2.default.createElement(_ZoomRegion2.default, {
                        x: margin.left,
                        y: margin.top,
                        width: graphWidth,
                        height: graphHeight,
                        onZoom: this.zoomEventHandler,
                        onZoomReset: this.zoomResetEventHandler })
                )
            );
        }
    }]);

    return Plot;
}(_react.Component);

function parseSignal(signal) {
    var arr = [];
    for (var i = 0; i < signal.xData.length; i++) {
        arr.push({
            key: signal.xData[i],
            value: signal.yData[i]
        });
    }
    return arr;
}

exports.default = Plot;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LinearLeftAxis = exports.LinearBottomAxis = exports.Axis = undefined;

var _D3blackbox = __webpack_require__(5);

var _D3blackbox2 = _interopRequireDefault(_D3blackbox);

var _d = __webpack_require__(1);

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Axis = (0, _D3blackbox2.default)(function () {
    var scale = d3.scaleLinear().domain([0, 10]).range([0, this.props.width]);

    var axis = d3.axisBottom(scale);

    d3.select(this.anchorRef.current).call(axis);
});

var LinearBottomAxis = (0, _D3blackbox2.default)(function () {
    var domain = [0, 10];
    if (this.props.domain !== undefined) {
        domain = this.props.domain;
    }

    var scale = d3.scaleLinear().domain(domain).range([0, this.props.width]);

    var axis = d3.axisBottom(scale);

    d3.select(this.anchorRef.current).call(axis.tickSizeOuter(-this.props.height));

    d3.select(this.gridRef.current).call(axis.tickSizeInner(-this.props.height).tickFormat(""));

    d3.select(this.gridRef.current).selectAll("line").attr("stroke", "#999").attr("stroke-dasharray", "2,2");;
});

var LinearLeftAxis = (0, _D3blackbox2.default)(function () {
    var domain = [0, 10];
    if (this.props.domain !== undefined) {
        domain = this.props.domain;
    }

    var scale = d3.scaleLinear().domain(domain).range([this.props.height, 0]);

    var axis = d3.axisLeft(scale);

    d3.select(this.anchorRef.current).call(axis.tickSizeOuter(-this.props.width));

    d3.select(this.gridRef.current).call(axis.tickSizeInner(-this.props.width).tickFormat(""));

    d3.select(this.gridRef.current).selectAll("line").attr("stroke", "#999").attr("stroke-dasharray", "2,2");
});

exports.Axis = Axis;
exports.LinearBottomAxis = LinearBottomAxis;
exports.LinearLeftAxis = LinearLeftAxis;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _d = __webpack_require__(1);

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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plot = undefined;

var _Plot = __webpack_require__(2);

var _Plot2 = _interopRequireDefault(_Plot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Plot = _Plot2.default;

/***/ })
/******/ ]);