import React from 'react'
import { connect } from 'react-redux'
import { removeShow } from '../../actions/shows'
import { Grid, Button, Icon, Image, Loader } from 'semantic-ui-react'
import { formatSummary, formatTime } from '../../services/formatting'
import moment from 'moment'

class ShowPage extends React.Component {

  handleClick = (e) => {
    e.preventDefault()
    this.props.removeShow(this.props.match.params.id)
    this.props.history.push('/shows')
  }

  render() {
    const id = this.props.match.params.id
    const show = (this.props.myShows.filter( show => {return show.id == id}))[0]

    let show_time = ""
      if (show) { show_time = formatTime(show.air_time) }

    let summary = ""
      if (show) { summary = formatSummary(show.summary) }

    if (show === undefined) {return(<Loader active inline='centered' size='large'/>)} else {return(<Grid celled id={show.id}>
          <Grid.Row>
          <Grid.Column width={5}>
            <Image src={show.img} alt={show.title}/>
          </Grid.Column>
          <Grid.Column width={11}>
            <h1>{show.title}</h1>
            { show.status === "Running" ? <h4>Airs {show.air_day}s at {show_time} on {show.network}</h4> : <h4><strong>{show.status}</strong></h4> }
            <p>Summary: {summary} </p>
            <p>Genre: {show.genre}</p>
            <p>Rating: {show.rating}</p>
            { show.url ? <Button basic color='teal' as='a' href={show.url} target='_blank' icon='external' content='Official Website'/> : null }
            <Button basic color='yellow' icon='remove' content='Remove' onClick={this.handleClick}/>
          </Grid.Column>
          </Grid.Row>
        </Grid>)}

  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeShow: (id) => {
      dispatch(removeShow(id))
    }
  }
}

function mapStateToProps(state) {
  return {
    myShows: state.show.myShows
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage)

// import React from 'react'
// import { Link } from 'react-router-dom'

// class ShowPage extends React.Component {
//   render(){
//     const name = this.props.match.params.name
//     return(
//       <div>
//       <p>ShowPage {name}</p>
//       </div>
//     )
//   }
// }

// export default ShowPage

// "How To Get Away With Murder".toLowerCase().split(" ").join("-")
// https://api.trakt.tv/shows/how-to-get-away-with-murder?extended=full