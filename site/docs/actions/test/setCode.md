---
head:
  - - meta
    - property: og:title
      content: setCode
  - - meta
    - name: description
      content: Modifies the bytecode stored at an account's address.
  - - meta
    - property: og:description
      content: Modifies the bytecode stored at an account's address.

---

# setCode

Modifies the bytecode stored at an account's address.

## Usage

```ts
import { testClient } from '.'
 
await testClient.setCode({ // [!code focus:4]
  address: '0xe846c6fcf817734ca4527b28ccb4aea2b6663c79',
  bytecode: '0x60806040526000600355600019600955600c80546001600160a01b031916737a250d5630b4cf539739df...'
})
```

## Parameters

### address

- **Type:** [`Address`](/docs/glossary/types#address)

The account address.

```ts
await testClient.setCode({
  address: '0xe846c6fcf817734ca4527b28ccb4aea2b6663c79', // [!code focus]
  bytecode: '0x60806040526000600355600019600955600c80546001600160a01b031916737a250d5630b4cf539739df...'
})
```

### bytecode

- **Type:** [`Hex`](/docs/glossary/types#hex)

The stored bytecode.

```ts
await testClient.setCode({
  address: '0xe846c6fcf817734ca4527b28ccb4aea2b6663c79',
  bytecode: '0x60806040526000600355600019600955600c80546001600160a01b031916737a250d5630b4cf539739df...' // [!code focus]
})
```