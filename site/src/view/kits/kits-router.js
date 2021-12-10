import SQLToolkits from "./sql/sql-kits.module";

import TextDiffer from "./text-differ/text-differ.module";
import Expression from "./expression/expression.module";


export default [{
    path: 'sql',
    element: <SQLToolkits />
}, {
    path: 'text/differ',
    element: <TextDiffer />
}, {
    path: 'expression',
    element: <Expression />
}, {
    path: '*',
    element: <div>404</div>
}]