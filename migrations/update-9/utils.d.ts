/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { JsonAstObject } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
import { Builders, WorkspaceTargets } from '../../utility/workspace-models';
/** Get all workspace targets which builder and target names matches the provided. */
export declare function getTargets(workspace: JsonAstObject, targetName: Exclude<keyof WorkspaceTargets, number>, builderName: Builders): {
    target: JsonAstObject;
    project: JsonAstObject;
}[];
/** Helper to retreive all the options in various configurations. */
export declare function getAllOptions(builderConfig: JsonAstObject, configurationsOnly?: boolean): JsonAstObject[];
export declare function getWorkspace(host: Tree): JsonAstObject;