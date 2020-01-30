export interface IGetMessageOptions {
    messageTypes: Array<TMessageType>;
}

export type TMessageType = 'info' | 'log' | 'warn' | 'error';

export interface IMessage {
    type: TMessageType;
    args: Array<any>;
}

export interface IMakeOptions {
    /**
     * Count of message for keep in console.
     * @default 100
     */
    keepMessageCount: number;
    /**
     * Array with types of keep console methods
     * @default ['error']
     */
    keepMessageTypes: Array<TMessageType>;
    /**
     * Array with types for write to console methods
     * @default ['error']
     */
    logMessageTypes: Array<TMessageType>;
    /**
     * This param will be added before all logged params
     * @default undefined
     */
    namespace: string | undefined;
}

export interface IConsole {
    info(...args: Array<any>): undefined;
    log(...args: Array<any>): undefined;
    warn(...args: Array<any>): undefined;
    error(...args: Array<any>): undefined;

    getMessages(options?: IGetMessageOptions): Array<IMessage>;
}
