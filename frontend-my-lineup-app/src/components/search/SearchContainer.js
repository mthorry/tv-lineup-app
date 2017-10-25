import React from 'react'
import { connect } from 'react-redux'
import { searchShows, clearResults } from '../../actions/search'
import SearchResults from './SearchResults'
import { Button, Form, Input, Divider } from 'semantic-ui-react'

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
      <br/>
        <Divider horizontal><h1>Show Search</h1></Divider>
        <Form onSubmit={this.handleSubmit}>
          { this.props.fetching ? <Input loading icon='search' placeholder="Searching.." onChange={this.handleInput} value={this.state.input}/> : <Input icon='search' placeholder="Search for a show" onChange={this.handleInput} value={this.state.input}/> }
            {" "}
            <Button basic color='blue' type="submit">Search</Button>
        </Form>
          { this.props.results ? <SearchResults history={this.props.history}/> : null }
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
    fetching: state.search.isFetching
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)