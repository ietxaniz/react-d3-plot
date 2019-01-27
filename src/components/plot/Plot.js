import React, { Component } from 'react';
import * as d3 from 'd3';

import { LinearBottomAxis, LinearLeftAxis } from './Axis';
import LeftAxis from './LeftAxis';
import ZoomRegion from './ZoomRegion';

class Plot extends Component {
    constructor(props) {
        super(props);

        this.signalsRef = React.createRef()
        this.parentDivRef = React.createRef()
        this.legendRef = React.createRef()

        this.zoomEventHandler = this.zoomEventHandler.bind(this);
        this.zoomResetEventHandler = this.zoomResetEventHandler.bind(this);
        this.drawLegend = this.drawLegend.bind(this);

        let outerXRange = [0,1];
        let outerYRange = [0,1];
        let signals = [];
        let names = [];

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
                names.push(signal.name);
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
            names: names,
            previousNumberOfSignals: 0
        }
    }

    componentDidMount() {
        this.plotSignals();
    }

    componentDidUpdate() {
        this.plotSignals();
    }

    componentWillMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    updateDimensions() {
        this.setState({width: 100});
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
        if (window.getSelection) {window.getSelection().removeAllRanges();}
        else if (document.selection) {document.selection.empty();}
    }

    plotSignals() {
        let totalWidth = d3.select(this.parentDivRef.current).style('width').slice(0,-2);
        
        if (this.state.width != totalWidth) {
            this.setState({width: totalWidth});
        }
        

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

        this.drawLegend(colors);

        if (this.state.previousNumberOfSignals !== this.state.signals.length) {
            this.state.previousNumberOfSignals = this.state.signals.length;
        }

    }

    drawLegend(colors) {

        if (this.state.signals.length !== this.state.names.length) {
            return;
        }


        let y0 = 20;
        let width = 150;
        let marginTopBottom = 10;
        let colorBoxHeight = 20;
        let marginLeft = 4;
        let colorBoxWidth = 15;
        let marginTextLeft = 4;
        let colorBoxMarginTopBottom = 9;
        let textVerticalOffset = 16;
        let marginRight = 10;

        let x0 = this.state.width - width - marginRight - this.state.margin.left - this.state.margin.right;
        let height = 2 * marginTopBottom + this.state.names.length * colorBoxHeight;

        let legendBox = d3.select(this.legendRef.current)
            .html('')
            .append('g')

        legendBox.append('rect')
            .attr('x', x0)
            .attr('y', y0)
            .attr('width', width)
            .attr('height', height)
            .attr('fill', "white")
            .attr('stroke-width', 0.5)
            .attr('stroke', 'black')

        for (let i=0; i<this.state.names.length; i++) {
            legendBox.append('rect')
                .attr('x', x0 + marginLeft)
                .attr('y', y0 + marginTopBottom + colorBoxMarginTopBottom + i*colorBoxHeight)
                .attr('width', colorBoxWidth)
                .attr('height', colorBoxHeight - 2 * colorBoxMarginTopBottom)
                .attr('fill', colors[i%colors.length]);

            let textElement = legendBox.append('text')
                .attr('x', x0 + marginLeft + colorBoxWidth + marginTextLeft)
                .attr('y', y0 + (i + 0.5)*colorBoxHeight + textVerticalOffset)
                .text(this.state.names[i]);

            let allowedLength = width - (colorBoxWidth + marginTextLeft + marginLeft + marginRight);
            let n = 0;
            while (textElement.node().getComputedTextLength() > allowedLength) {
                n = n + 1;
                let text = this.state.names[i].substring(0, this.state.names[i].length - n) + '...';
                textElement.text(text);
            }
            
        }

    }

    updateLeftAxisWidth(textWidth) {
        this.setState({margin: {...this.state.margin, left: textWidth + 20}})
    }

    render() {
        const margin = this.state.margin;
        const width = this.state.width;
        const height = this.state.height;

        const graphWidth = width-margin.left-margin.right;
        const graphHeight = height-margin.top-margin.bottom;

        return(
        <div ref={this.parentDivRef}>
          <svg width={width} height={height}>
            <LinearBottomAxis 
                x={margin.left} 
                y={height-margin.bottom} 
                width={graphWidth} 
                height={graphHeight} 
                domain={this.state.currentXRange}/>
            <LeftAxis 
                x={margin.left} 
                y={margin.top} 
                width={graphWidth} 
                height={graphHeight} 
                domain={this.state.currentYRange}
                updateAxisWidth={this.updateLeftAxisWidth.bind(this)}/>

            <rect 
                x={0} 
                y={0} 
                width={width} 
                height={height} 
                style={{fillOpacity: 0}}/>

            <g transform={`translate(${this.state.margin.left}, ${this.state.margin.top})`}>
                <svg width={graphWidth} height={graphHeight}>
                    <g ref={this.signalsRef}/>
                    <g ref={this.legendRef}/>
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
          </div> 
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
