import React from 'react'
import PropTypes from 'prop-types'

import ReactTable from 'react-table'
import 'react-table/react-table.css'

const ClosestTable = props => {
   let xs = props.predictions

   const renderPlace = row => {
      const place = index => {
         switch (index) {
         case 0: return '1st'
         case 1: return '2nd'
         case 2: return '3rd'
         }
      }
      return (
         <div className={`text-center ${rowClass(row.index)} narrow-column`}>{place(row.index)}</div>
      )
   }

   const renderPrice = row => {
      return (
         <div className={`text-right ${rowClass(row.index)}`}>{row.value}</div>
      )
   }

   const renderDate = row => {
      const dt = new Date(row.value * 1000)
      const options = { month: 'short', day: 'numeric' }
      return (
         <div className="text-right">
            {dt.toLocaleTimeString('en-US', options)}
         </div>
      )
   }

   const renderSender = row => {
      return (
         <div className="text-right">{row.value}</div>
      )
   }

   const rowClass = index => {
      switch (index) {
      case 0: return 'gold'
      case 1: return 'silver'
      case 2: return 'bronze'
      }
   }

   const columns = [{
      Header: 'Place',
      accessor: 'price',
      Cell: row => renderPlace(row)
   }, {
      Header: 'Price in USD',
      accessor: 'price',
      Cell: row => renderPrice(row)
   }, {
      Header: 'Date',
      accessor: 'date',
      Cell: row => renderDate(row)
   }, {
      Header: 'Sender',
      accessor: 'senderId',
      Cell: row => renderSender(row)
   }]

   if (xs.length === 0) {
      return <div />
   }
   let pageSize = xs.length
   return (
      <div>
         <h5 className="text-uppercase">Closest Predictions&nbsp;
            {/* <span className="text-muted">({count})</span> */}
         </h5>
         <ReactTable
            data={xs}
            columns={columns}
            pageSize={pageSize}
            sortable={false}
            showPagination={false} />
      </div>
   )
}
ClosestTable.propTypes = {
   predictions: PropTypes.array
}

export default ClosestTable
