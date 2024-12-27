chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({
      url: chrome.runtime.getURL("index.html"), // Replace with your main HTML file
    //   type: "popup",
    //   state: "fullscreen"
    });
  });