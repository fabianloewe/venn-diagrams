import React from "react";

const GeneratorItem = props => (
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
        value="Generate"
        onClick={props.onGenerate}
      />
      <input
        type="button"
        id="sets-op-reset-gen"
        value="Reset"
        onClick={props.onReset}
      />
    </props.container>
  </>
);

export default GeneratorItem;
