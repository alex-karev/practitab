export function useSearchEngine(settings, setSettings) {
  function changeSearchEngine(index, key, value) {
    var newSearch = [...settings.searchEngines];
    newSearch[index][key] = value;
    setSettings("searchEngines", newSearch);
  }
  function moveSearchEngine(index, direction) {
    if (index + direction >= settings.searchEngines.length || index + direction < 0) {
      return
    }
    var newSearch = [...settings.searchEngines];
    var prevEngine = newSearch[index + Math.sign(direction)];
    newSearch[index + Math.sign(direction)] = newSearch[index];
    newSearch[index] = prevEngine;
    setSettings("searchEngines", newSearch);
  }
  function removeSearchEngine(index) {
    var newSearch = [...settings.searchEngines];
    newSearch.splice(index, 1);
    setSettings("searchEngines", newSearch);
  }
  function addSearchEngine() {
    var newSearch = [...settings.searchEngines];
    newSearch.push({
      "name": "",
      "homeUrl": "",
      "queryUrl": "",
      "buttonText": ""
    })
    setSettings("searchEngines", newSearch);
  }
  return [changeSearchEngine, moveSearchEngine, removeSearchEngine, addSearchEngine]
}
