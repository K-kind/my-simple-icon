/* eslint @typescript-eslint/no-var-requires: 0 */
'use strict'
exports.__esModule = true
var experimental_utils_1 = require('@typescript-eslint/experimental-utils')
var createRule = experimental_utils_1.ESLintUtils.RuleCreator(function (name) {
  return name
})
module.exports = createRule({
  name: 'no-parameter-properties',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallaw parameter properties of classes',
      category: 'Stylistic Issues',
      recommended: false
    },
    messages: {
      parameterProperty: 'Parameter property {{name}} is not allowed.'
    },
    schema: []
  },
  defaultOptions: [],
  create: function (ctx) {
    return {
      TSParameterProperty: function (node) {
        var name = (
          node.parameter.type === experimental_utils_1.AST_NODE_TYPES.Identifier
            ? node.parameter
            : node.parameter.left
        ).name
        ctx.report({
          node: node,
          messageId: 'parameterProperty',
          data: { name: name }
        })
      }
    }
  }
})
