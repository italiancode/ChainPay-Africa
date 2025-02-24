import { http, createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";
import { monadTestnet } from "./chains/monadChain";
import { crossfiTestnet } from "./chains";
import { useAccount } from "wagmi";


export const SUPPORTED_CHAIN_IDS = [mainnet, crossfiTestnet, monadTestnet];

export const DEFAULT_CHAIN = crossfiTestnet;

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}

export const wagmiConfig = createConfig({
  chains: [mainnet, crossfiTestnet, monadTestnet],
  connectors: [
    injected(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
    }),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [crossfiTestnet.id]: http(),
    [monadTestnet.id]: http(),
  },
});

export interface PaymentToken {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
  contractAddress: string;
  image: string;
}

// Function to get accepted tokens for the connected chain
export function getAcceptedTokens(): PaymentToken[] { // Explicitly define the return type
  const { chain } = useAccount();

  // console.log("chain", chain);
  if (!chain) return []; // Return empty if no chain is connected

  const acceptedTokens =
    chain.id === crossfiTestnet.id ? crossfiTestnet.payAcceptedTokens : {};
  
  // Ensure the return type is PaymentToken[]
  return Object.values(acceptedTokens) as PaymentToken[]; // Cast to PaymentToken[]
};

// // Example usage in a React component
// const BalanceComponent = () => {
//   const { fetchBalance } = useBalance();

//   const balance = fetchBalance();
//   console.log("Balance:", balance);

//   return balance;
// };

// export default BalanceComponent;
