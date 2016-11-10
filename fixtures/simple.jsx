import React from 'react';

let foo = (
  <div>
    {
      true && <$frag>
        {false}
        heeello
        <span/>
      </$frag>
    }
  </div>
)
