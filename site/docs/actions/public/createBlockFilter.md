---
head:
  - - meta
    - property: og:title
      content: createBlockFilter
  - - meta
    - name: description
      content: An Action for creating a new Block Filter.
  - - meta
    - property: og:description
      content: An Action for creating a new Block Filter.

---

# createBlockFilter

Creates a Filter to listen for new block hashes that can be used with [`getFilterChanges`](/docs/actions/public/getFilterChanges).

## Usage

```ts
import { publicClient } from '.'

const filter = await publicClient.createBlockFilter() // [!code focus:99]
// { id: "0x345a6572337856574a76364e457a4366", type: 'block' }
```

## Returns

[`Filter`](/docs/glossary/types#filter)

## JSON-RPC Methods

[`eth_newBlockFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newBlockFilter)