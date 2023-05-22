const moment = require('moment');
require('moment-duration-format');

function calculateAge(dateOfBirth) {
  const now = moment();
  const birthDate = moment(dateOfBirth);
  const duration = moment.duration(now.diff(birthDate));
  const years = duration.years();
  return years;
}
module.exports = calculateAge;
// // Example usage
// const dateOfBirth = '1990-05-15';
// const age = calculateAge(dateOfBirth);
// console.log(`Age: ${age}`);
