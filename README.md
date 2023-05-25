# thoron-react
React client for [thoron](https://github.com/yjn0/thoron).

## Usage
```js
import { Provider, Map } from 'thoron-react';
import Chapter from 'thoron';

function MyComponent {
  const chapter = new Chapter(/* ... */)

  return (
    <Provider chapter={chapter}>
      <Map />
    </Provider>
  )
}
```

## API
### \<Provider>
A [context provider](https://react.dev/learn/passing-data-deeply-with-context) that makes the `chapter` object available to all enclosed components. An instance of any other component in this library must be nested within a `<Provider>`.

Accepts the following props:
- `chapter` *thoron.Chapter* This component's children will read from/write to this thoron instance
- `children` *react.Children*

### \<GameWindow>
Draws the map, units, etc. according to the `chapter`'s current state.