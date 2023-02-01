import web3 from "./web3";
import Accounts from "../artifacts/contracts/Accounts.sol/Accounts.json";

const instance = new web3.eth.Contract(
  Accounts.abi,
  '0x22501e40BFFB3C21492DE79675bdF7b585F7D078'

);

export default instance;
