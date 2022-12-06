// contracts/King.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./KingVestingPool.sol";

import "@openzeppelin/contracts/utils/math/Math.sol";

// import "hardhat/console.sol";

contract King is ERC20, Pausable, Ownable, ERC20Burnable {
    uint256 public immutable reserve;
    uint256 public constant MAX_SUPPLY = 1000000000 ether;

    constructor(uint256 _reserve) ERC20("KING", "KING") {
        reserve = _reserve;
        _mint(address(this), reserve);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function burn(uint256 amount) public override {
        _requireNotPaused();
        super.burn(amount);
    }

    function burnFrom(address account, uint256 amount) public override {
        _requireNotPaused();
        super.burnFrom(account, amount);
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
}
