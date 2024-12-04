// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract Prismia is ERC721, ERC721URIStorage, AccessControl {
    uint256 private _nextTokenId;

    // Define roles
    bytes32 public constant MANUFACTURER = keccak256("MANUFACTURER");

    struct ProductLifeCycle {
        // below commented one will be saved as metadata
        // string stage;
        // string location;
        // string notes;

        uint256 timeStamp;
        string uri; // The metadata URI
    }

    struct Product {
        // below commented one will be saved as metadata of the NFT
        // string name;
        // string serialNumber; // unique
        // string category;
        // uint256 price;
        // string description;
        // string complianceDocumentation; // PDF

        uint256 timeStamp;
        uint256 tokenId;
    }

    mapping(uint256 => ProductLifeCycle[]) private productData;
    mapping (address => Product) private ownedTokensData;

    event ProductMinted(uint256 tokenId, address indexed manufacturer);
    event ProductLifeCycleUpdated(
        uint256 tokenId,
        ProductLifeCycle newLifeCycle
    );

    // event NewProductStage(

    constructor(address defaultAdmin, address minter) ERC721("Prismia", "DPP") {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(MANUFACTURER, minter);
    }

    function mintProduct(string memory uri, address to)
        public
        onlyRole(MANUFACTURER)
    {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri); // Set the metadata URI for the minted NFT

        ownedTokensData[msg.sender] = Product({timeStamp: block.timestamp, tokenId: tokenId});

        emit ProductMinted(tokenId, msg.sender);
    }

    function addProductLifeCycle(uint256 tokenId, string memory uri)
        public
        onlyRole(MANUFACTURER)
    {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");

        ProductLifeCycle memory newLifeCycle = ProductLifeCycle({uri: uri, timeStamp: block.timestamp});

        productData[tokenId].push(newLifeCycle);

        emit ProductLifeCycleUpdated(tokenId, newLifeCycle);
    }

    function getOwnedProduct() public view returns (Product memory) {
        return ownedTokensData[msg.sender];
    }

    function getProductLifeCycle(uint256 tokenId) public view returns (ProductLifeCycle[] memory) {
        return productData[tokenId];
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
