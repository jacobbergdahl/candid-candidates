/*
  A dummy file for mimicking a back-end. A real application would have a database instead.
  A good alternative for this solution could also be to use a headless CMS.
*/

import { Candidate } from "../model/candidate";
import { RECRUITMENT_STEPS } from "../model/recruitmentStep";

const KEY_CANDIDATES = "KEY_CANDIDATES";

const dummyNames = [
  "Renata",  "Stephany",  "Leonardo",  "Maison",  "Estelle",  "Maverick",  "Santino",  "Bernie",  "Kristina",  "Göran",  "Zack",  "Ayden",  "Kaiya",  "Sahara",  "Caden",  "Jubilee",  "Klas",  "Adelaide",  "Anna",  "Elon",  "Donald",  "Blair",  "Conner",  "Johnnie",  "Jane",  "Emelia",  "Gösta",  "Genesis",  "Vladimir",  "Flynn",  "Makoto",  "Lord",  "Jayden",  "Eric",  "Kaedyn",  "Ares",  "Leroy",  "Aidan",  "Leslie",  "Amazing",  "Snow",  "Bran",  "Barron",  "Flynn",  "Guinevere",  "Napoleon",  "Eva",  "Lydia",  "Marcelo",  "Tiana",  "Gisselle",  "Chayse",  "Monsieur",  "Bryanna",  "Breckin",  "Tegan",  "Lizbeth",  "Emmitt",  "Hana",  "Viktor",  "Tom",  "Arnold",  "Joakim",  "Nikole",  "Senior",  "Junior",  "Shiba",  "Kerrigan",  "Emmie",  "Brendon",  "Quixote",  "Fabiola",  "Thomas",  "Hamilton",  "Maylee",  "Washington",  "Einstein", "Tesla", "Nullington", "Emperor",  "Gino",  "Fabian",  "Josh",  "Joseph",  "Jackson",  "Bryan",  "Celine",  "Emanuel",  "Izaac",  "Judy",  "Alexander",  "Queen",  "Anthony",  "David",  "Quinton",  "Ahmir",  "Emma",  "Oakley",  "Harley",  "Carsyn",  "Presley",  "Sullivan",  "Elvis"
]

export const getRandomlyGeneratedCandidates = (numberOfCandidates = 50) => {
  const candidates = [];
  for (let i = 0; i < numberOfCandidates; i++) {
    let firstName = dummyNames[Math.floor(Math.random() * dummyNames.length)];
    let lastName = dummyNames[Math.floor(Math.random() * dummyNames.length)];
    let streetName = dummyNames[Math.floor(Math.random() * dummyNames.length)] + " Street";
    let recruitmentStep = RECRUITMENT_STEPS[Object.keys(RECRUITMENT_STEPS)[Math.floor(Math.random() * Object.keys(RECRUITMENT_STEPS).length)]];
    let email = firstName.toLowerCase() + "." + lastName.toLowerCase() + "@example.com";
    let age = Math.floor(Math.random() * 82) + 18;
    candidates.push(new Candidate(`${firstName} ${lastName}`, age, email, streetName, recruitmentStep, i));
  }
  return candidates;
}

export const getCandidates = () => {
  // To get new random candidates, uncomment the line below
  // localStorage.clear();
  // If there is no list of candidates...
  if (!localStorage.getItem(KEY_CANDIDATES)) {
    // ... then a new list of candidates (dummy data) will be randomly generated
    localStorage.setItem(KEY_CANDIDATES, JSON.stringify(getRandomlyGeneratedCandidates()));
  }
  return JSON.parse(localStorage.getItem(KEY_CANDIDATES));
}

export const setCandidates = (candidates) => {
  localStorage.setItem(KEY_CANDIDATES, JSON.stringify(candidates));
}

export const getCandidate = (id) => {
  let candidate = getCandidates().filter((candidate) => candidate._id == id);
  if (candidate) return candidate[0];
  return undefined;
}

export const updateCandidate = (updatedCandidate) => {
  return manageCandidate(true, updatedCandidate._id, updatedCandidate);
}


export const deleteCandidate = (id) => {
  return manageCandidate(false, id);
}

// Since updateCandidate and deleteCandidate are programmatically similar, 
// this private function handles both actions to reduce code redundancy
const manageCandidate = (shouldUpdateCandidate, id, updatedCandidate = undefined) => {
  let fetchedCandidate = getCandidate(id);
  if (fetchedCandidate) {
    let candidates = getCandidates();
    candidates = candidates.filter((c) => c._id != id);
    if (shouldUpdateCandidate && updatedCandidate) {
      candidates.push(updatedCandidate);
      candidates.sort((c1, c2) => c1._id - c2._id);
    }
    setCandidates(candidates);
    return true;
  }
  return false;
}

export const addCandidate = (candidate) => {
  let currentCandidates = getCandidates();
  currentCandidates.push(candidate)
  setCandidates(currentCandidates);
}