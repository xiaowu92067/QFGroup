// 引入express模块
const express = require('express');

// 引入body-parser中间件
const bodyParser = require("body-parser");

// 引入连接池模块
const pool = require('./pool.js');

// 创建服务器
const app = express();

// 静态资源托管
app.use( express.static("public") );

// 配置bodyPaeser中间件
app.use( bodyParser.urlencoded({
  extended:false
}) );

// 1.获取管理团队详情列表路由
app.get('/teamList',(req,res)=>{
  // 定义查询语句
  let sql = `SELECT id,tname,duty_name,picture FROM qf_team`;
  // 连接数据库进行查询
  pool.query(sql,(err,result)=>{
    // 如果错误就抛出
    if(err) throw err;
    // 将查询结果返回给前端
    res.send({message: '查询成功', code: 1, result: result});
  })
});

// 2.获取首页推荐新闻列表路由
app.get('/indexNewsList',(req,res)=>{
  // 定义查询语句
  let sql = `SELECT title,show_img,c_time,news_id FROM qf_news_reports WHERE isShow=1`;
  // 连接数据库进行查询
  pool.query(sql,(err,result)=>{
    // 如果错误就抛出
    if(err) throw err;
    // 将查询结果返回给前端
    res.send({message: "查询成功", code: 1, result: result});
  })
});

// 3.

//设置端口号
app.listen(8080);