import { groupsDb } from '../../data-access'
import makeAddGroup from './add-group'
import makeEditGroup from './edit-group'
import makeListGroups from './list-groups'
import makeRemoveGroup from './remove-group'
import makeRetrieveGroup from './retrieve-group'

const addGroup = makeAddGroup({ groupsDb })
const editGroup = makeEditGroup({ groupsDb })
const listGroups = makeListGroups({ groupsDb })
const retrieveGroup = makeRetrieveGroup({ groupsDb })
const removeGroup = makeRemoveGroup({ groupsDb })

const groupsService = Object.freeze({
  addGroup,
  editGroup,
  listGroups,
  retrieveGroup,
  removeGroup
})

export default groupsService
export { addGroup, editGroup, listGroups, retrieveGroup, removeGroup }
