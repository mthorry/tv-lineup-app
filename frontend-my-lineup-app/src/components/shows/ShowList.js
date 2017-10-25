import React from 'react'
import { connect } from 'react-redux'
import ShowItem from './ShowItem'
import { Card, Divider, Loader, Transition } from 'semantic-ui-react'

// Need SORT and FILTER functions!

class ShowList extends React.Component {

  render() {
    const shows = this.props.myShows.map( show => {
      return <ShowItem show={show} key={show.id}/>})
    return(
      <div>
      <br/>
      <Divider horizontal><h1>My Shows</h1></Divider>
        <Transition.Group as={Card.Group} children={shows} >
        { this.props.isFetching ? <Loader active inline='centered' size='large' content='Working'/> : shows }
        </Transition.Group>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.show.isFetching,
    myShows: state.show.myShows
  }
}

export default connect(mapStateToProps, /*mapDispatchToProps*/)(ShowList)