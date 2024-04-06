/* Handles the network between the server and the client */

const isDev = import.meta.env.DEV;

const SERVER_ADDRESS = isDev
  ? import.meta.env.VITE_DEV_SERVER_ADDRESS
  : import.meta.env.VITE_PROD_SERVER_ADDRESS;

export default () => SERVER_ADDRESS; // Temp: replace with server connection logic
