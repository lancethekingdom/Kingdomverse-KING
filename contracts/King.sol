// contracts/King.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./KingVestingPool.sol";

import "@openzeppelin/contracts/utils/math/Math.sol";
import "hardhat/console.sol";

contract King is ERC20, Pausable, Ownable {
    uint256 public immutable reserve;
    uint256 public constant MAX_SUPPLY = 1000000000 ether;
    KingVestingPool private immutable _vestingPool;
    bool private hasVestingPoolInitialized;

    constructor(VestingScheduleConfig[] memory _initialVestingScheduleConfigs)
        ERC20("KING", "KING")
    {
        uint256 totalVestingAmount = 0;
        // initialize all the vesting schedule
        for (uint256 i = 0; i < _initialVestingScheduleConfigs.length; i++) {
            VestingScheduleConfig
                memory config = _initialVestingScheduleConfigs[i];
            totalVestingAmount += config.vestingAmount;
            totalVestingAmount += config.lockupAmount;
        }
        reserve = totalVestingAmount;

        _mint(address(this), reserve);
        _vestingPool = new KingVestingPool(address(this));
        _approve(address(this), address(_vestingPool), reserve);
    }

    function initVestingPool(
        VestingScheduleConfig[] memory _initialVestingScheduleConfigs
    ) external onlyOwner {
        require(
            !hasVestingPoolInitialized,
            "Vesting pool has been initialized"
        );
        uint256 totalInitialVestingAmount = 0;
        // initialize all the vesting schedule
        for (uint256 i = 0; i < _initialVestingScheduleConfigs.length; i++) {
            VestingScheduleConfig
                memory config = _initialVestingScheduleConfigs[i];
            totalInitialVestingAmount += config.vestingAmount;
            totalInitialVestingAmount += config.lockupAmount;
        }
        require(
            totalInitialVestingAmount == reserve,
            "Vesting amount does not match with reserved mount"
        );
        _vestingPool.addVestingSchedules(_initialVestingScheduleConfigs);
        hasVestingPoolInitialized = true;
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
}
