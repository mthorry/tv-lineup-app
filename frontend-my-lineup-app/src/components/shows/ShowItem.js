import React from 'react'
import { connect } from 'react-redux'
import { removeShow } from '../../actions/shows'
import { rateShow } from '../../actions/extras'
import { formatTitle, formatSummary, formatTime } from '../../services/formatting'
import { Link } from 'react-router-dom'
import { Button, Card, Rating } from 'semantic-ui-react'

class ShowItem extends React.Component {

  handleClick = (e) => {
    e.preventDefault()
    this.props.removeShow({show_id: this.props.show.id})
  }

  handleRate = (e, r) => {
    e.preventDefault()
    let info = JSON.stringify({rating: r.rating, show_id: this.props.show.id})
    this.props.rateShow(info)
  }

  render() {
    const s = this.props.show
    const user_show = this.props.ratings.filter( show => {return show.show_id == this.props.show.id})
    let rating = ""
      if (user_show.length > 0) { rating = <h4>My Rating: <Rating maxRating={5} onRate={this.handleRate} rating={user_show[0].rating} icon='star'/></h4> }

    let title = ""
      if (s) { title = formatTitle(s.title) }

    let summary = ""
      if (s) {summary = formatSummary(s.summary)}

    let show_time = ""
      if (s) { show_time = formatTime(s.air_time) }

    return(
      <Card centered={true}>
        <Card.Content id={s.id}>
          <Card.Header as='h3'>{s.title}</Card.Header>
          <img src={s.img} alt={s.title} width="250"/>
          { s.status === "Running" ? <h3>Airs {s.air_day}s {show_time} on {s.network}</h3> : <h3>{s.status}</h3> }

            {rating}

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
    },
    rateShow: (info) => {
      dispatch(rateShow(info))
    }
  }
}


function mapStateToProps(state) {
  return {
    ratings: state.extras.ratings
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowItem)
