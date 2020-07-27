import React, { Component } from 'react';

class homepage extends Component {
  constructor(props) {
    super();

    this.state = {
      stockData: {},
    };
  }

  componentDidMount() {
    fetch(
      `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${process.env.REACT_APP_FINNHUB_API_KEY}`,
      { json: true }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('HTTP error, status = ' + response.status);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ stockData: data });
      })
      .catch(function (error) {
        var p = document.createElement('p');
        p.appendChild(document.createTextNode('Error: ' + error.message));
      });
  }

  render() {
    // ROUDY I DO NOT NEED ALL THE OBJECTS- FIND A WAY TO ONLY GET 100 AT A TIME OR JUST WHAT WE NEED OK
    console.log(this.state);
    return (
      <div>
        <div>I AM HOMEPAGE</div>
        {this.state.stockData.length &&
          this.state.stockData.map((stock) => {
            return <div key={stock.displaySymbol}>{stock.description} </div>;
          })}
      </div>
    );
  }
}

export default homepage;
