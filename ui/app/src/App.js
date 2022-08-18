import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      name: 'ethereum',
      chainId: '0x7A69',
      chainName: 'Multichain Testnet Ethereum',
      rpcUrls: [process.env.REACT_APP_ETHEREUM_RPC_URL]
    },
    optimism: {
      name: 'optimism',
      chainId: '0x7A6A',
      chainName: 'Multichain Testnet Optimism',
      rpcUrls: [process.env.REACT_APP_OPTIMISM_RPC_URL]
    },
    arbitrum: {
      name: 'arbitrum',
      chainId: '0x7A6B',
      chainName: 'Multichain Testnet Arbitrum',
      rpcUrls: [process.env.REACT_APP_ARBITEUM_RPC_URL]
    },
    polygon: {
      name: 'polygon',
      chainId: '0x7A6C',
      chainName: 'Multichain Testnet Polygon',
      rpcUrls: [process.env.REACT_APP_POYGON_RPC_URL]
    },
  };

  const getETH = async (chain, accountAddress) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_FAUCET_URL}/getETH`,
        { chain, accountAddress });
      console.log(res);
      toast("🦄 Faucet Transfer Successfully!");
    } catch (err) {
      console.error(err);
      toast.error("😵 Faucet Failed to Transfer");
    }
  }

  const openBlockExplorer = async (chain) => {
    window.open(`${process.env.REACT_APP_BLOCK_EXPLORER_URL}?rpcUrl=${chainIdMap[chain].rpcUrls[0]}`,
      '_blank', 'noopener,noreferrer');
  }

  const switchChain = async (chainName) => {
    setSelected(chainName);
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdMap[chainName].chainId }],
      });
      toast("🦄 Test Chain Added to Metamask Successfully")
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
          toast.error('🤕 Unable to Add Test Chain to Metamask');
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
          <h1 class="title">🦄 Multichain Testnet</h1>
          <h2 class="subtitle">
            A simple testnet with weak <strong>Mainnet Equivalence</strong>,
            test your smart contracts with mainnet state.
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
                    <label>RPC URL - </label>
                    <input class="input is-link is-small" type="text" style={{
                      'textAlign': 'center',
                      'width': '50%'
                    }}
                      value={process.env.REACT_APP_ETHEREUM_RPC_URL} readOnly />
                  </div>

                  <div class="block">
                    <button class="button is-light" onClick={() => {
                      switchChain('ethereum')
                    }}>Connect to Ethereum Testnet</button>
                  </div>

                  <div class="block">
                    <button class="button is-dark" onClick={() => {
                      openBlockExplorer('ethereum')
                    }}>Open Etherem Block Explorer</button>
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
                    <label>RPC URL - </label>
                    <input class="input is-link is-small" type="text" style={{
                      'textAlign': 'center',
                      'width': '50%'
                    }}
                      value={process.env.REACT_APP_OPTIMISM_RPC_URL} readOnly />
                  </div>

                  <div class="block">
                    <button class="button is-light" onClick={() => {
                      switchChain('optimism')
                    }}>Connect to Optimism Testnet</button>
                  </div>

                  <div class="block">
                    <button class="button is-dark" onClick={() => {
                      openBlockExplorer('optimism')
                    }}>Open Optimism Block Explorer</button>
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
                    <label>RPC URL - </label>
                    <input class="input is-link is-small" type="text" style={{
                      'textAlign': 'center',
                      'width': '50%'
                    }}
                      value={process.env.REACT_APP_POLYGON_RPC_URL} readOnly />
                  </div>

                  <div class="block">
                    <button class="button is-light" onClick={() => {
                      switchChain('polygon')
                    }}>Connect to Polygon Testnet</button>
                  </div>

                  <div class="block">
                    <button class="button is-dark" onClick={() => {
                      openBlockExplorer('polygon')
                    }}>Open Polygon Block Explorer</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="card">
              <div class="card-image">
                <img width={148} src="https://miro.medium.com/max/1400/1*uDneNARNqdafkVxt5bxVuA.jpeg" alt="" />
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">Arbitrum</p>
                  </div>
                </div>

                <div class="content box">
                  <div class="block">
                    <label>RPC URL - </label>
                    <input class="input is-link is-small" type="text" style={{
                      'textAlign': 'center',
                      'width': '50%'
                    }}
                      value={process.env.REACT_APP_ARBITRUM_RPC_URL} readOnly />
                  </div>

                  <div class="block">
                    <button class="button is-light" onClick={() => {
                      switchChain('arbitrum')
                    }}>Connect to Arbitrum Testnet</button>
                  </div>

                  <div class="block">
                    <button class="button is-dark" onClick={() => {
                      openBlockExplorer('arbitrum')
                    }}>Open Arbitrum Block Explorer</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />
      </div>
    </div >
  );
}

export default App;
