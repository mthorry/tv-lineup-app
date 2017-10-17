import React from 'react'
import { connect } from 'react-redux'
import ShowItem from './ShowItem'


// Need SORT and FILTER functions!

class ShowList extends React.Component {

  render() {
    const shows = this.props.myShows.map( show => {
      return <ShowItem show={show} key={show.id}/> })
    return(
      <div>
        {shows}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    results: state.search.results,
    isFetching: state.show.isFetching,
    myShows: state.show.myShows
  }
}

export default connect(mapStateToProps, /*mapDispatchToProps*/)(ShowList)