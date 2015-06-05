var t  = require('babel-core').types

function isFrag(node){
  return t.isJSXIdentifier(node.name) && node.name.name === 'frag'
}

module.exports = function(babel){

  return new babel.Transformer('jsx-fragment', {
    JSXElement: function(node, parent, scope, file){
      var opening = node.openingElement;

      if ( isFrag(opening) ) {
        if (opening.selfClosing) 
          throw new Error('<frag> jsx elements cannot be self closing. The entire point of them is to contain children')

        var fragment = t.objectExpression(node.children.map(function(val, idx){
          return t.property('init', t.literal('key_' + idx), val)
        }))

        node = t.callExpression(
            t.memberExpression(
                file.addImport('react/lib/ReactFragment', 'ReactFragment')
              , t.identifier('create'))
          , [ fragment ])
      }

      return node
    }
  })
}