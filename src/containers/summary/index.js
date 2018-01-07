import React, { Component } from 'react'

import { dates, predictions, previousBest } from '../api'
import { logError } from '../fn'
import ClosestTable from '../../components/closest-table'

class Summary extends Component {
   constructor(props) {
      super(props)

      this.state = {
         dates: null,
         count: 0,
         previousBest: null
      }
   }

   componentDidMount() {
      dates().then(response => {
         const dates = response.data
         this.setState({ dates })
      }).catch(e => logError(e))

      predictions().then(response => {
         let count = response.data.xs.length
         this.setState({ count })
      }).catch(e => logError(e))

      previousBest().then(response => {
         let previousBest = response.data.xs
         this.setState({ previousBest })
      }).catch(e => logError(e))
   }

   render() {
      const { dates } = this.state
      if (!dates) {
         return <p>Loading...</p>
      }
      const { count } = this.state

      const startDate = new Date(dates.start * 1000)
      const dueDate = new Date(dates.due * 1000)
      const endDate = new Date(dates.end * 1000)
      const utc = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' }
      const local = { year: 'numeric', month: 'short', day: 'numeric' }
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

      const renderDateRow = (label, date) => {
         return (
            <div className="row">
               <div className="col-sm-4"><strong>{label} date</strong></div>
               <div className="col-sm-4">
                  {Intl.DateTimeFormat('en-US', utc).format(date)}
               </div>
               <div className="col-sm-4">
                  {date.toLocaleTimeString('en-US', local)} {timezone}
               </div>
            </div>
         )
      }

      const renderPreviousBest = () => {
         const { previousBest } = this.state
         if (!previousBest) {
            return <div>No data.</div>
         }
         return <ClosestTable predictions={previousBest} />
      }

      return (
         <div>
            <section className="mt-2">
               <h4>This week</h4>
               {renderDateRow('Start', startDate)}
               {renderDateRow('Due', dueDate)}
               {renderDateRow('End', endDate)}
               <div className="row">
                  <div className="col-sm-4"><strong>Num. of Submissions</strong></div>
                  <div className="col-sm-8">{count}</div>
               </div>
            </section>
            <section>
               <h4>Previous week</h4>
               {renderPreviousBest()}
            </section>
         </div>
      )
   }
}

export default Summary
