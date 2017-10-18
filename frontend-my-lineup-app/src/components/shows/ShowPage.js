import React from 'react'
import { connect } from 'react-redux'
import { removeShow } from '../../actions/shows'
import { Grid, Image, Button } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'

class ShowPage extends React.Component {

  handleClick = (e) => {
    e.preventDefault()
    this.props.removeShow(this.props.match.params.id)
    this.props.history.push('/shows')
  }

  render() {
    const id = this.props.match.params.id
    const show = (this.props.myShows.filter( show => {return show.id == id}))[0]
    let summary = ""
    // if (show.summary) {summary = show.summary.replace("<p>", "").replace("</p>", "").replace("<b>", "").replace("</b>", "")}

    if (show === undefined) {return(<p>loading show info...</p>)} else {return(<Grid celled id={show.id}>
          <Grid.Row>
          <Grid.Column width={5}>
            <img src={show.img} alt={show.title}/>
          </Grid.Column>
          <Grid.Column width={11}>
            <h1>{show.title}</h1>
            { show.status === "Running" ? <h4>Airs {show.air_day}s at {show.air_time} on {show.network}</h4> : <h4><strong>{show.status}</strong></h4> }
            <p>Summary: {show.summary}</p>
            <p>Genre: {show.genre}</p>
            <p>Rating: {show.rating}</p>
            { show.url ? <Button basic color='teal' as='a' href={show.url} target='_blank'> Official Website</Button> : null }
            <Button basic color='yellow' onClick={this.handleClick}>Remove</Button>
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