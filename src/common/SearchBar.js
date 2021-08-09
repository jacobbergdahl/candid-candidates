/*
	A search bar. The search bar has the power to filter candidates, though CandidateList
	is responsible for the actual filtering.
*/

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilterText, getFilterText } from '../features/candidate/candidateSlice';

export const SearchBar = () => {
	const filerText = useSelector(getFilterText);
	const dispath = useDispatch();

	return (
		<input
			type="text"
			placeholder="Search by name, address, e-mail, etc."
			className="searchbar margin-bottom"
            data-cy="searchbar"
			value={filerText}
			onChange={(e) => dispath(changeFilterText(e.target.value))}
		/>
	);
}

export default SearchBar;