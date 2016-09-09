import * as express from 'express';

export interface Options {
	prettyPrintHeader?: string;
	replacer?: (key: string, value: any) => any | any[];
	spaces?: string | number;
}

declare function get(options?:Options): express.RequestHandler;
export { get };
