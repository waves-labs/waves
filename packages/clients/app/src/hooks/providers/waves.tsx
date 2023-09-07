import { useAccount } from "wagmi";
import { gql, useQuery } from "urql";
import { createContext, useContext } from "react";

export interface WavesDataProps {
  synths: SynthUI[];
  waves: WaveUI[];
}

type Props = {
  children: React.ReactNode;
};

const WavesContext = createContext<WavesDataProps | null>(null);

const SynthNFTsQuery = gql`
  query {
    synthNfts {
      id
      nftOwnershipRequired
      artist
      organizer
      name
      blockNumber
      blockTimestamp
      transactionHash

      nftWhitelist
      waveNFTs {
        waveNft {
          id
          startTime
          duration
          artiist
          creative
          name
          data
          blockNumber
          blockTimestamp
          transactionHash
        }
      }
    }
  }
`;

// query ($address: String!) {
//   synths(address: $address) {

const SynthsQuery = gql`
  query {
    synths {
      id
      owner
      contract
      tokenId
      blockNumber
      blockTimestamp
      transactionHash

      waves {
        wave {
          id
          owner
          contract
          tokenId
          blockNumber
          blockTimestamp
          transactionHash
        }
      }
    }
  }
`;

export const WavesProvider = ({ children }: Props) => {
  const currentValue = useContext(WavesContext);

  if (currentValue) throw new Error("WavesProvider can only be used once");

  const { address } = useAccount();

  const [nfts, fetchNfts] = useQuery<SynthNFT[]>({
    query: SynthNFTsQuery,
    // variables: { from, limit },
  });
  const [tokens, fetchTokens] = useQuery<Synth[]>({
    query: SynthsQuery,
    // variables: { from, limit },
  });

  let waves: WaveUI[] = [];
  const synths: SynthUI[] = nfts.data?.reduce((acc, nft) => {
    // const synth = {
    //   ...nft,
    //   waves: nft.waveNFTs.map((wave) => ({
    //     ...wave.waveNft,
    //     synth: nft,
    //   })),
    // };

    waves = [...waves];

    return [...acc];
  }, []);

  return (
    <WavesContext.Provider
      value={{
        synths,
        waves,
      }}
    >
      {children}
    </WavesContext.Provider>
  );
};

export const useWaves = () => {
  const value = useContext(WavesContext);
  if (!value) throw new Error("Must be used within a WavesProvider");
  return value;
};
