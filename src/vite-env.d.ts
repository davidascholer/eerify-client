/// <reference types="vite/client" />
declare const APP_VERSION: string;

interface ImportMetaEnv {
	readonly VITE_APP_VERSION?: string;
	readonly VITE_TMDB_API_KEY?: string;
	readonly VITE_GAMES_API_KEY?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
