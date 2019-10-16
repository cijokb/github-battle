import React, { Component,Fragment } from "react";
import { battle } from "../utils/api";
import PropTypes from "prop-types";
import Card from "./Card";
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaCode,
  FaUser
} from "react-icons/fa";

function ProfileList({ profile }) {
  return (
    <ul className="card-list">
      <li>
        <FaUser color="rgb(239, 115, 115)" size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <FaCompass color="rgb(144, 115, 255)" size={22} />
          {profile.location}
        </li>
      )}
      {profile.company && (
        <li>
          <FaBriefcase color="#795548" size={22} />
          {profile.company}
        </li>
      )}
      <li>
        <FaUsers color="rgb(129, 195, 245)" size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color="rgb(64, 183, 95)" size={22} />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  );
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired
};

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    const { playerOne, playerTwo } = this.props;
    battle([playerOne, playerTwo])
      .then(res =>
        this.setState({
          winner: res[0],
          loser: res[1],
          loading: false,
          error: null
        })
      )
      .catch(({ message }) =>
        this.setState({ loading: false, error: message })
      );
  }
  render() {
    const { winner, loser, loading, error } = this.state;
    if (loading) {
      return <p>loading.....</p>;
    }
    if (error) {
      return <p className="center-text error">{error}</p>;
    }
    return (
      <Fragment>
      <div className="grid space-around container-sm">
        <Card
          header={winner.score === loser.score ? "Tie" : "Winner"}
          subheader={`Score: ${winner.score.toLocaleString()}`}
          avatar={winner.profile.avatar_url}
          href={winner.profile.html_url}
          name={winner.profile.login}
        >
          <ProfileList profile={winner.profile} />
        </Card>
        <Card
          header={winner.score === loser.score ? "Tie" : "Loser"}
          subheader={`Score: ${loser.score.toLocaleString()}`}
          avatar={loser.profile.avatar_url}
          href={loser.profile.html_url}
          name={loser.profile.login}
        >
          <ProfileList profile={loser.profile} />
        </Card>
      </div>
      <button
       className="btn dark-btn btn-space"
       onClick={this.props.onReset}
      >
        Reset
      </button>
      </Fragment>
    );
  }
}

Results.propTypes = {
  playerTwo: PropTypes.string.isRequired,
  playerTwo: PropTypes.string.isRequired,
  onReset:PropTypes.func.isRequired
}