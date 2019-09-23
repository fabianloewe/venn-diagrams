import React from "react";
import styled from "styled-components";
import Layout from "../components/layout";
import SEO from "../components/seo";
import VennDiagram from "../components/venn-diagram";
import OpInput from "../components/op-input";
import { VDInputReader } from "../calc";

const langs = ["Deutsch", "English"];

const layoutOps = "⋂ ⋃ ∖ ¬ {enter}";
const layouts = [
  [
    "Ω A {bksp}",
    layoutOps,
  ],
  [
    "Ω A B {bksp}",
    layoutOps,
  ],
  [
    "Ω A B C {bksp}",
    layoutOps,
  ],
  [
    "Ω A B C D {bksp}",
    layoutOps,
  ],
]

const InputContainer = styled.div`
  margin-bottom: 10px;
  padding: 5px 0;
  //border: 3px solid black;
  //border-radius: 5px;
`;

class IndexPage extends React.Component {
  state = {
    numSetsText: "1",
    numSets: 1,
    setsOp: "",
    lang: langs[0],
    inputReader: new VDInputReader(1),
    selected: [],
  }

  handleNumSetsChange = event => {
    const text = event.target.value;
    const value = Number(text);
    if (value >= 1) {
      this.setState({
        numSetsText: text,
        numSets: value,
        inputReader: new VDInputReader(value),
      });
    } else {
      this.setState({
        numSetsText: text,
      });
    }
  }

  handleSetsOpChange = text => this.setState({ setsOp: text });

  handleSetsOpEval = () => {
    const { inputReader, setsOp } = this.state;
    let input = setsOp.replace(/⋂/g, "n");
    input = input.replace(/⋃/g, "u");
    input = input.replace(/∖/g, "-");
    input = input.replace(/¬/g, "~");

    try {
      this.setState({
        selected: inputReader.readInput(input).getSet(),
      });
    } catch (e) {
      alert(e);
    }
  }

  handleReset = () => {
    this.setState({
      selected: []
    })
  }

  render() {
    const { numSets, numSetsText, setsOp, selected } = this.state;
    return (
      <Layout>
        <SEO title="Venn Diagram" />
        <h1>The Venn diagram tool</h1>
        <p>Disclaimer: The most right element is the first set.</p>
        <InputContainer>
          <label htmlFor="num-sets">Number of sets: </label>
          <input
            type="number"
            id="num-sets"
            min="1"
            max="4"
            value={numSetsText}
            onChange={this.handleNumSetsChange}
          />
        </InputContainer>
        <InputContainer>
          <OpInput
            layout={layouts[numSets - 1]}
            value={setsOp}
            onChange={this.handleSetsOpChange}
          />
        </InputContainer>
        <InputContainer>
          <input
            type="button"
            id="sets-op-eval"
            value="Evaluate"
            onClick={this.handleSetsOpEval}
          />
          <input
            type="button"
            id="sets-reset"
            value="Reset"
            onClick={this.handleReset}
          />
        </InputContainer>
        <VennDiagram
          containerSize={{ width: 600, height: 600 }}
          setsCount={numSets}
          selected={selected}
          color="blue"
        />

      </Layout>
    )
  }
}

export default IndexPage
