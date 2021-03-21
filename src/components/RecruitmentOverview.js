/*
    The master component for the main part of the website. Reponsible for fetching candidates and decides what
    candidates to show (though ListCandidates determines how MANY to show).
*/

import React from 'react';
import { getCandidates } from '../data/provider';
import { ListCandidates } from './ListCandidates';
import SearchBar from './SearchBar';

export class RecruitmentOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      candidates: getCandidates()
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.fetchCandidates = this.fetchCandidates.bind(this);
  }

  handleFilterTextChange(filterText) {
    if (filterText === undefined || filterText === null) {
      filterText = this.state.filterText;
    }
    let currentCandidates = getCandidates().filter((candidate) => {
      return (
        candidate._name.toLowerCase().indexOf(filterText.toLowerCase()) > -1
        || candidate._email.toLowerCase().indexOf(filterText.toLowerCase()) > -1
        || candidate._address.toLowerCase().indexOf(filterText.toLowerCase()) > -1
        || candidate._recruitmentStep.toLowerCase().indexOf(filterText.toLowerCase()) > -1
        || candidate._id == filterText
        || candidate._age == filterText
      );
    });
    this.setState({
      filterText: filterText,
      candidates: currentCandidates
    });
  }

  fetchCandidates() {
    this.handleFilterTextChange(this.state.filterText);
  }

  render() {
    return (
      <div className="wrapper-recruitment-overview">
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />
        <ListCandidates 
          candidates={this.state.candidates}
          fetchCandidates={this.fetchCandidates}
        />
      </div>
    )
  }
}