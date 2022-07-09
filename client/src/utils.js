/**
 * Higher-order function for async/await error handling
 * @param {function} fn an async function
 * @returns {function}
 */
export const catchErrors = fn => {
  return function(...args) {
    return fn(...args).catch((err) => {
      console.error(err);
    })
  }
}

/**
 * 
 * @returns {String} current date in MM/DD/YYYY format
 */
export const getCurrentDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return mm + '/' + dd + '/' + yyyy;
}

/**
 * Gets last name given full name
 * @param {String} name 
 * @returns {String} empty string if name is 1 word; else, last word in name
 */
export const getLastName = (name) => {
  // return "ds";
  const words = name.split(" ");

  // If name is 1 word, return empty string
  if (words.length <= 1) {
    return "";
  }
  // Else, return last word
  return words[words.length - 1];
}

/**
 * Returns first and middle name (everything but the last word)
 * @param {String} name 
 * @returns {String} name, but without the last word
 */
export const getFirstName = (name) => {
  const words = name.split(" ");
  words.pop();
  return words.join(" ");
}