import React,{ Component } from "react";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import axios from '../../../axios-order'
import classes from './ContactData.module.css'
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
    
  state = {
    orderForm: {
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
              required: true
            },
            valid: false,
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            touched: false,
            validation: {
              required: true
            },
            valid: false,
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code',

            },
            value: '',
            touched: false,
            validation: {
              required: true,
              minLength: 5,
              maxLength: 5,
            },
            valid: false,
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            touched: false,
            validation: {
              required: true
            },
            valid: false,
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value: '',
            touched: false,
            validation: {
              required: true
            },
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ]
            },
            value: '',
            validation: {},
            valid: true
        }
    },
    formIsValid: false,
    loading: false
}

  orderHandler=(e)=>{
      e.preventDefault()
      //submitting form to firebase
      const formData = {}
      for(let formDataIdentifier in this.state.orderForm){
        formData[formDataIdentifier] = this.state.orderForm[formDataIdentifier].value
      } 
      this.setState({loading: true})
      const order = {
        ingredients : this.props.ings,
        price: this.props.price,
        orderForm: formData // 
      }
       axios.post('/orders.json', order)
       .then(res => {
         this.setState({loading: false })
        //  this.props.history.push('/');
      })
       .catch(err => {
         this.setState({loading: false})
      });
      this.props.history.push('/')
  }
  
  checkValidity(value, rules) {
      let isValid = true
      if(rules.required){
        isValid = value.trim() !=='' && isValid
      }

      if(rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
      }

      if(rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
      }
      
      return isValid
  }
  inputChangeHandler=(e, inputIdentifier)=>{
    const updatedOrderForm = {...this.state.orderForm}
    const updatedFormElement = {...updatedOrderForm[inputIdentifier]}
    updatedFormElement.value = e.target.value
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true
    updatedOrderForm[inputIdentifier] = updatedFormElement

    let formIsValid = true
    for(let inputIdentifier in updatedOrderForm){
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
    }

    this.setState({orderForm: updatedOrderForm, formIsValid:formIsValid})
  }

  render() {
    const formElementsArray = []
    for(let key in this.state.orderForm){
      formElementsArray.push({
        id:key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form onSubmit={this.orderHandler}>
       {formElementsArray.map(formElement =>(
         <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(e)=>this.inputChangeHandler(e,formElement.id)}
          />
       ))}
      <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
    </form>
    )
    if(this.state.loading){
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
         {form}
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    ings: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(ContactData);
