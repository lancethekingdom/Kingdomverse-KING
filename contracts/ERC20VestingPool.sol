// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

struct VestingSchedule {
    bool valid;
    uint256 openTime;
    uint256 freezeDuration;
    uint256 freezeAmount;
    uint256 vestingDuration;
    uint256 vestingAmount;
    uint256 claimed;
}

struct VestingScheduleConfig {
    address beneficiaryAddress;
    bool openNow;
    uint256 freezeDuration;
    uint256 freezeAmount;
    uint256 vestingDuration;
    uint256 vestingAmount;
}

contract ERC20VestingPool is Ownable {
    // the contract should receive erc20 then
    IERC20 _token;

    event EtherReleased(uint256 amount);
    event ERC20Released(address indexed token, uint256 amount);

    mapping(address => VestingSchedule) private _vestingSchedules;

    /**
     * @dev Set the beneficiary, start timestamp and vesting duration of the vesting wallet.
     */
    constructor(address tokenAddress) {
        require(tokenAddress != address(0), "Invalid Token Address");

        _token = IERC20(tokenAddress);
    }

    function addVestingSchedule(VestingScheduleConfig memory _config)
        external
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
        require(
            _config.vestingAmount + _config.freezeAmount > 0,
            "Invalid vesting amount"
        );

        IERC20(_token).transferFrom(
            msg.sender,
            address(this),
            _config.vestingAmount + _config.freezeAmount
        );

        vestingSchedule.valid = true;
        vestingSchedule.vestingAmount = _config.vestingAmount;
        vestingSchedule.freezeAmount = _config.freezeAmount;
        vestingSchedule.freezeDuration = _config.freezeDuration;
        vestingSchedule.vestingDuration = _config.vestingDuration;
        vestingSchedule.openTime = _config.openNow
            ? block.timestamp
            : 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
    }

    function getVestingSchedule(address _beneficiaryAddress)
        external
        view
        onlyOwner
        returns (VestingSchedule memory)
    {
        return _vestingSchedules[_beneficiaryAddress];
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
