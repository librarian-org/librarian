"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.TableForeignKeyPatch = void 0;
var typeorm_1 = require("typeorm");
var TableForeignKeyPatch = /** @class */ (function (_super) {
    __extends(TableForeignKeyPatch, _super);
    function TableForeignKeyPatch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Hacky patch
     * @param {string} delim
     * @return {string[]}
     */
    TableForeignKeyPatch.prototype.split = function (delim) {
        return [this.name];
    };
    return TableForeignKeyPatch;
}(typeorm_1.TableForeignKey));
exports.TableForeignKeyPatch = TableForeignKeyPatch;
