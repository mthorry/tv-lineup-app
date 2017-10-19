import React from 'react'
import { connect } from 'react-redux'
import SearchItem from './SearchItem'
import { Card } from 'semantic-ui-react'

class SearchResults extends React.Component {

  render() {
    const searchItems = this.props.results.map( show => {
      return <SearchItem key={show.show.id} show={show} history={this.props.history}/>
    })
    return(
      <div>
      { this.props.isFetching ? "Searching..." : null }
        { this.props.results.length === 0 ? null : <div>
          <p></p>
          <h2>Search Results</h2>
            <Card.Group>
              {searchItems}
            </Card.Group>
          </div>
        }
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

export default connect(mapStateToProps)(SearchResults)