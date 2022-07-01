import axios from 'axios';

// Map for localStorage keys
const LOCALSTORAGE_KEYS = {
  accessToken: 'spotify_access_token',
  refreshToken: 'spotify_refresh_token',
  expireTime: 'spotify_token_expire_time',
  timestamp: 'spotify_token_timestamp',
};

// Map to retrieve localStorage values
const LOCALSTORAGE_VALUES = {
  accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
  timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};

/**
 * Clear all localStorage items we've set and reload page
 * @returns {void}
 */
export const logout = () => {
  // Clear all localStorage items
  for (const property in LOCALSTORAGE_KEYS) {
    window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
  }
  // Navigate to homepage
  window.location = window.location.origin;
};

/**
 * Checks if amount of time elapse btwn timestamp in localStorage and now
 * is greater than expiration time of 3600 secs
 * @returns {boolean} whether or not access token in localStorage has expired
 */
const hasTokenExpired = () => {
  const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;
  if (!accessToken || !timestamp) {
    return false;
  }
  const millisecondsElapsed = Date.now() - Number(timestamp);
  return (millisecondsElapsed / 1000) > Number(expireTime);
}

/**
 * Use refresh token in localStorage to hit /refresh_token endpoint
 * in Node app, then update values in localStorage with data from response
 * @returns {void}
 */
const refreshToken = async () => {
  try {
    // Log out if there's no refresh token stored or there's a reload infinite loop
    if (!LOCALSTORAGE_VALUES.refreshToken ||
      LOCALSTORAGE_VALUES.refreshToken === 'undefined' ||
      (Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000) < 1000
      ) {
        console.error('No refresh token available');
        logout();
      }

      // Use `/refresh_token` endpoint from Node app
      const { data } = await axios.get(`/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`);

      // Update localStoragetge values
      window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);
      window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

      // Reload page for localStorage updates to be reflected
      window.location.reload();

  } catch (e) {
    console.error(e);
  }
};

/**
 * Retrieves Spotify access token from localStorage or URL query params
 * @returns {string} A Spotify access token
 */
const getAccessToken = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const queryParams = {
    [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
    [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
    [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
  };
  const hasError = urlParams.get('error');

  // If there's an error OR token in localStorage has expired, refresh token
  if (hasError || hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
    refreshToken();
  }

  // If there's a valid access token in localStorage, use that
  if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
    return LOCALSTORAGE_VALUES.accessToken;
  }

  // If there's a token in URL query params, user is logging in for the first time
  if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
    // Store query params in localStorage
    for (const property in queryParams) {
      window.localStorage.setItem(property, queryParams[property]);
    }
    // Set timestamp
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
    // Return access token from query params
    return queryParams[LOCALSTORAGE_KEYS.accessToken];
  }

  // We should never get here
  return false;
};

export const accessToken = getAccessToken();

/**
 * Axios global request headers
 * https://gihub.com/axios/axios#global-axios-defaults
 */
axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';

/**
 * Get current user's profile
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-current-users-profile
 * @returns {Promise}
 * Since we set the base URL globally, the URL we use for our axios
 * request only needs to be /me, not https://api.spotify.com/v1/me
 */
export const getCurrentUserProfile = () => axios.get('/me');

/**
* Get current user's top artists
* https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-top-artists-and-tracks
* @returns {Promise}
*/
export const getTopArtists = (time_range = 'medium_term') => {
  return axios.get(`/me/top/artists?time_range=${time_range}`);
};

/**
* Get current user's top tracks
* https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-top-artists-and-tracks
* @returns {Promise}
*/
export const getTopTracks = (time_range = 'medium_term') => {
  return axios.get(`/me/top/tracks?time_range=${time_range}`);
};

export const getTopGenre = async () => {
  const topArtists = await getTopArtists();
  
  let genreDict = {};

  const artistsList = topArtists.data.items;

  artistsList.forEach(artist => {
    artist.genres.forEach(genre => {
      if (genre in genreDict) {
        genreDict[genre] += 1;
      } else {
        genreDict[genre] = 1;
      }
    })
  })
  const maxGenre = Object.entries(genreDict).sort((x, y) => y[1] - x[1])[0][0];
  return maxGenre;
}

