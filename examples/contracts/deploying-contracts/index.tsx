import 'viem/window'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
  Account,
  Hash,
  TransactionReceipt,
  createWalletClient,
  createPublicClient,
  custom,
  getAccount,
  http,
  stringify,
} from 'viem'
import { goerli } from 'viem/chains'
import { wagmiContract } from './contract'

const publicClient = createPublicClient({
  chain: goerli,
  transport: http(),
})
const walletClient = createWalletClient({
  transport: custom(window.ethereum!),
})

function Example() {
  const [account, setAccount] = useState<Account>()
  const [hash, setHash] = useState<Hash>()
  const [receipt, setReceipt] = useState<TransactionReceipt>()

  const connect = async () => {
    const [address] = await walletClient.requestAddresses()
    setAccount(getAccount(address))
  }

  const deployContract = async () => {
    if (!account) return
    const hash = await walletClient.deployContract({
      ...wagmiContract,
      chain: goerli,
      account,
    })
    setHash(hash)
  }

  useEffect(() => {
    ;(async () => {
      if (hash) {
        const receipt = await publicClient.waitForTransactionReceipt({ hash })
        setReceipt(receipt)
      }
    })()
  }, [hash])

  if (account)
    return (
      <>
        <div>Connected: {account.address}</div>
        <button onClick={deployContract}>Deploy</button>
        {receipt && (
          <>
            <div>Contract Address: {receipt.contractAddress}</div>
            <div>
              Receipt:{' '}
              <pre>
                <code>{stringify(receipt, null, 2)}</code>
              </pre>
            </div>
          </>
        )}
      </>
    )
  return <button onClick={connect}>Connect Wallet</button>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Example />,
)
