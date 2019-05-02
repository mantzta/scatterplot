import * as d3 from "d3";

/**
 * @param {number} width
 * @param {number} height
 * @param {number} padding
 * @param {object} data
 * @return {object}
 */
export function Scales(width, height, padding, data) {
  let maxX, maxY;

  /**
   * Returns maximal value within dataset
   * @param {string} dimension either x or y
   * @param {object} data
   * @return {number}
   */
  function getMax(dimension, data) {
    const max = []

    Object.entries(data).forEach(set => {
      max.push(d3.max(set[1], (d) => {
        return d[dimension];
      }));
    });

    return d3.max(max);
  }

  /**
   * @return {object<string, function>}
   */
  function getScales() {
    const xScale = d3.scaleLinear()
      .domain([0, maxX])
      .range([padding, width - padding]);

    const yScale = d3.scaleLinear()
      .domain([0, maxY])
      .range([height - padding, padding]);

    const scales = {x: xScale, y: yScale};

    return scales;
  }

  maxX = getMax(`x`, data);
  maxY = getMax(`y`, data);

  return {
    getScales
  }
}
