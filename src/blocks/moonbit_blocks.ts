/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

// 变量定义
const letBlock = {
  type: 'let_statement',
  message0: 'let %1 = %2', 
  args0: [
    {
      type: 'field_input',
      name: 'VAR',
    },
    {
      type: 'input_value',
      name: 'VALUE',
    }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 160,
  tooltip: '定义一个变量'
};

// 数字字面量
const numberBlock = {
  type: 'number',
  message0: '%1',
  args0: [{
    type: 'field_number',
    name: 'NUM',
    value: 0
  }],
  output: 'Number',
  colour: 230,
  tooltip: '数字'
};

// 加法运算
const addBlock = {
  type: 'add',
  message0: '%1 + %2',
  args0: [
    {
      type: 'input_value',
      name: 'A',
      check: 'Number'
    },
    {
      type: 'input_value', 
      name: 'B',
      check: 'Number'
    }
  ],
  output: 'Number',
  colour: 230,
  tooltip: '加法运算'
};

// 数组定义
const arrayBlock = {
  type: 'array_create',
  message0: '[]',
  output: 'Array',
  colour: 260,
  tooltip: '创建空数组'
};

// 数组 push
const arrayPushBlock = {
  type: 'array_push',
  message0: '%1 . push ( %2 )',
  args0: [
    {
      type: 'input_value',
      name: 'ARRAY',
      check: 'Array'
    },
    {
      type: 'input_value',
      name: 'ITEM'
    }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 260,
  tooltip: '向数组添加元素'
};

// 打印语句
const printBlock = {
  type: 'print',
  message0: 'println ( %1 )',
  args0: [
    {
      type: 'input_value',
      name: 'VALUE',
    }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 160,
  tooltip: '打印值'
};

// test 函数块
const testBlock = {
  type: 'test_function',
  message0: 'test { %1 %2 }',
  args0: [
    {
      type: 'input_dummy'
    },
    {
      type: 'input_statement',
      name: 'BODY',
      check: 'Statement'
    }
  ],
  colour: 290,
  tooltip: 'Test 函数定义'
};

// for 循环块
const forBlock = {
  type: 'for_loop',
  message0: 'for %1 = %2; %3 < %4; %5 = %6 { %7 %8 }',
  args0: [
    {
      type: 'field_input',
      name: 'VAR',
      text: 'i'
    },
    {
      type: 'input_value',
      name: 'FROM',
      check: 'Number'
    },
    {
      type: 'field_input',
      name: 'VAR2',
      text: 'i'
    },
    {
      type: 'input_value',
      name: 'TO',
      check: 'Number'
    },
    {
      type: 'field_input',
      name: 'VAR3',
      text: 'i'
    },
    {
      type: 'input_value',
      name: 'BY',
      check: 'Number'
    },
    {
      type: 'input_dummy'
    },
    {
      type: 'input_statement',
      name: 'DO',
      check: 'Statement'
    }
  ],
  previousStatement: 'Statement',
  nextStatement: 'Statement',
  colour: 120,
  tooltip: 'For 循环'
};

// 方向控制函数块
const diyControlBlock = {
  type: 'diy_control',
  message0: '定义方向控制 %1 %2',
  args0: [
    {
      type: 'input_dummy'
    },
    {
      type: 'input_statement',
      name: 'CONTROLS',
      check: 'Direction_Control'
    }
  ],
  colour: 290,
  tooltip: '定义方向控制函数'
};

// 方向控制匹配块
const directionControlBlock = {
  type: 'direction_control',
  message0: '当按下 %1 键时朝 %2 方向移动',
  args0: [
    {
      type: 'field_dropdown',
      name: 'KEY',
      options: [
        ['↑', '1'],
        ['↓', '2'],
        ['←', '3'],
        ['→', '4']
      ]
    },
    {
      type: 'field_dropdown',
      name: 'DIRECTION',
      options: [
        ['上', 'Up'],
        ['下', 'Down'],
        ['左', 'Left'],
        ['右', 'Right']
      ]
    }
  ],
  previousStatement: 'Direction_Control',
  nextStatement: 'Direction_Control',
  colour: 160,
  tooltip: '设置按键与移动方向的对应关系'
};

export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  testBlock,
  letBlock,
  numberBlock,
  addBlock,
  arrayBlock,
  arrayPushBlock,
  printBlock,
  forBlock,
  diyControlBlock,
  directionControlBlock
]);
