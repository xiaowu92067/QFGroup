// 引入express模块
const express = require('express');

// 引入body-parser中间件
const bodyParser = require("body-parser");

// 引入连接池模块
const pool = require('./pool.js');

// 创建服务器
const app = express();

// 静态资源托管
app.use(express.static("public"));

// 配置bodyPaeser中间件
app.use(bodyParser.urlencoded({
  extended: false
}));

// 1.获取管理团队详情列表路由
app.get('/teamList', (req, res) => {
  // 定义查询语句
  let sql = `SELECT id,tname,duty_name,picture FROM qf_team`;
  // 连接数据库进行查询
  pool.query(sql, (err, result) => {
    // 如果错误就抛出
    if (err) throw err;
    // 将查询结果返回给前端
    res.send({
      message: '查询成功',
      code: 1,
      result: result
    });
  })
});

// 2.获取首页推荐新闻列表路由
app.get('/indexNewsList', (req, res) => {
  // 定义查询语句
  let sql = `SELECT title,intro,show_img,created_time,news_id,category_name FROM qf_news_reports INNER JOIN news_category ON qf_news_reports.news_id=news_category.id WHERE isShow=1`;
  // 连接数据库进行查询
  pool.query(sql, (err, result) => {
    // 如果错误就抛出
    if (err) throw err;
    // 将查询结果返回给前端
    let map = {};
    let temp = [];
    for (let item of result) {
      if (!map[item.news_id]) {
        temp.push({
          id: item.news_id,
          category: item.category_name,
          data: [item]
        });
        map[item.news_id] = item;
      } else {
        for (let val of temp) {
          if (val.id == item.news_id) {
            val.data.push(item);
            break;
          }
        }
      }
    }
    res.send({
      message: "查询成功",
      code: 1,
      result: temp
    });
  })
});

// 3.投资者关系新闻获取API
app.get('/investor', (req, res) => {
  console.log(req.query)
  let news_id = req.query.id;
  let count = parseInt(req.query.count);
  let sql = 'SELECT title,created_time FROM qf_news_reports WHERE news_id=? ORDER BY created_time DESC LIMIT ?';
  pool.query(sql, [news_id, count], (err, result) => {
    if (err) throw err;
    res.send({
      message: '查询成功',
      code: 1,
      result: result
    })
  })
})

// 4.获取分页页数API
app.get('/getPage', (req, res) => {
  let news_id = req.query.id;
  let sql = 'SELECT COUNT(news_id) AS count FROM qf_news_reports WHERE news_id = ?';
  pool.query(sql, [news_id], (err, result) => {
    if (err) throw err;
    res.send({
      message: '查询成功',
      code: 1,
      result: result[0]
    })
  })
})

// 4.投资者关系下秦发财报页列表分页API
app.get('/reports', (req, res) => {
  let news_id = req.query.id;
  let pageSize = parseInt(req.query.count);
  let start = (req.query.page - 1) * pageSize;
  let sql = 'SELECT title,created_time FROM qf_news_reports WHERE news_id = ? ORDER BY created_time DESC LIMIT ?,?';
  pool.query(sql, [news_id, start, pageSize], (err, result) => {
    res.send({
      message: '查询成功',
      code: 1,
      result: result
    })
  })
})

//设置端口号
app.listen(8080);