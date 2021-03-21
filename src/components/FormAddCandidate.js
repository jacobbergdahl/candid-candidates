import React from 'react';
import { RECRUITMENT_STEPS } from '../model/recruitmentStep';
import Input from './Input';
import Select from './Select';

export const FormAddCandidate = (props) => {
  return (
    <form onSubmit={props.onSubmit} className={props.className}>
      <Input id={props.id} valueType="Name" onChange={props.onChange} />
      <Input id={props.id} valueType="Email" onChange={props.onChange} />
      <Input id={props.id} valueType="Address" onChange={props.onChange} />
      <Input id={props.id} valueType="Age" onChange={props.onChange} />
      <Select id={props.id} valueType="Status" defaultValue={RECRUITMENT_STEPS.CONTACT} onChange={props.onChange} />
      <button type="submit" className="btn btn-positive transparent">Add candidate</button>
    </form>
  )
}

export default FormAddCandidate;