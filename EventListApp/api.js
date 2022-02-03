export const API = (() => {
  const baseurl = 'http://localhost:3000';
  const path = 'events';

  const getEvents = () => 
    fetch([baseurl, path].join('/')).then((response) => response.json());

  const getEvent = (eventId) => 
    fetch([baseurl, path, eventId].join('/')).then((response) => response.json());

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

  const editEvent = (event) => 
    fetch([baseurl, path, event.id].join('/'), {
      method: 'PUT',
      body: JSON.stringify(event),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((response) => response.json);

  return {
    getEvents,
    getEvent,
    addEvent,
    deleteEvent,
    editEvent
  }
})();