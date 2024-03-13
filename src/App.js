import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Card, Stack } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { SettingsMenu } from "./components/Settings.js"
import { useBookmarks } from "./hooks/useBookmarks.js"
import { useSettings } from "./hooks/useSettings.js"

function App() {
  const [settings, setSettings, restoreSettings,
    isDefaultSettings, exportSettings, importSettings] = useSettings();
  const [settingsShow, setSettingsShow] = useState(false);
  const [query, setQuery] = useState("");
  const bookmarks = useBookmarks(settings.rootFolder);
  const columnWidth = bookmarks.length > 6 ? 2 : true;
  useEffect(() => {
    var gradientAngle = (settings.gradientAngle - 50) / 100 * 360;
    var bgImage = "linear-gradient(" +
      gradientAngle.toString() + "deg, " +
      settings.bgColorOne + ", " +
      settings.bgColorTwo + ")";
    if (settings.backgroundImage !== "") {
      bgImage = "url(" + settings.backgroundImage + ")";
    }
    document.querySelector("body").style.setProperty("background-image", bgImage);
    var theme = settings.darkMode ? "dark" : "light";
    document.querySelector("body").setAttribute("data-bs-theme", theme);
  }, [settings]);
  return (
    <Container style={{
      fontFamily: settings.fontFamily,
    }}>
      <Stack direction="vertical" gap={3} className="mt-3">
        <Stack direction="horizontal" gap={3} className="d-flex justify-content-center">
          {settings.searchEngines.map((engine, index) => (
            <Button
              key={index}
              variant={settings.homeButtonVariant}
              href={engine.homeUrl}
              className="animated-button">
              {engine.name}
            </Button>
          ))}
        </Stack>
        <Card className="p-3 hero" style={{
          backgroundImage: "url('" + settings.heroImage + "')",
          borderRadius: settings.heroBorderRadius.toString() + "px",
          boxShadow: "0 0 " + (settings.heroShadow / 100 * 20).toString() + "px black"
        }}>
          <Card.Body>
            <Row className="align-items-center">
              <Col>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = settings.searchEngines[0].queryUrl + query
                }}>
                  <Form.Control
                    type="text"
                    id="search"
                    onChange={(e) => setQuery(e.target.value)} />
                </form>
              </Col>
              <Col xs="auto">
                <Stack direction="vertical" gap={2}>
                  {settings.searchEngines.map((engine, index) => (
                    <Button
                      key={index}
                      variant={settings.searchButtonVariant}
                      onClick={() => window.location.href = engine.queryUrl + query}
                      className="animated-button fs-5">
                      {engine.buttonText}
                    </Button>
                  ))}
                </Stack>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Row className="justify-content-center mt-3">
          {bookmarks.map((category, index) => {
            return (
              <Col key={index} xs={5} md={columnWidth}>
                <h1>{category.name}</h1>
                <hr />
                <Stack direction="vertical" gap={1}>
                  {category.items.map((item, index) => {
                    return (
                      <div key={index}>
                        <a
                          href={item.url}
                          className="text-body fs-5 link">
                          {item.name}
                        </a>
                      </div>
                    );
                  })}
                </Stack>
              </Col>
            );
          })}
        </Row>
      </Stack>
      <SettingsMenu
        show={settingsShow}
        onHide={() => setSettingsShow(false)}
        settings={settings}
        setSettings={setSettings}
        restoreSettings={restoreSettings}
        isDefaultSettings={isDefaultSettings}
        exportSettings={exportSettings}
        importSettings={importSettings}
      />
      <Button onClick={() => setSettingsShow(true)} variant={settings.homeButtonVariant} className="settings-button">
        <FontAwesomeIcon icon={faGear} />
      </Button>
      <div
        className="bottom-pattern"
        style={{
          backgroundImage: "url('" + settings.fadeImage + "')",
          opacity: settings.fadeOpacity / 100,
          minHeight: ((settings.fadeHeight) / 100 * 600).toString() + "px"
        }} />
    </Container>
  );
}

export default App;
