import preflight from '../../preflight.mjs'

export async function get (req) {
  const json = preflight().meta
  return { json }
}
