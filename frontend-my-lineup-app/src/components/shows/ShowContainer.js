import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchShows, fetchMyEpisodes } from '../../actions/shows'
import ShowList from './ShowList'
import ShowPage from './ShowPage'
import ShowCalendar from './ShowCalendar'
import EpisodeContainer from './EpisodeContainer'

class ShowContainer extends React.Component {

  componentDidMount() {
    this.props.fetchShows(1)
    this.props.fetchMyEpisodes(1)
  }

  render() {
    return(
      <div>
      { this.props.isFetching ? "Getting shows..." : null }
        <Route exact path='/shows' component={ShowList} />
        <Route exact path='/shows/:id/:name' component={ShowPage} />
        <Route exact path='/shows/:id/:name' component={EpisodeContainer} />
        <Route exact path='/shows/calendar' component={ShowCalendar} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchShows: (id) => {
      dispatch(fetchShows(id))
    },
    fetchMyEpisodes: (id) => {
      dispatch(fetchMyEpisodes(id))
    }
  }
}

function mapStateToProps(state) {
  return {
    myShows: state.show.myShows,
    myEpisodes: state.show.myEpisodes,
    isFetching: state.show.isFetching
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowContainer)