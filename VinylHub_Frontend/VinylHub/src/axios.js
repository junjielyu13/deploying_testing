import axios from "axios";

export default function setupAuthHeaders() {
  const storedHeaders = JSON.parse(localStorage.getItem('axios-headers'));

  // Init axios headers
  if (storedHeaders !== null) {
    axios.defaults.headers.common['access-token'] = storedHeaders['access-token'];
    axios.defaults.headers.common['client']       = storedHeaders['client'];
    axios.defaults.headers.common['expiry']       = storedHeaders['expiry'];
    axios.defaults.headers.common['uid']          = storedHeaders['uid'];
  }

  axios.defaults.transformResponse = (data, headers) => {
    // Set axios headers
    if (headers && headers['access-token']) {
      localStorage.setItem('axios-headers', JSON.stringify({
        'access-token': headers['access-token'],
        'client':       headers['client'],
        'expiry':       headers['expiry'],
        'uid':          headers['uid'],
      }));

      axios.defaults.headers.common['access-token'] = headers['access-token'];
      axios.defaults.headers.common['client']       = headers['client'];
      axios.defaults.headers.common['expiry']       = headers['expiry'];
      axios.defaults.headers.common['uid']          = headers['uid'];
    }

    let returnData;

    try {
      returnData = JSON.parse(data)
    } catch (error) {
      returnData = data;
    }
    
    return returnData;
  }
}