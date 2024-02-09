/// <reference types="babel__template" />
import type { types, template } from '@babel/core';
export interface BabelContext {
    template: typeof template;
    types: typeof types;
}
