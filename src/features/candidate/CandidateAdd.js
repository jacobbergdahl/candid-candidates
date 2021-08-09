/*
	CandidateAdd is responsible for allowing the user to add new candidates.
*/

import { useState } from "react";
import { useDispatch } from "react-redux";
import Input from "../../common/Input";
import Select from "../../common/Select";
import { Candidate, RECRUITMENT_STEPS, validateAge } from "./candidateModel";
import { addCandidate } from "./candidateSlice";

export const CandidateAdd = () => {
  const [isAddingCandidate, setIsAddingCandidate] = useState(false);
  const [justAddedCandidate, setJustAddedCandidate] = useState(false);
  const dispatch = useDispatch();
  let candidate = new Candidate('', 0, '', '');

  const toggleIsAddingCandidate = () => {
    setIsAddingCandidate(!isAddingCandidate);
    if (isAddingCandidate) {
      candidate = new Candidate('', 0, '', '');
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    let isAgeOk = validateAge(candidate._age);
    if (!isAgeOk) return;
    dispatch(addCandidate(candidate));
    setIsAddingCandidate(false);
    setJustAddedCandidate(true);
    setTimeout(() => {
      setJustAddedCandidate(false);
    }, 2900);
  }

  return(
    <div className="wrapper-add-candidate margin-bottom">
      {(isAddingCandidate === false || window.innerWidth >= 1000) &&
        <button type="button" className="btn btn-add-candidate" data-cy="btn-add-candidate" onClick={() => toggleIsAddingCandidate()}>
          Add a candidate
        </button>
      }
      {isAddingCandidate === true &&
        <div className="overlay" data-cy="overlay-add-candidate">
          <div className="wrapper-row flex-column">
            <h2 className="margin-top">Add a new candidate</h2>
            <form onSubmit={e => onSubmit(e)} className="add-candidate-window">
              <div className="wrapper-inner-row columns-on-desktop">
                <Input id={candidate._id} valueType="Name" onChange={e => candidate._name = e.target.value} />
                <Input id={candidate._id} valueType="Email" onChange={e => candidate._email = e.target.value} />
                <Input id={candidate._id} valueType="Address" onChange={e => candidate._address = e.target.value} />
                <Input id={candidate._id} valueType="Age" onChange={e => candidate._age = e.target.value} />
                <Select id={candidate._id} valueType="Status" defaultValue={RECRUITMENT_STEPS.CONTACT} onChange={e => candidate._recruitmentStep = RECRUITMENT_STEPS[e.target.value]} />
              </div>
              <div className="wrapper-row-buttons">
                <button type="submit" className="btn btn-positive" data-cy="btn-confirm-add-candidate">Add candidate</button>
                <button type="button" className="btn btn-negative transparent" data-cy="btn-cancel-add-candidate" onClick={() => toggleIsAddingCandidate()}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      }
      {justAddedCandidate === true &&
        <div className="overlay lite" data-cy="overlay-has-added-candidate">
          <div className="wrapper-row fade-out">
            <div className="wrapper-inner-row">
              Candidate added! :)
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default CandidateAdd;