/*
  Lists a single candidate. This is the most complex file in the project.
  Arguably, this file could be broken down into more files.
*/

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../common/Input";
import Select from "../../common/Select";
import { Candidate, RECRUITMENT_STEPS, validateAge } from "./candidateModel";
import { deleteCandidate, editCandidate, getFilterText } from "./candidateSlice";

export const CandidateRow = (props) => {
  // There is a large amount of possible states for a row, as you can see.
  // Again, this is the visually most complex file of this project.
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [isBeingDeleted, setIsBeingDeleted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasBeenDeleted, setHasBeenDeleted] = useState(false);
  const filterText = useSelector(getFilterText);
  let candidate = props.candidate;
  const [formCandidate, setFormCandidate] = useState(JSON.parse(JSON.stringify(candidate)));
  const dispatch = useDispatch();

  const resetFormCandidate = () => {
    // This syntax looks weird, but it's standard Javascript shenanigans due to immutability nonsense.
    setFormCandidate(JSON.parse(JSON.stringify(candidate)));
  }

  const toggleIsBeingEdited = () => {
    resetFormCandidate();
    setIsBeingEdited(!isBeingEdited);
  }

  const onSubmitEditedCandidate = (e) => {
    e.preventDefault();
    let isAgeOk = candidate._age === formCandidate._age || validateAge(formCandidate._age);
    if (!isAgeOk) return;
    dispatch(editCandidate(formCandidate));
    toggleIsBeingEdited();
  }

  const deleteUser = () => {
    setIsDeleting(true);
    // This timeOut is only for visual purposes. It's set to 2900ms. In the SCSS,
    // there is a fadeOut animation set to 3000ms.
    setTimeout(() => {
      setHasBeenDeleted(true);
      dispatch(deleteCandidate(candidate));
    }, 2900);
  }

  const handleEditFormChange = (e) => {
    let updatedCandidate = formCandidate;
    switch (e.target.name) {
      case "name":
        updatedCandidate._name = e.target.value;
        break;
      case "email":
        updatedCandidate._email = e.target.value;
        break;
      case "address":
        updatedCandidate._address = e.target.value;
        break;
      case "age":
        updatedCandidate._age = e.target.value;
        break;
      case "status":
        updatedCandidate._recruitmentStep = RECRUITMENT_STEPS[e.target.value];
        break;
    }
    setFormCandidate(updatedCandidate);
  }

  const mailto = "mailto:" + candidate._email;

  // From here on out, the view is being rendered based on its state. The order of these if-statement matter.
  // The candidate is being edited.
  if (isBeingEdited) {
    return (
      <div className="wrapper-row being-edited" data-cy="wrapper-row">
        <form onSubmit={e => onSubmitEditedCandidate(e)}>
          <div className="wrapper-inner-row columns-on-desktop">
            <Input id={candidate._id} valueType="Name" defaultValue={candidate._name} onChange={handleEditFormChange}/>
            <Input id={candidate._id} valueType="Email" defaultValue={candidate._email} onChange={handleEditFormChange} />
            <Input id={candidate._id} valueType="Address" defaultValue={candidate._address} onChange={handleEditFormChange} />
            <Input id={candidate._id} valueType="Age" defaultValue={candidate._age} onChange={handleEditFormChange} />
            <Select id={candidate._id} valueType="Status" defaultValue={candidate._recruitmentStep} onChange={handleEditFormChange} />
          </div>
          <div className="wrapper-row-buttons">
            <button type="submit" className="btn btn-positive" data-cy="btn-confirm-edits">Confirm</button>
            <button type="button" className="btn btn-negative transparent" onClick={() => toggleIsBeingEdited()}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
  // The candididate has been deleted. This while be true for at most a million second or two.
  // It's really just here as a safety measure in case redux-persist doesn't update
  // the list instantly.
  else if (hasBeenDeleted) {
    return <div className="display-none"></div>
  } 
  // The candidate is currently deleting. This will be shown for 2900ms.
  else if (isDeleting) {
    return (
      <div className="wrapper-row has-been-deleted fade-out" data-cy="wrapper-row">
        <div className="wrapper-inner-row">
          <span>The candidate has been deleted.</span>
        </div>
      </div>
    );
  }
  // The user is considering deleting the candidate.
  else if (isBeingDeleted) {
    return (
      <div className="wrapper-row being-deleted" data-cy="wrapper-row">
        <div className="wrapper-inner-row">
          <span>Are you sure that you wish to delete candidate {candidate._name}? This action cannot be undone.</span>
        </div>
        <button type="button" className="btn btn-negative margin-bottom margin-top" data-cy="btn-confirm-delete-candidate" onClick={() => deleteUser()}>Yes, delete the candidate</button>
        <button type="button" className="btn btn-positive transparent" onClick={() => setIsBeingDeleted(!isBeingDeleted)}>No, go back</button>
      </div>
    );
  }
  // The view has been expanded to reveal more information and options.
  else if (isExpanded) {
    return (
      <div className="wrapper-row column" data-cy="wrapper-row">
        <div className="flex">
          <div className="wrapper-inner-row">
            <span><strong data-cy="row-username">{candidate._name}</strong></span>
            <a href={mailto}>{candidate._email}</a>
            <span>{candidate._address}</span>
            <span>{candidate._age} years old</span>
            <span>Status: {candidate._recruitmentStep}</span>
          </div>
          <button className="padding-right link btn-linkified" onClick={() => setIsExpanded(!isExpanded)}>Collapse</button>
        </div>
        <div className="wrapper-row-buttons">
          <button type="button" className="btn btn-positive" data-cy="btn-edit-candidate" onClick={() => toggleIsBeingEdited()}>Edit</button>
          <button type="button" className="btn btn-negative" data-cy="btn-delete-candidate" onClick={() => setIsBeingDeleted(!isBeingDeleted)}>Delete</button>
        </div>
      </div>
    );
  }
  // The initial state of the row.
  else {
    const controls = candidate._id + "-controls";
    return (
      <button className="wrapper-row clickable-row" onClick={() => setIsExpanded(!isExpanded)} aria-controls={controls} data-cy="wrapper-row">
        <div className="wrapper-inner-row">
          <span><strong data-cy="row-username">{candidate._name}</strong></span>
          {/* If the user has entered a search query, matching fields will be shown.
              In a real application, I think these if-statement would be placed in a separate file,
              to standardize the conditions. But for this small project, this works well. */}
          {filterText !== undefined && filterText !== null && filterText !== "" && candidate._email.toLowerCase().indexOf(filterText.toLowerCase()) > -1 &&
            <a href={mailto}>{candidate._email}</a>
          }
          {filterText !== undefined && filterText !== null && filterText !== "" && candidate._address.toLowerCase().indexOf(filterText.toLowerCase()) > -1 &&
            <span>{candidate._address}</span>
          }
          {filterText !== undefined && filterText !== null && filterText !== "" && candidate._age == filterText &&
            <span>{candidate._age} years old</span>
          }
          <span>Status: {candidate._recruitmentStep}</span>
        </div>
        {/* The span below could be a button, but it's really just there as visual aid; the onClick is set to the entire row */}
        <span className="padding-right link" tabIndex="-1" id={controls}>Expand</span>
      </button>
    );
  }
}

export default CandidateRow;