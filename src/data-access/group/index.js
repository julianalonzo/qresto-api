import makeGroupModel from './group-model'
import makeGroupsDb from './groups-db'

const groupsDataAccess = Object.freeze({
  makeGroupsDb,
  makeGroupModel
})

export default groupsDataAccess
export { makeGroupsDb, makeGroupModel }
