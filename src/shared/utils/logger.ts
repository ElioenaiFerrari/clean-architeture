import chalk from 'chalk';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

type LogTypes = 'warning' | 'error' | 'success' | 'info';

export class Logger {
  static success(message: string) {
    console.log(chalk.bgGreen.black(message));
  }

  static error(message: string) {
    console.log(chalk.bgRed.black(message));
  }

  static warning(message: string) {
    console.log(chalk.bgYellow.black(message));
  }

  static info(message: string) {
    console.log(chalk.bgCyan.black(message));
  }
}
