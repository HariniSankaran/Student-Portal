"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertEach = exports.isEachPath = void 0;
const evaluate_json_1 = require("./evaluate-json");
const error_1 = __importDefault(require("./error"));
const state_1 = require("./state");
function isEachPath(path) {
    let right = path.get('right');
    if (right.isCallExpression()) {
        let callee = right.get('callee');
        if (callee.referencesImport('@embroider/macros', 'each')) {
            return true;
        }
    }
    return false;
}
exports.isEachPath = isEachPath;
function insertEach(path, state, context) {
    let args = path.get('right').get('arguments');
    if (args.length !== 1) {
        throw error_1.default(path, `the each() macro accepts exactly one argument, you passed ${args.length}`);
    }
    let left = path.get('left');
    if (!left.isVariableDeclaration() || left.get('declarations').length !== 1) {
        throw error_1.default(left, `the each() macro doesn't support this syntax`);
    }
    let body = path.get('body');
    let varName = left.get('declarations')[0].get('id').node.name;
    let nameRefs = body.scope.getBinding(varName).referencePaths;
    let [arrayPath] = args;
    let array = new evaluate_json_1.Evaluator({ state }).evaluate(arrayPath);
    if (!array.confident) {
        throw error_1.default(args[0], `the argument to the each() macro must be statically known`);
    }
    if (state.opts.mode === 'compile-time' && !Array.isArray(array.value)) {
        throw error_1.default(args[0], `the argument to the each() macro must be an array`);
    }
    if (state.opts.mode === 'run-time') {
        let callee = path.get('right').get('callee');
        state.neededRuntimeImports.set(callee.node.name, 'each');
    }
    else {
        for (let element of array.value) {
            let literalElement = evaluate_json_1.buildLiterals(element, context);
            for (let target of nameRefs) {
                target.replaceWith(literalElement);
            }
            path.insertBefore(state_1.cloneDeep(path.get('body').node, state));
        }
        path.remove();
    }
}
exports.insertEach = insertEach;
//# sourceMappingURL=each.js.map