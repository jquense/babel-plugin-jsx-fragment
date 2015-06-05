var babel = require('babel-core')
  , util = require('util')
  , plugin = require('./index')
  , fs = require('fs')

require('chai').should()

describe('should detect fragments', function(){

  it('should transpile to array', function(){
    console.log(transform('simple.jsx').code)
  })
})


function transform(file){
  return babel.transform(fs.readFileSync(__dirname + '/fixtures/' + file), { stage: 0, plugins: [ 
    plugin 
  ]})
}