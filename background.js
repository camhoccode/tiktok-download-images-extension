chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: chooseScript,
  });
});

function chooseScript() {
  const url = window.location.href;
  if (url.includes("tiktok.com")) {
    runTikTokScript();
  } else if (url.includes("etsy.com")) {
    runEtsyScript();
  }
}

function runTikTokScript() {
  (async function () {
    // Select all img elements that are children of div elements with class 'slick-track'
    const images = document.querySelectorAll("div.slick-track img");

    // Function to download an image
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

    let title = document.querySelector("title").textContent;
    console.log(`Downloaded ${images.length} images.`);
    console.log(title);

    // Copy the title to the clipboard
    const textArea = document.createElement("textarea");
    textArea.value = title;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    alert("Title copied to clipboard: " + title);
  })();
}

function runEtsyScript() {
  (async function () {
    // Select all img elements that are children of ul elements with class 'carousel-pane-list'
    const images = document.querySelectorAll(
      "ul.carousel-pane-list img"
    );

    // Function to download an image
    const downloadImage = async (url, filename) => {
      // Use a CORS proxy
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

    let title = document.querySelector("h1").textContent;
    console.log(`Downloaded ${images.length} images.`);
    console.log(title);

    // Copy the title to the clipboard
    const textArea = document.createElement("textarea");
    textArea.value = title;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    alert("Title copied to clipboard: " + title);
  })();
}
