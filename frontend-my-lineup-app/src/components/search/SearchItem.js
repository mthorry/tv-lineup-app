import { connect } from 'react-redux'
import { addShow } from '../../actions/shows'
import { clearResults } from '../../actions/search'
import React from 'react'
import { Card, Button, Image } from 'semantic-ui-react'

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
    if (s.summary) { summary = s.summary.replace("<p>", "").replace("</p>", "").replace("<b>", "").replace("</b>", "")}
    let network = ""
    if (s.network) { network = s.network.name } else { network = s.webChannel.name }

    return(
      <Card key={s.id}>
        <Card.Content>
        <h2>{s.name}</h2>
        { s.image ? <Image src={s.image.original} alt={s.name}/> : null }
        { s.status === "Running" ? <h3>Airs {s.schedule.days[0]}s at {s.schedule.time} on {network}</h3> : <h3><strong>{s.status}</strong></h3>}
        <h5>Summary: {summary}</h5>
        <p>Genres: {s.genres.join(", ")}</p>
        </Card.Content>
        <Card.Content extra>
          <Button basic color='teal' onClick={this.handleClick}>Add to My Shows</Button>
        </Card.Content>
      </Card>
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