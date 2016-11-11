
module.exports = function(babel) {
  var t = babel.types;
  var template = babel.template;

  var buildMapper = template(`
    CHILDREN.Children.map(FRAGMENT, function (child){
      return child;
    })
  `);

  function isFrag(node, tagName){
    return t.isJSXIdentifier(node.name) && node.name.name === tagName
  }

  return {
    visitor: {
      JSXElement: function(path, state) {
        var node = path.node
        var tagName = state.opts.tagName || 'frag';
        var opening = node.openingElement;

        if (isFrag(opening, tagName)) {
          if (opening.selfClosing)
            throw new Error(
              '<' + tagName + '> jsx elements cannot be self closing. The point of them is to contain children')


          var fragments = t.ArrayExpression(
            node.children.map(function(child, idx) {
              var value = child;

              if (t.isJSXText(value)) {
                if (value.value.trim() === '') {
                  return null;
                }
                value = t.stringLiteral(value.value.trim())
              }

              if (t.isJSXExpressionContainer(value))
                value = value.expression;

              return value
            })
            .filter(f => f)
          )

          node = buildMapper({
          	CHILDREN: state.file.addImport('react', 'default', 'fragment'),
            FRAGMENT: fragments
          })

          // why would you do this?
          if (t.isJSXElement(path.parent)) {
            node = t.JSXExpressionContainer(node.expression)
          }

          path.replaceWith(node)
        }
      }
    }
  }
}
