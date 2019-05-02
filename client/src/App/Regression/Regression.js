import React, { Component } from "react";
import * as d3 from "d3";
import regression from "regression";

class Regression extends Component {
  constructor(props) {
    super(props);
    this.pathRef = React.createRef();
    this.degree = 3;
  }

  componentDidMount() {
    this.drawRegression();
  }

  /**
   * Regression library needs coordinates as arrays within an array: [[x1, y2], ...].
   * This transforms the dataset in order to calculate regression line.
   * @param {array} dataset
   * @return {Array<array>}
   */
  getTransformedDataset(dataset) {
    const transformedDataset = [];

    dataset.forEach((pointObj) => {
      transformedDataset.push([pointObj.x, pointObj.y]);
    })

    return transformedDataset;
  }

  drawRegression() {
    const scales = this.props.scalesInstance.getScales();
    const model = regression.polynomial(this.getTransformedDataset(this.props.data.data), { order: this.degree });

    const lineGenerator = d3.line()
      .x(function (d) {
        return scales.x(d[0]);
      })
      .y(function (d) {
        return scales.y(d[1]);
      })
      .curve(d3.curveBasis);

    const pathData = lineGenerator(model.points);

    d3.select(this.pathRef.current)
      .attr("d", pathData)
      .attr("stroke", this.props.data.color)
      .attr("fill", "none");
  }

  render() {
    return (
      <path ref={this.pathRef} className={`regression__${this.props.data.name}`}></path>
    );
  }

}

export default Regression;