export function ComponentA(props) {
    return <p>컴포넌트 명 : {props.name ?? "A"} !</p>;
}

export function ComponentB() {
    return <ComponentA />;
}

export function ComponentC() {
    return <ComponentA name="C" />;
}

export function ComponentD() {
    <>React.Fragment 로 감싸진 컴포넌트</>;
}

export function ComponentE(props) {
    return (
        <div>
            {props.children}
            <p>Children Props 를 넘겨받는 컴포넌트</p>
        </div>
    );
}
