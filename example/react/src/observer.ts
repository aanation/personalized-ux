import { UIPersonalizer } from "./personalized-ux"

const personalizer = UIPersonalizer({
  firstGroup: {
    triggerSelector: '.targer_group_1',
    theme: {
      background: '#34495e',
      'text-color': '#fff',
      'base-font-size': '16px',
    },
  },
  secondGroup: {
    triggerSelector: '.targer_group_2',
    theme: {
      background: '#fff',
      'text-color': '#000',
      'base-font-size': '14px',
    },
  },
})

export const observe = personalizer.observe
export const observer = personalizer.observer
