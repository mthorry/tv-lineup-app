import React from 'react'
import { Item, Statistic, Button, Segment, Transition } from 'semantic-ui-react'
import { formatTime, formatSummary } from '../../services/formatting'

export default class MostWatchedItem extends React.Component {
  render(){
    let show = this.props.show.show
    let video_id = ""
      show.trailer ? video_id = show.trailer.slice(27) : null

    return(
      <Transition animation='fade right' duration={800} transitionOnMount={true}>
      <Item>
        <Item.Content>
          <Item.Header><h2><em>{show.title} on {show.network}</em></h2></Item.Header>
          {' '}
          <Segment floated='right'>
            <iframe id="ytplayer" type="text/html" width="355" height="200" src={`https://www.youtube.com/embed/${video_id}`} frameBorder="0"></iframe>
          </Segment>
          <Statistic.Group widths={4}>
            <Statistic size='small' color='blue'>
              <Statistic.Value>{this.props.show.watcher_count}</Statistic.Value>
              <Statistic.Label color='teal'>Watchers</Statistic.Label>
            </Statistic>
            {' '}
            <Statistic size='small' color='olive'>
              <Statistic.Value>{(show.rating).toString().slice(0,3)}</Statistic.Value>
              <Statistic.Label color='yellow'>Rating</Statistic.Label>
            {' '}
            </Statistic>
            <Statistic size='small' color='teal'>
              <Statistic.Value>{this.props.show.collected_count}</Statistic.Value>
              <Statistic.Label color='yellow'>Saves</Statistic.Label>
            {' '}
            </Statistic>
            <Statistic size='small' color='yellow'>
              <Statistic.Value>{this.props.show.collector_count}</Statistic.Value>
              <Statistic.Label color='yellow'>Collectors</Statistic.Label>
            </Statistic>
          </Statistic.Group>
            <Item.Description><strong>{show.airs.day} {show.airs.time !== null ? `at ${formatTime(show.airs.time)}` : null}</strong></Item.Description>
            <Item.Description>{formatSummary(show.overview)}</Item.Description>
          <Item.Extra>
            {show.homepage ? <Button basic color='blue' icon='external' as='a' href={show.homepage} target='_blank' content='Website'/> : null }
          </Item.Extra>
        </Item.Content>
      </Item>
      </Transition>
    )
  }
}

          //
