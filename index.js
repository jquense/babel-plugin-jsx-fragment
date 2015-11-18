

module.exports = function(babel){
  var t = babel.types;

  function isFrag(node){
    return t.isJSXIdentifier(node.name) && node.name.name === 'frag'
  }

  return new babel.Plugin('jsx-fragment', {
    visitor: {
      JSXElement: function(node, parent, scope, file){
        var opening = node.openingElement;

        if (isFrag(opening)) {
          if (opening.selfClosing)
            throw new Error('<frag> jsx elements cannot be self closing. The point of them is to contain children')

          var fragment = t.objectExpression(node.children.map(function(val, idx) {
            return t.property('init', t.literal('key_' + idx), val)
          }))

          node = t.callExpression(
              file.addImport('react-addons-create-fragment', 'ReactFragment')
            , [ fragment ])
        }

        return node
      }
    }
  })
}
