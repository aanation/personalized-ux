import { assert } from "chai"
import jsdom from "jsdom"
import { UserObserver } from "./observer"
import { Classifier } from "./classifier"

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

describe('Classifier', () => {
  const plainHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Test</title>
      </head>
      <body>
        <div>
          <button class="danger-btn" id="danger">Click me!</button>
          <button class="normal-btn" id="normal">Click me!</button>
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

  it('classify', () => {
    const dangerBtn = dom.window.document.getElementById("danger")
    const normalBtn = dom.window.document.getElementById("normal")
    if (!dangerBtn || !normalBtn) {
      return assert.fail("broken dom")
    }
    const observer = new UserObserver([
      {
        actionName: "user clicked danger btn",
        triggers: [
          {
            element: '.danger-btn',
            event: 'click'
          }
        ]
      },
      {
        actionName: "user clicked normal btn",
        triggers: [
          {
            element: '.normal-btn',
            event: 'click'
          }
        ]
      },
    ])
    const classifier = new Classifier({
      observer,
      userClasses: ['dangerUsers', 'normalUsers'],
    })
    classifier.use((observer) => {
      const dangerClicks = observer.getCount("user clicked danger btn")
      const normalClicks = observer.getCount("user clicked normal btn")
      return dangerClicks > normalCLicks ? "dangerUsers" : "normalUsers"
    })

    const dangerClicks = randomInteger(5, 100)
    const normalCLicks = randomInteger(5, 100)
    for (let i = 1; i <= dangerClicks; i++) {
      clickElement(dom, dangerBtn)
    }
    for (let i = 1; i <= normalCLicks; i++) {
      clickElement(dom, normalBtn)
    }

    const expectedClass = dangerClicks > normalCLicks ? "dangerUsers" : "normalUsers"
    assert(expectedClass === classifier.currentUserClass, `expect '${expectedClass}' class`)

  })
})