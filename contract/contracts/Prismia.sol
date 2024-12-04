// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Prismia is ERC721, ERC721URIStorage {
    uint256 private _nextTokenId;

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

        address manufacturer;
        uint256 timeStamp;
        uint256 tokenId;
    }

    struct ProductResponse {
        Product product;
        ProductLifeCycle[] lifeCycle;
    }

    // mapping(uint256 => ProductLifeCycle[]) private productData;
    mapping(string => Product) private productDataByProductId;
    mapping(string => ProductLifeCycle[]) private productLifeCycle;
    // mapping(address => Product[]) private ownedTokensData;

    event ProductMinted(string indexed productId, address indexed manufacturer);
    event ProductLifeCycleUpdated(
        string indexed productId,
        ProductLifeCycle newLifeCycle
    );

    // event NewProductStage(

    constructor() ERC721("Prismia", "DPP") {}

    // verify
    function verifyProduct(
        string memory productId
    ) public view returns (ProductResponse memory) {
        Product memory product = productDataByProductId[productId];
        ProductLifeCycle[] memory lifeCycle = productLifeCycle[productId];

        return ProductResponse({product: product, lifeCycle: lifeCycle});
    }

    // create
    function mintProduct(
        string memory uri,
        address to
    ) public returns (string memory) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri); // Set the metadata URI for the minted NFT

        // ownedTokensData[msg.sender].push(
        //     Product({timeStamp: block.timestamp, tokenId: tokenId})
        // );

        Product memory newProduct = Product({
            manufacturer: msg.sender,
            timeStamp: block.timestamp,
            tokenId: tokenId
        });

        string memory productId = hashTokenId(tokenId);
        productDataByProductId[productId] = newProduct;

        emit ProductMinted(productId, msg.sender);

        return productId;
    }

    // update
    function updateProductLifeCycle(
        string memory productId,
        address to,
        string memory uri
    ) public {
        uint256 tokenId = productDataByProductId[productId].tokenId;
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        require(_ownerOf(tokenId) == msg.sender, "Not the owner of the token");

        ProductLifeCycle memory newLifeCycle = ProductLifeCycle({
            uri: uri,
            timeStamp: block.timestamp
        });

        productLifeCycle[productId].push(newLifeCycle);

        if (to != address(0) && to != msg.sender) {
            _transfer(msg.sender, to, tokenId);
        }

        emit ProductLifeCycleUpdated(productId, newLifeCycle);
    }

    // function getOwnedProducts() public view returns (Product[] memory) {
    //     return ownedTokensData[msg.sender];
    // }

    // function getProductLifeCycle(
    //     uint256 tokenId
    // ) public view returns (ProductLifeCycle[] memory) {
    //     return productData[tokenId];
    // }

    // The following functions are overrides required by Solidity.

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // SUPPORT FUNCTIONS

    // Function to hash a tokenId and return a truncated alphanumeric string
    function hashTokenId(uint256 tokenId) public pure returns (string memory) {
        // Step 1: Hash the tokenId with keccak256
        bytes32 hash = keccak256(abi.encodePacked(tokenId));

        // Step 2: Convert the hash to a readable alphanumeric string
        // Using first 10 characters for brevity (can be adjusted)
        string memory alphanumericHash = _toHexString(hash, 10);

        return alphanumericHash;
    }

    // Internal function to convert bytes32 to a hex string
    function _toHexString(
        bytes32 data,
        uint256 length
    ) internal pure returns (string memory) {
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(length * 2);

        for (uint256 i = 0; i < length; i++) {
            str[i * 2] = alphabet[uint8(data[i] >> 4) & 0x0f];
            str[1 + i * 2] = alphabet[uint8(data[i] & 0x0f)];
        }

        return string(str);
    }
}
