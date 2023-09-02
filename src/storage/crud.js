import localforage from "localforage";


// Create an instance for the specified store (single collection)
const createInstanceForStore = (storeName) => {
  return localforage.createInstance({
    name: "app", // Optionally, set your preferred database name
    storeName: storeName,
  });
};


// Function to save data to a specific store (single collection)
export async function create(storeName, array_of_objects, key) {
  try {
    const instance = createInstanceForStore(storeName);

    await Promise.all(
      array_of_objects.map(async (item) => {
        await instance.setItem(item[key], JSON.stringify(item));
      })
    );

    console.info(`Saving items to store ${storeName} successful (${array_of_objects.length})`);
  }
  catch (err) {
    console.error(`Saving items to store ${storeName} failed:\n`, err);
  }
}


// Function to read data from a specific store (single collection)
export async function read(storeName) {
  try {
    const storageItems = [];
    const instance = createInstanceForStore(storeName);

    const keys = await instance.keys();
    const readPromises = keys.map(async (key) => {
      const val = await instance.getItem(key);
      storageItems.push(JSON.parse(val));
    });

    await Promise.all(readPromises);

    console.info(`Retrieval of items from store ${storeName} successful (${storageItems.length})`);
    return storageItems;
  }
  catch (err) {
    console.error(`Retrieval of items from store ${storeName} failed:\n`, err);
  }
}


// Function to update data in a specific store (single collection)
export async function update(storeName, array_of_objects, key) {
  try {
    const instance = createInstanceForStore(storeName);

    await Promise.all(
      array_of_objects.map(async (item) => {
        await instance.setItem(item[key], JSON.stringify(item));
      })
    );

    console.info(`Updating items in store ${storeName} successful (${array_of_objects.length})`);
  }
  catch (err) {
    console.error(`Updating items in store ${storeName} failed:\n`, err);
  }
}


// Function to delete items from a specific store (single collection)
export async function delete_items(storeName, keys) {
  try {
    const instance = createInstanceForStore(storeName);
    const removalPromises = keys.map((key) => instance.removeItem(key));
    await Promise.all(removalPromises);
    console.info(`Removal of items from store ${storeName} successful:\n${keys.join(', ')}`);
  }
  catch (err) {
    console.error(`Removal of items from store ${storeName} failed:\n`, err);
  }
}


// Function to delete an entire store (single collection)
export async function delete_store(storeName) {
  try {
    // Drop the entire store, including its nested items
    await localforage.dropInstance({
      name: "myDataStore", // Optionally, set your preferred database name
      storeName: storeName,
    });

    console.info(`Deleting store ${storeName} successful`);
  }
  catch (err) {
    console.error(`Deleting store ${storeName} failed:\n`, err);
  }
}