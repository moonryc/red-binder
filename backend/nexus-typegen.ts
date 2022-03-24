/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */







declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Account: { // root type
    account_id: string; // ID!
    email: string; // String!
    username: string; // String!
    users: NexusGenRootTypes['User'][]; // [User!]!
  }
  Dosage: { // root type
    daily: boolean; // Boolean!
    dosage_amount: number; // Int!
    dosage_id: number; // Int!
    dosage_measurement: string; // String!
    friday: boolean; // Boolean!
    medication_id: number; // Int!
    monday: boolean; // Boolean!
    monthly: boolean; // Boolean!
    saturday: boolean; // Boolean!
    sunday: boolean; // Boolean!
    thursday: boolean; // Boolean!
    time_to_take: string; // String!
    tuesday: boolean; // Boolean!
    user_id: number; // Int!
    wednesday: boolean; // Boolean!
    weekly: boolean; // Boolean!
  }
  Medication: { // root type
    bottle_dosage_measurement: string; // String!
    bottle_dosage_number: number; // Float!
    medication_id: number; // Int!
    medication_name: string; // String!
    next_refill: string; // String!
    notes?: string | null; // String
  }
  Query: {};
  User: { // root type
    color: string; // String!
    medications?: Array<NexusGenRootTypes['Medication'] | null> | null; // [Medication]
    name: string; // String!
    user_id: string; // ID!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Account: { // field return type
    account_id: string; // ID!
    email: string; // String!
    username: string; // String!
    users: NexusGenRootTypes['User'][]; // [User!]!
  }
  Dosage: { // field return type
    daily: boolean; // Boolean!
    dosage_amount: number; // Int!
    dosage_id: number; // Int!
    dosage_measurement: string; // String!
    friday: boolean; // Boolean!
    medication_id: number; // Int!
    monday: boolean; // Boolean!
    monthly: boolean; // Boolean!
    saturday: boolean; // Boolean!
    sunday: boolean; // Boolean!
    thursday: boolean; // Boolean!
    time_to_take: string; // String!
    tuesday: boolean; // Boolean!
    user_id: number; // Int!
    wednesday: boolean; // Boolean!
    weekly: boolean; // Boolean!
  }
  Medication: { // field return type
    bottle_dosage_measurement: string; // String!
    bottle_dosage_number: number; // Float!
    medication_id: number; // Int!
    medication_name: string; // String!
    next_refill: string; // String!
    notes: string | null; // String
  }
  Query: { // field return type
    account_query: NexusGenRootTypes['Account']; // Account!
    dosage_query: Array<NexusGenRootTypes['Dosage'] | null>; // [Dosage]!
    user_query: NexusGenRootTypes['User']; // User!
  }
  User: { // field return type
    color: string; // String!
    medications: Array<NexusGenRootTypes['Medication'] | null> | null; // [Medication]
    name: string; // String!
    user_id: string; // ID!
  }
}

export interface NexusGenFieldTypeNames {
  Account: { // field return type name
    account_id: 'ID'
    email: 'String'
    username: 'String'
    users: 'User'
  }
  Dosage: { // field return type name
    daily: 'Boolean'
    dosage_amount: 'Int'
    dosage_id: 'Int'
    dosage_measurement: 'String'
    friday: 'Boolean'
    medication_id: 'Int'
    monday: 'Boolean'
    monthly: 'Boolean'
    saturday: 'Boolean'
    sunday: 'Boolean'
    thursday: 'Boolean'
    time_to_take: 'String'
    tuesday: 'Boolean'
    user_id: 'Int'
    wednesday: 'Boolean'
    weekly: 'Boolean'
  }
  Medication: { // field return type name
    bottle_dosage_measurement: 'String'
    bottle_dosage_number: 'Float'
    medication_id: 'Int'
    medication_name: 'String'
    next_refill: 'String'
    notes: 'String'
  }
  Query: { // field return type name
    account_query: 'Account'
    dosage_query: 'Dosage'
    user_query: 'User'
  }
  User: { // field return type name
    color: 'String'
    medications: 'Medication'
    name: 'String'
    user_id: 'ID'
  }
}

export interface NexusGenArgTypes {
  Query: {
    account_query: { // args
      account_id: number; // Int!
    }
    dosage_query: { // args
      user_id: number; // Int!
    }
    user_query: { // args
      user_id: number; // Int!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}