import React from 'react'
import { connect } from 'react-redux'
import { addShow } from '../../actions/shows'
import { addEpisode, removeEpisode, fetchMyLineup } from '../../actions/episodes'
import { formatSummaryShort } from '../../services/formatting'
import { Card, Button, Image, Transition } from 'semantic-ui-react'
import moment from 'moment'

class DashboardOnTonightItem extends React.Component {

  handleAdd = (event, episode) => {
    event.preventDefault()
    let show = episode.episode.show
    this.props.addShow(show)
    let ep = JSON.stringify({episode: episode.episode, show_id: show.id})
    setTimeout(() => this.addEpisode(ep), 2000)
  }

  addEpisode = (ep) => {
    this.props.addEpisode(ep)
  }

  render(){
    const ep = this.props.episode
    let summary = ""
    if (ep) { ep.summary ? summary = formatSummaryShort(ep.summary) : summary = "No Summary Available 😔" }

    return(
      <Transition animation='fly left' duration={1000} transitionOnMount={true}>
      <Card centered={true}  color='blue'>
        <Card.Content>
          <Card.Header as='h2'>{ep.show.name}: {ep.name}</Card.Header>
          <Card.Header as='h3'>{moment(ep.airstamp).format('h:mm a')} on { ep.show.network.name || ep.show.webChannel.name}</Card.Header>
          <Card.Description>Season {ep.season}: Episode {ep.number}</Card.Description>
          <p></p>
          <Card.Meta>{summary}</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
          <Button basic color='teal' as='a' href={ep.url} target='_blank' content='More Info' icon='external'/>
          <Button basic color='olive' as='a' href={ep.url} target='_blank' content='My Lineup' icon='add to calendar' episode={ep} onClick={this.handleAdd}/>
          </div>
        </Card.Content>
      </Card>
      </Transition>
    )
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

export default connect(null, mapDispatchToProps)(DashboardOnTonightItem)

