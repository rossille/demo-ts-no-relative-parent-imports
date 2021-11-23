'use strict'

module.exports = {
  'no-relative-parent-imports': {
    meta: {
      docs: {
        description: 'disallow identifiers',
        category: 'Possible Errors',
        recommended: false,
      },
      schema: [],
    },
    create: function (context) {
      return {
        ImportDeclaration: function (node) {
          const tsNode = context.parserServices.esTreeNodeToTSNodeMap.get(node)

          if (tsNode.importClause.isTypeOnly) {
            return
          }

          if (tsNode.moduleSpecifier.text.includes('..')) {
            context.report({
              node: node,
              message: 'Import from relative parent. Une `import type` for types and dependency injection for values.',
            })
          }
        },
      }
    },
  },
}
