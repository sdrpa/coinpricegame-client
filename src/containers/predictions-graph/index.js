import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Bar } from 'react-chartjs-2'
import { Float } from '../fn'

const Graph = (props) => {
   const distribution = (predictions, buckets = 20) => {
      if (predictions.length === 0) {
         return []
      }
      let ps = buckets < predictions.length ? buckets : predictions.length
      let min = predictions.reduce((min, o) => o.price < min ? o.price : min, predictions[0].price)
      let max = predictions.reduce((max, o) => o.price > max ? o.price : max, predictions[0].price)
      // Partition size
      const pSize0 = (max - min) / ps
      const pSize = pSize0 == 0 ? min : pSize0
      // Determine range for each partition {start, end}
      var rs = []
      for (var i = 0; i < ps; i++) {
         const start = min + i * pSize
         const end = min + i * pSize + pSize
         rs.push({ start, end })
      }
      // Calculate [partition index : number of items]
      var pi = []
      predictions.forEach(s => {
         const d = (s.price - min) / pSize
         const index = Math.floor(d)
         const i = index < ps ? index : index - 1
         const curr = isNaN(pi[i]) ? 0 : pi[i]
         pi[i] = curr + 1
      })
      // Zip d and d2 to get [{start, end, number of items}]
      var dist = []
      for (var j = 0; j < ps; j++) {
         const count = isNaN(pi[j]) ? 0 : pi[j]
         const start = rs[j].start
         const end = rs[j].end
         dist.push({ start, end, count })
      }
      return dist
   }

   const { predictions, fetching } = props
   if (!predictions || (predictions.length === 0)) {
      return <div />
   }
   if (fetching) {
      return <div>Loading graph...</div>
   }
   
   const dist = distribution(predictions)
   const data = {
      labels: dist.map(o => {
         return '$' + Float(1, o.start).toString() + '-' + Float(1, o.end).toString()
      }),
      datasets: [{
         label: 'Count',
         data: dist.map(o => {
            return o.count
         })
      }]
   }

   return (
      <section>
         <h5 className="text-uppercase">Distribution</h5>
         <Bar
            data={data}
            options={{
               maintainAspectRatio: true,
               legend: {
                  display: false
               }
            }} />
      </section>
   )
}
Graph.propTypes = {
   predictions: PropTypes.array,
   fetching: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
   return {
      predictions: state.predictions.all,
      fetching: state.predictions.fetching
   }
}

export default connect(mapStateToProps)(Graph)
