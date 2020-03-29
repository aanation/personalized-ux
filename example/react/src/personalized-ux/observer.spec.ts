import { assert } from "chai"
import jsdom from "jsdom"
import sinon from 'sinon'
import { UserObserver, ACTION_COUNT_CHANGED } from "./observer"

const { JSDOM } = jsdom

const clickElement = (dom: jsdom.JSDOM, el: HTMLElement) => {
  const evt = dom.window.document.createEvent("HTMLEvents")
  evt.initEvent("click", false, true)
  el.dispatchEvent(evt)
}

const randomInteger = (min: number, max: number) => {
  let rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

describe('Observer', () => {
  const plainHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Test</title>
      </head>
      <body>
        <div>
          <button class="btn" id="first">Click me!</button>
        </div>
      </body>
    </html>
  `
  let dom = new JSDOM(plainHtml)

  beforeEach(() => {
    dom = new JSDOM(plainHtml);
    (global as any).window = dom.window;
    (global as any).document = dom.window.document;
  })

  

  it('observe click', () => {
    const btn = dom.window.document.getElementById("first")
    if (!btn) {
      return assert.fail("broken dom")
    }
    const btnClicked = sinon.fake()
    const observer = new UserObserver([
      {
        actionName: "user clicked btn",
        triggers: [
          {
            element: '.btn',
            event: 'click'
          }
        ]
      },
    ])
    observer.on(ACTION_COUNT_CHANGED, btnClicked)
    const clicks = randomInteger(5, 100)
    for (let i = 1; i <= clicks; i++) {
      clickElement(dom, btn)
    }
    assert(btnClicked.callCount === clicks, `btnClicked must be called ${clicks} times`)
    assert(observer.getCount("user clicked btn") === clicks, `expect action count is ${clicks}`)
  })

  it("clear observer", () => {
    const btn = dom.window.document.getElementById("first")
    if (!btn) {
      return assert.fail("broken dom")
    }
    const btnClicked = sinon.fake()
    const actionName = "user clicked btn"
    const trigger = {
      element: btn,
      event: 'click'
    }
    const observer = new UserObserver([
      {
        actionName,
        triggers: [trigger]
      },
    ])
    observer.on(ACTION_COUNT_CHANGED, btnClicked)
    const clicks = randomInteger(5, 100)
    for (let i = 1; i <= clicks; i++) {
      clickElement(dom, btn)
    }
    observer.clearObservers(actionName, trigger)
    for (let i = 1; i <= randomInteger(5, 100); i++) {
      clickElement(dom, btn)
    }
    assert(btnClicked.callCount === clicks, `btnClicked must be called ${clicks} times`)
    assert(observer.getCount("user clicked btn") === clicks, `expect action count is ${clicks}`)
  })
})