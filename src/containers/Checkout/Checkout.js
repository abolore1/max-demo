import React, {Component } from 'react'
import {connect} from 'react-redux'
import { Route } from 'react-router';

import CheckoutSummary  from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
 

  checkoutCancelHandler=()=>{
    this.props.history.goBack()
  }

  checkoutContinuedHandler=()=>{
    this.props.history.replace('/checkout/contact-data')
  }

  render() { 
    return ( 
        <div>
        <CheckoutSummary 
            ingredients={this.props.ing}
            checkoutCancelled={this.checkoutCancelHandler}
            checkoutContinued={this.checkoutContinuedHandler}/>
        <Route 
          path={this.props.match.path+ '/contact-data'}
          component={ContactData} /> 
        </div>
     );
  }
}

const mapStateToProps =state=> {
   return {
     ing: state.ingredients
   }
}
 
export default connect(mapStateToProps)(Checkout)