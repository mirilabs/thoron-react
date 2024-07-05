import React from 'react';

function renderObject(obj) {
  if (obj == null) {
    return <ul className="obj" />
  }
  else if (Array.isArray(obj)) {
    // array
    let items = obj.map((item, i) => (
      <li key={i}>
        {renderObject(item)}
      </li>
    ));
    return (
      <ul className="obj__array">
        {items}
      </ul>
    )
  }
  else if (typeof obj === 'object') {
    // object
    let items = Object.keys(obj).map(key => {
      let value = obj[key];
      return (
        <li key={key}>
          <span className="obj__key">{key}</span>
          {renderObject(value)}
        </li>
      )
    });
    return (
      <ul className="obj">
        {items}
      </ul>
    )
  }
  else {
    // number, string
    return <span className="obj__primitive">{obj}</span>
  }
}

export default renderObject;