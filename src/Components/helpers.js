import consts from './consts'

export const isQuestionSane = (question) => {
  if (
    question.body === '' ||
    question.answers.length <= 1 ||
    question.correctAnswers.length === 0 ||
    question.correctAnswers.length === question.answers.length
  ) {
    return false
  }
  else {
    return true
  }
}

export const saveImageToCache = async (image) => {
  const imageName = image.name
  try {
    // Create a bytes object
    const imageData = URL.createObjectURL(image)

    // Open the cache storage
    const cache = await caches.open(consts.cacheName)

    // Create a new response object with the image data
    const response = new Response(imageData)

    // Put the response object in the cache storage with the given name
    await cache.put(imageName, response)
  }
  catch (err) {
    console.error(`Error caching image '${imageName}':`, err)
  }
}

export const getImageFromCache = async (imageName) => {
  try {
    // Open the cache storage
    const cache = await caches.open(consts.cacheName)

    // Check if the cache storage contains the image
    const cachedResponse = await cache.match(imageName)

    // If the image is cached, return its data
    if (cachedResponse) {
      const cachedData = await cachedResponse.blob()
      return cachedData
    } else {
      console.warn(`Image '${imageName}' not found in cache.`)
      return null
    }
  } catch (error) {
    console.error(`Error retrieving image '${imageName}' from cache:`, error)
    return null
  }
};

export default {
  isQuestionSane,
  saveImageToCache,
  getImageFromCache
}