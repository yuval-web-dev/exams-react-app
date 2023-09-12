import { default as forage } from "./localforage.js"


export const clearAll = async () => {
  const result = await forage.dropDb()
  if (result) {
    console.info("clearing all data from local storage indexed DB successful")
    return true
  }
  else {
    console.error("clearing all data from local storage indexed DB failed")
    return false
  }
}