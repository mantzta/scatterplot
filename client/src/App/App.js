import React, { Component } from "react";
import API from "./utils/API";
import ScatterPlot from "./ScatterPlot/ScatterPlot";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
    this.count = 0;
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    API.get().then(response => {
      this.setState({data: response.data });
    })
  }

  render() {
    if (Object.entries(this.state.data).length !== 0) {
      return (
        <div className="app">
          <ScatterPlot data={this.state.data} />
        </div>
      );
    }

    return null;
  }
}

export default App;
