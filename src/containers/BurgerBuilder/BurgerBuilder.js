import React,{Component} from "react";
import Burger from "../../components/Burger/Burger";
import { connect } from "react-redux";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Aux from "../../hoc/Auxillary/Auxillary";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from '../../store/actions/index'


class BurgerBuilder extends Component {

    state = { 
      purchasing:false,
      loading: false,
      error: false
    }
    
    componentDidMount(){
      // axios.get('https://react-burger-app-917c0-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
      //  .then(res =>{
      //     this.setState({ingredients: res.data})
      //  })
      //  .catch(error =>  {
      //    this.setState({error:true})
      //  })
    }

    updatePurchaseState(ingredients) { 
      const sum = Object.keys(ingredients)
        .map(igKey => {
          return ingredients[igKey];
        })
        .reduce((sum, el) => {
          return sum + el;
        }, 0);
        return  sum > 0 
    }

    purchaseHandler = () => {
      this.setState({purchasing:true})
    } 

    purchaseCancelHandler =()=> {
      this.setState({purchasing:false})
    } 

    purchaseContinueHandler =()=> {
       this.props.history.push('/checkout')
    } 


    render() { 
      const disableInfo = {
        ...this.props.ings
      }

      for(let key in disableInfo){
        disableInfo[key] = disableInfo[key] <=0
      }
      let orderSummary = null
      let burger = this.state.error ? <p>Ingredients can't be loaded!</p>:<Spinner />
      
      if(this.props.ings){
         burger = (
          <Aux> 
            <Burger ingredients={this.props.ings} />
            <BuildControls
              ingredientsAdded={this.props.onIngredientAdded} 
              ingredientsRemoved={this.props.onIngredientRemoved}
              disabled={disableInfo}
              purchasable={this.updatePurchaseState(this.props.ings)}
              price={this.props.price}
              ordered={this.purchaseHandler}
            />
          </Aux>
        );
        orderSummary = <OrderSummary 
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
     />
      }
      
      if(this.state.loading){
        orderSummary = <Spinner />
      }
      return (
        <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
              {orderSummary}
            </Modal>
            {burger}
        </Aux>
        );
    }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}
const mapDispatchToProps = dispatch => {
  return{
    onIngredientAdded: (ingName)=> dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName)=> dispatch(burgerBuilderActions.removeIngredient(ingName)),
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));