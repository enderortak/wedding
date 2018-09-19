import moment from "moment";
moment.locale("tr");
const months = [];
const startOfTheProject = moment("2018-08-01");
const ceremonyDate = moment("2019-09-25");
let iterator = startOfTheProject.clone();
while (ceremonyDate > iterator || iterator.format('M') === ceremonyDate.format('M')) {
  months.push(iterator.format('YYYY-MM-DD')); 
  iterator.add(1,'month');
}
export default months;