import { deployKingToken } from '../../utils/deployKingToken'
import { expect, assert } from 'chai'
import { VestingScheduleConfigStruct } from '../../../types/contracts/King'
import { ethers } from 'hardhat'
import { UnitParser } from '../../utils/UnitParser'
import Chance from 'chance'
import { SafeMath } from '../../utils/safeMath'
import { deployKingVestingPool } from '../../utils/deployKingVestingPool'
const chance = new Chance()

describe('UNIT TEST: KingVestingPool - deployment', () => {
  it('should return correct name when token is deployed', async () => {
    const [token] = await deployKingToken()
    const [vestingPool] = await deployKingVestingPool({
      token,
    })

    expect(await vestingPool.getKingTokenAddress()).to.equal(token.address)
  })
})
