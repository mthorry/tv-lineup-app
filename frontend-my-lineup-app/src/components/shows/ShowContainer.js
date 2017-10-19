import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchShows, fetchMyLineup } from '../../actions/shows'
import ShowList from './ShowList'
import ShowPage from './ShowPage'
import EpisodeContainer from './EpisodeContainer'

class ShowContainer extends React.Component {

  componentDidMount() {
    this.props.fetchShows(1)
    this.props.fetchMyLineup(1)
  }

  render() {
    return(
      <div>
        <Route exact path='/shows' component={ShowList} />
      { this.props.isFetching ? "Getting shows..." : null }
        <Route exact path='/shows/:id/:name' component={ShowPage} />
        <Route exact path='/shows/:id/:name' component={EpisodeContainer} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchShows: (id) => {
      dispatch(fetchShows(id))
    },
    fetchMyLineup: (id) => {
      dispatch(fetchMyLineup(id))
    }
  }
}

function mapStateToProps(state) {
  return {
    myShows: state.show.myShows,
    myLineup: state.show.myLineup,
    isFetching: state.show.isFetching
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowContainer)