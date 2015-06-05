# jsx fragment babel plugin

```sh
npm i -S babel-plugin-jsx-fragment
```

To use include `jsx-fragment` in your plugins array in your `.babelrc` or config object. Works with React `0.13`+ and uses the newly added `createFragment` api.

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

You need to use commas (gross) and an array literal (yuck). `jsx-fragment` allows for a simple syntax to hide the ugliness, based on the discussion [here](https://github.com/facebook/react/issues/690#issuecomment-39679871). Just use the pseudo element `<frag>` to wrap arrays of Elements.

```js
<div>
{ condition && <frag>
    <span/>
    <div/>
  </frag>
}
</div>
```

the `<frag>` element will be compiled away into the following.

```js
React.createElement("div", null, condition && ReactFragment.create({
    key_0: React.createElement("span", null),
    key_1: React.createElement("div", null)
  })
);
```