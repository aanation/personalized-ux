import { Classifier, USER_CLASSIFIED_EVENT } from "./classifier"

export type Renderer = (userClass: string) => void

export const useRenderer = (сlassifier: Classifier, renderer: Renderer) => {
  сlassifier.on(USER_CLASSIFIED_EVENT, renderer)
} 