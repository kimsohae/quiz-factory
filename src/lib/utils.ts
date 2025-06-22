import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomString(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
  const timestamp = Date.now().toString().substring(8,13);
  let randomString = '';
  for (let i = 0; i < length; i++) {
    randomString += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const result = randomString + timestamp;
  return result;
}

export class LocalStorageUtility {
  static setItem<T>(key:string, value:T): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  static getItem<T>(key:string):T|null {
    const jsonValue = window.localStorage.getItem(key);
    return jsonValue? JSON.parse(jsonValue): null
  }
}