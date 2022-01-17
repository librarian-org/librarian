import { Table } from 'typeorm';

export class TablePatch extends Table {

  /**
   * Hacky patch
   * @param {string} delim
   * @return {string[]}
   */
  split(delim: string): string[] {
    return [this.name]
  }
}
