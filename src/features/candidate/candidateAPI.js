/*
  A dummy file mimicking an API call. It's really only used to create an initial load of candidates.
  In a real application, a headless CMS could be a good alternative.
*/

import { Candidate, RECRUITMENT_STEPS } from "./candidateModel";

const dummyNames = [
  "Renata",  "Stephany",  "Leonardo",  "Maison",  "Estelle",  "Maverick",  "Santino",  "Bernie",  "Kristina",  "Gengar",  "Zack",  "Ayden",  "Kaiya",  "Sahara",  "Caden",  "Jubilee",  "Klas",  "Adelaide",  "Anna",  "Elon",  "Donald",  "Blair",  "Conner",  "Johnnie",  "Jane",  "Emelia",  "Amaterasu",  "Genesis",  "Vladimir",  "Flynn",  "Makoto",  "Lord",  "Jayden",  "Eric",  "Kaedyn",  "Ares",  "Leroy",  "Aidan",  "Leslie",  "Amazing",  "Snow",  "Bran",  "Barron",  "Flynn",  "Guinevere",  "Napoleon",  "Eva",  "Lydia",  "Marcelo",  "Tiana",  "Gisselle",  "Chayse",  "Monsieur",  "Bryanna",  "Breckin",  "Tegan",  "Lizbeth",  "Emmitt",  "Hana",  "Viktor",  "Tom",  "Arnold",  "Joakim",  "Nikole",  "Senior",  "Junior",  "Shiba",  "Kerrigan",  "Emmie",  "Brendon",  "Quixote",  "Fabiola",  "Thomas",  "Hamilton",  "Maylee",  "Washington",  "Einstein", "Tesla", "Nullington", "Emperor",  "Gino",  "Fabian",  "Josh",  "Joseph",  "Jackson",  "Bryan",  "Celine",  "Emanuel",  "Izaac",  "Judy",  "Alexander",  "Queen",  "Anthony",  "David",  "Quinton",  "Ahmir",  "Emma",  "Oakley",  "Harley",  "Carsyn",  "Presley",  "Sullivan",  "Elvis", "Vincent", "Arcanine", "Amaterasu", "Akechi", "Soran", "Caroline", "Judy", "Alan", "Geralt", "Mario", "Luffy", "Crocodile", "Doflamingo", "Tracer", "Doge", "DeWitt", "Ellie"
];

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