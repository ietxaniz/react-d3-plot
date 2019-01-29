import React from 'react';

function D3blackbox(D3render) {
    return class Blackbox extends React.Component {
        constructor(props) {
            super(props);

            this.anchorRef = React.createRef();
            this.gridRef = React.createRef();
        }
        componentDidMount() { D3render.call(this); }
        componentDidUpdate() { D3render.call(this); }

        render() {
            const { x, y } = this.props;
            return (
                <g>
                    <g transform={`translate(${x}, ${y})`} ref={this.anchorRef}/>
                    <g transform={`translate(${x}, ${y})`} className="grid" ref={this.gridRef}/>
                </g>
                    
            );
        }
    }
}

export default D3blackbox;
