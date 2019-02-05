import React, { Component } from 'react';
import * as d3 from 'd3';

export default class BottomAxis extends Component{
    constructor(props) {
        super(props);

        this.textRef = React.createRef();
        this.gridRef = React.createRef();
        this.xLabel = React.createRef();
        this.title = React.createRef();

        this.updateAxis = this.updateAxis.bind(this);
        this.drawLabel = this.drawLabel.bind(this);
        this.drawTitle = this.drawTitle.bind(this);
    }

    componentDidMount() {
        this.updateAxis();
    }

    componentDidUpdate() {
        this.updateAxis();
    }

    updateAxis() {
        let domain = [0, 10];
        if (this.props.domain !== undefined) {
            domain = this.props.domain;
        }
    
        const scale = d3.scaleLinear()
                        .domain(domain)
                        .range([0, this.props.width]);
        
        const axis = d3.axisBottom(scale);
    
        d3.select(this.textRef.current)
            .call(axis.tickSizeOuter(-this.props.height));
    
        d3.select(this.gridRef.current)
            .call(axis
                .tickSizeInner(-this.props.height)
                .tickFormat("")
            );
            
        d3.select(this.gridRef.current)
            .selectAll("line")
            .attr("stroke", "#999")
            .attr("stroke-dasharray", "2,2");

        this.drawLabel();
        this.drawTitle();
        
        // TODO: Update height and vertical position and send info to parent
    }

    drawLabel() {

    }

    drawTitle() {
        
    }

    render() {
        const { x, y } = this.props;
        return (
            <g>
                <g transform={`translate(${x}, ${y})`} ref={this.textRef}/>
                <g transform={`translate(${x}, ${y})`} className="grid" ref={this.gridRef}/>
                <g transform={`translate(${x}, ${y})`} className="grid" ref={this.xLabel}/>
                <g transform={`translate(${x}, ${y})`} className="grid" ref={this.title}/>
            </g>
                
        );
    }
}
