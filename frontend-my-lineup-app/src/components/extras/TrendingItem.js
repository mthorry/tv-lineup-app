import React from 'react'
import { Item, Statistic } from 'semantic-ui-react'
import { formatTime } from '../../services/formatting'

export default class TrendingItem extends React.Component {
  render(){
    let show = this.props.show.show

    return(
      <Item>
        <Item.Content>
          <Item.Header><h2>{show.title} on {show.network}</h2></Item.Header>
          {' '}
          <Statistic.Group>
          <Statistic size='small' color='teal'>
            <Statistic.Value>{this.props.show.watchers}</Statistic.Value>
            <Statistic.Label color='teal'>people watching</Statistic.Label>
          </Statistic>
          <Statistic size='small' color='yellow'>
            <Statistic.Value>{(show.rating).toString().slice(0,3)}</Statistic.Value>
            <Statistic.Label color='yellow'>Rating</Statistic.Label>
          </Statistic>
          </Statistic.Group>
            <Item.Description><strong>{show.airs.day} at {formatTime(show.airs.time)}</strong></Item.Description>
            <Item.Description>{show.overview}</Item.Description>
          <Item.Extra>
          <Item.Description as='a' to={show.website} content="Website"/>
          <Item.Description as='a' to={show.trailer} content="Trailer"/>
          </Item.Extra>
        </Item.Content>
      </Item>
    )
  }
}

