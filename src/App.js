import React, { useState } from 'react';

function OuterComponent({ id, value, onChange }) {
  return (
    <input type='text' id={id} value={value} onChange={onChange} />
  )
}

function App() {
  let [data, setData] = useState('')

  function NestedComponent({ id, value, onChange}) {
    return <OuterComponent id={id} value={value} onChange={onChange} />
  }

  function functionThatReturnsComponent(id, value, onChange) {
    return <OuterComponent id={id} value={value} onChange={onChange} />
  }

  /*
    The App is three inputs that all tie to the same state. Each time a key is typed in an input all
    components are re-rendered due to `setData`.
  */
  return (
    <div className="main">
      <p>The data is: {data}</p>
      <div style={{ display: 'flex', flexDirection: 'row' }} >
        <div>
          <p>Outer Component</p>
          {/*
            The First Component is a plain function component created outside of <App>. Every time <App> renders it will use
            the same reference to the `OuterComponent` function to construct the component.
          */}
          <OuterComponent id="outer-component" value={data} onChange={e => setData(e.target.value)} />
        </div>
        <div>
          <p>Nested Component</p>
          {/*
            The Second Component is a plain function component that is created *inside* <App>.
            Every time <App> renders due to a state change it will create a new function called `NestedComponent`. Even though each
            version of this component will wrap that same instance of `OuterComponent`, the function that contains it will be
            different each render.

            So on every render the input loses focus because it is an *entirely different type of component*
            that happens to contain an input element.
          */}
          <NestedComponent id="nested-component" value={data} onChange={e => setData(e.target.value)} />
        </div>
        <div>
          <p>Returned Component</p>
          {/*
            The Third Component is a component that is returned from a function. Similar 
            to `NestedComponent`, `functionThatReturnsComponent` is a new function that is created on every render.

            However React is not rendering this function, it is rendering the *output* of this function, which is
            an instance of `OuterComponent`. Because this function simply returns an instance of the same `OuterFunction` component
            it keeps input focus like the first component.
          */}
          {functionThatReturnsComponent("returned-component", data, e => setData(e.target.value))}
        </div>
      </div>
    </div>
  )
}

export default App;
