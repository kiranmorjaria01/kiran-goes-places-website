(function () {
  "use strict";

  /* ---------- Sticky nav: hide on scroll down, reveal on scroll up ---------- */
  var nav = document.getElementById("nav");
  var lastScrollY = window.scrollY;
  var navTicking = false;
  var scrollThreshold = 10;

  function onScrollNav() {
    var y = window.scrollY;
    var delta = y - lastScrollY;
    if (Math.abs(delta) > scrollThreshold) {
      if (delta > 0 && y > 120) {
        nav.classList.add("nav-hidden");
      } else {
        nav.classList.remove("nav-hidden");
      }
      lastScrollY = y;
    }
    navTicking = false;
  }

  window.addEventListener("scroll", function () {
    if (!navTicking) {
      window.requestAnimationFrame(onScrollNav);
      navTicking = true;
    }
  }, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById("navToggle");
  var navMobile = document.getElementById("navMobile");

  if (navToggle && navMobile) {
    navToggle.addEventListener("click", function () {
      var expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navMobile.classList.toggle("is-open");
    });

    navMobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.setAttribute("aria-expanded", "false");
        navMobile.classList.remove("is-open");
      });
    });
  }

  /* ---------- Smooth-scroll in-page links, offset for the fixed nav ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    var hash = link.getAttribute("href");
    if (!hash || hash.length < 2) { return; }
    link.addEventListener("click", function (e) {
      var target = document.querySelector(hash);
      if (!target) { return; }
      e.preventDefault();
      var navHeight = nav ? nav.getBoundingClientRect().height : 0;
      var top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

  /* ---------- Fade-in on scroll ---------- */
  var fadeEls = document.querySelectorAll(".fade-in");
  if ("IntersectionObserver" in window) {
    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeEls.forEach(function (el) { fadeObserver.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Shorts coverflow: center card autoplays silently; click for sound ---------- */
  var galleryTrack = document.getElementById("galleryTrack");
  var galleryPrev = document.getElementById("galleryPrev");
  var galleryNext = document.getElementById("galleryNext");
  var shortCards = galleryTrack ? Array.prototype.slice.call(galleryTrack.querySelectorAll(".short-card")) : [];

  if (galleryTrack && shortCards.length) {
    var currentShortIndex = 0;

    var shortPreviewSrc = function (id) {
      return "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&mute=1&loop=1&playlist=" + id + "&controls=0&playsinline=1";
    };
    var shortSoundSrc = function (id) {
      return "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&mute=0&playsinline=1";
    };

    var deactivateShort = function (card) {
      var iframe = card.querySelector(".short-iframe");
      if (iframe) { iframe.removeAttribute("src"); }
      card.classList.remove("is-sound-on");
    };

    var activatePreview = function (card) {
      var id = card.dataset.videoId;
      var iframe = card.querySelector(".short-iframe");
      if (iframe && id) { iframe.setAttribute("src", shortPreviewSrc(id)); }
    };

    var activateSound = function (card) {
      var id = card.dataset.videoId;
      var iframe = card.querySelector(".short-iframe");
      if (iframe && id) { iframe.setAttribute("src", shortSoundSrc(id)); }
      card.classList.add("is-sound-on");
    };

    shortCards.forEach(function (card) {
      var btn = card.querySelector(".short-sound-btn");
      if (btn) {
        btn.addEventListener("click", function () { activateSound(card); });
      }
    });

    var applyCenterClass = function (index) {
      shortCards.forEach(function (card, i) {
        card.classList.toggle("is-center", i === index);
      });
    };

    var setCenterShort = function (index) {
      currentShortIndex = Math.max(0, Math.min(shortCards.length - 1, index));
      applyCenterClass(currentShortIndex);
      shortCards.forEach(function (card, i) {
        if (i === currentShortIndex) {
          activatePreview(card);
        } else {
          deactivateShort(card);
        }
      });
    };

    var scrollToShort = function (index, behavior) {
      var card = shortCards[index];
      if (card) {
        var trackRect = galleryTrack.getBoundingClientRect();
        var cardRect = card.getBoundingClientRect();
        var targetScrollLeft = galleryTrack.scrollLeft + (cardRect.left + cardRect.width / 2) - (trackRect.left + trackRect.width / 2);
        galleryTrack.scrollTo({ left: targetScrollLeft, behavior: behavior || "smooth" });
      }
    };

    var findNearestShortIndex = function () {
      var trackRect = galleryTrack.getBoundingClientRect();
      var trackCenter = trackRect.left + trackRect.width / 2;
      var nearestIndex = 0;
      var nearestDist = Infinity;
      shortCards.forEach(function (card, i) {
        var r = card.getBoundingClientRect();
        var dist = Math.abs((r.left + r.width / 2) - trackCenter);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestIndex = i;
        }
      });
      return nearestIndex;
    };

    var shortScrollTimer;
    galleryTrack.addEventListener("scroll", function () {
      clearTimeout(shortScrollTimer);
      shortScrollTimer = setTimeout(function () {
        setCenterShort(findNearestShortIndex());
      }, 120);
    }, { passive: true });

    // Grow the target card and scroll it to centre as a single coordinated
    // motion: pre-measure where its centre will land once enlarged (applied
    // instantly, off-screen from the transition), revert, then animate the
    // resize and the scroll together toward that same target.
    var goToShort = function (index) {
      var newIndex = Math.max(0, Math.min(shortCards.length - 1, index));
      if (newIndex === currentShortIndex) { return; }
      var prevIndex = currentShortIndex;

      galleryTrack.classList.add("no-transition");
      applyCenterClass(newIndex);
      var trackRect = galleryTrack.getBoundingClientRect();
      var cardRect = shortCards[newIndex].getBoundingClientRect();
      var targetScrollLeft = galleryTrack.scrollLeft + (cardRect.left + cardRect.width / 2) - (trackRect.left + trackRect.width / 2);
      applyCenterClass(prevIndex);
      void galleryTrack.offsetHeight; // force reflow before re-enabling transitions
      galleryTrack.classList.remove("no-transition");

      setCenterShort(newIndex);
      galleryTrack.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
    };

    if (galleryPrev) {
      galleryPrev.addEventListener("click", function () { goToShort(currentShortIndex - 1); });
    }
    if (galleryNext) {
      galleryNext.addEventListener("click", function () { goToShort(currentShortIndex + 1); });
    }

    // Lock the first card to centre instantly, with no width transition to race against.
    galleryTrack.classList.add("no-transition");
    setCenterShort(0);
    scrollToShort(0, "auto");
    window.requestAnimationFrame(function () {
      galleryTrack.classList.remove("no-transition");
    });
  }

  /* ---------- Showreel: swap poster button for embed on click ---------- */
  var showreelPlay = document.getElementById("showreelPlay");
  var showreelEmbed = document.getElementById("showreelEmbed");

  if (showreelPlay && showreelEmbed) {
    showreelPlay.addEventListener("click", function () {
      var iframe = showreelEmbed.querySelector("iframe");
      if (iframe && !iframe.getAttribute("src")) {
        iframe.setAttribute("src", iframe.dataset.src);
      }
      showreelPlay.hidden = true;
      showreelEmbed.hidden = false;
    });
  }

  /* ---------- Travel guide cards: swap poster button for embed on click ---------- */
  document.querySelectorAll(".guide-play").forEach(function (playBtn) {
    var embed = playBtn.nextElementSibling;
    if (!embed || !embed.classList.contains("guide-embed")) { return; }
    playBtn.addEventListener("click", function () {
      var iframe = embed.querySelector("iframe");
      if (iframe && !iframe.getAttribute("src")) {
        iframe.setAttribute("src", iframe.dataset.src);
      }
      playBtn.hidden = true;
      embed.hidden = false;
    });
  });

  /* ---------- Press kit button: jump to contact form and pre-fill the request ---------- */
  var pressKitBtn = document.getElementById("pressKitBtn");
  if (pressKitBtn) {
    pressKitBtn.addEventListener("click", function () {
      var projectType = document.getElementById("projectType");
      var message = document.getElementById("message");
      if (projectType) { projectType.value = "Other"; }
      if (message && !message.value) {
        message.value = "Hi Kiran, could I get a copy of your media kit?";
      }
    });
  }

  /* ---------- Contact form: progressive-enhancement AJAX submit to Formspree ---------- */
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");

  if (form && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.textContent = "Sending…";
      status.className = "form-status";

      var data = new FormData(form);
      fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            status.textContent = "Thanks, your message is in. Kiran will reply within 24 hours.";
            status.classList.add("success");
            form.reset();
          } else {
            return response.json().then(function (payload) {
              throw new Error((payload && payload.error) || "Something went wrong.");
            });
          }
        })
        .catch(function () {
          status.textContent = "Something went wrong. Please email contact@kiranmorjaria.com directly.";
          status.classList.add("error");
        });
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) { yearEl.textContent = String(new Date().getFullYear()); }
})();
