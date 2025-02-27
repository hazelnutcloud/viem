---
head:
  - - meta
    - property: og:title
      content: setNonce
  - - meta
    - name: description
      content: Modifies (overrides) the nonce of an account.
  - - meta
    - property: og:description
      content: Modifies (overrides) the nonce of an account.

---

# setNonce

Modifies (overrides) the nonce of an account.

## Usage

```ts
import { testClient } from '.'
 
await testClient.setNonce({ // [!code focus:4]
  address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
  nonce: 420
})
```

## Parameters

### address

- **Type:** [`Address`](/docs/glossary/types#address)

The address of the target account.

```ts
await testClient.setNonce({
  address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC', // [!code focus]
  nonce: 420
})
```

### nonce (optional)

- **Type:** `number`

The nonce.

```ts
await testClient.setNonce({
  address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
  nonce: 420 // [!code focus]
})
```