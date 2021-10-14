import React from 'react'
import classes from './Order.module.css'

const order =(props)=>{
  let ingredients = []
  for(let ingredientsName in props.ingredients){
    ingredients.push(
        {
          name: ingredientsName, 
          amount:props.ingredients[ingredientsName]
        }
      )
  }
   const ingredientsOutput = ingredients.map(ig => <span 
    style={
      {
       textTransform:'capitalize',
       display:'inline-block',
       border: '1px solid #ccc',
       margin:'0 8px',
       padding: '5px'
      }}
    key={ig.name}>{ig.name}({ig.amount})</span>)
   return (
     <div className={classes.Order}>
         <p>Ingredients: {ingredientsOutput}</p>
         <p><strong>Price: USD {props.price.toFixed(2)}</strong></p>
     </div>
   )
}

export default order