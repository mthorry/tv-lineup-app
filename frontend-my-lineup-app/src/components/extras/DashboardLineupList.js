import React from 'react'
import { connect } from 'react-redux'
import DashboardLineupItem from './DashboardLineupItem'
import moment from 'moment';
import { Card, Button, Icon, Loader } from 'semantic-ui-react'

class DashboardLineupList extends React.Component {

  render(){
    let d = moment(new Date())
    let tonight = ""
    if (this.props.myLineup.length > 0 ) { tonight = this.props.myLineup.filter(episode => d.diff(moment(episode.airstamp), 'days', true) <= 0 && d.diff(moment(episode.airstamp), 'days', true) >= -1) }

    let episodes = ""
    if (this.props.myLineup.length > 0 ) { episodes = tonight.reverse().map( episode => <DashboardLineupItem key={episode.id} episode={episode} showId={this.props.id} /> )}

    return(
      <div>
        <Card.Group>
        { episodes }
        </Card.Group>
        <br/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    myLineup: state.episode.myLineup,
  }
}

export default connect(mapStateToProps)(DashboardLineupList)