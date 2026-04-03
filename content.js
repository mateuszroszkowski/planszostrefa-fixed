function removeUnavailable() {
  const products = document.querySelectorAll(".product-main-wrap");

  products.forEach(product => {
    const availabilityElements = product.querySelectorAll("*");

    for (let el of availabilityElements) {
      const text = el.textContent
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();

      if (text.includes("niedostęp")) {
        product.remove();
        break;
      }
    }
  });
}

function init() {
  removeUnavailable();

  let tries = 0;
  const interval = setInterval(() => {
    removeUnavailable();
    tries++;
    if (tries > 20) clearInterval(interval);
  }, 300);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

const observer = new MutationObserver(() => {
  removeUnavailable();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});