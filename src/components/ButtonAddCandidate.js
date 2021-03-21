import React from 'react';

export const ButtonAddCandidate = (props) => {
  let icon = props.showAddIcon === true ? "add" : "close";
  return(
    <button type="button" className="btn btn-circular btn-cta" onClick={props.onClick}>
      <span className="material-icons">
      {icon}
      </span>
    </button>
  )
}

export default ButtonAddCandidate;