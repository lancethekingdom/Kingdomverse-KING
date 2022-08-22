import { deployKingToken } from '../utils/deployKingToken'
import { expect, assert } from 'chai'

describe('UNIT TEST: King Token', () => {
  it('should return correct name when token is deployed', async () => {
    const token = await deployKingToken()
    const tokenName = await token.name()
    console.log('token name:', tokenName)
    expect(tokenName).to.equal('KING')
  })
  it('should deploy vesting pool and return corresponding contract address', async () => {
    const token = await deployKingToken()
    const vestingPoolAddress = await token.getVestingPoolAddress()
    console.log('vesting pool address: ', vestingPoolAddress)
    expect(vestingPoolAddress).to.be.ok
  })
})
