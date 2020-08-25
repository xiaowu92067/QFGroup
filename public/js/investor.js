// 秦发财报信息获取
$.ajax({
  url: '/investor',
  type: 'GET',
  data: {
    id: 3,
    count: 8
  },
  dataType: 'json',
  success: res => {
    let htmlStr = '';
    for (let item of res.result) {
      htmlStr += `
        <li>
          <a href="javascript:viod(0)">
            ${item.title}
            <span class="time">${item.created_time}</span>
          </a>
        </li>
      `;
    }
    $('.investor .left .list').html(htmlStr);
  }
})

// 公告通函信息获取
$.ajax({
  url: '/investor',
  type: 'GET',
  data: {
    id: 4,
    count: 5
  },
  dataType: 'json',
  success: res => {
    let htmlStr = '';
    for (let item of res.result) {
      let time = item.created_time;
      time = time.substring(time.indexOf('-') + 1);
      htmlStr += `
        <li>
          <a href="javascript:viod(0)">
            ${item.title}
            <span class="time">${time}</span>
          </a>
        </li>
      `;
    }
    $('.investor .right .r_top .list').html(htmlStr);
  }
})

// 结构合约信息获取
$.ajax({
  url: '/investor',
  type: 'GET',
  data: {
    id: 5,
    count: 5
  },
  dataType: 'json',
  success: res => {
    let htmlStr = '';
    for (let item of res.result) {
      htmlStr += `
        <li>
          <a href="javascript:viod(0)">
            ${item.title}
          </a>
        </li>
      `;
    }
    $('.investor .right .r_buttom .list').html(htmlStr);
  }
})