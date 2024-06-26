// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {app} from '../models';
import {scripture} from '../models';
import {database} from '../models';
import {settings} from '../models';
import {menu} from '../models';

export function GetEnvironmentInfo():Promise<app.EnvironmentInfo>;

export function GetScriptureSection(arg1:scripture.ScriptureRange):Promise<Array<database.ScriptureSection>>;

export function GetScriptureWord(arg1:scripture.ScriptureVersion,arg2:scripture.ScriptureRef,arg3:number):Promise<database.ScriptureWordData>;

export function GetSettings():Promise<settings.SettingsValues>;

export function Menu():Promise<menu.Menu>;

export function Throw(arg1:string):Promise<void>;

export function UpdateSetting(arg1:Array<string>,arg2:any):Promise<boolean>;
