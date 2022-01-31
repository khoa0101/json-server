import { API } from './api.js';
import { dateCalc } from './date_util.js';

const View = (() => {
  const domstr = {
    eventList: '#eventlist-container'
  }

  const render = (element, tmp) => {
    element.innerHTML = tmp; 
  }

  const createTmp = (arr) => {
    let tmp = '';
    arr.forEach(ele => {
      let startDate = dateCalc(ele.startDate);
      let endDate = dateCalc(ele.endDate);
      tmp += `
        <li>
          <input class='input-box' type='text' value='${ele.eventName}' disabled>
          <input class='input-box' type='date' value='${startDate}' disabled>
          <input class='input-box' type='date' value='${endDate}' disabled>
          <span class='action-btns'>
            <button class='buttons' id='${ele.id}'>EDIT</button>
            <button class='buttons' id='${ele.id}'>DELETE</button>
          </span>
        </li>
      `;
    });

    return tmp;
  }

  return {
    domstr,
    render,
    createTmp
  }
})();

const Model = ((api, view) => {
  class Event{
    constructor(eventName, startDate, endDate){
      this.eventName = eventName;
      this.startDate = dateCalc(startDate);
      this.endDate = dateCalc(endDate);
    }
  }

  class State {
    #eventList = [];

    get eventList(){
      return this.#eventList;
    }

    set eventList(newData){
      this.#eventList = newData;

      const ele = document.querySelector(view.domstr.eventList);
      const tmp = view.createTmp(this.#eventList);
      view.render(ele, tmp);
    }
  }

  const getEvents = api.getEvents;
  
  return {
    Event,
    State,
    getEvents
  }
})(API, View);

const Controller = ((model, view) => {
  const state = new model.State();

  const init = () => {
    model.getEvents().then((data) => {
      state.eventList = data;
    })
  }

  const bootstrap = () => {
    init();    
  }

  return { 
    bootstrap 
  };
})(Model, View);

Controller.bootstrap();