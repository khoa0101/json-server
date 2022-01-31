export const API = (() => {
  const baseurl = 'http://localhost:3000';
  const path = 'events';

  const getEvents = () => 
    fetch([baseurl, path].join('/')).then((response) => response.json());

  return {
    getEvents
  }
})();