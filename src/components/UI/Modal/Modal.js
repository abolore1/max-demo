import React, { Component } from "react";
import classes from './Modal.module.css'
import Aux from "../../../hoc/Auxillary/Auxillary";
import Backdrop from "../Backdrop/Backdrop";


class Modal extends Component {
  
   shouldComponentUpdate(nextProps){
      return nextProps.show !==this.props.show || nextProps.children !== this.props.children
   }

   UNSAFE_componentWillUpdate(  ){
      console.log('[Modal]....ComponentWillUpdate')
   }

   render() {
      return (     
      <Aux>
         <Backdrop show={this.props.show} clicked={this.props.ModalClosed}/>
         <div className={classes.Modal}
            style={{
               transform:this.props.show?'translateY(0)':'translateY(-100vh)',
               opacity: this.props.show ? '1': '0',
            }}>
           {this.props.children}
         </div>
     </Aux>
   )
      
   }
}


export default Modal 