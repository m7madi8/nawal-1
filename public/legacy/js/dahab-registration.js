/**
 * Dahab retreat booking → Supabase → admin dashboard
 */
(function () {
  var SUPABASE_URL = "https://xzxyskufrqansbhsbdkt.supabase.co";
  var SUPABASE_ANON_KEY = "sb_publishable_V9_4QWGDFv6Vm-4DQifYGA_1xdoKkph";
  var SUPABASE_TABLE = "retreat_requests";

  function t(key) {
    var lang = (window.nawalI18n && window.nawalI18n.getLang && window.nawalI18n.getLang()) || "en";
    if (window.nawalI18n && window.nawalI18n.t) return window.nawalI18n.t(lang, key);
    return key;
  }

  function init() {
    var modal = document.getElementById("dahab-book-modal");
    var openBtn = document.getElementById("dahab-book-btn");
    var closeBtn = document.getElementById("dahab-book-close");
    var form = document.getElementById("dahab-book-form");
    var successBox = document.getElementById("dahab-book-success");
    var scrollTriggers = document.querySelectorAll("[data-dahab-book-open], .dahab-scroll-book");
    if (!modal || !closeBtn || !form) return;

    function openModal() {
      if (openBtn && openBtn.disabled) return;
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      var nameInput = form.querySelector('[name="fullName"]');
      if (nameInput) nameInput.focus();
    }

    function closeModal() {
      modal.hidden = true;
      document.body.style.overflow = "";
    }

    async function submitBooking(fullName, phone) {
      var now = new Date();
      var payload = {
        id: "req-dahab-" + now.getTime(),
        source: "dahab-retreat-reserve",
        retreatType: "Dahab Retreat 2026",
        submittedAt: now.toISOString(),
        fullName: fullName,
        phone: phone,
        age: "",
        city: "",
        reason: "Dahab retreat booking request",
        expectation: "",
        yogaExperience: "",
        healthStatus: "",
        healthDetails: "",
        activities: [],
        freeNote: "Booking from retreats/dahab",
        status: "pending",
        createdAt: now.toISOString()
      };

      var res = await fetch(SUPABASE_URL + "/rest/v1/" + encodeURIComponent(SUPABASE_TABLE), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: "Bearer " + SUPABASE_ANON_KEY,
          Prefer: "return=minimal"
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Dahab booking submit failed");
    }

    scrollTriggers.forEach(function (el) {
      el.addEventListener("click", function (e) {
        if (el.tagName === "A" && el.getAttribute("href") === "#dahab-booking") {
          e.preventDefault();
          var target = document.getElementById("dahab-booking");
          if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        if (el.id === "dahab-book-btn" || el.hasAttribute("data-dahab-book-open")) {
          e.preventDefault();
          openModal();
        }
      });
    });

    if (openBtn && !openBtn.disabled) {
      openBtn.addEventListener("click", function (e) {
        e.preventDefault();
        openModal();
      });
    }

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      var fullName = String((form.fullName && form.fullName.value) || "").trim();
      var phone = String((form.phone && form.phone.value) || "").trim();
      if (!fullName || !phone) return;
      try {
        await submitBooking(fullName, phone);
        form.reset();
        closeModal();
        if (successBox) {
          successBox.hidden = false;
          window.setTimeout(function () {
            successBox.hidden = true;
          }, 4500);
        }
      } catch (_err) {
        console.error(_err);
        alert(t("retreat_form_error"));
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
