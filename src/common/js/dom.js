export function substr (str) {
  var string = str.toString()
  return string.length > 80 ? string.substr(0, 80) + '...' : string
}
