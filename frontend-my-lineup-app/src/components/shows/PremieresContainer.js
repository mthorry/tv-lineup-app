import React from 'react'
import { connect } from 'react-redux'
import { addSuggestedShow, fetchPremieres } from '../../actions/shows'
import { addEpisode, fetchMyLineup } from '../../actions/episodes'
import { Divider, Modal, Button, Transition } from 'semantic-ui-react'
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
require('react-big-calendar/lib/css/react-big-calendar.css');

class PremieresContainer extends React.Component {
  state = { open: false }

  componentDidMount() {
    const userId = localStorage.getItem("id")
    this.props.myLineup.length > 0 ? null : this.props.fetchMyLineup(userId)
    this.props.premieres.length > 0 ? null : this.props.fetchPremieres()
  }


  handleAdd = (event, episode) => {
    event.preventDefault()
    this.props.addSuggestedShow({id: episode.episode.show_id})
    this.close()
  }


  addEpisode = (ep) => {
    this.props.addEpisode(ep)
  }

  show = episode => (e) => this.setState({ episode: e, open: true })
  close = () => this.setState({ open: false })

  eventStyleGetter = (event, start, end, isSelected) => {
      var style = {
          backgroundColor: '#8fbc8f',
          borderRadius: '5px',
          borderColor: 'white',
          color: 'white',
          display: 'block',
      }
      return {
          style: style
      }
  }

  render(){
    const { open, episode } = this.state

    let events = this.props.premieres.map( premiere => {
      let d = new Date(premiere.episode.first_aired)
       if (d.getHours() >= 20){
        return {
          title: (premiere.episode.number === 1 && premiere.episode.season === 1 ? "🌟 NEW " : "") + premiere.show.title + " on " + premiere.show.network,
          startDate: new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()),
          endDate: new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()+premiere.episode.runtime),
          summary: premiere.episode.overview,
          show_id: premiere.show.ids.tvdb,
          episode: premiere
        }}
      })

    return(
      <div>
        <br/>
        <Divider horizontal ><h1>Premieres This Week</h1></Divider>
          <Transition animation='fade' duration={800} transitionOnMount={true}>
          <BigCalendar
            popup
            onSelectEvent={this.show(episode)}
            events={events}
            views={['week', 'day']}
            defaultView='week'
            startAccessor='startDate'
            endAccessor='endDate'
            step={7.5}
            eventPropGetter={(this.eventStyleGetter)}
            min={moment('8:00pm', 'h:mma').toDate()}
            max={moment('11:59pm', 'h:mma').toDate()}
          />
          </Transition>
        <br/>

        <Modal size='tiny' episode={episode} open={open} onClose={this.close}>
          <Modal.Header>
            { episode !== undefined ? episode.title : null}
          </Modal.Header>
          <Modal.Content>
            <h4>{ episode !== undefined ? `Time: ${moment(episode.startDate).format('h:mm a')} - ${moment(episode.endDate).format('h:mm a')}` : `No Summary Available` }</h4>
            <p>{ episode !== undefined ? `Summary: ${episode.summary !== null ? episode.summary : `No Summary Available 😕`}` : `No Summary Available` }</p>
          </Modal.Content>
          <Modal.Actions>
           <Button negative icon='remove' labelPosition='right' onClick={this.close} content='Close'/>
            <Button positive icon='checkmark' labelPosition='right' content='Add Show' episode={episode} onClick={this.handleAdd}/>
          </Modal.Actions>
        </Modal>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    premieres: state.show.premieres,
    myLineup: state.episode.myLineup
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addSuggestedShow: (id) => {
      dispatch(addSuggestedShow(id))
    },
    addEpisode: (episode) => {
      dispatch(addEpisode(episode))
    },
    fetchMyLineup: (id) => {
      dispatch(fetchMyLineup(id))
    },
    fetchPremieres: () => {
      dispatch(fetchPremieres())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PremieresContainer)