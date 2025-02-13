import React from "react"

const GeneratorItem = (props) => (
  <>
    <props.container>
      <input
        className="disabled"
        type="text"
        id="sets-op-out"
        value={props.value}
        disabled={true}
      />
    </props.container>
    <props.container>
      <input
        className="primary"
        type="button"
        id="sets-op-gen"
        value={props.texts.gen}
        onClick={props.onGenerate}
      />
      <input
        type="button"
        id="sets-op-reset-gen"
        value={props.texts.reset}
        onClick={props.onReset}
      />
    </props.container>
  </>
)

export default GeneratorItem
