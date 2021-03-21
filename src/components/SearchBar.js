import React from 'react';
import './searchbar.scss';

export class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
	}
	
	handleFilterTextChange(e) {
		this.props.onFilterTextChange(e.target.value);
	}

	render() {
		return (
				<input
					type="text"
					placeholder="Search by name, address, email, id, etc."
					className="searchbar margin-bottom"
					value={this.props.filterText}
					onChange={this.handleFilterTextChange}
				/>
			);
	}
}

export default SearchBar;