import {
    getCurrentLanguage
} from "./shared-LB7BSKAZ.js";
var translationsCache = {};
var isFallbackCache = {};
var localePathCache;
var localeUrl = (lang, localePath) => localePath ? `${localePath}/${lang}.json` : `./locales/${lang}.json`;
var LocaleNotFoundError = class extends Error {};
var fetchLocale = async (lang, localePath) => {
    const url = localeUrl(lang, localePath);
    const response = await fetch(url);
    if (response.status === 404) {
        throw new LocaleNotFoundError(`Locale file not found: ${url}`);
    }
    if (!response.ok) {
        throw new Error(`Locale file request failed with status ${response.status}: ${url}`);
    }
    return await response.json();
};
var reportLocaleError = (error, lang, localePath) => {
    if (error instanceof Error && window.syncMetric) {
        window.syncMetric({
            event: "error",
            errorMessage: error.message,
            errorType: "CUSTOM",
            errorSubType: "GetTranslations"
        });
        console.error(
            `Error while loading translations: ${error.message}. Check the content of ${localeUrl(lang, localePath)} file`
        );
    }
};
var getTranslations = async (loadFallbackTranslation2, localePath) => {
    const lang = getCurrentLanguage();
    if (!translationsCache[lang] || localePathCache !== localePath) {
        localePathCache = localePath;
        translationsCache[lang] = (async () => {
            try {
                const translations = await fetchLocale(lang, localePath);
                isFallbackCache[lang] = false;
                return translations;
            } catch (error) {
                let fallbackError = error;
                if (lang !== "en") {
                    if (!(error instanceof LocaleNotFoundError)) {
                        reportLocaleError(error, lang, localePath);
                    }
                    try {
                        const translations = await fetchLocale("en", localePath);
                        isFallbackCache[lang] = true;
                        return translations;
                    } catch (enError) {
                        fallbackError = enError;
                    }
                }
                reportLocaleError(fallbackError, "en", localePath);
                isFallbackCache[lang] = true;
                return await loadFallbackTranslation2();
            }
        })();
    }
    return translationsCache[lang];
};
var isFallbackTranslation = (localePath) => {
    var _a;
    const lang = getCurrentLanguage();
    if (localePathCache !== localePath) {
        return false;
    }
    return (_a = isFallbackCache[lang]) != null ? _a : false;
};
var loadFallbackTranslation = async () => {
    return await import("./shared-VHYXM7GT.js").then((m) => m.default);
};

export {
    getTranslations,
    isFallbackTranslation,
    loadFallbackTranslation
};