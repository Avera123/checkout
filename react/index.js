import {render} from "react-dom"
import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import {ExtensionPoint, Link, Helmet} from 'render'
// import {FormattedMessage, FormattedHTMLMessage, injectIntl, intlShape} from 'react-intl'

import Form from "react-jsonschema-form"
import {schema, uiSchema} from './schemas'

import {compose, graphql} from 'react-apollo'
import saveSettings from './graphql/saveSettings.gql'
import getSettings from './graphql/getSettings.gql'

const filterKeys = (obj, sch) => {
  let results = {}
  Object.keys(sch.properties).forEach((key) => {
    let sp = sch.properties[key]
    if (sp.hasOwnProperty("properties")) {
      results[key] = filterKeys(obj[key], sp)
    } else {
      results[key] = obj[key]
    }
  })
  return results
}

class CheckoutSettings extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit({formData}) {
    console.log("Got this: ", formData)
    const settings = filterKeys(formData, schema)

    await this.props.saveSettings({
      variables: {
        settings: settings
      }
    })
  }

  render () {
    if (this.props.getSettings && this.props.getSettings.loading) {
      return <div>Loading...</div>
    }
    if (this.props.getSettings && this.props.getSettings.error) {
      return <div>Someting went wrong</div>
    }
    const {getSettings} = this.props.getSettings
    console.log("Fetched this: ", getSettings)

    return (
      <div className="relative font-display dark-gray flex flex-wrap justify-center">
        <Form
          schema={schema}
          formData={getSettings}
          uiSchema={uiSchema}
          onSubmit={this.onSubmit}
          onError={(e) => console.log("Bad input numbers: ", e.length)}
          showErrorList={false}
          />
      </div>
    )
  }
}


CheckoutSettings.propTypes = {
  getSettings: PropTypes.object,
  saveSettings: PropTypes.func,
}

export default compose(
  graphql(getSettings, {name: 'getSettings'}),
  graphql(saveSettings, {name: 'saveSettings'}),
)(CheckoutSettings)
