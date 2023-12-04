export declare class HakuConsole {
    counter: number;
    timer: Map<string, number>;
    constructor();
    private toStringData;
    log(...data: any): string;
    error(...errors: any): string;
    assert(condition: boolean, ...data: any): string;
    count(label: string): string;
    group(): string;
    groupCollapsed(): string;
    groupEnd(): string;
    info(...data: any): string;
    time(label?: string): string | undefined;
    timeEnd(label?: string): string;
    trace(...data: any): string;
    warn(...data: any): any;
    clear(): void;
}
export declare const iframeScript = "\nconst bsConsole = {...console};\nconst hakuConsole = new window.parent.HakuConsole();\nfor (const key in console) {\n\tif (key in hakuConsole) {\n\t\tconsole[key] = (...data) => {\n            bsConsole[key](...data);\n\t\t\twindow.parent.haku(window, key, hakuConsole[key](...data));\n\t\t}\n\t}\n}";
