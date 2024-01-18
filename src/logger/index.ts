import { blue, dim, gray, green, red, yellow } from 'kolorist';

/**
 * logger
 */
export class Logger {
  private tag?: string;
  private withTime = true;

  constructor(tag?: string, withTime?: boolean) {
    this.tag = tag ? `[${tag}]` : undefined;
    this.withTime = withTime ?? true;
  }

  private getTime() {
    if (!this.withTime) {
      return '';
    }

    const dtf = new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });

    return `${dim(dtf.format(new Date()))} `;
  }

  private print(log, color, msg: any, ...rest: any[]) {
    log(`${this.getTime()}${color(this.tag)}`, msg, ...rest);
  }

  debug(msg: any, ...rest: any[]) {
    this.print(console.log, gray, msg, ...rest);
  }

  log(msg: any, ...rest: any[]) {
    this.debug(msg, ...rest);
  }

  info(msg: any, ...rest: any[]) {
    this.print(console.info, blue, msg, ...rest);
  }

  warn(msg: string, ...rest: any[]) {
    this.print(console.warn, yellow, msg, ...rest);
  }

  error(msg: any, ...rest: any[]) {
    this.print(console.error, red, msg, ...rest);
  }

  success(msg: any, ...rest: any[]) {
    this.print(console.info, green, msg, ...rest);
  }
}

export const createLogger = (tag?: string) => {
  return new Logger(tag, true);
};
