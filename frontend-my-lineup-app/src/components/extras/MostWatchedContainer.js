import React from 'react'
import { connect } from 'react-redux'
import { fetchWatchingShows } from '../../actions/extras'
import MostWatchedItem from './MostWatchedItem'
import { Divider, Item, Loader, Form, Checkbox, Icon } from 'semantic-ui-react'

class MostWatchedContainer extends React.Component {

  state = {
    period: 'weekly'
  }

  componentDidMount() {
    let period = JSON.stringify({period: 'weekly'})
    this.props.watching.length < 1 ? this.props.fetchWatchingShows(period) : null
  }

  handleChange = (e, time) => {
    e.preventDefault()
    this.setState({
      period: time.value
    })

    let period = JSON.stringify({period: time.value})
    this.props.fetchWatchingShows(period)
  }

  render(){
    let shows = ''
    if (this.props.fetching) {shows = <Loader active inline='centered' size='large'/> }
    if (this.props.watching.length > 0) { shows = this.props.watching.map(show => <MostWatchedItem key={show.show.ids.tvdb} show={show}/> )}

    return(
      <div>
      <br/>
        <Divider horizontal><h1>Most Watched Shows</h1></Divider>
      <Form>
          <b>Most Watched Shows </b>(from trakt.tv users):
        <Form.Group inline widths='equal'>
          {' '}
          <Form.Radio toggle
            label='This Week'
            name='checkboxRadioGroup'
            value='weekly'
            checked={this.state.period === 'weekly'}
            onChange={this.handleChange}
          />
          {' '}
          <Form.Radio toggle
            label='This Month'
            name='checkboxRadioGroup'
            value='monthly'
            checked={this.state.period === 'monthly'}
            onChange={this.handleChange}
          />
          {' '}
          <Form.Radio toggle
            label='This Year'
            name='checkboxRadioGroup'
            value='yearly'
            checked={this.state.period === 'yearly'}
            onChange={this.handleChange}
          />
          {' '}
          <Form.Radio toggle
            label='Ever'
            name='checkboxRadioGroup'
            value='all'
            checked={this.state.period === 'all'}
            onChange={this.handleChange}
          />
        </Form.Group>
      </Form>
      <Divider/>
        <Item.Group divided relaxed>
          { this.props.fetching ? <Loader active inline='centered' size='large'/> : shows }
        </Item.Group>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    watching: state.extras.watching,
    fetching: state.extras.isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchWatchingShows: (period) => {
      dispatch(fetchWatchingShows(period))
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(MostWatchedContainer)