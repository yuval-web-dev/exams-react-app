export const save2cache = async (file, cacheName) => {
  const conn = await caches.open(cacheName)
  await conn.put(file)
}

// const fetch = async (file, cacheName) => {
//   const conn = await caches.open(cacheName)
//   const res = await conn.match(file)
//   return res
// }