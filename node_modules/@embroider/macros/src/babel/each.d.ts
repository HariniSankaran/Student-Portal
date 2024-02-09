import type { NodePath } from '@babel/traverse';
import type { CallExpression, ForOfStatement, Identifier } from '@babel/types';
import State from './state';
import { BabelContext } from './babel-context';
declare type CallEachExpression = NodePath<CallExpression> & {
    get(callee: 'callee'): NodePath<Identifier>;
};
export declare type EachPath = NodePath<ForOfStatement> & {
    get(right: 'right'): CallEachExpression;
};
export declare function isEachPath(path: NodePath<ForOfStatement>): path is EachPath;
export declare function insertEach(path: EachPath, state: State, context: BabelContext): void;
export {};
