import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import { update }  from './actions'
import config from '../../config'

class Price extends Component {
   constructor(props) {
      super(props)
   }

   componentDidMount() {
      const { update } = this.props
      let socket = new WebSocket(`${config.apiWsRoot}/price`);

      socket.onmessage = e => {
         const price = e.data
         update(price)
      }
   }

   componentWillUnmount() {
   }

   render() {
      const { last, trend } = this.props
      const classFor = trend => {
         switch (trend) {
         case -1: return 'red'
         case 0: return 'black'
         case 1: return 'green'
         }
      }
      if (!last) {
         return <div />
      }
      const formatter = new Intl.NumberFormat('en-US', {
         style: 'currency',
         currency: 'USD',
         minimumFractionDigits: 4,
      })
      return (
         <span>
            Current Price: <strong className={classFor(trend)}>{formatter.format(last)}</strong>
            <small> *source <a href="https://bittrex.com/Market/Index?MarketName=BTC-LSK">Bittrex</a></small>
         </span>
      )
   }
}
Price.propTypes = {
   last: PropTypes.number,
   trend: PropTypes.number.isRequired,
   update: PropTypes.func.isRequired
}

function mapStateToProps(state) {
   return {
      last: state.price.item ? state.price.item.last : null,
      trend: state.price.trend
   }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ 
      update,
   }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Price)
