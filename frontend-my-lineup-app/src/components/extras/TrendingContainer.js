import React from 'react'
import { connect } from 'react-redux'
import TrendingItem from './TrendingItem'
import { fetchTrendingShows } from '../../actions/extras'
import { Divider, Item, Loader } from 'semantic-ui-react'

class TrendingContainer extends React.Component {

  componentDidMount() {
    this.props.trending.length < 1 ? this.props.fetchTrendingShows() : null
  }


  render(){
    let shows = <Loader active inline='centered' size='large'/>

    if (this.props.trending.length > 0) { shows = this.props.trending.map(show => <TrendingItem key={show.show.ids.tvdb} show={show}/> )}

    return(
      <div>
      <br/>
        <Divider horizontal><h1>Trending</h1></Divider>
        <Item.Group divided relaxed>
          { this.props.fetching ? <Loader active inline='centered' size='large'/> : shows }
        </Item.Group>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    trending: state.extras.trending,
    fetching: state.extras.isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTrendingShows: () => {
      dispatch(fetchTrendingShows())
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(TrendingContainer)