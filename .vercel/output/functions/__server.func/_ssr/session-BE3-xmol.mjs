import { a as auth, t as getRequest } from "./server-BOMALCnJ.mjs";
import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/session-BE3-xmol.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getServerSession_createServerFn_handler = createServerRpc({
	id: "2538e6bc0fefe698c881766f840f156dcb05bc10580d83856e4d32238e628dd5",
	name: "getServerSession",
	filename: "src/lib/session.ts"
}, (opts) => getServerSession.__executeServer(opts));
var getServerSession = createServerFn().handler(getServerSession_createServerFn_handler, async () => {
	const request = getRequest();
	return await auth.api.getSession({ headers: request.headers });
});
//#endregion
export { getServerSession_createServerFn_handler };
