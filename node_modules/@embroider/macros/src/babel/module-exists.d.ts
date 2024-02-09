import type { NodePath } from '@babel/traverse';
import type { CallExpression } from '@babel/types';
import State from './state';
export default function moduleExists(path: NodePath<CallExpression>, state: State): boolean;
