import React from 'react';
import './inputelements.scss';

export const Input = (props) => {
  const id = `edit-${props.valueType.toLowerCase()}-${props.id}`;
  let inputType = "text";
  switch (props.valueType.toLowerCase()) {
    case "email":
      inputType = "email";
      break;
    case "age":
      inputType = "number";
      break;
  }
  return(
    <div className="wrapper-input">
      <label htmlFor={id}>{props.valueType}</label>
      <input 
        type={inputType}
        id={id}
        defaultValue={props.defaultValue} 
        placeholder={props.valueType} 
        onChange={props.onChange}
        name={props.valueType.toLowerCase()}
        required />
    </div>
  );
}

export default Input;