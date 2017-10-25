import { connect } from 'react-redux'
import { addShow } from '../../actions/shows'
import { clearResults } from '../../actions/search'
import { formatTitle, formatSummary, formatTime } from '../../services/formatting'
import React from 'react'
import { Card, Button, Image, Transition } from 'semantic-ui-react'

class SearchItem extends React.Component {

  handleClick = (e) => {
    e.preventDefault()
    this.props.addShow(this.props.show.show)
    this.props.clearResults()
    this.props.history.push('/shows')
  }

  render(){
    const s = this.props.show.show

    let summary = ""
      if (s) {summary = formatSummary(s.summary)}

    let show_time = ""
      if (s) { show_time = formatTime(s.schedule.time) }

    let network = ""
    if (s) { s.network ? network = s.network.name : network = s.webChannel.name } else { null }

    return(
      <Transition animation='vertical flip' duration={800} transitionOnMount={true}>
      <Card key={s.id} centered={true}>
        <Card.Content>
        <h2>{s.name}</h2>
        { s.image ? <Image src={s.image.original} alt={s.name}/> : null }
        { s.status === "Running" ? <h3>Airs {s.schedule.days[0]}s {show_time} on {network}</h3> : <h3><strong>{s.status}</strong></h3>}
        <h5>Summary: {summary}</h5>
        <p>Genres: {s.genres.join(", ")}</p>
        </Card.Content>
        <Card.Content extra>
          <Button basic color='teal' onClick={this.handleClick} icon='tv' content='Add to my Shows' attached='bottom'/>
        </Card.Content>
      </Card>
      </Transition>
    )}
}

function mapDispatchToProps(dispatch) {
  return {
    addShow: (show) => {
      dispatch(addShow(show))
    },
    clearResults: () => {
      dispatch(clearResults())
    }
  }
}

function mapStateToProps(state) {
  return {
    results: state.search.results
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchItem)