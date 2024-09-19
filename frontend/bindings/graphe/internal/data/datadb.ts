// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unused imports
import {Call as $Call, Create as $Create} from "@wailsio/runtime";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unused imports
import * as scripture$0 from "../scripture/models.js";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unused imports
import * as $models from "./models.js";

export function GetScriptureSection(r: scripture$0.ScriptureRange): Promise<$models.ScriptureSection[]> & { cancel(): void } {
    let $resultPromise = $Call.ByID(1032879309, r) as any;
    let $typingPromise = $resultPromise.then(($result) => {
        return $$createType1($result);
    }) as any;
    $typingPromise.cancel = $resultPromise.cancel.bind($resultPromise);
    return $typingPromise;
}

export function GetScriptureWord(version: scripture$0.ScriptureVersion, ref: scripture$0.ScriptureRef, word_num: number): Promise<$models.ScriptureWordData> & { cancel(): void } {
    let $resultPromise = $Call.ByID(1049376774, version, ref, word_num) as any;
    let $typingPromise = $resultPromise.then(($result) => {
        return $$createType2($result);
    }) as any;
    $typingPromise.cancel = $resultPromise.cancel.bind($resultPromise);
    return $typingPromise;
}

export function OnShutdown(): Promise<void> & { cancel(): void } {
    let $resultPromise = $Call.ByID(3836713270) as any;
    return $resultPromise;
}

// Private type creation functions
const $$createType0 = $models.ScriptureSection.createFrom;
const $$createType1 = $Create.Array($$createType0);
const $$createType2 = $models.ScriptureWordData.createFrom;