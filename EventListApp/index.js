import { API } from './api.js';
import { dateCalc, dateConvert } from './date_util.js';

const View = (() => {
  const domstr = {
    eventList: '#eventlist-container',
    addButton: '.add-new-btn',
    inputRow: '#input-row',
    submitBtn: '.add-btn',
    closeBtn: '.close-btn',
    deleteBtn: '.delete-btn',
  }

  const render = (element, tmp) => {
    element.innerHTML = tmp; 
  }

  const createTmp = (arr, attr) => {
    let tmp = '';
    arr.forEach(ele => {
      let startDate = dateCalc(ele.startDate);
      let endDate = dateCalc(ele.endDate);
      tmp += `
        <li>
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
    constructor(eventName, startDate, endDate){
      this.eventName = eventName;
      this.startDate = dateConvert(startDate);
      this.endDate = dateConvert(endDate);
    }
  }

  class State {
    #eventList = [];
    #adding = false;
    #editing = false; 

    get eventList(){
      return this.#eventList;
    }

    set eventList(newData){
      this.#eventList = newData;

      const ele = document.querySelector(view.domstr.eventList);
      const tmp = view.createTmp(this.#eventList, 'disabled');
      view.render(ele, tmp);
    }

    get adding(){
      return this.#adding;
    }

    set adding(bool){
      this.#adding = bool;
      
      const ele = document.querySelector(view.domstr.eventList);
      const tmp = view.createTmp(this.#eventList, 'disabled') + (this.#adding ? view.createInputRow() : '');
      view.render(ele, tmp);
    }
  }

  const getEvents = api.getEvents;
  const addEvent = api.addEvent;
  const deleteEvent = api.deleteEvent;
  
  return {
    Event,
    State,
    getEvents,
    addEvent,
    deleteEvent
  }
})(API, View);

const Controller = ((model, view) => {
  const state = new model.State();
 
  const addButtonEvent = () => {
    const addButton = document.querySelector(view.domstr.addButton);

    addButton.addEventListener('click', (e) => {
      state.adding = true;
      const submitBtn = document.querySelector(view.domstr.submitBtn);
      const closeBtn = document.querySelector(view.domstr.closeBtn);
      const form = document.forms.add;
  
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const event = new model.Event(
          form.elements.eventName.value, 
          form.elements.startDate.value,
          form.elements.endDate.value
        );
        model.addEvent(event).then((newEvent) => {
          state.eventList = [...state.eventList, newEvent];
        });
        state.adding = false;
      }), 

      closeBtn.addEventListener('click', (e) => {
        state.adding = false;
      })
    })
  }

  const deleteEvent = () => {
    const deleteBtns = document.querySelectorAll(view.domstr.deleteBtn);

    deleteBtns.forEach((ele) => 
      ele.addEventListener("click", (e) => {
      console.log('click');
      if (e.target.id !== '') {
        state.eventList = state.eventList.filter((event) => {
        return +event.id !== +e.target.id;
      })};
      model.deleteEvent(e.target.id);
    }))
  };

  const init = () => {
    model.getEvents().then((data) => {
      state.eventList = data;
    }).then(deleteEvent);
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