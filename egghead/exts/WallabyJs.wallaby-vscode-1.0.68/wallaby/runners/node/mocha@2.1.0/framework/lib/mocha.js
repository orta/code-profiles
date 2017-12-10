/*
 * Wallaby.js - v1.0.529
 * http://wallabyjs.com
 * Copyright (c) 2014-2017 Wallaby.js - All Rights Reserved.
 *
 * This source code file is a part of Wallaby.js and is a proprietary (closed source) software.

 * IMPORTANT:
 * Wallaby.js is a tool made by software developers for software developers with passion and love for what we do.
 * Pirating the tool is not only illegal and just morally wrong,
 * it is also unfair to other fellow programmers who are using it legally,
 * and very harmful for the tool and its future.
 */
function image(e){return __dirname+"/../images/"+e+".png"}function Mocha(e){e=e||{},this.files=[],this.options=e,this.grep(e.grep),this.suite=new exports.Suite("",new exports.Context),this.ui(e.ui),this.bail(e.bail),this.reporter(e.reporter,e.reporterOptions),null!=e.timeout&&this.timeout(e.timeout),this.useColors(e.useColors),null!==e.enableTimeouts&&this.enableTimeouts(e.enableTimeouts),e.slow&&this.slow(e.slow),this.suite.on("pre-require",function(e){exports.afterEach=e.afterEach||e.teardown,exports.after=e.after||e.suiteTeardown,exports.beforeEach=e.beforeEach||e.setup,exports.before=e.before||e.suiteSetup,exports.describe=e.describe||e.suite,exports.it=e.it||e.test,exports.setup=e.setup||e.beforeEach,exports.suiteSetup=e.suiteSetup||e.before,exports.suiteTeardown=e.suiteTeardown||e.after,exports.suite=e.suite||e.describe,exports.teardown=e.teardown||e.afterEach,exports.test=e.test||e.it})}var path=require("path"),escapeRe=require("escape-string-regexp"),utils=require("./utils");if(exports=module.exports=Mocha,"undefined"!=typeof process&&"function"==typeof process.cwd){var join=path.join,cwd=process.cwd();module.paths.push(cwd,join(cwd,"node_modules"))}exports.utils=utils,exports.interfaces=require("./interfaces"),exports.reporters=require("./reporters"),exports.Runnable=require("./runnable"),exports.Context=require("./context"),exports.Runner=require("./runner"),exports.Suite=require("./suite"),exports.Hook=require("./hook"),exports.Test=require("./test"),Mocha.prototype.bail=function(e){return 0==arguments.length&&(e=!0),this.suite.bail(e),this},Mocha.prototype.addFile=function(e){return this.files.push(e),this},Mocha.prototype.reporter=function(e,t){if("function"==typeof e)this._reporter=e;else{e=e||"spec";var n;try{n=require("./reporters/"+e)}catch(i){}if(!n)try{n=require(e)}catch(i){}if(n||"teamcity"!==e||console.warn("The Teamcity reporter was moved to a package named mocha-teamcity-reporter (https://npmjs.org/package/mocha-teamcity-reporter)."),!n)throw new Error('invalid reporter "'+e+'"');this._reporter=n}return this.options.reporterOptions=t,this},Mocha.prototype.ui=function(e){if(e=e||"bdd",this._ui=exports.interfaces[e],!this._ui)try{this._ui=require(e)}catch(t){}if(!this._ui)throw new Error('invalid interface "'+e+'"');return this._ui=this._ui(this.suite),this},Mocha.prototype.loadFiles=function(e){var t=this,n=this.suite,i=this.files.length;this.files.forEach(function(r){r=path.resolve(r),n.emit("pre-require",global,r,t),n.emit("require",require(r),r,t),n.emit("post-require",global,r,t),--i||e&&e()})},Mocha.prototype._growl=function(e,t){var n=require("growl");e.on("end",function(){var i=t.stats;if(i.failures){var r=i.failures+" of "+e.total+" tests failed";n(r,{name:"mocha",title:"Failed",image:image("error")})}else n(i.passes+" tests passed in "+i.duration+"ms",{name:"mocha",title:"Passed",image:image("ok")})})},Mocha.prototype.grep=function(e){return this.options.grep="string"==typeof e?new RegExp(escapeRe(e)):e,this},Mocha.prototype.invert=function(){return this.options.invert=!0,this},Mocha.prototype.ignoreLeaks=function(e){return this.options.ignoreLeaks=!!e,this},Mocha.prototype.checkLeaks=function(){return this.options.ignoreLeaks=!1,this},Mocha.prototype.growl=function(){return this.options.growl=!0,this},Mocha.prototype.globals=function(e){return this.options.globals=(this.options.globals||[]).concat(e),this},Mocha.prototype.useColors=function(e){return void 0!==e&&(this.options.useColors=e),this},Mocha.prototype.useInlineDiffs=function(e){return this.options.useInlineDiffs=arguments.length&&void 0!=e?e:!1,this},Mocha.prototype.timeout=function(e){return this.suite.timeout(e),this},Mocha.prototype.slow=function(e){return this.suite.slow(e),this},Mocha.prototype.enableTimeouts=function(e){return this.suite.enableTimeouts(arguments.length&&void 0!==e?e:!0),this},Mocha.prototype.asyncOnly=function(){return this.options.asyncOnly=!0,this},Mocha.prototype.noHighlighting=function(){return this.options.noHighlighting=!0,this},Mocha.prototype.run=function(e){function t(t){s.done?s.done(t,e):e(t)}this.files.length&&this.loadFiles();var n=this.suite,i=this.options;i.files=this.files;var r=new exports.Runner(n),s=new this._reporter(r,i);return r.ignoreLeaks=!1!==i.ignoreLeaks,r.asyncOnly=i.asyncOnly,i.grep&&r.grep(i.grep,i.invert),i.globals&&r.globals(i.globals),i.growl&&this._growl(r,s),void 0!==i.useColors&&(exports.reporters.Base.useColors=i.useColors),exports.reporters.Base.inlineDiffs=i.useInlineDiffs,r.run(t)};