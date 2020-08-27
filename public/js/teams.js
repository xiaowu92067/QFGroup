// 获取管理者团队信息
$.ajax({
  url: '/teamList',
  type: 'get',
  data: {
    page: 1
  },
  dataType: 'json',
  success: res => {
    console.log(res);
    let htmlStr = '';
    for (let item of res.result) {
      htmlStr += `
        <li>
          <div class="pic" style="background-image: url(./img/profile/${item.picture})">
          </div>
          <div class="txt">
            <span class="name">${item.tname}</span>
            <span class="duty">${item.duty_name}</span>
          </div>
        </li>
        `;
    }
    $('.manage .leader_list .clearfix').html(htmlStr);
    let pageCount = Math.ceil(res.count / 6);
    htmlStr = '';
    for (let i = 1; i <= pageCount; i++) {
      htmlStr += `<a data-select="${i}" class="a_page" href="javascript:void(0)">${i}</a>`;
    }
    $('#numOfPage').html(htmlStr);
    // 初始化分页按钮样式及为每个按钮绑定点击事件
    $('#numOfPage').children().click(function () {
      let page = $(this).attr('data-select');
      getTeamList(page);
      $(this).addClass('active').siblings().removeClass('active');
    }).first().addClass('active');
    // 首页按钮
    $('.a_first').click(function () {
      getTeamList(1);
      $('#numOfPage').children().first().addClass('active').siblings().removeClass('active');
    })

    // 末页按钮
    $('.a_end').click(function () {
      getTeamList(pageCount);
      $('#numOfPage').children().last().addClass('active').siblings().removeClass('active');
    })

    // 上一页
    $('.a_pref').click(function () {
      let page = $('.a_page.active').attr('data-select');
      if (page > 1) {
        $('.a_page.active').removeClass('active').prev().addClass('active');
        getTeamList(page - 1);
      }
    })

    // 下一页
    $('.a_next').click(function () {
      let page = $('.a_page.active').attr('data-select');
      if (page < pageCount) {
        getTeamList(page * 1 + 1);
        $('.a_page.active').removeClass('active').next().addClass('active');
      }
    })
  }
});

function getTeamList(page) {
  $.ajax({
    url: '/teamList',
    type: 'get',
    data: {
      page
    },
    dataType: 'json',
    success: res => {
      console.log(res);
      let htmlStr = '';
      for (let item of res.result) {
        htmlStr += `
          <li>
            <div class="pic" style="background-image: url(./img/profile/${item.picture})">
            </div>
            <div class="txt">
              <span class="name">${item.tname}</span>
              <span class="duty">${item.duty_name}</span>
            </div>
          </li>
        `;
      }
      $('.manage .leader_list .clearfix').html(htmlStr);
    }
  })
}