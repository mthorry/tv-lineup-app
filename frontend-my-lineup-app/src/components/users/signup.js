import React from 'react'
import { signupUser } from './loginUser'
import { Redirect, Link } from 'react-router-dom'

class Signup extends React.Component {

  state = {
    username: "",
    password: "",
    genres: ""
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const signupParams = {
      username: this.state.username,
      password: this.state.password,
      genres: this.state.genres
    }

    signupUser(signupParams).then((user) => {
      localStorage.setItem("jwtToken", user.jwt)
      localStorage.setItem("id", user.user_id)
    })

    setTimeout(() => {this.props.history.push('/shows')}, 1000)
  }

  handleUsername = (event) => {
    this.setState({username: event.target.value})

  }

  handlePassword = (event) => {
    this.setState({password: event.target.value})
  }

  render() {
    if (localStorage.getItem('jwtToken')) {
      return <Redirect to="/shows"/>
    } else {
      return (
        <div className="ui middle aligned center aligned grid">
          <div className="column">
            <p></p>
            <h2 id="login-header" className="ui teal image header">
              <div className="content">SIGN UP FOR AN ACCOUNT</div>
            </h2>
            <form className="ui large form">
              <div className="ui stacked segment">

                <div className="field">
                  <div className="ui left icon input">

                    <input type="text" name="username" placeholder="Username" onChange={this.handleUsername} value={this.state.username}/>
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <input type="password" name="password" placeholder="Password" onChange={this.handlePassword} value={this.state.password}/>
                  </div>
                </div>
                <h4>Already Have an Account?
                  <Link to="/login" > Login Here</Link>
                </h4>
                <div className="ui fluid large teal basic submit button" onClick={this.handleSubmit}>Signup</div>
              </div>

            </form>
          </div>

        </div>

      )
    }
  }
}

export default Signup
