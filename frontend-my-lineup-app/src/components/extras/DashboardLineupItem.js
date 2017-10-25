import React from 'react'
import { connect } from 'react-redux'
import { addEpisode, removeEpisode, fetchMyLineup } from '../../actions/shows'
import { formatSummaryShort } from '../../services/formatting'
import { Card, Button, Image, Transition } from 'semantic-ui-react'
import moment from 'moment'

class DashboardLineupItem extends React.Component {

  render(){
    const ep = this.props.episode
    let summary = ""
    if (ep) { ep.summary ? summary = formatSummaryShort(ep.summary) : summary = "No Summary Available 😔" }

    return(
      <Transition animation='drop' duration={1000} transitionOnMount={true}>
      <Card centered={true} color='olive'>
        <Card.Content>
          <Card.Header as='h2'>{ep.show_title}: {ep.title}</Card.Header>
          <Card.Header as='h3'>{moment(ep.airstamp).format('h:mm a')} on {ep.show.network}</Card.Header>
          <Card.Description>Season {ep.season}: Episode {ep.number}</Card.Description>
          <Card.Meta>{summary}</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
          <Button basic color='blue' as='a' href={ep.url} target='_blank' content='More Info' icon='external'/>
          </div>
        </Card.Content>
      </Card>
      </Transition>
    )
  }
}

export default connect()(DashboardLineupItem)

