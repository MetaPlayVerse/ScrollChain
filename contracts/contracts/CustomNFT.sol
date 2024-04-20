// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CustomNFT is ERC721, Ownable {
    // Counter to track token IDs
    uint256 private tokenIdCounter;

    // Mapping from token ID to NFT data
    mapping(uint256 => NftData) private nftDataMap;

    // Struct to store NFT data
    struct NftData {
        string nftName;
        string nftDescription;
        string imageUrl;
        uint256 nftPrice;
    }

    // Event emitted when a new NFT is minted
    event NFTMinted(uint256 tokenId, address owner);

    constructor() ERC721("CustomNFT", "CNFT") Ownable(msg.sender) {}

    // Function to mint a new NFT
    function mintNFT(
        string memory _nftName,
        string memory _nftDescription,
        string memory _imageUrl,
        uint256 _nftPrice
    ) external onlyOwner {
        uint256 tokenId = tokenIdCounter;

        // Create NFT data
        NftData memory newNftData = NftData({
            nftName: _nftName,
            nftDescription: _nftDescription,
            imageUrl: _imageUrl,
            nftPrice: _nftPrice
        });

        // Mint the NFT
        _safeMint(msg.sender, tokenId);
        tokenIdCounter = tokenIdCounter + 1;

        // Store NFT data
        nftDataMap[tokenId] = newNftData;

        // Emit minting event
        emit NFTMinted(tokenId, msg.sender);
    }

    // Function to get NFT data by token ID
    function getNFTData(uint256 _tokenId)
        external
        view
        returns (NftData memory)
    {
        require(_exists(_tokenId), "Token ID does not exist");
        return nftDataMap[_tokenId];
    }

    // Custom function to check if a token exists
    function _exists(uint256 tokenId) internal view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }
}
