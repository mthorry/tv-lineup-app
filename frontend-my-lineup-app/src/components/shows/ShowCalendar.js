import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import React from 'react'
import { Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
require('react-big-calendar/lib/css/react-big-calendar.css');

BigCalendar.momentLocalizer(moment)

class ShowCalendar extends React.Component {

  handleSelectEvent = (episode) => {
    console.log(episode)
  }

  render() {
      let events = this.props.myLineup.map( episode => {
      let d = new Date(episode.airstamp)
        return {
          title: episode.show_title + ": " + episode.title,
          startDate: new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()),
          endDate: new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()+episode.runtime),
          url: episode.url,
          summary: episode.summary
        }
      })

      let ids = this.props.myLineup.map(show => show.id)
      let eps = this.props.onTonight.filter(episode => episode.show.rating.average > 7.5 && !ids.includes(episode.id))

      let onTonight = eps.map( episode => {
        let d = new Date(episode.airstamp)
        return {
          title: episode.show.name + " on " + (episode.show.network ? episode.show.network.name : episode.webchannel.name),
          startDate: new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()),
          endDate: new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()+episode.runtime),
          url: episode.url,
          summary: episode.summary
        }
      })

    return(
      <div>
      <Divider horizontal><h1>My Lineup</h1></Divider>
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
        <Divider horizontal><h2>Highly Rated Shows On Tonight</h2></Divider>
        <BigCalendar
          popup
          onSelectEvent={this.handleSelectEvent}
          events={onTonight}
          toolbar={false}
          views={['day']}
          defaultView='day'
          step={60}
          startAccessor='startDate'
          endAccessor='endDate'
          step={15}
          min={moment('8:00pm', 'h:mma').toDate()}
          max={moment('11:30pm', 'h:mma').toDate()}/>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    myShows: state.show.myShows,
    myLineup: state.show.myLineup,
    showEpisodes: state.show.showEpisodes,
    onTonight: state.show.onTonight
  }
}


export default connect(mapStateToProps)(ShowCalendar)