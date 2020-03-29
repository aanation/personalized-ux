import { EventEmitter } from "./event-emitter"
import { UserObserver, UserActionStats, ACTION_COUNT_CHANGED } from "./observer"

type Options = {
  observer: UserObserver,
  userClasses: string[],
}

export type Handler = (observer: UserObserver) => string  

export const USER_CLASSIFIED_EVENT = "user-classified"

export class Classifier extends EventEmitter {
  private observer: UserObserver
  private userClasses: string[]
  private classifier: Handler = () => this.userClasses[0]

  public currentUserClass: string | null = null 

  constructor({ observer, userClasses }: Options) {
    super()
    this.observer = observer
    this.userClasses = userClasses
    observer.on(ACTION_COUNT_CHANGED, () => this.classify())
  }

  public use(handler: Handler) {
    this.classifier = handler
  }

  private classify() {
    this.currentUserClass = this.classifier(this.observer)
    this.dispatch(USER_CLASSIFIED_EVENT, this.currentUserClass)
  }
}