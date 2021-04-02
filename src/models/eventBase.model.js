class EventBase {
  name;
  description;
  location;

  startTime;
  endTime;
  isAllDay;

  isRepeating;
  repeatEnd;
  repeatEndNumTimes;
  repeatEveryYear;
  repeatEveryMonth;
  repeatEveryWeek;
  repeatEveryDay;
  repeatMonth;
  repeatDayOfMonth;
  repeatDaysOfWeek;

  constructor(event) {
    if (event) {
      for (let v in event) {
        if (event[v]) {
          this[v] = event[v];
        }
      }
    }
  }

  getRepeatDaysOfWeekArray() {
    if (this.repeatDaysOfWeek) return this.repeatDaysOfWeek.split(", ");
    return [];
  }

  setRepeatDaysOfWeek(array) {
    if (array && array.length != 0) {
      let output = "";
      for (let i = 0; i < array.length; i++) {
        output += array[i];
        if (i != array.length - 1) {
          output += ", ";
        }
      }
      this.repeatDaysOfWeek = output;
    } else {
      this.repeatDaysOfWeek = null;
    }
  }
}

export default EventBase;
