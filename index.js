const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 1111;

app.use(express.json());
app.use(cors()); // 添加 CORS 中间件


app.get('/proxy', async (req, res) => {
  try {
    const targetUrl = req.query.url; // 从查询参数中获取目标 URL
    const targetResponse = await axios({
      method: 'GET',
      url: targetUrl,
      headers: req.headers,
    });

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    res.status(targetResponse.status).send(targetResponse.data);
  } catch (error) {
    console.log(error);
    res.status(500).send('Proxy Error');
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});

