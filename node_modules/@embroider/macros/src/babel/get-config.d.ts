import type { NodePath } from '@babel/traverse';
import type { CallExpression, FunctionDeclaration } from '@babel/types';
import State from './state';
import { BabelContext } from './babel-context';
export declare type Mode = 'own' | 'getGlobalConfig' | 'package';
export default function getConfig(path: NodePath<CallExpression>, state: State, mode: Mode): unknown;
export declare function insertConfig(path: NodePath<CallExpression>, state: State, mode: Mode, context: BabelContext): void;
export declare function inlineRuntimeConfig(path: NodePath<FunctionDeclaration>, state: State, context: BabelContext): void;
