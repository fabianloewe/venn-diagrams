import React from "react";
import OpInput from "./op-input";

const TryhardItem = props => (
  <>
    <props.container>
      <OpInput
        layout={props.layout}
        value={props.value}
        onChange={props.onChange}
        onKeyPress={key => key === "{enter}" ? props.onEvaluate() : true}
        texts={props.texts}
      />
    </props.container>
    <props.container>
      <input
        className="primary"
        type="button"
        id="sets-op-eval"
        value={props.texts.eval}
        onClick={props.onEvaluate}
      />
      <input
        type="button"
        id="sets-reset"
        value={props.texts.reset}
        onClick={props.onReset}
      />
    </props.container>
  </>
);

export default TryhardItem;
