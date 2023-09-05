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
      title
    }
  }
`;

const SynthsQuery = gql`
  query ($address: String!) {
    synths(address: $address) {
      id
      title
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

  let synths: SynthUI[] = [];
  let waves: WaveUI[] = [];

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
