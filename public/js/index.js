let getId = function(i){
  return document.getElementById(i);
}
// 轮播图
let lb = (function () {
  let count = 1;
  // 定时器
  let timer = setInterval(() => {
    count++;
    if (count == 4) {
      count = 1;
    }
    for (let i = 1; i < 4; i++) {
      getId(`ctrl_${i}`).className = "";
    }
    getId(`ctrl_${count}`).className = "active";
    getId('b_img').src = `./img/index/banner${count}.jpg`;
  }, 4000);
  return timer;
})();
// 轮播图按钮
function sel_img(id) {
  for (let i = 1; i < 4; i++) {
    getId(`ctrl_${i}`).className = "";
  }
  getId(`ctrl_${id}`).className = "active";
  getId('b_img').src = `./img/index/banner${id}.jpg`;
}

// 获取首页展示新闻信息
$(function(){
  $.ajax({
    url: "/indexNewsList",
    type: 'get',
    dataType: "json",
    success: function(result){
      console.log(result);
    }
  })
})