(function () {
  var track = document.getElementById("wadi-carousel-track");
  var prev = document.getElementById("wadi-prev");
  var next = document.getElementById("wadi-next");

  if (track && prev && next) {
    function scrollByDir(dir) {
      var item = track.querySelector(".wr-carousel__item");
      var gap = 12;
      var amount = item ? item.offsetWidth + gap : track.clientWidth * 0.85;
      track.scrollBy({ left: dir * amount, behavior: "smooth" });
    }
    prev.addEventListener("click", function () {
      scrollByDir(-1);
    });
    next.addEventListener("click", function () {
      scrollByDir(1);
    });
  }

  document.querySelectorAll(".wr-reel-card").forEach(function (card) {
    var video = card.querySelector("video");
    var btn = card.querySelector(".wr-reel-playbtn");
    if (!video || !btn) return;

    btn.addEventListener("click", function () {
      if (video.paused) {
        document.querySelectorAll(".wr-reel-card video").forEach(function (other) {
          if (other !== video) {
            other.pause();
            var otherCard = other.closest(".wr-reel-card");
            var otherBtn = otherCard ? otherCard.querySelector(".wr-reel-playbtn") : null;
            if (otherBtn) otherBtn.hidden = false;
          }
        });
        video.play();
        btn.hidden = true;
      } else {
        video.pause();
        btn.hidden = false;
      }
    });

    video.addEventListener("ended", function () {
      btn.hidden = false;
    });
  });
})();
