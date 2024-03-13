/* global browser */
import { useState, useEffect } from "react";
import defaultSettings from "../data/defaultSettings.json";

// Load settings from browser local storage (as extension)
async function loadSettings() {
  const storageKey = "practitabSettings";
  var settings = {};
  // Load settings
  if (browser === null) {
    const results = localStorage.getItem(storageKey);
    settings = results === null ? defaultSettings : JSON.parse(results);
  } else {
    const results = await browser.storage.sync.get(storageKey);
    settings = results[storageKey];
  }
  // Fix missing
  for (const key in defaultSettings) {
    if (typeof settings[key] === "undefined") {
      settings[key] = defaultSettings[key];
    }
  }
  // Change root folder to actual browser root (if missing)
  if (browser !== null && settings.rootFolder === null) {
    const tree = await browser.bookmarks.getTree();
    settings.rootFolder = tree[0].id;
  }
  return settings
}

// Save settings
async function saveSettings(settings) {
  const storageKey = "practitabSettings";
  if (browser === null) {
    localStorage.setItem(storageKey, JSON.stringify(settings));
  } else {
    var newSettings = {};
    newSettings[storageKey] = settings;
    await browser.storage.sync.set(newSettings);
  }
}


// File download helper
function downloadFile({ data, fileName, fileType }) {
  // Create new file blob
  const blob = new Blob([data], { type: fileType });
  // Add download link with defined blob
  const a = document.createElement('a');
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  // Click the download link
  const clickEvt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  })
  a.dispatchEvent(clickEvt)
  // Remove link
  a.remove()
}

// Loading JSON from 
function loadJSON(callback) {
  // Load data from JSON file when file is loaded
  function onReaderLoad(event) {
    var result = null;
    try {
      result = JSON.parse(event.target.result);
    } catch (e) {
      console.log(e);
    }
    callback(result);
  }
  // Create input field
  var i = document.createElement("input");
  i.type = "file";
  i.setAttribute("accept", ".json");
  // Attach onchange event
  i.onchange = (e) => {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(e.target.files[0]);
  }
  // Click input field
  const clickEvt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  })
  i.dispatchEvent(clickEvt)
  // Remove input field
  i.remove();
}

// Save and load settings
export function useSettings() {
  const [settings, setSettings] = useState(defaultSettings);

  // Add load settings effect
  useEffect(() => {
    loadSettings()
      .then(result => setSettings(result))
      .catch(console.error);
  }, []);

  // Redefine set function
  const newSetSettings = (key, value) => {
    var newSettings = Object.assign({}, settings);
    newSettings[key] = value;
    saveSettings(newSettings);
    setSettings(newSettings);
  }

  // Restore specific setting
  const restoreSettings = (key) => {
    var newSettings = Object.assign({}, settings);
    newSettings[key] = defaultSettings[key];
    saveSettings(newSettings);
    setSettings(newSettings);
  }

  // Check if specific setting is default
  const isDefaultSettings = (key) => {
    if (key === "rootFolder") {
      return false
    }
    return settings[key] === defaultSettings[key]
  }

  // Export settings
  const exportSettings = () => {
    // Download results
    downloadFile({
      data: JSON.stringify(settings),
      fileName: 'practitab-' + new Date().toISOString() + '.json',
      fileType: 'text/json',
    });
  }

  // Import settings from json
  const importSettings = () => {
    loadJSON((result) => {
      if (result !== null) {
        setSettings(result);
        saveSettings(result);
      }
    });
  }

  return [settings, newSetSettings, restoreSettings, isDefaultSettings, exportSettings, importSettings]
}
