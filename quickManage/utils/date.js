//获取3个月之前的日期
export function get3MonthBefor() {
  var resultDate, year, month, date, hms;
  var currDate = new Date();
  year = currDate.getFullYear();
  month = currDate.getMonth() + 1;
  date = currDate.getDate();
  hms = currDate.getHours() + ':' + currDate.getMinutes() + ':' + (currDate.getSeconds() < 10 ? '0' + currDate.getSeconds() : currDate.getSeconds());
  switch (month) {
    case 1:
    case 2:
    case 3:
      month += 9;
      year--;
      break;
    default:
      month -= 3;
      break;
  }
  month = (month < 10) ? ('0' + month) : month;
  resultDate = year + '-' + month + '-' + date
  // resultDate = year + '-' + month + '-' + date + ' ' + hms;
  return resultDate;
}

//获取今天的日期
export function getNowDate() {
  var resultDate, year, month, date, hms;
  var currDate = new Date();
  year = currDate.getFullYear();
  month = currDate.getMonth() + 1;
  date = currDate.getDate();
  hms = currDate.getHours() + ':' + currDate.getMinutes() + ':' + (currDate.getSeconds() < 10 ? '0' + currDate.getSeconds() : currDate.getSeconds());
  
  month = (month < 10) ? ('0' + month) : month;
  date = (date < 10) ? ('0' + date) : date;
  resultDate = year + '-' + month + '-' + date
  // resultDate = year + '-' + month + '-' + date + ' ' + hms;
  return resultDate;
}

