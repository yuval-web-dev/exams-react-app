import localforage from "localforage" // https://localforage.github.io/localForage/

import { DB_NAME } from "./consts.js"


const createStore = (storeName) => {
  return localforage.createInstance({
    name: DB_NAME,
    storeName: storeName
  })
}

const setOne = async (storeName, yourKey, object) => {
  try {
    const instance = createStore(storeName)
    const promise = await instance.setItem(yourKey, object)
    return true
  }
  catch (err) {
    console.error(`setting one item failed (${storeName})`, "\n", err)
    return false
  }
}

const setMany = async (storeName, objectsArray, objectKey) => {
  try {
    const instance = createStore(storeName)
    const promises = objectsArray.map(async (object) => {
      const promise = await instance.setItem(object[objectKey], object)
    })
    const allPromises = await Promise.all(promises)
    return true
  }
  catch (err) {
    console.error(`setting many items failed (${storeName})`, "\n", err)
    return false
  }
}

const getOne = async (storeName, itemKey) => {
  try {
    const instance = createStore(storeName)
    const item = await instance.getItem(itemKey)
    return item
  }
  catch (err) {
    console.error(`getting one item failed (${storeName})`, "\n", err)
    return null
  }
}

const getMany = async (storeName) => {
  try {
    const instance = createStore(storeName)
    const keys = await instance.keys()
    const items = []
    const promises = keys.map(async (key) => {
      const item = await instance.getItem(key)
      items.push(item)
    })
    const allPromises = await Promise.all(promises)
    return items
  }
  catch (err) {
    console.error(`getting many items failed (${storeName})`, "\n", err)
    return false
  }
}

const removeOne = async (storeName, itemKey) => {
  try {
    const instance = createStore(storeName)
    const promise = await instance.removeItem(itemKey)
    return true
  }
  catch (err) {
    console.error(`removing one item failed (${storeName})`, "\n", err)
    return false
  }
}

const removeMany = async (storeName, keys) => {
  try {
    const instance = createStore(storeName);
    const promises = keys.map(async (key) => {
      const promise = await instance.removeItem(key)
      return promise
    })
    const allPromises = await Promise.all(promises)
    return true
  }
  catch (err) {
    console.error(`removing many items failed (${storeName})`, "\n", err)
    return false
  }
}

const dropStore = async (storeName) => {
  try {
    const promise = await localforage.dropInstance({
      name: DB_NAME,
      storeName: storeName,
    })
    return true
  }
  catch (err) {
    console.error(`dropping store failed (${storeName})`, "\n", err)
    return false
  }
}

const dropDb = async () => {
  try {
    const promise = await localforage.dropInstance({ name: DB_NAME })
    return true
  }
  catch (err) {
    console.error(`dropping database failed (${DB_NAME})`, "\n", err)
    return false
  }
}


const forageWrappers = {
  getOne,
  getMany,
  setOne,
  setMany,
  removeOne,
  removeMany,
  dropDb,
  dropStore
}
export default forageWrappers