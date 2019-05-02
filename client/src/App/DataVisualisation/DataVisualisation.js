import React, { Component } from "react";
import * as d3 from "d3";

class DataVisualisation extends Component {
  constructor(props) {
    super(props);
    this.groupRef = React.createRef();
  }

  componentDidMount() {
    this.drawCircles();
  }

  drawCircles() {
    const scales = this.props.scalesInstance.getScales();

    d3.select(this.groupRef.current)
      .selectAll(`circle`)
      .data(this.props.data)
      .enter()
      .append(`circle`)
      .attr(`cx`, function(d) {
        return scales.x(d.x);
      })
      .attr(`cy`, function(d) {
        return scales.y(d.y);
      })
      .attr(`r`, 3)
      .attr(`fill`, this.props.color);
}

  render() {
    return (
      <g ref={this.groupRef} data-name={this.props.name} className="group__dataVisualisation">
      </g>
    );
  }

}

export default DataVisualisation;