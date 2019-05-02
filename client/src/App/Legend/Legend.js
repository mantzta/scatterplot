import React, { Component } from "react";
import * as d3 from "d3";
import DataVisualisation from "../DataVisualisation/DataVisualisation";

class Legend extends Component {
  constructor(props) {
    super(props);
    this.groupRef = React.createRef();
    this.xPos = 40;
    this.yPos = 20;
    this.state = {
      shownData: [],
      shownRegression: []
    }
  }

  static getDerivedStateFromProps(props, currentState) {
    if (currentState.shownRegression !== props.shownRegression) {
      return {
        shownRegression: props.shownRegression
      }
    }
    return null
  }

  componentDidMount() {
    this.drawLegend();
  }

  /**
   * @param {string} key
   */
  onClick(key) {
    const group = d3.select(this.groupRef.current);
    const data = group.select(`[data-name=${key}]`);
    let shownData = this.state.shownData;
    let shownRegression = this.state.shownRegression;

    if (data.empty()) {
      const dataVis = <DataVisualisation key={`data-${key}`} data={this.props.datasets[key].data}
      scalesInstance={this.props.scalesInstance} color={this.props.datasets[key].color}
      name={this.props.datasets[key].name} />;

      shownData.push(dataVis);
    } else {
      shownData = shownData.filter(d => {
        return  d.key.indexOf(key) === -1;
      });

      shownRegression = shownRegression.filter(r => {
        return  r.key.indexOf(key) === -1;
      });
    }

    this.setState({
      shownData,
      shownRegression
    })
  }

  drawLegend() {
    const legend = d3.select(this.groupRef.current);
    let x = this.xPos;

    Object.keys(this.props.datasets).forEach((key) => {
      const g = legend.append(`g`)
        .on(`click`, this.onClick.bind(this, key));
      g.attr(`class`, `legend`)
        .append(`circle`)
        .attr(`cx`, x)
        .attr(`cy`, this.yPos)
        .attr(`r`, 10)
        .attr(`fill`, this.props.datasets[key].color);

      g.append(`text`)
        .attr(`x`, x + 15)
        .attr(`y`, this.yPos)
        .text(key)
        .attr(`alignment-baseline`,`middle`);

      x += 100;
    });
  }

  render() {
    return (
      <g ref={this.groupRef}>
        {this.state.shownData.concat(this.state.shownRegression)}
      </g>
    );
  }

}

export default Legend;