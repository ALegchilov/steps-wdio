import { conditionWait } from './conditionWait';
import { valueWait } from './valueWait';
import { po } from '@qavajs/po';
import memory from '@qavajs/memory';
import { Element } from "webdriverio";

export async function aliasTransformer(alias: string) {
    return po.getElement(await memory.getValue(alias))
}

export function lazyAliasTransformer(alias: string) {
    return async () => po.getElement(await memory.getValue(alias))
}

export function conditionWaitTransformer(condition: string) {
    const regexp: RegExp = /(not )?to (?:be )?(.+)/;
    const [ _, reverse, validation ] = condition.match(regexp) as RegExpMatchArray;
    return async function (element: Element<'async'>, timeout: number) {
        await conditionWait(element, validation, timeout, Boolean(reverse))
    }
}

export function valueWaitTransformer(condition: string) {
    const regexp: RegExp = /(not )?to (?:be )?(.+)/;
    const [ _, reverse, validation ] = condition.match(regexp) as RegExpMatchArray;
    return async function (valueFn: Function, expected: any, timeout: number) {
        await valueWait(valueFn, expected, validation, timeout, Boolean(reverse))
    }
}