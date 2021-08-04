import React from 'react'
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
class App extends React.Component {
  state = {  }
  render() { 
    return ( 
    <div>
         <Layout>
           <BurgerBuilder/>
         </Layout>
    </div> );
  }
}
 
export default App;