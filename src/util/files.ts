import * as fs from 'fs';
import { promisify } from 'util';

export const readFile = promisify(fs.readFile);

export const writeFile = promisify(fs.writeFile);

export const readJson = async (path: string, options?: any): Promise<any> => {
    const rawData = await readFile(path, options);
    const parsedData = JSON.parse(rawData.toString());

    return parsedData;
};

export const writeJson = async (path: string, data: Object, options?: any): Promise<any> => {
    const serializedData = JSON.stringify(data, null, 4);
    await writeFile(path, serializedData, options);
};
