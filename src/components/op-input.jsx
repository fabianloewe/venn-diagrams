import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import "simple-keyboard/build/css/index.css"

export const OpInput = ({
  className,
  layout,
  value,
  onChange,
  onKeyPress,
  texts,
}) => {
  const [keyboard, setKeyboard] = useState(null)

  const layoutRegExp = layout
    .map((row) => row.replace(/\s|{.*}/g, "").replace(/\(\)/g, "\\(\\)"))
    .join("")
  const inputPattern = new RegExp(`\\s|[${layoutRegExp}]`, "g")
  console.log(inputPattern)

  const onChangeInput = (event) => {
    const input = event.target.value
    const matchResult = input.match(inputPattern)
    if (matchResult !== null && matchResult.join("") !== input) return
    onChange(input)
    keyboard.setInput(input)
  }

  useEffect(() => {
    let newKeyboard

    if (window) {
      import("simple-keyboard").then((KeyboardClass) => {
        const Keyboard = KeyboardClass.default

        setKeyboard((prevKeyboard) => {
          if (prevKeyboard) {
            prevKeyboard.destroy()
          }

          newKeyboard = new Keyboard({
            onChange,
            onKeyPress,
            layout: { default: layout },
          })

          newKeyboard.setInput(value)
          return newKeyboard
        })
      })
    }

    return () => {
      if (newKeyboard) {
        newKeyboard.destroy()
      }
    }
  }, [layout])

  return (
    <div className={className}>
      {/*<label htmlFor="sets-op">Set operations: </label>*/}
      <input
        id="sets-op"
        type="text"
        value={value}
        placeholder={texts.input}
        onChange={onChangeInput}
        //disabled={true}
      />
      <div className="simple-keyboard" />
    </div>
  )
}

OpInput.propTypes = {
  className: PropTypes.string,
  layout: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
  texts: PropTypes.shape({
    input: PropTypes.string,
  }),
}

export default OpInput
