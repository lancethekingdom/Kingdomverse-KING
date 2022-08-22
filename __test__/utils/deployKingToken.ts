import { ethers } from 'hardhat'
import { King } from '../../types/contracts/King'

export const deployKingToken = async () => {
  const [owner] = await ethers.getSigners()
  const TokenContractFactory = await ethers.getContractFactory('King')
  const token = await TokenContractFactory.connect(owner).deploy(owner.address)
  return token as King
}
