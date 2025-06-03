document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("scratch-canvas");
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const showGroupButton = document.getElementById("show-group");
  const groupMembers = document.getElementById("group-members");
  const showAllButton = document.getElementById("show-all");
  const allGroups = document.getElementById("all-groups");

  if (!canvas || !ctx) return;

  // Fläche mit Gold füllen
  ctx.fillStyle = "#d4af37";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let isDrawing = false;

  function draw(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2, false);
    ctx.fill();
  }

  function checkScratchCompletion() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let scratchedPixels = 0;
    for (let i = 0; i < imageData.data.length; i += 4) {
      if (imageData.data[i + 3] === 0) scratchedPixels++;
    }
    const percent = (scratchedPixels / (canvas.width * canvas.height)) * 100;
    if (percent > 50 && showGroupButton.classList.contains("hidden")) {
      showGroupButton.classList.remove("hidden");
    }
  }

  function startDrawing(e) {
    isDrawing = true;
    draw(e);
  }

  function stopDrawing() {
    isDrawing = false;
    checkScratchCompletion();
  }

  // Maus-Events
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseleave", stopDrawing);

  // Touch-Events
  canvas.addEventListener("touchstart", startDrawing, { passive: true });
  canvas.addEventListener("touchmove", draw, { passive: true });
  canvas.addEventListener("touchend", stopDrawing);

  // Button-Funktionen
  showGroupButton?.addEventListener("click", () => {
    groupMembers?.classList.remove("hidden");
  });

  showAllButton?.addEventListener("click", () => {
    allGroups?.classList.remove("hidden");
  });
});
