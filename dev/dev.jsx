var React = require('react')

class Component extends React.Component {

  render(){

    return (
      <div>
        {
          true && <frag>
            hello
            <span>john</span>
          </frag>
        }
      </div>
    )
  }
}

React.render(<Component/>, document.body)
