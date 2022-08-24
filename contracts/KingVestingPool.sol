// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "hardhat/console.sol";

struct VestingSchedule {
    bool valid;
    uint256 lockupDuration;
    uint256 lockupAmount;
    uint256 vestingDuration;
    uint256 vestingAmount;
    uint256 claimed;
}

struct VestingScheduleConfig {
    address beneficiaryAddress;
    uint256 lockupDuration;
    uint256 lockupAmount;
    uint256 vestingDuration;
    uint256 vestingAmount;
}

contract KingVestingPool is Ownable {
    IERC20 immutable _king;
    // one month
    uint256 public constant UNIT_VESTING_INTERVAL = 2592000;
    uint256 public immutable launchTime;

    event EtherReleased(uint256 amount);
    event ERC20Released(address indexed token, uint256 amount);

    mapping(address => VestingSchedule) private _vestingSchedules;

    using SafeMath for uint256;

    /**
     * @dev Set the beneficiary, start timestamp and vesting duration of the vesting wallet.
     */
    constructor(address tokenAddress) {
        require(tokenAddress != address(0), "Invalid Token Address");

        _king = IERC20(tokenAddress);
        launchTime = block.timestamp;
    }

    function getKingTokenAddress() external view returns (address) {
        return address(_king);
    }

    function addVestingSchedule(VestingScheduleConfig memory _config)
        public
        onlyOwner
    {
        require(
            _config.beneficiaryAddress != address(0),
            "Beneficiary is zero address"
        );

        VestingSchedule storage vestingSchedule = _vestingSchedules[
            _config.beneficiaryAddress
        ];
        require(!vestingSchedule.valid, "Vesting schedule already exists");

        uint256 totalVestingSum = _config.vestingAmount.add(
            _config.lockupAmount
        );
        require((totalVestingSum) > 0, "Invalid vesting amount");
        _king.transferFrom(msg.sender, address(this), totalVestingSum);

        vestingSchedule.valid = true;
        vestingSchedule.vestingAmount = _config.vestingAmount;
        vestingSchedule.lockupAmount = _config.lockupAmount;
        vestingSchedule.lockupDuration = _config.lockupDuration;
        vestingSchedule.vestingDuration = _config.vestingDuration;
    }

    function getAddress() external view returns (address) {
        return address(this);
    }

    function addVestingSchedules(VestingScheduleConfig[] memory _configs)
        external
        onlyOwner
    {
        for (uint256 i = 0; i < _configs.length; i++) {
            addVestingSchedule(_configs[i]);
        }
    }

    function getVestingSchedule(address _beneficiaryAddress)
        external
        view
        returns (VestingSchedule memory)
    {
        return _vestingSchedules[_beneficiaryAddress];
    }

    function _getLockupReleased(address beneficiary)
        internal
        view
        returns (uint256)
    {
        VestingSchedule storage schedule = _vestingSchedules[beneficiary];
        if (block.timestamp < (schedule.lockupDuration.add(launchTime))) {
            return 0;
        }
        return schedule.lockupAmount;
    }

    function _getVestingReleased(address beneficiary)
        internal
        view
        returns (uint256)
    {
        VestingSchedule storage schedule = _vestingSchedules[beneficiary];

        uint256 vestingStartTime = schedule.lockupDuration.add(launchTime);

        if (block.timestamp < vestingStartTime) {
            return 0;
        }

        uint256 vestingEndTime = schedule.vestingDuration.add(vestingStartTime);
        if (block.timestamp >= vestingEndTime) {
            return schedule.vestingAmount;
        }

        uint256 unitVestingRelease = schedule
            .vestingAmount
            .mul(UNIT_VESTING_INTERVAL)
            .div(schedule.vestingDuration);
        uint256 numOfVestingIntervalCompleted = (
            block.timestamp.sub(vestingStartTime)
        ).div(UNIT_VESTING_INTERVAL);

        return unitVestingRelease.mul(numOfVestingIntervalCompleted);
    }

    function getTotalReleased(address beneficiary)
        public
        view
        returns (uint256)
    {
        return
            _getLockupReleased(beneficiary) + _getVestingReleased(beneficiary);
    }

    // /**
    //  * @dev The contract should be able to receive Eth.
    //  */
    // receive() external payable virtual {}

    // /**
    //  * @dev Getter for the beneficiary address.
    //  */
    // function beneficiary() public view virtual returns (address) {
    //     return _beneficiary;
    // }

    // /**
    //  * @dev Getter for the start timestamp.
    //  */
    // function start() public view virtual returns (uint256) {
    //     return _start;
    // }

    // /**
    //  * @dev Getter for the vesting duration.
    //  */
    // function duration() public view virtual returns (uint256) {
    //     return _duration;
    // }

    // /**
    //  * @dev Amount of eth already released
    //  */
    // function released() public view virtual returns (uint256) {
    //     return _released;
    // }

    // /**
    //  * @dev Amount of token already released
    //  */
    // function released(address token) public view virtual returns (uint256) {
    //     return _erc20Released[token];
    // }

    // /**
    //  * @dev Release the native token (ether) that have already vested.
    //  *
    //  * Emits a {EtherReleased} event.
    //  */
    // function release() public virtual {
    //     uint256 releasable = vestedAmount(uint64(block.timestamp)) - released();
    //     _released += releasable;
    //     emit EtherReleased(releasable);
    //     Address.sendValue(payable(beneficiary()), releasable);
    // }

    // /**
    //  * @dev Release the tokens that have already vested.
    //  *
    //  * Emits a {ERC20Released} event.
    //  */
    // function release(address token) public virtual {
    //     uint256 releasable = vestedAmount(token, uint64(block.timestamp)) -
    //         released(token);
    //     _erc20Released[token] += releasable;
    //     emit ERC20Released(token, releasable);
    //     SafeERC20.safeTransfer(IERC20(token), beneficiary(), releasable);
    // }

    // /**
    //  * @dev Calculates the amount of ether that has already vested. Default implementation is a linear vesting curve.
    //  */
    // function vestedAmount(uint64 timestamp)
    //     public
    //     view
    //     virtual
    //     returns (uint256)
    // {
    //     return _vestingSchedule(address(this).balance + released(), timestamp);
    // }

    // /**
    //  * @dev Calculates the amount of tokens that has already vested. Default implementation is a linear vesting curve.
    //  */
    // function vestedAmount(address token, uint64 timestamp)
    //     public
    //     view
    //     virtual
    //     returns (uint256)
    // {
    //     return
    //         _vestingSchedule(
    //             IERC20(token).balanceOf(address(this)) + released(token),
    //             timestamp
    //         );
    // }

    // /**
    //  * @dev Virtual implementation of the vesting formula. This returns the amount vested, as a function of time, for
    //  * an asset given its total historical allocation.
    //  */
    // function _vestingSchedule(uint256 totalAllocation, uint64 timestamp)
    //     internal
    //     view
    //     virtual
    //     returns (uint256)
    // {
    //     if (timestamp < start()) {
    //         return 0;
    //     } else if (timestamp > start() + duration()) {
    //         return totalAllocation;
    //     } else {
    //         return (totalAllocation * (timestamp - start())) / duration();
    //     }
    // }
}
