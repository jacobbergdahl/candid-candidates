/*
  Where the redux magic happens. More specifically, this is where you will find
  all reducer logic and actions relating to candidates.
*/

import { createSlice } from '@reduxjs/toolkit';
import { getRandomlyGeneratedCandidates } from './candidateAPI';

const initialState = {
  filterText: '',
  allCandidates: getRandomlyGeneratedCandidates(300),
};

export const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write mutating logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    editCandidate: (state, action) => {
      const candidate = action.payload;
      // The candidate is removed via filtering
      const newCandidateList = state.allCandidates.filter((c) => c._id != candidate._id);
      // And added anew with the new data
      newCandidateList.push(candidate);
      state.allCandidates = newCandidateList;
    },
    deleteCandidate: (state, action) => {
      const candidate = action.payload;
      // The candidate is removed via filtering
      const newCandidateList = state.allCandidates.filter((c) => c._id != candidate._id);
      state.allCandidates = newCandidateList;
    },
    addCandidate: (state, action) => {
      const candidate = action.payload;
      state.allCandidates.push(candidate);
    },
    // This reducer should never exist in a real application, obviously,
    // but it's quite handy in a dummy project such as this.
    resetCandidates: (state) => {
      state.allCandidates = getRandomlyGeneratedCandidates(300);
      state.filterText = '';
    },
    changeFilterText: (state, action) => {
      state.filterText = action.payload;
    },
  },
});

export const { editCandidate, deleteCandidate, addCandidate, resetCandidates, changeFilterText } = candidateSlice.actions;

export const getCandidates = (state) => state.candidate.allCandidates;
export const getFilterText = (state) => state.candidate.filterText;

export default candidateSlice.reducer;