import React from 'react'
import { connect } from 'react-redux'
import DashboardOnTonightItem from './DashboardOnTonightItem'
import moment from 'moment';
import { Card, Button, Icon, Loader } from 'semantic-ui-react'

class DashboardOnTonightList extends React.Component {

  state = {
    currentPageNo: 1,
    displayedItems: []
  }

  componentDidMount() {
    if (this.props.myLineup.length > 0) {this.paginate()}
  }

  paginate = () => {
    let ids = this.props.myLineup.map(show => show.id)
    let begin = (this.state.currentPageNo - 1) * 5
    let end = begin + 5
    let eps = this.props.onTonight.filter(episode => episode.show.rating.average > 8 && !ids.includes(episode.id))
    let displayed = eps.slice(begin, end)
    this.setState({
      displayedItems: displayed
    })
  }

  handleNext = () => {
    let page = this.state.currentPageNo
    this.setState({
      currentPageNo: page + 1
    }, () => this.paginate())
  }

  handlePrevious = () => {
    let page = this.state.currentPageNo
    this.setState({
      currentPageNo: page - 1
    }, () => this.paginate())
  }


  render(){

    let episodes = ""
    if (this.state.displayedItems && this.props.myLineup) {episodes = this.state.displayedItems.map( episode => <DashboardOnTonightItem key={episode.id} episode={episode} showId={this.props.id} /> )}

    return(
      <div>
        <Card.Group>
        { episodes }
        </Card.Group>
        <br/>
        <div>
        { this.state.displayedItems.length < 5 ? null : <Button floated='right' basic color='grey' onClick={this.handleNext}> More <Icon name='right arrow'/></Button> }
        { this.state.currentPageNo === 1 ? null : <Button floated='left' basic color='grey' onClick={this.handlePrevious} ><Icon name='left arrow'/> Back </Button> }
        <br/>
        </div>
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

export default connect(mapStateToProps)(DashboardOnTonightList)