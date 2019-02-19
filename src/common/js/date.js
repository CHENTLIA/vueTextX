export function date (time) {
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let date = time.getDate()
  return year + '-' + addZ(month) + '-' + addZ(date)
}

function addZ (str) {
  str = str < 10 ? '0' + str : str
  return str
}
