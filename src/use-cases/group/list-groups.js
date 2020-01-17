export default function makeListGroups ({ groupsDb }) {
  return async function listGroups ({ ...query } = {}) {
    return groupsDb.findAll({ ...query })
  }
}
