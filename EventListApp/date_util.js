export const dateCalc = (value) => {
  let result = new Date();
  result.setTime(value);
  let year = result.getFullYear();
  let month = result.getMonth() + 1;
  let date = result.getDate();

  month = month < 10 ? '0' + month : date;
  date = date < 10 ? '0' + date : date;

  return `${year}-${month}-${date}`;
}