import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import Loading from "./Loading";
import { fetchPopularRepos } from "../utils/api";
import Tooltip from "./Tooltip";
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle
} from "react-icons/fa";

const LanguagesNav = ({ selectedLanguage, updateLanguage }) => {
  const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
  return (
    <ul className="flex-center">
      {languages.map(language => (
        <li key={language}>
          <button
            className="btn-clear nav-link"
            style={selectedLanguage === language ? { color: "red" } : null}
            onClick={() => updateLanguage(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
};

LanguagesNav.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired
};

const ReposGrid = ({ repos }) => {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        const {
          name,
          owner,
          html_url,
          stargazers_count,
          forks,
          open_issues
        } = repo;
        const { login, avatar_url } = owner;
        return (
          <li key={html_url}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={login}
            >
              <ul className="card-list">
                <Tooltip text="Github username">
                  <FaUser color='rgb(255, 191, 116)' size={22} />
                  <a href={`https://github.com/${login}`}>
                    {login}
                  </a>
                </Tooltip>
                <li>
                  <FaStar color="rgb(255,214,0)" size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color="rgb(129,195,244)" size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color="rgb(241,138,147)" size={22} />
                  {open_issues.toLocaleString()} open open issues
                </li>
              </ul>
            </Card>
          </li>
        );
      })}
    </ul>
  );
};

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

export class Popular extends Component {
  state = {
    selectedLanguage: "All",
    repos: {},
    error: null
  };

  isLoading = () => {
    const { repos, selectedLanguage, error } = this.state;
    return error === null && !repos[selectedLanguage];
  };

  updateLanguage = selectedLanguage => {
    const { repos } = this.state;
    this.setState({ selectedLanguage, error: null });

    if (!repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then(res =>
          this.setState(({ repos }) => ({
            repos: { ...repos, [selectedLanguage]: res }
          }))
        )
        .catch(error => {
          console.log("Error fetching repos", error);
          this.setState({ error: "There was an error fetching repos" });
        });
    }
  };
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }
  render() {
    const { selectedLanguage, error, repos } = this.state;
    return (
      <Fragment>
        <LanguagesNav
          selectedLanguage={selectedLanguage}
          updateLanguage={this.updateLanguage}
        />
        {this.isLoading() && <Loading text="Fetching Repos" />}
        {error && <p className="center-text error">{error}</p>}
        {repos[selectedLanguage] && (
          <ReposGrid repos={repos[selectedLanguage]} />
        )}
      </Fragment>
    );
  }
}

export default Popular;
