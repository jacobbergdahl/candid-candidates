import React from 'react';
import { RECRUITMENT_STEPS } from '../model/recruitmentStep';
import './inputelements.scss';

export const Select = (props) => {
  const id = `edit-${props.valueType.toLowerCase()}-${props.id}`;
  return(
    <div className="wrapper-input">
      <label htmlFor={id}>{props.valueType}</label>
      <select id={id} onChange={props.onChange} name={props.valueType.toLowerCase()} defaultValue={props.defaultValue} required>
        {
          Object.keys(RECRUITMENT_STEPS).map((key) => {
            let reactKey = id + key;
            return <option value={key} key={reactKey}>{RECRUITMENT_STEPS[key]}</option>
          })
        }
      </select>
    </div>
  );
}

export default Select;