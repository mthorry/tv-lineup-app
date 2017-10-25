import React from 'react'
import { connect } from 'react-redux'
import { addEpisode, removeEpisode, fetchMyLineup } from '../../actions/shows'
import { formatSummaryShort } from '../../services/formatting'
import { Card, Button, Image, Transition } from 'semantic-ui-react'
import moment from 'moment'

class DashboardOnTonightItem extends React.Component {

  render(){
    const ep = this.props.episode
    let summary = ""
    if (ep) { ep.summary ? summary = formatSummaryShort(ep.summary) : summary = "No Summary Available 😔" }

    return(
      <Transition animation='fly left' duration={1000} transitionOnMount={true}>
      <Card centered={true}  color='yellow'>
        <Card.Content>
          <Card.Header as='h2'>{ep.show.name}: {ep.name}</Card.Header>
          <Card.Header as='h3'>{moment(ep.airstamp).format('h:mm a')} on { ep.show.network.name || ep.show.webChannel.name}</Card.Header>
          <Card.Description>Season {ep.season}: Episode {ep.number}</Card.Description>
          <p></p>
          <Card.Meta>{summary}</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
          <Button  color='teal' as='a' href={ep.url} target='_blank' content='More Info' icon='external'/>
          </div>
        </Card.Content>
      </Card>
      </Transition>
    )
  }
}

export default connect()(DashboardOnTonightItem)

