import { expect, assert } from 'chai'
import { deployKingVestingPool } from '../../utils/deployKingVestingPool'
import { deployMintableToken } from '../../utils/deployMintableToken'

describe('UNIT TEST: KingVestingPool - deployment', () => {
  it('should return correct name when token is deployed', async () => {
    const [token] = await deployMintableToken()
    const [vestingPool] = await deployKingVestingPool({
      token,
    })

    expect(await vestingPool.getKingTokenAddress()).to.equal(token.address)
  })
})
