import React from "react";
import styled from "styled-components";
import GridLayout  from "react-grid-layout";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from "react-accessible-accordion";
import 'react-accessible-accordion/dist/fancy-example.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserView, MobileView } from "react-device-detect";
import Layout from "../components/layout";
import SEO from "../components/seo";
import VennDiagram from "../components/venn-diagram";
import OpInput from "../components/op-input";
import SettingsItem from "../components/settings-item";
import TryhardItem from "../components/tryhard-item";
import GeneratorItem from "../components/generator-item";
import { VDInputReader, Set as VDSet, VDInputGenerator } from "../calc";

const langs = ["Deutsch", "English"];

const layoutOps = "⋂ ⋃ ∖ ¬ {enter}";
const layouts = [
  [
    "Ω A ( ) {bksp}",
    layoutOps,
  ],
  [
    "Ω A B ( ) {bksp}",
    layoutOps,
  ],
  [
    "Ω A B C ( ) {bksp}",
    layoutOps,
  ],
  [
    "Ω A B C D ( ) {bksp}",
    layoutOps,
  ],
]

const Half = styled.section`
  margin: 0 auto;
`;

const InputContainer = styled.div`
  margin-bottom: 10px;
  padding: 5px 0;
  //border: 3px solid black;
  //border-radius: 5px;
`;

toast.configure({
  autoClose: 10000,
  draggable: true,
})

class IndexPage extends React.Component {
  state = {
    numSetsText: "1",
    numSets: 1,
    setsOp: "",
    lang: langs[0],
    inputReader: new VDInputReader(1),
    inputGen: new VDInputGenerator(1),
    selected: [],
    setsOpGen: "",
    color: "#004dcf",
  }

  handleNumSetsChange = event => {
    const text = event.target.value;
    const value = Number(text);
    if (value >= 1) {
      this.setState({
        numSetsText: text,
        numSets: value,
        inputReader: new VDInputReader(value),
        inputGen: new VDInputGenerator(value),
      });
    } else {
      this.setState({
        numSetsText: text,
      });
    }
  }

  handleSetsOpChange = text => this.setState({ setsOp: text })

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
      toast.error(e.toString());
      console.error(e);
    }
  }

  handleReset = () => this.setState({ selected: [] })

  handleSetsOpGen = () => {
    const { inputGen, selected } = this.state;
    try {
      let result = inputGen.generateInput(new VDSet(selected));
      result = result.replace(/nN/g, "⋂");
      result = result.replace(/uU/g, "⋃");
      result = result.replace(/-/g, "∖");
      result = result.replace(/~/g, "¬");
      this.setState({
        setsOpGen: result,
      });
    } catch (e) {
      toast.error(e.toString());
      console.error(e);
    }
  }

  handleElemSetsSelected = newElemSets => this.setState({ selected: newElemSets })

  handleChangeColor = color => {
    console.log("new color:", color)
    this.setState({ color: color.hex })
  }

  renderToolbar() {
    const { numSetsText, setsOp, selected, setsOpGen, color, numSets } = this.state;
    return (
      <Accordion
        allowMultipleExpanded={true}
        allowZeroExpanded={true}
        preExpanded={["diagram-settings"]}
      >
        <AccordionItem uuid="diagram-settings">
          <AccordionItemHeading>
            <AccordionItemButton>
              Adjust diagram settings
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <SettingsItem
              container={InputContainer}
              value={numSetsText}
              onChange={this.handleNumSetsChange}
              color={color}
              onChangeColor={this.handleChangeColor}
            />
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem uuid="try-set-ops">
          <AccordionItemHeading>
            <AccordionItemButton>
              Try out set operations
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <TryhardItem
              container={InputContainer}
              layout={layouts[numSets - 1]}
              value={setsOp}
              onChange={this.handleSetsOpChange}
              onEvaluate={this.handleSetsOpEval}
              onReset={this.handleReset}
            />
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem uuid="get-set-ops">
          <AccordionItemHeading>
            <AccordionItemButton>
              Generate set operations based on the diagram
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <GeneratorItem
              container={InputContainer}
              value={setsOpGen}
              onGenerate={this.handleSetsOpGen}
              onReset={this.handleReset}
            />
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    )
  }

  renderDiagram() {
    const { numSets, selected, color } = this.state;
    return (
      <VennDiagram
        containerSize={{ width: 600, height: 600 }}
        setsCount={numSets}
        selected={selected}
        onSelected={this.handleElemSetsSelected}
        color={color}
      />
    )
  }

  render() {
    const { numSets, numSetsText, setsOp, selected, setsOpGen, color } = this.state;
    const layout = [
      { i: "left", x: 0, y: 0, w: 1, h: 1, static: true },
      { i: "right", x: 1, y: 0, w: 1, h: 1, static: true },
    ];
    return (
      <Layout>
        <SEO title="Venn Diagram" />
        {/*<h1>The Venn diagram tool</h1>*/}
        <p>Disclaimer: The most right element is the first set.</p>
        <BrowserView>
          <GridLayout
            className="layout"
            layout={layout}
            cols={2}
            rowHeight={1}
            width={1200}
          >
            <Half key="left" left={0}>
              {this.renderToolbar()}
            </Half>
            <Half key="right" left={20}>
              {this.renderDiagram()}
            </Half>
          </GridLayout>
        </BrowserView>
        <MobileView>
          {this.renderToolbar()}
          {this.renderDiagram()}
        </MobileView>
      </Layout>
    )
  }
}

export default IndexPage
