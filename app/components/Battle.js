import React, { Component, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../contexts/theme";

import {
  FaUserFriends,
  FaTrophy,
  FaFighterJet,
  FaTimesCircle
} from "react-icons/fa";
import Results from "./Results";

const Instructions = () => {
  const theme = React.useContext(ThemeContext);
  return (
    <div className="instructions-container">
      <h1 className="center-text header-lg">Instructions</h1>
      <ol className="container-sm grid center-text battle-instructions">
        <li>
          <h3 className="header-sm">Enter two Github users</h3>
          <FaUserFriends
            size={140}
            className={`bg-${theme}`}
            color="rgb(255,191,116)"
          />
        </li>
        <li>
          <h3 className="header-sm">Battle</h3>
          <FaTrophy size={140} className={`bg-${theme}`} color="#727272" />
        </li>
        <li>
          <h3 className="header-sm">See the winners</h3>
          <FaFighterJet
            size={140}
            className={`bg-${theme}`}
            color="rgb(255,215,0)"
          />
        </li>
      </ol>
    </div>
  );
};

const PlayerPreview = ({ label, username, onReset }) => {
  const theme = React.useContext(ThemeContext);
  return (
    < div className="column player" >
      <h3>{label}</h3>
      <div className={`row bg-${theme}`}>
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
    </div >
  )
};

const PlayerInput = ({ onSubmit, label }) => {
  const theme = React.useContext(ThemeContext);
  const [username, setUsername] = React.useState("");
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(username);
  };
  const handleChange = e => {
    setUsername(e.target.value);
  };
  return (
    <form className="column player" onSubmit={handleSubmit}>
      <label htmlFor="username" className="player-label">
        {label}
      </label>
      <div className="row player-inputs">
        <input
          type="text"
          id="username"
          className={`input-${theme}`}
          placeholder="github username"
          autoComplete="off"
          value={username}
          onChange={handleChange}
        />
        <button
          className={`btn ${theme === "dark" ? "light-btn" : "dark-btn"}`}
          type="submit"
          disabled={!username}
        >
          submit
            </button>
      </div>
    </form>
  );
};



export default function Battle() {
  const [playerOne, setPlayerOne] = useState(null);
  const [playerTwo, setPlayerTwo] = useState(null);
  const handleSubmit = (id, player) => {
    id === "playerOne" ? setPlayerOne(player) : setPlayerTwo(player);
  };
  const handleReset = id => {
    id === "playerOne" ? setPlayerOne(null) : setPlayerTwo(null)
  };
  return (
    <Fragment>
      <Instructions />
      <div className="players-container">
        <h1 className="center-text header-lg">Players</h1>
        <div className="row space-around">
          {playerOne === null ? (
            <PlayerInput
              onSubmit={player => handleSubmit("playerOne", player)}
              label="Player One"
            />
          ) : (
              <PlayerPreview
                label="Player One"
                username={playerOne}
                onReset={() => handleReset("playerOne")}
              />
            )}
          {playerTwo === null ? (
            <PlayerInput
              onSubmit={player => handleSubmit("playerTwo", player)}
              label="Player Two"
            />
          ) : (
              <PlayerPreview
                label="Player Two"
                username={playerTwo}
                onReset={() => handleReset("playerTwo")}
              />
            )}
        </div>
        {playerOne && playerTwo && (
          <Link
            className="btn dark-btn btn-space"
            to={{
              pathname: "/battle/results",
              search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
            }}
          >
            Battle
          </Link>
        )}
      </div>
    </Fragment>
  );
}

