var t  = require('babel-core').types

function isFrag(node){
  return t.isJSXIdentifier(node.name) && node.name.name === 'frag'
}

module.exports = function(babel){

  return new babel.Transformer('jsx-fragment', {
    JSXElement: function(node){
      var opening = node.openingElement;

      if ( isFrag(opening) ) {
        if (opening.selfClosing) throw new Error('<frag> jsx elements cannot be selef closing!')
        node = t.arrayExpression(node.children) 
      }

      return node
    }
  })
}