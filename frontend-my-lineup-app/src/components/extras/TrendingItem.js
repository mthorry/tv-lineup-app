import React from 'react'
import { Item, Statistic, Button, Segment, Transition } from 'semantic-ui-react'
import { formatTime } from '../../services/formatting'

export default class TrendingItem extends React.Component {
  render(){
    let show = this.props.show.show
    let video_id = ""
      show.trailer ? video_id = show.trailer.slice(27) : null

    return(
      <Transition animation='fade left' duration={800} transitionOnMount={true}>
      <Item>
        <Item.Content>
          <Item.Header><h2><em>{show.title} on {show.network}</em></h2></Item.Header>
          {' '}
          <Segment floated='right'>
            <iframe id="ytplayer" type="text/html" width="355" height="200" src={`https://www.youtube.com/embed/${video_id}`} frameBorder="0"></iframe>
          </Segment>
          <Statistic.Group widths={3}>
            <Statistic size='small' color='teal'>
              <Statistic.Value>{this.props.show.watchers}</Statistic.Value>
              <Statistic.Label>watching now</Statistic.Label>
            </Statistic>
            <Statistic size='small' color='yellow'>
              <Statistic.Value>{(show.rating).toString().slice(0,3)}</Statistic.Value>
              <Statistic.Label>Rating</Statistic.Label>
            </Statistic>
            <Statistic size='small' color='blue'>
              <Statistic.Value>{show.aired_episodes}</Statistic.Value>
              <Statistic.Label >Episodes</Statistic.Label>
            </Statistic>
          </Statistic.Group>
            <Item.Description><strong>{show.airs.day} at {formatTime(show.airs.time)}</strong></Item.Description>
            <Item.Description>{show.overview}</Item.Description>
          <Item.Extra>
            <Button basic color='blue' icon='external' as='a' href={show.homepage} target='_blank' content='Website'/>
          </Item.Extra>
        </Item.Content>
      </Item>
      </Transition>
    )
  }
}

