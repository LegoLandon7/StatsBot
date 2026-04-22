import chalk from 'chalk'

function time() {
    return new Date().toLocaleTimeString();
}

export function log(...args: any[]) { console.log(
    chalk.gray(`[${time()}]`),
    chalk.blue(`[LOG]`),
    chalk.blue(...args)
);}

export function runLog(...args: any[]) { console.log(
    chalk.gray(`[${time()}]`),
    chalk.green(`[RUN]`),
    chalk.green(...args)
);}

export function errorLog(error: unknown, ...args: any[]) { console.error(
    chalk.gray(`[${time()}]`),
    chalk.red(`[ERROR]`),
    chalk.red(...args),
    chalk.gray('-'),
    chalk.red(error)
);}

export function dataLog(...args: any[]) { console.log(
    chalk.gray(`[${time()}]`),
    chalk.cyan(`[DATA]`),
    chalk.cyan(...args),
);}

export function tableLog(label: string, data: any[]) { console.log(
    chalk.gray(`[${time()}]`),
    chalk.magenta(`[TABLE]`),
    chalk.magenta(label)
);
    console.table(data);
}