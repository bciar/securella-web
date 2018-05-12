var axios = require('axios');

let backendHost;
const hostname = window && window.location && window.location.hostname;

if(hostname === 'app.seon.network') {
  backendHost = 'https://api.seon.network';
} else if(hostname === 'app.staging.seon.network') {
  backendHost = 'https://api.staging.seon.network';
} else {
  backendHost = 'http://127.0.0.1:3000';
}

var axiosClient = axios.create({
  baseURL: backendHost
});

export default axiosClient;
