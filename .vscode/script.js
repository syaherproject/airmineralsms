/* SMS Air Mineral — skrip bersama: header, footer, tombol WhatsApp, efek scroll.
   Ubah menu / kontak di sini, semua halaman ikut berubah. */
(function () {
  document.documentElement.classList.add("js");
  var page = document.body.dataset.page || "";
  var WA = "https://wa.me/6285363287675";
  var links = [
    ["index", "index.html", "Beranda"],
    ["about", "about.html", "Tentang Kami"],
    ["products", "products.html", "Produk"],
    ["distributors", "distributors.html", "Cari Agen Kami"],
    ["contact", "contact.html", "Hubungi Kami"]
  ];

  function el(html) { var t = document.createElement("div"); t.innerHTML = html.trim(); return t.firstChild; }
  function swap(id, node) { var s = document.getElementById(id); if (s) s.replaceWith(node); else document.body.appendChild(node); }

  // HEADER
  var desk = links.map(function (l) {
    return '<a href="' + l[1] + '" class="nav-link text-[13px] font-extrabold uppercase tracking-wide lg:text-sm ' +
      (l[0] === page ? "active text-white" : "text-white/90 hover:text-white") + '">' + l[2] + "</a>";
  }).join("");
  var mob = links.map(function (l) {
    return '<a href="' + l[1] + '" class="rounded-xl px-4 py-3 hover:bg-white/10 ' + (l[0] === page ? "bg-white/10 text-[#ffd43b]" : "") + '">' + l[2] + "</a>";
  }).join("");
  var header = el(
    '<header id="site-header" class="site-header">' +
      '<nav class="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-3 sm:px-8">' +
        '<a href="index.html" class="shrink-0"><img src="Aset foto/LOGO.png" alt="Logo SMS Air Mineral" class="h-10 w-auto object-contain sm:h-12"></a>' +
        '<div class="hidden items-center gap-7 md:flex lg:gap-10">' + desk + "</div>" +
        '<button id="menu-toggle" type="button" class="rounded-xl p-2 text-white md:hidden" aria-label="Buka menu"><i data-lucide="menu" class="h-6 w-6"></i></button>' +
      "</nav>" +
      '<div id="mobile-menu" class="hidden border-t border-white/10 bg-[#0b6e45] px-4 pb-5 pt-2 md:hidden"><div class="flex flex-col gap-1 text-sm font-extrabold uppercase tracking-wide text-white">' + mob + "</div></div>" +
      '<div class="scroll-progress" id="scroll-progress"></div>' +
    "</header>");
  swap("site-header-slot", header);

  // FOOTER
  var menuLinks = links.map(function (l) { return '<li><a href="' + l[1] + '" class="footer-link">' + l[2] + "</a></li>"; }).join("");
  swap("site-footer-slot", el(
    '<footer class="site-footer text-white">' +
      '<div class="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">' +
        '<div><img src="Aset foto/LOGO.png" alt="Logo SMS" class="h-10 w-auto object-contain">' +
          '<p class="mt-4 max-w-xs text-sm leading-6 text-white/60">Segarnya untuk setiap momen. Air Mineral SMS dari PT Agrimitra Utama Persada.</p></div>' +
        '<div><h4 class="footer-h">Menu</h4><ul class="space-y-3">' + menuLinks + "</ul></div>" +
        '<div><h4 class="footer-h">Hubungi Kami</h4><ul class="space-y-3 text-sm text-white/70">' +
          '<li><a href="' + WA + '" target="_blank" rel="noopener noreferrer" class="footer-link">WhatsApp: 0853-6328-7675</a></li>' +
          "<li>Senin - Sabtu, 08:00 - 17:00 WIB</li></ul></div>" +
      "</div>" +
      '<div class="border-t border-white/10"><div class="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-8">' +
        "<p>© PT Agrimitra Utama Persada. Hak Cipta Dilindungi Undang-Undang.</p>" +
        '<a href="#" id="to-top" class="font-bold text-white/70 hover:text-white">Kembali ke atas ↑</a></div></div>' +
    "</footer>"));

  // TOMBOL WHATSAPP
  var wa = el('<a id="whatsapp-float" href="' + WA + '?text=Halo%20SMS%20Air%20Mineral,%20saya%20ingin%20pesan" target="_blank" rel="noopener noreferrer" ' +
    'class="fixed bottom-5 right-5 z-50 flex translate-y-6 items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 font-extrabold text-white opacity-0 shadow-2xl pointer-events-none hover:bg-[#20ba5a] sm:bottom-7 sm:right-7">' +
    '<i data-lucide="message-circle" class="h-5 w-5"></i><span class="text-xs sm:text-sm">Pesan Sekarang</span></a>');
  document.body.appendChild(wa);

  if (window.lucide) lucide.createIcons();

  // MENU HP
  var toggle = document.getElementById("menu-toggle"), menu = document.getElementById("mobile-menu");
  toggle.addEventListener("click", function () { menu.classList.toggle("hidden"); });

  // SCROLL: header, progress bar, tombol WA
  var bar = document.getElementById("scroll-progress");
  function onScroll() {
    var y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle("scrolled", y > 30);
    bar.style.transform = "scaleX(" + (max > 0 ? Math.min(y / max, 1) : 0) + ")";
    var show = y > 220;
    ["opacity-100", "translate-y-0"].forEach(function (c) { wa.classList.toggle(c, show); });
    ["opacity-0", "pointer-events-none", "translate-y-6"].forEach(function (c) { wa.classList.toggle(c, !show); });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  document.getElementById("to-top").addEventListener("click", function (e) { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });

  // EFEK MUNCUL SAAT SCROLL
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in"); io.unobserve(en.target);
        setTimeout(function () { en.target.classList.remove("reveal", "in"); }, 1000);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll("main .soft-card, main .faq-item, main .section-title").forEach(function (n, i) {
      n.style.setProperty("--d", (i % 4) * 80 + "ms");
      n.classList.add("reveal"); io.observe(n);
    });
  }
})();
