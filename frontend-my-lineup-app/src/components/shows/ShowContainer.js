import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Loader } from 'semantic-ui-react'
import { fetchShows, fetchOnTonight, fetchPremieres } from '../../actions/shows'
import { fetchMyLineup } from '../../actions/episodes'
import { fetchUserShows } from '../../actions/extras'
import ShowList from './ShowList'
import ShowPage from './ShowPage'
import EpisodeContainer from '../episodes/EpisodeContainer'

class ShowContainer extends React.Component {

  componentDidMount() {
    const userId = localStorage.getItem("id")
    this.props.myShows.length > 0 ? null : this.props.fetchShows(userId)
    this.props.myLineup.length > 0 ? null : this.props.fetchMyLineup(userId)
    this.props.ratings.length > 0 ? null : this.props.fetchUserShows()
    this.props.onTonight.length > 0 ? null : this.props.fetchOnTonight()
    this.props.premieres.length > 0 ? null : this.props.fetchPremieres()
  }

  render() {
    return(
      <div>
        <Route exact path='/shows' component={ShowList} />
        <br/>
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
    },
    fetchOnTonight: () => {
      dispatch(fetchOnTonight())
    },
    fetchPremieres: () => {
      dispatch(fetchPremieres())
    },
    fetchUserShows: () => {
      dispatch(fetchUserShows())
    }
  }
}

function mapStateToProps(state) {
  return {
    myShows: state.show.myShows,
    myLineup: state.episode.myLineup,
    premieres: state.show.premieres,
    onTonight: state.show.onTonight,
    ratings: state.extras.ratings
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowContainer)