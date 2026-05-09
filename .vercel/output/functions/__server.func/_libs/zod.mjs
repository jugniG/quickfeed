import { Dt as _coercedBoolean, Ot as _coercedString, gt as ZodString, ht as ZodBoolean } from "./@better-auth/core+[...].mjs";
//#region node_modules/zod/v4/classic/coerce.js
function string(params) {
	return _coercedString(ZodString, params);
}
function boolean(params) {
	return _coercedBoolean(ZodBoolean, params);
}
//#endregion
export { string as n, boolean as t };
