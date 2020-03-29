import { CreatePersonalizer } from "./create-personalizer"

type UserGroup = "firstGroup" | "secondGroup" | "default"

type cssVarsKV = {
  [key: string]: string | number,
}

export type Group = {
  triggerSelector: string,
  theme: cssVarsKV
}
export type InitParams = {
  firstGroup: Group,
  secondGroup: Group,
  defaultTheme: cssVarsKV,
  uiChnaged: (group: UserGroup) => void,
}

const renderCssVars = (cssVars: cssVarsKV) => {
  const root = document.documentElement
  Object.getOwnPropertyNames(cssVars).forEach(varName => {
    const value = cssVars[varName]
    root.style.setProperty(`--${varName}`, value.toString());
  })
}

export const init = ({ defaultTheme, firstGroup, secondGroup, uiChnaged }: InitParams) => {
  const cssVars = {
    "firstGroup": firstGroup.theme,
    "secondGroup": secondGroup.theme,
    "default": defaultTheme,
  }
  const { observer } = CreatePersonalizer({
    actions: [
      { actionName: 'firstGroup' },
      { actionName: 'secondGroup' },
    ],
    userClasses: ['default', 'firstGroup', 'secondGroup'],
    сlassifier: (observer) => {
      const firstGroupCount = observer.getCount("firstGroup")
      const secondGroupCount = observer.getCount("secondGroup")
      if (firstGroupCount > 1.5 * secondGroupCount) {
        return "firstGroup"
      }
      if (secondGroupCount > 1.5 * firstGroupCount) {
        return "secondGroup"
      }
      return "default"
    },
    renderer: (group) => {
      const currentCssVars = cssVars[group as UserGroup]
      renderCssVars(currentCssVars)
      uiChnaged(group as UserGroup)
    },
  })

  return {
    observer,
    observe: () => {
      observer.addObserver("firstGroup", {
        element: firstGroup.triggerSelector,
        event: 'click',
      })
      observer.addObserver("secondGroup", {
        element: secondGroup.triggerSelector,
        event: 'click',
      })
    }
  }
}

(window as any).UIPersonalizer = init

