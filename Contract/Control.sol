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

  function balanceOf(address owner) external view returns (uint256); 
  function ownerOf(uint256 tokenId) external view returns (address owner);
  function mint(uint256 _mintAmount) external payable ;
  function mintTo(address _to, uint256 _mintAmount) external payable; 
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
  function burn(uint256 tokenId) external;  
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
import "hardhat/console.sol";

contract Control is Ownable {
    using Strings for uint256;

    string public ContractName;
    string public ContractDesc;
    bool public paused = false;

    // coins to buy a ticket / NFT 
    uint256 public ticketAmountToSell = 10000;  
    uint256 public NFTAmountToSell = 100000; 

    address public Controller;
    address public nftAddress;
    address public coinAddress;
    address public ticketAddress;

    event eventRedeemPrize(address indexed _from, uint256 indexed _tokenId, uint timestamp);
    event eventRedeemCoin(address indexed _from, uint256 indexed _tokenId, address indexed _to, uint256 amount, uint timestamp);
    event eventMintNFTETH(address indexed _from, uint256 qty, uint timestamp);
    event eventMintTicketETH(address indexed _from, uint256 qty, uint timestamp);
    event eventMintCoinETH(address indexed _from, uint256 qty, address indexed _to, uint timestamp);
    event eventMintTicketbyCoin(address indexed _from, uint256 BuyQty, uint256 coinNeed, uint timestamp);

    constructor(
        string memory _name,
        string memory _description) {
            ContractName = _name;
            ContractDesc = _description;
            Controller=msg.sender;
        }

  // Helper functions
    function setNFTAddress(address _nftaddress) public onlyOwner {
        nftAddress=_nftaddress;
    }
    function setCoinAddress(address _coinAddress) public onlyOwner {
        coinAddress=_coinAddress;
    }
    function setTicketAddress(address _ticketAddress) public onlyOwner {
        ticketAddress=_ticketAddress;
    }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

    function setTicketAmtToSell(uint256 _NewAmount) public onlyOwner {
        ticketAmountToSell = _NewAmount;
    }

    function withdraw() public payable onlyOwner {
        (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(success);
	}
 
  // View functions for call
    function CoinBalanceOf(address account) public view returns (uint256) {
        Coin coin = Coin(coinAddress);
        return coin.balanceOf(account);
    }
    function NFTBalanceOf(address account) public view returns (uint256) {
        NFT nft = NFT(nftAddress);
        return nft.balanceOf(account);
    }
    function TicketBalanceOf(address account) public view returns (uint256) {
        Ticket ticket = Ticket(ticketAddress);
        return ticket.balanceOf(account);
    }

    function NFTwalletOfOwner(address _owner) public view returns (uint256[] memory) {
        NFT nft = NFT(nftAddress);
        return nft.walletOfOwner(_owner);       
    }
    
    function TicketwalletOfOwner(address _owner) public view returns (uint256[] memory) {
        Ticket ticket = Ticket(ticketAddress);
        return ticket.walletOfOwner(_owner);       
    }

    function CoinAllowance(address owner, address spender) public view returns (uint256) {
        Coin coin = Coin(coinAddress);
        return coin.allowance(owner, spender);
    }

    // Controller Functions
    function test() public payable {
        NFT nft = NFT(nftAddress);
        nft.setOnlyWhitelisted(true);
    }

    function MintNFTETH(uint256 _mintAmount) public payable returns(bool) {
    // NFT.Mint() => Ticket.Mint()
        NFT nft = NFT(nftAddress);
        nft.mintTo{value: msg.value}(msg.sender, _mintAmount);

        emit eventMintNFTETH(msg.sender, _mintAmount, block.timestamp);
        return true;
    } //Checked

    function MintTicketETH(uint256 _mintAmount) public payable returns(bool){
    //Ticket.Mint()
        Ticket ticket = Ticket(ticketAddress);
        ticket.mintTo{value: msg.value}(msg.sender, _mintAmount);

        emit eventMintTicketETH(msg.sender, _mintAmount, block.timestamp);
        return true;
    } //Checked

    function MintCoinETH (address to, uint256 amount) public payable returns(bool){
    // Coin.Mint()
        Coin coin = Coin(coinAddress);
        coin.mint(to, amount);

        emit eventMintCoinETH(msg.sender, amount, to, block.timestamp);
        return true;
    } //Checked

    function MintNFTbyCoin(uint256 _BuyQty) public payable returns (bool) {
    //	1) Check Coin Receive 2) NFT.Mint() => Ticket.Mint()
        Coin coin = Coin(coinAddress);
        NFT nft = NFT(nftAddress);

        uint256 coinBalance = CoinBalanceOf(msg.sender);
        uint256 coinNeed = NFTAmountToSell * _BuyQty ;
        require(coinBalance >= coinNeed, "You have not enough coin to buy ticket!");

        coin.burn(msg.sender, coinNeed);
        nft.mintTo{value: msg.value}(msg.sender,_BuyQty);

        emit eventMintTicketbyCoin(msg.sender, _BuyQty, coinNeed, block.timestamp);
        return true;
    }

    function MintTicketbyCoin(uint256 _BuyQty) public payable returns(bool) {
    // 1) CheckCoin Receive 2) Ticket.Mint()
    //  e.g. say mint 1 ticket need 1000 coin

        Coin coin = Coin(coinAddress);
        Ticket ticket = Ticket(ticketAddress);

        uint256 coinBalance = CoinBalanceOf(msg.sender);
        uint256 coinNeed = ticketAmountToSell * _BuyQty ;
        require(coinBalance >= coinNeed, "You have not enough coin to buy ticket!");

        coin.burn(msg.sender, coinNeed);
        ticket.mintTo{value: msg.value}(msg.sender,_BuyQty);

        emit eventMintTicketbyCoin(msg.sender, _BuyQty, coinNeed, block.timestamp);
        return true;
    } //Checked

    function RedeemPrize(uint256 _tokenId) public {
    //	Ticket.burn()
        Ticket ticket = Ticket(ticketAddress);
        require(msg.sender == ticket.ownerOf(_tokenId), "You are not ticket owner!");
        ticket.burn(_tokenId);
        
        emit eventRedeemPrize(msg.sender, _tokenId, block.timestamp);
    } //Checked

    function RedeemCoin(address to, uint256 _tokenId) public returns (bool) {
    // 1) Coin Mint, 2) Burn ticket
        Coin coin = Coin(coinAddress);
        Ticket ticket = Ticket(ticketAddress);
        require(msg.sender == ticket.ownerOf(_tokenId), "You are not ticket owner!");
        coin.mint(to, ticketAmountToSell);
        ticket.burn(_tokenId);

        emit eventRedeemCoin(msg.sender, _tokenId, to, ticketAmountToSell, block.timestamp);
        return true;
    } //Checked

    function luckydraw() public {
    // All minted NFT buyers can join luckydraw
    // transfer received coin to winner
    }
}
