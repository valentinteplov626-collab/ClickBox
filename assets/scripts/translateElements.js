import {
    translateElements
} from "./shared-DOBNVOSI.js";
import {
    loadFallbackTranslation
} from "./shared-VJWZFFFW.js";
import {
    readAppConfig
} from "./shared-TMCNPBCK.js";
import "./shared-LB7BSKAZ.js";
var _a;
var seconds = ((_a = readAppConfig().secondsLeftBeforeFinal) == null ? void 0 : _a.toString()) || "10";
translateElements(loadFallbackTranslation, {
    you_have_10_seconds_tap_to_earn: {
        macros: "{seconds}",
        macrosValue: seconds
    },
    you_have_10_seconds: {
        macros: "{seconds}",
        macrosValue: seconds
    }
});