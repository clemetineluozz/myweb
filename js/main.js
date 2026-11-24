/* lzx的秘密基地 · 几行小脚本
   没用什么框架，能自动写个日期、记住访问次数就够了。 */

// 页脚的日期：取本机时间
function writeDate() {
  var box = document.getElementById('today');
  if (!box) return;
  var d = new Date();
  box.innerHTML = d.getFullYear() + ' 年 ' + (d.getMonth() + 1) + ' 月 ' + d.getDate() + ' 日';
}

// 访问计数：纯本机记数，换台电脑会从 1 重新数
function writeHits() {
  var box = document.getElementById('hits');
  if (!box) return;
  var n = 1;
  try {
    n = parseInt(localStorage.getItem('lzx-base-hits') || '0', 10) + 1;
    localStorage.setItem('lzx-base-hits', String(n));
  } catch (e) { /* 隐私模式下就算了 */ }
  box.innerHTML = String(n);
}

// 当前页高亮：对上文件名就给导航加个小橙标
function markCurrent() {
  var name = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var groups = {
    'index.html': ['index.html'],
    'jianjie.htm': ['jianjie.htm'],
    'xiangce.htm': ['xiangce.htm'],
    'aihao.htm': ['aihao.htm'],
    'music.htm': ['music.htm'],
    'contact.htm': ['contact.htm']
  };
  var targets = groups[name] || [];
  var links = document.querySelectorAll('td.nav a, td.side a');
  for (var i = 0; i < links.length; i++) {
    var href = (links[i].getAttribute('href') || '').toLowerCase();
    for (var j = 0; j < targets.length; j++) {
      if (href === targets[j] || href.indexOf('/' + targets[j]) !== -1) {
        links[i].className += ' cur';
        break;
      }
    }
  }
}

// 相册点图放大，再点一下关掉
function initLightbox() {
  var box = document.getElementById('lightbox');
  if (!box) return;
  var img = document.getElementById('lightbox-img');
  var links = document.querySelectorAll('[data-lightbox]');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (e) {
      e.preventDefault();
      img.src = this.getAttribute('href');
      box.hidden = false;
    });
  }
  box.addEventListener('click', function () { box.hidden = true; });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') box.hidden = true;
  });
}

writeDate();
writeHits();
markCurrent();
initLightbox();
