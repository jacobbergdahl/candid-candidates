/*
    Perhaps the most complex component in the project. Lists a single candidate.
    Has several different states and handles both editing and deleting of candidates.
    This component could be broken down into multiple functional components.
*/

import React from 'react';
import { deleteCandidate, updateCandidate } from '../data/provider';
import { RECRUITMENT_STEPS } from '../model/recruitmentStep';
import Input from './Input';
import './rowcandidate.scss';
import Select from './Select';

export default class RowCandidate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBeingEdited: false,
      isBeingDeleted: false,
      isDeleting: false,
      hasBeenDeleted: false,
      candidate: this.props.candidate

    };
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.toggleDeleteMode = this.toggleDeleteMode.bind(this);
    this.onDeleteUser = this.onDeleteUser.bind(this);
  }

  toggleEditMode() {  
    this.setState(state => ({   
      isBeingEdited: !state.isBeingEdited  
    }));
  }

  toggleDeleteMode() {  
    this.setState(state => ({   
      isBeingDeleted: !state.isBeingDeleted  
    }));
  }

  onDeleteUser() {
    deleteCandidate(this.state.candidate._id);
    this.setState({   
      isDeleting: true
    });
    setTimeout(() => {
      this.setState({
        hasBeenDeleted: true
      });
    }, 2900);
  }

  // In a real scenario, there would be stricter validation for the values.
  // Since we are using HTML5 validation, we could put these fields inside of a form and let HTML5 validate them.
  onChange = (event) => {
    let updatedCandidate = this.state.candidate;
    switch (event.target.name) {
      case "name":
        updatedCandidate._name = event.target.value;
        break;
      case "email":
        updatedCandidate._email = event.target.value;
        break;
      case "address":
        updatedCandidate._address = event.target.value;
        break;
      case "age":
        updatedCandidate._age = event.target.value;
        break;
      case "status":
      case "recruitmentstep":
        updatedCandidate._recruitmentStep = RECRUITMENT_STEPS[event.target.value];
        break;
    }
    this.setState({candidate: updatedCandidate});
    updateCandidate(updatedCandidate);
  }

  render() {
    const mailto = "mailto:" + this.state.candidate._email;
    if (this.state.isBeingEdited) {
      return (
        <div className="wrapper-row being-edited">
          <div className="wrapper-inner-row">
            <Input id={this.state.candidate._id} valueType="Name" defaultValue={this.state.candidate._name} onChange={this.onChange}/>
            <Input id={this.state.candidate._id} valueType="Email" defaultValue={this.state.candidate._email} onChange={this.onChange} />
            <Input id={this.state.candidate._id} valueType="Address" defaultValue={this.state.candidate._address} onChange={this.onChange} />
            <Input id={this.state.candidate._id} valueType="Age" defaultValue={this.state.candidate._age} onChange={this.onChange} />
            <Select id={this.state.candidate._id} valueType="Status" defaultValue={this.state.candidate._recruitmentStep} onChange={this.onChange} />
          </div>
          <span className="material-icons dark no-padding hide-on-desktop" onClick={this.toggleEditMode}>check</span>
          <button type="button" className="btn btn-positive show-on-desktop" onClick={this.toggleEditMode}>Done</button>
        </div>
      );
    } else if (this.state.isBeingDeleted) {
      if (this.state.hasBeenDeleted) {
        return <div className="display-none"></div>
      } else if (this.state.isDeleting) {
        return (
          <div className="wrapper-row has-been-deleted fade-out">
            <div className="wrapper-inner-row">
              <span>The candidate has been deleted.</span>
            </div>
          </div>
        );
      } else {
        return (
          <div className="wrapper-row being-deleted">
            <div className="wrapper-inner-row">
              <span>Are you sure that you wish to delete candidate {this.state.candidate._name}? This action cannot be undone.</span>
            </div>
            <button type="button" className="btn btn-negative margin-bottom margin-top" onClick={this.onDeleteUser}>Yes, delete the candidate</button>
            <button type="button" className="btn btn-positive transparent" onClick={this.toggleDeleteMode}>No, go back</button>
          </div>
        );
      }
    } else {
      return (
        <div className="wrapper-row">
          <div className="wrapper-inner-row">
            <span><strong>{this.state.candidate._name}</strong> - #{this.state.candidate._id}</span>
            <a href={mailto}>{this.state.candidate._email}</a>
            <span>{this.state.candidate._address}</span>
            <span>{this.state.candidate._age} years old</span>
            <span>Status: {this.state.candidate._recruitmentStep}</span>
          </div>
          <span className="material-icons dark hide-on-desktop" onClick={this.toggleEditMode}>edit</span>
          <button type="button" className="btn btn-positive show-on-desktop margin-right show-on-row-hover" onClick={this.toggleEditMode}>Edit</button>
          <span className="material-icons dark hide-on-desktop" onClick={this.toggleDeleteMode}>delete</span>
          <button type="button" className="btn btn-negative show-on-desktop margin-right show-on-row-hover" onClick={this.toggleDeleteMode}>Delete</button>
        </div>
      );
    }
  }
}