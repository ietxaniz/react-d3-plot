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

var _Axis = require('./Axis');

var _LeftAxis = require('./LeftAxis');

var _LeftAxis2 = _interopRequireDefault(_LeftAxis);

var _ZoomRegion = require('./ZoomRegion');

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
        _this.legendRef = _react2.default.createRef();

        _this.zoomEventHandler = _this.zoomEventHandler.bind(_this);
        _this.zoomResetEventHandler = _this.zoomResetEventHandler.bind(_this);
        _this.drawLegend = _this.drawLegend.bind(_this);

        var outerXRange = [0, 1];
        var outerYRange = [0, 1];
        var signals = [];
        var names = [];

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
                names.push(signal.name);
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
            names: names,
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
            if (window.getSelection) {
                window.getSelection().removeAllRanges();
            } else if (document.selection) {
                document.selection.empty();
            }
        }
    }, {
        key: 'plotSignals',
        value: function plotSignals() {
            var totalWidth = d3.select(this.parentDivRef.current).style('width').slice(0, -2);

            if (this.state.width !== totalWidth) {
                this.setState({ width: totalWidth });
            }

            var colors = d3.schemeCategory10;
            /*if(this.state.signals.length>10){
                colors = d3.schemeCategory20;
            }*/

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

            this.drawLegend(colors);

            if (this.state.previousNumberOfSignals !== this.state.signals.length) {
                this.setState({ previousNumberOfSignals: this.state.signals.length });
            }
        }
    }, {
        key: 'drawLegend',
        value: function drawLegend(colors) {

            if (this.state.signals.length !== this.state.names.length) {
                return;
            }

            var y0 = 20;
            var width = 150;
            var marginTopBottom = 10;
            var colorBoxHeight = 20;
            var marginLeft = 4;
            var colorBoxWidth = 15;
            var marginTextLeft = 4;
            var colorBoxMarginTopBottom = 9;
            var textVerticalOffset = 16;
            var marginRight = 10;

            var x0 = this.state.width - width - marginRight - this.state.margin.left - this.state.margin.right;
            var height = 2 * marginTopBottom + this.state.names.length * colorBoxHeight;

            var legendBox = d3.select(this.legendRef.current).html('').append('g');

            legendBox.append('rect').attr('x', x0).attr('y', y0).attr('width', width).attr('height', height).attr('fill', "white").attr('stroke-width', 0.5).attr('stroke', 'black');

            for (var i = 0; i < this.state.names.length; i++) {
                legendBox.append('rect').attr('x', x0 + marginLeft).attr('y', y0 + marginTopBottom + colorBoxMarginTopBottom + i * colorBoxHeight).attr('width', colorBoxWidth).attr('height', colorBoxHeight - 2 * colorBoxMarginTopBottom).attr('fill', colors[i % colors.length]);

                var textElement = legendBox.append('text').attr('x', x0 + marginLeft + colorBoxWidth + marginTextLeft).attr('y', y0 + (i + 0.5) * colorBoxHeight + textVerticalOffset).text(this.state.names[i]);

                var allowedLength = width - (colorBoxWidth + marginTextLeft + marginLeft + marginRight);
                var n = 0;
                while (getTextLength(textElement.node()) > allowedLength) {
                    n = n + 1;
                    var text = this.state.names[i].substring(0, this.state.names[i].length - n) + '...';
                    textElement.text(text);
                }
            }
        }
    }, {
        key: 'updateLeftAxisWidth',
        value: function updateLeftAxisWidth(textWidth) {
            this.setState({ margin: _extends({}, this.state.margin, { left: textWidth + 20 }) });
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
                    _react2.default.createElement(_LeftAxis2.default, {
                        x: margin.left,
                        y: margin.top,
                        width: graphWidth,
                        height: graphHeight,
                        domain: this.state.currentYRange,
                        updateAxisWidth: this.updateLeftAxisWidth.bind(this) }),
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
                            _react2.default.createElement('g', { ref: this.signalsRef }),
                            _react2.default.createElement('g', { ref: this.legendRef })
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

function getTextLength(node) {
    var length = 20;
    try {
        length = node.getComputedTextLength();
    } catch (err) {}
    return length;
}

exports.default = Plot;