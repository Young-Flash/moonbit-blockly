运行步骤：
1. `node node file-server.js`：启动一个服务器监听文件(diy_controller.mbt)写入请求
2. `cd src/moonbit-snake && moon build --watch --debug`：构建贪吃蛇小游戏的 .wasm 文件，注意要开启 --watch，这样当 diy_controller.mbt 改动的时候会自动重新构建
3. `npm run build && npm start`