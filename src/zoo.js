/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const { species, employees, prices, hours } = require('./data');

const getSpeciesByIds = (...ids) => species.filter(({ id }) => ids.includes((id))).map(({ name }) => name);

const getAnimalsOlderThan = (animal, age) => species.find(({ name }) => animal === name).residents.every(({ age: years }) => age <= years);

const getEmployeeByName = (employeeName) => (!employeeName ? [] : employees.find(({ firstName, lastName }) => employeeName === firstName || employeeName === lastName));

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = (id) => employees.some(({ managers }) => managers.includes((id)));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => employees.push(createEmployee({ id, firstName, lastName }, { managers, responsibleFor }));

const countAnimals = (specie) => {
  const allSpecies = species.reduce((acc, { name, residents }) => ({ ...acc, [name]: residents.length }), {});
  return specie ? allSpecies[specie] : allSpecies;
};

const calculateEntry = ({ Adult = 0, Child = 0, Senior = 0 } = {}) => ((Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior)).toFixed(2);

const validateParameters = ({ sex, sorted }, residents) => {
  let residentNames = residents.map((resident) => resident.name);

  if (sex) {
    residentNames = residents.filter((resident) => resident.sex === sex).map((resident) => resident.name);
  }

  if (sorted) {
    residentNames = residentNames.sort();
  }
  return residentNames;
};

const getAnimalMap = ({ includeNames, sorted, sex } = {}) => {
  species.reduce((acc, { location, name, residents }) => {
    acc[location] = acc[location] || [];

    if (includeNames) {
      const residentNames = validateParameters(residents, { sorted, sex });
      acc[location].push({ [name]: residentNames });
    } else {
      acc[location].push(name);
    }

    return acc;
  }, {});
};

const getSchedule = (dayName) => {
  const schedule = Object.entries(hours).reduce((acc, [day, { open, close }]) => {
    acc[day] = day === 'Monday'
      ? acc[day] = 'CLOSED'
      : acc[day] = `Open from ${open}am until ${close}pm`;

    return acc;
  }, {});

  if (dayName) {
    const foundDay = Object.entries(schedule).find((day) => day.includes(dayName));
    return foundDay ? { [foundDay[0]]: foundDay[1] } : {};
  }

  return schedule;
};

// const getOldestFromFirstSpecies = (employeeId) => {
//   const attribution = employees.find((employee) => employee.id === employeeId).responsibleFor[0];
//   const residents = species.find(({ id }) => id === attribution).residents;
//   const oldestResident = residents.reduce((acc, { age }) => {
//     acc.age < age
//       ? acc.age
//       : acc.age = age;
//   })
//   return residents;
// };

// console.log(getOldestFromFirstSpecies('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));

function increasePrices(percentage) {
  // seu código aqui
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  // getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
