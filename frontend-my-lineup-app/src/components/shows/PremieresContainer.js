import React from 'react'
import { connect } from 'react-redux'
import { addSuggestedShow } from '../../actions/shows'
import { Divider, Modal, Button } from 'semantic-ui-react'
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
require('react-big-calendar/lib/css/react-big-calendar.css');

class PremieresContainer extends React.Component {
  state = { open: false }

  handleAdd = (event, episode) => {
    this.props.addSuggestedShow(episode.episode.show_id)
    this.close()
  }

  show = episode => (e) => this.setState({ episode: e, open: true })
  close = () => this.setState({ open: false })

  render(){
    const { open, episode } = this.state
    let events = this.props.premieres.map( premiere => {
      let d = new Date(premiere.episode.first_aired)

        return {
          title: (premiere.episode.number === 1 && premiere.episode.season === 1 ? "🌟 NEW " : "") + premiere.show.title + " on " + premiere.show.network,
          startDate: new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()),
          endDate: new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()+premiere.episode.runtime),
          summary: premiere.episode.overview,
          show_id: premiere.show.ids.tvdb
        }
      })

    return(
      <div>
        <br/>
        <Divider horizontal ><h1>Premieres This Week</h1></Divider>
          <BigCalendar
            popup
            onSelectEvent={this.show(episode)}
            events={events}
            views={['week', 'day']}
            defaultView='week'
            startAccessor='startDate'
            endAccessor='endDate'
            step={7.5}
            min={moment('8:00pm', 'h:mma').toDate()}
            max={moment('11:59pm', 'h:mma').toDate()}
          />
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
    premieres: state.show.premieres,
    myLineup: state.show.myLineup
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addSuggestedShow: (id) => {
      dispatch(addSuggestedShow(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PremieresContainer)