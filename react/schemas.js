export const schema = {
  "title": "Checkout Settings",
  "type": "object",
  "properties": {
    "paymentConfiguration": {
      "title": "Payments",
      "type": "object",
      "properties": {
        "requiresAuthenticationForPreAuthorizedPaymentOption": {
          "type": "boolean",
          "default": false,
          "title": "Require user authentication for automatically authorized payments"
        }
      }
    },
    "minimumQuantityAccumulatedForItems": {
      "title": "Minimum number of items in cart",
      "type": "number",
      "minimum": 1
    },
    "decimalDigitsPrecision": {
      "title": "Number of decimal digits to be considered",
      "type": "number",
      "minimum": 0,
      "maximum": 2
    },
    "minimumValueAccumulated": {
      "title": "Minimum total value in cart",
      "type": "number",
      "exclusiveMinimum": 0
    },
    "taxConfiguration": {
      "title": "Tax settings",
      "type": "object",
      "properties": {
        "url": {
          "title": "URL",
          "type": "string",
          "format": "uri"
        },
        "authorizationHeader": {
          "title": "Authorization header",
          "type": "string"
        },
        "allowExecutionAfterErrors": {
          "title": "Allow execution after errors",
          "type": "boolean",
          "default": false
        },
        "integratedAuthentication": {
          "title": "Integrated authentication",
          "type": "boolean",
          "default": false
        }
      },
      "required": ["url",
                   "authorizationHeader"]
    }
  },
  "required": ["paymentConfiguration",
               "minimumQuantityAccumulatedForItems",
               "decimalDigitsPrecision",
               "minimumValueAccumulated",
               "taxConfiguration"]
}

export const uiSchema = {
  "ui:options": {
    label: false
  },
  "minimumQuantityAccumulatedForItems": {
    "ui:widget": "updown"
  },
  "decimalDigitsPrecision": {
    "ui:widget": "updown"
  },
  "taxConfiguration": {
    "authorizationHeader": {
      "ui:widget": "textarea"
    }
  }
}
