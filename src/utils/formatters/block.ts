import type { Chain, Block, Formatter, Formatters, RpcBlock } from '../../types'
import { defineFormatter, ExtractFormatter, Formatted } from './format'
import { formatTransaction } from './transaction'

export type BlockFormatter<TChain extends Chain = Chain> = ExtractFormatter<
  TChain,
  'block',
  NonNullable<Formatters['block']>
>

export type FormattedBlock<
  TFormatter extends Formatter | undefined = Formatter,
> = Formatted<TFormatter, Block>

export function formatBlock(block: Partial<RpcBlock>) {
  // TODO: Properly format transactions with a custom formatter
  const transactions = block.transactions?.map((transaction) => {
    if (typeof transaction === 'string') return transaction
    return formatTransaction(transaction)
  })
  return {
    ...block,
    baseFeePerGas: block.baseFeePerGas ? BigInt(block.baseFeePerGas) : null,
    difficulty: block.difficulty ? BigInt(block.difficulty) : undefined,
    gasLimit: block.gasLimit ? BigInt(block.gasLimit) : undefined,
    gasUsed: block.gasUsed ? BigInt(block.gasUsed) : undefined,
    number: block.number ? BigInt(block.number) : null,
    size: block.size ? BigInt(block.size) : undefined,
    timestamp: block.timestamp ? BigInt(block.timestamp) : undefined,
    transactions,
    totalDifficulty: block.totalDifficulty
      ? BigInt(block.totalDifficulty)
      : null,
  } as Block
}

export const defineBlock = defineFormatter({ format: formatBlock })
