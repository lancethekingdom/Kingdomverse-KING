import { deployKingToken } from '../../utils/deployKingToken'
import { expect, assert } from 'chai'
import { VestingScheduleConfigStruct } from '../../../types/contracts/King'
// @ts-ignore
import { ethers } from 'hardhat'
import { UnitParser } from '../../utils/UnitParser'
import Chance from 'chance'
import { SafeMath } from '../../utils/safeMath'
const chance = new Chance()

describe('UNIT TEST: King Token - initVestingPool', () => {
  it('should throw error if not the owner calling this function', async () => {
    const [owner, notOwner] = await ethers.getSigners()
    const [token] = await deployKingToken({ owner })

    return token
      .connect(notOwner)
      .initVestingPool([])
      .then(() => assert.fail())
      .catch((err: any) => {
        assert.include(err.message, 'Ownable: caller is not the owner')
      })
  })

  it('should throw error if the total initial vesting amount does not match with the reseved token amount', async () => {
    const [owner, beneficiaryA] = await ethers.getSigners()

    const configA: VestingScheduleConfigStruct = {
      beneficiaryAddress: beneficiaryA.address,
      startNow: false,
      freezeDuration: 0,
      freezeAmount: UnitParser.toEther(
        chance.integer({ min: 1, max: 2000000 }),
      ),
      vestingDuration: 0,
      vestingAmount: UnitParser.toEther(
        chance.integer({ min: 1, max: 2000000 }),
      ),
    }
    const configB: VestingScheduleConfigStruct = {
      beneficiaryAddress: beneficiaryA.address,
      startNow: false,
      freezeDuration: 0,
      freezeAmount: UnitParser.toEther(
        chance.integer({ min: 1, max: 2000000 }),
      ),
      vestingDuration: 0,
      vestingAmount: UnitParser.toEther(
        chance.integer({ min: 1, max: 2000000 }),
      ),
    }

    const [token] = await deployKingToken({
      owner,
      vestingScheduleConfigs: [configA, configB],
    })

    return token
      .connect(owner)
      .initVestingPool([
        { ...configA, freezeAmount: (configA.freezeAmount as number) + 1 },
        configB,
      ])
      .then(() => assert.fail())
      .catch((err: any) => {
        assert.include(
          err.message,
          'Vesting amount does not match with reserved mount',
        )
      })
  })

  it('should transfer reserved token from King contract balance to vesting pool', async () => {
    const [owner, beneficiaryA, beneficiaryB] = await ethers.getSigners()

    const configA: VestingScheduleConfigStruct = {
      beneficiaryAddress: beneficiaryA.address,
      startNow: false,
      freezeDuration: 0,
      freezeAmount: UnitParser.toEther(
        chance.integer({ min: 1, max: 2000000 }),
      ),
      vestingDuration: 0,
      vestingAmount: UnitParser.toEther(
        chance.integer({ min: 1, max: 2000000 }),
      ),
    }
    const configB: VestingScheduleConfigStruct = {
      beneficiaryAddress: beneficiaryB.address,
      startNow: false,
      freezeDuration: 0,
      freezeAmount: UnitParser.toEther(
        chance.integer({ min: 1, max: 2000000 }),
      ),
      vestingDuration: 0,
      vestingAmount: UnitParser.toEther(
        chance.integer({ min: 1, max: 2000000 }),
      ),
    }

    const vestingScheduleConfigs = [configA, configB]

    const [token] = await deployKingToken({
      vestingScheduleConfigs,
      owner,
    })

    const vestingPoolAddress = await token.getVestingPoolAddress()

    const tokenBalanceBefore = UnitParser.fromEther(
      await token.balanceOf(token.address),
    )
    const vestingPoolBalanceBefore = UnitParser.fromEther(
      await token.balanceOf(vestingPoolAddress),
    )

    await token.connect(owner).initVestingPool(vestingScheduleConfigs)

    const tokenBalanceAfter = UnitParser.fromEther(
      await token.balanceOf(token.address),
    )
    const vestingPoolBalanceAfter = UnitParser.fromEther(
      await token.balanceOf(vestingPoolAddress),
    )
    const reservedTokenAmount = UnitParser.fromEther(await token.reserve())
    expect(SafeMath.sub(tokenBalanceBefore, tokenBalanceAfter)).to.equal(
      SafeMath.sub(vestingPoolBalanceAfter, vestingPoolBalanceBefore),
    )
    expect(SafeMath.sub(tokenBalanceBefore, tokenBalanceAfter)).to.equal(
      reservedTokenAmount,
    )
  })

  it('should throw error if the vesting pool has already been initialized', async () => {
    const [owner] = await ethers.getSigners()
    const [token] = await deployKingToken({ owner })

    await token.connect(owner).initVestingPool([])

    return token
      .connect(owner)
      .initVestingPool([])
      .then(() => assert.fail())
      .catch((err: any) => {
        assert.include(err.message, 'Vesting pool has been initialized')
      })
  })
})
