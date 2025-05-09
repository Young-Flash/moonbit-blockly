/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import {blocks} from './blocks/moonbit_blocks';
import {forBlock} from './generators/javascript';
import {moonbitGenerator} from './generators/moonbit_generator';
import {save, load} from './serialization';
import {moonbit_toolbox} from './toolbox';
import './index.css';

// 扩展 Window 接口
declare global {
  interface Window {
    stopGame?: () => void;
    loadAndStartGame?: () => Promise<void>;
  }
}

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(blocks);
Object.assign(moonbitGenerator.forBlock, forBlock);

// Set up UI elements and inject Blockly
const codeDiv = document.getElementById('generatedCode')?.firstChild;
const blocklyDiv = document.getElementById('blocklyDiv');
const applyButton = document.getElementById('applyButton');

if (!blocklyDiv) {
  throw new Error(`div with id 'blocklyDiv' not found`);
}
const ws = Blockly.inject(blocklyDiv, {toolbox: moonbit_toolbox});

let currentCode = '';

// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
const runCode = () => {
  currentCode = moonbitGenerator.workspaceToCode(ws as Blockly.Workspace);
  if (codeDiv) codeDiv.textContent = currentCode;
};

// 应用按钮点击事件处理
const handleApplyCode = async () => {
  try {
    // 构建完整的文件路径
    const filePath = 'src/moonbit-snake/src/main/diy_controll.mbt';
    
    // 使用 fetch 发送 PUT 请求到 VSCode 的文件系统 API
    const response = await fetch(`http://localhost:3000/write-file?path=${encodeURIComponent(filePath)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: currentCode,
    });

    if (!response.ok) {
      throw new Error('写入文件失败');
    }

    console.log('代码已成功应用到贪吃蛇游戏！');

    // 等待一段时间，确保后台编译完成
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 重新加载游戏
    if (window.stopGame && window.loadAndStartGame) {
      window.stopGame();
      window.loadAndStartGame();
    }
  } catch (error) {
    console.error('写入文件时出错:', error);
    alert('写入失败，请查看控制台了解详情');
  }
};

// 添加按钮点击事件监听
if (applyButton) {
  applyButton.addEventListener('click', handleApplyCode);
}

if (ws) {
  // Load the initial state from storage and run the code.
  load(ws);
  runCode();

  // Every time the workspace changes state, save the changes to storage.
  ws.addChangeListener((e: Blockly.Events.Abstract) => {
    // UI events are things like scrolling, zooming, etc.
    // No need to save after one of these.
    if (e.isUiEvent) return;
    save(ws);
  });

  // Whenever the workspace changes meaningfully, run the code again.
  ws.addChangeListener((e: Blockly.Events.Abstract) => {
    // Don't run the code when the workspace finishes loading; we're
    // already running it once when the application starts.
    // Don't run the code during drags; we might have invalid state.
    if (
      e.isUiEvent ||
      e.type == Blockly.Events.FINISHED_LOADING ||
      ws.isDragging()
    ) {
      return;
    }
    runCode();
  });
}
