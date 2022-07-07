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

export const setCardBackgroundImage = imageUrl => {
  document.getElementById("backgroundCoverArt2").style.backgroundImage = `url(${imageUrl})`;
  // lol.style.opacity = "0.9";
}