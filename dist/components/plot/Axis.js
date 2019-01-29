'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LinearLeftAxis = exports.LinearBottomAxis = exports.Axis = undefined;

var _D3blackbox = require('../../hoc/D3blackbox');

var _D3blackbox2 = _interopRequireDefault(_D3blackbox);

var _d = require('d3');

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