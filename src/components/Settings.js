import { Offcanvas, Stack, Form, Button, Row, Col } from "react-bootstrap"
import buttonVariants from "../data/buttonVariants";
import { SearchEngineEditor } from "./SearchEngineEditor.js";
import { BookmarksEditor } from "./BookrmarksEditor.js";
import {
  SettingsContext, SettingsItemConstructor, SwitchConstructor,
  OptionSelectConstructor, TextInputConstructor,
  ColorConstructor, RangeConstructor
} from "./SettingsItem";

// Settings menu
export function SettingsMenu({ show, onHide, settings,
  setSettings, restoreSettings,
  isDefaultSettings, exportSettings, importSettings }) {
  return (
    <SettingsContext.Provider value={{ settings, setSettings, isDefaultSettings, restoreSettings }} >
      <Offcanvas
        show={show}
        onHide={onHide}
        aria-labelledby="settings"
        placement="end"
        scroll
        backdrop
        className="settings-menu">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="settings" className="fs-3">Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack direction="vertical" gap={2}>
            <SwitchConstructor settingsKey="darkMode" label="Dark Mode" />
            <OptionSelectConstructor settingsKey="searchButtonVariant" label="Search Buttons" options={buttonVariants} />
            <OptionSelectConstructor settingsKey="homeButtonVariant" label="Search Engine Buttons" options={buttonVariants} />
            <TextInputConstructor settingsKey="fontFamily" label="Font Family" />
            <ColorConstructor settingsKey="bgColorOne" label="Background Color 1" />
            <ColorConstructor settingsKey="bgColorTwo" label="Background Color 2" />
            <RangeConstructor settingsKey="gradientAngle" label="Gradient Angle" />
            <hr />
            <TextInputConstructor settingsKey="heroImage" label="Hero Image" />
            <RangeConstructor settingsKey="heroBorderRadius" label="Hero Border Radius" />
            <RangeConstructor settingsKey="heroShadow" label="Hero Shadow" />
            <hr />
            <TextInputConstructor settingsKey="backgroundImage" label="Background Image" />
            <hr />
            <TextInputConstructor settingsKey="fadeImage" label="Fade Image" />
            <RangeConstructor settingsKey="fadeHeight" label={"Fade Height"} />
            <RangeConstructor settingsKey="fadeOpacity" label={"Fade Opacity"} />
            <hr />
            <SettingsItemConstructor settingsKey="rootFolder" label="Bookmarks Root Folder">
              <BookmarksEditor settings={settings} setSettings={setSettings} />
            </SettingsItemConstructor>
            <hr />
            <SettingsItemConstructor settingsKey="searchEngines" label="Search Engines">
              <SearchEngineEditor />
            </SettingsItemConstructor>
            <hr />
            <SettingsItemConstructor settingsKey="customCSS" label="Custom CSS">
              <Form.Control
                type="text"
                as="textarea"
                rows={4}
                onChange={(e) => setSettings("customCSS", e.target.value)}
                value={settings.customCSS} />
            </SettingsItemConstructor>
            <Stack as={Row} direction="horizontal" gap={3}>
              <Button as={Col} onClick={() => exportSettings()}> Export</Button>
              <Button as={Col} onClick={() => importSettings()}> Import</Button>
            </Stack>
          </Stack>
        </Offcanvas.Body >
      </Offcanvas >
    </SettingsContext.Provider>
  )
}


