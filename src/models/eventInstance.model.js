class EventInstance {
  name;
  description;
  location;
  startTime;
  endTime;
  isAllDay;

  constructor(EventInstance) {
    if (EventInstance) {
      for (let v in EventInstance) {
        if (EventInstance[v]) {
          this[v] = EventInstance[v];
        }
      }
    }
  }
}

export default EventInstance;
