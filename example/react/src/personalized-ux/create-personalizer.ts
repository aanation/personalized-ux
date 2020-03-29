import { UserObserver, ObserveActionParams } from "./observer"
import { Classifier, Handler } from "./classifier"
import { useRenderer, Renderer } from "./use-renderer"

type Params = {
  actions?: ObserveActionParams[],
  userClasses: string[],
  defaultClass: string,
  сlassifier: Handler,
  renderer: Renderer,
}

export const CreatePersonalizer = (params: Params) => {
  const observer = new UserObserver(params.actions)
  const сlassifier = new Classifier({
    observer,
    defaultClass: params.defaultClass,
    userClasses: params.userClasses,
  })
  сlassifier.use(params.сlassifier)
  useRenderer(сlassifier, params.renderer)
  return {
    observer,
    сlassifier,
  }
}