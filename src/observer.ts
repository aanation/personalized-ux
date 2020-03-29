import { EventEmitter } from "./event-emitter"

export type Trigger = {
  element: string | Element,
  event: string,
}

export type ObserveActionParams = {
  actionName: string,
  triggers?: Trigger[],
}

type Observer = {
  trigger: Trigger,
  handler: () => void,
}

type UserAction = {
  actionName: string,
  count: number,
  observers: Observer[],
}

export type UserActionStats = {
  actionName: string,
  count: number,
}

export const ACTION_OCCURED_EVENT = "action-occured"
export const ACTION_COUNT_CHANGED = "action-count-changed"


export class UserObserver extends EventEmitter {
  private actions: UserAction[] = []

  constructor(params?: ObserveActionParams[]) {
    super()
    if (params) {
      params.forEach((p) => this.observeAction(p))
    }
    this.on(ACTION_OCCURED_EVENT, (action: string) => this.actionTriggered(action))
  }

  public observeAction(params: ObserveActionParams) {
    const found = this.actions.find(
      existingAction => existingAction.actionName === params.actionName
    )
    if (found) {
      throw new Error("UserObserver: action is already observed!")
    }

    this.actions.push({
      actionName: params.actionName,
      count: 0,
      observers: params.triggers 
        ? params.triggers.map((trigger) => this.createObserver(params.actionName, trigger))
        : []
    })
  }

  public stopActionObserving(actionName: string) {
    this.clearObservers(actionName)
    this.actions = this.actions.filter((action) => action.actionName !== actionName)
  }


  public stopObserving() {
    this.actions.forEach((action) => this.stopActionObserving(action.actionName))
  }

  public addObserver(actionName: string, trigger: Trigger) {
    const action = this.findActionOrFail(actionName)
    action.observers.push(this.createObserver(actionName, trigger))
  }

  public clearObservers(actionName: string, trigger?: Trigger) {
    const action = this.findActionOrFail(actionName)
    for (let i = 0; i < action.observers.length; i++) {
      const observer = action.observers[i]
      if (trigger && !this.areTriggersEqual(observer.trigger, trigger)) continue
      const matchedElems = typeof observer.trigger.element === "string"
        ? document.querySelectorAll(observer.trigger.element)
        : [observer.trigger.element]
      // remove event listeners
      matchedElems.forEach(
        (elem: Element) => elem.removeEventListener(observer.trigger.event, observer.handler)
      )
      action.observers.splice(i, 1)
      i--
    }
  }

  public getCount(actionName: string) {
    const action = this.findActionOrFail(actionName)
    return action.count
  }

  public getStats(): UserActionStats[] {
    return this.actions.map(({ actionName, count }) => ({ actionName, count }))
  }

  public actionTriggered(actionName: string) {
    const action = this.findActionOrFail(actionName)
    action.count += 1
    this.dispatch(ACTION_COUNT_CHANGED, action.count)
  }

  private findActionOrFail(actionName: string): UserAction {
    const action = this.actions.find(
      existingAction => existingAction.actionName === actionName
    )
    if (!action) {
      throw new Error(`UserObserver: action ${actionName} not found!`)
    }
    return action
  }

  private areTriggersEqual(...triggers: Trigger[]) {
    let lastTrigger = triggers[0]
    return triggers.slice(1).every((trigger) => {
      const equal = trigger.element === lastTrigger.element && trigger.event === lastTrigger.event
      lastTrigger = trigger
      return equal
    })
  }

  private createObserver(actionName: string, trigger: Trigger): Observer {
    const handler = () => {
      this.dispatch(ACTION_OCCURED_EVENT, actionName)
    }
    if (typeof trigger.element === "string") {
      const matchedElems = document.querySelectorAll(trigger.element)
      matchedElems.forEach((elem) => {
        elem.addEventListener(trigger.event, handler)
      })
    } else {
      trigger.element.addEventListener(trigger.event, handler)
    }
    return {
      trigger,
      handler,
    }
  }
}