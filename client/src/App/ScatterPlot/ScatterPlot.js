import React, { Component } from "react";
import { Scales } from "../utils/Scales";
import Axis from "../Axis/Axis";
import Legend from "../Legend/Legend";
import Regression from "../Regression/Regression";

class ScatterPlot extends Component {
  constructor(props) {
    super(props);
    this.height = 400;
    this.padding  = 50;
    this.width= 400;
    this.scalesInstance = Scales(this.width, this.height, this.padding, this.props.data);
    this.colors = [`aqua`, `red`, `green`];
    this.datasets = this.getDataInfo();
    this.state = {
      degree: 3,
      regressionLines: []
    }

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * @return {object}
   */
  getDataInfo() {
    const info = {}

    Object.keys(this.props.data).forEach((key, i) => {
      info[key] = {
        color: this.colors[i],
        data: this.props.data[key],
        name: key
      };
    });
    return info;
  }

  onClick() {
    const regressionLines = [];
    let test = this.state.test;

    Object.keys(this.datasets).forEach((key) => {
      if (document.querySelector(`[data-name=${key}]`)) {
        const dataVis = <Regression key={`regression-${key}`} data={this.datasets[key]}
        scalesInstance={this.scalesInstance} degree={this.state.degree} />;

        regressionLines.push(dataVis);
      }
    })
    test++
    this.setState({regressionLines, test});
  }

  onChange(event) {
    this.setState({degree: event.target.value})
  }

  render() {
    return (
      <div className="scatterplot">
        <svg width={this.width} height={this.height} style={{background: "grey"}}>
          <Axis scale={this.xScale} dimension="x" height={this.height} padding={this.padding}
            scalesInstance={this.scalesInstance} />
          <Axis scale={this.yScale} dimension="y" height={this.height} padding={this.padding}
            scalesInstance={this.scalesInstance} />
          <Legend datasets={this.datasets} scalesInstance={this.scalesInstance}
            shownRegression={this.state.regressionLines} />
        </svg>
        <div>
          <button onClick={this.onClick}>Calculate Regression Lines</button>
          <input onChange={this.onChange} type="text" placeholder="Choose a degree" value="3"></input>
        </div>
      </div>
    );
  }
}

export default ScatterPlot;