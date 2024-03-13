/* global browser */
import { useState, useEffect } from "react";
import testBookmarks from "../data/testBookmarks.json"

// Create bookmark list from folder
async function createBookmarkList(id) {
  const root = (await browser.bookmarks.getSubTree(id))[0];
  var bookmarks = [];
  for (var i = 0; i < root.children.length; i++) {
    var category = root.children[i];
    if (category.type === "folder") {
      var items = [];
      for (var j = 0; j < category.children.length; j++) {
        var item = category.children[j];
        if (item.type === "bookmark") {
          items.push({
            "name": item.title,
            "url": item.url
          });
        }
      }
      bookmarks.push({
        "name": category.title,
        "items": items
      });
    }
  }
  return bookmarks
}

// Load bookamark list from browser
export function useBookmarks(bookmarkRoot) {
  const [bookmarks, setBookmarks] = useState([]);
  
  useEffect(() => {
    if (browser === null) {
      setBookmarks(testBookmarks);
    } else {
      createBookmarkList(bookmarkRoot)
        .then(result => setBookmarks(result))
        .catch(console.error);
    }
  }, [bookmarkRoot]);
  
  return bookmarks;
}
