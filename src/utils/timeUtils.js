export function getFormattedDate(time) {
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const created = new Date(time);
  return `${month[created.getUTCMonth()]} ${created.getUTCDate()}-${created.getUTCHours()}:${created.getUTCMinutes()}`;
}

export function getCurrentMonth() {
  const monthNumber = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const date = new Date();
  return monthNumber[date.getUTCMonth()];
}
