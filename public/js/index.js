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

$.ajax({
  url: '/indexNewsList',
  type: 'get',
  dataType: "json",
  success: res=>{
    let categoryHtml = `<div class="contain">
      <ul class="n_sort clearfix">`;
    let newsList = `
      <div class="n_show">
    `;
    for(let i=0; i < res.result.length; i++){
      categoryHtml += `
        <li data-select="${i+1}">
          ${res.result[i].category}
        </li>
      `;
      newsList += `
        <div class="row">
          <div class="n_img">
            <a href="javascript:void(0)">
              <img src="./img/index/20180413110359359.jpg">
            </a>
          </div>
          <div class="n_list">
            <ul>
      `;
      for(let item of res.result[i].data){
        let time = item.created_time;
        let day = time.substring(time.lastIndexOf('-')+1);
        let date = time.substring(0,time.lastIndexOf('-'));
        newsList += `
          <li>
            <div class="time">
              <p>
                ${day}
              </p>
                ${date}
            </div>
            <div class="title">
              <p>
                ${item.title}
              </p>
              <span>
                ${item.intro || ''}
              </span>
            </div>
          </li>
        `;
      }
      newsList += `
            </ul>
            <div>
              <a class="news_btn bg_qfblue" href="javascript:void(0)">查看更多</a>
            </div>
          </div>
        </div>
      `;
    }
    categoryHtml += `</ul>`;
    newsList += `
        </div>
      </div>
    `;
    categoryHtml += newsList;
    $('.index_new_list').html(categoryHtml);
  }
});

$(window).load(function(){
  $('.n_sort.clearfix li:first').addClass('active');
  $('.n_show .row:first').addClass('active');
  $('.n_sort.clearfix li').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
    let num = $(this).attr('data-select');
    $('.n_show .row').removeClass('active').parent().children(`:nth-child(${num})`).addClass('active');
  });
});      
        


              
    
            
          