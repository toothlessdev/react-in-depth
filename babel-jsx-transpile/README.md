## JSX

JSX 는 자바스크립트 표준 코드가 아님 <br/>
따라서 Babel 과 같은 `트랜스파일러`를 거쳐야 JS Runtime 이 이해할 수 있는 의미있는 JS 코드로 변환됨 <br/>

## JSX 의 구성

#### 1. JSX Element

JSX Element 는 html 태그와 유사한 역할을 함 <br/>
JSX Element 는 `JSXOpeningElement` `JSXClosingElement` `JSXSelfClosingElement` `JSXFragment` 중 하나여야 함

#### 2. JSXElementName

JSXElement 의 요소 이름으로 쓸 수 있는 것으로

1. `JSXIdentifier` : JSX 내부에서 사용할 수 있는 식별자. JS 식별자 규칙과 동일
2. `JSXNamespacedName` : `JSXIdentifier:JSXIdentifier` 와 같이 `:` 를 통해 서로 다른 식별자를 묶을 수 있음
3. `JSXMemberExpression` : `JSXIdentifier.JSXIdentifier` 와 같이 `.` 을 통해 서로 다른 식별자를 이어 주는것

#### 3. JSX Attributes

JSXElement 에 부여할 수 있는 속성으로

1. `JSXSpreadAttributes` : JS 전개 연산자 `{...rest}`
2. `JSXAttribute` : 속성을 나타내는 키 (`JSXAttributeName`), 값 (`JSXAttributeValue`) 로 표현

#### 4. JSX Children

JSX Element 의 자식 값으로 `JSXChild` 를 0개 이상 가질 수 있음<br/>
각 `JSXChild` 는 `JSXText`, `JSXElement`, `JSXFragment` 로 구성 될 수 있다

## JSX 이 babel 에 의해 트랜스파일링 되는 과정

JSX 코드는 `@babel/plugin-transform-react-jsx` 플러그인에 의해 JS 코드로 변환됨

## rollup.config.mjs

RollUp 번들러 설정을 위한 configuration 파일

1. [@rollup/plugin-node-resolve](https://github.com/rollup/plugins/tree/master/packages/node-resolve)<br/>
   node_modules 디렉토리에 있는 third party modules 를 사용할 수 있도록
   만들어줌

2. [@rollup/plugin-commonjs](https://github.com/rollup/plugins/tree/master/packages/commonjs)<br/>
   번들링 시에 CommonJS 모듈을 ES6 로 변환해 줌

3. [@rollup/plugin-json](https://github.com/rollup/plugins/tree/master/packages/json)<br/>
   JSON 파일을 ES6 모듈로 변환해 줌

4. [@rollup/plugin-babel](https://github.com/rollup/plugins/tree/master/packages/babel)<br/>
   번들링시에 babel 을 사용해 트랜스파일링을 할 수 있게 해준다

    `babelHelpers : "bundled" | "runtime" | "inline" | "external"`

    - bundled : 기본값으로 babel 헬퍼 함수가 번들에 포함되고, 각 헬퍼는 한번만 번들에 포함됨. (\*헬퍼함수 : babel 에서 코드 크기 축소, 중복방지, 구형 브라우저 호환, 변환시 사용되는 유틸리티 함수)
    - runtime : 반복적으로 사용되는 babel 헬퍼 함수가 @babel/runtime 패키지로부터 가져와짐. (@babel/runtime, @babel/plugin-transform-runtime 설치필요) 라이브러리 빌드할때 유용. 동일 헬퍼함수가 여러번 번들에 포함되지 않아 최종 번들 사이즈 줄어듦

    ```js
    // rollup.config.js
    import babel from "@rollup/plugin-babel";

    export default {
        // ... 다른 설정 ...
        plugins: [
            babel({
                babelHelpers: "runtime",
            }),
        ],
    };
    ```

## babel.config.json

1. [@babel/preset-env](https://babeljs.io/docs/babel-preset-env)<br/>
   최신 JS 문법을 구형 브라우저 (target env) 에서 사용가능 하도록 만들어줌<br/>
   예) 화살표함수, 클래스, 모듈, 비동기함수 등 ...

## 참고자료

[JSON 을 ES Module 에서 import 하는법](https://simonplend.com/import-json-in-es-modules/)

> import json 뒤에 assert { type : "json" } 붙이기

[@babel/preset-env : Github](https://babeljs.io/docs/babel-preset-env)<br/>
[@babel/preset-env : Docs](https://babeljs.io/docs/babel-preset-env)
