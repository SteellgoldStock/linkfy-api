import { red, blue, yellow, green } from "colors";

export function success(message: string): void {
  console.log(green(message));
}

export function error(message: string): void {
  console.error(red(message));
}

export function info(message: string): void {
  console.log(blue(message));
}

export function warn(message: string): void {
  console.warn(yellow(message));
}