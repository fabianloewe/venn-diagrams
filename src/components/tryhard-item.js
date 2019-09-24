import React from "react";
import OpInput from "./op-input";

const TryhardItem = props => (
  <>
    <props.container>
      <OpInput
        layout={props.layout}
        value={props.value}
        onChange={props.onChange}
      />
    </props.container>
    <props.container>
      <input
        className="primary"
        type="button"
        id="sets-op-eval"
        value="Evaluate"
        onClick={props.onEvaluate}
      />
      <input
        type="button"
        id="sets-reset"
        value="Reset"
        onClick={props.onReset}
      />
    </props.container>
  </>
);

export default TryhardItem;
