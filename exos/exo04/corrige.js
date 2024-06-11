function concat(...args) {
  let str = "";

  for (let arg of args) str += arg;

  return str;
}
