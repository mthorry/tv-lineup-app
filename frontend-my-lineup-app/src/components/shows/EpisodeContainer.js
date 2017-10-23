import React from 'react'
import { connect } from 'react-redux'
import { fetchShowEpisodes } from '../../actions/shows'
import EpisodeList from './EpisodeList'
import SuggestedList from './SuggestedList'
import { Divider } from 'semantic-ui-react'

class EpisodeContainer extends React.Component {

  componentDidMount() {
    this.props.fetchShowEpisodes(this.props.match.params.id)
  }


  render(){
    const name = this.props.match.params.name
    const id = this.props.match.params.id
    return(
      <div>
        <br/>
        <Divider horizontal ><h2>Episodes</h2></Divider>
          <EpisodeList show={name} id={id} />
        <br/>
        <Divider horizontal ><h2>Suggested Shows</h2></Divider>
          <SuggestedList show={name} id={id} />
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    myShows: state.show.myShows,
    myLineup: state.show.myLineup,
    showEpisodes: state.show.showEpisodes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchShowEpisodes: (id) => {
      dispatch(fetchShowEpisodes(id))
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeContainer)