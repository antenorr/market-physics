import React, { Component } from 'react';

class homepage extends Component {
  constructor(props) {
    super();

    this.state = {
      stockData: {},
    };
  }

  fetchStockNames = () => {
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
      .then((incomingStockData) => {
        console.log({ incomingStockData }); // a cool trick i learned i dont remeber where though..lol
        this.setState({ stockData: incomingStockData });
      })
      .catch(function (error) {
        var paragraph = document.createElement('p');
        paragraph.appendChild(
          document.createTextNode('Error: ' + error.message)
        );
      });
  };

  fetchCompanyStockData = () => {
    fetch(
      `https://finnhub.io/api/v1/stock/metric?symbol=AAPL&metric=all&token=${process.env.REACT_APP_FINNHUB_API_KEY}`,
      { json: true }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('HTTP error, status = ' + response.status);
        }
        return response;
      })
      .then((response) => response.body)
      .then((rs) => {
        const reader = rs.getReader();

        return new ReadableStream({
          async start(controller) {
            while (true) {
              const { done, value } = await reader.read();

              // When no more data needs to be consumed, break the reading
              if (done) {
                break;
              }

              // Enqueue the next data chunk into our target stream
              controller.enqueue(value);
            }

            // Close the stream
            controller.close();
            reader.releaseLock();
          },
        });
      })
      // Create a new response out of the stream
      .then((rs) => new Response(rs))
      // Create an object URL for the response
      .then((response) => response.json())
      .then((blob) => console.log(blob))
      // Update image
      // .then(url => image.src = url)
      .catch(console.error);

    // .then((incomingCompanyStockData) => {
    //   console.log(
    //     'Roudy this is my company data: ',
    //     incomingCompanyStockData.body
    //   );
    // })
    // .catch(function (error) {
    //   var paragraph = document.createElement('p');
    //   paragraph.appendChild(
    //     document.createTextNode('Error: ' + error.message)
    //   );
    // });
  };

  componentDidMount() {
    //this.fetchStockNames();
    this.fetchCompanyStockData();
    // fetch(
    //   `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${process.env.REACT_APP_FINNHUB_API_KEY}`,
    //   { json: true }
    // )
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error('HTTP error, status = ' + response.status);
    //     }
    //     return response;
    //   })
    //   .then((response) => response.json())
    //   .then((incomingStockData) => {
    //     console.log({ incomingStockData });// a cool trick i learned i dont remeber where though..lol
    //     this.setState({ stockData: incomingStockData });
    //   })
    //   .catch(function (error) {
    //     var paragraph = document.createElement('p');
    //     paragraph.appendChild(
    //       document.createTextNode('Error: ' + error.message)
    //     );
    //   });
  }

  render() {
    // ROUDY I DO NOT NEED ALL THE OBJECTS- FIND A WAY TO ONLY GET 100 AT A TIME OR JUST WHAT WE NEED OK
    //console.log(this.state);
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
