import { assert } from "chai"
import sinon from 'sinon'
import { EventEmitter } from "./event-emitter"

describe('EventEmitter', () => {
  it('subscribe', () => {
    const eventName = "some-event"
    const emitter = new EventEmitter()
    const handler = sinon.fake()
    emitter.on(eventName, handler)
    emitter.dispatch(eventName)
    assert(handler.called, "event handler must be called")
  })

  it("unsubscribe", () => {
    const eventName = "some-event"
    const emitter = new EventEmitter()
    const handler = sinon.fake()
    emitter.on(eventName, handler)
    emitter.dispatch(eventName)
    emitter.off(eventName, handler)
    assert(handler.callCount === 1, "handler should be called only once")
  })

  it("duplicate subscription", () => {
    const eventName = "some-event"
    const emitter = new EventEmitter()
    const handler = sinon.fake()
    emitter.on(eventName, handler)
    emitter.on(eventName, handler)
    emitter.dispatch(eventName)
    emitter.off(eventName, handler)
    emitter.dispatch(eventName)
    assert(handler.callCount === 1, "handler should be called only once")
  })

  it("unwatch", () => {
    const eventName = "some-event"
    const emitter = new EventEmitter()
    const handler = sinon.fake()
    const unwatch = emitter.on(eventName, handler)
    unwatch()
    emitter.dispatch(eventName)
    assert(!handler.called, "handler should not be called")
  })
})