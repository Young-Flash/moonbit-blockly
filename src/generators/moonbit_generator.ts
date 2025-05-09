import * as Blockly from 'blockly';

export const moonbitGenerator = new Blockly.Generator('moonbit');

moonbitGenerator.forBlock['let_statement'] = function(block) {
  const varName = block.getFieldValue('VAR');
  const value = moonbitGenerator.valueToCode(block, 'VALUE', 0);
  const nextBlock = moonbitGenerator.blockToCode(block.getNextBlock());
  return `let ${varName} = ${value};\n${nextBlock}`;
};

moonbitGenerator.forBlock['number'] = function(block) {
  const number = block.getFieldValue('NUM');
  return [number.toString(), 0];
};

moonbitGenerator.forBlock['add'] = function(block) {
  const a = moonbitGenerator.valueToCode(block, 'A', 0);
  const b = moonbitGenerator.valueToCode(block, 'B', 0);
  return [`${a} + ${b}`, 0];
};

moonbitGenerator.forBlock['array_create'] = function(block) {
  return ['[]', 0];
};

moonbitGenerator.forBlock['array_push'] = function(block) {
  const array = moonbitGenerator.valueToCode(block, 'ARRAY', 0);
  const item = moonbitGenerator.valueToCode(block, 'ITEM', 0);
  return `${array}.push(${item});\n`;
};

moonbitGenerator.forBlock['print'] = function(block) {
  const value = moonbitGenerator.valueToCode(block, 'VALUE', 0);
  const nextBlock = moonbitGenerator.blockToCode(block.getNextBlock());
  return `println(${value});\n${nextBlock}`;
};

moonbitGenerator.forBlock['test_function'] = function(block) {
  const body = moonbitGenerator.statementToCode(block, 'BODY');
  return `test {\n${body}}\n`;
};

moonbitGenerator.forBlock['for_loop'] = function(block) {
  const variable = block.getFieldValue('VAR');
  const from = moonbitGenerator.valueToCode(block, 'FROM', 0);
  const to = moonbitGenerator.valueToCode(block, 'TO', 0);
  const by = moonbitGenerator.valueToCode(block, 'BY', 0);
  const branch = moonbitGenerator.statementToCode(block, 'DO');
  const nextBlock = moonbitGenerator.blockToCode(block.getNextBlock());
  return `for ${variable} = ${from}; ${variable} < ${to}; ${variable} = ${by} {\n${branch}}\n${nextBlock}`;
};

moonbitGenerator.forBlock['diy_control'] = function(block) {
  const controls = moonbitGenerator.statementToCode(block, 'CONTROLS');
  return `fn diy_controll(a : Int) -> Direction {\n  match a {\n${controls}    _ => Default\n  }\n}\n`;
};

moonbitGenerator.forBlock['direction_control'] = function(block) {
  const key = block.getFieldValue('KEY');
  const direction = block.getFieldValue('DIRECTION');
  const nextBlock = moonbitGenerator.blockToCode(block.getNextBlock());
  return `    ${key} => ${direction}\n${nextBlock}`;
};
