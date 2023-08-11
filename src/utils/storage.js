import localforage from "localforage"



export async function save(key, val) {
  try {
    await localforage.setItem(key, val);
    console.log(`Object saved successfully.`);
  } catch (error) {
    console.error('Error saving object:', error);
  }
}

export async function fetch() {
  try {
    const localExams = []

    await new Promise((resolve, reject) => {
      localforage.iterate((val, key) => {
        localExams.push(val);
      }, (err, result) => {
        if (err) {
          console.error('Error retrieving exam instance:', err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    return localExams

  } catch (error) {
    console.error('Error retrieving exam instance:', error);
  }
}

export async function remove(keys) {
  try {
    const removalPromises = keys.map(key => localforage.removeItem(key));
    await Promise.all(removalPromises);
    console.log(`Objects with keys ${keys.join(', ')} removed successfully.`);
  } catch (error) {
    console.error(`Error removing objects with keys ${keys.join(', ')}:`, error);
  }
}