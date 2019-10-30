<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://www.th-brandenburg.de">
    <img alt="THB" src="https://www.th-brandenburg.de/typo3conf/ext/sb_config7/Resources/Public/Icons/THB_Logo.svg" width="60" />
  </a>
</p>

# Venn Diagrams

[![license](https://img.shields.io/github/license/:user/:repo.svg)](LICENSE)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> Venn Diagrams visualizes set operations with up to 4 sets.

This tool, developed at and for the [University of Applied Science Brandenburg](https://www.th-brandenburg.de/), is meant to help students learning set operations by visualizing these.
Operations can be tested by utilising the intuitive virtual keyboard.
To get operations resulting in a desired set, in the diagram the set can be selected  and
the operations be generated.

If you like to contribute or found a bug please don't be shy and check out the [Contributing](#contributing) section.

## Table of Contents

- [Security](#security)
- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Credits](#credits)
- [Contributing](#contributing)
  - [Todo](#todo)
- [License](#license)

## Security

There is no data collected wether you use the online or offline version.
Anything you do with this tool only is available as long as you keep your browser or the app open. A refresh resets the site to its initial state.

## Background

This tool is developed using [Gatsby.js](https://gatsbyjs.org) which itself relies on [React.js](https://reactjs.org).

## Install

Installation is usually not necessary. Just use the [online version](https://relaxed-mestorf-4d590f.netlify.com/).

If you require an offline version, download the provided archive for your operating system and
unzip it to a desired location.

Then start the executable named `venn-diagram` on Linux / OS X or `venn-diagram.exe` on Windows.

## Usage

1. **Adjust the settings as you please**

  Select the number of sets you want to work with.

  Choose a color for the diagram or stay with the default.

2. **Start playing by:**

  a. **Trying out set operations**

    Use the virtual keyboard to enter operations.
    This prevents errors on input.
    Then click the `< enter` key on the keyboard or press `Evaluate`.

  b. **Generating set operations based on the diagram**

    Click some sets in the diagram.
    Then hit the `Generate` button.

## Maintainers

- [@Jan Vandenhouten](vandenho@th-brandenburg.de)

- [@Fabian Loewe](fabianl@th-brandenburg.de)

## Credits

See the [contributers file](CONTRIBUTERS.md).

Special thanks go to [Gatsby.js](https://gatsbyjs.org) and [React.js](https://reactjs.org) for providing such great tools and
our [university](https://www.th-brandenburg.de/) for the idea and support for creating this tool.

## Contributing

If you make changes to code please stay with the current code style. It's
the conventional JavaScript code style.

### Todo

- **Help with code cleanup**

    There are some unnecessary lines of code and comments and even hole unused files.

- **Unify visualization components**

    Because of the incremental development steps there is some discrepancy in the visualization between the one-set and the other set diagrams. This could be optimized.

- **Add translations**

    There could be more translations. You can start be copying on of the YAML files at `src/langs` and translate them.

### Pull Requests

Pull Requests are happily accepted but use this [template](PULL_REQUEST_TEMPLATE.md). Otherwise it will be rejected.

Don't forget to add yourself to the [contributers file](CONTRIBUTERS.md)!

```


```

> Small note: If editing the Readme, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[MIT](LICENSE)
