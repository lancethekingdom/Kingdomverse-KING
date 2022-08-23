import { expect, assert } from 'chai'
import { VestingScheduleConfigStruct } from '../../../types/contracts/King'
// @ts-ignore
import { ethers } from 'hardhat'
import Chance from 'chance'
import { SafeMath } from '../../utils/safeMath'
import { deployKingVestingPool } from '../../utils/deployKingVestingPool'
import { UnitParser } from '../../utils/UnitParser'
import { BigNumber } from 'ethers'
const chance = new Chance()

describe('UNIT TEST: KingVestingPool - addVestingSchedule', () => {
  it('should throw error if not the owner calling this function', async () => {
    const [owner, notOwner] = await ethers.getSigners()
    const [vestingPool] = await deployKingVestingPool({ owner })
    const config: VestingScheduleConfigStruct = {
      beneficiaryAddress: notOwner.address,
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
    return vestingPool
      .connect(notOwner)
      .addVestingSchedule(config)
      .then(() => assert.fail())
      .catch((err: any) => {
        assert.include(err.message, 'Ownable: caller is not the owner')
      })
  })

  it('should throw error if the beneficiary is an empty address', async () => {
    const [owner] = await ethers.getSigners()

    const config: VestingScheduleConfigStruct = {
      beneficiaryAddress: '0x0000000000000000000000000000000000000000',
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
    const [vestingPool] = await deployKingVestingPool({
      owner,
    })

    return vestingPool
      .connect(owner)
      .addVestingSchedule(config)
      .then(() => assert.fail())
      .catch((err: any) => {
        assert.include(err.message, 'Beneficiary is zero address')
      })
  })

  it('should transfer corresponding token from caller to vesting pool & create vestingSchedule', async () => {
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
    const [vestingPool, token] = await deployKingVestingPool({
      owner,
    })

    await token
      .connect(owner)
      .approve(
        vestingPool.address,
        (configA.freezeAmount as BigNumber).add(
          configA.vestingAmount as BigNumber,
        ),
      )
    const balanceOfVestingPoolBefore = UnitParser.fromEther(
      await token.balanceOf(vestingPool.address),
    )

    const balanceOfCallerBefore = UnitParser.fromEther(
      await token.balanceOf(owner.address),
    )

    await vestingPool.connect(owner).addVestingSchedule(configA)

    const balanceOfVestingPoolAfter = UnitParser.fromEther(
      await token.balanceOf(vestingPool.address),
    )
    const balanceOfCallerAfter = UnitParser.fromEther(
      await token.balanceOf(owner.address),
    )

    expect(SafeMath.sub(balanceOfCallerBefore, balanceOfCallerAfter)).to.equal(
      SafeMath.add(
        UnitParser.fromEther(configA.freezeAmount as BigNumber),
        UnitParser.fromEther(configA.vestingAmount as BigNumber),
      ),
    )

    expect(SafeMath.sub(balanceOfCallerBefore, balanceOfCallerAfter)).to.equal(
      SafeMath.sub(balanceOfVestingPoolAfter, balanceOfVestingPoolBefore),
    )
  })

  it('should create vestingSchedule for the beneficary', async () => {
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
    const [vestingPool, token] = await deployKingVestingPool({
      owner,
    })

    await token
      .connect(owner)
      .approve(
        vestingPool.address,
        (configA.freezeAmount as BigNumber).add(
          configA.vestingAmount as BigNumber,
        ),
      )

    await vestingPool.connect(owner).addVestingSchedule(configA)

    const createdVestingSchedule = await vestingPool
      .connect(owner)
      .getVestingSchedule(configA.beneficiaryAddress)

    expect(createdVestingSchedule.valid).to.be.true
    expect(createdVestingSchedule.freezeAmount).to.equal(configA.freezeAmount)
    expect(createdVestingSchedule.vestingAmount).to.equal(configA.vestingAmount)
    expect(createdVestingSchedule.freezeDuration).to.equal(
      configA.freezeDuration,
    )
    expect(createdVestingSchedule.vestingDuration).to.equal(
      configA.vestingDuration,
    )
  })

  it('should throw error if the beneficiary has already been scheduled', async () => {
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
    const [vestingPool, token] = await deployKingVestingPool({
      owner,
    })

    await token
      .connect(owner)
      .approve(
        vestingPool.address,
        (configA.freezeAmount as BigNumber).add(
          configA.vestingAmount as BigNumber,
        ),
      )
    await vestingPool.connect(owner).addVestingSchedule(configA)
    return vestingPool
      .connect(owner)
      .addVestingSchedule(configA)
      .then(() => assert.fail())
      .catch((err: any) => {
        assert.include(err.message, 'Vesting schedule already exists')
      })
  })
})
