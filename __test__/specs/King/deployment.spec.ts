import { deployKingToken } from '../../utils/deployKingToken'
import { expect, assert } from 'chai'
import { VestingScheduleConfigStruct } from '../../../types/contracts/King'
import { ethers } from 'hardhat'
import { UnitParser } from '../../utils/UnitParser'
import Chance from 'chance'
import { SafeMath } from '../../utils/safeMath'
const chance = new Chance()

describe.only('UNIT TEST: King Token - deployment', () => {
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
      freezeAmount: chance.integer({ min: 1, max: 2000000 }),
      vestingDuration: 0,
      vestingAmount: chance.integer({ min: 1, max: 2000000 }),
    }
    const configB: VestingScheduleConfigStruct = {
      beneficiaryAddress: beneficiaryA.address,
      startNow: false,
      freezeDuration: 0,
      freezeAmount: chance.integer({ min: 1, max: 2000000 }),
      vestingDuration: 0,
      vestingAmount: chance.integer({ min: 1, max: 2000000 }),
    }

    const [token] = await deployKingToken({
      vestingScheduleConfigs: [configA, configB],
    })
    const reservedTokenAmount = await token.reserve()
    const configuredTotalVestingAmount = SafeMath.add(
      SafeMath.add(
        configA.freezeAmount as number,
        configA.vestingAmount as number,
      ),
      SafeMath.add(
        configB.freezeAmount as number,
        configB.vestingAmount as number,
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
      freezeAmount: chance.integer({ min: 1, max: 2000000 }),
      vestingDuration: 0,
      vestingAmount: chance.integer({ min: 1, max: 2000000 }),
    }
    const configB: VestingScheduleConfigStruct = {
      beneficiaryAddress: beneficiaryA.address,
      startNow: false,
      freezeDuration: 0,
      freezeAmount: chance.integer({ min: 1, max: 2000000 }),
      vestingDuration: 0,
      vestingAmount: chance.integer({ min: 1, max: 2000000 }),
    }

    const [token] = await deployKingToken({
      vestingScheduleConfigs: [configA, configB],
    })
    const mintedReserveTokenAmount = await token.balanceOf(token.address)
    const configuredTotalVestingAmount = SafeMath.add(
      SafeMath.add(
        configA.freezeAmount as number,
        configA.vestingAmount as number,
      ),
      SafeMath.add(
        configB.freezeAmount as number,
        configB.vestingAmount as number,
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
      freezeAmount: chance.integer({ min: 1, max: 2000000 }),
      vestingDuration: 0,
      vestingAmount: chance.integer({ min: 1, max: 2000000 }),
    }
    const configB: VestingScheduleConfigStruct = {
      beneficiaryAddress: beneficiaryA.address,
      startNow: false,
      freezeDuration: 0,
      freezeAmount: chance.integer({ min: 1, max: 2000000 }),
      vestingDuration: 0,
      vestingAmount: chance.integer({ min: 1, max: 2000000 }),
    }

    const [token] = await deployKingToken({
      vestingScheduleConfigs: [configA, configB],
    })
    const vestinPoolAddress = await token.getVestingPoolAddress()
    const vestingPoolAllowanceAmount = await token.allowance(
      token.address,
      vestinPoolAddress,
    )
    const configuredTotalVestingAmount = SafeMath.add(
      SafeMath.add(
        configA.freezeAmount as number,
        configA.vestingAmount as number,
      ),
      SafeMath.add(
        configB.freezeAmount as number,
        configB.vestingAmount as number,
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
