// 秦发财报页新闻列表分页
function getReport(page) {
  $.ajax({
    url: '/reports',
    type: 'GET',
    data: {
      id: 3,
      page: page,
      count: 10
    },
    dataType: 'json',
    success: res => {
      let htmlStr = '';
      for (let item of res.result) {
        htmlStr += `
          <li>
            <a href="javascript:viod(0)">
              ${item.title}
              <div class="time">${item.created_time}</div>
            </a>
          </li>
        `;
      }
      $('.reports .i_list .list').html(htmlStr);
    }
  })
}

let pageCount = 1;

$.ajax({
  url: '/getPage',
  type: 'get',
  data: {
    id: 3
  },
  dataType: 'json',
  success: res => {
    pageCount = Math.ceil(res.result.count / 10);
    let htmlStr = '';
    for (let i = 1; i <= pageCount; i++) {
      htmlStr += `<a data-select="${i}" class="a_page" href="javascript:void(0)">${i}</a>`;
    }
    $('#numOfPage').html(htmlStr).children().click(function () {
      let page = $(this).attr('data-select');
      getReport(page);
      $(this).addClass('active').siblings().removeClass('active');
    }).first().addClass('active');
  }
})

$(function () {
  getReport(1);
})

$('.a_first').click(function () {
  getReport(1);
  $('#numOfPage').children().first().addClass('active').siblings().removeClass('active');
})

$('.a_end').click(function () {
  getReport(pageCount);
  $('#numOfPage').children().last().addClass('active').siblings().removeClass('active');
})

$('.a_pref').click(function () {
  let page = $('.a_page.active').attr('data-select');
  if (page > 1) {
    $('.a_page.active').removeClass('active').prev().addClass('active');
    getReport(page - 1);
  }
})

$('.a_next').click(function () {
  let page = $('.a_page.active').attr('data-select');
  if (page < pageCount) {
    getReport(page * 1 + 1);
    $('.a_page.active').removeClass('active').next().addClass('active');
  }
})