import { IMessage, IGetMessageOptions } from './interfaces';
import { ALL_TYPES } from './constants';
import { toHash } from './utils/toHash';

export class MessageKeeper {
    public get length(): number {
        return this._messages.length;
    }
    private _messages: Array<IMessage> = [];
    private _maxLength: number;

    constructor(maxLength: number) {
        this._maxLength = maxLength;
    }

    public push(message: IMessage): void {
        this._messages.push(message);
        if (this._messages.length > this._maxLength) {
            this._messages.splice(
                this._maxLength,
                this._messages.length - this._maxLength
            );
        }
    }

    public getMessages(options?: IGetMessageOptions): Array<IMessage> {
        const types = toHash(options?.messageTypes ?? ALL_TYPES);
        return this._messages.filter((message) => {
            return types[message.type];
        });
    }
}
