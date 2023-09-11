import localforage from "localforage" // https://localforage.github.io/localForage/


const DB_NAME = "react-app"

const setOne = async (storeName, yourKey, object) => {
  try {
    const instance = createStore(storeName)
    await instance.setItem(yourKey, object)
    console.info(`Setting object to store "${storeName}" successful.`)
  }
  catch (err) {
    console.error(`Setting object to store "${storeName}" failed:`, err)
  }
}

const setMany = async (storeName, objectsArray, objectKey) => {
  try {
    const instance = createStore(storeName)
    const promises = objectsArray.map(async (object) => {
      await instance.setItem(object[objectKey], object)
    })
    await Promise.all(promises)
    console.info(`Setting ${objectsArray.length} objects in store "${storeName}" successful.`)
  }
  catch (err) {
    console.error(`Setting ${objectsArray.length} objects in store "${storeName}" failed:`, err)
  }
}

const getOne = async (storeName, itemKey) => {
  try {
    const instance = createStore(storeName);
    const item = await instance.getItem(itemKey)
    console.info(`Getting item from store "${storeName}" successful.`)
    return item
  }
  catch (err) {
    console.error(`Getting item from store "${storeName}" failed:`, err)
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
    await Promise.all(promises)
    console.info(`Getting items from store "${storeName}" successful (${items.length}).`)
    return items
  }
  catch (err) {
    console.error(`Getting items from store "${storeName}" failed:`, err)
  }
}

const removeOne = async (storeName, itemKey) => {
  try {
    const instance = createStore(storeName)
    await instance.removeItem(itemKey)
    console.info(`Removal of one item from store ${storeName} successful:\n${itemKey}`)
  }
  catch (err) {
    console.error(`Removal of one item from store ${storeName} failed:`, err)
  }
}

const removeMany = async (storeName, keys) => {
  try {
    const instance = createStore(storeName);
    const promises = keys.map(async key => {
      await instance.removeItem(key)
    })
    await Promise.all(promises)
    console.info(`Removal of items from store ${storeName} successful:\n${keys.join(', ')}`)
  }
  catch (err) {
    console.error(`Removal of items from store ${storeName} failed:`, err)
  }
}

const createStore = (storeName) => {
  return localforage.createInstance(
    {
      name: DB_NAME, // Optionally, set your preferred database name
      storeName: storeName,
    }
  )
}

const dropStore = async (storeName) => {
  try {
    // Drop the entire store, including its nested items
    await localforage.dropInstance(
      {
        name: DB_NAME,
        storeName: storeName,
      }
    )
    console.info(`Dropping store "${storeName}" successful.`)
  }
  catch (err) {
    console.error(`Dropping store "${storeName}" failed:`, err)
  }
}


export const localForage = {
  getOne, getMany,
  setOne, setMany,
  removeOne, removeMany,
  dropStore
}