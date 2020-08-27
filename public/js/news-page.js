// 分类下各页新闻列表接口调用
function getNews(id, page, cb, count = 10) {
  new Promise(resolve => {
    $.ajax({
      url: '/newsList',
      type: 'GET',
      data: {
        id,
        page,
        count
      },
      dataType: 'json',
      success: res => {
        resolve(res);
      }
    })
  }).then(cb);
}

// 分页信息获取调用接口方法:
function getPages(id, cb, pageSize = 10) {
  $.ajax({
    url: '/getPage',
    type: 'get',
    data: {
      id
    },
    dataType: 'json',
    success: res => {
      pageCount = Math.ceil(res.result.count / pageSize);
      let htmlStr = '';
      for (let i = 1; i <= pageCount; i++) {
        htmlStr += `<a data-select="${i}" class="a_page" href="javascript:void(0)">${i}</a>`;
      }
      // 初始化分页按钮样式及为每个按钮绑定点击事件
      $('#numOfPage').html(htmlStr).children().click(function () {
        let page = $(this).attr('data-select');
        getNews(id, page, cb, pageSize);
        $(this).addClass('active').siblings().removeClass('active');
      }).first().addClass('active');

      // 首页按钮
      $('.a_first').click(function () {
        getNews(id, 1, cb, pageSize);
        $('#numOfPage').children().first().addClass('active').siblings().removeClass('active');
      })

      // 末页按钮
      $('.a_end').click(function () {
        getNews(id, pageCount, cb, pageSize);
        $('#numOfPage').children().last().addClass('active').siblings().removeClass('active');
      })

      // 上一页
      $('.a_pref').click(function () {
        let page = $('.a_page.active').attr('data-select');
        if (page > 1) {
          $('.a_page.active').removeClass('active').prev().addClass('active');
          getNews(id, page - 1, cb, pageSize);
        }
      })

      // 下一页
      $('.a_next').click(function () {
        let page = $('.a_page.active').attr('data-select');
        if (page < pageCount) {
          getNews(id, page * 1 + 1, cb, pageSize);
          $('.a_page.active').removeClass('active').next().addClass('active');
        }
      })
    }
  })
}

// 秦发资讯页列表动态加载
function newsHtml(res) {
  let htmlStr = '<ul>';
  for (let item of res.result) {
    let time = item.created_time;
    let day = time.substring(time.lastIndexOf('-') + 1);
    let yAndM = time.substring(0, time.lastIndexOf('-'));
    htmlStr += `
      <li class="news_item clearfix">
        <a
          class="pic"
          style="
            background-image: url(./img/news/${item.show_img});
          "
          href="javascript:void(0)"
        ></a>
        <div>
          <span class="time">
            ${day}
            <span>${yAndM}</span>
          </span>
          <span class="title"
            >${item.title}</span
          >
        </div>
      </li>
    `;
  }
  htmlStr += `</ul>`;
  $('.news .news_list1').html(htmlStr);
}

// 行业资讯和行业分析动态加载
function industyHtml(res) {
  let htmlStr = '<ul>';
  for (let item of res.result) {
    htmlStr += `
      <li class="news_item">
        <a href="javascript:void(0)">
          <span class="time">${item.created_time}</span>
          <span class="title">${item.title}</span>
        </a>
      </li>
    `;
  }
  htmlStr += '</ul>';
  $('.news .news_list').html(htmlStr);
}

// 投资者关系页相关信息列表获取:

// 投资者关系信息获取接口调用方法
function getInvertorIndex(id, count) {
  new Promise((resolve) => {
    $.ajax({
      url: '/investorIndex',
      type: 'GET',
      data: {
        id,
        count
      },
      dataType: 'json',
      success: res => {
        resolve(res);
      }
    })
  }).then({
    3: reportHtml,
    4: circularHtml,
    5: contractHtml
  } [id]);
}

// 秦发财报信息动态加载到页面函数
function reportHtml(res) {
  let htmlStr = '';
  for (let item of res.result) {
    htmlStr += `
      <li>
        <a href="javascript:void(0)">
          ${item.title}
          <span class="time">${item.created_time}</span>
        </a>
      </li>
    `;
  }
  $('.investor .left .list').html(htmlStr);
}

// 公告通函信息动态加载到页面函数
function circularHtml(res) {
  let htmlStr = '';
  for (let item of res.result) {
    let time = item.created_time;
    time = time.substring(time.indexOf('-') + 1);
    htmlStr += `
      <li>
        <a href="javascript:void(0)">
          ${item.title}
          <span class="time">${time}</span>
        </a>
      </li>
    `;
  }
  $('.investor .right .r_top .list').html(htmlStr);
}

// 结构合约信息动态加载到页面函数
function contractHtml(res) {
  let htmlStr = '';
  for (let item of res.result) {
    htmlStr += `
      <li>
        <a href="javascript:void(0)">
          ${item.title}
        </a>
      </li>
    `;
  }
  $('.investor .right .r_buttom .list').html(htmlStr);
}


// 投资者关系下三大分类页信息动态加载
function invertorHtml(res) {
  let htmlStr = '';
  for (let item of res.result) {
    htmlStr += `
      <li>
        <a href="javascript:void(0)">
          ${item.title}
          <div class="time">${item.created_time}</div>
        </a>
      </li>
    `;
  }
  $('.reports .i_list .list').html(htmlStr);
}