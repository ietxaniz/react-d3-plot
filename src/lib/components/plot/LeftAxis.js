import React, { Component } from 'react';
import * as d3 from 'd3';

export default class LeftAxis extends Component {
    constructor(props) {
        super(props);

        this.textRef = React.createRef();
        this.gridRef = React.createRef();
        this.yLabel = React.createRef();

        this.updateLeftAxis = this.updateLeftAxis.bind(this);
        this.drawLabel = this.drawLabel.bind(this);
    }

    componentDidMount() {
        this.updateLeftAxis();
    }

    componentDidUpdate() {
        this.updateLeftAxis();
    }

    updateLeftAxis() {
        d3.select(this.gridRef.current)
            .select('text')
            .remove();

        let domain = [0, 10];
        if (this.props.domain !== undefined) {
            domain = this.props.domain;
        }
        const scale = d3.scaleLinear()
        .domain(domain)
        .range([this.props.height, 0]);

        const axis = d3.axisLeft(scale);

        d3.select(this.textRef.current)
            .call(axis.tickSizeOuter(-this.props.width));

        d3.select(this.gridRef.current)
            .call(axis
            .tickSizeInner(-this.props.width)
            .tickFormat("")
        );

        d3.select(this.gridRef.current)
            .selectAll("line")
            .attr("stroke", "#999")
            .attr("stroke-dasharray", "2,2");

        var maxLength = 0;

        d3.select(this.textRef.current)
            .selectAll('text')
            .each(function(n){
                // console.log(d3.select(this));
                let itemLength = d3.select(this).node().getComputedTextLength();
                try {
                    d3.select(this).node().getComputedTextLength();
                } catch (err) {}

                if (itemLength > maxLength) {
                    maxLength = itemLength;
                }
            });

        if (this.props.x - Math.ceil(maxLength) < 15 + this.getLabelWidth()) {
            if (this.props.updateAxisWidth !== undefined) {
                this.props.updateAxisWidth(Math.ceil(maxLength)+ this.getLabelWidth())
            }
        }
        else if (this.props.x - Math.ceil(maxLength) > 30 + this.getLabelWidth()){
            if (this.props.updateAxisWidth !== undefined) {
                this.props.updateAxisWidth(Math.ceil(maxLength)+ this.getLabelWidth())
            }
        }

        this.drawLabel();
    }

    getLabelWidth() {
        const text = this.props.label;
        if (text.length > 0) {
            return 16;
        }
        return 0;
    }

    drawLabel() {
            
        const text = this.props.label;
        if (text.length > 0) {

            var texts = text;
            d3.select(this.yLabel.current)
                .select('text')
                .remove();

            d3.select(this.yLabel.current)
                .append('text')
                .text(texts)
                .style('text-anchor', 'middle')
                .attr('x1', 0)
                .attr('x2', 0)
                .attr('y1', 0)
                .attr('y2', this.props.height)
                .attr('transform', `translate(${-this.props.height/2  + 12}, ${0}), rotate(-90, ${this.props.height/2}, ${0})`)
                .style('fill', 'black');
        }
    }

    render() {
        const { x, y } = this.props;
        return (
            <g>
                <g transform={`translate(${x}, ${y})`} ref={this.textRef}/>
                <g transform={`translate(${x}, ${y})`} className="grid" ref={this.gridRef}/>
                <g transform={`translate(0, ${y})`} className="grid" ref={this.yLabel}/>
            </g>
                
        );
    }
}