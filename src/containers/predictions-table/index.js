import React from 'react'
import PropTypes from 'prop-types'

import ReactTable from 'react-table'
import 'react-table/react-table.css'

const Table = props => {
   const xs = props.predictions

   const renderPrice = row => {
      return (
         <div className="text-right">{row.value}</div>
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

   const columns = [{
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

   let min = xs.reduce((min, o) => o.price < min ? o.price : min, xs[0].price)
   let max = xs.reduce((max, o) => o.price > max ? o.price : max, xs[0].price)

   const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 4,
   })
   const totalCount = xs.length
   const maxPageSize = 10
   const pageSize = (totalCount <= maxPageSize) ? totalCount : maxPageSize
   const showPagination = totalCount > maxPageSize
   return (
      <section>
         <div className="clearfix">
            <h5 className="float-left text-uppercase">
               All Predictions&nbsp;
               <span className="text-muted">
                  (total {totalCount} <small className="separator">-</small> lowest {formatter.format(min)} <small className="separator">-</small> highest {formatter.format(max)})
               </span>
            </h5>
            <small className="float-right text-muted">(Click on a column headers to sort)</small>
         </div>
         <ReactTable
            data={xs}
            columns={columns}
            pageSize={pageSize}
            showPagination={showPagination} />
      </section>
   )
}
Table.propTypes = {
   predictions: PropTypes.array.isRequired
}

export default Table
