import React from 'react';
import Homepage from './pages/homepage/homepage.components';

import './App.css';

function App() {
  return (
    <div>
      <Homepage />
    </div>
  );
}

export default App;

/**
 *
 * RETURN AND PAY ADDRESS THIS -  IT APPEARS THAT
 * ENV FILES ARE SOMEHOW PACKAGED IN THE BUILD AND THUS
 * YOUR SECRET KEY WILL BE EXPOSED.
 *
 * console.log(process.env.THE NAME OF THE VARIABLE YOU CREATED);
 *
 * You should really only save API keys or secrets
 *  in your backend such as Node / Express.
 *
 *  You can have your client send a request to your backend API,
 *  which can then make the actual API call with
 *  the API key and send the data back to your client.
 */
