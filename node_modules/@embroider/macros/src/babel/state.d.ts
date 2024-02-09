import type { NodePath, Node } from '@babel/traverse';
import { Package } from '@embroider/shared-internals';
export default interface State {
    generatedRequires: Set<Node>;
    removed: Set<Node>;
    calledIdentifiers: Set<Node>;
    jobs: (() => void)[];
    neededRuntimeImports: Map<string, string>;
    neededEagerImports: Map<string, NodePath[]>;
    opts: {
        userConfigs: {
            [pkgRoot: string]: unknown;
        };
        globalConfig: {
            [key: string]: unknown;
        };
        owningPackageRoot: string | undefined;
        isDevelopingPackageRoots: string[];
        appPackageRoot: string | undefined;
        embroiderMacrosConfigMarker: true;
        mode: 'compile-time' | 'run-time';
        importSyncImplementation: 'cjs' | 'eager';
    };
}
export declare function pathToRuntime(path: NodePath, state: State): string;
export declare function sourceFile(path: NodePath, state: State): string;
export declare function owningPackage(path: NodePath, state: State): Package;
export declare function cloneDeep(node: Node, state: State): Node;
export declare function unusedNameLike(name: string, path: NodePath<unknown>): string;
