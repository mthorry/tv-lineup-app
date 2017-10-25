import React from 'react'
import { NavLink } from 'react-router-dom'
import { Dropdown, Menu } from 'semantic-ui-react'

class Nav extends React.Component{

  handleLogout = () => {
    localStorage.removeItem("jwtToken")
    localStorage.removeItem("id")
  }

  render(){
    return(
      <div className="navbar">
      <Menu color='teal' pointing secondary>
        <Menu.Item>
          <img src="http://d2trtkcohkrm90.cloudfront.net/images/emoji/apple/ios-10/256/television.png" alt="📺"/>
        </Menu.Item>
        { localStorage.getItem('jwtToken') ? <div className="right menu">
            <NavLink className="item" to="/search"> Search </NavLink>
            <NavLink className="item" to="/dash"> Dashboard </NavLink>
            <NavLink className="item" to="/shows"> My Shows </NavLink>
            <NavLink className="item" to="/lineup"> My Lineup </NavLink>
            <Dropdown item text='More'>
              <Dropdown.Menu>
                <NavLink className="item" to="/premieres"> Premieres </NavLink>
                <NavLink className="item" to="/trending"> Trending </NavLink>
                <NavLink className="item" to="/watching"> Most Watched </NavLink>
              </Dropdown.Menu>
            </Dropdown>
            <NavLink className="item" to="/login" onClick={this.handleLogout}> Logout </NavLink>
          </div> : <div className="right menu"><NavLink className="item" to="/login"> Login </NavLink><NavLink className="item" to="/signup"> Signup </NavLink></div> }
      </Menu>
      </div>
    )
  }
}
export default Nav