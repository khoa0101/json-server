export const API = (() => {
  const baseurl = 'http://localhost:3000';
  const path = 'events';

  const getEvents = () => 
    fetch([baseurl, path].join('/')).then((response) => response.json());

  const addEvent = (event) => 
    fetch([baseurl, path].join('/'), {
      method: "POST",
      body: JSON.stringify(event),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((response) => response.json()); 

  const deleteEvent = (id) => 
    fetch([baseurl, path, id].join('/'), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
    }).then((response) => response.json());
    
  return {
    getEvents,
    addEvent,
    deleteEvent,
  }
})();