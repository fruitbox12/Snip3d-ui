import { Network, Alchemy } from "alchemy-sdk";

const settings = {
    apiKey: "Sutir0tQfRQsB0GRQERYNKB383HrsQaX",
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export default alchemy