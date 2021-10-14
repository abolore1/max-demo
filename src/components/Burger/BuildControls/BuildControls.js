import React from 'react';
import styles from './BuildControls.module.css'
import BuildControl from "./BuildControl/BuildControl";

const controls = [
   { label: 'Meat' , type: 'meat'},
   { label: 'Cheese' , type: 'cheese'},
   { label: 'Salad' , type: 'salad'},
   { label: 'Bacon' , type: 'bacon'},
];

const buildControls =(props)=> (
       <div className={styles.BuildControls}>
          <p>Current Price:<strong> {props.price.toFixed(2)}</strong></p>
         {controls.map(ctrl => (
            <BuildControl 
              key={ctrl.label}
              label={ctrl.label}
              added={()=>props.ingredientsAdded(ctrl.type)} 
              removed={()=>props.ingredientsRemoved(ctrl.type)}
              disabled={props.disabled[ctrl.type]}
              />
         ))}
         <button
          className={styles.OrderButton}
          disabled={!props.purchasable} 
          onClick={props.ordered}>ORDER NOW</button>
       </div> 
    );

export default buildControls;