import React, { Component, Fragment } from "react";
import {
  FaUserFriends,
  FaTrophy,
  FaFighterJet,
  FaTimesCircle
} from "react-icons/fa";
import Results from "./Results";

const Instructions = () => {
  return (
    <div className="instructions-container">
      <h1 className="center-text header-lg">Instructions</h1>
      <ol className="coantiner-sm grid center-text battle-instrucitons">
        <li>
          <h3 className="header-sm">Enter two Github users</h3>
          <FaUserFriends
            size={140}
            className="bg=light"
            color="rgb(255,191,116)"
          />
        </li>
        <li>
          <h3 className="header-sm">Battle</h3>
          <FaTrophy size={140} className="bg=light" color="#727272" />
        </li>
        <li>
          <h3 className="header-sm">See the winners</h3>
          <FaFighterJet
            size={140}
            className="bg=light"
            color="rgb(255,215,0)"
          />
        </li>
      </ol>
    </div>
  );
};

const PlayerPreview = ({ label, username, onReset }) => (
  <div className="column player">
    <h3>{label}</h3>
    <div className="row bg-light">
      <div className="player-info">
        <img
          className="avatar-small"
          src={`https://github.com/${username}.png?size=200`}
          alt={`Avatar for ${username}`}
        />
        <a href={`https://github.com/${username}`} className="link ">
          {username}
        </a>
      </div>
      <button className="btn-clear flex-center" onClick={onReset}>
        <FaTimesCircle color="rgb(194,57,42)" size={26} />
      </button>
    </div>
  </div>
);

class PlayerInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.username);
  }
  handleChange(e) {
    this.setState({ username: e.target.value });
  }
  render() {
    return (
      <form className="column player" onSubmit={this.handleSubmit}>
        <label htmlFor="username" className="player-label">
          {this.props.label}
        </label>
        <div className="row player-inputs">
          <input
            type="text"
            id="username"
            className="input-light"
            placeholder="github username"
            autoComplete="off"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <button
            className="btn dark-btn"
            type="submit"
            disabled={!this.state.username}
          >
            submit
          </button>
        </div>
      </form>
    );
  }
}

export default class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOne: null,
      playerTwo: null,
      battle: false
    };
    this.handleChange = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleSubmit(id, player) {
    this.setState({
      [id]: player
    });
  }
  handleReset(id) {
    this.setState({
      [id]: null
    });
  }
  render() {
    const { playerOne, playerTwo, battle} = this.state;
    if(battle) {
      return (<Results playerOne={playerOne} playerTwo={playerTwo}/>)
    }
    return (
      <Fragment>
        <Instructions />
        <div className="players-container">
          <h1 className="center-text header-lg">Players</h1>
          <div className="row space-around">
            {playerOne === null ? (
              <PlayerInput
                onSubmit={player => this.handleSubmit("playerOne", player)}
                label="Player One"
              />
            ) : (
              <PlayerPreview
                label="Player One"
                username={playerOne}
                onReset={() => this.handleReset("playerOne")}
              />
            )}
            {playerTwo === null ? (
              <PlayerInput
                onSubmit={player => this.handleSubmit("playerTwo", player)}
                label="Player Two"
              />
            ) : (
              <PlayerPreview
                label="Player Two"
                username={playerTwo}
                onReset={() => this.handleReset("playerTwo")}
              />
            )}
          </div>
          {playerOne && playerTwo && (
            <button
              className="btn dark-btn btn-space"
              onClick={() => this.setState({ battle: true })}
            >
              Battle
            </button>
          )}
        </div>
      </Fragment>
    );
  }
}
