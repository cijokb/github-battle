import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";

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

export class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "All",
      repos: {},
      error: null
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  isLoading() {
    const { repos, selectedLanguage, error } = this.state;
    return error === null && !repos[selectedLanguage];
  }

  updateLanguage(selectedLanguage) {
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
  }
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
        {this.isLoading() && <p>Loading ...</p>}
        {error && <p>{error}</p>}
        {repos[selectedLanguage] && <pre>{JSON.stringify(repos[selectedLanguage], null, 2)}</pre>}
      </Fragment>
    );
  }
}

export default Popular;
