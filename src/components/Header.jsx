import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import classnames from 'classnames';
import Styles from './css/header';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      avatarUrl: '',
    }

    this.handleLogout = this.handleLogout.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    axios.get('/users/user')
      .then((user) => {
        this.setState({ avatarUrl: user.data.avatarUrl });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSave() {
    if (!this.props.snippetId) {
      axios({
        method: 'post',
        url: '/specific/snippet',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          html: this.props.html,
          javascript: this.props.js,
        }
      })
      .then((response) => {
        this.props.handleSnippetState(response.data[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      axios.patch('/specific/snippets/:' + this.props.snippetId, {
        html: this.props.html,
        js: this.props.js,
      })
      .then((snippet) => {
        this.props.handleSnippetState(snippet.id);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  handleLogout() {
    this.setState({ avatarUrl: '' });
    this.props.handleLoginState(true, false);
  }

  render() {
    return (
      <header>
        <div className={classnames('one', 'columns')}>
          <img src={this.state.avatarUrl} id={Styles.avatar}/>
        </div>
        <div className={classnames('four', 'columns', 'offset-by-three')}
              id={Styles.titleContainer}>
          <Link to="/" id={Styles.title}>&lt; DOMOD /&gt;</Link>
        </div>
        {!this.props.loggedIn &&
          <div className="row">
            <div className={classnames('one', 'columns', 'offset-by-three')}
                  id={Styles.profileContainer}>
              <Link to="/login" className={Styles.navbtn}>Login</Link>
            </div>
          </div>
        }

        {this.props.loggedIn &&
          <div className="row" id={Styles.navbtnContainer}>
            <div className={classnames('one', 'columns')}
                  id={Styles.profileContainer}>
              <Link to="/profile"
                    className={Styles.navbtn}>Profile</Link>
            </div>
            <div className={classnames('one', 'columns')}
                  id={Styles.logoutContainer}>
              <Link to="/"
                    className={Styles.navbtn}
                    onClick={this.handleLogout}>Logout</Link>
            </div>
            {(this.props.loggedIn && window.location.href === ('http://localhost:3000/')) &&
              <div className={classnames('two', 'columns')}>
                <button id={Styles.savebtn}
                        onClick={this.handleSave}>Save Snippet</button>
              </div>
            }
          </div>
        }

      </header>
    )
  }
}

export default Header;
