import { API } from './api.js';
import { dateCalc, dateConvert } from './date_util.js';

// const View = (() => {
//   const domstr = {
//     eventList: '#eventlist-container',
//     addButton: '.add-new-btn',
//     inputRow: '#input-row',
//     submitBtn: '.add-btn',
//     closeBtn: '.close-btn',
//     deleteBtn: '.delete-btn',
//     editBtn: '.edit-btn',
//     editli: '.event-',
//     saveBtn: '.save-btn',
//   }

//   const render = (element, tmp) => {
//     element.innerHTML = tmp;
//   }

//   const createTmp = (arr, attr) => {
//     let tmp = '';
//     arr.forEach(ele => {
//       let startDate = dateCalc(ele.startDate);
//       let endDate = dateCalc(ele.endDate);
//       tmp += `
//         <li class='event-${ele.id}'>
//           <input class='input-box' type='text' value='${ele.eventName}' ${attr}>
//           <input class='input-box' type='date' value='${startDate}' ${attr}>
//           <input class='input-box' type='date' value='${endDate}' ${attr}>
//           <span class='action-btns'>
//             <button class='buttons edit-btn' id='${ele.id}'>EDIT</button>
//             <button class='buttons delete-btn' id='${ele.id}'>DELETE</button>
//           </span>
//         </li>
//       `;
//     });
//     return tmp;
//   }

//   const createInputRow = () => {
//       return `
//         <form name='add'>
//           <li>
//             <input name='eventName' class='input-box' type='text'>
//             <input name='startDate' class='input-box' type='date'>
//             <input name='endDate' class='input-box' type='date'>
//             <span class='action-btns'>
//               <input type='submit' class='buttons add-btn' value="ADD" />
//               <input type='button' class='buttons close-btn' value="CLOSE" />
//             </span>
//           </li>
//         </form>
//       `;
//   }

//   return {
//     domstr,
//     render,
//     createTmp,
//     createInputRow,
//   }
// })();

// const Model = ((api, view) => {
//   class Event{
//     constructor(eventName, startDate, endDate, id = null){
//       this.eventName = eventName;
//       this.startDate = dateConvert(startDate);
//       this.endDate = dateConvert(endDate);
//       this.id = id;
//     }
//   }

//   class State {
//     #eventList = [];
//     #adding = false;

//     get eventList(){
//       return this.#eventList;
//     }

//     set eventList(newData){
//       this.#eventList = newData;

//       const ele = document.querySelector(view.domstr.eventList);
//       const tmp = view.createTmp(this.#eventList, 'disabled');
//       view.render(ele, tmp);
//     }

//     get adding(){
//       return this.#adding;
//     }

//     set adding(bool){
//       this.#adding = bool;
      
//       const ele = document.querySelector(view.domstr.eventList);
//       const tmp = view.createTmp(this.#eventList, 'disabled') + (this.#adding ? view.createInputRow() : '');
//       view.render(ele, tmp);
//     }
//   }

//   const getEvents = api.getEvents;
//   const addEvent = api.addEvent;
//   const deleteEvent = api.deleteEvent;
//   const editEvent = api.editEvent; 
//   const getEvent = api.getEvent;
  
//   return {
//     Event,
//     State,
//     getEvents,
//     getEvent,
//     addEvent,
//     deleteEvent,
//     editEvent
//   }
// })(API, View);

// const Controller = ((model, view) => {
//   const state = new model.State();
 
//   const addButtonEvent = () => {
//     const addButton = document.querySelector(view.domstr.addButton);

//     addButton.addEventListener('click', (e) => {
//       state.adding = true;
//       const submitBtn = document.querySelector(view.domstr.submitBtn);
//       const closeBtn = document.querySelector(view.domstr.closeBtn);
//       const form = document.forms.add;
  
//       submitBtn.addEventListener('click', (e) => {
//         e.preventDefault();
        
//         const event = new model.Event(
//           form.elements.eventName.value, 
//           form.elements.startDate.value,
//           form.elements.endDate.value
//         );
//         model.addEvent(event).then((newEvent) => {
//           state.eventList = [...state.eventList, newEvent];
//         });
//         state.adding = false;
//       }), 

//       closeBtn.addEventListener('click', (e) => {
//         state.adding = false;
//       })
//     })
//   }

//   const deleteEvent = () => {
//     const deleteBtns = document.querySelectorAll(view.domstr.deleteBtn);

//     deleteBtns.forEach((ele) => 
//       ele.addEventListener("click", (e) => {
//       console.log('click');
//       if (e.target.id !== '') {
//         state.eventList = state.eventList.filter((event) => {
//         return +event.id !== +e.target.id;
//       })};
//       model.deleteEvent(e.target.id);
//     }))
//   };

//   const editEvent = () => {
//     const editBtns = document.querySelectorAll(view.domstr.editBtn);

//     editBtns.forEach((ele) => 
//       ele.addEventListener("click", () => {
//         const editEle = document.querySelector(view.domstr.editli + ele.id);
//         model.getEvent(ele.id).then((event) => {
//           const tmp = `
//             <input class='input-box' id='name-${event.id}' type='text' value='${event.eventName}'>
//             <input class='input-box' id='start-${event.id}' type='date' value='${dateCalc(event.startDate)}'>
//             <input class='input-box' id='end-${event.id}' type='date' value='${dateCalc(event.endDate)}'>
//             <span class='action-btns'>
//               <button class='buttons save-btn' id='${event.id}'>SAVE</button>
//               <button class='buttons close-btn' id='${event.id}'>CLOSE</button>
//             </span>
//           `;
//           view.render(editEle, tmp);
          
//           const saveBtn = document.querySelector(view.domstr.saveBtn);
//           saveBtn.addEventListener('click', (e) => {
//             e.preventDefault();
//             const eventName = document.querySelector(`#name-${event.id}`);
//             const eventStart = document.querySelector(`#start-${event.id}`);
//             const eventEnd = document.querySelector(`#end-${event.id}`);

//             const newEvent = new model.Event(
//               eventName.value,
//               eventStart.value,
//               eventEnd.value,
//               event.id
//             );

//             model.editEvent(newEvent);
//           });

//           const closeBtn = document.querySelector(view.domstr.closeBtn);
//           closeBtn.addEventListener('click', (e) => {
//             state.eventList = state.eventList ;
//             editEvent();
//           })
//         });
//       }));
//   }

//   const init = () => {
//     model.getEvents().then((data) => {
//       state.eventList = data;
//     }).then(deleteEvent).then(editEvent);
//   }

//   const bootstrap = () => {
//     init();
//     addButtonEvent();
//   }

//   return { 
//     bootstrap 
//   };
// })(Model, View);

const View = (() => {
  const domstr = {
    eventList: '#eventlist-container',
    addButton: '.add-new-btn',
    inputRow: '#input-row',
    submitBtn: '.add-btn',
    closeBtn: '.close-btn',
    deleteBtn: '.delete-btn',
    editBtn: '.edit-btn',
    editli: '.event-',
    saveBtn: '.save-btn',
  }

  const render = (element, tmp) => {
    $(element).html(tmp);
  }

  const createTmp = (arr, attr) => {
    let tmp = '';
    arr.forEach(ele => {
      let startDate = dateCalc(ele.startDate);
      let endDate = dateCalc(ele.endDate);
      tmp += `
        <li class='event-${ele.id}'>
          <input class='input-box' type='text' value='${ele.eventName}' ${attr}>
          <input class='input-box' type='date' value='${startDate}' ${attr}>
          <input class='input-box' type='date' value='${endDate}' ${attr}>
          <span class='action-btns'>
            <button class='buttons edit-btn' id='${ele.id}'>EDIT</button>
            <button class='buttons delete-btn' id='${ele.id}'>DELETE</button>
          </span>
        </li>
      `;
    });
    return tmp;
  }

  const createInputRow = () => {
      return `
        <form name='add'>
          <li>
            <input name='eventName' class='input-box' type='text'>
            <input name='startDate' class='input-box' type='date'>
            <input name='endDate' class='input-box' type='date'>
            <span class='action-btns'>
              <input type='submit' class='buttons add-btn' value="ADD" />
              <input type='button' class='buttons close-btn' value="CLOSE" />
            </span>
          </li>
        </form>
      `;
  }

  return {
    domstr,
    render,
    createTmp,
    createInputRow,
  }
})();

const Model = ((api, view) => {
  class Event{
    constructor(eventName, startDate, endDate, id = null){
      this.eventName = eventName;
      this.startDate = dateConvert(startDate);
      this.endDate = dateConvert(endDate);
      this.id = id;
    }
  }

  class State {
    #eventList = [];
    #adding = false;

    get eventList(){
      return this.#eventList;
    }

    set eventList(newData){
      this.#eventList = newData;

      const ele = $(view.domstr.eventList);
      const tmp = view.createTmp(this.#eventList, 'disabled');
      view.render(ele, tmp);
    }

    get adding(){
      return this.#adding;
    }

    set adding(bool){
      this.#adding = bool;
      
      const ele = $(view.domstr.eventList);
      const tmp = view.createTmp(this.#eventList, 'disabled') + (this.#adding ? view.createInputRow() : '');
      view.render(ele, tmp);
    }
  }

  const getEvents = api.getEvents;
  const addEvent = api.addEvent;
  const deleteEvent = api.deleteEvent;
  const editEvent = api.editEvent; 
  const getEvent = api.getEvent;
  
  return {
    Event,
    State,
    getEvents,
    getEvent,
    addEvent,
    deleteEvent,
    editEvent
  }
})(API, View);

const Controller = ((model, view) => {
  const state = new model.State();
 
  const addButtonEvent = () => {
    const addButton = $(view.domstr.addButton);

    addButton.on('click', (e) => {
      state.adding = true;
      const submitBtn = $(view.domstr.submitBtn);
      const closeBtn = $(view.domstr.closeBtn);

      submitBtn.on('click', (e) => {
        e.preventDefault();
        
        const event = new model.Event(
          $('input[name="eventName"]').val(), 
          $('input[name="startDate"]').val(),
          $('input[name="endDate"]').val()
        );

        model.addEvent(event).then((newEvent) => {
          state.eventList = [...state.eventList, newEvent];
        });
        state.adding = false;
      }), 

      closeBtn.on('click', (e) => {
        state.adding = false;
      })
    })
  }

  const deleteEvent = () => {
    const deleteBtns = $(view.domstr.deleteBtn);

    deleteBtns.on("click", (e) => {
      if (e.target.id !== '') {
        state.eventList = state.eventList.filter((event) => {
        return +event.id !== +e.target.id;
      })};
      model.deleteEvent(e.target.id);
    })
  };

  const editEvent = () => {
    const editBtns = $(view.domstr.editBtn);

    editBtns.on("click", (e) => {
        const editEle = $(view.domstr.editli + e.target.id);
        model.getEvent(e.target.id).then((event) => {
          const tmp = `
            <input class='input-box' id='name-${event.id}' type='text' value='${event.eventName}'>
            <input class='input-box' id='start-${event.id}' type='date' value='${dateCalc(event.startDate)}'>
            <input class='input-box' id='end-${event.id}' type='date' value='${dateCalc(event.endDate)}'>
            <span class='action-btns'>
              <button class='buttons save-btn' id='${event.id}'>SAVE</button>
              <button class='buttons close-btn' id='${event.id}'>CLOSE</button>
            </span>
          `;
          view.render(editEle, tmp);
          
          const saveBtn = $(view.domstr.saveBtn);
          saveBtn.on('click', (e) => {
            e.preventDefault();
            const eventName = $(`#name-${event.id}`).val();
            const eventStart = $(`#start-${event.id}`).val();
            const eventEnd = $(`#end-${event.id}`).val();

            const newEvent = new model.Event(
              eventName,
              eventStart,
              eventEnd,
              event.id
            );

            model.editEvent(newEvent);
          });

          const closeBtn = $(view.domstr.closeBtn);
          closeBtn.on('click', (e) => {
            state.eventList = state.eventList ;
            editEvent();
          })
        });
      });

  }

  const init = () => {
    model.getEvents().then((data) => {
      state.eventList = data;
    }).then(deleteEvent).then(editEvent);
  }

  const bootstrap = () => {
    init();
    addButtonEvent();
  }

  return { 
    bootstrap 
  };
})(Model, View);

Controller.bootstrap();