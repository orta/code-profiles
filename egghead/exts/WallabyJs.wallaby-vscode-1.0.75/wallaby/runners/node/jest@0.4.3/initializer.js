/*
 * Wallaby.js - v1.0.542
 * http://wallabyjs.com
 * Copyright (c) 2014-2018 Wallaby.js - All Rights Reserved.
 *
 * This source code file is a part of Wallaby.js and is a proprietary (closed source) software.

 * IMPORTANT:
 * Wallaby.js is a tool made by software developers for software developers with passion and love for what we do.
 * Pirating the tool is not only illegal and just morally wrong,
 * it is also unfair to other fellow programmers who are using it legally,
 * and very harmful for the tool and its future.
 */
var path=require("path"),fs=require("graceful-fs"),Q=require("q"),TestRunner,utils,transform,tracer=global.$_$tracer,testRunner,testFiles,testFilesByPath,jestInstalled=!1,EVAL_RESULT_VARIABLE="Object.<anonymous>",jestCliPath="jest-cli",jestRunnerModulePath,transformPath=jestCliPath+"/src/lib/transform",installCommonGlobalsPath,frozenConfig=!1,compactScriptPreprocessor=!1,jasmineFrameworkVersion,localProjectRoot;global._mergeSetupScript="",global._setupTestFrameworkScriptFile="";try{localProjectRoot=path.dirname(global.wallaby._localNodeModules),!global.wallaby._localNodeModules||process.env.NODE_PATH&&~process.env.NODE_PATH.indexOf(global.wallaby._localNodeModules)||(process.env.NODE_PATH=(process.env.NODE_PATH?process.env.NODE_PATH+path.delimiter:"")+global.wallaby._localNodeModules);var oldLoader=require.extensions[".js"];require.extensions[".js"]=function(e,t){var n,i,r=t.replace(/\\/g,"/");return~r.indexOf("jest-runtime/build/transform")||~r.indexOf("jest-runtime/build/ScriptTransformer")||~r.indexOf("jest-runtime/build/script_transformer")?(n=require("fs").readFileSync(t,"utf8"),i=n.replace("const cache = new Map();","const cache = new Map();global._jestRuntimeCache = cache;").replace(".readFileSync(filename, 'utf8')",".readFileSync(filename, 'utf8')+(filename === global._setupTestFrameworkScriptFile ? global._mergeSetupScript : \"\")"),i===n&&console.warn("Possibly incompatible Jest version (jest-runtime/build/transform|ScriptTransformer)"),e._compile(i,t)):~r.indexOf("react-native/jest/assetFileTransformer")?(n=require("fs").readFileSync(t,"utf8"),i=n.replace("path.relative(__dirname, filename)",'path.relative(__dirname.replace("'+localProjectRoot+'", "'+process.cwd()+'"), filename)'),i===n&&console.warn("Possibly incompatible Jest version (react-native/jest/assetFileTransformer)"),e._compile(i,t)):oldLoader(e,t)};var findModule=function(e,t,n){try{var i=require(e+t);return n&&n(e,t,i["default"]?i["default"]:i),!0}catch(r){return!1}},foundTestRunner=function(e,t,n){jestCliPath=e,TestRunner=n};if(findModule(jestCliPath,"/build/TestRunner",foundTestRunner)||findModule(jestCliPath,"/build/test_scheduler",foundTestRunner)||findModule(jestCliPath,"/src/TestRunner",foundTestRunner)||findModule("react-scripts/node_modules/jest/node_modules/jest-cli","/build/TestRunner",foundTestRunner)||findModule("react-scripts/node_modules/jest/node_modules/jest-cli","/build/test_scheduler",foundTestRunner)||findModule("jest/node_modules/jest-cli","/build/TestRunner",foundTestRunner)||findModule("jest/node_modules/jest-cli","/build/test_scheduler",foundTestRunner),!TestRunner)throw new Error("Cannot find Jest test runner");var foundJestRunnerModule=function(e){jestRunnerModulePath=e};if(findModule(jestCliPath+"/node_modules/jest-runner","",foundJestRunnerModule)||findModule(path.join(jestCliPath,"../jest-runner"),"",foundJestRunnerModule)||findModule("jest-runner","",foundJestRunnerModule),jestRunnerModulePath){const jestRuntimeDeepPath=jestRunnerModulePath+"/node_modules/jest-runtime",jestRuntimeShallowPath=path.join(jestRunnerModulePath,"../jest-runtime");var foundJestResolveNodeModules=function(e,t){var n=e+t,i=require.cache[require.resolve(n)].exports;i=i["default"]||i;var r=function(e,t){var n=i.apply(this,arguments);if(!(e&&t&&t.paths&&t.paths.length))return n;var r,s,o={};for(r=0;r<t.paths.length;r++){var a=t.paths[r];o[a]=!0,~e.indexOf(a)&&(s=!0)}if(!s)return n;var l={},c=[];for(r=n.length-1;r>=0;r--){var u=n[r];o[u]?l[u]||(c.unshift(u),l[u]=!0):c.unshift(u)}return c};r["default"]=r,require.cache[require.resolve(n)].exports=r};if(!(findModule(jestRuntimeDeepPath+"/node_modules/jest-resolve","/build/node_modules_paths",foundJestResolveNodeModules)||findModule(path.join(jestRuntimeDeepPath,"../jest-resolve"),"/build/node_modules_paths",foundJestResolveNodeModules)||findModule(jestRuntimeShallowPath+"/node_modules/jest-resolve","/build/node_modules_paths",foundJestResolveNodeModules)||findModule(path.join(jestRuntimeShallowPath,"../jest-resolve"),"/build/node_modules_paths",foundJestResolveNodeModules)||findModule(jestRunnerModulePath+"/node_modules/jest-resolve","/build/node_modules_paths",foundJestResolveNodeModules)||findModule(path.join(jestRunnerModulePath,"../jest-resolve"),"/build/node_modules_paths",foundJestResolveNodeModules)||findModule("jest-resolve","/build/node_modules_paths",foundJestRunnerModule)))throw new Error("Cannot find node_modules_paths")}var jestConfigModule,foundNormalizedConfig=function(e,t,n){utils={normalizeConfig:n};var i=utils.normalizeConfig;utils.normalizeConfig=function(){var e=i.apply(this,arguments);return utils.cachedNormalizedConfig=e,e},jestConfigModule=e},patchJestConfig=function(e,t,n){foundNormalizedConfig(e,t,n),jestConfigModule=require(jestConfigModule),jestConfigModule=jestConfigModule["default"]||jestConfigModule;var i=jestConfigModule.normalize;jestConfigModule.normalize=function(){return utils.cachedNormalizedConfig?utils.cachedNormalizedConfig:i.apply(this,arguments)}};findModule(jestCliPath,"/src/lib/utils",function(e,t,n){utils=n})||findModule(jestCliPath,"/src/config/normalize",foundNormalizedConfig)||(findModule(jestCliPath+"/node_modules/jest-config","/build/normalize",patchJestConfig)||findModule(path.join(jestCliPath,"../jest-config"),"/build/normalize",patchJestConfig)||findModule("jest-config","/build/normalize",patchJestConfig),jestRunnerModulePath&&(findModule(jestRunnerModulePath+"/node_modules/jest-config","/build/normalize",patchJestConfig)||findModule(path.join(jestRunnerModulePath,"../jest-config"),"/build/normalize",patchJestConfig)));var foundBaseReporter=function(e,t,n){var i=n.prototype;i.log=i._write=function(e){console.log(e+"\n")}},foundDefaultReporter=function(e,t,n){var i=n.prototype;i._clearWaitingOn=function(){}};findModule(jestCliPath,"/build/reporters/BaseReporter",foundBaseReporter)&&findModule(jestCliPath,"/build/reporters/DefaultReporter",foundDefaultReporter)||findModule(jestCliPath,"/build/reporters/base_reporter",foundBaseReporter);var initCommonGlobalsInstall=function(e){installCommonGlobalsPath=e};if(!(findModule(jestCliPath+"/src/environments/installCommonGlobals","",initCommonGlobalsInstall)||findModule(jestCliPath+"/node_modules/jest-util/build/install_common_globals","",initCommonGlobalsInstall)||findModule(path.join(jestCliPath+"/../jest-util/build/install_common_globals"),"",initCommonGlobalsInstall)||findModule("jest-util/build/install_common_globals","",initCommonGlobalsInstall)||findModule(jestCliPath+"/node_modules/jest-util/build/installCommonGlobals","",initCommonGlobalsInstall)||findModule(path.join(jestCliPath+"/../jest-util/build/installCommonGlobals"),"",initCommonGlobalsInstall)||findModule("jest-util/build/installCommonGlobals","",initCommonGlobalsInstall)||findModule(jestCliPath+"/node_modules/jest-util/src/installCommonGlobals","",initCommonGlobalsInstall)||findModule("jest-util/src/installCommonGlobals","",initCommonGlobalsInstall)||findModule(jestCliPath+"/node_modules/jest-util/lib/installCommonGlobals","",initCommonGlobalsInstall)||findModule("jest-util/lib/installCommonGlobals","",initCommonGlobalsInstall)))throw new Error("Can not find install_common_globals path");compactScriptPreprocessor=frozenConfig=!TestRunner.prototype._loadConfigDependencies;try{transformPath=jestCliPath+"/src/lib/transform",transform=require(transformPath)}catch(e){}jestInstalled=!0}catch(e){tracer.start(function(){tracer.reportGlobalError("Failed to initialize wallaby jest.\n"+(e.stack||""))}),module.exports={init:function(){return{configure:function(){}}}}}var jasmineVersion=function(e){return!e||e.testRunner&&!~e.testRunner.indexOf("jasmine2")?1:2},sameSession=function(e){return frozenConfig?e.globals._wallabySession===global.$_$session:e._session===global.$_$session},setSession=function(e){frozenConfig?e.globals._wallabySession=global.$_$session:e._session=global.$_$session},JasmineReporter=function(e){var t=e.initialSpecId();this.reportRunnerStarting=function(){},this.reportRunnerResults=function(){global.$_$initialSpecId=t+1},this.reportSpecStarting=function(n){n.id=++t,e.specStart(n.id,n.description),n.results_.time=(new e._Date).getTime()},this.reportSpecResults=function(t){for(var n=e.specEnd(),i={id:t.id,timeRange:n,name:t.description,suite:[],success:0===t.results_.failedCount,skipped:t.results_.skipped,time:t.results_.skipped?0:(new e._Date).getTime()-t.results_.time,log:[]},r=t.suite;r;)i.suite.unshift(r.description),r=r.parentSuite;if(!i.success&&!i.skipped)for(var s=t.results_.items_,o=0;o<s.length;o++){var a=s[o];a.passed_||(a.showDiff=a.showDiff||"toEqual"===a.matcherName,i.log.push(e.setAssertionData(a,{message:a.message,stack:a.trace&&a.trace.stack?a.trace.stack:e._undefined})))}i.log.length||delete i.log,e.result(i)},this.specFilter=function(t){if(!e.hasSpecFilter())return!0;for(var n=[t.description],i=t.suite;i;)n.unshift(i.description),i=i.parentSuite;return e.specFilter(n)}},Jasmine2Reporter=function(e){var t=global.$_$session,n=e.initialSpecId(),i=[],r=function(){return t!==global.$_$session};this.jasmineDone=function(){r()||(global.$_$initialSpecId=n+1)},this.jasmineStarted=function(){r()||e.started({total:"unknown number of"})},this.suiteStarted=function(e){r()||i.push(e.description)},this.suiteDone=function(){r()||i.pop()},this.specStarted=function(t){r()||(t._id=++n,e.specStart(t._id,t.fullName),t._time=(new e._Date).getTime())},this.specDone=function(t){if(!r()){var n=e.specEnd(),s="disabled"===t.status||"pending"===t.status,o={id:t._id,timeRange:n,name:t.description,suite:i.slice(),success:"passed"===t.status,skipped:s,time:s?0:(new e._Date).getTime()-t._time,log:[]};if(!o.success&&!o.skipped)for(var a=t.failedExpectations,l=0;l<a.length;l++){var c=a[l];if(c.error){if(c.message&&0===c.message.indexOf("Error: expect(")){var u=c.message.split("\n");u.shift(),u[0]&&0!==u[0].length||u.shift(),c.message=u.join("\n")}c.error.matcherResult?(c.matcherName=c.error.matcherResult.name,c.actual=c.error.matcherResult.actual,c.expected=c.error.matcherResult.expected):(c.showDiff=c.error.showDiff,c.actual=c.error.actual,c.expected=c.error.expected)}c.showDiff=c.showDiff||"toEqual"===c.matcherName||"toBe"===c.matcherName||"toMatchSnapshot"===c.matcherName,o.log.push(e.setAssertionData(c,{message:c.message,stack:c.stack}))}o.log.length||delete o.log,e.result(o)}}};if(jestInstalled){var nodeFs=require("fs"),originalWriteFileSync=nodeFs.writeFileSync;originalWriteFileSync.alreadyReplaced||(nodeFs.writeFileSync=function(e,t,n){try{if(".snap"===path.extname(e)&&0===e.indexOf(global.wallaby.projectCacheDir)){var i=require("fs-extra"),r=path.join(global.wallaby.localProjectDir,path.relative(global.wallaby.projectCacheDir,e));r&&(i.ensureDirSync(path.dirname(r)),originalWriteFileSync(r,t,n))}}catch(s){console.error(s.stack)}return originalWriteFileSync(e,t,n)},nodeFs.writeFileSync.alreadyReplaced=!0);var jasmineInitializerPath={1:path.join(__dirname,"jasmineInitializer.js"),2:path.join(__dirname,"jasmine2Initializer.js")},jasmineInitializerCode={1:"\n"+fs.readFileSync(jasmineInitializerPath[1]),2:"\n"+fs.readFileSync(jasmineInitializerPath[2])};if(utils.runContentWithLocalBindings=function(e,t,n,i){var r=+new Date;if(global.$_$tracer&&global.$_$tracer.isInitialized()){var s=Object.keys(i);e.global&&e.runSourceText('this["'+EVAL_RESULT_VARIABLE+'"] = function ('+s.join(",")+") {"+t+"\n};",n);var o=e.global?e.global[EVAL_RESULT_VARIABLE]:e("(function("+s.join(",")+"){"+t+"\n})",n);e.global&&delete e.global[EVAL_RESULT_VARIABLE];var a=s.map(function(e){return i[e]});o.apply(null,a);var l=+new Date;tracer.debugLog("Loaded "+(global.wallaby?n.replace(global.wallaby.localProjectDir,"").replace(global.wallaby.projectCacheDir,""):n)+" in "+(l-r)+" milliseconds")}},utils.readAndPreprocessFileContent=function(e,t){if(!sameSession(t))return"";var n=fs.readFileSync(e,"utf8");if("#!"===n.substr(0,2)&&(n=n.replace(/^#!.*/,"")),t.scriptPreprocessor&&!t.preprocessorIgnorePatterns.some(function(t){return t?(t.test||(t=new RegExp(t)),t.test(e)):void 0}))try{n=compactScriptPreprocessor?require(t.scriptPreprocessor).process(n,e,t):require(t.scriptPreprocessor).process(n,e,{},[],t)}catch(i){throw i.message=t.scriptPreprocessor+": "+i.message,i}return global._mergeSetupScript&&t.setupTestFrameworkScriptFile===e&&(n+=global._mergeSetupScript),n},transform&&(require.cache[require.resolve(transformPath)].exports=utils.readAndPreprocessFileContent),installCommonGlobalsPath){var originalInstallCommonGlobals=require.cache[require.resolve(installCommonGlobalsPath)].exports;originalInstallCommonGlobals=originalInstallCommonGlobals["default"]||originalInstallCommonGlobals;var newInstallCommonGlobals=function(e,t){!e.regeneratorRuntime&&global.regeneratorRuntime&&(e.regeneratorRuntime=global.regeneratorRuntime),e.$_$wp=global.$_$wp,e.$_$wpe=global.$_$wpe,e.$_$w=global.$_$w,e.$_$wf=global.$_$wf,e.$_$wv=global.$_$wv,e.$_$tracer=global.$_$tracer,e.$_$tracer._jasmineAdapter=1===jasmineFrameworkVersion?new JasmineReporter(global.$_$tracer):new Jasmine2Reporter(global.$_$tracer),originalInstallCommonGlobals(e,t)};newInstallCommonGlobals["default"]=newInstallCommonGlobals,require.cache[require.resolve(installCommonGlobalsPath)].exports=newInstallCommonGlobals;var foundJestUtil=function(e,t,n){n.installCommonGlobals=newInstallCommonGlobals};findModule(jestCliPath+"/node_modules/jest-util","",foundJestUtil),findModule(path.join(installCommonGlobalsPath,"../.."),"",foundJestUtil),findModule("jest-util","",foundJestUtil),findModule("jest-environment-jsdom/node_modules/jest-util","",foundJestUtil),jestRunnerModulePath&&(findModule(jestRunnerModulePath+"/node_modules/jest-util","",foundJestUtil),findModule(path.join(jestRunnerModulePath,"/../jest-util"),"",foundJestUtil))}TestRunner.prototype._loadConfigDependencies=function(){var e=this._config;if(null===this._configDeps){this._configDeps={ModuleLoader:require(e.moduleLoader),testRunner:require(e.testRunner).bind(null)};var t=require(e.testEnvironment);this._configDeps.testEnvironment=function(e){var n=new t(e);return n.global.$_$wp=global.$_$wp,n.global.$_$wpe=global.$_$wpe,n.global.$_$w=global.$_$w,n.global.$_$wf=global.$_$wf,n.global.$_$tracer=global.$_$tracer,n.global.$_$tracer._jasmineAdapter=1===jasmineFrameworkVersion?new JasmineReporter(global.$_$tracer):new Jasmine2Reporter(global.$_$tracer),n}}return this._configDeps};var WallabyReporter=function(e){this._completeRun=e};WallabyReporter.prototype={onRunStart:function(){},onTestStart:function(){},getLastError:function(){return this._error},_setError:function(e){this._error=e},onTestResult:function(e,t){e.context&&(e=e.context.config),t.testExecError&&sameSession(e)&&(tracer.reportGlobalError(t.testExecError),this._completeRun())},onRunComplete:function(e,t){this._completeRun(t&&t.snapshot&&t.snapshot.unchecked&&{warning:"Found "+t.snapshot.unchecked+" obsolete snapshot(s)"})},on:function(){},setState:function(){},isInterrupted:function(){return!1},isWatchMode:function(){return!1}},tracer.start(function(){if(!testRunner){var e;try{e=require(path.join(localProjectRoot,"package.json")).jest}catch(t){}if(!e)try{e=require(path.join(localProjectRoot,"jest.config.js"))}catch(t){}configure(e)}testFilesByPath=void 0;var n=global.$_$session;testRunner.then(function(e){if(n===global.$_$session){var t=!1,i=e._config||e._globalConfig;i.updateSnapshot=tracer._manualTestRun?"all":e._globalConfig?"new":void 0;var r=function(e){!t&&sameSession(i)&&(t=!0,tracer.complete(e))},s=new WallabyReporter(r);setSession(i),e.removeReporter&&e.removeReporter(WallabyReporter),e.addReporter&&e.addReporter(s);var o=e.scheduleTests,a=o?e.scheduleTests.bind(e):e.runTests.bind(e);a(e._globalConfig?testFiles.map(function(t){return{context:e._wallabyContext,path:t}}):testFiles,s).then(function(){r()},function(e){e&&console.error(e.stack),r()})}})["catch"](function(e){console.error("Error while trying to initialize jest: "+(e&&e.message||""))})});var configure=function(e){if(e=e||{},delete e.scriptPreprocessor,delete e.testFileExtensions,delete e.testDirectoryName,e.notify=!1,e.bail=!1,e.collectCoverage=!1,e.rootDir=e.rootDir||localProjectRoot||process.cwd(),e.name=e.rootDir.replace(/[\/\\]|\s/g,"-"),e.cache=e.cache!==!1,e=utils.normalizeConfig(e,{}),e.config&&e.config.rootDir&&(e=e.config),e.options&&e.options.rootDir&&(e=e.options),e.moduleFileExtensions&&e.moduleFileExtensions.length){var t=[],n=[];e.moduleFileExtensions.forEach(function(e,i){("js"===e||"jsx"===e)&&(t.unshift(i),n.unshift(e))}),t.forEach(function(t){e.moduleFileExtensions.splice(t,1)}),n.forEach(function(t){e.moduleFileExtensions.unshift(t)})}if(e.modulePaths&&e.modulePaths.length)for(var i=0;i<e.modulePaths.length;i++){var r=e.modulePaths[i];r&&~r.indexOf(e.rootDir)&&!~r.indexOf(localProjectRoot)&&(e.modulePaths[i]=r.replace(e.rootDir,process.cwd()))}jasmineFrameworkVersion=jasmineVersion(e),e.setupTestFrameworkScriptFile?(global._setupTestFrameworkScriptFile=e.setupTestFrameworkScriptFile,global._mergeSetupScript=jasmineInitializerCode[jasmineFrameworkVersion]):e.setupTestFrameworkScriptFile=jasmineInitializerPath[jasmineFrameworkVersion],e.maxWorkers=1,e.verbose=!1,e.cwd=process.cwd();var s,o,a,l;try{var c=function(e,t,n){l=n,o=l.buildHasteMap||l.createHasteContext||l.createContext};if(findModule(jestCliPath+"/node_modules/jest-runtime","",c)||findModule(path.join(jestCliPath+"/../jest-runtime"),"",c)||findModule("jest-runtime","",c),jestRunnerModulePath&&(findModule(jestRunnerModulePath+"/node_modules/jest-runtime","",c)||findModule(path.join(jestRunnerModulePath+"/../jest-runtime"),"",c)),s=o(e,{maxWorkers:1,watchman:!1}),a=!!s.then,l.prototype){var u=l.prototype.requireModule;u._wallabyReplaced||(u._wallabyReplaced=!0,l.prototype.requireModule=function(e,t,n){var i=u.apply(this,arguments);if(e&&~e.replace(/\\/g,"/").indexOf("jest-snapshot")&&"./utils"===t&&i.getSnapshotPath&&!i.getSnapshotPath._replaced){testFilesByPath||(testFilesByPath={},global.$_$testFiles.forEach(function(e){testFilesByPath[e.path]=e}));var r=i.getSnapshotPath;i.getSnapshotPath=function(){var e=arguments[0],t=(testFilesByPath[e]||{}).originalType;if(e&&t){var n=e.split(".");n.length>2&&(n[n.length-1]=t,e=n.join("."))}return arguments[0]=e,r.apply(this,arguments)},i.getSnapshotPath._replaced=!0}return i})}else console.error("Error while trying to integrate with jest-snapshot")}catch(d){console.error("Error while trying to initialize jest: "+d.message)}TestRunner.length>4&&console.warn("Possibly incompatible Jest version (TestRunner)");var h=function(e){var t=e._mocks||e._raw&&e._raw.mocks;if(!t)return void console.warn("Failed to process Jest mocks");for(var n in t){var i=t[n];if(i&&"string"==typeof i){i=i.split(".");var r=i[i.length-1];("ts"===r||"tsx"===r)&&(i[i.length-1]="js"),i=i.join(".").replace(localProjectRoot,global.wallaby.projectCacheDir),fs.existsSync(i)&&(t[n]=i)}}};testRunner=TestRunner.length>=3?a?s.then(function(t){return Q.when(new TestRunner(t,e,{runInBand:!0,maxWorkers:1,getTestSummary:function(){return""}}))}):Q.when(new TestRunner(s,e,{runInBand:!0,maxWorkers:1})):a?s.then(function(t){t.moduleMap&&h(t.moduleMap);var n=new TestRunner(e,{runInBand:!0,maxWorkers:1,pattern:{input:""}});return n._wallabyContext=t,Q.when(n)}):Q.when(new TestRunner(e,{runInBand:!0,maxWorkers:1}))};module.exports={init:function(e){var t=global._jestRuntimeCache;return t&&t.forEach(function(e,n){~n.indexOf(global.$_$baseDir)&&t["delete"](n)}),testFiles=e,{configure:function(e){testRunner||configure(e)}}}}}