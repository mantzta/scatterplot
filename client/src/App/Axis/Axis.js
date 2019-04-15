import React, { Component } from 'react';
import * as d3 from "d3";

class Axis extends Component {
  constructor(props) {
    super(props);
    this.groupRef = React.createRef();
  }

  componentDidMount() {
    this.drawAxis();
  }

  drawAxis() {
    const scales = this.props.scalesInstance.getScales();
    let axis, xTranslate, yTranslate;

    if (this.props.dimension === `x`) {
      axis = d3.axisBottom(scales.x);
      xTranslate = 0;
      yTranslate = this.props.height - this.props.padding;
    } else if (this.props.dimension === `y`) {
      axis = d3.axisLeft(scales.y);
      xTranslate = this.props.padding;
      yTranslate = 0;
    }

    d3.select(this.groupRef.current)
      .attr(`transform`, `translate(${xTranslate}, ${yTranslate})`)
      .call(axis);
  }

  render() {
    return (
      <g ref={this.groupRef}></g>
    );
  }

}

export default Axis;