---
head:
  - - meta
    - property: og:title
      content: TypeScript
  - - meta
    - name: description
      content: TypeScript support for viem.
  - - meta
    - property: og:description
      content: TypeScript support for viem.
---

# TypeScript

viem is designed to be as type-safe as possible! Things to keep in mind:

- Types currently require using TypeScript v4.9.4 or greater.
- Changes to types in this repository are considered non-breaking and are usually released as patch semver changes (otherwise every type enhancement would be a major version!).
- It is highly recommended that you lock your `viem` package version to a specific patch release and upgrade with the expectation that types may be fixed or upgraded between any release.
- The non-type-related public API of `viem` still follows semver very strictly.

To ensure everything works correctly, make sure that your `tsconfig.json` has [`strict`](https://www.typescriptlang.org/tsconfig#strict) mode set to `true`:

```json [tsconfig.json]
{
  "compilerOptions": {
    "strict": true
  }
}
```

## Type Inference

viem can infer types based on [ABI](https://docs.soliditylang.org/en/v0.8.15/abi-spec.html#json) and [EIP-712](https://eips.ethereum.org/EIPS/eip-712) Typed Data definitions (powered by [ABIType](https://abitype.dev)), giving you full end-to-end type-safety from your contracts to your frontend and incredible developer experience (e.g. autocomplete ABI function names and catch misspellings, strongly-typed ABI function arguments, etc.).

For this to work, you must either add [const assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) to specific configuration parameters (more info on those below) or define them inline. For example, [`readContract`](/docs/contract/readContract)'s `abi` configuration parameter:

```ts
const result = client.readContract({
  abi: […], // <--- defined inline
})
```

```ts
const abi = […] as const // <--- const assertion
const result = client.readContract({ abi })
```

If type inference isn't working, it's likely you forgot to add a `const` assertion or define the configuration parameter inline.

::: tip
Unfortunately [TypeScript doesn't support importing JSON as const](https://github.com/microsoft/TypeScript/issues/32063). Check out [`@wagmi/cli`](/cli) to help with this! It can automatically fetch ABIs from Etherscan, resolve ABIs from your Foundry/Hardhat projects, and much more.
:::

### Contract ABIs

The following actions and utilities support type inference when you add a const assertion to `abi` or define `abi` inline:

#### Actions

- [`createEventFilter`](/docs/actions/public/createEventFilter)
- [`watchEvent`](/docs/actions/public/watchEvent)
- [`createContractEventFilter`](/docs/contract/createContractEventFilter)
- [`deployContract`](/docs/contract/deployContract)
- [`estimateContractGas`](/docs/contract/estimateContractGas)
- [`multicall`](/docs/contract/multicall)
- [`readContract`](/docs/contract/readContract)
- [`simulateContract`](/docs/contract/simulateContract)
- [`writeContract`](/docs/contract/writeContract)
- [`watchContractEvent`](/docs/contract/watchContractEvent)

#### Utilities

- [`decodeEventLog` ](/docs/contract/decodeEventLog)
- [`decodeFunctionResult` ](/docs/contract/decodeFunctionResult)
- [`encodeDeployData` ](/docs/contract/encodeDeployData)
- [`encodeErrorResult` ](/docs/contract/encodeErrorResult)
- [`encodeEventTopics` ](/docs/contract/encodeEventTopics)
- [`encodeFunctionData` ](/docs/contract/encodeFunctionData)
- [`encodeFunctionResult` ](/docs/contract/encodeFunctionResult)
- [`getAbiItem` ](/docs/abi/getAbiItem)

For example, `readContract`:

```ts
const result = client.readContract({
  //  ^? const data: bigint | undefined
  address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
  abi: [
    {
      name: 'balanceOf',
      type: 'function',
      stateMutability: 'view',
      inputs: [{ name: 'account', type: 'address' }],
      outputs: [{ type: 'uint256' }],
    },
    {
      name: 'totalSupply',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ type: 'uint256' }],
    },
    {
      name: 'transfer',
      type: 'function',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'recipient', type: 'address' },
        { name: 'tokenId', type: 'uint256' },
      ],
      outputs: [{ type: 'bool' }],
    },
  ],

  functionName: 'balanceOf',
  // ^? (property) functionName?: "balanceOf" | "totalSupply" | undefined
  // Notice how "transfer" is not included since it is not a "read" function

  args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
  // ^? (property) args?: readonly [`0x${string}`] | undefined
})
```

### EIP-712 Typed Data

Adding a const assertion to `types` or defining `types` inline adds type inference to [`signTypedData`](/docs/actions/wallet/signTypedData)'s `value` configuration parameter:

```ts
const result = client.signTypedData({
  domain: {
    name: 'Ether Mail',
    version: '1',
    chainId: 1,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  },

  types: {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },

  value: {
    // ^? (parameter) value?: { name: string; wallet: `0x${string}` } | {
    //     from: {
    //         name: string;
    //         wallet: `0x${string}`;
    //     };
    //     to: {
    //         name: string;
    //         wallet: `0x${string}`;
    //     };
    //     contents: string;
    // } | undefined
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
})
```

### Other

The following utilities support type inference when you use const assertions or define arguments inline:

- [`decodeAbiParameters` ](/docs/abi/decodeAbiParameters)
- [`encodeAbiParameters` ](/docs/abi/encodeAbiParameters)
- [`encodePacked` ](/docs/abi/encodePacked)
- [`parseAbi` ](/docs/abi/parseAbi)
- [`parseAbiItem` ](/docs/abi/parseAbiItem)
- [`parseAbiParameter` ](/docs/abi/parseAbiParameter)
- [`parseAbiParameters` ](/docs/abi/parseAbiParameters)

## Configuring Internal Types

For advanced use-cases, you may want to configure viem's internal types. Most of viem's types relating to ABIs and EIP-712 Typed Data are powered by [ABIType](https://abitype.dev). See ABIType's [documentation](https://abitype.dev/config.html) for more info on how to configure types.
