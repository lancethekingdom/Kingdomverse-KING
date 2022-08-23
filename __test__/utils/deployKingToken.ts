import { ethers } from 'hardhat'
import { King, VestingScheduleConfigStruct } from '../../types/contracts/King'

export const deployKingToken = async (
  vestingScheduleConfigs: VestingScheduleConfigStruct[] = [],
) => {
  const [owner] = await ethers.getSigners()
  const TokenContractFactory = await ethers.getContractFactory('King')
  const token = await TokenContractFactory.connect(owner).deploy(vestingScheduleConfigs)
  return token as King
}
