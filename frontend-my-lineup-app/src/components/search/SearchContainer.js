import React from 'react'
import { connect } from 'react-redux'
import { searchShows, clearResults } from '../../actions/search'
import SearchResults from './SearchResults'

class SearchContainer extends React.Component {

  componentDidMount() {
    this.props.clearResults()
  }

  state = {
    input: ""
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.searchShows(this.state.input)
    this.setState({
      input: ""
    })
  }

  handleInput = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  render() {
    return(
      <div>
        <p>The SearchContainer</p>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Search for a show" onChange={this.handleInput} value={this.state.input}/>
          <input type="submit" value="Search"/>
          { this.props.results ? <SearchResults history={this.props.history}/> : null }
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchShows: (search) => {
      dispatch(searchShows(search))
    },
    clearResults: () => {
      dispatch(clearResults())
    }
  }
}

function mapStateToProps(state) {
  return {
    results: state.search.results,
    myShows: state.show.myShows
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)