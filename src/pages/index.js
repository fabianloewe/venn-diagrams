import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Diagram from "../components/venn-diagram"

const langs = ["Deutsch", "English"];

class IndexPage extends React.Component {
  state = {
    numSetsText: "",
    numSets: 2,
    lang: langs[0],
  }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const text = event.target.value;
    const value = Number(text);
    if (value >= 2) {
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
        <Diagram
          svgSize={800}
          numSets={numSets}
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
