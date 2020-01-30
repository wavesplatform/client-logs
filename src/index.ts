import {
    TMessageType,
    IMakeOptions,
    IConsole,
    IGetMessageOptions,
} from './interfaces';
import { MessageKeeper } from './MessageKeeper';
import { DEFAULT_MAKE_OPTIONS, ALL_TYPES } from './constants';
import { toHash } from './utils/toHash';
import { concat } from './utils/concat';
import { identity } from './utils/identity';

export {
    IMakeOptions,
    IConsole,
    IMessage,
    IGetMessageOptions,
} from './interfaces';

export const makeConsole = (options?: Partial<IMakeOptions>): IConsole => {
    const makeOptions = { ...DEFAULT_MAKE_OPTIONS, ...(options ?? {}) };
    const keeper = new MessageKeeper(makeOptions.keepMessageCount);
    const logTypes = toHash(makeOptions.logMessageTypes);
    const keepTypes = toHash(makeOptions.keepMessageTypes);

    return ALL_TYPES.reduce(
        (methods: any, type: TMessageType) => {
            const addNamespace =
                makeOptions.namespace != null
                    ? concat(makeOptions.namespace)
                    : identity;
            const setToConsole = logTypes[type] ? console[type] : identity;
            const setToKeeper = keepTypes[type]
                ? (...args: Array<any>) => keeper.push({ type, args })
                : identity;

            methods[type] = (...args: Array<any>) => {
                const list = addNamespace(args);

                setToConsole(list);
                setToKeeper(list);
            };

            return methods;
        },
        {
            getMessages: (options?: IGetMessageOptions) =>
                keeper.getMessages(options),
        }
    ) as IConsole;
};

export function makeOptions(
    logLevel: 'verbose' | 'error' | 'production',
    namespace?: string
): Partial<IMakeOptions> {
    switch (logLevel) {
        case 'production':
            return {
                keepMessageTypes: ['error'],
                logMessageTypes: [],
                namespace,
            };
        case 'error':
            return {
                keepMessageTypes: ['warn', 'error'],
                logMessageTypes: ['error'],
                namespace,
            };
        case 'verbose':
            return {
                keepMessageTypes: [],
                logMessageTypes: ALL_TYPES.slice(),
                namespace,
            };
        default:
            return { ...DEFAULT_MAKE_OPTIONS };
    }
}

export default makeConsole;
