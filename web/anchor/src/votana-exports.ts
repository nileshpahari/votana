// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import votanaIDL from '../target/idl/votana.json'
import type { Votana as votana } from '../target/types/votana'

// Re-export the generated IDL and type
export { votana, votanaIDL }

// The programId is imported from the program IDL.
export const votana_PROGRAM_ID = new PublicKey(votanaIDL.address)

// This is a helper function to get the votana Anchor program.
export function getvotanaProgram(provider: AnchorProvider) {
  return new Program(votanaIDL as votana, provider)
}

// This is a helper function to get the program ID for the votana program depending on the cluster.
export function getvotanaProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the votana program on devnet and testnet.
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg')
    case 'mainnet-beta':
    default:
      return votana_PROGRAM_ID
  }
}
