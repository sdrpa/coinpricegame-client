import React, { Component } from 'react'

import { dates } from '../api'
import { logError } from '../fn'
import Question from '../question'
import Howto from '../../components/howto'
import Countdown from '../../components/countdown-timer'
import Predict from '../prediction-submit'
import Rules from '../../components/rules'
import Closest from '../../containers/predictions-closest'
import GraphAndTable from '../predictions'

class Index extends Component {
   constructor(props) {
      super(props)

      this.state = {
         dates: null
      }
   }

   componentDidMount() {
      dates().then(response => {
         const dates = response.data
         this.setState({ dates })
      }).catch(e => logError(e))
   }

   render() {
      const { dates } = this.state
      if (!dates) {
         return <p>Loading...</p>
      }

      const currEpoch = new Date().getTime() / 1000
      return (
         <div>
            <h2 className="mb-5">Lisk Price Prediction Challenge</h2>
            <Question endDate={dates.end} />
            <Rules />
            {(currEpoch > dates.due && currEpoch < dates.end) 
               ? <div /> 
               : <Howto />}
            <Predict dates={dates} />
            <p className="mb-5">
               <Countdown 
                  date={new Date(dates.due * 1000)} 
                  zeroPadLength={0} /> until this week&apos;s submissions are closed.
            </p>
            <Closest />
            <GraphAndTable />
         </div>
      )
   }
}

export default Index
