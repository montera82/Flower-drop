import Flower from '../contracts/Flower.json';
import { useAppContext } from '../AppContext';
import { useContract } from './useContract';

export const useFlower = () => {
  const {
    mintingOneOfOne,
    mintingNonCollector,
    mintingOpenEdition,
    isOneOfOneCollector,
    isNonCollector,
    isOpenEditionCollector,
    hasMintedOneOfOneCollection,
    hasMintedNonCollection,
    hasMintedOpenEditionCollection,
    setMintingOneOfOne,
    setMintingNonCollector,
    setMintingOpenEdition,
    setIsOneOfOneCollector,
    setIsNonCollector,
    setIsOpenEditionCollector,
    setHasMintedOneOfOneCollection,
    setHasMintedNonCollection,
    setHasMintedOpenEditionCollection
  } = useAppContext();

  const flowerContractAddress = '0x35B7C302CD8aE4A08505B13440E557a8A2A2379F'; // Rinkeby
  const flowerContract = useContract(flowerContractAddress, Flower.abi);

  const fetchIsOneOfOneCollector = async (address) => {
    try {
      const isOneOfOneCollector = await flowerContract.isOneOfOneCollector(address);
      setIsOneOfOneCollector(isOneOfOneCollector);
    } catch (e) {
      console.log(e.message, 'Error fetching isOneOfOneCollector');
    }
  };

  const fetchIsNonCollector = async (address) => {
    try {
      const isNonCollector = await flowerContract.isNonCollector(address);
      setIsNonCollector(isNonCollector);
    } catch (e) {
      console.log(e.message, 'Error fetching isNonCollector');
    }
  };

  const fetchIsOpenEditionCollector = async (address) => {
    try {
      const isOpenEditionCollector = await flowerContract.isOpenEditionCollector(address);
      setIsOpenEditionCollector(isOpenEditionCollector);
    } catch (e) {
      console.log(e.message, 'Error fetching isOpenEditionCollector');
    }
  };

  const fetchHasMintedOneOfOneCollection = async (address) => {
    try {
      const hasMintedOneOfOneCollection = await flowerContract.oneOfOneMintList(address);
      setHasMintedOneOfOneCollection(hasMintedOneOfOneCollection);
    } catch (e) {
      console.log(e.message, 'Error fetching oneOfOneMintList');
    }
  };

  const fetchHasMintedNonCollection = async (address) => {
    try {
      const hasMintedNonCollection = await flowerContract.nonCollectorsMintList(address);
      setHasMintedNonCollection(hasMintedNonCollection);
    } catch (e) {
      console.log(e.message, 'Error fetching nonCollectorsMintList');
    }
  };

  const fetchHasMintedOpenEditionCollection = async (address) => {
    try {
      const hasMintedOpenEditionCollection = await flowerContract.openEditionCollectorsMintList(
        address
      );
      setHasMintedOpenEditionCollection(hasMintedOpenEditionCollection);
    } catch (e) {
      console.log(e.message, 'Error fetching openEditionCollectorMintList');
    }
  };

  const mintOneOfOneCollection = async (address) => {
    setMintingOneOfOne(true);
    try {
      await flowerContract.mint1Of1Holder(address);
      flowerContract.on('LogMintOneOfOneHolder', async () => {
        const hasMintedOneOfOneCollection = await flowerContract.oneOfOneMintList(address);
        setHasMintedOneOfOneCollection(hasMintedOneOfOneCollection);
        setMintingOneOfOne(false);
      });
    } catch (e) {
      setMintingOneOfOne(false);
      console.log(e.message, 'Error minting oneOfOneHolder');
    }
  };

  const mintNonCollectorCollection = async (address) => {
    setMintingNonCollector(true);
    try {
      await flowerContract.mintNonCollector(address);
      flowerContract.on('LogMintNonCollector', async () => {
        const hasMintedNonCollection = await flowerContract.nonCollectorsMintList(address);
        setHasMintedNonCollection(hasMintedNonCollection);
        setMintingNonCollector(false);
      });
    } catch (e) {
      setMintingNonCollector(false);
      console.log(e.message, 'Error minting nonCollector');
    }
  };

  const mintOpenEditionCollection = async (address) => {
    setMintingOpenEdition(true);
    try {
      await flowerContract.mintOpenEdition(address);
      flowerContract.on('LogMintOpenEdition', async () => {
        const hasMintedOpenEditionCollection = await flowerContract.openEditionCollectorsMintList(
          address
        );
        setHasMintedOpenEditionCollection(hasMintedOpenEditionCollection);
        setMintingOpenEdition(false);
      });
    } catch (e) {
      setMintingOpenEdition(false);
      console.log(e.message, 'Error minting openEdition');
    }
  };

  return {
    mintingOneOfOne,
    mintingNonCollector,
    mintingOpenEdition,
    isOneOfOneCollector,
    isNonCollector,
    isOpenEditionCollector,
    hasMintedOneOfOneCollection,
    hasMintedNonCollection,
    hasMintedOpenEditionCollection,
    fetchIsOneOfOneCollector,
    fetchIsNonCollector,
    fetchIsOpenEditionCollector,
    fetchHasMintedOneOfOneCollection,
    fetchHasMintedNonCollection,
    fetchHasMintedOpenEditionCollection,
    mintOneOfOneCollection,
    mintNonCollectorCollection,
    mintOpenEditionCollection
  };
};
