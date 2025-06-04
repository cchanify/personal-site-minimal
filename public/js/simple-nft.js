/**
 * Simple NFT Display with Fallback
 * Uses a static approach when APIs fail
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#nft-container');
  if (!container) return;

  // Show loading state
  container.innerHTML = `
    <div style="text-align: center; padding: 2rem;">
      <div style="margin-bottom: 1rem;">Loading NFT...</div>
      <div style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
    </div>
    <style>
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  `;

  // Try to fetch NFT data, but provide fallback quickly
  const contractAddress = '0x8d78277bc2c63f07efc2c0c8a8512de4ad459a05';
  const tokenId = '2';

  // Set a timeout to show fallback if API takes too long
  const fallbackTimeout = setTimeout(() => {
    showNFTFallback(container, contractAddress, tokenId);
  }, 3000); // 3 seconds

  // Try to fetch from OpenSea
  fetch(`https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}`)
    .then(response => {
      if (!response.ok) throw new Error('API failed');
      return response.json();
    })
    .then(data => {
      clearTimeout(fallbackTimeout);
      showNFTCard(container, data, contractAddress, tokenId);
    })
    .catch(error => {
      console.log('OpenSea API failed, showing fallback:', error);
      clearTimeout(fallbackTimeout);
      showNFTFallback(container, contractAddress, tokenId);
    });
});

function showNFTCard(container, data, contractAddress, tokenId) {
  const imageUrl = data.image_url || data.image_original_url;
  const name = data.name || `Token #${tokenId}`;
  const description = data.description || '';
  const collection = data.collection?.name || '';

  container.innerHTML = `
    <div style="max-width: 400px; margin: 0 auto; border: 2px solid var(--border-color, #dee2e6); border-radius: 12px; overflow: hidden; background: var(--bg-secondary, #f8f9fa); box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      <div style="position: relative; width: 100%; padding-bottom: 100%; overflow: hidden;">
        <img src="${imageUrl}" alt="${name}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: none; align-items: center; justify-content: center; background: var(--bg-secondary, #f8f9fa); color: var(--text-secondary, #6c757d);">Image not available</div>
      </div>
      <div style="padding: 1rem;">
        <h3 style="margin: 0 0 0.5rem 0; font-size: 1.2rem; color: var(--text-primary, #000);">${name}</h3>
        ${collection ? `<p style="margin: 0 0 0.5rem 0; font-size: 0.9rem; color: var(--text-secondary, #6c757d);">${collection}</p>` : ''}
        ${description ? `<p style="margin: 0 0 1rem 0; font-size: 0.9rem; color: var(--text-primary, #000); line-height: 1.4;">${description.substring(0, 150)}${description.length > 150 ? '...' : ''}</p>` : ''}
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="https://opensea.io/assets/ethereum/${contractAddress}/${tokenId}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 0.5rem 1rem; background: #2081e2; color: white; text-decoration: none; border-radius: 6px; font-size: 0.9rem; font-weight: 500;">View on OpenSea</a>
          <a href="https://etherscan.io/token/${contractAddress}?a=${tokenId}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 0.5rem 1rem; background: var(--bg-primary, #fff); color: var(--text-primary, #000); text-decoration: none; border: 1px solid var(--border-color, #dee2e6); border-radius: 6px; font-size: 0.9rem; font-weight: 500;">View on Etherscan</a>
        </div>
      </div>
    </div>
  `;
}

function showNFTFallback(container, contractAddress, tokenId) {
  container.innerHTML = `
    <div style="max-width: 400px; margin: 0 auto; padding: 2rem; text-align: center; border: 2px dashed var(--border-color, #dee2e6); border-radius: 12px; background: var(--bg-secondary, #f8f9fa); color: var(--text-secondary, #6c757d);">
      <div style="font-size: 2rem; margin-bottom: 1rem;">🧙‍♂️</div>
      <h3 style="margin: 0 0 0.5rem 0; color: var(--text-primary, #000);">Chainlink Treasure Hunt NFT</h3>
      <p style="margin: 0 0 1rem 0; font-size: 0.9rem;">This NFT wizard was won during Chainlink's treasure hunt. View it directly on the blockchain.</p>
      <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
        <a href="https://opensea.io/assets/ethereum/${contractAddress}/${tokenId}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 0.5rem 1rem; background: #2081e2; color: white; text-decoration: none; border-radius: 6px; font-size: 0.9rem; font-weight: 500;">View on OpenSea</a>
        <a href="https://etherscan.io/token/${contractAddress}?a=${tokenId}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 0.5rem 1rem; background: var(--bg-primary, #fff); color: var(--text-primary, #000); text-decoration: none; border: 1px solid var(--border-color, #dee2e6); border-radius: 6px; font-size: 0.9rem; font-weight: 500;">View on Etherscan</a>
      </div>
    </div>
  `;
}