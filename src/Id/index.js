import uuid from 'uuid/v4'

const Id = Object.freeze({
  makeId: uuid,
  isValidId: uuid.isUuid
})

export default Id
