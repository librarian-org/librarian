import { TableForeignKey } from 'typeorm';

export class TableForeignKeyPatch extends TableForeignKey {

  /**
   * Hacky patch
   * @param {string} delim
   * @return {string[]}
   */
  split(delim: string): string[] {
    return [this.name]
  }
}
