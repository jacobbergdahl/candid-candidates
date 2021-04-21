/*
  A model for what a Candidate looks like.
*/

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

export const RECRUITMENT_STEPS = {
  CONTACT: "Contacted",
  DIALOG: "In dialog",
  INTERVIEW: "Interviewed",
  OFFER: "Given offer",
  CLOSED: "Closed"
}

// This primitive function asks users if they're sure about the age they entered,
// should it be a bit of an odd number.
// In a real application in 2021, we probably wouldn't use window.confirm for this.
// Also, this function could arguably be placed elsewhere, but I felt like it was
// closely related to the candidateModel.
export const validateAge = (age) => {
  if (typeof window !== `undefined` && (age <= 18 || age > 100)) {
    let isAgeCorrect = window.confirm("You just entered an age of " + age + "! Are you sure that's what you meant to enter?");
    // This bit right here is just an easter egg :)
    if (isAgeCorrect && age <= 0) {
      return window.confirm("Seriously? They are less than 0 years old? How is that even possible? Honestly, sometimes I question your judgment, Steve. Are you really sure about this?");
    } else if (isAgeCorrect && age > 120) {
      return window.confirm("Okay, but if you're telling me that someone has discovered the secret to eternal life, you got to let me in on it. Is it CRISPR? I knew it was CRISPR. Because you're not pulling my leg, right?");
    }
    return isAgeCorrect;
  }
  return true;
}