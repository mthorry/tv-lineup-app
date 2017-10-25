import React from 'react'
import { connect } from 'react-redux'
import EpisodeItem from './EpisodeItem'
import { Card, Button, Icon, Loader } from 'semantic-ui-react'

class EpisodeList extends React.Component {

  state = {
    currentPageNo: 1,
    displayedItems: []
  }

  componentDidMount() {
    setTimeout(() => this.paginate(), 1000)
  }

  paginate = () => {
    let begin = (this.state.currentPageNo - 1) * 5
    let end = begin + 5
    let displayed = this.props.showEpisodes.slice(begin, end)
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
    if (this.state.displayedItems && this.props.myLineup) {episodes = this.state.displayedItems.map( episode => <EpisodeItem key={episode.id} episode={episode} showId={this.props.id} added={this.props.myLineup.filter(myEpisode => myEpisode.id == episode.id)} /> )}

    return(
      <div>
        <Card.Group>
        { episodes}
        </Card.Group>
        <br/>
        <div>
        { this.state.displayedItems.length < 5 ? null : <Button floated='left' basic color='grey' onClick={this.handleNext}><Icon name='left arrow'/> Older </Button> }
        { this.state.currentPageNo === 1 ? null : <Button floated='right' basic color='grey' onClick={this.handlePrevious} > Newer <Icon name='right arrow'/></Button> }
        <br/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    myLineup: state.episode.myLineup,
    showEpisodes: state.episode.showEpisodes,
  }
}

export default connect(mapStateToProps)(EpisodeList)