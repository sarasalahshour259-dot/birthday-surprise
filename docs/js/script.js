const PASSWORD = "1383";

const gate = document.getElementById("gate");
const app = document.getElementById("app");
const passwordInput = document.getElementById("passwordInput");
const enterBtn = document.getElementById("enterBtn");
const gateMsg = document.getElementById("gateMsg");

const countdownText = document.getElementById("countdownText");
const cakeSection = document.getElementById("cakeSection");
const photosSection = document.getElementById("photosSection");
const blowBtn = document.getElementById("blowBtn");
const candle = document.getElementById("candle");

const singleGrid = document.getElementById("singleGrid");
const togetherGrid = document.getElementById("togetherGrid");
const familyGrid = document.getElementById("familyGrid");

let timer = null;

enterBtn.addEventListener("click", checkPassword);
passwordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkPassword();
});

function checkPassword() {
  if (passwordInput.value.trim() === PASSWORD) {
    gate.style.display = "none";
    app.classList.remove("hidden");

    renderImages();
    startCountdown();
    createConfetti(25);
  } else {
    gateMsg.textContent = "رمز اشتباهه، دوباره امتحان کن 🙂";
  }
}

function startCountdown() {
  let timeLeft = 10;
  countdownText.textContent = timeLeft;

  cakeSection.classList.add("hidden");
  photosSection.classList.add("hidden");
  blowBtn.disabled = false;
  blowBtn.textContent = "فوت کن 🎂";
  candle.classList.remove("out");

  if (timer) clearInterval(timer);

  timer = setInterval(() => {
    timeLeft--;
    countdownText.textContent = timeLeft > 0 ? timeLeft : "0";

    if (timeLeft <= 0) {
      clearInterval(timer);
      countdownText.textContent = "وقت کیکه 🎂✨";

      cakeSection.classList.remove("hidden");
      cakeSection.scrollIntoView({ behavior: "smooth", block: "start" });
      createConfetti(40);
    }
  }, 1000);
}

blowBtn.addEventListener("click", () => {
  candle.classList.add("out");
  blowBtn.disabled = true;
  blowBtn.textContent = "شمع فوت شد ✅";
  countdownText.textContent = "آفرین! حالا بریم سراغ عکس‌ها 🎉";

  setTimeout(() => {
    photosSection.classList.remove("hidden");
    photosSection.scrollIntoView({ behavior: "smooth", block: "start" });
    createConfetti(70);
  }, 1200);
});

function renderImages() {
  const singles = [
    { src: "images/single1.png", caption: "عمه جونم" },
    { src: "images/single2.png", caption: "عمو جونم" },
    { src: "images/single3.png", caption: "زیباترین" },
    { src: "images/single4.png", caption: "خوشتیپ‌ ترین" }
  ];

  const together = [
    { src: "images/together1.png", caption: "❤️" },
    { src: "images/together2.png", caption: "❤️" },
    { src: "images/together3.png", caption: "خاطره به یادماندنی" },
    { src: "images/together4.png", caption: "بهترین روز" }
  ];

  const family = [
    { src: "images/family1.png", caption: "بهترین خاطره" },
    { src: "images/family2.png", caption: "دو تا از بهترین های من" },
    {src: "images/family3.png", caption: "خاطره‌ی زیبا" },
    { src: "images/ourfamily.png", caption: "خانواده یعنی عشق" }
  ];

  singleGrid.innerHTML = singles
    .map(
      (i) => `
      <div class="photo-card">
        <img src="${i.src}" alt="${i.caption}">
        <div class="caption">${i.caption}</div>
      </div>`
    )
    .join("");

  togetherGrid.innerHTML = together
    .map(
      (i) => `
      <div class="photo-card">
        <img src="${i.src}" alt="${i.caption}">
        <div class="caption">${i.caption}</div>
      </div>`
    )
    .join("");

  familyGrid.innerHTML = family
    .map(
      (i) => `
      <div class="photo-card">
        <img src="${i.src}" alt="${i.caption}">
        <div class="caption">${i.caption}</div>
      </div>`
    )
    .join("");
}

function createConfetti(count) {
  const colors = ["#ff6f91", "#ffd166", "#9b5de5", "#06d6a0", "#f72585"];

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.style.position = "fixed";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.top = "-20px";
    piece.style.width = "10px";
    piece.style.height = "14px";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.zIndex = "9999";
    piece.style.pointerEvents = "none";
    piece.style.borderRadius = "3px";

    document.body.appendChild(piece);

    const xMove = (Math.random() - 0.5) * 240;
    const duration = 2500 + Math.random() * 1500;

    piece.animate(
      [
        { transform: "translate(0, 0) rotate(0deg)", opacity: 1 },
        { transform: `translate(${xMove}px, 110vh) rotate(360deg)`, opacity: 0 }
      ],
      { duration, easing: "ease-out" }
    );

    setTimeout(() => piece.remove(), duration);
  }
}
