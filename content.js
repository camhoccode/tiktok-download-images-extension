function runTikTokScript() {
  (async function () {
    const images = document.querySelectorAll("div.slick-track img");

    let title = document.querySelector("title").textContent.trim();

    const textArea = document.createElement("textarea");
    textArea.value = title;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    console.log("Copied: ", title);

    const downloadImage = async (url, filename) => {
      const response = await fetch(url);
      const blob = await response.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    };

    for (let index = 0; index < images.length; index++) {
      const img = images[index];
      const url = img.src;
      let url2 = url
        .replace(`:800:800`, ``)
        .replace(`resize`, `origin`);
      const filename = `image_${index + 1}.jpg`;
      await downloadImage(url2, filename);
    }

    console.log(`Downloaded ${images.length} images.`);
  })();
}

function runEtsyScript() {
  (async function () {
    const images = document.querySelectorAll(
      "ul.carousel-pane-list img"
    );

    let title = document.querySelector("h1").textContent.trim();
    console.log("Copied: ", title);

    const textArea = document.createElement("textarea");
    textArea.value = title;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    const downloadImage = async (url, filename) => {
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const response = await fetch(proxyUrl + url);
      const blob = await response.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    };

    for (let index = 0; index < images.length; index++) {
      const img = images[index];
      const url = img.src;
      const filename = `image_${index + 1}.jpg`;
      await downloadImage(url, filename);
    }
    console.log(`Downloaded ${images.length} images.`);
  })();
}

function chooseScript() {
  const url = window.location.href;
  if (url.includes("tiktok.com")) {
    runTikTokScript();
  } else if (url.includes("etsy.com")) {
    runEtsyScript();
  }
}

chooseScript();
