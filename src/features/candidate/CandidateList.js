/*
  Lists all candidates.
*/

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CandidateRow from './CandidateRow';
import { getCandidates, getFilterText } from './candidateSlice';

export const CandidateList = () => {
  const [shownNumberOfCandidates, setShownNumberOfCandidates] = useState(50);
  const showMoreCandidates = (e = null) => {
    setShownNumberOfCandidates(shownNumberOfCandidates + 50);
  }
  
  const candidates = useSelector(getCandidates);
  const filterText = useSelector(getFilterText);

  // CandidateList is responsible for filtering the candidates, though the filterText is set in SearchBar
  const candidateRows = candidates
    // The filter looks at a range of values to determine whether to show a candidate
    .filter((candidate) => {
      return (
        (filterText === undefined || filterText === null) ||
        candidate._name.toLowerCase().indexOf(filterText.toLowerCase()) > -1
        || candidate._email.toLowerCase().indexOf(filterText.toLowerCase()) > -1
        || candidate._address.toLowerCase().indexOf(filterText.toLowerCase()) > -1
        || candidate._recruitmentStep.toLowerCase().indexOf(filterText.toLowerCase()) > -1
        || candidate._age == filterText
      );
    })
    // Candidates are then sorted in alphabetical order
    .sort((a, b) => a._name.localeCompare(b._name))
    // Finally, the candidates are mapped into row components
    .map((candidate) => {
      let key = "row-" + candidate._id;
      return <CandidateRow candidate={candidate} key={key}/>
    });

  return (
    <div className="wrapper-candidates" data-cy="wrapper-candidates">
      {/* If you're new to React, the line below might look strange.
          The array candidateRows, which contains CandidateRow's, is
          iterated through, but only up until the shownNumberOfCandidates. */}
      {candidateRows.slice(0, shownNumberOfCandidates)}
      {candidateRows.length === 0 &&
        <div className="no-candidates" data-cy="no-candidates"><img src="img/no_candidates_found.jpg" alt="No candidates found" /></div>
      }
      {candidateRows.length > shownNumberOfCandidates && 
        <button className="expand link btn-linkified show-more margin-top" onClick={showMoreCandidates} tabIndex="0">Show more candidates</button>
      }
    </div>
  );
}