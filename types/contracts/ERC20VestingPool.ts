/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export type VestingScheduleConfigStruct = {
  beneficiaryAddress: PromiseOrValue<string>;
  startNow: PromiseOrValue<boolean>;
  freezeDuration: PromiseOrValue<BigNumberish>;
  freezeAmount: PromiseOrValue<BigNumberish>;
  vestingDuration: PromiseOrValue<BigNumberish>;
  vestingAmount: PromiseOrValue<BigNumberish>;
};

export type VestingScheduleConfigStructOutput = [
  string,
  boolean,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber
] & {
  beneficiaryAddress: string;
  startNow: boolean;
  freezeDuration: BigNumber;
  freezeAmount: BigNumber;
  vestingDuration: BigNumber;
  vestingAmount: BigNumber;
};

export type VestingScheduleStruct = {
  valid: PromiseOrValue<boolean>;
  startTime: PromiseOrValue<BigNumberish>;
  freezeDuration: PromiseOrValue<BigNumberish>;
  freezeAmount: PromiseOrValue<BigNumberish>;
  vestingDuration: PromiseOrValue<BigNumberish>;
  vestingAmount: PromiseOrValue<BigNumberish>;
  claimed: PromiseOrValue<BigNumberish>;
};

export type VestingScheduleStructOutput = [
  boolean,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber
] & {
  valid: boolean;
  startTime: BigNumber;
  freezeDuration: BigNumber;
  freezeAmount: BigNumber;
  vestingDuration: BigNumber;
  vestingAmount: BigNumber;
  claimed: BigNumber;
};

export interface ERC20VestingPoolInterface extends utils.Interface {
  functions: {
    "addVestingSchedule((address,bool,uint256,uint256,uint256,uint256))": FunctionFragment;
    "addVestingSchedules((address,bool,uint256,uint256,uint256,uint256)[])": FunctionFragment;
    "getVestingSchedule(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addVestingSchedule"
      | "addVestingSchedules"
      | "getVestingSchedule"
      | "owner"
      | "renounceOwnership"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addVestingSchedule",
    values: [VestingScheduleConfigStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "addVestingSchedules",
    values: [VestingScheduleConfigStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getVestingSchedule",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "addVestingSchedule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addVestingSchedules",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVestingSchedule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "ERC20Released(address,uint256)": EventFragment;
    "EtherReleased(uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ERC20Released"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EtherReleased"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface ERC20ReleasedEventObject {
  token: string;
  amount: BigNumber;
}
export type ERC20ReleasedEvent = TypedEvent<
  [string, BigNumber],
  ERC20ReleasedEventObject
>;

export type ERC20ReleasedEventFilter = TypedEventFilter<ERC20ReleasedEvent>;

export interface EtherReleasedEventObject {
  amount: BigNumber;
}
export type EtherReleasedEvent = TypedEvent<
  [BigNumber],
  EtherReleasedEventObject
>;

export type EtherReleasedEventFilter = TypedEventFilter<EtherReleasedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface ERC20VestingPool extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ERC20VestingPoolInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addVestingSchedule(
      _config: VestingScheduleConfigStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addVestingSchedules(
      _configs: VestingScheduleConfigStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getVestingSchedule(
      _beneficiaryAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[VestingScheduleStructOutput]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  addVestingSchedule(
    _config: VestingScheduleConfigStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addVestingSchedules(
    _configs: VestingScheduleConfigStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getVestingSchedule(
    _beneficiaryAddress: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<VestingScheduleStructOutput>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addVestingSchedule(
      _config: VestingScheduleConfigStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    addVestingSchedules(
      _configs: VestingScheduleConfigStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    getVestingSchedule(
      _beneficiaryAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<VestingScheduleStructOutput>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ERC20Released(address,uint256)"(
      token?: PromiseOrValue<string> | null,
      amount?: null
    ): ERC20ReleasedEventFilter;
    ERC20Released(
      token?: PromiseOrValue<string> | null,
      amount?: null
    ): ERC20ReleasedEventFilter;

    "EtherReleased(uint256)"(amount?: null): EtherReleasedEventFilter;
    EtherReleased(amount?: null): EtherReleasedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    addVestingSchedule(
      _config: VestingScheduleConfigStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addVestingSchedules(
      _configs: VestingScheduleConfigStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getVestingSchedule(
      _beneficiaryAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addVestingSchedule(
      _config: VestingScheduleConfigStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addVestingSchedules(
      _configs: VestingScheduleConfigStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getVestingSchedule(
      _beneficiaryAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
