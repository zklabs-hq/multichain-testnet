import logo from './logo.svg';
import './App.css';

function App() {
  const chainIdMap = {
    ethereum: {
      chainId: '',
      rpcUrls: ['http://localhost:8545']
    },
    optimism: {
      chainId: '',
      rpcUrls: ['']
    },
    arbitreum: {
      chainId: '',
      rpcUrls: ['']
    }
  };

  const checkMetamask = async () => {
    if (typeof window.ethereum === 'undefined') {
      console.log('MetaMask is not installed!');
      return false
    }
    return true;
  }

  const switchChain = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x7A6B' }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x7A6B',
                chainName: 'Multichain Testnet ETHEREUM',
                rpcUrls: ['http://localhost:8545'],
              },
            ],
          });
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <section className='section'>
        <div class="columns">
          <div class="column">
            <div class="card">
              <div class="card-image">
                <img width={200} height={200} src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Ethereum_logo_translucent.svg/800px-Ethereum_logo_translucent.svg.png" alt="" />
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">Ethereum</p>
                  </div>
                </div>

                <div class="content box">
                  <div class="block">
                    <button class="button is-light">Connect to Ethereum Testnet</button>
                  </div>

                  <div class="block">
                    <button class="button is-dark">Open Block Explorer</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="card">
              <div class="card-image">
                <img width={300} src="https://github.com/ethereum-optimism/brand-kit/blob/main/assets/images/Profile-Logo.png?raw=true" alt="" />
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">Optimism</p>
                  </div>
                </div>

                <div class="content box">
                  <div class="block">
                    <button class="button is-light">Connect to Optimism Testnet</button>
                  </div>

                  <div class="block">
                    <button class="button is-dark">Open Block Explorer</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="card">
              <div class="card-image">
                <img width={360} src="https://i.pinimg.com/474x/9b/1e/97/9b1e977d00b5d887608b156705a10759.jpg" alt="" />
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">Polygon (MATIC)</p>
                    <p class="subtitle is-6">In Progress</p>
                  </div>
                </div>

                <div class="content box">
                  <div class="block">
                    <button class="button is-light" disabled>Connect to Polygon Testnet</button>
                  </div>

                  <div class="block">
                    <button class="button is-dark" disabled>Open Block Explorer</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="card">
              <div class="card-image">
                <img width={350} src="https://bridge.arbitrum.io/images/Arbitrum_Symbol_-_Full_color_-_White_background.svg" alt="" />
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">Arbitrum</p>
                  </div>
                </div>

                <div class="content box">
                  <div class="block">
                    <button class="button is-light">Connect to Arbitrum Testnet</button>
                  </div>

                  <div class="block">
                    <button class="button is-dark">Open Block Explorer</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='section'>

      </section>
    </div>
  );
}

export default App;
