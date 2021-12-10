import TextDiffer from "./text-differ/text-differ.module";
import Expression from "./expression/expression.module";


export default [{
    path: 'text/differ',
    element: <TextDiffer />
}, {
    path: 'expression',
    element: <Expression />
}, {
    path: '*',
    element: <div>404</div>
}]