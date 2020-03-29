type EventHadler<P = any> = (p: P) => any

type Event = {
  eventName: string,
  handlers: EventHadler[],
}

/* Simple EventEmitter */
export class EventEmitter {
  private events: Event[] = []

  private createUnwatcher<P = any>(eventName: string, handler: EventHadler<P>) {
    return () => {
      for (let i = 0; i < this.events.length; i++) {
        const event = this.events[i]
        event.handlers = event.handlers.filter(existingHandler => existingHandler !== handler)
        if (event.handlers.length) continue
        this.events.splice(i, 1)
        i--;
      }
    }
  }

  public on<P = any>(eventName: string, handler: EventHadler<P>) {
    const unwatch = this.createUnwatcher<P>(eventName, handler)

    const existingEvent = this.events.find(found => found.eventName === eventName)
    if (existingEvent && existingEvent.handlers.includes(handler)) {
      return unwatch
    } else if (existingEvent) {
      existingEvent.handlers.push(handler)
    } else {
      this.events.push({ eventName, handlers: [handler] })
    }
    return unwatch
  }
  
  public off<P = any>(eventName: string, handler: EventHadler<P>) {
    const unwatch = this.createUnwatcher(eventName, handler)
    unwatch()
  }

  public dispatch<P = any>(eventName: string, payload?: P) {
    const event = this.events.find(event => event.eventName === eventName)
    if (event) {
      for (const handler of event.handlers) {
        handler(payload)
      } 
    }
  }
}