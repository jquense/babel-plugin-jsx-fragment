# jsx fragment babel plugin

```sh
npm i -S babel-plugin-jsx-fragment
```

and to use include `jsx-fragment` in your plugins array in your `.babelrc` or config object.

### The Problem 

JSX gets ugly when using conditionals that return more than one jsx element

```js
<div>
{ true && [
    <span/>, <div/>
  ]
}
</div>
```

You need to use commas (gross) and an array literal (yuck). `jsx-fragment` allows for a simple syntax to hide the ugliness, based on the discussion [here](https://github.com/facebook/react/issues/690#issuecomment-39679871). Just use the pseudo element `<frag>` to wrap your arrays.

```js
<div>
{ true && <frag>
    <span/>
    <div/>
  </frag>
}
</div>
```

which will transpile to an array correctly 

```js
React.createElement(
  "div",
  null,
  true && [ React.createElement("span", null), React.createElement("div", null) ]
);
```

### current caveats

It still is compiling to an array so React will warn you that your elements need keys