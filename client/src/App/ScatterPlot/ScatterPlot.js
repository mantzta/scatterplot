import React, { Component } from 'react';
import Axis from "../Axis/Axis"
import DataVisulisation from "../DataVisulisation/DataVisulisation"
import Regression from "../Regression/Regression"
import { Scales } from "../utils/Scales"

class ScatterPlot extends Component {
  constructor(props) {
    super(props);
    this.height = 400;
    this.padding  = 30;
    this.width= 400;
    this.scalesInstance = Scales(this.width, this.height, this.padding, this.props.data)
  }

  render() {
    return (
      <svg width={this.width} height={this.height} style={{background: "grey"}}>
        <Axis scale={this.xScale} dimension="x" height={this.height} padding={this.padding}
          scalesInstance={this.scalesInstance} />
        <Axis scale={this.yScale} dimension="y" height={this.height} padding={this.padding}
          scalesInstance={this.scalesInstance} />
        <DataVisulisation data={this.props.data.dataset1} scalesInstance={this.scalesInstance} color="aqua" />
        <Regression data={this.props.data.dataset1} scalesInstance={this.scalesInstance} color="aqua" />
      </svg>
    );
  }
}

export default ScatterPlot;