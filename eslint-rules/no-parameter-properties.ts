import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree
} from '@typescript-eslint/experimental-utils'

const createRule = ESLintUtils.RuleCreator((name) => name)

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
  create: (ctx) => ({
    TSParameterProperty: (node) => {
      const { name } =
        node.parameter.type === AST_NODE_TYPES.Identifier
          ? node.parameter
          : ((node.parameter as TSESTree.AssignmentPattern)
              .left as TSESTree.Identifier)
      ctx.report({
        node,
        messageId: 'parameterProperty',
        data: { name }
      })
    }
  })
})
