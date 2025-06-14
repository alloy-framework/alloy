#!/usr/bin/env node

/**
 * Mock WebSocket server for testing the symbol store
 * Run with: node scripts/mock-server.js
 */

import { WebSocketServer } from 'ws'

const port = 8080
const wss = new WebSocketServer({ port })

console.log(`Mock WebSocket server running on ws://localhost:${port}`)

// Output symbol flags
const OutputSymbolFlags = {
  None: 0,
  InstanceMemberContainer: 1 << 0,
  StaticMemberContainer: 1 << 1,
  MemberContainer: (1 << 0) | (1 << 1),
  InstanceMember: 1 << 2,
  StaticMember: 1 << 3,
  Transient: 1 << 4,
  Alias: 1 << 5,
  Member: (1 << 2) | (1 << 3),
}

// Output scope flags
const OutputScopeFlags = {
  None: 0,
  StaticMemberScope: 1 << 0,
  InstanceMemberScope: 1 << 1,
  Transient: 1 << 2,
  MemberScope: (1 << 0) | (1 << 1),
}

let symbolId = 0
let scopeId = 0

// Sample scope tree structure to send incrementally
const sampleScopeTree = {
  // 1. Global scope first
  globalScope: {
    id: ++scopeId,
    name: 'global',
    kind: 'global',
    flags: OutputScopeFlags.None,
    symbols: [],
    children: [],
    parent: null,
    owner: null,
    metadata: { description: 'Global scope' },
  },

  // 2. Nested scopes
  moduleScope: {
    id: ++scopeId,
    name: 'UserModule',
    kind: 'module',
    flags: OutputScopeFlags.None,
    symbols: [],
    children: [],
    parent: 1, // globalScope id
    owner: null,
    metadata: { description: 'User module scope' },
  },

  classScope: {
    id: ++scopeId,
    name: 'UserClass',
    kind: 'class',
    flags: OutputScopeFlags.None,
    symbols: [],
    children: [],
    parent: 2, // moduleScope id
    owner: null,
    metadata: { description: 'User class scope' },
  },

  // Member scopes will be created for symbols that have members
  instanceMemberScope: {
    id: ++scopeId,
    name: 'UserClass_instanceMembers',
    kind: 'instanceMembers',
    flags: OutputScopeFlags.InstanceMemberScope,
    symbols: [],
    children: [],
    parent: null,
    owner: null, // Will be set to UserClass symbol id
    metadata: { description: 'Instance members of UserClass' },
  },

  staticMemberScope: {
    id: ++scopeId,
    name: 'UserClass_staticMembers',
    kind: 'staticMembers',
    flags: OutputScopeFlags.StaticMemberScope,
    symbols: [],
    children: [],
    parent: null,
    owner: null, // Will be set to UserClass symbol id
    metadata: { description: 'Static members of UserClass' },
  },
}

// Sample symbols
const sampleSymbols = {
  // Regular symbol (no flags)
  regularFunction: {
    id: ++symbolId,
    name: 'processData',
    originalName: 'processData',
    flags: OutputSymbolFlags.None,
    scope: 2, // moduleScope
    refkeys: ['processData_ref_001'],
    metadata: { description: 'Regular function symbol' },
    instanceMemberScope: null,
    staticMemberScope: null,
    aliasTarget: null,
  },

  // Static member container symbol
  utilityClass: {
    id: ++symbolId,
    name: 'UtilityClass',
    originalName: 'UtilityClass',
    flags: OutputSymbolFlags.StaticMemberContainer,
    scope: 2, // moduleScope
    refkeys: ['UtilityClass_ref_001'],
    metadata: { description: 'Utility class with static members only' },
    instanceMemberScope: null,
    staticMemberScope: ++scopeId, // Will create static member scope
    aliasTarget: null,
  },

  // Instance and static member container symbol
  userClass: {
    id: ++symbolId,
    name: 'UserClass',
    originalName: 'UserClass',
    flags: OutputSymbolFlags.InstanceMemberContainer | OutputSymbolFlags.StaticMemberContainer,
    scope: 3, // classScope
    refkeys: ['UserClass_ref_001'],
    metadata: { description: 'User class with both instance and static members' },
    instanceMemberScope: 4, // instanceMemberScope
    staticMemberScope: 5, // staticMemberScope
    aliasTarget: null,
  },

  // Instance members
  instanceMethod: {
    id: ++symbolId,
    name: 'getName',
    originalName: 'getName',
    flags: OutputSymbolFlags.InstanceMember,
    scope: 4, // instanceMemberScope
    refkeys: ['getName_ref_001'],
    metadata: { description: 'Instance method' },
    instanceMemberScope: null,
    staticMemberScope: null,
    aliasTarget: null,
  },

  instanceProperty: {
    id: ++symbolId,
    name: 'name',
    originalName: 'name',
    flags: OutputSymbolFlags.InstanceMember,
    scope: 4, // instanceMemberScope
    refkeys: ['name_ref_001'],
    metadata: { description: 'Instance property' },
    instanceMemberScope: null,
    staticMemberScope: null,
    aliasTarget: null,
  },

  // Static members
  staticMethod: {
    id: ++symbolId,
    name: 'create',
    originalName: 'create',
    flags: OutputSymbolFlags.StaticMember,
    scope: 5, // staticMemberScope
    refkeys: ['create_ref_001'],
    metadata: { description: 'Static factory method' },
    instanceMemberScope: null,
    staticMemberScope: null,
    aliasTarget: null,
  },

  staticProperty: {
    id: ++symbolId,
    name: 'DEFAULT_NAME',
    originalName: 'DEFAULT_NAME',
    flags: OutputSymbolFlags.StaticMember,
    scope: 5, // staticMemberScope
    refkeys: ['DEFAULT_NAME_ref_001'],
    metadata: { description: 'Static constant' },
    instanceMemberScope: null,
    staticMemberScope: null,
    aliasTarget: null,
  },

  // Utility class static members
  utilityStaticMethod: {
    id: ++symbolId,
    name: 'formatString',
    originalName: 'formatString',
    flags: OutputSymbolFlags.StaticMember,
    scope: 6, // utilityClass staticMemberScope
    refkeys: ['formatString_ref_001'],
    metadata: { description: 'Utility static method' },
    instanceMemberScope: null,
    staticMemberScope: null,
    aliasTarget: null,
  },
}

// Additional scopes for utility class
sampleScopeTree.utilityStaticMemberScope = {
  id: 6,
  name: 'UtilityClass_staticMembers',
  kind: 'staticMembers',
  flags: OutputScopeFlags.StaticMemberScope,
  symbols: [8], // utilityStaticMethod
  children: [],
  parent: null,
  owner: 2, // utilityClass symbol
  metadata: { description: 'Static members of UtilityClass' },
}

// Update scope symbol arrays
sampleScopeTree.globalScope.children = [2] // moduleScope
sampleScopeTree.moduleScope.symbols = [1, 2] // regularFunction, utilityClass
sampleScopeTree.moduleScope.children = [3] // classScope
sampleScopeTree.classScope.symbols = [3] // userClass
sampleScopeTree.instanceMemberScope.symbols = [4, 5] // instanceMethod, instanceProperty
sampleScopeTree.instanceMemberScope.owner = 3 // userClass
sampleScopeTree.staticMemberScope.symbols = [6, 7] // staticMethod, staticProperty
sampleScopeTree.staticMemberScope.owner = 3 // userClass

function createScopeMessage(scope) {
  return {
    type: 'scope_added',
    data: {
      scope: scope,
      nodeId: Math.floor(Math.random() * 1000), // Mock nodeId
    },
  }
}

function createSymbolMessage(symbol) {
  return {
    type: 'symbol_added',
    data: {
      symbol: symbol,
      nodeId: Math.floor(Math.random() * 1000), // Mock nodeId
    },
  }
}

wss.on('connection', (ws) => {
  console.log('Client connected')

  ws.on('error', console.error)

  ws.on('close', () => {
    console.log('Client disconnected')
  })

  // Send incremental scope tree data
  let step = 0
  const sendNextStep = () => {
    if (ws.readyState !== ws.OPEN) return

    switch (step) {
      case 0:
        // 1. Send global scope first
        ws.send(JSON.stringify(createScopeMessage(sampleScopeTree.globalScope)))
        console.log('Sent: Global scope')
        break

      case 1:
        // 2. Send module scope
        ws.send(JSON.stringify(createScopeMessage(sampleScopeTree.moduleScope)))
        console.log('Sent: Module scope')
        break

      case 2:
        // 3. Send class scope
        ws.send(JSON.stringify(createScopeMessage(sampleScopeTree.classScope)))
        console.log('Sent: Class scope')
        break

      case 3:
        // 4. Send regular function symbol (no flags)
        ws.send(JSON.stringify(createSymbolMessage(sampleSymbols.regularFunction)))
        console.log('Sent: Regular function symbol')
        break

      case 4:
        // 5. Send utility class static member scope first
        ws.send(JSON.stringify(createScopeMessage(sampleScopeTree.utilityStaticMemberScope)))
        console.log('Sent: Utility class static member scope')
        break

      case 5:
        // 6. Send utility class symbol (static member container)
        ws.send(JSON.stringify(createSymbolMessage(sampleSymbols.utilityClass)))
        console.log('Sent: Utility class symbol (static member container)')
        break

      case 6:
        // 7. Send utility static method
        ws.send(JSON.stringify(createSymbolMessage(sampleSymbols.utilityStaticMethod)))
        console.log('Sent: Utility static method')
        break

      case 7:
        // 8. Send instance member scope
        ws.send(JSON.stringify(createScopeMessage(sampleScopeTree.instanceMemberScope)))
        console.log('Sent: Instance member scope')
        break

      case 8:
        // 9. Send static member scope
        ws.send(JSON.stringify(createScopeMessage(sampleScopeTree.staticMemberScope)))
        console.log('Sent: Static member scope')
        break

      case 9:
        // 10. Send user class symbol (instance and static member container)
        ws.send(JSON.stringify(createSymbolMessage(sampleSymbols.userClass)))
        console.log('Sent: User class symbol (instance and static member container)')
        break

      case 10:
        // 11. Send instance method
        ws.send(JSON.stringify(createSymbolMessage(sampleSymbols.instanceMethod)))
        console.log('Sent: Instance method')
        break

      case 11:
        // 12. Send instance property
        ws.send(JSON.stringify(createSymbolMessage(sampleSymbols.instanceProperty)))
        console.log('Sent: Instance property')
        break

      case 12:
        // 13. Send static method
        ws.send(JSON.stringify(createSymbolMessage(sampleSymbols.staticMethod)))
        console.log('Sent: Static method')
        break

      case 13:
        // 14. Send static property
        ws.send(JSON.stringify(createSymbolMessage(sampleSymbols.staticProperty)))
        console.log('Sent: Static property')
        console.log('Scope tree complete!')
        return // Stop sending

      default:
        return // Stop sending
    }

    step++
    // Schedule next step
    setTimeout(sendNextStep, 1500)
  }

  // Start sending data after a short delay
  setTimeout(sendNextStep, 1000)

  ws.on('close', () => {
    console.log('Client disconnected')
  })
})

process.on('SIGINT', () => {
  console.log('\nShutting down server...')
  wss.close(() => {
    process.exit(0)
  })
})
