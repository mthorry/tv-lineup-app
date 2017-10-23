import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import React from 'react'
import { Divider, Modal, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { formatSummary } from '../../services/formatting'
import { addShow, addEpisode } from '../../actions/shows'
require('react-big-calendar/lib/css/react-big-calendar.css')

BigCalendar.momentLocalizer(moment)


class ShowCalendar extends React.Component {
  state = { open: false }

  handleAdd = (event, episode) => {
    let show = episode.episode.episode.show
    let ep = JSON.stringify({episode: episode.episode.episode})
    this.props.addShow(show)
    this.props.addEpisode(ep)
    this.close()
  }

  show = episode => (e) => this.setState({ episode: e, open: true })
  close = () => this.setState({ open: false })


  render() {
      const { open, episode } = this.state

      let events = this.props.myLineup.map( episode => {
        let d = new Date(episode.airstamp)
        let summary = "Unavailable 🤷"
        episode.summary !== null ? summary = formatSummary(episode.summary) : null

        return {
          title: episode.show_title + ": " + episode.title,
          startDate: new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()),
          endDate: new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()+episode.runtime),
          url: episode.url,
          summary: summary
        }
      })

      let ids = this.props.myLineup.map(show => show.id)
      let eps = this.props.onTonight.filter(episode => episode.show.rating.average > 7.5 && !ids.includes(episode.id))

      let onTonight = eps.map( episode => {
        let d = new Date(episode.airstamp)
        let summary = "Unavailable 🤷"
        episode.summary !== null ? summary = formatSummary(episode.summary) : null

        return {
          title: episode.show.name + " on " + (episode.show.network ? episode.show.network.name : episode.webchannel.name),
          startDate: new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()),
          endDate: new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()+episode.runtime),
          summary: summary,
          episode: episode
        }
      })

    return(
      <div>
        <br/>
      <Divider horizontal><h1>My Lineup</h1></Divider>
        <BigCalendar
          popup
          onSelectEvent={this.show(episode)}
          events={events}
          views={['week', 'day', 'agenda']}
          defaultView='day'
          startAccessor='startDate'
          endAccessor='endDate'
          step={7.5}
          min={moment('8:00pm', 'h:mma').toDate()}
          max={moment('11:59pm', 'h:mma').toDate()}
        />
        <br/>

        <Divider horizontal><h2>Highly Rated Shows On Tonight</h2></Divider>
        <BigCalendar
          popup
          onSelectEvent={this.show(episode)}
          events={onTonight}
          toolbar={false}
          views={['day']}
          defaultView='day'
          startAccessor='startDate'
          endAccessor='endDate'
          step={15}
          min={moment('8:00pm', 'h:mma').toDate()}
          max={moment('11:30pm', 'h:mma').toDate()}/>

        <Modal size='tiny' episode={episode} open={open} onClose={this.close}>
          <Modal.Header>
            { episode !== undefined ? episode.title : null}
          </Modal.Header>
          <Modal.Content>
            <h4>{ episode !== undefined ? `Time: ${moment(episode.startDate).format('h:mm a')} - ${moment(episode.endDate).format('h:mm a')}` : `No Summary Available` }</h4>
            <h5>{ episode !== undefined ? `Summary: ${episode.summary !== null ? episode.summary : `No Summary Available 😕`}` : `No Summary Available` }</h5>
          </Modal.Content>
          <Modal.Actions>
           <Button negative onClick={this.close}>
              Nevermind
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content='Add Show' episode={episode} onClick={this.handleAdd}/>
          </Modal.Actions>
        </Modal>
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

function mapDispatchToProps(dispatch) {
  return {
    addShow: (id) => {
      dispatch(addShow(id))
    },
    addEpisode: (episode) => {
      dispatch(addEpisode(episode))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowCalendar)