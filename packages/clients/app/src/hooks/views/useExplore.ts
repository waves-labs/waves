import { ScannerDataProps, useScanner } from "../scanner/useScanner";

export interface ExploreDataProps extends ScannerDataProps {}

export const useExplore = (): ExploreDataProps => {
  const scanner = useScanner();

  return {
    ...scanner,
  };
};
