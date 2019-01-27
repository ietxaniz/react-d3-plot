import React, { Component } from 'react';
import * as d3 from 'd3';

export default class LeftAxis extends Component {
    constructor(props) {
        super(props);

        this.textRef = React.createRef();
        this.gridRef = React.createRef();

        this.updateLeftAxis = this.updateLeftAxis.bind(this);
    }

    componentDidMount() {
        this.updateLeftAxis();
    }

    componentDidUpdate() {
        this.updateLeftAxis();
    }

    updateLeftAxis() {
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
                if (itemLength > maxLength) {
                    maxLength = itemLength;
                }
            });

        if (this.props.x - Math.ceil(maxLength) < 15) {
            if (this.props.updateAxisWidth !== undefined) {
                this.props.updateAxisWidth(Math.ceil(maxLength))
            }
        }
        else if (this.props.x - Math.ceil(maxLength) > 30){
            if (this.props.updateAxisWidth !== undefined) {
                this.props.updateAxisWidth(Math.ceil(maxLength))
            }
        }
    }

    render() {
        const { x, y } = this.props;
        return (
            <g>
                <g transform={`translate(${x}, ${y})`} ref={this.textRef}/>
                <g transform={`translate(${x}, ${y})`} className="grid" ref={this.gridRef}/>
            </g>
                
        );
    }
}