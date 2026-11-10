/* 小小的家 · 交互脚本
   1. 移动端导航
   2. 滚动入场
   3. 相册灯箱
   4. 复制邮箱
   5. 写信表单（无后端，拼 mailto）
   6. 页脚年份
*/
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. 移动端导航 ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      closeNav();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 820) closeNav();
    });
  }

  /* ---------- 2. 滚动入场 ---------- */
  var revealItems = document.querySelectorAll(".reveal");

  if (revealItems.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(revealItems, function (el) {
        el.classList.add("is-in");
      });
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      Array.prototype.forEach.call(revealItems, function (el) {
        io.observe(el);
      });
    }
  }

  /* ---------- 3. 相册灯箱 ---------- */
  var lb = document.getElementById("lightbox");

  if (lb) {
    var lbImg = lb.querySelector("img");
    var lbCap = lb.querySelector("figcaption");
    var items = Array.prototype.slice.call(document.querySelectorAll(".album-item"));
    var index = 0;

    function show(i) {
      if (!items.length) return;
      index = (i + items.length) % items.length;
      var trigger = items[index];
      lbImg.src = trigger.getAttribute("data-src");
      lbImg.alt = trigger.getAttribute("data-caption") || "";
      lbCap.textContent = trigger.getAttribute("data-caption") || "";
      lb.classList.add("is-open");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      var closeBtn = lb.querySelector(".lb-close");
      if (closeBtn) closeBtn.focus();
    }

    function hide() {
      lb.classList.remove("is-open");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (items[index]) items[index].focus();
    }

    items.forEach(function (item, i) {
      item.addEventListener("click", function () {
        show(i);
      });
    });

    lb.addEventListener("click", function (e) {
      if (e.target === lb || e.target.classList.contains("lb-close")) hide();
      if (e.target.classList.contains("lb-prev")) show(index - 1);
      if (e.target.classList.contains("lb-next")) show(index + 1);
    });

    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") hide();
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });
  }

  /* ---------- 4. 复制邮箱 / 任意文本 ---------- */
  Array.prototype.forEach.call(document.querySelectorAll("[data-copy]"), function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      var label = btn.getAttribute("data-label") || "复制";
      function done(ok) {
        btn.textContent = ok ? "已复制 ✓" : "复制失败，请手动选择";
        setTimeout(function () {
          btn.textContent = label;
        }, 1800);
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () {
          done(true);
        }).catch(function () {
          done(false);
        });
      } else {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        var ok = false;
        try {
          ok = document.execCommand("copy");
        } catch (err) {
          ok = false;
        }
        document.body.removeChild(ta);
        done(ok);
      }
    });
  });

  /* ---------- 5. 写信表单 ---------- */
  var form = document.getElementById("letter-form");

  if (form) {
    var status = document.getElementById("form-status");
    var to = "xiaoxiao@example.com";

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.elements.name.value.trim();
      var from = form.elements.email.value.trim();
      var body = form.elements.message.value.trim();

      if (!name || !body) {
        if (status) status.textContent = "名字和内容还没写呢。";
        return;
      }
      if (from && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from)) {
        if (status) status.textContent = "邮箱格式看起来不太对，再检查一下？";
        return;
      }

      var subject = "来自「小小的家」的留言 · " + name;
      var content = body + "\n\n—— " + name + (from ? "（" + from + "）" : "");
      var href =
        "mailto:" + to +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(content);

      window.location.href = href;
      if (status) status.textContent = "已经调起邮件客户端，检查一下收件人再发送就好。";
    });
  }

  /* ---------- 6. 页脚年份 ---------- */
  Array.prototype.forEach.call(document.querySelectorAll("[data-year]"), function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
