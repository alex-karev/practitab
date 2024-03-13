import { useBookmarkFolders } from "../hooks/useBookmarkFolders";
import { Form } from "react-bootstrap"

// Bookmarks option selector
export function BookmarksEditor({ settings, setSettings }) {
  const bookmarkFolders = useBookmarkFolders();
  return (
    <Form.Select aria-label="Root Folder"
      defaultValue={settings.rootFolder}
      onChange={(e) => setSettings("rootFolder", e.target.value)} >
      {bookmarkFolders.map((folder, index) => (
        <option
          key={index}
          value={folder.id} >
          {"-".repeat(folder.level) + " " + folder.title}
        </option>
      ))}
    </Form.Select>
  )
}
