import emptyObj from 'empty/object'
import memoize, {shallowEqual} from 'cdll-memoize'


// provides memoization to pure SFCs
export default function pure (Component, opt = emptyObj) {
  const {size = 16, isEqual = shallowEqual, debug = false} = opt

  return memoize(
    Component,
    {
      size,
      debug,
      isEqual: function (a, b) {
        // React components only take one arg (props)
        return isEqual(a[0], b[0])
      }
    }
  )
}
