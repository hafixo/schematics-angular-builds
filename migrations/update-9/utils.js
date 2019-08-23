"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const config_1 = require("../../utility/config");
const json_utils_1 = require("../../utility/json-utils");
/** Get all workspace targets which builder and target names matches the provided. */
function getTargets(workspace, targetName, builderName) {
    const projects = json_utils_1.findPropertyInAstObject(workspace, 'projects');
    if (!projects || projects.kind !== 'object' || !projects.properties) {
        return [];
    }
    const targets = [];
    for (const project of projects.properties) {
        const projectConfig = project.value;
        if (projectConfig.kind !== 'object') {
            continue;
        }
        const projectRoot = json_utils_1.findPropertyInAstObject(projectConfig, 'root');
        if (!projectRoot || projectRoot.kind !== 'string') {
            continue;
        }
        const architect = json_utils_1.findPropertyInAstObject(projectConfig, 'architect');
        if (!architect || architect.kind !== 'object') {
            continue;
        }
        const target = json_utils_1.findPropertyInAstObject(architect, targetName);
        if (!target || target.kind !== 'object') {
            continue;
        }
        const builder = json_utils_1.findPropertyInAstObject(target, 'builder');
        // Projects who's build builder is @angular-devkit/build-ng-packagr
        if (builder && builder.kind === 'string' && builder.value === builderName) {
            targets.push({ target, project: projectConfig });
        }
    }
    return targets;
}
exports.getTargets = getTargets;
/** Helper to retreive all the options in various configurations. */
function getAllOptions(builderConfig, configurationsOnly = false) {
    const options = [];
    const configurations = json_utils_1.findPropertyInAstObject(builderConfig, 'configurations');
    if (configurations && configurations.kind === 'object') {
        options.push(...configurations.properties.map(x => x.value));
    }
    if (!configurationsOnly) {
        options.push(json_utils_1.findPropertyInAstObject(builderConfig, 'options'));
    }
    return options.filter(o => o && o.kind === 'object');
}
exports.getAllOptions = getAllOptions;
function getWorkspace(host) {
    const path = config_1.getWorkspacePath(host);
    const configBuffer = host.read(path);
    if (!configBuffer) {
        throw new schematics_1.SchematicsException(`Could not find (${path})`);
    }
    const content = configBuffer.toString();
    return core_1.parseJsonAst(content, core_1.JsonParseMode.Loose);
}
exports.getWorkspace = getWorkspace;