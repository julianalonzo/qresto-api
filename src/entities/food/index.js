import Id from '../Id'
import buildMakeFood from './food'
import makeImage from '../image'

const makeFood = buildMakeFood({ Id, makeImage })

export default makeFood
