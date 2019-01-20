import React, { Component } from 'react';
import * as d3 from 'd3';

class ZoomRegion extends Component {
    constructor(props) {
        super(props);

        this.refMainWnd = React.createRef();

        this.mouseDownEventHandler = this.mouseDownEventHandler.bind(this);
        this.mouseUpEventHandler = this.mouseUpEventHandler.bind(this);
        this.doubleClickEventHandler = this.doubleClickEventHandler.bind(this);

        this.state = {
            x0: -1,
            y0: -1,
            x1: -1,
            y1: -1,
            pressed: false
        }
    }

    mouseDownEventHandler() {
        this.setState({
            x0: -1,
            y0: -1,
            x1: -1,
            y1: -1,
            pressed: true
        });
        var main = this;
        d3.select(this.refMainWnd.current).on('mousemove', function() {
            if (main.state.pressed) {
                let pos = d3.mouse(this);
                if (main.state.x0 < 0) {
                    main.setState({x0: pos[0], y0: pos[1]});
                } else {
                    main.setState({x1: pos[0], y1: pos[1]});
                }
            }
        });
    }

    mouseUpEventHandler() {
        this.setState({pressed: false});
        d3.select(this.refMainWnd.current).on('mousemove', function() {
            
        });
        if (this.props.onZoom !== undefined) {
            if (Math.min(this.state.x0, this.state.x1, this.state.y0, this.state.y1) < 0) {
                return;
            }
            let x0 = (Math.min(this.state.x0, this.state.x1) - this.props.x)/this.props.width;
            let x1 = (Math.max(this.state.x0, this.state.x1) - this.props.x)/this.props.width;
            let y0 = (Math.min(this.state.y0, this.state.y1) - this.props.y)/this.props.height;
            let y1 = (Math.max(this.state.y0, this.state.y1) - this.props.y)/this.props.height;
            this.props.onZoom({
                x0: x0,
                y0: y0,
                x1: x1,
                y1: y1
            })
        }
    }

    doubleClickEventHandler() {
        if (this.props.onZoomReset !== undefined) {
            this.props.onZoomReset();
        }
    }

    render() {
        let x = this.props.x;
        let y = this.props.y;
        let height = this.props.height;
        let width = this.props.width;

        let xZoom = this.state.x0;
        let yZoom = this.state.y0;
        let heightZoom = this.state.y1 - this.state.y0;
        let widthZoom = this.state.x1 - this.state.x0;
        if (heightZoom < 0) {
            yZoom = yZoom + heightZoom;
            heightZoom = -heightZoom;
        }
        if (widthZoom < 0) {
            xZoom = xZoom + widthZoom;
            widthZoom = -widthZoom;
        }

        return(
            <g>
                {this.state.pressed &&
                    <rect
                        x={xZoom} 
                        y={yZoom} 
                        height={heightZoom} 
                        width={widthZoom}  
                        style={{
                            fill: '#0000f0',
                            fillOpacity: 0.5,
                            stroke: '#ffffff'}}    
                        />
                }
                <rect 
                    x={x} 
                    y={y} 
                    height={height} 
                    width={width}  
                    onMouseDown={this.mouseDownEventHandler} 
                    onMouseUp={this.mouseUpEventHandler}
                    onDoubleClick={this.doubleClickEventHandler} 
                    ref={this.refMainWnd}
                    style={{
                        fill: '#f0f0f0',
                        fillOpacity: 0.2,
                        stroke: '#ffffff'}}
                />
            </g>
        );
    }
}

export default ZoomRegion;
