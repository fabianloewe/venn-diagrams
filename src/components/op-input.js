import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "simple-keyboard/build/css/index.css";

export const OpInput = ({
  className,
  layout,
  value,
  onChange,
  onKeyPress,
}) => {
  const [keyboard, setKeyboard] = useState(null);

  const layoutRegExp = layout
    .map(row => row
      .replace(/\s|{.*}/g, "")
      .replace(/\(\)/g, "\\(\\)")
    )
    .join("");
  const inputPattern = new RegExp(`\\s[${layoutRegExp}]`, "g");
  console.log(inputPattern)

  const onChangeInput = event => {
    const input = event.target.value;
    if (!input.match(inputPattern)) return;
    onChange(input);
    keyboard.setInput(input);
  };

  useEffect(() => {
    if (window) {
      import("simple-keyboard").then(KeyboardClass => {
        const Keyboard = KeyboardClass.default

        const keyboard = new Keyboard({
          onChange,
          onKeyPress,
          layout: { "default": layout},
        });
        keyboard.setInput(value);
        setKeyboard(keyboard);
      });
    }
  }, [layout]);

  return (
    <div className={className}>
      {/*<label htmlFor="sets-op">Set operations: </label>*/}
      <input
        id="sets-op"
        type="text"
        value={value}
        placeholder={"Tap on the virtual keyboard to start"}
        onChange={onChangeInput}
        //disabled={true}
      />
      <div className="simple-keyboard" />
    </div>
  );
};

OpInput.propTypes = {
  className: PropTypes.string,
  layout: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
};

export default OpInput;
