import { deployKingToken } from '../../utils/deployKingToken'
import { expect } from 'chai'
import { ethers } from 'hardhat'
import { UnitParser } from '../../utils/UnitParser'
import Chance from 'chance'
const chance = new Chance()

describe('UNIT TEST: King Token - deployment', () => {
  it('should return correct name when token is deployed', async () => {
    const [token] = await deployKingToken()
    const tokenName = await token.name()
    console.log('token name:', tokenName)

    expect(tokenName).to.equal('KING')
  })

  it('should init the reserve attribute based on the initial vesting schedule configs', async () => {
    const [_owner] = await ethers.getSigners()
    const reserve = chance.integer({ max: 100000, min: 1 })
    const [token] = await deployKingToken({
      reserve,
    })
    const reservedTokenAmount = UnitParser.fromEther(await token.reserve())

    expect(reservedTokenAmount).to.equal(reserve)
  })

  it('should mint the corret amount of reserve token to the token contract itself', async () => {
    const [_owner] = await ethers.getSigners()

    const reserve = chance.integer({ max: 100000, min: 1 })

    const [token] = await deployKingToken({
      reserve,
    })
    const mintedReserveTokenAmount = UnitParser.fromEther(
      await token.balanceOf(token.address),
    )

    expect(mintedReserveTokenAmount).to.equal(reserve)
  })
})
