import localforage from "localforage";



const createOne = async (storeName, object, stringKey) => {
  try {
    const instance = createInstanceForStore(storeName);
    await instance.setItem(stringKey, object);
    console.info(`Saving one object to store "${storeName}" successful.`);
  }
  catch (err) {
    console.error(`Saving one object to store "${storeName}" failed:`, err);
  }
};

const createMany = async (storeName, objectsArray, objectKey) => {
  try {
    const instance = createInstanceForStore(storeName);

    await Promise.all(
      objectsArray.map(async (object) => {
        await instance.setItem(object[objectKey], object);
      })
    );

    console.info(`Saving ${objectsArray.length} objects to store "${storeName}" successful.`);
  } catch (err) {
    console.error(`Saving ${objectsArray.length} objects to store "${storeName}" failed:`, err);
  }
};

const readOne = async (storeName, itemKey) => {
  try {
    const instance = createInstanceForStore(storeName);
    const val = await instance.getItem(itemKey);
    const item = JSON.parse(val);
    console.info(`Reading of one item from store "${storeName}" successful`);
    return item;
  } catch (err) {
    console.error(`Reading of one item from store "${storeName}" failed:\n`, err);
  }
};

const readMany = async (storeName) => {
  try {
    const storageItems = [];
    const instance = createInstanceForStore(storeName);

    const keys = await instance.keys();
    const readPromises = keys.map(async (key) => {
      const val = await instance.getItem(key);
      storageItems.push(JSON.parse(val));
    });

    await Promise.all(readPromises);

    console.info(`Reading items from store "${storeName}" successful (${storageItems.length})`);
    return storageItems;
  } catch (err) {
    console.error(`Reading items from store "${storeName}" failed:`, err);
  }
};

const updateOne = async (storeName, item, key) => {
  try {
    const instance = createInstanceForStore(storeName);
    await instance.setItem(item[key], JSON.stringify(item));
    console.info(`Updating one item in store ${storeName} successful`);
  } catch (err) {
    console.error(`Updating one item in store ${storeName} failed:\n`, err);
  }
};

const updateMany = async (storeName, arrayOfObjects, key) => {
  try {
    const instance = createInstanceForStore(storeName);

    await Promise.all(
      arrayOfObjects.map(async (item) => {
        await instance.setItem(item[key], JSON.stringify(item));
      })
    );

    console.info(`Updating items in store ${storeName} successful (${arrayOfObjects.length})`);
  } catch (err) {
    console.error(`Updating items in store ${storeName} failed:\n`, err);
  }
};

const deleteOne = async (storeName, itemKey) => {
  try {
    const instance = createInstanceForStore(storeName);
    await instance.removeItem(itemKey);
    console.info(`Removal of one item from store ${storeName} successful:\n${itemKey}`);
  } catch (err) {
    console.error(`Removal of one item from store ${storeName} failed:\n`, err);
  }
};

const deleteMany = async (storeName, keys) => {
  try {
    const instance = createInstanceForStore(storeName);
    const removalPromises = keys.map((key) => instance.removeItem(key));
    await Promise.all(removalPromises);
    console.info(`Removal of items from store ${storeName} successful:\n${keys.join(', ')}`);
  } catch (err) {
    console.error(`Removal of items from store ${storeName} failed:\n`, err);
  }
};


// Create an instance for the specified store (single collection)
const createInstanceForStore = (storeName) => {
  return localforage.createInstance(
    {
      name: "app", // Optionally, set your preferred database name
      storeName: storeName,
    }
  );
};

// Function to delete an entire store (single collection)
const deleteStore = async (storeName) => {
  try {
    // Drop the entire store, including its nested items
    await localforage.dropInstance({
      name: "myDataStore", // Optionally, set your preferred database name
      storeName: storeName,
    });

    console.info(`Deleting store ${storeName} successful`);
  } catch (err) {
    console.error(`Deleting store ${storeName} failed:\n`, err);
  }
};


export const crud = {
  createMany,
  readMany,
  updateMany,
  deleteMany,
  createOne,
  readOne,
  updateOne,
  deleteOne,
  deleteStore,
};