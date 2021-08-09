/*
  Some very basic testing of the redux reducer.
  To run: $ npm test
  
  Also, see ~/cypress for UI tests.
*/

import { Candidate, RECRUITMENT_STEPS } from "./candidateModel";
import candidateReducer, { addCandidate, deleteCandidate, editCandidate } from "./candidateSlice";

describe('candidate reducer', () => {
  const initialState = {
    filterText: 'Alpha',
    allCandidates: [
      new Candidate("Alpha", 30, "alpha@example.com", "Street 1", RECRUITMENT_STEPS.CONTACT, 1),
      new Candidate("Beta", 40, "beta@example.com", "Street 2", RECRUITMENT_STEPS.DIALOG, 2)
    ],
  };

  it('should handle editing', () => {
    const alphaCandidate = initialState.allCandidates[0];
    alphaCandidate._address = "Street 10";
    const actual = candidateReducer(initialState, editCandidate(alphaCandidate));
    expect(actual.allCandidates.filter((candidate) => candidate._id === 1)[0]._address).toEqual("Street 10");
  });

  it('should handle deleting', () => {
    const actual = candidateReducer(initialState, deleteCandidate(initialState.allCandidates[0]));
    expect(actual.allCandidates.filter((candidate) => candidate._id === 1).length).toEqual(0);
  });

  it('should handle adding', () => {
    const newCandidate = new Candidate("Gamma", 50, "gamma@example.com", "Street 3", RECRUITMENT_STEPS.INTERVIEW, 3);
    const actual = candidateReducer(initialState, addCandidate(newCandidate));
    expect(actual.allCandidates.length).toEqual(3);
  });
});