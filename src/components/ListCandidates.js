/*
    Lists all candidates. By default, only 20 are shown, and then 20 more each time the user
    clicks the link to add more candidates.
*/

import React, { useState } from 'react';
import RowCandidate from './RowCandidate';

export const ListCandidates = (props) => {
  const [shownNumberOfCandidates, setShownNumberOfCandidates] = useState(20);
  const showMoreCandidates = () => setShownNumberOfCandidates(shownNumberOfCandidates + 20);

  let candidates = props.candidates.map((candidate) => {
    let key = "row-" + candidate._id;
    return <RowCandidate candidate={candidate} key={key}/>
  });

  return (
    <div className="wrapper-candidates">
      {candidates.slice(0, shownNumberOfCandidates)}
      {candidates.length === 0 &&
        <div className="no-candidates"><img src="img/no_candidates_found.jpg" alt="No candidates found" /></div>
      }
      {props.candidates.length > shownNumberOfCandidates && 
        <span className="expand link show-more margin-top" onClick={showMoreCandidates}>Show more candidates</span>
      }
      {props.candidates.length <= shownNumberOfCandidates && 
        <span className="expand link show-more margin-top" onClick={props.fetchCandidates}>Refresh</span>
      }
    </div>
  );
}