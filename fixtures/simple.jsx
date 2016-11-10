import React from 'react';

let foo = (
  <div>
    {
      true && <$frag>
        {''}
        gg
        {false}
        heeello
        <span/>
      </$frag>
    }
  </div>
)
