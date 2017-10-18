import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import React from 'react'
import { connect } from 'react-redux'
require('react-big-calendar/lib/css/react-big-calendar.css');

BigCalendar.momentLocalizer(moment)

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class ShowCalendar extends React.Component {

  handleSelectEvent = (episode) => {
    console.log(episode)
  }

  render() {
    const myLineup = this.props.myLineup

      let events = myLineup.map( episode => {
      let d = new Date(episode.airstamp)
      let year = d.getFullYear()
        return {
          title: episode.show_title + ": " + episode.title,
          startDate: new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()),
          endDate: new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()+episode.runtime),
          url: episode.url,
          summary: episode.summary
        }
      })

    return(
      <div>
      <h1>My Lineup</h1>
        <BigCalendar
          popup
          onSelectEvent={this.handleSelectEvent}
          events={events}
          views={['week', 'day', 'agenda']}
          defaultView='day'
          step={60}
          startAccessor='startDate'
          endAccessor='endDate'
          step={15}
          min={moment('7:00pm', 'h:mma').toDate()}
          max={moment('11:59pm', 'h:mma').toDate()}
        />
        <br/>
        <h2>Also On Tonight</h2>
        <BigCalendar
          popup
          onSelectEvent={this.handleSelectEvent}
          events={events}
          toolbar={false}
          views={['day']}
          defaultView='day'
          step={60}
          startAccessor='startDate'
          endAccessor='endDate'
          step={15}
          min={moment('7:00pm', 'h:mma').toDate()}
          max={moment('11:59pm', 'h:mma').toDate()}/>
      </div>
    )
  }
}



function mapStateToProps(state) {
  return {
    myShows: state.show.myShows,
    myLineup: state.show.myLineup,
    showEpisodes: state.show.showEpisodes
  }
}


export default connect(mapStateToProps)(ShowCalendar)