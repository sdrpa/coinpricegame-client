import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Index from '../containers/index'
import Prediction from '../containers/prediction'
import Privacy from '../components/privacy'
import About from '../components/about'
import Summary from '../containers/summary'
import Footer from '../components/footer'

const App = () => {
   return (
      <Router>
         <div>
            <Route exact path="/" component={Index} />
            <Route exact path="/prediction" component={Prediction} />
            <Route exact path="/privacy" component={Privacy} />
            <Route exact path="/about" component={About} />
            <Route exact path="/summary" component={Summary} />
            <Footer />
         </div>
      </Router>
   )
}

export default App
