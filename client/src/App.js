import React from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import Home from './Home'

function App() {
  return (
    <div>
      <BrowserRouter>
        <h2>React</h2>
        <Link to="/">home </Link>

        <Route path="/" component={Home} exact={true} />
      </BrowserRouter>
    </div>
  );
}

export default App;
