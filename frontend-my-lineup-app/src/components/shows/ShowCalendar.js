import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import React from 'react'
import { Divider, Modal, Button, Transition } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { formatSummary } from '../../services/formatting'
import { addEpisode, removeEpisode, fetchMyLineup } from '../../actions/episodes'
import { addShow, fetchOnTonight } from '../../actions/shows'
require('react-big-calendar/lib/css/react-big-calendar.css')

BigCalendar.momentLocalizer(moment)


class ShowCalendar extends React.Component {
  state = { open: false }

  componentDidMount() {
    const userId = localStorage.getItem("id")
    this.props.fetchMyLineup(userId)
    this.props.fetchOnTonight()
  }

  handleAdd = (event, episode) => {
    event.preventDefault()
    let show = episode.episode.episode.show
    this.props.addShow(show)
    let ep = JSON.stringify({episode: episode.episode.episode, show_id: show.id})
    setTimeout(() => this.addEpisode(ep), 2000)
    this.close()
  }

  addEpisode = (ep) => {
    this.props.addEpisode(ep)
  }

  handleRemove = (event, episode) => {
    event.preventDefault()
    let id = JSON.stringify({episode_id: episode.episode.id})
    this.props.removeEpisode(id)
    this.close()
  }

  show = episode => (e) => this.setState({ episode: e, open: true })
  close = () => this.setState({ open: false })

  eventStyleGetter = (event, start, end, isSelected) => {
      var style = {
          backgroundColor: '#20b2aa',
          borderRadius: '5px',
          borderColor: 'white',
          color: 'white',
          display: 'block',
      }
      return {
          style: style
      }
  }

  render() {
      const { open, episode } = this.state

      let events = this.props.myLineup.map( episode => {
        let d = new Date(episode.airstamp)
        let summary = "Unavailable 🤷"
        episode.summary !== null ? summary = formatSummary(episode.summary) : null

        return {
          title: episode.show_title + ": " + episode.title + " " +(episode.show ? ('on ' +episode.show.network) : null),
          startDate: new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()),
          endDate: new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()+episode.runtime),
          url: episode.url,
          summary: summary,
          id: episode.id
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
          episode: episode,
          id: episode.id
        }
      })

    return(
      <div>
        <br/>
      <Divider horizontal><h1>My Lineup</h1></Divider>
      <Transition animation='fade' duration={800} transitionOnMount={true}>
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
        </Transition>
        <br/>

        <Divider horizontal><h2>Highly Rated Shows On Tonight</h2></Divider>
      <Transition animation='fade' duration={800} transitionOnMount={true}>
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
          eventPropGetter={(this.eventStyleGetter)}
          min={moment('8:00pm', 'h:mma').toDate()}
          max={moment('11:30pm', 'h:mma').toDate()}/>
        </Transition>

        <Modal size='tiny' episode={episode} open={open} onClose={this.close}>
          <Modal.Header>
            { episode !== undefined ? episode.title : null}
          </Modal.Header>
          <Modal.Content>
            <h4>{ episode !== undefined ? `Time: ${moment(episode.startDate).format('h:mm a')} - ${moment(episode.endDate).format('h:mm a')}` : `No Summary Available` }</h4>
            <h5>{ episode !== undefined ? `Summary: ${episode.summary !== null ? episode.summary : `No Summary Available 😕`}` : `No Summary Available` }</h5>
          </Modal.Content>
          <Modal.Actions>
           { episode !== undefined ? ( !ids.includes(episode.id) ? <Button icon='remove' labelPosition='right' onClick={this.close} content='Close'/> : <Button negative onClick={this.handleRemove} labelPosition='right' episode={episode} content='Remove from Lineup'/> ) : null}

           { episode !== undefined ? ( !ids.includes(episode.id) ? <Button positive icon='checkmark' labelPosition='right' content='Add Show' episode={episode} onClick={this.handleAdd}/> : <Button negative icon='remove' labelPosition='right' onClick={this.handleRemove} episode={episode} content='Remove from Lineup'/> ) : null }

          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    myLineup: state.episode.myLineup,
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
    },
    removeEpisode: (id) => {
      dispatch(removeEpisode(id))
    },
    fetchMyLineup: (id) => {
      dispatch(fetchMyLineup(id))
    },
    fetchOnTonight: () => {
      dispatch(fetchOnTonight())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowCalendar)