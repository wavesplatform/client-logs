
export interface IGetMessageOptions {
    messageTypes: Array<TMessageType>;
}

export type TMessageType = 'info' | 'log' | 'warn' | 'error';

export interface IMessage {
    type: TMessageType;
    args: Array<any>;
}

export interface IMakeOptions {
    keepMessageCount: number;
    keepMessageTypes: Array<TMessageType>;
    logMessageTypes: Array<TMessageType>;
    namespace: string | undefined;
}

export interface IConsole {
    info(...args: Array<any>): undefined;
    log(...args: Array<any>): undefined;
    warn(...args: Array<any>): undefined;
    error(...args: Array<any>): undefined;

    getMessages(options?: IGetMessageOptions): Array<IMessage>;
}
