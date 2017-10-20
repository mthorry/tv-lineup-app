import React from 'react'
import { connect } from 'react-redux'
import ShowItem from './ShowItem'
import { Card, Divider } from 'semantic-ui-react'

// Need SORT and FILTER functions!

class ShowList extends React.Component {

  render() {
    const shows = this.props.myShows.map( show => {
      return <ShowItem show={show} key={show.id}/>})
    return(
      <div>
      <Divider horizontal><h1>My Shows</h1></Divider>
        <Card.Group>
          {shows}
        </Card.Group>
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