import uuid from 'uuid/v4'

const Id = Object.freeze({
  makeId: uuid,
  isValidId: str =>
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89ABab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
      str
    )
})

export default Id
