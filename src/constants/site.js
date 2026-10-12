// Values shared between the browser bundle and the Node build scripts.
//
// scripts/fetch-github.mjs imports this file directly under plain Node, so it
// must stay free of asset imports, JSX and anything only Vite can resolve.
// Everything here is re-exported from ./index.js, so components should keep
// importing from "../constants" rather than reaching in here.

export const GITHUB_USERNAME = "dilsher07singh";
export const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;
