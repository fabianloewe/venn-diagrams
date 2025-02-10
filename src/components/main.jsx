import React from "react";
import PropTypes from "prop-types";
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
import Layout from "./layout";
import SEO from "./seo";
import VennDiagram from "./venn-diagram";
import OpInput from "./op-input";
import SettingsItem from "./settings-item";
import TryhardItem from "./tryhard-item";
import GeneratorItem from "./generator-item";
import { VDInputReader, Set as VDSet, VDInputGenerator } from "../calc";

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

const toastConfig = {
  autoClose: 10000,
  draggable: true
}

class Main extends React.Component {
  state = {
    numSetsText: "1",
    numSets: 1,
    setsOp: "",
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
        selected: [],
      });
    } else {
      this.setState({
        numSetsText: text,
      });
    }
  }

  handleSetsOpChange = text => this.setState({ setsOp: text })

  handleSetsOpEval = () => this.setState(state => {
    const { inputReader, setsOp } = state;
    let input = setsOp.replace(/⋂/g, "n");
    input = input.replace(/⋃/g, "u");
    input = input.replace(/∖/g, "-");
    input = input.replace(/¬/g, "~");
    input = input.replace(/Ω/g, "o");

    try {
      return {
        selected: inputReader.readInput(input).getSet(),
      };
    } catch (e) {
      toast.error(e.toString(), toastConfig);
      console.error(e);
    }
  })

  handleReset = () => this.setState({ selected: [] })

  handleSetsOpGen = () => {
    const { inputGen, selected } = this.state;
    try {
      let result = inputGen.generateInput(new VDSet(selected));
      result = result.replace(/[nN]/g, "⋂");
      result = result.replace(/[uU]/g, "⋃");
      result = result.replace(/[oO]/g, "Ω");
      result = result.replace(/-/g, "∖");
      result = result.replace(/~/g, "¬");
      this.setState({
        setsOpGen: result,
      });
    } catch (e) {
      toast.error(e.toString(), toastConfig);
      console.error(e);
    }
  }

  handleElemSetsSelected = newElemSets => this.setState({ selected: newElemSets })

  handleChangeColor = color => {
    console.log("new color:", color)
    this.setState({ color: color.hex })
  }

  renderToolbar() {
    const { settingsItem, tryHardItem, generatorItem }= this.props.data;
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
              {settingsItem.button}
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <SettingsItem
              container={InputContainer}
              value={numSetsText}
              onChange={this.handleNumSetsChange}
              color={color}
              onChangeColor={this.handleChangeColor}
              texts={settingsItem.menu}
            />
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem uuid="try-set-ops">
          <AccordionItemHeading>
            <AccordionItemButton>
              {tryHardItem.button}
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
              texts={tryHardItem.menu}
            />
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem uuid="get-set-ops">
          <AccordionItemHeading>
            <AccordionItemButton>
              {generatorItem.button}
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <GeneratorItem
              container={InputContainer}
              value={setsOpGen}
              onGenerate={this.handleSetsOpGen}
              onReset={this.handleReset}
              texts={generatorItem.menu}
            />
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    )
  }

  renderDiagram(width, height) {
    const { numSets, selected, color } = this.state;
    return (
      <div>
        <VennDiagram
          containerSize={{ width, height }}
          setsCount={numSets}
          selected={selected}
          onSelected={this.handleElemSetsSelected}
          color={color}
        />
      </div>
    )
  }

  render() {
    const { disclaimer } = this.props.data;
    const { numSets, numSetsText, setsOp, selected, setsOpGen, color } = this.state;
    const layout = [
      { i: "left", x: 0, y: 0, w: 1, h: 1, static: true },
      { i: "right", x: 1, y: 0, w: 1, h: 1, static: true },
    ];
    return (
      <Layout>
        <SEO title="Venn Diagram" />
        {/*<h1>The Venn diagram tool</h1>*/}
        <p>{disclaimer}</p>
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
              {this.renderDiagram(600, 600)}
            </Half>
          </GridLayout>
        </BrowserView>
        <MobileView>
          {this.renderToolbar()}
          {this.renderDiagram(400, 400)}
        </MobileView>
      </Layout>
    )
  }
}

export default Main

Main.propTypes = {
  data: PropTypes.shape({
    disclaimer: PropTypes.string.isRequired,
    generatorItem: PropTypes.shape({
      button: PropTypes.string.isRequired,
      menu: PropTypes.shape({
        gen: PropTypes.string,
        reset: PropTypes.string,
      }).isRequired,
    }),
    settingsItem: PropTypes.shape({
      button: PropTypes.string.isRequired,
      menu: PropTypes.shape({
        color: PropTypes.string,
        numOfSets: PropTypes.string,
      }).isRequired,
    }),
    tryHardItem: PropTypes.shape({
      button: PropTypes.string.isRequired,
      menu: PropTypes.shape({
        input: PropTypes.string,
        eval: PropTypes.string,
        reset: PropTypes.string,
      }).isRequired,
    }),
  }),
};
