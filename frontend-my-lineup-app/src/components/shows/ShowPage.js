import React from 'react'
import { connect } from 'react-redux'
import { removeShow } from '../../actions/shows'
import { fetchMyLineup } from '../../actions/episodes'
import { rateShow, fetchUserShows } from '../../actions/extras'
import { Grid, Button, Icon, Image, Loader, Statistic, Rating, Transition } from 'semantic-ui-react'
import { formatSummary, formatTime } from '../../services/formatting'
import moment from 'moment'

class ShowPage extends React.Component {

  componentDidMount(){
    this.props.ratings.length > 0 ? null : this.props.fetchUserShows()
    this.props.myLineup.length > 0 ? null : this.props.fetchMyLineup()
  }

  handleClick = (e) => {
    e.preventDefault()
    this.props.removeShow({show_id: this.props.match.params.id})
    this.props.history.push('/shows')
  }

  handleRate = (e, r) => {
    e.preventDefault()
    let info = JSON.stringify({rating: r.rating, show_id: this.props.match.params.id})
    this.props.rateShow(info)
  }

  render() {
    const id = this.props.match.params.id
    const show = (this.props.myShows.filter( show => {return show.id == id}))[0]
    const user_show = this.props.ratings.filter( show => {return show.show_id == id})

    let show_time = ""
      if (show) { show_time = formatTime(show.air_time) }

    let summary = ""
      if (show) { summary = formatSummary(show.summary) }

    if (show === undefined) {return(<Loader active inline='centered' size='large'/>)} else {return(<Transition animation='fade' duration={800} transitionOnMount={true}><Grid celled id={show.id} verticalAlign='middle'>
          <Grid.Column width={5}>
            <Image src={show.img} alt={show.title}/>
          </Grid.Column>
          <Grid.Column width={11}>

            <Grid.Row>
              <h1>{show.title}</h1>
                <br/>
            </Grid.Row>

            <Grid.Row stretched>

              My Rating: { user_show !== undefined && user_show.length > 0 ? <Rating maxRating={5} onRate={this.handleRate} rating={user_show[0].rating} icon='star' size='massive'/> : <Rating maxRating={5} onRate={this.handleRate} rating={null} icon='star' size='massive'/> }

                <Statistic size='tiny' color='olive'>
                  <Statistic.Value>{show.rating}</Statistic.Value>
                  <Statistic.Label>Rating</Statistic.Label>
                </Statistic>
                {' '}
                <Statistic size='tiny' color='teal'>
                  <Statistic.Value>{show.genre}</Statistic.Value>
                  <Statistic.Label>Genre</Statistic.Label>
                </Statistic>
              </Grid.Row>

              <Grid.Row>
                <br/>
                { show.status === "Running" ? <h4>Airs {show.air_day}s at {show_time} on {show.network}</h4> : <h4><strong>{show.status}</strong></h4> }
                <p>Summary: {summary} </p>
                <br/>
                { show.url ? <Button basic color='teal' as='a' href={show.url} target='_blank' icon='external' content='Official Website'/> : null }
                <Button basic color='yellow' icon='remove' content='Remove' onClick={this.handleClick}/>
              </Grid.Row>

          </Grid.Column>
        </Grid></Transition>)}

  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeShow: (id) => {
      dispatch(removeShow(id))
    },
    rateShow: (info) => {
      dispatch(rateShow(info))
    },
    fetchUserShows: () => {
      dispatch(fetchUserShows())
    },
    fetchMyLineup: () => {
      dispatch(fetchMyLineup())
    }
  }
}

function mapStateToProps(state) {
  return {
    myShows: state.show.myShows,
    ratings: state.extras.ratings,
    myLineup: state.episode.myLineup,
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