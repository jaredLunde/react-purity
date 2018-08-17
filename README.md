# `react-purity`

Adds memoization to stateless functional components in React. This HOF
works best with components you consistently use (e.g. icons). It will not work
efficiently with components that require props which mutate often (such as
those with an onClick callback fn).

This uses a circular doubly linked list for its LRU caching strategy which
makes it operationally efficient in turning up results.

By default, the equality check between props is a strict shallow equal function.

I would not recommend using large cache sizes as that largely defeats the
optimization of skipping React.createElement. The default cache size is 16.


### Installation
```yarn add react-purity``` or ```npm i react-purity```


```js
import pure from 'react-purity'


const Icon = pure(function Icon ({color, innerRef, title, ...props}) {
  const pathStyle = {fill: color || '#000'}
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox='0 0 25 25'
      style={props}
      ref={innerRef}
    >
      <title>{title}</title>
      <path
        d="M.557,12.35578a1.89945,1.89945,0,1,1,2.68645-2.686l6.45255,6.453,12.06145-12.061A1.89929,1.89929,0,1,1,24.443,6.74823L9.6969,21.49477Z"
        style={pathStyle}
      />
      <path
        d="M24.69186,4.30071a1.05135,1.05135,0,0,0-1.48724,0L9.47188,18.03345,1.79538,10.35694A1.05164,1.05164,0,0,0,.30814,11.84418l9.16324,9.16325.0005-.0005.0005.0005L24.69186,5.78795A1.05135,1.05135,0,0,0,24.69186,4.30071Z"
        style={pathStyle}
      />
    </svg>
  )
})


const IconA = <Icon color='#c127d2' width={30} height={30}/>
const IconB = <Icon color='#c127d2' width={30} height={30}/>
const IconC = <Icon color='#c4c4c4' width={30} height={30}/>

console.log(IconA === IconB)
// true
console.log(IconA === IconC)
// false
```

## `pure(<SFC>, <options>)`
### options
- `size {number}`
  - The maximum number of property/element pairs to cache for a given component
  - default: `16`
- `isEqual {function}`
  - default: `shallowEqual` (https://github.com/jaredLunde/render-props/blob/master/packages/utils/src/strictShallowEqual.js)
- `debug {bool}`
  - When `true` this function will log cache hits/misses to the console along
    with the hit-rate
  - default: `false`
