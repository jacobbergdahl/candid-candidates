/*
    Master component for adding more candidates.
*/

import React from 'react';
import { addCandidate } from '../data/provider';
import { Candidate } from '../model/candidate';
import { RECRUITMENT_STEPS } from '../model/recruitmentStep';
import './addcandidate.scss';
import ButtonAddCandidate from './ButtonAddCandidate';
import FormAddCandidate from './FormAddCandidate';

export class AddCandidate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddingCandidate: false,
      justAddedCandidate: false,
      id: 0,
      name:'',
      email: '',
      address: '',
      age: 0,
      recruitmentStep: RECRUITMENT_STEPS[0]
    }
    this.toggleIsAddingCandidate = this.toggleIsAddingCandidate.bind(this);
    this.toggleJustAddedCandidate = this.toggleJustAddedCandidate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  toggleIsAddingCandidate() {  
    this.setState(state => ({   
      isAddingCandidate: !state.isAddingCandidate  
    }));
  }

  toggleJustAddedCandidate() {  
    this.setState(state => ({   
      justAddedCandidate: !state.justAddedCandidate  
    }));
    setTimeout(() => {
      this.setState({
        justAddedCandidate: false
      });
    }, 2900);
  }

  onSubmit(event) {
    event.preventDefault();
    addCandidate(
      new Candidate(
        this.state.name,
        this.state.age,
        this.state.email,
        this.state.address,
        this.state.recruitmentStep,
        this.state.id
      )
    )
    this.toggleIsAddingCandidate();
    this.toggleJustAddedCandidate();
    this.reset();
  }

  componentDidMount() {
    this.reset();
  }

  reset() {
    this.setState({
      id: Math.floor(Math.random() * 2000000),
      name:'',
      email: '',
      address: '',
      age: 0,
      recruitmentStep: RECRUITMENT_STEPS[0]
    });
  }

  onChange = (event) => {
    switch (event.target.name) {
      case "name":
        this.setState({name: event.target.value});
        break;
      case "email":
        this.setState({email: event.target.value});
        break;
      case "address":
        this.setState({address: event.target.value});
        break;
      case "age":
        this.setState({age: event.target.value});
        break;
      case "status":
      case "recruitmentstep":
        this.setState({recruitmentStep: RECRUITMENT_STEPS[event.target.value]});
        break;
    }
  }

  render() {
    return(
      <div className="wrapper-add-candidate">
        {this.state.isAddingCandidate === true &&
          <FormAddCandidate 
            id={this.state.id}
            onChange={this.onChange}
            onSubmit={this.onSubmit} 
            className="add-candidate-window" />
        }
        {this.state.justAddedCandidate === true &&
          <div className="add-candidate-window alert fade-out">
            Candidate added! :)
          </div>
        }
        <ButtonAddCandidate 
          showAddIcon={this.state.isAddingCandidate === false} 
          onClick={this.toggleIsAddingCandidate} />
      </div>
    )
  }
}

export default AddCandidate;