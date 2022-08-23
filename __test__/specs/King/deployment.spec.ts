import { deployKingToken } from '../../utils/deployKingToken'
import { expect, assert } from 'chai'
import { VestingScheduleConfigStruct } from '../../../types/contracts/King'
// @ts-ignore
import { ethers } from 'hardhat'
import { UnitParser } from '../../utils/UnitParser'
import Chance from 'chance'
import { SafeMath } from '../../utils/safeMath'
import { BigNumber } from 'ethers'
const chance = new Chance()

describe('UNIT TEST: King Token - deployment', () => {
  it('should return correct name when token is deployed', async () => {
    const [token] = await deployKingToken()
    const tokenName = await token.name()
    console.log('token name:', tokenName)

    expect(tokenName).to.equal('KING')
  })

  it('should init the reserve attribute based on the initial vesting schedule configs', async () => {
    const [, beneficiaryA] = await ethers.getSigners()

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
      vestingScheduleConfigs: [configA, configB],
    })
    const reservedTokenAmount = UnitParser.fromEther(await token.reserve())
    const configuredTotalVestingAmount = SafeMath.add(
      SafeMath.add(
        UnitParser.fromEther(configA.freezeAmount as BigNumber),
        UnitParser.fromEther(configA.vestingAmount as BigNumber),
      ),
      SafeMath.add(
        UnitParser.fromEther(configB.freezeAmount as BigNumber),
        UnitParser.fromEther(configB.vestingAmount as BigNumber),
      ),
    )

    expect(reservedTokenAmount).to.equal(configuredTotalVestingAmount)
  })

  it('should mint the corret amount of reserve token to the token contract itself', async () => {
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
      vestingScheduleConfigs: [configA, configB],
    })
    const mintedReserveTokenAmount = UnitParser.fromEther(
      await token.balanceOf(token.address),
    )
    const configuredTotalVestingAmount = SafeMath.add(
      SafeMath.add(
        UnitParser.fromEther(configA.freezeAmount as BigNumber),
        UnitParser.fromEther(configA.vestingAmount as BigNumber),
      ),
      SafeMath.add(
        UnitParser.fromEther(configB.freezeAmount as BigNumber),
        UnitParser.fromEther(configB.vestingAmount as BigNumber),
      ),
    )

    expect(mintedReserveTokenAmount).to.equal(configuredTotalVestingAmount)
  })

  it('should increase the allowance amount of vesting pool by the token contract itself', async () => {
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
      vestingScheduleConfigs: [configA, configB],
    })
    const vestinPoolAddress = await token.getVestingPoolAddress()
    const vestingPoolAllowanceAmount = UnitParser.fromEther(
      await token.allowance(token.address, vestinPoolAddress),
    )
    const configuredTotalVestingAmount = SafeMath.add(
      SafeMath.add(
        UnitParser.fromEther(configA.freezeAmount as BigNumber),
        UnitParser.fromEther(configA.vestingAmount as BigNumber),
      ),
      SafeMath.add(
        UnitParser.fromEther(configB.freezeAmount as BigNumber),
        UnitParser.fromEther(configB.vestingAmount as BigNumber),
      ),
    )

    expect(vestingPoolAllowanceAmount).to.equal(configuredTotalVestingAmount)
  })

  it('should deploy vesting pool and return corresponding contract address', async () => {
    const [token] = await deployKingToken()
    const vestingPoolAddress = await token.getVestingPoolAddress()
    expect(vestingPoolAddress).to.be.ok
  })
})
