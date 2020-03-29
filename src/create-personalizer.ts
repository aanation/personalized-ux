import { UserObserver, ObserveActionParams } from "./observer"
import { Classifier, Handler } from "./classifier"
import { useRenderer, Renderer } from "./use-renderer"

type Params = {
  actions?: ObserveActionParams[],
  userClasses: string[],
  сlassifier: Handler,
  renderer: Renderer,
}

export const CreatePersonalizer = (params: Params) => {
  const observer = new UserObserver(params.actions)
  const сlassifier = new Classifier({
    observer,
    userClasses: params.userClasses,
  })
  сlassifier.use(params.сlassifier)
  useRenderer(сlassifier, params.renderer)
  return {
    observer,
    сlassifier,
  }
}