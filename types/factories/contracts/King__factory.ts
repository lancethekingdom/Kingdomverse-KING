/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  King,
  KingInterface,
  VestingScheduleConfigStruct,
} from "../../contracts/King";

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "beneficiaryAddress",
            type: "address",
          },
          {
            internalType: "bool",
            name: "startNow",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "freezeDuration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "freezeAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "vestingDuration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "vestingAmount",
            type: "uint256",
          },
        ],
        internalType: "struct VestingScheduleConfig[]",
        name: "_initialVestingScheduleConfigs",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "MAX_SUPPLY",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getVestingPoolAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "beneficiaryAddress",
            type: "address",
          },
          {
            internalType: "bool",
            name: "startNow",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "freezeDuration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "freezeAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "vestingDuration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "vestingAmount",
            type: "uint256",
          },
        ],
        internalType: "struct VestingScheduleConfig[]",
        name: "_initialVestingScheduleConfigs",
        type: "tuple[]",
      },
    ],
    name: "initVestingPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reserve",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60c06040523480156200001157600080fd5b50604051620023d0380380620023d0833981016040819052620000349162000613565b6040805180820182526004808252634b494e4760e01b6020808401828152855180870190965292855284015281519192916200007391600391620004eb565b50805162000089906004906020840190620004eb565b50506005805460ff1916905550620000a13362000184565b6000805b82518110156200010f576000838281518110620000c657620000c662000739565b602002602001015190508060a0015183620000e2919062000765565b9250806060015183620000f6919062000765565b9250508080620001069062000780565b915050620000a5565b506080819052620001213082620001de565b3060405162000130906200057a565b6001600160a01b039091168152602001604051809103906000f0801580156200015d573d6000803e3d6000fd5b506001600160a01b031660a08190526080516200017c91309162000269565b5050620007db565b600580546001600160a01b03838116610100818102610100600160a81b031985161790945560405193909204169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6b033b2e3c9fd0803ce800000081620002016200039160201b620003ad1760201c565b6200020d919062000765565b11156200024e5760405162461bcd60e51b815260206004820152600a6024820152694d41585f535550504c5960b01b60448201526064015b60405180910390fd5b6200026582826200039760201b6200075c1760201c565b5050565b6001600160a01b038316620002cd5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b606482015260840162000245565b6001600160a01b038216620003305760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b606482015260840162000245565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b60025490565b6001600160a01b038216620003ef5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640162000245565b620003fd600083836200048a565b806002600082825462000411919062000765565b90915550506001600160a01b038216600090815260208190526040812080548392906200044090849062000765565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b620004a2838383620004e660201b620008471760201c565b60055460ff1615620004e65760405162461bcd60e51b815260206004820152600c60248201526b151bdad95b881c185d5cd95960a21b604482015260640162000245565b505050565b828054620004f9906200079e565b90600052602060002090601f0160209004810192826200051d576000855562000568565b82601f106200053857805160ff191683800117855562000568565b8280016001018555821562000568579182015b82811115620005685782518255916020019190600101906200054b565b506200057692915062000588565b5090565b6109ed80620019e383390190565b5b8082111562000576576000815560010162000589565b634e487b7160e01b600052604160045260246000fd5b60405160c081016001600160401b0381118282101715620005da57620005da6200059f565b60405290565b604051601f8201601f191681016001600160401b03811182821017156200060b576200060b6200059f565b604052919050565b600060208083850312156200062757600080fd5b82516001600160401b03808211156200063f57600080fd5b818501915085601f8301126200065457600080fd5b8151818111156200066957620006696200059f565b62000679848260051b01620005e0565b818152848101925060c09182028401850191888311156200069957600080fd5b938501935b828510156200072d5780858a031215620006b85760008081fd5b620006c2620005b5565b85516001600160a01b0381168114620006db5760008081fd5b8152858701518015158114620006f15760008081fd5b8188015260408681015190820152606080870151908201526080808701519082015260a08087015190820152845293840193928501926200069e565b50979650505050505050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600082198211156200077b576200077b6200074f565b500190565b60006000198214156200079757620007976200074f565b5060010190565b600181811c90821680620007b357607f821691505b60208210811415620007d557634e487b7160e01b600052602260045260246000fd5b50919050565b60805160a0516111d46200080f6000396000818161017f015261063a0152600081816102bb015261059c01526111d46000f3fe608060405234801561001057600080fd5b50600436106101375760003560e01c806370a08231116100b8578063a457c2d71161007c578063a457c2d71461027d578063a9059cbb14610290578063c0928884146102a3578063cd3293de146102b6578063dd62ed3e146102dd578063f2fde38b146102f057600080fd5b806370a0823114610226578063715018a61461024f5780638456cb59146102575780638da5cb5b1461025f57806395d89b411461027557600080fd5b8063313ce567116100ff578063313ce567146101dc57806332cb6b0c146101eb57806339509351146101fe5780633f4ba83a146102115780635c975abb1461021b57600080fd5b806306fdde031461013c578063095ea7b31461015a5780630a463e1c1461017d57806318160ddd146101b757806323b872dd146101c9575b600080fd5b610144610303565b6040516101519190610ddd565b60405180910390f35b61016d610168366004610e4e565b610395565b6040519015158152602001610151565b7f00000000000000000000000000000000000000000000000000000000000000005b6040516001600160a01b039091168152602001610151565b6002545b604051908152602001610151565b61016d6101d7366004610e78565b6103b3565b60405160128152602001610151565b6101bb6b033b2e3c9fd0803ce800000081565b61016d61020c366004610e4e565b6103d7565b6102196103f9565b005b60055460ff1661016d565b6101bb610234366004610eb4565b6001600160a01b031660009081526020819052604090205490565b61021961040b565b61021961041d565b60055461010090046001600160a01b031661019f565b61014461042d565b61016d61028b366004610e4e565b61043c565b61016d61029e366004610e4e565b6104bc565b6102196102b1366004610f46565b6104ca565b6101bb7f000000000000000000000000000000000000000000000000000000000000000081565b6101bb6102eb36600461104e565b6106b8565b6102196102fe366004610eb4565b6106e3565b60606003805461031290611081565b80601f016020809104026020016040519081016040528092919081815260200182805461033e90611081565b801561038b5780601f106103605761010080835404028352916020019161038b565b820191906000526020600020905b81548152906001019060200180831161036e57829003601f168201915b5050505050905090565b6000336103a381858561084c565b5060019392505050565b60025490565b6000336103c1858285610970565b6103cc8585856109ea565b506001949350505050565b6000336103a38185856103ea83836106b8565b6103f491906110d2565b61084c565b610401610bc3565b610409610c23565b565b610413610bc3565b6104096000610c75565b610425610bc3565b610409610ccf565b60606004805461031290611081565b6000338161044a82866106b8565b9050838110156104af5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b6103cc828686840361084c565b6000336103a38185856109ea565b6104d2610bc3565b600554600160a81b900460ff16156105365760405162461bcd60e51b815260206004820152602160248201527f56657374696e6720706f6f6c20686173206265656e20696e697469616c697a656044820152601960fa1b60648201526084016104a6565b6000805b8251811015610599576000838281518110610557576105576110ea565b602002602001015190508060a001518361057191906110d2565b925080606001518361058391906110d2565b925050808061059190611100565b91505061053a565b507f000000000000000000000000000000000000000000000000000000000000000081146106235760405162461bcd60e51b815260206004820152603160248201527f56657374696e6720616d6f756e7420646f6573206e6f74206d617463682077696044820152701d1a081c995cd95c9d9959081b5bdd5b9d607a1b60648201526084016104a6565b604051631f14452f60e31b81526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063f8a229789061066f90859060040161111b565b600060405180830381600087803b15801561068957600080fd5b505af115801561069d573d6000803e3d6000fd5b50506005805460ff60a81b1916600160a81b17905550505050565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6106eb610bc3565b6001600160a01b0381166107505760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016104a6565b61075981610c75565b50565b6001600160a01b0382166107b25760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016104a6565b6107be60008383610d0c565b80600260008282546107d091906110d2565b90915550506001600160a01b038216600090815260208190526040812080548392906107fd9084906110d2565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b505050565b6001600160a01b0383166108ae5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016104a6565b6001600160a01b03821661090f5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016104a6565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b600061097c84846106b8565b905060001981146109e457818110156109d75760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016104a6565b6109e4848484840361084c565b50505050565b6001600160a01b038316610a4e5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016104a6565b6001600160a01b038216610ab05760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016104a6565b610abb838383610d0c565b6001600160a01b03831660009081526020819052604090205481811015610b335760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016104a6565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610b6a9084906110d2565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610bb691815260200190565b60405180910390a36109e4565b6005546001600160a01b036101009091041633146104095760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104a6565b610c2b610d4e565b6005805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600580546001600160a01b03838116610100818102610100600160a81b031985161790945560405193909204169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b610cd7610d97565b6005805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610c583390565b60055460ff16156108475760405162461bcd60e51b815260206004820152600c60248201526b151bdad95b881c185d5cd95960a21b60448201526064016104a6565b60055460ff166104095760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b60448201526064016104a6565b60055460ff16156104095760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016104a6565b600060208083528351808285015260005b81811015610e0a57858101830151858201604001528201610dee565b81811115610e1c576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b0381168114610e4957600080fd5b919050565b60008060408385031215610e6157600080fd5b610e6a83610e32565b946020939093013593505050565b600080600060608486031215610e8d57600080fd5b610e9684610e32565b9250610ea460208501610e32565b9150604084013590509250925092565b600060208284031215610ec657600080fd5b610ecf82610e32565b9392505050565b634e487b7160e01b600052604160045260246000fd5b60405160c0810167ffffffffffffffff81118282101715610f0f57610f0f610ed6565b60405290565b604051601f8201601f1916810167ffffffffffffffff81118282101715610f3e57610f3e610ed6565b604052919050565b60006020808385031215610f5957600080fd5b823567ffffffffffffffff80821115610f7157600080fd5b818501915085601f830112610f8557600080fd5b813581811115610f9757610f97610ed6565b610fa5848260051b01610f15565b818152848101925060c0918202840185019188831115610fc457600080fd5b938501935b828510156110425780858a031215610fe15760008081fd5b610fe9610eec565b610ff286610e32565b81528686013580151581146110075760008081fd5b8188015260408681013590820152606080870135908201526080808701359082015260a0808701359082015284529384019392850192610fc9565b50979650505050505050565b6000806040838503121561106157600080fd5b61106a83610e32565b915061107860208401610e32565b90509250929050565b600181811c9082168061109557607f821691505b602082108114156110b657634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b600082198211156110e5576110e56110bc565b500190565b634e487b7160e01b600052603260045260246000fd5b6000600019821415611114576111146110bc565b5060010190565b602080825282518282018190526000919060409081850190868401855b8281101561119157815180516001600160a01b03168552868101511515878601528581015186860152606080820151908601526080808201519086015260a0908101519085015260c09093019290850190600101611138565b509197965050505050505056fea2646970667358221220e748fc6cc6b0b423d70e4ca7e92cb4b2ff8fb831f40cc584bf20cbfe434d510f64736f6c6343000809003360a060405234801561001057600080fd5b506040516109ed3803806109ed83398101604081905261002f916100f3565b610038336100a3565b6001600160a01b0381166100925760405162461bcd60e51b815260206004820152601560248201527f496e76616c696420546f6b656e20416464726573730000000000000000000000604482015260640160405180910390fd5b6001600160a01b0316608052610123565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60006020828403121561010557600080fd5b81516001600160a01b038116811461011c57600080fd5b9392505050565b6080516108a86101456000396000818161014701526102be01526108a86000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80639f8290631161005b5780639f829063146100da578063a141c41514610145578063f2fde38b1461016b578063f8a229781461017e57600080fd5b80632ec217e71461008d57806338cc4831146100a2578063715018a6146100c15780638da5cb5b146100c9575b600080fd5b6100a061009b366004610708565b610191565b005b305b6040516001600160a01b0390911681526020015b60405180910390f35b6100a06103d8565b6000546001600160a01b03166100a4565b6100ed6100e836600461072b565b6103ec565b6040516100b89190600060e0820190508251151582526020830151602083015260408301516040830152606083015160608301526080830151608083015260a083015160a083015260c083015160c083015292915050565b7f00000000000000000000000000000000000000000000000000000000000000006100a4565b6100a061017936600461072b565b61049e565b6100a061018c366004610746565b610517565b610199610563565b80516001600160a01b03166101f55760405162461bcd60e51b815260206004820152601b60248201527f42656e6566696369617279206973207a65726f2061646472657373000000000060448201526064015b60405180910390fd5b80516001600160a01b03166000908152600160205260409020805460ff16156102605760405162461bcd60e51b815260206004820152601f60248201527f56657374696e67207363686564756c6520616c7265616479206578697374730060448201526064016101ec565b600082606001518360a00151610276919061080c565b116102bc5760405162461bcd60e51b8152602060048201526016602482015275125b9d985b1a59081d995cdd1a5b99c8185b5bdd5b9d60521b60448201526064016101ec565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166323b872dd333085606001518660a00151610301919061080c565b6040516001600160e01b031960e086901b1681526001600160a01b0393841660048201529290911660248301526044820152606401602060405180830381600087803b15801561035057600080fd5b505af1158015610364573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103889190610824565b50805460ff1916600117815560a0820151600582015560608201516003820155604082015160028201556080820151600482015560208201516103cd576000196103cf565b425b60019091015550565b6103e0610563565b6103ea60006105bd565b565b61042e6040518060e001604052806000151581526020016000815260200160008152602001600081526020016000815260200160008152602001600081525090565b506001600160a01b0316600090815260016020818152604092839020835160e081018552815460ff161515815292810154918301919091526002810154928201929092526003820154606082015260048201546080820152600582015460a082015260069091015460c082015290565b6104a6610563565b6001600160a01b03811661050b5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016101ec565b610514816105bd565b50565b61051f610563565b60005b815181101561055f5761054d82828151811061054057610540610841565b6020026020010151610191565b8061055781610857565b915050610522565b5050565b6000546001600160a01b031633146103ea5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016101ec565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561064c5761064c61060d565b604052919050565b80356001600160a01b038116811461066b57600080fd5b919050565b801515811461051457600080fd5b600060c0828403121561069057600080fd5b60405160c0810181811067ffffffffffffffff821117156106b3576106b361060d565b6040529050806106c283610654565b815260208301356106d281610670565b8060208301525060408301356040820152606083013560608201526080830135608082015260a083013560a08201525092915050565b600060c0828403121561071a57600080fd5b610724838361067e565b9392505050565b60006020828403121561073d57600080fd5b61072482610654565b6000602080838503121561075957600080fd5b823567ffffffffffffffff8082111561077157600080fd5b818501915085601f83011261078557600080fd5b8135818111156107975761079761060d565b6107a5848260051b01610623565b818152848101925060c09182028401850191888311156107c457600080fd5b938501935b828510156107ea576107db898661067e565b845293840193928501926107c9565b50979650505050505050565b634e487b7160e01b600052601160045260246000fd5b6000821982111561081f5761081f6107f6565b500190565b60006020828403121561083657600080fd5b815161072481610670565b634e487b7160e01b600052603260045260246000fd5b600060001982141561086b5761086b6107f6565b506001019056fea26469706673582212208e2a3cf502c64416846a3e7490e040b6a26c32a9ceefd42ddecf155c5e25779164736f6c63430008090033";

type KingConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: KingConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class King__factory extends ContractFactory {
  constructor(...args: KingConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _initialVestingScheduleConfigs: VestingScheduleConfigStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<King> {
    return super.deploy(
      _initialVestingScheduleConfigs,
      overrides || {}
    ) as Promise<King>;
  }
  override getDeployTransaction(
    _initialVestingScheduleConfigs: VestingScheduleConfigStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _initialVestingScheduleConfigs,
      overrides || {}
    );
  }
  override attach(address: string): King {
    return super.attach(address) as King;
  }
  override connect(signer: Signer): King__factory {
    return super.connect(signer) as King__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): KingInterface {
    return new utils.Interface(_abi) as KingInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): King {
    return new Contract(address, _abi, signerOrProvider) as King;
  }
}
