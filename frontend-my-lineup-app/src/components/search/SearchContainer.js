import React from 'react'
import { connect } from 'react-redux'
import { searchShows, clearResults } from '../../actions/search'
import SearchResults from './SearchResults'
import { Button, Form, Input } from 'semantic-ui-react'

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
        <h1>Show Search</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Input type="text" icon='search' placeholder="Search for a show" onChange={this.handleInput} value={this.state.input}/>
          </Form.Field>
          <Form.Field>
            <Button basic color='blue' type="submit">Search</Button>
          </Form.Field>
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
    myShows: state.show.myShows
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)