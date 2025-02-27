---
head:
  - - meta
    - property: og:title
      content: setNextBlockBaseFeePerGas
  - - meta
    - name: description
      content: Sets the next block's base fee per gas.
  - - meta
    - property: og:description
      content: Sets the next block's base fee per gas.

---

# setNextBlockBaseFeePerGas

Sets the next block's base fee per gas.

## Usage

```ts
import { testClient } from '.'
 
await testClient.setNextBlockBaseFeePerGas({ // [!code focus:4]
  baseFeePerGas: parseGwei('20')
})
```

## Parameters

### baseFeePerGas

- **Type:** `bigint`

Base fee per gas.

```ts
await testClient.setNextBlockBaseFeePerGas({
  baseFeePerGas: parseGwei('30') // [!code focus]
})
```