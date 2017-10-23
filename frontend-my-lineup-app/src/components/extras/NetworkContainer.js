import React from 'react'
import { connect } from 'react-redux'
// import { fetchShowEpisodes, sortEpisodes } from '../../actions/shows'
import { Divider } from 'semantic-ui-react'

class NetworkContainer extends React.Component {

  componentDidMount() {
    // this.props.fetchShowEpisodes(this.props.match.params.id)
  }


  render(){

    return(
      <div>
        NetworkContainer
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    // myShows: state.show.myShows,
    // myLineup: state.show.myLineup,
    // showEpisodes: state.show.showEpisodes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // fetchShowEpisodes: (id) => {
    //   dispatch(fetchShowEpisodes(id))
    // },
    // sortEpisodes: (episodes) => {
    //   dispatch(sortEpisodes(episodes))
    // }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(NetworkContainer)