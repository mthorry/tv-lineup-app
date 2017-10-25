import React from 'react'
import { connect } from 'react-redux'
import DashboardLineupList from './DashboardLineupList'
import DashboardOnTonightList from './DashboardOnTonightList'
import { fetchOnTonight } from '../../actions/shows'
import { fetchMyLineup } from '../../actions/episodes'
import { Divider, Loader } from 'semantic-ui-react'

class DashboardContainer extends React.Component {

  componentDidMount() {
    const userId = localStorage.getItem("id")
    this.props.myLineup.length > 0 ? null : this.props.fetchMyLineup(userId)
    this.props.onTonight.length > 0 ? null : this.props.fetchOnTonight()
  }


  render(){
    return(
      <div>
        <br/>
        <Divider horizontal ><h1>My Lineup for Tonight</h1></Divider>
          {this.props.isFetching ? <Loader active inline='centered' size='large' content='Working'/> : <DashboardLineupList /> }
        <br/>
        <Divider horizontal ><h2>Other Shows To Watch Tonight</h2></Divider>
          {this.props.isFetching ? <Loader active inline='centered' size='large' content='Working'/> : <DashboardOnTonightList /> }
        <br/>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    myLineup: state.episode.myLineup,
    isFetching: state.episode.isFetching,
    onTonight: state.show.onTonight
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchMyLineup: (id) => {
      dispatch(fetchMyLineup(id))
    },
    fetchOnTonight: () => {
      dispatch(fetchOnTonight())
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)