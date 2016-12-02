import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import classnames from 'classnames';
import styles from './css/profile';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      snippets: [],
    }
  }

  componentDidMount() {
    if (this.props.loggedIn === false) {
      window.location.href = "/";
    } else {
      axios.get('/users/snippets')
      .then((response) => {
        const loadedSnippets = response.data;
        this.setState({ snippets: loadedSnippets });
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.snippets.length < 1 &&
          <div>
            <div className={classnames('row', styles.topRow)}>
              <div className={classnames('six', 'columns', 'offset-by-three')}>
                <h3>Looks like you have no Snippets 😦</h3>
              </div>
            </div>
            <div className={classnames('row', styles.midRow)}>
              <div className={classnames('six', 'columns', 'offset-by-three')}>
                <h3>. . .</h3>
              </div>
            </div>
            <div className={classnames('row', styles.bottomRow)}>
              <div className={classnames('six', 'columns', 'offset-by-three')}>
                <div className="row">
                  <h4>Make one?</h4>
                </div>
                <div className="row" id={styles.toHomeContainer}>
                  <Link to="/"
                        className={styles.toHome}>Go to the editor!</Link>
                </div>
              </div>
            </div>
          </div>
        }

        {this.state.snippets.length > 0 &&
          <div></div>
        }
      </div>
    )
  }
}

export default Profile;
