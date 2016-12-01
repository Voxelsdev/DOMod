import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      snippets: [],
    }
  }

  componentDidMount() {
    axios.get('/users/snippets')
      .then((response) => {
        const loadedSnippets = response.data;
        console.log(loadedSnippets);
        this.setState({ snippets: loadedSnippets });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

export default Profile;
