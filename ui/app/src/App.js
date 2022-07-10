import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {

  const options = [
    { value: '', text: '--Choose a chain--' },
    { value: 'ethereum', text: 'Ethereum' },
    { value: 'polygon', text: 'Polygon' },
    { value: 'optimism', text: 'Optimism' },
    { value: 'arbitrum', text: 'Arbitrum' },
  ];

  const [selected, setSelected] = useState(options[0].value);
  const [accountAddress, setAccountAddress] = useState('');

  const handleChange = event => {
    console.log(event.target.value);
    setSelected(event.target.value);
  };

  const chainIdMap = {
    ethereum: {
      chainId: '0x7A69',
      chainName: 'Multichain Testnet Ethereum',
      rpcUrls: ['http://localhost:8545']
    },
    optimism: {
      chainId: '0x7A6A',
      chainName: 'Multichain Testnet Optimism',
      rpcUrls: ['http://localhost:8550']
    },
    arbitreum: {
      chainId: '0x7A6B',
      chainName: 'Multichain Testnet Arbitreum',
      rpcUrls: ['http://localhost:8555']
    },
    polygon: {
      chainId: '0x7A6C',
      chainName: 'Multichain Testnet Polygon',
      rpcUrls: ['http://localhost:8560']
    },
  };

  const getETH = async (chain, accountAddress) => {
    const res = await axios.post('http://localhost:3000/getETH', { chain, accountAddress });
    console.log(res);
  }

  const openBlockExplorer = async (chain) => {
    window.open(`http://localhost:3001?rpcUrl=${chainIdMap[chain].rpcUrls[0]}`, '_blank', 'noopener,noreferrer');
  }

  const switchChain = async (chainName) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdMap[chainName].chainId }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: chainIdMap[chainName].chainId,
                chainName: chainIdMap[chainName].chainName,
                rpcUrls: chainIdMap[chainName].rpcUrls,
              },
            ],
          });
          return;
        } catch (addError) {
          console.error(addError);
          alert('Unable to add Chain');
          throw addError;
        }
      }
      console.error(switchError);
    }
  }

  return (
    <div className="App">
      <div class="container">
        <section class="section is-medium">
          <h1 class="title">Multichain Testnet</h1>
          <h2 class="subtitle">
            A simple testnet with weak <strong>Mainnet Equivalence</strong>, test your smart contracts with mainnet state.
          </h2>
        </section>
        <div>
          <div class="columns">
            <div class="column">
              <div class="select is-info">
                <select value={selected} onChange={handleChange}>
                  {options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div class="column">
              <input class="input is-primary" type="text" placeholder="Wallet Address" onChange={event => setAccountAddress(event.target.value)}></input>
            </div>
            <div class="column">
              <button class="button is-info" onClick={async () => {
                if (selected !== '' && accountAddress !== '') {
                  await getETH(selected, accountAddress)
                }
              }}>Send 0.5 ETH/MATIC</button>
            </div>
          </div>

        </div>



      </div>
      <section className='section'>
        <div class="columns">
          <div class="column">
            <div class="card">
              <div class="card-image">
                <img width={100} height={100} src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Ethereum_logo_translucent.svg/800px-Ethereum_logo_translucent.svg.png" alt="" />
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">Ethereum</p>
                  </div>
                </div>

                <div class="content box">
                  <div class="block">
                    <button class="button is-light" onClick={() => {
                      switchChain('ethereum')
                    }}>Connect to Ethereum Testnet</button>
                  </div>

                  <div class="block">
                    <button class="button is-dark" onClick={() => {
                      openBlockExplorer('ethereum')
                    }}>Open Block Explorer</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="card">
              <div class="card-image">
                <img width={150} src="https://github.com/ethereum-optimism/brand-kit/blob/main/assets/images/Profile-Logo.png?raw=true" alt="" />
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">Optimism</p>
                  </div>
                </div>

                <div class="content box">
                  <div class="block">
                    <button class="button is-light" onClick={() => {
                      switchChain('optimism')
                    }}>Connect to Optimism Testnet</button>
                  </div>

                  <div class="block">
                    <button class="button is-dark" onClick={() => {
                      openBlockExplorer('optimism')
                    }}>Open Block Explorer</button>
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
                <img width={160} src="https://i.pinimg.com/474x/9b/1e/97/9b1e977d00b5d887608b156705a10759.jpg" alt="" />
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">Polygon (MATIC)</p>
                  </div>
                </div>

                <div class="content box">
                  <div class="block">
                    <button class="button is-light" onClick={() => {
                      switchChain('polygon')
                    }}>Connect to Polygon Testnet</button>
                  </div>

                  <div class="block">
                    <button class="button is-dark" onClick={() => {
                      openBlockExplorer('polygon')
                    }}>Open Block Explorer</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="card">
              <div class="card-image">
                <img width={145} src="https://bridge.arbitrum.io/images/Arbitrum_Symbol_-_Full_color_-_White_background.svg" alt="" />
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">Arbitrum</p>
                  </div>
                </div>

                <div class="content box">
                  <div class="block">
                    <button class="button is-light" onClick={() => {
                      switchChain('arbitrum')
                    }}>Connect to Arbitrum Testnet</button>
                  </div>

                  <div class="block">
                    <button class="button is-dark" onClick={() => {
                      openBlockExplorer('arbitrum')
                    }}>Open Block Explorer</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='section'>

      </section>
    </div >
  );
}

export default App;
