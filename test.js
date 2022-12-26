let currDate = new Date();
let firstDateMonth = new Date(currDate.getFullYear(), currDate.getMonth(),1);
let prevMonthLastDate = new Date(currDate.getFullYear(), currDate.getMonth(), 0);
let MonthLastDay = new Date(currDate.getFullYear(), currDate.getMonth()+1, 0);

let temp = prevMonthLastDate.getDate();
let prev = [];
for (let i=0; i < firstDateMonth.getDay(); i++) {
  prev.push(temp);
  temp--;
}

prev.sort();

for(let i=1; i<= MonthLastDay.getDate(); i++) {
  prev.push(i)
}

if (prev.length < 43) {
  let remaining = 43 - prev.length
  // console.log(remaining)
  for (let i = 1; i < remaining; i++) {
    prev.push(i)
  }
}

// console.log(prev)

const getDaysInMonth = (year,month) => {
  return new Date(year,month, 0).getDate();
}

const getFirstDateOfMonth = ( year, month ) => {
  return new Date(year,month-1,1);
}

const getLastDateOfMonth = ( year, month ) => {
  return new Date(year,month,0);
}

const getFirstDateOfPrevMonth = ( year, month ) => {
  return new Date(year,month-2,1);
}

const getLastDateOfPrevMonth = ( year, month ) => {
  return new Date(year,month-1,0);
}


const date = new Date();
const currYear = date.getFullYear();
const currMonth = date.getMonth() + 1;

console.log( getDaysInMonth(currYear,currMonth))
console.log( getFirstDateOfMonth(currYear,currMonth))
console.log( getLastDateOfMonth(currYear,currMonth))
console.log( getFirstDateOfPrevMonth(currYear,currMonth))
console.log( getLastDateOfPrevMonth(currYear,currMonth))
