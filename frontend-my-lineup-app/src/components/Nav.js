import React from 'react'
import { NavLink } from 'react-router-dom'
// import { Sticky } from 'semantic-ui-react'

class Nav extends React.Component{
  render(){
    return(
      <div className="ui menu">
        <div className="header item">
          <img src="http://d2trtkcohkrm90.cloudfront.net/images/emoji/apple/ios-10/256/television.png"/>
        </div>
        <div className="right menu">
          <NavLink className="item" to="/search"> Search </NavLink>
          <NavLink className="item" to="/shows"> My Shows </NavLink>
          <NavLink className="item" to="/shows/calendar"> My Lineup </NavLink>
        </div>
      </div>
    )
  }
}
export default Nav