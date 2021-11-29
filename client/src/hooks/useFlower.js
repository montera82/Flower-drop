import { toast } from 'react-toastify';
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

  const flowerContractAddress = '0x2fC0F86f195DA1bb9F489E6EFAD46595Df18e2b4'; // Rinkeby
  const flowerContract = useContract(flowerContractAddress, Flower.abi);

  const fetchIsOneOfOneCollector = async (address) => {
    try {
      const isOneOfOneCollector = await flowerContract.isOneOfOneCollector(address);
      setIsOneOfOneCollector(isOneOfOneCollector);
    } catch (e) {
      console.log(e.message, 'Error fetching isOneOfOneCollector');
      toast(e.message);
    }
  };

  const fetchIsNonCollector = async (address) => {
    try {
      const isNonCollector = await flowerContract.isNonCollector(address);
      setIsNonCollector(isNonCollector);
    } catch (e) {
      console.log(e.message, 'Error fetching isNonCollector');
      toast(e.message);
    }
  };

  const fetchIsOpenEditionCollector = async (address) => {
    try {
      const isOpenEditionCollector = await flowerContract.isOpenEditionCollector(address);
      setIsOpenEditionCollector(isOpenEditionCollector);
    } catch (e) {
      console.log(e.message, 'Error fetching isOpenEditionCollector');
      toast(e.message);
    }
  };

  const fetchHasMintedOneOfOneCollection = async (address) => {
    try {
      const hasMintedOneOfOneCollection = await flowerContract.oneOfOneMintList(address);
      setHasMintedOneOfOneCollection(hasMintedOneOfOneCollection);
    } catch (e) {
      console.log(e.message, 'Error fetching oneOfOneMintList');
      toast(e.message);
    }
  };

  const fetchHasMintedNonCollection = async (address) => {
    try {
      const hasMintedNonCollection = await flowerContract.nonCollectorsMintList(address);
      setHasMintedNonCollection(hasMintedNonCollection);
    } catch (e) {
      console.log(e.message, 'Error fetching nonCollectorsMintList');
      toast(e.message);
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
      toast(e.message);
    }
  };

  const mintOneOfOneCollection = async (address) => {
    setMintingOneOfOne(true);
    try {
      const res = await flowerContract.mint1Of1Holder(address);
      console.log('res', res);
      flowerContract.on('LogMintOneOfOneHolder', async () => {
        const hasMintedOneOfOneCollection = await flowerContract.oneOfOneMintList(address);
        setHasMintedOneOfOneCollection(hasMintedOneOfOneCollection);
        setMintingOneOfOne(false);
      });
    } catch (e) {
      setMintingOneOfOne(false);
      console.log(e.message, 'Error minting oneOfOneHolder');
      toast(e.message);
    }
  };

  const mintNonCollectorCollection = async (address) => {
    setMintingNonCollector(true);
    try {
      const res = await flowerContract.mintNonCollector(address);
      console.log('res --------->', res);
      flowerContract.on('LogMintNonCollector', async () => {
        const hasMintedNonCollection = await flowerContract.nonCollectorsMintList(address);
        setHasMintedNonCollection(hasMintedNonCollection);
        setMintingNonCollector(false);
      });
    } catch (e) {
      setMintingNonCollector(false);
      console.log(e, 'Error minting nonCollector');
      toast(e.message);
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
      toast(e.message);
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
