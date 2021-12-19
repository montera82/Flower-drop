import { toast } from 'react-toastify';
import Flower from '../contracts/Flower.json';
import { useAppContext } from '../AppContext';
import { useContract } from './useContract';

export const useFlower = (client = 'MetaMask') => {
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

  // const flowerContractAddress = '0xAb500B7cACA0Eb1DEB905935BAb181EB3c946cEA'; // Ganache
  const flowerContractAddress = '0x1ED866f17bD8bE57fb4E0f38B315E24309484D7E'; // Rinkeby
  // const flowerContractAddress = '0xcf94f9a9add6205718750acff8e4fd1084dcf0f8'; // Mainnet
  const flowerContract = useContract(flowerContractAddress, Flower.abi, client);

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
      console.log(flowerContract, '----------->');
      const isNonCollector = await flowerContract.isNonCollector(address);
      console.log(isNonCollector, 'isNoncollector==============>');
      setIsNonCollector(isNonCollector);
    } catch (e) {
      console.log(e, 'Error fetching isNonCollector ------------------------>');
      toast(e.message);
    }
  };

  const fetchIsOpenEditionCollector = async (address) => {
    try {
      console.log(address);
      let isOpenEditionCollector;
      const safeHeavenTokens = [4216, 4209, 4213, 4215, 4207, 4214, 4211, 4208, 4210, 4212, 4206];
      const graceIITokens = [
        4173, 4168, 4176, 4236, 4171, 4212, 4190, 4098, 4092, 4167, 4112, 4228, 4149, 4209, 4244,
        4146, 4222, 4165, 4158, 4153, 4136, 4139, 4100, 4217, 4208, 4178, 4152, 4221, 4141, 4218,
        4087, 4082, 4097, 4071, 4150, 4204, 4193, 4242, 4220, 4099, 4140, 4077, 4237, 4170, 4162,
        4073, 4101, 4240, 4142, 4085, 4148, 4191, 4129, 4128, 4172, 4253, 4070, 4095, 4199, 4081,
        4108, 4151, 4084, 4206, 4124, 4110, 4230, 4106, 4120, 4216, 4093, 4154, 4198, 4175, 4103,
        4137, 4117, 4118, 4192, 4185, 4076, 4078, 4223, 4213, 4186, 4225, 4159, 4210, 4134, 4116,
        4114, 4145, 4187, 4133, 4243, 4096, 4232, 4111, 4188, 4183, 4090, 4104, 4211, 4219, 4164,
        4089, 4161, 4113, 4235, 4197, 4147, 4207, 4229, 4086, 4094, 4224, 4122, 4157, 4109, 4251,
        4181, 4254, 4125, 4252, 4130, 4248, 4182, 4144, 4163, 4166, 4105, 4184, 4201, 4189, 4156,
        4249, 4123, 4169, 4115, 4231, 4215, 4138, 4234, 4131, 4119, 4247, 4074, 4179, 4202, 4246,
        4155, 4121, 4180, 4102, 4079, 4238, 4143, 4245, 4080, 4083, 4075, 4135, 4195, 4200, 4203,
        4239, 4233, 4196, 4227, 4132, 4250, 4107, 4174, 4160, 4177, 4226, 66, 67, 68, 4194, 4088,
        4205, 4072, 4214, 4241, 4126, 4127, 4091
      ];

      const result1 = await Promise.all(
        safeHeavenTokens.map(async (token) => {
          const isSafeHeavenOwner = await flowerContract.isSafeHavenOwner(address, token);

          return isSafeHeavenOwner;
        })
      );

      const result2 = await Promise.all(
        graceIITokens.map(async (token) => {
          const isGraceIIOwner = await flowerContract.isGraceIIOwner(address, token);

          return isGraceIIOwner;
        })
      );

      console.log(result1, result2);
      isOpenEditionCollector = [...result1, ...result2].some((res) => res == true);
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
      await flowerContract.mintNonCollector(address);
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
