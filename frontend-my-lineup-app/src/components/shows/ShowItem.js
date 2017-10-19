import React from 'react'
import { connect } from 'react-redux'
import { removeShow } from '../../actions/shows'
import { Link } from 'react-router-dom'
import { Button, Card } from 'semantic-ui-react'

class ShowItem extends React.Component {

  handleClick = (e) => {
    e.preventDefault()
    this.props.removeShow(this.props.show.id)
  }

  render() {
    const s = this.props.show
    const title = s.title.toLowerCase().replace(/[&#,+()$~%.'":*?<>{}]/g, '').split(" ").join("-").replace("--", "-")
    let summary = ""
    if (s.summary) {summary = s.summary.replace("<p>", "").replace("</p>", "").replace("<b>", "").replace("</b>", "").substring(0,500)}
    return(
      <Card>
        <Card.Content id={s.id}>
          <Card.Header as='h3'>{s.title}</Card.Header>
          <img src={s.img} alt={s.title} width="250"/>
          { s.status === "Running" ? <h4>Airs {s.air_day}s at {s.air_time} on {s.network}</h4> : <h4>{s.status}</h4> }
          <p>Summary: {summary}</p>
          <Card.Description>Genre: {s.genre}</Card.Description>
          <Card.Description>Rating: {s.rating}</Card.Description>
        </Card.Content>
        <Card.Content extra>
        <div className='ui three buttons'>
          <Button basic color='grey'><Link to={`/shows/${s.id}/${title}`}>Info</Link></Button>
          <Button basic color='teal' as='a' href={s.url} target='_blank'>Website</Button>
          <Button basic color='yellow' onClick={this.handleClick}>Remove</Button>
          </div>
        </Card.Content>
      </Card>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeShow: (id) => {
      dispatch(removeShow(id))
    }
  }
}

export default connect(null, mapDispatchToProps)(ShowItem)
