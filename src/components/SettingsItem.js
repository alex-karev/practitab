import { createContext, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { Form, Row, Col, Button } from "react-bootstrap"

// Create context
export const SettingsContext = createContext(null);

// Restore button
function RestoreButton({ settingsKey, isDefaultSettings, restoreSettings }) {
  if (isDefaultSettings(settingsKey) || settingsKey === "rootFolder") {
    return (
      <div />
    )
  } else {
    return (
      <span>
        <Button onClick={() => restoreSettings(settingsKey)} >
          <FontAwesomeIcon icon={faRotateLeft} />
        </Button>
      </span>
    )
  }
}

// General settings item constructor
export function SettingsItemConstructor({ settingsKey, label, children }) {
  const { isDefaultSettings, restoreSettings } = useContext(SettingsContext);
  return (
    <Form.Group as={Row}>
      <Form.Label column xs={2}>
        {label}
        <RestoreButton settingsKey={settingsKey} isDefaultSettings={isDefaultSettings} restoreSettings={restoreSettings}/>
      </Form.Label>
      <Col xs={10}>
        {children}
      </Col>
    </Form.Group >
  )
}

// Switch settings item constructor
export function SwitchConstructor({ settingsKey, label }) {
  const { settings, setSettings } = useContext(SettingsContext);
  return (
    <SettingsItemConstructor settingsKey={settingsKey} label={label}>
      <Form.Check
        type="switch"
        checked={settings[settingsKey]}
        onChange={() => setSettings(settingsKey, !settings[settingsKey])}
      />
    </SettingsItemConstructor>
  )
}

// Text input settings item constructor
export function TextInputConstructor({ settingsKey, label }) {
  const { settings, setSettings } = useContext(SettingsContext);
  return (
    <SettingsItemConstructor settingsKey={settingsKey} label={label}>
      <Form.Control
        type="text"
        onChange={(e) => { setSettings(settingsKey, e.target.value) }}
        value={settings[settingsKey]} />
    </SettingsItemConstructor>
  )
}

// Color settings item constructor
export function ColorConstructor({ settingsKey, label }) {
  const { settings, setSettings } = useContext(SettingsContext);
  return (
    <SettingsItemConstructor settingsKey={settingsKey} label={label}>
      <Form.Control
        type="color"
        onChange={(e) => setSettings(settingsKey, e.target.value)}
        value={settings[settingsKey]} />
    </SettingsItemConstructor>
  )
}

// Range settings item constructor
export function RangeConstructor({ settingsKey, label }) {
  const { settings, setSettings } = useContext(SettingsContext);
  return (
    <SettingsItemConstructor settingsKey={settingsKey} label={label}>
      <Form.Range
        value={settings[settingsKey]}
        onChange={(e) => setSettings(settingsKey, e.target.value)} />
    </SettingsItemConstructor>
  )
}
// Option settings item constructor
export function OptionSelectConstructor({ settingsKey, label, options }) {
  const { settings, setSettings } = useContext(SettingsContext);
  return (
    <SettingsItemConstructor settingsKey={settingsKey} label={label}>
      <Form.Select aria-label={label}
        value={settings[settingsKey]}
        onChange={(e) => setSettings(settingsKey, e.target.value)} >
        {Object.keys(options).map((option, index) => (
          <option
            key={index}
            value={options[option]} >
            {option}
          </option>
        ))}
      </Form.Select>
    </SettingsItemConstructor>
  )
}

