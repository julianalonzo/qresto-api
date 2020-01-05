export default function buildFood ({ Id }) {
  return function makeFood ({ name } = {}) {
    if (!name) {
      throw new Error('Food must have a name')
    }
  }
}
