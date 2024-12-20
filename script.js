const wheel = document.getElementById("wheel");
const ctx = wheel.getContext("2d");
const spinButton = document.getElementById("spin-button");

// Add the pin dynamically
const wheelContainer = document.querySelector('.wheel-container');
const pin = document.createElement('div');
pin.className = 'pin';
wheelContainer.appendChild(pin);

// Wheel configuration
const sections = 8; // Number of sections
const sectionAngle = (2 * Math.PI) / sections;
const colors = ["#FF5733", "#FFC300", "#DAF7A6", "#33FF57", "#33FFF9", "#33A3FF", "#8C33FF", "#FF33AC"];
const radius = wheel.width / 2;

// Draw the wheel
function drawWheel() {
  for (let i = 0; i < sections; i++) {
    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.arc(
      radius,
      radius,
      radius,
      i * sectionAngle,
      (i + 1) * sectionAngle
    );
    ctx.fillStyle = colors[i];
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // Draw the numbers
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(i * sectionAngle + sectionAngle / 2);
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText(
      i + 1,
      radius / 1.5,
      10
    );
    ctx.restore();
  }
}

// Spin logic
let isSpinning = false;
let currentAngle = 0;

function spinWheel() {
  if (isSpinning) return;

  isSpinning = true;
  const spinDuration = 3000; // 3 seconds
  const spinAngle = Math.random() * 720 + 720; // At least two full rotations
  const startTime = performance.now();

  function animate(timestamp) {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / spinDuration, 1);
    const easing = easeOutQuad(progress);
    currentAngle = easing * spinAngle;

    ctx.clearRect(0, 0, wheel.width, wheel.height);
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate((currentAngle * Math.PI) / 180);
    ctx.translate(-radius, -radius);
    drawWheel();
    ctx.restore();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      const selectedSection = Math.floor(((currentAngle % 360) / 360) * sections);
    //   alert(`You got number ${selectedSection + 1}!`);
      isSpinning = false;
    }
  }

  requestAnimationFrame(animate);
}

function easeOutQuad(t) {
  return t * (2 - t);
}

spinButton.addEventListener("click", spinWheel);

// Initialize wheel
drawWheel();
