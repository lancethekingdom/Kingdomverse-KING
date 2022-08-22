// contracts/King.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC20VestingPool.sol";

import "@openzeppelin/contracts/utils/math/Math.sol";

contract King is ERC20, Pausable, Ownable {
    uint256 public reserve;
    uint256 public constant MAX_SUPPLY = 1000000000 ether;
    ERC20VestingPool private immutable _vestingPool;

    event AuthSignerSet(address indexed newSigner);

    constructor(VestingScheduleConfig[] memory _initialVestingScheduleConfigs)
        ERC20("KING", "KING")
    {
        uint totalReserve = 0;
        // compute the total reserve
        for (uint256 i = 0; i < _initialVestingScheduleConfigs.length; i++) {
            VestingScheduleConfig memory config = _initialVestingScheduleConfigs[i];
            totalReserve += (config.freezeAmount + config.vestingAmount);
         
        }
        // _mint(msg.sender, RESERVE);
        _vestingPool = new ERC20VestingPool(address(this));
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);
        require(!paused(), "Token paused");
    }

    function _mint(address account, uint256 amount) internal virtual override {
        require(ERC20.totalSupply() + amount <= MAX_SUPPLY, "MAX_SUPPLY");
        super._mint(account, amount);
    }

    function getVestingPoolAddress() external view returns (address) {
        return address(_vestingPool);
    }

    function addVestingSchedule(VestingScheduleConfig memory _config)
        public
        onlyOwner
    {
        approve(
            address(_vestingPool),
            _config.freezeAmount + _config.vestingAmount
        );
        _vestingPool.addVestingSchedule(_config);
    }
}
