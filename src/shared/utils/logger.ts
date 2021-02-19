import chalk from 'chalk';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

type LogTypes = 'warning' | 'error' | 'success' | 'info';

export class Logger {
  static success(data: any) {
    console.log(chalk.bgGreen.black(data));
  }

  static error(data: any) {
    console.log(chalk.bgRed.black(data));
  }

  static warning(data: any) {
    console.log(chalk.bgYellow.black(data));
  }

  static info(data: any) {
    console.log(chalk.bgCyan.black(data));
  }
}
