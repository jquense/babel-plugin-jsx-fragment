

module.exports = function(babel){
  var t = babel.types;

  function isFrag(node){
    return t.isJSXIdentifier(node.name) && (node.name.name === 'frag' || node.name.name === 'fragment')
  }

  return {
    visitor: {
      JSXElement: function(path, state) {
        var node = path.node
        var opening = node.openingElement;

        if (isFrag(opening)) {
          if (opening.selfClosing)
            throw new Error('<frag> jsx elements cannot be self closing. The point of them is to contain children')

          var fragment = t.ObjectExpression(
            node.children.map(function(child, idx) {
              var value = child;

              if (t.isJSXText(value))
                value = t.stringLiteral(value.value)

              if (t.isJSXExpressionContainer(value))
                value = value.expression;

              return t.objectProperty(t.stringLiteral('key_' + idx), value)
            })
          )

          node = t.CallExpression(
              state.file.addImport('react-addons-create-fragment', 'ReactFragment')
            , [ fragment ])

          path.replaceWith(node)
        }
      }
    }
  }
}
