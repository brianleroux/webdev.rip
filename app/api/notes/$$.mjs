export async function get () {
  let cacheControl = process.env.ARC_ENV === 'production'
    ? 'max-age=3600;'
    : 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
  return {
    headers: {
      'cache-control': cacheControl,
    }
  }
}
