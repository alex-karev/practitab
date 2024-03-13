/* global browser */
import { useState, useEffect } from "react";
import testBookmarkFolders from "../data/testFolders.json"

// Recursively find all existing folders
function findFolders(root, level, data) {
  const title = root.id === "root________" ? "root" : root.title;
  data.push({
    id: root.id,
    title: title,
    level: level
  });
  for (var i = 0; i < root.children.length; i++) {
    var item = root.children[i];
    if (item.type === "folder") {
      findFolders(item, level + 1, data);
    }
  }
  return data
}

// List all folder in bookmarks
async function listBookmarkFolders() {
  const tree = await browser.bookmarks.getTree();
  return findFolders(tree[0], 0, [])
}

// Load bookamark folders from browser
export function useBookmarkFolders() {
  const [bookmarkFolders, setBookmarkFolders] = useState([]);

  useEffect(() => {
    if (browser === null) {
      setBookmarkFolders(testBookmarkFolders);
    } else {
      listBookmarkFolders()
        .then(result => setBookmarkFolders(result))
        .catch(console.error)
    }
  }, []);

  return bookmarkFolders
}

