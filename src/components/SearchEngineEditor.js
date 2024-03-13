import { useSearchEngine } from "../hooks/useSearchEngine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faArrowUp, faArrowDown, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Form, Row, Col, Button, ListGroup, Stack, InputGroup } from "react-bootstrap"
import { createContext, useContext } from "react";
import { SettingsContext } from "./SettingsItem";

// Define new context for fields in one search engine
const SearchEngineContext = createContext(null);

// One field of search engine item
function EditorItemField({ label, placeholder, itemKey }) {
  const { changeSearchEngine, engine, index } = useContext(SearchEngineContext)
  return (
    <InputGroup>
      <InputGroup.Text>{label}</InputGroup.Text>
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={engine[itemKey]}
        onChange={(e) => changeSearchEngine(index, itemKey, e.target.value)} />
    </InputGroup>
  )
}

// Define new context for search engine editor
const SearchEngineEditorContext = createContext(null);

// Single search engine
function EditorItem({ engine, index }) {
  const { changeSearchEngine, moveSearchEngine, removeSearchEngine } = useContext(SearchEngineEditorContext);
  return (
    <ListGroup.Item>
      <SearchEngineContext.Provider value={{ changeSearchEngine, engine, index }} >
        <Form.Group as={Row} className="align-items-center">
          <Col xs={2}>
            <Stack direction="vertical" gap={2}>
              <Button variant="primary" onClick={() => moveSearchEngine(index, -1)} >
                <FontAwesomeIcon icon={faArrowUp} />
              </Button>
              <Button variant="primary" onClick={() => removeSearchEngine(index)} >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
              <Button variant="primary" onClick={() => moveSearchEngine(index, 1)} >
                <FontAwesomeIcon icon={faArrowDown} />
              </Button>
            </Stack>
          </Col>
          <Col xs={10}>
            <EditorItemField label="Name:" placeholder="SearchEngine" value={engine.name} itemKey="name" index={index} />
            <EditorItemField label="Button Text:" placeholder="Search" value={engine.buttonText} itemKey="buttonText" index={index} />
            <EditorItemField label="Home URL:" placeholder="https://www.search.com" value={engine.homeUrl} itemKey="homeUrl" index={index} />
            <EditorItemField label="Query URL:" placeholder="https://www.search.com/?q=" value={engine.queryUrl} itemKey="queryUrl" index={index} />
          </Col>
        </Form.Group>
      </SearchEngineContext.Provider>
    </ListGroup.Item>
  )
}

// Search engine editor with custom search engine support
export function SearchEngineEditor() {
  const { settings, setSettings } = useContext(SettingsContext);
  const [changeSearchEngine, moveSearchEngine, removeSearchEngine, addSearchEngine] = useSearchEngine(settings, setSettings);
  // Single search engine
  return (
    <SearchEngineEditorContext.Provider value={{ changeSearchEngine, moveSearchEngine, removeSearchEngine }}>
      <ListGroup>
        {settings.searchEngines.map((engine, index) => (
          <EditorItem engine={engine} key={index} index={index} />
        ))}
        <ListGroup.Item className="d-flex justify-content-center" key={settings.searchEngines.length}>
          <Button onClick={() => addSearchEngine()}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </SearchEngineEditorContext.Provider>
  )
}

