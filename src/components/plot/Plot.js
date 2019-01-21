import React, { Component } from 'react';
import * as d3 from 'd3';

import { LinearBottomAxis, LinearLeftAxis } from './Axis';
import ZoomRegion from './ZoomRegion';

class Plot extends Component {
    constructor(props) {
        super(props);

        this.signalsRef = React.createRef()

        this.zoomEventHandler = this.zoomEventHandler.bind(this);
        this.zoomResetEventHandler = this.zoomResetEventHandler.bind(this);

        let outerXRange = [0,1];
        let outerYRange = [0,1];
        let signals = [];

        if (this.props.signals !== undefined) {
            let minx = 1e100;
            let maxx = -1e100;
            let miny = 1e100;
            let maxy = -1e100;

            for (let i=0; i<(this.props.signals.length); i++) {
                let signal = this.props.signals[i];
                minx = Math.min(minx, Math.min(...signal.xData));
                maxx = Math.max(maxx, Math.max(...signal.xData));
                miny = Math.min(miny, Math.min(...signal.yData));
                maxy = Math.max(maxy, Math.max(...signal.yData));

                signals.push(parseSignal(this.props.signals[i]));
            }

            outerXRange = [minx, maxx];
            outerYRange = [miny, maxy];

        }

        this.state = {
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
        }
    }

    componentDidMount() {
        this.plotSignals();
    }

    componentDidUpdate() {
        this.plotSignals();
    }

    zoomEventHandler(event) {
        const rangeWidth = this.state.currentXRange[1] - this.state.currentXRange[0];
        const rangeHeight = this.state.currentYRange[1] - this.state.currentYRange[0];
        const newXRange = [
            rangeWidth*event.x0 + this.state.currentXRange[0],
            rangeWidth*event.x1 + this.state.currentXRange[0]
        ];
        const newYRange = [
            this.state.currentYRange[1] - rangeHeight*event.y1,
            this.state.currentYRange[1] - rangeHeight*event.y0
        ];
        this.setState({currentXRange: newXRange, currentYRange: newYRange});
    }

    zoomResetEventHandler() {
        this.setState({currentXRange: this.state.outerXRange, currentYRange: this.state.outerYRange});
    }

    plotSignals() {
        let colors = d3.schemeCategory10;
        if(this.state.signals.length>10){
            colors = d3.schemeCategory20;
        }
        
        // Create scales
        const xDomain = this.state.currentXRange;
        const yDomain = this.state.currentYRange;
        const xScale = d3.scaleLinear()
            .domain(xDomain)
            .range([0, this.state.width-this.state.margin.left-this.state.margin.right]);
        const yScale = d3.scaleLinear()
            .domain(yDomain)
            .range([this.state.height-this.state.margin.top-this.state.margin.bottom, 0]);
        
        let line = d3.line()
            .defined(d => !isNaN(d.value))
            .x(d => xScale(d.key))
            .y(d => yScale(d.value))

        for (let i=0; i<this.state.previousNumberOfSignals; i++) {
            d3.select(this.signalsRef.current).select('path').remove();
        }

        for (let i=0; i<this.state.signals.length; i++) {
            d3.select(this.signalsRef.current)
                .append('path')
                .datum(this.state.signals[i])
                .attr("fill", "none")
                .attr("stroke", colors[i%colors.length])
                .attr("d", line);
        }
        if (this.state.previousNumberOfSignals !== this.state.signals.length) {
            this.state.previousNumberOfSignals = this.state.signals.length;
        }

    }

    render() {
        const margin = this.state.margin;
        const width = this.state.width;
        const height = this.state.height;

        const graphWidth = width-margin.left-margin.right;
        const graphHeight = height-margin.top-margin.bottom;

        return(
          <svg width={width} height={height}>
            <LinearBottomAxis 
                x={margin.left} 
                y={height-margin.bottom} 
                width={graphWidth} 
                height={graphHeight} 
                domain={this.state.currentXRange}/>
            <LinearLeftAxis 
                x={margin.left} 
                y={margin.top} 
                width={graphWidth} 
                height={graphHeight} 
                domain={this.state.currentYRange}/>

            <rect 
                x={0} 
                y={0} 
                width={width} 
                height={height} 
                style={{fillOpacity: 0}}/>

            <g transform={`translate(${this.state.margin.left}, ${this.state.margin.top})`}>
                <svg width={graphWidth} height={graphHeight}>
                    <g ref={this.signalsRef}/>
                </svg> 
            </g>
            
            <ZoomRegion 
                x={margin.left} 
                y={margin.top} 
                width={graphWidth} 
                height={graphHeight} 
                onZoom={this.zoomEventHandler}
                onZoomReset={this.zoomResetEventHandler}/>
          </svg>   
        );
    }
}

function parseSignal(signal) {
    var arr = [];
    for(let i=0; i<signal.xData.length; i++) {
        arr.push({
            key: signal.xData[i],
            value: signal.yData[i]
        });
    }
    return arr;
}

export default Plot;
