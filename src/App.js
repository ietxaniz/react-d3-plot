import React, { Component } from 'react';
import { Plot } from './lib';

class App extends Component {
  render() {
    const xData = Array.from(new Array(10000), (val, index)=>index*0.01);
    const signals =  [
      {
        name: 'Test signal',
        xData: xData,
        yData: xData.map((value)=>5.1*Math.sin(value))
      },
      {
        name: 'Second signal',
        xData: xData,
        yData: xData.map((value)=>2*Math.sin(value*5)-2)
      },
      {
        name: 'Third signal with longer name',
        xData: xData,
        yData: xData.map((value)=>2*Math.sin(value*5)-2+5.1*Math.sin(value))
      }
    ];
    const plotStyle = {
      yLabel: "Signal amplitude"
    }
    return (
      <div className="App">
        <div style={{width: '45%', display: 'inline-block'}}>
          <Plot signals={signals} />
        </div>
        <div style={{width: '45%', display: 'inline-block'}}>
          <Plot signals={signals}  plotStyle={plotStyle}/>
        </div>
      </div>
    );
  }
}

export default App;
