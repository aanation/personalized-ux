import { CreatePersonalizer } from "./create-personalizer"

type UserGroup = "firstGroup" | "secondGroup"

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
  uiChnaged?: (group: UserGroup) => void,
}

const renderCssVars = (cssVars: cssVarsKV) => {
  const root = document.documentElement
  Object.getOwnPropertyNames(cssVars).forEach(varName => {
    const value = cssVars[varName]
    root.style.setProperty(`--${varName}`, value.toString());
  })
}

export const UIPersonalizer = ({ firstGroup, secondGroup, uiChnaged }: InitParams) => {
  const cssVars = {
    "firstGroup": firstGroup.theme,
    "secondGroup": secondGroup.theme,
  }
  const { observer } = CreatePersonalizer({
    actions: [
      { actionName: 'firstGroup' },
      { actionName: 'secondGroup' },
    ],
    defaultClass: 'firstGroup',
    userClasses: ['firstGroup', 'secondGroup'],
    сlassifier: (observer, currentClass) => {
      const firstGroupCount = observer.getCount("firstGroup")
      const secondGroupCount = observer.getCount("secondGroup")
      if (!firstGroupCount && !secondGroupCount) {
        return currentClass || "firstGroup"
      }
      if (firstGroupCount > 1.5 * secondGroupCount) {
        return "firstGroup"
      }
      if (secondGroupCount > 1.5 * firstGroupCount) {
        return "secondGroup"
      }
      return currentClass || "firstGroup"
    },
    renderer: (group) => {
      const currentCssVars = cssVars[group as UserGroup]
      renderCssVars(currentCssVars)
      if (uiChnaged) uiChnaged(group as UserGroup)
    },
  })

  return {
    observer,
    observe: () => {
      observer.addObserver('firstGroup', {
        element: firstGroup.triggerSelector,
        event: 'click',
      })
      observer.addObserver('secondGroup', {
        element: secondGroup.triggerSelector,
        event: 'click',
      })
    }
  }
}

(window as any).UIPersonalizer = UIPersonalizer

