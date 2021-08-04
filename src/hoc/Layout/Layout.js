import React,{Component} from 'react'
import Aux from '../Auxillary/Auxillary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import classes from './Layout.module.css'


class Layout extends Component  {
      state = {
        showSideDrawer: true
      } 

      sideDrawerCloseHandler =()=> {
          this.setState({ showSideDrawer:false })
      }
      
      drawerToggleHandler =()=> {
        this.setState(( prevState ) =>{
          return { showSideDrawer:!prevState.SideDrawer}
        });
      }

      render(){
        return (
          <Aux>
              <Toolbar drawerToggleClicked={this.drawerToggleHandler}/>
              <SideDrawer
               open={this.state.showSideDrawer}
               closed={this.sideDrawerCloseHandler} />
              <main className={classes.Content}>
                {this.props.children}
            </main>
          </Aux>
        )
      }

}

export default Layout