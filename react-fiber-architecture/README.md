## Browser Rendering

브라우저 렌더링 과정

1. HTML 을 다운로드 함
2. HTML 파싱을 진행, DOM 노드로 구성된 `DOMTree` 생성
3. CSS 파일을 다운로드 함
4. CSS 파싱을 진행, CSS 노드로 구성된 `CSSOMTree` 생성
5. DOM 노드를 순회 (display:none 과 같이 화면에 보이지 않는 요소는 순회하지 않음) 하며
6. CSSOMTree 를 기반으로 CSS 스타일 정보를 노드에 적용

    6-1. 레이아웃 : 각 DOM 노드가 브라우저 어느 좌표에 나타나야하는지 계산

    6-2. 페인팅 : 실제 DOM 노드를 그림

## Virtual DOM

SPA 에서 DOM 변경시 Reflow, Repaint 가 빈번히 발생함<br/>

1. DOM 작업이 무거움
2. DOM 의 변경사항 추적이 힘듦

`Virtual DOM` : 리액트가 관리하는 가상돔

## React Fiber

리액트는 `React Fiber` 를 통해 여러 렌더링과정을 압축해 최소 렌더링 단위를 만들어 냄

#### React Fiber란 ?

-   JS 객체임
-   React Fiber Reconciler (파이버 재조정자) 가 관리함

    -   Virtual DOM 과 실제 DOM 비교, 변경사항 수집
    -   변경사항 존재시, `변경에 대한 정보를 가지고 있는` Fiber 를 기준으로 화면에 렌더링을 요청.
    -   `Reconcilation (재조정)` : 리액트에서 어떤 부분을 새롭게 렌더링해야하는지 Virtual DOM, 실제 DOM 비교하는 과정

Fiber 는

1. 작업을 작은 단위로 분할, 우선순위를 매김
2. 작업을 일시중지, 재시작 할 수 있음
3. 이전 작업을 재사용하거나, 필요하지 않는 경우 폐기

#### Reconcilation 재조정 알고리즘의 변화

`Stack Reconciler 에서 Fiber Reconciler 로`

1. Stack Reconciler

    - 스택에 렌더링에 필요한 작업들이 쌓임
    - 스택이 빌 때 까지 `동기적` 으로 작업이 이루어짐
    - 싱글스레드 JS 에서 이 동기 작업은 중단 될 수 없어 비효율적
    - 예를 들어, 사용자 input 에 따라 검색결과를 fetch 하는 제어컴포넌트에서 input, 검색결과 ui, fetch 에도 영향을 미침
    - 최악의 경우 글자 입력에 지연이 발생할 수 있음

2. Fiber Reconciler

    - Fiber 는 하나의 작업 단위로 구성되어 있음
    - 작업단위를 처리하고, `finishedWork()` 작업으로 마무리 하고
    - 커밋해, 실제 브라우저 DOM 에 변경사항 적용

#### Fiber Reconciler 의 Render, Commit Phase

1. `Render Phase`

사용자에게 노출되지 않는 모든 `비동기 작업` 을 수행<br/>
... 하는 도중, 작업의 우선순위 지정, 중지, 재시작

2. `Commit Phase`

DOM 의 실제 변경사항 반영을 위한 `commitWork()` 가 실행 <br/>
이는 `동기적` 으로 수행되고, 중단될 수 없음

[React Rendering Phase 리액트 렌더링 과정 참고](../react-rendering-phase/README.md)

## ReactFiber.js

-   JS 객체임
-   ReactFiberNode 는 변경에 대한 정보를 가지고 있음

#### React Fiber VS React Element

| React Element                       | React Fiber                                     |
| ----------------------------------- | ----------------------------------------------- |
| 렌더링 발생시, 항상 `새롭게 생성됨` | 최초 마운트시 생성되어, 이후 `가급적 재사용 됨` |

## React Fiber Node

[react/packages/react-reconciler/src/ReactFiber.js](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiber.js) <br/>
[react/packages/react-reconciler/src/ReactFiberClassUpdateQueue.js](https://github.com/toothlessdev/react/blob/main/packages/react-reconciler/src/ReactFiberClassUpdateQueue.js)

```js
function FiberNode(tag, pendingProps, key, mode) {
    // tag: fiber node 는 element 와 1:1 의 관계 (매칭정보)
    this.tag = tag;

    // stateNode: fiber 자체에 대한 참조 ... 를 통해 fiber 관련 상태에 접근
    this.stateNode = null;

    // child, sibling, return : 파이버 간의 관계
    // 여러 child 를 가진 경우,
    this.child = null;
    this.sibling = null; // 형제 fiber node
    this.return = null; // 부모 fiber node
    this.index = 0; // sibling fiber node 사이 index 번째 위치

    // pendingProps : 작업을 처리하지 못한 props
    this.pendingProps = pendingProps;
    // memoizedProps : 렌더링 완료 후, pendingProps 가 memoizedProps 에 저장되어 관리됨
    this.memoizedProps = null;

    // updateQueue : 상태 업데이트, 콜백, DOM 업데이트 등 작업을 담아두는 큐
    this.updateQueue = null;

    // memoizedState: 함수형 컴포넌트 모든 훅 리스트
    this.memoizedState = null;

    // alternate: 두개의 리액트 파이버 트리에서, 반대편 트리를 가리킴
    this.alternate = null;
}
```

-   Fiber 는 state 가 변경, 생명주기 메서드가 실행, DOM 변경이 필요한 시점 ... 에 실행
-   리액트가 Fiber 를 처리시, 직접 `바로 처리` 하거나 `스케쥴링`

## React Fiber Tree
