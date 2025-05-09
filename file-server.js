const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(cors());
app.use(express.text());

// 处理文件写入请求
app.put('/write-file', async (req, res) => {
  try {
    const filePath = req.query.path;
    if (!filePath) {
      return res.status(400).json({ error: '缺少文件路径' });
    }

    // 获取完整的文件路径
    const fullPath = path.join(__dirname, filePath);

    console.log('写入文件路径:', fullPath);

    // 写入文件
    await fs.writeFile(fullPath, req.body, 'utf8');
    res.json({ success: true });
  } catch (error) {
    console.error('写入文件时出错:', error);
    res.status(500).json({ error: '写入失败' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`文件服务器运行在 http://localhost:${port}`);
}); 