import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import VennDiagram from "../components/venn-diagram"

const langs = ["Deutsch", "English"];

class IndexPage extends React.Component {
  state = {
    numSetsText: "",
    numSets: 1,
    lang: langs[0],
  }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const text = event.target.value;
    const value = Number(text);
    if (value >= 1) {
      this.setState({
        numSetsText: text,
        numSets: value,
      });
    } else {
      this.setState({
        numSetsText: text,
      });
    }
  }

  render() {
    const { numSets, numSetsText } = this.state;
    return (
      <Layout>
        <SEO title="Venn Diagram" />
        <h1>The Venn diagram tool</h1>
        <p>Disclaimer: The most right element is the first set.</p>
        <VennDiagram
          containerSize={{ width: 600, height: 600 }}
          setsCount={numSets}
        />
        <input
          type="text"
          placeholder="Number of sets"
          value={numSetsText}
          onChange={this.handleChange}
        />
      </Layout>
    )
  }
}

export default IndexPage
