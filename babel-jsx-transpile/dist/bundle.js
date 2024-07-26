'use strict';

var jsxRuntime = require('custom-jsx-library/jsx-runtime');

function ComponentA(props) {
  var _props$name;
  return jsxRuntime.jsxs("p", {
    children: ["\uCEF4\uD3EC\uB10C\uD2B8 \uBA85 : ", (_props$name = props.name) !== null && _props$name !== void 0 ? _props$name : "A", " !"]
  });
}
function ComponentB() {
  return jsxRuntime.jsx(ComponentA, {});
}
function ComponentC() {
  return jsxRuntime.jsx(ComponentA, {
    name: "C"
  });
}
function ComponentD() {
  jsxRuntime.jsx(jsxRuntime.Fragment, {
    children: "React.Fragment \uB85C \uAC10\uC2F8\uC9C4 \uCEF4\uD3EC\uB10C\uD2B8"
  });
}
function ComponentE(props) {
  return jsxRuntime.jsxs("div", {
    children: [props.children, jsxRuntime.jsx("p", {
      children: "Children Props \uB97C \uB118\uACA8\uBC1B\uB294 \uCEF4\uD3EC\uB10C\uD2B8"
    })]
  });
}

exports.ComponentA = ComponentA;
exports.ComponentB = ComponentB;
exports.ComponentC = ComponentC;
exports.ComponentD = ComponentD;
exports.ComponentE = ComponentE;
