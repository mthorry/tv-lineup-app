import React from 'react'
import { NavLink } from 'react-router-dom'

class Nav extends React.Component{
  render(){
    return(
      <div className="ui secondary menu">
        <NavLink className="item" to="/">| Home |</NavLink>
        <NavLink className="item" to="/search">| Search |</NavLink>
        <NavLink className="item" to="/shows">| My Shows |</NavLink>
        <NavLink className="item" to="/shows/calendar">| My Lineup |</NavLink>
      </div>
    )
  }
}
export default Nav