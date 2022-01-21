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
exports.TablePatch = void 0;
var typeorm_1 = require("typeorm");
var TablePatch = /** @class */ (function (_super) {
    __extends(TablePatch, _super);
    function TablePatch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Hacky patch
     * @param {string} delim
     * @return {string[]}
     */
    TablePatch.prototype.split = function (delim) {
        return [this.name];
    };
    return TablePatch;
}(typeorm_1.Table));
exports.TablePatch = TablePatch;
