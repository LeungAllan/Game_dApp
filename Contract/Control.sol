// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

// OpenZeppelin Contracts v4.4.1 (token/ERC20/extensions/IERC20Metadata.sol)

pragma solidity ^0.8.0;

/**
 * @dev Interface for the optional metadata functions from the ERC20 standard.
 *
 * _Available since v4.1._
 */
interface IERC20Metadata is IERC20 {
    /**
     * @dev Returns the name of the token.
     */
    function name() external view returns (string memory);

    /**
     * @dev Returns the symbol of the token.
     */
    function symbol() external view returns (string memory);

    /**
     * @dev Returns the decimals places of the token.
     */
    function decimals() external view returns (uint8);
}


pragma solidity ^0.8.0;
interface Ticket {

  function mint(uint256 _mintAmount) external payable ;
  function isWhitelisted(address _user) external view returns (bool);
  function walletOfOwner(address _owner) external view returns (uint256[] memory);
  function tokenURI(uint256 tokenId) external view  returns (string memory);
  function setCost(uint256 _newCost) external ;
  function setBaseURI(string memory _newBaseURI) external ;
  function setBaseExtension(string memory _newBaseExtension) external ;
  function setNotRevealedURI(string memory _notRevealedURI) external ;
  function pause(bool _state) external ;
  function setOnlyWhitelisted(bool _state) external ;
  function whitelistUsers(address[] calldata _users) external ;
  function ChecktBalance() external view  returns (uint256);
  function withdraw() external payable ;
}

pragma solidity ^0.8.0;
interface Coin {
    function name() external view   returns (string memory);
    function symbol() external view   returns (string memory);
    function decimals() external view   returns (uint8);
    function totalSupply() external view   returns (uint256);
    function balanceOf(address account) external view   returns (uint256);
    function transfer(address recipient, uint256 amount) external   returns (bool);
    function allowance(address owner, address spender) external view   returns (uint256);
    function approve(address spender, uint256 amount) external   returns (bool) ;
    function transferFrom(address sender, address recipient, uint256 amount) external   returns (bool) ;
    function increaseAllowance(address spender, uint256 addedValue) external  returns (bool) ;
    function decreaseAllowance(address spender, uint256 subtractedValue) external  returns (bool);
    function mint(address to, uint256 amount) external  ;
    function burn(address account, uint256 amount) external ;
    function setPause(bool _state) external  ;
    function isWhitelisted(address _user) external view returns (bool) ;
    function whitelistUsers(address[] calldata _users) external ;
    function setOnlyWhitelisted(bool _state) external  ;
}

/** ================== Main Contract =================== **/
import "./NFT.sol";

contract Control is Ownable {
    using Strings for uint256;

    string public ContractName;
    string public ContractDesc;
    bool public paused = false;

    address public nftAddress;
    address public coinAddress;
    address public ticketAddress;

    constructor(
        string memory _name,
        string memory _description) {
            ContractName = _name;
            ContractDesc = _description;
        }

  // Helper functions
  function setNFTaddress(address _nftaddress) public onlyOwner {
    nftAddress=_nftaddress;
  }

  function pause(bool _state) public onlyOwner {
    paused = _state;
  }
 
  // Controller Functions
    function Mint_NFT_by_ETH() public payable {
    // NFT.Mint() => Ticket.Mint()
    }

    function Mint_Ticket_by_ETH() public payable {
    //Ticket.Mint()
    }

    function	Mint_Coin_by_ETH () public payable {
    // Coin.Mint()
    }

    function Mint_NFT_by_Coin() public {
    //	1) Check Coin Receive 2) NFT.Mint() => Ticket.Mint()
    }

    function Mint_Ticket_by_Coin() public {
    // 1) CheckCoin Receive 2) Ticket.Mint()
    }

    function Redeem_Prize() public {
    //	Ticket.burn()
    }

    function redeem_coin() public {
    // 1) Coin Mint, 2) Burn ticket
    }

    function luckydraw() public {
    // All minted NFT buyers can join luckydraw
    // transfer received coin to winner
    }
}
