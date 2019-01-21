import D3blackbox from '../../hoc/D3blackbox';
import * as d3 from 'd3';

const Axis = D3blackbox(function() {
    const scale = d3.scaleLinear()
                    .domain([0, 10])
                    .range([0, this.props.width]);
    
    const axis = d3.axisBottom(scale);

    d3.select(this.anchorRef.current)
        .call(axis);
});

const LinearBottomAxis = D3blackbox(function() {
    let domain = [0, 10];
    if (this.props.domain !== undefined) {
        domain = this.props.domain;
    }

    const scale = d3.scaleLinear()
                    .domain(domain)
                    .range([0, this.props.width]);
    
    const axis = d3.axisBottom(scale);

    d3.select(this.anchorRef.current)
        .call(axis.tickSizeOuter(-this.props.height));

    d3.select(this.gridRef.current)
        .call(axis
            .tickSizeInner(-this.props.height)
            .tickFormat("")
        );
        
    d3.select(this.gridRef.current)
        .selectAll("line")
        .attr("stroke", "#999")
        .attr("stroke-dasharray", "2,2");;
});

const LinearLeftAxis = D3blackbox(function() {
    let domain = [0, 10];
    if (this.props.domain !== undefined) {
        domain = this.props.domain;
    }

    const scale = d3.scaleLinear()
                    .domain(domain)
                    .range([this.props.height, 0]);
    
    const axis = d3.axisLeft(scale);

    d3.select(this.anchorRef.current)
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
});

export {Axis, LinearBottomAxis, LinearLeftAxis};
