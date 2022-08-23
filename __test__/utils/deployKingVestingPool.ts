import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { ethers } from 'hardhat'
import { KingVestingPool } from '../../types/contracts/KingVestingPool'
import { King, VestingScheduleConfigStruct } from '../../types/contracts/King'
import { deployKingToken, DeployKingTokenConfig } from './deployKingToken'

export const deployKingVestingPool = async ({
  token,
  owner,
  vestingScheduleConfigs = [],
}: {
  token?: King
} & DeployKingTokenConfig) => {
  const [defaultOwner] = await ethers.getSigners()
  const TokenContractFactory = await ethers.getContractFactory(
    'KingVestingPool',
  )
  const targetOwner = owner ?? defaultOwner
  const targetToken =
    token ??
    (await deployKingToken({ owner: targetOwner, vestingScheduleConfigs }))[0]

  const vestingPool = await TokenContractFactory.connect(
    owner ?? defaultOwner,
  ).deploy(targetToken.address)
  return [vestingPool, targetToken, owner, vestingScheduleConfigs] as [
    KingVestingPool,
    King,
    SignerWithAddress,
    VestingScheduleConfigStruct[],
  ]
}
