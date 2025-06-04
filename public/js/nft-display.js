/**
 * Simple NFT Display
 * Fetches and displays NFT metadata securely without third-party dependencies
 */

class NFTDisplay {
  constructor(containerSelector, contractAddress, tokenId) {
    this.container = document.querySelector(containerSelector);
    this.contractAddress = contractAddress;
    this.tokenId = tokenId;
    this.init();
  }

  async init() {
    if (!this.container) {
      console.error('NFT container not found');
      return;
    }

    this.showLoading();
    
    try {
      const metadata = await this.fetchNFTMetadata();
      this.displayNFT(metadata);
    } catch (error) {
      console.error('Failed to load NFT:', error);
      this.showFallback();
    }
  }

  showLoading() {
    this.container.innerHTML = `
      <div class="nft-loading" style="text-align: center; padding: 2rem;">
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
  }

  async fetchNFTMetadata() {
    // Using OpenSea API as a reliable metadata source
    const apiUrl = \`https://api.opensea.io/api/v1/asset/\${this.contractAddress}/\${this.tokenId}\`;
    
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    return await response.json();
  }

  displayNFT(metadata) {
    const imageUrl = metadata.image_url || metadata.image_original_url;
    const name = metadata.name || \`Token #\${this.tokenId}\`;
    const description = metadata.description || '';
    const collection = metadata.collection?.name || '';
    const openseaUrl = metadata.permalink;

    this.container.innerHTML = \`
      <div class="nft-card" style="
        max-width: 400px;
        margin: 0 auto;
        border: 2px solid var(--border-color, #dee2e6);
        border-radius: 12px;
        overflow: hidden;
        background: var(--bg-secondary, #f8f9fa);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      ">
        <div class="nft-image-container" style="position: relative; width: 100%; padding-bottom: 100%; overflow: hidden;">
          <img 
            src="\${imageUrl}" 
            alt="\${name}" 
            style="
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: transform 0.3s ease;
            "
            onload="this.style.opacity = '1'"
            onerror="this.style.display = 'none'; this.nextElementSibling.style.display = 'flex'"
          >
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: none;
            align-items: center;
            justify-content: center;
            background: var(--bg-secondary, #f8f9fa);
            color: var(--text-secondary, #6c757d);
            font-size: 14px;
          ">
            Image not available
          </div>
        </div>
        
        <div class="nft-info" style="padding: 1rem;">
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1.2rem; color: var(--text-primary, #000);">\${name}</h3>
          \${collection ? \`<p style="margin: 0 0 0.5rem 0; font-size: 0.9rem; color: var(--text-secondary, #6c757d);">\${collection}</p>\` : ''}
          \${description ? \`<p style="margin: 0 0 1rem 0; font-size: 0.9rem; color: var(--text-primary, #000); line-height: 1.4;">\${description.substring(0, 150)}\${description.length > 150 ? '...' : ''}</p>\` : ''}
          
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            \${openseaUrl ? \`
              <a href="\${openseaUrl}" target="_blank" rel="noopener noreferrer" style="
                display: inline-block;
                padding: 0.5rem 1rem;
                background: #2081e2;
                color: white;
                text-decoration: none;
                border-radius: 6px;
                font-size: 0.9rem;
                font-weight: 500;
                transition: background 0.2s ease;
              " onmouseover="this.style.background='#1868c7'" onmouseout="this.style.background='#2081e2'">
                View on OpenSea
              </a>
            \` : ''}
            
            <a href="https://etherscan.io/token/\${this.contractAddress}?a=\${this.tokenId}" target="_blank" rel="noopener noreferrer" style="
              display: inline-block;
              padding: 0.5rem 1rem;
              background: var(--bg-primary, #fff);
              color: var(--text-primary, #000);
              text-decoration: none;
              border: 1px solid var(--border-color, #dee2e6);
              border-radius: 6px;
              font-size: 0.9rem;
              font-weight: 500;
              transition: background 0.2s ease;
            " onmouseover="this.style.background='var(--bg-secondary, #f8f9fa)'" onmouseout="this.style.background='var(--bg-primary, #fff)'">
              View on Etherscan
            </a>
          </div>
        </div>
      </div>
    \`;

    // Add hover effect to the card
    const card = this.container.querySelector('.nft-card');
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)';
      card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
  }

  showFallback() {
    this.container.innerHTML = \`
      <div class="nft-fallback" style="
        max-width: 400px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
        border: 2px dashed var(--border-color, #dee2e6);
        border-radius: 12px;
        background: var(--bg-secondary, #f8f9fa);
        color: var(--text-secondary, #6c757d);
      ">
        <div style="font-size: 2rem; margin-bottom: 1rem;">🖼️</div>
        <h3 style="margin: 0 0 0.5rem 0; color: var(--text-primary, #000);">Chainlink Treasure Hunt NFT</h3>
        <p style="margin: 0 0 1rem 0; font-size: 0.9rem;">
          This NFT is currently unavailable for display, but you can view it directly on the blockchain.
        </p>
        <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
          <a href="https://opensea.io/assets/ethereum/\${this.contractAddress}/\${this.tokenId}" target="_blank" rel="noopener noreferrer" style="
            display: inline-block;
            padding: 0.5rem 1rem;
            background: #2081e2;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-size: 0.9rem;
            font-weight: 500;
          ">
            View on OpenSea
          </a>
          <a href="https://etherscan.io/token/\${this.contractAddress}?a=\${this.tokenId}" target="_blank" rel="noopener noreferrer" style="
            display: inline-block;
            padding: 0.5rem 1rem;
            background: var(--bg-primary, #fff);
            color: var(--text-primary, #000);
            text-decoration: none;
            border: 1px solid var(--border-color, #dee2e6);
            border-radius: 6px;
            font-size: 0.9rem;
            font-weight: 500;
          ">
            View on Etherscan
          </a>
        </div>
      </div>
    \`;
  }
}

// Initialize NFT display when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on the crypto page
  if (document.querySelector('#nft-container')) {
    new NFTDisplay(
      '#nft-container',
      '0x8d78277bc2c63f07efc2c0c8a8512de4ad459a05',
      '2'
    );
  }
});