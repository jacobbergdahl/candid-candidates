import { RECRUITMENT_STEPS } from "./recruitmentStep";

export class Candidate {
  constructor(name, age, email, address, recruitmentStep = RECRUITMENT_STEPS.CONTACT, id = Math.floor(Math.random() * 2000000)) {
    this._name = name;
    this._age = age;
    this._email = email;
    this._address = address;
    this._recruitmentStep = recruitmentStep;
    this._id = id;
  }
}