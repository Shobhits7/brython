// brython.js brython.info
// version [3, 10, 0, 'final', 0]
// implementation [3, 10, 6, 'final', 0]
// version compiled from commented, indented source files at
// github.com/brython-dev/brython
var __BRYTHON__=__BRYTHON__ ||{}
try{
eval("async function* f(){}")}catch(err){console.warn("Your browser is not fully supported. If you are using "+
"Microsoft Edge, please upgrade to the latest version")}
;(function($B){
$B.isWebWorker=('undefined' !==typeof WorkerGlobalScope)&&
("function"===typeof importScripts)&&
(navigator instanceof WorkerNavigator)
$B.isNode=(typeof process !=='undefined')&&(process.release.name==='node')
var _window
if($B.isNode){_window={location:{href:'',origin:'',pathname:''},navigator:{userLanguage:''}}}else{
_window=self}
var href=_window.location.href
$B.protocol=href.split(':')[0]
$B.BigInt=_window.BigInt
$B.indexedDB=_window.indexedDB
var $path
if($B.brython_path===undefined){
var this_url;
if($B.isWebWorker){this_url=_window.location.href;
if(this_url.startsWith("blob:")){this_url=this_url.substr(5)}}else{var scripts=document.getElementsByTagName('script')
this_url=scripts[scripts.length-1].src}
var elts=this_url.split('/')
elts.pop()
$path=$B.brython_path=elts.join('/')+'/'}else{if(! $B.brython_path.endsWith("/")){$B.brython_path+="/"}
$path=$B.brython_path}
var parts_re=new RegExp('(.*?)://(.*?)/(.*)'),mo=parts_re.exec($B.brython_path)
if(mo){$B.full_url={protocol:mo[1],host:mo[2],address:mo[3]}}
var path=_window.location.origin+_window.location.pathname,path_elts=path.split("/")
path_elts.pop()
var $script_dir=$B.script_dir=path_elts.join("/")
$B.__ARGV=[]
$B.webworkers={}
$B.file_cache={}
$B.url2name={}
$B.$py_src={}
$B.path=[$path+'Lib',$path+'libs',$script_dir,$path+'Lib/site-packages']
$B.async_enabled=false
if($B.async_enabled){$B.block={}}
$B.imported={}
$B.precompiled={}
$B.frames_stack=[]
$B.builtins=Object.create(null)
$B.builtins_scope={id:'__builtins__',module:'__builtins__',binding:{}}
$B.builtin_funcs={}
$B.builtin_classes=[]
$B.__getattr__=function(attr){return this[attr]}
$B.__setattr__=function(attr,value){
if(['debug','stdout','stderr'].indexOf(attr)>-1){$B[attr]=value}else{throw $B.builtins.AttributeError.$factory(
'__BRYTHON__ object has no attribute '+attr)}}
$B.language=_window.navigator.userLanguage ||_window.navigator.language
$B.locale="C" 
var date=new Date()
var formatter=new Intl.DateTimeFormat($B.language,{timeZoneName:'short'}),short=formatter.format(date)
formatter=new Intl.DateTimeFormat($B.language,{timeZoneName:'long'})
var long=formatter.format(date)
var ix=0,minlen=Math.min(short.length,long.length)
while(ix < minlen && short[ix]==long[ix]){ix++}
$B.tz_name=long.substr(ix).trim()
$B.PyCF_ONLY_AST=1024 
if($B.isWebWorker){$B.charset="utf-8"}else{
$B.charset=document.characterSet ||document.inputEncoding ||"utf-8"}
$B.max_int=Math.pow(2,53)-1
$B.min_int=-$B.max_int
$B.max_float=new Number(Number.MAX_VALUE)
$B.min_float=new Number(Number.MIN_VALUE)
$B.special_string_repr={8:"\\x08",9:"\\t",10:"\\n",11:"\\x0b",12:"\\x0c",13:"\\r",92:"\\\\",160:"\\xa0"}
$B.$py_next_hash=Math.pow(2,53)-1
$B.$py_UUID=0
$B.lambda_magic=Math.random().toString(36).substr(2,8)
$B.set_func_names=function(klass,module){if(klass.$infos){var name=klass.$infos.__name__
klass.$infos.__module__=module
klass.$infos.__qualname__=name}else{var name=klass.__name__
klass.$infos={__name__:name,__module__:module,__qualname__:name}}
klass.__module__=module
for(var attr in klass){if(typeof klass[attr]=='function'){klass[attr].$infos={__doc__:klass[attr].__doc__ ||"",__module__:module,__qualname__ :name+'.'+attr,__name__:attr}
if(klass[attr].$type=="classmethod"){klass[attr].__class__=$B.method}}}}
var has_storage=typeof(Storage)!=="undefined"
if(has_storage){$B.has_local_storage=false
try{if(localStorage){$B.local_storage=localStorage
$B.has_local_storage=true}}catch(err){}
$B.has_session_storage=false
try{if(sessionStorage){$B.session_storage=sessionStorage
$B.has_session_storage=true}}catch(err){}}else{$B.has_local_storage=false
$B.has_session_storage=false}
$B.globals=function(){
return $B.frames_stack[$B.frames_stack.length-1][3]}
$B.scripts={}
$B.$options={}
$B.builtins_repr_check=function(builtin,args){
var $=$B.args('__repr__',1,{self:null},['self'],args,{},null,null),self=$.self,_b_=$B.builtins
if(! _b_.isinstance(self,builtin)){throw _b_.TypeError.$factory("descriptor '__repr__' requires a "+
`'${builtin.$infos.__name__}' object but received a `+
`'${$B.class_name(self)}'`)}}
$B.update_VFS=function(scripts){$B.VFS=$B.VFS ||{}
var vfs_timestamp=scripts.$timestamp
if(vfs_timestamp !==undefined){delete scripts.$timestamp}
for(var script in scripts){if($B.VFS.hasOwnProperty(script)){console.warn("Virtual File System: duplicate entry "+script)}
$B.VFS[script]=scripts[script]
$B.VFS[script].timestamp=vfs_timestamp}}
$B.add_files=function(files){
$B.files=$B.files ||{}
for(var file in files){$B.files[file]=files[file]}}
$B.has_file=function(file){
return($B.files && $B.files.hasOwnProperty(file))}
$B.python_to_js=function(src,script_id){$B.parse_options()
$B.meta_path=$B.$meta_path.slice()
if(!$B.use_VFS){$B.meta_path.shift()}
if(script_id===undefined){script_id="__main__"}
var root=__BRYTHON__.py2js(src,script_id,script_id),js=root.to_js()
js="(function() {\n var $locals_"+script_id+" = {}\n"+js+"\n}())"
return js}
_window.py=function(src){
var root=$B.py2js(src[0],"script","script"),js=root.to_js()
$B.set_import_paths()
new Function("$locals_script",js)({})}})(__BRYTHON__)
;
__BRYTHON__.implementation=[3,10,6,'final',0]
__BRYTHON__.__MAGIC__="3.10.6"
__BRYTHON__.version_info=[3,10,0,'final',0]
__BRYTHON__.compiled_date="2022-06-08 11:49:31.983937"
__BRYTHON__.timestamp=1654681771983
__BRYTHON__.builtin_module_names=["_aio","_ajax","_ast","_base64","_binascii","_io_classes","_json","_jsre","_locale","_multiprocessing","_posixsubprocess","_profile","_sre","_sre1","_sre_utils","_string","_strptime","_svg","_symtable","_webcomponent","_webworker","_zlib_utils","array","bry_re","builtins","dis","encoding_cp932","hashlib","html_parser","long_int","marshal","math","modulefinder","posix","python_re","random","unicodedata"]
;
;(function($B){var _b_=$B.builtins
function ord(char){if(char.length==1){return char.charCodeAt(0)}
var code=0x10000
code+=(char.charCodeAt(0)& 0x03FF)<< 10
code+=(char.charCodeAt(1)& 0x03FF)
return code}
function $last(array){return array[array.length-1]}
var ops='.,:;+-*/%~^|&=<>[](){}@',op2=['**','//','>>','<<'],augm_op='+-*/%~^|&=<>@',closing={'}':'{',']':'[',')':'('}
function Token(type,string,start,end,line){start=start.slice(0,2)
var res={type,string,start,end,line}
res[0]=type
res[1]=string
res[2]=start
res[3]=end
res[4]=line
return res}
var errors={}
function TokenError(message,position){if(errors.TokenError===undefined){var $error_2={$name:"TokenError",$qualname:"TokenError",$is_class:true,__module__:"tokenize"}
var error=errors.TokenError=$B.$class_constructor("TokenError",$error_2,_b_.tuple.$factory([_b_.Exception]),["_b_.Exception"],[])
error.__doc__=_b_.None
error.$factory=function(message,position){return{
__class__:error,msg:message,lineno:position[0],colno:position[1]}}
error.__str__=function(self){var s=self.msg
if(self.lineno > 1){s+=` (${self.lineno}, ${self.colno})`}
return s}
$B.set_func_names(error,"tokenize")}
var exc=errors.TokenError.$factory(message,position)
console.log('error',exc.__class__,exc.args)
return exc}
function get_line_at(src,pos){
var end=src.substr(pos).search(/[\r\n]/),line=end==-1 ? src.substr(pos):src.substr(pos,end+1)
return line }
function get_comment(src,pos,line_num,line_start,token_name,line){var start=pos,ix
var t=[]
while(true){if(pos >=src.length ||(ix='\r\n'.indexOf(src[pos]))>-1){t.push(Token('COMMENT',src.substring(start-1,pos),[line_num,start-line_start],[line_num,pos-line_start+1],line))
if(ix !==undefined){var nb=1
if(src[pos]=='\r' && src[pos+1]=='\n'){nb++}else if(src[pos]===undefined){
nb=0}
t.push(Token(token_name,src.substr(pos,nb),[line_num,pos-line_start+1],[line_num,pos-line_start+nb+1],line))
if(src[pos]===undefined){t.push(Token('NEWLINE','\n',[line_num,pos-line_start+1],[line_num,pos-line_start+2],''))}
pos+=nb}
return{t,pos}}
pos++}}
function test_num(num_type,char){switch(num_type){case '':
return $B.unicode_tables.Nd[ord(char)]!==undefined
case 'x':
return '0123456789abcdef'.indexOf(char.toLowerCase())>-1
case 'b':
return '01'.indexOf(char)>-1
case 'o':
return '01234567'.indexOf(char)>-1
default:
throw Error('unknown num type '+num_type)}}
$B.tokenizer=function*(src){var unicode_tables=$B.unicode_tables,whitespace=' \t\n',operators='*+-/%&^~=<>',allowed_after_identifier=',.()[]:;',string_prefix=/^(r|u|R|U|f|F|fr|Fr|fR|FR|rf|rF|Rf|RF)$/,bytes_prefix=/^(b|B|br|Br|bR|BR|rb|rB|Rb|RB)$/
var state="line_start",char,cp,mo,pos=0,start,quote,triple_quote,escaped=false,string_start,string,prefix,name,operator,number,num_type,comment,indent,indents=[],braces=[],line_num=0,line_start=1,line
yield Token('ENCODING','utf-8',[0,0],[0,0],'')
while(pos < src.length){char=src[pos]
cp=src.charCodeAt(pos)
if(cp >=0xD800 && cp <=0xDBFF){
cp=ord(src.substr(pos,2))
char=src.substr(pos,2)
pos++}
pos++
switch(state){case "line_start":
line=get_line_at(src,pos-1)
line_start=pos
line_num++
if(mo=/^\f?(\r\n|\r|\n)/.exec(src.substr(pos-1))){
yield Token('NL',mo[0],[line_num,0],[line_num,mo[0].length],line)
pos+=mo[0].length-1
continue}else if(char=='#'){comment=get_comment(src,pos,line_num,line_start,'NL',line)
for(var item of comment.t){yield item}
pos=comment.pos
state='line_start'
continue}
indent=0
if(char==' '){indent=1}else if(char=='\t'){indent=8}
if(indent){while(pos < src.length){if(src[pos]==' '){indent++}else if(src[pos]=='\t'){indent+=8}else{break}
pos++}
if(pos==src.length){
line_num--
break}
if(src[pos]=='#'){
var comment=get_comment(src,pos+1,line_num,line_start,'NL',line)
for(var item of comment.t){yield item}
pos=comment.pos
continue}else if(mo=/^\f?(\r\n|\r|\n)/.exec(src.substr(pos))){
yield Token('NL','',[line_num,pos-line_start+1],[line_num,pos-line_start+1+mo[0].length],line)
pos+=mo[0].length
continue}
if(indents.length==0 ||indent > $last(indents)){indents.push(indent)
yield Token('INDENT','',[line_num,0],[line_num,indent],line)}else if(indent < $last(indents)){var ix=indents.indexOf(indent)
if(ix==-1){var error=Error('unindent does not match '+
'any outer indentation level')
error.type='IndentationError'
error.line_num=line_num
throw error }
for(var i=indents.length-1;i > ix;i--){indents.pop()
yield Token('DEDENT','',[line_num,indent],[line_num,indent],line)}}
state=null}else{
while(indents.length > 0){indents.pop()
yield Token('DEDENT','',[line_num,indent],[line_num,indent],line)}
state=null
pos--}
break
case null:
switch(char){case '"':
case "'":
quote=char
triple_quote=src[pos]==char && src[pos+1]==char
string_start=[line_num,pos-line_start,line_start]
if(triple_quote){pos+=2}
escaped=false
state='STRING'
string=""
prefix=""
break
case '#':
var token_name=braces.length > 0 ? 'NL' :'NEWLINE'
comment=get_comment(src,pos,line_num,line_start,token_name,line)
for(var item of comment.t){yield item}
pos=comment.pos
if(braces.length==0){state='line_start'}else{state=null
line_num++
line_start=pos+1
line=get_line_at(src,pos)}
break
case '0':
state='NUMBER'
number=char
num_type=''
if(src[pos]&&
'xbo'.indexOf(src[pos].toLowerCase())>-1){number+=src[pos]
num_type=src[pos].toLowerCase()
pos++}
break
case '.':
if(src[pos]&& unicode_tables.Nd[ord(src[pos])]){state='NUMBER'
num_type=''
number=char}else{var op=char
while(src[pos]==char){pos++
op+=char}
var dot_pos=pos-line_start-op.length+1
while(op.length >=3){
yield Token('OP','...',[line_num,dot_pos],[line_num,dot_pos+3],line)
op=op.substr(3)}
for(var i=0;i < op.length;i++){yield Token('OP','.',[line_num,dot_pos],[line_num,dot_pos+1],line)
dot_pos++}}
break
case '\\':
if(mo=/^\f?(\r\n|\r|\n)/.exec(src.substr(pos))){line_num++
pos+=mo[0].length
line_start=pos+1
line=get_line_at(src,pos)}else{yield Token('ERRORTOKEN',char,[line_num,pos-line_start],[line_num,pos-line_start+1],line)}
break
case '\n':
case '\r':
var token_name=braces.length > 0 ? 'NL':'NEWLINE'
mo=/^\f?(\r\n|\r|\n)/.exec(src.substr(pos-1))
yield Token(token_name,mo[0],[line_num,pos-line_start],[line_num,pos-line_start+mo[0].length],line)
pos+=mo[0].length-1
if(token_name=='NEWLINE'){state='line_start'}else{line_num++
line_start=pos+1
line=get_line_at(src,pos)}
break
default:
if(unicode_tables.XID_Start[ord(char)]){
state='NAME'
name=char}else if(unicode_tables.Nd[ord(char)]){state='NUMBER'
num_type=''
number=char}else if(ops.indexOf(char)>-1){var op=char
if(op2.indexOf(char+src[pos])>-1){op=char+src[pos]
pos++}
if(src[pos]=='=' &&(op.length==2 ||
augm_op.indexOf(op)>-1)){op+=src[pos]
pos++}else if((char=='-' && src[pos]=='>')||
(char==':' && src[pos]=='=')){op+=src[pos]
pos++}
if('[({'.indexOf(char)>-1){braces.push(char)}else if('])}'.indexOf(char)>-1){if(braces && $last(braces)==closing[char]){braces.pop()}else{braces.push(char)}}
yield Token('OP',op,[line_num,pos-line_start-op.length+1],[line_num,pos-line_start+1],line)}else if(char=='!' && src[pos]=='='){yield Token('OP','!=',[line_num,pos-line_start],[line_num,pos-line_start+2],line)
pos++}else if(char==' ' ||char=='\t'){}else{yield Token('ERRORTOKEN',char,[line_num,pos-line_start],[line_num,pos-line_start+1],line)}}
break
case 'NAME':
if(unicode_tables.XID_Continue[ord(char)]){name+=char}else if(char=='"' ||char=="'"){if(string_prefix.exec(name)||bytes_prefix.exec(name)){
state='STRING'
quote=char
triple_quote=src[pos]==quote && src[pos+1]==quote
prefix=name
escaped=false
string_start=[line_num,pos-line_start-name.length,line_start]
if(triple_quote){pos+=2}
string=''}else{yield Token('NAME',name,[line_num,pos-line_start-name.length],[line_num,pos-line_start],line)
state=null
pos--}}else{yield Token('NAME',name,[line_num,pos-line_start-name.length],[line_num,pos-line_start],line)
state=null
pos--}
break
case 'STRING':
switch(char){case quote:
if(! escaped){
var string_line=line
if(line_num > string_start[0]){string_line=src.substring(
string_start[2]-1,pos+2)}
if(! triple_quote){var full_string=prefix+quote+string+
quote
yield Token('STRING',full_string,string_start,[line_num,pos-line_start+1],string_line)
state=null}else if(char+src.substr(pos,2)==
quote.repeat(3)){var full_string=prefix+quote.repeat(3)+
string+quote.repeat(3)
triple_quote_line=line
yield Token('STRING',full_string,string_start,[line_num,pos-line_start+3],string_line)
pos+=2
state=null}else{string+=char}}else{string+=char}
escaped=false
break
case '\r':
case '\n':
if(! escaped && ! triple_quote){
var quote_pos=string_start[1]+line_start-1,pos=quote_pos
while(src[pos-1]==' '){pos--}
while(pos < quote_pos){yield Token('ERRORTOKEN',' ',[line_num,pos-line_start+1],[line_num,pos-line_start+2],line)
pos++}
pos++
yield Token('ERRORTOKEN',quote,[line_num,pos-line_start],[line_num,pos-line_start+1],line)
state=null
pos++
break}
string+=char
line_num++
line_start=pos+1
if(char=='\r' && src[pos]=='\n'){string+=src[pos]
line_start++
pos++}
line=get_line_at(src,pos)
escaped=false
break
case '\\':
string+=char
escaped=! escaped
break
default:
escaped=false
string+=char
break}
break
case 'NUMBER':
if(test_num(num_type,char)){number+=char}else if(char=='_' && ! number.endsWith('.')){if(number.endsWith('_')){throw SyntaxError('consecutive _ in number')}else if(src[pos]===undefined ||
! test_num(num_type,src[pos])){
yield Token('NUMBER',number,[line_num,pos-line_start-number.length],[line_num,pos-line_start],line)
state=null
pos--}else{number+=char}}else if(char=='.' && number.indexOf(char)==-1){number+=char}else if(char.toLowerCase()=='e' &&
number.toLowerCase().indexOf('e')==-1){if('+-'.indexOf(src[pos])>-1 ||
unicode_tables.Nd[ord(src[pos])]){number+=char}else{yield Token('NUMBER',number,[line_num,pos-line_start-number.length],[line_num,pos-line_start],line)
state=null
pos--}}else if((char=='+' ||char=='-')&&
number.toLowerCase().endsWith('e')){number+=char}else if(char.toLowerCase()=='j'){
number+=char
yield Token('NUMBER',number,[line_num,pos-line_start-number.length+1],[line_num,pos-line_start+1],line)
state=null}else{yield Token('NUMBER',number,[line_num,pos-line_start-number.length],[line_num,pos-line_start],line)
state=null
pos--}
break}}
if(braces.length > 0){throw SyntaxError('EOF in multi-line statement')}
switch(state){case 'line_start':
line_num++
break
case 'NAME':
yield Token('NAME',name,[line_num,pos-line_start-name.length+1],[line_num,pos-line_start+1],line)
break
case 'NUMBER':
yield Token('NUMBER',number,[line_num,pos-line_start-number.length+1],[line_num,pos-line_start+1],line)
break
case 'STRING':
var msg=`unterminated ${triple_quote ? 'triple-quoted ' : ''}`+
`string literal (detected at line ${line_num})`
throw SyntaxError(msg)}
if(! src.endsWith('\n')&& char !=' ' && state !=line_start){yield Token('NEWLINE','',[line_num,pos-line_start+1],[line_num,pos-line_start+2],'')
line_num++}
while(indents.length > 0){indents.pop()
yield Token('DEDENT','',[line_num,0],[line_num,0],'')}
yield Token('ENDMARKER','',[line_num,0],[line_num,0],'')}})(__BRYTHON__)
;
;(function($B){$B.ast_classes={Add:'',And:'',AnnAssign:'target,annotation,value?,simple',Assert:'test,msg?',Assign:'targets*,value,type_comment?',AsyncFor:'target,iter,body*,orelse*,type_comment?',AsyncFunctionDef:'name,args,body*,decorator_list*,returns?,type_comment?',AsyncWith:'items*,body*,type_comment?',Attribute:'value,attr,ctx',AugAssign:'target,op,value',Await:'value',BinOp:'left,op,right',BitAnd:'',BitOr:'',BitXor:'',BoolOp:'op,values*',Break:'',Call:'func,args*,keywords*',ClassDef:'name,bases*,keywords*,body*,decorator_list*',Compare:'left,ops*,comparators*',Constant:'value,kind?',Continue:'',Del:'',Delete:'targets*',Dict:'keys*,values*',DictComp:'key,value,generators*',Div:'',Eq:'',ExceptHandler:'type?,name?,body*',Expr:'value',Expression:'body',FloorDiv:'',For:'target,iter,body*,orelse*,type_comment?',FormattedValue:'value,conversion,format_spec?',FunctionDef:'name,args,body*,decorator_list*,returns?,type_comment?',FunctionType:'argtypes*,returns',GeneratorExp:'elt,generators*',Global:'names*',Gt:'',GtE:'',If:'test,body*,orelse*',IfExp:'test,body,orelse',Import:'names*',ImportFrom:'module?,names*,level?',In:'',Interactive:'body*',Invert:'',Is:'',IsNot:'',JoinedStr:'values*',LShift:'',Lambda:'args,body',List:'elts*,ctx',ListComp:'elt,generators*',Load:'',Lt:'',LtE:'',MatMult:'',Match:'subject,cases*',MatchAs:'pattern?,name?',MatchClass:'cls,patterns*,kwd_attrs*,kwd_patterns*',MatchMapping:'keys*,patterns*,rest?',MatchOr:'patterns*',MatchSequence:'patterns*',MatchSingleton:'value',MatchStar:'name?',MatchValue:'value',Mod:'',Module:'body*,type_ignores*',Mult:'',Name:'id,ctx',NamedExpr:'target,value',Nonlocal:'names*',Not:'',NotEq:'',NotIn:'',Or:'',Pass:'',Pow:'',RShift:'',Raise:'exc?,cause?',Return:'value?',Set:'elts*',SetComp:'elt,generators*',Slice:'lower?,upper?,step?',Starred:'value,ctx',Store:'',Sub:'',Subscript:'value,slice,ctx',Try:'body*,handlers*,orelse*,finalbody*',Tuple:'elts*,ctx',TypeIgnore:'lineno,tag',UAdd:'',USub:'',UnaryOp:'op,operand',While:'test,body*,orelse*',With:'items*,body*,type_comment?',Yield:'value?',YieldFrom:'value',alias:'name,asname?',arg:'arg,annotation?,type_comment?',arguments:'posonlyargs*,args*,vararg?,kwonlyargs*,kw_defaults*,kwarg?,defaults*',boolop:['And','Or'],cmpop:['Eq','NotEq','Lt','LtE','Gt','GtE','Is','IsNot','In','NotIn'],comprehension:'target,iter,ifs*,is_async',excepthandler:['ExceptHandler'],expr:['BoolOp','NamedExpr','BinOp','UnaryOp','Lambda','IfExp','Dict','Set','ListComp','SetComp','DictComp','GeneratorExp','Await','Yield','YieldFrom','Compare','Call','FormattedValue','JoinedStr','Constant','Attribute','Subscript','Starred','Name','List','Tuple','Slice'],expr_context:['Load','Store','Del'],keyword:'arg?,value',match_case:'pattern,guard?,body*',mod:['Module','Interactive','Expression','FunctionType'],operator:['Add','Sub','Mult','MatMult','Div','Mod','Pow','LShift','RShift','BitOr','BitXor','BitAnd','FloorDiv'],pattern:['MatchValue','MatchSingleton','MatchSequence','MatchMapping','MatchClass','MatchStar','MatchAs','MatchOr'],stmt:['FunctionDef','AsyncFunctionDef','ClassDef','Return','Delete','Assign','AugAssign','AnnAssign','For','AsyncFor','While','If','With','AsyncWith','Match','Raise','Try','Assert','Import','ImportFrom','Global','Nonlocal','Expr','Pass','Break','Continue'],type_ignore:['TypeIgnore'],unaryop:['Invert','Not','UAdd','USub'],withitem:'context_expr,optional_vars?'}
var binary_ops={'+':'Add','-':'Sub','*':'Mult','/':'Div','//':'FloorDiv','%':'Mod','**':'Pow','<<':'LShift','>>':'RShift','|':'BitOr','^':'BitXor','&':'BitAnd','@':'MatMult'}
var boolean_ops={'and':'And','or':'Or'}
var comparison_ops={'==':'Eq','!=':'NotEq','<':'Lt','<=':'LtE','>':'Gt','>=':'GtE','is':'Is','is_not':'IsNot','in':'In','not_in':'NotIn'}
var unary_ops={unary_inv:'Invert',unary_pos:'UAdd',unary_neg:'USub'}
var op_types=$B.op_types=[binary_ops,boolean_ops,comparison_ops,unary_ops]
var _b_=$B.builtins
var ast=$B.ast={}
for(var kl in $B.ast_classes){var args=$B.ast_classes[kl],js=''
if(typeof args=="string"){js=`ast.${kl} = function(${args.replace(/[*?]/g, '')}){
`
if(args.length > 0){for(var arg of args.split(',')){if(arg.endsWith('*')){arg=arg.substr(0,arg.length-1)
js+=` this.${arg} = ${arg} === undefined ? [] : ${arg}
`}else if(arg.endsWith('?')){arg=arg.substr(0,arg.length-1)
js+=` this.${arg} = ${arg}
`}else{js+=` this.${arg} = ${arg}
`}}}
js+='}'}else{js=`ast.${kl} = [${args.map(x => 'ast.' + x).join(',')}]
`}
try{eval(js)}catch(err){console.log('error',js)
throw err}
ast[kl].$name=kl
if(typeof args=="string"){ast[kl]._fields=args.split(',')}}
function ast_js_to_py(obj){if(obj===undefined){return _b_.None}else if(Array.isArray(obj)){return obj.map(ast_js_to_py)}else{var class_name=obj.constructor.$name,py_class=$B.python_ast_classes[class_name],res={__class__:py_class}
if(py_class===undefined){return obj}
for(var field of py_class._fields){res[field]=ast_js_to_py(obj[field])}
return res}}
$B.create_python_ast_classes=function(){if($B.python_ast_classes){return}
$B.python_ast_classes={}
for(var klass in $B.ast_classes){$B.python_ast_classes[klass]=(function(kl){var _fields,raw_fields
if(typeof $B.ast_classes[kl]=="string"){if($B.ast_classes[kl]==''){_fields=[]}else{var raw_fields=$B.ast_classes[kl].split(',')
_fields=raw_fields.map(x=>
(x.endsWith('*')||x.endsWith('?'))?
x.substr(0,x.length-1):x)}}
var cls=$B.make_class(kl,ast_js_to_py)
if(_fields){cls._fields=_fields}
if(raw_fields){for(var field of raw_fields){if(field.endsWith('?')){cls[field.substr(0,field.length-1)]=_b_.None}}}
cls.__mro__=[$B.AST,_b_.object]
return cls})(klass)}}
var op2ast_class=$B.op2ast_class={},ast_types=[ast.BinOp,ast.BoolOp,ast.Compare,ast.UnaryOp]
for(var i=0;i < 4;i++){for(var op in op_types[i]){op2ast_class[op]=[ast_types[i],ast[op_types[i][op]]]}}})(__BRYTHON__)
;

;(function($B){$B.produce_ast=false
Number.isInteger=Number.isInteger ||function(value){return typeof value==='number' &&
isFinite(value)&&
Math.floor(value)===value};
Number.isSafeInteger=Number.isSafeInteger ||function(value){return Number.isInteger(value)&& Math.abs(value)<=Number.MAX_SAFE_INTEGER;};
var js,$pos,res,$op
var _b_=$B.builtins
var _window
if($B.isNode){_window={location:{href:'',origin:'',pathname:''}}}else{
_window=self}
$B.parser={}
var clone=$B.clone=function(obj){var res={}
for(var attr in obj){res[attr]=obj[attr]}
return res}
$B.last=function(table){if(table===undefined){console.log($B.frames_stack.slice())}
return table[table.length-1]}
$B.list2obj=function(list,value){var res={},i=list.length
if(value===undefined){value=true}
while(i--> 0){res[list[i]]=value}
return res}
$B.op2method={operations:{"**":"pow","//":"floordiv","<<":"lshift",">>":"rshift","+":"add","-":"sub","*":"mul","/":"truediv","%":"mod","@":"matmul" },augmented_assigns:{"//=":"ifloordiv",">>=":"irshift","<<=":"ilshift","**=":"ipow","+=":"iadd","-=":"isub","*=":"imul","/=":"itruediv","%=":"imod","&=":"iand","|=":"ior","^=":"ixor","@=":"imatmul"},binary:{"&":"and","|":"or","~":"invert","^":"xor"},comparisons:{"<":"lt",">":"gt","<=":"le",">=":"ge","==":"eq","!=":"ne"},boolean:{"or":"or","and":"and","in":"in","not":"not","is":"is"},subset:function(){var res={},keys=[]
if(arguments[0]=="all"){keys=Object.keys($B.op2method)
keys.splice(keys.indexOf("subset"),1)}else{for(var arg of arguments){keys.push(arg)}}
for(var key of keys){var ops=$B.op2method[key]
if(ops===undefined){throw Error(key)}
for(var attr in ops){res[attr]=ops[attr]}}
return res}}
var $operators=$B.op2method.subset("all")
$B.method_to_op={}
for(var category in $B.op2method){for(var op in $B.op2method[category]){var method=`__${$B.op2method[category][op]}__`
$B.method_to_op[method]=op}}
var $augmented_assigns=$B.augmented_assigns=$B.op2method.augmented_assigns
var noassign=$B.list2obj(['True','False','None','__debug__'])
var $op_order=[['or'],['and'],['not'],['in','not_in'],['<','<=','>','>=','!=','==','is','is_not'],['|'],['^'],['&'],['>>','<<'],['+','-'],['*','@','/','//','%'],['unary_neg','unary_inv','unary_pos'],['**']
]
var $op_weight={},$weight=1
for(var _tmp of $op_order){for(var item of _tmp){$op_weight[item]=$weight}
$weight++}
var ast=$B.ast,op2ast_class=$B.op2ast_class
function ast_body(block_ctx){
var body=[]
for(var child of block_ctx.node.children){var ctx=child.C.tree[0]
if(['single_kw','except','decorator'].indexOf(ctx.type)>-1 ||
(ctx.type=='condition' && ctx.token=='elif')){continue}
var child_ast=ctx.ast()
if(ast.expr.indexOf(child_ast.constructor)>-1){child_ast=new ast.Expr(child_ast)
copy_position(child_ast,child_ast.value)}
body.push(child_ast)}
return body}
var ast_dump=$B.ast_dump=function(tree,indent){indent=indent ||0
if(tree===_b_.None){
return 'None'}else if(typeof tree=='string'){return `'${tree}'`}else if(typeof tree=='number'){return tree+''}else if(tree.imaginary){return tree.value+'j'}else if(Array.isArray(tree)){if(tree.length==0){return '[]'}
res='[\n'
var items=[]
for(var x of tree){try{items.push(ast_dump(x,indent+1))}catch(err){console.log('error',tree)
console.log('for item',x)
throw err}}
res+=items.join(',\n')
return res+']'}else if(tree.$name){return tree.$name+'()'}else if(tree instanceof ast.MatchSingleton){return `MatchSingleton(value=${$B.AST.$convert(tree.value)})`}else if(tree instanceof ast.Constant){var value=tree.value
if(value.imaginary){return `Constant(value=${_b_.repr(value.value)}j)`}
return `Constant(value=${$B.AST.$convert(value)})`}
var proto=Object.getPrototypeOf(tree).constructor
var res='  ' .repeat(indent)+proto.$name+'('
var attr_names=$B.ast_classes[proto.$name].split(','),attrs=[]
attr_names=attr_names.map(x=> x.endsWith('*')?
x.substr(0,x.length-1):x)
if([ast.Name].indexOf(proto)>-1){for(var attr of attr_names){if(tree[attr]!==undefined){attrs.push(`${attr}=${ast_dump(tree[attr])}`)}}
return res+attrs.join(', ')+')'}
for(var attr of attr_names){if(tree[attr]!==undefined){var value=tree[attr]
attrs.push(attr+'='+
ast_dump(tree[attr],indent+1).trimStart())}}
if(attrs.length > 0){res+='\n'
res+=attrs.map(x=> '  '.repeat(indent+1)+x).join(',\n')}
res+=')'
return res}
var CO_FUTURE_ANNOTATIONS=0x1000000
function get_line(filename,lineno){var src=$B.file_cache[filename],line=_b_.None
if(src !==undefined){var lines=src.split('\n')
line=lines[s.lineno-1]}
return line}
function future_check_features(ff,s,filename){var i;
var names=s.names;
for(var feature of names){var name=feature.name
if(name=="braces"){raise_error_known_location(_b_.SyntaxError,filename,s.lineno,s.col_offset,s.end_lineno,s.end_col_offset,get_line(filename,s.lineno),"not a chance")
return 0;}else if(name=="annotations"){ff.features |=CO_FUTURE_ANNOTATIONS}else if(VALID_FUTURES.indexOf(name)==-1){var msg=`future feature ${feature.name} is not defined`
raise_error_known_location(_b_.SyntaxError,filename,s.lineno,s.col_offset,s.end_lineno,s.end_col_offset,get_line(filename,s.lineno),msg)
return 0;}}
return 1;}
function future_parse(ff,mod,filename){var i,done=0,prev_line=0;
if(!(mod instanceof $B.ast.Module)){return 1;}
if(mod.body.length==0){return 1;}
i=0;
if(mod.body[0]instanceof $B.ast.Expr){if(mod.body[0].value instanceof $B.ast.Constant &&
typeof mod.body[0].value.value=="string"){
i++}}
for(s of mod.body.slice(i)){if(done && s.lineno > prev_line){return 1;}
prev_line=s.lineno;
if(s instanceof $B.ast.ImportFrom){var modname=s.module
if(modname=="__future__"){if(done){raise_syntax_error(
"from __future__ imports must occur at the "+
"beginning of the file")
return 0;}
if(! future_check_features(ff,s,filename)){return 0;}
ff.lineno=s.lineno;}else{
done=1;}}
else{
done=1;}}
return 1;}
$B._PyFuture_FromAST=function(mod,filename){var ff={features:0,lineno:-1}
if(! future_parse(ff,mod,filename)){return NULL;}
return ff;}
function set_position(ast_obj,position,end_position){ast_obj.lineno=position.start[0]
ast_obj.col_offset=position.start[1]
position=end_position ||position
ast_obj.end_lineno=position.end[0]
ast_obj.end_col_offset=position.end[1]}
function copy_position(target,origin){target.lineno=origin.lineno
target.col_offset=origin.col_offset
target.end_lineno=origin.end_lineno
target.end_col_offset=origin.end_col_offset}
function first_position(C){var ctx=C
while(ctx.tree && ctx.tree.length > 0){ctx=ctx.tree[0]}
return ctx.position}
function last_position(C){var ctx=C
while(ctx.tree && ctx.tree.length > 0){ctx=$B.last(ctx.tree)
if(ctx.end_position){return ctx.end_position}}
return ctx.end_position ||ctx.position}
function raise_error_known_location(type,filename,lineno,col_offset,end_lineno,end_col_offset,line,message){var exc=type.$factory(message)
exc.filename=filename
exc.lineno=lineno
exc.offset=col_offset
exc.end_lineno=end_lineno
exc.end_offset=end_col_offset
exc.text=line
exc.args[1]=[filename,lineno,col_offset,exc.text,end_lineno,end_col_offset]
throw exc}
function raise_syntax_error_known_range(C,a,b,msg){
raise_error_known_location(_b_.SyntaxError,$get_module(C).filename,a.start[0],a.start[1],b.end[0],b.end[1],a.line,msg)}
function raise_error(errtype,C,msg,token){var filename=$get_module(C).filename
token=token ||$token.value
msg=msg ||'invalid syntax'
if(msg.startsWith('(')){msg='invalid syntax '+msg}
msg=msg.trim()
raise_error_known_location(errtype,filename,token.start[0],token.start[1],token.end[0],token.end[1],token.line,msg)}
function raise_syntax_error(C,msg,token){raise_error(_b_.SyntaxError,C,msg,token)}
function raise_indentation_error(C,msg,indented_node){
if(indented_node){
var type=indented_node.C.tree[0].type,token=indented_node.C.tree[0].token,lineno=indented_node.line_num
switch(type){case 'class':
type='class definition'
break
case 'condition':
type=`'${token}' statement`
break
case 'def':
type='function definition'
break
case 'case':
case 'for':
case 'match':
case 'try':
case 'while':
case 'with':
type=`'${type}' statement`
break
case 'single_kw':
type=`'${token}' statement`
break}
msg+=` after ${type} on line ${lineno}`}
raise_error(_b_.IndentationError,C,msg)}
function check_assignment(C,kwargs){
var once,action='assign to',augmented=false
if(kwargs){once=kwargs.once
action=kwargs.action ||action
augmented=kwargs.augmented===undefined ? false :kwargs.augmented}
var ctx=C,forbidden=['assert','import','raise','return','decorator','comprehension','await']
if(action !='delete'){
forbidden.push('del')}
function report(wrong_type,a,b){a=a ||C.position
b=b ||$token.value
if(augmented){raise_syntax_error_known_range(
C,a,b,`'${wrong_type}' is an illegal expression `+
'for augmented assignment')}else{raise_syntax_error_known_range(
C,a,b,`cannot ${action} ${wrong_type}`)}}
if(C.type=='expr'){var upper_expr=C
var ctx=C
while(ctx.parent){if(ctx.parent.type=='expr'){upper_expr=ctx.parent}
ctx=ctx.parent}}
if($parent_match(C,{type:'augm_assign'})){raise_syntax_error(C)}
ctx=C
while(ctx){if(forbidden.indexOf(ctx.type)>-1){raise_syntax_error(C,`(assign to ${ctx.type})`)}else if(ctx.type=="expr"){if($parent_match(ctx,{type:'annotation'})){return true}
if(ctx.parent.type=='yield'){raise_syntax_error_known_range(ctx,ctx.parent.position,last_position(ctx),"assignment to yield expression not possible")}
var assigned=ctx.tree[0]
if(assigned.type=="op"){if($B.op2method.comparisons[ctx.tree[0].op]!==undefined){report('comparison',assigned.tree[0].position,last_position(assigned))}else{report('expression',assigned.tree[0].position,last_position(assigned))}}else if(assigned.type=='unary'){report('expression',assigned.position,last_position(assigned))}else if(assigned.type=='call'){report('function call',assigned.position,assigned.end_position)}else if(assigned.type=='id'){var name=assigned.value
if(['None','True','False','__debug__'].indexOf(name)>-1){report(name)}
if(noassign[name]===true){report(keyword)}}else if(['str','int','float','complex'].indexOf(assigned.type)>-1){report('literal')}else if(assigned.type=="ellipsis"){report('Ellipsis')}else if(assigned.type=='genexpr'){report('generator expression')}else if(assigned.type=='packed'){if(action=='delete'){report('starred',assigned.position,last_position(assigned))}
check_assignment(assigned.tree[0],{action,once:true})}else if(assigned.type=='named_expr'){if(! assigned.parenthesized){report('named expression')}else if(ctx.parent.type=='node'){raise_syntax_error_known_range(
C,assigned.target.position,last_position(assigned),"cannot assign to named expression here. "+
"Maybe you meant '==' instead of '='?")}else if(action=='delete'){report('named expression',assigned.position,last_position(assigned))}}else if(assigned.type=='list_or_tuple'){for(var item of ctx.tree){check_assignment(item,{action,once:true})}}else if(assigned.type=='lambda'){report('lambda')}else if(assigned.type=='ternary'){report('conditional expression')}}else if(ctx.type=='list_or_tuple'){for(var item of ctx.tree){check_assignment(item,{action,once:true})}}else if(ctx.type=='ternary'){report('conditional expression')}else if(ctx.type=='op'){var a=ctx.tree[0].position,last=$B.last(ctx.tree).tree[0],b=last.end_position ||last.position
if($B.op2method.comparisons[ctx.op]!==undefined){report('comparison',a,b)}else{report('expression',a,b)}}else if(ctx.type=='yield'){report('yield expression')}else if(ctx.comprehension){break}
if(once){break}
ctx=ctx.parent}}
function remove_abstract_expr(tree){if(tree.length > 0 && $B.last(tree).type=='abstract_expr'){tree.pop()}}
$B.format_indent=function(js,indent){
var indentation='  ',lines=js.split('\n'),level=indent,res='',last_is_closing_brace=false,last_is_backslash=false,last_is_var_and_comma=false
for(var i=0,len=lines.length;i < len;i++){var line=lines[i],add_closing_brace=false,add_spaces=true
if(last_is_backslash){add_spaces=false}else if(last_is_var_and_comma){line='    '+line.trim()}else{line=line.trim()}
if(add_spaces && last_is_closing_brace &&
(line.startsWith('else')||
line.startsWith('catch')||
line.startsWith('finally'))){res=res.substr(0,res.length-1)
add_spaces=false}
last_is_closing_brace=line.endsWith('}')
if(line.startsWith('}')){level--}else if(line.endsWith('}')){line=line.substr(0,line.length-1)
add_closing_brace=true}
if(level < 0){if($B.debug > 2){console.log('wrong js indent')
console.log(res)}
level=0}
try{res+=(add_spaces ? indentation.repeat(level):'')+line+'\n'}catch(err){console.log(res)
throw err}
if(line.endsWith('{')){level++}else if(add_closing_brace){level--
if(level < 0){level=0}
try{res+=indentation.repeat(level)+'}\n'}catch(err){console.log(res)
throw err}}
last_is_backslash=line.endsWith('\\')
last_is_var_and_comma=line.endsWith(',')&&
(line.startsWith('var ')||last_is_var_and_comma)}
return res}
function show_line(ctx){
var lnum=$get_node(ctx).line_num,src=$get_module(ctx).src
console.log('this',ctx,'\nline',lnum,src.split('\n')[lnum-1])}
var $Node=$B.parser.$Node=function(type){this.type=type
this.children=[]}
$Node.prototype.add=function(child){
this.children[this.children.length]=child
child.parent=this
child.module=this.module}
$Node.prototype.ast=function(){var root_ast=new ast.Module([],[])
root_ast.lineno=this.line_num
for(var node of this.children){var t=node.C.tree[0]
if(['single_kw','except','decorator'].indexOf(t.type)>-1 ||
(t.type=='condition' && t.token=='elif')){continue}
var node_ast=node.C.tree[0].ast()
if(ast.expr.indexOf(node_ast.constructor)>-1){node_ast=new ast.Expr(node_ast)
copy_position(node_ast,node_ast.value)}
root_ast.body.push(node_ast)}
if(this.mode=='eval'){if(root_ast.body.length > 1 ||
!(root_ast.body[0]instanceof $B.ast.Expr)){console.log('root_ast',root_ast,'this',this)
raise_syntax_error(this.children[0].C,'eval() argument must be an expression')}
root_ast=new $B.ast.Expression(root_ast.body[0].value)
copy_position(root_ast,root_ast.body)}
return root_ast}
$Node.prototype.insert=function(pos,child){
this.children.splice(pos,0,child)
child.parent=this
child.module=this.module}
$Node.prototype.show=function(indent){
var res=''
if(this.type==='module'){for(var child of this.children){res+=child.show(indent)}
return res}
indent=indent ||0
res+=' '.repeat(indent)
res+=this.C
if(this.children.length > 0){res+='{'}
res+='\n'
for(var child of this.children){res+=child.show(indent+4)}
if(this.children.length > 0){res+=' '.repeat(indent)
res+='}\n'}
return res}
var $AbstractExprCtx=$B.parser.$AbstractExprCtx=function(C,with_commas){this.type='abstract_expr'
this.with_commas=with_commas
this.parent=C
this.tree=[]
this.position=$token.value
C.tree.push(this)}
$AbstractExprCtx.prototype.transition=function(token,value){var C=this
var packed=C.packed,is_await=C.is_await,position=C.position
switch(token){case 'await':
case 'id':
case 'imaginary':
case 'int':
case 'float':
case 'str':
case 'JoinedStr':
case 'bytes':
case 'ellipsis':
case '[':
case '(':
case '{':
case '.':
case 'not':
case 'lambda':
case 'yield':
C.parent.tree.pop()
var commas=C.with_commas
C=C.parent
C.packed=packed
C.is_await=is_await
if(C.position===undefined){C.position=$token.value}}
switch(token){case 'await':
return new $AbstractExprCtx(new $AwaitCtx(
new $ExprCtx(C,'await',false)),true)
case 'id':
return new $IdCtx(new $ExprCtx(C,'id',commas),value)
case 'str':
return new $StringCtx(new $ExprCtx(C,'str',commas),value)
case 'JoinedStr':
return new JoinedStrCtx(new $ExprCtx(C,'str',commas),value)
case 'bytes':
return new $StringCtx(new $ExprCtx(C,'bytes',commas),value)
case 'int':
return new $NumberCtx('int',new $ExprCtx(C,'int',commas),value)
case 'float':
return new $NumberCtx('float',new $ExprCtx(C,'float',commas),value)
case 'imaginary':
return new $NumberCtx('imaginary',new $ExprCtx(C,'imaginary',commas),value)
case '(':
return new $ListOrTupleCtx(
new $ExprCtx(C,'tuple',commas),'tuple')
case '[':
return new $ListOrTupleCtx(
new $ExprCtx(C,'list',commas),'list')
case '{':
return new $DictOrSetCtx(
new $ExprCtx(C,'dict_or_set',commas))
case 'ellipsis':
return new $EllipsisCtx(
new $ExprCtx(C,'ellipsis',commas))
case 'not':
if(C.type=='op' && C.op=='is'){
C.op='is_not'
return C}
return new $NotCtx(new $ExprCtx(C,'not',commas))
case 'lambda':
return new $LambdaCtx(new $ExprCtx(C,'lambda',commas))
case 'op':
var tg=value
switch(tg){case '*':
C.parent.tree.pop()
var commas=C.with_commas
C=C.parent
C.position=$token.value
return new $PackedCtx(
new $ExprCtx(C,'expr',commas))
case '-':
case '~':
case '+':
C.parent.tree.pop()
return new $AbstractExprCtx(
new $UnaryCtx(
new $ExprCtx(C.parent,'unary',false),tg),false
)
case 'not':
C.parent.tree.pop()
var commas=C.with_commas
C=C.parent
return new $NotCtx(
new $ExprCtx(C,'not',commas))
case '...':
return new $EllipsisCtx(new $ExprCtx(C,'ellipsis',commas))}
raise_syntax_error(C)
case 'in':
if(C.parent.type=='op' && C.parent.op=='not'){C.parent.op='not_in'
return C}
raise_syntax_error(C)
case '=':
if(C.parent.type=="yield"){console.log('parent is yield',C)
raise_syntax_error(C,"assignment to yield expression not possible",C.parent.position,)}
raise_syntax_error(C)
case 'yield':
return new $AbstractExprCtx(new $YieldCtx(C),true)
case ':':
if(C.parent.type=="sub" ||
(C.parent.type=="list_or_tuple" &&
C.parent.parent.type=="sub")){return new $AbstractExprCtx(new $SliceCtx(C.parent),false)}
return $transition(C.parent,token,value)
case ')':
case ',':
switch(C.parent.type){case 'list_or_tuple':
case 'slice':
case 'call_arg':
case 'op':
case 'yield':
break
case 'match':
if(token==','){
C.parent.tree.pop()
var tuple=new $ListOrTupleCtx(C.parent,'tuple')
tuple.implicit=true
tuple.has_comma=true
tuple.tree=[C]
C.parent=tuple
return tuple}
break
default:
raise_syntax_error(C)}
break
case '.':
raise_syntax_error(C)}
return $transition(C.parent,token,value)}
var $AliasCtx=$B.parser.$AliasCtx=function(C){
this.type='ctx_manager_alias'
this.parent=C
this.tree=[]
C.tree[C.tree.length-1].alias=this}
$AliasCtx.prototype.transition=function(token,value){var C=this
switch(token){case ',':
case ':':
check_assignment(C.tree[0])
C.parent.set_alias(C.tree[0].tree[0])
return $transition(C.parent,token,value)}
raise_syntax_error(C)}
var $AnnotationCtx=$B.parser.$AnnotationCtx=function(C){
this.type='annotation'
this.parent=C
this.tree=[]
this.src=$get_module(this).src
var rest=this.src.substr($pos)
if(rest.startsWith(':')){this.start=$pos+1}else if(rest.startsWith('->')){this.start=$pos+2}
this.string=''
C.annotation=this
var scope=$get_scope(C)
if(scope.ntype=="def" && C.tree && C.tree.length > 0 &&
C.tree[0].type=="id"){var name=C.tree[0].value
scope.annotations=scope.annotations ||new Set()
scope.annotations.add(name)}}
$AnnotationCtx.prototype.transition=function(token,value){var C=this
this.string=this.src.substring(this.start,$pos)
if(token=="eol" && C.tree.length==1 &&
C.tree[0].tree.length==0){raise_syntax_error(C)}else if(token==':' && C.parent.type !="def"){raise_syntax_error(C,"more than one annotation")}else if(token=="augm_assign"){raise_syntax_error(C,"augmented assign as annotation")}else if(token=="op"){raise_syntax_error(C,"operator as annotation")}
return $transition(C.parent,token)}
var $AssertCtx=$B.parser.$AssertCtx=function(C){
this.type='assert'
this.parent=C
this.tree=[]
this.position=$token.value
C.tree[C.tree.length]=this}
$AssertCtx.prototype.ast=function(){
var msg=this.tree[1],ast_obj=new ast.Assert(this.tree[0].ast(),msg===undefined ? msg :msg.ast())
set_position(ast_obj,this.position)
return ast_obj}
$AssertCtx.prototype.transition=function(token,value){var C=this
if(token==","){if(this.tree.length > 1){raise_syntax_error(C,'(too many commas after assert)')}
return new $AbstractExprCtx(this,false)}
if(token=='eol'){return $transition(C.parent,token)}
raise_syntax_error(C)}
var $AssignCtx=$B.parser.$AssignCtx=function(C,expression){
check_assignment(C)
this.type='assign'
this.position=$token.value
C.parent.tree.pop()
C.parent.tree.push(this)
this.parent=C.parent
this.tree=[C]
var scope=$get_scope(this)
if(C.type=='assign'){check_assignment(C.tree[1])}else{var assigned=C.tree[0]
if(assigned.type=="ellipsis"){raise_syntax_error(C,'cannot assign to Ellipsis')}else if(assigned.type=='unary'){raise_syntax_error(C,'cannot assign to operator')}else if(assigned.type=='packed'){if(assigned.tree[0].name=='id'){var id=assigned.tree[0].tree[0].value
if(['None','True','False','__debug__'].indexOf(id)>-1){raise_syntax_error(C,'cannot assign to '+id)}}
if(assigned.parent.in_tuple===undefined){raise_syntax_error(C,"starred assignment target must be in a list or tuple")}}}}
function set_ctx_to_store(obj){if(Array.isArray(obj)){for(var item of obj){set_ctx_to_store(item)}}else if(obj instanceof ast.List ||
obj instanceof ast.Tuple){for(var item of obj.elts){set_ctx_to_store(item)}}else if(obj instanceof ast.Starred){obj.value.ctx=new ast.Store()}else if(obj===undefined){}else if(obj.ctx){obj.ctx=new ast.Store()}else{console.log('bizarre',obj)}}
$AssignCtx.prototype.ast=function(){var value=this.tree[1].ast(),targets=[],target=this.tree[0]
if(target.type=='expr' && target.tree[0].type=='list_or_tuple'){target=target.tree[0]}
if(target.type=='list_or_tuple'){target=target.ast()
target.ctx=new ast.Store()
targets=[target]}else{while(target.type=='assign'){targets.splice(0,0,target.tree[1].ast())
target=target.tree[0]}
targets.splice(0,0,target.ast())}
value.ctx=new ast.Load()
var lineno=$get_node(this).line_num
if(target.annotation){var ast_obj=new ast.AnnAssign(
target.tree[0].ast(),target.annotation.tree[0].ast(),value,1)
set_position(ast_obj.annotation,target.annotation.position,last_position(target.annotation))
ast_obj.target.ctx=new ast.Store()}else{var ast_obj=new ast.Assign(targets,value)}
set_position(ast_obj,this.position)
set_ctx_to_store(ast_obj.targets)
return ast_obj}
$AssignCtx.prototype.transition=function(token,value){var C=this
if(token=='eol'){if(C.tree[1].type=='abstract_expr'){raise_syntax_error(C)}
return $transition(C.parent,'eol')}
raise_syntax_error(C)}
var $AsyncCtx=$B.parser.$AsyncCtx=function(C){
this.type='async'
this.parent=C
C.async=true
C.position=$token.value}
$AsyncCtx.prototype.transition=function(token,value){var C=this
if(token=="def"){return $transition(C.parent,token,value)}else if(token=="for" ||token=="with"){var ntype=$get_scope(C).ntype
if(ntype !=="def" && ntype !="generator"){raise_syntax_error(C,"'async "+token+
"' outside async function")}
var ctx=$transition(C.parent,token,value)
ctx.parent.async=true 
return ctx}
raise_syntax_error(C)}
var $AttrCtx=$B.parser.$AttrCtx=function(C){
this.type='attribute'
this.value=C.tree[0]
this.parent=C
this.position=this.value.position
C.tree.pop()
C.tree[C.tree.length]=this
this.tree=[]
this.func='getattr' }
$AttrCtx.prototype.ast=function(){
var value=this.value.ast(),attr=this.unmangled_name,ctx=new ast.Load()
if(this.func=='setattr'){ctx=new ast.Store()}else if(this.func=='delattr'){ctx=new ast.Delete()}
var ast_obj=new ast.Attribute(value,attr,ctx)
set_position(ast_obj,this.position)
return ast_obj}
$AttrCtx.prototype.transition=function(token,value){var C=this
if(token==='id'){var name=value
if(name=='__debug__'){raise_syntax_error(C,'cannot assign to __debug__')}else if(noassign[name]===true){raise_syntax_error(C,`'${name}' cannot be an attribute`)}
C.unmangled_name=name
name=$mangle(name,C)
C.name=name
return C.parent}
raise_syntax_error(C)}
var $AugmentedAssignCtx=$B.parser.$AugmentedAssignCtx=function(C,op){
check_assignment(C,{augmented:true})
this.type='augm_assign'
this.C=C
this.parent=C.parent
this.position=$token.value
C.parent.tree.pop()
C.parent.tree[C.parent.tree.length]=this
this.op=op
this.tree=[C]
var scope=this.scope=$get_scope(this)
this.module=scope.module}
$AugmentedAssignCtx.prototype.ast=function(){
var target=this.tree[0].ast(),value=this.tree[1].ast()
target.ctx=new ast.Store()
value.ctx=new ast.Load()
var op=this.op.substr(0,this.op.length-1),ast_type_class=op2ast_class[op],ast_class=ast_type_class[1]
var ast_obj=new ast.AugAssign(target,new ast_class(),value)
set_position(ast_obj,this.position)
return ast_obj}
$AugmentedAssignCtx.prototype.transition=function(token,value){var C=this
if(token=='eol'){if(C.tree[1].type=='abstract_expr'){raise_syntax_error(C)}
return $transition(C.parent,'eol')}
raise_syntax_error(C)}
var $AwaitCtx=$B.parser.$AwaitCtx=function(C){
this.type='await'
this.parent=C
this.tree=[]
this.position=$token.value
C.tree.push(this)
var p=C
while(p){if(p.type=="list_or_tuple"){p.is_await=true}
p=p.parent}
var node=$get_node(this)
node.awaits=node.awaits ||[]
node.awaits.push(this)}
$AwaitCtx.prototype.ast=function(){
var ast_obj=new ast.Await(this.tree[0].ast())
set_position(ast_obj,this.position)
return ast_obj}
$AwaitCtx.prototype.transition=function(token,value){var C=this
C.parent.is_await=true
return $transition(C.parent,token,value)}
var $BodyCtx=$B.parser.$BodyCtx=function(C){
var ctx_node=C.parent
while(ctx_node.type !=='node'){ctx_node=ctx_node.parent}
var tree_node=ctx_node.node
var body_node=new $Node()
body_node.is_body_node=true
body_node.line_num=tree_node.line_num
tree_node.insert(0,body_node)
return new $NodeCtx(body_node)}
var $BreakCtx=$B.parser.$BreakCtx=function(C){
this.type='break'
this.position=$token.value
this.parent=C
C.tree[C.tree.length]=this}
$BreakCtx.prototype.ast=function(){var ast_obj=new ast.Break()
set_position(ast_obj,this.position)
return ast_obj}
$BreakCtx.prototype.transition=function(token,value){var C=this
if(token=='eol'){return $transition(C.parent,'eol')}
raise_syntax_error(C)}
var $CallArgCtx=$B.parser.$CallArgCtx=function(C){
this.type='call_arg'
this.parent=C
this.start=$pos
this.tree=[]
this.position=$token.value
C.tree.push(this)
this.expect='id'}
$CallArgCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'await':
case 'id':
case 'imaginary':
case 'int':
case 'float':
case 'str':
case 'JoinedStr':
case 'bytes':
case '[':
case '(':
case '{':
case '.':
case 'ellipsis':
case 'not':
case 'lambda':
if(C.expect=='id'){C.expect=','
var expr=new $AbstractExprCtx(C,false)
return $transition(expr,token,value)}
break
case '=':
if(C.expect==','){return new $ExprCtx(new $KwArgCtx(C),'kw_value',false)}
break
case 'for':
return new $TargetListCtx(new $ForExpr(new GeneratorExpCtx(C)))
case 'op':
if(C.expect=='id'){var op=value
C.expect=','
switch(op){case '+':
case '-':
case '~':
return $transition(new $AbstractExprCtx(C,false),token,op)
case '*':
C.parent.tree.pop()
return new $StarArgCtx(C.parent)
case '**':
C.parent.tree.pop()
return new $DoubleStarArgCtx(C.parent)}}
raise_syntax_error(C)
case ')':
if(C.parent.kwargs &&
$B.last(C.parent.tree).tree[0]&& 
['kwarg','star_arg','double_star_arg'].
indexOf($B.last(C.parent.tree).tree[0].type)==-1){raise_syntax_error(C,'non-keyword argument after keyword argument')}
return $transition(C.parent,token)
case ':':
if(C.expect==',' &&
C.parent.parent.type=='lambda'){return $transition(C.parent.parent,token)}
break
case ',':
if(C.expect==','){if(C.parent.kwargs &&
['kwarg','star_arg','double_star_arg'].
indexOf($B.last(C.parent.tree).tree[0].type)==-1){raise_syntax_error(C,'non-keyword argument after keyword argument')}
return $transition(C.parent,token,value)}}
raise_syntax_error(C)}
var $CallCtx=$B.parser.$CallCtx=function(C){
this.position=$token.value
this.type='call'
this.func=C.tree[0]
if(this.func !==undefined){
this.func.parent=this
this.position=this.func.position}
this.parent=C
if(C.type !='class'){C.tree.pop()
C.tree[C.tree.length]=this}else{
C.args=this}
this.expect='id'
this.tree=[]
this.start=$pos}
$CallCtx.prototype.ast=function(){var res=new ast.Call(this.func.ast(),[],[])
for(var call_arg of this.tree){if(call_arg.type=='double_star_arg'){var value=call_arg.tree[0].tree[0].ast(),keyword=new ast.keyword(_b_.None,value)
delete keyword.arg
res.keywords.push(keyword)}else if(call_arg.type=='star_arg'){var starred=new ast.Starred(call_arg.tree[0].ast())
set_position(starred,call_arg.position)
starred.ctx=new ast.Load()
res.args.push(starred)}else if(call_arg.type=='genexpr'){res.args.push(call_arg.ast())}else{var item=call_arg.tree[0]
if(item===undefined){
continue}
if(item.type=='kwarg'){res.keywords.push(new ast.keyword(item.tree[0].value,item.tree[1].ast()))}else{res.args.push(item.ast())}}}
set_position(res,this.position)
return res}
$CallCtx.prototype.transition=function(token,value){var C=this
switch(token){case ',':
if(C.expect=='id'){raise_syntax_error(C)}
C.expect='id'
return C
case 'await':
case 'id':
case 'imaginary':
case 'int':
case 'float':
case 'str':
case 'JoinedStr':
case 'bytes':
case '[':
case '(':
case '{':
case '.':
case 'not':
case 'lambda':
case 'ellipsis':
C.expect=','
return $transition(new $CallArgCtx(C),token,value)
case ')':
C.end=$pos
C.end_position=$token.value
return C.parent
case 'op':
C.expect=','
switch(value){case '-':
case '~':
case '+':
C.expect=','
return $transition(new $CallArgCtx(C),token,value)
case '*':
C.has_star=true
return new $StarArgCtx(C)
case '**':
C.has_dstar=true
return new $DoubleStarArgCtx(C)}
raise_syntax_error(C)
case 'yield':
raise_syntax_error(C)}
return $transition(C.parent,token,value)}
var $CaseCtx=$B.parser.$CaseCtx=function(node_ctx){
this.type="case"
this.position=$token.value
node_ctx.tree=[this]
this.parent=node_ctx
this.tree=[]
this.expect='as'}
$CaseCtx.prototype.ast=function(){
var ast_obj=new ast.match_case(this.tree[0].ast(),this.has_guard ? this.tree[1].tree[0].ast():undefined,ast_body(this.parent))
set_position(ast_obj,this.position)
return ast_obj}
$CaseCtx.prototype.set_alias=function(name){this.alias=name}
$CaseCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'as':
C.expect=':'
return new $AbstractExprCtx(new $AliasCtx(C))
case ':':
function is_irrefutable(pattern){var cause
if(pattern.type=="capture_pattern"){return pattern.tree[0]}else if(pattern.type=="or_pattern"){for(var subpattern of pattern.tree){if(cause=is_irrefutable(subpattern)){return cause}}}else if(pattern.type=="sequence_pattern" &&
pattern.token=='(' &&
pattern.tree.length==1 &&
(cause=is_irrefutable(pattern.tree[0]))){return cause}
return false}
var cause
if(cause=is_irrefutable(this.tree[0])){
$get_node(C).parent.irrefutable=cause}
switch(C.expect){case 'id':
case 'as':
case ':':
var last=$B.last(C.tree)
if(last && last.type=='sequence_pattern'){remove_empty_pattern(last)}
return $BodyCtx(C)}
break
case 'op':
if(value=='|'){return new $PatternCtx(new $PatternOrCtx(C))}
raise_syntax_error(C,'expected :')
case ',':
if(C.expect==':' ||C.expect=='as'){return new $PatternCtx(new $PatternSequenceCtx(C))}
case 'if':
C.has_guard=true
return new $AbstractExprCtx(new $ConditionCtx(C,token),false)
default:
raise_syntax_error(C,'expected :')}}
var $ClassCtx=$B.parser.$ClassCtx=function(C){
this.type='class'
this.parent=C
this.tree=[]
this.position=$token.value
C.tree[C.tree.length]=this
this.expect='id'
var scope=this.scope=$get_scope(this)
this.parent.node.parent_block=scope
this.parent.node.bound={}}
$ClassCtx.prototype.ast=function(){
var decorators=get_decorators(this.parent.node),bases=[],keywords=[]
if(this.args){for(var arg of this.args.tree){if(arg.tree[0].type=='kwarg'){keywords.push(new ast.keyword(arg.tree[0].tree[0].value,arg.tree[0].tree[1].ast()))}else{bases.push(arg.tree[0].ast())}}}
var ast_obj=new ast.ClassDef(this.name,bases,keywords,ast_body(this.parent),decorators)
set_position(ast_obj,this.position)
return ast_obj}
$ClassCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
if(C.expect=='id'){C.set_name(value)
C.expect='(:'
return C}
break
case '(':
if(C.name===undefined){raise_syntax_error(C,'missing class name')}
return new $CallCtx(C)
case ':':
if(this.args){for(var arg of this.args.tree){var param=arg.tree[0]
if((param.type=='expr' && param.name=='id')||
param.type=="kwarg"){continue}
raise_syntax_error(C,'invalid class parameter')}}
return $BodyCtx(C)}
raise_syntax_error(C)}
$ClassCtx.prototype.set_name=function(name){var C=this.parent
this.random=$B.UUID()
this.name=name
this.id=C.node.module+'_'+name+'_'+this.random
this.parent.node.id=this.id
var scope=this.scope,parent_block=scope
var block=scope,parent_classes=[]
while(block.ntype=="class"){parent_classes.splice(0,0,block.C.tree[0].name)
block=block.parent}
this.qualname=parent_classes.concat([name]).join(".")
while(parent_block.C &&
parent_block.C.tree[0].type=='class'){parent_block=parent_block.parent}
while(parent_block.C &&
'def' !=parent_block.C.tree[0].type &&
'generator' !=parent_block.C.tree[0].type){parent_block=parent_block.parent}
this.parent.node.parent_block=parent_block}
var Comprehension={generators:function(comp){
var comprehensions=[]
for(item of comp){if(item.type=='for'){comprehensions.push(
new ast.comprehension(
item.tree[0].ast(),item.tree[1].ast(),[],item.is_async ? 1 :0
)
)}else{$B.last(comprehensions).ifs.push(item.tree[0].ast())}}
return comprehensions},make_comp:function(comp,C){comp.comprehension=true
comp.parent=C.parent
comp.id=comp.type+$B.UUID()
var scope=$get_scope(C)
comp.parent_block=scope
while(scope){if(scope.C && scope.C.tree &&
scope.C.tree.length > 0 &&
scope.C.tree[0].async){comp.async=true
break}
scope=scope.parent_block}
comp.module=$get_module(C).module
comp.module_ref=comp.module.replace(/\./g,'_')
C.parent.tree[C.parent.tree.length-1]=comp
Comprehension.set_parent_block(C.tree[0],comp)},set_parent_block:function(ctx,parent_block){if(ctx.tree){for(var item of ctx.tree){if(item.comprehension){item.parent_block=parent_block}
Comprehension.set_parent_block(item,parent_block)}}}}
var $ConditionCtx=$B.parser.$ConditionCtx=function(C,token){
this.type='condition'
this.token=token
this.parent=C
this.tree=[]
this.position=$token.value
this.node=$get_node(this)
this.scope=$get_scope(this)
if(token=='elif'){
var rank=this.node.parent.children.indexOf(this.node),previous=this.node.parent.children[rank-1]
previous.C.tree[0].orelse=this}
C.tree.push(this)}
$ConditionCtx.prototype.ast=function(){
var types={'if':'If','while':'While','elif':'If'}
var res=new ast[types[this.token]](this.tree[0].ast())
if(this.orelse){if(this.orelse.token=='elif'){res.orelse=[this.orelse.ast()]}else{res.orelse=this.orelse.ast()}}else{res.orelse=[]}
res.body=ast_body(this)
set_position(res,this.position)
return res}
$ConditionCtx.prototype.transition=function(token,value){var C=this
if(token==':'){if(C.tree[0].type=="abstract_expr" &&
C.tree[0].tree.length==0){
raise_syntax_error(C)}
return $BodyCtx(C)}else if(this.in_comp && this.token=='if'){
if(token==']'){return $transition(C.parent,token,value)}else if(token=='if'){var if_exp=new $ConditionCtx(C.parent,'if')
if_exp.in_comp=true
return new $AbstractExprCtx(if_exp,false)}else if(')]}'.indexOf(token)>-1){return $transition(this.parent,token,value)}}
raise_syntax_error(C,"expected ':'")}
var $ContinueCtx=$B.parser.$ContinueCtx=function(C){
this.type='continue'
this.parent=C
this.position=$token.value
$get_node(this).is_continue=true
C.tree[C.tree.length]=this}
$ContinueCtx.prototype.ast=function(){var ast_obj=new ast.Continue()
set_position(ast_obj,this.position)
return ast_obj}
$ContinueCtx.prototype.transition=function(token,value){var C=this
if(token=='eol'){return C.parent}
raise_syntax_error(C)}
var $DebuggerCtx=$B.parser.$DebuggerCtx=function(C){
this.type='continue'
this.parent=C
C.tree[C.tree.length]=this}
$DebuggerCtx.prototype.transition=function(token,value){var C=this}
var $DecoratorCtx=$B.parser.$DecoratorCtx=function(C){
this.type='decorator'
this.parent=C
C.tree[C.tree.length]=this
this.tree=[]
this.position=$token.value}
$DecoratorCtx.prototype.transition=function(token,value){var C=this
if(token=='id' && C.tree.length==0){return $transition(new $AbstractExprCtx(C,false),token,value)}
if(token=='eol'){return $transition(C.parent,token)}
raise_syntax_error(C)}
function get_decorators(node){var decorators=[]
var parent_node=node.parent
var rank=parent_node.children.indexOf(node)
while(true){rank--
if(rank < 0){break}else if(parent_node.children[rank].C.tree[0].type==
'decorator'){var deco=parent_node.children[rank].C.tree[0].tree[0]
decorators.splice(0,0,deco.ast())}else{break}}
return decorators}
var $DefCtx=$B.parser.$DefCtx=function(C){this.type='def'
this.name=null
this.parent=C
this.tree=[]
this.async=C.async
if(this.async){this.position=C.position}else{this.position=$token.value}
C.tree[C.tree.length]=this
this.enclosing=[]
var scope=this.scope=$get_scope(this)
if(scope.C && scope.C.tree[0].type=="class"){this.class_name=scope.C.tree[0].name}
var parent_block=scope
while(parent_block.C &&
parent_block.C.tree[0].type=='class'){parent_block=parent_block.parent}
while(parent_block.C &&
'def' !=parent_block.C.tree[0].type){parent_block=parent_block.parent}
this.parent.node.parent_block=parent_block
var pb=parent_block
this.is_comp=pb.is_comp
while(pb && pb.C){if(pb.C.tree[0].type=='def'){this.inside_function=true
break}
pb=pb.parent_block}
this.module=scope.module
this.root=$get_module(this)
this.positional_list=[]
this.default_list=[]
this.other_args=null
this.other_kw=null
this.after_star=[]}
$DefCtx.prototype.ast=function(){var args={posonlyargs:[],args:[],kwonlyargs:[],kw_defaults:[],defaults:[]},decorators=get_decorators(this.parent.node),func_args=this.tree[1],state='arg',default_value,res
args=func_args.ast()
if(this.async){res=new ast.AsyncFunctionDef(this.name,args,[],decorators)}else{res=new ast.FunctionDef(this.name,args,[],decorators)}
if(this.annotation){res.returns=this.annotation.tree[0].ast()}
res.body=ast_body(this.parent)
set_position(res,this.position)
return res}
$DefCtx.prototype.set_name=function(name){if(["None","True","False"].indexOf(name)>-1){raise_syntax_error(this,'(invalid function name)')}
var id_ctx=new $IdCtx(this,name)
this.name=name
this.id=this.scope.id+'_'+name
this.id=this.id.replace(/\./g,'_')
this.id+='_'+$B.UUID()
this.parent.node.id=this.id
this.parent.node.module=this.module}
$DefCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
if(C.name){raise_syntax_error(C)}
C.set_name(value)
return C
case '(':
if(C.name==null){raise_syntax_error(C,"missing name in function definition")}
C.has_args=true;
return new $FuncArgs(C)
case ')':
return C
case 'annotation':
return new $AbstractExprCtx(new $AnnotationCtx(C),true)
case ':':
if(C.has_args){return $BodyCtx(C)}else{raise_syntax_error(C,"missing function parameters")}
case 'eol':
if(C.has_args){raise_syntax_error(C,"missing colon")}}
raise_syntax_error(C)}
var $DelCtx=$B.parser.$DelCtx=function(C){
this.type='del'
this.parent=C
C.tree.push(this)
this.tree=[]
this.position=$token.value}
$DelCtx.prototype.ast=function(){var targets
if(this.tree[0].type=='list_or_tuple'){
targets=this.tree[0].tree.map(x=> x.ast())}else if(this.tree[0].type=='expr' &&
this.tree[0].tree[0].type=='list_or_tuple'){
targets=this.tree[0].tree[0].ast()
targets.ctx=new ast.Del()
for(var elt of targets.elts){elt.ctx=new ast.Del()}
var ast_obj=new ast.Delete([targets])
set_position(ast_obj,this.position)
return ast_obj}else{targets=[this.tree[0].tree[0].ast()]}
for(var target of targets){target.ctx=new ast.Del()}
var ast_obj=new ast.Delete(targets)
set_position(ast_obj,this.position)
return ast_obj}
$DelCtx.prototype.transition=function(token,value){var C=this
if(token=='eol'){check_assignment(this.tree[0],{action:'delete'})
return $transition(C.parent,token)}
raise_syntax_error(C)}
var DictCompCtx=function(C){
if(C.tree[0].type=='expr' &&
C.tree[0].tree[0].comprehension){
var comp=C.tree[0].tree[0]
comp.parent_block=this}
this.type='dictcomp'
this.position=$token.value
this.comprehension=true
this.parent=C.parent
this.key=C.tree[0]
this.value=C.tree[1]
this.key.parent=this
this.value.parent=this
this.tree=[]
this.id='dictcomp'+$B.UUID()
this.parent_block=$get_scope(C)
this.module=$get_module(C).module
C.parent.tree[C.parent.tree.length-1]=this
this.type='dictcomp'
Comprehension.make_comp(this,C)}
DictCompCtx.prototype.ast=function(){
var ast_obj=new ast.DictComp(
this.key.ast(),this.value.ast(),Comprehension.generators(this.tree)
)
set_position(ast_obj,this.position)
return ast_obj}
DictCompCtx.prototype.transition=function(token,value){var C=this
if(token=='}'){return this.parent}
raise_syntax_error(C)}
var $DictOrSetCtx=$B.parser.$DictOrSetCtx=function(C){
this.type='dict_or_set'
this.real='dict_or_set'
this.expect='id'
this.closed=false
this.start=$pos
this.position=$token.value
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this}
$DictOrSetCtx.prototype.ast=function(){
var ast_obj
if(this.real=='dict'){var keys=[],values=[]
for(var i=0,len=this.items.length;i < len;i++){if(this.items[i].packed){keys.push(_b_.None)
values.push(this.items[i].ast())}else{keys.push(this.items[i].ast())
values.push(this.items[i+1].ast())
i++}}
ast_obj=new ast.Dict(keys,values)}else if(this.real=='set'){var items=[]
for(var item of this.items){if(item.packed){var starred=new ast.Starred(item.ast(),new ast.Load())
set_position(starred,item.position)
items.push(starred)}else{items.push(item.ast())}}
ast_obj=new ast.Set(items)}
set_position(ast_obj,this.position)
return ast_obj}
$DictOrSetCtx.prototype.transition=function(token,value){var C=this
if(C.closed){switch(token){case '[':
return new $AbstractExprCtx(new $SubCtx(C.parent),false)
case '(':
return new $CallArgCtx(new $CallCtx(C.parent))}
return $transition(C.parent,token,value)}else{if(C.expect==','){switch(token){case '}':
switch(C.real){case 'dict_or_set':
if(C.tree.length !=1){break}
C.real='set' 
case 'set':
C.items=C.tree
C.tree=[]
C.closed=true
return C
case 'dict':
if($B.last(this.tree).type=='abstract_expr'){raise_syntax_error(C,"expression expected after dictionary key and ':'")}else if(C.nb_dict_items()% 2 !=0){raise_syntax_error(C,"':' expected after dictionary key")}
C.items=C.tree
C.tree=[]
C.closed=true
return C}
raise_syntax_error(C)
case ',':
if(C.real=='dict_or_set'){C.real='set'}
if(C.real=='dict' &&
C.nb_dict_items()% 2){raise_syntax_error(C,"':' expected after dictionary key")}
C.expect='id'
return C
case ':':
if(C.real=='dict_or_set'){C.real='dict'}
if(C.real=='dict'){C.expect='value'
C.value_pos=$token.value
return C}else{raise_syntax_error(C)}
case 'for':
if(C.real=="set" && C.tree.length > 1){$token.value=C.tree[0].position
raise_syntax_error(C,"did you forget "+
"parentheses around the comprehension target?")}
if(C.real=='dict_or_set'){return new $TargetListCtx(new $ForExpr(
new SetCompCtx(this)))}else{return new $TargetListCtx(new $ForExpr(
new DictCompCtx(this)))}}
raise_syntax_error(C)}else if(C.expect=='id'){switch(token){case '}':
if(C.tree.length==0){
C.items=[]
C.real='dict'}else{
C.items=C.tree}
C.tree=[]
C.closed=true
return C
case 'id':
case 'imaginary':
case 'int':
case 'float':
case 'str':
case 'JoinedStr':
case 'bytes':
case '[':
case '(':
case '{':
case '.':
case 'not':
case 'lambda':
C.expect=','
var expr=new $AbstractExprCtx(C,false)
return $transition(expr,token,value)
case 'op':
switch(value){case '*':
case '**':
C.expect=","
var expr=new $AbstractExprCtx(C,false)
expr.packed=value.length 
if(C.real=="dict_or_set"){C.real=value=="*" ? "set" :
"dict"}else if(
(C.real=="set" && value=="**")||
(C.real=="dict" && value=="*")){raise_syntax_error(C)}
return expr
case '+':
return C
case '-':
case '~':
C.expect=','
var left=new $UnaryCtx(C,value)
if(value=='-'){var op_expr=new $OpCtx(left,'unary_neg')}else if(value=='+'){var op_expr=new $OpCtx(left,'unary_pos')}else{var op_expr=new $OpCtx(left,'unary_inv')}
return new $AbstractExprCtx(op_expr,false)}
raise_syntax_error(C)}
raise_syntax_error(C)}else if(C.expect=='value'){try{C.expect=','
return $transition(new $AbstractExprCtx(C,false),token,value)}catch(err){$token.value=C.value_pos
raise_syntax_error(C,"expression expected after "+
"dictionary key and ':'")}}
return $transition(C.parent,token,value)}}
$DictOrSetCtx.prototype.nb_dict_items=function(){var nb=0
for(var item of this.tree){if(item.packed){nb+=2}else{nb++}}
return nb}
var $DoubleStarArgCtx=$B.parser.$DoubleStarArgCtx=function(C){
this.type='double_star_arg'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this}
$DoubleStarArgCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
case 'imaginary':
case 'int':
case 'float':
case 'str':
case 'JoinedStr':
case 'bytes':
case '[':
case '(':
case '{':
case '.':
case 'not':
case 'lambda':
return $transition(new $AbstractExprCtx(C,false),token,value)
case ',':
case ')':
return $transition(C.parent,token)
case ':':
if(C.parent.parent.type=='lambda'){return $transition(C.parent.parent,token)}}
raise_syntax_error(C)}
var $EllipsisCtx=$B.parser.$EllipsisCtx=function(C){
this.type='ellipsis'
this.parent=C
this.position=$token.value
C.tree[C.tree.length]=this}
$EllipsisCtx.prototype.ast=function(){var ast_obj=new ast.Constant({type:'ellipsis'})
set_position(ast_obj,this.position)
return ast_obj}
$EllipsisCtx.prototype.transition=function(token,value){var C=this
return $transition(C.parent,token,value)}
var $EndOfPositionalCtx=$B.parser.$EndOfConditionalCtx=function(C){
this.type="end_positional"
this.parent=C
C.has_end_positional=true
C.parent.pos_only=C.tree.length
C.tree.push(this)}
$EndOfPositionalCtx.prototype.transition=function(token,value){var C=this
if(token=="," ||token==")"){return $transition(C.parent,token,value)}
raise_syntax_error(C)}
var $ExceptCtx=$B.parser.$ExceptCtx=function(C){
this.type='except'
this.position=$token.value
this.parent=C
C.tree[C.tree.length]=this
this.tree=[]
this.expect='id'
this.scope=$get_scope(this)}
$ExceptCtx.prototype.ast=function(){
var ast_obj=new ast.ExceptHandler(
this.tree.length==1 ? this.tree[0].ast():undefined,this.has_alias ? this.tree[0].alias :undefined,ast_body(this.parent)
)
set_position(ast_obj,this.position)
return ast_obj}
$ExceptCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
case 'imaginary':
case 'int':
case 'float':
case 'str':
case 'JoinedStr':
case 'bytes':
case '[':
case '(':
case '{':
case 'not':
case 'lambda':
if(C.expect=='id'){C.expect='as'
return $transition(new $AbstractExprCtx(C,false),token,value)}
case 'as':
if(C.expect=='as' &&
C.has_alias===undefined){C.expect='alias'
C.has_alias=true
return C}
case 'id':
if(C.expect=='alias'){C.expect=':'
C.set_alias(value)
return C}
break
case ':':
var _ce=C.expect
if(_ce=='id' ||_ce=='as' ||_ce==':'){return $BodyCtx(C)}
break
case '(':
if(C.expect=='id' && C.tree.length==0){C.parenth=true
return C}
break
case ')':
if(C.expect==',' ||C.expect=='as'){C.expect='as'
return C}
case ',':
if(C.parenth !==undefined &&
C.has_alias===undefined &&
(C.expect=='as' ||C.expect==',')){C.expect='id'
return C}else if(C.parenth===undefined){raise_syntax_error(C,"multiple exception types must be parenthesized")}}
raise_syntax_error(C)}
$ExceptCtx.prototype.set_alias=function(alias){this.tree[0].alias=$mangle(alias,this)}
var $ExprCtx=$B.parser.$ExprCtx=function(C,name,with_commas){
this.type='expr'
this.name=name
this.$pos=$pos
this.position=$token.value 
this.with_commas=with_commas
this.expect=',' 
this.parent=C
if(C.packed){this.packed=C.packed}
this.tree=[]
C.tree[C.tree.length]=this}
$ExprCtx.prototype.ast=function(){var res=this.tree[0].ast()
if(this.packed){}else if(this.annotation){res=new ast.AnnAssign(
res,this.annotation.tree[0].ast(),undefined,1)}
set_position(res,this.position)
return res}
$ExprCtx.prototype.transition=function(token,value){var C=this
if(python_keywords.indexOf(token)>-1 &&
['as','else','if','for','from','in'].indexOf(token)==-1){C.$pos=$pos
raise_syntax_error(C)}
switch(token){case 'bytes':
case 'float':
case 'id':
case 'imaginary':
case 'int':
case 'lambda':
case 'pass':
case 'str':
case 'JoinedStr':
var msg='invalid syntax. Perhaps you forgot a comma?'
raise_syntax_error_known_range(C,this.position,$token.value,msg)
break
case '{':
if(C.tree[0].type !="id" ||
["print","exec"].indexOf(C.tree[0].value)==-1){raise_syntax_error(C)}
return new $DictOrSetCtx(C)
case '[':
case '(':
case '.':
case 'not':
if(C.expect=='expr'){C.expect=','
return $transition(new $AbstractExprCtx(C,false),token,value)}}
switch(token){case 'not':
if(C.expect==','){return new $ExprNot(C)}
break
case 'in':
if(C.parent.type=='target_list'){
return $transition(C.parent,token)}
if(C.expect==','){return $transition(C,'op','in')}
case ',':
if(C.expect==','){if(C.parent.type=='assign'){var assigned=C.parent.tree[0]
if(assigned.type=='expr' && assigned.tree[0].type=='id'){if(C.name=='unary' ||C.name=='operand'){var a=C.parent.tree[0].position,b=last_position(C)
raise_syntax_error_known_range(
C,a,b,"invalid syntax. "+
"Maybe you meant '==' or ':=' instead of '='?")}}}
if(C.name=='iterator' &&
C.parent.parent.type !='node'){
var for_expr=C.parent.parent
raise_syntax_error_known_range(C,first_position(for_expr),last_position(for_expr),'Generator expression must be parenthesized')}
if(C.with_commas ||
["assign","return"].indexOf(C.parent.type)>-1){if($parent_match(C,{type:"yield","from":true})){raise_syntax_error(C,"no implicit tuple for yield from")}
C.parent.tree.pop()
var tuple=new $ListOrTupleCtx(C.parent,'tuple')
tuple.implicit=true
tuple.has_comma=true
tuple.tree=[C]
C.parent=tuple
return tuple}}
return $transition(C.parent,token)
case '.':
return new $AttrCtx(C)
case '[':
if(C.tree[0].type=='id'){
delete C.tree[0].bound}
return new $AbstractExprCtx(new $SubCtx(C),true)
case '(':
return new $CallCtx(C)
case 'op':
var op_parent=C.parent,op=value
if(op_parent.type=='ternary' && op_parent.in_else){var new_op=new $OpCtx(C,op)
return new $AbstractExprCtx(new_op,false)}
var op1=C.parent,repl=null
while(1){if(op1.type=='unary' && op !=='**'){repl=op1
op1=op1.parent}else if(op1.type=='expr'){op1=op1.parent}else if(op1.type=='op' &&
$op_weight[op1.op]>=$op_weight[op]&&
!(op1.op=='**' && op=='**')){
repl=op1
op1=op1.parent}else if(op1.type=="not" &&
$op_weight['not']> $op_weight[op]){repl=op1
op1=op1.parent}else{break}}
if(repl===null){if(op1.type=='op'){
var right=op1.tree.pop(),expr=new $ExprCtx(op1,'operand',C.with_commas)
expr.tree.push(right)
right.parent=expr
var new_op=new $OpCtx(expr,op)
return new $AbstractExprCtx(new_op,false)}
var position=C.position
while(C.parent !==op1){C=C.parent
op_parent=C.parent}
C.parent.tree.pop()
var expr=new $ExprCtx(op_parent,'operand',C.with_commas)
expr.position=position
expr.expect=','
C.parent=expr
var new_op=new $OpCtx(C,op)
return new $AbstractExprCtx(new_op,false)}else{
if(op==='and' ||op==='or'){while(repl.parent.type=='not' ||
(repl.parent.type=='expr' &&
repl.parent.parent.type=='not')){
repl=repl.parent
op_parent=repl.parent}}}
if(repl.type=='op'){var _flag=false
switch(repl.op){case '<':
case '<=':
case '==':
case '!=':
case 'is':
case '>=':
case '>':
_flag=true}
if(_flag){switch(op){case '<':
case '<=':
case '==':
case '!=':
case 'is':
case '>=':
case '>':
case 'in':
case 'not_in':
repl.ops=repl.ops ||[repl.op]
repl.ops.push(op)
return new $AbstractExprCtx(repl,false)}}}
repl.parent.tree.pop()
var expr=new $ExprCtx(repl.parent,'operand',false)
expr.tree=[op1]
expr.position=op1.position
repl.parent=expr
var new_op=new $OpCtx(repl,op)
return new $AbstractExprCtx(new_op,false)
case 'augm_assign':
check_assignment(C,{augmented:true})
var parent=C
while(parent){if(parent.type=="assign" ||parent.type=="augm_assign"){raise_syntax_error(C,"augmented assignment inside assignment")}else if(parent.type=="op"){raise_syntax_error(C,"cannot assign to operator")}else if(parent.type=="list_or_tuple"){raise_syntax_error(C,`'${parent.real}' is an illegal`+
" expression for augmented assignment")}else if(['list','tuple'].indexOf(parent.name)>-1){raise_syntax_error(C,`'${parent.name}' is an illegal`+
" expression for augmented assignment")}else if(['dict_or_set'].indexOf(parent.name)>-1){raise_syntax_error(C,`'${parent.tree[0].real } display'`+
" is an illegal expression for augmented assignment")}
parent=parent.parent}
if(C.expect==','){return new $AbstractExprCtx(
new $AugmentedAssignCtx(C,value),true)}
return $transition(C.parent,token,value)
case ":":
if(C.parent.type=="sub" ||
(C.parent.type=="list_or_tuple" &&
C.parent.parent.type=="sub")){return new $AbstractExprCtx(new $SliceCtx(C.parent),false)}else if(C.parent.type=="slice"){return $transition(C.parent,token,value)}else if(C.parent.type=="node"){
if(C.tree.length==1){var child=C.tree[0]
check_assignment(child)
if(["id","sub","attribute"].indexOf(child.type)>-1){return new $AbstractExprCtx(new $AnnotationCtx(C),false)}else if(child.real=="tuple" && child.expect=="," &&
child.tree.length==1){return new $AbstractExprCtx(new $AnnotationCtx(child.tree[0]),false)}}
raise_syntax_error(C,"invalid target for annotation")}
break
case '=':
check_assignment(C)
function has_parent(ctx,type){
while(ctx.parent){if(ctx.parent.type==type){return ctx.parent}
ctx=ctx.parent}
return false}
var annotation
if(C.expect==','){if(C.parent.type=="call_arg"){
if(C.tree[0].type !="id"){raise_syntax_error(C,'expression cannot contain'+
' assignment, perhaps you meant "=="?')}
return new $AbstractExprCtx(new $KwArgCtx(C),true)}else if(annotation=has_parent(C,"annotation")){return $transition(annotation,token,value)}else if(C.parent.type=="op"){
raise_syntax_error(C,"cannot assign to operator")}else if(C.parent.type=="not"){
raise_syntax_error(C,"cannot assign to operator")}else if(C.parent.type=="with"){raise_syntax_error(C,"expected :")}else if(C.parent.type=="list_or_tuple"){
for(var i=0;i < C.parent.tree.length;i++){var item=C.parent.tree[i]
try{check_assignment(item,{once:true})}catch(err){console.log(C)
raise_syntax_error(C,"invalid syntax. "+
"Maybe you meant '==' or ':=' instead of '='?")}
if(item.type=="expr" && item.name=="operand"){raise_syntax_error(C,"cannot assign to operator")}}
if(C.parent.real=='list' ||
(C.parent.real=='tuple' &&
! C.parent.implicit)){raise_syntax_error(C,"invalid syntax. "+
"Maybe you meant '==' or ':=' instead of '='?")}}else if(C.parent.type=="expr" &&
C.parent.name=="iterator"){raise_syntax_error(C,'expected :')}else if(C.parent.type=="lambda"){if(C.parent.parent.parent.type !="node"){raise_syntax_error(C,'expression cannot contain'+
' assignment, perhaps you meant "=="?')}}else if(C.parent.type=='target_list'){raise_syntax_error(C,"(assign to target in iteration)")}
while(C.parent !==undefined){C=C.parent
if(C.type=="condition"){raise_syntax_error(C,"invalid syntax. Maybe you"+
" meant '==' or ':=' instead of '='?")}else if(C.type=="augm_assign"){raise_syntax_error(C,"(assignment inside augmented assignment)")}}
C=C.tree[0]
return new $AbstractExprCtx(new $AssignCtx(C),true)}
break
case ':=':
var ptype=C.parent.type
if(["node","assign","kwarg","annotation"].
indexOf(ptype)>-1){raise_syntax_error(C,'(:= invalid, parent '+ptype+')')}else if(ptype=="func_arg_id" &&
C.parent.tree.length > 0){
raise_syntax_error(C,'(:= invalid, parent '+ptype+')')}else if(ptype=="call_arg" &&
C.parent.parent.type=="call" &&
C.parent.parent.parent.type=="lambda"){
raise_syntax_error(C,'(:= invalid inside function arguments)' )}
if(C.tree.length==1 && C.tree[0].type=="id"){var scope=$get_scope(C),name=C.tree[0].value
if(['None','True','False'].indexOf(name)>-1){raise_syntax_error(C,`cannot use assignment expressions with ${name}`)}else if(name=='__debug__'){raise_syntax_error(C,'cannot assign to __debug__')}
while(scope.comprehension){scope=scope.parent_block}
return new $AbstractExprCtx(new NamedExprCtx(C),false)}
raise_syntax_error(C)
case 'if':
var in_comp=false,ctx=C.parent
while(ctx){if(ctx.comprehension){in_comp=true
break}else if(ctx.type=="list_or_tuple"){
break}else if(ctx.type=='comp_for'){break}else if(ctx.type=='comp_if'){
in_comp=true
break}else if(ctx.type=='call_arg' ||ctx.type=='sub'){
break}else if(ctx.type=='expr'){if(ctx.parent.type=='comp_iterable'){
in_comp=true
break}}
ctx=ctx.parent}
if(in_comp){break}
var ctx=C
while(ctx.parent &&
(ctx.parent.type=='op' ||
ctx.parent.type=='not' ||
ctx.parent.type=='unary' ||
(ctx.parent.type=="expr" && ctx.parent.name=="operand"))){ctx=ctx.parent}
return new $AbstractExprCtx(new $TernaryCtx(ctx),true)
case 'eol':
if(C.tree.length==2 &&
C.tree[0].type=="id" &&
["print","exec"].indexOf(C.tree[0].value)>-1){var func=C.tree[0].value
raise_syntax_error_known_range(C,C.position,$token.value,"Missing parentheses in call "+
`to '${func}'. Did you mean ${func}(...)?`)}
if(["dict_or_set","list_or_tuple","str"].indexOf(C.parent.type)==-1){var t=C.tree[0]
if(t.type=="packed"){$token.value=t.position
if($parent_match(C,{type:'del'})){raise_syntax_error(C,'cannot delete starred')}
raise_syntax_error(C,"cannot use starred expression here")}else if(t.type=="call" && t.func.type=="packed"){$token.value=t.func.position
raise_syntax_error(C,"cannot use starred expression here")}}}
return $transition(C.parent,token)}
var $ExprNot=$B.parser.$ExprNot=function(C){
this.type='expr_not'
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this}
$ExprNot.prototype.transition=function(token,value){var C=this
if(token=='in'){
C.parent.tree.pop()
var op1=C.parent
while(op1.type !=='expr'){op1=op1.parent}
return op1.transition('op','not_in')}
raise_syntax_error(C)}
var $ForExpr=$B.parser.$ForExpr=function(C){
if(C.node && C.node.parent.is_comp){
C.node.parent.first_for=this}
this.type='for'
this.parent=C
this.tree=[]
this.position=$token.value
C.tree.push(this)
this.scope=$get_scope(this)
this.module=this.scope.module}
$ForExpr.prototype.ast=function(){
var target=this.tree[0].ast(),iter=this.tree[1].ast(),orelse=this.orelse ? this.orelse.ast():[],type_comment,body=ast_body(this.parent)
set_ctx_to_store(target)
var klass=this.async ? ast.AsyncFor :ast.For
var res=new klass(target,iter,body,orelse,type_comment)
set_position(res,this.position)
return res}
$ForExpr.prototype.transition=function(token,value){var C=this
switch(token){case 'in':
if(C.tree[0].tree.length==0){
raise_syntax_error(C,"(missing target between 'for' and 'in')")}
return new $AbstractExprCtx(
new $ExprCtx(C,'iterator',true),false)
case ':':
if(C.tree.length < 2 
||C.tree[1].tree[0].type=="abstract_expr"){raise_syntax_error(C)}
return $BodyCtx(C)}
if(this.parent.comprehension){switch(token){case ']':
if(this.parent.type=='listcomp'){return $transition(this.parent,token,value)}
break
case ')':
if(this.parent.type=='genexpr'){return $transition(this.parent,token,value)}
break
case '}':
if(this.parent.type=='dictcomp' ||
this.parent.type=='setcomp'){return $transition(this.parent,token,value)}
break
case 'for':
return new $TargetListCtx(new $ForExpr(this.parent))
case 'if':
var if_ctx=new $ConditionCtx(this.parent,'if')
if_ctx.in_comp=true
return new $AbstractExprCtx(if_ctx,false)}}
console.log('-- error for, C',C,'token',token,value,$token.value)
raise_syntax_error(C)}
var $FromCtx=$B.parser.$FromCtx=function(C){
this.type='from'
this.parent=C
this.module=''
this.names=[]
this.position=$token.value
C.tree[C.tree.length]=this
this.expect='module'
this.scope=$get_scope(this)}
$FromCtx.prototype.ast=function(){
var module=this.module,level=0
while(module.length > 0 && module.startsWith('.')){level++
module=module.substr(1)}
var res={module:module ||undefined,names:[],level}
for(var name of this.names){if(Array.isArray(name)){res.names.push(new ast.alias(name[0],name[1]))}else{res.names.push(new ast.alias(name))}}
var ast_obj=new ast.ImportFrom(res.module,res.names,res.level)
set_position(ast_obj,this.position)
return ast_obj}
$FromCtx.prototype.add_name=function(name){this.names[this.names.length]=name
if(name=='*'){this.scope.blurred=true}
this.end_position=$token.value}
$FromCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
if(C.expect=='module'){C.module+=value
return C}else if(C.expect=='id'){C.add_name(value)
C.expect=','
return C}else if(C.expect=='alias'){C.names[C.names.length-1]=
[$B.last(C.names),value]
C.expect=','
return C}
break
case '.':
if(C.expect=='module'){if(token=='id'){C.module+=value}
else{C.module+='.'}
return C}
break
case 'ellipsis':
if(C.expect=='module'){C.module+='...'
return C}
break
case 'import':
if(C.names.length > 0){
raise_syntax_error(C,"only one 'import' allowed after 'from'")}
if(C.expect=='module'){C.expect='id'
return C}
case 'op':
if(value=='*' && C.expect=='id'
&& C.names.length==0){if($get_scope(C).ntype !=='module'){raise_syntax_error(C,"import * only allowed at module level")}
C.add_name('*')
C.expect='eol'
return C}
case ',':
if(C.expect==','){C.expect='id'
return C}
case 'eol':
switch(C.expect){case ',':
case 'eol':
if(C.module=="__future__"){var node=$get_node(C),docstring=false
for(var child of node.parent.children){if(child===node){break}else{if(child.C.tree && child.C.tree[0]&&
child.C.tree[0].type=="expr" &&
child.C.tree[0].tree[0].type=="str" &&
! docstring){docstring=true}else{raise_syntax_error_known_range(C,C.position,C.end_position,"from __future__ imports must occur"+
" at the beginning of the file")}}}}
return $transition(C.parent,token)
case 'id':
raise_syntax_error(C,'trailing comma not allowed without '+
'surrounding parentheses')
default:
raise_syntax_error(C)}
case 'as':
if(C.expect==',' ||C.expect=='eol'){C.expect='alias'
return C}
case '(':
if(C.expect=='id'){C.expect='id'
return C}
case ')':
if(C.expect==',' ||C.expect=='id'){C.expect='eol'
return C}}
raise_syntax_error(C)}
var $FuncArgs=$B.parser.$FuncArgs=function(C){
this.type='func_args'
this.parent=C
this.tree=[]
this.names=[]
C.tree[C.tree.length]=this
this.expect='id'
this.has_default=false
this.has_star_arg=false
this.has_kw_arg=false}
$FuncArgs.prototype.ast=function(){var args={posonlyargs:[],args:[],kwonlyargs:[],kw_defaults:[],defaults:[]},state='arg',default_value
for(var arg of this.tree){if(arg.type=='end_positional'){args.posonlyargs=args.args
args.args=[]}else if(arg.type=='func_star_arg'){state='kwonly'
if(arg.op=='*' && arg.name !='*'){args.vararg=new ast.arg(arg.name)
if(arg.position===undefined){console.log('pas de position',arg)
alert()}
set_position(args.vararg,arg.position)}else if(arg.op=='**'){args.kwarg=new ast.arg(arg.name)
set_position(args.kwarg,arg.position)}}else{default_value=false
if(arg.has_default){default_value=arg.tree[0].ast()}
var argument=new ast.arg(arg.name)
set_position(argument,arg.position,last_position(arg))
if(arg.annotation){argument.annotation=arg.annotation.tree[0].ast()}
if(state=='kwonly'){args.kwonlyargs.push(argument)
if(default_value){args.kw_defaults.push(default_value)}else{args.kw_defaults.push(_b_.None)}}else{args.args.push(argument)
if(default_value){args.defaults.push(default_value)}}}}
return new ast.arguments(args.posonlyargs,args.args,args.vararg,args.kwonlyargs,args.kw_defaults,args.kwarg,args.defaults)}
$FuncArgs.prototype.transition=function(token,value){var C=this
function check(){if(C.tree.length==0){return}
var last=$B.last(C.tree)
if(C.has_default && ! last.has_default){if(last.type=='func_star_arg' ||
last.type=='end_positional'){return}
if(C.names.indexOf('*')>-1){
return}
raise_syntax_error(C,'non-default argument follows default argument')}
if(last.has_default){C.has_default=true}}
switch(token){case 'id':
if(C.has_kw_arg){raise_syntax_error(C,'duplicate keyword argument')}
if(C.expect=='id'){C.expect=','
if(C.names.indexOf(value)>-1){raise_syntax_error(C,'duplicate argument '+value+
' in function definition')}}
return new $FuncArgIdCtx(C,value)
case ',':
if(C.expect==','){check()
C.expect='id'
return C}
raise_syntax_error(C)
case ')':
check()
var last=$B.last(C.tree)
if(last && last.type=="func_star_arg"){if(last.name=="*"){if(C.op=='*'){
raise_syntax_error(C,'named arguments must follow bare *')}else{raise_syntax_error(C)}}}
return $transition(C.parent,token,value)
case 'op':
if(C.has_kw_arg){raise_syntax_error(C,"(unpacking after '**' argument)")}
var op=value
C.expect=','
if(op=='*'){if(C.has_star_arg){raise_syntax_error(C,"(only one '*' argument allowed)")}
return new $FuncStarArgCtx(C,'*')}else if(op=='**'){return new $FuncStarArgCtx(C,'**')}else if(op=='/'){
if(C.has_end_positional){raise_syntax_error(C,'duplicate / in function parameters')}else if(C.has_star_arg){raise_syntax_error(C,'/ after * in function parameters')}
return new $EndOfPositionalCtx(C)}
raise_syntax_error(C)
case ':':
if(C.parent.type=="lambda"){return $transition(C.parent,token)}}
raise_syntax_error(C)}
var $FuncArgIdCtx=$B.parser.$FuncArgIdCtx=function(C,name){
this.type='func_arg_id'
if(["None","True","False"].indexOf(name)>-1){raise_syntax_error(C,`(invalid argument name '${name}')`)}
this.name=name
this.parent=C
this.position=$token.value
if(C.has_star_arg){C.parent.after_star.push(name)}else{C.parent.positional_list.push(name)}
this.tree=[]
C.tree[C.tree.length]=this
this.expect='='}
$FuncArgIdCtx.prototype.transition=function(token,value){var C=this
switch(token){case '=':
if(C.expect=='='){C.has_default=true
var def_ctx=C.parent.parent
if(C.parent.has_star_arg){def_ctx.default_list.push(def_ctx.after_star.pop())}else{def_ctx.default_list.push(def_ctx.positional_list.pop())}
return new $AbstractExprCtx(C,false)}
break
case ',':
case ')':
if(C.parent.has_default && C.tree.length==0 &&
C.parent.has_star_arg===undefined){$pos-=C.name.length
raise_syntax_error(C,'non-default argument follows default argument')}else{return $transition(C.parent,token)}
case ':':
if(C.parent.parent.type=="lambda"){
return $transition(C.parent.parent,":")}
if(C.has_default){
raise_syntax_error(C)}
return new $AbstractExprCtx(new $AnnotationCtx(C),false)}
raise_syntax_error(C)}
var $FuncStarArgCtx=$B.parser.$FuncStarArgCtx=function(C,op){
this.type='func_star_arg'
this.op=op
this.parent=C
this.node=$get_node(this)
this.position=$token.value
C.has_star_arg=op=='*'
C.has_kw_arg=op=='**'
C.tree[C.tree.length]=this}
$FuncStarArgCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
if(C.name===undefined){if(C.parent.names.indexOf(value)>-1){raise_syntax_error(C,'duplicate argument '+value+
' in function definition')}}
if(["None","True","False"].indexOf(value)>-1){raise_syntax_error(C,`(invalid starred argument name: '${value}')`)}
C.set_name(value)
C.parent.names.push(value)
return C
case ',':
case ')':
if(C.name===undefined){
C.set_name('*')
C.parent.names.push('*')}
return $transition(C.parent,token)
case ':':
if(C.parent.parent.type=="lambda"){
return $transition(C.parent.parent,":")}
if(C.name===undefined){raise_syntax_error(C,'(annotation on an unnamed parameter)')}
return new $AbstractExprCtx(
new $AnnotationCtx(C),false)}
raise_syntax_error(C)}
$FuncStarArgCtx.prototype.set_name=function(name){this.name=name
var ctx=this.parent
while(ctx.parent !==undefined){if(ctx.type=='def'){break}
ctx=ctx.parent}
if(this.op=='*'){ctx.other_args='"'+name+'"'}else{ctx.other_kw='"'+name+'"'}}
var GeneratorExpCtx=function(C){
this.type='genexpr'
this.tree=[C.tree[0]]
this.tree[0].parent=this
this.position=C.position
Comprehension.make_comp(this,C)}
GeneratorExpCtx.prototype.ast=function(){
var res=new ast.GeneratorExp(
this.tree[0].ast(),Comprehension.generators(this.tree.slice(1))
)
set_position(res,this.position)
return res}
GeneratorExpCtx.prototype.transition=function(token,value){var C=this
if(token==')'){if(this.parent.type=='call'){
if(C.parent.tree.length > 1){raise_syntax_error_known_range(C,first_position(C),last_position(C),'Generator expression must be parenthesized')}
return this.parent.parent}
return this.parent}
raise_syntax_error(C)}
var $GlobalCtx=$B.parser.$GlobalCtx=function(C){
this.type='global'
this.parent=C
this.tree=[]
this.position=$token.value
C.tree[C.tree.length]=this
this.expect='id'
this.scope=$get_scope(this)
this.module=$get_module(this)
if(this.module.module !=='<module>'){
while(this.module.module !=this.module.id){this.module=this.module.parent_block}}
this.$pos=$pos}
$GlobalCtx.prototype.ast=function(){
var ast_obj=new ast.Global(this.tree.map(item=> item.value))
set_position(ast_obj,this.position)
return ast_obj}
$GlobalCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
if(C.expect=='id'){new $IdCtx(C,value)
C.add(value)
C.expect=','
return C}
break
case ',':
if(C.expect==','){C.expect='id'
return C}
break
case 'eol':
if(C.expect==','){return $transition(C.parent,token)}
break}
raise_syntax_error(C)}
$GlobalCtx.prototype.add=function(name){if(this.scope.type=="module"){
return}
var mod=this.scope.parent_block
if(this.module.module.startsWith("$exec")){while(mod && mod.parent_block !==this.module){
mod._globals=mod._globals ||new Map()
mod._globals.set(name,this.module.id)
mod=mod.parent_block}}}
var $IdCtx=$B.parser.$IdCtx=function(C,value){
this.type='id'
this.value=value 
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
this.position=$token.value
var scope=this.scope=$get_scope(this)
this.blurred_scope=this.scope.blurred
if(["def","generator"].indexOf(scope.ntype)>-1){if((!(C instanceof $GlobalCtx))&&
!(C instanceof $NonlocalCtx)){scope.referenced=scope.referenced ||{}
if(! $B.builtins[this.value]){scope.referenced[this.value]=true}}}
if(C.parent.type=='call_arg'){this.call_arg=true}}
$IdCtx.prototype.ast=function(){var ast_obj
if(['True','False','None'].indexOf(this.value)>-1){ast_obj=new ast.Constant(_b_[this.value])}else{ast_obj=new ast.Name(this.value,this.bound ? new ast.Store():new ast.Load())}
set_position(ast_obj,this.position)
return ast_obj}
$IdCtx.prototype.transition=function(token,value){var C=this
if(C.value=='case' && C.parent.parent.type=="node"){
var start=C.parent.$pos,src=$get_module(this).src
try{var flag=line_ends_with_comma(src.substr(start))}catch(err){$pos=start+err.offset
raise_syntax_error(C,[err.message])}
if(flag){var node=$get_node(C),parent=node.parent
if((! node.parent)||!(node.parent.is_match)){raise_syntax_error(C,"('case' not inside 'match')")}else{if(node.parent.irrefutable){
var name=node.parent.irrefutable,msg=name=='_' ? 'wildcard' :
`name capture '${name}'`
raise_syntax_error(C,`${msg} makes remaining patterns unreachable`)}}
return $transition(new $PatternCtx(
new $CaseCtx(C.parent.parent)),token,value)}}else if(C.value=='match' && C.parent.parent.type=="node"){
var start=C.parent.$pos,src=$get_module(this).src,flag=line_ends_with_comma(src.substr(start))
if(flag){return $transition(new $AbstractExprCtx(
new $MatchCtx(C.parent.parent),true),token,value)}}
switch(token){case '=':
if(C.parent.type=='expr' &&
C.parent.parent !==undefined &&
C.parent.parent.type=='call_arg'){return new $AbstractExprCtx(
new $KwArgCtx(C.parent),false)}
return $transition(C.parent,token,value)
case '.':
delete this.bound
return $transition(C.parent,token,value)
case 'op':
return $transition(C.parent,token,value)
case 'id':
case 'str':
case 'JoinedStr':
case 'int':
case 'float':
case 'imaginary':
if(["print","exec"].indexOf(C.value)>-1 ){var f=C.value,msg=`Missing parentheses in call to '${f}'.`+
` Did you mean ${f}(...)?`}else{var msg='invalid syntax. Perhaps you forgot a comma?'}
raise_syntax_error_known_range(C,this.position,$token.value,msg)}
if(this.parent.parent.type=="packed"){if(['.','[','('].indexOf(token)==-1){return this.parent.parent.transition(token,value)}}
return $transition(C.parent,token,value)}
var $ImportCtx=$B.parser.$ImportCtx=function(C){
this.type='import'
this.parent=C
this.tree=[]
this.position=$token.value
C.tree[C.tree.length]=this
this.expect='id'}
$ImportCtx.prototype.ast=function(){
var names=[]
for(var item of this.tree){var alias=new ast.alias(item.name)
if(item.alias !=item.name){alias.asname=item.alias}
names.push(alias)}
var ast_obj=new ast.Import(names)
set_position(ast_obj,this.position)
return ast_obj}
$ImportCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
if(C.expect=='id'){new $ImportedModuleCtx(C,value)
C.expect=','
return C}
if(C.expect=='qual'){C.expect=','
C.tree[C.tree.length-1].name+=
'.'+value
C.tree[C.tree.length-1].alias+=
'.'+value
return C}
if(C.expect=='alias'){C.expect=','
C.tree[C.tree.length-1].alias=
value
return C}
break
case '.':
if(C.expect==','){C.expect='qual'
return C}
break
case ',':
if(C.expect==','){C.expect='id'
return C}
break
case 'as':
if(C.expect==','){C.expect='alias'
return C}
break
case 'eol':
if(C.expect==','){return $transition(C.parent,token)}
break}
raise_syntax_error(C)}
var $ImportedModuleCtx=$B.parser.$ImportedModuleCtx=function(C,name){this.type='imported module'
this.parent=C
this.name=name
this.alias=name
C.tree[C.tree.length]=this}
$ImportedModuleCtx.prototype.transition=function(token,value){var C=this}
var JoinedStrCtx=$B.parser.JoinedStrCtx=function(C,values){
this.type='JoinedStr'
this.parent=C
this.tree=[]
this.position=$token.value
this.scope=$get_scope(C)
var line_num=$get_node(C).line_num
for(var value of values){if(typeof value=="string"){new $StringCtx(this,"'"+
value.replace(new RegExp("'","g"),"\\"+"'")+"'")}else{if(value.format !==undefined){value.format=new JoinedStrCtx(this,value.format)
this.tree.pop()}
var src=value.expression.trimStart(),
save_pos=$pos,root=$create_root_node(src,this.scope.module,this.scope.id,this.scope.parent_block,line_num)
try{dispatch_tokens(root)}catch(err){err.args[1][1]+=line_num-1
var line_start=save_pos,source=$get_module(this).src
while(line_start--> 0 && source[line_start]!='\n'){}
err.args[1][2]+=value.start+save_pos-line_start
err.lineno+=line_num-1
err.args[1][3]=$get_module(this).src.split('\n')[line_num-1]
throw err}
$pos=save_pos
var expr=root.children[0].C.tree[0]
this.tree.push(expr)
expr.parent=this
expr.elt=value}}
C.tree.push(this)
this.raw=false
this.$pos=$pos}
JoinedStrCtx.prototype.ast=function(){var res={type:'JoinedStr',values:[]}
var state
for(var item of this.tree){if(item instanceof $StringCtx){if(state=='string'){
$B.last(res.values).value+=eval(item.value)}else{var item_ast=new ast.Constant(eval(item.value))
set_position(item_ast,item.position)
res.values.push(item_ast)}
state='string'}else{var conv_num={a:97,r:114,s:115},format=item.elt.format
format=format===undefined ? format :format.ast()
value=new ast.FormattedValue(
item.ast(),conv_num[item.elt.conversion]||-1,format)
set_position(value,this.position)
var format=item.format
if(format !==undefined){value.format=item.format.ast()}
res.values.push(value)
state='formatted_value'}}
var ast_obj=new ast.JoinedStr(res.values)
set_position(ast_obj,this.position)
return ast_obj}
JoinedStrCtx.prototype.transition=function(token,value){var C=this
switch(token){case '[':
return new $AbstractExprCtx(new $SubCtx(C.parent),false)
case '(':
C.parent.tree[0]=C
return new $CallCtx(C.parent)
case 'str':
if(C.tree.length > 0 &&
typeof $B.last(C.tree)=="string"){C.tree[C.tree.length-1]=
$B.last(C.tree)+eval(value)}else{new $StringCtx(this,value)}
return C
case 'JoinedStr':
var joined_expr=new JoinedStrCtx(C.parent,value)
C.parent.tree.pop()
if(C.tree.length > 0 &&
$B.last(C.tree)instanceof $StringCtx &&
joined_expr.tree[0]instanceof $StringCtx){
$B.last(C.tree).value+=' + '+joined_expr.tree[0].value
C.tree=C.tree.concat(joined_expr.tree.slice(1))}else{C.tree=C.tree.concat(joined_expr.tree)}
return C}
return $transition(C.parent,token,value)}
var $JSCode=$B.parser.$JSCode=function(js){this.js=js}
$JSCode.prototype.transition=function(token,value){var C=this}
var $KwArgCtx=$B.parser.$KwArgCtx=function(C){
this.type='kwarg'
this.parent=C.parent
this.position=first_position(C)
this.equal_sign_position=$token.value
this.tree=[C.tree[0]]
C.parent.tree.pop()
C.parent.tree.push(this)
C.parent.parent.has_kw=true
var value=this.tree[0].value
var ctx=C.parent.parent 
if(ctx.kwargs===undefined){ctx.kwargs=[value]}else if(ctx.kwargs.indexOf(value)==-1){ctx.kwargs.push(value)}else{raise_syntax_error(C,'keyword argument repeated')}}
$KwArgCtx.prototype.transition=function(token,value){var C=this
if(token==','){return new $CallArgCtx(C.parent.parent)}else if(token=='for'){
raise_syntax_error_known_range(C,C.position,C.equal_sign_position,"invalid syntax. "+
"Maybe you meant '==' or ':=' instead of '='?")}
return $transition(C.parent,token)}
var $LambdaCtx=$B.parser.$LambdaCtx=function(C){
this.type='lambda'
this.parent=C
C.tree[C.tree.length]=this
this.tree=[]
this.position=$token.value
this.args_start=$pos+6
this.node=$get_node(this)
this.positional_list=[]
this.default_list=[]
this.other_args=null
this.other_kw=null
this.after_star=[]}
$LambdaCtx.prototype.ast=function(){
var args
if(this.args.length==0){args=new ast.arguments([],[],undefined,[],[],undefined,[])}else{args=this.args[0].ast()}
var ast_obj=new ast.Lambda(args,this.tree[0].ast())
set_position(ast_obj,this.position)
return ast_obj}
$LambdaCtx.prototype.transition=function(token,value){var C=this
if(token==':' && C.args===undefined){C.args=C.tree
C.tree=[]
C.body_start=$pos
return new $AbstractExprCtx(C,false)}
if(C.args !==undefined){
C.body_end=$pos
return $transition(C.parent,token)}
if(C.args===undefined && token !="("){return $transition(new $FuncArgs(C),token,value)}
raise_syntax_error(C)}
var ListCompCtx=function(C){
this.type='listcomp'
this.tree=[C.tree[0]]
this.tree[0].parent=this
this.position=$token.value
Comprehension.make_comp(this,C)}
ListCompCtx.prototype.ast=function(){
var res=new ast.ListComp(
this.tree[0].ast(),Comprehension.generators(this.tree.slice(1)))
set_position(res,this.position)
return res}
ListCompCtx.prototype.transition=function(token,value){var C=this
if(token==']'){return this.parent}
raise_syntax_error(C)}
var $ListOrTupleCtx=$B.parser.$ListOrTupleCtx=function(C,real){
this.type='list_or_tuple'
this.start=$pos
this.real=real
this.expect='id'
this.closed=false
this.parent=C
this.tree=[]
this.position=$token.value
C.tree[C.tree.length]=this}
$ListOrTupleCtx.prototype.ast=function(){var elts=this.tree.map(x=> x.ast()),ast_obj
if(this.real=='list'){ast_obj=new ast.List(elts,new ast.Load())}else if(this.real=='tuple'){ast_obj=new ast.Tuple(elts,new ast.Load())}
set_position(ast_obj,this.position)
return ast_obj}
$ListOrTupleCtx.prototype.transition=function(token,value){var C=this
if(C.closed){if(token=='['){return new $AbstractExprCtx(
new $SubCtx(C.parent),false)}
if(token=='('){return new $CallCtx(C.parent)}
return $transition(C.parent,token,value)}else{if(C.expect==','){switch(C.real){case 'tuple':
if(token==')'){if(C.implicit){return $transition(C.parent,token,value)}
var close=true
if(C.tree.length==1){if($parent_match(C,{type:'del'})&&
C.tree[0].type=='expr' &&
C.tree[0].tree[0].type=='packed'){raise_syntax_error_known_range(C,C.tree[0].tree[0].position,last_position(C.tree[0]),'cannot use starred expression here')}
var grandparent=C.parent.parent
grandparent.tree.pop()
grandparent.tree.push(C.tree[0])
C.tree[0].parent=grandparent
return C.tree[0]}
if(C.packed ||
(C.type=='list_or_tuple' &&
C.tree.length==1 &&
C.tree[0].type=='expr' &&
C.tree[0].tree[0].type=='packed')){
raise_syntax_error(C,"cannot use starred expression here")}
if(close){C.close()}
if(C.parent.type=="packed"){return C.parent.parent}
return C.parent}
break
case 'list':
if(token==']'){C.close()
if(C.parent.type=="packed"){if(C.parent.tree.length > 0){return C.parent.tree[0]}else{return C.parent.parent}}
return C.parent}
break}
switch(token){case ',':
if(C.real=='tuple'){C.has_comma=true}
C.expect='id'
return C
case 'for':
if(C.real=='list'){if(this.tree.length > 1){
raise_syntax_error(C,"did you forget "+
"parentheses around the comprehension target?")}
return new $TargetListCtx(new $ForExpr(
new ListCompCtx(C)))}
else{return new $TargetListCtx(new $ForExpr(
new GeneratorExpCtx(C)))}}
return $transition(C.parent,token,value)}else if(C.expect=='id'){switch(C.real){case 'tuple':
if(token==')'){C.close()
return C.parent}
if(token=='eol' &&
C.implicit===true){C.close()
return $transition(C.parent,token)}
break
case 'list':
if(token==']'){C.close()
return C}
break}
switch(token){case '=':
if(C.real=='tuple' &&
C.implicit===true){C.close()
C.parent.tree.pop()
var expr=new $ExprCtx(C.parent,'tuple',false)
expr.tree=[C]
C.parent=expr
return $transition(C.parent,token)}
raise_syntax_error(C,"(unexpected '=' inside list)")
break
case ')':
break
case ']':
if(C.real=='tuple' &&
C.implicit===true){
return $transition(C.parent,token,value)}else{break}
raise_syntax_error(C,'(unexpected "if" inside list)')
case ',':
raise_syntax_error(C,'(unexpected comma inside list)')
case 'str':
case 'JoinedStr':
case 'int':
case 'float':
case 'imaginary':
case 'ellipsis':
case 'lambda':
case 'yield':
case 'id':
case '(':
case '[':
case '{':
case 'await':
case 'not':
case ':':
C.expect=','
var expr=new $AbstractExprCtx(C,false)
return $transition(expr,token,value)
case 'op':
if('+-~*'.indexOf(value)>-1 ||value=='**'){C.expect=','
var expr=new $AbstractExprCtx(C,false)
return $transition(expr,token,value)}
raise_syntax_error(C,`(unexpected operator: ${value})`)
default:
raise_syntax_error(C)}}else{return $transition(C.parent,token,value)}}}
$ListOrTupleCtx.prototype.close=function(){this.closed=true
this.src=$get_module(this).src
for(var i=0,len=this.tree.length;i < len;i++){
var elt=this.tree[i]
if(elt.type=="expr" &&
elt.tree[0].type=="list_or_tuple" &&
elt.tree[0].real=="tuple" &&
elt.tree[0].tree.length==1 &&
elt.tree[0].expect==","){this.tree[i]=elt.tree[0].tree[0]
this.tree[i].parent=this}}}
var $MatchCtx=$B.parser.$MatchCtx=function(node_ctx){
this.type="match"
this.position=$token.value
node_ctx.tree=[this]
node_ctx.node.is_match=true
this.parent=node_ctx
this.tree=[]
this.expect='as'}
$MatchCtx.prototype.ast=function(){
var res=new ast.Match(this.tree[0].ast(),ast_body(this.parent))
set_position(res,this.position)
res.$line_num=$get_node(this).line_num
return res}
$MatchCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'as':
return new $AbstractExprCtx(new $AliasCtx(C))
case ':':
if(this.tree[0].type=='list_or_tuple'){remove_abstract_expr(this.tree[0].tree)}
switch(C.expect){case 'id':
case 'as':
case ':':
return $BodyCtx(C)}
break}}
var NamedExprCtx=function(C){
this.type='named_expr'
this.position=C.position
this.target=C.tree[0]
C.tree.pop()
C.tree.push(this)
this.parent=C
this.target.parent=this
this.tree=[]
this.$pos=$pos
if(C.parent.type=='list_or_tuple' &&
C.parent.real=='tuple'){
this.parenthesized=true}}
NamedExprCtx.prototype.ast=function(){var res=new ast.NamedExpr(this.target.ast(),this.tree[0].ast())
res.target.ctx=new ast.Store()
set_position(res,this.position)
return res}
NamedExprCtx.prototype.transition=function(token,value){return $transition(this.parent,token,value)}
var $NodeCtx=$B.parser.$NodeCtx=function(node){
this.node=node
node.C=this
this.tree=[]
this.type='node'
var scope=null
var tree_node=node
while(tree_node.parent && tree_node.parent.type !='module'){var ntype=tree_node.parent.C.tree[0].type,_break_flag=false
switch(ntype){case 'def':
case 'class':
case 'generator':
scope=tree_node.parent
_break_flag=true}
if(_break_flag){break}
tree_node=tree_node.parent}
if(scope===null){scope=tree_node.parent ||tree_node }
this.scope=scope}
$NodeCtx.prototype.transition=function(token,value){var C=this
if(this.node.parent && this.node.parent.C){var pctx=this.node.parent.C
if(pctx.tree && pctx.tree.length==1 &&
pctx.tree[0].type=="match"){if(token !='eol' &&(token !=='id' ||value !=='case')){C.$pos=$pos
raise_syntax_error(C,'line does not start with "case"')}}}
if(this.tree.length==0 && this.node.parent){var rank=this.node.parent.children.indexOf(this.node)
if(rank > 0){var previous=this.node.parent.children[rank-1]
if(previous.C.tree[0].type=='try' &&
['except','finally'].indexOf(token)==-1){raise_syntax_error(C,"expected 'except' or 'finally' block")}}}
switch(token){case ',':
if(C.tree && C.tree.length==0){raise_syntax_error(C)}
var first=C.tree[0]
C.tree=[]
var implicit_tuple=new $ListOrTupleCtx(C)
implicit_tuple.real="tuple"
implicit_tuple.implicit=0
implicit_tuple.tree.push(first)
first.parent=implicit_tuple
return implicit_tuple
case '[':
case '(':
case '{':
case '.':
case 'bytes':
case 'float':
case 'id':
case 'imaginary':
case 'int':
case 'str':
case 'JoinedStr':
case 'not':
case 'lambda':
var expr=new $AbstractExprCtx(C,true)
return $transition(expr,token,value)
case 'assert':
return new $AbstractExprCtx(
new $AssertCtx(C),false,true)
case 'async':
return new $AsyncCtx(C)
case 'await':
return new $AbstractExprCtx(new $AwaitCtx(C),true)
case 'break':
return new $BreakCtx(C)
case 'class':
return new $ClassCtx(C)
case 'continue':
return new $ContinueCtx(C)
case '__debugger__':
return new $DebuggerCtx(C)
case 'def':
return new $DefCtx(C)
case 'del':
return new $AbstractExprCtx(new $DelCtx(C),true)
case 'elif':
try{var previous=$previous(C)}catch(err){raise_syntax_error(C,"('elif' does not follow 'if')")}
if(['condition'].indexOf(previous.type)==-1 ||
previous.token=='while'){raise_syntax_error(C,`(elif after ${previous.type})`)}
return new $AbstractExprCtx(
new $ConditionCtx(C,token),false)
case 'ellipsis':
var expr=new $AbstractExprCtx(C,true)
return $transition(expr,token,value)
case 'else':
var previous=$previous(C)
if(['condition','except','for'].
indexOf(previous.type)==-1){raise_syntax_error(C,`(else after ${previous.type})`)}
return new $SingleKwCtx(C,token)
case 'except':
var previous=$previous(C)
if(['try','except'].indexOf(previous.type)==-1){raise_syntax_error(C,`(except after ${previous.type})`)}
return new $ExceptCtx(C)
case 'finally':
var previous=$previous(C)
if(['try','except'].indexOf(previous.type)==-1 &&
(previous.type !='single_kw' ||
previous.token !='else')){raise_syntax_error(C,`finally after ${previous.type})`)}
return new $SingleKwCtx(C,token)
case 'for':
return new $TargetListCtx(new $ForExpr(C))
case 'from':
return new $FromCtx(C)
case 'global':
return new $GlobalCtx(C)
case 'if':
case 'while':
return new $AbstractExprCtx(
new $ConditionCtx(C,token),false)
case 'import':
return new $ImportCtx(C)
case 'lambda':
return new $LambdaCtx(C)
case 'nonlocal':
return new $NonlocalCtx(C)
case 'op':
switch(value){case '*':
var expr=new $AbstractExprCtx(C,true)
return $transition(expr,token,value)
case '+':
case '-':
case '~':
C.position=$token.value
var expr=new $ExprCtx(C,'unary',true)
return new $AbstractExprCtx(
new $UnaryCtx(expr,value),false)
case '@':
return new $DecoratorCtx(C)}
break
case 'pass':
return new $PassCtx(C)
case 'raise':
return new $AbstractExprCtx(new $RaiseCtx(C),true)
case 'return':
return new $AbstractExprCtx(new $ReturnCtx(C),true)
case 'try':
return new $TryCtx(C)
case 'with':
return new $AbstractExprCtx(new $WithCtx(C),false)
case 'yield':
return new $AbstractExprCtx(new $YieldCtx(C),true)
case 'eol':
if(C.tree.length==0){
C.node.parent.children.pop()
return C.node.parent.C}
return C}
console.log('token',token,value)
raise_syntax_error(C)}
var $NonlocalCtx=$B.parser.$NonlocalCtx=function(C){
this.type='nonlocal'
this.parent=C
this.tree=[]
this.position=$token.value
this.names={}
C.tree[C.tree.length]=this
this.expect='id'
this.scope=$get_scope(this)
this.scope.nonlocals=this.scope.nonlocals ||new Set()}
$NonlocalCtx.prototype.ast=function(){
var ast_obj=new ast.Nonlocal(this.tree.map(item=> item.value))
set_position(ast_obj,this.position)
return ast_obj}
$NonlocalCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
if(C.expect=='id'){new $IdCtx(C,value)
this.names[value]=[false,$pos]
C.expect=','
return C}
break
case ',':
if(C.expect==','){C.expect='id'
return C}
break
case 'eol':
if(C.expect==','){return $transition(C.parent,token)}
break}
raise_syntax_error(C)}
var $NotCtx=$B.parser.$NotCtx=function(C){
this.type='not'
this.parent=C
this.tree=[]
this.position=$token.value
C.tree[C.tree.length]=this}
$NotCtx.prototype.ast=function(){var ast_obj=new ast.UnaryOp(new ast.Not(),this.tree[0].ast())
set_position(ast_obj,this.position)
return ast_obj}
$NotCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'in':
C.parent.parent.tree.pop()
return new $ExprCtx(new $OpCtx(C.parent,'not_in'),'op',false)
case 'id':
case 'imaginary':
case 'int':
case 'float':
case 'str':
case 'JoinedStr':
case 'bytes':
case '[':
case '(':
case '{':
case '.':
case 'not':
case 'lambda':
var expr=new $AbstractExprCtx(C,false)
return $transition(expr,token,value)
case 'op':
var a=value
if('+'==a ||'-'==a ||'~'==a){var expr=new $AbstractExprCtx(C,false)
return $transition(expr,token,value)}}
return $transition(C.parent,token)}
var $NumberCtx=$B.parser.$NumberCtx=function(type,C,value){
this.type=type
this.value=value
this.parent=C
this.tree=[]
this.position=$token.value
C.tree[C.tree.length]=this}
$NumberCtx.prototype.ast=function(){var ast_obj=new ast.Constant({type:this.type,value:this.value})
set_position(ast_obj,this.position)
return ast_obj}
$NumberCtx.prototype.transition=function(token,value){var C=this
if(token=='id' && value=='_'){raise_syntax_error(C,'invalid decimal literal')}
return $transition(C.parent,token,value)}
var $OpCtx=$B.parser.$OpCtx=function(C,op){
this.type='op'
this.op=op
this.parent=C.parent
this.position=$token.value
this.tree=[C]
this.scope=$get_scope(this)
if(C.type=="expr"){if(['int','float','str'].indexOf(C.tree[0].type)>-1){this.left_type=C.tree[0].type}}
C.parent.tree.pop()
C.parent.tree.push(this)}
$OpCtx.prototype.ast=function(){
var ast_type_class=op2ast_class[this.op],op_type=ast_type_class[0],ast_class=ast_type_class[1],ast_obj
if(op_type===ast.Compare){var left=this.tree[0].ast(),ops=[new ast_class()]
if(this.ops){for(var op of this.ops.slice(1)){ops.push(new op2ast_class[op][1]())}
ast_obj=new ast.Compare(left,ops,this.tree.slice(1).map(x=> x.ast()))}else{ast_obj=new ast.Compare(left,ops,[this.tree[1].ast()])}}else if(op_type===ast.UnaryOp){ast_obj=new op_type(new ast_class(),this.tree[1].ast())}else if(op_type===ast.BoolOp){
var values=[this.tree[1]],main_op=this.op,ctx=this
while(ctx.tree[0].type=='op' && ctx.tree[0].op==main_op){values.splice(0,0,ctx.tree[0].tree[1])
ctx=ctx.tree[0]}
values.splice(0,0,ctx.tree[0])
ast_obj=new op_type(new ast_class(),values.map(x=> x.ast()))}else{ast_obj=new op_type(
this.tree[0].ast(),new ast_class(),this.tree[1].ast())}
set_position(ast_obj,this.position)
return ast_obj}
$OpCtx.prototype.transition=function(token,value){var C=this
if(C.op===undefined){console.log('C has no op',C)
raise_syntax_error(C)}
switch(token){case 'id':
case 'imaginary':
case 'int':
case 'float':
case 'str':
case 'JoinedStr':
case 'bytes':
case '[':
case '(':
case '{':
case '.':
case 'not':
case 'lambda':
return $transition(new $AbstractExprCtx(C,false),token,value)
case 'op':
switch(value){case '+':
case '-':
case '~':
return new $UnaryCtx(C,value)}
default:
if(C.tree[C.tree.length-1].type==
'abstract_expr'){raise_syntax_error(C)}}
return $transition(C.parent,token)}
var $PackedCtx=$B.parser.$PackedCtx=function(C){
this.type='packed'
this.position=C.position
if(C.parent.type=='list_or_tuple' &&
C.parent.parent.type=="node"){
for(var i=0;i < C.parent.tree.length;i++){var child=C.parent.tree[i]
if(child.type=='expr' && child.tree.length > 0
&& child.tree[0].type=='packed'){raise_syntax_error(C,"two starred expressions in assignment")}}}
this.parent=C
this.tree=[]
this.pos=$pos-1 
C.tree[C.tree.length]=this}
$PackedCtx.prototype.ast=function(){var ast_obj=new ast.Starred(this.tree[0].ast(),new ast.Load())
set_position(ast_obj,this.position)
return ast_obj}
$PackedCtx.prototype.transition=function(token,value){var C=this
if(C.tree.length > 0 && token=="["){
return $transition(C.tree[0],token,value)}
switch(token){case 'id':
var expr=new $AbstractExprCtx(C,false)
expr.packed=true
C.parent.expect=','
var id=$transition(expr,token,value)
return id
case "[":
C.parent.expect=','
return new $ListOrTupleCtx(C,"list")
case "(":
C.parent.expect=','
return new $ListOrTupleCtx(C,"tuple")
case 'str':
C.parent.expect=","
return new $StringCtx(C,value)
case 'JoinedStr':
C.parent.expect=","
return new JoinedStrCtx(C,value)
case "]":
return $transition(C.parent,token,value)
case "{":
C.parent.expect=','
return new $DictOrSetCtx(C)
case 'op':
switch(value){case '+':
case '-':
case '~':
C.parent.expect=','
return new $UnaryCtx(C,value)
default:
raise_syntax_error(C,"can't use starred expression here")}}
return C.parent.transition(token,C)}
var $PassCtx=$B.parser.$PassCtx=function(C){
this.type='pass'
this.parent=C
this.tree=[]
this.position=$token.value
C.tree[C.tree.length]=this}
$PassCtx.prototype.ast=function(){var ast_obj=new ast.Pass()
set_position(ast_obj,this.position)
return ast_obj}
$PassCtx.prototype.transition=function(token,value){var C=this
if(token=='eol'){return C.parent}
raise_syntax_error(C)}
var $PatternCtx=$B.parser.$PatternCtx=function(C){
this.type="pattern"
this.parent=C
this.tree=[]
C.tree.push(this)
this.expect='id'}
$PatternCtx.prototype.transition=function(token,value){var C=this
switch(C.expect){case 'id':
switch(token){case 'str':
case 'int':
case 'float':
case 'imaginary':
C.expect=','
return new $PatternLiteralCtx(C,token,value)
case 'op':
switch(value){case '-':
case '+':
C.expect=','
return new $PatternLiteralCtx(C,{sign:value})
case '*':
C.expect='starred_id'
return C
default:
raise_syntax_error(C)}
case 'id':
C.expect=','
if(['None','True','False'].indexOf(value)>-1){return new $PatternLiteralCtx(C,token,value)}else{return new $PatternCaptureCtx(C,value)}
break
case '[':
return new $PatternCtx(
new $PatternSequenceCtx(C.parent,token))
case '(':
return new $PatternCtx(
new $PatternGroupCtx(C.parent,token))
case '{':
return new $PatternMappingCtx(C.parent,token)
case 'JoinedStr':
raise_syntax_error(C,"patterns may only match "+
"literals and attribute lookups")}
break
case 'starred_id':
if(token=='id'){var capture=new $PatternCaptureCtx(C,value)
capture.starred=true
return capture}
raise_syntax_error(C,"(expected id after '*')")
case 'number':
switch(token){case 'int':
case 'float':
case 'imaginary':
C.expect=','
return new $PatternLiteralCtx(C,token,value,C.sign)
default:
raise_syntax_error(C)}
case ',':
switch(token){case ',':
if(C.parent instanceof $PatternSequenceCtx){return new $PatternCtx(C.parent)}
return new $PatternCtx(
new $PatternSequenceCtx(C.parent))
case ':':
return $BodyCtx(C)}}
return C.parent.transition(token,value)}
function as_pattern(C,token,value){
if(C.expect=='as'){if(token=='as'){C.expect='alias'
return C}else{return $transition(C.parent,token,value)}}else if(C.expect=='alias'){if(token=='id'){if(value=='_'){raise_syntax_error(C,"alias cannot be _")}
if(C.bindings().indexOf(value)>-1){raise_syntax_error(C,`multiple assignments to name '${value}' in pattern`)}
C.alias=value
return C.parent}else{raise_syntax_error(C,'(bad alias)')}}}
var $PatternCaptureCtx=function(C,value){
this.type="capture_pattern"
this.parent=C.parent
C.parent.tree.pop()
C.parent.tree.push(this)
this.tree=[value]
this.position=$token.value
this.expect='.'
this.$pos=$pos}
$PatternCaptureCtx.prototype.ast=function(){var ast_obj
try{if(this.tree.length > 1){var pattern=new ast.Name(this.tree[0].value,new ast.Load())
set_position(pattern,this.position)
for(var i=1;i < this.tree.length;i+=2){pattern=new ast.Attribute(pattern,this.tree[i],new ast.Load())
copy_position(pattern,pattern.value)}
pattern=new ast.MatchValue(pattern)
copy_position(pattern,pattern.value)}else if(this.starred){var v=this.tree[0]
if(v=='_'){ast_obj=new ast.MatchStar()}else{ast_obj=new ast.MatchStar(v)}
set_position(ast_obj,this.position)}else{var pattern=this.tree[0]
if(typeof pattern=='string'){}else if(pattern.type=='group_pattern'){pattern=pattern.ast()}else{console.log('bizarre',pattern)
pattern=$NumberCtx.prototype.ast.bind(this)()}
if(pattern=='_'){pattern=new ast.MatchAs()
set_position(pattern,this.position)}}
if(this.alias){if(typeof pattern=="string"){pattern=new ast.MatchAs(undefined,pattern)
set_position(pattern,this.position)}
ast_obj=new ast.MatchAs(pattern,this.alias)}else if(this.tree.length > 1 ||pattern instanceof ast.MatchAs){ast_obj=pattern}else if(typeof pattern=='string'){ast_obj=new ast.MatchAs(undefined,pattern)}else if(! this.starred){ast_obj=new ast.MatchAs(undefined,pattern)}
set_position(ast_obj,this.position)
return ast_obj}catch(err){console.log('error capture ast')
show_line(this)
throw err}}
$PatternCaptureCtx.prototype.bindings=function(){var bindings=this.tree[0]=='_' ?[]:this.tree.slice()
if(this.alias){bindings.push(this.alias)}
return bindings}
$PatternCaptureCtx.prototype.transition=function(token,value){var C=this
switch(C.expect){case '.':
if(token=='.'){C.type="value_pattern"
C.expect='id'
if(C.tree.length==1){
new $IdCtx(C,C.tree.pop())}else{C.tree.push('.')}
return C}else if(token=='('){
return new $PatternCtx(new $PatternClassCtx(C))}else if(C.parent instanceof $PatternMappingCtx){return C.parent.transition(token,value)}else{C.expect='as'
return C.transition(token,value)}
case 'as':
case 'alias':
var res=as_pattern(C,token,value)
return res
case 'id':
if(token=='id'){C.tree.push(value)
C.expect='.'
return C}}
return $transition(C.parent,token,value)}
$PatternClassCtx=function(C){this.type="class_pattern"
this.tree=[]
this.parent=C.parent
this.position=$token.value
this.class_id=new $IdCtx(C,C.tree[0])
C.tree.pop()
this.attrs=C.tree.slice(2)
C.parent.tree.pop()
C.parent.tree.push(this)
this.expect=','
this.keywords=[]
this.positionals=[]
this.bound_names=[]}
$PatternClassCtx.prototype.ast=function(){
var cls=new ast.Name(this.class_id.value)
set_position(cls,this.position)
cls.ctx=new ast.Load()
var patterns=[],kwd_attrs=[],kwd_patterns=[]
for(var item of this.tree){if(item.is_keyword){kwd_attrs.push(item.tree[0])
kwd_patterns.push(item.tree[1].ast())}else{try{patterns.push(item.ast())}catch(err){console.log('error in class pattern item')
show_line(this)
throw err}}}
var ast_obj=new ast.MatchClass(cls,patterns,kwd_attrs,kwd_patterns)
set_position(ast_obj,this.position)
if(this.alias){ast_obj=new ast.MatchAs(ast_obj,this.alias)
set_position(ast_obj,this.position)}
return ast_obj}
$PatternClassCtx.prototype.bindings=function(){var bindings=this.bound_names
if(this.alias){bindings.push(this.alias)}
return bindings}
$PatternClassCtx.prototype.transition=function(token,value){var C=this
function check_last_arg(){var last=$B.last(C.tree),bound
if(last instanceof $PatternCaptureCtx){if(! last.is_keyword &&
C.keywords.length > 0){raise_syntax_error(C,'(positional argument after keyword)')}
if(last.is_keyword){if(C.keywords.indexOf(last.tree[0])>-1){raise_syntax_error(C,`keyword argument repeated: ${last.tree[0]}`)}
C.keywords.push(last.tree[0])
bound=last.tree[1].bindings()}else{bound=last.bindings()}
for(var b of bound){if(C.bound_names.indexOf(b)>-1){raise_syntax_error(C,'multiple assignments '+
`to name '${b}' in pattern`)}}
C.bound_names=C.bound_names.concat(bound)}}
switch(this.expect){case ',':
switch(token){case '=':
var current=$B.last(this.tree)
if(current instanceof $PatternCaptureCtx){
if(this.keywords.indexOf(current.tree[0])>-1){raise_syntax_error(C,'attribute name repeated in class pattern: '+
current.tree[0])}
current.is_keyword=true
return new $PatternCtx(current)}
raise_syntax_error(this,"'=' after non-capture")
case ',':
check_last_arg()
return new $PatternCtx(this)
case ')':
check_last_arg()
if($B.last(this.tree).tree.length==0){this.tree.pop()}
C.expect='as'
return C
default:
raise_syntax_error(C)}
case 'as':
case 'alias':
return as_pattern(C,token,value)}
return $transition(C.parent,token,value)}
var $PatternGroupCtx=function(C){
this.type="group_pattern"
this.parent=C
this.position=$token.value
this.tree=[]
var first_pattern=C.tree.pop()
this.expect=',|'
C.tree.push(this)}
function remove_empty_pattern(C){var last=$B.last(C.tree)
if(last && last instanceof $PatternCtx &&
last.tree.length==0){C.tree.pop()}}
$PatternGroupCtx.prototype.ast=function(){var ast_obj
if(this.tree.length==1 && ! this.has_comma){ast_obj=this.tree[0].ast()}else{ast_obj=$PatternSequenceCtx.prototype.ast.bind(this)()}
if(this.alias){ast_obj=new ast.MatchAs(ast_obj,this.alias)}
set_position(ast_obj,this.position)
return ast_obj}
$PatternGroupCtx.prototype.bindings=function(){var bindings=[]
for(var item of this.tree){bindings=bindings.concat(item.bindings())}
if(this.alias){bindings.push(this.alias)}
return bindings}
$PatternGroupCtx.prototype.transition=function(token,value){var C=this
switch(C.expect){case ',|':
if(token==")"){
remove_empty_pattern(C)
C.expect='as'
return C}else if(token==','){C.expect='id'
C.has_comma=true
return C}else if(token=='op' && value=='|'){var opctx=new $PatternOrCtx(C.parent)
opctx.parenthese=true
return new $PatternCtx(opctx)}else if(this.token===undefined){return $transition(C.parent,token,value)}
raise_syntax_error(C)
case 'as':
case 'alias':
return as_pattern(C,token,value)
case 'id':
if(token==')'){
remove_empty_pattern(C)
C.expect='as'
return C}
C.expect=',|'
return $transition(new $PatternCtx(C),token,value)}
raise_syntax_error(C)}
var $PatternLiteralCtx=function(C,token,value,sign){
this.type="literal_pattern"
this.parent=C.parent
this.position=$token.value
C.parent.tree.pop()
C.parent.tree.push(this)
if(token.sign){this.tree=[{sign:token.sign}]
this.expect='number'}else{if(token=='str'){this.tree=[]
new $StringCtx(this,value)}else if(token=='JoinedStr'){raise_syntax_error(this,"patterns cannot include f-strings")}else{this.tree=[{type:token,value,sign}]}
this.expect='op'}}
$PatternLiteralCtx.prototype.ast=function(){var lineno=$get_node(this).line_num
try{var first=this.tree[0],result
if(first.type=='str'){var v=$StringCtx.prototype.ast.bind(first)()
result=new ast.MatchValue(v)}else if(first.type=='id'){result=new ast.MatchSingleton(_b_[first.value])}else{first.position=this.position
var num=$NumberCtx.prototype.ast.bind(first)(),res=new ast.MatchValue(num)
if(first.sign && first.sign !='+'){var op={'+':ast.UAdd,'-':ast.USub,'~':ast.Invert}[first.sign]
var unary_op=new ast.UnaryOp(new op(),res.value)
set_position(unary_op,this.position)
res=new ast.MatchValue(unary_op)
set_position(res,this.position)}
if(this.tree.length==1){result=res}else{this.tree[2].position=this.position
var num2=$NumberCtx.prototype.ast.bind(this.tree[2])(),binop=new ast.BinOp(res.value,this.tree[1]=='+' ? new ast.Add():new ast.Sub(),num2)
set_position(binop,this.position)
result=new ast.MatchValue(binop)}}
set_position(result,this.position)
if(this.tree.length==2){
result=new ast.MatchValue(new ast.BinOp(
this.tree[0].ast(),C.num_sign=='+' ? ast.Add :ast.Sub,this.tree[1].ast()))}
if(this.alias){result=new ast.MatchAs(result,this.alias)}
set_position(result,this.position)
return result}catch(err){show_line(this)
throw err}}
$PatternLiteralCtx.prototype.bindings=function(){if(this.alias){return[this.alias]}
return[]}
$PatternLiteralCtx.prototype.transition=function(token,value){var C=this
switch(C.expect){case 'op':
if(token=="op"){switch(value){case '+':
case '-':
if(['int','float'].indexOf(C.tree[0].type)>-1){C.expect='imaginary'
this.tree.push(value)
C.num_sign=value
return C}
raise_syntax_error(C,'patterns cannot include operators')
default:
return $transition(C.parent,token,value)}}
break
case 'number':
switch(token){case 'int':
case 'float':
case 'imaginary':
var last=$B.last(C.tree)
if(this.tree.token===undefined){
last.type=token
last.value=value
C.expect='op'
return C}
default:
raise_syntax_error(C)}
case 'imaginary':
switch(token){case 'imaginary':
C.tree.push({type:token,value,sign:C.num_sign})
return C.parent
default:
raise_syntax_error(C,'(expected imaginary)')}
case 'as':
case 'alias':
return as_pattern(C,token,value)}
if(token=='as' && C.tree.length==1){C.expect='as'
return C.transition(token,value)}
return $transition(C.parent,token,value)}
var $PatternMappingCtx=function(C){
this.type="mapping_pattern"
this.parent=C
this.position=$token.value
C.tree.pop()
this.tree=[]
C.tree.push(this)
this.expect='key_value_pattern'
this.literal_keys=[]
this.bound_names=[]}
$PatternMappingCtx.prototype.ast=function(){
var keys=[],patterns=[]
for(var item of this.tree){keys.push(item.tree[0].ast().value)
if(item.tree[0]instanceof $PatternLiteralCtx){patterns.push(item.tree[1].ast())}else{patterns.push(item.tree[2].ast())}}
var res=new ast.MatchMapping(keys,patterns)
if(this.double_star){res.rest=this.double_star.tree[0]}
set_position(res,this.position)
return res}
$PatternMappingCtx.prototype.bindings=function(){var bindings=[]
for(var item of this.tree){bindings=bindings.concat(item.bindings())}
if(this.rest){bindings=bindings.concat(this.rest.bindings())}
if(this.alias){bindings.push(this.alias)}
return bindings}
$PatternMappingCtx.prototype.transition=function(token,value){var C=this
function check_duplicate_names(){var last=$B.last(C.tree),bindings
if(last instanceof $PatternKeyValueCtx){if(C.double_star){
C.$pos=C.double_star.$pos
raise_syntax_error(C,"can't use starred name here (consider moving to end)")}
if(last.tree[0].type=='value_pattern'){bindings=last.tree[2].bindings()}else{bindings=last.tree[1].bindings()}
for(var binding of bindings){if(C.bound_names.indexOf(binding)>-1){raise_syntax_error(C,`multiple assignments to name '${binding}'`+
' in pattern')}}
C.bound_names=C.bound_names.concat(bindings)}}
switch(C.expect){case 'key_value_pattern':
if(token=='}' ||token==','){
check_duplicate_names()
if(C.double_star){var ix=C.tree.indexOf(C.double_star)
if(ix !=C.tree.length-1){C.$pos=C.double_star.$pos
raise_syntax_error(C,"can't use starred name here (consider moving to end)")}
C.rest=C.tree.pop()}
return token==',' ? C :C.parent}
if(token=='op' && value=='**'){C.expect='capture_pattern'
return C}
var p=new $PatternCtx(C)
try{var lit_or_val=p.transition(token,value)}catch(err){raise_syntax_error(C,"mapping pattern keys may only "+
"match literals and attribute lookups")}
if(lit_or_val instanceof $PatternLiteralCtx){C.tree.pop()
new $PatternKeyValueCtx(C,lit_or_val)
return lit_or_val}else if(lit_or_val instanceof $PatternCaptureCtx){C.has_value_pattern_keys=true
C.tree.pop()
new $PatternKeyValueCtx(C,lit_or_val)
C.expect='.'
return this}else{raise_syntax_error(C,'(expected key or **)')}
case 'capture_pattern':
var p=new $PatternCtx(C)
var capture=$transition(p,token,value)
if(capture instanceof $PatternCaptureCtx){if(C.double_star){C.$pos=capture.$pos
raise_syntax_error(C,"only one double star pattern is accepted")}
if(value=='_'){raise_syntax_error(C,"('**_' is not valid)")}
if(C.bound_names.indexOf(value)>-1){raise_syntax_error(C,'duplicate binding: '+value)}
C.bound_names.push(value)
capture.double_star=true
C.double_star=capture
C.expect=','
return C}else{raise_syntax_error(C,'(expected identifier)')}
case ',':
if(token==','){C.expect='key_value_pattern'
return C}else if(token=='}'){C.expect='key_value_pattern'
return C.transition(token,value)}
raise_syntax_error(C)
case '.':
if(C.tree.length > 0){var last=$B.last(C.tree)
if(last instanceof $PatternKeyValueCtx){
new $IdCtx(last,last.tree[0].tree[0])
C.expect='key_value_pattern'
return $transition(last.tree[0],token,value)}}
raise_syntax_error(C)}
return $transition(C.parent,token,value)}
var $PatternKeyValueCtx=function(C,literal_or_value){this.type="pattern_key_value"
this.parent=C
this.tree=[literal_or_value]
literal_or_value.parent=this
this.expect=':'
C.tree.push(this)}
$PatternKeyValueCtx.prototype.bindings=$PatternMappingCtx.prototype.bindings
$PatternKeyValueCtx.prototype.transition=function(token,value){var C=this
switch(C.expect){case ':':
switch(token){case ':':
var key_obj=this.tree[0]
if(key_obj instanceof $PatternLiteralCtx){var key=$B.AST.$convert(key_obj.tree[0])
if(_b_.list.__contains__(this.parent.literal_keys,key)){$pos--
raise_syntax_error(C,`mapping pattern checks `+
`duplicate key (${_b_.repr(key)})`)}
this.parent.literal_keys.push(key)}
this.expect=','
return new $PatternCtx(this)
default:
raise_syntax_error(C,'(expected :)')}
case ',':
switch(token){case '}':
return $transition(C.parent,token,value)
case ',':
C.parent.expect='key_value_pattern'
return $transition(C.parent,token,value)
case 'op':
if(value=='|'){
return new $PatternCtx(new $PatternOrCtx(C))}}
raise_syntax_error(C,"(expected ',' or '}')")}
return $transition(C.parent,token,value)}
var $PatternOrCtx=function(C){
this.type="or_pattern"
this.parent=C
this.position=$token.value
var first_pattern=C.tree.pop()
if(first_pattern instanceof $PatternGroupCtx &&
first_pattern.expect !='as'){
first_pattern=first_pattern.tree[0]}
this.tree=[first_pattern]
first_pattern.parent=this
this.expect='|'
C.tree.push(this)
this.check_reachable()}
$PatternOrCtx.prototype.ast=function(){
var ast_obj=new ast.MatchOr(this.tree.map(x=> x.ast()))
set_position(ast_obj,this.position)
if(this.alias){ast_obj=new ast.MatchAs(ast_obj,this.alias)}
set_position(ast_obj,this.position)
return ast_obj}
$PatternOrCtx.prototype.bindings=function(){var names
for(var subpattern of this.tree){if(subpattern.bindings===undefined){console.log('no binding',subpattern)}
var subbindings=subpattern.bindings()
if(names===undefined){names=subbindings}else{for(var item of names){if(subbindings.indexOf(item)==-1){raise_syntax_error(this,"alternative patterns bind different names")}}
for(var item of subbindings){if(names.indexOf(item)==-1){raise_syntax_error(this,"alternative patterns bind different names")}}}}
if(this.alias){return names.concat(this.alias)}
return names}
$PatternOrCtx.prototype.check_reachable=function(){
var item=$B.last(this.tree)
var capture
if(item.type=='capture_pattern'){capture=item.tree[0]}else if(item.type=='group_pattern' && item.tree.length==1 &&
item.tree[0].type=='capture_pattern'){capture=item.tree[0].tree[0]}else if(item instanceof $PatternOrCtx){item.check_reachable()}
if(capture){var msg=capture=='_' ? 'wildcard' :
`name capture '${capture}'`
raise_syntax_error(this,`${msg} makes remaining patterns unreachable`)}}
$PatternOrCtx.prototype.transition=function(token,value){function set_alias(){
var last=$B.last(C.tree)
if(last.alias){C.alias=last.alias
delete last.alias}}
var C=this
if(['as','alias'].indexOf(C.expect)>-1){return as_pattern(C,token,value)}
if(token=='op' && value=="|"){
for(var item of C.tree){if(item.alias){raise_syntax_error(C,'(no as pattern inside or pattern)')}}
C.check_reachable()
return new $PatternCtx(C)}else if(token==')' && C.parenthese){set_alias()
C.bindings()
delete C.parenthese
C.expect='as'
return C}
set_alias()
C.bindings()
return $transition(C.parent,token,value)}
var $PatternSequenceCtx=function(C,token){
this.type="sequence_pattern"
this.parent=C
this.position=$token.value
this.tree=[]
this.bound_names=[]
var first_pattern=C.tree.pop()
if(token===undefined){
this.bound_names=first_pattern.bindings()
this.tree=[first_pattern]
if(first_pattern.starred){this.has_star=true}
first_pattern.parent=this}else{
this.token=token}
this.expect=','
C.tree.push(this)}
$PatternSequenceCtx.prototype.ast=function(){var ast_obj=new ast.MatchSequence(this.tree.map(x=> x.ast()))
set_position(ast_obj,this.position)
if(this.alias){ast_obj=new ast.MatchAs(ast_obj,this.alias)
set_position(ast_obj,this.position)}
return ast_obj}
$PatternSequenceCtx.prototype.bindings=$PatternMappingCtx.prototype.bindings
$PatternSequenceCtx.prototype.transition=function(token,value){function check_duplicate_names(){var last=$B.last(C.tree)
if(!(last instanceof $PatternCtx)){
var last_bindings=last.bindings()
for(var b of last_bindings){if(C.bound_names.indexOf(b)>-1){raise_syntax_error(C,"multiple assignments to"+
` name '${b}' in pattern`)}}
if(last.starred){if(C.has_star){raise_syntax_error(C,'multiple starred names in sequence pattern')}
C.has_star=true}
C.bound_names=C.bound_names.concat(last_bindings)}}
var C=this
if(C.expect==','){if((C.token=='[' && token==']')||
(C.token=='(' && token==")")){
var nb_starred=0
for(var item of C.tree){if(item instanceof $PatternCaptureCtx && item.starred){nb_starred++
if(nb_starred > 1){raise_syntax_error(C,'multiple starred names in sequence pattern')}}}
C.expect='as'
check_duplicate_names()
remove_empty_pattern(C)
return C}else if(token==','){check_duplicate_names()
C.expect='id'
return C}else if(token=='op' && value=='|'){
remove_empty_pattern(C)
return new $PatternCtx(new $PatternOrCtx(C))}else if(this.token===undefined){
check_duplicate_names()
return $transition(C.parent,token,value)}
raise_syntax_error(C)}else if(C.expect=='as'){if(token=='as'){this.expect='alias'
return C}
return $transition(C.parent,token,value)}else if(C.expect=='alias'){if(token='id'){C.alias=value
return C.parent}
raise_syntax_error(C,'expected alias')}else if(C.expect=='id'){C.expect=','
return $transition(new $PatternCtx(C),token,value)}}
var $RaiseCtx=$B.parser.$RaiseCtx=function(C){
this.type='raise'
this.parent=C
this.tree=[]
this.position=$token.value
C.tree[C.tree.length]=this
this.scope_type=$get_scope(this).ntype}
$RaiseCtx.prototype.ast=function(){
var ast_obj=new ast.Raise(...this.tree.map(x=> x.ast()))
set_position(ast_obj,this.position)
return ast_obj}
$RaiseCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
if(C.tree.length==0){return new $IdCtx(new $ExprCtx(C,'exc',false),value)}
break
case 'from':
if(C.tree.length > 0){return new $AbstractExprCtx(C,false)}
break
case 'eol':
remove_abstract_expr(this.tree)
return $transition(C.parent,token)}
raise_syntax_error(C)}
var $ReturnCtx=$B.parser.$ReturnCtx=function(C){
this.type='return'
this.parent=C
this.tree=[]
this.position=$token.value
C.tree[C.tree.length]=this
this.scope=$get_scope(this)
if(["def","generator"].indexOf(this.scope.ntype)==-1){raise_syntax_error(C,"'return' outside function")}
var node=this.node=$get_node(this)
while(node.parent){if(node.parent.C){var elt=node.parent.C.tree[0]
if(elt.type=='for'){elt.has_return=true
break}else if(elt.type=='try'){elt.has_return=true}else if(elt.type=='single_kw' && elt.token=='finally'){elt.has_return=true}}
node=node.parent}}
$ReturnCtx.prototype.ast=function(){var res=new ast.Return()
if(this.tree.length > 0){res.value=this.tree[0].ast()}
set_position(res,this.position)
return res}
$ReturnCtx.prototype.transition=function(token,value){var C=this
if(token=='eol' && this.tree.length==1 &&
this.tree[0].type=='abstract_expr'){
this.tree.pop()}
return $transition(C.parent,token)}
var SetCompCtx=function(C){
this.type='setcomp'
this.tree=[C.tree[0]]
this.tree[0].parent=this
Comprehension.make_comp(this,C)}
SetCompCtx.prototype.ast=function(){
var res=new ast.SetComp(
this.tree[0].ast(),Comprehension.generators(this.tree.slice(1))
)
res.lineno=$get_node(this).line_num
return res}
SetCompCtx.prototype.transition=function(token,value){var C=this
if(token=='}'){return this.parent}
raise_syntax_error(C)}
var $SingleKwCtx=$B.parser.$SingleKwCtx=function(C,token){
this.type='single_kw'
this.token=token
this.parent=C
this.tree=[]
C.tree[C.tree.length]=this
if(token=="else"){var node=C.node,rank=node.parent.children.indexOf(node),pctx=node.parent.children[rank-1].C
pctx.tree[0].orelse=this
if(pctx.tree.length > 0){var elt=pctx.tree[0]
if(elt.type=='for' ||
elt.type=='asyncfor' ||
(elt.type=='condition' && elt.token=='while')){elt.has_break=true
elt.else_node=$get_node(this)}}}}
$SingleKwCtx.prototype.ast=function(){return ast_body(this.parent)}
$SingleKwCtx.prototype.transition=function(token,value){var C=this
if(token==':'){return $BodyCtx(C)}
raise_syntax_error(C)}
var $SliceCtx=$B.parser.$SliceCtx=function(C){
this.type='slice'
this.parent=C
this.position=$token.value
this.tree=C.tree.length > 0 ?[C.tree.pop()]:[]
C.tree.push(this)}
$SliceCtx.prototype.ast=function(){var slice=new ast.Slice()
var attrs=['lower','upper','step']
for(var i=0;i < this.tree.length;i++){var item=this.tree[i]
if(item.type !=='abstract_expr'){slice[attrs[i]]=item.ast()}}
set_position(slice,this.position)
return slice}
$SliceCtx.prototype.transition=function(token,value){var C=this
if(token==":"){return new $AbstractExprCtx(C,false)}
return $transition(C.parent,token,value)}
var $StarArgCtx=$B.parser.$StarArgCtx=function(C){
this.type='star_arg'
this.parent=C
this.tree=[]
this.position=$token.value
C.tree[C.tree.length]=this}
$StarArgCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
if(C.parent.type=="target_list"){C.tree.push(value)
C.parent.expect=','
return C.parent}
return $transition(new $AbstractExprCtx(C,false),token,value)
case 'imaginary':
case 'int':
case 'float':
case 'str':
case 'JoinedStr':
case 'bytes':
case '[':
case '(':
case '{':
case 'not':
case 'lambda':
return $transition(new $AbstractExprCtx(C,false),token,value)
case ',':
case ')':
if(C.tree.length==0){raise_syntax_error(C,"(unnamed star argument)")}
return $transition(C.parent,token)
case ':':
if(C.parent.parent.type=='lambda'){return $transition(C.parent.parent,token)}}
raise_syntax_error(C)}
var $StringCtx=$B.parser.$StringCtx=function(C,value){
this.type='str'
this.parent=C
this.position=$token.value
function prepare(value){value=value.replace(/\n/g,'\\n\\\n')
value=value.replace(/\r/g,'\\r\\\r')
return value}
this.is_bytes=value.charAt(0)=='b'
if(! this.is_bytes){this.value=prepare(value)}else{this.value=prepare(value.substr(1))}
C.tree.push(this)
this.tree=[this.value]
this.raw=false
this.$pos=$pos}
$StringCtx.prototype.ast=function(){var value
if(! this.is_bytes){try{value=eval(this.value)}catch(err){console.log('error str ast',this.value)
throw err}}else{value=_b_.bytes.$new(_b_.bytes,eval(this.value),'ISO-8859-1')}
var ast_obj=new ast.Constant(value)
set_position(ast_obj,this.position)
return ast_obj}
$StringCtx.prototype.transition=function(token,value){var C=this
switch(token){case '[':
return new $AbstractExprCtx(new $SubCtx(C.parent),false)
case '(':
C.parent.tree[0]=C
return new $CallCtx(C.parent)
case 'str':
if((this.is_bytes && ! value.startsWith('b'))||
(! this.is_bytes && value.startsWith('b'))){C.$pos=$pos
raise_syntax_error(C,"cannot mix bytes and nonbytes literals")}
C.value+=' + '+(this.is_bytes ? value.substr(1):value)
return C
case 'JoinedStr':
C.parent.tree.pop()
var joined_str=new JoinedStrCtx(C.parent,value)
if(typeof joined_str.tree[0]=="string"){joined_str.tree[0]=eval(this.value)+joined_str.tree[0]}else{joined_str.tree.splice(0,0,this)}
return joined_str}
return $transition(C.parent,token,value)}
var $SubCtx=$B.parser.$SubCtx=function(C){
this.type='sub'
this.func='getitem' 
this.value=C.tree[0]
this.position=this.value.position
C.tree.pop()
C.tree[C.tree.length]=this
this.parent=C
this.tree=[]}
$SubCtx.prototype.ast=function(){var slice
if(this.tree.length > 1){var slice_items=this.tree.map(x=> x.ast())
slice=new ast.Tuple(slice_items)
set_position(slice,this.position)}else{slice=this.tree[0].ast()}
slice.ctx=new ast.Load()
var value=this.value.ast()
if(value.ctx){value.ctx=new ast.Load()}
var ast_obj=new ast.Subscript(value,slice,new ast.Load())
set_position(ast_obj,this.position)
return ast_obj}
$SubCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
case 'imaginary':
case 'int':
case 'float':
case 'str':
case 'JoinedStr':
case 'bytes':
case '[':
case '(':
case '{':
case '.':
case 'not':
case 'lambda':
var expr=new $AbstractExprCtx(C,false)
return $transition(expr,token,value)
case ']':
if(C.parent.packed){return C.parent }
if(C.tree[0].tree.length > 0){return C.parent}
break
case ':':
return new $AbstractExprCtx(new $SliceCtx(C),false)
case ',':
return new $AbstractExprCtx(C,false)}
raise_syntax_error(C)}
var $TargetListCtx=$B.parser.$TargetListCtx=function(C){
this.type='target_list'
this.parent=C
this.tree=[]
this.position=$token.value
this.expect='id'
this.nb_packed=0
C.tree[C.tree.length]=this}
$TargetListCtx.prototype.ast=function(){if(this.tree.length==1 && ! this.implicit_tuple){var item=this.tree[0].ast()
item.ctx=new ast.Store()
if(item instanceof ast.Tuple){for(var target of item.elts){target.ctx=new ast.Store()}}
return item}else{var items=[]
for(var item of this.tree){item=item.ast()
if(item.hasOwnProperty('ctx')){item.ctx=new ast.Store()}
items.push(item)}
var ast_obj=new ast.Tuple(items,new ast.Store())
set_position(ast_obj,this.position)
return ast_obj}}
$TargetListCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
if(C.expect=='id'){C.expect=','
return new $IdCtx(
new $ExprCtx(C,'target',false),value)}
case 'op':
if(C.expect=='id' && value=='*'){
this.nb_packed++
return new $PackedCtx(C)}
case '(':
case '[':
if(C.expect=='id'){C.expect=','
return new $ListOrTupleCtx(C,token=='(' ? 'tuple' :'list')}
case ')':
case ']':
if(C.expect==','){return C.parent}
case ',':
if(C.expect==','){C.expect='id'
C.implicit_tuple=true
return C}}
if(C.expect==','){return $transition(C.parent,token,value)}else if(token=='in'){
return $transition(C.parent,token,value)}
raise_syntax_error(C)}
var $TernaryCtx=$B.parser.$TernaryCtx=function(C){
this.type='ternary'
this.position=$token.value
C.parent.tree.pop()
var expr=new $ExprCtx(C.parent,'ternary',false)
expr.tree.push(this)
this.parent=expr
this.tree=[C]
C.parent=this}
$TernaryCtx.prototype.ast=function(){
var ast_obj=new ast.IfExp(this.tree[1].ast(),this.tree[0].ast(),this.tree[2].ast())
set_position(ast_obj,this.position)
return ast_obj}
$TernaryCtx.prototype.transition=function(token,value){var C=this
if(token=='else'){C.in_else=true
return new $AbstractExprCtx(C,false)}else if(! C.in_else){raise_syntax_error(C)}else if(token==","){
if(["assign","augm_assign","node","return"].
indexOf(C.parent.type)>-1){C.parent.tree.pop()
var t=new $ListOrTupleCtx(C.parent,'tuple')
t.implicit=true
t.tree[0]=C
C.parent=t
t.expect="id"
return t}}
return $transition(C.parent,token,value)}
var $TryCtx=$B.parser.$TryCtx=function(C){
this.type='try'
this.parent=C
this.position=$token.value
C.tree[C.tree.length]=this}
$TryCtx.prototype.ast=function(){
var node=this.parent.node,res={body:ast_body(this.parent),handlers:[],orelse:[],finalbody:[]}
var rank=node.parent.children.indexOf(node)
for(var child of node.parent.children.slice(rank+1)){var t=child.C.tree[0],type=t.type
if(type=='single_kw'){type=t.token}
if(type=='except'){res.handlers.push(t.ast())}else if(type=='else'){res.orelse=ast_body(child.C)}else if(type=='finally'){res.finalbody=ast_body(child.C)}else{break}}
var res=new ast.Try(res.body,res.handlers,res.orelse,res.finalbody)
set_position(res,this.position)
return res}
$TryCtx.prototype.transition=function(token,value){var C=this
if(token==':'){return $BodyCtx(C)}
raise_syntax_error(C,"expected ':'")}
var $UnaryCtx=$B.parser.$UnaryCtx=function(C,op){
this.type='unary'
this.op=op
this.parent=C
this.tree=[]
this.position=$token.value
C.tree.push(this)}
$UnaryCtx.prototype.ast=function(){var op={'+':ast.UAdd,'-':ast.USub,'~':ast.Invert}[this.op],ast_obj=new ast.UnaryOp(new op(),this.tree[0].ast())
set_position(ast_obj,this.position)
return ast_obj}
$UnaryCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'op':
if('+'==value ||'-'==value){if(C.op===value){C.op='+'}else{C.op='-'}
return C}
case 'int':
case 'float':
case 'imaginary':
if(C.parent.type=="packed"){raise_syntax_error(C,"can't use starred expression here")}
var res=new $NumberCtx(token,C,value)
return res
case 'id':
return $transition(new $AbstractExprCtx(C,false),token,value)}
if(this.tree.length==0 ||this.tree[0].type=='abstract_expr'){raise_syntax_error(C)}
return $transition(C.parent,token,value)}
var $WithCtx=$B.parser.$WithCtx=function(C){
this.type='with'
this.parent=C
this.position=$token.value
C.tree[C.tree.length]=this
this.tree=[]
this.expect='as'
this.scope=$get_scope(this)}
$WithCtx.prototype.ast=function(){
var withitems=[],withitem
for(var item of this.tree){withitem=new ast.withitem(item.tree[0].ast())
if(item.alias){withitem.optional_vars=item.alias.tree[0].ast()
withitem.optional_vars.ctx=new ast.Store()}
withitems.push(withitem)}
var klass=this.async ? ast.AsyncWith :ast.With
var ast_obj=new klass(withitems,ast_body(this.parent))
set_position(ast_obj,this.position)
return ast_obj}
$WithCtx.prototype.transition=function(token,value){var C=this
switch(token){case 'id':
if(C.expect=='id'){C.expect='as'
return $transition(
new $AbstractExprCtx(C,false),token,value)}
raise_syntax_error(C)
case 'as':
return new $AbstractExprCtx(new $AliasCtx(C))
case ':':
switch(C.expect){case 'id':
case 'as':
case ':':
return $BodyCtx(C)}
break
case '(':
if(C.expect=='id' && C.tree.length==0){C.parenth=true
return C}else if(C.expect=='alias'){C.expect=':'
return new $TargetListCtx(C,false)}
break
case ')':
if(C.expect==',' ||C.expect=='as'){C.expect=':'
return C}
break
case ',':
if(C.parenth !==undefined &&
C.has_alias===undefined &&
(C.expect==',' ||C.expect=='as')){C.expect='id'
return C}else if(C.expect=='as'){C.expect='id'
return C}else if(C.expect==':'){C.expect='id'
return C}
break}
raise_syntax_error(C)}
$WithCtx.prototype.set_alias=function(ctx){var ids=[]
if(ctx.type=="id"){ids=[ctx]}else if(ctx.type=="list_or_tuple"){
for(var expr of ctx.tree){if(expr.type=="expr" && expr.tree[0].type=="id"){ids.push(expr.tree[0])}}}}
var $YieldCtx=$B.parser.$YieldCtx=function(C,is_await){
this.type='yield'
this.parent=C
this.tree=[]
this.is_await=is_await
this.position=$token.value
C.tree[C.tree.length]=this
if(C.type=="list_or_tuple" && C.tree.length > 1){raise_syntax_error(C,"(non-parenthesized yield)")}
if($parent_match(C,{type:"annotation"})){raise_syntax_error(C,"'yield' outside function")}
var parent=this
while(true){var list_or_tuple=$parent_match(parent,{type:"list_or_tuple"})
if(list_or_tuple){list_or_tuple.yields=list_or_tuple.yields ||[]
list_or_tuple.yields.push([this,$pos])
parent=list_or_tuple}else{break}}
var parent=this
while(true){var set_or_dict=$parent_match(parent,{type:"dict_or_set"})
if(set_or_dict){set_or_dict.yields=set_or_dict.yields ||[]
set_or_dict.yields.push([this,$pos])
parent=set_or_dict}else{break}}
var root=$get_module(this)
root.yields_func_check=root.yields_func_check ||[]
root.yields_func_check.push([this,$pos])
var scope=this.scope=$get_scope(this,true),node=$get_node(this)
node.has_yield=this
var in_comp=$parent_match(this,{type:"comprehension"})
if($get_scope(this).id.startsWith("lc"+$B.lambda_magic)){delete node.has_yield}
if(in_comp){var outermost_expr=in_comp.tree[0].tree[1]
var parent=C
while(parent){if(parent===outermost_expr){break}
parent=parent.parent}
if(! parent){raise_syntax_error(C,"'yield' inside list comprehension")}}
var in_lambda=false,parent=C
while(parent){if(parent.type=="lambda"){in_lambda=true
this.in_lambda=true
break}
parent=parent.parent}
var parent=node.parent
while(parent){if(parent.C && parent.C.tree.length > 0 &&
parent.C.tree[0].type=="with"){scope.C.tree[0].$has_yield_in_cm=true
break}
parent=parent.parent}
if(! in_lambda){switch(C.type){case 'node':
break;
case 'assign':
case 'list_or_tuple':
break
default:
raise_syntax_error(C,'(non-parenthesized yield)')}}}
$YieldCtx.prototype.ast=function(){
var ast_obj
if(this.from){ast_obj=new ast.YieldFrom(this.tree[0].ast())}else if(this.tree.length==1){ast_obj=new ast.Yield(this.tree[0].ast())}else{ast_obj=new ast.Yield()}
set_position(ast_obj,this.position)
return ast_obj}
$YieldCtx.prototype.transition=function(token,value){var C=this
if(token=='from'){
if(C.tree[0].type !='abstract_expr'){
raise_syntax_error(C,"('from' must follow 'yield')")}
C.from=true
C.from_num=$B.UUID()
return C.tree[0]}else{remove_abstract_expr(C.tree)}
return $transition(C.parent,token)}
$YieldCtx.prototype.check_in_function=function(){if(this.in_lambda){return}
var scope=$get_scope(this),in_func=scope.is_function,func_scope=scope
if(! in_func && scope.comprehension){var parent=scope.parent_block
while(parent.comprehension){parent=parent_block}
in_func=parent.is_function
func_scope=parent}
if(! in_func){raise_syntax_error(this.parent,"'yield' outside function")}else{var def=func_scope.C.tree[0]
if(! this.is_await){def.type='generator'}}}
function $parent_match(ctx,obj){
var flag
while(ctx.parent){flag=true
for(var attr in obj){if(ctx.parent[attr]!=obj[attr]){flag=false
break}}
if(flag){return ctx.parent}
ctx=ctx.parent}
return false}
var $previous=$B.parser.$previous=function(C){var previous=C.node.parent.children[C.node.parent.children.length-2]
if(!previous ||!previous.C){raise_syntax_error(C,'(keyword not following correct keyword)')}
return previous.C.tree[0]}
var $get_docstring=$B.parser.$get_docstring=function(node){var doc_string=''
if(node.children.length > 0){var firstchild=node.children[0]
if(firstchild.C.tree && firstchild.C.tree.length > 0 &&
firstchild.C.tree[0].type=='expr'){var expr=firstchild.C.tree[0].tree[0]
if(expr.type=='str' && !Array.isArray(expr.tree[0])){doc_string=firstchild.C.tree[0].tree[0].to_js()}}}
return doc_string}
var $get_scope=$B.parser.$get_scope=function(C,flag){
var ctx_node=C.parent
while(true){if(ctx_node.type==='node'){break}else if(ctx_node.comprehension){return ctx_node}
ctx_node=ctx_node.parent}
var tree_node=ctx_node.node,scope=null
while(tree_node.parent && tree_node.parent.type !=='module'){var ntype=tree_node.parent.C.tree[0].type
switch(ntype){case 'def':
case 'class':
case 'generator':
var scope=tree_node.parent
scope.ntype=ntype
scope.is_function=ntype !='class'
return scope}
tree_node=tree_node.parent}
var scope=tree_node.parent ||tree_node 
scope.ntype="module"
return scope}
var $get_module=$B.parser.$get_module=function(C){
var ctx_node=C instanceof $NodeCtx ? C :C.parent
while(ctx_node.type !=='node'){ctx_node=ctx_node.parent}
var tree_node=ctx_node.node
if(tree_node.ntype=="module"){return tree_node}
var scope=null
while(tree_node.parent.type !='module'){tree_node=tree_node.parent}
scope=tree_node.parent 
scope.ntype="module"
return scope}
var $get_node=$B.parser.$get_node=function(C){var ctx=C
while(ctx.parent){ctx=ctx.parent}
return ctx.node}
var $mangle=$B.parser.$mangle=function(name,C){
if(name.substr(0,2)=="__" && name.substr(name.length-2)!=="__"){var klass=null,scope=$get_scope(C)
while(true){if(scope.ntype=="module"){return name}else if(scope.ntype=="class"){var class_name=scope.C.tree[0].name
while(class_name.charAt(0)=='_'){class_name=class_name.substr(1)}
return '_'+class_name+name}else{if(scope.parent && scope.parent.C){scope=$get_scope(scope.C.tree[0])}else{return name}}}}else{return name}}
$B.nb_debug_lines=0
var $transition=$B.parser.$transition=function(C,token,value){if($B.nb_debug_lines > 100){alert('too many debug lines')
$B.nb_debug_lines=0}
if($B.track_transitions){console.log("C",C,"token",token,value,'pos',$token.value)
$B.nb_debug_lines++}
return C.transition(token,value)}
$B.forbidden=[]
$B.aliased_names=Object.create(null)
var s_escaped='abfnrtvxuU"0123456789'+"'"+'\\',is_escaped={}
for(var i=0;i < s_escaped.length;i++){is_escaped[s_escaped.charAt(i)]=true}
function SurrogatePair(value){
value=value-0x10000
return String.fromCharCode(0xD800 |(value >> 10))+
String.fromCharCode(0xDC00 |(value & 0x3FF))}
function test_num(num_lit){var len=num_lit.length,pos=0,char,elt=null,subtypes={b:'binary',o:'octal',x:'hexadecimal'},digits_re=/[_\d]/
function error(message){throw SyntaxError(message)}
function check(elt){if(elt.value.length==0){var t=subtypes[elt.subtype]||'decimal'
error("invalid "+t+" literal")}else if(elt.value[elt.value.length-1].match(/[\-+_]/)){var t=subtypes[elt.subtype]||'decimal'
error("invalid "+t+" literal")}else{
elt.value=elt.value.replace(/_/g,"")
elt.length=pos
return elt}}
while(pos < len){var char=num_lit[pos]
if(char.match(digits_re)){if(elt===null){elt={value:char}}else{if(char=='_' && elt.value.match(/[._+\-]$/)){
error('consecutive _ at '+pos)}else if(char=='_' && elt.subtype=='float' &&
elt.value.match(/e$/i)){
error('syntax error')}else if(elt.subtype=='b' && !(char.match(/[01_]/))){error(`invalid digit '${char}' in binary literal`)}else if(elt.subtype=='o' && !(char.match(/[0-7_]/))){error(`invalid digit '${char}' in octal literal`)}else if(elt.subtype===undefined && elt.value.startsWith("0")&&
!char.match(/[0_]/)){error("leading zeros in decimal integer literals are not"+
" permitted; use an 0o prefix for octal integers")}
elt.value+=char}
pos++}else if(char.match(/[oxb]/i)){if(elt.value=="0"){elt.subtype=char.toLowerCase()
if(elt.subtype=="x"){digits_re=/[_\da-fA-F]/}
elt.value=''
pos++}else{error("invalid char "+char)}}else if(char=='.'){if(elt===null){error("invalid char in "+num_lit+" pos "+pos+": "+char)}else if(elt.subtype===undefined){elt.subtype="float"
if(elt.value.endsWith('_')){error("invalid decimal literal")}
elt.value=elt.value.replace(/_/g,"")+char
pos++}else{return check(elt)}}else if(char.match(/e/i)){if(num_lit[pos+1]===undefined){error("nothing after e")}else if(elt && subtypes[elt.subtype]!==undefined){
error("syntax error")}else if(elt && elt.value.endsWith('_')){
error("syntax error")}else if(num_lit[pos+1].match(/[+\-0-9_]/)){if(elt && elt.value){if(elt.exp){elt.length=pos
return elt}
elt.subtype='float'
elt.value+=char
elt.exp=true
pos++}else{error("unexpected e")}}else{return check(elt)}}else if(char.match(/[\+\-]/i)){if(elt===null){elt={value:char}
pos++}else if(elt.value.search(/e$/i)>-1){elt.value+=char
pos++}else{return check(elt)}}else if(char.match(/j/i)){if(elt &&(! elt.subtype ||elt.subtype=="float")){elt.imaginary=true
check(elt)
elt.length++
return elt}else{error("invalid syntax")}}else{break}}
return check(elt)}
var opening={')':'(','}':'{',']':'['}
function line_ends_with_comma(src){
var braces=[]
for(token of $B.tokenizer(src)){if(token.type=='OP' && token.string==':' && braces.length==0){return true}else if(token.type=='OP'){if('([{'.indexOf(token.string)>-1){braces.push(token)}else if(')]}'.indexOf(token.string)>-1){if(braces.length==0){var err=SyntaxError(
`unmatched '${token.string}'`)
err.offset=token.start[1]
throw err}else if($B.last(braces).string !=opening[token.string]){var err=SyntaxError("closing parenthesis "+
`'${token.string}' does not match opening `+
`parenthesis '${$B.last(braces).string}'`)
err.offset=token.start[1]
throw err}else{braces.pop()}}}else if(token.type=='NEWLINE'){return false}}
return false}
function prepare_number(n){
n=n.replace(/_/g,"")
if(n.startsWith('.')){if(n.endsWith("j")){return{type:'imaginary',value:prepare_number(n.substr(0,n.length-1))}}else{return{type:'float',value:n}}
pos=j}else if(n.startsWith('0')&& n !='0'){
var num=test_num(n),base
if(num.imaginary){return{type:'imaginary',value:prepare_number(num.value)}}
if(num.subtype=='float'){return{type:num.subtype,value:num.value}}
if(num.subtype===undefined){base=10}else{base={'b':2,'o':8,'x':16}[num.subtype]}
if(base !==undefined){return{type:'int',value:[base,num.value]}}}else{var num=test_num(n)
if(num.subtype=="float"){if(num.imaginary){return{
type:'imaginary',value:prepare_number(num.value)}}else{return{
type:'float',value:num.value}}}else{if(num.imaginary){return{
type:'imaginary',value:prepare_number(num.value)}}else{return{
type:'int',value:[10,num.value]}}}}}
function test_escape(C,text,string_start,antislash_pos){
var seq_end,mo
mo=/^[0-7]{1,3}/.exec(text.substr(antislash_pos+1))
if(mo){return[String.fromCharCode(parseInt(mo[0],8)),1+mo[0].length]}
switch(text[antislash_pos+1]){case "x":
var mo=/^[0-9A-F]{0,2}/i.exec(text.substr(antislash_pos+2))
if(mo[0].length !=2){seq_end=antislash_pos+mo[0].length+1
$token.value.start[1]=seq_end
raise_syntax_error(C,"(unicode error) 'unicodeescape' codec can't decode "+
`bytes in position ${antislash_pos}-${seq_end}: truncated `+
"\\xXX escape")}else{return[String.fromCharCode(parseInt(mo[0],16)),2+mo[0].length]}
case "u":
var mo=/^[0-9A-F]{0,4}/i.exec(text.substr(antislash_pos+2))
if(mo[0].length !=4){seq_end=antislash_pos+mo[0].length+1
$token.value.start[1]=seq_end
raise_syntax_error(C,"(unicode error) 'unicodeescape' codec can't decode "+
`bytes in position ${antislash_pos}-${seq_end}: truncated `+
"\\uXXXX escape")}else{return[String.fromCharCode(parseInt(mo[0],16)),2+mo[0].length]}
case "U":
var mo=/^[0-9A-F]{0,8}/i.exec(text.substr(antislash_pos+2))
if(mo[0].length !=8){seq_end=antislash_pos+mo[0].length+1
$token.value.start[1]=seq_end
raise_syntax_error(C,"(unicode error) 'unicodeescape' codec can't decode "+
`bytes in position ${antislash_pos}-${seq_end}: truncated `+
"\\uXXXX escape")}else{var value=parseInt(mo[0],16)
if(value > 0x10FFFF){raise_syntax_error(C,'invalid unicode escape '+mo[0])}else if(value >=0x10000){return[SurrogatePair(value),2+mo[0].length]}else{return[String.fromCharCode(value),2+mo[0].length]}}}}
function prepare_string(C,s,position){var len=s.length,pos=0,string_modifier,_type="string"
while(pos < len){if(s[pos]=='"' ||s[pos]=="'"){quote=s[pos]
string_modifier=s.substr(0,pos)
if(s.substr(pos,3)==quote.repeat(3)){_type="triple_string"
inner=s.substring(pos+3,s.length-3)}else{inner=s.substring(pos+quote.length,len-quote.length)}
break}
pos++}
var result={quote}
var mods={r:'raw',f:'fstring',b:'bytes'}
for(var mod of string_modifier){result[mods[mod]]=true}
var raw=C.type=='str' && C.raw,string_start=$pos+pos+1,bytes=false,fstring=false,sm_length,
end=null;
if(string_modifier){switch(string_modifier){case 'r':
raw=true
break
case 'u':
break
case 'b':
bytes=true
break
case 'rb':
case 'br':
bytes=true
raw=true
break
case 'f':
fstring=true
sm_length=1
break
case 'fr':
case 'rf':
fstring=true
sm_length=2
raw=true
break}
string_modifier=false}
var escaped=false,zone='',end=0,src=inner
while(end < src.length){if(escaped){if(src.charAt(end)=="a" && ! raw){zone=zone.substr(0,zone.length-1)+"\u0007"}else{zone+=src.charAt(end)
if(raw && src.charAt(end)=='\\'){zone+='\\'}}
escaped=false
end++}else if(src.charAt(end)=="\\"){if(raw){if(end < src.length-1 &&
src.charAt(end+1)==quote){zone+='\\\\'+quote
end+=2}else{zone+='\\\\'
end++}
escaped=true}else{if(src.charAt(end+1)=='\n'){
end+=2}else if(src.substr(end+1,2)=='N{'){
var end_lit=end+3,re=new RegExp("[-a-zA-Z0-9 ]+"),search=re.exec(src.substr(end_lit))
if(search===null){raise_syntax_error(C," (unicode error) "+
"malformed \\N character escape",pos)}
var end_lit=end_lit+search[0].length
if(src.charAt(end_lit)!="}"){raise_syntax_error(C," (unicode error) "+
"malformed \\N character escape")}
var description=search[0].toUpperCase()
if($B.unicodedb===undefined){var xhr=new XMLHttpRequest
xhr.open("GET",$B.brython_path+"unicode.txt",false)
xhr.onreadystatechange=function(){if(this.readyState==4){if(this.status==200){$B.unicodedb=this.responseText}else{console.log("Warning - could not "+
"load unicode.txt")}}}
xhr.send()}
if($B.unicodedb !==undefined){var re=new RegExp("^([0-9A-F]+);"+
description+";.*$","m")
search=re.exec($B.unicodedb)
if(search===null){raise_syntax_error(C," (unicode error) "+
"unknown Unicode character name")}
var cp="0x"+search[1]
zone+=String.fromCodePoint(eval(cp))
end=end_lit+1}else{end++}}else{var esc=test_escape(C,src,string_start,end)
if(esc){if(esc[0]=='\\'){zone+='\\\\'}else{zone+=esc[0]}
end+=esc[1]}else{if(end < src.length-1 &&
is_escaped[src.charAt(end+1)]===undefined){zone+='\\'}
zone+='\\'
escaped=true
end++}}}}else if(src.charAt(end)=='\n' && _type !='triple_string'){
raise_syntax_error(C,"EOL while scanning string literal")}else{zone+=src.charAt(end)
end++}}
var $string=zone,string=''
for(var i=0;i < $string.length;i++){var $car=$string.charAt(i)
if($car==quote){if(raw ||(i==0 ||
$string.charAt(i-1)!='\\')){string+='\\'}else if(_type=="triple_string"){
var j=i-1
while($string.charAt(j)=='\\'){j--}
if((i-j-1)% 2==0){string+='\\'}}}
string+=$car}
if(fstring){try{var re=new RegExp("\\\\"+quote,"g"),string_no_bs=string.replace(re,quote)
var elts=$B.parse_fstring(string_no_bs)}catch(err){if(err.position){$pos+=err.position}
raise_syntax_error(C,err.message)}}
if(bytes){result.value='b'+quote+string+quote}else if(fstring){result.value=elts}else{result.value=quote+string+quote}
C.raw=raw;
return result}
function unindent(src){
var lines=src.split('\n'),line,global_indent,indent,unindented_lines=[]
for(var line_num=0,len=lines.length;line_num < len;line_num++){line=lines[line_num]
indent=line.match(/^\s*/)[0]
if(indent !=line){
if(global_indent===undefined){
if(indent.length==0){
return src}
global_indent=indent
var start=global_indent.length
unindented_lines.push(line.substr(start))}else if(line.startsWith(global_indent)){unindented_lines.push(line.substr(start))}else{throw SyntaxError("first line starts at "+
`column ${start}, line ${line_num} at column `+
line.match(/\s*/).length+'\n    '+line)}}else{unindented_lines.push('')}}
return unindented_lines.join('\n')}
function handle_errortoken(C,token){if(token.string=="'" ||token.string=='"'){raise_syntax_error(C,'unterminated string literal '+
`(detected at line ${token.start[0]})`)}
raise_syntax_error(C,'invalid token '+token[1]+_b_.ord(token[1]))}
var python_keywords=["class","return","break","for","lambda","try","finally","raise","def","from","nonlocal","while","del","global","with","as","elif","else","if","yield","assert","import","except","raise","in","pass","with","continue","__debugger__","async","await"
]
var $token={}
var dispatch_tokens=$B.parser.dispatch_tokens=function(root){var src=root.src
var tokenizer=$B.tokenizer(src)
var braces_close={")":"(","]":"[","}":"{"},braces_open="([{",braces_stack=[]
var unsupported=[]
var $indented=["class","def","for","condition","single_kw","try","except","with","match","case" 
]
var module=root.module
var lnum=root.line_num===undefined ? 1 :root.line_num
var node=new $Node()
node.line_num=lnum
root.add(node)
var C=null,expect_indent=false,indent=0
var line2pos={0:0,1:0},line_num=1
for(var pos=0,len=src.length;pos < len;pos++){if(src[pos]=='\n'){line_num++
line2pos[line_num]=pos+1}}
while(true){try{var token=tokenizer.next()}catch(err){C=C ||new $NodeCtx(node)
if(err.type=='IndentationError'){$pos=line2pos[err.line_num]
raise_indentation_error(C,err.message)}else if(err instanceof SyntaxError){if(braces_stack.length > 0){var last_brace=$B.last(braces_stack),start=last_brace.start
$token.value=last_brace
raise_syntax_error(C,`'${last_brace.string}'`+
' was never closed')}
raise_syntax_error(C,err.message)}
throw err}
if(token.done){throw Error('token done without ENDMARKER.')}
token=token.value
$token.value=token
if(token[2]===undefined){console.log('token incomplet',token,'module',module,root)
console.log('src',src)}
if(token.start===undefined){console.log('no start',token)}
lnum=token.start[0]
$pos=line2pos[lnum]+token.start[1]
if(expect_indent &&
['INDENT','COMMENT','NL'].indexOf(token.type)==-1){C=C ||new $NodeCtx(node)
raise_indentation_error(C,"expected an indented block",expect_indent)}
switch(token.type){case 'ENDMARKER':
if(root.yields_func_check){var save_pos=$pos
for(const _yield of root.yields_func_check){$token.value=_yield[0].position
_yield[0].check_in_function()}
$pos=save_pos}
if(indent !=0){raise_indentation_error(node.C,'expected an indented block')}
if(node.C===undefined ||node.C.tree.length==0){node.parent.children.pop()}
return
case 'ENCODING':
case 'TYPE_COMMENT':
continue
case 'NL':
if((! node.C)||node.C.tree.length==0){node.line_num++}
continue
case 'COMMENT':
var end=line2pos[token.end[0]]+token.end[1]
root.comments.push([$pos,end-$pos])
continue
case 'ERRORTOKEN':
C=C ||new $NodeCtx(node)
if(token.string !=' '){handle_errortoken(C,token)}
continue}
switch(token[0]){case 'NAME':
case 'NUMBER':
case 'OP':
case 'STRING':
C=C ||new $NodeCtx(node)}
switch(token[0]){case 'NAME':
var name=token[1]
if(python_keywords.indexOf(name)>-1){if(unsupported.indexOf(name)>-1){raise_syntax_error(C,"(Unsupported Python keyword '"+name+"')")}
C=$transition(C,name)}else if(name=='not'){C=$transition(C,'not')}else if(typeof $operators[name]=='string'){
C=$transition(C,'op',name)}else{C=$transition(C,'id',name)}
continue
case 'OP':
var op=token[1]
if((op.length==1 && '()[]{}.,='.indexOf(op)>-1)||
[':='].indexOf(op)>-1){if(braces_open.indexOf(op)>-1){braces_stack.push(token)}else if(braces_close[op]){if(braces_stack.length==0){raise_syntax_error(C,"(unmatched '"+op+"')")}else{var last_brace=$B.last(braces_stack)
if(last_brace.string==braces_close[op]){braces_stack.pop()}else{raise_syntax_error(C,`closing parenthesis '${op}' does not `+
`match opening parenthesis '`+
`${last_brace.string}'`)}}}
C=$transition(C,token[1])}else if(op==':'){C=$transition(C,':')
if(C.node && C.node.is_body_node){node=C.node}}else if(op=='...'){C=$transition(C,'ellipsis')}else if(op=='->'){C=$transition(C,'annotation')}else if(op==';'){if(C.type=='node' && C.tree.length==0){raise_syntax_error(C,'(statement cannot start with ;)')}
$transition(C,'eol')
var new_node=new $Node()
new_node.line_num=token[2][0]+1
C=new $NodeCtx(new_node)
node.parent.add(new_node)
node=new_node}else if($augmented_assigns[op]){C=$transition(C,'augm_assign',op)}else{C=$transition(C,'op',op)}
continue
case 'STRING':
var prepared=prepare_string(C,token[1],token[2])
if(prepared.value instanceof Array){C=$transition(C,'JoinedStr',prepared.value)}else{C=$transition(C,'str',prepared.value)}
continue
case 'NUMBER':
try{var prepared=prepare_number(token[1])}catch(err){raise_syntax_error(C,err.message)}
C=$transition(C,prepared.type,prepared.value)
continue
case 'NEWLINE':
if(C && C.node && C.node.is_body_node){expect_indent=C.node.parent}
C=C ||new $NodeCtx(node)
$transition(C,'eol')
var new_node=new $Node()
new_node.line_num=token[2][0]+1
if(node.parent.children.length > 0 &&
node.parent.children[0].is_body_node){node.parent.parent.add(new_node)}else{node.parent.add(new_node)}
C=new $NodeCtx(new_node)
node=new_node
continue
case 'DEDENT':
indent--
if(! indent_continuation){node.parent.children.pop()
node.parent.parent.add(node)
C=new $NodeCtx(node)}
continue
case 'INDENT':
indent++
var indent_continuation=false
if(! expect_indent){if(token.line.trim()=='\\'){
indent_continuation=true}else{C=C ||new $NodeCtx(node)
raise_indentation_error(C,'unexpected indent')}}
expect_indent=false
continue}}}
var $create_root_node=$B.parser.$create_root_node=function(src,module,locals_id,parent_block,line_num){var root=new $Node('module')
root.module=module
root.id=locals_id
root.parent_block=parent_block
root.line_num=line_num
root.indent=-1
root.comments=[]
root.imports={}
if(typeof src=="object"){root.is_comp=src.is_comp
root.filename=src.filename
src=src.src}
src=src.replace(/\r\n/gm,"\n")
if(src.endsWith("\\")&& !src.endsWith("\\\\")){src=src.substr(0,src.length-1)}
root.src=src
return root}
$B.py2js=function(src,module,locals_id,parent_scope,line_num){
$pos=0
if(typeof module=="object"){var __package__=module.__package__
module=module.__name__}else{var __package__=""}
parent_scope=parent_scope ||$B.builtins_scope
var t0=new Date().getTime(),has_annotations=true,
line_info,
ix,
filename
if(typeof src=='object'){var has_annotations=src.has_annotations,line_info=src.line_info ||`1,${locals_id}`
ix=src.ix,filename=src.filename
if(line_info !==undefined){line_num=parseInt(line_info.split(",")[0])}
src=src.src}else if(line_num !==undefined){line_info=`${line_num},${module}`}else{line_num=1}
var locals_is_module=Array.isArray(locals_id)
if(locals_is_module){locals_id=locals_id[0]}
if($B.parser_to_ast){if(filename=='<console>'){console.log('src in py2js',src,'\nlength',src.length)}
var _ast=new $B.Parser(src,filename).parse('file')
var symtable=$B._PySymtable_Build(_ast,filename)
var js_obj=$B.js_from_root(_ast,symtable,filename)
js_from_ast='// ast generated by parser\n'+js_obj.js
return{
imports:js_obj.imports,to_js:function(){return js_from_ast}}}else{var root=$create_root_node(
{src:src,has_annotations:has_annotations,filename:filename},module,locals_id,parent_scope,line_num)
dispatch_tokens(root)
var _ast=root.ast()
if($B.produce_ast==2){console.log(ast_dump(_ast))}
var future=$B._PyFuture_FromAST(_ast,filename)
var symtable=$B._PySymtable_Build(_ast,filename,future)
var js_obj=$B.js_from_root(_ast,symtable,filename)
js_from_ast='// ast generated by parser\n'+js_obj.js
root._ast=_ast
root.to_js=function(){return js_from_ast}
root.imports=js_obj.imports
return root}}
$B.set_import_paths=function(){
var meta_path=[],path_hooks=[]
if($B.use_VFS){meta_path.push($B.finders.VFS)}
if($B.$options.static_stdlib_import !==false && $B.protocol !="file"){
meta_path.push($B.finders.stdlib_static)
if($B.path.length > 3){$B.path.shift()
$B.path.shift()}}
if($B.protocol !=="file"){meta_path.push($B.finders.path)
path_hooks.push($B.url_hook)}
if($B.$options.cpython_import){if($B.$options.cpython_import=="replace"){$B.path.pop()}
meta_path.push($B.finders.CPython)}
$B.meta_path=meta_path
$B.path_hooks=path_hooks}
$B.parse_options=function(options){
if(options===undefined){options={debug:1}}else if(typeof options=='number'){options={debug:options}}else if(typeof options !=='object'){console.warn('ignoring invalid argument passed to brython():',options)
options={debug:1}}
if(options.debug===undefined){options.debug=1}
$B.debug=options.debug
_b_.__debug__=$B.debug > 0
$B.compile_time=0
if(options.profile===undefined){options.profile=0}
$B.profile=options.profile
if(options.indexedDB===undefined){options.indexedDB=true}
if(options.static_stdlib_import===undefined){options.static_stdlib_import=true}
$B.static_stdlib_import=options.static_stdlib_import
$B.$options=options
$B.set_import_paths()
var $href=$B.script_path=_window.location.href,$href_elts=$href.split('/')
$href_elts.pop()
if($B.isWebWorker ||$B.isNode){$href_elts.pop()}
$B.curdir=$href_elts.join('/')
if(options.pythonpath !==undefined){$B.path=options.pythonpath
$B.$options.static_stdlib_import=false}
options.python_extension=options.python_extension ||'.py'
if(options.python_paths){for(var path of options.python_paths){var lang,prefetch
if(typeof path !=="string"){lang=path.lang
prefetch=path.prefetch
path=path.path}
$B.path.push(path)
if(path.slice(-7).toLowerCase()=='.vfs.js' &&
(prefetch===undefined ||prefetch===true)){$B.path_importer_cache[path+'/']=
$B.imported['_importlib'].VFSPathFinder(path)}
if(lang){_importlib.optimize_import_for_path(path,lang)}}}
if(!($B.isWebWorker ||$B.isNode)){
var path_links=document.querySelectorAll('head link[rel~=pythonpath]'),_importlib=$B.imported['_importlib']
for(var i=0,e;e=path_links[i];++i){var href=e.href;
if((' '+e.rel+' ').indexOf(' prepend ')!=-1){$B.path.unshift(href);}else{$B.path.push(href);}
var filetype=e.hreflang
if(filetype){if(filetype.slice(0,2)=='x-'){filetype=filetype.slice(2)}
_importlib.optimize_import_for_path(e.href,filetype)}}}
if($B.$options.args){$B.__ARGV=$B.$options.args}else{$B.__ARGV=_b_.list.$factory([])}
return options}
if(!($B.isWebWorker ||$B.isNode)){var observer=new MutationObserver(function(mutations){for(var i=0;i < mutations.length;i++){for(var j=0;j < mutations[i].addedNodes.length;j++){checkPythonScripts(mutations[i].addedNodes[j]);}}});
observer.observe(document.documentElement,{childList:true,subtree:true});}
function checkPythonScripts(addedNode){if(addedNode.tagName=='SCRIPT' && addedNode.type=="text/python"){var options={}
for(var attr of addedNode.attributes){if(attr.nodeName=="type"){continue}else if(attr.nodeName=='debug'){options[attr.nodeName]=parseInt(attr.nodeValue)}else{options[attr.nodeName]=attr.nodeValue}}}}
var brython=$B.parser.brython=function(options){options=$B.parse_options(options)
if(!($B.isWebWorker ||$B.isNode)){observer.disconnect()}else{return}
if(options===undefined){options={}}
var kk=Object.keys(_window)
var defined_ids={},$elts=[],webworkers=[]
var ids=options.ids ||options.ipy_id
if(ids !==undefined){if(!Array.isArray(ids)){throw _b_.ValueError.$factory("ids is not a list")}
var scripts=[]
for(var id of options.ids){var elt=document.getElementById(id)
if(elt===null){throw _b_.KeyError.$factory(`no script with id '${id}'`)}
if(elt.tagName !=="SCRIPT"){throw _b_.KeyError.$factory(`element ${id} is not a script`)}
scripts.push(elt)}}else{var scripts=document.getElementsByTagName('script')}
for(var i=0;i < scripts.length;i++){var script=scripts[i]
if(script.type=="text/python" ||script.type=="text/python3"){if(script.className=="webworker"){if(script.id===undefined){throw _b_.AttributeError.$factory(
"webworker script has no attribute 'id'")}
webworkers.push(script)}else{$elts.push(script)}}}
var first_script=true,module_name
if(options.ipy_id !==undefined){module_name='__main__'
var $src="",js,root
for(var elt of $elts){$src+=(elt.innerHTML ||elt.textContent)}
try{
root=$B.py2js($src,module_name,module_name)
js=root.to_js()
if($B.debug > 1){$log(js)}
eval(js)
$B.clear_ns(module_name)
root=null
js=null}catch($err){root=null
js=null
console.log($err)
if($B.debug > 1){console.log($err)
for(var attr in $err){console.log(attr+' : ',$err[attr])}}
if($err.$py_error===undefined){console.log('Javascript error',$err)
$err=_b_.RuntimeError.$factory($err+'')}
var $trace=$B.$getattr($err,'info')+'\n'+$err.__name__+
': '+$err.args
try{$B.$getattr($B.stderr,'write')($trace)}catch(print_exc_err){console.log($trace)}
throw $err}}else{if($elts.length > 0){if(options.indexedDB && $B.has_indexedDB &&
$B.hasOwnProperty("VFS")){$B.tasks.push([$B.idb_open])}}
for(var i=0;i < $elts.length;i++){var elt=$elts[i]
if(elt.id){if(defined_ids[elt.id]){throw Error("Brython error : Found 2 scripts with the "+
"same id '"+elt.id+"'")}else{defined_ids[elt.id]=true}}}
var src
for(var i=0,len=webworkers.length;i < len;i++){var worker=webworkers[i]
if(worker.src){
$B.tasks.push([$B.ajax_load_script,{name:worker.id,url:worker.src,is_ww:true}])}else{
src=(worker.innerHTML ||worker.textContent)
src=unindent(src)
src=src.replace(/^\n/,'')
$B.webworkers[worker.id]=src
var filename=$B.script_path+"#"+worker.id
$B.url2name[filename]=worker.id
$B.file_cache[filename]=src}}
for(var i=0;i < $elts.length;i++){var elt=$elts[i]
if(elt.type=="text/python" ||elt.type=="text/python3"){
if(elt.id){module_name=elt.id}else{
if(first_script){module_name='__main__'
first_script=false}else{module_name='__main__'+$B.UUID()}
while(defined_ids[module_name]!==undefined){module_name='__main__'+$B.UUID()}}
if(elt.src){
$B.tasks.push([$B.ajax_load_script,{name:module_name,url:elt.src,id:elt.id}])}else{
src=(elt.innerHTML ||elt.textContent)
src=unindent(src)
src=src.replace(/^\n/,'')
if(src.endsWith('\n')){src=src.substr(0,src.length-1)}
var filename=$B.script_path+"#"+module_name
$B.file_cache[filename]=src
$B.url2name[filename]=module_name
$B.tasks.push([$B.run_script,src,module_name,filename,true])}}}}
if(options.ipy_id===undefined){$B.loop()}}
$B.run_script=function(src,name,url,run_loop){
$B.file_cache[url]=src
$B.url2name[url]=name
try{var root=$B.py2js({src:src,filename:url},name,name),js=root.to_js(),script={__doc__:root.__doc__,js:js,__name__:name,$src:src,__file__:url}
if($B.debug > 1){console.log($B.format_indent(js,0))}}catch(err){return $B.handle_error(err)}
if($B.hasOwnProperty("VFS")&& $B.has_indexedDB){
var imports1=Object.keys(root.imports).slice(),imports=imports1.filter(function(item){return $B.VFS.hasOwnProperty(item)})
for(var name of Object.keys(imports)){if($B.VFS.hasOwnProperty(name)){var submodule=$B.VFS[name],type=submodule[0]
if(type==".py"){var src=submodule[1],subimports=submodule[2],is_package=submodule.length==4
if(type==".py"){
required_stdlib_imports(subimports)}
for(var mod of subimports){if(imports.indexOf(mod)==-1){imports.push(mod)}}}}}
for(var j=0;j < imports.length;j++){$B.tasks.push([$B.inImported,imports[j]])}
root=null}
$B.tasks.push(["execute",script])
if(run_loop){$B.loop()}}
var $log=$B.$log=function(js){js.split("\n").forEach(function(line,i){console.log(i+1,":",line)})}
$B.$operators=$operators
$B.$Node=$Node
$B.brython=brython})(__BRYTHON__)
var brython=__BRYTHON__.brython
if(__BRYTHON__.isNode){global.__BRYTHON__=__BRYTHON__
module.exports={__BRYTHON__ }}
;

(function($B){var _b_=$B.builtins
if($B.VFS_timestamp && $B.VFS_timestamp > $B.timestamp){
$B.timestamp=$B.VFS_timestamp}
function idb_load(evt,module){
var res=evt.target.result
var timestamp=$B.timestamp
if(res===undefined ||res.timestamp !=$B.timestamp ||
($B.VFS[module]&& res.source_ts !==$B.VFS[module].timestamp)){
if($B.VFS[module]!==undefined){var elts=$B.VFS[module],ext=elts[0],source=elts[1]
if(ext==".py"){var imports=elts[2],is_package=elts.length==4,source_ts=elts.timestamp,__package__
if(is_package){__package__=module}
else{var parts=module.split(".")
parts.pop()
__package__=parts.join(".")}
$B.imported[module]=$B.module.$factory(module,"",__package__)
$B.url2name[module]=module
try{var root=$B.py2js(
{src:source,filename:module},module,module),js=root.to_js()}catch(err){$B.handle_error(err)}
delete $B.imported[module]
if($B.debug > 1){console.log("precompile",module)}}else{console.log('bizarre',module,ext)}}else{}}else{
if(res.is_package){$B.precompiled[module]=[res.content]}else{$B.precompiled[module]=res.content}
if(res.imports.length > 0){
if($B.debug > 1){console.log(module,"imports",res.imports)}
var subimports=res.imports.split(",")
for(var i=0;i < subimports.length;i++){var subimport=subimports[i]
if(subimport.startsWith(".")){
var url_elts=module.split("."),nb_dots=0
while(subimport.startsWith(".")){nb_dots++
subimport=subimport.substr(1)}
var elts=url_elts.slice(0,nb_dots)
if(subimport){elts=elts.concat([subimport])}
subimport=elts.join(".")}
if(!$B.imported.hasOwnProperty(subimport)&&
!$B.precompiled.hasOwnProperty(subimport)){
if($B.VFS.hasOwnProperty(subimport)){var submodule=$B.VFS[subimport],ext=submodule[0],source=submodule[1]
if(submodule[0]==".py"){$B.tasks.splice(0,0,[idb_get,subimport])}else{add_jsmodule(subimport,source)}}}}}}
loop()}
function store_precompiled(module,js,source_ts,imports,is_package){
var db=$B.idb_cx.result,tx=db.transaction("modules","readwrite"),store=tx.objectStore("modules"),cursor=store.openCursor(),data={"name":module,"content":js,"imports":imports,"origin":origin,"timestamp":__BRYTHON__.timestamp,"source_ts":source_ts,"is_package":is_package},request=store.put(data)
if($B.debug > 1){console.log("store precompiled",module,"package",is_package)}
document.dispatchEvent(new CustomEvent('precompile',{detail:'cache module '+module}))
var ix=$B.outdated.indexOf(module)
if(ix >-1){$B.outdated.splice(ix,1)}
request.onsuccess=function(evt){
$B.tasks.splice(0,0,[idb_get,module])
loop()}}
function idb_get(module){
var db=$B.idb_cx.result,tx=db.transaction("modules","readonly")
try{var store=tx.objectStore("modules")
req=store.get(module)
req.onsuccess=function(evt){idb_load(evt,module)}}catch(err){console.info('error',err)}}
$B.idb_open=function(obj){$B.idb_name="brython-cache"
var idb_cx=$B.idb_cx=indexedDB.open($B.idb_name)
idb_cx.onsuccess=function(){var db=idb_cx.result
if(!db.objectStoreNames.contains("modules")){var version=db.version
db.close()
console.info('create object store',version)
idb_cx=indexedDB.open($B.idb_name,version+1)
idb_cx.onupgradeneeded=function(){console.info("upgrade needed")
var db=$B.idb_cx.result,store=db.createObjectStore("modules",{"keyPath":"name"})
store.onsuccess=loop}
idb_cx.onversionchanged=function(){console.log("version changed")}
idb_cx.onsuccess=function(){console.info("db opened",idb_cx)
var db=idb_cx.result,store=db.createObjectStore("modules",{"keyPath":"name"})
store.onsuccess=loop}}else{if($B.debug > 1){console.info("using indexedDB for stdlib modules cache")}
var tx=db.transaction("modules","readwrite"),store=tx.objectStore("modules"),record,outdated=[]
var openCursor=store.openCursor()
openCursor.onerror=function(evt){console.log("open cursor error",evt)}
openCursor.onsuccess=function(evt){cursor=evt.target.result
if(cursor){record=cursor.value
if(record.timestamp==$B.timestamp){if(!$B.VFS ||!$B.VFS[record.name]||
$B.VFS[record.name].timestamp==record.source_ts){
if(record.is_package){$B.precompiled[record.name]=[record.content]}else{$B.precompiled[record.name]=record.content}
if($B.debug > 1){console.info("load from cache",record.name)}}else{
outdated.push(record.name)}}else{outdated.push(record.name)}
cursor.continue()}else{if($B.debug > 1){console.log("done")}
$B.outdated=outdated
loop()}}}}
idb_cx.onupgradeneeded=function(){console.info("upgrade needed")
var db=idb_cx.result,store=db.createObjectStore("modules",{"keyPath":"name"})
store.onsuccess=loop}
idb_cx.onerror=function(){console.info('could not open indexedDB database')
$B.idb_cx=null
$B.idb_name=null
$B.$options.indexedDB=false
loop()}}
$B.ajax_load_script=function(script){var url=script.url,name=script.name,rel_path=url.substr($B.script_dir.length+1)
if($B.files && $B.files.hasOwnProperty(rel_path)){
$B.tasks.splice(0,0,[$B.run_script,atob($B.files[rel_path].content),name,url,true])
loop()}else if($B.protocol !="file"){var req=new XMLHttpRequest(),qs=$B.$options.cache ? '' :
(url.search(/\?/)>-1 ? '&' :'?')+Date.now()
req.open("GET",url+qs,true)
req.onreadystatechange=function(){if(this.readyState==4){if(this.status==200){var src=this.responseText
if(script.is_ww){$B.webworkers[name]=src}else{$B.tasks.splice(0,0,[$B.run_script,src,name,url,true])}
loop()}else if(this.status==404){throw Error(url+" not found")}}}
req.send()}else{throw _b_.IOError.$factory("can't load external script at "+
script.url+" (Ajax calls not supported with protocol file:///)")}}
function add_jsmodule(module,source){
source+="\nvar $locals_"+
module.replace(/\./g,"_")+" = $module"
$B.precompiled[module]=source}
var inImported=$B.inImported=function(module){if($B.imported.hasOwnProperty(module)){}else if(__BRYTHON__.VFS && __BRYTHON__.VFS.hasOwnProperty(module)){var elts=__BRYTHON__.VFS[module]
if(elts===undefined){console.log('bizarre',module)}
var ext=elts[0],source=elts[1],is_package=elts.length==4
if(ext==".py"){if($B.idb_cx && !$B.idb_cx.$closed){$B.tasks.splice(0,0,[idb_get,module])}}else{add_jsmodule(module,source)}}else{console.log("bizarre",module)}
loop()}
var loop=$B.loop=function(){if($B.tasks.length==0){
if($B.idb_cx && ! $B.idb_cx.$closed){var db=$B.idb_cx.result,tx=db.transaction("modules","readwrite"),store=tx.objectStore("modules")
while($B.outdated.length > 0){var module=$B.outdated.pop(),req=store.delete(module)
req.onsuccess=(function(mod){return function(event){if($B.debug > 1){console.info("delete outdated",mod)}
document.dispatchEvent(new CustomEvent('precompile',{detail:'remove outdated '+mod+
' from cache'}))}})(module)}
document.dispatchEvent(new CustomEvent('precompile',{detail:"close"}))
$B.idb_cx.result.close()
$B.idb_cx.$closed=true}
document.dispatchEvent(new CustomEvent("brython_done",{detail:$B.obj_dict($B.$options)}))
return}
var task=$B.tasks.shift(),func=task[0],args=task.slice(1)
if(func=="execute"){try{var script=task[1],script_id=script.__name__.replace(/\./g,"_"),module=$B.module.$factory(script.__name__)
module.$src=script.$src
module.__file__=script.__file__
$B.imported[script_id]=module
var module=new Function(script.js+`\nreturn locals`)()
for(var key in module){if(! key.startsWith('$')){$B.imported[script_id][key]=module[key]}}}catch(err){
if(err.__class__===undefined){console.log('Javascript error',err)
var lineNumber=err.lineNumber
if(lineNumber !==undefined){console.log('around line',lineNumber)
console.log(script.js.split('\n').
slice(lineNumber-4,lineNumber).join('\n'))
console.log('script\n',script.js)}
if($B.is_recursion_error(err)){err=_b_.RecursionError.$factory("too much recursion")}else{$B.print_stack()
err=_b_.RuntimeError.$factory(err+'')}}
$B.handle_error(err)}
loop()}else{
try{func.apply(null,args)}catch(err){$B.handle_error(err)}}}
$B.tasks=[]
$B.has_indexedDB=self.indexedDB !==undefined
function required_stdlib_imports(imports,start){
var nb_added=0
start=start ||0
for(var i=start;i < imports.length;i++){var module=imports[i]
if($B.imported.hasOwnProperty(module)){continue}
var mod_obj=$B.VFS[module]
if(mod_obj===undefined){console.log("undef",module)}
if(mod_obj[0]==".py"){var subimports=mod_obj[2]
subimports.forEach(function(subimport){if(!$B.imported.hasOwnProperty(subimport)&&
imports.indexOf(subimport)==-1){if($B.VFS.hasOwnProperty(subimport)){imports.push(subimport)
nb_added++}}})}}
if(nb_added){required_stdlib_imports(imports,imports.length-nb_added)}
return imports}})(__BRYTHON__)
;
__BRYTHON__.builtins.object=(function($B){var _b_=$B.builtins
var object={
$infos:{__name__:"object"},$is_class:true,$native:true}
var opnames=["add","sub","mul","truediv","floordiv","mod","pow","lshift","rshift","and","xor","or"]
var opsigns=["+","-","*","/","//","%","**","<<",">>","&","^","|"]
object.__delattr__=function(self,attr){if(self.__dict__ && self.__dict__.$string_dict &&
self.__dict__.$string_dict[attr]!==undefined){delete self.__dict__.$string_dict[attr]
return _b_.None}else if(self.__dict__===undefined && self[attr]!==undefined){delete self[attr]
return _b_.None}else{
var klass=self.__class__
if(klass){var prop=$B.$getattr(klass,attr)
if(prop.__class__===_b_.property){if(prop.__delete__ !==undefined){prop.__delete__(self)
return _b_.None}}}}
throw $B.attr_error(attr,self)}
object.__dir__=function(self){var objects
if(self.$is_class){objects=[self].concat(self.__mro__)}else{var klass=self.__class__ ||$B.get_class(self)
objects=[self,klass].concat(klass.__mro__)}
var res=[]
for(var i=0,len=objects.length;i < len;i++){for(var attr in objects[i]){if(attr.charAt(0)=="$"){if(attr.charAt(1)=="$"){
res.push(attr.substr(2))}
continue}
if(! isNaN(parseInt(attr.charAt(0)))){
continue}
if(attr=="__mro__"){continue}
res.push(attr)}}
if(self.__dict__){for(var attr in self.__dict__.$string_dict){if(attr.charAt(0)!="$"){res.push(attr)}}}
res=_b_.list.$factory(_b_.set.$factory(res))
_b_.list.sort(res)
return res}
object.__eq__=function(self,other){
if(self===other){return true}
return _b_.NotImplemented}
object.__format__=function(){var $=$B.args("__format__",2,{self:null,spec:null},["self","spec"],arguments,{},null,null)
if($.spec !==""){throw _b_.TypeError.$factory(
"non-empty format string passed to object.__format__")}
return _b_.getattr($.self,"__str__")()}
object.__ge__=function(){return _b_.NotImplemented}
object.__getattribute__=function(obj,attr){var klass=obj.__class__ ||$B.get_class(obj),is_own_class_instance_method=false
var $test=false 
if($test){console.log("attr",attr,"de",obj,"klass",klass)}
if(attr==="__class__"){return klass}
var res=obj[attr]
if(Array.isArray(obj)&& Array.prototype[attr]!==undefined){
res=undefined}
if(res===undefined && obj.__dict__){var dict=obj.__dict__
if(dict.$string_dict.hasOwnProperty(attr)){if($test){console.log("__dict__ hasOwnProperty",attr,dict.$string_dict[attr])}
return dict.$string_dict[attr][0]}}
if(res===undefined){
function check(obj,kl,attr){var v=kl[attr]
if(v !==undefined){return v}}
res=check(obj,klass,attr)
if(res===undefined){var mro=klass.__mro__
for(var i=0,len=mro.length;i < len;i++){res=check(obj,mro[i],attr)
if(res !==undefined){if($test){console.log("found in",mro[i])}
break}}}else{if(res.__class__ !==$B.method && res.__get__===undefined){
is_own_class_instance_method=true}}}else{if(res.__set__===undefined){
return res}}
if(res !==undefined){if($test){console.log(res)}
if(res.__class__ && _b_.issubclass(res.__class__,_b_.property)){return $B.$getattr(res,'__get__')(obj,klass)}
if(res.__class__===$B.method){if($test){console.log("res is method")}
if(res.__get__===undefined){console.log("bizarre",obj,attr,res)}
return res.__get__(obj,klass)}
var get=res.__get__
if(get===undefined && res.__class__){var get=res.__class__.__get__
for(var i=0;i < res.__class__.__mro__.length &&
get===undefined;i++){get=res.__class__.__mro__[i].__get__}}
if($test){console.log("get",get)}
var __get__=get===undefined ? null :
$B.$getattr(res,"__get__",null)
if($test){console.log("__get__",__get__)}
if(__get__ !==null){try{return __get__.apply(null,[obj,klass])}
catch(err){
throw err}}
if(typeof res=="object"){if(__get__ &&(typeof __get__=="function")){get_func=function(x,y){return __get__.apply(x,[y,klass.$factory])}}}
if(__get__===null &&(typeof res=="function")){__get__=function(x){return x}}
if(__get__ !==null){
res.__name__=attr
if(attr=="__new__" ||
res.__class__===$B.builtin_function){res.$type="staticmethod"}
var res1=__get__.apply(null,[res,obj,klass])
if($test){console.log("res",res,"res1",res1)}
if(typeof res1=="function"){
if(res1.__class__===$B.method){return res}
if(res.$type=="staticmethod"){return res}
else{var self=res.__class__===$B.method ? klass :obj,method=function(){var args=[self]
for(var i=0,len=arguments.length;i < len;i++){args.push(arguments[i])}
return res.apply(this,args)}
method.__class__=$B.method
method.__get__=function(obj,cls){var clmethod=res.bind(null,cls)
clmethod.__class__=$B.method
clmethod.$infos={__self__:cls,__func__:res,__name__:res.$infos.__name__,__qualname__:cls.$infos.__name__+"."+
res.$infos.__name__}
return clmethod}
method.__get__.__class__=$B.method_wrapper
method.__get__.$infos=res.$infos
if(klass.$infos===undefined){console.log("no $infos",klass)
console.log($B.last($B.frames_stack))}
method.$infos={__self__:self,__func__:res,__name__:attr,__qualname__:klass.$infos.__name__+"."+attr}
if($test){console.log("return method",method)}
if(is_own_class_instance_method){obj.$method_cache=obj.$method_cache ||{}
obj.$method_cache[attr]=[method,res]}
return method}}else{
return res1}}
return res}else{throw $B.attr_error(attr,obj)}}
object.__gt__=function(){return _b_.NotImplemented}
object.__hash__=function(self){var hash=self.__hashvalue__
if(hash !==undefined){return hash}
return self.__hashvalue__=$B.$py_next_hash--}
object.__init__=function(){if(arguments.length==0){throw _b_.TypeError.$factory("descriptor '__init__' of 'object' "+
"object needs an argument")}
return _b_.None}
object.__init_subclass__=function(){
var $=$B.args("__init_subclass__",0,{},[],arguments,{},null,null)
return _b_.None}
object.__init_subclass__.$type="staticmethod"
object.__le__=function(){return _b_.NotImplemented}
object.__lt__=function(){return _b_.NotImplemented}
object.__mro__=[]
object.__new__=function(cls,...args){if(cls===undefined){throw _b_.TypeError.$factory("object.__new__(): not enough arguments")}
var init_func=$B.$getattr(cls,"__init__")
if(init_func===object.__init__){if(args.length > 0){throw _b_.TypeError.$factory("object() takes no parameters")}}
var res=Object.create(null)
$B.update_obj(res,{__class__ :cls,__dict__:$B.empty_dict()})
return res}
object.__ne__=function(self,other){
if(self===other){return false}
var eq=$B.$getattr(self.__class__ ||$B.get_class(self),"__eq__",null)
if(eq !==null){var res=$B.$call(eq)(self,other)
if(res===_b_.NotImplemented){return res}
return ! $B.$bool(res)}
return _b_.NotImplemented}
object.__reduce__=function(self){function _reconstructor(cls){return $B.$call(cls)()}
_reconstructor.$infos={__qualname__:"_reconstructor"}
var res=[_reconstructor]
res.push(_b_.tuple.$factory([self.__class__].
concat(self.__class__.__mro__)))
var d=$B.empty_dict()
for(var attr in self.__dict__.$string_dict){_b_.dict.$setitem(d.$string_dict,attr,self.__dict__.$string_dict[attr][0])}
console.log("object.__reduce__, d",d)
res.push(d)
return _b_.tuple.$factory(res)}
function __newobj__(cls){return $B.$getattr(cls,"__new__").apply(null,arguments)}
__newobj__.$infos={__name__:"__newobj__",__qualname__:"__newobj__"}
_b_.__newobj__=__newobj__
object.__reduce_ex__=function(self){var res=[__newobj__]
var arg2=_b_.tuple.$factory([self.__class__])
if(Array.isArray(self)){self.forEach(function(item){arg2.push(item)})}
res.push(arg2)
var d=$B.empty_dict(),nb=0
if(self.__dict__===undefined){throw _b_.TypeError.$factory("cannot pickle '"+
$B.class_name(self)+"' object")}
for(var attr in self.__dict__.$string_dict){if(attr=="__class__" ||attr.startsWith("$")){continue}
_b_.dict.$setitem(d,attr,self.__dict__.$string_dict[attr][0])
nb++}
if(nb==0){d=_b_.None}
res.push(d)
res.push(_b_.None)
return _b_.tuple.$factory(res)}
object.__repr__=function(self){if(self===object){return "<class 'object'>"}
if(self.__class__===_b_.type){return "<class '"+self.__name__+"'>"}
var module=self.__class__.$infos.__module__
if(module !==undefined && !module.startsWith("$")&&
module !=="builtins"){return "<"+self.__class__.$infos.__module__+"."+
$B.class_name(self)+" object>"}else{return "<"+$B.class_name(self)+" object>"}}
object.__setattr__=function(self,attr,val){if(val===undefined){
throw _b_.TypeError.$factory(
"can't set attributes of built-in/extension type 'object'")}else if(self.__class__===object){
if(object[attr]===undefined){throw $B.attr_error(attr,self)}else{throw _b_.AttributeError.$factory(
"'object' object attribute '"+attr+"' is read-only")}}
if(self.__dict__){_b_.dict.$setitem(self.__dict__,attr,val)}else{
self[attr]=val}
return _b_.None}
object.__setattr__.__get__=function(obj){return function(attr,val){object.__setattr__(obj,attr,val)}}
object.__setattr__.__str__=function(){return "method object.setattr"}
object.__str__=function(self){
var len=arguments.length
if(len==0){throw _b_.TypeError.$factory("descriptor '__str__' of 'object' "+
"object needs an argument")}else if(len > 1){throw _b_.TypeError.$factory("descriptor '__str__' of 'object' "+
"expects 1 argument, got "+len)}else if(self.$nat=='kw'){throw _b_.TypeError.$factory("descriptor '__str__' of 'object' "+
"doesn't accept keyword arguments")}
if(self.$is_class ||self.$factory){var class_str=$B.$getattr(self.__class__ ||$B.get_class(self),'__str__',null)
if(class_str !==null && class_str !==object.__str__){return class_str(self)}
var class_repr=$B.$getattr(self.__class__ ||$B.get_class(self),'__repr__',null)
if(class_repr !==null && class_repr !==object.__repr__){return class_repr(self)}}else{
var repr_func=$B.$getattr(self,"__repr__")
return $B.$call(repr_func)()}}
object.__subclasshook__=function(){return _b_.NotImplemented}
object.$factory=function(){var res={__class__:object},args=[res].concat(Array.prototype.slice.call(arguments))
object.__init__.apply(null,args)
return res}
$B.set_func_names(object,"builtins")
$B.make_class=function(qualname,factory){
var A={__class__:_b_.type,__mro__:[object],$infos:{__qualname__:qualname,__name__:$B.last(qualname.split('.'))},$is_class:true}
A.$factory=factory
return A}
return object})(__BRYTHON__)
;
;(function($B){var _b_=$B.builtins
$B.$class_constructor=function(class_name,class_obj,bases,parents_names,kwargs){bases=bases ||[]
var metaclass
var module=class_obj.__module__
if(module===undefined){
module=class_obj.__module__=$B.last($B.frames_stack)[2]}
for(var i=0;i < bases.length;i++){if(bases[i]===undefined){
$B.line_info=class_obj.$def_line
throw $B.name_error(parents_names[i])}}
var extra_kwargs={},prepare_kwargs={}
if(kwargs){for(var i=0;i < kwargs.length;i++){var key=kwargs[i][0],val=kwargs[i][1]
if(key=="metaclass"){
metaclass=val}else{
extra_kwargs[key]=val}
prepare_kwargs[key]=val}}
var mro0=class_obj
if(class_obj.__eq__ !==undefined && class_obj.__hash__===undefined){class_obj.__hash__=_b_.None}
var orig_bases=bases.slice(),use_mro_entries=false
for(var i=0;i < bases.length;i++){if(bases[i]===undefined ||
(bases[i].__mro__===undefined)){var mro_entries=$B.$getattr(bases[i],"__mro_entries__",_b_.None)
if(mro_entries !==_b_.None){var entries=_b_.list.$factory(mro_entries(bases))
bases.splice(i,1,...entries)
use_mro_entries=true
i--
continue}}}
if(metaclass===undefined){metaclass=meta_from_bases(class_name,module,bases)}
var prepare=$B.$getattr(metaclass,"__prepare__",_b_.None),cl_dict=$B.$call(prepare)(class_name,bases)
if(cl_dict.__class__ !==_b_.dict){var set_class_item=$B.$getattr(cl_dict,"__setitem__")}else{var set_class_item=function(attr,value){cl_dict.$string_dict[attr]=[value,cl_dict.$order++]}}
for(var attr in class_obj){if(attr=="__annotations__"){if(cl_dict.$string_dict[attr]===undefined){cl_dict.$string_dict[attr]=[$B.empty_dict(),cl_dict.$order++]}
for(var key in class_obj[attr].$string_dict){$B.$setitem(cl_dict.$string_dict[attr][0],key,class_obj[attr].$string_dict[key][0])}}else{if(attr.charAt(0)!="$"){set_class_item(attr,class_obj[attr])}}}
if(use_mro_entries){set_class_item("__orig_bases__",_b_.tuple.$factory(orig_bases))}
var class_dict={__bases__:bases,__class__:metaclass,__dict__:cl_dict}
if(cl_dict.__class__===_b_.dict){for(var key in cl_dict.$string_dict){class_dict[key]=cl_dict.$string_dict[key][0]}}else{var get_class_item=$B.$getattr(cl_dict,"__getitem__")
var it=_b_.iter(cl_dict)
while(true){try{var key=_b_.next(it)
class_dict[key]=get_class_item(key)}catch(err){break}}}
class_dict.__mro__=_b_.type.mro(class_dict).slice(1)
var is_instanciable=true,non_abstract_methods={},abstract_methods={},mro=[class_dict].concat(class_dict.__mro__)
for(var i=0;i < mro.length;i++){var kdict=i==0 ? mro0 :mro[i]
for(var attr in kdict){if(non_abstract_methods[attr]){continue}
var v=kdict[attr]
if(typeof v=="function"){if(v.__isabstractmethod__===true ||
(v.$attrs && v.$attrs.__isabstractmethod__)){is_instanciable=false
abstract_methods[attr]=true}else{non_abstract_methods[attr]=true}}else{non_abstract_methods[attr]=true}}}
var _slots=class_obj.__slots__
if(_slots !==undefined){if(typeof _slots=="string"){_slots=[_slots]}else{_slots=_b_.list.$factory(_slots)}
cl_dict.__slots__=_slots}
for(var i=0;i < mro.length-1;i++){for(var attr in mro[i]){if(attr=="__setattr__"){cl_dict.$has_setattr=true
break}else if(mro[i][attr]){if(mro[i][attr].__get__ ||(mro[i][attr].__class__ &&
mro[i][attr].__class__.__get__)){
cl_dict.$has_setattr=true
break}}}}
var meta_new=_b_.type.__getattribute__(metaclass,"__new__")
var kls=meta_new(metaclass,class_name,bases,cl_dict,{$nat:'kw',kw:extra_kwargs})
kls.__module__=module
kls.$infos={__module__:module,__name__:class_name,__qualname__:class_obj.$qualname}
kls.$subclasses=[]
if(kls.__bases__===undefined ||kls.__bases__.length==0){kls.__bases__=$B.fast_tuple([_b_.object])}
for(var attr in class_obj){if(attr.charAt(0)!="$"){if(typeof class_obj[attr]=="function"){class_obj[attr].$infos.$class=kls}}}
if(kls.__class__===metaclass){
var meta_init=_b_.type.__getattribute__(metaclass,"__init__")
meta_init(kls,class_name,bases,cl_dict)}
for(var i=0;i < bases.length;i++){bases[i].$subclasses=bases[i].$subclasses ||[]
bases[i].$subclasses.push(kls)}
if(!is_instanciable){function nofactory(){throw _b_.TypeError.$factory("Can't instantiate abstract class "+
"interface with abstract methods "+
Object.keys(abstract_methods).join(", "))}
kls.$factory=nofactory}
kls.__qualname__=class_name
return kls}
function meta_from_bases(class_name,module,bases){var metaclass
if(bases && bases.length > 0){metaclass=bases[0].__class__
if(metaclass===undefined){
if(typeof bases[0]=="function"){if(bases.length !=1){throw _b_.TypeError.$factory("A Brython class "+
"can inherit at most 1 Javascript constructor")}
metaclass=bases[0].__class__=$B.JSMeta
$B.set_func_names(bases[0],module)}else{throw _b_.TypeError.$factory("Argument of "+class_name+
"is not a class (type '"+$B.class_name(bases[0])+
"')")}}
for(var i=1;i < bases.length;i++){var mc=bases[i].__class__
if(mc===metaclass ||_b_.issubclass(metaclass,mc)){}else if(_b_.issubclass(mc,metaclass)){metaclass=mc}else if(metaclass.__bases__ &&
metaclass.__bases__.indexOf(mc)==-1){throw _b_.TypeError.$factory("metaclass conflict: the "+
"metaclass of a derived class must be a (non-"+
"strict) subclass of the metaclasses of all its bases")}}}else{metaclass=_b_.type}
return metaclass}
var type=$B.make_class("type",function(obj,bases,cl_dict){var len=arguments.length
if(len==1){if(obj===undefined){return $B.UndefinedClass}
return obj.__class__ ||$B.get_class(obj)}else if(len==3){var module=$B.last($B.frames_stack)[2],meta=meta_from_bases(obj,module,bases)
return type.__new__(meta,obj,bases,cl_dict)}else{throw _b_.TypeError.$factory('type() takes 1 or 3 arguments')}}
)
type.__call__=function(){var extra_args=[],klass=arguments[0]
for(var i=1,len=arguments.length;i < len;i++){extra_args.push(arguments[i])}
var new_func=_b_.type.__getattribute__(klass,"__new__")
var instance=new_func.apply(null,arguments),instance_class=instance.__class__ ||$B.get_class(instance)
if(instance_class===klass){
var init_func=_b_.type.__getattribute__(klass,"__init__")
if(init_func !==_b_.object.__init__){
var args=[instance].concat(extra_args)
init_func.apply(null,args)}}
return instance}
type.__class__=type
type.__format__=function(klass,fmt_spec){
return _b_.str.$factory(klass)}
type.__getattribute__=function(klass,attr){switch(attr){case "__bases__":
var res=klass.__bases__ 
res.__class__=_b_.tuple
if(res.length==0){}
return res
case "__class__":
return klass.__class__
case "__doc__":
return klass.__doc__ ||_b_.None
case "__setattr__":
if(klass["__setattr__"]!==undefined){var func=klass["__setattr__"]}else{var func=function(obj,key,value){obj[key]=value}}
return method_wrapper.$factory(attr,klass,func)
case "__delattr__":
if(klass["__delattr__"]!==undefined){return klass["__delattr__"]}
return method_wrapper.$factory(attr,klass,function(key){delete klass[key]})}
var res=klass[attr]
var $test=false 
if($test){console.log("attr",attr,"of",klass,res,res+"")}
if(res===undefined && klass.__slots__ &&
klass.__slots__.indexOf(attr)>-1){return member_descriptor.$factory(attr,klass)}
if(klass.__class__ &&
klass.__class__[attr]&&
klass.__class__[attr].__get__ &&
klass.__class__[attr].__set__){
if($test){console.log("data descriptor")}
return klass.__class__[attr].__get__(klass)}
if(res===undefined){
var v=klass[attr]
if(v===undefined){var mro=klass.__mro__
if(mro===undefined){console.log("pas de mro pour",klass)}
for(var i=0;i < mro.length;i++){var v=mro[i][attr]
if(v !==undefined){res=v
break}}}else{res=v}
if(res===undefined){
var meta=klass.__class__ ||$B.get_class(klass),res=meta[attr]
if($test){console.log("search in meta",meta,res)}
if(res===undefined){var meta_mro=meta.__mro__
for(var i=0;i < meta_mro.length;i++){var res=meta_mro[i][attr]
if(res !==undefined){break}}}
if(res !==undefined){if($test){console.log("found in meta",res,typeof res)}
if(res.__class__===_b_.property){return res.fget(klass)}
if(typeof res=="function"){
var meta_method=res.bind(null,klass)
meta_method.__class__=$B.method
meta_method.$infos={__self__:klass,__func__:res,__name__:attr,__qualname__:klass.$infos.__name__+"."+attr,__module__:res.$infos ? res.$infos.__module__ :""}
if($test){console.log('return method from meta',meta_method,meta_method+'')}
return meta_method}}
if(res===undefined){
var getattr=meta.__getattr__
if(getattr===undefined){for(var i=0;i < meta_mro.length;i++){if(meta_mro[i].__getattr__ !==undefined){getattr=meta_mro[i].__getattr__
break}}}
if(getattr !==undefined){return getattr(klass,attr)}}}}
if(res !==undefined){if($test){console.log("res",res)}
if(res.__class__===_b_.property){return res}
if(res.__get__){if(res.__class__===method){var result=res.__get__(res.__func__,klass)
result.$infos={__func__:res,__name__:res.$infos.__name__,__qualname__:klass.$infos.__name__+"."+res.$infos.__name__,__self__:klass}}else{result=res.__get__(klass)}
return result}else if(res.__class__ && res.__class__.__get__){
if(!(attr.startsWith("__")&& attr.endsWith("__"))){return res.__class__.__get__(res,_b_.None,klass)}}
if(typeof res=="function"){
if(res.$infos===undefined && $B.debug > 1){console.log("warning: no attribute $infos for",res,"klass",klass,"attr",attr)}
if($test){console.log("res is function",res)}
if(attr=="__new__" ||
res.__class__===$B.builtin_function){res.$type="staticmethod"}
if(attr=="__class_getitem__" && res.__class__ !==$B.method){res=_b_.classmethod.$factory(res)}
if(attr=="__init_subclass__"){res=_b_.classmethod.$factory(res)}
if(res.__class__===$B.method){return res.__get__(null,klass)}else{if($test){console.log("return res",res)}
return res}}else{return res}}}
type.__hash__=function(cls){return _b_.hash(cls)}
type.__init__=function(){if(arguments.length==0){throw _b_.TypeError.$factory("descriptor '__init__' of 'type' "+
"object needs an argument")}}
type.__init_subclass__=function(){
var $=$B.args("__init_subclass__",1,{},[],arguments,{},"args","kwargs")
if($.kwargs !==undefined){if($.kwargs.__class__ !==_b_.dict ||
Object.keys($.kwargs.$string_dict).length > 0){throw _b_.TypeError.$factory(
"__init_subclass__() takes no keyword arguments")}}
return _b_.None}
type.__instancecheck__=function(cls,instance){var kl=instance.__class__ ||$B.get_class(instance)
if(kl===cls){return true}
else{for(var i=0;i < kl.__mro__.length;i++){if(kl.__mro__[i]===cls){return true}}}
return false}
type.__instancecheck__.$type="staticmethod"
type.__name__={__get__:function(self){return self.$infos.__name__},__set__:function(self,value){self.$infos.__name__=value},__str__:function(self){return "type"},__eq__:function(self,other){return self.$infos.__name__==other}}
type.__new__=function(meta,name,bases,cl_dict,extra_kwargs){
extra_kwargs=extra_kwargs===undefined ?{$nat:'kw',kw:{}}:
extra_kwargs
var module=cl_dict.$string_dict.__module__
if(module){module=module[0]}else{module=$B.last($B.frames_stack)[2]}
var class_dict={__class__ :meta,__bases__ :bases,__dict__ :cl_dict,$infos:{__name__:name,__module__:module,__qualname__:name},$is_class:true,$has_setattr:cl_dict.$has_setattr}
class_dict.__mro__=type.mro(class_dict).slice(1)
var items=$B.dict_to_list(cl_dict)
for(var i=0;i < items.length;i++){var key=items[i][0],v=items[i][1]
if(key==="__module__"){continue}
if(v===undefined){continue}
class_dict[key]=v
if(v.__class__){
var set_name=$B.$getattr(v.__class__,"__set_name__",_b_.None)
if(set_name !==_b_.None){set_name(v,class_dict,key)}}
if(typeof v=="function"){if(v.$infos===undefined){console.log("type new",v,v+"")
console.log($B.frames_stack.slice())}else{v.$infos.$class=class_dict
v.$infos.__qualname__=name+'.'+v.$infos.__name__
if(v.$infos.$defaults){
var $defaults=v.$infos.$defaults
$B.Function.__setattr__(v,"__defaults__",$defaults)}}}}
var sup=_b_.super.$factory(class_dict,class_dict)
var init_subclass=_b_.super.__getattribute__(sup,"__init_subclass__")
init_subclass(extra_kwargs)
return class_dict}
type.__or__=function(){var $=$B.args('__or__',2,{cls:null,other:null},['cls','other'],arguments,{},null,null),cls=$.cls,other=$.other
if(other !==_b_.None && ! _b_.isinstance(other,type)){return _b_.NotImplemented}
return $B.UnionType.$factory([cls,other])}
type.__prepare__=function(){return $B.empty_dict()}
type.__qualname__={__get__:function(self){return self.$infos.__qualname__ ||self.$infos.__name__},__set__:function(self,value){self.$infos.__qualname__=value},__str__:function(self){console.log("type.__qualname__")},__eq__:function(self,other){return self.$infos.__qualname__==other}}
type.__repr__=function(kls){$B.builtins_repr_check(type,arguments)
if(kls.$infos===undefined){console.log("no $infos",kls)}
var qualname=kls.$infos.__qualname__
if(kls.$infos.__module__ &&
kls.$infos.__module__ !="builtins" &&
!kls.$infos.__module__.startsWith("$")){qualname=kls.$infos.__module__+"."+qualname}
return "<class '"+qualname+"'>"}
type.__ror__=function(){var len=arguments.length
if(len !=1){throw _b_.TypeError.$factory(`expected 1 argument, got ${len}`)}
return _b_.NotImplemented}
type.mro=function(cls){
if(cls===undefined){throw _b_.TypeError.$factory(
'unbound method type.mro() needs an argument')}
var bases=cls.__bases__,seqs=[],pos1=0
for(var i=0;i < bases.length;i++){
var bmro=[],pos=0
if(bases[i]===undefined ||
bases[i].__mro__===undefined){if(bases[i].__class__===undefined){
return[_b_.object]}else{throw _b_.TypeError.$factory(
"Object passed as base class is not a class")}}
bmro[pos++]=bases[i]
var _tmp=bases[i].__mro__
if(_tmp[0]===bases[i]){_tmp.splice(0,1)}
for(var k=0;k < _tmp.length;k++){bmro[pos++]=_tmp[k]}
seqs[pos1++]=bmro}
seqs[pos1++]=bases.slice()
var mro=[cls],mpos=1
while(1){var non_empty=[],pos=0
for(var i=0;i < seqs.length;i++){if(seqs[i].length > 0){non_empty[pos++]=seqs[i]}}
if(non_empty.length==0){break}
for(var i=0;i < non_empty.length;i++){var seq=non_empty[i],candidate=seq[0],not_head=[],pos=0
for(var j=0;j < non_empty.length;j++){var s=non_empty[j]
if(s.slice(1).indexOf(candidate)>-1){not_head[pos++]=s}}
if(not_head.length > 0){candidate=null}
else{break}}
if(candidate===null){throw _b_.TypeError.$factory(
"inconsistent hierarchy, no C3 MRO is possible")}
mro[mpos++]=candidate
for(var i=0;i < seqs.length;i++){var seq=seqs[i]
if(seq[0]===candidate){
seqs[i].shift()}}}
if(mro[mro.length-1]!==_b_.object){mro[mpos++]=_b_.object}
return mro}
type.__subclasscheck__=function(self,subclass){
var klass=self
if(klass===_b_.str){klass=$B.StringSubclass}else if(klass===_b_.float){klass=$B.FloatSubclass}
if(subclass.__bases__===undefined){return self===_b_.object}
return subclass.__bases__.indexOf(klass)>-1}
$B.set_func_names(type,"builtins")
_b_.type=type
var wrapper_descriptor=$B.make_class("wrapper_descriptor")
$B.set_func_names(wrapper_descriptor,"builtins")
type.__call__.__class__=wrapper_descriptor
var $instance_creator=$B.$instance_creator=function(klass){
if(klass.prototype && klass.prototype.constructor==klass){
return function(){return new klass(...arguments)}}
if(klass.$instanciable !==undefined){return function(){throw _b_.TypeError.$factory(
"Can't instantiate abstract class interface "+
"with abstract methods")}}
var metaclass=klass.__class__ ||$B.get_class(klass),call_func,factory
if(metaclass===_b_.type &&(!klass.__bases__ ||klass.__bases__.length==0)){if(klass.hasOwnProperty("__new__")){if(klass.hasOwnProperty("__init__")){factory=function(){
var obj=klass.__new__.bind(null,klass).
apply(null,arguments)
klass.__init__.bind(null,obj).apply(null,arguments)
return obj}}else{factory=function(){return klass.__new__.bind(null,klass).
apply(null,arguments)}}}else if(klass.hasOwnProperty("__init__")){factory=function(){var obj={__class__:klass,__dict__:$B.empty_dict()}
klass.__init__.bind(null,obj).apply(null,arguments)
return obj}}else{factory=function(){if(arguments.length > 0){if(arguments.length==1 && arguments[0].$nat &&
Object.keys(arguments[0].kw).length==0){}else{throw _b_.TypeError.$factory("object() takes no parameters")}}
var res=Object.create(null)
$B.update_obj(res,{__class__:klass,__dict__:$B.empty_dict()})
return res}}}else{call_func=_b_.type.__getattribute__(metaclass,"__call__")
var factory=function(){return call_func.bind(null,klass).apply(null,arguments)}}
factory.__class__=$B.Function
if(klass.$infos===undefined){console.log('no klaas $infos',klass)
console.log($B.frames_stack.slice())}
factory.$infos={__name__:klass.$infos.__name__,__module__:klass.$infos.__module__}
return factory}
var method_wrapper=$B.method_wrapper=$B.make_class("method_wrapper",function(attr,klass,method){var f=function(){return method.apply(null,arguments)}
f.$infos={__name__:attr,__module__:klass.__module__}
return f}
)
method_wrapper.__str__=method_wrapper.__repr__=function(self){return "<method '"+self.$infos.__name__+"' of function object>"}
var member_descriptor=$B.make_class("member_descriptor",function(attr,cls){return{__class__:member_descriptor,cls:cls,attr:attr}}
)
member_descriptor.__str__=member_descriptor.__repr__=function(self){return "<member '"+self.attr+"' of '"+self.cls.$infos.__name__+
"' objects>"}
$B.set_func_names(member_descriptor,"builtins")
var method=$B.method=$B.make_class("method",function(func,cls){var f=function(){return $B.$call(func).bind(null,cls).apply(null,arguments)}
f.__class__=method
f.$infos=func.$infos
return f}
)
method.__eq__=function(self,other){return self.$infos !==undefined &&
other.$infos !==undefined &&
self.$infos.__func__===other.$infos.__func__ &&
self.$infos.__self__===other.$infos.__self__}
method.__ne__=function(self,other){return ! $B.method.__eq__(self,other)}
method.__get__=function(self){var f=function(){return self(arguments)}
f.__class__=$B.method_wrapper
f.$infos=method.$infos
return f}
method.__getattribute__=function(self,attr){
var infos=self.$infos
if(infos && infos[attr]){if(attr=="__code__"){var res={__class__:$B.Code}
for(var attr in infos.__code__){res[attr]=infos.__code__[attr]}
return res}else{return infos[attr]}}else if(method.hasOwnProperty(attr)){return _b_.object.__getattribute__(self,attr)}else{
return $B.Function.__getattribute__(self.$infos.__func__,attr)}}
method.__repr__=method.__str__=function(self){return "<bound method "+self.$infos.__qualname__+
" of "+_b_.str.$factory(self.$infos.__self__)+">"}
method.__setattr__=function(self,key,value){
if(key=="__class__"){throw _b_.TypeError.$factory("__class__ assignment only supported "+
"for heap types or ModuleType subclasses")}
throw $B.attr_error(attr,self)}
$B.set_func_names(method,"builtins")
$B.method_descriptor=$B.make_class("method_descriptor")
$B.classmethod_descriptor=$B.make_class("classmethod_descriptor")
$B.GenericAlias=$B.make_class("GenericAlias",function(origin_class,items){return{
__class__:$B.GenericAlias,origin_class,items}}
)
$B.GenericAlias.__args__={__get__:function(self){return $B.fast_tuple(self.items)}}
$B.GenericAlias.__call__=function(self,...args){return self.origin_class.$factory.apply(null,args)}
$B.GenericAlias.__eq__=function(self,other){if(! _b_.isinstance(other,$B.GenericAlias)){return false}
return $B.rich_comp("__eq__",self.origin_class,other.origin_class)&&
$B.rich_comp("__eq__",self.items,other.items)}
$B.GenericAlias.__getitem__=function(self,item){throw _b_.TypeError.$factory("descriptor '__getitem__' for '"+
self.origin_class.$infos.__name__+"' objects doesn't apply to a '"+
$B.class_name(item)+"' object")}
$B.GenericAlias.__or__=function(self,other){var $=$B.args('__or__',2,{self:null,other:null},['self','other'],arguments,{},null,null)
return $B.UnionType.$factory([self,other])}
$B.GenericAlias.__origin__={__get__:function(self){return self.origin_class}}
$B.GenericAlias.__parameters__={__get__:function(self){
return $B.fast_tuple([])}}
$B.GenericAlias.__repr__=function(self){var items=[]
for(var i=0,len=self.items.length;i < len;i++){if(self.items[i]===_b_.Ellipsis){items.push('...')}else{if(self.items[i].$is_class){items.push(self.items[i].$infos.__name__)}else{items.push(_b_.repr(self.items[i]))}}}
return self.origin_class.$infos.__qualname__+'['+
items.join(", ")+']'}
$B.set_func_names($B.GenericAlias,"types")
$B.UnionType=$B.make_class("UnionType",function(items){return{
__class__:$B.UnionType,items}}
)
$B.UnionType.__args__={__get__:function(self){return $B.fast_tuple(self.items)}}
$B.UnionType.__parameters__={__get__:function(){return $B.fast_tuple([])}}
$B.UnionType.__repr__=function(self){var t=[]
for(var item of self.items){if(item.$is_class){t.push(item.$infos.__name__)}else{t.push(_b_.repr(item))}}
return t.join(' | ')}
$B.set_func_names($B.UnionType,"types")
_b_.object.__class__=type})(__BRYTHON__)
;
;(function($B){var _b_=$B.builtins,_window=self,isWebWorker=('undefined' !==typeof WorkerGlobalScope)&&
("function"===typeof importScripts)&&
(navigator instanceof WorkerNavigator)
$B.args=function(fname,argcount,slots,var_names,args,$dobj,extra_pos_args,extra_kw_args){
if(fname.startsWith("lambda_"+$B.lambda_magic)){fname="<lambda>"}
var has_kw_args=false,nb_pos=args.length,filled=0,extra_kw,only_positional
var end_positional=var_names.indexOf("/")
if(end_positional !=-1){var_names.splice(end_positional,1)
only_positional=var_names.slice(0,end_positional)}
if(nb_pos > 0 && args[nb_pos-1]&& args[nb_pos-1].$nat){nb_pos--
if(Object.keys(args[nb_pos].kw).length > 0){has_kw_args=true
var kw_args=args[nb_pos].kw
if(Array.isArray(kw_args)){var kwa=kw_args[0]
for(var i=1,len=kw_args.length;i < len;i++){var kw_arg=kw_args[i]
if(kw_arg.__class__===_b_.dict){for(var k in kw_arg.$numeric_dict){throw _b_.TypeError.$factory(fname+
"() keywords must be strings")}
for(var k in kw_arg.$object_dict){throw _b_.TypeError.$factory(fname+
"() keywords must be strings")}
for(var k in kw_arg.$string_dict){if(kwa[k]!==undefined){throw _b_.TypeError.$factory(fname+
"() got multiple values for argument '"+
k+"'")}
kwa[k]=kw_arg.$string_dict[k][0]}}else{var it=_b_.iter(kw_arg),getitem=$B.$getattr(kw_arg,'__getitem__')
while(true){try{var k=_b_.next(it)
if(typeof k !=="string"){throw _b_.TypeError.$factory(fname+
"() keywords must be strings")}
if(kwa[k]!==undefined){throw _b_.TypeError.$factory(fname+
"() got multiple values for argument '"+
k+"'")}
kwa[k]=getitem(k)}catch(err){if($B.is_exc(err,[_b_.StopIteration])){break}
throw err}}}}
kw_args=kwa}}}
if(extra_pos_args){slots[extra_pos_args]=[]
slots[extra_pos_args].__class__=_b_.tuple}
if(extra_kw_args){
extra_kw=$B.empty_dict()}
if(nb_pos > argcount){
if(extra_pos_args===null ||extra_pos_args=="*"){
msg=fname+"() takes "+argcount+" positional argument"+
(argcount > 1 ? "s" :"")+" but more were given"
throw _b_.TypeError.$factory(msg)}else{
for(var i=argcount;i < nb_pos;i++){slots[extra_pos_args].push(args[i])}
nb_pos=argcount}}
for(var i=0;i < nb_pos;i++){slots[var_names[i]]=args[i]
filled++}
if(filled==argcount && argcount===var_names.length &&
! has_kw_args){if(extra_kw_args){slots[extra_kw_args]=extra_kw}
return slots}
if(has_kw_args){for(var key in kw_args){var value=kw_args[key]
if(slots[key]===undefined){
if(extra_kw_args){
extra_kw.$string_dict[key]=[value,extra_kw.$order++]}else{throw _b_.TypeError.$factory(fname+
"() got an unexpected keyword argument '"+key+"'")}}else if(slots.hasOwnProperty(key)&& slots[key]!==null){
if(key==extra_pos_args){throw _b_.TypeError.$factory(
`${fname}() got an unexpected `+
`keyword argument '${key}'`)}
throw _b_.TypeError.$factory(fname+
"() got multiple values for argument '"+key+"'")}else if(only_positional && only_positional.indexOf(key)>-1){throw _b_.TypeError.$factory(`${fname}() got some `+
`positional-only arguments passed as keyword `+
`arguments: '${key}'`)}else{
slots[key]=value}}}
var missing=[]
for(var attr in slots){if(slots[attr]===null){if($dobj[attr]!==undefined){slots[attr]=$dobj[attr]}else{missing.push(attr)}}}
if(missing.length > 0){if(missing.length==1){var arg_type='positional'
if(var_names.indexOf(missing[0])>=argcount){arg_type='required keyword-only'}
throw _b_.TypeError.$factory(fname+
` missing 1 ${arg_type} argument: '${missing[0]}'`)}else{var missing_positional=missing.filter(arg=>
var_names.indexOf(arg)< argcount),missing_kwonly=missing.filter(arg=>
var_names.indexOf(arg)>=argcount)
function format_missing(m,type){var msg=m.length+
` required ${type} argument`+
(m.length > 1 ? 's' :'')
m=m.map(x=> `'${x}'`)
if(m.length > 1){m[m.length-1]=' and '+m[m.length-1]
for(var i=0;i < m.length-2;i++){m[i]=m[i]+', '}}
return msg+': '+m.join('')}
var msg=fname+" missing "
if(missing_positional.length > 0){msg+=format_missing(missing_positional,'positional')}else{msg+=format_missing(missing_kwonly,'keyword-only')}
throw _b_.TypeError.$factory(msg)}}
if(extra_kw_args){slots[extra_kw_args]=extra_kw}
return slots}
$B.wrong_nb_args=function(name,received,expected,positional){if(received < expected){var missing=expected-received
throw _b_.TypeError.$factory(name+"() missing "+missing+
" positional argument"+(missing > 1 ? "s" :"")+": "+
positional.slice(received))}else{throw _b_.TypeError.$factory(name+"() takes "+expected+
" positional argument"+(expected > 1 ? "s" :"")+
" but more were given")}}
$B.get_class=function(obj){
if(obj===null){return $B.$NoneDict}
if(obj===undefined){return $B.UndefinedClass}
var klass=obj.__class__
if(klass===undefined){switch(typeof obj){case "number":
if(obj % 1===0){
return _b_.int}
return _b_.float
case "string":
return _b_.str
case "boolean":
return _b_.bool
case "function":
if(obj.$is_js_func){
return $B.JSObj}
obj.__class__=$B.Function
return $B.Function
case "object":
if(Array.isArray(obj)){if(Object.getPrototypeOf(obj)===Array.prototype){obj.__class__=_b_.list
return _b_.list}}else if(obj.constructor===Number){return _b_.float}else if(typeof Node !=="undefined" 
&& obj instanceof Node){if(obj.tagName){return $B.imported['browser.html'][obj.tagName]||
$B.DOMNode}
return $B.DOMNode}
break}}
if(klass===undefined){return $B.JSObj}
return klass}
$B.class_name=function(obj){var klass=$B.get_class(obj)
if(klass===$B.JSObj){return 'Javascript '+obj.constructor.name}else{return klass.$infos.__name__}}
$B.next_of=function(iterator){
if(iterator.__class__===_b_.range){var obj={ix:iterator.start}
if(iterator.step > 0){return function(){if(obj.ix >=iterator.stop){throw _b_.StopIteration.$factory('')}
var res=obj.ix
obj.ix+=iterator.step
return res}}else{return function(){if(obj.ix <=iterator.stop){throw _b_.StopIteration.$factory('')}
var res=obj.ix
obj.ix+=iterator.step
return res}}}
return $B.$call($B.$getattr(_b_.iter(iterator),'__next__'))}
$B.unpacker=function(obj,nb_targets,has_starred,nb_after_starred){
var t=_b_.list.$factory(obj),len=t.length,min_len=has_starred ? len-1 :len
if(len < min_len){throw _b_.ValueError.$factory(
`not enough values to unpack (expected ${min_length}, got ${len})`)}
if((! has_starred)&& len > nb_targets){throw _b_.ValueError.$factory(
`too many values to unpack (expected ${nb_targets})`)}
t.index=-1
t.read_one=function(){t.index++
return t[t.index]}
t.read_rest=function(){t.index++
var res=t.slice(t.index,t.length-nb_after_starred)
t.index=t.length-nb_after_starred-1
return res}
return t}
$B.rest_iter=function(next_func){
var res=[]
while(true){try{res.push(next_func())}catch(err){if($B.is_exc(err,[_b_.StopIteration])){return $B.fast_tuple(res)}
throw err}}}
$B.set_lineno=function(locals,lineno){locals.$lineno=lineno
if(locals.$f_trace !==_b_.None){$B.trace_line()}
return true}
$B.handle_annotation=function(annotation_string){
if($B.imported.__future__ &&
$B.frames_stack.length > 0 &&
$B.last($B.frames_stack)[3].annotations===
$B.imported.__future__.annotations){
return annotation_string}else{console.log('eval annotation',annotation_string)
return _b_.eval(annotation_string)}}
$B.copy_namespace=function(){var ns={}
for(const frame of $B.frames_stack){for(const kv of[frame[1],frame[3]]){for(var key in kv){if(! key.startsWith('$')){ns[key]=kv[key]}}}}
return ns}
$B.clear_ns=function(name){
if(name.startsWith("__ge")){console.log("clear ns",name)}
var len=name.length
$B.$py_src[name]=null
delete $B.$py_src[name]
var alt_name=name.replace(/\./g,"_")
if(alt_name !=name){$B.clear_ns(alt_name)}}
$B.get_method_class=function(ns,qualname){
var refs=qualname.split('.'),klass=ns
while(refs.length > 0){var ref=refs.shift()
if(klass[ref]===undefined){var fake_class=$B.make_class(qualname)
return fake_class}
klass=klass[ref]}
return klass}
$B.$JS2Py=function(src){if(typeof src==="number"){if(src % 1===0){return src}
return _b_.float.$factory(src)}
if(src===null ||src===undefined){return _b_.None}
if(Array.isArray(src)&&
Object.getPrototypeOf(src)===Array.prototype){src.$brython_class="js" }
return src}
function index_error(obj){var type=typeof obj=="string" ? "string" :"list"
throw _b_.IndexError.$factory(type+" index out of range")}
$B.$getitem=function(obj,item){var is_list=Array.isArray(obj)&& obj.__class__===_b_.list,is_dict=obj.__class__===_b_.dict && ! obj.$jsobj
if(typeof item=="number"){if(is_list ||typeof obj=="string"){item=item >=0 ? item :obj.length+item
if(obj[item]!==undefined){return obj[item]}else{index_error(obj)}}else if(is_dict){if(obj.$numeric_dict[item]!==undefined){return obj.$numeric_dict[item][0]}}}else if(item.valueOf && typeof item.valueOf()=="string" && is_dict){var res=obj.$string_dict[item]
if(res !==undefined){return res[0]}
throw _b_.KeyError.$factory(item)}
if(obj.$is_class){var class_gi=$B.$getattr(obj,"__class_getitem__",_b_.None)
if(class_gi !==_b_.None){return class_gi(item)}else if(obj.__class__){class_gi=$B.$getattr(obj.__class__,"__getitem__",_b_.None)
if(class_gi !==_b_.None){return class_gi(obj,item)}else{throw _b_.TypeError.$factory("'"+
$B.class_name(obj.__class__)+
"' object is not subscriptable")}}}
if(is_list){return _b_.list.$getitem(obj,item)}
if(is_dict){return _b_.dict.$getitem(obj,item)}
var gi=$B.$getattr(obj.__class__ ||$B.get_class(obj),"__getitem__",_b_.None)
if(gi !==_b_.None){return gi(obj,item)}
throw _b_.TypeError.$factory("'"+$B.class_name(obj)+
"' object is not subscriptable")}
$B.getitem_slice=function(obj,slice){var res
if(Array.isArray(obj)&& obj.__class__===_b_.list){if(slice.start===_b_.None && slice.stop===_b_.None){if(slice.step===_b_.None ||slice.step==1){res=obj.slice()}else if(slice.step==-1){res=obj.slice().reverse()}}else if(slice.step===_b_.None){if(slice.start===_b_.None){slice.start=0}
if(slice.stop===_b_.None){slice.stop=obj.length}
if(typeof slice.start=="number" &&
typeof slice.stop=="number"){if(slice.start < 0){slice.start+=obj.length}
if(slice.stop < 0){slice.stop+=obj.length}
res=obj.slice(slice.start,slice.stop)}}
if(res){res.__class__=obj.__class__ 
res.__brython__=true
return res}else{return _b_.list.$getitem(obj,slice)}}
return $B.$getattr(obj,"__getitem__")(slice)}
$B.set_list_slice=function(obj,start,stop,value){if(start===null){start=0}else{start=$B.$GetInt(start)
if(start < 0){start=Math.max(0,start+obj.length)}}
if(stop===null){stop=obj.length}
stop=$B.$GetInt(stop)
if(stop < 0){stop=Math.max(0,stop+obj.length)}
var res=_b_.list.$factory(value)
obj.splice.apply(obj,[start,stop-start].concat(res))}
$B.set_list_slice_step=function(obj,start,stop,step,value){if(step===null ||step==1){return $B.set_list_slice(obj,start,stop,value)}
if(step==0){throw _b_.ValueError.$factory("slice step cannot be zero")}
step=$B.$GetInt(step)
if(start===null){start=step > 0 ? 0 :obj.length-1}else{start=$B.$GetInt(start)}
if(stop===null){stop=step > 0 ? obj.length :-1}else{stop=$B.$GetInt(stop)}
var repl=_b_.list.$factory(value),j=0,test,nb=0
if(step > 0){test=function(i){return i < stop}}
else{test=function(i){return i > stop}}
for(var i=start;test(i);i+=step){nb++}
if(nb !=repl.length){throw _b_.ValueError.$factory(
"attempt to assign sequence of size "+repl.length+
" to extended slice of size "+nb)}
for(var i=start;test(i);i+=step){obj[i]=repl[j]
j++}}
$B.$setitem=function(obj,item,value){if(Array.isArray(obj)&& obj.__class__===undefined &&
typeof item=="number" &&
!_b_.isinstance(obj,_b_.tuple)){if(item < 0){item+=obj.length}
if(obj[item]===undefined){throw _b_.IndexError.$factory("list assignment index out of range")}
obj[item]=value
return}else if(obj.__class__===_b_.dict){_b_.dict.$setitem(obj,item,value)
return}else if(obj.__class__===_b_.list){return _b_.list.$setitem(obj,item,value)}
var si=$B.$getattr(obj.__class__ ||$B.get_class(obj),"__setitem__",null)
if(si===null){throw _b_.TypeError.$factory("'"+$B.class_name(obj)+
"' object does not support item assignment")}
return si(obj,item,value)}
$B.$delitem=function(obj,item){if(Array.isArray(obj)&& obj.__class__===_b_.list &&
typeof item=="number" &&
!_b_.isinstance(obj,_b_.tuple)){if(item < 0){item+=obj.length}
if(obj[item]===undefined){throw _b_.IndexError.$factory("list deletion index out of range")}
obj.splice(item,1)
return}else if(obj.__class__===_b_.dict){_b_.dict.__delitem__(obj,item)
return}else if(obj.__class__===_b_.list){return _b_.list.__delitem__(obj,item)}
var di=$B.$getattr(obj.__class__ ||$B.get_class(obj),"__delitem__",null)
if(di===null){throw _b_.TypeError.$factory("'"+$B.class_name(obj)+
"' object doesn't support item deletion")}
return di(obj,item)}
$B.augm_assign=function(left,op,right){
var op1=op.substr(0,op.length-1)
if(typeof left=='number' && typeof right=='number'
&& op !='//=' 
&& op !='%=' 
){var res=eval(left+' '+op1+' '+right)
if(res <=$B.max_int && res >=$B.min_int &&
res.toString().search(/e/i)==-1){return res}else{res=eval(`${BigInt(left)}n ${op1} ${BigInt(right)}n`)
var pos=res > 0n,res=res+''
return pos ? $B.fast_long_int(res,true):
$B.fast_long_int(res.substr(1),false)}}else if(typeof left=='string' && typeof right=='string' &&
op=='+='){return left+right}else{var method=$B.op2method.augmented_assigns[op],augm_func=$B.$getattr(left,'__'+method+'__',null)
if(augm_func !==null){return $B.$call(augm_func)(right)}else{var method1=$B.op2method.operations[op1]
if(method1===undefined){method1=$B.op2method.binary[op1]}
return $B.rich_op(`__${method1}__`,left,right)}}}
$B.extend=function(fname,arg){
for(var i=2;i < arguments.length;i++){var mapping=arguments[i]
var it=_b_.iter(mapping),getter=$B.$getattr(mapping,"__getitem__")
while(true){try{var key=_b_.next(it)
if(typeof key !=="string"){throw _b_.TypeError.$factory(fname+
"() keywords must be strings")}
if(arg[key]!==undefined){throw _b_.TypeError.$factory(fname+
"() got multiple values for argument '"+key+"'")}
arg[key]=getter(key)}catch(err){if(_b_.isinstance(err,[_b_.StopIteration])){break}
throw err}}}
return arg}
$B.$is=function(a,b){
if(a instanceof Number && b instanceof Number){return a.valueOf()==b.valueOf()}
if((a===_b_.int && b==$B.long_int)||
(a===$B.long_int && b===_b_.int)){return true}
return a===b}
$B.$is_member=function(item,_set){
var f,_iter,method
try{method=$B.$getattr(_set.__class__ ||$B.get_class(_set),"__contains__")}
catch(err){}
if(method){return $B.$call(method)(_set,item)}
try{_iter=_b_.iter(_set)}
catch(err){}
if(_iter){while(1){try{var elt=_b_.next(_iter)
if($B.rich_comp("__eq__",elt,item)){return true}}catch(err){return false}}}
try{f=$B.$getattr(_set,"__getitem__")}
catch(err){throw _b_.TypeError.$factory("'"+$B.class_name(_set)+
"' object is not iterable")}
if(f){var i=-1
while(1){i++
try{var elt=f(i)
if($B.rich_comp("__eq__",elt,item)){return true}}catch(err){if(err.__class__===_b_.IndexError){return false}
throw err}}}}
$B.$call=function(callable){if(callable.__class__===$B.method){return callable}else if(callable.$factory){return callable.$factory}else if(callable.$is_class){
return callable.$factory=$B.$instance_creator(callable)}else if(callable.$is_js_class){
return callable.$factory=function(){return new callable(...arguments)}}else if(callable.$in_js_module){
return function(){var res=callable(...arguments)
return res===undefined ? _b_.None :res}}else if(callable.$is_func ||typeof callable=="function"){return callable}
try{return $B.$getattr(callable,"__call__")}catch(err){throw _b_.TypeError.$factory("'"+$B.class_name(callable)+
"' object is not callable")}}
var $io=$B.make_class("io",function(out){return{
__class__:$io,out}}
)
$io.flush=function(self){console[self.out](self.buf.join(''))
self.buf=[]}
$io.write=function(self,msg){
if(self.buf===undefined){self.buf=[]}
if(typeof msg !="string"){throw _b_.TypeError.$factory("write() argument must be str, not "+
$B.class_name(msg))}
self.buf.push(msg)
return _b_.None}
if(console.error !==undefined){$B.stderr=$io.$factory("error")}else{$B.stderr=$io.$factory("log")}
$B.stdout=$io.$factory("log")
$B.stdin={__class__:$io,__original__:true,closed:false,len:1,pos:0,read:function(){return ""},readline:function(){return ""}}
$B.make_iterator_class=function(name){
var klass={__class__:_b_.type,__mro__:[_b_.object],$factory:function(items){return{
__class__:klass,__dict__:$B.empty_dict(),counter:-1,items:items,len:items.length}},$infos:{__name__:name},$is_class:true,__iter__:function(self){self.counter=self.counter===undefined ?-1 :self.counter
self.len=self.items.length
return self},__len__:function(self){return self.items.length},__next__:function(self){if(typeof self.test_change=="function" && self.test_change()){
throw _b_.RuntimeError.$factory(
"dictionary changed size during iteration")}
self.counter++
if(self.counter < self.items.length){var item=self.items[self.counter]
if(self.items.$brython_class=="js"){
item=$B.$JS2Py(item)}
return item}
throw _b_.StopIteration.$factory("StopIteration")},__reduce_ex__:function(self,protocol){return $B.fast_tuple([_b_.iter,_b_.tuple.$factory([self.items])])}}
$B.set_func_names(klass,"builtins")
return klass}
function $err(op,klass,other){var msg="unsupported operand type(s) for "+op+" : '"+
klass.$infos.__name__+"' and '"+$B.class_name(other)+"'"
throw _b_.TypeError.$factory(msg)}
var r_opnames=["add","sub","mul","truediv","floordiv","mod","pow","lshift","rshift","and","xor","or"]
var ropsigns=["+","-","*","/","//","%","**","<<",">>","&","^","|"]
$B.make_rmethods=function(klass){for(var r_opname of r_opnames){if(klass["__r"+r_opname+"__"]===undefined &&
klass['__'+r_opname+'__']){klass["__r"+r_opname+"__"]=(function(name){return function(self,other){return klass["__"+name+"__"](other,self)}})(r_opname)}}}
$B.UUID=function(){return $B.$py_UUID++}
$B.$GetInt=function(value){
if(typeof value=="number" ||value.constructor===Number){return value}
else if(typeof value==="boolean"){return value ? 1 :0}
else if(_b_.isinstance(value,_b_.int)){return value}
else if(_b_.isinstance(value,_b_.float)){return value.valueOf()}
if(! value.$is_class){try{var v=$B.$getattr(value,"__int__")();return v}catch(e){}
try{var v=$B.$getattr(value,"__index__")();return v}catch(e){}}
throw _b_.TypeError.$factory("'"+$B.class_name(value)+
"' object cannot be interpreted as an integer")}
$B.to_num=function(obj,methods){
var expected_class={"__complex__":_b_.complex,"__float__":_b_.float,"__index__":_b_.int,"__int__":_b_.int}
var klass=obj.__class__ ||$B.get_class(obj)
for(var i=0;i < methods.length;i++){var missing={},method=$B.$getattr(klass,methods[i],missing)
if(method !==missing){var res=method(obj)
if(!_b_.isinstance(res,expected_class[methods[i]])){console.log(res,methods[i],expected_class[methods[i]])
throw _b_.TypeError.$factory(methods[i]+"returned non-"+
expected_class[methods[i]].$infos.__name__+
"(type "+$B.get_class(res)+")")}
return res}}
return null}
$B.PyNumber_Index=function(item){switch(typeof item){case "boolean":
return item ? 1 :0
case "number":
return item
case "object":
if(item.__class__===$B.long_int){return item}
if(_b_.isinstance(item,_b_.int)){
return item.$brython_value}
var method=$B.$getattr(item,"__index__",_b_.None)
if(method !==_b_.None){method=typeof method=="function" ?
method :$B.$getattr(method,"__call__")
return $B.int_or_bool(method())}else{throw _b_.TypeError.$factory("'"+$B.class_name(item)+
"' object cannot be interpreted as an integer")}
default:
throw _b_.TypeError.$factory("'"+$B.class_name(item)+
"' object cannot be interpreted as an integer")}}
$B.int_or_bool=function(v){switch(typeof v){case "boolean":
return v ? 1 :0
case "number":
return v
case "object":
if(v.__class__===$B.long_int){return v}
else{throw _b_.TypeError.$factory("'"+$B.class_name(v)+
"' object cannot be interpreted as an integer")}
default:
throw _b_.TypeError.$factory("'"+$B.class_name(v)+
"' object cannot be interpreted as an integer")}}
$B.enter_frame=function(frame){
$B.frames_stack.push(frame)
if($B.tracefunc && $B.tracefunc !==_b_.None){if(frame[4]===$B.tracefunc ||
($B.tracefunc.$infos && frame[4]&&
frame[4]===$B.tracefunc.$infos.__func__)){
$B.tracefunc.$frame_id=frame[0]
return _b_.None}else{
for(var i=$B.frames_stack.length-1;i >=0;i--){if($B.frames_stack[i][0]==$B.tracefunc.$frame_id){return _b_.None}}
try{return $B.tracefunc($B._frame.$factory($B.frames_stack,$B.frames_stack.length-1),'call',_b_.None)}catch(err){err.$in_trace_func=true
throw err}}}
return _b_.None}
$B.trace_exception=function(){var top_frame=$B.last($B.frames_stack)
if(top_frame[0]==$B.tracefunc.$current_frame_id){return _b_.None}
var trace_func=top_frame[1].$f_trace,exc=top_frame[1].$current_exception,frame_obj=$B._frame.$factory($B.frames_stack,$B.frames_stack.length-1)
return trace_func(frame_obj,'exception',$B.fast_tuple([exc.__class__,exc,$B.traceback.$factory(exc)]))}
$B.trace_line=function(){var top_frame=$B.last($B.frames_stack)
if(top_frame[0]==$B.tracefunc.$current_frame_id){return _b_.None}
var trace_func=top_frame[1].$f_trace,frame_obj=$B._frame.$factory($B.frames_stack,$B.frames_stack.length-1)
return trace_func(frame_obj,'line',_b_.None)}
$B.set_line=function(line_info){
var top_frame=$B.last($B.frames_stack)
if($B.tracefunc && top_frame[0]==$B.tracefunc.$current_frame_id){return _b_.None}
top_frame[1].$line_info=line_info
var trace_func=top_frame[1].$f_trace
if(trace_func !==_b_.None){var frame_obj=$B._frame.$factory($B.frames_stack,$B.frames_stack.length-1)
top_frame[1].$ftrace=trace_func(frame_obj,'line',_b_.None)}
return true}
$B.trace_return=function(value){var top_frame=$B.last($B.frames_stack),trace_func=top_frame[1].$f_trace,frame_obj=$B._frame.$factory($B.frames_stack,$B.frames_stack.length-1)
if(top_frame[0]==$B.tracefunc.$current_frame_id){
return _b_.None}
trace_func(frame_obj,'return',value)}
$B.leave_frame=function(arg){
if($B.frames_stack.length==0){console.log("empty stack");return}
if(arg && arg.value !==undefined && $B.tracefunc){if($B.last($B.frames_stack)[1].$f_trace===undefined){$B.last($B.frames_stack)[1].$f_trace=$B.tracefunc}
if($B.last($B.frames_stack)[1].$f_trace !==_b_.None){$B.trace_return(arg.value)}}
var frame=$B.frames_stack.pop()
for(var key in frame[1]){if(! key.startsWith('$')){if(frame[1][key]&& frame[1][key].__class__===$B.generator){var gen=frame[1][key]
if(gen.$frame===undefined){continue}
var ctx_managers=gen.$frame[1].$context_managers
if(ctx_managers){for(var cm of ctx_managers){$B.$call($B.$getattr(cm,'__exit__'))(
_b_.None,_b_.None,_b_.None)}}}}}
frame[1].$current_exception=undefined
return _b_.None}
var min_int=Math.pow(-2,53),max_int=Math.pow(2,53)-1
$B.is_safe_int=function(){for(var i=0;i < arguments.length;i++){var arg=arguments[i]
if((typeof arg !="number")||isNaN(arg)||
(arg < min_int ||arg > max_int)){return false}}
return true}
$B.add=function(x,y){if(x.valueOf && typeof x.valueOf()=="number" &&
y.valueOf && typeof y.valueOf()=="number"){if(typeof x=="number" && typeof y=="number"){
var z=x+y
if(z < $B.max_int && z > $B.min_int){return z}else if(z===Infinity){return _b_.float.$factory("inf")}else if(z===-Infinity){return _b_.float.$factory("-inf")}else if(isNaN(z)){return _b_.float.$factory('nan')}
return $B.long_int.__add__($B.long_int.$factory(x),$B.long_int.$factory(y))}else{
return new Number(x+y)}}else if(typeof x=="string" && typeof y=="string"){
return x+y}
try{var method=$B.$getattr(x.__class__ ||$B.get_class(x),"__add__")}catch(err){if(err.__class__===_b_.AttributeError){throw _b_.TypeError.$factory("unsupported operand type(s) for "+
"+: '"+$B.class_name(x)+"' and '"+$B.class_name(y)+"'")}
throw err}
var res=$B.$call(method)(x,y)
if(res===_b_.NotImplemented){
return $B.rich_op("__add__",x,y)}
return res}
$B.eq=function(x,y){if(x > min_int && x < max_int && y > min_int && y < max_int){return x==y}
return $B.long_int.__eq__($B.long_int.$factory(x),$B.long_int.$factory(y))}
$B.floordiv=function(x,y){var z=x/y
if(x > min_int && x < max_int && y > min_int && y < max_int
&& z > min_int && z < max_int){return Math.floor(z)}
else{return $B.long_int.__floordiv__($B.long_int.$factory(x),$B.long_int.$factory(y))}}
$B.mul=function(x,y){var z=(typeof x !="number" ||typeof y !="number")?
new Number(x*y):x*y
if(x > min_int && x < max_int && y > min_int && y < max_int
&& z > min_int && z < max_int){return z}
else if((typeof x=="number" ||x.__class__===$B.long_int)
&&(typeof y=="number" ||y.__class__===$B.long_int)){if((typeof x=="number" && isNaN(x))||
(typeof y=="number" && isNaN(y))){return _b_.float.$factory("nan")}
switch(x){case Infinity:
case-Infinity:
if(y==0){return _b_.float.$factory("nan")}else{return y > 0 ? x :-x}}
return $B.long_int.__mul__($B.long_int.$factory(x),$B.long_int.$factory(y))}else{return z}}
$B.sub=function(x,y){if(x instanceof Number && y instanceof Number){return x-y}
var z=(typeof x !="number" ||typeof y !="number")?
new Number(x-y):x-y
if(x > min_int && x < max_int && y > min_int && y < max_int
&& z > min_int && z < max_int){return z}else if((typeof x=="number" ||x.__class__===$B.long_int)
&&(typeof y=="number" ||y.__class__===$B.long_int)){if(typeof x=="number" && typeof y=="number"){if(isNaN(x)||isNaN(y)){return _b_.float.$factory("nan")}else if(x===Infinity ||x===-Infinity){if(y===x){return _b_.float.$factory("nan")}else{return x}}else if(y===Infinity ||y===-Infinity){if(y===x){return _b_.float.$factory("nan")}else{return-y}}}
if((typeof x=="number" && isNaN(x))||
(typeof y=="number" && isNaN(y))){return _b_.float.$factory("nan")}
return $B.long_int.__sub__($B.long_int.$factory(x),$B.long_int.$factory(y))}else{return z}}
$B.ge=function(x,y){if(typeof x=="number" && typeof y=="number"){return x >=y}
else if(typeof x=="number" && typeof y !="number"){return ! y.pos}
else if(typeof x !="number" && typeof y=="number"){return x.pos===true}else{return $B.long_int.__ge__(x,y)}}
$B.gt=function(x,y){if(typeof x=="number" && typeof y=="number"){return x > y}
else if(typeof x=="number" && typeof y !="number"){return ! y.pos}
else if(typeof x !="number" && typeof y=="number"){return x.pos===true}else{return $B.long_int.__gt__(x,y)}}
var reversed_op={"__lt__":"__gt__","__le__":"__ge__","__gt__":"__lt__","__ge__":"__le__"}
var method2comp={"__lt__":"<","__le__":"<=","__gt__":">","__ge__":">="}
$B.rich_comp=function(op,x,y){if(x===undefined){throw _b_.RuntimeError.$factory('error in rich comp')}
var x1=x.valueOf ? x.valueOf():x,y1=y.valueOf ? y.valueOf():y
if(typeof x1=="number" && typeof y1=="number" &&
x.__class__===undefined && y.__class__===undefined){switch(op){case "__eq__":
return x1==y1
case "__ne__":
return x1 !=y1
case "__le__":
return x1 <=y1
case "__lt__":
return x1 < y1
case "__ge__":
return x1 >=y1
case "__gt__":
return x1 > y1}}
var res
if(x.$is_class ||x.$factory){if(op=="__eq__"){return(x===y)}else if(op=="__ne__"){return !(x===y)}else{throw _b_.TypeError.$factory("'"+method2comp[op]+
"' not supported between instances of '"+$B.class_name(x)+
"' and '"+$B.class_name(y)+"'")}}
var x_class_op=$B.$call($B.$getattr(x.__class__ ||$B.get_class(x),op)),rev_op=reversed_op[op]||op
if(x.__class__ && y.__class__){
if(y.__class__.__mro__.indexOf(x.__class__)>-1){var rev_func=$B.$getattr(y,rev_op)
res=$B.$call($B.$getattr(y,rev_op))(x)
if(res !==_b_.NotImplemented){return res}}}
res=x_class_op(x,y)
if(res !==_b_.NotImplemented){return res}
var y_class_op=$B.$call($B.$getattr(y.__class__ ||$B.get_class(y),rev_op))
res=y_class_op(y,x)
if(res !==_b_.NotImplemented ){return res}
if(op=="__eq__"){return _b_.False}else if(op=="__ne__"){return _b_.True}
throw _b_.TypeError.$factory("'"+method2comp[op]+
"' not supported between instances of '"+$B.class_name(x)+
"' and '"+$B.class_name(y)+"'")}
var opname2opsign={__sub__:"-",__xor__:"^",__mul__:"*"}
$B.rich_op=function(op,x,y){var x_class=x.__class__ ||$B.get_class(x),y_class=y.__class__ ||$B.get_class(y),rop='__r'+op.substr(2),method
if(x_class===y_class){
if(x_class===_b_.int){return _b_.int[op](x,y)}else if(x_class===_b_.bool){return(_b_.bool[op]||_b_.int[op])
(x,y)}
try{method=$B.$call($B.$getattr(x_class,op))}catch(err){if(err.__class__===_b_.AttributeError){var kl_name=$B.class_name(x)
throw _b_.TypeError.$factory("unsupported operand type(s) "+
"for "+opname2opsign[op]+" : '"+kl_name+"' and '"+
kl_name+"'")}
throw err}
return method(x,y)}
if(_b_.issubclass(y_class,x_class)){
var reflected_left=$B.$getattr(x_class,rop,false),reflected_right=$B.$getattr(y_class,rop,false)
if(reflected_right && reflected_left && 
reflected_right !==reflected_left){return reflected_right(y,x)}}
var res
try{
var attr=$B.$getattr(x,op)
method=$B.$getattr(x_class,op)}catch(err){if(err.__class__ !==_b_.AttributeError){throw err}
res=$B.$call($B.$getattr(y,rop))(x)
if(res !==_b_.NotImplemented){return res}
throw _b_.TypeError.$factory(
`unsupported operand type(s) for '${$B.method_to_op[op]}' :`+
` '${$B.class_name(x)}' and '${$B.class_name(y)}'`)}
res=method(x,y)
if(res===_b_.NotImplemented){try{var reflected=$B.$getattr(y,rop),method=$B.$getattr(y_class,rop)}catch(err){if(err.__class__ !==_b_.AttributeError){throw err}
throw _b_.TypeError.$factory(
`unsupported operand type(s) for '${$B.method_to_op[op]}' :`+
` '${$B.class_name(x)}' and '${$B.class_name(y)}'`)}
res=method(y,x)
if(res===_b_.NotImplemented){throw _b_.TypeError.$factory(
`unsupported operand type(s) for '${$B.method_to_op[op]}' :`+
` '${$B.class_name(x)}' and '${$B.class_name(y)}'`)}
return res}else{return res}}
$B.is_none=function(o){return o===undefined ||o===null ||o==_b_.None}
var repr_stack=new Set()
$B.repr={enter:function(obj){if(repr_stack.has(obj)){return true}else{repr_stack.add(obj)}},leave:function(obj){repr_stack.delete(obj)}}})(__BRYTHON__)
;
;(function($B){
var DEFAULT_MIN_MERGE=32
var DEFAULT_MIN_GALLOPING=7
var DEFAULT_TMP_STORAGE_LENGTH=256
var POWERS_OF_TEN=[1e0,1e1,1e2,1e3,1e4,1e5,1e6,1e7,1e8,1e9]
function log10(x){if(x < 1e5){if(x < 1e2){return x < 1e1 ? 0 :1}
if(x < 1e4){return x < 1e3 ? 2 :3}
return 4}
if(x < 1e7){return x < 1e6 ? 5 :6}
if(x < 1e9){return x < 1e8 ? 7 :8}
return 9}
function alphabeticalCompare(a,b){if(a===b){return 0}
if(~~a===a && ~~b===b){if(a===0 ||b===0){return a < b ?-1 :1}
if(a < 0 ||b < 0){if(b >=0){return-1}
if(a >=0){return 1}
a=-a
b=-b}
al=log10(a)
bl=log10(b)
var t=0
if(al < bl){a*=POWERS_OF_TEN[bl-al-1]
b/=10
t=-1}else if(al > bl){b*=POWERS_OF_TEN[al-bl-1]
a/=10;
t=1;}
if(a===b){return t}
return a < b ?-1 :1}
var aStr=String(a)
var bStr=String(b)
if(aStr===bStr){return 0}
return aStr < bStr ?-1 :1}
function minRunLength(n){var r=0
while(n >=DEFAULT_MIN_MERGE){r |=(n & 1)
n >>=1}
return n+r}
function makeAscendingRun(array,lo,hi,compare){var runHi=lo+1
if(runHi===hi){return 1;}
if(compare(array[runHi++],array[lo])< 0){while(runHi < hi && compare(array[runHi],array[runHi-1])< 0){runHi++}
reverseRun(array,lo,runHi)}else{while(runHi < hi && compare(array[runHi],array[runHi-1])>=0){runHi++}}
return runHi-lo}
function reverseRun(array,lo,hi){hi--
while(lo < hi){var t=array[lo]
array[lo++]=array[hi]
array[hi--]=t}}
function binaryInsertionSort(array,lo,hi,start,compare){if(start===lo){start++}
for(;start < hi;start++){var pivot=array[start]
var left=lo
var right=start
while(left < right){var mid=(left+right)>>> 1
if(compare(pivot,array[mid])< 0){right=mid}else{left=mid+1}}
var n=start-left
switch(n){case 3:
array[left+3]=array[left+2]
case 2:
array[left+2]=array[left+1]
case 1:
array[left+1]=array[left]
break;
default:
while(n > 0){array[left+n]=array[left+n-1]
n--;}}
array[left]=pivot}}
function gallopLeft(value,array,start,length,hint,compare){var lastOffset=0,maxOffset=0,offset=1
if(compare(value,array[start+hint])> 0){maxOffset=length-hint
while(offset < maxOffset && compare(value,array[start+hint+offset])> 0){lastOffset=offset
offset=(offset << 1)+1
if(offset <=0){offset=maxOffset}}
if(offset > maxOffset){offset=maxOffset}
lastOffset+=hint
offset+=hint}else{maxOffset=hint+1
while(offset < maxOffset && compare(value,array[start+hint-offset])<=0){lastOffset=offset
offset=(offset << 1)+1
if(offset <=0){offset=maxOffset}}
if(offset > maxOffset){offset=maxOffset}
var tmp=lastOffset
lastOffset=hint-offset
offset=hint-tmp}
lastOffset++
while(lastOffset < offset){var m=lastOffset+((offset-lastOffset)>>> 1)
if(compare(value,array[start+m])> 0){lastOffset=m+1}else{offset=m}}
return offset}
function gallopRight(value,array,start,length,hint,compare){var lastOffset=0,maxOffset=0,offset=1
if(compare(value,array[start+hint])< 0){maxOffset=hint+1
while(offset < maxOffset && compare(value,array[start+hint-offset])< 0){lastOffset=offset
offset=(offset << 1)+1
if(offset <=0){offset=maxOffset}}
if(offset > maxOffset){offset=maxOffset}
var tmp=lastOffset
lastOffset=hint-offset
offset=hint-tmp}else{maxOffset=length-hint
while(offset < maxOffset && compare(value,array[start+hint+offset])>=0){lastOffset=offset
offset=(offset << 1)+1
if(offset <=0){offset=maxOffset}}
if(offset > maxOffset){offset=maxOffset}
lastOffset+=hint
offset+=hint}
lastOffset++
while(lastOffset < offset){var m=lastOffset+((offset-lastOffset)>>> 1)
if(compare(value,array[start+m])< 0){offset=m}else{lastOffset=m+1}}
return offset}
var TIM_SORT_ASSERTION="TimSortAssertion"
var TimSortAssertion=function(message){this.name=TIM_SORT_ASSERTION
this.message=message}
var TimSort=function(array,compare){var self={array:array,compare:compare,minGallop:DEFAULT_MIN_GALLOPING,length :array.length,tmpStorageLength:DEFAULT_TMP_STORAGE_LENGTH,stackLength:0,runStart:null,runLength:null,stackSize:0,
pushRun:function(runStart,runLength){this.runStart[this.stackSize]=runStart
this.runLength[this.stackSize]=runLength
this.stackSize+=1},
mergeRuns:function(){while(this.stackSize > 1){var n=this.stackSize-2
if((n >=1 && this.runLength[n-1]<=
this.runLength[n]+this.runLength[n+1])||
(n >=2 && this.runLength[n-2]<=
this.runLength[n]+this.runLength[n-1])){if(this.runLength[n-1]< this.runLength[n+1]){n--}}else if(this.runLength[n]> this.runLength[n+1]){break}
this.mergeAt(n)}},
forceMergeRuns:function(){while(this.stackSize > 1){var n=this.stackSize-2
if(n > 0 && this.runLength[n-1]< this.runLength[n+1]){n--}
this.mergeAt(n)}},
mergeAt:function(i){var compare=this.compare,array=this.array,start1=this.runStart[i],length1=this.runLength[i],start2=this.runStart[i+1],length2=this.runLength[i+1]
this.runLength[i]=length1+length2
if(i===this.stackSize-3){this.runStart[i+1]=this.runStart[i+2]
this.runLength[i+1]=this.runLength[i+2]}
this.stackSize--;
var k=gallopRight(array[start2],array,start1,length1,0,compare)
start1+=k
length1-=k
if(length1===0){return}
length2=gallopLeft(array[start1+length1-1],array,start2,length2,length2-1,compare)
if(length2===0){return}
if(length1 <=length2){this.mergeLow(start1,length1,start2,length2)}else{this.mergeHigh(start1,length1,start2,length2)}},
mergeLow:function(start1,length1,start2,length2){var compare=this.compare,array=this.array,tmp=this.tmp,i=0
for(var i=0;i < length1;i++){tmp[i]=array[start1+i]}
var cursor1=0,cursor2=start2,dest=start1
array[dest++]=array[cursor2++]
if(--length2===0){for(var i=0;i < length1;i++){array[dest+i]=tmp[cursor1+i]}
return}
if(length1===1){for(var i=0;i < length2;i++){array[dest+i]=array[cursor2+i]}
array[dest+length2]=tmp[cursor1]
return}
var minGallop=this.minGallop
while(true){var count1=0,count2=0,exit=false
do{if(compare(array[cursor2],tmp[cursor1])< 0){array[dest++]=array[cursor2++]
count2++
count1=0
if(--length2===0){exit=true
break}}else{array[dest++]=tmp[cursor1++]
count1++
count2=0
if(--length1===1){exit=true
break}}}while((count1 |count2)< minGallop)
if(exit){break}
do{
count1=gallopRight(array[cursor2],tmp,cursor1,length1,0,compare)
if(count1 !==0){for(var i=0;i < count1;i++){array[dest+i]=tmp[cursor1+i]}
dest+=count1
cursor1+=count1
length1-=count1
if(length1 <=1){exit=true
break}}
array[dest++]=array[cursor2++]
if(--length2===0){exit=true
break}
count2=gallopLeft(tmp[cursor1],array,cursor2,length2,0,compare)
if(count2 !==0){for(var i=0;i < count2;i++){array[dest+i]=array[cursor2+i]}
dest+=count2
cursor2+=count2
length2-=count2
if(length2===0){exit=true
break}}
array[dest++]=tmp[cursor1++]
if(--length1===1){exit=true
break}
minGallop--;}while(count1 >=DEFAULT_MIN_GALLOPING ||
count2 >=DEFAULT_MIN_GALLOPING);
if(exit){break}
if(minGallop < 0){minGallop=0}
minGallop+=2}
this.minGallop=minGallop
if(minGallop < 1){this.minGallop=1}
if(length1===1){for(var i=0;i < length2;i++){array[dest+i]=array[cursor2+i]}
array[dest+length2]=tmp[cursor1]}else if(length1===0){throw new TimSortAssertion('mergeLow preconditions were not respected')}else{for(var i=0;i < length1;i++){array[dest+i]=tmp[cursor1+i]}}},
mergeHigh:function(start1,length1,start2,length2){var compare=this.compare,array=this.array,tmp=this.tmp,i=0
for(var i=0;i < length2;i++){tmp[i]=array[start2+i]}
var cursor1=start1+length1-1,cursor2=length2-1,dest=start2+length2-1,customCursor=0,customDest=0
array[dest--]=array[cursor1--]
if(--length1===0){customCursor=dest-(length2-1)
for(var i=0;i < length2;i++){array[customCursor+i]=tmp[i]}
return}
if(length2===1){dest-=length1
cursor1-=length1
customDest=dest+1
customCursor=cursor1+1
for(var i=length1-1;i >=0;i--){array[customDest+i]=array[customCursor+i]}
array[dest]=tmp[cursor2]
return}
var minGallop=this.minGallop
while(true){var count1=0,count2=0,exit=false
do{if(compare(tmp[cursor2],array[cursor1])< 0){array[dest--]=array[cursor1--]
count1++
count2=0
if(--length1===0){exit=true
break}}else{array[dest--]=tmp[cursor2--]
count2++
count1=0
if(--length2===1){exit=true
break}}}while((count1 |count2)< minGallop)
if(exit){break}
do{count1=length1-gallopRight(tmp[cursor2],array,start1,length1,length1-1,compare)
if(count1 !==0){dest-=count1
cursor1-=count1
length1-=count1
customDest=dest+1
customCursor=cursor1+1
for(var i=count1-1;i >=0;i--){array[customDest+i]=array[customCursor+i]}
if(length1===0){exit=true
break}}
array[dest--]=tmp[cursor2--]
if(--length2===1){exit=true
break}
count2=length2-gallopLeft(array[cursor1],tmp,0,length2,length2-1,compare)
if(count2 !==0){dest-=count2
cursor2-=count2
length2-=count2
customDest=dest+1
customCursor=cursor2+1
for(var i=0;i < count2;i++){array[customDest+i]=tmp[customCursor+i]}
if(length2 <=1){exit=true
break}}
array[dest--]=array[cursor1--]
if(--length1===0){exit=true
break}
minGallop--}while(count1 >=DEFAULT_MIN_GALLOPING ||
count2 >=DEFAULT_MIN_GALLOPING)
if(exit){break}
if(minGallop < 0){minGallop=0}
minGallop+=2}
this.minGallop=minGallop
if(minGallop < 1){this.minGallop=1}
if(length2===1){dest-=length1
cursor1-=length1
customDest=dest+1
customCursor=cursor1+1
for(var i=length1-1;i >=0;i--){array[customDest+i]=array[customCursor+i]}
array[dest]=tmp[cursor2]}else if(length2==0){throw new TimSortAssertion("mergeHigh preconditions were not respected")}else{customCursor=dest-(length2-1)
for(var i=0;i < length2;i++){array[customCursor+i]=tmp[i]}}}}
if(self.length < 2*DEFAULT_TMP_STORAGE_LENGTH){self.tmpStorageLength=self.length >>> 1}
self.tmp=new Array(self.tmpStorageLength)
self.stackLength=
(self.length < 120 ? 5 :
self.length < 1542 ? 10 :
self.length < 119151 ? 19 :40)
self.runStart=new Array(self.stackLength)
self.runLength=new Array(self.stackLength)
return self}
function tim_sort(array,compare,lo,hi){if(!Array.isArray(array)){throw _b_.TypeError.$factory("Can only sort arrays")}
if(!compare){compare=alphabeticalCompare}else if(typeof compare !=="function"){hi=lo
lo=compare
compare=alphabeticalCompare}
if(!lo){lo=0}
if(!hi){hi=array.length}
var remaining=hi-lo
if(remaining < 2){return}
var runLength=0
if(remaining < DEFAULT_MIN_MERGE){runLength=makeAscendingRun(array,lo,hi,compare)
binaryInsertionSort(array,lo,hi,lo+runLength,compare)
return}
var ts=new TimSort(array,compare)
var minRun=minRunLength(remaining)
do{runLength=makeAscendingRun(array,lo,hi,compare)
if(runLength < minRun){var force=remaining
if(force > minRun){force=minRun}
binaryInsertionSort(array,lo,lo+force,lo+runLength,compare)
runLength=force}
ts.pushRun(lo,runLength)
ts.mergeRuns()
remaining-=runLength
lo+=runLength}while(remaining !==0)
ts.forceMergeRuns()}
function tim_sort_safe(array,compare){
try{
tim_sort(array,compare,0,array.length)}catch(e){if(e.name==TIM_SORT_ASSERTION){array.sort(compare);}else{
throw e;}}}
$B.$TimSort=tim_sort_safe
$B.$AlphabeticalCompare=alphabeticalCompare})(__BRYTHON__)
;

;(function($B){var _b_=$B.builtins
_b_.__debug__=false
$B.$comps={'>':'gt','>=':'ge','<':'lt','<=':'le'}
$B.$inv_comps={'>':'lt','>=':'le','<':'gt','<=':'ge'}
var check_nb_args=$B.check_nb_args=function(name,expected,args){
var len=args.length,last=args[len-1]
if(last && last.$nat=="kw"){var kw=last.kw
if(Array.isArray(kw)&& kw[1]&& kw[1].__class__===_b_.dict){if(Object.keys(kw[1].$string_dict).length==0){len--}}}
if(len !=expected){if(expected==0){throw _b_.TypeError.$factory(name+"() takes no argument"+
" ("+len+" given)")}else{throw _b_.TypeError.$factory(name+"() takes exactly "+
expected+" argument"+(expected < 2 ? '' :'s')+
" ("+len+" given)")}}}
var check_no_kw=$B.check_no_kw=function(name,x,y){
if(x===undefined){console.log("x undef",name,x,y)}
if((x.$nat && x.kw && x.kw[0]&& x.kw[0].length > 0)||
(y !==undefined && y.$nat)){throw _b_.TypeError.$factory(name+"() takes no keyword arguments")}}
var NoneType={$factory:function(){return None},$infos:{__name__:"NoneType",__module__:"builtins"},__bool__:function(self){return False},__class__:_b_.type,__hash__:function(self){return 0},__mro__:[_b_.object],__repr__:function(self){return 'None'},__str__:function(self){return 'None'},$is_class:true}
NoneType.__setattr__=function(self,attr){return no_set_attr(NoneType,attr)}
var None={__class__:NoneType,}
for(var $op in $B.$comps){
var key=$B.$comps[$op]
switch(key){case 'ge':
case 'gt':
case 'le':
case 'lt':
NoneType['__'+key+'__']=(function(op){return function(other){return _b_.NotImplemented}})($op)}}
for(var $func in None){if(typeof None[$func]=='function'){None[$func].__str__=(function(f){return function(){return "<method-wrapper "+f+
" of NoneType object>"}})($func)}}
$B.set_func_names(NoneType,"builtins")
function __build_class__(){throw _b_.NotImplementedError.$factory('__build_class__')}
function abs(obj){check_nb_args('abs',1,arguments)
check_no_kw('abs',obj)
if(isinstance(obj,_b_.int)){if(obj.__class__===$B.long_int){return{
__class__:$B.long_int,value:obj.value,pos:true}}else{return _b_.int.$factory(Math.abs(obj))}}
if(isinstance(obj,_b_.float)){
return _b_.float.$factory(Math.abs(_b_.float.numerator(obj)))}
var klass=obj.__class__ ||$B.get_class(obj)
try{var method=$B.$getattr(klass,"__abs__")}catch(err){if(err.__class__===_b_.AttributeError){throw _b_.TypeError.$factory("Bad operand type for abs(): '"+
$B.class_name(obj)+"'")}
throw err}
return $B.$call(method)(obj)}
function aiter(async_iterable){return $B.$call($B.$getattr(async_iterable,'__aiter__'))()}
function all(obj){check_nb_args('all',1,arguments)
check_no_kw('all',obj)
var iterable=iter(obj)
while(1){try{var elt=next(iterable)
if(!$B.$bool(elt)){return false}}catch(err){return true}}}
function anext(async_iterator,_default){var missing={},$=$B.args('anext',2,{async_iterator:null,_default:null},['async_iterator','_default'],arguments,{_default:missing},null,null)
var awaitable=$B.$call($B.$getattr(async_iterator,'__anext__'))()
return awaitable}
function any(obj){check_nb_args('any',1,arguments)
check_no_kw('any',obj)
var iterable=iter(obj)
while(1){try{var elt=next(iterable)
if($B.$bool(elt)){return true}}catch(err){return false}}}
function ascii(obj){check_nb_args('ascii',1,arguments)
check_no_kw('ascii',obj)
var res=repr(obj),res1='',cp
for(var i=0;i < res.length;i++){cp=res.charCodeAt(i)
if(cp < 128){res1+=res.charAt(i)}
else if(cp < 256){res1+='\\x'+cp.toString(16)}
else{var s=cp.toString(16)
if(s.length % 2==1){s="0"+s}
res1+='\\u'+s}}
return res1}
function $builtin_base_convert_helper(obj,base){var prefix="";
switch(base){case 2:
prefix='0b';break
case 8:
prefix='0o';break
case 16:
prefix='0x';break
default:
console.log('invalid base:'+base)}
if(obj.__class__===$B.long_int){var res=prefix+$B.long_int.to_base(obj,base)
if(! obj.pos){res="-"+res}
return res}
var value=$B.$GetInt(obj)
if(value===undefined){
throw _b_.TypeError.$factory('Error, argument must be an integer or'+
' contains an __index__ function')}
if(value >=0){return prefix+value.toString(base)}
return '-'+prefix+(-value).toString(base)}
function bin_hex_oct(base,obj){
if(isinstance(obj,_b_.int)){return $builtin_base_convert_helper(obj,base)}else{try{var klass=obj.__class__ ||$B.get_class(obj),method=$B.$getattr(klass,'__index__')}catch(err){if(err.__class__===_b_.AttributeError){throw _b_.TypeError.$factory("'"+$B.class_name(obj)+
"' object cannot be interpreted as an integer")}
throw err}
var res=$B.$call(method)(obj)
return $builtin_base_convert_helper(res,base)}}
function bin(obj){check_nb_args('bin',1,arguments)
check_no_kw('bin',obj)
return bin_hex_oct(2,obj)}
function breakpoint(){
$B.$import('sys',[])
var missing={},hook=$B.$getattr($B.imported.sys,'breakpointhook',missing)
if(hook===missing){throw _b_.RuntimeError.$factory('lost sys.breakpointhook')}
return $B.$call(hook).apply(null,arguments)}
function callable(obj){check_nb_args('callable',1,arguments)
check_no_kw('callable',obj)
return hasattr(obj,'__call__')}
function chr(i){check_nb_args('chr',1,arguments)
check_no_kw('chr',i)
i=$B.PyNumber_Index(i)
if(i < 0 ||i > 1114111){throw _b_.ValueError.$factory('Outside valid range')}else if(i >=0x10000 && i <=0x10FFFF){var code=(i-0x10000)
return String.fromCodePoint(0xD800 |(code >> 10))+
String.fromCodePoint(0xDC00 |(code & 0x3FF))}else{return String.fromCodePoint(i)}}
var classmethod=$B.make_class("classmethod",function(func){check_nb_args('classmethod',1,arguments)
check_no_kw('classmethod',func)
var f=function(){return func.apply(null,arguments)}
f.__class__=$B.method
if(func.$attrs){for(var key in func.$attrs){f[key]=func.$attrs[key]}}
f.$infos={__func__:func,__name__:func.$infos.__name__}
f.__get__=function(obj,cls){var method=function(){return f(cls,...arguments)}
method.__class__=$B.method
method.$infos={__self__:cls,__func__:f,__name__:func.$infos.__name__,__qualname__:cls.$infos.__name__+"."+func.$infos.__name__}
return method}
f.__get__.__class__=$B.method_wrapper
f.__get__.$infos=func.$infos
return f}
)
$B.set_func_names(classmethod,"builtins")
var code=$B.code=$B.make_class("code")
code.__repr__=code.__str__=function(self){return `<code object ${self.co_name}, file '${self.co_filename}'>`}
code.__getattribute__=function(self,attr){return self[attr]}
$B.set_func_names(code,"builtins")
function compile(){var $=$B.args('compile',6,{source:null,filename:null,mode:null,flags:null,dont_inherit:null,optimize:null,_feature_version:null},['source','filename','mode','flags','dont_inherit','optimize','_feature_version'],arguments,{flags:0,dont_inherit:false,optimize:-1,_feature_version:0},null,null)
var module_name='$exec_'+$B.UUID()
$.__class__=code
$.co_flags=$.flags
$.co_name="<module>"
var filename=$.co_filename=$.filename
var interactive=$.mode=="single" &&($.flags & 0x200)
$B.file_cache[filename]=$.source
if(_b_.isinstance($.source,_b_.bytes)){var encoding='utf-8',lfpos=$.source.source.indexOf(10),first_line,second_line
if(lfpos==-1){first_line=$.source}else{first_line=_b_.bytes.$factory($.source.source.slice(0,lfpos))}
first_line=_b_.bytes.decode(first_line,'latin-1')
var encoding_re=/^[\t\f]*#.*?coding[:=][\t]*([-_.a-zA-Z0-9]+)/
var mo=first_line.match(encoding_re)
if(mo){encoding=mo[1]}else if(lfpos >-1){
var rest=$.source.source.slice(lfpos+1)
lfpos=rest.indexOf(10)
if(lfpos >-1){second_line=_b_.bytes.$factory(rest.slice(0,lfpos))}else{second_line=_b_.bytes.$factory(rest)}
second_line=_b_.bytes.decode(second_line,'latin-1')
var mo=second_line.match(encoding_re)
if(mo){encoding=mo[1]}}
$.source=_b_.bytes.decode($.source,encoding)}
if(!_b_.isinstance(filename,[_b_.bytes,_b_.str])){
$B.imported._warnings.warn(_b_.DeprecationWarning.$factory(
`path should be string, bytes, or os.PathLike, `+
`not ${$B.class_name(filename)}`))}
if(interactive && ! $.source.endsWith("\n")){
var lines=$.source.split("\n")
if($B.last(lines).startsWith(" ")){throw _b_.SyntaxError.$factory("unexpected EOF while parsing")}}
if($B.parser_to_ast){var _ast=new $B.Parser($.source,filename).parse(
'file')
var symtable=$B._PySymtable_Build(_ast,filename)
if($.flags==$B.PyCF_ONLY_AST){return _ast}}else{var root=$B.parser.$create_root_node(
{src:$.source,filename},module_name,module_name)
root.mode=$.mode
root.parent_block=$B.builtins_scope
$B.parser.dispatch_tokens(root,$.source)
var _ast=root.ast()
var future=$B._PyFuture_FromAST(_ast,filename)
var symtable=$B._PySymtable_Build(_ast,filename,future)
var js_obj=$B.js_from_root(_ast,symtable,filename)
if($.flags==$B.PyCF_ONLY_AST){$B.create_python_ast_classes()
var klass=_ast.constructor.$name
return $B.python_ast_classes[klass].$factory(_ast)}}
return $}
var __debug__=$B.debug > 0
function delattr(obj,attr){
check_no_kw('delattr',obj,attr)
check_nb_args('delattr',2,arguments)
if(typeof attr !='string'){throw _b_.TypeError.$factory("attribute name must be string, not '"+
$B.class_name(attr)+"'")}
return $B.$getattr(obj,'__delattr__')(attr)}
$B.$delete=function(name,is_global){
function del(obj){if(obj.__class__===$B.generator){
obj.js_gen.return()}}
var found=false,frame=$B.last($B.frames_stack)
if(! is_global){if(frame[1][name]!==undefined){found=true
del(frame[1][name])
delete frame[1][name]}}else{if(frame[2]!=frame[0]&& frame[3][name]!==undefined){found=true
del(frame[3][name])
delete frame[3][name]}}
if(!found){throw $B.name_error(name)}}
function dir(obj){if(obj===undefined){
var frame=$B.last($B.frames_stack)
locals_obj=frame[1],res=_b_.list.$factory(),pos=0
for(var attr in locals_obj){if(attr.charAt(0)=='$' && attr.charAt(1)!='$'){
continue}
res[pos++]=attr}
_b_.list.sort(res)
return res}
check_nb_args('dir',1,arguments)
check_no_kw('dir',obj)
var klass=obj.__class__ ||$B.get_class(obj)
if(obj.$is_class){
var dir_func=$B.$getattr(obj.__class__,"__dir__")
return $B.$call(dir_func)(obj)}
try{var res=$B.$call($B.$getattr(obj,'__dir__'))()
res=_b_.list.$factory(res)
return res}catch(err){}
var res=[],pos=0
for(var attr in obj){if(attr.charAt(0)!=='$' && attr !=='__class__' &&
obj[attr]!==undefined){res[pos++]=attr}}
res.sort()
return res}
function divmod(x,y){check_no_kw('divmod',x,y)
check_nb_args('divmod',2,arguments)
var klass=x.__class__ ||$B.get_class(x)
var dm=$B.$getattr(klass,"__divmod__",_b_.None)
if(dm !==_b_.None){return dm(x,y)}
return _b_.tuple.$factory([$B.$getattr(klass,'__floordiv__')(x,y),$B.$getattr(klass,'__mod__')(x,y)])}
var enumerate=$B.make_class("enumerate",function(){var $ns=$B.args("enumerate",2,{iterable:null,start:null},['iterable','start'],arguments,{start:0},null,null),_iter=iter($ns["iterable"]),start=$ns["start"]
return{
__class__:enumerate,__name__:'enumerate iterator',counter:start-1,iter:_iter,start:start}}
)
enumerate.__iter__=function(self){self.counter=self.start-1
return self}
enumerate.__next__=function(self){self.counter++
return $B.fast_tuple([self.counter,next(self.iter)])}
$B.set_func_names(enumerate,"builtins")
function make_proxy(dict,lineno){
const handler={get:function(target,prop){console.log('get proxy attr',prop,target)
if(prop=='__class__'){return _b_.dict}else if(prop=='$lineno'){return lineno}
if(target.$string_dict.hasOwnProperty(prop)){return target.$string_dict[prop][0]}
return undefined},set:function(target,prop,value){_b_.dict.$setitem(target,prop,value)}}
return new Proxy(dict,handler)}
function $$eval(src,_globals,_locals){var $=$B.args("eval",4,{src:null,globals:null,locals:null,mode:null},["src","globals","locals","mode"],arguments,{globals:_b_.None,locals:_b_.None,mode:"eval"},null,null),src=$.src,_globals=$.globals,_locals=$.locals,mode=$.mode
if($.src.mode && $.src.mode=="single" &&
["<console>","<stdin>"].indexOf($.src.filename)>-1){
_b_.print(">",$.src.source.trim())}
if(src.__class__===code){mode=src.mode
src=src.source}else if((! src.valueOf)||typeof src.valueOf()!=='string'){throw _b_.TypeError.$factory(`${mode}() arg 1 must be a string,`+
" bytes or code object")}else{
src=src.valueOf()}
var frame=$B.last($B.frames_stack)
var lineno=frame[1].$lineno
$B.exec_scope=$B.exec_scope ||{}
if(src.endsWith('\\\n')){var exc=_b_.SyntaxError.$factory('')
var lines=src.split('\n'),line=lines[lines.length-2]
exc.args=['unexpected EOF while parsing',['<string>',lines.length-1,1,line]]
throw exc}
var local_name='locals_exec',global_name='globals_exec',exec_locals={},exec_globals={},__name__='<module>'
var handler={get:function(obj,prop){if(prop=='$lineno'){return lineno}else if(prop=='__file__'){return '<string>'}
return obj[prop]},set:function(obj,prop,value){if(['__file__','$lineno'].indexOf(prop)==-1){obj[prop]=value}}}
if(_globals===_b_.None){
exec_locals=new Proxy(frame[1],handler)
exec_globals=new Proxy(frame[3],handler)}else{if(_globals.__class__ !==_b_.dict){throw _b_.TypeError.$factory(`${mode}() globals must be `+
"a dict, not "+$B.class_name(_globals))}
exec_globals={}
if(_globals.$jsobj){
exec_globals=new Proxy(_globals.$jsobj,handler)}else{
if(_globals.$jsobj){exec_globals=_globals.$jsobj}else{exec_globals=_globals.$jsobj={}}
for(var key in _globals.$string_dict){_globals.$jsobj[key]=_globals.$string_dict[key][0]
if(key=='__name__'){__name__=_globals.$jsobj[key]}}}
if(exec_globals.__builtins__===undefined){exec_globals.__builtins__=_b_.__builtins__}
if(_locals===_b_.None){exec_locals=exec_globals}else{if(global_name==local_name){
global_name+='_globals'}
if(_locals.$jsobj){for(var key in _locals.$jsobj){exec_globals[key]=_locals.$jsobj[key]}}else{if(_locals.$jsobj){exec_locals=_locals.$jsobj}else{exec_locals=_locals.$jsobj={$dict:_locals}}
for(var key in _locals.$string_dict){_locals.$jsobj[key]=_locals.$string_dict[key][0]}
exec_locals.$getitem=$B.$call($B.$getattr(_locals.__class__,'__getitem__'))
var missing=$B.$getattr(_locals.__class__,'__missing__',null)
if(missing){exec_locals.$missing=$B.$call(missing)}}}}
var save_frames_stack=$B.frames_stack.slice()
var top_frame=[__name__,exec_locals,__name__,exec_globals]
top_frame.is_exec_top=true
exec_locals.$f_trace=$B.enter_frame(top_frame)
exec_locals.$lineno=1
var filename='<string>'
try{if($B.parser_to_ast){var _ast=new $B.Parser(src,filename).parse(mode=='eval' ? 'eval' :'file')
var symtable=$B._PySymtable_Build(_ast,filename)
var js_obj=$B.js_from_root(_ast,symtable,filename,{local_name,exec_locals,global_name,exec_globals})
js=js_obj.js}else{var root=$B.parser.$create_root_node(src,'<module>',frame[0],frame[2],1)
root.mode=mode
root.filename=filename
$B.parser.dispatch_tokens(root)
var _ast=root.ast(),symtable=$B._PySymtable_Build(_ast,filename),js_obj=$B.js_from_root(_ast,symtable,filename,{local_name,exec_locals,global_name,exec_globals}),js=js_obj.js}}catch(err){if(err.args){var lineno=err.args[1][1]
exec_locals.$lineno=lineno}else{console.log('JS Error',err.message)}
$B.frames_stack=save_frames_stack
throw err}
if(mode=='eval'){js='return '+js}
try{var exec_func=new Function('$B','_b_','locals',local_name,global_name,js)}catch(err){console.log('error\n',js)
throw err}
try{var res=exec_func($B,_b_,exec_locals,exec_locals,exec_globals)}catch(err){if(err.$stack){err.$stack=save_frames_stack.concat(err.$stack)}else{err.$stack=save_frames_stack.concat($B.frames_stack)}
$B.frames_stack=save_frames_stack
throw err}
if(_globals !==_b_.None){for(var key in exec_globals){if(! key.startsWith('$')){_b_.dict.$setitem(_globals,key,exec_globals[key])}}
if(_locals !==_b_.None){for(var key in exec_locals){if(! key.startsWith('$')){_b_.dict.$setitem(_locals,key,exec_locals[key])}}}}
$B.frames_stack=save_frames_stack
return res}
$$eval.$is_func=true
function exec(src,globals,locals){var missing={}
var $=$B.args("exec",3,{src:null,globals:null,locals:null},["src","globals","locals"],arguments,{globals:_b_.None,locals:_b_.None},null,null),src=$.src,globals=$.globals,locals=$.locals
return $$eval(src,globals,locals,"exec")||_b_.None}
exec.$is_func=true
function exit(){throw _b_.SystemExit}
exit.__repr__=exit.__str__=function(){return "Use exit() or Ctrl-Z plus Return to exit"}
var filter=$B.make_class("filter",function(func,iterable){check_no_kw('filter',func,iterable)
check_nb_args('filter',2,arguments)
iterable=iter(iterable)
if(func===_b_.None){func=$B.$bool}
return{
__class__:filter,func:func,iterable:iterable}}
)
filter.__iter__=function(self){return self}
filter.__next__=function(self){while(true){var _item=next(self.iterable)
if(self.func(_item)){return _item}}}
$B.set_func_names(filter,"builtins")
function format(value,format_spec){var $=$B.args("format",2,{value:null,format_spec:null},["value","format_spec"],arguments,{format_spec:''},null,null)
var klass=value.__class__ ||$B.get_class(value)
try{var method=$B.$getattr(klass,'__format__')}catch(err){if(err.__class__===_b_.AttributeError){throw _b_.NotImplementedError("__format__ is not implemented "+
"for object '"+_b_.str.$factory(value)+"'")}
throw err}
return $B.$call(method)(value,$.format_spec)}
function attr_error(attr,obj){var cname=$B.get_class(obj)
var msg="bad operand type for unary #: '"+cname+"'"
switch(attr){case '__neg__':
throw _b_.TypeError.$factory(msg.replace('#','-'))
case '__pos__':
throw _b_.TypeError.$factory(msg.replace('#','+'))
case '__invert__':
throw _b_.TypeError.$factory(msg.replace('#','~'))
case '__call__':
throw _b_.TypeError.$factory("'"+cname+"'"+
' object is not callable')
default:
throw $B.attr_error(attr,obj)}}
function getattr(){var missing={}
var $=$B.args("getattr",3,{obj:null,attr:null,_default:null},["obj","attr","_default"],arguments,{_default:missing},null,null)
return $B.$getattr($.obj,$.attr,$._default===missing ? undefined :$._default)}
function in_mro(klass,attr){if(klass===undefined){return false}
if(klass.hasOwnProperty(attr)){return klass[attr]}
var mro=klass.__mro__
for(var i=0,len=mro.length;i < len;i++){if(mro[i].hasOwnProperty(attr)){return mro[i][attr]}}
return false}
$B.$getattr=function(obj,attr,_default){
var res
if(obj.$method_cache &&
obj.$method_cache[attr]&&
obj.__class__ &&
obj.__class__[attr]==obj.$method_cache[attr][1]){
return obj.$method_cache[attr][0]}
var rawname=attr
if(obj===undefined){console.log("get attr",attr,"of undefined")}
var is_class=obj.$is_class ||obj.$factory
var klass=obj.__class__
var $test=false 
if($test){console.log("$getattr",attr,'\nobj',obj,'\nklass',klass)}
if(klass !==undefined &&(! klass.$native)&& klass.__bases__ &&
klass.__getattribute__===undefined &&
(klass.__bases__.length==0 ||
(klass.__bases__.length==1 &&
klass.__bases__[0]===_b_.object))){if($test){console.log("class without parent",klass)
console.log('\nobj[attr]',obj[attr])}
if(obj[attr]!==undefined){return obj[attr]}else if(obj.__dict__ &&
obj.__dict__.$string_dict.hasOwnProperty(attr)&&
!(klass.hasOwnProperty(attr)&&
klass[attr].__get__)){return obj.__dict__.$string_dict[attr][0]}else if(klass.hasOwnProperty(attr)){if(typeof klass[attr]!="function" &&
attr !="__dict__" &&
klass[attr].__get__===undefined){var kl=klass[attr].__class__
if(! in_mro(kl,"__get__")){return klass[attr]}}}}
if($test){console.log("attr",attr,"of",obj,"class",klass,"isclass",is_class)}
if(klass===undefined){
if(typeof obj=='string'){klass=_b_.str}
else if(typeof obj=='number'){klass=obj % 1==0 ? _b_.int :_b_.float}else if(obj instanceof Number){klass=_b_.float}else{klass=$B.get_class(obj)
if(klass===undefined){
if($test){console.log("no class",attr,obj.hasOwnProperty(attr),obj[attr])}
res=obj[attr]
if(res !==undefined){if(typeof res=="function"){var f=function(){
return res.apply(obj,arguments)}
f.$infos={__name__:attr,__qualname__:attr}
return f}else{return $B.$JS2Py(res)}}
if(_default !==undefined){return _default}
throw $B.attr_error(rawname,obj)}}}
switch(attr){case '__call__':
if(typeof obj=='function'){res=function(){return obj.apply(null,arguments)}
res.__class__=method_wrapper
res.$infos={__name__:"__call__"}
return res}
break
case '__class__':
return klass
case '__dict__':
if(is_class){var proxy={}
for(var key in obj){if(! key.startsWith("$")){proxy[key]=obj[key]}}
proxy.__dict__=$B.getset_descriptor.$factory(obj,"__dict__")
return $B.mappingproxy.$factory(proxy)}else if(! klass.$native){if(obj[attr]!==undefined){return obj[attr]}else if(obj.$infos){if(obj.$infos.hasOwnProperty("__dict__")){return obj.$infos.__dict__}else if(obj.$infos.hasOwnProperty("__func__")){return obj.$infos.__func__.$infos.__dict__}}
return $B.obj_dict(obj,function(attr){return['__class__'].indexOf(attr)>-1}
)}
case '__doc__':
for(var i=0;i < builtin_names.length;i++){if(obj===_b_[builtin_names[i]]){_get_builtins_doc()
return $B.builtins_doc[builtin_names[i]]}}
break
case '__mro__':
if(obj.$is_class){
return _b_.tuple.$factory([obj].concat(obj.__mro__))}else if(obj.__dict__ &&
obj.__dict__.$string_dict.__mro__ !==undefined){return obj.__dict__.$string_dict.__mro__}
throw $B.attr_error(attr,obj)
case '__subclasses__':
if(klass.$factory ||klass.$is_class){var subclasses=obj.$subclasses ||[]
return function(){return subclasses}}
break}
if(typeof obj=='function'){var value=obj[attr]
if(value !==undefined){if(attr=='__module__'){return value}}}
if((! is_class)&& klass.$native){if(obj.$method_cache && obj.$method_cache[attr]){return obj.$method_cache[attr]}
if($test){console.log("native class",klass,klass[attr])}
if(attr=="__doc__" && klass[attr]===undefined && klass.$infos){_get_builtins_doc()
klass[attr]=$B.builtins_doc[klass.$infos.__name__]}
if(klass[attr]===undefined){var object_attr=_b_.object[attr]
if($test){console.log("object attr",object_attr)}
if(object_attr !==undefined){klass[attr]=object_attr}else{if($test){console.log("obj[attr]",obj[attr])}
var attrs=obj.__dict__
if(attrs &&
(object_attr=attrs.$string_dict[attr])!==undefined){return object_attr[0]}
if(_default===undefined){throw $B.attr_error(attr,obj)}
return _default}}
if(klass.$descriptors && klass.$descriptors[attr]!==undefined){return klass[attr](obj)}
if(typeof klass[attr]=='function'){var func=klass[attr]
if(attr=='__new__'){func.$type="staticmethod"}
if(func.$type=="staticmethod"){return func}
var self=klass[attr].__class__==$B.method ? klass :obj,method=klass[attr].bind(null,self)
method.__class__=$B.method
method.$infos={__func__:func,__name__:attr,__self__:self,__qualname__:klass.$infos.__name__+"."+attr}
if(typeof obj=="object"){
obj.__class__=klass
obj.$method_cache=obj.$method_cache ||{}
obj.$method_cache[attr]=method}
return method}else if(klass[attr]!==undefined){return klass[attr]}
attr_error(rawname,klass)}
var mro,attr_func
if(is_class){attr_func=_b_.type.__getattribute__ }else{attr_func=klass.__getattribute__
if(attr_func===undefined){var mro=klass.__mro__
if(mro===undefined){console.log(obj,attr,"no mro, klass",klass)}
for(var i=0,len=mro.length;i < len;i++){attr_func=mro[i]['__getattribute__']
if(attr_func !==undefined){break}}}}
if(typeof attr_func !=='function'){console.log(attr+' is not a function '+attr_func,klass)}
var odga=_b_.object.__getattribute__
if($test){console.log("attr_func is odga ?",attr_func,attr_func===odga,'\nobj[attr]',obj[attr])}
if(attr_func===odga){res=obj[attr]
if(Array.isArray(obj)&& Array.prototype[attr]!==undefined){
res=undefined}else if(res===null){return null}else if(false && res===undefined && obj[attr]!==undefined){if(_default===undefined){throw $B.attr_error(attr,obj)}
return _default}else if(res !==undefined){if($test){console.log(obj,attr,obj[attr],res.__set__ ||res.$is_class)}
if(res.$is_property){return property.__get__(res)}
if(res.__set__===undefined ||res.$is_class){if($test){console.log("return",res,res+'',res.__set__,res.$is_class)}
return res}}}
if($test){console.log('no result with object.__getattribute__')}
try{res=attr_func(obj,attr)
if($test){console.log("result of attr_func",res)}}catch(err){var getattr
if(klass===$B.module){
getattr=obj.__getattr__
if(getattr){try{return getattr(attr)}catch(err){if(_default !==undefined){return _default}
throw err}}}else{var getattr=in_mro(klass,'__getattr__')
if(getattr){if(attr=='strange'){console.log('essaie getattr',obj,klass,attr)}
try{if(klass===$B.module){res=getattr(attr)}else{res=getattr(obj,attr)}
return res}catch(err){if(_default !==undefined){return _default}
throw err}}}
if(_default !==undefined){return _default}
throw err}
if(res !==undefined){return res}
if(_default !==undefined){return _default}
var cname=klass.$infos.__name__
if(is_class){cname=obj.$infos.__name__}
attr_error(rawname,is_class ? obj :klass)}
function globals(){
check_nb_args('globals',0,arguments)
var res=$B.obj_dict($B.last($B.frames_stack)[3])
res.$jsobj.__BRYTHON__=$B.JSObj.$factory($B)
res.$is_namespace=true
return res}
function hasattr(obj,attr){check_no_kw('hasattr',obj,attr)
check_nb_args('hasattr',2,arguments)
try{$B.$getattr(obj,attr)
return true}catch(err){return false}}
var hash_cache={}
function hash(obj){check_no_kw('hash',obj)
check_nb_args('hash',1,arguments)
if(obj.__hashvalue__ !==undefined){return obj.__hashvalue__}
if(isinstance(obj,_b_.bool)){return _b_.int.$factory(obj)}
if(obj.$is_class ||
obj.__class__===_b_.type ||
obj.__class__===$B.Function){return obj.__hashvalue__=$B.$py_next_hash--}
if(typeof obj=="string"){var cached=hash_cache[obj]
if(cached !==undefined){return cached}
else{return hash_cache[obj]=_b_.str.__hash__(obj)}}
var klass=obj.__class__ ||$B.get_class(obj)
if(klass===undefined){throw _b_.TypeError.$factory("unhashable type: '"+
_b_.str.$factory($B.JSObj.$factory(obj))+"'")}
var hash_method=$B.$getattr(klass,'__hash__',_b_.None)
if(hash_method===_b_.None){throw _b_.TypeError.$factory("unhashable type: '"+
$B.class_name(obj)+"'")}
if(hash_method.$infos.__func__===_b_.object.__hash__){if($B.$getattr(obj,'__eq__').$infos.__func__ !==_b_.object.__eq__){throw _b_.TypeError.$factory("unhashable type: '"+
$B.class_name(obj)+"'",'hash')}else{return obj.__hashvalue__=_b_.object.__hash__(obj)}}else{return $B.$call(hash_method)(obj)}}
function _get_builtins_doc(){if($B.builtins_doc===undefined){
var url=$B.brython_path
if(url.charAt(url.length-1)=='/'){url=url.substr(0,url.length-1)}
url+='/builtins_docstrings.js'
var f=_b_.open(url)
eval(f.$content)
$B.builtins_doc=docs}}
function help(obj){if(obj===undefined){obj='help'}
if(typeof obj=='string' && _b_[obj]!==undefined){_get_builtins_doc()
var _doc=$B.builtins_doc[obj]
if(_doc !==undefined && _doc !=''){_b_.print(_doc)
return}}
for(var i=0;i < builtin_names.length;i++){if(obj===_b_[builtin_names[i]]){_get_builtins_doc()
_b_.print(_doc=$B.builtins_doc[builtin_names[i]])}}
if(typeof obj=='string'){$B.$import("pydoc");
var pydoc=$B.imported["pydoc"]
$B.$getattr($B.$getattr(pydoc,"help"),"__call__")(obj)
return}
try{return $B.$getattr(obj,'__doc__')}
catch(err){return ''}}
help.__repr__=help.__str__=function(){return "Type help() for interactive help, or help(object) "+
"for help about object."}
function hex(obj){check_no_kw('hex',obj)
check_nb_args('hex',1,arguments)
return bin_hex_oct(16,obj)}
function id(obj){check_no_kw('id',obj)
check_nb_args('id',1,arguments)
if(isinstance(obj,[_b_.str,_b_.int,_b_.float])&&
!isinstance(obj,$B.long_int)){return $B.$getattr(_b_.str.$factory(obj),'__hash__')()}else if(obj.$id !==undefined){return obj.$id}
else{return obj.$id=$B.UUID()}}
function __import__(mod_name,globals,locals,fromlist,level){
var $=$B.args('__import__',5,{name:null,globals:null,locals:null,fromlist:null,level:null},['name','globals','locals','fromlist','level'],arguments,{globals:None,locals:None,fromlist:_b_.tuple.$factory(),level:0},null,null)
return $B.$__import__($.name,$.globals,$.locals,$.fromlist)}
function input(msg){var res=prompt(msg ||'')||''
if($B.imported["sys"]&& $B.imported["sys"].ps1){
var ps1=$B.imported["sys"].ps1,ps2=$B.imported["sys"].ps2
if(msg==ps1 ||msg==ps2){console.log(msg,res)}}
return res}
function isinstance(obj,cls){check_no_kw('isinstance',obj,cls)
check_nb_args('isinstance',2,arguments)
if(obj===null){return cls===None}
if(obj===undefined){return false}
if(Array.isArray(cls)){for(var kls of cls){if(isinstance(obj,kls)){return true}}
return false}
if(cls.__class__===$B.GenericAlias){
throw _b_.TypeError.$factory(
'isinstance() arg 2 cannot be a parameterized generic')}
if((!cls.__class__)||(! cls.$is_class)){if(! $B.$getattr(cls,'__instancecheck__',false)){throw _b_.TypeError.$factory("isinstance() arg 2 must be a type "+
"or tuple of types")}}
if(cls===_b_.int &&(obj===True ||obj===False)){return True}
if(cls===_b_.bool){switch(typeof obj){case "string":
return false
case "number":
return false
case "boolean":
return true}}
var klass=obj.__class__
if(klass==undefined){if(typeof obj=='string'){if(cls==_b_.str){return true}
else if($B.builtin_classes.indexOf(cls)>-1){return false}}else if(obj.contructor===Number && Number.isFinite(obj)){if(cls==_b_.float){return true}}else if(typeof obj=='number' && Number.isFinite(obj)){if(Number.isFinite(obj)&& cls==_b_.int){return true}}
klass=$B.get_class(obj)}
if(klass===undefined){return false}
function check(kl,cls){if(kl===cls){return true}
else if(cls===_b_.str && kl===$B.StringSubclass){return true}
else if(cls===_b_.int && kl===$B.IntSubclass){return true}}
if(check(klass,cls)){return true}
var mro=klass.__mro__
for(var i=0;i < mro.length;i++){if(check(mro[i],cls)){return true}}
var instancecheck=$B.$getattr(cls.__class__ ||$B.get_class(cls),'__instancecheck__',_b_.None)
if(instancecheck !==_b_.None){return instancecheck(cls,obj)}
return false}
function issubclass(klass,classinfo){check_no_kw('issubclass',klass,classinfo)
check_nb_args('issubclass',2,arguments)
if(!klass.__class__ ||
!(klass.$factory !==undefined ||klass.$is_class !==undefined)){throw _b_.TypeError.$factory("issubclass() arg 1 must be a class")}
if(isinstance(classinfo,_b_.tuple)){for(var i=0;i < classinfo.length;i++){if(issubclass(klass,classinfo[i])){return true}}
return false}
if(classinfo.__class__===$B.GenericAlias){throw _b_.TypeError.$factory(
'issubclass() arg 2 cannot be a parameterized generic')}
if(classinfo.$factory ||classinfo.$is_class){if(klass===classinfo ||
klass.__mro__.indexOf(classinfo)>-1){return true}}
var sch=$B.$getattr(classinfo.__class__ ||$B.get_class(classinfo),'__subclasscheck__',_b_.None)
if(sch==_b_.None){return false}
return sch(classinfo,klass)}
var iterator_class=$B.make_class("iterator",function(getitem,len){return{
__class__:iterator_class,getitem:getitem,len:len,counter:-1}}
)
iterator_class.__next__=function(self){self.counter++
if(self.len !==null && self.counter==self.len){throw _b_.StopIteration.$factory('')}
try{return self.getitem(self.counter)}
catch(err){throw _b_.StopIteration.$factory('')}}
$B.set_func_names(iterator_class,"builtins")
callable_iterator=$B.make_class("callable_iterator",function(func,sentinel){return{
__class__:callable_iterator,func:func,sentinel:sentinel}}
)
callable_iterator.__iter__=function(self){return self}
callable_iterator.__next__=function(self){var res=self.func()
if($B.rich_comp("__eq__",res,self.sentinel)){throw _b_.StopIteration.$factory()}
return res}
$B.set_func_names(callable_iterator,"builtins")
$B.$iter=function(obj,sentinel){
if(sentinel===undefined){var klass=obj.__class__ ||$B.get_class(obj)
try{var _iter=$B.$call($B.$getattr(klass,'__iter__'))}catch(err){if(err.__class__===_b_.AttributeError){try{var gi_method=$B.$call($B.$getattr(klass,'__getitem__')),gi=function(i){return gi_method(obj,i)},ln=len(obj)
return iterator_class.$factory(gi,len)}catch(err){throw _b_.TypeError.$factory("'"+$B.class_name(obj)+
"' object is not iterable")}}
throw err}
var res=$B.$call(_iter)(obj)
try{$B.$getattr(res,'__next__')}
catch(err){if(isinstance(err,_b_.AttributeError)){throw _b_.TypeError.$factory(
"iter() returned non-iterator of type '"+
$B.class_name(res)+"'")}}
return res}else{return callable_iterator.$factory(obj,sentinel)}}
function iter(){
var $=$B.args('iter',1,{obj:null},['obj'],arguments,{},'args','kw'),sentinel
if($.args.length > 0){var sentinel=$.args[0]}
return $B.$iter($.obj,sentinel)}
function len(obj){check_no_kw('len',obj)
check_nb_args('len',1,arguments)
var klass=obj.__class__ ||$B.get_class(obj)
try{var method=$B.$getattr(klass,'__len__')}catch(err){throw _b_.TypeError.$factory("object of type '"+
$B.class_name(obj)+"' has no len()")}
return $B.$call(method)(obj)}
function locals(){
check_nb_args('locals',0,arguments)
var res=$B.obj_dict($B.clone($B.last($B.frames_stack)[1]))
res.$is_namespace=true
delete res.$jsobj.__annotations__
return res}
var map=$B.make_class("map",function(){var $=$B.args('map',2,{func:null,it1:null},['func','it1'],arguments,{},'args',null),func=$B.$call($.func)
var iter_args=[$B.$iter($.it1)]
$.args.forEach(function(item){iter_args.push($B.$iter(item))})
var obj={__class__:map,args:iter_args,func:func}
return obj}
)
map.__iter__=function(self){return self}
map.__next__=function(self){var args=[]
for(var i=0;i < self.args.length;i++){args.push(next(self.args[i]))}
return self.func.apply(null,args)}
$B.set_func_names(map,"builtins")
function $extreme(args,op){
var $op_name='min'
if(op==='__gt__'){$op_name="max"}
var $=$B.args($op_name,0,{},[],args,{},'args','kw')
var has_default=false,func=false
for(var attr in $.kw.$string_dict){switch(attr){case 'key':
func=$.kw.$string_dict[attr][0]
break
case 'default':
var default_value=$.kw.$string_dict[attr][0]
has_default=true
break
default:
throw _b_.TypeError.$factory("'"+attr+
"' is an invalid keyword argument for this function")}}
if((! func)||func===_b_.None){func=x=> x}
if($.args.length==0){throw _b_.TypeError.$factory($op_name+
" expected 1 arguments, got 0")}else if($.args.length==1){
var $iter=iter($.args[0]),res=null,x_value,extr_value
while(true){try{var x=next($iter)
if(res===null){extr_value=func(x)
res=x}else{x_value=func(x)
if($B.rich_comp(op,x_value,extr_value)){res=x
extr_value=x_value}}}catch(err){if(err.__class__==_b_.StopIteration){if(res===null){if(has_default){return default_value}else{throw _b_.ValueError.$factory($op_name+
"() arg is an empty sequence")}}else{return res}}
throw err}}}else{if(has_default){throw _b_.TypeError.$factory("Cannot specify a default for "+
$op_name+"() with multiple positional arguments")}
if($B.last(args).$nat){var _args=[$.args].concat($B.last(args))}else{var _args=[$.args]}
return $extreme.call(null,_args,op)}}
function max(){return $extreme(arguments,'__gt__')}
var memoryview=$B.make_class('memoryview',function(obj){check_no_kw('memoryview',obj)
check_nb_args('memoryview',1,arguments)
if(obj.__class__===memoryview){return obj}
if($B.get_class(obj).$buffer_protocol){return{
__class__:memoryview,obj:obj,
format:'B',itemsize:1,ndim:1,shape:_b_.tuple.$factory([_b_.len(obj)]),strides:_b_.tuple.$factory([1]),suboffsets:_b_.tuple.$factory([]),c_contiguous:true,f_contiguous:true,contiguous:true}}else{throw _b_.TypeError.$factory("memoryview: a bytes-like object "+
"is required, not '"+$B.class_name(obj)+"'")}}
)
memoryview.$match_sequence_pattern=true,
memoryview.__eq__=function(self,other){if(other.__class__ !==memoryview){return false}
return $B.$getattr(self.obj,'__eq__')(other.obj)}
memoryview.__getitem__=function(self,key){if(isinstance(key,_b_.int)){var start=key*self.itemsize
if(self.format=="I"){var res=self.obj.source[start],coef=256
for(var i=1;i < 4;i++){res+=self.obj.source[start+i]*coef
coef*=256}
return res}else if("B".indexOf(self.format)>-1){if(key > self.obj.source.length-1){throw _b_.KeyError.$factory(key)}
return self.obj.source[key]}else{
return self.obj.source[key]}}
var res=self.obj.__class__.__getitem__(self.obj,key)
if(key.__class__===_b_.slice){return memoryview.$factory(res)}}
memoryview.__len__=function(self){return len(self.obj)/self.itemsize}
memoryview.__setitem__=function(self,key,value){try{$B.$setitem(self.obj,key,value)}catch(err){throw _b_.TypeError.$factory("cannot modify read-only memory")}}
memoryview.cast=function(self,format){switch(format){case "B":
return memoryview.$factory(self.obj)
case "I":
var res=memoryview.$factory(self.obj),objlen=len(self.obj)
res.itemsize=4
res.format="I"
if(objlen % 4 !=0){throw _b_.TypeError.$factory("memoryview: length is not "+
"a multiple of itemsize")}
return res}}
memoryview.hex=function(self){var res='',bytes=_b_.bytes.$factory(self)
bytes.source.forEach(function(item){res+=item.toString(16)})
return res}
memoryview.tobytes=function(self){return _b_.bytes.$factory(self.obj)}
memoryview.tolist=function(self){if(self.itemsize==1){return _b_.list.$factory(_b_.bytes.$factory(self.obj))}else if(self.itemsize==4){if(self.format=="I"){var res=[]
for(var i=0;i < self.obj.source.length;i+=4){var item=self.obj.source[i],coef=256
for(var j=1;j < 4;j++){item+=coef*self.obj.source[i+j]
coef*=256}
res.push(item)}
return res}}}
$B.set_func_names(memoryview,"builtins")
function min(){return $extreme(arguments,'__lt__')}
function next(obj){check_no_kw('next',obj)
var missing={},$=$B.args("next",2,{obj:null,def:null},['obj','def'],arguments,{def:missing},null,null)
var klass=obj.__class__ ||$B.get_class(obj),ga=$B.$call($B.$getattr(klass,"__next__"))
if(ga !==undefined){try{return $B.$call(ga)(obj)}catch(err){if(err.__class__===_b_.StopIteration &&
$.def !==missing){return $.def}
throw err}}
throw _b_.TypeError.$factory("'"+$B.class_name(obj)+
"' object is not an iterator")}
var NotImplementedType=$B.make_class("NotImplementedType",function(){return NotImplemented}
)
NotImplementedType.__repr__=NotImplementedType.__str__=function(self){return "NotImplemented"}
$B.set_func_names(NotImplementedType,"builtins")
var NotImplemented={__class__:NotImplementedType}
function $not(obj){return !$B.$bool(obj)}
function oct(obj){check_no_kw('oct',obj)
check_nb_args('oct',1,arguments)
return bin_hex_oct(8,obj)}
function ord(c){check_no_kw('ord',c)
check_nb_args('ord',1,arguments)
if(typeof c.valueOf()=='string'){if(c.length==1){return c.charCodeAt(0)}
if((0xD800 <=c[0]&& c[0]<=0xDBFF)||
(0xDC00 <=c[1]&& c[1]<=0xDFFF)){throw _b_.TypeError.$factory('ord() expected a character, but '+
'string of length '+c.length+' found')}
var code=0x10000
code+=(c.charCodeAt(0)& 0x03FF)<< 10
code+=(c.charCodeAt(1)& 0x03FF)
return code}
switch($B.get_class(c)){case _b_.str:
if(c.length==1){return c.charCodeAt(0)}
throw _b_.TypeError.$factory('ord() expected a character, but '+
'string of length '+c.length+' found')
case _b_.bytes:
case _b_.bytearray:
if(c.source.length==1){return c.source[0]}
throw _b_.TypeError.$factory('ord() expected a character, but '+
'string of length '+c.source.length+' found')
default:
throw _b_.TypeError.$factory('ord() expected a character, but '+
$B.class_name(c)+' was found')}}
function pow(){var $=$B.args('pow',3,{x:null,y:null,mod:null},['x','y','mod'],arguments,{mod:None},null,null),x=$.x,y=$.y,z=$.mod
var klass=x.__class__ ||$B.get_class(x)
if(z===_b_.None){return $B.rich_op('__pow__',x,y)}else{if(x !=_b_.int.$factory(x)||y !=_b_.int.$factory(y)){throw _b_.TypeError.$factory("pow() 3rd argument not allowed "+
"unless all arguments are integers")}
return $B.$call($B.$getattr(klass,'__pow__'))(x,y,z)}}
function $print(){var $ns=$B.args('print',0,{},[],arguments,{},'args','kw')
var ks=$ns['kw'].$string_dict
var end=(ks['end']===undefined ||ks['end']===None)? '\n' :ks['end'][0],sep=(ks['sep']===undefined ||ks['sep']===None)? ' ' :ks['sep'][0],file=ks['file']===undefined ? $B.stdout :ks['file'][0],args=$ns['args'],writer=$B.$getattr(file,'write')
var items=[]
for(var i=0,len=args.length;i < len;i++){var arg=_b_.str.$factory(args[i])
writer(arg)
if(i < len-1){writer(sep)}}
writer(end)
var flush=$B.$getattr(file,'flush',None)
if(flush !==None){$B.$call(flush)()}
return None}
$print.__name__='print'
$print.is_func=true
var property=$B.make_class("property",function(fget,fset,fdel,doc){var res={__class__:property}
property.__init__(res,fget,fset,fdel,doc)
return res}
)
property.__init__=function(self,fget,fset,fdel,doc){var $=$B.args('__init__',5,{self:null,fget:null,fset:null,fdel:null,doc:null},['self','fget','fset','fdel','doc'],arguments,{fget:_b_.None,fset:_b_.None,fdel:_b_.None,doc:_b_.None},null,null),self=$.self,fget=$.fget,fset=$.fset,fdel=$.fdel,doc=$.doc
self.__doc__=doc ||""
self.$type=fget.$type
self.fget=fget
self.fset=fset
self.fdel=fdel
self.$is_property=true
if(fget && fget.$attrs){for(var key in fget.$attrs){self[key]=fget.$attrs[key]}}
self.__delete__=fdel;
self.getter=function(fget){return property.$factory(fget,self.fset,self.fdel,self.__doc__)}
self.setter=function(fset){return property.$factory(self.fget,fset,self.fdel,self.__doc__)}
self.deleter=function(fdel){return property.$factory(self.fget,self.fset,fdel,self.__doc__)}}
property.__get__=function(self,obj){if(self.fget===undefined){throw _b_.AttributeError.$factory("unreadable attribute")}
return $B.$call(self.fget)(obj)}
property.__repr__=function(self){$B.builtins_repr_check(property,arguments)
return _b_.repr(self.fget(self))}
property.__set__=function(self,obj,value){if(self.fset===undefined){throw _b_.AttributeError.$factory("can't set attribute")}
$B.$getattr(self.fset,'__call__')(obj,value)}
$B.set_func_names(property,"builtins")
function quit(){throw _b_.SystemExit}
quit.__repr__=quit.__str__=function(){return "Use quit() or Ctrl-Z plus Return to exit"}
function repr(obj){check_no_kw('repr',obj)
check_nb_args('repr',1,arguments)
var klass=obj.__class__ ||$B.get_class(obj)
return $B.$call($B.$getattr(klass,"__repr__"))(obj)}
var reversed=$B.make_class("reversed",function(seq){
check_no_kw('reversed',seq)
check_nb_args('reversed',1,arguments)
var klass=seq.__class__ ||$B.get_class(seq),rev_method=$B.$getattr(klass,'__reversed__',null)
if(rev_method !==null){return $B.$call(rev_method)(seq)}
try{var method=$B.$getattr(klass,'__getitem__')}catch(err){throw _b_.TypeError.$factory("argument to reversed() must be a sequence")}
var res={__class__:reversed,$counter :_b_.len(seq),getter:function(i){return $B.$call(method)(seq,i)}}
return res}
)
reversed.__iter__=function(self){return self}
reversed.__next__=function(self){self.$counter--
if(self.$counter < 0){throw _b_.StopIteration.$factory('')}
return self.getter(self.$counter)}
$B.set_func_names(reversed,"builtins")
function round(){var $=$B.args('round',2,{number:null,ndigits:null},['number','ndigits'],arguments,{ndigits:None},null,null),arg=$.number,n=$.ndigits===None ? 0 :$.ndigits
if(!isinstance(arg,[_b_.int,_b_.float])){var klass=arg.__class__ ||$B.get_class(arg)
try{return $B.$call($B.$getattr(klass,"__round__")).apply(null,arguments)}catch(err){if(err.__class__===_b_.AttributeError){throw _b_.TypeError.$factory("type "+$B.class_name(arg)+
" doesn't define __round__ method")}else{throw err}}}
if(isinstance(arg,_b_.float)&&
(arg.value===Infinity ||arg.value===-Infinity)){throw _b_.OverflowError.$factory("cannot convert float infinity to integer")}
if(!isinstance(n,_b_.int)){throw _b_.TypeError.$factory(
"'"+$B.class_name(n)+"' object cannot be interpreted as an integer")}
var mult=Math.pow(10,n),x=arg*mult,floor=Math.floor(x),diff=Math.abs(x-floor),res
if(diff==0.5){if(floor % 2){floor+=1}
res=_b_.int.__truediv__(floor,mult)}else{res=_b_.int.__truediv__(Math.round(x),mult)}
if($.ndigits===None){
return res.valueOf()}else if(arg instanceof Number){return new Number(res)}else{return res.valueOf()}}
function setattr(){var $=$B.args('setattr',3,{obj:null,attr:null,value:null},['obj','attr','value'],arguments,{},null,null),obj=$.obj,attr=$.attr,value=$.value
if(!(typeof attr=='string')){throw _b_.TypeError.$factory("setattr(): attribute name must be string")}
return $B.$setattr(obj,attr,value)}
$B.$setattr=function(obj,attr,value){if(obj===undefined){console.log('obj undef',attr,value)}
var $test=false 
if(attr=='__dict__'){
if(! isinstance(value,_b_.dict)){throw _b_.TypeError.$factory("__dict__ must be set to a dictionary, "+
"not a '"+$B.class_name(value)+"'")}
if(obj.$infos){obj.$infos.__dict__=value
return None}
obj.__dict__=value
return None}else if(attr=="__class__"){
function error(msg){throw _b_.TypeError.$factory(msg)}
if(value.__class__){if(value.__module__=="builtins"){error("__class__ assignement only "+
"supported for heap types or ModuleType subclasses")}else if(Array.isArray(value.__bases__)){for(var i=0;i < value.__bases__.length;i++){if(value.__bases__[i]!==_b_.object &&
value.__bases__[i].__module__=="builtins"){error("__class__ assignment: '"+$B.class_name(obj)+
"' object layout differs from '"+
$B.class_name(value)+"'")}}}}
obj.__class__=value
return None}else if(attr=="__doc__" && obj.__class__===_b_.property){obj[attr]=value}
if($test){console.log("set attr",attr,"to",obj)}
if(obj.$factory ||obj.$is_class){var metaclass=obj.__class__
if($test){console.log("obj is class",metaclass,metaclass[attr])}
if(metaclass && metaclass[attr]&& metaclass[attr].__get__ &&
metaclass[attr].__set__){metaclass[attr].__set__(obj,value)
return None}
if(attr=="__module__"){obj.$infos.__module__=value
return _b_.None}
if(obj.$infos && obj.$infos.__module__=="builtins"){throw _b_.TypeError.$factory(
"can't set attributes of built-in/extension type '"+
obj.$infos.__name__+"'")}
obj[attr]=value
if(attr=="__init__" ||attr=="__new__"){
obj.$factory=$B.$instance_creator(obj)}else if(attr=="__bases__"){
obj.__mro__=_b_.type.mro(obj)}
if($test){console.log("after setattr",obj)}
return None}
var res=obj[attr],klass=obj.__class__ ||$B.get_class(obj)
if($test){console.log('set attr',attr,'of obj',obj,'class',klass,"obj[attr]",obj[attr])}
if(res===undefined && klass){res=klass[attr]
if(res===undefined){var mro=klass.__mro__,_len=mro.length
for(var i=0;i < _len;i++){res=mro[i][attr]
if(res !==undefined){break}}}}
if($test){console.log('set attr',attr,'klass',klass,'found in class',res)}
if(res !==undefined && res !==null){
if(res.__set__ !==undefined){res.__set__(res,obj,value);return None}
var rcls=res.__class__,__set1__
if(rcls !==undefined){var __set1__=rcls.__set__
if(__set1__===undefined){var mro=rcls.__mro__
for(var i=0,_len=mro.length;i < _len;i++){__set1__=mro[i].__set__
if(__set1__){break}}}}
if(__set1__ !==undefined){var __set__=$B.$getattr(res,'__set__',null)
if(__set__ &&(typeof __set__=='function')){__set__.apply(res,[obj,value])
return None}}else if(klass && klass.$descriptors !==undefined &&
klass[attr]!==undefined){var setter=klass[attr].setter
if(typeof setter=='function'){setter(obj,value)
return None}else{throw _b_.AttributeError.$factory('readonly attribute')}}}
var _setattr=false
if(klass !==undefined){_setattr=klass.__setattr__
if(_setattr===undefined){var mro=klass.__mro__
for(var i=0,_len=mro.length-1;i < _len;i++){_setattr=mro[i].__setattr__
if(_setattr){break}}}}
var special_attrs=["__module__"]
if(klass && klass.__slots__ && special_attrs.indexOf(attr)==-1 &&
! _setattr){var _slots=true
for(var kl of klass.__mro__){if(kl===_b_.object ||kl===_b_.type){break}
if(! kl.__slots__){
_slots=false
break}}
if(_slots){function mangled_slots(klass){if(klass.__slots__){if(Array.isArray(klass.__slots__)){return klass.__slots__.map(function(item){if(item.startsWith("__")&& ! item.endsWith("_")){return "_"+klass.$infos.__name__+item}else{return item}})}else{return klass.__slots__}}
return[]}
var has_slot=false
if(mangled_slots(klass).indexOf(attr)>-1){has_slot=true}else{for(var i=0;i < klass.__mro__.length;i++){var kl=klass.__mro__[i]
if(mangled_slots(kl).indexOf(attr)>-1){has_slot=true
break}}}
if(! has_slot){throw $B.attr_error(attr,klass)}}}
if($test){console.log("attr",attr,"use _setattr",_setattr)}
if(!_setattr){if(obj.__dict__===undefined){obj[attr]=value}else{_b_.dict.$setitem(obj.__dict__,attr,value)}
if($test){console.log("no setattr, obj",obj)}}else{if($test){console.log('apply _setattr',obj,attr)}
_setattr(obj,attr,value)}
return None}
function sorted(){var $=$B.args('sorted',1,{iterable:null},['iterable'],arguments,{},null,'kw')
var _list=_b_.list.$factory(iter($.iterable)),args=[_list]
for(var i=1;i < arguments.length;i++){args.push(arguments[i])}
_b_.list.sort.apply(null,args)
return _list}
var staticmethod=$B.make_class("staticmethod",function(func){var f={$infos:func.$infos,__get__:function(){return func}}
f.__get__.__class__=$B.method_wrapper
f.__get__.$infos=func.$infos
return f}
)
$B.set_func_names(staticmethod,"builtins")
function sum(iterable,start){var $=$B.args('sum',2,{iterable:null,start:null},['iterable','start'],arguments,{start:0},null,null),iterable=$.iterable,start=$.start
if(_b_.isinstance(start,[_b_.str,_b_.bytes])){throw _b_.TypeError.$factory("sum() can't sum bytes"+
" [use b''.join(seq) instead]")}
var res=start,iterable=iter(iterable)
while(1){try{var _item=next(iterable)
res=$B.add(res,_item)}catch(err){if(err.__class__===_b_.StopIteration){break}else{throw err}}}
return res}
$B.missing_super2=function(obj){obj.$missing=true
return obj}
var $$super=$B.make_class("super",function(_type,object_or_type){var no_object_or_type=object_or_type===undefined
if(_type===undefined && object_or_type===undefined){var frame=$B.last($B.frames_stack),pyframe=$B.imported["_sys"].Getframe()
if(pyframe.f_code && pyframe.f_code.co_varnames){_type=frame[1].__class__
if(_type===undefined){throw _b_.RuntimeError.$factory("super(): no arguments")}
object_or_type=frame[1][pyframe.f_code.co_varnames[0]]}else{throw _b_.RuntimeError.$factory("super(): no arguments")}}
if(! no_object_or_type && Array.isArray(object_or_type)){object_or_type=object_or_type[0]}
return{
__class__:$$super,__thisclass__:_type,__self_class__:object_or_type}}
)
$$super.__get__=function(self,instance,klass){
return $$super.$factory(self.__thisclass__,instance)}
$$super.__getattribute__=function(self,attr){var mro=self.__thisclass__.__mro__,res
if(self.__thisclass__.$is_js_class){if(attr=="__init__"){
return function(){mro[0].$js_func.call(self.__self_class__,...arguments)}}}
var sc=self.__self_class__
if(sc !==undefined){if(!sc.$is_class){sc=sc.__class__ ||$B.get_class(sc)}
var sc_mro=[sc].concat(sc.__mro__)
for(var i=0;i < sc_mro.length;i++){if(sc_mro[i]===self.__thisclass__){mro=sc_mro.slice(i+1)
break}}}
var $test=false 
var f
for(var i=0,len=mro.length;i < len;i++){if(mro[i][attr]!==undefined){f=mro[i][attr]
break}}
if(f===undefined){if($$super[attr]!==undefined){return(function(x){return function(){var args=[x]
for(var i=0,len=arguments.length;i < len;i++){args.push(arguments[i])}
return $$super[attr].apply(null,args)}})(self)}
if($test){console.log("no attr",attr,self,"mro",mro)}
throw $B.attr_error(attr,self)}
if($test){console.log("super",attr,self,"mro",mro,"found in mro[0]",mro[0],f,f+'')}
if(f.$type=="staticmethod" ||attr=="__new__"){return f}else if(typeof f !="function"){return f}else{if(f.__class__===$B.method){
f=f.$infos.__func__}
var callable=$B.$call(f)
var method=function(){var res=callable(self.__self_class__,...arguments)
if($test){console.log("calling super",self.__self_class__,attr,f,"res",res)}
return res}
method.__class__=$B.method
var module
if(f.$infos !==undefined){module=f.$infos.__module__}else if(f.__class__===property){module=f.fget.$infos.__module}else if(f.$is_class){module=f.__module__}
method.$infos={__self__:self.__self_class__,__func__:f,__name__:attr,__module__:module,__qualname__:self.__thisclass__.$infos.__name__+"."+attr}
return method}
throw $B.attr_error(attr,self)}
$$super.__init__=function(cls){if(cls===undefined){throw _b_.TypeError.$factory("descriptor '__init__' of 'super' "+
"object needs an argument")}
if(cls.__class__ !==$$super){throw _b_.TypeError.$factory("descriptor '__init__' requires a"+
" 'super' object but received a '"+$B.class_name(cls)+"'")}}
$$super.__repr__=function(self){$B.builtins_repr_check($$super,arguments)
var res="<super: <class '"+self.__thisclass__.$infos.__name__+"'>"
if(self.__self_class__ !==undefined){res+=', <'+self.__self_class__.__class__.$infos.__name__+' object>'}else{res+=', NULL'}
return res+'>'}
$B.set_func_names($$super,"builtins")
function vars(){var def={},$=$B.args('vars',1,{obj:null},['obj'],arguments,{obj:def},null,null)
if($.obj===def){return _b_.locals()}else{try{return $B.$getattr($.obj,'__dict__')}
catch(err){if(err.__class__===_b_.AttributeError){throw _b_.TypeError.$factory("vars() argument must have __dict__ attribute")}
throw err}}}
var $Reader=$B.make_class("Reader")
$Reader.__enter__=function(self){return self}
$Reader.__exit__=function(self){return false}
$Reader.__iter__=function(self){
return iter($Reader.readlines(self))}
$Reader.__len__=function(self){return self.lines.length}
$Reader.close=function(self){self.closed=true}
$Reader.flush=function(self){return None}
$Reader.read=function(){var $=$B.args("read",2,{self:null,size:null},["self","size"],arguments,{size:-1},null,null),self=$.self,size=$B.$GetInt($.size)
if(self.closed===true){throw _b_.ValueError.$factory('I/O operation on closed file')}
if(size < 0){size=self.$length-self.$counter}
if(self.$binary){res=_b_.bytes.$factory(self.$content.source.slice(self.$counter,self.$counter+size))}else{res=self.$content.substr(self.$counter,size)}
self.$counter+=size
return res}
$Reader.readable=function(self){return true}
function make_lines(self){
if(self.$lines===undefined){if(! self.$binary){self.$lines=self.$content.split("\n")
if($B.last(self.$lines)==''){self.$lines.pop()}
self.$lines=self.$lines.map(x=> x+'\n')}else{var lines=[],pos=0,source=self.$content.source
while(pos < self.$length){var ix=source.indexOf(10,pos)
if(ix==-1){lines.push({__class__:_b_.bytes,source:source.slice(pos)})
break}else{lines.push({__class__:_b_.bytes,source:source.slice(pos,ix+1)})
pos=ix+1}}
self.$lines=lines}}}
$Reader.readline=function(self,size){var $=$B.args("readline",2,{self:null,size:null},["self","size"],arguments,{size:-1},null,null),self=$.self,size=$B.$GetInt($.size)
self.$lc=self.$lc===undefined ?-1 :self.$lc
if(self.closed===true){throw _b_.ValueError.$factory('I/O operation on closed file')}
if(self.$binary){var ix=self.$content.source.indexOf(10,self.$counter)
if(ix==-1){var rest=self.$content.source.slice(self.$counter)
self.$counter=self.$content.source.length
return _b_.bytes.$factory(rest)}else{var res={__class__:_b_.bytes,source :self.$content.source.slice(self.$counter,ix+1)}
self.$counter=ix+1
return res}}else{if(self.$counter==self.$content.length){return ''}
var ix=self.$content.indexOf("\n",self.$counter)
if(ix==-1){var rest=self.$content.substr(self.$counter)
self.$counter=self.$content.length
return rest}else{var res=self.$content.substring(self.$counter,ix+1)
self.$counter=ix+1
self.$lc+=1
return res}}}
$Reader.readlines=function(){var $=$B.args("readlines",2,{self:null,hint:null},["self","hint"],arguments,{hint:-1},null,null),self=$.self,hint=$B.$GetInt($.hint)
var nb_read=0
if(self.closed===true){throw _b_.ValueError.$factory('I/O operation on closed file')}
self.$lc=self.$lc===undefined ?-1 :self.$lc
make_lines(self)
if(hint < 0){var lines=self.$lines.slice(self.$lc+1)}else{var lines=[]
while(self.$lc < self.$lines.length &&
nb_read < hint){self.$lc++
lines.push(self.$lines[self.$lc])}}
return lines}
$Reader.seek=function(self,offset,whence){if(self.closed===True){throw _b_.ValueError.$factory('I/O operation on closed file')}
if(whence===undefined){whence=0}
if(whence===0){self.$counter=offset}else if(whence===1){self.$counter+=offset}else if(whence===2){self.$counter=self.$length+offset}
return None}
$Reader.seekable=function(self){return true}
$Reader.tell=function(self){return self.$counter}
$Reader.writable=function(self){return false}
$B.set_func_names($Reader,"builtins")
var $BufferedReader=$B.make_class('_io.BufferedReader',function(content){return{
__class__:$BufferedReader,$binary:true,$content:content,$read_func:$B.$getattr(content,'read')}}
)
$BufferedReader.__mro__=[$Reader,_b_.object]
$BufferedReader.read=function(self,size){if(self.$read_func===undefined){return $Reader.read(self,size===undefined ?-1 :size)}
return self.$read_func(size ||-1)}
var $TextIOWrapper=$B.make_class('_io.TextIOWrapper',function(){var $=$B.args("TextIOWrapper",6,{buffer:null,encoding:null,errors:null,newline:null,line_buffering:null,write_through:null},["buffer","encoding","errors","newline","line_buffering","write_through"],arguments,{encoding:"utf-8",errors:_b_.None,newline:_b_.None,line_buffering:_b_.False,write_through:_b_.False},null,null)
return{
__class__:$TextIOWrapper,$content:_b_.bytes.decode($.buffer.$content,$.encoding),encoding:$.encoding,errors:$.errors,newline:$.newline}}
)
$TextIOWrapper.__mro__=[$Reader,_b_.object]
$B.set_func_names($TextIOWrapper,"builtins")
$B.Reader=$Reader
$B.TextIOWrapper=$TextIOWrapper
$B.BufferedReader=$BufferedReader
function $url_open(){
var $=$B.args('open',3,{file:null,mode:null,encoding:null},['file','mode','encoding'],arguments,{mode:'r',encoding:'utf-8'},'args','kw'),file=$.file,mode=$.mode,encoding=$.encoding,result={}
if(encoding=='locale'){
encoding='utf-8'}
if(mode.search('w')>-1){throw _b_.IOError.$factory("Browsers cannot write on disk")}else if(['r','rb'].indexOf(mode)==-1){throw _b_.ValueError.$factory("Invalid mode '"+mode+"'")}
if(isinstance(file,_b_.str)){
var is_binary=mode.search('b')>-1
if($B.file_cache.hasOwnProperty($.file)){result.content=$B.file_cache[$.file]
if(is_binary){result.content=_b_.str.encode(result.content,'utf-8')}}else if($B.files && $B.files.hasOwnProperty($.file)){
var $res=atob($B.files[$.file].content)
var source=[]
for(const char of $res){source.push(char.charCodeAt(0))}
result.content=_b_.bytes.$factory(source)
if(!is_binary){
try{result.content=_b_.bytes.decode(result.content,encoding)}catch(error){result.error=error}}}else if($B.protocol !="file"){
var req=new XMLHttpRequest()
req.overrideMimeType('text/plain;charset=x-user-defined')
req.onreadystatechange=function(){if(this.readyState !=4){return}
var status=this.status
if(status==404){result.error=_b_.FileNotFoundError.$factory(file)}else if(status !=200){result.error=_b_.IOError.$factory('Could not open file '+
file+' : status '+status)}else{var bytes=[]
for(var i=0,len=this.response.length;i < len;i++){var cp=this.response.codePointAt(i)
if(cp > 0xf700){cp-=0xf700}
bytes.push(cp)}
result.content=_b_.bytes.$factory(bytes)
if(! is_binary){
try{result.content=_b_.bytes.decode(result.content,encoding)}catch(error){result.error=error}}}}
var fake_qs=$B.$options.cache ? '' :
'?foo='+(new Date().getTime())
req.open('GET',encodeURI(file+fake_qs),false)
req.send()}else{throw _b_.FileNotFoundError.$factory(
"cannot use 'open()' with protocol 'file'")}
if(result.error !==undefined){throw result.error}
var res={$binary:is_binary,$content:result.content,$counter:0,$encoding:encoding,$length:is_binary ? result.content.source.length :
result.content.length,closed:False,mode,name:file}
res.__class__=is_binary ? $BufferedReader :$TextIOWrapper
return res}else{throw _b_.TypeError.$factory("invalid argument for open(): "+
_b_.str.$factory(file))}}
var zip=$B.make_class("zip",function(){var res={__class__:zip,items:[]}
if(arguments.length==0){return res}
var $ns=$B.args('zip',0,{},[],arguments,{},'args','kw')
var _args=$ns['args'],strict=$ns.kw.$string_dict.strict &&
$ns.kw.$string_dict.strict[0]
var args=[],nexts=[],only_lists=true,min_len
for(var i=0;i < _args.length;i++){if(only_lists && Array.isArray(_args[i])){if(strict){if(i==0){var len=_args[i].length}else if(_args[i]!=len){throw _b_.ValueError.$factory(`zip() argument ${i} `+
`is ${_args[i] > len ? 'longer' : 'shorter'} `+
`than argument ${i - 1}`)}}
if(min_len===undefined ||_args[i].length < min_len){min_len=_args[i].length}}else{only_lists=false}
var _next=$B.$call($B.$getattr(iter(_args[i]),"__next__"))
args.push(_next)}
var rank=0,items=[]
if(only_lists){$B.nb_zip_list=$B.nb_zip_list===undefined ?
1 :$B.nb_zip_list+1
for(var i=0;i < min_len;i++){var line=[]
for(var j=0;j < _args.length;j++){line.push(_args[j][i])}
items.push($B.fast_tuple(line))}
res.items=items
return zip_iterator.$factory(items)}
function*iterator(args){while(true){var line=[],flag=true
for(var i=0;i < args.length;i++){try{line.push(args[i]())}catch(err){if(err.__class__==_b_.StopIteration){if(strict){if(i > 0){throw _b_.ValueError.$factory(
`zip() argument ${i + 1} is shorter `+
`than argument ${i}`)}else{for(var j=1;j < args.length;j++){var exhausted=true
try{args[j]()
exhausted=false}catch(err){}
if(! exhausted){throw _b_.ValueError.$factory(
`zip() argument ${j + 1} is longer `+
`than argument ${i + 1}`)}}}}
flag=false
break}else{throw err}}}
if(! flag){return}
yield $B.fast_tuple(line)}}
return $B.generator.$factory(iterator,'zip')(args)}
)
var zip_iterator=$B.make_iterator_class('zip')
zip.__iter__=function(self){return zip_iterator.$factory(self.items)}
$B.set_func_names(zip,"builtins")
function no_set_attr(klass,attr){if(klass[attr]!==undefined){throw _b_.AttributeError.$factory("'"+klass.$infos.__name__+
"' object attribute '"+attr+"' is read-only")}else{throw $B.attr_error(attr,klass)}}
var True=true
var False=false
var ellipsis=$B.make_class("ellipsis",function(){return Ellipsis}
)
ellipsis.__repr__=function(self){return 'Ellipsis'}
var Ellipsis={__class__:ellipsis}
for(var $key in $B.$comps){
switch($B.$comps[$key]){case 'ge':
case 'gt':
case 'le':
case 'lt':
ellipsis['__'+$B.$comps[$key]+'__']=(function(k){return function(other){throw _b_.TypeError.$factory("unorderable types: ellipsis() "+
k+" "+$B.class_name(other))}})($key)}}
for(var $func in Ellipsis){if(typeof Ellipsis[$func]=='function'){Ellipsis[$func].__str__=(function(f){return function(){return "<method-wrapper "+f+
" of Ellipsis object>"}})($func)}}
$B.set_func_names(ellipsis)
var FunctionCode=$B.make_class("function code")
var FunctionGlobals=$B.make_class("function globals")
$B.Function={__class__:_b_.type,__code__:{__class__:FunctionCode,__name__:'function code'},__globals__:{__class__:FunctionGlobals,__name__:'function globals'},__mro__:[_b_.object],$infos:{__name__:'function',__module__:"builtins"},$is_class:true}
$B.Function.__delattr__=function(self,attr){if(attr=="__dict__"){throw _b_.TypeError.$factory("can't deleted function __dict__")}}
$B.Function.__dir__=function(self){var infos=self.$infos ||{},attrs=self.$attrs ||{}
return Object.keys(infos).concat(Object.keys(attrs))}
$B.Function.__eq__=function(self,other){return self===other}
$B.Function.__get__=function(self,obj){if(obj===_b_.None){return self}
var method=function(){return self(obj,...arguments)}
method.__class__=$B.method
if(self.$infos===undefined){console.log("no $infos",self)
console.log($B.last($B.frames_stack))}
method.$infos={__name__:self.$infos.__name__,__qualname__:$B.class_name(obj)+"."+self.$infos.__name__,__self__:obj,__func__:self}
return method}
$B.Function.__getattribute__=function(self,attr){
if(self.$infos && self.$infos[attr]!==undefined){if(attr=='__code__'){var res={__class__:code}
for(var attr in self.$infos.__code__){res[attr]=self.$infos.__code__[attr]}
res.name=self.$infos.__name__
res.filename=self.$infos.__code__.co_filename
res.co_code=self+"" 
return res}else if(attr=='__annotations__'){
return $B.obj_dict(self.$infos[attr])}else if(self.$infos.hasOwnProperty(attr)){return self.$infos[attr]}}else if(self.$infos && self.$infos.__dict__ &&
self.$infos.__dict__.$string_dict[attr]!==undefined){return self.$infos.__dict__.$string_dict[attr][0]}else if(attr=="__closure__"){var free_vars=self.$infos.__code__.co_freevars
if(free_vars.length==0){return None}
var cells=[]
for(var i=0;i < free_vars.length;i++){try{cells.push($B.cell.$factory($B.$check_def_free(free_vars[i])))}catch(err){
cells.push($B.cell.$factory(None))}}
return _b_.tuple.$factory(cells)}else if(attr=="__globals__"){return $B.obj_dict($B.imported[self.$infos.__module__])}else if(self.$attrs && self.$attrs[attr]!==undefined){return self.$attrs[attr]}else{return _b_.object.__getattribute__(self,attr)}}
$B.Function.__repr__=function(self){if(self.$infos===undefined){return '<function '+self.name+'>'}else{return '<function '+self.$infos.__qualname__+'>'}}
$B.Function.__mro__=[_b_.object]
$B.Function.__setattr__=function(self,attr,value){if(attr=="__closure__"){throw _b_.AttributeError.$factory("readonly attribute")}else if(attr=="__defaults__"){
if(value===_b_.None){value=[]}else if(! isinstance(value,_b_.tuple)){throw _b_.TypeError.$factory(
"__defaults__ must be set to a tuple object")}
var set_func=self.$set_defaults
if(set_func===undefined){throw _b_.AttributeError.$factory("cannot set attribute "+attr+
" of "+_b_.str.$factory(self))}
if(self.$infos && self.$infos.__code__){
var argcount=self.$infos.__code__.co_argcount,varnames=self.$infos.__code__.co_varnames,params=varnames.slice(0,argcount),$defaults={}
for(var i=value.length-1;i >=0;i--){var pos=params.length-value.length+i
if(pos < 0){break}
$defaults[params[pos]]=value[i]}}else{throw _b_.AttributeError.$factory("cannot set attribute "+attr+
" of "+_b_.str.$factory(self))}
var klass=self.$infos.$class 
var new_func=set_func($defaults)
new_func.$set_defaults=set_func
if(klass){klass[self.$infos.__name__]=new_func
new_func.$infos.$class=klass
new_func.$infos.__defaults__=value}else{
self.$infos.$defaults=value
self.$infos.__defaults__=value}
return _b_.None}
if(self.$infos[attr]!==undefined){self.$infos[attr]=value}
else{self.$attrs=self.$attrs ||{};self.$attrs[attr]=value}}
$B.Function.$factory=function(){}
$B.set_func_names($B.Function,"builtins")
_b_.__BRYTHON__=__BRYTHON__
$B.builtin_funcs=["__build_class__","abs","aiter","all","anext","any","ascii","bin","breakpoint","callable","chr","compile","delattr","dir","divmod","eval","exec","exit","format","getattr","globals","hasattr","hash","help","hex","id","input","isinstance","issubclass","iter","len","locals","max","min","next","oct","open","ord","pow","print","quit","repr","round","setattr","sorted","sum","vars"
]
var builtin_function=$B.builtin_function=$B.make_class(
"builtin_function_or_method",function(f){f.__class__=builtin_function
return f})
builtin_function.__getattribute__=$B.Function.__getattribute__
builtin_function.__reduce_ex__=builtin_function.__reduce__=function(self){return self.$infos.__name__}
builtin_function.__repr__=builtin_function.__str__=function(self){return '<built-in function '+self.$infos.__name__+'>'}
$B.set_func_names(builtin_function,"builtins")
var method_wrapper=$B.make_class("method_wrapper")
method_wrapper.__repr__=method_wrapper.__str__=function(self){return "<method wrapper '"+self.$infos.__name__+"' of function object>"}
$B.set_func_names(method_wrapper,"builtins")
var wrapper_descriptor=$B.wrapper_descriptor=
$B.make_class("wrapper_descriptor")
wrapper_descriptor.__getattribute__=$B.Function.__getattribute__
wrapper_descriptor.__repr__=wrapper_descriptor.__str__=function(self){return "<slot wrapper '"+self.$infos.__name__+"' of '"+
self.__objclass__.$infos.__name__+"' object>"}
$B.set_func_names(wrapper_descriptor,"builtins")
$B.builtin_classes=["bool","bytearray","bytes","classmethod","complex","dict","enumerate","filter","float","frozenset","int","list","map","memoryview","object","property","range","reversed","set","slice","staticmethod","str","super","tuple","type","zip"
]
var other_builtins=['Ellipsis','False','None','True','__debug__','__import__','copyright','credits','license','NotImplemented'
]
var builtin_names=$B.builtin_funcs.
concat($B.builtin_classes).
concat(other_builtins)
for(var i=0;i < builtin_names.length;i++){var name=builtin_names[i],orig_name=name,name1=name
if(name=='open'){name1='$url_open'}
if(name=='super'){name1='$$super'}
if(name=='eval'){name1='$$eval'}
if(name=='print'){name1='$print'}
try{_b_[name]=eval(name1)
if($B.builtin_funcs.indexOf(orig_name)>-1){_b_[name].__class__=builtin_function
_b_[name].$infos={__module__:'builtins',__name__:orig_name,__qualname__:orig_name}}}
catch(err){}}
_b_['open']=$url_open
_b_['print']=$print
_b_['super']=$$super
_b_.object.__init__.__class__=wrapper_descriptor
_b_.object.__new__.__class__=builtin_function})(__BRYTHON__)
;
;(function($B){var _b_=$B.builtins
$B.del_exc=function(){var frame=$B.last($B.frames_stack)
frame[1].$current_exception=undefined}
$B.set_exc=function(exc){var frame=$B.last($B.frames_stack)
if(frame===undefined){var msg='Internal error: no frame for exception '+_b_.repr(exc)
console.error(['Traceback (most recent call last):',$B.print_stack(exc.$stack),msg].join('\n'))
if($B.debug > 1){console.log(exc.args)
console.log(exc.stack)}
throw Error(msg)}else{frame[1].$current_exception=$B.exception(exc)}}
$B.get_exc=function(){var frame=$B.last($B.frames_stack)
return frame[1].$current_exception}
$B.$raise=function(arg,cause){
var active_exc=$B.get_exc()
if(arg===undefined){if(active_exc !==undefined){throw active_exc}
throw _b_.RuntimeError.$factory("No active exception to reraise")}else if(_b_.isinstance(arg,BaseException)){if(arg.__class__===_b_.StopIteration &&
$B.last($B.frames_stack)[1].$is_generator){
arg=_b_.RuntimeError.$factory("generator raised StopIteration")}
arg.__context__=active_exc===undefined ? _b_.None :active_exc
arg.__cause__=cause ||_b_.None
arg.__suppress_context__=cause !==undefined
throw arg}else if(arg.$is_class && _b_.issubclass(arg,BaseException)){if(arg===_b_.StopIteration){if($B.last($B.frames_stack)[1].$is_generator){
throw _b_.RuntimeError.$factory("generator raised StopIteration")}}
var exc=$B.$call(arg)()
exc.__context__=active_exc===undefined ? _b_.None :active_exc
exc.__cause__=cause ||_b_.None
exc.__suppress_context__=cause !==undefined
throw exc}else{throw _b_.TypeError.$factory("exceptions must derive from BaseException")}}
$B.print_stack=function(stack){
stack=stack ||$B.frames_stack
var trace=[]
for(var frame of stack){var lineno=frame[1].$lineno,filename=frame[3].__file__
if(lineno !==undefined){var local=frame[0]==frame[2]? "<module>" :frame[0]
trace.push(`  File "${filename}" line ${lineno}, in ${local}`)
var src=$B.file_cache[filename]
if(src){var lines=src.split("\n"),line=lines[lineno-1]
trace.push("    "+line.trim())}}}
return trace.join("\n")}
var traceback=$B.traceback=$B.make_class("traceback",function(exc,stack){var frame=$B.last($B.frames_stack)
if(stack===undefined){stack=exc.$stack}
return{
__class__ :traceback,$stack:stack,exc:exc}}
)
traceback.__getattribute__=function(self,attr){switch(attr){case "tb_frame":
return frame.$factory(self.$stack)
case "tb_lineno":
return self.$stack[0][1].$lineno
case "tb_lasti":
throw _b_.NotImplementedError.$factory(attr)
case "tb_next":
if(self.$stack.length <=1){return _b_.None}else{return traceback.$factory(self.exc,self.$stack.slice(1))}
default:
return _b_.object.__getattribute__(self,attr)}}
$B.set_func_names(traceback,"builtins")
var frame=$B.make_class("frame",function(stack,pos){var fs=stack
var res={__class__:frame,f_builtins :{},
$stack:stack.slice()}
if(pos===undefined){pos=0}
res.$pos=pos
if(fs.length){var _frame=fs[pos],locals_id=_frame[0],filename
try{res.f_locals=$B.obj_dict(_frame[1])}catch(err){console.log("err "+err)
throw err}
res.f_globals=$B.obj_dict(_frame[3])
if(_frame[3].__file__ !==undefined){filename=_frame[3].__file__}
if(locals_id.startsWith("$exec")){filename="<string>"}
res.f_lineno=_frame[1].$lineno ||-1
var co_name=locals_id.startsWith("$exec")? "<module>" :
locals_id
if(locals_id==_frame[2]){co_name="<module>"}else if(locals_id.startsWith("lc"+$B.lambda_magic)){co_name="<listcomp>"}else{if(_frame[1].$name){co_name=_frame[1].$name}else if(_frame[1].$comprehension){co_name='<'+_frame[1].$comprehension+'>'}else if(_frame[1].$list_comp){co_name='<listcomp>'}else if(_frame.length > 4){if(_frame[4].$infos){co_name=_frame[4].$infos.__name__}else{co_name=_frame[4].name}
if(_frame[4].$infos===undefined){
if(_frame[4].name.startsWith("__ge")){co_name="<genexpr>"}else if(_frame[4].name.startsWith("set_comp"+
$B.lambda_magic)){co_name="<setcomp>"}else if(_frame[4].name.startsWith("lambda"+
$B.lambda_magic)){co_name="<lambda>"}}else if(filename===undefined && _frame[4].$infos.__code__){filename=_frame[4].$infos.__code__.co_filename
if(filename===undefined){filename=_frame[4].$infos.__module__}
res.f_lineno=_frame[4].$infos.__code__.co_firstlineno}}}
if(_frame.length > 4 && _frame[4].$infos !==undefined){res.f_code=_frame[4].$infos.__code__}else{res.f_code={co_name:co_name,co_filename:filename}
if(_frame[1].$comp_code){$B.update_obj(res.f_code,_frame[1].$comp_code)}}
res.f_code.__class__=$B.code
res.f_code.co_code=_b_.None
if(filename===undefined){res.f_code.co_filename="<string>"}}
return res}
)
frame.__delattr__=function(self,attr){if(attr=="f_trace"){$B.last(self.$stack)[1].$f_trace=_b_.None}}
frame.__getattr__=function(self,attr){
if(attr=="f_back"){if(self.$pos > 0){return frame.$factory(self.$stack.slice(0,self.$stack.length-1),self.$pos-1)}else{return _b_.None}}else if(attr=="clear"){return function(){}}else if(attr=="f_trace"){var locals=$B.last(self.$stack)[1]
if(locals.$f_trace===undefined){return _b_.None}
return locals.$f_trace}}
frame.__setattr__=function(self,attr,value){if(attr=="f_trace"){
$B.last(self.$stack)[1].$f_trace=value}}
frame.__str__=frame.__repr__=function(self){return '<frame object, file '+self.f_code.co_filename+
', line '+self.f_lineno+', code '+self.f_code.co_name+'>'}
$B.set_func_names(frame,"builtins")
$B._frame=frame 
var BaseException=_b_.BaseException={__class__:_b_.type,__bases__ :[_b_.object],__mro__:[_b_.object],args:[],$infos:{__name__:"BaseException",__module__:"builtins"},$is_class:true}
BaseException.__init__=function(self){var args=arguments[1]===undefined ?[]:[arguments[1]]
self.args=_b_.tuple.$factory(args)}
BaseException.__repr__=function(self){var res=self.__class__.$infos.__name__+'('
if(self.args[0]!==undefined){res+=_b_.repr(self.args[0])}
if(self.args.length > 1){res+=', '+_b_.repr($B.fast_tuple(self.args.slice(1)))}
return res+')'}
BaseException.__str__=function(self){if(self.args.length > 0 && self.args[0]!==_b_.None){return _b_.str.$factory(self.args[0])}
return ''}
BaseException.__new__=function(cls){var err=_b_.BaseException.$factory()
err.__class__=cls
err.__dict__=$B.empty_dict()
return err}
BaseException.__getattr__=function(self,attr){if(attr=="__traceback__"){
if(self.$traceback !==undefined){return self.$traceback}
return traceback.$factory(self)}else if(attr=='__context__'){var frame=$B.last($B.frames_stack),ctx=frame[1].$current_exception
return ctx ||_b_.None}else{throw $B.attr_error(attr,self)}}
BaseException.with_traceback=function(self,tb){self.$traceback=tb
return self}
$B.deep_copy=function(stack){var res=[]
for(const s of stack){var item=[s[0],{},s[2],{}]
if(s[4]!==undefined){item.push(s[4])}
for(const i of[1,3]){for(var key in s[i]){item[i][key]=s[i][key]}}
res.push(item)}
return res}
$B.save_stack=function(){return $B.deep_copy($B.frames_stack)}
$B.restore_stack=function(stack,locals){$B.frames_stack=stack
$B.frames_stack[$B.frames_stack.length-1][1]=locals}
$B.freeze=function(err){
function get_line_info(frame){return `${frame[1].$lineno},${frame[2]}`}
if(err.$stack===undefined){err.$line_infos=[]
for(var frame of $B.frames_stack){err.$line_infos.push(get_line_info(frame))}
err.$stack=$B.frames_stack.slice()
if($B.frames_stack.length){err.$line_info=get_line_info($B.last($B.frames_stack))}}}
var show_stack=$B.show_stack=function(stack){stack=stack ||$B.frames_stack
for(const frame of stack){console.log(frame[0],frame[1].$line_info)}}
var be_factory=`
function (){
    var err = Error()
    err.args = $B.fast_tuple(Array.prototype.slice.call(arguments))
    err.__class__ = _b_.BaseException
    err.$py_error = true
    $B.freeze(err)
    // placeholder
    err.__cause__ = _b_.None // XXX fix me
    err.__context__ = _b_.None // XXX fix me
    err.__suppress_context__ = false // XXX fix me
    return err}`
eval('BaseException.$factory = '+be_factory)
BaseException.$factory.$infos={__name__:"BaseException",__qualname__:"BaseException"}
$B.set_func_names(BaseException)
_b_.BaseException=BaseException
$B.exception=function(js_exc,in_ctx_manager){
if(! js_exc.__class__){var exc=Error()
exc.__name__="Internal Javascript error: "+
(js_exc.__name__ ||js_exc.name)
exc.__class__=_b_.Exception
exc.$js_exc=js_exc
if($B.is_recursion_error(js_exc)){return _b_.RecursionError.$factory("too much recursion")}else if(js_exc.name=="ReferenceError"){exc.__name__="NameError"
exc.__class__=_b_.NameError}else if(js_exc.name=="InternalError"){exc.__name__="RuntimeError"
exc.__class__=_b_.RuntimeError}
exc.__cause__=_b_.None
exc.__context__=_b_.None
exc.__suppress_context__=false
var $message="<Javascript "+js_exc.name+">: "+
(js_exc.message ||"<"+js_exc+">")
exc.args=_b_.tuple.$factory([$message])
exc.$py_error=true
console.log('js error',exc.args)
console.log(js_exc.stack)
console.log('frames_stack',$B.frames_stack.slice())
for(var frame of $B.frames_stack){var src=undefined
var file=frame[1].__file__ ||frame[3].__file__
if(file && $B.file_cache[file]){src=$B.file_cache[file]}
console.log('line',frame[1].$lineno,'file',file,'in',frame[0])
if(src !==undefined){var lines=src.split('\n'),line=lines[frame[1].$lineno-1]
console.log('    '+line)}}
$B.freeze(exc)}else{var exc=js_exc
$B.freeze(exc)
if(in_ctx_manager){
var current_locals=$B.last($B.frames_stack)[0]
for(var i=0,len=exc.$stack.length;i < len;i++){if(exc.$stack[i][0]==current_locals){exc.$stack=exc.$stack.slice(i)
exc.$traceback=traceback.$factory(exc)
break}}}}
return exc}
$B.is_exc=function(exc,exc_list){
if(exc.__class__===undefined){exc=$B.exception(exc)}
var this_exc_class=exc.$is_class ? exc :exc.__class__
for(var i=0;i < exc_list.length;i++){var exc_class=exc_list[i]
if(this_exc_class===undefined){console.log("exc class undefined",exc)}
if(_b_.issubclass(this_exc_class,exc_class)){return true}}
return false}
$B.is_recursion_error=function(js_exc){
var msg=js_exc+"",parts=msg.split(":"),err_type=parts[0].trim(),err_msg=parts[1].trim()
return(err_type=='InternalError' && err_msg=='too much recursion')||
(err_type=='Error' && err_msg=='Out of stack space')||
(err_type=='RangeError' && err_msg=='Maximum call stack size exceeded')}
var $make_exc=$B.$make_exc=function(names,parent){
if(parent===undefined){console.log('pas de parent',names)}
var _str=[],pos=0
for(var i=0;i < names.length;i++){var name=names[i],code=""
if(Array.isArray(name)){
var code=name[1],name=name[0]}
$B.builtins_scope[name]=true
var $exc=(be_factory).replace(/BaseException/g,name)
$exc=$exc.replace("// placeholder",code)
_str[pos++]="_b_."+name+' = {__class__:_b_.type, '+
'__bases__: [_b_.'+parent.$infos.__name__+'], '+
'__mro__: [_b_.'+parent.$infos.__name__+
"].concat(parent.__mro__), $is_class: true,"+
"$infos: {__name__:'"+name+"'}}"
_str[pos++]="_b_."+name+".$factory = "+$exc
_str[pos++]="_b_."+name+'.$factory.$infos = {__name__: "'+
name+'", __qualname__: "'+name+'"}'
_str[pos++]="$B.set_func_names(_b_."+name+", 'builtins')"}
try{eval(_str.join(";"))}catch(err){console.log("--err"+err)
throw err}}
$make_exc(["SystemExit","KeyboardInterrupt","GeneratorExit","Exception"],BaseException)
$make_exc([["StopIteration","err.value = arguments[0] || _b_.None"],["StopAsyncIteration","err.value = arguments[0]"],"ArithmeticError","AssertionError","BufferError","EOFError",["ImportError","err.name = arguments[0]"],"LookupError","MemoryError","OSError","ReferenceError","RuntimeError",["SyntaxError","err.msg = arguments[0]"],"SystemError","TypeError","ValueError","Warning"],_b_.Exception)
$make_exc(["FloatingPointError","OverflowError","ZeroDivisionError"],_b_.ArithmeticError)
$make_exc([["ModuleNotFoundError","err.name = arguments[0]"]],_b_.ImportError)
$make_exc(["IndexError","KeyError"],_b_.LookupError)
$make_exc(["BlockingIOError","ChildProcessError","ConnectionError","FileExistsError","FileNotFoundError","InterruptedError","IsADirectoryError","NotADirectoryError","PermissionError","ProcessLookupError","TimeoutError"],_b_.OSError)
$make_exc(["BrokenPipeError","ConnectionAbortedError","ConnectionRefusedError","ConnectionResetError"],_b_.ConnectionError)
$make_exc(["NotImplementedError","RecursionError"],_b_.RuntimeError)
$make_exc([["IndentationError","err.msg = arguments[0]"]],_b_.SyntaxError)
$make_exc(["TabError"],_b_.IndentationError)
$make_exc(["UnicodeError"],_b_.ValueError)
$make_exc(["UnicodeDecodeError","UnicodeEncodeError","UnicodeTranslateError"],_b_.UnicodeError)
$make_exc(["DeprecationWarning","PendingDeprecationWarning","RuntimeWarning","SyntaxWarning","UserWarning","FutureWarning","ImportWarning","UnicodeWarning","BytesWarning","ResourceWarning","EncodingWarning"],_b_.Warning)
$make_exc(["EnvironmentError","IOError","VMSError","WindowsError"],_b_.OSError)
var js='\nvar $ = $B.args("AttributeError", 1, {"msg": null, "name":null, "obj":null}, '+
'["msg", "name", "obj"], arguments, '+
'{msg: _b_.None, name: _b_.None, obj: _b_.None}, "*", null);\n'+
'err.args = $B.fast_tuple($.msg === _b_.None ? [] : [$.msg])\n;'+
'err.name = $.name\nerr.obj = $.obj\n'
$make_exc([["AttributeError",js]],_b_.Exception)
_b_.AttributeError.__str__=function(self){var msg=self.args[0]
var suggestion=offer_suggestions_for_attribute_error(self)
if(suggestion){msg+=`. Did you mean: '${suggestion}'?`}
return msg}
$B.set_func_names(_b_.AttributeError,'builtins')
$B.attr_error=function(name,obj){if(obj.$is_class){var msg=`type object '${obj.$infos.__name__}'`}else{var msg=`'${$B.class_name(obj)}' object`}
msg+=` has no attribute '${name}'`
return _b_.AttributeError.$factory({$nat:"kw",kw:{name,obj,msg}})}
var js='\nvar $ = $B.args("NameError", 1, {"name":null}, '+
'["name"], arguments, '+
'{name: _b_.None}, "*", null);\n'+
'err.args = $B.fast_tuple($.name === _b_.None ? [] : [$.name])\n;'+
'err.name = $.name\n'
$make_exc([["NameError",js]],_b_.Exception)
_b_.NameError.__str__=function(self){var msg=`name '${self.name}' is not defined`,suggestion=offer_suggestions_for_name_error(self)
if(suggestion){msg+=`. Did you mean: '${suggestion}'?`}
return msg}
$B.set_func_names(_b_.NameError,'builtins')
$make_exc(["UnboundLocalError"],_b_.NameError)
_b_.UnboundLocalError.__str__=function(self){return self.args[0]}
$B.set_func_names(_b_.UnboundLocalError,'builtins')
$B.name_error=function(name,obj){return _b_.NameError.$factory({$nat:"kw",kw:{name}})}
$B.$TypeError=function(msg){throw _b_.TypeError.$factory(msg)}
var MAX_CANDIDATE_ITEMS=750,MAX_STRING_SIZE=40,MOVE_COST=2,CASE_COST=1,SIZE_MAX=65535
function LEAST_FIVE_BITS(n){return((n)& 31)}
function levenshtein_distance(a,b,max_cost){
if(a==b){return 0}
if(a.length < b.length){[a,b]=[b,a]}
while(a.length && a[0]==b[0]){a=a.substr(1)
b=b.substr(1)}
while(a.length && a[a.length-1]==b[b.length-1]){a=a.substr(0,a.length-1)
b=b.substr(0,b.length-1)}
if(b.length==0){return a.length*MOVE_COST}
if((b.length-a.length)*MOVE_COST > max_cost){return max_cost+1}
var buffer=[]
for(var i=0;i < a.length;i++){
buffer[i]=(i+1)*MOVE_COST}
var result=0
for(var b_index=0;b_index < b.length;b_index++){var code=b[b_index]
var distance=result=b_index*MOVE_COST;
var minimum=SIZE_MAX;
for(var index=0;index < a.length;index++){
var substitute=distance+substitution_cost(code,a[index])
distance=buffer[index]
var insert_delete=Math.min(result,distance)+MOVE_COST
result=Math.min(insert_delete,substitute)
buffer[index]=result
if(result < minimum){minimum=result}}
if(minimum > max_cost){
return max_cost+1}}
return result}
function substitution_cost(a,b){if(LEAST_FIVE_BITS(a)!=LEAST_FIVE_BITS(b)){
return MOVE_COST}
if(a==b){return 0}
if(a.toLowerCase()==b.toLowerCase()){return CASE_COST}
return MOVE_COST}
function calculate_suggestions(dir,name){if(dir.length >=MAX_CANDIDATE_ITEMS){return null}
var suggestion_distance=2**52,suggestion=null
for(var item of dir){
var max_distance=(name.length+item.length+3)*MOVE_COST/6
max_distance=Math.min(max_distance,suggestion_distance-1)
var current_distance=
levenshtein_distance(name,item,max_distance)
if(current_distance > max_distance){continue}
if(!suggestion ||current_distance < suggestion_distance){suggestion=item
suggestion_distance=current_distance}}
return suggestion}
function offer_suggestions_for_attribute_error(exc){var name=exc.name,obj=exc.obj
var dir=_b_.dir(obj),suggestions=calculate_suggestions(dir,name)
return suggestions}
function offer_suggestions_for_name_error(exc){var name=exc.name,frame=$B.last(exc.$stack)
var locals=Object.keys(frame[1]).filter(x=> !(x.startsWith('$')))
var suggestion=calculate_suggestions(locals,name)
if(suggestion){return suggestion}
if(frame[2]!=frame[0]){var globals=Object.keys(frame[3]).filter(x=> !(x.startsWith('$')))
var suggestion=calculate_suggestions(globals,name)
if(suggestion){return suggestion}}}
function trace_from_stack(stack){var trace=''
for(var frame of stack){var lineno=frame[1].$lineno,filename=frame[3].__file__,src=$B.file_cache[filename]
trace+=`  File ${frame[3].__file__}, line ${lineno}, in `
if(frame[0]==frame[2]){trace+='<module>'}else{trace+=frame[0]}
trace+='\n'
if(src){var lines=src.split('\n'),line=lines[lineno-1]
if(line){trace+='    '+line.trim()+'\n'}}}
return trace}
$B.show_error=function(err){if($B.debug > 1){console.log("handle error",err.__class__,err.args)
console.log('stack',err.$stack)
console.log(err.stack)}
var trace=''
if(err.$stack && err.$stack.length > 0){trace='Traceback (most recent call last):\n'}
if(err.__class__===_b_.SyntaxError ||
err.__class__===_b_.IndentationError){trace+=trace_from_stack(err.$stack)
var filename=err.filename,line=err.text,indent=line.length-line.trimLeft().length
trace+=`  File ${filename}, line ${err.args[1][1]}\n`+
`    ${line.trim()}\n`
if(err.__class__ !==_b_.IndentationError &&
filename !=='<string>'){
var start=err.offset-indent,marks='    '+' '.repeat(start),nb_marks=1
if(err.end_lineno){if(err.end_lineno > err.lineno){nb_marks=line.length-start-indent}else{nb_marks=err.end_offset-start-indent}}
marks+='^'.repeat(nb_marks)+'\n'
trace+=marks}
trace+=`${err.__class__.$infos.__name__}: ${err.args[0]}`}else if(err.__class__ !==undefined){var name=$B.class_name(err)
trace+=trace_from_stack(err.$stack)
trace+=name+': '+_b_.str.$factory(err)}else{console.log(err)
trace=err+""}
try{$B.$getattr($B.stderr,'write')(trace)
var flush=$B.$getattr($B.stderr,'flush',_b_.None)
if(flush !==_b_.None){flush()}}catch(print_exc_err){console.debug(trace)}}
$B.handle_error=function(err){
if(err.$handled){return}
err.$handled=true
$B.show_error(err)
throw err}})(__BRYTHON__)
;

;(function($B){var _b_=$B.builtins,None=_b_.None,range={__class__:_b_.type,__mro__:[_b_.object],$infos:{__module__:"builtins",__name__:"range"},$is_class:true,$native:true,$match_sequence_pattern:true,
$descriptors:{start:true,step:true,stop:true}}
range.__contains__=function(self,other){if(range.__len__(self)==0){return false}
try{other=$B.int_or_bool(other)}
catch(err){
try{range.index(self,other);return true}
catch(err){return false}}
var sub=$B.sub(other,self.start),fl=$B.floordiv(sub,self.step),res=$B.mul(self.step,fl)
if($B.eq(res,sub)){if($B.gt(self.stop,self.start)){return $B.ge(other,self.start)&& $B.gt(self.stop,other)}else{return $B.ge(self.start,other)&& $B.gt(other,self.stop)}}else{return false}}
range.__delattr__=function(self,attr,value){throw _b_.AttributeError.$factory("readonly attribute")}
range.__eq__=function(self,other){if(_b_.isinstance(other,range)){var len=range.__len__(self)
if(! $B.eq(len,range.__len__(other))){return false}
if(len==0){return true}
if(! $B.eq(self.start,other.start)){return false}
if(len==1){return true}
return $B.eq(self.step,other.step)}
return false}
function compute_item(r,i){var len=range.__len__(r)
if(len==0){return r.start}
else if(i > len){return r.stop}
return $B.add(r.start,$B.mul(r.step,i))}
range.__getitem__=function(self,rank){if(_b_.isinstance(rank,_b_.slice)){var norm=_b_.slice.$conv_for_seq(rank,range.__len__(self)),substep=$B.mul(self.step,norm.step),substart=compute_item(self,norm.start),substop=compute_item(self,norm.stop)
return range.$factory(substart,substop,substep)}
if(typeof rank !="number"){rank=$B.$GetInt(rank)}
if($B.gt(0,rank)){rank=$B.add(rank,range.__len__(self))}
var res=$B.add(self.start,$B.mul(rank,self.step))
if(($B.gt(self.step,0)&&
($B.ge(res,self.stop)||$B.gt(self.start,res)))||
($B.gt(0,self.step)&&
($B.ge(self.stop,res)||$B.gt(res,self.start)))){throw _b_.IndexError.$factory("range object index out of range")}
return res}
range.__hash__=function(self){var len=range.__len__(self)
if(len==0){return _b_.hash(_b_.tuple.$factory([0,None,None]))}
if(len==1){return _b_.hash(_b_.tuple.$factory([1,self.start,None]))}
return _b_.hash(_b_.tuple.$factory([len,self.start,self.step]))}
var RangeIterator={__class__:_b_.type,__mro__:[_b_.object],__iter__:function(self){return self},__next__:function(self){return _b_.next(self.obj)},$infos:{__name__:"range_iterator",__module__:"builtins"},$is_class:true}
RangeIterator.$factory=function(obj){return{__class__:RangeIterator,obj:obj}}
$B.set_func_names(RangeIterator,"builtins")
range.__iter__=function(self){var res={__class__ :range,start:self.start,stop:self.stop,step:self.step}
if(self.$safe){res.$counter=self.start-self.step}else{res.$counter=$B.sub(self.start,self.step)}
return RangeIterator.$factory(res)}
range.__len__=function(self){var len
if($B.gt(self.step,0)){if($B.ge(self.start,self.stop)){return 0}
var n=$B.sub(self.stop,$B.add(1,self.start)),q=$B.floordiv(n,self.step)
len=$B.add(1,q)}else{if($B.ge(self.stop,self.start)){return 0}
var n=$B.sub(self.start,$B.add(1,self.stop)),q=$B.floordiv(n,$B.mul(-1,self.step))
len=$B.add(1,q)}
if($B.maxsize===undefined){$B.maxsize=$B.long_int.__pow__($B.long_int.$factory(2),63)
$B.maxsize=$B.long_int.__sub__($B.maxsize,1)}
return len}
range.__next__=function(self){if(self.$safe){self.$counter+=self.step
if((self.step > 0 && self.$counter >=self.stop)
||(self.step < 0 && self.$counter <=self.stop)){throw _b_.StopIteration.$factory("")}}else{self.$counter=$B.add(self.$counter,self.step)
if(($B.gt(self.step,0)&& $B.ge(self.$counter,self.stop))
||($B.gt(0,self.step)&& $B.ge(self.stop,self.$counter))){throw _b_.StopIteration.$factory("")}}
return self.$counter}
range.__reversed__=function(self){var n=$B.sub(range.__len__(self),1)
return range.$factory($B.add(self.start,$B.mul(n,self.step)),$B.sub(self.start,self.step),$B.mul(-1,self.step))}
range.__repr__=function(self){$B.builtins_repr_check(range,arguments)
var res="range("+_b_.str.$factory(self.start)+", "+
_b_.str.$factory(self.stop)
if(self.step !=1){res+=", "+_b_.str.$factory(self.step)}
return res+")"}
range.__setattr__=function(self,attr,value){throw _b_.AttributeError.$factory("readonly attribute")}
range.start=function(self){return self.start}
range.step=function(self){return self.step},range.stop=function(self){return self.stop}
range.count=function(self,ob){if(_b_.isinstance(ob,[_b_.int,_b_.float,_b_.bool])){return _b_.int.$factory(range.__contains__(self,ob))}else{var comp=function(other){return $B.rich_comp("__eq__",ob,other)},it=range.__iter__(self),_next=RangeIterator.__next__,nb=0
while(true){try{if(comp(_next(it))){nb++}}catch(err){if(_b_.isinstance(err,_b_.StopIteration)){return nb}
throw err}}}}
range.index=function(self,other){var $=$B.args("index",2,{self:null,other:null},["self","other"],arguments,{},null,null),self=$.self,other=$.other
try{other=$B.int_or_bool(other)}catch(err){var comp=function(x){return $B.rich_comp("__eq__",other,x)},it=range.__iter__(self),_next=RangeIterator.__next__,nb=0
while(true){try{if(comp(_next(it))){return nb}
nb++}catch(err){if(_b_.isinstance(err,_b_.StopIteration)){throw _b_.ValueError.$factory(_b_.str.$factory(other)+
" not in range")}
throw err}}}
var sub=$B.sub(other,self.start),fl=$B.floordiv(sub,self.step),res=$B.mul(self.step,fl)
if($B.eq(res,sub)){if(($B.gt(self.stop,self.start)&& $B.ge(other,self.start)
&& $B.gt(self.stop,other))||
($B.ge(self.start,self.stop)&& $B.ge(self.start,other)
&& $B.gt(other,self.stop))){return fl}else{throw _b_.ValueError.$factory(_b_.str.$factory(other)+
' not in range')}}else{throw _b_.ValueError.$factory(_b_.str.$factory(other)+
" not in range")}}
range.$factory=function(){var $=$B.args("range",3,{start:null,stop:null,step:null},["start","stop","step"],arguments,{start:null,stop:null,step:null},null,null),start=$.start,stop=$.stop,step=$.step,safe
if(stop===null && step===null){if(start==null){throw _b_.TypeError.$factory("range expected 1 arguments, got 0")}
stop=$B.PyNumber_Index(start)
safe=typeof stop==="number"
return{__class__:range,start:0,stop:stop,step:1,$is_range:true,$safe:safe}}
if(step===null){step=1}
start=$B.PyNumber_Index(start)
stop=$B.PyNumber_Index(stop)
step=$B.PyNumber_Index(step)
if(step==0){throw _b_.ValueError.$factory("range arg 3 must not be zero")}
safe=(typeof start=="number" && typeof stop=="number" &&
typeof step=="number")
return{__class__:range,start:start,stop:stop,step:step,$is_range:true,$safe:safe}}
$B.set_func_names(range,"builtins")
var slice={__class__:_b_.type,__mro__:[_b_.object],$infos:{__module__:"builtins",__name__:"slice"},$is_class:true,$native:true,$descriptors:{start:true,step:true,stop:true}}
slice.__eq__=function(self,other){var conv1=conv_slice(self),conv2=conv_slice(other)
return conv1[0]==conv2[0]&&
conv1[1]==conv2[1]&&
conv1[2]==conv2[2]}
slice.__repr__=function(self){$B.builtins_repr_check(slice,arguments)
return "slice("+_b_.str.$factory(self.start)+", "+
_b_.str.$factory(self.stop)+", "+_b_.str.$factory(self.step)+")"}
slice.__setattr__=function(self,attr,value){throw _b_.AttributeError.$factory("readonly attribute")}
function conv_slice(self){var attrs=["start","stop","step"],res=[]
for(var i=0;i < attrs.length;i++){var val=self[attrs[i]]
if(val===_b_.None){res.push(val)}else{try{res.push($B.PyNumber_Index(val))}catch(err){throw _b_.TypeError.$factory("slice indices must be "+
"integers or None or have an __index__ method")}}}
return res}
slice.$conv_for_seq=function(self,len){
var step=self.step===None ? 1 :$B.PyNumber_Index(self.step),step_is_neg=$B.gt(0,step),len_1=$B.sub(len,1)
if(step==0){throw _b_.ValueError.$factory('slice step cannot be zero')}
var start
if(self.start===None){start=step_is_neg ? len_1 :0}else{start=$B.PyNumber_Index(self.start)
if($B.gt(0,start)){start=$B.add(start,len)
if($B.gt(0,start)){start=0}}
if($B.ge(start,len)){start=step < 0 ? len_1 :len}}
if(self.stop===None){stop=step_is_neg ?-1 :len}else{stop=$B.PyNumber_Index(self.stop)
if($B.gt(0,stop)){stop=$B.add(stop,len)}
if($B.ge(stop,len)){stop=step_is_neg ? len_1 :len}}
return{start:start,stop:stop,step:step}}
slice.start=function(self){return self.start}
slice.step=function(self){return self.step}
slice.stop=function(self){return self.stop}
slice.indices=function(self,length){
var $=$B.args("indices",2,{self:null,length:null},["self","length"],arguments,{},null,null)
var len=$B.$GetInt($.length)
if(len < 0){_b_.ValueError.$factory("length should not be negative")}
var _step=(self.step==_b_.None)? 1 :self.step
if(_step < 0){var _start=self.start,_stop=self.stop
_start=(_start==_b_.None)? len-1 :
(_start < 0)? _b_.max(-1,_start+len):_b_.min(len-1,self.start)
_stop=(self.stop==_b_.None)?-1 :
(_stop < 0)? _b_.max(-1,_stop+len):_b_.min(len-1,self.stop)}else{var _start=(self.start==_b_.None)? 0 :_b_.min(len,self.start)
var _stop=(self.stop==_b_.None)? len :_b_.min(len,self.stop)
if(_start < 0){_start=_b_.max(0,_start+len)}
if(_stop < 0){_stop=_b_.max(0,_stop+len)}}
return _b_.tuple.$factory([_start,_stop,_step])}
slice.$factory=function(){var $=$B.args("slice",3,{start:null,stop:null,step:null},["start","stop","step"],arguments,{stop:null,step:null},null,null),start,stop,step
if($.stop===null && $.step===null){start=_b_.None
stop=$.start
step=_b_.None}else{start=$.start
stop=$.stop
step=$.step===null ? _b_.None :$.step}
var res={__class__ :slice,start:start,stop:stop,step:step}
conv_slice(res)
return res}
$B.set_func_names(slice,"builtins")
_b_.range=range
_b_.slice=slice})(__BRYTHON__)
;
;(function($B){var _b_=$B.builtins
var from_unicode={},to_unicode={}
$B.to_bytes=function(obj){var res
if(_b_.isinstance(obj,[bytes,bytearray])){res=obj.source}else{var ga=$B.$getattr(obj,"tobytes",null)
if(ga !==null){res=$B.$call(ga)().source}
else{throw _b_.TypeError.$factory("object doesn't support the buffer protocol")}}
return res}
function _strip(self,cars,lr){if(cars===undefined){cars=[]
var ws='\r\n \t'
for(var i=0,len=ws.length;i < len;i++){cars.push(ws.charCodeAt(i))}}else if(_b_.isinstance(cars,bytes)){cars=cars.source}else{throw _b_.TypeError.$factory("Type str doesn't support the buffer API")}
if(lr=='l'){for(var i=0,len=self.source.length;i < len;i++){if(cars.indexOf(self.source[i])==-1){break}}
return bytes.$factory(self.source.slice(i))}
for(var i=self.source.length-1;i >=0;i--){if(cars.indexOf(self.source[i])==-1){break}}
return bytes.$factory(self.source.slice(0,i+1))}
function invalid(other){return ! _b_.isinstance(other,[bytes,bytearray])}
var bytearray={__class__:_b_.type,__mro__:[_b_.object],$buffer_protocol:true,$infos:{__module__:"builtins",__name__:"bytearray"},$is_class:true}
var mutable_methods=["__delitem__","clear","copy","count","index","pop","remove","reverse","sort"]
mutable_methods.forEach(function(method){bytearray[method]=(function(m){return function(self){var args=[self.source],pos=1
for(var i=1,len=arguments.length;i < len;i++){args[pos++]=arguments[i]}
return _b_.list[m].apply(null,args)}})(method)})
bytearray.__hash__=_b_.None
var bytearray_iterator=$B.make_iterator_class('bytearray_iterator')
bytearray.__iter__=function(self){return bytearray_iterator.$factory(self.source)}
bytearray.__mro__=[_b_.object]
bytearray.__repr__=bytearray.__str__=function(self){return 'bytearray('+bytes.__repr__(self)+")"}
bytearray.__setitem__=function(self,arg,value){if(_b_.isinstance(arg,_b_.int)){if(! _b_.isinstance(value,_b_.int)){throw _b_.TypeError.$factory('an integer is required')}else if(value > 255){throw _b_.ValueError.$factory("byte must be in range(0, 256)")}
var pos=arg
if(arg < 0){pos=self.source.length+pos}
if(pos >=0 && pos < self.source.length){self.source[pos]=value}
else{throw _b_.IndexError.$factory('list index out of range')}}else if(_b_.isinstance(arg,_b_.slice)){var start=arg.start===_b_.None ? 0 :arg.start
var stop=arg.stop===_b_.None ? self.source.length :arg.stop
if(start < 0){start=self.source.length+start}
if(stop < 0){stop=self.source.length+stop}
self.source.splice(start,stop-start)
try{var $temp=_b_.list.$factory(value)
for(var i=$temp.length-1;i >=0;i--){if(! _b_.isinstance($temp[i],_b_.int)){throw _b_.TypeError.$factory('an integer is required')}else if($temp[i]> 255){throw _b_.ValueError.$factory("byte must be in range(0, 256)")}
self.source.splice(start,0,$temp[i])}}catch(err){throw _b_.TypeError.$factory("can only assign an iterable")}}else{throw _b_.TypeError.$factory('list indices must be integer, not '+
$B.class_name(arg))}}
bytearray.append=function(self,b){if(arguments.length !=2){throw _b_.TypeError.$factory(
"append takes exactly one argument ("+(arguments.length-1)+
" given)")}
if(! _b_.isinstance(b,_b_.int)){throw _b_.TypeError.$factory("an integer is required")}
if(b > 255){throw _b_.ValueError.$factory("byte must be in range(0, 256)")}
self.source[self.source.length]=b}
bytearray.extend=function(self,b){if(self.in_iteration){
throw _b_.BufferError.$factory("Existing exports of data: object "+
"cannot be re-sized")}
if(b.__class__===bytearray ||b.__class__===bytes){b.source.forEach(function(item){self.source.push(item)})
return _b_.None}
var it=_b_.iter(b)
while(true){try{bytearray.__add__(self,_b_.next(it))}catch(err){if(err===_b_.StopIteration){break}
throw err}}
return _b_.None}
bytearray.insert=function(self,pos,b){if(arguments.length !=3){throw _b_.TypeError.$factory(
"insert takes exactly 2 arguments ("+(arguments.length-1)+
" given)")}
if(! _b_.isinstance(b,_b_.int)){throw _b_.TypeError.$factory("an integer is required")}
if(b > 255){throw _b_.ValueError.$factory("byte must be in range(0, 256)")}
_b_.list.insert(self.source,pos,b)}
bytearray.$factory=function(){var args=[bytearray]
for(var i=0,len=arguments.length;i < len;i++){args.push(arguments[i])}
return bytearray.__new__.apply(null,args)}
var bytes={__class__ :_b_.type,__mro__:[_b_.object],$buffer_protocol:true,$infos:{__module__:"builtins",__name__:"bytes"},$is_class:true}
bytes.__add__=function(self,other){if(_b_.isinstance(other,bytes)){return self.__class__.$factory(self.source.concat(other.source))}else if(_b_.isinstance(other,bytearray)){return self.__class__.$factory(bytes.__add__(self,bytes.$factory(other)))}else if(_b_.isinstance(other,_b_.memoryview)){return self.__class__.$factory(bytes.__add__(self,_b_.memoryview.tobytes(other)))}
throw _b_.TypeError.$factory("can't concat bytes to "+
_b_.str.$factory(other))}
bytes.__contains__=function(self,other){if(typeof other=="number"){return self.source.indexOf(other)>-1}
if(self.source.length < other.source.length){return false}
var len=other.source.length
for(var i=0;i < self.source.length-other.source.length+1;i++){var flag=true
for(var j=0;j < len;j++){if(other.source[i+j]!=self.source[j]){flag=false
break}}
if(flag){return true}}
return false}
var bytes_iterator=$B.make_iterator_class("bytes_iterator")
bytes.__iter__=function(self){return bytes_iterator.$factory(self.source)}
bytes.__eq__=function(self,other){if(invalid(other)){return false}
return $B.$getattr(self.source,'__eq__')(other.source)}
bytes.__ge__=function(self,other){if(invalid(other)){return _b_.NotImplemented}
return _b_.list.__ge__(self.source,other.source)}
bytes.__getitem__=function(self,arg){var i
if(_b_.isinstance(arg,_b_.int)){var pos=arg
if(arg < 0){pos=self.source.length+pos}
if(pos >=0 && pos < self.source.length){return self.source[pos]}
throw _b_.IndexError.$factory("index out of range")}else if(_b_.isinstance(arg,_b_.slice)){var s=_b_.slice.$conv_for_seq(arg,self.source.length),start=s.start,stop=s.stop,step=s.step
var res=[],i=null,pos=0
if(step > 0){stop=Math.min(stop,self.source.length)
if(stop <=start){return bytes.$factory([])}
for(var i=start;i < stop;i+=step){res[pos++]=self.source[i]}}else{if(stop >=start){return bytes.$factory([])}
stop=Math.max(0,stop)
for(var i=start;i >=stop;i+=step){res[pos++]=self.source[i]}}
return bytes.$factory(res)}else if(_b_.isinstance(arg,_b_.bool)){return self.source.__getitem__(_b_.int.$factory(arg))}}
bytes.__gt__=function(self,other){if(invalid(other)){return _b_.NotImplemented}
return _b_.list.__gt__(self.source,other.source)}
bytes.__hash__=function(self){if(self===undefined){return bytes.__hashvalue__ ||$B.$py_next_hash--}
var hash=1
for(var i=0,len=self.source.length;i < len;i++){hash=(101*hash+self.source[i])& 0xFFFFFFFF}
return hash}
bytes.__init__=function(){return _b_.None}
bytes.__le__=function(self,other){if(invalid(other)){return _b_.NotImplemented}
return _b_.list.__le__(self.source,other.source)}
bytes.__len__=function(self){return self.source.length}
bytes.__lt__=function(self,other){if(invalid(other)){return _b_.NotImplemented}
return _b_.list.__lt__(self.source,other.source)}
bytes.__mod__=function(self,args){
var s=decode(self,"ascii","strict"),res=_b_.str.__mod__(s,args)
return _b_.str.encode(res,"ascii")}
bytes.__mul__=function(){var $=$B.args('__mul__',2,{self:null,other:null},['self','other'],arguments,{},null,null),other=$B.PyNumber_Index($.other)
var t=[],source=$.self.source,slen=source.length
for(var i=0;i < other;i++){for(var j=0;j < slen;j++){t.push(source[j])}}
var res=bytes.$factory()
res.source=t
return res}
bytes.__ne__=function(self,other){return ! bytes.__eq__(self,other)}
bytes.__new__=function(cls,source,encoding,errors){var $=$B.args("__new__",4,{cls:null,source:null,encoding:null,errors:null},["cls","source","encoding","errors"],arguments,{source:[],encoding:"utf-8",errors:"strict"},null,null)
return bytes.$new($.cls,$.source,$.encoding,$.errors)}
bytes.$new=function(cls,source,encoding,errors){
var self={__class__:cls},int_list=[],pos=0
if(source===undefined){}else if(typeof source=="number" ||_b_.isinstance(source,_b_.int)){var i=source
while(i--){int_list[pos++]=0}}else{if(typeof source=="string" ||_b_.isinstance(source,_b_.str)){if(encoding===undefined){throw _b_.TypeError.$factory("string argument without an encoding")}
int_list=encode(source,encoding ||"utf-8",errors ||"strict")}else{
int_list=_b_.list.$factory(source)
for(var i=0;i < int_list.length;i++){try{var item=_b_.int.$factory(int_list[i])}catch(err){throw _b_.TypeError.$factory("'"+
$B.class_name(int_list[i])+"' object "+
"cannot be interpreted as an integer")}
if(item < 0 ||item > 255){throw _b_.ValueError.$factory("bytes must be in range"+
"(0, 256)")}}}}
self.source=int_list
self.encoding=encoding
self.errors=errors
return self}
bytes.__repr__=bytes.__str__=function(self){var t=$B.special_string_repr,
res=""
for(var i=0,len=self.source.length;i < len;i++){var s=self.source[i]
if(t[s]!==undefined){res+=t[s]}else if(s < 32 ||s >=128){var hx=s.toString(16)
hx=(hx.length==1 ? '0' :'')+hx
res+='\\x'+hx}else if(s=="\\".charCodeAt(0)){res+="\\\\"}else{res+=String.fromCharCode(s)}}
if(res.indexOf("'")>-1 && res.indexOf('"')==-1){return 'b"'+res+'"'}else{return "b'"+res.replace(new RegExp("'","g"),"\\'")+"'"}}
bytes.__reduce_ex__=function(self){return bytes.__repr__(self)}
bytes.capitalize=function(self){var src=self.source,len=src.length,buffer=src.slice()
if(buffer[0]> 96 && buffer[0]< 123){buffer[0]-=32}
for(var i=1;i < len;++i){if(buffer[i]> 64 && buffer[i]< 91){buffer[i]+=32}}
return bytes.$factory(buffer)}
bytes.center=function(){var $=$B.args('center',3,{self:null,width:null,fillbyte:null},['self','width','fillbyte'],arguments,{fillbyte:bytes.$factory([32])},null,null)
var diff=$.width-$.self.source.length
if(diff <=0){return bytes.$factory($.self.source)}
var ljust=bytes.ljust($.self,$.self.source.length+Math.floor(diff/2),$.fillbyte)
return bytes.rjust(ljust,$.width,$.fillbyte)}
bytes.count=function(){var $=$B.args('count',4,{self:null,sub:null,start:null,end:null},['self','sub','start','end'],arguments,{start:0,end:-1},null,null)
var n=0,index=-1,len=0
if(typeof $.sub=="number"){if($.sub < 0 ||$.sub > 255)
throw _b_.ValueError.$factory("byte must be in range(0, 256)")
len=1}else if(!$.sub.__class__){throw _b_.TypeError.$factory("first argument must be a bytes-like "+
"object, not '"+$B.class_name($.sub)+"'")}else if(!$.sub.__class__.$buffer_protocol){throw _b_.TypeError.$factory("first argument must be a bytes-like "+
"object, not '"+$B.class_name($.sub)+"'")}else{len=$.sub.source.length}
do{index=bytes.find($.self,$.sub,Math.max(index+len,$.start),$.end)
if(index !=-1){n++}}while(index !=-1)
return n}
bytes.decode=function(self,encoding,errors){var $=$B.args("decode",3,{self:null,encoding:null,errors:null},["self","encoding","errors"],arguments,{encoding:"utf-8",errors:"strict"},null,null)
switch($.errors){case 'strict':
case 'ignore':
case 'replace':
case 'surrogateescape':
case 'surrogatepass':
case 'xmlcharrefreplace':
case 'backslashreplace':
return decode($.self,$.encoding,$.errors)
default:}}
bytes.endswith=function(){var $=$B.args('endswith',4,{self:null,suffix:null,start:null,end:null},['self','suffix','start','end'],arguments,{start:-1,end:-1},null,null)
if(_b_.isinstance($.suffix,bytes)){var start=$.start==-1 ?
$.self.source.length-$.suffix.source.length :
Math.min($.self.source.length-$.suffix.source.length,$.start)
var end=$.end==-1 ?
($.start==-1 ? $.self.source.length :start+$.suffix.source.length):
Math.min($.self.source.length-1,$.end)
var res=true
for(var i=$.suffix.source.length-1,len=$.suffix.source.length;
i >=0 && res;--i){res=$.self.source[end-len+i]==$.suffix.source[i]}
return res}else if(_b_.isinstance($.suffix,_b_.tuple)){for(var i=0;i < $.suffix.length;++i){if(_b_.isinstance($.suffix[i],bytes)){if(bytes.endswith($.self,$.suffix[i],$.start,$.end)){return true}}else{throw _b_.TypeError.$factory("endswith first arg must be "+
"bytes or a tuple of bytes, not "+
$B.class_name($.suffix))}}
return false}else{throw _b_.TypeError.$factory("endswith first arg must be bytes "+
"or a tuple of bytes, not "+$B.class_name($.suffix))}}
bytes.expandtabs=function(){var $=$B.args('expandtabs',2,{self:null,tabsize:null},['self','tabsize'],arguments,{tabsize:8},null,null)
var tab_spaces=[]
for(let i=0;i < $.tabsize;++i){tab_spaces.push(32)}
var buffer=$.self.source.slice()
for(let i=0;i < buffer.length;++i){if(buffer[i]===9){buffer.splice.apply(buffer,[i,1].concat(tab_spaces))}}
return _b_.bytes.$factory(buffer)}
bytes.find=function(self,sub){if(arguments.length !=2){var $=$B.args('find',4,{self:null,sub:null,start:null,end:null},['self','sub','start','end'],arguments,{start:0,end:-1},null,null),sub=$.sub,start=$.start,end=$.end}else{var start=0,end=-1}
if(typeof sub=="number"){if(sub < 0 ||sub > 255){throw _b_.ValueError.$factory("byte must be in range(0, 256)")}
return self.source.slice(0,end==-1 ? undefined :end).indexOf(sub,start)}else if(! sub.__class__){throw _b_.TypeError.$factory("first argument must be a bytes-like "+
"object, not '"+$B.class_name(sub)+"'")}else if(! sub.__class__.$buffer_protocol){throw _b_.TypeError.$factory("first argument must be a bytes-like "+
"object, not '"+$B.class_name(sub)+"'")}
end=end==-1 ? self.source.length :Math.min(self.source.length,end)
var len=sub.source.length
for(var i=start;i <=end-len;i++){var chunk=self.source.slice(i,i+len),found=true
for(var j=0;j < len;j++){if(chunk[j]!=sub.source[j]){found=false
break}}
if(found){return i}}
return-1}
bytes.fromhex=function(){var $=$B.args('fromhex',2,{cls:null,string:null},['cls','string'],arguments,{},null,null),string=$.string.replace(/\s/g,''),source=[]
for(var i=0;i < string.length;i+=2){if(i+2 > string.length){throw _b_.ValueError.$factory("non-hexadecimal number found "+
"in fromhex() arg")}
source.push(_b_.int.$factory(string.substr(i,2),16))}
return $.cls.$factory(source)}
bytes.hex=function(){
var $=$B.args('hex',3,{self:null,sep:null,bytes_per_sep:null},['self','sep','bytes_per_sep'],arguments,{sep:"",bytes_per_sep:1},null,null),self=$.self,sep=$.sep,bytes_per_sep=$.bytes_per_sep,res="",digits="0123456789abcdef",bps=bytes_per_sep,jstart=bps,len=self.source.length;
if(bytes_per_sep < 0){bps=-bytes_per_sep;
jstart=bps}else if(bytes_per_sep==0){sep=''}else{jstart=len % bps
if(jstart==0){jstart=bps}}
for(var i=0,j=jstart;i < len;i++){var c=self.source[i]
if(j==0){res+=sep
j=bps}
j--
res+=digits[c >> 4]
res+=digits[c & 0x0f]}
return res}
bytes.index=function(){var $=$B.args('rfind',4,{self:null,sub:null,start:null,end:null},['self','sub','start','end'],arguments,{start:0,end:-1},null,null)
var index=bytes.find($.self,$.sub,$.start,$.end)
if(index==-1){throw _b_.ValueError.$factory("subsection not found")}
return index}
bytes.isalnum=function(self){var src=self.source,len=src.length,res=len > 0
for(var i=0;i < len && res;++i){res=(src[i]> 96 && src[i]< 123)||
(src[i]> 64 && src[i]< 91)||
(src[i]> 47 && src[i]< 58)}
return res}
bytes.isalpha=function(self){var src=self.source,len=src.length,res=len > 0
for(var i=0;i < len && res;++i){res=(src[i]> 96 && src[i]< 123)||(src[i]> 64 && src[i]< 91)}
return res}
bytes.isdigit=function(self){var src=self.source,len=src.length,res=len > 0
for(let i=0;i < len && res;++i){res=src[i]> 47 && src[i]< 58}
return res}
bytes.islower=function(self){var src=self.source,len=src.length,res=false
for(let i=0;i < len;++i){
res=res ||(src[i]> 96 && src[i]< 123)
if(src[i]> 64 && src[i]< 91){return false}}
return res}
bytes.isspace=function(self){var src=self.source,len=src.length
for(let i=0;i < len;++i){switch(src[i]){case 9:
case 10:
case 11:
case 12:
case 13:
case 32:
break
default:
return false}}
return true}
bytes.isupper=function(self){var src=self.source,len=src.length,res=false
for(let i=0;i < len;++i){
res=res ||(src[i]> 64 && src[i]< 91)
if(src[i]> 96 && src[i]< 123){return false}}
return res}
bytes.istitle=function(self){var src=self.source,len=src.length,current_char_is_letter=false,prev_char_was_letter=false,is_uppercase=false,is_lowercase=false
for(var i=0;i < len;++i){is_lowercase=src[i]> 96 && src[i]< 123
is_uppercase=src[i]> 64 && src[i]< 91
current_char_is_letter=is_lowercase ||is_uppercase
if(current_char_is_letter &&
(prev_char_was_letter && is_uppercase)||
(! prev_char_was_letter && is_lowercase)){return false}
prev_char_was_letter=current_char_is_letter}
return true}
bytes.join=function(){var $ns=$B.args('join',2,{self:null,iterable:null},['self','iterable'],arguments,{}),self=$ns['self'],iterable=$ns['iterable']
var next_func=$B.$getattr(_b_.iter(iterable),'__next__'),res=self.__class__.$factory(),empty=true
while(true){try{var item=next_func()
if(empty){empty=false}
else{res=bytes.__add__(res,self)}
res=bytes.__add__(res,item)}catch(err){if(_b_.isinstance(err,_b_.StopIteration)){break}
throw err}}
return res}
var _lower=function(char_code){if(char_code >=65 && char_code <=90){return char_code+32}else{return char_code}}
bytes.lower=function(self){var _res=[],pos=0
for(var i=0,len=self.source.length;i < len;i++){if(self.source[i]){_res[pos++]=_lower(self.source[i])}}
return bytes.$factory(_res)}
bytes.ljust=function(){var $=$B.args('ljust',3,{self:null,width:null,fillbyte:null},['self','width','fillbyte'],arguments,{fillbyte:bytes.$factory([32])},null,null)
if(!$.fillbyte.__class__){throw _b_.TypeError.$factory("argument 2 must be a byte string of length 1, "+
"not '"+$B.class_name($.fillbyte)+"'")}else if(!$.fillbyte.__class__.$buffer_protocol){throw _b_.TypeError.$factory("argument 2 must be a byte string of length 1, "+
"not '"+$B.class_name($.fillbyte)+"'")}
var padding=[],count=$.width-$.self.source.length
for(var i=0;i < count;++i){padding.push($.fillbyte.source[0])}
return bytes.$factory($.self.source.concat(padding))}
bytes.lstrip=function(self,cars){return _strip(self,cars,'l')}
bytes.maketrans=function(from,to){var _t=[],to=$B.to_bytes(to)
for(var i=0;i < 256;i++){_t[i]=i}
for(var i=0,len=from.source.length;i < len;i++){var _ndx=from.source[i]
_t[_ndx]=to[i]}
return bytes.$factory(_t)}
bytes.partition=function(){var $=$B.args('partition',2,{self:null,sep:null},['self','sep'],arguments,{},null,null)
if(! $.sep.__class__){throw _b_.TypeError.$factory("a bytes-like object is required, "+
"not '"+$B.class_name($.sep)+"'")}else if(! $.sep.__class__.$buffer_protocol){throw _b_.TypeError.$factory("a bytes-like object is required, "+
"not '"+$B.class_name($.sep)+"'")}
var len=$.sep.source.length,src=$.self.source,i=bytes.find($.self,$.sep)
return _b_.tuple.$factory([bytes.$factory(src.slice(0,i)),bytes.$factory(src.slice(i,i+len)),bytes.$factory(src.slice(i+len))
])}
bytes.removeprefix=function(){var $=$B.args("removeprefix",2,{self:null,prefix:null},["self","prefix"],arguments,{},null,null)
if(!_b_.isinstance($.prefix,[bytes,bytearray])){throw _b_.ValueError.$factory("prefix should be bytes, not "+
`'${$B.class_name($.prefix)}'`)}
if(bytes.startswith($.self,$.prefix)){return bytes.__getitem__($.self,_b_.slice.$factory($.prefix.source.length,_b_.None))}
return bytes.__getitem__($.self,_b_.slice.$factory(0,_b_.None))}
bytes.removesuffix=function(){var $=$B.args("removesuffix",2,{self:null,prefix:null},["self","suffix"],arguments,{},null,null)
if(!_b_.isinstance($.suffix,[bytes,bytearray])){throw _b_.ValueError.$factory("suffix should be bytes, not "+
`'${$B.class_name($.suffix)}'`)}
if(bytes.endswith($.self,$.suffix)){return bytes.__getitem__($.self,_b_.slice.$factory(0,$.suffix.source.length+1))}
return bytes.__getitem__($.self,_b_.slice.$factory(0,_b_.None))}
bytes.replace=function(){var $=$B.args('replace',4,{self:null,old:null,new:null,count:null},['self','old','new','count'],arguments,{count:-1},null,null),res=[]
var self=$.self,src=self.source,len=src.length,old=$.old,$new=$.new
var count=$.count >=0 ? $.count :src.length
if(! $.old.__class__){throw _b_.TypeError.$factory("first argument must be a bytes-like "+
"object, not '"+$B.class_name($.old)+"'")}else if(! $.old.__class__.$buffer_protocol){throw _b_.TypeError.$factory("first argument must be a bytes-like "+
"object, not '"+$B.class_name($.sep)+"'")}
if(! $.new.__class__){throw _b_.TypeError.$factory("second argument must be a bytes-like "+
"object, not '"+$B.class_name($.old)+"'")}else if(! $.new.__class__.$buffer_protocol){throw _b_.TypeError.$factory("second argument must be a bytes-like "+
"object, not '"+$B.class_name($.sep)+"'")}
for(var i=0;i < len;i++){if(bytes.startswith(self,old,i)&& count){for(var j=0;j < $new.source.length;j++){res.push($new.source[j])}
i+=(old.source.length-1)
count--}else{res.push(src[i])}}
return bytes.$factory(res)}
bytes.rfind=function(self,subbytes){if(arguments.length==2 && subbytes.__class__===bytes){var sub=subbytes,start=0,end=-1}else{var $=$B.args('rfind',4,{self:null,sub:null,start:null,end:null},['self','sub','start','end'],arguments,{start:0,end:-1},null,null),self=$.self,sub=$.sub,start=$.start,end=$.end}
if(typeof sub=="number"){if(sub < 0 ||sub > 255){throw _b_.ValueError.$factory("byte must be in range(0, 256)")}
return $.self.source.slice(start,$.end==-1 ? undefined :$.end).
lastIndexOf(sub)+start}else if(! sub.__class__){throw _b_.TypeError.$factory("first argument must be a bytes-like "+
"object, not '"+$B.class_name($.sub)+"'")}else if(! sub.__class__.$buffer_protocol){throw _b_.TypeError.$factory("first argument must be a bytes-like "+
"object, not '"+$B.class_name(sub)+"'")}
end=end==-1 ? self.source.length :Math.min(self.source.length,end)
var len=sub.source.length
for(var i=end-len;i >=start;--i){var chunk=self.source.slice(i,i+len),found=true
for(var j=0;j < len;j++){if(chunk[j]!=sub.source[j]){found=false
break}}
if(found){return i}}
return-1}
bytes.rindex=function(){var $=$B.args('rfind',4,{self:null,sub:null,start:null,end:null},['self','sub','start','end'],arguments,{start:0,end:-1},null,null)
var index=bytes.rfind($.self,$.sub,$.start,$.end)
if(index==-1){throw _b_.ValueError.$factory("subsection not found")}
return index}
bytes.rjust=function(){var $=$B.args('rjust',3,{self:null,width:null,fillbyte:null},['self','width','fillbyte'],arguments,{fillbyte:bytes.$factory([32])},null,null)
if(!$.fillbyte.__class__){throw _b_.TypeError.$factory("argument 2 must be a byte string of length 1, "+
"not '"+$B.class_name($.fillbyte)+"'")}else if(!$.fillbyte.__class__.$buffer_protocol){throw _b_.TypeError.$factory("argument 2 must be a byte string of length 1, "+
"not '"+$B.class_name($.fillbyte)+"'")}
var padding=[],count=$.width-$.self.source.length
for(var i=0;i < count;++i){padding.push($.fillbyte.source[0])}
return bytes.$factory(padding.concat($.self.source))}
bytes.rpartition=function(){var $=$B.args('rpartition',2,{self:null,sep:null},['self','sep'],arguments,{},null,null)
if(!$.sep.__class__){throw _b_.TypeError.$factory("a bytes-like object is required, "+
"not '"+$B.class_name($.sep)+"'")}else if(!$.sep.__class__.$buffer_protocol){throw _b_.TypeError.$factory("a bytes-like object is required, "+
"not '"+$B.class_name($.sep)+"'")}
var len=$.sep.source.length,src=$.self.source,i=bytes.rfind($.self,$.sep)
return _b_.tuple.$factory([bytes.$factory(src.slice(0,i)),bytes.$factory(src.slice(i,i+len)),bytes.$factory(src.slice(i+len))
])}
bytes.rstrip=function(self,cars){return _strip(self,cars,'r')}
bytes.split=function(){var $=$B.args('split',2,{self:null,sep:null},['self','sep'],arguments,{sep:bytes.$factory([32])},null,null),res=[],start=0,stop=0
if(! $.sep.__class__ ){throw _b_.TypeError.$factory("a bytes-like object is required, "+
"not '"+$B.class_name($.sep)+"'")}else if(! $.sep.__class__.$buffer_protocol){throw _b_.TypeError.$factory("a bytes-like object is required, "+
"not '"+$B.class_name($.sep)+"'")}
var seps=$.sep.source,len=seps.length,src=$.self.source,blen=src.length
while(stop < blen){var match=true
for(var i=0;i < len && match;i++){if(src[stop+i]!=seps[i]){match=false}}
if(match){res.push(bytes.$factory(src.slice(start,stop)))
start=stop+len
stop=start}else{stop++}}
if(match ||(stop > start)){res.push(bytes.$factory(src.slice(start,stop)))}
return res}
bytes.splitlines=function(self){var $=$B.args('splitlines',2,{self:null,keepends:null},['self','keepends'],arguments,{keepends:false},null,null)
if(!_b_.isinstance($.keepends,[_b_.bool,_b_.int])){throw _b_.TypeError('integer argument expected, got '+
$B.get_class($.keepends).__name)}
var keepends=_b_.int.$factory($.keepends),res=[],source=$.self.source,start=0,pos=0
if(! source.length){return res}
while(pos < source.length){if(pos < source.length-1 && source[pos]==0x0d &&
source[pos+1]==0x0a){res.push(bytes.$factory(source.slice(start,keepends ? pos+2 :pos)))
start=pos=pos+2}else if(source[pos]==0x0d ||source[pos]==0x0a){res.push(bytes.$factory(source.slice(start,keepends ? pos+1 :pos)))
start=pos=pos+1}else{pos++}}
if(start < source.length){res.push(bytes.$factory(source.slice(start)))}
return res}
bytes.startswith=function(){var $=$B.args('startswith',3,{self:null,prefix:null,start:null},['self','prefix','start'],arguments,{start:0},null,null),start=$.start
if(_b_.isinstance($.prefix,bytes)){var res=true
for(var i=0;i < $.prefix.source.length && res;i++){res=$.self.source[start+i]==$.prefix.source[i]}
return res}else if(_b_.isinstance($.prefix,_b_.tuple)){var items=[]
for(var i=0;i < $.prefix.length;i++){if(_b_.isinstance($.prefix[i],bytes)){items=items.concat($.prefix[i].source)}else{throw _b_.TypeError.$factory("startswith first arg must be "+
"bytes or a tuple of bytes, not "+
$B.class_name($.prefix))}}
var prefix=bytes.$factory(items)
return bytes.startswith($.self,prefix,start)}else{throw _b_.TypeError.$factory("startswith first arg must be bytes "+
"or a tuple of bytes, not "+$B.class_name($.prefix))}}
bytes.strip=function(self,cars){var res=bytes.lstrip(self,cars)
return bytes.rstrip(res,cars)}
bytes.swapcase=function(self){var src=self.source,len=src.length,buffer=src.slice()
for(var i=0;i < len;++i){if(buffer[i]> 96 && buffer[i]< 123){buffer[i]-=32}else if(buffer[i]> 64 && buffer[i]< 91){buffer[i]+=32}}
return bytes.$factory(buffer)}
bytes.title=function(self){var src=self.source,len=src.length
buffer=src.slice(),current_char_is_letter=false,prev_char_was_letter=false,is_uppercase=false,is_lowercase=false
for(var i=0;i < len;++i){is_lowercase=buffer[i]> 96 && buffer[i]< 123
is_uppercase=buffer[i]> 64 && buffer[i]< 91
current_char_is_letter=is_lowercase ||is_uppercase
if(current_char_is_letter){if(prev_char_was_letter && is_uppercase){buffer[i]+=32}else if(! prev_char_was_letter && is_lowercase){buffer[i]-=32}}
prev_char_was_letter=current_char_is_letter}
return bytes.$factory(buffer)}
bytes.translate=function(self,table,_delete){if(_delete===undefined){_delete=[]}else if(_b_.isinstance(_delete,bytes)){_delete=_delete.source}else{throw _b_.TypeError.$factory("Type "+
$B.get_class(_delete).__name+" doesn't support the buffer API")}
var res=[],pos=0
if(_b_.isinstance(table,bytes)&& table.source.length==256){for(var i=0,len=self.source.length;i < len;i++){if(_delete.indexOf(self.source[i])>-1){continue}
res[pos++]=table.source[self.source[i]]}}
return bytes.$factory(res)}
var _upper=function(char_code){if(char_code >=97 && char_code <=122){return char_code-32}else{return char_code}}
bytes.upper=function(self){var _res=[],pos=0
for(var i=0,len=self.source.length;i < len;i++){if(self.source[i]){_res[pos++]=_upper(self.source[i])}}
return bytes.$factory(_res)}
bytes.zfill=function(self,width){var buffer=self.source.slice(),prefix_offset=(buffer[0]==43 ||buffer[0]==45)? 1 :0
var count=width-self.source.length
var padding=[]
for(var i=0;i < count;++i){padding.push(48)}
buffer.splice.apply(buffer,[prefix_offset,0].concat(padding))
return bytes.$factory(buffer)}
function $UnicodeEncodeError(encoding,code_point,position){throw _b_.UnicodeEncodeError.$factory("'"+encoding+
"' codec can't encode character "+_b_.hex(code_point)+
" in position "+position)}
function $UnicodeDecodeError(encoding,position){throw _b_.UnicodeDecodeError.$factory("'"+encoding+
"' codec can't decode bytes in position "+position)}
function _hex(_int){return _int.toString(16)}
function _int(hex){return parseInt(hex,16)}
function normalise(encoding){var enc=encoding.toLowerCase()
if(enc.substr(0,7)=="windows"){enc="cp"+enc.substr(7)}
if(enc.startsWith("cp-")||enc.startsWith("iso-")){enc=enc.replace("-","")}
enc=enc.replace(/-/g,"_")
return enc}
function load_decoder(enc){
if(to_unicode[enc]===undefined){var mod=_b_.__import__("encodings."+enc)
if(mod[enc].getregentry){to_unicode[enc]=$B.$getattr(mod[enc].getregentry(),"decode")}}}
function load_encoder(enc){
if(from_unicode[enc]===undefined){var mod=_b_.__import__("encodings."+enc)
if(mod[enc].getregentry){from_unicode[enc]=$B.$getattr(mod[enc].getregentry(),"encode")}}}
var decode=$B.decode=function(obj,encoding,errors){var s="",b=obj.source,enc=normalise(encoding)
switch(enc){case "utf_8":
case "utf-8":
case "utf8":
case "U8":
case "UTF":
var pos=0,s="",err_info
while(pos < b.length){var byte=b[pos]
err_info=null
if(!(byte & 0x80)){
s+=String.fromCodePoint(byte)
pos++}else if((byte >> 5)==6){
if(b[pos+1]===undefined){err_info=[byte,pos,"end"]}else if((b[pos+1]& 0xc0)!=0x80){err_info=[byte,pos,"continuation"]}
if(err_info !==null){if(errors=="ignore"){pos++}else{throw _b_.UnicodeDecodeError.$factory(
"'utf-8' codec can't decode byte 0x"+
err_info[0].toString(16)+"  in position "+
err_info[1]+
(err_info[2]=="end" ? ": unexpected end of data" :
": invalid continuation byte"))}}else{var cp=byte & 0x1f
cp <<=6
cp+=b[pos+1]& 0x3f
s+=String.fromCodePoint(cp)
pos+=2}}else if((byte >> 4)==14){
if(b[pos+1]===undefined){err_info=[byte,pos,"end",pos+1]}else if((b[pos+1]& 0xc0)!=0x80){err_info=[byte,pos,"continuation",pos+2]}else if(b[pos+2]===undefined){err_info=[byte,pos+'-'+(pos+1),"end",pos+2]}else if((b[pos+2]& 0xc0)!=0x80){err_info=[byte,pos,"continuation",pos+3]}
if(err_info !==null){if(errors=="ignore"){pos=err_info[3]}else if(errors=="surrogateescape"){for(var i=pos;i < err_info[3];i++){s+=String.fromCodePoint(0xdc80+b[i]-0x80)}
pos=err_info[3]}else{throw _b_.UnicodeDecodeError.$factory(
"'utf-8' codec can't decode byte 0x"+
err_info[0].toString(16)+"  in position "+
err_info[1]+
(err_info[2]=="end" ? ": unexpected end of data" :
": invalid continuation byte"))}}else{var cp=byte & 0xf
cp=cp << 12
cp+=(b[pos+1]& 0x3f)<< 6
cp+=b[pos+2]& 0x3f
s+=String.fromCodePoint(cp)
pos+=3}}else if((byte >> 3)==30){
if(b[pos+1]===undefined){err_info=[byte,pos,"end",pos+1]}else if((b[pos+1]& 0xc0)!=0x80){err_info=[byte,pos,"continuation",pos+2]}else if(b[pos+2]===undefined){err_info=[byte,pos+'-'+(pos+1),"end",pos+2]}else if((b[pos+2]& 0xc0)!=0x80){err_info=[byte,pos,"continuation",pos+3]}else if(b[pos+3]===undefined){err_info=[byte,pos+'-'+(pos+1)+'-'+(pos+2),"end",pos+3]}else if((b[pos+2]& 0xc0)!=0x80){err_info=[byte,pos,"continuation",pos+3]}
if(err_info !==null){if(errors=="ignore"){pos=err_info[3]}else if(errors=="surrogateescape"){for(var i=pos;i < err_info[3];i++){s+=String.fromCodePoint(0xdc80+b[i]-0x80)}
pos=err_info[3]}else{throw _b_.UnicodeDecodeError.$factory(
"'utf-8' codec can't decode byte 0x"+
err_info[0].toString(16)+"  in position "+
err_info[1]+
(err_info[2]=="end" ? ": unexpected end of data" :
": invalid continuation byte"))}}else{var cp=byte & 0xf
cp=cp << 18
cp+=(b[pos+1]& 0x3f)<< 12
cp+=(b[pos+2]& 0x3f)<< 6
cp+=(b[pos+3]& 0x3f)
s+=String.fromCodePoint(cp)
pos+=4}}else{if(errors=="ignore"){pos++}else if(errors=="surrogateescape"){s+=String.fromCodePoint(0xdc80+b[pos]-0x80)
pos++}else{throw _b_.UnicodeDecodeError.$factory(
"'utf-8' codec can't decode byte 0x"+
byte.toString(16)+" in position "+pos+
": invalid start byte")}}}
return s
case "latin_1":
case "windows1252":
case "iso-8859-1":
case "iso8859-1":
case "8859":
case "cp819":
case "latin":
case "latin1":
case "L1":
b.forEach(function(item){s+=String.fromCharCode(item)})
break
case "unicode_escape":
if(obj.__class__===bytes ||obj.__class__===bytearray){obj=decode(obj,"latin-1","strict")}
return obj.replace(/\\n/g,"\n").
replace(/\\a/g,"\u0007").
replace(/\\b/g,"\b").
replace(/\\f/g,"\f").
replace(/\\t/g,"\t").
replace(/\\'/g,"'").
replace(/\\"/g,'"')
case "raw_unicode_escape":
if(obj.__class__===bytes ||obj.__class__===bytearray){obj=decode(obj,"latin-1","strict")}
return obj.replace(/\\u([a-fA-F0-9]{4})/g,function(mo){var cp=parseInt(mo.substr(2),16)
return String.fromCharCode(cp)})
case "ascii":
for(var i=0,len=b.length;i < len;i++){var cp=b[i]
if(cp <=127){s+=String.fromCharCode(cp)}else{if(errors=="ignore"){}else{var msg="'ascii' codec can't decode byte 0x"+
cp.toString(16)+" in position "+i+
": ordinal not in range(128)"
throw _b_.UnicodeDecodeError.$factory(msg)}}}
break
default:
try{load_decoder(enc)}catch(err){console.log(b,encoding,"error load_decoder",err)
throw _b_.LookupError.$factory("unknown encoding: "+enc)}
return to_unicode[enc](obj)[0]}
return s}
var encode=$B.encode=function(){var $=$B.args("encode",3,{s:null,encoding:null,errors:null},["s","encoding","errors"],arguments,{encoding:"utf-8",errors:"strict"},null,null),s=$.s,encoding=$.encoding,errors=$.errors
var t=[],pos=0,enc=normalise(encoding)
switch(enc){case "utf-8":
case "utf_8":
case "utf8":
var res=[]
for(var i=0,len=s.length;i < len;i++){var cp=s.charCodeAt(i)
if(cp < 0x7f){res.push(cp)}else if(cp < 0x7ff){res.push(0xc0+(cp >> 6),0x80+(cp & 0x3f))}else if(cp < 0xffff){res.push(0xe0+(cp >> 12),0x80+((cp & 0xfff)>> 6),0x80+(cp & 0x3f))}else{console.log("4 bytes")}}
return res
case "latin":
case "latin1":
case "latin-1":
case "latin_1":
case "L1":
case "iso8859_1":
case "iso_8859_1":
case "8859":
case "cp819":
case "windows1252":
for(var i=0,len=s.length;i < len;i++){var cp=s.charCodeAt(i)
if(cp <=255){t[pos++]=cp}
else if(errors !="ignore"){$UnicodeEncodeError(encoding,i)}}
break
case "ascii":
for(var i=0,len=s.length;i < len;i++){var cp=s.charCodeAt(i)
if(cp <=127){t[pos++]=cp}
else if(errors !="ignore"){$UnicodeEncodeError(encoding,i)}}
break
case "raw_unicode_escape":
for(var i=0,len=s.length;i < len;i++){var cp=s.charCodeAt(i)
if(cp < 256){t[pos++]=cp}else{var us=cp.toString(16)
if(us.length % 2){us="0"+us}
us="\\u"+us
for(var j=0;j < us.length;j++){t[pos++]=us.charCodeAt(j)}}}
break
default:
try{load_encoder(enc)}catch(err){throw _b_.LookupError.$factory("unknown encoding: "+encoding)}
t=from_unicode[enc](s)[0].source}
return t}
bytes.$factory=function(source,encoding,errors){var $=$B.args("bytes",3,{source:null,encoding:null,errors:null},["source","encoding","errors"],arguments,{source:[],encoding:"utf-8",errors:"strict"},null,null)
return bytes.$new(bytes,$.source,$.encoding,$.errors)}
bytes.__class__=_b_.type
bytes.$is_class=true
for(var attr in bytes){if(bytearray[attr]===undefined && typeof bytes[attr]=="function"){bytearray[attr]=(function(_attr){return function(){return bytes[_attr].apply(null,arguments)}})(attr)}}
$B.set_func_names(bytes,"builtins")
bytes.fromhex=_b_.classmethod.$factory(bytes.fromhex)
$B.set_func_names(bytearray,"builtins")
bytearray.fromhex=_b_.classmethod.$factory(bytearray.fromhex)
_b_.bytes=bytes
_b_.bytearray=bytearray})(__BRYTHON__)
;
;(function($B){var _b_=$B.builtins,object=_b_.object,$N=_b_.None
function create_type(obj){return $B.get_class(obj).$factory()}
function clone(obj){var res=create_type(obj)
res.$items=obj.$items.slice()
for(key in obj.$hashes){res.$hashes[key]=obj.$hashes[key]}
return res}
var set={__class__:_b_.type,$infos:{__module__:"builtins",__name__:"set"},$is_class:true,$native:true}
set.__and__=function(self,other,accept_iter){try{$test(accept_iter,other)}catch(err){return _b_.NotImplemented}
var res=create_type(self)
for(var i=0,len=self.$items.length;i < len;i++){if(_b_.getattr(other,"__contains__")(self.$items[i])){set.add(res,self.$items[i])}}
return res}
set.__class_getitem__=function(cls,item){
if(! Array.isArray(item)){item=[item]}
return $B.GenericAlias.$factory(cls,item)}
set.__contains__=function(self,item){if(typeof item=="number" ||item instanceof Number){if(isNaN(item)){
for(var i=self.$items.length-1;i >=0;i--){if(isNaN(self.$items[i])){return true}}
return false}else if(item instanceof Number){return self.$numbers.indexOf(item.valueOf())>-1}else{return self.$items.indexOf(item)>-1}}else if(typeof item=="string"){return self.$items.indexOf(item)>-1}
var hash=_b_.hash(item),
item_class=item.__class__ ||$B.get_class(item)
if(self.$hashes[hash]){
for(var i=0,len=self.$hashes[hash].length;i < len;i++){if(self.$hashes[hash][i]===item){return true}}
for(var i=0,len=self.$hashes[hash].length;i < len;i++){if($B.rich_comp("__eq__",self.$hashes[hash][i],item)){return true}}}
return false}
set.__eq__=function(self,other){
if(other===undefined){return self===set}
if(_b_.isinstance(other,[_b_.set,_b_.frozenset])){if(other.$items.length==self.$items.length){for(var i=0,len=self.$items.length;i < len;i++){if(set.__contains__(self,other.$items[i])===false){return false}}
return true}
return false}
return _b_.NotImplemented}
set.__format__=function(self,format_string){return set.__str__(self)}
set.__ge__=function(self,other){if(_b_.isinstance(other,[set,frozenset])){return set.__le__(other,self)}
return _b_.NotImplemented}
set.__gt__=function(self,other){if(_b_.isinstance(other,[set,frozenset])){return set.__lt__(other,self)}
return _b_.NotImplemented}
set.__hash__=_b_.None
set.__init__=function(self,iterable,second){if(second===undefined){if(Array.isArray(iterable)){for(var i=0,len=iterable.length;i < len;i++){$add(self,iterable[i])}
return $N}}
var $=$B.args("__init__",2,{self:null,iterable:null},["self","iterable"],arguments,{iterable:[]},null,null),self=$.self,iterable=$.iterable
if(_b_.isinstance(iterable,[set,frozenset])){self.$items=iterable.$items.slice()
self.$hashes={}
for(var key in iterable.$hashes){self.$hashes[key]=iterable.$hashes[key]}
return $N}
var it=$B.$iter(iterable)
while(1){try{var item=_b_.next(it)
$add(self,item)}catch(err){if(_b_.isinstance(err,_b_.StopIteration)){break}
throw err}}
return $N}
var set_iterator=$B.make_iterator_class("set iterator")
set.__iter__=function(self){
self.$items.sort(function(x,y){var hx=_b_.hash(x),hy=_b_.hash(y)
return hx==hy ? 0 :
hx < hy ?-1 :1})
return set_iterator.$factory(self.$items)}
set.__le__=function(self,other){
if(_b_.isinstance(other,[set,frozenset])){var cfunc=_b_.getattr(other,"__contains__")
for(var i=0,len=self.$items.length;i < len;i++){if(! cfunc(self.$items[i])){return false}}
return true}else{return _b_.NotImplemented}}
set.__len__=function(self){return self.$items.length}
set.__lt__=function(self,other){if(_b_.isinstance(other,[set,frozenset])){return set.__le__(self,other)&&
set.__len__(self)< _b_.getattr(other,"__len__")()}else{return _b_.NotImplemented}}
set.__mro__=[_b_.object]
set.__new__=function(cls){if(cls===undefined){throw _b_.TypeError.$factory("set.__new__(): not enough arguments")}
return{
__class__:cls,$items:[],$numbers:[],
$hashes:{}}}
set.__or__=function(self,other,accept_iter){
var res=clone(self),func=_b_.getattr($B.$iter(other),"__next__")
while(1){try{set.add(res,func())}
catch(err){if(_b_.isinstance(err,_b_.StopIteration)){break}
throw err}}
res.__class__=self.__class__
return res}
set.__rand__=function(self,other){
return set.__and__(self,other)}
set.__reduce__=function(self){return _b_.tuple.$factory([self.__class__,_b_.tuple.$factory([self.$items]),$N])}
set.__reduce_ex__=function(self,protocol){return set.__reduce__(self)}
set.__repr__=function(self){$B.builtins_repr_check(set,arguments)
return set_repr(self)}
function set_repr(self){
klass_name=$B.class_name(self)
if(self.$items.length===0){return klass_name+"()"}
var head=klass_name+"({",tail="})"
if(head=="set({"){head="{";tail="}"}
var res=[]
if($B.repr.enter(self)){return klass_name+"(...)"}
try{self.$items.sort(function(x,y){var hx=_b_.hash(x),hy=_b_.hash(y)
return hx > hy ? 1 :
hx==hy ? 0 :
-1}
)}catch(err){
console.log('erreur',err.message)}
for(var i=0,len=self.$items.length;i < len;i++){var r=_b_.repr(self.$items[i])
if(r===self ||r===self.$items[i]){res.push("{...}")}
else{res.push(r)}}
res=res.join(", ")
$B.repr.leave(self)
return head+res+tail}
set.__rsub__=function(self,other){
return set.__sub__(other,self)}
set.__rxor__=function(self,other){
return set.__xor__(self,other)}
set.__sub__=function(self,other,accept_iter){
try{$test(accept_iter,other,"-")}
catch(err){return _b_.NotImplemented}
var res=create_type(self),cfunc=_b_.getattr(other,"__contains__"),items=[]
for(var i=0,len=self.$items.length;i < len;i++){if(! cfunc(self.$items[i])){items.push(self.$items[i])}}
set.__init__.call(null,res,items)
return res}
set.__xor__=function(self,other,accept_iter){
try{$test(accept_iter,other,"^")}
catch(err){return _b_.NotImplemented}
var res=create_type(self),cfunc=_b_.getattr(other,"__contains__")
for(var i=0,len=self.$items.length;i < len;i++){if(! cfunc(self.$items[i])){set.add(res,self.$items[i])}}
for(var i=0,len=other.$items.length;i < len;i++){if(! set.__contains__(self,other.$items[i])){set.add(res,other.$items[i])}}
return res}
function $test(accept_iter,other,op){if(accept_iter===undefined &&
! _b_.isinstance(other,[set,frozenset])){throw _b_.TypeError.$factory("unsupported operand type(s) for "+op+
": 'set' and '"+$B.class_name(other)+"'")}}
$B.make_rmethods(set)
function $add(self,item){var $simple=false
if(typeof item==="string" ||typeof item==="number" ||
item instanceof Number){$simple=true}
if($simple){var ix=self.$items.indexOf(item)
if(ix==-1){if(item instanceof Number &&
self.$numbers.indexOf(item.valueOf())>-1){}else if(typeof item=="number" &&
self.$numbers.indexOf(item)>-1){}else{self.$items.push(item)
var value=item.valueOf()
if(typeof value=="number"){self.$numbers.push(value)}}}else{
if(item !==self.$items[ix]){self.$items.push(item)}}}else{
var hashvalue=_b_.hash(item)
var items=self.$hashes[hashvalue]
if(items===undefined){self.$hashes[hashvalue]=[item]
self.$items.push(item)}else{var items=self.$hashes[hashvalue],cfunc=function(other){return $B.rich_comp("__eq__",item,other)}
for(var i=0,len=items.length;i < len;i++){if(cfunc(items[i])){
return $N}}
self.$hashes[hashvalue].push(item)
self.$items.push(item)}}
return $N}
set.add=function(){var $=$B.args("add",2,{self:null,item:null},["self","item"],arguments,{},null,null),self=$.self,item=$.item
return $add(self,item)}
set.clear=function(){var $=$B.args("clear",1,{self:null},["self"],arguments,{},null,null)
$.self.$items=[]
$.self.$numbers=[]
$.self.$hashes={}
return $N}
set.copy=function(){var $=$B.args("copy",1,{self:null},["self"],arguments,{},null,null)
if(_b_.isinstance($.self,frozenset)){return $.self}
var res=set.$factory()
$.self.$items.forEach(function(item){res.$items.push(item)})
$.self.$numbers.forEach(function(item){res.$numbers.push(item)})
for(key in self.$hashes){res.$hashes[key]=self.$hashes[key]}
return res}
set.difference_update=function(self){var $=$B.args("difference_update",1,{self:null},["self"],arguments,{},"args",null)
for(var i=0;i < $.args.length;i++){var s=set.$factory($.args[i]),_next=_b_.getattr($B.$iter(s),"__next__"),item
while(true){try{item=_next()
var _type=typeof item
if(_type=="string" ||_type=="number"){var _index=self.$items.indexOf(item)
if(_index >-1){self.$items.splice(_index,1)}}else{for(var j=0;j < self.$items.length;j++){if($B.rich_comp("__eq__",self.$items[j],item)){self.$items.splice(j,1)
var hash=_b_.hash(item)
if(self.$hashes[hash]){for(var k=0;k < self.$hashes[hash].length;k++){if($B.rich_comp("__eq__",self.$hashes[hash][k],item)){self.$hashes[hash].splice(k,1)
break}}}}}}}catch(err){if(_b_.isinstance(err,_b_.StopIteration)){break}
throw err}}}
return $N}
set.discard=function(){var $=$B.args("discard",2,{self:null,item:null},["self","item"],arguments,{},null,null)
try{set.remove($.self,$.item)}
catch(err){if(!_b_.isinstance(err,[_b_.KeyError,_b_.LookupError])){throw err}}
return $N}
set.intersection_update=function(){
var $=$B.args("intersection_update",1,{self:null},["self"],arguments,{},"args",null),self=$.self
for(var i=0;i < $.args.length;i++){var remove=[],s=set.$factory($.args[i])
for(var j=0;j < self.$items.length;j++){var _item=self.$items[j],_type=typeof _item
if(_type=="string" ||_type=="number"){if(s.$items.indexOf(_item)==-1){remove.push(j)}}else{var found=false,hash=_b_.hash(_item)
if(s.$hashes[hash]){var hashes=s.$hashes[hash]
for(var k=0;! found && k < hashes.length;k++){if($B.rich_comp("__eq__",hashes[k],_item)){found=true}}
if(! found){remove.push(j)
hashes=self.$hashes[hash]
for(var k=0;! found && k < hashes.length;k++){if($B.rich_comp("__eq__",hashes[k],_item)){self.$hashes.splice(k,1)}}}}}}
remove.sort(function(x,y){return x-y}).reverse()
for(var j=0;j < remove.length;j++){self.$items.splice(remove[j],1)}}
return $N}
set.isdisjoint=function(){var $=$B.args("is_disjoint",2,{self:null,other:null},["self","other"],arguments,{},null,null)
for(var i=0,len=$.self.$items.length;i < len;i++){if(_b_.getattr($.other,"__contains__")($.self.$items[i])){return false}}
return true}
set.pop=function(self){if(self.$items.length===0){throw _b_.KeyError.$factory('pop from an empty set')}
var item=self.$items.pop()
if(typeof item !="string" && typeof item !="number"){
var hash=_b_.hash(item),items=self.$hashes[hash]
for(var k=0;k < items.length;k++){if($B.rich_comp("__eq__",items[k],item)){self.$hashes[hash].splice(k,1)
break}}}
return item}
set.remove=function(self,item){
var $=$B.args("remove",2,{self:null,item:null},["self","item"],arguments,{},null,null),self=$.self,item=$.item
if(! _b_.isinstance(item,set)){_b_.hash(item)}
if(typeof item=="string" ||typeof item=="number"){var _i=self.$items.indexOf(item)
if(_i==-1){throw _b_.KeyError.$factory(item)}
self.$items.splice(_i,1)
if(typeof item=="number"){self.$numbers.splice(self.$numbers.indexOf(item),1)}
return $N}
var hash=_b_.hash(item)
if(self.$hashes[hash]){
for(var i=0,len=self.$items.length;i < len;i++){if($B.rich_comp("__eq__",self.$items[i],item)){self.$items.splice(i,1)
if(item instanceof Number){self.$numbers.splice(self.$numbers.indexOf(item.valueOf()),1)}
break}}
for(var i=0,len=self.$hashes[hash].length;i < len;i++){if($B.rich_comp("__eq__",self.$hashes[hash][i],item)){self.$hashes[hash].splice(i,1)
break}}
return $N}
throw _b_.KeyError.$factory(item)}
set.symmetric_difference_update=function(self,s){
var $=$B.args("symmetric_difference_update",2,{self:null,s:null},["self","s"],arguments,{},null,null),self=$.self,s=$.s
var _next=_b_.getattr($B.$iter(s),"__next__"),item,remove=[],add=[]
while(true){try{item=_next()
var _type=typeof item
if(_type=="string" ||_type=="number"){var _index=self.$items.indexOf(item)
if(_index >-1){remove.push(_index)}else{add.push(item)}}else{var found=false
for(var j=0;! found && j < self.$items.length;j++){if($B.rich_comp("__eq__",self.$items[j],item)){remove.push(j)
found=true}}
if(! found){add.push(item)}}}catch(err){if(_b_.isinstance(err,_b_.StopIteration)){break}
throw err}}
remove.sort(function(x,y){return x-y}).reverse()
for(var i=0;i < remove.length;i++){if(remove[i]!=remove[i-1]){self.$items.splice(remove[i],1)}}
for(var i=0;i < add.length;i++){set.add(self,add[i])}
return $N}
set.update=function(self){
var $=$B.args("update",1,{self:null},["self"],arguments,{},"args",null)
for(var i=0;i < $.args.length;i++){var other=set.$factory($.args[i])
for(var j=0,_len=other.$items.length;j < _len;j++){$add(self,other.$items[j])}}
return $N}
set.difference=function(){var $=$B.args("difference",1,{self:null},["self"],arguments,{},"args",null)
if($.args.length==0){return set.copy($.self)}
var res=clone($.self)
for(var i=0;i < $.args.length;i++){res=set.__sub__(res,set.$factory($.args[i]),true)}
return res}
var fc=set.difference+"" 
eval("set.intersection = "+
fc.replace(/difference/g,"intersection").replace("__sub__","__and__"))
eval("set.symmetric_difference = "+
fc.replace(/difference/g,"symmetric_difference").replace("__sub__","__xor__"))
eval("set.union = "+
fc.replace(/difference/g,"union").replace("__sub__","__or__"))
set.issubset=function(){var $=$B.args("issubset",2,{self:null,other:null},["self","other"],arguments,{},"args",null),func=_b_.getattr($.other,"__contains__")
for(var i=0,len=$.self.$items.length;i < len;i++){if(! func($.self.$items[i])){return false}}
return true}
set.issuperset=function(){var $=$B.args("issuperset",2,{self:null,other:null},["self","other"],arguments,{},"args",null)
var func=_b_.getattr($.self,"__contains__"),it=$B.$iter($.other)
while(true){try{var item=_b_.next(it)
if(! func(item)){return false}}catch(err){if(_b_.isinstance(err,_b_.StopIteration)){return true}
throw err}}
return true}
function $accept_only_set(f,op){return function(self,other,accept_iter){$test(accept_iter,other,op)
f(self,other)
return self}}
set.__iand__=$accept_only_set(set.intersection_update,"&=")
set.__isub__=$accept_only_set(set.difference_update,"-=")
set.__ixor__=$accept_only_set(set.symmetric_difference_update,"^=")
set.__ior__=$accept_only_set(set.update,"|=")
set.$factory=function(){
var res={__class__:set,$simple:true,$items:[],$numbers:[],$hashes:{}}
var args=[res].concat(Array.prototype.slice.call(arguments))
set.__init__.apply(null,args)
return res}
$B.set_func_names(set,"builtins")
set.__class_getitem__=_b_.classmethod.$factory(set.__class_getitem__)
var frozenset={__class__:_b_.type,__mro__:[object],$infos:{__module__:"builtins",__name__:"frozenset"},$is_class:true,$native:true}
for(var attr in set){switch(attr){case "add":
case "clear":
case "discard":
case "pop":
case "remove":
case "update":
break
default:
if(frozenset[attr]==undefined){if(typeof set[attr]=="function"){frozenset[attr]=(function(x){return function(){return set[x].apply(null,arguments)}})(attr)}else{frozenset[attr]=set[attr]}}}}
frozenset.__hash__=function(self){if(self===undefined){return frozenset.__hashvalue__ ||$B.$py_next_hash--}
if(self.__hashvalue__ !==undefined){return self.__hashvalue__}
var _hash=1927868237
_hash*=self.$items.length
for(var i=0,len=self.$items.length;i < len;i++){var _h=_b_.hash(self.$items[i])
_hash ^=((_h ^ 89869747)^(_h << 16))*3644798167}
_hash=_hash*69069+907133923
if(_hash==-1){_hash=590923713}
return self.__hashvalue__=_hash}
frozenset.__new__=function(cls){if(cls===undefined){throw _b_.TypeError.$factory(
"frozenset.__new__(): not enough arguments")}
return{
__class__:cls,$simple:true,$items:[],$numbers:[],$hashes:{}}}
frozenset.__repr__=function(self){$B.builtins_repr_check(frozenset,arguments)
return set_repr(self)}
var singleton_id=Math.floor(Math.random()*Math.pow(2,40))
function empty_frozenset(){var res=frozenset.__new__(frozenset)
res.$id=singleton_id
return res}
frozenset.$factory=function(){var $=$B.args("frozenset",1,{iterable:null},["iterable"],arguments,{iterable:null},null,null)
if($.iterable===null){return empty_frozenset()}
else if($.iterable.__class__==frozenset){return $.iterable}
var res=set.$factory($.iterable)
if(res.$items.length==0){return empty_frozenset()}
res.__class__=frozenset
return res}
$B.set_func_names(frozenset,"builtins")
_b_.set=set
_b_.frozenset=frozenset})(__BRYTHON__)
;
;(function($B){var _b_=$B.builtins
var object=_b_.object
var _window=self;
function to_simple(value){switch(typeof value){case 'string':
case 'number':
return value
case 'boolean':
return value ? "true" :"false"
case 'object':
if(value===_b_.None){return 'null'}else if(value instanceof Number){return value.valueOf()}else if(value instanceof String){return value.valueOf()}
default:
console.log("erreur",value)
throw _b_.TypeError.$factory("keys must be str, int, "+
"float, bool or None, not "+$B.class_name(value))}}
$B.pyobj2structuredclone=function(obj,strict){
strict=strict===undefined ? true :strict
if(typeof obj=="boolean" ||typeof obj=="number" ||
typeof obj=="string" ||obj instanceof String){return obj}else if(obj instanceof Number){return obj.valueOf()}else if(obj===_b_.None){return null }else if(Array.isArray(obj)||obj.__class__===_b_.list ||
obj.__class__===_b_.tuple){var res=[]
for(var i=0,len=obj.length;i < len;i++){res.push($B.pyobj2structuredclone(obj[i]))}
return res}else if(_b_.isinstance(obj,_b_.dict)){if(strict){if(Object.keys(obj.$numeric_dict).length > 0 ||
Object.keys(obj.$object_dict).length > 0){throw _b_.TypeError.$factory("a dictionary with non-string "+
"keys does not support structured clone")}}
var items=$B.dict_to_list(obj),res={}
for(var i=0,len=items.length;i < len;i++){res[to_simple(items[i][0])]=$B.pyobj2structuredclone(items[i][1])}
return res}else{return obj}}
$B.structuredclone2pyobj=function(obj){if(obj===null){return _b_.None}else if(obj===undefined){return $B.Undefined}else if(typeof obj=="boolean" ||typeof obj=="number" ||
typeof obj=="string"){return obj}else if(obj instanceof Number ||obj instanceof String){return obj.valueOf()}else if(Array.isArray(obj)||obj.__class__===_b_.list ||
obj.__class__===_b_.tuple){var res=_b_.list.$factory()
for(var i=0,len=obj.length;i < len;i++){res.push($B.structuredclone2pyobj(obj[i]))}
return res}else if(typeof obj=="object"){var res=$B.empty_dict()
for(var key in obj){_b_.dict.$setitem(res,key,$B.structuredclone2pyobj(obj[key]))}
return res}else{console.log(obj,Array.isArray(obj),obj.__class__,_b_.list,obj.__class__===_b_.list)
throw _b_.TypeError.$factory(_b_.str.$factory(obj)+
" does not support the structured clone algorithm")}}
var JSConstructor={__class__:_b_.type,__mro__:[object],$infos:{__module__:"<javascript>",__name__:'JSConstructor'},$is_class:true}
JSConstructor.__call__=function(self){
return function(){var args=[null]
for(var i=0,len=arguments.length;i < len;i++){args.push(pyobj2jsobj(arguments[i]))}
var factory=self.func.bind.apply(self.func,args)
var res=new factory()
return $B.$JS2Py(res)}}
JSConstructor.__getattribute__=function(self,attr){
if(attr=="__call__"){return function(){var args=[null]
for(var i=0,len=arguments.length;i < len;i++){args.push(pyobj2jsobj(arguments[i]))}
var factory=self.func.bind.apply(self.func,args)
var res=new factory()
return $B.$JS2Py(res)}}
return JSObject.__getattribute__(self,attr)}
JSConstructor.$factory=function(obj){return{
__class__:JSConstructor,js:obj,func:obj.js_func}}
var jsobj2pyobj=$B.jsobj2pyobj=function(jsobj){switch(jsobj){case true:
case false:
return jsobj}
if(jsobj===undefined){return $B.Undefined}else if(jsobj===null){return _b_.None}
if(Array.isArray(jsobj)){return _b_.list.$factory(jsobj.map(jsobj2pyobj))}else if(typeof jsobj==='number'){if(jsobj.toString().indexOf('.')==-1){return _b_.int.$factory(jsobj)}
return _b_.float.$factory(jsobj)}else if(typeof jsobj=="string"){return $B.String(jsobj)}else if(typeof jsobj=="function"){
return function(){var args=[]
for(var i=0,len=arguments.length;i < len;i++){args.push(pyobj2jsobj(arguments[i]))}
return jsobj2pyobj(jsobj.apply(null,args))}}
if(jsobj.$nat==='kw'){return jsobj}
if($B.$isNode(jsobj)){return $B.DOMNode.$factory(jsobj)}
return $B.JSObj.$factory(jsobj)}
var pyobj2jsobj=$B.pyobj2jsobj=function(pyobj){
if(pyobj===true ||pyobj===false){return pyobj}
if(pyobj===_b_.None){return null}
if(pyobj===$B.Undefined){return undefined}
var klass=$B.get_class(pyobj)
if(klass===undefined){
return pyobj;}
if(klass===JSConstructor){
if(pyobj.js_func !==undefined){return pyobj.js_func}
return pyobj.js}else if(klass===$B.DOMNode ||
klass.__mro__.indexOf($B.DOMNode)>-1){
return pyobj}else if([_b_.list,_b_.tuple].indexOf(klass)>-1){
var res=[]
pyobj.forEach(function(item){res.push(pyobj2jsobj(item))})
return res}else if(klass===_b_.dict ||_b_.issubclass(klass,_b_.dict)){
var jsobj={}
var items=_b_.list.$factory(_b_.dict.items(pyobj))
items.forEach(function(item){if(typeof item[1]=='function'){
item[1].bind(jsobj)}
jsobj[item[0]]=pyobj2jsobj(item[1])})
return jsobj}else if(klass===_b_.float ||klass===_b_.str){
return pyobj.valueOf()}else if(klass===$B.Function ||klass===$B.method){
if(pyobj.prototype &&
pyobj.prototype.constructor===pyobj &&
! pyobj.$is_func){
return pyobj}
return function(){try{var args=[]
for(var i=0;i < arguments.length;i++){if(arguments[i]===undefined){args.push(_b_.None)}
else{args.push(jsobj2pyobj(arguments[i]))}}
if(pyobj.prototype.constructor===pyobj && ! pyobj.$is_func){var res=new pyobj(...args)}else{var res=pyobj.apply(this,args)}
return pyobj2jsobj(res)}catch(err){if($B.debug > 1){console.log($B.class_name(err)+':',err.args.length > 0 ? err.args[0]:'' )}
throw err}}}else{
return pyobj}}
$B.JSConstructor=JSConstructor
function pyargs2jsargs(pyargs){var args=[]
for(var i=0,len=pyargs.length;i < len;i++){var arg=pyargs[i]
if(arg !==undefined && arg !==null &&
arg.$nat !==undefined){
throw _b_.TypeError.$factory(
"A Javascript function can't take "+
"keyword arguments")}else{args.push($B.pyobj2jsobj(arg))}}
return args}
$B.JSObj=$B.make_class("JSObject",function(jsobj){if(Array.isArray(jsobj)){}else if(typeof jsobj=="function"){jsobj.$is_js_func=true
jsobj.__new__=function(){return new jsobj.$js_func(...arguments)}}else if(typeof jsobj=="number" && ! Number.isInteger(jsobj)){return new Number(jsobj)}
return jsobj}
)
$B.JSObj.__sub__=function(self,other){
if(typeof self=="bigint" && typeof other=="bigint"){return self-other}
throw _b_.TypeError.$factory("unsupported operand type(s) for - : '"+
$B.class_name(self)+"' and '"+$B.class_name(other)+"'")}
var ops={'+':'__add__','*':'__mul__','**':'__pow__','%' :'__mod__'}
for(var op in ops){eval('$B.JSObj.'+ops[op]+' = '+
($B.JSObj.__sub__+'').replace(/-/g,op))}
$B.JSObj.__eq__=function(self,other){switch(typeof self){case "object":
if(self.__eq__ !==undefined){return self.__eq__(other)}
if(Object.keys(self).length !==Object.keys(other).length){return false}
if(self===other){return true}
for(var key in self){if(! $B.JSObj.__eq__(self[key],other[key])){return false}}
default:
return self===other}}
$B.JSObj.__ne__=function(self,other){return ! $B.JSObj.__eq__(self,other)}
$B.JSObj.__getattribute__=function(self,attr){var test=false 
if(test){console.log("__ga__",self,attr)}
if(attr=="new" && typeof self=="function"){
if(self.$js_func){return function(){var args=pyargs2jsargs(arguments)
return $B.JSObj.$factory(new self.$js_func(...args))}}else{return function(){var args=pyargs2jsargs(arguments)
return $B.JSObj.$factory(new self(...args))}}}
var js_attr=self[attr]
if(js_attr==undefined && typeof self=="function" && self.$js_func){js_attr=self.$js_func[attr]}
if(js_attr===undefined){if(typeof self.getNamedItem=='function'){var res=self.getNamedItem(attr)
if(res !==undefined){return $B.JSObj.$factory(res)}}
var klass=$B.get_class(self)
if(klass && klass[attr]){var class_attr=klass[attr]
if(typeof class_attr=="function"){return function(){var args=[self]
for(var i=0,len=arguments.length;i < len;i++){args.push(arguments[i])}
return $B.JSObj.$factory(class_attr.apply(null,args))}}else{return class_attr}}
if(attr=="bind" && typeof self.addEventListener=="function"){return function(event,callback){return self.addEventListener(event,callback)}}
throw $B.attr_error(attr,self)}
if(typeof js_attr==='function'){var res=function(){var args=pyargs2jsargs(arguments),target=self.$js_func ||self
try{var result=js_attr.apply(target,args)}catch(err){console.log("error",err)
console.log("attribute",attr,"of self",self,js_attr,args,arguments)
throw err}
if(result===undefined){return $B.Undefined}else if(result===null){return _b_.None}
return $B.JSObj.$factory(result)}
res.prototype=js_attr.prototype
res.$js_func=js_attr
res.__mro__=[_b_.object]
res.$infos={__name__:js_attr.name,__qualname__:js_attr.name}
if($B.frames_stack.length > 0){res.$infos.__module__=$B.last($B.frames_stack)[3].__name__}
return $B.JSObj.$factory(res)}else{return $B.JSObj.$factory(js_attr)}}
$B.JSObj.__setattr__=function(self,attr,value){self[attr]=$B.pyobj2structuredclone(value)
return _b_.None}
$B.JSObj.__getitem__=function(self,key){if(typeof key=="string"){return $B.JSObj.__getattribute__(self,key)}else if(typeof key=="number"){if(self[key]!==undefined){return $B.JSObj.$factory(self[key])}
if(typeof self.length=='number'){if((typeof key=="number" ||typeof key=="boolean")&&
typeof self.item=='function'){var rank=_b_.int.$factory(key)
if(rank < 0){rank+=self.length}
var res=self.item(rank)
if(res===null){throw _b_.IndexError.$factory(rank)}
return $B.JSObj.$factory(res)}}}else if(key.__class__===_b_.slice &&
typeof self.item=='function'){var _slice=_b_.slice.$conv_for_seq(key,self.length)
var res=[]
for(var i=_slice.start;i < _slice.stop;i+=_slice.step){res.push(self.item(i))}
return res}
throw _b_.KeyError.$factory(rank)}
$B.JSObj.__setitem__=$B.JSObj.__setattr__
var JSObj_iterator=$B.make_iterator_class('JS object iterator')
$B.JSObj.__iter__=function(self){var items=[]
if(_window.Symbol && self[Symbol.iterator]!==undefined){
var items=[]
if(self.next !==undefined){while(true){var nxt=self.next()
if(nxt.done){break}
items.push($B.JSObj.$factory(nxt.value))}}else if(self.length !==undefined && self.item !==undefined){for(var i=0;i < self.length;i++){items.push($B.JSObj.$factory(self.item(i)))}}
return JSObj_iterator.$factory(items)}else if(self.length !==undefined && self.item !==undefined){
for(var i=0;i < self.length;i++){items.push($B.JSObj.$factory(self.js.item(i)))}
return JSObj_iterator.$factory(items)}
return JSObj_iterator.$factory(Object.keys(self))}
$B.JSObj.__len__=function(self){if(typeof self.length=='number'){return self.length}
throw $B.attr_error('__len__',self)}
$B.JSObj.__repr__=$B.JSObj.__str__=function(self){return '<Javascript '+self.constructor.name+' object: '+
self.toString()+'>'}
$B.JSObj.bind=function(self,evt,func){
var js_func=function(ev){return func(jsobj2pyobj(ev))}
self.addEventListener(evt,js_func)
return _b_.None}
$B.JSObj.to_dict=function(self){
return $B.structuredclone2pyobj(self)}
$B.set_func_names($B.JSObj,"builtins")
$B.JSMeta=$B.make_class("JSMeta")
$B.JSMeta.__call__=function(cls){
var extra_args=[],klass=arguments[0]
for(var i=1,len=arguments.length;i < len;i++){extra_args.push(arguments[i])}
var new_func=_b_.type.__getattribute__(klass,"__new__")
var instance=new_func.apply(null,arguments)
if(instance instanceof cls.__mro__[0].$js_func){
var init_func=_b_.type.__getattribute__(klass,"__init__")
if(init_func !==_b_.object.__init__){
var args=[instance].concat(extra_args)
init_func.apply(null,args)}}
return instance}
$B.JSMeta.__mro__=[_b_.type,_b_.object]
$B.JSMeta.__getattribute__=function(cls,attr){if(cls[attr]!==undefined){return cls[attr]}else if($B.JSMeta[attr]!==undefined){return $B.JSMeta[attr]}else{
return _b_.type.__getattribute__(cls,attr)}}
$B.JSMeta.__init_subclass__=function(){}
$B.JSMeta.__new__=function(metaclass,class_name,bases,cl_dict){
eval("var "+class_name+` = function(){
        if(cl_dict.$string_dict.__init__){
            var args = [this]
            for(var i = 0, len = arguments.length; i < len; i++){
                args.push(arguments[i])
            }
            cl_dict.$string_dict.__init__[0].apply(this, args)
        }else{
            return new bases[0].$js_func(...arguments)
        }
    }`)
var new_js_class=eval(class_name)
new_js_class.prototype=Object.create(bases[0].$js_func.prototype)
new_js_class.prototype.constructor=new_js_class
new_js_class.__mro__=[bases[0],_b_.type]
new_js_class.$is_js_class=true
return new_js_class}
$B.set_func_names($B.JSMeta,"builtins")})(__BRYTHON__)
;
;(function($B){$B.stdlib={}
var pylist=['VFS_import','__future__','_codecs','_codecs_jp','_collections','_collections_abc','_compat_pickle','_compression','_contextvars','_csv','_dummy_thread','_frozen_importlib','_functools','_imp','_io','_markupbase','_multibytecodec','_operator','_py_abc','_pydecimal','_queue','_random','_signal','_socket','_sre','_struct','_sysconfigdata','_sysconfigdata_0_brython_','_testcapi','_thread','_threading_local','_weakref','_weakrefset','abc','antigravity','argparse','ast','atexit','base64','bdb','binascii','bisect','browser.aio','browser.ajax','browser.highlight','browser.idbcache','browser.indexed_db','browser.local_storage','browser.markdown','browser.object_storage','browser.session_storage','browser.svg','browser.template','browser.timer','browser.ui','browser.webcomponent','browser.websocket','browser.worker','calendar','cmath','cmd','code','codecs','codeop','colorsys','configparser','contextlib','contextvars','copy','copyreg','csv','dataclasses','datetime','decimal','difflib','doctest','enum','errno','external_import','faulthandler','fnmatch','formatter','fractions','functools','gc','genericpath','getopt','getpass','gettext','glob','gzip','heapq','hmac','imp','inspect','interpreter','io','ipaddress','itertools','keyword','linecache','locale','mimetypes','nntplib','ntpath','numbers','opcode','operator','optparse','os','pathlib','pdb','pickle','pkgutil','platform','posixpath','pprint','profile','pwd','py_compile','pydoc','queue','quopri','re','re1','reprlib','select','selectors','shlex','shutil','signal','site','site-packages.__future__','site-packages.docs','site-packages.header','site-packages.test_sp','socket','sre_compile','sre_constants','sre_parse','stat','statistics','string','stringprep','struct','subprocess','symtable','sys','sysconfig','tabnanny','tarfile','tb','tempfile','test.crashers.bogus_code_obj','test.crashers.gc_inspection','test.crashers.infinite_loop_re','test.crashers.mutation_inside_cyclegc','test.crashers.recursive_call','test.crashers.trace_at_recursion_limit','test.crashers.underlying_dict','test.namespace_pkgs.module_and_namespace_package.a_test','test.subprocessdata.fd_status','test.subprocessdata.input_reader','test.subprocessdata.qcat','test.subprocessdata.qgrep','test.subprocessdata.sigchild_ignore','textwrap','this','threading','time','timeit','token','tokenize','traceback','turtle','types','typing','uu','uuid','warnings','weakref','webbrowser','zipfile','zipimport','zlib']
for(var i=0;i < pylist.length;i++){$B.stdlib[pylist[i]]=['py']}
var js=['_aio','_ajax','_ast','_base64','_binascii','_io_classes','_json','_jsre','_locale','_multiprocessing','_posixsubprocess','_profile','_sre','_sre_utils','_string','_strptime','_svg','_symtable','_webcomponent','_webworker','_zlib_utils','aes','array','bry_re','builtins','dis','encoding_cp932','hashlib','hmac-md5','hmac-ripemd160','hmac-sha1','hmac-sha224','hmac-sha256','hmac-sha3','hmac-sha384','hmac-sha512','html_parser','long_int','marshal','math','md5','modulefinder','pbkdf2','posix','python_re','rabbit','rabbit-legacy','random','rc4','ripemd160','sha1','sha224','sha256','sha3','sha384','sha512','tripledes','unicodedata']
for(var i=0;i < js.length;i++){$B.stdlib[js[i]]=['js']}
var pkglist=['browser','browser.widgets','collections','concurrent','concurrent.futures','email','email.mime','encodings','html','http','importlib','json','logging','multiprocessing','multiprocessing.dummy','pydoc_data','site-packages.foobar','site-packages.simpleaio','site-packages.ui','test','test.encoded_modules','test.leakers','test.libregrtest','test.namespace_pkgs.not_a_namespace_pkg.foo','test.support','test.test_asyncio','test.test_email','test.test_import','test.test_import.data.package','test.test_import.data.unwritable','test.test_importlib','test.test_importlib.builtin','test.test_importlib.data','test.test_importlib.data01','test.test_importlib.data01.subdirectory','test.test_importlib.data02','test.test_importlib.data02.one','test.test_importlib.data02.two','test.test_importlib.data03','test.test_importlib.data03.namespace.portion1','test.test_importlib.data03.namespace.portion2','test.test_importlib.extension','test.test_importlib.frozen','test.test_importlib.import_','test.test_importlib.namespace_pkgs.not_a_namespace_pkg.foo','test.test_importlib.source','test.test_importlib.zipdata01','test.test_importlib.zipdata02','test.test_json','test.test_peg_generator','test.test_tools','test.test_warnings','test.test_zoneinfo','test.tracedmodules','unittest','unittest.test','unittest.test.testmock','urllib']
for(var i=0;i < pkglist.length;i++){$B.stdlib[pkglist[i]]=['py',true]}})(__BRYTHON__)
;

;(function($B){var _b_=$B.builtins,_window=self
var Module=$B.module=$B.make_class("module",function(name,doc,$package){var obj=Object.create(null)
obj.__class__=Module
obj.__name__=name
obj.__doc__=doc ||_b_.None
obj. __package__=$package ||_b_.None
return obj}
)
Module.__new__=function(cls,name,doc,$package){return{
__class__:cls,__name__:name,__doc__:doc ||_b_.None,__package__:$package ||_b_.None}}
Module.__repr__=Module.__str__=function(self){var res="<module "+self.__name__
res+=self.__file__===undefined ? " (built-in)" :
' at '+self.__file__
return res+">"}
Module.__setattr__=function(self,attr,value){if(self.__name__=="__builtins__"){
$B.builtins[attr]=value}else{self[attr]=value}}
$B.set_func_names(Module,"builtins")
function $download_module(mod,url,$package){var xhr=new XMLHttpRequest(),fake_qs="?v="+(new Date().getTime()),res=null,mod_name=mod.__name__
if(mod_name=='exec'){console.log('download exec ???',$B.frames_stack.slice())}
var timer=_window.setTimeout(function(){xhr.abort()},5000)
if($B.$options.cache){xhr.open("GET",url,false)}else{xhr.open("GET",url+fake_qs,false)}
xhr.send()
if($B.$CORS){if(xhr.status==200 ||xhr.status==0){res=xhr.responseText}else{res=_b_.ModuleNotFoundError.$factory("No module named '"+
mod_name+"'")}}else{if(xhr.readyState==4){if(xhr.status==200){res=xhr.responseText
mod.$last_modified=
xhr.getResponseHeader("Last-Modified")}else{
console.info("Error "+xhr.status+
" means that Python module "+mod_name+
" was not found at url "+url)
res=_b_.ModuleNotFoundError.$factory("No module named '"+
mod_name+"'")}}}
_window.clearTimeout(timer)
if(res==null){throw _b_.ModuleNotFoundError.$factory("No module named '"+
mod_name+"' (res is null)")}
if(res.constructor===Error){throw res}
return res}
$B.$download_module=$download_module
function import_js(mod,path){try{var module_contents=$download_module(mod,path,undefined)}catch(err){return null}
run_js(module_contents,path,mod)
return true}
function run_js(module_contents,path,_module){
var module_id="$locals_"+_module.__name__.replace(/\./g,'_')
try{var $module=new Function(module_id,module_contents+";\nreturn $module")(_module)
if($B.$options.store){_module.$js=module_contents}}catch(err){console.log(err)
console.log(path,_module)
throw err}
try{$module}
catch(err){console.log("no $module")
throw _b_.ImportError.$factory("name '$module' not defined in module")}
$module.__name__=_module.__name__
for(var attr in $module){if(typeof $module[attr]=="function"){$module[attr].$infos={__module__:_module.__name__,__name__:attr,__qualname__:attr}
$module[attr].$in_js_module=true}}
if(_module !==undefined){
for(var attr in $module){_module[attr]=$module[attr]}
$module=_module
$module.__class__=Module }else{
$module.__class__=Module
$module.__name__=_module.__name__
$module.__repr__=$module.__str__=function(){if($B.builtin_module_names.indexOf(_module.name)>-1){return "<module '"+_module.__name__+"' (built-in)>"}
return "<module '"+_module.__name__+"' from "+path+" >"}
if(_module.name !="builtins"){
$module.__file__=path}}
$B.imported[_module.__name__]=$module
return true}
function show_ns(){var kk=Object.keys(_window)
for(var i=0,len=kk.length;i < len;i++){console.log(kk[i])
if(kk[i].charAt(0)=="$"){console.log(eval(kk[i]))}}
console.log("---")}
function run_py(module_contents,path,module,compiled){
$B.file_cache[path]=module_contents
$B.url2name[path]=module.__name__
var root,js,mod_name=module.__name__ 
if(! compiled){var $Node=$B.$Node,$NodeJSCtx=$B.$NodeJSCtx
var src={src:module_contents,has_annotations:false,filename:path}
try{root=$B.py2js(src,module,module.__name__,$B.builtins_scope)}catch(err){if($B.debug > 1){console.log('error in imported module',module)
console.log('stack',$B.frames_stack.slice())}
err.$stack=$B.frames_stack.slice()
throw err}}
try{js=compiled ? module_contents :root.to_js()
if($B.$options.debug==10){console.log("code for module "+module.__name__)
console.log($B.format_indent(js,0))}
var src=js
js="var $module = (function(){\n"+js
var prefix='locals_'
js+='return '+prefix
js+=module.__name__.replace(/\./g,"_")+"})(__BRYTHON__)\n"+
"return $module"
var module_id=prefix+module.__name__.replace(/\./g,'_')
var $module=(new Function(module_id,js))(module)}catch(err){if($B.debug > 1){console.log(err+" for module "+module.__name__)
console.log("module",module)
console.log(root)
if($B.debug > 1){console.log($B.format_indent(js,0))}
for(var attr in err){console.log(attr,err[attr])}
console.log("message: "+err.$message)
console.log("filename: "+err.fileName)
console.log("linenum: "+err.lineNumber)
console.log(err.stack)}
throw err}finally{$B.clear_ns(module.__name__)}
try{
var mod=eval("$module")
for(var attr in mod){module[attr]=mod[attr]}
module.__initializing__=false
$B.imported[module.__name__]=module
return{
content:src,name:mod_name,imports:Object.keys(root.imports).join(",")}}catch(err){console.log(""+err+" "+" for module "+module.__name__)
for(var attr in err){console.log(attr+" "+err[attr])}
if($B.debug > 0){console.log("line info "+__BRYTHON__.line_info)}
throw err}}
$B.run_py=run_py 
$B.run_js=run_js
var ModuleSpec=$B.make_class("ModuleSpec",function(fields){fields.__class__=ModuleSpec
return fields}
)
ModuleSpec.__str__=ModuleSpec.__repr__=function(self){var res=`ModuleSpec(name='${self.name}', `+
`loader=${_b_.str.$factory(self.loader)}, `+
`origin='${self.origin}'`
if(self.submodule_search_locations !==_b_.None){res+=`, submodule_search_locations=`+
`${_b_.str.$factory(self.submodule_search_locations)}`}
return res+')'}
$B.set_func_names(ModuleSpec,"builtins")
function parent_package(mod_name){
var parts=mod_name.split(".")
parts.pop()
return parts.join(".")}
var VFSFinder=$B.make_class("VFSFinder",function(){return{
__class__:VFSFinder}}
)
VFSFinder.find_spec=function(cls,fullname,path){var stored,is_package,timestamp
if(!$B.use_VFS){return _b_.None}
stored=$B.VFS[fullname]
if(stored===undefined){return _b_.None}
is_package=stored[3]||false
timestamp=stored.timestamp
if(stored){var is_builtin=$B.builtin_module_names.indexOf(fullname)>-1
return ModuleSpec.$factory({name :fullname,loader:VFSLoader.$factory(),
origin :is_builtin? "built-in" :"brython_stdlib",
submodule_search_locations:is_package?[]:_b_.None,loader_state:{stored:stored,timestamp:timestamp},
cached:_b_.None,parent:is_package? fullname :parent_package(fullname),has_location:_b_.False})}}
$B.set_func_names(VFSFinder,"<import>")
for(var method in VFSFinder){if(typeof VFSFinder[method]=="function"){VFSFinder[method]=_b_.classmethod.$factory(
VFSFinder[method])}}
VFSLoader=$B.make_class("VFSLoader",function(){return{
__class__:VFSLoader}}
)
VFSLoader.create_module=function(self,spec){
return _b_.None}
VFSLoader.exec_module=function(self,modobj){
var stored=modobj.__spec__.loader_state.stored,timestamp=modobj.__spec__.loader_state.timestamp
delete modobj.__spec__["loader_state"]
var ext=stored[0],module_contents=stored[1],imports=stored[2]
modobj.$is_package=stored[3]||false
var path="VFS."+modobj.__name__
path+=modobj.$is_package ? "/__init__.py" :ext
modobj.__file__=path
$B.file_cache[modobj.__file__]=$B.VFS[modobj.__name__][1]
$B.url2name[modobj.__file__]=modobj.__name__
if(ext=='.js'){run_js(module_contents,modobj.__path__,modobj)}else if($B.precompiled.hasOwnProperty(modobj.__name__)){if($B.debug > 1){console.info("load",modobj.__name__,"from precompiled")}
var parts=modobj.__name__.split(".")
for(var i=0;i < parts.length;i++){var parent=parts.slice(0,i+1).join(".")
if($B.imported.hasOwnProperty(parent)&&
$B.imported[parent].__initialized__){continue}
var mod_js=$B.precompiled[parent],is_package=modobj.$is_package
if(mod_js===undefined){
continue}
if(Array.isArray(mod_js)){mod_js=mod_js[0]}
var mod=$B.imported[parent]=Module.$factory(parent,undefined,is_package)
mod.__initialized__=true
if(is_package){mod.__path__="<stdlib>"
mod.__package__=parent
mod.$is_package=true}else{var elts=parent.split(".")
elts.pop()
mod.__package__=elts.join(".")}
mod.__file__=path
try{var parent_id=parent.replace(/\./g,"_"),prefix='locals_'
mod_js+="return "+prefix+parent_id
var $module=new Function(prefix+parent_id,mod_js)(
mod)}catch(err){if($B.debug > 1){console.log('error in module',mod)
console.log(err)
for(var k in err){console.log(k,err[k])}
console.log(Object.keys($B.imported))
if($B.debug > 1){console.log(modobj,"mod_js",mod_js)}}
throw err}
for(var attr in $module){mod[attr]=$module[attr]}
$module.__file__=path
if(i > 0){
$B.builtins.setattr(
$B.imported[parts.slice(0,i).join(".")],parts[i],$module)}}
return $module}else{var mod_name=modobj.__name__
if($B.debug > 1){console.log("run Python code from VFS",mod_name)}
var record=run_py(module_contents,modobj.__file__,modobj)
record.imports=imports.join(',')
record.is_package=modobj.$is_package
record.timestamp=$B.timestamp
record.source_ts=timestamp
$B.precompiled[mod_name]=record.is_package ?[record.content]:
record.content
var elts=mod_name.split(".")
if(elts.length > 1){elts.pop()}
if($B.$options.indexedDB && $B.indexedDB &&
$B.idb_name){
var idb_cx=indexedDB.open($B.idb_name)
idb_cx.onsuccess=function(evt){var db=evt.target.result,tx=db.transaction("modules","readwrite"),store=tx.objectStore("modules"),cursor=store.openCursor(),request=store.put(record)
request.onsuccess=function(){if($B.debug > 1){console.info(modobj.__name__,"stored in db")}}
request.onerror=function(){console.info("could not store "+modobj.__name__)}}}}}
$B.set_func_names(VFSLoader,"builtins")
var finder_cpython={__class__:_b_.type,__mro__:[_b_.object],$infos:{__module__:"builtins",__name__:"CPythonFinder"},create_module :function(cls,spec){
return _b_.None},exec_module :function(cls,modobj){console.log("exec PYthon module",modobj)
var loader_state=modobj.__spec__.loader_state
var content=loader_state.content
delete modobj.__spec__["loader_state"]
modobj.$is_package=loader_state.is_package
modobj.__file__=loader_state.__file__
$B.file_cache[modobj.__file__]=content
$B.url2file[modobj.__file__]=modobj.__name__
var mod_name=modobj.__name__
if($B.debug > 1){console.log("run Python code from CPython",mod_name)}
run_py(content,modobj.__path__,modobj)},find_module:function(cls,name,path){return{
__class__:Loader,load_module:function(name,path){var spec=cls.find_spec(cls,name,path)
var mod=Module.$factory(name)
$B.imported[name]=mod
mod.__spec__=spec
cls.exec_module(cls,mod)}}},find_spec :function(cls,fullname,path){console.log("finder cpython",fullname)
var xhr=new XMLHttpRequest(),url="/cpython_import?module="+fullname,result
xhr.open("GET",url,false)
xhr.onreadystatechange=function(){if(this.readyState==4 && this.status==200){var data=JSON.parse(this.responseText)
result=ModuleSpec.$factory({name :fullname,loader:cls,
origin :"CPython",
submodule_search_locations:data.is_package?[]:_b_.None,loader_state:{content:data.content},
cached:_b_.None,parent:data.is_package? fullname :parent_package(fullname),has_location:_b_.False})}}
xhr.send()
return result}}
$B.set_func_names(finder_cpython,"<import>")
for(var method in finder_cpython){if(typeof finder_cpython[method]=="function"){finder_cpython[method]=_b_.classmethod.$factory(
finder_cpython[method])}}
finder_cpython.$factory=function(){return{__class__:finder_cpython}}
var StdlibStaticFinder=$B.make_class("StdlibStaticFinder",function(){return{
__class__:StdlibStaticFinder}}
)
StdlibStaticFinder.find_spec=function(self,fullname,path){
if($B.stdlib && $B.$options.static_stdlib_import){var address=$B.stdlib[fullname]
if(address===undefined){var elts=fullname.split(".")
if(elts.length > 1){elts.pop()
var $package=$B.stdlib[elts.join(".")]
if($package && $package[1]){address=["py"]}}}
if(address !==undefined){var ext=address[0],is_pkg=address[1]!==undefined,path=$B.brython_path+
((ext=="py")? "Lib/" :"libs/")+
fullname.replace(/\./g,"/"),metadata={ext:ext,is_package:is_pkg,path:path+(is_pkg? "/__init__.py" :
((ext=="py")? ".py" :".js")),address:address},_module=Module.$factory(fullname)
metadata.code=$download_module(_module,metadata.path)
var res=ModuleSpec.$factory({name :fullname,loader:PathLoader.$factory(),
origin :metadata.path,submodule_search_locations:is_pkg?[path]:_b_.None,loader_state:metadata,
cached:_b_.None,parent:is_pkg ? fullname :parent_package(fullname),has_location:_b_.True})
return res}}
return _b_.None}
$B.set_func_names(StdlibStaticFinder,"<import>")
for(var method in StdlibStaticFinder){if(typeof StdlibStaticFinder[method]=="function"){StdlibStaticFinder[method]=_b_.classmethod.$factory(
StdlibStaticFinder[method])}}
StdlibStaticFinder.$factory=function(){return{__class__:StdlibStaticFinder}}
var PathFinder=$B.make_class("PathFinder",function(){return{
__class__:PathFinder}}
)
PathFinder.find_spec=function(cls,fullname,path){if($B.VFS && $B.VFS[fullname]){
return _b_.None}
if($B.is_none(path)){
path=$B.path}
for(var i=0,li=path.length;i < li;++i){var path_entry=path[i]
if(path_entry[path_entry.length-1]!="/"){path_entry+="/"}
var finder=$B.path_importer_cache[path_entry]
if(finder===undefined){
for(var j=0,lj=$B.path_hooks.length;j < lj;++j){var hook=$B.path_hooks[j]
try{finder=$B.$call(hook)(path_entry)
$B.path_importer_cache[path_entry]=finder
break}catch(e){if(e.__class__ !==_b_.ImportError){throw e}}}}
if($B.is_none(finder)){continue}
var find_spec=$B.$getattr(finder,"find_spec"),spec=$B.$call(find_spec)(fullname)
if(!$B.is_none(spec)){return spec}}
return _b_.None}
$B.set_func_names(PathFinder,"<import>")
for(var method in PathFinder){if(typeof PathFinder[method]=="function"){PathFinder[method]=_b_.classmethod.$factory(
PathFinder[method])}}
var PathEntryFinder=$B.make_class("PathEntryFinder",function(path_entry,hint){return{
__class__:PathEntryFinder,path_entry:path_entry,hint:hint}}
)
PathEntryFinder.find_spec=function(self,fullname){
var loader_data={},notfound=true,hint=self.hint,base_path=self.path_entry+fullname.match(/[^.]+$/g)[0],modpaths=[],py_ext=$B.$options.python_extension 
var tryall=hint===undefined
if(tryall ||hint=='py'){
modpaths=modpaths.concat([[base_path+py_ext,"py",false],[base_path+"/__init__"+py_ext,"py",true]])}
for(var j=0;notfound && j < modpaths.length;++j){try{var file_info=modpaths[j],module={__name__:fullname,$is_package:false}
loader_data.code=$download_module(module,file_info[0],undefined)
notfound=false
loader_data.ext=file_info[1]
loader_data.is_package=file_info[2]
if(hint===undefined){self.hint=file_info[1]
$B.path_importer_cache[self.path_entry]=self}
if(loader_data.is_package){
$B.path_importer_cache[base_path+'/']=
$B.$call(url_hook)(base_path+'/',self.hint)}
loader_data.path=file_info[0]}catch(err){if(err.__class__ !==_b_.ModuleNotFoundError){throw err}}}
if(!notfound){return ModuleSpec.$factory({name :fullname,loader:PathLoader.$factory(),origin :loader_data.path,
submodule_search_locations:loader_data.is_package?
[base_path]:_b_.None,loader_state:loader_data,
cached:_b_.None,parent:loader_data.is_package? fullname :
parent_package(fullname),has_location:_b_.True})}
return _b_.None}
$B.set_func_names(PathEntryFinder,"builtins")
var PathLoader=$B.make_class("PathLoader",function(){return{
__class__:PathLoader}}
)
PathLoader.create_module=function(self,spec){
return _b_.None}
PathLoader.exec_module=function(self,module){
var metadata=module.__spec__.loader_state
module.$is_package=metadata.is_package
if(metadata.ext=="py"){run_py(metadata.code,metadata.path,module)}else{run_js(metadata.code,metadata.path,module)}}
var url_hook=$B.url_hook=function(path_entry){
path_entry=path_entry.endsWith("/")? path_entry :path_entry+"/"
return PathEntryFinder.$factory(path_entry)}
function import_engine(mod_name,_path,from_stdlib){
var meta_path=$B.meta_path.slice(),_sys_modules=$B.imported,_loader,spec
if(from_stdlib){
var path_ix=meta_path.indexOf($B.finders["path"])
if(path_ix >-1){meta_path.splice(path_ix,1)}}
for(var i=0,len=meta_path.length;i < len;i++){var _finder=meta_path[i],find_spec=$B.$getattr(_finder,"find_spec",_b_.None)
if(find_spec==_b_.None){
var find_module=$B.$getattr(_finder,"find_module",_b_.None)
if(find_module !==_b_.None){_loader=find_module(mod_name,_path)
if(_loader !==_b_.None){
var load_module=$B.$getattr(_loader,"load_module"),module=$B.$call(load_module)(mod_name)
_sys_modules[mod_name]=module
return module}}}else{spec=find_spec(mod_name,_path)
if(!$B.is_none(spec)){module=$B.imported[spec.name]
if(module !==undefined){
return _sys_modules[spec.name]=module}
_loader=$B.$getattr(spec,"loader",_b_.None)
break}}}
if(_loader===undefined){
message=mod_name
if($B.protocol=="file"){message+=" (warning: cannot import local files with protocol 'file')"}
var exc=_b_.ModuleNotFoundError.$factory(message)
exc.name=mod_name
throw exc}
if($B.is_none(module)){if(spec===_b_.None){throw _b_.ModuleNotFoundError.$factory(mod_name)}
var _spec_name=$B.$getattr(spec,"name")
if(!$B.is_none(_loader)){var create_module=$B.$getattr(_loader,"create_module",_b_.None)
if(!$B.is_none(create_module)){module=$B.$call(create_module)(spec)}}
if(module===undefined){throw _b_.ImportError.$factory(mod_name)}
if($B.is_none(module)){
module=$B.module.$factory(mod_name)
var mod_desc=$B.$getattr(spec,"origin")
if($B.$getattr(spec,"has_location")){mod_desc="from '"+mod_desc+"'"}else{mod_desc="("+mod_desc+")"}}}
module.__name__=_spec_name
module.__loader__=_loader
module.__package__=$B.$getattr(spec,"parent","")
module.__spec__=spec
var locs=$B.$getattr(spec,"submodule_search_locations")
if(module.$is_package=!$B.is_none(locs)){module.__path__=locs}
if($B.$getattr(spec,"has_location")){module.__file__=$B.$getattr(spec,"origin")}
var cached=$B.$getattr(spec,"cached")
if(! $B.is_none(cached)){module.__cached__=cached}
if($B.is_none(_loader)){if(!$B.is_none(locs)){_sys_modules[_spec_name]=module}else{throw _b_.ImportError.$factory(mod_name)}}else{var exec_module=$B.$getattr(_loader,"exec_module",_b_.None)
if($B.is_none(exec_module)){
module=$B.$getattr(_loader,"load_module")(_spec_name)}else{_sys_modules[_spec_name]=module
try{exec_module(module)}catch(e){delete _sys_modules[_spec_name]
throw e}}}
return _sys_modules[_spec_name]}
$B.path_importer_cache={}
function import_error(mod_name){var exc=_b_.ImportError.$factory(mod_name)
exc.name=mod_name
throw exc}
$B.$__import__=function(mod_name,globals,locals,fromlist,level){var $test=false 
if($test){console.log("__import__",mod_name,'fromlist',fromlist);alert()}
var from_stdlib=false
if(globals.$jsobj && globals.$jsobj.__file__){var file=globals.$jsobj.__file__
if((file.startsWith($B.brython_path+"Lib/")&&
! file.startsWith($B.brython_path+"Lib/site-packages/"))||
file.startsWith($B.brython_path+"libs/")||
file.startsWith("VFS.")){from_stdlib=true}}
var modobj=$B.imported[mod_name],parsed_name=mod_name.split('.'),has_from=fromlist.length > 0
if(modobj==_b_.None){
import_error(mod_name)}
if(modobj===undefined){
if($B.is_none(fromlist)){fromlist=[]}
for(var i=0,modsep="",_mod_name="",len=parsed_name.length-1,__path__=_b_.None;i <=len;++i){var _parent_name=_mod_name;
_mod_name+=modsep+parsed_name[i]
modsep="."
var modobj=$B.imported[_mod_name]
if($test){console.log("iter",i,_mod_name,"\nmodobj",modobj,"\n__path__",__path__,Array.isArray(__path__))
alert()}
if(modobj==_b_.None){
import_error(_mod_name)}else if(modobj===undefined){try{import_engine(_mod_name,__path__,from_stdlib)}catch(err){delete $B.imported[_mod_name]
throw err}
if($B.is_none($B.imported[_mod_name])){import_error(_mod_name)}else{
if(_parent_name){_b_.setattr($B.imported[_parent_name],parsed_name[i],$B.imported[_mod_name])}}}else if($B.imported[_parent_name]&&
$B.imported[_parent_name][parsed_name[i]]===undefined){
_b_.setattr($B.imported[_parent_name],parsed_name[i],$B.imported[_mod_name])}
if(i < len){try{__path__=$B.$getattr($B.imported[_mod_name],"__path__")}catch(e){
if(i==len-1 &&
$B.imported[_mod_name][parsed_name[len]]&&
$B.imported[_mod_name][parsed_name[len]].__class__===
$B.module){return $B.imported[_mod_name][parsed_name[len]]}
if(has_from){
import_error(mod_name)}else{
var exc=_b_.ModuleNotFoundError.$factory()
exc.msg="No module named '"+mod_name+"'; '"+
_mod_name+"' is not a package"
exc.args=$B.fast_tuple([exc.msg])
exc.name=mod_name
exc.path=_b_.None
throw exc}}}}}else{if($B.imported[parsed_name[0]]&&
parsed_name.length==2){try{if($B.imported[parsed_name[0]][parsed_name[1]]===undefined){$B.$setattr($B.imported[parsed_name[0]],parsed_name[1],modobj)}}catch(err){console.log("error",parsed_name,modobj)
throw err}}}
if(fromlist.length > 0){
return $B.imported[mod_name]}else{
return $B.imported[parsed_name[0]]}}
$B.$import=function(mod_name,fromlist,aliases,locals){
var test=false 
if(test){console.log('mod name',mod_name,'fromlist',fromlist)
alert()}
var level=0,frame=$B.last($B.frames_stack),current_module=frame[2],parts=current_module.split('.')
while(mod_name.length > 0 && mod_name.startsWith('.')){level++
mod_name=mod_name.substr(1)
if(parts.length==0){throw _b_.ImportError.$factory("Parent module '' not loaded, "+
"cannot perform relative import")}
current_module=parts.join('.')
parts.pop()}
if(level > 0){mod_name=current_module+
(mod_name.length > 0 ? '.'+mod_name :'')}
var parts=mod_name.split(".")
if(mod_name[mod_name.length-1]=="."){parts.pop()}
var norm_parts=[],prefix=true
for(var i=0,len=parts.length;i < len;i++){var p=parts[i]
if(prefix && p==""){
elt=norm_parts.pop()
if(elt===undefined){throw _b_.ImportError.$factory("Parent module '' not loaded, "+
"cannot perform relative import")}}else{prefix=false;
norm_parts.push(p)}}
var mod_name=norm_parts.join(".")
fromlist=fromlist===undefined ?[]:fromlist
aliases=aliases===undefined ?{}:aliases
locals=locals===undefined ?{}:locals
if(test){console.log('step 2, mod_name',mod_name,'fromlist',fromlist)
alert()}
if($B.$options.debug==10){console.log("$import "+mod_name)
console.log("use VFS ? "+$B.use_VFS)
console.log("use static stdlib paths ? "+$B.static_stdlib_import)}
var current_frame=$B.frames_stack[$B.frames_stack.length-1],_globals=current_frame[3],__import__=_globals["__import__"],globals=$B.obj_dict(_globals)
if(__import__===undefined){
__import__=$B.$__import__}
var importer=typeof __import__=="function" ?
__import__ :
$B.$getattr(__import__,"__call__")
if(test){console.log('use importer',importer,'mod_name',mod_name,'fromlist',fromlist)
alert()}
var modobj=importer(mod_name,globals,undefined,fromlist,0)
if(test){console.log('step 3, mod_name',mod_name,'fromlist',fromlist)
alert()}
if(! fromlist ||fromlist.length==0){
var alias=aliases[mod_name]
if(alias){locals[alias]=$B.imported[mod_name]}else{locals[norm_parts[0]]=modobj}}else{var __all__=fromlist,thunk={}
if(fromlist && fromlist[0]=="*"){if(test){console.log('import *',modobj)
alert()}
__all__=$B.$getattr(modobj,"__all__",thunk);
if(__all__ !==thunk){
aliases={}}}
if(__all__===thunk){
for(var attr in modobj){if(attr[0]!=="_"){locals[attr]=modobj[attr]}}}else{
for(var i=0,l=__all__.length;i < l;++i){var name=__all__[i]
var alias=aliases[name]||name
try{
locals[alias]=$B.$getattr(modobj,name)}catch($err1){if(! $B.is_exc($err1,[_b_.AttributeError])){throw $err1}
try{$B.$getattr(__import__,'__call__')(mod_name+'.'+name,globals,undefined,[],0)
locals[alias]=$B.$getattr(modobj,name)}catch($err3){
if(mod_name==="__future__"){
var frame=$B.last($B.frames_stack),line_info=frame[3].$line_info ||
frame[1].$lineinfo+','+frame[2],line_elts=line_info.split(','),line_num=parseInt(line_elts[0])
var exc=_b_.SyntaxError.$factory(
"future feature "+name+" is not defined")
throw exc}
if($err3.$py_error){throw $err3}
if($B.debug > 1){console.log($err3)
console.log($B.last($B.frames_stack))}
throw _b_.ImportError.$factory(
"cannot import name '"+name+"'")}}}}
return locals}}
$B.$import_from=function(module,names,aliases,level,locals){
var current_module_name=$B.last($B.frames_stack)[2],parts=current_module_name.split('.'),relative=level > 0
if(relative){
var current_module=$B.imported[parts.join('.')]
if(current_module===undefined){throw _b_.ImportError.$factory(
'attempted relative import with no known parent package')}
if(! current_module.$is_package){if(parts.length==1){throw _b_.ImportError.$factory(
'attempted relative import with no known parent package')}else{parts.pop()
current_module=$B.imported[parts.join('.')]}}else{parts.pop()}
level--
while(level > 0){var current_module=$B.imported[parts.join('.')]
if(! current_module.$is_package){throw _b_.ImportError.$factory(
'attempted relative import with no known parent package')}
level--
parts.pop()}
if(module){
var submodule=current_module.__name__+'.'+module
$B.$import(submodule,[],{},{})
current_module=$B.imported[submodule]}
if(names.length > 0 && names[0]=='*'){
for(var key in current_module){if(key.startsWith('$')||key.startsWith('_')){continue}
locals[key]=current_module[key]}}else{for(var name of names){var alias=aliases[name]||name
if(current_module[name]!==undefined){
locals[alias]=current_module[name]}else{
var sub_module=current_module.__name__+'.'+name
$B.$import(sub_module,[],{},{})
locals[alias]=$B.imported[sub_module]}}}}else{
$B.$import(module,names,aliases,locals)}}
$B.import_all=function(locals,module){
for(var attr in module){if('_$'.indexOf(attr.charAt(0))==-1){locals[attr]=module[attr]}}}
$B.$path_hooks=[url_hook]
$B.$meta_path=[VFSFinder,StdlibStaticFinder,PathFinder]
$B.finders={VFS:VFSFinder,stdlib_static:StdlibStaticFinder,path:PathFinder,CPython:finder_cpython}
function optimize_import_for_path(path,filetype){if(path.slice(-1)!="/"){path=path+"/" }
var value=(filetype=='none')? _b_.None :
url_hook(path,filetype)
$B.path_importer_cache[path]=value}
var Loader={__class__:$B.$type,__mro__:[_b_.object],__name__ :"Loader"}
var _importlib_module={__class__ :Module,__name__ :"_importlib",Loader:Loader,VFSFinder:VFSFinder,StdlibStatic:StdlibStaticFinder,ImporterPath:PathFinder,UrlPathFinder:url_hook,optimize_import_for_path :optimize_import_for_path}
_importlib_module.__repr__=_importlib_module.__str__=function(){return "<module '_importlib' (built-in)>"}
$B.imported["_importlib"]=_importlib_module})(__BRYTHON__)
;

var $B=__BRYTHON__
$B.unicode={"Cc":[[0,32],[127,33]],"Zs":[32,160,5760,[8192,11],8239,8287,12288],"Po":[[33,3],[37,3],[42,3,2],47,58,59,63,64,92,161,167,182,183,191,894,903,[1370,6],1417,[1472,3,3],1523,1524,1545,1546,1548,1549,1563,1566,1567,[1642,4],1748,[1792,14],[2039,3],[2096,15],2142,2404,2405,2416,2557,2678,2800,3191,3204,3572,3663,3674,3675,[3844,15],3860,3973,[4048,5],4057,4058,[4170,6],4347,[4960,9],5742,[5867,3],5941,5942,[6100,3],[6104,3],[6144,6],[6151,4],6468,6469,6686,6687,[6816,7],[6824,6],[7002,7],[7164,4],[7227,5],7294,7295,[7360,8],7379,8214,8215,[8224,8],[8240,9],[8251,4],[8257,3],[8263,11],8275,[8277,10],[11513,4],11518,11519,11632,11776,11777,[11782,3],11787,[11790,9],11800,11801,11803,11806,11807,[11818,5],[11824,10],[11836,4],11841,[11843,13],11858,[12289,3],12349,12539,42238,42239,[42509,3],42611,42622,[42738,6],[43124,4],43214,43215,[43256,3],43260,43310,43311,43359,[43457,13],43486,43487,[43612,4],43742,43743,43760,43761,44011,[65040,7],65049,65072,65093,65094,[65097,4],[65104,3],[65108,4],[65119,3],65128,65130,65131,[65281,3],[65285,3],[65290,3,2],65295,65306,65307,65311,65312,65340,65377,65380,65381,[65792,3],66463,66512,66927,67671,67871,67903,[68176,9],68223,[68336,7],[68409,7],[68505,4],[69461,5],[69703,7],69819,69820,[69822,4],[69952,4],70004,70005,[70085,4],70093,70107,[70109,3],[70200,6],70313,[70731,5],70746,70747,70749,70854,[71105,23],[71233,3],[71264,13],[71484,3],71739,[72004,3],72162,[72255,8],[72346,3],[72350,5],[72769,5],72816,72817,73463,73464,73727,[74864,5],92782,92783,92917,[92983,5],92996,[93847,4],94178,113823,[121479,5],125278,125279],"Sc":[36,[162,4],1423,1547,2046,2047,2546,2547,2555,2801,3065,3647,6107,[8352,32],43064,65020,65129,65284,65504,65505,65509,65510,[73693,4],123647,126128],"Ps":[40,91,123,3898,3900,5787,8218,8222,8261,8317,8333,8968,8970,9001,[10088,7,2],10181,[10214,5,2],[10627,11,2],10712,10714,10748,[11810,4,2],11842,[12296,5,2],[12308,4,2],12317,64831,65047,[65077,8,2],65095,[65113,3,2],65288,65339,65371,65375,65378],"Pe":[41,93,125,3899,3901,5788,8262,8318,8334,8969,8971,9002,[10089,7,2],10182,[10215,5,2],[10628,11,2],10713,10715,10749,[11811,4,2],[12297,5,2],[12309,4,2],12318,12319,64830,65048,[65078,8,2],65096,[65114,3,2],65289,65341,[65373,3,3]],"Sm":[43,[60,3],124,126,172,177,215,247,1014,[1542,3],8260,8274,[8314,3],[8330,3],8472,[8512,5],8523,[8592,5],8602,8603,[8608,3,3],8622,8654,8655,8658,8660,[8692,268],8992,8993,9084,[9115,25],[9180,6],9655,9665,[9720,8],9839,[10176,5],[10183,31],[10224,16],[10496,131],[10649,63],[10716,32],[10750,258],[11056,21],[11079,6],64297,65122,[65124,3],65291,[65308,3],65372,65374,65506,[65513,4],120513,120539,120571,120597,120629,120655,120687,120713,120745,120771,126704,126705],"Pd":[45,1418,1470,5120,6150,[8208,6],11799,11802,11834,11835,11840,12316,12336,12448,65073,65074,65112,65123,65293,69293],"Nd":[[48,10],[1632,10],[1776,10],[1984,10],[2406,10],[2534,10],[2662,10],[2790,10],[2918,10],[3046,10],[3174,10],[3302,10],[3430,10],[3558,10],[3664,10],[3792,10],[3872,10],[4160,10],[4240,10],[6112,10],[6160,10],[6470,10],[6608,10],[6784,10],[6800,10],[6992,10],[7088,10],[7232,10],[7248,10],[42528,10],[43216,10],[43264,10],[43472,10],[43504,10],[43600,10],[44016,10],[65296,10],[66720,10],[68912,10],[69734,10],[69872,10],[69942,10],[70096,10],[70384,10],[70736,10],[70864,10],[71248,10],[71360,10],[71472,10],[71904,10],[72016,10],[72784,10],[73040,10],[73120,10],[92768,10],[93008,10],[120782,50],[123200,10],[123632,10],[125264,10],[130032,10]],"Lu":[[65,26],[192,23],[216,7],[256,28,2],[313,8,2],[330,24,2],[377,3,2],385,[386,3,2],391,[393,3],[398,4],403,404,[406,3],412,413,415,[416,4,2],423,425,428,430,431,[433,3],437,439,440,444,[452,4,3],[463,7,2],[478,9,2],497,500,[502,3],[506,29,2],570,571,573,574,577,[579,4],[584,4,2],880,882,886,895,902,[904,3],908,910,911,[913,17],[931,9],975,[978,3],[984,12,2],1012,1015,1017,1018,[1021,51],[1120,17,2],[1162,28,2],[1217,7,2],[1232,48,2],[1329,38],[4256,38],4295,4301,[5024,86],[7312,43],[7357,3],[7680,75,2],[7838,49,2],[7944,8],[7960,6],[7976,8],[7992,8],[8008,6],[8025,4,2],[8040,8],[8120,4],[8136,4],[8152,4],[8168,5],[8184,4],8450,8455,[8459,3],[8464,3],8469,[8473,5],[8484,4,2],[8491,3],[8496,4],8510,8511,8517,8579,[11264,47],11360,[11362,3],[11367,4,2],[11374,3],11378,11381,[11390,3],[11394,49,2],11499,11501,11506,[42560,23,2],[42624,14,2],[42786,7,2],[42802,31,2],[42873,3,2],[42878,5,2],42891,42893,42896,42898,[42902,11,2],[42923,4],[42928,5],[42934,5,2],42946,[42948,4],42953,42997,[65313,26],[66560,40],[66736,36],[68736,51],[71840,32],[93760,32],[119808,26],[119860,26],[119912,26],119964,119966,[119967,3,3],119974,[119977,4],[119982,8],[120016,26],120068,120069,[120071,4],[120077,8],[120086,7],120120,120121,[120123,4],[120128,5],120134,[120138,7],[120172,26],[120224,26],[120276,26],[120328,26],[120380,26],[120432,26],[120488,25],[120546,25],[120604,25],[120662,25],[120720,25],120778,[125184,34]],"Sk":[94,96,168,175,180,184,[706,4],[722,14],[741,7],749,[751,17],885,900,901,8125,[8127,3],[8141,3],[8157,3],[8173,3],8189,8190,12443,12444,[42752,23],42784,42785,42889,42890,43867,43882,43883,[64434,16],65342,65344,65507,[127995,5]],"Pc":[95,8255,8256,8276,65075,65076,[65101,3],65343],"Ll":[[97,26],181,[223,24],[248,8],[257,28,2],[312,9,2],[329,24,2],[378,3,2],383,384,387,389,392,396,397,402,405,[409,3],414,[417,3,2],424,426,427,429,432,436,438,441,442,[445,3],[454,3,3],[462,8,2],[477,10,2],496,499,501,[505,30,2],[564,6],572,575,576,578,[583,5,2],[592,68],[661,27],881,[883,3,4],892,893,912,[940,35],976,977,[981,3],[985,12,2],[1008,4],[1013,3,3],1020,[1072,48],[1121,17,2],[1163,27,2],[1218,7,2],[1231,49,2],[1376,41],[4304,43],[4349,3],[5112,6],[7296,9],[7424,44],[7531,13],[7545,34],[7681,75,2],[7830,8],[7839,49,2],[7936,8],[7952,6],[7968,8],[7984,8],[8000,6],[8016,8],[8032,8],[8048,14],[8064,8],[8080,8],[8096,8],[8112,5],8118,8119,8126,[8130,3],8134,8135,[8144,4],8150,8151,[8160,8],[8178,3],8182,8183,8458,8462,8463,8467,[8495,3,5],8508,8509,[8518,4],8526,8580,[11312,47],11361,11365,[11366,4,2],11377,11379,11380,[11382,6],[11393,50,2],11492,11500,11502,11507,[11520,38],11559,11565,[42561,23,2],[42625,14,2],[42787,7,2],42800,[42801,33,2],[42866,7],42874,42876,[42879,5,2],42892,42894,42897,[42899,3],[42903,10,2],42927,[42933,6,2],42947,42952,42954,42998,43002,[43824,43],[43872,9],[43888,80],[64256,7],[64275,5],[65345,26],[66600,40],[66776,36],[68800,51],[71872,32],[93792,32],[119834,26],[119886,7],[119894,18],[119938,26],[119990,4],119995,[119997,7],[120005,11],[120042,26],[120094,26],[120146,26],[120198,26],[120250,26],[120302,26],[120354,26],[120406,26],[120458,28],[120514,25],[120540,6],[120572,25],[120598,6],[120630,25],[120656,6],[120688,25],[120714,6],[120746,25],[120772,6],120779,[125218,34]],"So":[166,169,174,176,1154,1421,1422,1550,1551,1758,1769,1789,1790,2038,2554,2928,[3059,6],3066,3199,3407,3449,[3841,3],3859,[3861,3],[3866,6],[3892,3,2],[4030,8],[4039,6],4046,4047,[4053,4],4254,4255,[5008,10],5741,6464,[6622,34],[7009,10],[7028,9],8448,8449,[8451,4],8456,8457,8468,8470,8471,[8478,6],[8485,3,2],8494,8506,8507,8522,8524,8525,8527,8586,8587,[8597,5],[8604,4],8609,8610,8612,8613,[8615,7],[8623,31],8656,[8657,3,2],[8662,30],[8960,8],[8972,20],[8994,7],[9003,81],[9085,30],[9140,40],[9186,69],[9280,11],[9372,78],[9472,183],[9656,9],[9666,54],[9728,111],[9840,248],[10132,44],[10240,256],[11008,48],11077,11078,[11085,39],[11126,32],[11159,105],[11493,6],11856,11857,[11904,26],[11931,89],[12032,214],[12272,12],12292,12306,12307,12320,12342,12343,12350,12351,12688,12689,[12694,10],[12736,36],[12800,31],[12842,30],12880,[12896,32],[12938,39],[12992,320],[19904,64],[42128,55],[43048,4],43062,43063,43065,[43639,3],65021,65508,65512,65517,65518,65532,65533,[65847,9],[65913,17],[65932,3],[65936,13],65952,[66000,45],67703,67704,68296,71487,[73685,8],[73697,17],[92988,4],92997,113820,[118784,246],[119040,39],[119081,60],[119146,3],119171,119172,[119180,30],[119214,59],[119296,66],119365,[119552,87],[120832,512],[121399,4],[121453,8],[121462,14],121477,121478,123215,126124,126254,[126976,44],[127024,100],[127136,15],[127153,15],[127169,15],[127185,37],[127245,161],[127462,29],[127504,44],[127552,9],127568,127569,[127584,6],[127744,251],[128000,728],[128736,13],[128752,13],[128768,116],[128896,89],[128992,12],[129024,12],[129040,56],[129104,10],[129120,40],[129168,30],129200,129201,[129280,121],[129402,82],[129485,135],[129632,14],[129648,5],[129656,3],[129664,7],[129680,25],[129712,7],[129728,3],[129744,7],[129792,147],[129940,55]],"Lo":[170,186,443,[448,4],660,[1488,27],[1519,4],[1568,32],[1601,10],1646,1647,[1649,99],1749,1774,1775,[1786,3],1791,1808,[1810,30],[1869,89],1969,[1994,33],[2048,22],[2112,25],[2144,11],[2208,21],[2230,18],[2308,54],2365,2384,[2392,10],[2418,15],[2437,8],2447,2448,[2451,22],[2474,7],2482,[2486,4],2493,2510,2524,2525,[2527,3],2544,2545,2556,[2565,6],2575,2576,[2579,22],[2602,7],2610,2611,2613,2614,2616,2617,[2649,4],2654,[2674,3],[2693,9],[2703,3],[2707,22],[2730,7],2738,2739,[2741,5],2749,2768,2784,2785,2809,[2821,8],2831,2832,[2835,22],[2858,7],2866,2867,[2869,5],2877,2908,2909,[2911,3],2929,2947,[2949,6],[2958,3],[2962,4],2969,[2970,3,2],2975,2979,2980,[2984,3],[2990,12],3024,[3077,8],[3086,3],[3090,23],[3114,16],3133,[3160,3],3168,3169,3200,[3205,8],[3214,3],[3218,23],[3242,10],[3253,5],3261,3294,3296,3297,3313,3314,[3332,9],[3342,3],[3346,41],3389,3406,[3412,3],[3423,3],[3450,6],[3461,18],[3482,24],[3507,9],3517,[3520,7],[3585,48],3634,3635,[3648,6],3713,[3714,3,2],[3719,4],[3724,24],3749,[3751,10],3762,3763,3773,[3776,5],[3804,4],3840,[3904,8],[3913,36],[3976,5],[4096,43],4159,[4176,6],[4186,4],4193,4197,4198,[4206,3],[4213,13],4238,[4352,329],[4682,4],[4688,7],4696,[4698,4],[4704,41],[4746,4],[4752,33],[4786,4],[4792,7],4800,[4802,4],[4808,15],[4824,57],[4882,4],[4888,67],[4992,16],[5121,620],[5743,17],[5761,26],[5792,75],[5873,8],[5888,13],[5902,4],[5920,18],[5952,18],[5984,13],[5998,3],[6016,52],6108,[6176,35],[6212,53],[6272,5],[6279,34],6314,[6320,70],[6400,31],[6480,30],[6512,5],[6528,44],[6576,26],[6656,23],[6688,53],[6917,47],[6981,7],[7043,30],7086,7087,[7098,44],[7168,36],[7245,3],[7258,30],[7401,4],[7406,6],7413,7414,7418,[8501,4],[11568,56],[11648,23],[11680,7],[11688,7],[11696,7],[11704,7],[11712,7],[11720,7],[11728,7],[11736,7],12294,12348,[12353,86],12447,[12449,90],12543,[12549,43],[12593,94],[12704,32],[12784,16],13312,19903,19968,40956,[40960,21],[40982,1143],[42192,40],[42240,268],[42512,16],42538,42539,42606,[42656,70],42895,42999,[43003,7],[43011,3],[43015,4],[43020,23],[43072,52],[43138,50],[43250,6],43259,43261,43262,[43274,28],[43312,23],[43360,29],[43396,47],[43488,5],[43495,9],[43514,5],[43520,41],[43584,3],[43588,8],[43616,16],[43633,6],43642,[43646,50],43697,43701,43702,[43705,5],43712,43714,43739,43740,[43744,11],43762,[43777,6],[43785,6],[43793,6],[43808,7],[43816,7],[43968,35],44032,55203,[55216,23],[55243,49],[63744,366],[64112,106],64285,[64287,10],[64298,13],[64312,5],64318,64320,64321,64323,64324,[64326,108],[64467,363],[64848,64],[64914,54],[65008,12],[65136,5],[65142,135],[65382,10],[65393,45],[65440,31],[65474,6],[65482,6],[65490,6],[65498,3],[65536,12],[65549,26],[65576,19],65596,65597,[65599,15],[65616,14],[65664,123],[66176,29],[66208,49],[66304,32],[66349,20],[66370,8],[66384,38],[66432,30],[66464,36],[66504,8],[66640,78],[66816,40],[66864,52],[67072,311],[67392,22],[67424,8],[67584,6],67592,[67594,44],67639,67640,67644,[67647,23],[67680,23],[67712,31],[67808,19],67828,67829,[67840,22],[67872,26],[67968,56],68030,68031,68096,[68112,4],[68117,3],[68121,29],[68192,29],[68224,29],[68288,8],[68297,28],[68352,54],[68416,22],[68448,19],[68480,18],[68608,73],[68864,36],[69248,42],69296,69297,[69376,29],69415,[69424,22],[69552,21],[69600,23],[69635,53],[69763,45],[69840,25],[69891,36],69956,69959,[69968,35],70006,[70019,48],[70081,4],70106,70108,[70144,18],[70163,25],[70272,7],70280,[70282,4],[70287,15],[70303,10],[70320,47],[70405,8],70415,70416,[70419,22],[70442,7],70450,70451,[70453,5],70461,70480,[70493,5],[70656,53],[70727,4],[70751,3],[70784,48],70852,70853,70855,[71040,47],[71128,4],[71168,48],71236,[71296,43],71352,[71424,27],[71680,44],[71935,8],71945,[71948,8],71957,71958,[71960,24],71999,72001,[72096,8],[72106,39],72161,72163,72192,[72203,40],72250,72272,[72284,46],72349,[72384,57],[72704,9],[72714,37],72768,[72818,30],[72960,7],72968,72969,[72971,38],73030,[73056,6],73063,73064,[73066,32],73112,[73440,19],73648,[73728,922],[74880,196],[77824,1071],[82944,583],[92160,569],[92736,31],[92880,30],[92928,48],[93027,21],[93053,19],[93952,75],94032,94208,100343,[100352,1238],101632,101640,[110592,287],[110928,3],[110948,4],[110960,396],[113664,107],[113776,13],[113792,9],[113808,10],[123136,45],123214,[123584,44],[124928,197],[126464,4],[126469,27],126497,126498,126500,126503,[126505,10],[126516,4],126521,126523,126530,[126535,4,2],126542,126543,126545,126546,126548,[126551,6,2],126562,126564,[126567,4],[126572,7],[126580,4],[126585,4],126590,[126592,10],[126603,17],[126625,3],[126629,5],[126635,17],131072,173789,173824,177972,177984,178205,178208,183969,183984,191456,[194560,542],196608,201546],"Pi":[171,8216,8219,8220,8223,8249,11778,11780,11785,11788,11804,11808],"Cf":[173,[1536,6],1564,1757,1807,2274,6158,[8203,5],[8234,5],[8288,5],[8294,10],65279,[65529,3],69821,69837,[78896,9],[113824,4],[119155,8],917505,[917536,96]],"No":[178,179,185,[188,3],[2548,6],[2930,6],[3056,3],[3192,7],[3416,7],[3440,9],[3882,10],[4969,20],[6128,10],6618,8304,[8308,6],[8320,10],[8528,16],8585,[9312,60],[9450,22],[10102,30],11517,[12690,4],[12832,10],[12872,8],[12881,15],[12928,10],[12977,15],[43056,6],[65799,45],[65909,4],65930,65931,[66273,27],[66336,4],[67672,8],[67705,7],[67751,9],[67835,5],[67862,6],68028,68029,[68032,16],[68050,46],[68160,9],68221,68222,[68253,3],[68331,5],[68440,8],[68472,8],[68521,7],[68858,6],[69216,31],[69405,10],[69457,4],[69573,7],[69714,20],[70113,20],71482,71483,[71914,9],[72794,19],[73664,21],[93019,7],[93824,23],[119520,20],[119648,25],[125127,9],[126065,59],[126125,3],[126129,4],[126209,45],[126255,15],[127232,13]],"Pf":[187,8217,8221,8250,11779,11781,11786,11789,11805,11809],"Lt":[[453,3,3],498,[8072,8],[8088,8],[8104,8],8124,8140,8188],"Lm":[[688,18],[710,12],[736,5],748,750,884,890,1369,1600,1765,1766,2036,2037,2042,2074,2084,2088,2417,3654,3782,4348,6103,6211,6823,[7288,6],[7468,63],7544,[7579,37],8305,8319,[8336,13],11388,11389,11631,11823,12293,[12337,5],12347,12445,12446,[12540,3],40981,[42232,6],42508,42623,42652,42653,[42775,9],42864,42888,43000,43001,43471,43494,43632,43741,43763,43764,[43868,4],43881,65392,65438,65439,[92992,4],[94099,13],94176,94177,94179,[123191,7],125259],"Mn":[[768,112],[1155,5],[1425,45],1471,1473,1474,1476,1477,1479,[1552,11],[1611,21],1648,[1750,7],[1759,6],1767,1768,[1770,4],1809,[1840,27],[1958,11],[2027,9],2045,[2070,4],[2075,9],[2085,3],[2089,5],[2137,3],[2259,15],[2275,32],2362,2364,[2369,8],2381,[2385,7],2402,2403,2433,2492,[2497,4],2509,2530,2531,2558,2561,2562,2620,2625,2626,2631,2632,[2635,3],2641,2672,2673,2677,2689,2690,2748,[2753,5],2759,2760,2765,2786,2787,[2810,6],2817,2876,2879,[2881,4],2893,2901,2902,2914,2915,2946,3008,3021,3072,3076,[3134,3],[3142,3],[3146,4],3157,3158,3170,3171,3201,3260,3263,3270,3276,3277,3298,3299,3328,3329,3387,3388,[3393,4],3405,3426,3427,3457,3530,[3538,3],3542,3633,[3636,7],[3655,8],3761,[3764,9],[3784,6],3864,3865,[3893,3,2],[3953,14],[3968,5],3974,3975,[3981,11],[3993,36],4038,[4141,4],[4146,6],4153,4154,4157,4158,4184,4185,[4190,3],[4209,4],4226,4229,4230,4237,4253,[4957,3],[5906,3],[5938,3],5970,5971,6002,6003,6068,6069,[6071,7],6086,[6089,11],6109,[6155,3],6277,6278,6313,[6432,3],6439,6440,6450,[6457,3],6679,6680,6683,6742,[6744,7],6752,6754,[6757,8],[6771,10],6783,[6832,14],6847,6848,[6912,4],6964,[6966,5],6972,6978,[7019,9],7040,7041,[7074,4],7080,7081,[7083,3],7142,7144,7145,7149,[7151,3],[7212,8],7222,7223,[7376,3],[7380,13],[7394,7],7405,7412,7416,7417,[7616,58],[7675,5],[8400,13],8417,[8421,12],[11503,3],11647,[11744,32],[12330,4],12441,12442,42607,[42612,10],42654,42655,42736,42737,43010,43014,43019,43045,43046,43052,43204,43205,[43232,18],43263,[43302,8],[43335,11],[43392,3],43443,[43446,4],43452,43453,43493,[43561,6],43569,43570,43573,43574,43587,43596,43644,43696,[43698,3],43703,43704,43710,43711,43713,43756,43757,43766,44005,44008,44013,64286,[65024,16],[65056,16],66045,66272,[66422,5],[68097,3],68101,68102,[68108,4],[68152,3],68159,68325,68326,[68900,4],69291,69292,[69446,11],69633,[69688,15],[69759,3],[69811,4],69817,69818,[69888,3],[69927,5],[69933,8],70003,70016,70017,[70070,9],[70089,4],70095,[70191,3],70196,70198,70199,70206,70367,[70371,8],70400,70401,70459,70460,70464,[70502,7],[70512,5],[70712,8],[70722,3],70726,70750,[70835,6],70842,70847,70848,70850,70851,[71090,4],71100,71101,71103,71104,71132,71133,[71219,8],71229,71231,71232,71339,71341,[71344,6],71351,[71453,3],[71458,4],[71463,5],[71727,9],71737,71738,71995,71996,71998,72003,[72148,4],72154,72155,72160,[72193,10],[72243,6],[72251,4],72263,[72273,6],[72281,3],[72330,13],72344,72345,[72752,7],[72760,6],72767,[72850,22],[72874,7],72882,72883,72885,72886,[73009,6],73018,73020,73021,[73023,7],73031,73104,73105,73109,73111,73459,73460,[92912,5],[92976,7],94031,[94095,4],94180,113821,113822,[119143,3],[119163,8],[119173,7],[119210,4],[119362,3],[121344,55],[121403,50],121461,121476,[121499,5],[121505,15],[122880,7],[122888,17],[122907,7],122915,122916,[122918,5],[123184,7],[123628,4],[125136,7],[125252,7],[917760,240]],"Me":[1160,1161,6846,[8413,4],[8418,3],[42608,3]],"Mc":[2307,2363,[2366,3],[2377,4],2382,2383,2434,2435,[2494,3],2503,2504,2507,2508,2519,2563,[2622,3],2691,[2750,3],2761,2763,2764,2818,2819,2878,2880,2887,2888,2891,2892,2903,3006,3007,3009,3010,[3014,3],[3018,3],3031,[3073,3],[3137,4],3202,3203,3262,[3264,5],3271,3272,3274,3275,3285,3286,3330,3331,[3390,3],[3398,3],[3402,3],3415,3458,3459,[3535,3],[3544,8],3570,3571,3902,3903,3967,4139,4140,4145,4152,4155,4156,4182,4183,[4194,3],[4199,7],4227,4228,[4231,6],4239,[4250,3],6070,[6078,8],6087,6088,[6435,4],[6441,3],6448,6449,[6451,6],6681,6682,6741,6743,6753,6755,6756,[6765,6],6916,6965,6971,[6973,5],6979,6980,7042,7073,7078,7079,7082,7143,[7146,3],7150,7154,7155,[7204,8],7220,7221,7393,7415,12334,12335,43043,43044,43047,43136,43137,[43188,16],43346,43347,43395,43444,43445,43450,43451,[43454,3],43567,43568,43571,43572,43597,43643,43645,43755,43758,43759,43765,44003,44004,44006,44007,44009,44010,44012,69632,69634,69762,[69808,3],69815,69816,69932,69957,69958,70018,[70067,3],70079,70080,70094,[70188,3],70194,70195,70197,[70368,3],70402,70403,70462,70463,[70465,4],70471,70472,[70475,3],70487,70498,70499,[70709,3],70720,70721,70725,[70832,3],70841,[70843,4],70849,[71087,3],[71096,4],71102,[71216,3],71227,71228,71230,71340,71342,71343,71350,71456,71457,71462,[71724,3],71736,[71984,6],71991,71992,71997,72000,72002,[72145,3],[72156,4],72164,72249,72279,72280,72343,72751,72766,72873,72881,72884,[73098,5],73107,73108,73110,73461,73462,[94033,55],94192,94193,119141,119142,[119149,6]],"Nl":[[5870,3],[8544,35],[8581,4],12295,[12321,9],[12344,3],[42726,10],[65856,53],66369,66378,[66513,5],[74752,111]],"Zl":[8232],"Zp":[8233],"Cs":[55296,56191,56192,56319,56320,57343],"Co":[57344,63743,983040,1048573,1048576,1114109],"digits":[[48,10],178,179,185,[1632,10],[1776,10],[1984,10],[2406,10],[2534,10],[2662,10],[2790,10],[2918,10],[3046,10],[3174,10],[3302,10],[3430,10],[3558,10],[3664,10],[3792,10],[3872,10],[4160,10],[4240,10],[4969,9],[6112,10],[6160,10],[6470,10],[6608,11],[6784,10],[6800,10],[6992,10],[7088,10],[7232,10],[7248,10],8304,[8308,6],[8320,10],[9312,9],[9332,9],[9352,9],9450,[9461,9],9471,[10102,9],[10112,9],[10122,9],[42528,10],[43216,10],[43264,10],[43472,10],[43504,10],[43600,10],[44016,10],[65296,10],[66720,10],[68160,4],[68912,10],[69216,9],[69714,9],[69734,10],[69872,10],[69942,10],[70096,10],[70384,10],[70736,10],[70864,10],[71248,10],[71360,10],[71472,10],[71904,10],[72016,10],[72784,10],[73040,10],[73120,10],[92768,10],[93008,10],[120782,50],[123200,10],[123632,10],[125264,10],[127232,11],[130032,10]],"numeric":[[48,10],178,179,185,[188,3],[1632,10],[1776,10],[1984,10],[2406,10],[2534,10],[2548,6],[2662,10],[2790,10],[2918,10],[2930,6],[3046,13],[3174,10],[3192,7],[3302,10],[3416,7],[3430,19],[3558,10],[3664,10],[3792,10],[3872,20],[4160,10],[4240,10],[4969,20],[5870,3],[6112,10],[6128,10],[6160,10],[6470,10],[6608,11],[6784,10],[6800,10],[6992,10],[7088,10],[7232,10],[7248,10],8304,[8308,6],[8320,10],[8528,51],[8581,5],[9312,60],[9450,22],[10102,30],11517,12295,[12321,9],[12344,3],[12690,4],[12832,10],[12872,8],[12881,15],[12928,10],[12977,15],13317,13443,14378,15181,19968,19971,19975,19977,20061,20108,20116,20118,20159,20160,20191,20200,20237,20336,20740,20806,[20841,3,2],21313,[21315,3],21324,[21441,4],22235,22769,22777,24186,24318,24319,[24332,3],24336,25342,25420,26578,28422,29590,30334,32902,33836,36014,36019,36144,38433,38470,38476,38520,38646,[42528,10],[42726,10],[43056,6],[43216,10],[43264,10],[43472,10],[43504,10],[43600,10],[44016,10],63851,63859,63864,63922,63953,63955,63997,[65296,10],[65799,45],[65856,57],65930,65931,[66273,27],[66336,4],66369,66378,[66513,5],[66720,10],[67672,8],[67705,7],[67751,9],[67835,5],[67862,6],68028,68029,[68032,16],[68050,46],[68160,9],68221,68222,[68253,3],[68331,5],[68440,8],[68472,8],[68521,7],[68858,6],[68912,10],[69216,31],[69405,10],[69457,4],[69573,7],[69714,30],[69872,10],[69942,10],[70096,10],[70113,20],[70384,10],[70736,10],[70864,10],[71248,10],[71360,10],[71472,12],[71904,19],[72016,10],[72784,29],[73040,10],[73120,10],[73664,21],[74752,111],[92768,10],[93008,10],[93019,7],[93824,23],[119520,20],[119648,25],[120782,50],[123200,10],[123632,10],[125127,9],[125264,10],[126065,59],[126125,3],[126129,4],[126209,45],[126255,15],[127232,13],[130032,10],131073,131172,131298,131361,133418,133507,133516,133532,133866,133885,133913,140176,141720,146203,156269,194704],"Cn":[[888,2],[896,4],[907,1],[909,1],[930,1],[1328,1],[1367,2],[1419,2],[1424,1],[1480,8],[1515,4],[1525,11],[1565,1],[1806,1],[1867,2],[1970,14],[2043,2],[2094,2],[2111,1],[2140,2],[2143,1],[2155,53],[2229,1],[2248,11],[2436,1],[2445,2],[2449,2],[2473,1],[2481,1],[2483,3],[2490,2],[2501,2],[2505,2],[2511,8],[2520,4],[2526,1],[2532,2],[2559,2],[2564,1],[2571,4],[2577,2],[2601,1],[2609,1],[2612,1],[2615,1],[2618,2],[2621,1],[2627,4],[2633,2],[2638,3],[2642,7],[2653,1],[2655,7],[2679,10],[2692,1],[2702,1],[2706,1],[2729,1],[2737,1],[2740,1],[2746,2],[2758,1],[2762,1],[2766,2],[2769,15],[2788,2],[2802,7],[2816,1],[2820,1],[2829,2],[2833,2],[2857,1],[2865,1],[2868,1],[2874,2],[2885,2],[2889,2],[2894,7],[2904,4],[2910,1],[2916,2],[2936,10],[2948,1],[2955,3],[2961,1],[2966,3],[2971,1],[2973,1],[2976,3],[2981,3],[2987,3],[3002,4],[3011,3],[3017,1],[3022,2],[3025,6],[3032,14],[3067,5],[3085,1],[3089,1],[3113,1],[3130,3],[3141,1],[3145,1],[3150,7],[3159,1],[3163,5],[3172,2],[3184,7],[3213,1],[3217,1],[3241,1],[3252,1],[3258,2],[3269,1],[3273,1],[3278,7],[3287,7],[3295,1],[3300,2],[3312,1],[3315,13],[3341,1],[3345,1],[3397,1],[3401,1],[3408,4],[3428,2],[3456,1],[3460,1],[3479,3],[3506,1],[3516,1],[3518,2],[3527,3],[3531,4],[3541,1],[3543,1],[3552,6],[3568,2],[3573,12],[3643,4],[3676,37],[3715,1],[3717,1],[3723,1],[3748,1],[3750,1],[3774,2],[3781,1],[3783,1],[3790,2],[3802,2],[3808,32],[3912,1],[3949,4],[3992,1],[4029,1],[4045,1],[4059,37],[4294,1],[4296,5],[4302,2],[4681,1],[4686,2],[4695,1],[4697,1],[4702,2],[4745,1],[4750,2],[4785,1],[4790,2],[4799,1],[4801,1],[4806,2],[4823,1],[4881,1],[4886,2],[4955,2],[4989,3],[5018,6],[5110,2],[5118,2],[5789,3],[5881,7],[5901,1],[5909,11],[5943,9],[5972,12],[5997,1],[6001,1],[6004,12],[6110,2],[6122,6],[6138,6],[6159,1],[6170,6],[6265,7],[6315,5],[6390,10],[6431,1],[6444,4],[6460,4],[6465,3],[6510,2],[6517,11],[6572,4],[6602,6],[6619,3],[6684,2],[6751,1],[6781,2],[6794,6],[6810,6],[6830,2],[6849,63],[6988,4],[7037,3],[7156,8],[7224,3],[7242,3],[7305,7],[7355,2],[7368,8],[7419,5],[7674,1],[7958,2],[7966,2],[8006,2],[8014,2],[8024,1],[8026,1],[8028,1],[8030,1],[8062,2],[8117,1],[8133,1],[8148,2],[8156,1],[8176,2],[8181,1],[8191,1],[8293,1],[8306,2],[8335,1],[8349,3],[8384,16],[8433,15],[8588,4],[9255,25],[9291,21],[11124,2],[11158,1],[11311,1],[11359,1],[11508,5],[11558,1],[11560,5],[11566,2],[11624,7],[11633,14],[11671,9],[11687,1],[11695,1],[11703,1],[11711,1],[11719,1],[11727,1],[11735,1],[11743,1],[11859,45],[11930,1],[12020,12],[12246,26],[12284,4],[12352,1],[12439,2],[12544,5],[12592,1],[12687,1],[12772,12],[12831,1],[40957,3],[42125,3],[42183,9],[42540,20],[42744,8],[42944,2],[42955,42],[43053,3],[43066,6],[43128,8],[43206,8],[43226,6],[43348,11],[43389,3],[43470,1],[43482,4],[43519,1],[43575,9],[43598,2],[43610,2],[43715,24],[43767,10],[43783,2],[43791,2],[43799,9],[43815,1],[43823,1],[43884,4],[44014,2],[44026,6],[55204,12],[55239,4],[55292,4],[64110,2],[64218,38],[64263,12],[64280,5],[64311,1],[64317,1],[64319,1],[64322,1],[64325,1],[64450,17],[64832,16],[64912,2],[64968,40],[65022,2],[65050,6],[65107,1],[65127,1],[65132,4],[65141,1],[65277,2],[65280,1],[65471,3],[65480,2],[65488,2],[65496,2],[65501,3],[65511,1],[65519,10],[65534,2],[65548,1],[65575,1],[65595,1],[65598,1],[65614,2],[65630,34],[65787,5],[65795,4],[65844,3],[65935,1],[65949,3],[65953,47],[66046,130],[66205,3],[66257,15],[66300,4],[66340,9],[66379,5],[66427,5],[66462,1],[66500,4],[66518,42],[66718,2],[66730,6],[66772,4],[66812,4],[66856,8],[66916,11],[66928,144],[67383,9],[67414,10],[67432,152],[67590,2],[67593,1],[67638,1],[67641,3],[67645,2],[67670,1],[67743,8],[67760,48],[67827,1],[67830,5],[67868,3],[67898,5],[67904,64],[68024,4],[68048,2],[68100,1],[68103,5],[68116,1],[68120,1],[68150,2],[68155,4],[68169,7],[68185,7],[68256,32],[68327,4],[68343,9],[68406,3],[68438,2],[68467,5],[68498,7],[68509,12],[68528,80],[68681,55],[68787,13],[68851,7],[68904,8],[68922,294],[69247,1],[69290,1],[69294,2],[69298,78],[69416,8],[69466,86],[69580,20],[69623,9],[69710,4],[69744,15],[69826,11],[69838,2],[69865,7],[69882,6],[69941,1],[69960,8],[70007,9],[70112,1],[70133,11],[70162,1],[70207,65],[70279,1],[70281,1],[70286,1],[70302,1],[70314,6],[70379,5],[70394,6],[70404,1],[70413,2],[70417,2],[70441,1],[70449,1],[70452,1],[70458,1],[70469,2],[70473,2],[70478,2],[70481,6],[70488,5],[70500,2],[70509,3],[70517,139],[70748,1],[70754,30],[70856,8],[70874,166],[71094,2],[71134,34],[71237,11],[71258,6],[71277,19],[71353,7],[71370,54],[71451,2],[71468,4],[71488,192],[71740,100],[71923,12],[71943,2],[71946,2],[71956,1],[71959,1],[71990,1],[71993,2],[72007,9],[72026,70],[72104,2],[72152,2],[72165,27],[72264,8],[72355,29],[72441,263],[72713,1],[72759,1],[72774,10],[72813,3],[72848,2],[72872,1],[72887,73],[72967,1],[72970,1],[73015,3],[73019,1],[73022,1],[73032,8],[73050,6],[73062,1],[73065,1],[73103,1],[73106,1],[73113,7],[73130,310],[73465,183],[73649,15],[73714,13],[74650,102],[74863,1],[74869,11],[75076,2748],[78895,1],[78905,4039],[83527,8633],[92729,7],[92767,1],[92778,4],[92784,96],[92910,2],[92918,10],[92998,10],[93018,1],[93026,1],[93048,5],[93072,688],[93851,101],[94027,4],[94088,7],[94112,64],[94181,11],[94194,14],[100344,8],[101590,42],[101641,8951],[110879,49],[110931,17],[110952,8],[111356,2308],[113771,5],[113789,3],[113801,7],[113818,2],[113828,4956],[119030,10],[119079,2],[119273,23],[119366,154],[119540,12],[119639,9],[119673,135],[119893,1],[119965,1],[119968,2],[119971,2],[119975,2],[119981,1],[119994,1],[119996,1],[120004,1],[120070,1],[120075,2],[120085,1],[120093,1],[120122,1],[120127,1],[120133,1],[120135,3],[120145,1],[120486,2],[120780,2],[121484,15],[121504,1],[121520,1360],[122887,1],[122905,2],[122914,1],[122917,1],[122923,213],[123181,3],[123198,2],[123210,4],[123216,368],[123642,5],[123648,1280],[125125,2],[125143,41],[125260,4],[125274,4],[125280,785],[126133,76],[126270,194],[126468,1],[126496,1],[126499,1],[126501,2],[126504,1],[126515,1],[126520,1],[126522,1],[126524,6],[126531,4],[126536,1],[126538,1],[126540,1],[126544,1],[126547,1],[126549,2],[126552,1],[126554,1],[126556,1],[126558,1],[126560,1],[126563,1],[126565,2],[126571,1],[126579,1],[126584,1],[126589,1],[126591,1],[126602,1],[126620,5],[126628,1],[126634,1],[126652,52],[126706,270],[127020,4],[127124,12],[127151,2],[127168,1],[127184,1],[127222,10],[127406,56],[127491,13],[127548,4],[127561,7],[127570,14],[127590,154],[128728,8],[128749,3],[128765,3],[128884,12],[128985,7],[129004,20],[129036,4],[129096,8],[129114,6],[129160,8],[129198,2],[129202,78],[129401,1],[129484,1],[129620,12],[129646,2],[129653,3],[129659,5],[129671,9],[129705,7],[129719,9],[129731,13],[129751,41],[129939,1],[129995,37],[130042,1030],[173790,34],[177973,11],[178206,2],[183970,14],[191457,3103],[195102,1506],[201547,715958],[917506,30],[917632,128],[918000,65040],[1048574,2]]}
$B.unicode_casefold={223:[115,115],304:[105,775],329:[700,110],496:[106,780],912:[953,776,769],944:[965,776,769],1415:[1381,1410],7830:[104,817],7831:[116,776],7832:[119,778],7833:[121,778],7834:[97,702],7838:[223],8016:[965,787],8018:[965,787,768],8020:[965,787,769],8022:[965,787,834],8064:[7936,953],8065:[7937,953],8066:[7938,953],8067:[7939,953],8068:[7940,953],8069:[7941,953],8070:[7942,953],8071:[7943,953],8072:[8064],8073:[8065],8074:[8066],8075:[8067],8076:[8068],8077:[8069],8078:[8070],8079:[8071],8080:[7968,953],8081:[7969,953],8082:[7970,953],8083:[7971,953],8084:[7972,953],8085:[7973,953],8086:[7974,953],8087:[7975,953],8088:[8080],8089:[8081],8090:[8082],8091:[8083],8092:[8084],8093:[8085],8094:[8086],8095:[8087],8096:[8032,953],8097:[8033,953],8098:[8034,953],8099:[8035,953],8100:[8036,953],8101:[8037,953],8102:[8038,953],8103:[8039,953],8104:[8096],8105:[8097],8106:[8098],8107:[8099],8108:[8100],8109:[8101],8110:[8102],8111:[8103],8114:[8048,953],8115:[945,953],8116:[940,953],8118:[945,834],8119:[945,834,953],8124:[8115],8130:[8052,953],8131:[951,953],8132:[942,953],8134:[951,834],8135:[951,834,953],8140:[8131],8146:[953,776,768],8147:[953,776,769],8150:[953,834],8151:[953,776,834],8162:[965,776,768],8163:[965,776,769],8164:[961,787],8166:[965,834],8167:[965,776,834],8178:[8060,953],8179:[969,953],8180:[974,953],8182:[969,834],8183:[969,834,953],8188:[8179],64256:[102,102],64257:[102,105],64258:[102,108],64259:[102,102,105],64260:[102,102,108],64261:[115,116],64262:[115,116],64275:[1396,1398],64276:[1396,1381],64277:[1396,1387],64278:[1406,1398],64279:[1396,1389]}
$B.unicode_bidi_whitespace=[9,10,11,12,13,28,29,30,31,32,133,5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8287,12288]
$B.unicode_identifiers={"XID_Start":[95,[65,26],[97,26],170,181,186,[192,23],[216,31],[248,458],[710,12],[736,5],748,750,[880,5],[886,2],[891,3],895,902,[904,3],908,[910,20],[931,83],[1015,139],[1162,166],[1329,38],1369,[1376,41],[1488,27],[1519,4],[1568,43],[1646,2],[1649,99],1749,[1765,2],[1774,2],[1786,3],1791,1808,[1810,30],[1869,89],1969,[1994,33],[2036,2],2042,[2048,22],2074,2084,2088,[2112,25],[2144,11],[2208,21],[2230,18],[2308,54],2365,2384,[2392,10],2417,[2418,15],[2437,8],[2447,2],[2451,22],[2474,7],2482,[2486,4],2493,2510,[2524,2],[2527,3],[2544,2],2556,[2565,6],[2575,2],[2579,22],[2602,7],[2610,2],[2613,2],[2616,2],[2649,4],2654,[2674,3],[2693,9],[2703,3],[2707,22],[2730,7],[2738,2],[2741,5],2749,2768,[2784,2],2809,[2821,8],[2831,2],[2835,22],[2858,7],[2866,2],[2869,5],2877,[2908,2],[2911,3],2929,2947,[2949,6],[2958,3],[2962,4],[2969,2],2972,[2974,2],[2979,2],[2984,3],[2990,12],3024,[3077,8],[3086,3],[3090,23],[3114,16],3133,[3160,3],[3168,2],3200,[3205,8],[3214,3],[3218,23],[3242,10],[3253,5],3261,3294,[3296,2],[3313,2],[3332,9],[3342,3],[3346,41],3389,3406,[3412,3],[3423,3],[3450,6],[3461,18],[3482,24],[3507,9],3517,[3520,7],[3585,48],3634,[3648,7],[3713,2],3716,[3718,5],[3724,24],3749,[3751,10],3762,3773,[3776,5],3782,[3804,4],3840,[3904,8],[3913,36],[3976,5],[4096,43],4159,[4176,6],[4186,4],4193,[4197,2],[4206,3],[4213,13],4238,[4256,38],4295,4301,[4304,43],4348,[4349,332],[4682,4],[4688,7],4696,[4698,4],[4704,41],[4746,4],[4752,33],[4786,4],[4792,7],4800,[4802,4],[4808,15],[4824,57],[4882,4],[4888,67],[4992,16],[5024,86],[5112,6],[5121,620],[5743,17],[5761,26],[5792,75],[5870,11],[5888,13],[5902,4],[5920,18],[5952,18],[5984,13],[5998,3],[6016,52],6103,6108,[6176,89],[6272,41],6314,[6320,70],[6400,31],[6480,30],[6512,5],[6528,44],[6576,26],[6656,23],[6688,53],6823,[6917,47],[6981,7],[7043,30],[7086,2],[7098,44],[7168,36],[7245,3],[7258,36],[7296,9],[7312,43],[7357,3],[7401,4],[7406,6],[7413,2],7418,[7424,192],[7680,278],[7960,6],[7968,38],[8008,6],[8016,8],8025,8027,8029,[8031,31],[8064,53],[8118,7],8126,[8130,3],[8134,7],[8144,4],[8150,6],[8160,13],[8178,3],[8182,7],8305,8319,[8336,13],8450,8455,[8458,10],8469,8472,[8473,5],8484,8486,8488,[8490,16],[8508,4],[8517,5],8526,[8544,41],[11264,47],[11312,47],[11360,133],[11499,4],[11506,2],[11520,38],11559,11565,[11568,56],11631,[11648,23],[11680,7],[11688,7],[11696,7],[11704,7],[11712,7],[11720,7],[11728,7],[11736,7],12293,12294,12295,[12321,9],[12337,5],[12344,5],[12353,86],[12445,3],[12449,90],[12540,4],[12549,43],[12593,94],[12704,32],[12784,16],[13312,6592],[19968,20989],[40960,1165],[42192,46],[42240,269],[42512,16],[42538,2],[42560,47],42623,[42624,30],[42656,80],[42775,9],[42786,103],[42891,53],[42946,9],[42997,13],[43011,3],[43015,4],[43020,23],[43072,52],[43138,50],[43250,6],43259,[43261,2],[43274,28],[43312,23],[43360,29],[43396,47],43471,[43488,5],43494,[43495,9],[43514,5],[43520,41],[43584,3],[43588,8],[43616,23],43642,[43646,50],43697,[43701,2],[43705,5],43712,43714,[43739,3],[43744,11],43762,[43763,2],[43777,6],[43785,6],[43793,6],[43808,7],[43816,7],[43824,43],[43868,14],[43888,115],[44032,11172],[55216,23],[55243,49],[63744,366],[64112,106],[64256,7],[64275,5],64285,[64287,10],[64298,13],[64312,5],64318,[64320,2],[64323,2],[64326,108],[64467,139],[64612,218],[64848,64],[64914,54],[65008,10],65137,65139,65143,65145,65147,65149,[65151,126],[65313,26],[65345,26],[65382,56],[65440,31],[65474,6],[65482,6],[65490,6],[65498,3],[65536,12],[65549,26],[65576,19],[65596,2],[65599,15],[65616,14],[65664,123],[65856,53],[66176,29],[66208,49],[66304,32],[66349,30],[66384,38],[66432,30],[66464,36],[66504,8],[66513,5],[66560,158],[66736,36],[66776,36],[66816,40],[66864,52],[67072,311],[67392,22],[67424,8],[67584,6],67592,[67594,44],[67639,2],67644,[67647,23],[67680,23],[67712,31],[67808,19],[67828,2],[67840,22],[67872,26],[67968,56],[68030,2],68096,[68112,4],[68117,3],[68121,29],[68192,29],[68224,29],[68288,8],[68297,28],[68352,54],[68416,22],[68448,19],[68480,18],[68608,73],[68736,51],[68800,51],[68864,36],[69248,42],[69296,2],[69376,29],69415,[69424,22],[69552,21],[69600,23],[69635,53],[69763,45],[69840,25],[69891,36],69956,69959,[69968,35],70006,[70019,48],[70081,4],70106,70108,[70144,18],[70163,25],[70272,7],70280,[70282,4],[70287,15],[70303,10],[70320,47],[70405,8],[70415,2],[70419,22],[70442,7],[70450,2],[70453,5],70461,70480,[70493,5],[70656,53],[70727,4],[70751,3],[70784,48],[70852,2],70855,[71040,47],[71128,4],[71168,48],71236,[71296,43],71352,[71424,27],[71680,44],[71840,64],[71935,8],71945,[71948,8],[71957,2],[71960,24],71999,72001,[72096,8],[72106,39],72161,72163,72192,[72203,40],72250,72272,[72284,46],72349,[72384,57],[72704,9],[72714,37],72768,[72818,30],[72960,7],[72968,2],[72971,38],73030,[73056,6],[73063,2],[73066,32],73112,[73440,19],73648,[73728,922],[74752,111],[74880,196],[77824,1071],[82944,583],[92160,569],[92736,31],[92880,30],[92928,48],[92992,4],[93027,21],[93053,19],[93760,64],[93952,75],94032,[94099,13],[94176,2],94179,[94208,6136],[100352,1238],[101632,9],[110592,287],[110928,3],[110948,4],[110960,396],[113664,107],[113776,13],[113792,9],[113808,10],[119808,85],[119894,71],[119966,2],119970,[119973,2],[119977,4],[119982,12],119995,[119997,7],[120005,65],[120071,4],[120077,8],[120086,7],[120094,28],[120123,4],[120128,5],120134,[120138,7],[120146,340],[120488,25],[120514,25],[120540,31],[120572,25],[120598,31],[120630,25],[120656,31],[120688,25],[120714,31],[120746,25],[120772,8],[123136,45],[123191,7],123214,[123584,44],[124928,197],[125184,68],125259,[126464,4],[126469,27],[126497,2],126500,126503,[126505,10],[126516,4],126521,126523,126530,126535,126537,126539,[126541,3],[126545,2],126548,126551,126553,126555,126557,126559,[126561,2],126564,[126567,4],[126572,7],[126580,4],[126585,4],126590,[126592,10],[126603,17],[126625,3],[126629,5],[126635,17],[131072,42718],[173824,4149],[177984,222],[178208,5762],[183984,7473],[194560,542],[196608,4939]],"XID_Continue":[[48,10],[65,26],95,[97,26],170,181,183,186,[192,23],[216,31],[248,458],[710,12],[736,5],748,750,[768,117],[886,2],[891,3],895,902,903,[904,3],908,[910,20],[931,83],[1015,139],[1155,5],[1162,166],[1329,38],1369,[1376,41],[1425,45],1471,[1473,2],[1476,2],1479,[1488,27],[1519,4],[1552,11],[1568,74],[1646,102],1749,[1750,7],[1759,10],[1770,19],1791,1808,1809,[1810,57],[1869,101],[1984,54],2042,2045,[2048,46],[2112,28],[2144,11],[2208,21],[2230,18],[2259,15],[2275,129],[2406,10],2417,[2418,18],[2437,8],[2447,2],[2451,22],[2474,7],2482,[2486,4],2492,2493,[2494,7],[2503,2],[2507,4],2519,[2524,2],[2527,5],[2534,12],2556,2558,[2561,3],[2565,6],[2575,2],[2579,22],[2602,7],[2610,2],[2613,2],[2616,2],2620,[2622,5],[2631,2],[2635,3],2641,[2649,4],2654,[2662,16],[2689,3],[2693,9],[2703,3],[2707,22],[2730,7],[2738,2],[2741,5],2748,2749,[2750,8],[2759,3],[2763,3],2768,[2784,4],[2790,10],2809,[2810,6],2817,[2818,2],[2821,8],[2831,2],[2835,22],[2858,7],[2866,2],[2869,5],2876,2877,2878,2879,2880,[2881,4],[2887,2],[2891,3],[2901,3],[2908,2],[2911,5],[2918,10],2929,2946,2947,[2949,6],[2958,3],[2962,4],[2969,2],2972,[2974,2],[2979,2],[2984,3],[2990,12],[3006,5],[3014,3],[3018,4],3024,3031,[3046,10],3072,[3073,12],[3086,3],[3090,23],[3114,16],3133,[3134,7],[3142,3],[3146,4],[3157,2],[3160,3],[3168,4],[3174,10],3200,3201,[3202,2],[3205,8],[3214,3],[3218,23],[3242,10],[3253,5],3260,3261,3262,3263,[3264,5],3270,[3271,2],[3274,4],[3285,2],3294,[3296,4],[3302,10],[3313,2],[3328,13],[3342,3],[3346,51],[3398,3],[3402,5],[3412,4],[3423,5],[3430,10],[3450,6],3457,[3458,2],[3461,18],[3482,24],[3507,9],3517,[3520,7],3530,[3535,6],3542,[3544,8],[3558,10],[3570,2],[3585,58],[3648,15],[3664,10],[3713,2],3716,[3718,5],[3724,24],3749,[3751,23],[3776,5],3782,[3784,6],[3792,10],[3804,4],3840,[3864,2],[3872,10],3893,3895,3897,[3902,10],[3913,36],[3953,20],[3974,18],[3993,36],4038,[4096,74],[4176,78],[4256,38],4295,4301,[4304,43],4348,[4349,332],[4682,4],[4688,7],4696,[4698,4],[4704,41],[4746,4],[4752,33],[4786,4],[4792,7],4800,[4802,4],[4808,15],[4824,57],[4882,4],[4888,67],[4957,3],[4969,9],[4992,16],[5024,86],[5112,6],[5121,620],[5743,17],[5761,26],[5792,75],[5870,11],[5888,13],[5902,7],[5920,21],[5952,20],[5984,13],[5998,3],[6002,2],[6016,84],6103,6108,6109,[6112,10],[6155,3],[6160,10],[6176,89],[6272,43],[6320,70],[6400,31],[6432,12],[6448,12],[6470,40],[6512,5],[6528,44],[6576,26],[6608,11],[6656,28],[6688,63],6752,6753,6754,[6755,26],6783,[6784,10],[6800,10],6823,[6832,14],[6847,2],[6912,76],[6992,10],[7019,9],[7040,116],[7168,56],[7232,10],[7245,49],[7296,9],[7312,43],[7357,3],[7376,3],[7380,39],[7424,250],[7675,283],[7960,6],[7968,38],[8008,6],[8016,8],8025,8027,8029,[8031,31],[8064,53],[8118,7],8126,[8130,3],[8134,7],[8144,4],[8150,6],[8160,13],[8178,3],[8182,7],[8255,2],8276,8305,8319,[8336,13],[8400,13],8417,[8421,12],8450,8455,[8458,10],8469,8472,[8473,5],8484,8486,8488,[8490,16],[8508,4],[8517,5],8526,[8544,41],[11264,47],[11312,47],[11360,133],[11499,9],[11520,38],11559,11565,[11568,56],11631,11647,[11648,23],[11680,7],[11688,7],[11696,7],[11704,7],[11712,7],[11720,7],[11728,7],[11736,7],[11744,32],12293,12294,12295,[12321,15],[12337,5],[12344,5],[12353,86],[12441,2],[12445,3],[12449,90],[12540,4],[12549,43],[12593,94],[12704,32],[12784,16],[13312,6592],[19968,20989],[40960,1165],[42192,46],[42240,269],[42512,28],[42560,48],[42612,10],42623,[42624,114],[42775,9],[42786,103],[42891,53],[42946,9],[42997,51],43052,[43072,52],[43136,70],[43216,10],[43232,24],43259,[43261,49],[43312,36],[43360,29],[43392,65],43471,[43472,10],[43488,31],[43520,55],[43584,14],[43600,10],[43616,23],43642,43643,43644,43645,[43646,69],[43739,3],[43744,16],43762,[43763,4],[43777,6],[43785,6],[43793,6],[43808,7],[43816,7],[43824,43],[43868,14],[43888,123],44012,44013,[44016,10],[44032,11172],[55216,23],[55243,49],[63744,366],[64112,106],[64256,7],[64275,5],64285,64286,[64287,10],[64298,13],[64312,5],64318,[64320,2],[64323,2],[64326,108],[64467,139],[64612,218],[64848,64],[64914,54],[65008,10],[65024,16],[65056,16],[65075,2],[65101,3],65137,65139,65143,65145,65147,65149,[65151,126],[65296,10],[65313,26],65343,[65345,26],[65382,89],[65474,6],[65482,6],[65490,6],[65498,3],[65536,12],[65549,26],[65576,19],[65596,2],[65599,15],[65616,14],[65664,123],[65856,53],66045,[66176,29],[66208,49],66272,[66304,32],[66349,30],[66384,43],[66432,30],[66464,36],[66504,8],[66513,5],[66560,158],[66720,10],[66736,36],[66776,36],[66816,40],[66864,52],[67072,311],[67392,22],[67424,8],[67584,6],67592,[67594,44],[67639,2],67644,[67647,23],[67680,23],[67712,31],[67808,19],[67828,2],[67840,22],[67872,26],[67968,56],[68030,2],68096,[68097,3],[68101,2],[68108,8],[68117,3],[68121,29],[68152,3],68159,[68192,29],[68224,29],[68288,8],[68297,30],[68352,54],[68416,22],[68448,19],[68480,18],[68608,73],[68736,51],[68800,51],[68864,40],[68912,10],[69248,42],[69291,2],[69296,2],[69376,29],69415,[69424,33],[69552,21],[69600,23],69632,69633,69634,[69635,68],[69734,10],[69759,60],[69840,25],[69872,10],[69888,53],[69942,10],69956,[69957,3],[69968,36],70006,[70016,69],[70089,4],70094,70095,[70096,11],70108,[70144,18],[70163,37],70206,[70272,7],70280,[70282,4],[70287,15],[70303,10],[70320,59],[70384,10],[70400,4],[70405,8],[70415,2],[70419,22],[70442,7],[70450,2],[70453,5],[70459,10],[70471,2],[70475,3],70480,70487,[70493,7],[70502,7],[70512,5],[70656,75],[70736,10],70750,[70751,3],[70784,70],70855,[70864,10],[71040,54],[71096,9],[71128,6],[71168,65],71236,[71248,10],[71296,57],[71360,10],[71424,27],[71453,15],[71472,10],[71680,59],[71840,74],[71935,8],71945,[71948,8],[71957,2],[71960,30],[71991,2],[71995,9],[72016,10],[72096,8],[72106,46],[72154,8],72163,72164,72192,[72193,62],72263,72272,[72273,73],72349,[72384,57],[72704,9],[72714,45],[72760,9],[72784,10],[72818,30],[72850,22],72873,[72874,13],[72960,7],[72968,2],[72971,44],73018,[73020,2],[73023,9],[73040,10],[73056,6],[73063,2],[73066,37],[73104,2],[73107,6],[73120,10],[73440,23],73648,[73728,922],[74752,111],[74880,196],[77824,1071],[82944,583],[92160,569],[92736,31],[92768,10],[92880,30],[92912,5],[92928,55],[92992,4],[93008,10],[93027,21],[93053,19],[93760,64],[93952,75],94031,94032,[94033,55],[94095,17],[94176,2],94179,94180,[94192,2],[94208,6136],[100352,1238],[101632,9],[110592,287],[110928,3],[110948,4],[110960,396],[113664,107],[113776,13],[113792,9],[113808,10],[113821,2],[119141,5],[119149,6],[119163,8],[119173,7],[119210,4],[119362,3],[119808,85],[119894,71],[119966,2],119970,[119973,2],[119977,4],[119982,12],119995,[119997,7],[120005,65],[120071,4],[120077,8],[120086,7],[120094,28],[120123,4],[120128,5],120134,[120138,7],[120146,340],[120488,25],[120514,25],[120540,31],[120572,25],[120598,31],[120630,25],[120656,31],[120688,25],[120714,31],[120746,25],[120772,8],[120782,50],[121344,55],[121403,50],121461,121476,[121499,5],[121505,15],[122880,7],[122888,17],[122907,7],[122915,2],[122918,5],[123136,45],[123184,14],[123200,10],123214,[123584,58],[124928,197],[125136,7],[125184,76],[125264,10],[126464,4],[126469,27],[126497,2],126500,126503,[126505,10],[126516,4],126521,126523,126530,126535,126537,126539,[126541,3],[126545,2],126548,126551,126553,126555,126557,126559,[126561,2],126564,[126567,4],[126572,7],[126580,4],[126585,4],126590,[126592,10],[126603,17],[126625,3],[126629,5],[126635,17],[130032,10],[131072,42718],[173824,4149],[177984,222],[178208,5762],[183984,7473],[194560,542],[196608,4939],[917760,240]]}
$B.unicode_tables={}
for(var gc in $B.unicode){$B.unicode_tables[gc]={}
$B.unicode[gc].forEach(function(item){if(Array.isArray(item)){var step=item[2]||1
for(var i=0,nb=item[1];i < nb;i+=1){$B.unicode_tables[gc][item[0]+i*step]=true}}else{$B.unicode_tables[gc][item]=true}})}
for(var key in $B.unicode_identifiers){$B.unicode_tables[key]={}
for(const item of $B.unicode_identifiers[key]){if(Array.isArray(item)){for(var i=0;i < item[1];i++){$B.unicode_tables[key][item[0]+i]=true}}else{$B.unicode_tables[key][item]=true}}}
$B.is_unicode_cn=function(i){
var cn=$B.unicode.Cn
for(var j=0,len=cn.length;j < len;j++){if(i >=cn[j][0]){if(i < cn[j][0]+cn[j][1]){return true}}
return false}
return false}
;
;(function($B){var _b_=$B.builtins
var unicode_tables=$B.unicode_tables
$B.has_surrogate=function(s){
for(var i=0;i < s.length;i++){code=s.charCodeAt(i)
if(code >=0xD800 && code <=0xDBFF){return true}}
return false}
$B.String=function(s){var codepoints=[],surrogates=[],j=0
for(var i=0,len=s.length;i < len;i++){var cp=s.codePointAt(i)
if(cp >=0x10000){surrogates.push(j)
i++}
j++}
if(surrogates.length==0){return s}
var res=new String(s)
res.__class__=str
res.surrogates=surrogates
return res}
function pypos2jspos(s,pypos){
if(s.surrogates===undefined){return pypos}
var nb=0
while(s.surrogates[nb]< pypos){nb++}
return pypos+nb}
function jspos2pypos(s,jspos){
if(s.surrogates===undefined){return jspos}
var nb=0
while(s.surrogates[nb]+nb < jspos){nb++}
return jspos-nb}
function to_string(args){if(Array.isArray(args)){for(var i=0,len=args.length;i < len;i++){args[i]=to_string(args[i])}
return args}else{if(args.__class__ && !(args instanceof String)){return args.$brython_value}else{return args}}}
var str={__class__:_b_.type,__dir__:_b_.object.__dir__,$infos:{__module__:"builtins",__name__:"str"},$is_class:true,$native:true}
function normalize_start_end($){var len
if(typeof $.self=="string"){len=$.self.length}else{len=str.__len__($.self)}
if($.start===null ||$.start===_b_.None){$.start=0}else if($.start < 0){$.start+=len
$.start=Math.max(0,$.start)}
if($.end===null ||$.end===_b_.None){$.end=len}else if($.end < 0){$.end+=len
$.end=Math.max(0,$.end)}
if(! _b_.isinstance($.start,_b_.int)||! _b_.isinstance($.end,_b_.int)){throw _b_.TypeError.$factory("slice indices must be integers "+
"or None or have an __index__ method")}
if($.self.surrogates){$.js_start=pypos2jspos($.self,$.start)
$.js_end=pypos2jspos($.self,$.end)}}
function reverse(s){
return s.split("").reverse().join("")}
function check_str(obj,prefix){if(obj instanceof String ||typeof obj=="string"){return}
if(! _b_.isinstance(obj,str)){throw _b_.TypeError.$factory((prefix ||'')+
"must be str, not "+$B.class_name(obj))}}
function to_chars(s){
s=to_string(s)
var chars=[]
for(var i=0,len=s.length;i < len;i++){var code=s.charCodeAt(i)
if(code >=0xD800 && code <=0xDBFF){chars.push(s.substr(i,2))
i++}else{chars.push(s.charAt(i))}}
return chars}
function to_codepoints(s){
if(s.codepoints){return s.codepoints}
var cps=[]
for(var i=0,len=s.length;i < len;i++){var code=s.charCodeAt(i)
if(code >=0xD800 && code <=0xDBFF){var v=0x10000
v+=(code & 0x03FF)<< 10
v+=(s.charCodeAt(i+1)& 0x03FF)
cps.push(v)
i++}else{cps.push(code)}}
return s.codepoints=cps}
str.__add__=function(_self,other){if(! _b_.isinstance(other,str)){try{return $B.$getattr(other,"__radd__")(_self)}catch(err){throw _b_.TypeError.$factory("Can't convert "+
$B.class_name(other)+" to str implicitly")}}
[_self,other]=to_string([_self,other])
return $B.String(_self+other)}
str.__contains__=function(_self,item){if(! _b_.isinstance(item,str)){throw _b_.TypeError.$factory("'in <string>' requires "+
"string as left operand, not "+$B.class_name(item))}
[_self,item]=to_string([_self,item])
if(item.__class__===str ||_b_.isinstance(item,str)){var nbcar=item.length}else{var nbcar=_b_.len(item)}
if(nbcar==0){
return true}
var len=_self.length
if(len==0){return nbcar==0}
for(var i=0,len=_self.length;i < len;i++){if(_self.substr(i,nbcar)==item){return true}}
return false}
str.__delitem__=function(){throw _b_.TypeError.$factory("'str' object doesn't support item deletion")}
str.__dir__=_b_.object.__dir__
str.__eq__=function(_self,other){if(_b_.isinstance(other,str)){[_self,other]=to_string([_self,other])
return _self==other}
return _b_.NotImplemented}
function preformat(_self,fmt){if(fmt.empty){return _b_.str.$factory(_self)}
if(fmt.type && fmt.type !="s"){throw _b_.ValueError.$factory("Unknown format code '"+fmt.type+
"' for object of type 'str'")}
return _self}
str.__format__=function(_self,format_spec){[_self,format_spec]=to_string([_self,format_spec])
var fmt=new $B.parse_format_spec(format_spec)
if(fmt.sign !==undefined){throw _b_.ValueError.$factory(
"Sign not allowed in string format specifier")}
if(fmt.precision){_self=_self.substr(0,fmt.precision)}
fmt.align=fmt.align ||"<"
return $B.format_width(preformat(_self,fmt),fmt)}
str.__getitem__=function(_self,arg){_self=to_string(_self)
var len=str.__len__(_self)
if(_b_.isinstance(arg,_b_.int)){var pos=arg
if(arg < 0){pos+=len}
if(pos >=0 && pos < len){var jspos=pypos2jspos(_self,pos)
if(_self.codePointAt(jspos)>=0x10000){return $B.String(_self.substr(jspos,2))}else{return _self[jspos]}}
throw _b_.IndexError.$factory("string index out of range")}
if(_b_.isinstance(arg,_b_.slice)){var s=_b_.slice.$conv_for_seq(arg,len),start=pypos2jspos(_self,s.start),stop=pypos2jspos(_self,s.stop),step=s.step
var res="",i=null
if(step > 0){if(stop <=start){return ""}
for(var i=start;i < stop;i+=step){res+=_self[i]}}else{if(stop >=start){return ''}
for(var i=start;i > stop;i+=step){res+=_self[i]}}
return $B.String(res)}
if(_b_.isinstance(arg,_b_.bool)){return _self.__getitem__(_b_.int.$factory(arg))}
throw _b_.TypeError.$factory("string indices must be integers")}
var prefix=2,suffix=3,mask=(2**32-1),str_hash_cache={}
str.$nb_str_hash_cache=0
function fnv(p){if(p.length==0){return 0}
var x=prefix
x=(x ^(p[0]<< 7))& mask
for(var i=0,len=p.length;i < len;i++){x=((1000003*x)^ p[i])& mask}
x=(x ^ p.length)& mask
x=(x ^ suffix)& mask
if(x==-1){x=-2}
return x}
str.__hash__=function(_self){if(str_hash_cache[_self]!==undefined){return str_hash_cache[_self]}
str.$nb_str_hash_cache++
if(str.$nb_str_hash_cache > 100000){
str.$nb_str_hash_cache=0
str_hash_cache={}}
try{return str_hash_cache[_self]=fnv(to_codepoints(_self))}catch(err){console.log('error hash, cps',_self,to_codepoints(_self))
throw err}}
str.__init__=function(self,arg){
return _b_.None}
var str_iterator=$B.make_iterator_class("str_iterator")
str.__iter__=function(_self){return str_iterator.$factory(to_chars(_self))}
str.__len__=function(_self){_self=to_string(_self)
if(_self.surrogates===undefined){return _self.length}
if(_self.len !==undefined){return _self.len}
var len=_self.len=_self.length-_self.surrogates.length
return len}
var kwarg_key=new RegExp("([^\\)]*)\\)")
var NotANumber=function(){this.name="NotANumber"}
var number_check=function(s){if(! _b_.isinstance(s,[_b_.int,_b_.float])){throw new NotANumber()}}
var get_char_array=function(size,char){if(size <=0){return ""}
return new Array(size+1).join(char)}
var format_padding=function(s,flags,minus_one){var padding=flags.padding
if(! padding){
return s}
s=s.toString()
padding=parseInt(padding,10)
if(minus_one){
padding-=1}
if(! flags.left){return get_char_array(padding-s.length,flags.pad_char)+s}else{
return s+get_char_array(padding-s.length,flags.pad_char)}}
var format_int_precision=function(val,flags){var precision=flags.precision
if(!precision){return val.toString()}
precision=parseInt(precision,10)
var s
if(val.__class__===$B.long_int){s=$B.long_int.to_base(val,10)}else{s=val.toString()}
if(s[0]==="-"){return "-"+get_char_array(precision-s.length+1,"0")+s.slice(1)}
return get_char_array(precision-s.length,"0")+s}
var format_float_precision=function(val,upper,flags,modifier){var precision=flags.precision
if(isFinite(val)){return modifier(val,precision,flags,upper)}
if(val===Infinity){val="inf"}else if(val===-Infinity){val="-inf"}else{val="nan"}
if(upper){return val.toUpperCase()}
return val}
var format_sign=function(val,flags){if(flags.sign){if(val >=0){return "+"}}else if(flags.space){if(val >=0){return " "}}
return ""}
var str_format=function(val,flags){
flags.pad_char=" " 
return format_padding(str.$factory(val),flags)}
var num_format=function(val,flags){number_check(val)
if(val.__class__===$B.long_int){val=$B.long_int.to_base(val,10)}else{val=parseInt(val)}
var s=format_int_precision(val,flags)
if(flags.pad_char==="0"){if(val < 0){s=s.substring(1)
return "-"+format_padding(s,flags,true)}
var sign=format_sign(val,flags)
if(sign !==""){return sign+format_padding(s,flags,true)}}
return format_padding(format_sign(val,flags)+s,flags)}
var repr_format=function(val,flags){flags.pad_char=" " 
return format_padding(_b_.repr(val),flags)}
var ascii_format=function(val,flags){flags.pad_char=" " 
return format_padding(_b_.ascii(val),flags)}
var _float_helper=function(val,flags){number_check(val)
if(! flags.precision){if(! flags.decimal_point){flags.precision=6}else{flags.precision=0}}else{flags.precision=parseInt(flags.precision,10)
validate_precision(flags.precision)}
return parseFloat(val)}
var trailing_zeros=/(.*?)(0+)([eE].*)/,leading_zeros=/\.(0*)/,trailing_dot=/\.$/
var validate_precision=function(precision){
if(precision > 20){precision=20}}
var floating_point_format=function(val,upper,flags){val=_float_helper(val,flags),v=val.toString(),v_len=v.length,dot_idx=v.indexOf('.')
if(dot_idx < 0){dot_idx=v_len}
if(val < 1 && val >-1){var zeros=leading_zeros.exec(v),numzeros
if(zeros){numzeros=zeros[1].length}else{numzeros=0}
if(numzeros >=4){val=format_sign(val,flags)+format_float_precision(val,upper,flags,_floating_g_exp_helper)
if(!flags.alternate){var trl=trailing_zeros.exec(val)
if(trl){val=trl[1].replace(trailing_dot,"")+trl[3]}}else{if(flags.precision <=1){val=val[0]+"."+val.substring(1)}}
return format_padding(val,flags)}
flags.precision=(flags.precision ||0)+numzeros
return format_padding(format_sign(val,flags)+
format_float_precision(val,upper,flags,function(val,precision){return val.toFixed(_b_.min(precision,v_len-dot_idx)+
numzeros)}),flags
)}
if(dot_idx > flags.precision){val=format_sign(val,flags)+format_float_precision(val,upper,flags,_floating_g_exp_helper)
if(! flags.alternate){var trl=trailing_zeros.exec(val)
if(trl){val=trl[1].replace(trailing_dot,"")+trl[3]}}else{if(flags.precision <=1){val=val[0]+"."+val.substring(1)}}
return format_padding(val,flags)}
return format_padding(format_sign(val,flags)+
format_float_precision(val,upper,flags,function(val,precision){if(!flags.decimal_point){precision=_b_.min(v_len-1,6)}else if(precision > v_len){if(! flags.alternate){precision=v_len}}
if(precision < dot_idx){precision=dot_idx}
return val.toFixed(precision-dot_idx)}),flags
)}
var _floating_g_exp_helper=function(val,precision,flags,upper){if(precision){--precision}
val=val.toExponential(precision)
var e_idx=val.lastIndexOf("e")
if(e_idx > val.length-4){val=val.substring(0,e_idx+2)+"0"+val.substring(e_idx+2)}
if(upper){return val.toUpperCase()}
return val}
var floating_point_decimal_format=function(val,upper,flags){val=_float_helper(val,flags)
return format_padding(format_sign(val,flags)+
format_float_precision(val,upper,flags,function(val,precision,flags){val=val.toFixed(precision)
if(precision===0 && flags.alternate){val+='.'}
return val}),flags
)}
var _floating_exp_helper=function(val,precision,flags,upper){val=val.toExponential(precision)
var e_idx=val.lastIndexOf("e")
if(e_idx > val.length-4){val=val.substring(0,e_idx+2)+"0"+val.substring(e_idx+2)}
if(upper){return val.toUpperCase()}
return val}
var floating_point_exponential_format=function(val,upper,flags){val=_float_helper(val,flags)
return format_padding(format_sign(val,flags)+
format_float_precision(val,upper,flags,_floating_exp_helper),flags)}
var signed_hex_format=function(val,upper,flags){var ret
number_check(val)
if(val.__class__===$B.long_int){ret=$B.long_int.to_base(val,16)}else{ret=parseInt(val)
ret=ret.toString(16)}
ret=format_int_precision(ret,flags)
if(upper){ret=ret.toUpperCase()}
if(flags.pad_char==="0"){if(val < 0){ret=ret.substring(1)
ret="-"+format_padding(ret,flags,true)}
var sign=format_sign(val,flags)
if(sign !==""){ret=sign+format_padding(ret,flags,true)}}
if(flags.alternate){if(ret.charAt(0)==="-"){if(upper){ret="-0X"+ret.slice(1)}
else{ret="-0x"+ret.slice(1)}}else{if(upper){ret="0X"+ret}
else{ret="0x"+ret}}}
return format_padding(format_sign(val,flags)+ret,flags)}
var octal_format=function(val,flags){number_check(val)
var ret
if(val.__class__===$B.long_int){ret=$B.long_int.to_base(8)}else{ret=parseInt(val)
ret=ret.toString(8)}
ret=format_int_precision(ret,flags)
if(flags.pad_char==="0"){if(val < 0){ret=ret.substring(1)
ret="-"+format_padding(ret,flags,true)}
var sign=format_sign(val,flags)
if(sign !==""){ret=sign+format_padding(ret,flags,true)}}
if(flags.alternate){if(ret.charAt(0)==="-"){ret="-0o"+ret.slice(1)}
else{ret="0o"+ret}}
return format_padding(ret,flags)}
function series_of_bytes(val,flags){if(val.__class__ && val.__class__.$buffer_protocol){var it=_b_.iter(val),ints=[]
while(true){try{ints.push(_b_.next(it))}catch(err){if(err.__class__===_b_.StopIteration){var b=_b_.bytes.$factory(ints)
return format_padding(_b_.bytes.decode(b,"ascii"),flags)}
throw err}}}else{try{bytes_obj=$B.$getattr(val,"__bytes__")
return format_padding(_b_.bytes.decode(bytes_obj),flags)}catch(err){if(err.__class__===_b_.AttributeError){throw _b_.TypeError.$factory("%b does not accept '"+
$B.class_name(val)+"'")}
throw err}}}
var single_char_format=function(val,flags){if(_b_.isinstance(val,str)&& val.length==1){return val}else if(_b_.isinstance(val,_b_.bytes)&& val.source.length==1){val=val.source[0]}else{try{val=_b_.int.$factory(val)}catch(err){throw _b_.TypeError.$factory("%c requires int or char")}}
return format_padding(_b_.chr(val),flags)}
var num_flag=function(c,flags){if(c==="0" && ! flags.padding && ! flags.decimal_point && ! flags.left){flags.pad_char="0"
return}
if(!flags.decimal_point){flags.padding=(flags.padding ||"")+c}else{flags.precision=(flags.precision ||"")+c}}
var decimal_point_flag=function(val,flags){if(flags.decimal_point){
throw new UnsupportedChar()}
flags.decimal_point=true}
var neg_flag=function(val,flags){flags.pad_char=" " 
flags.left=true}
var space_flag=function(val,flags){flags.space=true}
var sign_flag=function(val,flags){flags.sign=true}
var alternate_flag=function(val,flags){flags.alternate=true}
var char_mapping={"b":series_of_bytes,"s":str_format,"d":num_format,"i":num_format,"u":num_format,"o":octal_format,"r":repr_format,"a":ascii_format,"g":function(val,flags){return floating_point_format(val,false,flags)},"G":function(val,flags){return floating_point_format(val,true,flags)},"f":function(val,flags){return floating_point_decimal_format(val,false,flags)},"F":function(val,flags){return floating_point_decimal_format(val,true,flags)},"e":function(val,flags){return floating_point_exponential_format(val,false,flags)},"E":function(val,flags){return floating_point_exponential_format(val,true,flags)},"x":function(val,flags){return signed_hex_format(val,false,flags)},"X":function(val,flags){return signed_hex_format(val,true,flags)},"c":single_char_format,"0":function(val,flags){return num_flag("0",flags)},"1":function(val,flags){return num_flag("1",flags)},"2":function(val,flags){return num_flag("2",flags)},"3":function(val,flags){return num_flag("3",flags)},"4":function(val,flags){return num_flag("4",flags)},"5":function(val,flags){return num_flag("5",flags)},"6":function(val,flags){return num_flag("6",flags)},"7":function(val,flags){return num_flag("7",flags)},"8":function(val,flags){return num_flag("8",flags)},"9":function(val,flags){return num_flag("9",flags)},"-":neg_flag," ":space_flag,"+":sign_flag,".":decimal_point_flag,"#":alternate_flag}
var UnsupportedChar=function(){this.name="UnsupportedChar"}
str.__mod__=function(_self,args){_self=to_string(_self)
var length=_self.length,pos=0 |0,argpos=null,getitem
if(_b_.isinstance(args,_b_.tuple)){argpos=0 |0}else{getitem=$B.$getattr(args,"__getitem__",_b_.None)}
var ret=''
var $get_kwarg_string=function(s){
++pos
var rslt=kwarg_key.exec(s.substring(newpos))
if(! rslt){throw _b_.ValueError.$factory("incomplete format key")}
var key=rslt[1]
newpos+=rslt[0].length
try{var _self=getitem(key)}catch(err){if(err.__class__===_b_.KeyError){throw err}
throw _b_.TypeError.$factory("format requires a mapping")}
return get_string_value(s,_self)}
var $get_arg_string=function(s){
var _self
if(argpos===null){
_self=args}else{_self=args[argpos++]
if(_self===undefined){throw _b_.TypeError.$factory(
"not enough arguments for format string")}}
return get_string_value(s,_self)}
var get_string_value=function(s,_self){
var flags={"pad_char":" "}
do{var func=char_mapping[s[newpos]]
try{if(func===undefined){throw new UnsupportedChar()}else{var ret=func(_self,flags)
if(ret !==undefined){return ret}
++newpos}}catch(err){if(err.name=="UnsupportedChar"){invalid_char=s[newpos]
if(invalid_char===undefined){throw _b_.ValueError.$factory("incomplete format")}
throw _b_.ValueError.$factory(
"unsupported format character '"+invalid_char+
"' (0x"+invalid_char.charCodeAt(0).toString(16)+
") at index "+newpos)}else if(err.name==="NotANumber"){var try_char=s[newpos],cls=_self.__class__
if(!cls){if(typeof(_self)==="string"){cls="str"}else{cls=typeof(_self)}}else{cls=cls.$infos.__name__}
throw _b_.TypeError.$factory("%"+try_char+
" format: a number is required, not "+cls)}else{throw err}}}while(true)}
var nbph=0 
do{var newpos=_self.indexOf("%",pos)
if(newpos < 0){ret+=_self.substring(pos)
break}
ret+=_self.substring(pos,newpos)
++newpos
if(newpos < length){if(_self[newpos]==="%"){ret+="%"}else{nbph++
if(_self[newpos]==="("){++newpos
ret+=$get_kwarg_string(_self)}else{ret+=$get_arg_string(_self)}}}else{
throw _b_.ValueError.$factory("incomplete format")}
pos=newpos+1}while(pos < length)
if(argpos !==null){if(args.length > argpos){throw _b_.TypeError.$factory(
"not enough arguments for format string")}else if(args.length < argpos){throw _b_.TypeError.$factory(
"not all arguments converted during string formatting")}}else if(nbph==0){throw _b_.TypeError.$factory(
"not all arguments converted during string formatting")}
return ret}
str.__mro__=[_b_.object]
str.__mul__=function(){var $=$B.args("__mul__",2,{self:null,other:null},["self","other"],arguments,{},null,null),_self=to_string($.self)
if(! _b_.isinstance($.other,_b_.int)){throw _b_.TypeError.$factory(
"Can't multiply sequence by non-int of type '"+
$B.class_name($.other)+"'")}
return _self.repeat($.other < 0 ? 0 :$.other)}
str.__ne__=function(_self,other){var eq=str.__eq__(_self,other)
return eq===_b_.NotImplemented ? eq :! eq}
str.__new__=function(cls,value){if(cls===undefined){throw _b_.TypeError.$factory("str.__new__(): not enough arguments")}else if(cls===_b_.str){return value}else{return{
__class__:cls,$brython_value:str.$factory(value),__dict__:$B.empty_dict()}}}
function __newobj__(){
var $=$B.args('__newobj__',0,{},[],arguments,{},'args',null),args=$.args
var res=args[1]
res.__class__=args[0]
return res}
str.__reduce_ex__=function(_self){_self=to_string(_self)
return $B.fast_tuple([__newobj__,$B.fast_tuple([_self.__class__ ||_b_.str,_self]),_b_.None,_b_.None])}
str.__repr__=function(_self){
_self=to_string(_self)
var t=$B.special_string_repr,
repl='',chars=to_chars(_self)
for(var i=0;i < chars.length;i++){var cp=_b_.ord(chars[i])
if(t[cp]!==undefined){repl+=t[cp]}else if($B.is_unicode_cn(cp)){var s=cp.toString(16)
while(s.length < 4){s='0'+s}
repl+='\\u'+s}else if(cp < 0x20 ||(cp >=0x7f && cp < 0xa0)){cp=cp.toString(16)
if(cp.length < 2){cp='0'+cp}
repl+='\\x'+cp}else if(cp >=0x300 && cp <=0x36F){repl+="\u200B"+chars[i]+' '}else if(cp.toString(16)=='feff'){repl+='\\ufeff'}else{repl+=chars[i]}}
var res=repl
if(res.search('"')==-1 && res.search("'")==-1){return "'"+res+"'"}else if(_self.search('"')==-1){return '"'+res+'"'}
var qesc=new RegExp("'","g")
res="'"+res.replace(qesc,"\\'")+"'"
return res}
str.__rmod__=function(){var $=$B.args('__rmod__',2,{self:null,other:null},['self','other'],arguments,{},null,null)
return str.__mod__($.other,$.self)}
str.__rmul__=function(_self,other){_self=to_string(_self)
if(_b_.isinstance(other,_b_.int)){other=_b_.int.numerator(other)
var res=''
while(other > 0){res+=_self
other--}
return res}
return _b_.NotImplemented}
str.__setattr__=function(_self,attr,value){if(typeof _self==="string"){if(str.hasOwnProperty(attr)){throw _b_.AttributeError.$factory("'str' object attribute '"+
attr+"' is read-only")}else{throw _b_.AttributeError.$factory(
"'str' object has no attribute '"+attr+"'")}}
_b_.dict.$setitem(_self.__dict__,attr,value)
return _b_.None}
str.__setitem__=function(self,attr,value){throw _b_.TypeError.$factory(
"'str' object does not support item assignment")}
var combining=[]
for(var cp=0x300;cp <=0x36F;cp++){combining.push(String.fromCharCode(cp))}
var combining_re=new RegExp("("+combining.join("|")+")","g")
str.__str__=function(_self){_self=to_string(_self)
var repl='',chars=to_chars(_self)
if(chars.length==_self.length){return _self.replace(combining_re,"\u200B$1")}
for(var i=0;i < chars.length;i++){var cp=_b_.ord(chars[i])
if(cp >=0x300 && cp <=0x36F){repl+="\u200B"+chars[i]}else{repl+=chars[i]}}
return repl}
str.toString=function(){return "string!"}
var $comp_func=function(_self,other){if(typeof other !==typeof _self){return _b_.NotImplemented}else if(typeof _self=="string"){return _self > other}else{return _self.$brython_value > other.$brython_value}}
$comp_func+="" 
var $comps={">":"gt",">=":"ge","<":"lt","<=":"le"}
for(var $op in $comps){eval("str.__"+$comps[$op]+'__ = '+$comp_func.replace(/>/gm,$op))}
var $notimplemented=function(self,other){throw _b_.NotImplementedError.$factory(
"OPERATOR not implemented for class str")}
str.capitalize=function(){var $=$B.args("capitalize",1,{self},["self"],arguments,{},null,null),_self=to_string($.self)
if(_self.length==0){return ""}
return _self.charAt(0).toUpperCase()+_self.substr(1)}
str.casefold=function(){var $=$B.args("casefold",1,{self},["self"],arguments,{},null,null),res="",char,cf,_self=to_string($.self),chars=to_chars(_self)
for(var i=0,len=chars.length;i < len;i++){char=chars[i]
cf=$B.unicode_casefold[char]
if(cf){cf.forEach(function(cp){res+=String.fromCharCode(cp)})}else{res+=char.toLowerCase()}}
return res}
str.center=function(){var $=$B.args("center",3,{self:null,width:null,fillchar:null},["self","width","fillchar"],arguments,{fillchar:" "},null,null),_self=to_string($.self)
if($.width <=_self.length){return _self}
var pad=parseInt(($.width-_self.length)/2),res=$.fillchar.repeat(pad)
res+=_self+res
if(res.length < $.width){res+=$.fillchar}
return res}
str.count=function(){var $=$B.args("count",4,{self:null,sub:null,start:null,stop:null},["self","sub","start","stop"],arguments,{start:null,stop:null},null,null),_self,sub
if(! _b_.isinstance($.sub,str)){throw _b_.TypeError.$factory("Can't convert '"+$B.class_name($.sub)+
"' object to str implicitly")}
[_self,sub]=to_string([$.self,$.sub])
var substr=_self
if($.start !==null){var _slice
if($.stop !==null){_slice=_b_.slice.$factory($.start,$.stop)}else{_slice=_b_.slice.$factory($.start,_self.length)}
substr=str.__getitem__.apply(null,[_self].concat(_slice))}else{if(_self.length+sub.length==0){return 1}}
if(sub.length==0){if($.start==_self.length){return 1}else if(substr.length==0){return 0}
return substr.length+1}
var n=0,pos=0
while(pos < substr.length){pos=substr.indexOf(sub,pos)
if(pos >=0){n++
pos+=sub.length}else{break}}
return n}
str.encode=function(){var $=$B.args("encode",3,{self:null,encoding:null,errors:null},["self","encoding","errors"],arguments,{encoding:"utf-8",errors:"strict"},null,null),_self=to_string($.self)
if($.encoding=="rot13" ||$.encoding=="rot_13"){
var res=""
for(var i=0,len=_self.length;i < len ;i++){var char=_self.charAt(i)
if(("a" <=char && char <="m")||("A" <=char && char <="M")){res+=String.fromCharCode(String.charCodeAt(char)+13)}else if(("m" < char && char <="z")||
("M" < char && char <="Z")){res+=String.fromCharCode(String.charCodeAt(char)-13)}else{res+=char}}
return res}
return _b_.bytes.__new__(_b_.bytes,$.self,$.encoding,$.errors)}
str.endswith=function(){
var $=$B.args("endswith",4,{self:null,suffix:null,start:null,end:null},["self","suffix","start","end"],arguments,{start:0,end:null},null,null),_self
normalize_start_end($);
_self=to_string($.self)
var suffixes=$.suffix
if(! _b_.isinstance(suffixes,_b_.tuple)){suffixes=[suffixes]}
var chars=to_chars(_self),s=chars.slice($.start,$.end)
for(var i=0,len=suffixes.length;i < len;i++){var suffix=suffixes[i]
if(! _b_.isinstance(suffix,str)){throw _b_.TypeError.$factory(
"endswith first arg must be str or a tuple of str, not int")}
suffix=suffix.__class__ ? suffix.$brython_value :suffix
if(suffix.length <=s.length &&
s.slice(s.length-suffix.length).join('')==suffix){return true}}
return false}
str.expandtabs=function(){var $=$B.args("expandtabs",2,{self:null,tabsize:null},["self","tabsize"],arguments,{tabsize:8},null,null),_self=to_string($.self)
var s=$B.$GetInt($.tabsize),col=0,pos=0,res="",chars=to_chars(_self)
if(s==1){return _self.replace(/\t/g," ")}
while(pos < chars.length){var car=chars[pos]
switch(car){case "\t":
while(col % s > 0){res+=" ";
col++}
break
case "\r":
case "\n":
res+=car
col=0
break
default:
res+=car
col++
break}
pos++}
return res}
str.find=function(){
var $=$B.args("str.find",4,{self:null,sub:null,start:null,end:null},["self","sub","start","end"],arguments,{start:0,end:null},null,null),_self
check_str($.sub)
normalize_start_end($);
[_self,sub]=to_string([$.self,$.sub])
var len=str.__len__(_self),sub_len=str.__len__(sub)
if(sub_len==0 && $.start==len){return len}
if(len+sub_len==0){return-1}
var js_start=pypos2jspos(_self,$.start),js_end=pypos2jspos(_self,$.end),ix=_self.substring(js_start,js_end).indexOf(sub)
if(ix==-1){return-1}
return jspos2pypos(_self,js_start+ix)}
$B.parse_format=function(fmt_string){
var elts=fmt_string.split(":"),name,conv,spec,name_ext=[]
if(elts.length==1){
name=fmt_string}else{
name=elts[0]
spec=elts.splice(1).join(":")}
var elts=name.split("!")
if(elts.length > 1){name=elts[0]
conv=elts[1]}
if(name !==undefined){
function name_repl(match){name_ext.push(match)
return ""}
var name_ext_re=/\.[_a-zA-Z][_a-zA-Z0-9]*|\[[_a-zA-Z][_a-zA-Z0-9]*\]|\[[0-9]+\]/g
name=name.replace(name_ext_re,name_repl)}
return{name:name,name_ext:name_ext,conv:conv,spec:spec ||"",string:fmt_string}}
$B.split_format=function(s){
var pos=0,_len=s.length,car,text="",parts=[],rank=0
while(pos < _len){car=s.charAt(pos)
if(car=="{" && s.charAt(pos+1)=="{"){
text+="{"
pos+=2}else if(car=="}" && s.charAt(pos+1)=="}"){
text+="}"
pos+=2}else if(car=="{"){
parts.push(text)
var end=pos+1,nb=1
while(end < _len){if(s.charAt(end)=="{"){nb++;end++}
else if(s.charAt(end)=="}"){nb--;end++
if(nb==0){
var fmt_string=s.substring(pos+1,end-1)
var fmt_obj=$B.parse_format(fmt_string)
fmt_obj.raw_name=fmt_obj.name
fmt_obj.raw_spec=fmt_obj.spec
if(!fmt_obj.name){fmt_obj.name=rank+""
rank++}
if(fmt_obj.spec !==undefined){
function replace_nested(name,key){if(key==""){
return "{"+rank+++"}"}
return "{"+key+"}"}
fmt_obj.spec=fmt_obj.spec.replace(/\{(.*?)\}/g,replace_nested)}
parts.push(fmt_obj)
text=""
break}}else{end++}}
if(nb > 0){throw _b_.ValueError.$factory("wrong format "+s)}
pos=end}else{text+=car
pos++}}
if(text){parts.push(text)}
return parts}
str.format=function(_self){
var last_arg=$B.last(arguments)
if(last_arg.$nat=="mapping"){var mapping=last_arg.mapping,getitem=$B.$getattr(mapping,"__getitem__")
var args=[]
for(var i=0,len=arguments.length-1;i < len;i++){args.push(arguments[i])}
var $=$B.args("format",1,{self:null},["self"],args,{},"$args",null)}else{var $=$B.args("format",1,{self:null},["self"],arguments,{},"$args","$kw"),mapping=$.$kw,
getitem=function(key){return _b_.dict.$getitem(mapping,key)}}
var _self=to_string($.self),parts=$B.split_format(_self)
var res="",fmt
for(var i=0;i < parts.length;i++){
if(typeof parts[i]=="string"){res+=parts[i];
continue}
fmt=parts[i]
if(fmt.spec !==undefined){
function replace_nested(name,key){if(/\d+/.exec(key)){
return _b_.tuple.__getitem__($.$args,parseInt(key))}else{
return _b_.dict.__getitem__($.$kw,key)}}
fmt.spec=fmt.spec.replace(/\{(.*?)\}/g,replace_nested)}
if(fmt.name.charAt(0).search(/\d/)>-1){
var pos=parseInt(fmt.name),value=_b_.tuple.__getitem__($.$args,pos)}else{
var value=getitem(fmt.name)}
for(var j=0;j < fmt.name_ext.length;j++){var ext=fmt.name_ext[j]
if(ext.charAt(0)=="."){
value=$B.$getattr(value,ext.substr(1))}else{
var key=ext.substr(1,ext.length-2)
if(key.charAt(0).search(/\d/)>-1){key=parseInt(key)}
value=$B.$getattr(value,"__getitem__")(key)}}
if(fmt.conv=="a"){value=_b_.ascii(value)}
else if(fmt.conv=="r"){value=_b_.repr(value)}
else if(fmt.conv=="s"){value=_b_.str.$factory(value)}
if(value.$is_class ||value.$factory){
res+=value.__class__.__format__(value,fmt.spec)}else{res+=$B.$getattr(value,"__format__")(fmt.spec)}}
return res}
str.format_map=function(){var $=$B.args("format_map",2,{self:null,mapping:null},['self','mapping'],arguments,{},null,null),_self=to_string($.self)
return str.format(_self,{$nat:'mapping',mapping:$.mapping})}
str.index=function(self){
var res=str.find.apply(null,arguments)
if(res===-1){throw _b_.ValueError.$factory("substring not found")}
return res}
str.isascii=function(){
var $=$B.args("isascii",1,{self:null},["self"],arguments,{},null,null),_self=to_string($.self)
for(var i=0,len=_self.length;i < len;i++){if(_self.charCodeAt(i)> 127){return false}}
return true}
str.isalnum=function(){
var $=$B.args("isalnum",1,{self:null},["self"],arguments,{},null,null),cp,_self=to_string($.self)
for(var char of to_chars(_self)){cp=_b_.ord(char)
if(unicode_tables.Ll[cp]||
unicode_tables.Lu[cp]||
unicode_tables.Lm[cp]||
unicode_tables.Lt[cp]||
unicode_tables.Lo[cp]||
unicode_tables.Nd[cp]||
unicode_tables.digits[cp]||
unicode_tables.numeric[cp]){continue}
return false}
return true}
str.isalpha=function(){
var $=$B.args("isalpha",1,{self:null},["self"],arguments,{},null,null),cp,_self=to_string($.self)
for(var char of to_chars(_self)){cp=_b_.ord(char)
if(unicode_tables.Ll[cp]||
unicode_tables.Lu[cp]||
unicode_tables.Lm[cp]||
unicode_tables.Lt[cp]||
unicode_tables.Lo[cp]){continue}
return false}
return true}
str.isdecimal=function(){
var $=$B.args("isdecimal",1,{self:null},["self"],arguments,{},null,null),cp,_self=to_string($.self)
for(var char of to_chars(_self)){cp=_b_.ord(char)
if(! unicode_tables.Nd[cp]){return false}}
return _self.length > 0}
str.isdigit=function(){
var $=$B.args("isdigit",1,{self:null},["self"],arguments,{},null,null),cp,_self=to_string($.self)
for(var char of to_chars(_self)){cp=_b_.ord(char)
if(! unicode_tables.digits[cp]){return false}}
return _self.length > 0}
str.isidentifier=function(){
var $=$B.args("isidentifier",1,{self:null},["self"],arguments,{},null,null),_self=to_string($.self)
if(_self.length==0){return false}
var chars=to_chars(_self)
if(unicode_tables.XID_Start[_b_.ord(chars[0])]===undefined){return false}else{for(var char of chars){var cp=_b_.ord(char)
if(unicode_tables.XID_Continue[cp]===undefined){return false}}}
return true}
str.islower=function(){
var $=$B.args("islower",1,{self:null},["self"],arguments,{},null,null),has_cased=false,cp,_self=to_string($.self)
for(var char of to_chars(_self)){cp=_b_.ord(char)
if(unicode_tables.Ll[cp]){has_cased=true
continue}else if(unicode_tables.Lu[cp]||unicode_tables.Lt[cp]){return false}}
return has_cased}
str.isnumeric=function(){
var $=$B.args("isnumeric",1,{self:null},["self"],arguments,{},null,null),_self=to_string(self)
for(var char of to_chars(_self)){if(! unicode_tables.numeric[_b_.ord(char)]){return false}}
return _self.length > 0}
var unprintable={},unprintable_gc=['Cc','Cf','Co','Cs','Zl','Zp','Zs']
str.isprintable=function(){
if(Object.keys(unprintable).length==0){for(var i=0;i < unprintable_gc.length;i++){var table=unicode_tables[unprintable_gc[i]]
for(var cp in table){unprintable[cp]=true}}
unprintable[32]=true}
var $=$B.args("isprintable",1,{self:null},["self"],arguments,{},null,null),_self=to_string($.self)
for(var char of to_chars(_self)){if(unprintable[_b_.ord(char)]){return false}}
return true}
str.isspace=function(self){
var $=$B.args("isspace",1,{self:null},["self"],arguments,{},null,null),cp,_self=to_string($.self)
for(var char of to_chars(_self)){cp=_b_.ord(char)
if(! unicode_tables.Zs[cp]&&
$B.unicode_bidi_whitespace.indexOf(cp)==-1){return false}}
return _self.length > 0}
str.istitle=function(self){
var $=$B.args("istitle",1,{self:null},["self"],arguments,{},null,null),_self=to_string($.self)
return _self.length > 0 && str.title(_self)==_self}
str.isupper=function(self){
var $=$B.args("islower",1,{self:null},["self"],arguments,{},null,null),is_upper=false,cp,_self=to_string(self)
for(var char of to_chars(_self)){cp=_b_.ord(char)
if(unicode_tables.Lu[cp]){is_upper=true
continue}else if(unicode_tables.Ll[cp]||unicode_tables.Lt[cp]){return false}}
return is_upper}
str.join=function(){var $=$B.args("join",2,{self:null,iterable:null},["self","iterable"],arguments,{},null,null),_self=to_string($.self)
var iterable=_b_.iter($.iterable),res=[],count=0
while(1){try{var obj2=_b_.next(iterable)
if(! _b_.isinstance(obj2,str)){throw _b_.TypeError.$factory("sequence item "+count+
": expected str instance, "+$B.class_name(obj2)+
" found")}
res.push(obj2)}catch(err){if(_b_.isinstance(err,_b_.StopIteration)){break}
else{throw err}}}
return res.join(_self)}
str.ljust=function(self){var $=$B.args("ljust",3,{self:null,width:null,fillchar:null},["self","width","fillchar"],arguments,{fillchar:" "},null,null),_self=to_string($.self),len=str.__len__(_self);
if($.width <=len){return _self}
return _self+$.fillchar.repeat($.width-len)}
str.lower=function(self){var $=$B.args("lower",1,{self:null},["self"],arguments,{},null,null),_self=to_string($.self)
return _self.toLowerCase()}
str.lstrip=function(self,x){var $=$B.args("lstrip",2,{self:null,chars:null},["self","chars"],arguments,{chars:_b_.None},null,null),_self=$.self,chars=$.chars
if(chars===_b_.None){return self.trimStart()}
[_self,chars]=to_string([_self,chars])
while(_self.length > 0){var flag=false
for(var char of chars){if(_self.startsWith(char)){_self=_self.substr(char.length)
flag=true
break}}
if(! flag){return $.self.surrogates ? $B.String(_self):_self}}
return ''}
str.maketrans=function(){var $=$B.args("maketrans",3,{x:null,y:null,z:null},["x","y","z"],arguments,{y:null,z:null},null,null)
var _t=$B.empty_dict()
if($.y===null && $.z===null){
if(! _b_.isinstance($.x,_b_.dict)){throw _b_.TypeError.$factory(
"maketrans only argument must be a dict")}
var items=_b_.list.$factory(_b_.dict.items($.x))
for(var i=0,len=items.length;i < len;i++){var k=items[i][0],v=items[i][1]
if(! _b_.isinstance(k,_b_.int)){if(_b_.isinstance(k,_b_.str)&& k.length==1){k=_b_.ord(k)}else{throw _b_.TypeError.$factory("dictionary key "+k+
" is not int or 1-char string")}}
if(v !==_b_.None && ! _b_.isinstance(v,[_b_.int,_b_.str])){throw _b_.TypeError.$factory("dictionary value "+v+
" is not None, integer or string")}
_b_.dict.$setitem(_t,k,v)}
return _t}else{
if(!(_b_.isinstance($.x,_b_.str)&& _b_.isinstance($.y,_b_.str))){throw _b_.TypeError.$factory("maketrans arguments must be strings")}else if($.x.length !==$.y.length){throw _b_.TypeError.$factory(
"maketrans arguments must be strings or same length")}else{var toNone={}
if($.z !==null){
if(! _b_.isinstance($.z,_b_.str)){throw _b_.TypeError.$factory(
"maketrans third argument must be a string")}
for(var i=0,len=$.z.length;i < len;i++){toNone[_b_.ord($.z.charAt(i))]=true}}
for(var i=0,len=$.x.length;i < len;i++){var key=_b_.ord($.x.charAt(i)),value=$.y.charCodeAt(i)
_b_.dict.$setitem(_t,key,value)}
for(var k in toNone){_b_.dict.$setitem(_t,parseInt(k),_b_.None)}
return _t}}}
str.maketrans.$type="staticmethod"
str.partition=function(){var $=$B.args("partition",2,{self:null,sep:null},["self","sep"],arguments,{},null,null),_self
if($.sep==""){throw _b_.ValueError.$factory("empty separator")}
check_str($.sep);
[_self,sep]=to_string([$.self,$.sep])
var chars=to_chars(_self),i=_self.indexOf(sep)
if(i==-1){return _b_.tuple.$factory([_self,"",""])}
return _b_.tuple.$factory([chars.slice(0,i).join(''),sep,chars.slice(i+sep.length).join('')])}
str.removeprefix=function(){var $=$B.args("removeprefix",2,{self:null,prefix:null},["self","prefix"],arguments,{},null,null),_self
if(!_b_.isinstance($.prefix,str)){throw _b_.ValueError.$factory("prefix should be str, not "+
`'${$B.class_name($.prefix)}'`)}
[_self,prefix]=to_string([$.self,$.prefix])
if(str.startswith(_self,prefix)){return _self.substr(prefix.length)}
return _self.substr(0)}
str.removesuffix=function(){var $=$B.args("removesuffix",2,{self:null,suffix:null},["self","suffix"],arguments,{},null,null),_self
if(!_b_.isinstance($.suffix,str)){throw _b_.ValueError.$factory("suffix should be str, not "+
`'${$B.class_name($.prefix)}'`)}
[_self,suffix]=to_string([$.self,$.suffix])
if(suffix.length > 0 && str.endswith(_self,suffix)){return _self.substr(0,_self.length-suffix.length)}
return _self.substr(0)}
function $re_escape(str){var specials="[.*+?|()$^"
for(var i=0,len=specials.length;i < len;i++){var re=new RegExp("\\"+specials.charAt(i),"g")
str=str.replace(re,"\\"+specials.charAt(i))}
return str}
str.replace=function(self,old,_new,count){
var $=$B.args("replace",4,{self:null,old:null,new:null,count:null},["self","old","new","count"],arguments,{count:-1},null,null),count=$.count,_self=$.self,old=$.old,_new=$.new
check_str(old,"replace() argument 1 ")
check_str(_new,"replace() argument 2 ")
if(! _b_.isinstance(count,[_b_.int,_b_.float])){throw _b_.TypeError.$factory("'"+$B.class_name(count)+
"' object cannot be interpreted as an integer")}else if(_b_.isinstance(count,_b_.float)){throw _b_.TypeError.$factory("integer argument expected, got float")}
if(count==0){return self}
if(count.__class__==$B.long_int){count=parseInt(count.value)}
[old,_new]=to_string([old,_new])
if(old==""){if(_new==""){return _self}
if(_self==""){return _new}
var elts=_self.split("")
if(count >-1 && elts.length >=count){var rest=elts.slice(count).join("")
return _new+elts.slice(0,count).join(_new)+rest}else{return _new+elts.join(_new)+_new}}else{var elts=str.split(_self,old,count)}
var res=_self,pos=-1
if(old.length==0){var res=_new
for(var i=0;i < elts.length;i++){res+=elts[i]+_new}
return res+rest}
if(count < 0){count=res.length}
while(count > 0){pos=res.indexOf(old,pos)
if(pos < 0){break}
res=res.substr(0,pos)+_new+res.substr(pos+old.length)
pos=pos+_new.length
count--}
return res}
str.rfind=function(self,substr){
var $=$B.args("rfind",4,{self:null,sub:null,start:null,end:null},["self","sub","start","end"],arguments,{start:0,end:null},null,null),_self
normalize_start_end($)
check_str($.sub);
[_self,sub]=to_string([$.self,$.sub])
var len=str.__len__(_self),sub_len=str.__len__(sub)
if(sub_len==0){if($.js_start > len){return-1}else{return str.__len__(_self)}}
var js_start=pypos2jspos(_self,$.start),js_end=pypos2jspos(_self,$.end),ix=_self.substring(js_start,js_end).lastIndexOf(sub)
if(ix==-1){return-1}
return jspos2pypos(_self,js_start+ix)-$.start}
str.rindex=function(){
var res=str.rfind.apply(null,arguments)
if(res==-1){throw _b_.ValueError.$factory("substring not found")}
return res}
str.rjust=function(self){var $=$B.args("rjust",3,{self:null,width:null,fillchar:null},["self","width","fillchar"],arguments,{fillchar:" "},null,null),_self=to_string($.self)
var len=str.__len__(_self)
if($.width <=len){return _self}
return $B.String($.fillchar.repeat($.width-len)+_self)}
str.rpartition=function(self,sep){var $=$B.args("rpartition",2,{self:null,sep:null},["self","sep"],arguments,{},null,null),_self
check_str($.sep);
[_self,sep]=[$.self,$.sep]
_self=reverse(_self),sep=reverse(sep)
var items=str.partition(_self,sep).reverse()
for(var i=0;i < items.length;i++){items[i]=items[i].split("").reverse().join("")}
return items}
str.rsplit=function(self){var $=$B.args("rsplit",3,{self:null,sep:null,maxsplit:null},["self","sep","maxsplit"],arguments,{sep:_b_.None,maxsplit:-1},null,null),sep=$.sep,_self;
[_self,sep]=to_string([$.self,$.sep])
var rev_str=reverse(_self),rev_sep=sep===_b_.None ? sep :reverse(sep),rev_res=str.split(rev_str,rev_sep,$.maxsplit)
rev_res.reverse()
for(var i=0;i < rev_res.length;i++){rev_res[i]=reverse(rev_res[i])}
return rev_res}
str.rstrip=function(){var $=$B.args("rstrip",2,{self:null,chars:null},["self","chars"],arguments,{chars:_b_.None},null,null),chars=$.chars,_self=to_string($.self)
if(chars===_b_.None){return _self.trimEnd()}
chars=to_string(chars)
while(_self.length > 0){var flag=false
for(var char of chars){if(_self.endsWith(char)){_self=_self.substr(0,_self.length-char.length)
flag=true
break}}
if(! flag){return _self.surrogates ? $B.String(_self):_self}}
return ''}
str.split=function(){var $=$B.args("split",3,{self:null,sep:null,maxsplit:null},["self","sep","maxsplit"],arguments,{sep:_b_.None,maxsplit:-1},null,null),maxsplit=$.maxsplit,sep=$.sep,pos=0,_self=to_string($.self)
if(maxsplit.__class__===$B.long_int){maxsplit=parseInt(maxsplit.value)}
if(sep==""){throw _b_.ValueError.$factory("empty separator")}
if(sep===_b_.None){var res=[]
while(pos < _self.length && _self.charAt(pos).search(/\s/)>-1){pos++}
if(pos===_self.length-1){return[_self]}
var name=""
while(1){if(_self.charAt(pos).search(/\s/)==-1){if(name==""){name=_self.charAt(pos)}else{name+=_self.charAt(pos)}}else{if(name !==""){res.push(name)
if(maxsplit !==-1 && res.length==maxsplit+1){res.pop()
res.push(name+_self.substr(pos))
return res}
name=""}}
pos++
if(pos > _self.length-1){if(name){res.push(name)}
break}}
return res.map($B.String)}else{sep=to_string(sep)
var res=[],s="",seplen=sep.length
if(maxsplit==0){return[$.self]}
while(pos < _self.length){if(_self.substr(pos,seplen)==sep){res.push(s)
pos+=seplen
if(maxsplit >-1 && res.length >=maxsplit){res.push(_self.substr(pos))
return res.map($B.String)}
s=""}else{s+=_self.charAt(pos)
pos++}}
res.push(s)
return res.map($B.String)}}
str.splitlines=function(self){var $=$B.args('splitlines',2,{self:null,keepends:null},['self','keepends'],arguments,{keepends:false},null,null)
if(!_b_.isinstance($.keepends,[_b_.bool,_b_.int])){throw _b_.TypeError('integer argument expected, got '+
$B.get_class($.keepends).__name)}
var keepends=_b_.int.$factory($.keepends),res=[],start=0,pos=0,_self=to_string($.self)
if(! _self.length){return res}
while(pos < _self.length){if(_self.substr(pos,2)=='\r\n'){res.push(_self.slice(start,keepends ? pos+2 :pos))
start=pos=pos+2}else if(_self[pos]=='\r' ||_self[pos]=='\n'){res.push(_self.slice(start,keepends ? pos+1 :pos))
start=pos=pos+1}else{pos++}}
if(start < _self.length){res.push(_self.slice(start))}
return res.map($B.String)}
str.startswith=function(){
var $=$B.args("startswith",4,{self:null,prefix:null,start:null,end:null},["self","prefix","start","end"],arguments,{start:0,end:null},null,null),_self
normalize_start_end($)
var prefixes=$.prefix
if(! _b_.isinstance(prefixes,_b_.tuple)){prefixes=[prefixes]}
_self=to_string($.self)
prefixes=to_string(prefixes)
var s=_self.substring($.start,$.end)
for(var prefix of prefixes){if(! _b_.isinstance(prefix,str)){throw _b_.TypeError.$factory("endswith first arg must be str "+
"or a tuple of str, not int")}
if(s.substr(0,prefix.length)==prefix){return true}}
return false}
str.strip=function(){var $=$B.args("strip",2,{self:null,chars:null},["self","chars"],arguments,{chars:_b_.None},null,null)
if($.chars===_b_.None){return $.self.trim()}
return str.rstrip(str.lstrip($.self,$.chars),$.chars)}
str.swapcase=function(self){var $=$B.args("swapcase",1,{self},["self"],arguments,{},null,null),res="",cp,_self=to_string($.self)
for(var char of to_chars(_self)){cp=_b_.ord(char)
if(unicode_tables.Ll[cp]){res+=char.toUpperCase()}else if(unicode_tables.Lu[cp]){res+=char.toLowerCase()}else{res+=char}}
return res}
str.title=function(self){var $=$B.args("title",1,{self},["self"],arguments,{},null,null),state,cp,res="",_self=to_string($.self)
for(var char of to_chars(_self)){cp=_b_.ord(char)
if(unicode_tables.Ll[cp]){if(! state){res+=char.toUpperCase()
state="word"}else{res+=char}}else if(unicode_tables.Lu[cp]||unicode_tables.Lt[cp]){res+=state ? char.toLowerCase():char
state="word"}else{state=null
res+=char}}
return res}
str.translate=function(){var $=$B.args('translate',2,{self:null,table:null},['self','table'],arguments,{},null,null),table=$.table,res=[],getitem=$B.$getattr(table,"__getitem__"),cp,_self=to_string($.self)
for(var char of to_chars(_self)){cp=_b_.ord(char)
try{var repl=getitem(cp)
if(repl !==_b_.None){if(typeof repl=="string"){res.push(repl)}else if(typeof repl=="number"){res.push(String.fromCharCode(repl))}}}catch(err){res.push(char)}}
return res.join("")}
str.upper=function(self){var $=$B.args("upper",1,{self:null},["self"],arguments,{},null,null),_self=to_string($.self)
return _self.toUpperCase()}
str.zfill=function(self,width){var $=$B.args("zfill",2,{self:null,width:null},["self","width"],arguments,{},null,null),_self=to_string($.self)
var len=str.__len__(_self)
if($.width <=len){return _self}
switch(_self.charAt(0)){case "+":
case "-":
return _self.charAt(0)+
"0".repeat($.width-len)+_self.substr(1)
default:
return "0".repeat($.width-len)+_self}}
str.$factory=function(arg,encoding,errors){if(arguments.length==0){return ""}
if(arg===undefined){return $B.UndefinedClass.__str__()}else if(arg===null){return '<Javascript null>'}
if(encoding !==undefined){
var $=$B.args("str",3,{arg:null,encoding:null,errors:null},["arg","encoding","errors"],arguments,{encoding:"utf-8",errors:"strict"},null,null),encoding=$.encoding,errors=$.errors}
if(typeof arg=="string" ||arg instanceof String ||
typeof arg=="number"){if(isFinite(arg)){return arg.toString()}}
try{if(arg.$is_class ||arg.$factory){
var func=$B.$getattr(arg.__class__,"__str__")
return func(arg)}
if(arg.__class__ && arg.__class__===_b_.bytes &&
encoding !==undefined){
return _b_.bytes.decode(arg,$.encoding,$.errors)}
var klass=arg.__class__ ||$B.get_class(arg)
if(klass===undefined){return $B.JSObj.__str__($B.JSObj.$factory(arg))}
var method=$B.$getattr(klass ,"__str__",null)
if(method===null ||
(arg.__class__ && arg.__class__ !==_b_.object &&
method===_b_.object.__str__)){var method=$B.$getattr(klass,"__repr__")}}
catch(err){console.log("no __str__ for",arg)
console.log("err ",err)
if($B.debug > 1){console.log(err)}
console.log("Warning - no method __str__ or __repr__, "+
"default to toString",arg)
throw err}
return $B.$call(method)(arg)}
$B.set_func_names(str,"builtins")
_b_.str=str
$B.parse_format_spec=function(spec){if(spec==""){this.empty=true}else{var pos=0,aligns="<>=^",digits="0123456789",types="bcdeEfFgGnosxX%",align_pos=aligns.indexOf(spec.charAt(0))
if(align_pos !=-1){if(spec.charAt(1)&& aligns.indexOf(spec.charAt(1))!=-1){
this.fill=spec.charAt(0)
this.align=spec.charAt(1)
pos=2}else{
this.align=aligns[align_pos]
this.fill=" "
pos++}}else{align_pos=aligns.indexOf(spec.charAt(1))
if(spec.charAt(1)&& align_pos !=-1){
this.align=aligns[align_pos]
this.fill=spec.charAt(0)
pos=2}}
var car=spec.charAt(pos)
if(car=="+" ||car=="-" ||car==" "){this.sign=car
pos++
car=spec.charAt(pos)}
if(car=="#"){this.alternate=true;pos++;car=spec.charAt(pos)}
if(car=="0"){
this.fill="0"
if(align_pos==-1){this.align="="}
pos++
car=spec.charAt(pos)}
while(car && digits.indexOf(car)>-1){if(this.width===undefined){this.width=car}else{this.width+=car}
pos++
car=spec.charAt(pos)}
if(this.width !==undefined){this.width=parseInt(this.width)}
if(this.width===undefined && car=="{"){
var end_param_pos=spec.substr(pos).search("}")
this.width=spec.substring(pos,end_param_pos)
console.log("width","["+this.width+"]")
pos+=end_param_pos+1}
if(car==","){this.comma=true
pos++
car=spec.charAt(pos)}
if(car=="."){if(digits.indexOf(spec.charAt(pos+1))==-1){throw _b_.ValueError.$factory(
"Missing precision in format spec")}
this.precision=spec.charAt(pos+1)
pos+=2
car=spec.charAt(pos)
while(car && digits.indexOf(car)>-1){this.precision+=car
pos++
car=spec.charAt(pos)}
this.precision=parseInt(this.precision)}
if(car && types.indexOf(car)>-1){this.type=car
pos++
car=spec.charAt(pos)}
if(pos !==spec.length){throw _b_.ValueError.$factory("Invalid format specifier: "+spec)}}
this.toString=function(){return(this.fill===undefined ? "" :_b_.str.$factory(this.fill))+
(this.align ||"")+
(this.sign ||"")+
(this.alternate ? "#" :"")+
(this.sign_aware ? "0" :"")+
(this.width ||"")+
(this.comma ? "," :"")+
(this.precision ? "."+this.precision :"")+
(this.type ||"")}}
$B.format_width=function(s,fmt){if(fmt.width && s.length < fmt.width){var fill=fmt.fill ||" ",align=fmt.align ||"<",missing=fmt.width-s.length
switch(align){case "<":
return s+fill.repeat(missing)
case ">":
return fill.repeat(missing)+s
case "=":
if("+-".indexOf(s.charAt(0))>-1){return s.charAt(0)+fill.repeat(missing)+s.substr(1)}else{return fill.repeat(missing)+s}
case "^":
var left=parseInt(missing/2)
return fill.repeat(left)+s+fill.repeat(missing-left)}}
return s}
function fstring_expression(start){this.type="expression"
this.start=start
this.expression=""
this.conversion=null
this.fmt=null}
function fstring_error(msg,pos){error=Error(msg)
error.position=pos
throw error}
$B.parse_fstring=function(string){
var elts=[],pos=0,current="",ctype=null,nb_braces=0,expr_start,car
while(pos < string.length){if(ctype===null){car=string.charAt(pos)
if(car=="{"){if(string.charAt(pos+1)=="{"){ctype="string"
current="{"
pos+=2}else{ctype="expression"
expr_start=pos+1
nb_braces=1
pos++}}else if(car=="}"){if(string.charAt(pos+1)==car){ctype="string"
current="}"
pos+=2}else{fstring_error(" f-string: single '}' is not allowed",pos)}}else{ctype="string"
current=car
pos++}}else if(ctype=="string"){
var i=pos
while(i < string.length){car=string.charAt(i)
if(car=="{"){if(string.charAt(i+1)=="{"){current+="{"
i+=2}else{elts.push(current)
ctype="expression"
expr_start=i+1
pos=i+1
break}}else if(car=="}"){if(string.charAt(i+1)==car){current+=car
i+=2}else{fstring_error(" f-string: single '}' is not allowed",pos)}}else{current+=car
i++}}
pos=i+1}else if(ctype=="debug"){
while(string.charAt(i)==" "){i++}
if(string.charAt(i)=="}"){
elts.push(current)
ctype=null
current=""
pos=i+1}}else{
var i=pos,nb_braces=1,nb_paren=0,current=new fstring_expression(expr_start)
while(i < string.length){car=string.charAt(i)
if(car=="{" && nb_paren==0){nb_braces++
current.expression+=car
i++}else if(car=="}" && nb_paren==0){nb_braces-=1
if(nb_braces==0){
if(current.expression==""){fstring_error("f-string: empty expression not allowed",pos)}
elts.push(current)
ctype=null
current=""
pos=i+1
break}
current.expression+=car
i++}else if(car=="\\"){
throw Error("f-string expression part cannot include a"+
" backslash")}else if(nb_paren==0 && car=="!" && current.fmt===null &&
":}".indexOf(string.charAt(i+2))>-1){if(current.expression.length==0){throw Error("f-string: empty expression not allowed")}
if("ars".indexOf(string.charAt(i+1))==-1){throw Error("f-string: invalid conversion character:"+
" expected 's', 'r', or 'a'")}else{current.conversion=string.charAt(i+1)
i+=2}}else if(car=="(" ||car=='['){nb_paren++
current.expression+=car
i++}else if(car==")" ||car==']'){nb_paren--
current.expression+=car
i++}else if(car=='"'){
if(string.substr(i,3)=='"""'){var end=string.indexOf('"""',i+3)
if(end==-1){fstring_error("f-string: unterminated string",pos)}else{var trs=string.substring(i,end+3)
trs=trs.replace("\n","\\n\\")
current.expression+=trs
i=end+3}}else{var end=string.indexOf('"',i+1)
if(end==-1){fstring_error("f-string: unterminated string",pos)}else{current.expression+=string.substring(i,end+1)
i=end+1}}}else if(nb_paren==0 && car==":"){
current.fmt=true
var cb=0,fmt_complete=false
for(var j=i+1;j < string.length;j++){if(string[j]=='{'){if(string[j+1]=='{'){j+=2}else{cb++}}else if(string[j]=='}'){if(string[j+1]=='}'){j+=2}else if(cb==0){fmt_complete=true
var fmt=string.substring(i+1,j)
current.format=$B.parse_fstring(fmt)
i=j
break}else{cb--}}}
if(! fmt_complete){fstring_error('invalid format',pos)}}else if(car=="="){
var ce=current.expression,last_char=ce.charAt(ce.length-1),last_char_re=('()'.indexOf(last_char)>-1 ? "\\" :"")+last_char
if(ce.length==0 ||
nb_paren > 0 ||
string.charAt(i+1)=="=" ||
"=!<>:".search(last_char_re)>-1){
current.expression+=car
i+=1}else{
tail=car
while(string.charAt(i+1).match(/\s/)){tail+=string.charAt(i+1)
i++}
elts.push(current.expression+tail)
while(ce.match(/\s$/)){ce=ce.substr(0,ce.length-1)}
current.expression=ce
ctype="debug"
i++}}else{current.expression+=car
i++}}
if(nb_braces > 0){fstring_error("f-string: expected '}'",pos)}}}
if(current.length > 0){elts.push(current)}
for(var elt of elts){if(typeof elt=="object"){if(elt.fmt_pos !==undefined &&
elt.expression.charAt(elt.fmt_pos)!=':'){console.log('mauvais format',string,elts)
throw Error()}}}
return elts}
var _chr=$B.codepoint2jsstring=function(i){if(i >=0x10000 && i <=0x10FFFF){var code=(i-0x10000)
return String.fromCodePoint(0xD800 |(code >> 10))+
String.fromCodePoint(0xDC00 |(code & 0x3FF))}else{return String.fromCodePoint(i)}}
var _ord=$B.jsstring2codepoint=function(c){if(c.length==1){return c.charCodeAt(0)}
var code=0x10000
code+=(c.charCodeAt(0)& 0x03FF)<< 10
code+=(c.charCodeAt(1)& 0x03FF)
return code}})(__BRYTHON__)
;
;(function($B){var _b_=$B.builtins
function $err(op,other){var msg="unsupported operand type(s) for "+op+
" : 'int' and '"+$B.class_name(other)+"'"
throw _b_.TypeError.$factory(msg)}
function int_value(obj){
if(typeof obj=="boolean"){return obj ? 1 :0}
return obj.$brython_value !==undefined ? obj.$brython_value :obj}
var int={__class__:_b_.type,__dir__:_b_.object.__dir__,__mro__:[_b_.object],$infos:{__module__:"builtins",__name__:"int"},$is_class:true,$native:true,$descriptors:{"numerator":true,"denominator":true,"imag":true,"real":true}}
int.as_integer_ratio=function(){var $=$B.args("as_integer_ratio",1,{self:null},["self"],arguments,{},null,null)
return $B.$list([$.self,1])}
int.from_bytes=function(){var $=$B.args("from_bytes",3,{bytes:null,byteorder:null,signed:null},["bytes","byteorder","signed"],arguments,{signed:false},null,null)
var x=$.bytes,byteorder=$.byteorder,signed=$.signed,_bytes,_len
if(_b_.isinstance(x,[_b_.bytes,_b_.bytearray])){_bytes=x.source
_len=x.source.length}else{_bytes=_b_.list.$factory(x)
_len=_bytes.length
for(var i=0;i < _len;i++){_b_.bytes.$factory([_bytes[i]])}}
if(byteorder=="big"){_bytes.reverse()}else if(byteorder !="little"){throw _b_.ValueError.$factory(
"byteorder must be either 'little' or 'big'")}
var num=_bytes[0]
if(signed && num >=128){num=num-256}
var _mult=256
for(var i=1;i < _len;i++){num=$B.add($B.mul(_mult,_bytes[i]),num)
_mult=$B.mul(_mult,256)}
if(! signed){return num}
if(_bytes[_len-1]< 128){return num}
return $B.sub(num,_mult)}
int.to_bytes=function(){var $=$B.args("to_bytes",3,{self:null,len:null,byteorder:null,signed:null},["self","len","byteorder","*","signed"],arguments,{signed:false},null,null),self=$.self,len=$.len,byteorder=$.byteorder,signed=$.signed
if(! _b_.isinstance(len,_b_.int)){throw _b_.TypeError.$factory("integer argument expected, got "+
$B.class_name(len))}
if(["little","big"].indexOf(byteorder)==-1){throw _b_.ValueError.$factory(
"byteorder must be either 'little' or 'big'")}
if(_b_.isinstance(self,$B.long_int)){return $B.long_int.to_bytes(self,len,byteorder,signed)}
if(self < 0){if(! signed){throw _b_.OverflowError.$factory(
"can't convert negative int to unsigned")}
self=Math.pow(256,len)+self}
var res=[],value=self
while(value > 0){var quotient=Math.floor(value/256),rest=value-256*quotient
res.push(rest)
if(res.length > len){throw _b_.OverflowError.$factory("int too big to convert")}
value=quotient}
while(res.length < len){res.push(0)}
if(byteorder=="big"){res.reverse()}
return{
__class__:_b_.bytes,source:res}}
int.__abs__=function(self){return _b_.abs(self)}
int.__add__=function(self,other){self=int_value(self)
if(_b_.isinstance(other,int)){if(other.__class__==$B.long_int){return $B.long_int.__add__($B.long_int.$factory(self),$B.long_int.$factory(other))}
other=int_value(other)
var res=self+other
if(res > $B.min_int && res < $B.max_int){return res}else{return $B.long_int.__add__($B.long_int.$factory(self),$B.long_int.$factory(other))}}
return _b_.NotImplemented}
int.__bool__=function(self){return int_value(self).valueOf()==0 ? false :true}
int.__ceil__=function(self){return Math.ceil(int_value(self))}
int.__divmod__=function(self,other){if(! _b_.isinstance(other,int)){return _b_.NotImplemented}
return $B.fast_tuple([int.__floordiv__(self,other),int.__mod__(self,other)])}
int.__eq__=function(self,other){
if(_b_.isinstance(other,int)){return self.valueOf()==int_value(other).valueOf()}
if(_b_.isinstance(other,_b_.float)){return self.valueOf()==other.valueOf()}
if(_b_.isinstance(other,_b_.complex)){if(other.$imag !=0){return _b_.False}
return self.valueOf()==other.$real}
return _b_.NotImplemented}
int.__float__=function(self){return new Number(self)}
function preformat(self,fmt){if(fmt.empty){return _b_.str.$factory(self)}
if(fmt.type && 'bcdoxXn'.indexOf(fmt.type)==-1){throw _b_.ValueError.$factory("Unknown format code '"+fmt.type+
"' for object of type 'int'")}
var res
switch(fmt.type){case undefined:
case "d":
res=self.toString()
break
case "b":
res=(fmt.alternate ? "0b" :"")+self.toString(2)
break
case "c":
res=_b_.chr(self)
break
case "o":
res=(fmt.alternate ? "0o" :"")+self.toString(8)
break
case "x":
res=(fmt.alternate ? "0x" :"")+self.toString(16)
break
case "X":
res=(fmt.alternate ? "0X" :"")+self.toString(16).toUpperCase()
break
case "n":
return self }
if(fmt.sign !==undefined){if((fmt.sign==" " ||fmt.sign=="+" )&& self >=0){res=fmt.sign+res}}
return res}
int.__format__=function(self,format_spec){var fmt=new $B.parse_format_spec(format_spec)
if(fmt.type && 'eEfFgG%'.indexOf(fmt.type)!=-1){
return _b_.float.__format__(self,format_spec)}
fmt.align=fmt.align ||">"
var res=preformat(self,fmt)
if(fmt.comma){var sign=res[0]=="-" ? "-" :"",rest=res.substr(sign.length),len=rest.length,nb=Math.ceil(rest.length/3),chunks=[]
for(var i=0;i < nb;i++){chunks.push(rest.substring(len-3*i-3,len-3*i))}
chunks.reverse()
res=sign+chunks.join(",")}
return $B.format_width(res,fmt)}
int.__floordiv__=function(self,other){if(other.__class__===$B.long_int){return $B.long_int.__floordiv__($B.long_int.$factory(self),other)}
if(_b_.isinstance(other,int)){other=int_value(other)
if(other==0){throw _b_.ZeroDivisionError.$factory("division by zero")}
return Math.floor(self/other)}
return _b_.NotImplemented}
int.__hash__=function(self){if(self.$brython_value){
var hash_method=$B.$getattr(self.__class__,'__hash__')
if(hash_method===int.__hash__){if(typeof self.$brython_value=="number"){return self.$brython_value}else{
return $B.long_int.__hash__(self.$brython_value)}}else{return hash_method(self)}}
return self.valueOf()}
int.__index__=function(self){return int_value(self)}
int.__init__=function(self,value){if(value===undefined){value=0}
self.toString=function(){return value}
return _b_.None}
int.__int__=function(self){return self}
int.__invert__=function(self){return ~self}
int.__lshift__=function(self,other){self=int_value(self)
if(_b_.isinstance(other,int)){other=int_value(other)
try{return int.$factory($B.long_int.__lshift__($B.long_int.$factory(self),$B.long_int.$factory(other)))}catch(err){console.log('err in lshift',self,other)
throw err}}
return _b_.NotImplemented}
int.__mod__=function(self,other){
if(_b_.isinstance(other,_b_.tuple)&& other.length==1){other=other[0]}
if(other.__class__===$B.long_int){return $B.long_int.__mod__($B.long_int.$factory(self),other)}
if(_b_.isinstance(other,int)){other=int_value(other)
if(other===false){other=0}
else if(other===true){other=1}
if(other==0){throw _b_.ZeroDivisionError.$factory(
"integer division or modulo by zero")}
return(self % other+other)% other}
return _b_.NotImplemented}
int.__mul__=function(self,other){self=int_value(self)
if(_b_.isinstance(other,int)){if(other.__class__==$B.long_int){return $B.long_int.__mul__($B.long_int.$factory(self),$B.long_int.$factory(other))}
other=int_value(other)
var res=self*other
if(res > $B.min_int && res < $B.max_int){return res}else{return int.$factory($B.long_int.__mul__($B.long_int.$factory(self),$B.long_int.$factory(other)))}}
return _b_.NotImplemented}
int.__ne__=function(self,other){var res=int.__eq__(self,other)
return(res===_b_.NotImplemented)? res :!res}
int.__neg__=function(self){return-self}
int.__new__=function(cls,value){if(cls===undefined){throw _b_.TypeError.$factory("int.__new__(): not enough arguments")}else if(! _b_.isinstance(cls,_b_.type)){throw _b_.TypeError.$factory("int.__new__(X): X is not a type object")}
if(cls===int){return int.$factory(value)}
return{
__class__:cls,__dict__:$B.empty_dict(),$brython_value:value ||0}}
int.__pos__=function(self){return self}
function extended_euclidean(a,b){var d,u,v
if(b==0){return[a,1,0]}else{[d,u,v]=extended_euclidean(b,a % b)
return[d,v,u-Math.floor(a/b)*v]}}
int.__pow__=function(self,other,z){if(! _b_.isinstance(other,int)){return _b_.NotImplemented}
if(typeof other=="number" ||_b_.isinstance(other,int)){other=int_value(other)
switch(other.valueOf()){case 0:
return int.$factory(1)
case 1:
return int.$factory(self.valueOf())}
if(z !==undefined && z !==_b_.None){
if(z==1){return 0}
var result=1,base=self % z,exponent=other,long_int=$B.long_int
if(exponent < 0){var gcd,inv,_
[gcd,inv,_]=extended_euclidean(self,z)
if(gcd !==1){throw _b_.ValueError.$factory("not relative primes: "+
self+' and '+z)}
return int.__pow__(inv,-exponent,z)}
while(exponent > 0){if(exponent % 2==1){if(result*base > $B.max_int){result=long_int.__mul__(
long_int.$factory(result),long_int.$factory(base))
result=long_int.__mod__(result,z)}else{result=(result*base)% z}}
exponent=exponent >> 1
if(base*base > $B.max_int){base=long_int.__mul__(long_int.$factory(base),long_int.$factory(base))
base=long_int.__mod__(base,z)}else{base=(base*base)% z}}
return result}
var res=Math.pow(self.valueOf(),other.valueOf())
if(res > $B.min_int && res < $B.max_int){return other > 0 ? res :new Number(res)}else if(res !==Infinity && !isFinite(res)){return res}else{if($B.BigInt){return{
__class__:$B.long_int,value:($B.BigInt(self)**$B.BigInt(other)).toString(),pos:true}}
return $B.long_int.__pow__($B.long_int.$from_int(self),$B.long_int.$from_int(other))}}
if(_b_.isinstance(other,_b_.float)){other=_b_.float.numerator(other)
if(self >=0){return new Number(Math.pow(self,other))}else{
return _b_.complex.__pow__($B.make_complex(self,0),other)}}else if(_b_.isinstance(other,_b_.complex)){var preal=Math.pow(self,other.$real),ln=Math.log(self)
return $B.make_complex(preal*Math.cos(ln),preal*Math.sin(ln))}
var rpow=$B.$getattr(other,"__rpow__",_b_.None)
if(rpow !==_b_.None){return rpow(self)}
$err("**",other)}
function __newobj__(){
var $=$B.args('__newobj__',0,{},[],arguments,{},'args',null),args=$.args
var res=args.slice(1)
res.__class__=args[0]
return res}
int.__reduce_ex__=function(self){return $B.fast_tuple([__newobj__,$B.fast_tuple([self.__class__ ||int,int_value(self)]),_b_.None,_b_.None,_b_.None])}
int.__repr__=function(self){$B.builtins_repr_check(int,arguments)
return int_value(self).toString()}
int.__rshift__=function(self,other){self=int_value(self)
if(typeof other=="number" ||_b_.isinstance(other,int)){other=int_value(other)
return int.$factory($B.long_int.__rshift__($B.long_int.$factory(self),$B.long_int.$factory(other)))}
return _b_.NotImplemented}
int.__setattr__=function(self,attr,value){if(typeof self=="number" ||typeof self=="boolean"){var cl_name=$B.class_name(self)
if(_b_.dir(self).indexOf(attr)>-1){throw _b_.AttributeError.$factory("attribute '"+attr+
`' of '${cl_name}' objects is not writable`)}else{throw _b_.AttributeError.$factory(`'${cl_name}' object`+
` has no attribute '${attr}'`)}
throw _b_.AttributeError.$factory(msg)}
_b_.dict.$setitem(self.__dict__,attr,value)
return _b_.None}
int.__sub__=function(self,other){self=int_value(self)
if(_b_.isinstance(other,int)){if(other.__class__==$B.long_int){return $B.long_int.__sub__($B.long_int.$factory(self),$B.long_int.$factory(other))}
other=int_value(other)
var res=self-other
if(res > $B.min_int && res < $B.max_int){return res}else{return $B.long_int.__sub__($B.long_int.$factory(self),$B.long_int.$factory(other))}}
return _b_.NotImplemented}
int.__truediv__=function(self,other){if(_b_.isinstance(other,int)){other=int_value(other)
if(other==0){throw _b_.ZeroDivisionError.$factory("division by zero")}
if(other.__class__===$B.long_int){return new Number(self/parseInt(other.value))}
return new Number(self/other)}
return _b_.NotImplemented}
int.bit_count=function(self){var s=_b_.bin(_b_.abs(self)),nb=0
for(var x of s){if(x=='1'){nb++}}
return nb}
int.bit_length=function(self){var s=_b_.bin(self)
s=$B.$getattr(s,"lstrip")("-0b")
return s.length }
int.numerator=function(self){return int_value(self)}
int.denominator=function(self){return int.$factory(1)}
int.imag=function(self){return int.$factory(0)}
int.real=function(self){return self}
for(var attr of['numerator','denominator','imag','real']){int[attr].setter=(function(x){return function(self,value){throw _b_.AttributeError.$factory(`attribute '${x}' of `+
`'${$B.class_name(self)}' objects is not writable`)}})(attr)}
$B.max_int32=(1 << 30)*2-1
$B.min_int32=-$B.max_int32
var $op_func=function(self,other){self=int_value(self)
if(typeof other=="number" ||_b_.isinstance(other,int)){if(other.__class__===$B.long_int){return $B.long_int.__sub__($B.long_int.$factory(self),$B.long_int.$factory(other))}
other=int_value(other)
if(self > $B.max_int32 ||self < $B.min_int32 ||
other > $B.max_int32 ||other < $B.min_int32){return $B.long_int.__sub__($B.long_int.$factory(self),$B.long_int.$factory(other))}
return self-other}
return _b_.NotImplemented}
$op_func+="" 
var $ops={"&":"and","|":"or","^":"xor"}
for(var $op in $ops){var opf=$op_func.replace(/-/gm,$op)
opf=opf.replace(new RegExp("sub","gm"),$ops[$op])
eval("int.__"+$ops[$op]+"__ = "+opf)}
var $comp_func=function(self,other){if(other.__class__===$B.long_int){return $B.long_int.__lt__(other,$B.long_int.$factory(self))}
if(_b_.isinstance(other,int)){other=int_value(other)
return self.valueOf()> other.valueOf()}else if(_b_.isinstance(other,_b_.float)){return self.valueOf()> _b_.float.numerator(other)}else if(_b_.isinstance(other,_b_.bool)){return self.valueOf()> _b_.bool.__hash__(other)}
if(_b_.hasattr(other,"__int__")||_b_.hasattr(other,"__index__")){return int.__gt__(self,$B.$GetInt(other))}
return _b_.NotImplemented}
$comp_func+="" 
for(var $op in $B.$comps){eval("int.__"+$B.$comps[$op]+"__ = "+
$comp_func.replace(/>/gm,$op).
replace(/__gt__/gm,"__"+$B.$comps[$op]+"__").
replace(/__lt__/,"__"+$B.$inv_comps[$op]+"__"))}
var r_opnames=["add","sub","mul","truediv","floordiv","mod","pow","lshift","rshift","and","xor","or","divmod"]
for(var r_opname of r_opnames){if(int["__r"+r_opname+"__"]===undefined &&
int['__'+r_opname+'__']){int["__r"+r_opname+"__"]=(function(name){return function(self,other){if(_b_.isinstance(other,int)){other=int_value(other)
return int["__"+name+"__"](other,self)}
return _b_.NotImplemented}})(r_opname)}}
var $valid_digits=function(base){var digits=""
if(base===0){return "0"}
if(base < 10){for(var i=0;i < base;i++){digits+=String.fromCharCode(i+48)}
return digits}
var digits="0123456789"
for(var i=10;i < base;i++){digits+=String.fromCharCode(i+55)}
return digits}
int.$factory=function(value,base){
if(value===undefined){return 0}
if(typeof value=="number" &&
(base===undefined ||base==10)){return parseInt(value)}
if(_b_.isinstance(value,_b_.complex)){throw _b_.TypeError.$factory("can't convert complex to int")}
var $ns=$B.args("int",2,{x:null,base:null},["x","base"],arguments,{"base":10},null,null),value=$ns["x"],base=$ns["base"]
if(_b_.isinstance(value,_b_.float)&& base==10){value=_b_.float.numerator(value)
if(value < $B.min_int ||value > $B.max_int){return $B.long_int.$from_float(value)}
else{return value > 0 ? Math.floor(value):Math.ceil(value)}}
if(!(base >=2 && base <=36)){
if(base !=0){throw _b_.ValueError.$factory("invalid base")}}
if(typeof value=="number"){if(base==10){if(value < $B.min_int ||value > $B.max_int){return $B.long_int.$factory(value)}
return value}else if(value.toString().search("e")>-1){
throw _b_.OverflowError.$factory("can't convert to base "+base)}else{var res=parseInt(value,base)
if(value < $B.min_int ||value > $B.max_int){return $B.long_int.$factory(value,base)}
return res}}
if(value===true){return Number(1)}
if(value===false){return Number(0)}
if(value.__class__===$B.long_int){var z=parseInt(value.value)
if(z > $B.min_int && z < $B.max_int){return z}
else{return value}}
base=$B.$GetInt(base)
function invalid(value,base){throw _b_.ValueError.$factory("invalid literal for int() with base "+
base+": '"+_b_.str.$factory(value)+"'")}
if(_b_.isinstance(value,_b_.str)){value=value.valueOf()}
if(typeof value=="string"){var _value=value.trim(),
sign=''
if(_value.startsWith('+')||value.startsWith('-')){var sign=_value[0]
_value=_value.substr(1)}
if(_value.length==2 && base==0 &&
(_value=="0b" ||_value=="0o" ||_value=="0x")){throw _b_.ValueError.$factory("invalid value")}
if(_value.length > 2){var _pre=_value.substr(0,2).toUpperCase()
if(base==0){if(_pre=="0B"){base=2}
if(_pre=="0O"){base=8}
if(_pre=="0X"){base=16}}else if(_pre=="0X" && base !=16){invalid(_value,base)}
else if(_pre=="0O" && base !=8){invalid(_value,base)}
if((_pre=="0B" && base==2)||_pre=="0O" ||_pre=="0X"){_value=_value.substr(2)
while(_value.startsWith("_")){_value=_value.substr(1)}}}else if(base==0){
base=10}
var _digits=$valid_digits(base),_re=new RegExp("^[+-]?["+_digits+"]"+
"["+_digits+"_]*$","i"),match=_re.exec(_value)
if(match===null){invalid(value,base)}else{value=_value.replace(/_/g,"")}
if(base <=10 && ! isFinite(value)){invalid(_value,base)}
var res=parseInt(sign+value,base)
if(res < $B.min_int ||res > $B.max_int){return $B.long_int.$factory(value,base)}
return res}
if(_b_.isinstance(value,[_b_.bytes,_b_.bytearray])){return int.$factory($B.$getattr(value,"decode")("latin-1"),base)}
for(var special_method of["__int__","__index__","__trunc__"]){var num_value=$B.$getattr(value.__class__ ||$B.get_class(value),special_method,_b_.None)
if(num_value !==_b_.None){return $B.$call(num_value)(value)}}
throw _b_.TypeError.$factory(
"int() argument must be a string, a bytes-like "+
"object or a number, not '"+$B.class_name(value)+"'")}
$B.set_func_names(int,"builtins")
_b_.int=int
$B.$bool=function(obj){
if(obj===null ||obj===undefined ){return false}
switch(typeof obj){case "boolean":
return obj
case "number":
case "string":
if(obj){return true}
return false
default:
if(obj.$is_class){return true}
var klass=obj.__class__ ||$B.get_class(obj),missing={},bool_method=$B.$getattr(klass,"__bool__",missing)
if(bool_method===missing){try{return _b_.len(obj)> 0}
catch(err){return true}}else{var res=$B.$call(bool_method)(obj)
if(res !==true && res !==false){throw _b_.TypeError.$factory("__bool__ should return "+
"bool, returned "+$B.class_name(res))}
return res}}}
var bool={__bases__:[int],__class__:_b_.type,__mro__:[int,_b_.object],$infos:{__name__:"bool",__module__:"builtins"},$is_class:true,$native:true,$descriptors:{"numerator":true,"denominator":true,"imag":true,"real":true}}
bool.__and__=function(self,other){if(_b_.isinstance(other,bool)){return self && other}else if(_b_.isinstance(other,int)){return int.__and__(bool.__index__(self),int.__index__(other))}
return _b_.NotImplemented}
bool.__float__=function(self){return self ? new Number(1):new Number(0)}
bool.__hash__=bool.__index__=bool.__int__=function(self){if(self.valueOf())return 1
return 0}
bool.__neg__=function(self){return-$B.int_or_bool(self)}
bool.__or__=function(self,other){if(_b_.isinstance(other,bool)){return self ||other}else if(_b_.isinstance(other,int)){return int.__or__(bool.__index__(self),int.__index__(other))}
return _b_.NotImplemented}
bool.__pos__=$B.int_or_bool
bool.__repr__=function(self){$B.builtins_repr_check(bool,arguments)
return self ? "True" :"False"}
bool.__xor__=function(self,other){if(_b_.isinstance(other,bool)){return self ^ other ? true :false}else if(_b_.isinstance(other,int)){return int.__xor__(bool.__index__(self),int.__index__(other))}
return _b_.NotImplemented}
bool.$factory=function(){
var $=$B.args("bool",1,{x:null},["x"],arguments,{x:false},null,null)
return $B.$bool($.x)}
bool.numerator=int.numerator
bool.denominator=int.denominator
bool.real=int.real
bool.imag=int.imag
_b_.bool=bool
$B.set_func_names(bool,"builtins")})(__BRYTHON__)
;
;(function($B){
var _b_=$B.builtins
try{eval("window")}catch(err){window=self}
var long_int={__class__:_b_.type,__mro__:[_b_.int,_b_.object],$infos:{__module__:"builtins",__name__:"int"},$is_class:true,$native:true,$descriptors:{"numerator":true,"denominator":true,"imag":true,"real":true}}
var max_safe_divider=$B.max_int/9
function add_pos(v1,v2){
return{
__class__:long_int,value:(BigInt(v1)+BigInt(v2)).toString(),pos:true}}
var len=((Math.pow(2,53)-1)+'').length-1
function binary_pos(t){var nb_chunks=Math.ceil(t.length/len),chunks=[],pos,start,nb,bin=[]
for(var i=0;i < nb_chunks;i++){pos=t.length-(i+1)*len
start=Math.max(0,pos)
nb=pos-start
chunks.push(t.substr(start,len+nb))}
chunks=chunks.reverse()
chunks.forEach(function(chunk,i){chunks[i]=parseInt(chunk)})
var rest
var carry=Math.pow(10,15)
while(chunks[chunks.length-1]> 0){chunks.forEach(function(chunk,i){rest=chunk % 2
chunks[i]=Math.floor(chunk/2)
if(rest && i < chunks.length-1){chunks[i+1]+=carry}})
bin.push(rest)
if(chunks[0]==0){chunks.shift()}}
bin=bin.reverse().join('')
return bin}
function binary(obj){var bpos=binary_pos(obj.value)
if(obj.pos){return bpos}
var res=''
for(var i=0,len=bpos.length;i < len;i++){res+=bpos.charAt(i)=="0" ? "1":"0"}
var add1=add_pos(res,"1").value
add1=res.substr(0,res.length-add1.length)+add1
return add1}
function comp_pos(v1,v2){
if(v1.length > v2.length){return 1}
else if(v1.length < v2.length){return-1}
else{if(v1 > v2){return 1}
else if(v1 < v2){return-1}}
return 0}
function divmod_by_safe_int(t,n){
if(n==1){return[t,0]}
var quotient=BigInt(t)/BigInt(n),rest=BigInt(t)-quotient*BigInt(n)
console.log("divmod by safe int")
return[from_BigInt(quotient),from_BigInt(rest)]}
function divmod_pos(v1,v2){
var a={__class__:long_int,value:(BigInt(v1)/BigInt(v2)).toString(),pos:true},b={__class__:long_int,value:(BigInt(v1)% BigInt(v2)).toString(),pos:true}
return[a,b]}
function split_chunks(s,size){var nb=Math.ceil(s.length/size),chunks=[],len=s.length
for(var i=0;i < nb;i++){var pos=len-size*(i+1)
if(pos < 0){size+=pos;pos=0}
chunks.push(parseInt(s.substr(pos,size)))}
return chunks}
function mul_pos(x,y){
return long_int.$factory(from_BigInt(BigInt(x)*BigInt(y)))}
function sub_pos(v1,v2){
return{
__class__:long_int,value:(BigInt(v1)-BigInt(v2)).toString(),pos:true}}
function to_BigInt(x){var res=$B.BigInt(x.value)
if(x.pos){return res}
return-res}
function to_int(long_int){return long_int.pos ? parseInt(long_int.value):-parseInt(long_int.value)}
function from_BigInt(y){var pos=y >=0
y=y.toString()
y=y.endsWith("n")? y.substr(0,y.length-1):y
y=y.startsWith('-')? y.substr(1):y
return intOrLong({__class__:long_int,value:y,pos:pos})}
long_int.$from_float=function(value){var s=Math.abs(value).toString(),v=s
if(s.search("e")>-1){var t=/-?(\d)(\.\d+)?e([+-])(\d*)/.exec(s),n1=t[1],n2=t[2],pos=t[3],exp=t[4]
if(pos=="+"){if(n2===undefined){v=n1+"0".repeat(exp-1)}else{v=n1+n2+"0".repeat(exp-1-n2.length)}}}
return{__class__:long_int,value:v,pos:value >=0}}
function preformat(self,fmt){if(fmt.empty){return _b_.str.$factory(self)}
if(fmt.type && 'bcdoxXn'.indexOf(fmt.type)==-1){throw _b_.ValueError.$factory("Unknown format code '"+fmt.type+
"' for object of type 'int'")}
var res
switch(fmt.type){case undefined:
case "d":
res=self.toString()
break
case "b":
res=(fmt.alternate ? "0b" :"")+BigInt(self.value).toString(2)
break
case "c":
res=_b_.chr(self)
break
case "o":
res=(fmt.alternate ? "0o" :"")+BigInt(self.value).toString(8)
break
case "x":
res=(fmt.alternate ? "0x" :"")+BigInt(self.value).toString(16)
break
case "X":
res=(fmt.alternate ? "0X" :"")+BigInt(self.value).toString(16).toUpperCase()
break
case "n":
return self }
if(fmt.sign !==undefined){if((fmt.sign==" " ||fmt.sign=="+" )&& self >=0){res=fmt.sign+res}}
return res}
long_int.__format__=function(self,format_spec){var fmt=new $B.parse_format_spec(format_spec)
if(fmt.type && 'eEfFgG%'.indexOf(fmt.type)!=-1){
return _b_.float.__format__(self,format_spec)}
fmt.align=fmt.align ||">"
var res=preformat(self,fmt)
if(fmt.comma){var sign=res[0]=="-" ? "-" :"",rest=res.substr(sign.length),len=rest.length,nb=Math.ceil(rest.length/3),chunks=[]
for(var i=0;i < nb;i++){chunks.push(rest.substring(len-3*i-3,len-3*i))}
chunks.reverse()
res=sign+chunks.join(",")}
return $B.format_width(res,fmt)}
long_int.__abs__=function(self){return{__class__:long_int,value:self.value,pos:true}}
long_int.__add__=function(self,other){if(_b_.isinstance(other,_b_.float)){return _b_.float.$factory(to_int(self)+other)}
if(typeof other=="number"){other=long_int.$factory(_b_.str.$factory(other))}else if(other.__class__ !==long_int){if(_b_.isinstance(other,_b_.bool)){other=long_int.$factory(other ? 1 :0)}else if(_b_.isinstance(other,_b_.int)){
other=long_int.$factory(_b_.str.$factory(_b_.int.__index__(other)))}else{return _b_.NotImplemented}}
return from_BigInt(to_BigInt(self)+to_BigInt(other))}
long_int.__and__=function(self,other){if(typeof other=="number"){other=long_int.$factory(_b_.str.$factory(other))}
return from_BigInt(to_BigInt(self)& to_BigInt(other))}
long_int.__divmod__=function(self,other){if(typeof other=="number"){other=long_int.$factory(_b_.str.$factory(other))}
var a=to_BigInt(self),b=to_BigInt(other),quotient
if((a >=0 && b > 0)||(a <=0 && b < 0)){quotient=a/b}else{quotient=a/b-BigInt(1)}
var rest=a-quotient*b
return $B.fast_tuple([from_BigInt(quotient),from_BigInt(rest)])}
long_int.__eq__=function(self,other){if(typeof other=="number"){other=long_int.$factory(_b_.str.$factory(other))}
return self.value==other.value && self.pos==other.pos}
long_int.__float__=function(self){if(! isFinite(parseFloat(self.value))){throw _b_.OverflowError.$factory("int too big to convert to float")}
return new Number((self.pos ? 1 :-1)*parseFloat(self.value))}
long_int.__floordiv__=function(self,other){if(_b_.isinstance(other,_b_.float)){return _b_.float.$factory(to_int(self)/other)}
if(typeof other=="number" && Math.abs(other)< $B.max_safe_divider){var t=self.value,res=divmod_by_safe_int(t,other),pos=other > 0 ? self.pos :!self.pos
return{__class__:long_int,value:res[0],pos:pos}}
var res=intOrLong(long_int.__divmod__(self,other)[0])
return res}
long_int.__ge__=function(self,other){if(typeof other=="number"){other=long_int.$factory(_b_.str.$factory(other))}
if(self.pos !=other.pos){return ! other.pos}
if(self.value.length > other.value.length){return self.pos}
else if(self.value.length < other.value.length){return ! self.pos}
else{return self.pos ? self.value >=other.value :
self.value <=other.value}}
long_int.__gt__=function(self,other){return ! long_int.__le__(self,other)}
long_int.__hash__=function(self){var modulus=$B.fast_long_int("2305843009213693951",true),self_pos=$B.fast_long_int(self.value,true)
var _hash=$B.long_int.__mod__(self_pos,modulus)
if(typeof _hash=="number"){_hash=self.pos ? _hash :-_hash}else{_hash.pos=self.pos}
return self.__hashvalue__=_hash}
long_int.__index__=function(self){
var res='',temp=self.value,d
while(true){d=divmod_pos(temp,"2")
res=d[1].value+res
temp=d[0].value
if(temp=="0"){break}}
if(! self.pos){
var nres="",flag=false
for(var len=res.length-1,i=len;i >=0 ;i--){var bit=res.charAt(i)
if(bit=="0"){if(flag){nres="1"+nres}else{nres="0"+nres}}else{if(flag){nres="0"+nres}
else{flag=true;nres="1"+nres}}}
nres="1"+nres
res=nres}else{res="0"+res}
return intOrLong(res)}
long_int.__invert__=function(self){return long_int.__sub__(long_int.$factory("-1"),self)}
long_int.__le__=function(self,other){if(typeof other=="number"){other=long_int.$factory(_b_.str.$factory(other))}
if(self.pos !==other.pos){return ! self.pos}
if(self.value.length > other.value.length){return ! self.pos}
else if(self.value.length < other.value.length){return self.pos}
else{return self.pos ? self.value <=other.value :
self.value >=other.value}}
long_int.__lt__=function(self,other){return !long_int.__ge__(self,other)}
long_int.__lshift__=function(self,shift){if(shift.__class__==long_int){shift=shift.value}
return intOrLong({__class__:long_int,value:(BigInt(self.value)<< BigInt(shift)).toString(),pos:self.pos})}
long_int.__mod__=function(self,other){return intOrLong(long_int.__divmod__(self,other)[1])}
long_int.__mro__=[_b_.int,_b_.object]
long_int.__mul__=function(self,other){switch(self){case Number.NEGATIVE_INFINITY:
case Number.POSITIVE_INFINITY:
if($B.rich_comp("__eq__",other,0)){return NaN}
else if(_b_.getattr(other,"__gt__")(0)){return self}
else{return-self}}
if(_b_.isinstance(other,_b_.float)){return _b_.float.$factory(to_int(self)*other)}
if(typeof other=="number"){other=long_int.$factory(other)}
other_value=other.value
other_pos=other.pos
if(other.__class__ !==long_int && _b_.isinstance(other,_b_.int)){
var value=_b_.int.__index__(other)
other_value=_b_.str.$factory(value)
other_pos=value > 0}
return from_BigInt(to_BigInt(self)*to_BigInt(other))}
long_int.__ne__=function(self,other){var res=long_int.__eq__(self,other)
return res===_b_.NotImplemented ? res :!res}
long_int.__neg__=function(obj){return{__class__:long_int,value:obj.value,pos:! obj.pos}}
long_int.__or__=function(self,other){other=long_int.$factory(other)
var v1=long_int.__index__(self)
var v2=long_int.__index__(other)
if(v1.length < v2.length){var temp=v2;v2=v1;v1=temp}
var start=v1.length-v2.length
var res=v1.substr(0,start)
for(var i=0;i < v2.length;i++){if(v1.charAt(start+i)=="1" ||v2.charAt(i)=="1"){res+="1"}
else{res+="0"}}
return intOrLong(long_int.$factory(res,2))}
long_int.__pos__=function(self){return self}
long_int.__pow__=function(self,power,z){if(typeof power=="number"){power=long_int.$from_int(power)}else if(_b_.isinstance(power,_b_.int)){
power=long_int.$factory(_b_.str.$factory(_b_.int.__index__(power)))}else if(! _b_.isinstance(power,long_int)){var msg="power must be an integer, not '"
throw _b_.TypeError.$factory(msg+$B.class_name(power)+"'")}
if(! power.pos){if(self.value=="1"){return self}
return long_int.$factory("0")}else if(power.value=="0"){return long_int.$factory("1")}
var s=$B.BigInt(self.value),b=$B.BigInt(1),x=$B.BigInt(power.value),z=z===undefined ? z :typeof z=="number" ? $B.BigInt(z):
$B.BigInt(z.value)
if(z===undefined){return{
__class__:long_int,value:(s**x).toString(),pos:true}}
while(x > 0){if(x % $B.BigInt(2)==1){b=b*s}
x=x/$B.BigInt(2)
if(x > 0){s=s*s}
if(z !==undefined){b=b % z}}
return{__class__:long_int,value:b.toString(),pos:true}}
long_int.__rshift__=function(self,shift){if(shift.__class__===long_int){shift=shift.value}
return intOrLong(
{__class__:long_int,value:(BigInt(self.value)>> BigInt(shift)).toString(),pos:self.pos}
)}
long_int.__str__=long_int.__repr__=function(self){var res=""
if(! self.pos){res+='-'}
return res+self.value}
long_int.__sub__=function(self,other){if(_b_.isinstance(other,_b_.float)){other=other instanceof Number ? other :other.$brython_value
return _b_.float.$factory(to_int(self)-other)}
if(typeof other=="number"){other=long_int.$factory(_b_.str.$factory(other))}
if($B.BigInt){}
var res
if(self.pos && other.pos){switch(comp_pos(self.value,other.value)){case 1:
res=sub_pos(self.value,other.value)
break
case 0:
res={__class__:long_int,value:"0",pos:true}
break
case-1:
res=sub_pos(other.value,self.value)
res.pos=false
break}
return intOrLong(res)}else if(! self.pos && ! other.pos){switch(comp_pos(self.value,other.value)){case 1:
res=sub_pos(self.value,other.value)
res.pos=false
break
case 0:
res={__class__:long_int,value:"0",pos:true}
break
case-1:
res=sub_pos(other.value,self.value)
break}
return intOrLong(res)}else if(self.pos && ! other.pos){return intOrLong(add_pos(self.value,other.value))}else{res=add_pos(self.value,other.value)
res.pos=false
return intOrLong(res)}}
long_int.__truediv__=function(self,other){if(_b_.isinstance(other,long_int)){return _b_.float.$factory(to_int(self)/to_int(other))}else if(_b_.isinstance(other,_b_.int)){return _b_.float.$factory(to_int(self)/other)}else if(_b_.isinstance(other,_b_.float)){return _b_.float.$factory(to_int(self)/other)}else{throw _b_.TypeError.$factory(
"unsupported operand type(s) for /: 'int' and '"+
$B.class_name(other)+"'")}}
long_int.__xor__=function(self,other){other=long_int.$factory(other)
var v1=long_int.__index__(self),v2=long_int.__index__(other)
if(v1.length < v2.length){var temp=v2;v2=v1;v1=temp}
var start=v1.length-v2.length
var res=v1.substr(0,start)
for(var i=0;i < v2.length;i++){if(v1.charAt(start+i)=="1" && v2.charAt(i)=="0"){res+="1"}
else if(v1.charAt(start+i)=="0" && v2.charAt(i)=="1"){res+="1"}
else{res+="0"}}
return intOrLong(long_int.$factory(res,2))}
long_int.bit_count=function(self){var s=_b_.bin(_b_.abs(self)),nb=0
for(var x of s){if(x=='1'){nb++}}
return nb}
long_int.bit_length=function(self){return binary(self).length}
function _infos(self){
var nbits=$B.long_int.bit_length(self),pow2=2n**BigInt(nbits-1),rest=BigInt(self.value)-pow2,relative_rest=new Number(rest)/new Number(pow2)
return{nbits,pow2,rest,relative_rest}}
long_int.$log2=function(x){if(! x.pos){throw _b_.ValueError.$factory('math domain error')}
var infos=_infos(x)
return _b_.float.$factory(infos.nbits-1+
Math.log(1+infos.relative_rest/Math.LN2))}
long_int.$log10=function(x){if(! x.pos){throw _b_.ValueError.$factory('math domain error')}
var exp=x.value.length-1,mant=eval(x.value[0]+'.'+x.value.substr(1))
return _b_.float.$factory(exp+Math.log10(mant))}
long_int.numerator=function(self){return self}
long_int.denominator=function(self){return _b_.int.$factory(1)}
long_int.imag=function(self){return _b_.int.$factory(0)}
long_int.real=function(self){return self}
long_int.to_base=function(self,base){
if(base==2){return binary_pos(self.value)}
var res="",v=self.value
while(v > 0){var dm=divmod_pos(v,base.toString())
res=parseInt(dm[1].value).toString(base)+res
v=dm[0].value
if(v==0){break}}
return res}
long_int.to_bytes=function(self,len,byteorder,signed){
var res=[],v=self.value
if(! $B.$bool(signed)&& ! self.pos){throw _b_.OverflowError.$factory("can't convert negative int to unsigned")}
while(v > 0){var dm=divmod_pos(v,256)
v=parseInt(dm[0].value)
res.push(parseInt(dm[1].value))
if(res.length > len){throw _b_.OverflowError.$factory("int too big to convert")}}
while(res.length < len){res.push(0)}
if(byteorder=='big'){res.reverse()}
return _b_.bytes.$factory(res)}
function digits(base){
var is_digits={}
for(var i=0;i < base;i++){if(i==10){break}
is_digits[i]=true}
if(base > 10){
for(var i=0;i < base-10;i++){is_digits[String.fromCharCode(65+i)]=true
is_digits[String.fromCharCode(97+i)]=true}}
return is_digits}
var MAX_SAFE_INTEGER=Math.pow(2,53)-1
var MIN_SAFE_INTEGER=-MAX_SAFE_INTEGER
function isSafeInteger(n){return(typeof n==="number" &&
Math.round(n)===n &&
MIN_SAFE_INTEGER <=n &&
n <=MAX_SAFE_INTEGER)}
function intOrLong(long){
var v=parseInt(long.value)*(long.pos ? 1 :-1)
if(v > MIN_SAFE_INTEGER && v < MAX_SAFE_INTEGER){return v}
return long}
long_int.$from_int=function(value){return{__class__:long_int,value:value.toString(),pos:value > 0}}
long_int.$factory=function(value,base){if(arguments.length > 2){throw _b_.TypeError.$factory("long_int takes at most 2 arguments ("+
arguments.length+" given)")}
if(base===undefined){base=10}
else if(! _b_.isinstance(base,_b_.int)){throw _b_.TypeError.$factory("'"+$B.class_name(base)+
"' object cannot be interpreted as an integer")}
if(base < 0 ||base==1 ||base > 36){throw _b_.ValueError.$factory(
"long_int.$factory() base must be >= 2 and <= 36")}
if(typeof value=="number"){var pos=value >=0,value=Math.abs(value),res
if(isSafeInteger(value)){res=long_int.$from_int(value)}
else if(value.constructor==Number){var s=value.toString(),pos_exp=s.search("e")
if(pos_exp >-1){var mant=s.substr(0,pos_exp),exp=parseInt(s.substr(pos_exp+1)),point=mant.search(/\./)
if(point >-1){var nb_dec=mant.substr(point+1).length
if(nb_dec > exp){var res=mant.substr(0,point)+
mant.substr(point+1).substr(0,exp)
res=long_int.$from_int(res)}else{var res=mant.substr(0,point)+
mant.substr(point+1)+'0'.repeat(exp-nb_dec)
res=long_int.$from_int(res)}}else{res=long_int.$from_int(mant+'0'.repeat(exp))}}else{var point=s.search(/\./)
if(point >-1){res=long_int.$from_int(s.substr(0,point))}else{res=long_int.$from_int(s)}}}
else{throw _b_.ValueError.$factory(
"argument of long_int is not a safe integer")}
res.pos=pos
return res}else if(_b_.isinstance(value,_b_.float)){if(value===Number.POSITIVE_INFINITY ||
value===Number.NEGATIVE_INFINITY){return value}
if(value >=0){value=new Number(Math.round(value.value))}
else{value=new Number(Math.ceil(value.value))}}else if(_b_.isinstance(value,_b_.bool)){if(value.valueOf()){return _b_.int.$factory(1)}
return _b_.int.$factory(0)}else if(value.__class__===long_int){return value}else if(_b_.isinstance(value,_b_.int)){
value=value.$brython_value+""}else if(_b_.isinstance(value,_b_.bool)){value=_b_.bool.__int__(value)+""}else if(typeof value !="string"){throw _b_.ValueError.$factory(
"argument of long_int must be a string, not "+
$B.class_name(value))}
var has_prefix=false,pos=true,start=0
while(value.charAt(0)==" " && value.length){value=value.substr(1)}
while(value.charAt(value.length-1)==" " && value.length){value=value.substr(0,value.length-1)}
if(value.charAt(0)=="+"){has_prefix=true}
else if(value.charAt(0)=="-"){has_prefix=true;pos=false}
if(has_prefix){
if(value.length==1){
throw _b_.ValueError.$factory(
'long_int argument is not a valid number: "'+value+'"')}else{value=value.substr(1)}}
while(start < value.length-1 && value.charAt(start)=="0"){start++}
value=value.substr(start)
var is_digits=digits(base),point=-1
for(var i=0;i < value.length;i++){if(value.charAt(i)=="." && point==-1){point=i}else if(false){
var mant=value.substr(0,i)
if(/^[+-]?\d+$/.exec(value.substr(i+1))){exp=parseInt(value.substr(i+1))}else{throw Error("wrong exp "+value.substr(i+1))}
if(point !=-1){mant=mant.substr(0,point)+mant.substr(point+1)
exp=exp+point-1}
point=-1
value=mant+"0".repeat(exp-mant.length)
break}
else if(! is_digits[value.charAt(i)]){throw _b_.ValueError.$factory(
'long_int argument is not a valid number: "'+value+'"')}}
if(point !=-1){value=value.substr(0,point)}
if(base !=10){
var coef="1",v10=long_int.$factory(0),ix=value.length
while(ix--){var digit_base10=parseInt(value.charAt(ix),base).toString(),digit_by_coef=mul_pos(coef,digit_base10).value
v10=add_pos(v10.value,digit_by_coef)
coef=mul_pos(coef,base.toString()).value}
return v10}
return{__class__:long_int,value:value,pos:pos}}
function extended_euclidean_algorithm(a,b){
var s=0,old_s=1,t=1,old_t=0,r=b,old_r=a,quotient,tmp
while($B.rich_comp('__ne__',r,0)){quotient=$B.rich_op('__floordiv__',old_r,r)
tmp=$B.rich_op('__sub__',old_r,$B.rich_op('__mul__',quotient,r))
old_r=r
r=tmp
tmp=$B.rich_op('__sub__',old_s,$B.rich_op('__mul__',quotient,s))
old_s=s
s=tmp
tmp=$B.rich_op('__sub__',old_t,$B.rich_op('__mul__',quotient,t))
old_t=t
t=tmp}
return[old_r,old_s,old_t]}
function inverse_of(n,p){
var gcd,x,y
[gcd,x,y]=extended_euclidean_algorithm(n,p)
if($B.rich_comp('__ne__',gcd,1)){
throw Error(
`${n} has no multiplicative inverse '
            'modulo ${p}`)}else{return $B.rich_op('__mod__',x,p)}}
$B.inverse_of=inverse_of
$B.set_func_names(long_int,"builtins")
$B.long_int=long_int
$B.fast_long_int=function(value,pos){return{__class__:$B.long_int,value:value,pos:pos}}})(__BRYTHON__)
;
;(function($B){var _b_=$B.builtins
var object=_b_.object
function $err(op,other){var msg="unsupported operand type(s) for "+op+
": 'float' and '"+$B.class_name(other)+"'"
throw _b_.TypeError.$factory(msg)}
function float_value(obj){
return obj.$brython_value !==undefined ? obj.$brython_value :obj}
var float={__class__:_b_.type,__dir__:object.__dir__,$infos:{__module__:"builtins",__name__:"float"},$is_class:true,$native:true,$descriptors:{"numerator":true,"denominator":true,"imag":true,"real":true}}
float.numerator=function(self){return float_value(self)}
float.denominator=function(self){return _b_.int.$factory(1)}
float.imag=function(self){return _b_.int.$factory(0)}
float.real=function(self){return float_value(self)}
float.__float__=function(self){return float_value(self)}
$B.shift1_cache={}
float.as_integer_ratio=function(self){self=float_value(self)
if(self.valueOf()==Number.POSITIVE_INFINITY ||
self.valueOf()==Number.NEGATIVE_INFINITY){throw _b_.OverflowError.$factory("Cannot pass infinity to "+
"float.as_integer_ratio.")}
if(! Number.isFinite(self.valueOf())){throw _b_.ValueError.$factory("Cannot pass NaN to "+
"float.as_integer_ratio.")}
var tmp=frexp(self.valueOf()),fp=tmp[0],exponent=tmp[1]
for(var i=0;i < 300;i++){if(fp==Math.floor(fp)){break}else{fp*=2
exponent--}}
numerator=_b_.int.$factory(fp)
py_exponent=_b_.abs(exponent)
denominator=1
var x
if($B.shift1_cache[py_exponent]!==undefined){x=$B.shift1_cache[py_exponent]}else{x=$B.$getattr(1,"__lshift__")(py_exponent)
$B.shift1_cache[py_exponent]=x}
py_exponent=x
if(exponent > 0){numerator=$B.rich_op("__mul__",numerator,py_exponent)}else{denominator=py_exponent}
return $B.fast_tuple([_b_.int.$factory(numerator),_b_.int.$factory(denominator)])}
float.__abs__=function(self){return new Number(Math.abs(float_value(self)))}
float.__bool__=function(self){self=float_value(self)
return _b_.bool.$factory(self.valueOf())}
float.__divmod__=function(self,other){if(! _b_.isinstance(other,[_b_.int,float])){return _b_.NotImplemented}
return $B.fast_tuple([float.__floordiv__(self,other),float.__mod__(self,other)])}
float.__eq__=function(self,other){self=float_value(self)
other=float_value(other)
if(isNaN(self)&& isNaN(other)){return false}
if(_b_.isinstance(other,_b_.int)){return self==other}
if(_b_.isinstance(other,float)){
return self.valueOf()==other.valueOf()}
if(_b_.isinstance(other,_b_.complex)){if(other.$imag !=0){return false}
return self==other.$real}
return _b_.NotImplemented}
float.__floordiv__=function(self,other){self=float_value(self)
other=float_value(other)
if(_b_.isinstance(other,[_b_.int,float])){if(other.valueOf()==0){throw _b_.ZeroDivisionError.$factory('division by zero')}
return float.$factory(Math.floor(self/other))}
return _b_.NotImplemented}
float.fromhex=function(arg){
if(! _b_.isinstance(arg,_b_.str)){throw _b_.ValueError.$factory("argument must be a string")}
var value=arg.trim()
switch(value.toLowerCase()){case "+inf":
case "inf":
case "+infinity":
case "infinity":
return $FloatClass(Infinity)
case "-inf":
case "-infinity":
return $FloatClass(-Infinity)
case "+nan":
case "nan":
return $FloatClass(Number.NaN)
case "-nan":
return $FloatClass(-Number.NaN)
case "":
throw _b_.ValueError.$factory("could not convert string to float")}
var mo=/^(\d*)(\.?)(\d*)$/.exec(value)
if(mo !==null){var res=parseFloat(mo[1]),coef=16
if(mo[2]){for(var digit of mo[3]){res+=parseInt(digit,16)/coef
coef*=16}}
return $FloatClass(res)}
var _m=/^(\+|-)?(0x)?([0-9A-F]+\.?)?(\.[0-9A-F]+)?(p(\+|-)?\d+)?$/i.exec(value)
if(_m==null){throw _b_.ValueError.$factory("invalid hexadecimal floating-point string")}
var _sign=_m[1],_int=parseInt(_m[3]||'0',16),_fraction=_m[4]||'.0',_exponent=_m[5]||'p0'
if(_sign=="-"){_sign=-1}else{_sign=1}
var _sum=_int
for(var i=1,len=_fraction.length;i < len;i++){_sum+=parseInt(_fraction.charAt(i),16)/Math.pow(16,i)}
return new Number(_sign*_sum*Math.pow(2,parseInt(_exponent.substring(1))))}
float.__getformat__=function(arg){if(arg=="double" ||arg=="float"){return "IEEE, little-endian"}
throw _b_.ValueError.$factory("__getformat__() argument 1 must be "+
"'double' or 'float'")}
function preformat(self,fmt){if(fmt.empty){return _b_.str.$factory(self)}
if(fmt.type && 'eEfFgGn%'.indexOf(fmt.type)==-1){throw _b_.ValueError.$factory("Unknown format code '"+fmt.type+
"' for object of type 'float'")}
if(isNaN(self)){if(fmt.type=="f" ||fmt.type=="g"){return "nan"}
else{return "NAN"}}
if(self==Number.POSITIVE_INFINITY){if(fmt.type=="f" ||fmt.type=="g"){return "inf"}
else{return "INF"}}
if(fmt.precision===undefined && fmt.type !==undefined){fmt.precision=6}
if(fmt.type=="%"){self*=100}
if(fmt.type=="e"){var res=self.toExponential(fmt.precision),exp=parseInt(res.substr(res.search("e")+1))
if(Math.abs(exp)< 10){res=res.substr(0,res.length-1)+"0"+
res.charAt(res.length-1)}
return res}
if(fmt.precision !==undefined){
var prec=fmt.precision
if(prec==0){return Math.round(self)+""}
var res=self.toFixed(prec),pt_pos=res.indexOf(".")
if(fmt.type !==undefined &&
(fmt.type=="%" ||fmt.type.toLowerCase()=="f")){if(pt_pos==-1){res+="."+"0".repeat(fmt.precision)}else{var missing=fmt.precision-res.length+pt_pos+1
if(missing > 0){res+="0".repeat(missing)}}}else if(fmt.type && fmt.type.toLowerCase()=="g"){var exp_fmt=preformat(self,{type:"e"}).split("e"),exp=parseInt(exp_fmt[1])
if(-4 <=exp && exp < fmt.precision){res=preformat(self,{type:"f",precision:fmt.precision-1-exp})}else{res=preformat(self,{type:"e",precision:fmt.precision-1})}
var parts=res.split("e")
if(fmt.alternate){if(parts[0].search(/\./)==-1){parts[0]+='.'}}else{if(parts[1]){var signif=parts[0]
while(signif.endsWith("0")){signif=signif.substr(0,signif.length-1)}
if(signif.endsWith(".")){signif=signif.substr(0,signif.length-1)}
parts[0]=signif}}
res=parts.join("e")
if(fmt.type=="G"){res=res.toUpperCase()}
return res}else if(fmt.type===undefined){fmt.type="g"
res=preformat(self,fmt)
fmt.type=undefined}else{var res1=self.toExponential(fmt.precision-1),exp=parseInt(res1.substr(res1.search("e")+1))
if(exp <-4 ||exp >=fmt.precision-1){var elts=res1.split("e")
while(elts[0].endsWith("0")){elts[0]=elts[0].substr(0,elts[0].length-1)}
res=elts.join("e")}}}else{var res=_b_.str.$factory(self)}
if(fmt.type===undefined ||"gGn".indexOf(fmt.type)!=-1){
if(res.search("e")==-1){while(res.charAt(res.length-1)=="0"){res=res.substr(0,res.length-1)}}
if(res.charAt(res.length-1)=="."){if(fmt.type===undefined){res+="0"}
else{res=res.substr(0,res.length-1)}}}
if(fmt.sign !==undefined){if((fmt.sign==" " ||fmt.sign=="+" )&& self > 0){res=fmt.sign+res}}
if(fmt.type=="%"){res+="%"}
return res}
float.__format__=function(self,format_spec){self=float_value(self)
var fmt=new $B.parse_format_spec(format_spec)
fmt.align=fmt.align ||">"
var raw=preformat(self,fmt).split('.'),_int=raw[0]
if(fmt.comma){var len=_int.length,nb=Math.ceil(_int.length/3),chunks=[]
for(var i=0;i < nb;i++){chunks.push(_int.substring(len-3*i-3,len-3*i))}
chunks.reverse()
raw[0]=chunks.join(",")}
return $B.format_width(raw.join("."),fmt)}
float.__hash__=function(self){if(self===undefined){return float.__hashvalue__ ||$B.$py_next_hash--}
var _v=self.valueOf()
if(_v===Infinity){return 314159}
if(_v===-Infinity){return-271828}
if(isNaN(_v)){return 0}
if(_v==Math.round(_v)){return Math.round(_v)}
var r=frexp(_v)
r[0]*=Math.pow(2,31)
var hipart=_b_.int.$factory(r[0])
r[0]=(r[0]-hipart)*Math.pow(2,31)
var x=hipart+_b_.int.$factory(r[0])+(r[1]<< 15)
return x & 0xFFFFFFFF}
function isninf(x){var x1=x
if(_b_.isinstance(x,float)){x1=float.numerator(x)}
return x1==-Infinity ||x1==Number.NEGATIVE_INFINITY}
function isinf(x){var x1=x
if((! x instanceof Number)&& _b_.isinstance(x,float)){x1=float.numerator(x)}
return x1==Infinity ||x1==-Infinity ||
x1==Number.POSITIVE_INFINITY ||x1==Number.NEGATIVE_INFINITY}
function isnan(x){var x1=x
if(_b_.isinstance(x,float)){x1=float.numerator(x)}
return isNaN(x1)}
function fabs(x){if(x==0){return new Number(0)}
return x > 0 ? float.$factory(x):float.$factory(-x)}
function frexp(x){var x1=x
if(_b_.isinstance(x,float)){x1=x.valueOf()}
if(isNaN(x1)||isinf(x1)){return[x1,-1]}else if(x1==0){return[0,0]}
var sign=1,ex=0,man=x1
if(man < 0.){sign=-sign
man=-man}
while(man < 0.5){man*=2.0
ex--}
while(man >=1.0){man*=0.5
ex++}
man*=sign
return[man,ex]}
function ldexp(x,i){if(isninf(x)){return float.$factory('-inf')}
if(isinf(x)){return float.$factory('inf')}
var y=x
if(_b_.isinstance(x,float)){y=x.valueOf()}
if(y==0){return y}
var j=i
if(_b_.isinstance(i,float)){j=i.valueOf()}
return y*Math.pow(2,j)}
float.$funcs={isinf,isninf,isnan,fabs,frexp,ldexp}
float.hex=function(self){
self=float_value(self)
var DBL_MANT_DIG=53,
TOHEX_NBITS=DBL_MANT_DIG+3-(DBL_MANT_DIG+2)% 4
switch(self.valueOf()){case Infinity:
case-Infinity:
case Number.NaN:
case-Number.NaN:
return self
case-0:
return "-0x0.0p0"
case 0:
return "0x0.0p0"}
var _a=frexp(fabs(self.valueOf())),_m=_a[0],_e=_a[1],_shift=1-Math.max(-1021-_e,0)
_m=ldexp(_m,_shift)
_e-=_shift
var _int2hex="0123456789ABCDEF".split(""),_s=_int2hex[Math.floor(_m)]
_s+='.'
_m-=Math.floor(_m)
for(var i=0;i <(TOHEX_NBITS-1)/4;i++){_m*=16.0
_s+=_int2hex[Math.floor(_m)]
_m-=Math.floor(_m)}
var _esign="+"
if(_e < 0){_esign="-"
_e=-_e}
if(self.value < 0){return "-0x"+_s+"p"+_esign+_e}
return "0x"+_s+"p"+_esign+_e}
float.__init__=function(self,value){return _b_.None}
float.__int__=function(self){return parseInt(self)}
float.is_integer=function(self){return _b_.int.$factory(self)==self}
float.__mod__=function(self,other){
self=float_value(self)
other=float_value(other)
if(other==0){throw _b_.ZeroDivisionError.$factory("float modulo")}
if(_b_.isinstance(other,_b_.int)){other=_b_.int.numerator(other)
return new Number((self % other+other)% other)}
if(_b_.isinstance(other,float)){
var q=Math.floor(self/other),r=self-other*q
return new Number(r)}
return _b_.NotImplemented}
float.__mro__=[object]
float.__mul__=function(self,other){self=float_value(self)
other=float_value(other)
if(_b_.isinstance(other,_b_.int)){if(other.__class__==$B.long_int){return new Number(self*parseFloat(other.value))}
other=_b_.int.numerator(other)
return new Number(self*other)}
if(_b_.isinstance(other,float)){return new Number(self*float_value(other))}
return _b_.NotImplemented}
float.__ne__=function(self,other){var res=float.__eq__(self,other)
return res===_b_.NotImplemented ? res :! res}
float.__neg__=function(self){return new Number(-float_value(self))}
float.__new__=function(cls,value){if(cls===undefined){throw _b_.TypeError.$factory("float.__new__(): not enough arguments")}else if(! _b_.isinstance(cls,_b_.type)){throw _b_.TypeError.$factory("float.__new__(X): X is not a type object")}
if(cls===float){return float.$factory(value)}
return{
__class__:cls,__dict__:$B.empty_dict(),$brython_value:value ||0}}
float.__pos__=function(self){return float_value(self)}
float.__pow__=function(self,other){self=float_value(self)
other=float_value(other)
var other_int=_b_.isinstance(other,_b_.int)
if(other_int ||_b_.isinstance(other,float)){if(self==1){return new Number(1)}
if(other==0){return new Number(1)}
if(self==-1 &&
(! isFinite(other)||other.__class__===$B.long_int ||
! $B.is_safe_int(other))&&
! isNaN(other)){return new Number(1)}else if(self==0 && isFinite(other)&& other < 0){throw _b_.ZeroDivisionError.$factory("0.0 cannot be raised "+
"to a negative power")}else if(self==Number.NEGATIVE_INFINITY && ! isNaN(other)){if(other < 0 && other % 2==1){return new Number(-0.0)}else if(other < 0){return new Number(0)}
else if(other > 0 && other % 2==1){return Number.NEGATIVE_INFINITY}else{return Number.POSITIVE_INFINITY}}else if(self==Number.POSITIVE_INFINITY && ! isNaN(other)){return other > 0 ? self :new Number(0)}
if(other==Number.NEGATIVE_INFINITY && ! isNaN(self)){return Math.abs(self)< 1 ? Number.POSITIVE_INFINITY :
new Number(0)}else if(other==Number.POSITIVE_INFINITY && ! isNaN(self)){return Math.abs(self)< 1 ? new Number(0):
Number.POSITIVE_INFINITY}
if(self < 0 &&
! $B.$getattr(other,"__eq__")(_b_.int.$factory(other))){
return _b_.complex.__pow__($B.make_complex(self,0),other)}
return float.$factory(Math.pow(self,other))}
return _b_.NotImplemented}
function __newobj__(){
var $=$B.args('__newobj__',0,{},[],arguments,{},'args',null),args=$.args
var res=args.slice(1)
res.__class__=args[0]
return res}
float.__reduce_ex__=function(self){return $B.fast_tuple([__newobj__,$B.fast_tuple([self.__class__ ||_b_.int,float_value(self)]),_b_.None,_b_.None,_b_.None])}
float.__repr__=function(self){$B.builtins_repr_check(float,arguments)
self=float_value(self).valueOf()
if(self==Infinity){return 'inf'}else if(self==-Infinity){return '-inf'}else if(isNaN(self)){return 'nan'}else if(self===0){if(1/self===-Infinity){return '-0.0'}
return '0.0'}
var res=self+"" 
if(res.search(/[.eE]/)==-1){res+=".0"}
var split_e=res.split(/e/i)
if(split_e.length==2){var mant=split_e[0],exp=split_e[1]
if(exp.startsWith('-')){exp_str=parseInt(exp.substr(1))+''
if(exp_str.length < 2){exp_str='0'+exp_str}
return mant+'e-'+exp_str}}
var x,y
[x,y]=res.split('.')
var sign=''
if(x[0]=='-'){x=x.substr(1)
sign='-'}
if(x.length > 16){var exp=x.length-1,int_part=x[0],dec_part=x.substr(1)+y
while(dec_part.endsWith("0")){dec_part=dec_part.substr(0,dec_part.length-1)}
var mant=int_part
if(dec_part.length > 0){mant+='.'+dec_part}
return sign+mant+'e+'+exp}else if(x=="0"){var exp=0
while(exp < y.length && y.charAt(exp)=="0"){exp++}
if(exp > 3){
var rest=y.substr(exp),exp=(exp+1).toString()
while(rest.endsWith("0")){rest=rest.substr(0,res.length-1)}
var mant=rest[0]
if(rest.length > 1){mant+='.'+rest.substr(1)}
if(exp.length==1){exp='0'+exp}
return sign+mant+'e-'+exp}}
return _b_.str.$factory(res)}
float.__setattr__=function(self,attr,value){if(self.constructor===Number){if(float[attr]===undefined){throw _b_.AttributeError.$factory("'float' object has no attribute '"+
attr+"'")}else{throw _b_.AttributeError.$factory("'float' object attribute '"+
attr+"' is read-only")}}
self[attr]=value
return _b_.None}
float.__truediv__=function(self,other){self=float_value(self)
other=float_value(other)
if(_b_.isinstance(other,[_b_.int,float])){if(other.valueOf()==0){throw _b_.ZeroDivisionError.$factory("division by zero")}
return float.$factory(self/other)}
return _b_.NotImplemented}
var $op_func=function(self,other){self=float_value(self)
other=float_value(other)
if(_b_.isinstance(other,_b_.int)){if(typeof other=="boolean"){return other ? self-1 :self}else if(other.__class__===$B.long_int){return float.$factory(self-parseInt(other.value))}else{return float.$factory(self-other)}}
if(_b_.isinstance(other,float)){return float.$factory(self-other)}
return _b_.NotImplemented}
$op_func+="" 
var $ops={"+":"add","-":"sub"}
for(var $op in $ops){var $opf=$op_func.replace(/-/gm,$op)
$opf=$opf.replace(/__rsub__/gm,"__r"+$ops[$op]+"__")
eval("float.__"+$ops[$op]+"__ = "+$opf)}
var $comp_func=function(self,other){self=float_value(self)
other=float_value(other)
if(_b_.isinstance(other,_b_.int)){if(other.__class__===$B.long_int){return self > parseInt(other.value)}
return self > other.valueOf()}
if(_b_.isinstance(other,float)){return self > other}
if(_b_.isinstance(other,_b_.bool)){return self.valueOf()> _b_.bool.__hash__(other)}
if(_b_.hasattr(other,"__int__")||_b_.hasattr(other,"__index__")){return _b_.int.__gt__(self,$B.$GetInt(other))}
var inv_op=$B.$getattr(other,"__le__",_b_.None)
if(inv_op !==_b_.None){return inv_op(self)}
throw _b_.TypeError.$factory(
"unorderable types: float() > "+$B.class_name(other)+"()")}
$comp_func+="" 
for(var $op in $B.$comps){eval("float.__"+$B.$comps[$op]+"__ = "+
$comp_func.replace(/>/gm,$op).
replace(/__gt__/gm,"__"+$B.$comps[$op]+"__").
replace(/__le__/,"__"+$B.$inv_comps[$op]+"__"))}
var r_opnames=["add","sub","mul","truediv","floordiv","mod","pow","lshift","rshift","and","xor","or","divmod"]
for(var r_opname of r_opnames){if(float["__r"+r_opname+"__"]===undefined &&
float['__'+r_opname+'__']){float["__r"+r_opname+"__"]=(function(name){return function(self,other){if(_b_.isinstance(other,_b_.int)){other=float_value(_b_.int.numerator(other))
return float["__"+name+"__"](other,self)}else if(_b_.isinstance(other,float)){other=float_value(other)
return float["__"+name+"__"](other,self)}
return _b_.NotImplemented}})(r_opname)}}
function $FloatClass(value){return new Number(value)}
function to_digits(s){
var arabic_digits="\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669",res=""
for(var i=0;i < s.length;i++){var x=arabic_digits.indexOf(s[i])
if(x >-1){res+=x}
else{res+=s[i]}}
return res}
float.$factory=function(value){switch(value){case undefined:
return $FloatClass(0.0)
case Number.MAX_VALUE:
return $FloatClass(Infinity)
case-Number.MAX_VALUE:
return $FloatClass(-Infinity)
case true:
return new Number(1)
case false:
return new Number(0)}
if(typeof value=="number"){return new Number(value)}
if(_b_.isinstance(value,float)){return float_value(value)}
if(_b_.isinstance(value,_b_.bytes)){var s=$B.$getattr(value,"decode")("latin-1")
return float.$factory($B.$getattr(value,"decode")("latin-1"))}
if(typeof value=="string"){value=value.trim()
switch(value.toLowerCase()){case "+inf":
case "inf":
case "+infinity":
case "infinity":
return Number.POSITIVE_INFINITY
case "-inf":
case "-infinity":
return Number.NEGATIVE_INFINITY
case "+nan":
case "nan":
return Number.NaN
case "-nan":
return-Number.NaN
case "":
throw _b_.ValueError.$factory("count not convert string to float")
default:
value=value.charAt(0)+value.substr(1).replace(/_/g,"")
value=to_digits(value)
if(isFinite(value))return $FloatClass(eval(value))
else{
_b_.str.encode(value,"latin-1")
throw _b_.ValueError.$factory(
"Could not convert to float(): '"+
_b_.str.$factory(value)+"'")}}}
var klass=value.__class__ ||$B.get_class(value),num_value=$B.to_num(value,["__float__","__index__"])
if(value !==Number.POSITIVE_INFINITY && ! isFinite(num_value)){throw _b_.OverflowError.$factory('int too large to convert to float')}
if(num_value !==null){return num_value}
throw _b_.TypeError.$factory("float() argument must be a string or a "+
"number, not '"+$B.class_name(value)+"'")}
$B.$FloatClass=$FloatClass
$B.set_func_names(float,"builtins")
var FloatSubclass=$B.FloatSubclass={__class__:_b_.type,__mro__:[object],$infos:{__module__:"builtins",__name__:"float"},$is_class:true}
for(var $attr in float){if(typeof float[$attr]=="function"){FloatSubclass[$attr]=(function(attr){return function(){var args=[],pos=0
if(arguments.length > 0){var args=[arguments[0].valueOf()],pos=1
for(var i=1,len=arguments.length;i < len;i++){args[pos++]=arguments[i]}}
return float[attr].apply(null,args)}})($attr)}}
$B.set_func_names(FloatSubclass,"builtins")
_b_.float=float})(__BRYTHON__)
;
;(function($B){var _b_=$B.builtins
function $UnsupportedOpType(op,class1,class2){throw _b_.TypeError.$factory("unsupported operand type(s) for "+
op+": '"+class1+"' and '"+class2+"'")}
var complex={__class__:_b_.type,__dir__:_b_.object.__dir__,$infos:{__module__:"builtins",__name__:"complex"},$is_class:true,$native:true,$descriptors:{real:true,imag:true}}
complex.__abs__=function(self){var _rf=isFinite(self.$real),_if=isFinite(self.$imag)
if((_rf && isNaN(self.$imag))||(_if && isNaN(self.$real))||
(isNaN(self.$imag)&& isNaN(self.$real))){return NaN}
if(! _rf ||! _if){return Infinity}
var mag=Math.sqrt(Math.pow(self.$real,2)+Math.pow(self.$imag,2))
if(!isFinite(mag)&& _rf && _if){
throw _b_.OverflowError.$factory("absolute value too large")}
return mag}
complex.__add__=function(self,other){if(_b_.isinstance(other,complex)){return make_complex(self.$real+other.$real,self.$imag+other.$imag)}
if(_b_.isinstance(other,_b_.int)){other=_b_.int.numerator(other)
return make_complex($B.add(self.$real,other.valueOf()),self.$imag)}
if(_b_.isinstance(other,_b_.float)){return make_complex(self.$real+other.valueOf(),self.$imag)}
return _b_.NotImplemented}
complex.__bool__=function(self){return(self.$real !=0 ||self.$imag !=0)}
complex.__complex__=function(self){return self}
complex.__eq__=function(self,other){if(_b_.isinstance(other,complex)){return self.$real.valueOf()==other.$real.valueOf()&&
self.$imag.valueOf()==other.$imag.valueOf()}
if(_b_.isinstance(other,_b_.int)){if(self.$imag !=0){return false}
return self.$real==other.valueOf()}
if(_b_.isinstance(other,_b_.float)){if(self.$imag !=0){return false}
return self.$real==other.valueOf()}
return _b_.NotImplemented}
complex.__hash__=function(self){
return self.$imag*1000003+self.$real}
complex.__init__=function(){return _b_.None}
complex.__invert__=function(self){return ~self}
complex.__mro__=[_b_.object]
complex.__mul__=function(self,other){if(_b_.isinstance(other,complex)){return make_complex(self.$real*other.$real-self.$imag*other.$imag,self.$imag*other.$real+self.$real*other.$imag)}else if(_b_.isinstance(other,_b_.int)){return make_complex(self.$real*other.valueOf(),self.$imag*other.valueOf())}else if(_b_.isinstance(other,_b_.float)){return make_complex(self.$real*other,self.$imag*other)}else if(_b_.isinstance(other,_b_.bool)){if(other.valueOf()){return self}
return make_complex(0,0)}
$UnsupportedOpType("*",complex,other)}
complex.__ne__=function(self,other){var res=complex.__eq__(self,other)
return res===_b_.NotImplemented ? res :! res}
complex.__neg__=function(self){return make_complex(-self.$real,-self.$imag)}
complex.__new__=function(cls){if(cls===undefined){throw _b_.TypeError.$factory('complex.__new__(): not enough arguments')}
var res,missing={},args=$B.args("complex",3,{cls:null,real:null,imag:null},["cls","real","imag"],arguments,{real:0,imag:missing},null,null),$real=args.real,$imag=args.imag
if(typeof $real=="string"){if($imag !==missing){throw _b_.TypeError.$factory("complex() can't take second arg "+
"if first is a string")}else{var arg=$real
$real=$real.trim()
if($real.startsWith("(")&& $real.endsWith(")")){$real=$real.substr(1)
$real=$real.substr(0,$real.length-1)}
var complex_re=/^\s*([\+\-]*[0-9_]*\.?[0-9_]*(e[\+\-]*[0-9_]*)?)([\+\-]?)([0-9_]*\.?[0-9_]*(e[\+\-]*[0-9_]*)?)(j?)\s*$/i
var parts=complex_re.exec($real)
function to_num(s){var res=parseFloat(s.charAt(0)+s.substr(1).replace(/_/g,""))
if(isNaN(res)){throw _b_.ValueError.$factory("could not convert string "+
"to complex: '"+arg+"'")}
return res}
if(parts===null){throw _b_.ValueError.$factory("complex() arg is a malformed string")}else if(parts[_real]=="." ||parts[_imag]=="." ||
parts[_real]==".e" ||parts[_imag]==".e" ||
parts[_real]=="e" ||parts[_imag]=="e"){throw _b_.ValueError.$factory("complex() arg is a malformed string")}else if(parts[_j]!=""){if(parts[_sign]==""){$real=0
if(parts[_real]=="+" ||parts[_real]==""){$imag=1}else if(parts[_real]=='-'){$imag=-1}else{$imag=to_num(parts[_real])}}else{$real=to_num(parts[_real])
$imag=parts[_imag]=="" ? 1 :to_num(parts[_imag])
$imag=parts[_sign]=="-" ?-$imag :$imag}}else{$real=to_num(parts[_real])
$imag=0}
res={__class__:complex,$real:$real ||0,$imag:$imag ||0}
return res}}
$imag=$imag===missing ? 0 :$imag
if(arguments.length==2 && $real.__class__===complex && $imag==0){return $real}
if(_b_.isinstance($real,[_b_.float,_b_.int])&&
_b_.isinstance($imag,[_b_.float,_b_.int])){res={__class__:complex,$real:$real,$imag:$imag}
return res}
var real_to_num=$B.to_num($real,["__complex__","__float__","__index__"])
if(real_to_num===null){throw _b_.TypeError.$factory("complex() first argument must be a "+
" string or a number, not '"+$B.class_name($real)+"'")}
$real=real_to_num
$imag=_convert($imag)
if(! _b_.isinstance($real,_b_.float)&& ! _b_.isinstance($real,_b_.int)&&
! _b_.isinstance($real,_b_.complex)){throw _b_.TypeError.$factory("complex() argument must be a string "+
"or a number")}
if(typeof $imag=="string"){throw _b_.TypeError.$factory("complex() second arg can't be a string")}
if(! _b_.isinstance($imag,_b_.float)&& ! _b_.isinstance($imag,_b_.int)&&
! _b_.isinstance($imag,_b_.complex)&& $imag !==missing){throw _b_.TypeError.$factory("complex() argument must be a string "+
"or a number")}
$imag=complex.__mul__(complex.$factory("1j"),$imag)
return complex.__add__($imag,$real)}
complex.__pos__=function(self){return self}
function complex2expo(cx){var norm=Math.sqrt((cx.$real*cx.$real)+(cx.$imag*cx.$imag)),sin=cx.$imag/norm,cos=cx.$real/norm,angle
if(cos==0){angle=sin==1 ? Math.PI/2 :3*Math.PI/2}
else if(sin==0){angle=cos==1 ? 0 :Math.PI}
else{angle=Math.atan(sin/cos)}
return{norm:norm,angle:angle}}
function hypot(){var $=$B.args("hypot",0,{},[],arguments,{},"args",null)
return _b_.float.$factory(Math.hypot(...$.args))}
function c_powi(x,n){if(n > 0){return c_powu(x,n)}else{return c_quot(c_1,c_powu(x,-n))}}
function c_powu(x,n){var r,p,mask=1,r=c_1,p=x
while(mask > 0 && n >=mask){if(n & mask){r=c_prod(r,p);}
mask <<=1;
p=c_prod(p,p)}
return r;}
function c_prod(a,b){return make_complex(
a.$real*b.$real-a.$imag*b.$imag,a.$real*b.$imag+a.$imag*b.$real)}
function c_quot(a,b){var r,
abs_breal=_b_.abs(b.$real),abs_bimag=_b_.abs(b.$imag)
if($B.rich_comp('__ge__',abs_breal,abs_bimag)){
if(abs_breal==0.0){throw _b_.ZeroDivisionError.$factory()}else{var ratio=b.$imag/b.$real,denom=b.$real+b.$imag*ratio
return make_complex((a.$real+a.$imag*ratio)/denom,(a.$imag-a.$real*ratio)/denom)}}else if(abs_bimag >=abs_breal){
var ratio=b.$real/b.$imag,denom=b.$real*ratio+b.$imag;
if(b.$imag==0.0){throw _b_.ZeroDivisionError.$factory()}
return make_complex(
(a.real*ratio+a.imag)/denom,(a.imag*ratio-a.real)/denom)}else{
return _b_.float('nan')}}
complex.__pow__=function(self,other){
if(other==1){return self}
if((_b_.isinstance(other,_b_.int)&& _b_.abs(other)< 100)||
(other.$imag==0.0 && other.$real==_b_.floor(other.$real)&&
_b_.abs(other.$real)<=100.0)){return c_powi(self,other)}
var exp=complex2expo(self),angle=exp.angle,res=Math.pow(exp.norm,other)
if(_b_.isinstance(other,[_b_.int,_b_.float])){return make_complex(res*Math.cos(angle*other),res*Math.sin(angle*other))}else if(_b_.isinstance(other,complex)){
var x=other.$real,y=other.$imag
var pw=Math.pow(exp.norm,x)*Math.pow(Math.E,-y*angle),theta=y*Math.log(exp.norm)-x*angle
return make_complex(pw*Math.cos(theta),pw*Math.sin(theta))}else{throw _b_.TypeError.$factory("unsupported operand type(s) "+
"for ** or pow(): 'complex' and '"+
$B.class_name(other)+"'")}}
complex.__radd__=function(self,other){if(_b_.isinstance(other,_b_.bool)){other=other ? 1 :0}
if(_b_.isinstance(other,[_b_.int,_b_.float])){return make_complex(other+self.$real,self.$imag)}
return _b_.NotImplemented}
complex.__repr__=function(self){$B.builtins_repr_check(complex,arguments)
var real=_b_.str.$factory(self.$real),imag=_b_.str.$factory(self.$imag)
if(imag.endsWith('.0')){imag=imag.substr(0,imag.length-2)}
if(self.$imag instanceof Number && self.$imag==parseInt(self.$imag)){if(self.$imag==0 && 1/self.$imag===-Infinity){imag="-0"}}
if(self.$real==0){if(1/self.$real < 0){if(imag.startsWith('-')){return "-0"+imag+"j"}
return "-0+"+imag+"j"}else{return imag+"j"}}
if(self.$imag > 0 ||isNaN(self.$imag)){return "("+real+"+"+imag+"j)"}
if(self.$imag==0){if(1/self.$imag < 0){return "("+real+"-0j)"}
return "("+real+"+0j)"}
return "("+real+"-"+_b_.str.$factory(-self.$imag)+"j)"}
complex.__rmul__=function(self,other){if(_b_.isinstance(other,_b_.bool)){other=other ? 1 :0}
if(_b_.isinstance(other,[_b_.int,_b_.float])){return make_complex(other*self.$real,other*self.$imag)}
return _b_.NotImplemented}
complex.__sqrt__=function(self){if(self.$imag==0){return complex(Math.sqrt(self.$real))}
var r=self.$real,i=self.$imag,_a=Math.sqrt((r+sqrt)/2),_b=Number.sign(i)*Math.sqrt((-r+sqrt)/2)
return make_complex(_a,_b)}
complex.__sub__=function(self,other){if(_b_.isinstance(other,complex)){return make_complex(self.$real-other.$real,self.$imag-other.$imag)}
if(_b_.isinstance(other,_b_.int)){other=_b_.int.numerator(other)
return make_complex($B.sub(self.$real,other.valueOf()),self.$imag)}
if(_b_.isinstance(other,_b_.float)){return make_complex(self.$real-other.valueOf(),self.$imag)}
return _b_.NotImplemented}
complex.__truediv__=function(self,other){if(_b_.isinstance(other,complex)){if(other.$real==0 && other.$imag==0){throw _b_.ZeroDivisionError.$factory("division by zero")}
var _num=self.$real*other.$real+self.$imag*other.$imag,_div=other.$real*other.$real+other.$imag*other.$imag
var _num2=self.$imag*other.$real-self.$real*other.$imag
return make_complex(_num/_div,_num2/_div)}
if(_b_.isinstance(other,_b_.int)){if(! other.valueOf()){throw _b_.ZeroDivisionError.$factory('division by zero')}
return complex.__truediv__(self,complex.$factory(other.valueOf()))}
if(_b_.isinstance(other,_b_.float)){if(! other.valueOf()){throw _b_.ZeroDivisionError.$factory("division by zero")}
return complex.__truediv__(self,complex.$factory(other.valueOf()))}
$UnsupportedOpType("//","complex",other.__class__)}
complex.conjugate=function(self){return make_complex(self.$real,-self.$imag)}
complex.__ior__=complex.__or__
var r_opnames=["add","sub","mul","truediv","floordiv","mod","pow","lshift","rshift","and","xor","or"]
for(var r_opname of r_opnames){if(complex["__r"+r_opname+"__"]===undefined &&
complex['__'+r_opname+'__']){complex["__r"+r_opname+"__"]=(function(name){return function(self,other){if(_b_.isinstance(other,[_b_.int,_b_.float])){other=make_complex(other,0)
return complex["__"+name+"__"](other,self)}else if(_b_.isinstance(other,complex)){return complex["__"+name+"__"](other,self)}
return _b_.NotImplemented}})(r_opname)}}
var $comp_func=function(self,other){if(other===undefined ||other==_b_.None){return _b_.NotImplemented}
throw _b_.TypeError.$factory("no ordering relation "+
"is defined for complex numbers")}
$comp_func+='' 
for(var $op in $B.$comps){eval("complex.__"+$B.$comps[$op]+"__ = "+
$comp_func.replace(/>/gm,$op))}
complex.real=function(self){return new Number(self.$real)}
complex.real.setter=function(){throw _b_.AttributeError.$factory("readonly attribute")}
complex.imag=function(self){return new Number(self.$imag)}
complex.imag.setter=function(){throw _b_.AttributeError.$factory("readonly attribute")}
var _real=1,_real_mantissa=2,_sign=3,_imag=4,_imag_mantissa=5,_j=6
var type_conversions=["__complex__","__float__","__index__"]
var _convert=function(num){var klass=num.__class__ ||$B.get_class(num)
for(var i=0;i < type_conversions.length;i++){var missing={},method=$B.$getattr(klass,type_conversions[i],missing)
if(method !==missing){return method(num)}}
return null}
var make_complex=$B.make_complex=function(real,imag){return{
__class__:complex,$real:real,$imag:imag}}
var c_1=make_complex(1,0)
complex.$factory=function(){return complex.__new__(complex,...arguments)}
$B.set_func_names(complex,"builtins")
_b_.complex=complex})(__BRYTHON__)
;
;(function($B){
var _b_=$B.builtins
var str_hash=_b_.str.__hash__,$N=_b_.None
var set_ops=["eq","le","lt","ge","gt","sub","rsub","and","or","xor"]
function is_sublist(t1,t2){
for(var i=0,ilen=t1.length;i < ilen;i++){var x=t1[i],flag=false
for(var j=0,jlen=t2.length;j < jlen;j++){if($B.rich_comp("__eq__",x,t2[j])){t2.splice(j,1)
flag=true
break}}
if(! flag){return false}}
return true}
dict_view_op={__eq__:function(t1,t2){return t1.length==t2.length && is_sublist(t1,t2)},__ne__:function(t1,t2){return ! dict_view_op.__eq__(t1,t2)},__lt__:function(t1,t2){return t1.length < t2.length && is_sublist(t1,t2)},__gt__:function(t1,t2){return dict_view_op.__lt__(t2,t1)},__le__:function(t1,t2){return t1.length <=t2.length && is_sublist(t1,t2)},__ge__:function(t1,t2){return dict_view_op.__le__(t2,t1)},__and__:function(t1,t2){var items=[]
for(var i=0,ilen=t1.length;i < ilen;i++){var x=t1[i]
flag=false
for(var j=0,jlen=t2.length;j < jlen;j++){if($B.rich_comp("__eq__",x,t2[j])){t2.splice(j,1)
items.push(x)
break}}}
return items},__or__:function(t1,t2){var items=t1
for(var j=0,jlen=t2.length;j < jlen;j++){var y=t2[j],flag=false
for(var i=0,ilen=t1.length;i < ilen;i++){if($B.rich_comp("__eq__",y,t1[i])){t2.splice(j,1)
flag=true
break}}
if(! flag){items.push(y)}}
return items}}
$B.make_view=function(name){var klass=$B.make_class(name,function(d,items,set_like){return{
__class__:klass,__dict__:$B.empty_dict(),counter:-1,dict:d,items:items,len:items.length,set_like:set_like}})
for(var i=0,len=set_ops.length;i < len;i++){var op="__"+set_ops[i]+"__"
klass[op]=(function(op){return function(self,other){
if(self.set_like){return _b_.set[op](_b_.set.$factory(self),_b_.set.$factory(other))}else{
if(other.__class__ !==klass){return false}
var other_items=_b_.list.$factory(other)
return dict_view_op[op](self.items,other_items)}}})(op)}
klass.__iter__=function(self){var it=klass.$iterator.$factory(self.items)
it.test_change=function(){return self.dict.$version !=self.dict_version}
return it}
klass.__len__=function(self){return self.len}
klass.__repr__=function(self){return klass.$infos.__name__+'('+_b_.repr(self.items)+')'}
$B.set_func_names(klass,"builtins")
return klass}
var dict={__class__:_b_.type,__mro__:[_b_.object],$infos:{__module__:"builtins",__name__:"dict"},$is_class:true,$native:true,$match_mapping_pattern:true }
dict.$to_obj=function(d){
var res={}
for(var key in d.$string_dict){res[key]=d.$string_dict[key][0]}
return res}
function to_list(d,ix){var items=[],item
if(d.$jsobj){items=[]
for(var attr in d.$jsobj){if((! attr.startsWith("$"))&&
((! d.$exclude)||! d.$exclude(attr))){var val=d.$jsobj[attr]
if(val===undefined){val=_b_.NotImplemented}
else if(val===null){val=$N}
items.push([attr,val])}}}else if(_b_.isinstance(d,_b_.dict)){for(var k in d.$numeric_dict){items.push([parseFloat(k),d.$numeric_dict[k]])}
for(var k in d.$string_dict){items.push([k,d.$string_dict[k]])}
for(var k in d.$object_dict){d.$object_dict[k].forEach(function(item){items.push(item)})}
items.sort(function(a,b){return a[1][1]-b[1][1]})
items=items.map(function(item){return[item[0],item[1][0]]})}
if(ix !==undefined){res=items.map(function(item){return item[ix]})
return res}else{items.__class__=_b_.tuple
return items.map(function(item){item.__class__=_b_.tuple;return item}
)}}
$B.dict_to_list=to_list 
var $copy_dict=function(left,right){var _l=to_list(right),si=dict.$setitem
right.$version=right.$version ||0
var right_version=right.$version ||0
for(var i=0,len=_l.length;i < len;i++){si(left,_l[i][0],_l[i][1])
if(right.$version !=right_version){throw _b_.RuntimeError.$factory("dict mutated during update")}}}
function rank(self,hash,key){
var pairs=self.$object_dict[hash]
if(pairs !==undefined){for(var i=0,len=pairs.length;i < len;i++){if($B.rich_comp("__eq__",key,pairs[i][0])){return i}}}
return-1}
dict.__bool__=function(){var $=$B.args("__bool__",1,{self:null},["self"],arguments,{},null,null)
return dict.__len__($.self)> 0}
dict.__class_getitem__=function(cls,item){
if(! Array.isArray(item)){item=[item]}
return $B.GenericAlias.$factory(cls,item)}
dict.__contains__=function(){var $=$B.args("__contains__",2,{self:null,key:null},["self","key"],arguments,{},null,null),self=$.self,key=$.key
if(self.$jsobj){return self.$jsobj[key]!==undefined}
switch(typeof key){case "string":
return self.$string_dict.hasOwnProperty(key)
case "number":
return self.$numeric_dict[key]!==undefined}
var hash=_b_.hash(key)
if(self.$str_hash[hash]!==undefined &&
$B.rich_comp("__eq__",key,self.$str_hash[hash])){return true}
if(self.$numeric_dict[hash]!==undefined &&
$B.rich_comp("__eq__",key,hash)){return true}
return rank(self,hash,key)>-1}
dict.__delitem__=function(){var $=$B.args("__eq__",2,{self:null,arg:null},["self","arg"],arguments,{},null,null),self=$.self,arg=$.arg
if(self.$jsobj){if(self.$jsobj[arg]===undefined){throw _b_.KeyError.$factory(arg)}
delete self.$jsobj[arg]
return $N}
switch(typeof arg){case "string":
if(self.$string_dict[arg]===undefined){throw _b_.KeyError.$factory(_b_.str.$factory(arg))}
delete self.$string_dict[arg]
delete self.$str_hash[str_hash(arg)]
self.$version++
return $N
case "number":
if(self.$numeric_dict[arg]===undefined){throw _b_.KeyError.$factory(_b_.str.$factory(arg))}
delete self.$numeric_dict[arg]
self.$version++
return $N}
var hash=_b_.hash(arg),ix
if((ix=rank(self,hash,arg))>-1){self.$object_dict[hash].splice(ix,1)}else{throw _b_.KeyError.$factory(_b_.str.$factory(arg))}
self.$version++
return $N}
dict.__eq__=function(){var $=$B.args("__eq__",2,{self:null,other:null},["self","other"],arguments,{},null,null),self=$.self,other=$.other
if(! _b_.isinstance(other,dict)){return false}
if(self.$jsobj){self=jsobj2dict(self.$jsobj)}
if(other.$jsobj){other=jsobj2dict(other.$jsobj)}
if(dict.__len__(self)!=dict.__len__(other)){return false}
if(self.$string_dict.length !=other.$string_dict.length){return false}
for(var k in self.$numeric_dict){if(other.$numeric_dict.hasOwnProperty(k)){if(!$B.rich_comp("__eq__",other.$numeric_dict[k][0],self.$numeric_dict[k][0])){return false}}else if(other.$object_dict.hasOwnProperty(k)){var pairs=other.$object_dict[k],flag=false
for(var i=0,len=pairs.length;i < len;i++){if($B.rich_comp("__eq__",k,pairs[i][0])&&
$B.rich_comp("__eq__",self.$numeric_dict[k],pairs[i][1])){flag=true
break}}
if(! flag){return false}}else{return false}}
for(var k in self.$string_dict){if(!other.$string_dict.hasOwnProperty(k)||
!$B.rich_comp("__eq__",other.$string_dict[k][0],self.$string_dict[k][0])){return false}}
for(var hash in self.$object_dict){var pairs=self.$object_dict[hash]
var other_pairs=[]
if(other.$numeric_dict[hash]!==undefined){other_pairs.push([hash,other.$numeric_dict[hash]])}
if(other.$object_dict[hash]!==undefined){other_pairs=other_pairs.concat(other.$object_dict[hash])}
if(other_pairs.length==0){return false}
for(var i=0,len_i=pairs.length;i < len_i;i++){var flag=false
var key=pairs[i][0],value=pairs[i][1][0]
for(var j=0,len_j=other_pairs.length;j < len_j;j++){if($B.rich_comp("__eq__",key,other_pairs[j][0])&&
$B.rich_comp("__eq__",value,other_pairs[j][1][0])){flag=true
break}}
if(! flag){return false}}}
return true}
dict.__getitem__=function(){var $=$B.args("__getitem__",2,{self:null,arg:null},["self","arg"],arguments,{},null,null),self=$.self,arg=$.arg
return dict.$getitem(self,arg)}
dict.$getitem=function(self,arg,ignore_missing){
if(self.$jsobj){if(self.$exclude && self.$exclude(arg)){throw _b_.KeyError.$factory(arg)}
if(self.$jsobj[arg]===undefined){if(self.$jsobj.hasOwnProperty &&
self.$jsobj.hasOwnProperty(arg)){return $B.Undefined}
throw _b_.KeyError.$factory(arg)}
return self.$jsobj[arg]}
switch(typeof arg){case "string":
if(self.$string_dict.hasOwnProperty(arg)){return self.$string_dict[arg][0]}
break
case "number":
if(self.$numeric_dict[arg]!==undefined){return self.$numeric_dict[arg][0]}
break}
var hash=_b_.hash(arg),_eq=function(other){return $B.rich_comp("__eq__",arg,other)}
if(typeof arg=="object"){arg.$hash=hash }
var sk=self.$str_hash[hash]
if(sk !==undefined && _eq(sk)){return self.$string_dict[sk][0]}
if(self.$numeric_dict[hash]!==undefined && _eq(hash)){return self.$numeric_dict[hash][0]}
if(_b_.isinstance(arg,_b_.str)){
if(self.$string_dict.hasOwnProperty(arg.valueOf())){return self.$string_dict[arg.valueOf()][0]}}
var ix=rank(self,hash,arg)
if(ix >-1){return self.$object_dict[hash][ix][1][0]}
if(! ignore_missing){if(self.__class__ !==dict && ! ignore_missing){try{var missing_method=$B.$getattr(self.__class__,"__missing__",_b_.None)}catch(err){console.log(err)}
if(missing_method !==_b_.None){return missing_method(self,arg)}}}
throw _b_.KeyError.$factory(arg)}
dict.__hash__=_b_.None
function init_from_list(self,args){var i=-1,stop=args.length-1,si=dict.__setitem__
while(i++< stop){var item=args[i]
if(item.length !=2){throw _b_.ValueError.$factory("dictionary "+
`update sequence element #${i} has length 1; 2 is required`)}
switch(typeof item[0]){case 'string':
self.$string_dict[item[0]]=[item[1],self.$order++]
self.$str_hash[str_hash(item[0])]=item[0]
self.$version++
break
case 'number':
if(item[0]!=0 && item[0]!=1){self.$numeric_dict[item[0]]=[item[1],self.$order++]
self.$version++
break}
default:
si(self,item[0],item[1])
break}}}
dict.__init__=function(self,first,second){if(first===undefined){return $N}
if(second===undefined){if(first.$nat !='kw' && $B.get_class(first)===$B.JSObj){for(var key in first){self.$string_dict[key]=[first[key],self.$order++]}
return _b_.None}else if(first.$jsobj){self.$jsobj={}
for(var attr in first.$jsobj){self.$jsobj[attr]=first.$jsobj[attr]}
return $N}else if(Array.isArray(first)){init_from_list(self,first)
return $N}}
var $=$B.args("dict",1,{self:null},["self"],arguments,{},"first","second")
var args=$.first
if(args.length > 1){throw _b_.TypeError.$factory("dict expected at most 1 argument"+
", got 2")}else if(args.length==1){args=args[0]
if(args.__class__===dict){['$string_dict','$str_hash','$numeric_dict','$object_dict'].
forEach(function(d){for(key in args[d]){self[d][key]=args[d][key]}})}else if(_b_.isinstance(args,dict)){$copy_dict(self,args)}else{var keys=$B.$getattr(args,"keys",null)
if(keys !==null){var gi=$B.$getattr(args,"__getitem__",null)
if(gi !==null){
gi=$B.$call(gi)
var kiter=_b_.iter($B.$call(keys)())
while(true){try{var key=_b_.next(kiter),value=gi(key)
dict.__setitem__(self,key,value)}catch(err){if(err.__class__===_b_.StopIteration){break}
throw err}}
return $N}}
if(! Array.isArray(args)){args=_b_.list.$factory(args)}
init_from_list(self,args)}}
var kw=$.second.$string_dict
for(var attr in kw){switch(typeof attr){case "string":
self.$string_dict[attr]=[kw[attr][0],self.$order++]
self.$str_hash[str_hash(attr)]=attr
break
case "number":
self.$numeric_dict[attr]=[kw[attr][0],self.$order++]
break
default:
si(self,attr,kw[attr][0])
break}}
return $N}
dict.__iter__=function(self){return _b_.iter(dict.keys(self))}
dict.__ior__=function(self,other){
dict.update(self,other)
return self}
dict.__len__=function(self){var _count=0
if(self.$jsobj){for(var attr in self.$jsobj){if(attr.charAt(0)!="$" &&
((! self.$exclude)||! self.$exclude(attr))){_count++}}
return _count}
for(var k in self.$numeric_dict){_count++}
for(var k in self.$string_dict){_count++}
for(var hash in self.$object_dict){_count+=self.$object_dict[hash].length}
return _count}
dict.__ne__=function(self,other){return ! dict.__eq__(self,other)}
dict.__new__=function(cls){if(cls===undefined){throw _b_.TypeError.$factory("int.__new__(): not enough arguments")}
var instance={__class__:cls,$numeric_dict :{},$object_dict :{},$string_dict :{},$str_hash:{},$version:0,$order:0}
if(cls !==dict){instance.__dict__=$B.empty_dict()}
return instance}
dict.__or__=function(self,other){
if(! _b_.isinstance(other,dict)){return _b_.NotImplemented}
var res=dict.copy(self)
dict.update(res,other)
return res}
function __newobj__(){
var $=$B.args('__newobj__',0,{},[],arguments,{},'args',null),args=$.args
var res=$B.empty_dict()
res.__class__=args[0]
return res}
dict.__reduce_ex__=function(self,protocol){return $B.fast_tuple([__newobj__,$B.fast_tuple([self.__class__]),_b_.None,_b_.None,dict.items(self)])}
dict.__repr__=function(self){$B.builtins_repr_check(dict,arguments)
if(self.$jsobj){
return dict.__repr__(jsobj2dict(self.$jsobj,self.$exclude))}
if($B.repr.enter(self)){return "{...}"}
var res=[],items=to_list(self)
items.forEach(function(item){try{res.push(_b_.repr(item[0])+": "+_b_.repr(item[1]))}catch(err){throw err}})
$B.repr.leave(self)
return "{"+res.join(", ")+"}"}
dict.__ror__=function(self,other){
if(! _b_.isinstance(other,dict)){return _b_.NotImplemented}
var res=dict.copy(other)
dict.update(res,self)
return res}
dict.__setitem__=function(self,key,value){var $=$B.args("__setitem__",3,{self:null,key:null,value:null},["self","key","value"],arguments,{},null,null)
return dict.$setitem($.self,$.key,$.value)}
dict.$setitem=function(self,key,value,$hash){
if(self.$jsobj){if(self.$from_js){
value=$B.pyobj2jsobj(value)}
if(self.$jsobj.__class__===_b_.type){self.$jsobj[key]=value
if(key=="__init__" ||key=="__new__"){
self.$jsobj.$factory=$B.$instance_creator(self.$jsobj)}}else{self.$jsobj[key]=value}
return $N}
if(key instanceof String){key=key.valueOf()}
switch(typeof key){case "string":
if(self.$string_dict===undefined){console.log("pas de string dict",self,key,value)}
if(self.$string_dict.hasOwnProperty(key)){self.$string_dict[key][0]=value}else{self.$string_dict[key]=[value,self.$order++]
self.$str_hash[str_hash(key)]=key
self.$version++}
return $N
case "number":
if(self.$numeric_dict[key]!==undefined){
self.$numeric_dict[key][0]=value}else{
var done=false
if((key==0 ||key==1)&&
self.$object_dict[key]!==undefined){for(const item of self.$object_dict[key]){if((key==0 && item[0]===false)||
(key==1 && item[0]===true)){
item[1][0]=value
done=true}}}
if(! done){
self.$numeric_dict[key]=[value,self.$order++]}
self.$version++}
return $N
case "boolean":
var num=key ? 1 :0
if(self.$numeric_dict[num]!==undefined){var order=self.$numeric_dict[num][1]
self.$numeric_dict[num]=[value,order]
return}
if(self.$object_dict[num]!==undefined){self.$object_dict[num].push([key,[value,self.$order++]])}else{self.$object_dict[num]=[[key,[value,self.$order++]]]}}
var hash=$hash===undefined ? _b_.hash(key):$hash,_eq=function(other){return $B.rich_comp("__eq__",key,other)}
if(self.$numeric_dict[hash]!==undefined && _eq(hash)){self.$numeric_dict[hash]=[value,self.$numeric_dict[hash][1]]
self.$version++
return $N}
var sk=self.$str_hash[hash]
if(sk !==undefined && _eq(sk)){self.$string_dict[sk]=[value,self.$string_dict[sk][1]]
self.$version++
return $N}
if($hash){if(self.$object_dict[$hash]!==undefined){self.$object_dict[$hash].push([key,[value,self.$order++]])}else{self.$object_dict[$hash]=[[key,[value,self.$order++]]]}
self.$version++
return $N}
var ix=rank(self,hash,key)
if(ix >-1){
self.$object_dict[hash][ix][1]=[value,self.$object_dict[hash][ix][1][1]]
return $N}else if(self.$object_dict.hasOwnProperty(hash)){self.$object_dict[hash].push([key,[value,self.$order++]])}else{self.$object_dict[hash]=[[key,[value,self.$order++]]]}
self.$version++
return $N}
$B.make_rmethods(dict)
dict.clear=function(){
var $=$B.args("clear",1,{self:null},["self"],arguments,{},null,null),self=$.self
self.$numeric_dict={}
self.$string_dict={}
self.$str_hash={}
self.$object_dict={}
if(self.$jsobj){for(var attr in self.$jsobj){if(attr.charAt(0)!=="$" && attr !=="__class__"){delete self.$jsobj[attr]}}}
self.$version++
self.$order=0
return $N}
dict.copy=function(self){
var $=$B.args("copy",1,{self:null},["self"],arguments,{},null,null),self=$.self,res=$B.empty_dict()
$copy_dict(res,self)
return res}
dict.fromkeys=function(){var $=$B.args("fromkeys",3,{cls:null,keys:null,value:null},["cls","keys","value"],arguments,{value:_b_.None},null,null),keys=$.keys,value=$.value
var klass=$.cls,res=$B.$call(klass)(),keys_iter=$B.$iter(keys)
while(1){try{var key=_b_.next(keys_iter)
if(klass===dict){dict.$setitem(res,key,value)}
else{$B.$getattr(res,"__setitem__")(key,value)}}catch(err){if($B.is_exc(err,[_b_.StopIteration])){return res}
throw err}}}
dict.get=function(){var $=$B.args("get",3,{self:null,key:null,_default:null},["self","key","_default"],arguments,{_default:$N},null,null)
try{
return dict.$getitem($.self,$.key,true)}catch(err){if(_b_.isinstance(err,_b_.KeyError)){return $._default}
else{throw err}}}
var dict_items=$B.make_view("dict_items",true)
dict_items.$iterator=$B.make_iterator_class("dict_itemiterator")
dict.items=function(self){var $=$B.args('items',1,{self:null},['self'],arguments,{},null,null)
var items=to_list(self),set_like=true
for(var i=0,len=items.length;i < len;i++){try{_b_.hash(items[i][1])}catch(err){set_like=false
break}}
var values=to_list(self)
var it=dict_items.$factory(self,values,set_like)
it.dict_version=self.$version
return it}
var dict_keys=$B.make_view("dict_keys")
dict_keys.$iterator=$B.make_iterator_class("dict_keyiterator")
dict.keys=function(self){var $=$B.args('keys',1,{self:null},['self'],arguments,{},null,null)
var it=dict_keys.$factory(self,to_list(self,0),true)
it.dict_version=self.$version
return it}
dict.pop=function(){var missing={},$=$B.args("pop",3,{self:null,key:null,_default:null},["self","key","_default"],arguments,{_default:missing},null,null),self=$.self,key=$.key,_default=$._default
try{var res=dict.__getitem__(self,key)
dict.__delitem__(self,key)
return res}catch(err){if(err.__class__===_b_.KeyError){if(_default !==missing){return _default}
throw err}
throw err}}
dict.popitem=function(self){try{var itm=_b_.next(_b_.iter(dict.items(self)))
dict.__delitem__(self,itm[0])
return _b_.tuple.$factory(itm)}catch(err){if(err.__class__==_b_.StopIteration){throw _b_.KeyError.$factory("'popitem(): dictionary is empty'")}}}
dict.setdefault=function(){var $=$B.args("setdefault",3,{self:null,key:null,_default:null},["self","key","_default"],arguments,{_default:$N},null,null),self=$.self,key=$.key,_default=$._default
try{
return dict.$getitem(self,key,true)}catch(err){if(err.__class__ !==_b_.KeyError){throw err}
if(_default===undefined){_default=$N}
var hash=key.$hash
key.$hash=undefined
dict.$setitem(self,key,_default,hash)
return _default}}
dict.update=function(self){var $=$B.args("update",1,{"self":null},["self"],arguments,{},"args","kw"),self=$.self,args=$.args,kw=$.kw
if(args.length > 0){var o=args[0]
if(_b_.isinstance(o,dict)){if(o.$jsobj){o=jsobj2dict(o.$jsobj)}
$copy_dict(self,o)}else if(_b_.hasattr(o,"keys")){var _keys=_b_.list.$factory($B.$call($B.$getattr(o,"keys"))())
for(var i=0,len=_keys.length;i < len;i++){var _value=$B.$getattr(o,"__getitem__")(_keys[i])
dict.$setitem(self,_keys[i],_value)}}else{var it=_b_.iter(o),i=0
while(true){try{var item=_b_.next(it)}catch(err){if(err.__class__===_b_.StopIteration){break}
throw err}
try{key_value=_b_.list.$factory(item)}catch(err){throw _b_.TypeError.$factory("cannot convert dictionary"+
" update sequence element #"+i+" to a sequence")}
if(key_value.length !==2){throw _b_.ValueError.$factory("dictionary update "+
"sequence element #"+i+" has length "+
key_value.length+"; 2 is required")}
dict.$setitem(self,key_value[0],key_value[1])
i++}}}
$copy_dict(self,kw)
self.$version++
return $N}
var dict_values=$B.make_view("dict_values")
dict_values.$iterator=$B.make_iterator_class("dict_valueiterator")
dict.values=function(self){var $=$B.args('values',1,{self:null},['self'],arguments,{},null,null)
var values=to_list(self,1)
var it=dict_values.$factory(self,values,false)
it.dict_version=self.$version
return it}
dict.$factory=function(){var res=dict.__new__(dict)
var args=[res]
for(var i=0,len=arguments.length;i < len ;i++){args.push(arguments[i])}
dict.__init__.apply(null,args)
return res}
_b_.dict=dict
$B.set_func_names(dict,"builtins")
dict.__class_getitem__=_b_.classmethod.$factory(dict.__class_getitem__)
$B.empty_dict=function(){return{
__class__:dict,$numeric_dict :{},$object_dict :{},$string_dict :{},$str_hash:{},$version:0,$order:0}}
dict.fromkeys=_b_.classmethod.$factory(dict.fromkeys)
$B.getset_descriptor=$B.make_class("getset_descriptor",function(klass,attr){return{
__class__:$B.getset_descriptor,__doc__:_b_.None,cls:klass,attr:attr}}
)
$B.getset_descriptor.__repr__=$B.getset_descriptor.__str__=function(self){return `<attribute '${self.attr}' of '${self.cls.$infos.__name__}' objects>`}
$B.set_func_names($B.getset_descriptor,"builtins")
var mappingproxy=$B.mappingproxy=$B.make_class("mappingproxy",function(obj){if(_b_.isinstance(obj,dict)){
var res=$B.obj_dict(dict.$to_obj(obj))}else{var res=$B.obj_dict(obj)}
res.__class__=mappingproxy
return res}
)
mappingproxy.$match_mapping_pattern=true 
mappingproxy.__repr__=function(){return '<mappingproxy object>'}
mappingproxy.__setitem__=function(){throw _b_.TypeError.$factory("'mappingproxy' object does not support "+
"item assignment")}
for(var attr in dict){if(mappingproxy[attr]!==undefined ||
["__class__","__mro__","__new__","__init__","__delitem__","clear","fromkeys","pop","popitem","setdefault","update"].indexOf(attr)>-1){continue}
if(typeof dict[attr]=="function"){mappingproxy[attr]=(function(key){return function(){return dict[key].apply(null,arguments)}})(attr)}else{mappingproxy[attr]=dict[attr]}}
$B.set_func_names(mappingproxy,"builtins")
function jsobj2dict(x,exclude){exclude=exclude ||function(){return false}
var d=$B.empty_dict()
for(var attr in x){if(attr.charAt(0)!="$" && ! exclude(attr)){if(x[attr]===null){d.$string_dict[attr]=[_b_.None,d.$order++]}else if(x[attr]===undefined){continue}else if(x[attr].$jsobj===x){d.$string_dict[attr]=[d,d.$order++]}else{d.$string_dict[attr]=[$B.$JS2Py(x[attr]),d.$order++]}}}
return d}
$B.obj_dict=function(obj,exclude){var klass=obj.__class__ ||$B.get_class(obj)
if(klass !==undefined && klass.$native){throw $B.attr_error("__dict__",obj)}
var res=$B.empty_dict()
res.$jsobj=obj
res.$exclude=exclude ||function(){return false}
return res}
var jsobj_as_pydict=$B.jsobj_as_pydict=$B.make_class('jsobj_as_pydict',function(jsobj,exclude){return{
__class__:jsobj_as_pydict,obj:jsobj,exclude:exclude ? exclude :function(){return false},new_keys:[]}}
)
jsobj_as_pydict.__contains__=function(self,key){if(self.new_keys.indexOf(key)>-1){return true}
return !(self.exclude(key)||self.obj[key]===undefined)}
jsobj_as_pydict.__delitem__=function(self,key){jsobj_as_pydict.__getitem__(self,key)
delete self.obj[key]
var ix=self.new_keys.indexOf(key)
if(ix >-1){self.new_keys.splice(ix,1)}}
jsobj_as_pydict.__eq__=function(self,other){if(other.__class__ !==jsobj_as_pydict){return _b_.NotImplemented}
var self1=$B.empty_dict()
other1=$B.empty_dict()
dict.__init__(self1,jsobj_as_pydict.items(self))
dict.__init__(other1,jsobj_as_pydict.items(other))
return dict.__eq__(self1,other1)}
jsobj_as_pydict.__getitem__=function(self,key){if(jsobj_as_pydict.__contains__(self,key)){return self.obj[key]}
throw _b_.KeyError.$factory(key)}
jsobj_as_pydict.__iter__=function(self){return _b_.iter(jsobj_as_pydict.keys(self))}
jsobj_as_pydict.__len__=function(self){var len=0
for(var key in self.obj){if(! self.exclude(key)){len++}}
return len+self.new_keys.length}
jsobj_as_pydict.__repr__=function(self){if($B.repr.enter(self)){return "{...}"}
var res=[],items=_b_.list.$factory(jsobj_as_pydict.items(self))
for(var item of items){res.push(_b_.repr(item[0])+": "+_b_.repr(item[1]))}
$B.repr.leave(self)
return "{"+res.join(", ")+"}"}
jsobj_as_pydict.__setitem__=function(self,key,value){if(self.exclude(key)&& self.new_keys.indexOf(key)==-1){self.new_keys.push(key)}
self.obj[key]=value}
jsobj_as_pydict.get=function(self,key,_default){_default=_default===undefined ? _b_.None :_default
if(self.exclude(key)||self.obj[key]===undefined){return _default}
return self.obj[key]}
jsobj_as_pydict.items=function(self){var items=[]
for(var key in self.obj){if(self.exclude(key)&& self.new_keys.indexOf(key)==-1){continue}
items.push($B.fast_tuple([key,self.obj[key]]))}
var set_like=true
for(var item of items){try{_b_.hash(item[1])}catch(err){set_like=false
break}}
var it=dict_items.$factory(self,items,set_like)
it.dict_version=self.$version
return it}
jsobj_as_pydict.keys=function(self){var lst=[]
for(var key in self.obj){if(self.exclude(key)&& self.new_keys.indexOf(key)==-1){continue}
lst.push(key)}
var it=dict_keys.$factory(self,lst,true)
it.dict_version=self.$version
return it}
jsobj_as_pydict.values=function(self){var values=[]
for(var key in self.obj){if(self.exclude(key)&& self.new_keys.indexOf(key)==-1){continue}
values.push(self.obj[key])}
var it=dict_values.$factory(self,values,false)
it.dict_version=self.$version
return it}
$B.set_func_names(jsobj_as_pydict,'builtins')})(__BRYTHON__)
;
;(function($B){var _b_=$B.builtins,object=_b_.object,getattr=$B.$getattr,isinstance=_b_.isinstance,$N=_b_.None
function check_not_tuple(self,attr){if(self.__class__===tuple){throw $B.attr_error(attr,self)}}
function $list(){
return list.$factory.apply(null,arguments)}
var list={__class__:_b_.type,__mro__:[object],$infos:{__module__:"builtins",__name__:"list"},$is_class:true,$native:true,$match_sequence_pattern:true,
__dir__:object.__dir__}
list.__add__=function(self,other){if($B.get_class(self)!==$B.get_class(other)){var this_name=$B.class_name(self)
var radd=$B.$getattr(other,'__radd__',null)
if(radd===null){throw _b_.TypeError.$factory('can only concatenate '+
this_name+' (not "'+$B.class_name(other)+
'") to '+this_name)}
return _b_.NotImplemented}
var res=self.slice(),is_js=other.$brython_class=="js" 
for(const item of other){res.push(is_js ? $B.$JS2Py(item):item)}
res.__brython__=true
if(isinstance(self,tuple)){res=tuple.$factory(res)}
return res}
list.__class_getitem__=function(cls,item){
if(! Array.isArray(item)){item=[item]}
return $B.GenericAlias.$factory(cls,item)}
list.__contains__=function(self,item){var $=$B.args("__contains__",2,{self:null,item:null},["self","item"],arguments,{},null,null),self=$.self,item=$.item
var _eq=function(other){return $B.rich_comp("__eq__",item,other)}
var i=0
while(i < self.length){if(_eq(self[i])){return true}
i++}
return false}
list.__delitem__=function(self,arg){if(isinstance(arg,_b_.int)){var pos=arg
if(arg < 0){pos=self.length+pos}
if(pos >=0 && pos < self.length){self.splice(pos,1)
return $N}
throw _b_.IndexError.$factory($B.class_name(self)+
" index out of range")}
if(isinstance(arg,_b_.slice)){var step=arg.step
if(step===$N){step=1}
var start=arg.start
if(start===$N){start=step > 0 ? 0 :self.length}
var stop=arg.stop
if(stop===$N){stop=step > 0 ? self.length :0}
if(start < 0){start=self.length+start}
if(stop < 0){stop=self.length+stop}
var res=[],i=null,pos=0
if(step > 0){if(stop > start){for(var i=start;i < stop;i+=step){if(self[i]!==undefined){res[pos++]=i}}}}else{if(stop < start){for(var i=start;i > stop;i+=step){if(self[i]!==undefined){res[pos++]=i}}
res.reverse()}}
var i=res.length
while(i--){self.splice(res[i],1)}
return $N}
if(_b_.hasattr(arg,"__int__")||_b_.hasattr(arg,"__index__")){list.__delitem__(self,_b_.int.$factory(arg))
return $N}
throw _b_.TypeError.$factory($B.class_name(self)+
" indices must be integer, not "+$B.class_name(arg))}
list.__eq__=function(self,other){var klass=isinstance(self,list)? list :tuple
if(isinstance(other,klass)){if(other.length==self.length){var i=self.length
while(i--){if(! $B.rich_comp("__eq__",self[i],other[i])){return false}}
return true}
return false}
return _b_.NotImplemented}
list.__getitem__=function(self,key){
$B.check_no_kw("__getitem__",self,key)
$B.check_nb_args("__getitem__",2,arguments)
return list.$getitem(self,key)}
list.$getitem=function(self,key){var klass=(self.__class__ ||$B.get_class(self))
var factory=function(list_res){list_res.__class__=klass
return list_res}
var int_key
try{int_key=$B.PyNumber_Index(key)}catch(err){}
if(int_key !==undefined){var items=self.valueOf(),pos=int_key
if(int_key < 0){pos=items.length+pos}
if(pos >=0 && pos < items.length){return items[pos]}
throw _b_.IndexError.$factory($B.class_name(self)+
" index out of range")}
if(key.__class__===_b_.slice ||isinstance(key,_b_.slice)){
if(key.start===_b_.None && key.stop===_b_.None &&
key.step===_b_.None){return self.slice()}
var s=_b_.slice.$conv_for_seq(key,self.length)
var res=[],i=null,items=self.valueOf(),pos=0,start=s.start,stop=s.stop,step=s.step
if(step > 0){if(stop <=start){return factory(res)}
for(var i=start;i < stop;i+=step){res[pos++]=items[i]}
return factory(res)}else{if(stop > start){return factory(res)}
for(var i=start;i > stop;i+=step){res[pos++]=items[i]}
return factory(res)}}
throw _b_.TypeError.$factory($B.class_name(self)+
" indices must be integer, not "+$B.class_name(key))}
list.__ge__=function(self,other){if(! isinstance(other,[list,_b_.tuple])){return _b_.NotImplemented}
var i=0
while(i < self.length){if(i >=other.length){return true}
if($B.rich_comp("__eq__",self[i],other[i])){i++}
else{res=$B.$getattr(self[i],"__ge__")(other[i])
if(res===_b_.NotImplemented){throw _b_.TypeError.$factory("unorderable types: "+
$B.class_name(self[i])+"() >= "+
$B.class_name(other[i])+"()")}else{return res}}}
return other.length==self.length}
list.__gt__=function(self,other){if(! isinstance(other,[list,_b_.tuple])){return _b_.NotImplemented}
var i=0
while(i < self.length){if(i >=other.length){return true}
if($B.rich_comp("__eq__",self[i],other[i])){i++}
else{res=$B.$getattr(self[i],"__gt__")(other[i])
if(res===_b_.NotImplemented){throw _b_.TypeError.$factory("unorderable types: "+
$B.class_name(self[i])+"() > "+
$B.class_name(other[i])+"()")}else return res}}
return false}
list.__hash__=$N
list.__iadd__=function(){var $=$B.args("__iadd__",2,{self:null,x:null},["self","x"],arguments,{},null,null)
var x=list.$factory($B.$iter($.x))
for(var i=0;i < x.length;i++){$.self.push(x[i])}
return $.self}
list.__imul__=function(){var $=$B.args("__imul__",2,{self:null,x:null},["self","x"],arguments,{},null,null),x=$B.$GetInt($.x),len=$.self.length,pos=len
if(x==0){list.clear($.self);return $.self}
for(var i=1;i < x;i++){for(j=0;j < len;j++){$.self[pos++]=$.self[j]}}
return $.self}
list.__init__=function(self,arg){var $=$B.args('__init__',1,{self:null},['self'],arguments,{},'args',null),self=$.self,args=$.args
if(args.length > 1){throw _b_.TypeError.$factory('expected at most 1 argument, got '+
args.length)}
var arg=args[0]
var len_func=$B.$call($B.$getattr(self,"__len__")),pop_func=$B.$getattr(self,"pop",$N)
if(pop_func !==$N){pop_func=$B.$call(pop_func)
while(len_func()){pop_func()}}
if(arg===undefined){return $N}
var arg=$B.$iter(arg),next_func=$B.$call($B.$getattr(arg,"__next__")),pos=len_func()
while(1){try{var res=next_func()
self[pos++]=res}catch(err){if(err.__class__===_b_.StopIteration){break}
else{throw err}}}
return $N}
var list_iterator=$B.make_iterator_class("list_iterator")
list_iterator.__reduce__=list_iterator.__reduce_ex__=function(self){return $B.fast_tuple([_b_.iter,$B.fast_tuple([list.$factory(self)]),0])}
list.__iter__=function(self){return list_iterator.$factory(self)}
list.__le__=function(self,other){var res=list.__ge__(self,other)
if(res===_b_.NotImplemented){return res}
return ! res}
list.__len__=function(self){return self.length}
list.__lt__=function(self,other){if(! isinstance(other,[list,_b_.tuple])){return _b_.NotImplemented}
var i=0
while(i < self.length){if(i >=other.length){return false}
if($B.rich_comp("__eq__",self[i],other[i])){i++}else{res=$B.$getattr(self[i],"__lt__")(other[i])
if(res===_b_.NotImplemented){throw _b_.TypeError.$factory("unorderable types: "+
$B.class_name(self[i])+"() >= "+
$B.class_name(other[i])+"()")}else{return res}}}
return other.length > self.length}
list.__mul__=function(self,other){if(isinstance(other,_b_.int)){other=_b_.int.numerator(other)
var res=[],$temp=self.slice(),len=$temp.length
for(var i=0;i < other;i++){for(var j=0;j < len;j++){res.push($temp[j])}}
res.__class__=self.__class__
return res}
if(_b_.hasattr(other,"__int__")||_b_.hasattr(other,"__index__")){return list.__mul__(self,_b_.int.$factory(other))}
var rmul=$B.$getattr(other,'__rmul__',null)
if(rmul===null){throw _b_.TypeError.$factory(`can't multiply sequence by non-int `+
`of type '${$B.class_name(other)}'`)}
return _b_.NotImplemented}
list.__new__=function(cls,...args){if(cls===undefined){throw _b_.TypeError.$factory("list.__new__(): not enough arguments")}
var res=[]
res.__class__=cls
res.__brython__=true
res.__dict__=$B.empty_dict()
return res}
function __newobj__(){
var $=$B.args('__newobj__',0,{},[],arguments,{},'args',null),args=$.args
var res=args.slice(1)
res.__class__=args[0]
return res}
list.__reduce_ex__=function(self){return $B.fast_tuple([__newobj__,$B.fast_tuple([self.__class__]),_b_.None,_b_.iter(self)])}
list.__repr__=function(self){$B.builtins_repr_check(list,arguments)
return list_repr(self)}
function list_repr(self){
if($B.repr.enter(self)){
return '[...]'}
var _r=[],res
for(var i=0;i < self.length;i++){_r.push(_b_.repr(self[i]))}
if(_b_.isinstance(self,tuple)){if(self.length==1){res="("+_r[0]+",)"}else{res="("+_r.join(", ")+")"}}else{res="["+_r.join(", ")+"]"}
$B.repr.leave(self)
return res}
list.__rmul__=function(self,other){return list.__mul__(self,other)}
list.__setattr__=function(self,attr,value){if(self.__class__===list ||self.__class__===tuple){var cl_name=$B.class_name(self)
if(list.hasOwnProperty(attr)){throw _b_.AttributeError.$factory("'"+cl_name+
"' object attribute '"+attr+"' is read-only")}else{throw _b_.AttributeError.$factory(
"'"+cl_name+" object has no attribute '"+attr+"'")}}
_b_.dict.$setitem(self.__dict__,attr,value)
return $N}
list.__setitem__=function(){var $=$B.args("__setitem__",3,{self:null,key:null,value:null},["self","key","value"],arguments,{},null,null),self=$.self,arg=$.key,value=$.value
list.$setitem(self,arg,value)}
list.$setitem=function(self,arg,value){
if(typeof arg=="number" ||isinstance(arg,_b_.int)){var pos=arg
if(arg < 0){pos=self.length+pos}
if(pos >=0 && pos < self.length){self[pos]=value}else{throw _b_.IndexError.$factory("list index out of range")}
return $N}
if(isinstance(arg,_b_.slice)){var s=_b_.slice.$conv_for_seq(arg,self.length)
if(arg.step===null){$B.set_list_slice(self,s.start,s.stop,value)}else{$B.set_list_slice_step(self,s.start,s.stop,s.step,value)}
return $N}
if(_b_.hasattr(arg,"__int__")||_b_.hasattr(arg,"__index__")){list.__setitem__(self,_b_.int.$factory(arg),value)
return $N}
throw _b_.TypeError.$factory("list indices must be integer, not "+
$B.class_name(arg))}
list.append=function(self,x){$B.check_no_kw("append",self,x)
$B.check_nb_args("append",2,arguments)
self.push(x)
return $N}
list.clear=function(){var $=$B.args("clear",1,{self:null},["self"],arguments,{},null,null)
while($.self.length){$.self.pop()}
return $N}
list.copy=function(){var $=$B.args("copy",1,{self:null},["self"],arguments,{},null,null)
var res=$.self.slice()
res.__class__=self.__class__
res.__brython__=true
return res}
list.count=function(){var $=$B.args("count",2,{self:null,x:null},["self","x"],arguments,{},null,null)
var res=0,_eq=function(other){return $B.rich_comp("__eq__",$.x,other)},i=$.self.length
while(i--){if(_eq($.self[i])){res++}}
return res}
list.extend=function(){var $=$B.args("extend",2,{self:null,t:null},["self","t"],arguments,{},null,null)
var other=list.$factory($B.$iter($.t))
for(var i=0;i < other.length;i++){$.self.push(other[i])}
return $N}
list.index=function(){var missing={},$=$B.args("index",4,{self:null,x:null,start:null,stop:null},["self","x","start" ,"stop"],arguments,{start:0,stop:missing},null,null),self=$.self,start=$.start,stop=$.stop
var _eq=function(other){return $B.rich_comp("__eq__",$.x,other)}
if(start.__class__===$B.long_int){start=parseInt(start.value)*(start.pos ? 1 :-1)}
if(start < 0){start=Math.max(0,start+self.length)}
if(stop===missing){stop=self.length}
else{if(stop.__class__===$B.long_int){stop=parseInt(stop.value)*(stop.pos ? 1 :-1)}
if(stop < 0){stop=Math.min(self.length,stop+self.length)}
stop=Math.min(stop,self.length)}
for(var i=start;i < stop;i++){if(_eq(self[i])){return i}}
throw _b_.ValueError.$factory(_b_.repr($.x)+" is not in "+
$B.class_name(self))}
list.insert=function(){var $=$B.args("insert",3,{self:null,i:null,item:null},["self","i","item"],arguments,{},null,null)
$.self.splice($.i,0,$.item)
return $N}
list.pop=function(){var missing={}
var $=$B.args("pop",2,{self:null,pos:null},["self","pos"],arguments,{pos:missing},null,null),self=$.self,pos=$.pos
check_not_tuple(self,"pop")
if(pos===missing){pos=self.length-1}
pos=$B.$GetInt(pos)
if(pos < 0){pos+=self.length}
var res=self[pos]
if(res===undefined){throw _b_.IndexError.$factory("pop index out of range")}
self.splice(pos,1)
return res}
list.remove=function(){var $=$B.args("remove",2,{self:null,x:null},["self","x"],arguments,{},null,null)
for(var i=0,len=$.self.length;i < len;i++){if($B.rich_comp("__eq__",$.self[i],$.x)){$.self.splice(i,1)
return $N}}
throw _b_.ValueError.$factory(_b_.str.$factory($.x)+" is not in list")}
list.reverse=function(self){var $=$B.args("reverse",1,{self:null},["self"],arguments,{},null,null),_len=$.self.length-1,i=parseInt($.self.length/2)
while(i--){var buf=$.self[i]
$.self[i]=$.self[_len-i]
$.self[_len-i]=buf}
return $N}
function $partition(arg,array,begin,end,pivot)
{var piv=array[pivot]
array=swap(array,pivot,end-1)
var store=begin
if(arg===null){if(array.$cl !==false){
var le_func=_b_.getattr(array.$cl,"__le__")
for(var ix=begin;ix < end-1;++ix){if(le_func(array[ix],piv)){array=swap(array,store,ix);
++store}}}else{for(var ix=begin;ix < end-1;++ix){if($B.$getattr(array[ix],"__le__")(piv)){array=swap(array,store,ix)
++store}}}}else{var len=array.length
for(var ix=begin;ix < end-1;++ix){var x=arg(array[ix])
if(array.length !==len){throw _b_.ValueError.$factory("list modified during sort")}
if($B.$getattr(x,"__le__")(arg(piv))){array=swap(array,store,ix)
++store}}}
array=swap(array,end-1,store)
return store}
function swap(_array,a,b){var tmp=_array[a]
_array[a]=_array[b]
_array[b]=tmp
return _array}
function $qsort(arg,array,begin,end){if(end-1 > begin){var pivot=begin+Math.floor(Math.random()*(end-begin))
pivot=$partition(arg,array,begin,end,pivot)
$qsort(arg,array,begin,pivot)
$qsort(arg,array,pivot+1,end)}}
function $elts_class(self){
if(self.length==0){return null}
var cl=$B.get_class(self[0]),i=self.length
while(i--){if($B.get_class(self[i])!==cl){return false}}
return cl}
list.sort=function(self){var $=$B.args("sort",1,{self:null},["self"],arguments,{},null,"kw")
check_not_tuple(self,"sort")
var func=$N,reverse=false,kw_args=$.kw,keys=_b_.list.$factory(_b_.dict.keys(kw_args))
for(var i=0;i < keys.length;i++){if(keys[i]=="key"){func=kw_args.$string_dict[keys[i]][0]}else if(keys[i]=="reverse"){reverse=kw_args.$string_dict[keys[i]][0]}else{throw _b_.TypeError.$factory("'"+keys[i]+
"' is an invalid keyword argument for this function")}}
if(self.length==0){return}
if(func !==$N){func=$B.$call(func)}
self.$cl=$elts_class(self)
var cmp=null;
if(func===$N && self.$cl===_b_.str){if(reverse){cmp=function(b,a){return $B.$AlphabeticalCompare(a,b)}}else{cmp=function(a,b){return $B.$AlphabeticalCompare(a,b)}}}else if(func===$N && self.$cl===_b_.int){if(reverse){cmp=function(b,a){return a-b}}else{cmp=function(a,b){return a-b}}}else{if(func===$N){if(reverse){cmp=function(b,a){res=$B.$getattr(a,"__lt__")(b)
if(res===_b_.NotImplemented){throw _b_.TypeError.$factory("unorderable types: "+
$B.class_name(b)+"() < "+
$B.class_name(a)+"()")}
if(res){if(a==b){return 0}
return-1}
return 1}}else{cmp=function(a,b){res=$B.$getattr(a,"__lt__")(b)
if(res===_b_.NotImplemented){throw _b_.TypeError.$factory("unorderable types: "+
$B.class_name(a)+"() < "+
$B.class_name(b)+"()")}
if(res){if(a==b){return 0}
return-1}
return 1}}}else{if(reverse){cmp=function(b,a){var _a=func(a),_b=func(b)
res=$B.$getattr(_a,"__lt__")(_b)
if(res===_b_.NotImplemented){throw _b_.TypeError.$factory("unorderable types: "+
$B.class_name(b)+"() < "+
$B.class_name(a)+"()")}
if(res){if(_a==_b){return 0}
return-1}
return 1}}else{cmp=function(a,b){var _a=func(a),_b=func(b)
res=$B.$getattr(_a,"__lt__")(_b)
if(res===_b_.NotImplemented){throw _b_.TypeError.$factory("unorderable types: "+
$B.class_name(a)+"() < "+
$B.class_name(b)+"()")}
if(res){if(_a==_b){return 0}
return-1}
return 1}}}}
$B.$TimSort(self,cmp)
return(self.__brython__ ? $N :self)}
$B.$list=function(t){t.__brython__=true
t.__class__=_b_.list
return t}
list.$factory=function(){if(arguments.length==0){return[]}
var $=$B.args("list",1,{obj:null},["obj"],arguments,{},null,null),obj=$.obj
if(Array.isArray(obj)){
obj=obj.slice()
obj.__brython__=true;
if(obj.__class__==tuple){var res=obj.slice()
res.__class__=list
return res}
return obj}
var res=[],pos=0,arg=$B.$iter(obj),next_func=$B.$call($B.$getattr(arg,"__next__"))
while(1){try{res[pos++]=next_func()}catch(err){if(!isinstance(err,_b_.StopIteration)){throw err}
break}}
res.__brython__=true 
return res}
$B.set_func_names(list,"builtins")
list.__class_getitem__=_b_.classmethod.$factory(list.__class_getitem__)
var JSArray=$B.JSArray=$B.make_class("JSArray",function(array){return{
__class__:JSArray,js:array}}
)
JSArray.__repr__=JSArray.__str__=function(){return "<JSArray object>"}
function make_args(args){var res=[args[0].js]
for(var i=1,len=args.length;i < len;i++){res.push(args[i])}
return res}
for(var attr in list){if($B.JSArray[attr]!==undefined){continue}
if(typeof list[attr]=="function"){$B.JSArray[attr]=(function(fname){return function(){return $B.$JS2Py(list[fname].apply(null,make_args(arguments)))}})(attr)}}
$B.set_func_names($B.JSArray,"builtins")
function $tuple(arg){return arg}
var tuple={__class__:_b_.type,__mro__:[object],$infos:{__module__:"builtins",__name__:"tuple"},$is_class:true,$native:true,$match_sequence_pattern:true,}
var tuple_iterator=$B.make_iterator_class("tuple_iterator")
tuple.__iter__=function(self){return tuple_iterator.$factory(self)}
tuple.$factory=function(){var obj=list.$factory(...arguments)
obj.__class__=tuple
return obj}
$B.fast_tuple=function(array){array.__class__=tuple
array.__brython__=true
array.__dict__=$B.empty_dict()
return array}
for(var attr in list){switch(attr){case "__delitem__":
case "__iadd__":
case "__imul__":
case "__setitem__":
case "append":
case "extend":
case "insert":
case "remove":
case "reverse":
break
default:
if(tuple[attr]===undefined){if(typeof list[attr]=="function"){tuple[attr]=(function(x){return function(){return list[x].apply(null,arguments)}})(attr)}}}}
tuple.__eq__=function(self,other){
if(other===undefined){return self===tuple}
return list.__eq__(self,other)}
function c_mul(a,b){s=((parseInt(a)*b)& 0xFFFFFFFF).toString(16)
return parseInt(s.substr(0,s.length-1),16)}
tuple.__hash__=function(self){
var x=0x3456789
for(var i=0,len=self.length;i < len;i++){var y=_b_.hash(self[i])
x=c_mul(1000003,x)^ y & 0xFFFFFFFF}
return x}
tuple.__init__=function(){
return $N}
tuple.__new__=function(cls,...args){if(cls===undefined){throw _b_.TypeError.$factory("list.__new__(): not enough arguments")}
var self=[]
self.__class__=cls
self.__brython__=true
self.__dict__=$B.empty_dict()
var arg=$B.$iter(args[0]),next_func=$B.$call($B.$getattr(arg,"__next__"))
while(1){try{var item=next_func()
self.push(item)}
catch(err){if(err.__class__===_b_.StopIteration){break}
else{throw err}}}
return self}
tuple.__reduce_ex__=function(self){return $B.fast_tuple([__newobj__,$B.fast_tuple([self.__class__].concat(self.slice())),_b_.None,_b_.None])}
tuple.__repr__=function(self){$B.builtins_repr_check(tuple,arguments)
return list_repr(self)}
$B.set_func_names(tuple,"builtins")
_b_.list=list
_b_.tuple=tuple
_b_.object.__bases__=tuple.$factory()
_b_.type.__bases__=$B.fast_tuple([_b_.object])})(__BRYTHON__)
;
;(function($B){
var _b_=$B.builtins
var $GeneratorReturn={}
$B.generator_return=function(value){return{__class__:$GeneratorReturn,value:value}}
$B.generator=$B.make_class("generator",function(func,name){
var res=function(){var gen=func.apply(null,arguments)
gen.$name=name ||'generator'
gen.$func=func
gen.$has_run=false
return{
__class__:$B.generator,js_gen:gen}}
res.$infos=func.$infos
res.$is_genfunc=true
res.$name=name
return res}
)
$B.generator.__iter__=function(self){return self}
$B.generator.__next__=function(self){return $B.generator.send(self,_b_.None)}
$B.generator.__str__=function(self){var name=self.js_gen.$name ||'generator'
if(self.js_gen.$func && self.js_gen.$func.$infos){name=self.js_gen.$func.$infos.__qualname__}
return `<generator object ${name}>`}
$B.generator.close=function(self){var save_stack=$B.frames_stack.slice()
if(self.$frame){$B.frames_stack.push(self.$frame)}
try{$B.generator.throw(self,_b_.GeneratorExit.$factory())}catch(err){if(! $B.is_exc(err,[_b_.GeneratorExit,_b_.StopIteration])){$B.frames_stack=save_stack
throw _b_.RuntimeError.$factory("generator ignored GeneratorExit")}}
$B.frames_stack=save_stack}
function trace(){return $B.frames_stack.slice()}
$B.generator.send=function(self,value){
var gen=self.js_gen
gen.$has_run=true
if(gen.$finished){throw _b_.StopIteration.$factory(value)}
if(gen.gi_running===true){throw _b_.ValueError.$factory("generator already executing")}
gen.gi_running=true
var save_stack=$B.frames_stack.slice()
if(self.$frame){$B.frames_stack.push(self.$frame)}
try{var res=gen.next(value)}catch(err){gen.$finished=true
$B.frames_stack=save_stack
throw err}
if($B.last($B.frames_stack)===self.$frame){$B.leave_frame()}
$B.frames_stack=save_stack
if(res.value && res.value.__class__===$GeneratorReturn){gen.$finished=true
throw _b_.StopIteration.$factory(res.value.value)}
gen.gi_running=false
if(res.done){throw _b_.StopIteration.$factory(res.value)}
return res.value}
$B.generator.throw=function(self,type,value,traceback){var gen=self.js_gen,exc=type
if(exc.$is_class){if(! _b_.issubclass(type,_b_.BaseException)){throw _b_.TypeError.$factory("exception value must be an "+
"instance of BaseException")}else if(value===undefined){exc=$B.$call(exc)()}else if(_b_.isinstance(value,type)){exc=value}}else{if(value===undefined){value=exc}else{exc=$B.$call(exc)(value)}}
if(traceback !==undefined){exc.$traceback=traceback}
var save_stack=$B.frames_stack.slice()
if(self.$frame){$B.frames_stack.push(self.$frame)}
var res=gen.throw(exc)
$B.frames_stack=save_stack
if(res.done){throw _b_.StopIteration.$factory(res.value)}
return res.value}
$B.set_func_names($B.generator,"builtins")
$B.async_generator=$B.make_class("async_generator",function(func){var f=function(){var gen=func.apply(null,arguments)
var res=Object.create(null)
res.__class__=$B.async_generator
res.js_gen=gen
return res}
return f}
)
var ag_closed={}
$B.async_generator.__aiter__=function(self){return self}
$B.async_generator.__anext__=function(self){return $B.async_generator.asend(self,_b_.None)}
$B.async_generator.aclose=function(self){self.js_gen.$finished=true
return _b_.None}
$B.async_generator.asend=async function(self,value){var gen=self.js_gen
if(gen.$finished){throw _b_.StopAsyncIteration.$factory(value)}
if(gen.ag_running===true){throw _b_.ValueError.$factory("generator already executing")}
gen.ag_running=true
var save_stack=$B.frames_stack.slice()
if(self.$frame){$B.frames_stack.push(self.$frame)}
try{var res=await gen.next(value)}catch(err){gen.$finished=true
$B.frames_stack=save_stack
throw err}
if($B.last($B.frames_stack)===self.$frame){$B.leave_frame()}
$B.frames_stack=save_stack
if(res.done){throw _b_.StopAsyncIteration.$factory(value)}
if(res.value.__class__===$GeneratorReturn){gen.$finished=true
throw _b_.StopAsyncIteration.$factory(res.value.value)}
gen.ag_running=false
return res.value}
$B.async_generator.athrow=async function(self,type,value,traceback){var gen=self.js_gen,exc=type
if(exc.$is_class){if(! _b_.issubclass(type,_b_.BaseException)){throw _b_.TypeError.$factory("exception value must be an "+
"instance of BaseException")}else if(value===undefined){value=$B.$call(exc)()}}else{if(value===undefined){value=exc}else{exc=$B.$call(exc)(value)}}
if(traceback !==undefined){exc.$traceback=traceback}
var save_stack=$B.frames_stack.slice()
if(self.$frame){$B.frames_stack.push(self.$frame)}
await gen.throw(value)
$B.frames_stack=save_stack}
$B.set_func_names($B.async_generator,"builtins")})(__BRYTHON__)
;
;(function($B){var _b_=$B.builtins,object=_b_.object,_window=self
function $getMouseOffset(target,ev){ev=ev ||_window.event;
var docPos=$getPosition(target);
var mousePos=$mouseCoords(ev);
return{x:mousePos.x-docPos.x,y:mousePos.y-docPos.y};}
function $getPosition(e){var left=0,top=0,width=e.width ||e.offsetWidth,height=e.height ||e.offsetHeight,scroll=document.scrollingElement.scrollTop
while(e.offsetParent){left+=e.offsetLeft
top+=e.offsetTop
e=e.offsetParent}
left+=e.offsetLeft ||0
top+=e.offsetTop ||0
if(e.parentElement){
var parent_pos=$getPosition(e.parentElement)
left+=parent_pos.left
top+=parent_pos.top}
return{left:left,top:top,width:width,height:height}}
function trace(msg){var elt=document.getElementById("trace")
if(elt){elt.innerText+=msg}}
function $mouseCoords(ev){if(ev.type.startsWith("touch")){var res={}
res.x=_b_.int.$factory(ev.touches[0].screenX)
res.y=_b_.int.$factory(ev.touches[0].screenY)
res.__getattr__=function(attr){return this[attr]}
res.__class__="MouseCoords"
return res}
var posx=0,posy=0
if(!ev){var ev=_window.event}
if(ev.pageX ||ev.pageY){posx=ev.pageX
posy=ev.pageY}else if(ev.clientX ||ev.clientY){posx=ev.clientX+document.body.scrollLeft+
document.documentElement.scrollLeft
posy=ev.clientY+document.body.scrollTop+
document.documentElement.scrollTop}
var res={}
res.x=_b_.int.$factory(posx)
res.y=_b_.int.$factory(posy)
res.__getattr__=function(attr){return this[attr]}
res.__class__="MouseCoords"
return res}
var $DOMNodeAttrs=["nodeName","nodeValue","nodeType","parentNode","childNodes","firstChild","lastChild","previousSibling","nextSibling","attributes","ownerDocument"]
$B.$isNode=function(o){
return(
typeof Node==="object" ? o instanceof Node :
o && typeof o==="object" && typeof o.nodeType==="number" &&
typeof o.nodeName==="string"
)}
$B.$isNodeList=function(nodes){
try{var result=Object.prototype.toString.call(nodes)
var re=new RegExp("^\\[object (HTMLCollection|NodeList)\\]$")
return(typeof nodes==="object" &&
re.exec(result)!==null &&
nodes.length !==undefined &&
(nodes.length==0 ||
(typeof nodes[0]==="object" && nodes[0].nodeType > 0))
)}catch(err){return false}}
var $DOMEventAttrs_W3C=["NONE","CAPTURING_PHASE","AT_TARGET","BUBBLING_PHASE","type","target","currentTarget","eventPhase","bubbles","cancelable","timeStamp","stopPropagation","preventDefault","initEvent"]
var $DOMEventAttrs_IE=["altKey","altLeft","button","cancelBubble","clientX","clientY","contentOverflow","ctrlKey","ctrlLeft","data","dataFld","dataTransfer","fromElement","keyCode","nextPage","offsetX","offsetY","origin","propertyName","reason","recordset","repeat","screenX","screenY","shiftKey","shiftLeft","source","srcElement","srcFilter","srcUrn","toElement","type","url","wheelDelta","x","y"]
$B.$isEvent=function(obj){var flag=true
for(var i=0;i < $DOMEventAttrs_W3C.length;i++){if(obj[$DOMEventAttrs_W3C[i]]===undefined){flag=false;break}}
if(flag){return true}
for(var i=0;i < $DOMEventAttrs_IE.length;i++){if(obj[$DOMEventAttrs_IE[i]]===undefined){return false}}
return true}
var $NodeTypes={1:"ELEMENT",2:"ATTRIBUTE",3:"TEXT",4:"CDATA_SECTION",5:"ENTITY_REFERENCE",6:"ENTITY",7:"PROCESSING_INSTRUCTION",8:"COMMENT",9:"DOCUMENT",10:"DOCUMENT_TYPE",11:"DOCUMENT_FRAGMENT",12:"NOTATION"}
var Attributes=$B.make_class("Attributes",function(elt){return{__class__:Attributes,elt:elt}}
)
Attributes.__contains__=function(){var $=$B.args("__getitem__",2,{self:null,key:null},["self","key"],arguments,{},null,null)
if($.self.elt instanceof SVGElement){return $.self.elt.hasAttributeNS(null,$.key)}else if(typeof $.self.elt.hasAttribute=="function"){return $.self.elt.hasAttribute($.key)}
return false}
Attributes.__delitem__=function(){var $=$B.args("__getitem__",2,{self:null,key:null},["self","key"],arguments,{},null,null)
if(!Attributes.__contains__($.self,$.key)){throw _b_.KeyError.$factory($.key)}
if($.self.elt instanceof SVGElement){$.self.elt.removeAttributeNS(null,$.key)
return _b_.None}else if(typeof $.self.elt.hasAttribute=="function"){$.self.elt.removeAttribute($.key)
return _b_.None}}
Attributes.__getitem__=function(){var $=$B.args("__getitem__",2,{self:null,key:null},["self","key"],arguments,{},null,null)
if($.self.elt instanceof SVGElement &&
$.self.elt.hasAttributeNS(null,$.key)){return $.self.elt.getAttributeNS(null,$.key)}else if(typeof $.self.elt.hasAttribute=="function" &&
$.self.elt.hasAttribute($.key)){return $.self.elt.getAttribute($.key)}
throw _b_.KeyError.$factory($.key)}
Attributes.__iter__=function(self){self.$counter=0
var attrs=self.elt.attributes,items=[]
for(var i=0;i < attrs.length;i++){items.push(attrs[i].name)}
self.$items=items
return self}
Attributes.__next__=function(){var $=$B.args("__next__",1,{self:null},["self"],arguments,{},null,null)
if($.self.$counter < $.self.$items.length){var res=$.self.$items[$.self.$counter]
$.self.$counter++
return res}else{throw _b_.StopIteration.$factory("")}}
Attributes.__setitem__=function(){var $=$B.args("__setitem__",3,{self:null,key:null,value:null},["self","key","value"],arguments,{},null,null)
if($.self.elt instanceof SVGElement &&
typeof $.self.elt.setAttributeNS=="function"){$.self.elt.setAttributeNS(null,$.key,$.value)
return _b_.None}else if(typeof $.self.elt.setAttribute=="function"){$.self.elt.setAttribute($.key,$.value)
return _b_.None}
throw _b_.TypeError.$factory("Can't set attributes on element")}
Attributes.__repr__=Attributes.__str__=function(self){var attrs=self.elt.attributes,items=[]
for(var i=0;i < attrs.length;i++){items.push(attrs[i].name+': "'+
self.elt.getAttributeNS(null,attrs[i].name)+'"')}
return '{'+items.join(", ")+'}'}
Attributes.get=function(){var $=$B.args("get",3,{self:null,key:null,deflt:null},["self","key","deflt"],arguments,{deflt:_b_.None},null,null)
try{return Attributes.__getitem__($.self,$.key)}catch(err){if(err.__class__===_b_.KeyError){return $.deflt}else{throw err}}}
Attributes.keys=function(){return Attributes.__iter__.apply(null,arguments)}
Attributes.items=function(){var $=$B.args("values",1,{self:null},["self"],arguments,{},null,null),attrs=$.self.elt.attributes,values=[]
for(var i=0;i < attrs.length;i++){values.push([attrs[i].name,attrs[i].value])}
return _b_.list.__iter__(values)}
Attributes.values=function(){var $=$B.args("values",1,{self:null},["self"],arguments,{},null,null),attrs=$.self.elt.attributes,values=[]
for(var i=0;i < attrs.length;i++){values.push(attrs[i].value)}
return _b_.list.__iter__(values)}
$B.set_func_names(Attributes,"<dom>")
var DOMEvent=$B.DOMEvent=$B.make_class("DOMEvent",function(evt_name){
return DOMEvent.__new__(DOMEvent,evt_name)}
)
DOMEvent.__new__=function(cls,evt_name){var ev=new Event(evt_name)
ev.__class__=DOMEvent
if(ev.preventDefault===undefined){ev.preventDefault=function(){ev.returnValue=false}}
if(ev.stopPropagation===undefined){ev.stopPropagation=function(){ev.cancelBubble=true}}
return ev}
function dom2svg(svg_elt,coords){
var pt=svg_elt.createSVGPoint()
pt.x=coords.x
pt.y=coords.y
return pt.matrixTransform(svg_elt.getScreenCTM().inverse())}
DOMEvent.__getattribute__=function(self,attr){switch(attr){case '__repr__':
case '__str__':
return function(){return '<DOMEvent object>'}
case 'x':
return $mouseCoords(self).x
case 'y':
return $mouseCoords(self).y
case 'data':
if(self.dataTransfer !==null){return Clipboard.$factory(self.dataTransfer)}
return $B.$JS2Py(self['data'])
case 'target':
if(self.target !==undefined){return DOMNode.$factory(self.target)}
case 'char':
return String.fromCharCode(self.which)
case 'svgX':
if(self.target instanceof SVGSVGElement){return Math.floor(dom2svg(self.target,$mouseCoords(self)).x)}
throw _b_.AttributeError.$factory("event target is not an SVG "+
"element")
case 'svgY':
if(self.target instanceof SVGSVGElement){return Math.floor(dom2svg(self.target,$mouseCoords(self)).y)}
throw _b_.AttributeError.$factory("event target is not an SVG "+
"element")}
var res=self[attr]
if(res !==undefined){if(typeof res=="function"){var func=function(){var args=[]
for(var i=0;i < arguments.length;i++){args.push($B.pyobj2jsobj(arguments[i]))}
return res.apply(self,arguments)}
func.$infos={__name__:res.name,__qualname__:res.name}
return func}
return $B.$JS2Py(res)}
throw $B.attr_error(attr,self)}
var $DOMEvent=$B.$DOMEvent=function(ev){ev.__class__=DOMEvent
ev.$no_dict=true
if(ev.preventDefault===undefined){ev.preventDefault=function(){ev.returnValue=false}}
if(ev.stopPropagation===undefined){ev.stopPropagation=function(){ev.cancelBubble=true}}
return ev}
$B.set_func_names(DOMEvent,"browser")
var Clipboard=$B.make_class('Clipboard',function(data){return{
__class__ :Clipboard,__dict__:$B.empty_dict(),data :data}}
)
Clipboard.__getitem__=function(self,name){return self.data.getData(name)}
Clipboard.__setitem__=function(self,name,value){self.data.setData(name,value)}
$B.set_func_names(Clipboard,"<dom>")
function $EventsList(elt,evt,arg){
this.elt=elt
this.evt=evt
if(_b_.isinstance(arg,_b_.list)){this.callbacks=arg}
else{this.callbacks=[arg]}
this.remove=function(callback){var found=false
for(var i=0;i < this.callbacks.length;i++){if(this.callbacks[i]===callback){found=true
this.callback.splice(i,1)
this.elt.removeEventListener(this.evt,callback,false)
break}}
if(! found){throw _b_.KeyError.$factory("not found")}}}
var OpenFile=$B.OpenFile={__class__:_b_.type,
__mro__:[object],$infos:{__module__:"<pydom>",__name__:"OpenFile"},$is_class:true}
OpenFile.$factory=function(file,mode,encoding){var res={__class__:$OpenFileDict,file:file,reader:new FileReader()}
if(mode==="r"){res.reader.readAsText(file,encoding)}else if(mode==="rb"){res.reader.readAsBinaryString(file)}
return res}
OpenFile.__getattr__=function(self,attr){if(self["get_"+attr]!==undefined){return self["get_"+attr]}
return self.reader[attr]}
OpenFile.__setattr__=function(self,attr,value){var obj=self.reader
if(attr.substr(0,2)=="on"){
var callback=function(ev){return value($DOMEvent(ev))}
obj.addEventListener(attr.substr(2),callback)}else if("set_"+attr in obj){return obj["set_"+attr](value)}else if(attr in obj){obj[attr]=value}else{_b_.setattr(obj,attr,value)}}
$B.set_func_names(OpenFile,"<dom>")
var dom={File :function(){},FileReader :function(){}}
dom.File.__class__=_b_.type
dom.File.__str__=function(){return "<class 'File'>"}
dom.FileReader.__class__=_b_.type
dom.FileReader.__str__=function(){return "<class 'FileReader'>"}
var DOMNode=$B.make_class('browser',function(elt){return elt}
)
DOMNode.__add__=function(self,other){
var res=TagSum.$factory()
res.children=[self],pos=1
if(_b_.isinstance(other,TagSum)){res.children=res.children.concat(other.children)}else if(_b_.isinstance(other,[_b_.str,_b_.int,_b_.float,_b_.list,_b_.dict,_b_.set,_b_.tuple])){res.children[pos++]=DOMNode.$factory(
document.createTextNode(_b_.str.$factory(other)))}else if(_b_.isinstance(other,DOMNode)){res.children[pos++]=other}else{
try{res.children=res.children.concat(_b_.list.$factory(other))}
catch(err){throw _b_.TypeError.$factory("can't add '"+
$B.class_name(other)+"' object to DOMNode instance")}}
return res}
DOMNode.__bool__=function(self){return true}
DOMNode.__contains__=function(self,key){
if(self.nodeType==9 && typeof key=="string"){return document.getElementById(key)!==null}
if(self.length !==undefined && typeof self.item=="function"){for(var i=0,len=self.length;i < len;i++){if(self.item(i)===key){return true}}}
return false}
DOMNode.__del__=function(self){
if(!self.parentNode){throw _b_.ValueError.$factory("can't delete "+_b_.str.$factory(self))}
self.parentNode.removeChild(self)}
DOMNode.__delattr__=function(self,attr){if(self[attr]===undefined){throw _b_.AttributeError.$factory(
`cannot delete DOMNode attribute '${attr}'`)}
delete self[attr]
return _b_.None}
DOMNode.__delitem__=function(self,key){if(self.nodeType==9){
var res=self.getElementById(key)
if(res){res.parentNode.removeChild(res)}
else{throw _b_.KeyError.$factory(key)}}else{
self.parentNode.removeChild(self)}}
DOMNode.__dir__=function(self){var res=[]
for(var attr in self){if(attr.charAt(0)!="$"){res.push(attr)}}
res.sort()
return res}
DOMNode.__eq__=function(self,other){return self==other}
DOMNode.__getattribute__=function(self,attr){switch(attr){case "attrs":
return Attributes.$factory(self)
case "children":
case "child_nodes":
case "class_name":
case "html":
case "parent":
case "text":
return DOMNode[attr](self)
case "height":
case "left":
case "top":
case "width":
if(self.tagName=="CANVAS" && self[attr]){return self[attr]}
if(self instanceof SVGElement){return self[attr].baseVal.value}
var computed=window.getComputedStyle(self).
getPropertyValue(attr)
if(computed !==undefined){var prop=Math.floor(parseFloat(computed)+0.5)
return isNaN(prop)? computed :prop}else if(self.style[attr]){return parseInt(self.style[attr])}else{throw _b_.AttributeError.$factory("style."+attr+
" is not set for "+_b_.str.$factory(self))}
case "x":
case "y":
if(!(self instanceof SVGElement)){var pos=$getPosition(self)
return attr=="x" ? pos.left :pos.top}
case "clear":
case "closest":
return function(){return DOMNode[attr].call(null,self,...arguments)}
case "headers":
if(self.nodeType==9){
var req=new XMLHttpRequest();
req.open("GET",document.location,false)
req.send(null);
var headers=req.getAllResponseHeaders()
headers=headers.split("\r\n")
var res=$B.empty_dict()
for(var i=0;i < headers.length;i++){var header=headers[i]
if(header.strip().length==0){continue}
var pos=header.search(":")
res.__setitem__(header.substr(0,pos),header.substr(pos+1).lstrip())}
return res}
break
case "location":
attr="location"
break}
if(attr=="select" && self.nodeType==1 &&
["INPUT","TEXTAREA"].indexOf(self.tagName.toUpperCase())>-1){return function(selector){if(selector===undefined){self.select();return _b_.None}
return DOMNode.select(self,selector)}}
if(attr=="query" && self.nodeType==9){
var res={__class__:Query,_keys :[],_values :{}}
var qs=location.search.substr(1).split('&')
if(location.search !=""){for(var i=0;i < qs.length;i++){var pos=qs[i].search("="),elts=[qs[i].substr(0,pos),qs[i].substr(pos+1)],key=decodeURIComponent(elts[0]),value=decodeURIComponent(elts[1])
if(res._keys.indexOf(key)>-1){res._values[key].push(value)}else{res._keys.push(key)
res._values[key]=[value]}}}
return res}
var property=self[attr]
if(property !==undefined && self.__class__ &&
self.__class__.__module__ !="browser.html" &&
self.__class__.__module__ !="browser.svg" &&
! self.__class__.$webcomponent){
var bases=self.__class__.__bases__
var show_message=true
for(var base of bases){if(base.__module__=="browser.html"){show_message=false
break}}
if(show_message){var from_class=$B.$getattr(self.__class__,attr,_b_.None)
if(from_class !==_b_.None){var frame=$B.last($B.frames_stack),line=frame[1].$lineno
console.info("Warning: line "+line+", "+self.tagName+
" element has instance attribute '"+attr+"' set."+
" Attribute of class "+$B.class_name(self)+
" is ignored.")}}}
if(property===undefined){
if(self.tagName){var ce=customElements.get(self.tagName.toLowerCase())
if(ce !==undefined && ce.$cls !==undefined){
var save_class=self.__class__
self.__class__=ce.$cls
try{var res=_b_.object.__getattribute__(self,attr)
self.__class__=save_class
return res}catch(err){self.__class__=save_class
if(! $B.is_exc(err,[_b_.AttributeError])){throw err}}}}
return object.__getattribute__(self,attr)}
var res=property
if(res !==undefined){if(res===null){return _b_.None}
if(typeof res==="function"){if(res.$is_func){
return res}
var func=(function(f,elt){return function(){var args=[],pos=0
for(var i=0;i < arguments.length;i++){var arg=arguments[i]
if(typeof arg=="function"){
if(arg.$cache){var f1=arg.$cache}else{var f1=function(dest_fn){return function(){try{return dest_fn.apply(null,arguments)}catch(err){$B.handle_error(err)}}}(arg)
arg.$cache=f1}
args[pos++]=f1}else if(_b_.isinstance(arg,DOMNode)){args[pos++]=arg}else if(arg===_b_.None){args[pos++]=null}else if(arg.__class__==_b_.dict){args[pos++]=_b_.dict.$to_obj(arg)}else{args[pos++]=arg}}
var result=f.apply(elt,args)
return $B.$JS2Py(result)}})(res,self)
func.$infos={__name__ :attr,__qualname__:attr}
func.$is_func=true
func.$python_function=res
return func}
if(attr=='style'){return $B.JSObj.$factory(self[attr])}
if(Array.isArray(res)){return res}
return $B.$JS2Py(res)}
return object.__getattribute__(self,attr)}
DOMNode.__getitem__=function(self,key){if(self.nodeType==9){
if(typeof key.valueOf()=="string"){var res=self.getElementById(key)
if(res){return DOMNode.$factory(res)}
throw _b_.KeyError.$factory(key)}else{try{var elts=self.getElementsByTagName(key.$infos.__name__),res=[]
for(var i=0;i < elts.length;i++){res.push(DOMNode.$factory(elts[i]))}
return res}catch(err){throw _b_.KeyError.$factory(_b_.str.$factory(key))}}}else{if((typeof key=="number" ||typeof key=="boolean")&&
typeof self.item=="function"){var key_to_int=_b_.int.$factory(key)
if(key_to_int < 0){key_to_int+=self.length}
var res=DOMNode.$factory(self.item(key_to_int))
if(res===undefined){throw _b_.KeyError.$factory(key)}
return res}else if(typeof key=="string" &&
self.attributes &&
typeof self.attributes.getNamedItem=="function"){var attr=self.attributes.getNamedItem(key)
if(!!attr){return attr.value}
throw _b_.KeyError.$factory(key)}}}
DOMNode.__hash__=function(self){return self.__hashvalue__===undefined ?
(self.__hashvalue__=$B.$py_next_hash--):
self.__hashvalue__}
DOMNode.__iter__=function(self){
if(self.length !==undefined && typeof self.item=="function"){var items=[]
for(var i=0,len=self.length;i < len;i++){items.push(DOMNode.$factory(self.item(i)))}}else if(self.childNodes !==undefined){var items=[]
for(var i=0,len=self.childNodes.length;i < len;i++){items.push(DOMNode.$factory(self.childNodes[i]))}}
return $B.$iter(items)}
DOMNode.__le__=function(self,other){
if(self.nodeType==9){self=self.body}
if(_b_.isinstance(other,TagSum)){for(var i=0;i < other.children.length;i++){self.appendChild(other.children[i])}}else if(typeof other=="string" ||typeof other=="number"){var txt=document.createTextNode(other.toString())
self.appendChild(txt)}else if(other instanceof Node){self.appendChild(other)}else{try{
var items=_b_.list.$factory(other)
items.forEach(function(item){DOMNode.__le__(self,item)})}catch(err){throw _b_.TypeError.$factory("can't add '"+
$B.class_name(other)+"' object to DOMNode instance")}}
return self }
DOMNode.__len__=function(self){return self.length}
DOMNode.__mul__=function(self,other){if(_b_.isinstance(other,_b_.int)&& other.valueOf()> 0){var res=TagSum.$factory()
var pos=res.children.length
for(var i=0;i < other.valueOf();i++){res.children[pos++]=DOMNode.clone(self)()}
return res}
throw _b_.ValueError.$factory("can't multiply "+self.__class__+
"by "+other)}
DOMNode.__ne__=function(self,other){return ! DOMNode.__eq__(self,other)}
DOMNode.__next__=function(self){self.$counter++
if(self.$counter < self.childNodes.length){return DOMNode.$factory(self.childNodes[self.$counter])}
throw _b_.StopIteration.$factory("StopIteration")}
DOMNode.__radd__=function(self,other){
var res=TagSum.$factory()
var txt=DOMNode.$factory(document.createTextNode(other))
res.children=[txt,self]
return res}
DOMNode.__str__=DOMNode.__repr__=function(self){var attrs=self.attributes,attrs_str="",items=[]
if(attrs !==undefined){var items=[]
for(var i=0;i < attrs.length;i++){items.push(attrs[i].name+'="'+
self.getAttributeNS(null,attrs[i].name)+'"')}}
var proto=Object.getPrototypeOf(self)
if(proto){var name=proto.constructor.name
if(name===undefined){
var proto_str=proto.constructor.toString()
name=proto_str.substring(8,proto_str.length-1)}
items.splice(0,0,name)
return "<"+items.join(" ")+">"}
var res="<DOMNode object type '"
return res+$NodeTypes[self.nodeType]+"' name '"+
self.nodeName+"'"+attrs_str+">"}
DOMNode.__setattr__=function(self,attr,value){
if(attr.substr(0,2)=="on" && attr.length > 2){
if(!$B.$bool(value)){
DOMNode.unbind(self,attr.substr(2))}else{
DOMNode.bind(self,attr.substr(2),value)}}else{switch(attr){case "left":
case "top":
case "width":
case "height":
if(_b_.isinstance(value,_b_.int)&& self.nodeType==1){self.style[attr]=value+"px"
return _b_.None}else{throw _b_.ValueError.$factory(attr+" value should be"+
" an integer, not "+$B.class_name(value))}
break}
if(DOMNode["set_"+attr]!==undefined){return DOMNode["set_"+attr](self,value)}
function warn(msg){console.log(msg)
var frame=$B.last($B.frames_stack)
if($B.debug > 0){var info=frame[1].$line_info.split(",")
console.log("module",info[1],"line",info[0])
if($B.$py_src.hasOwnProperty(info[1])){var src=$B.$py_src[info[1]]
console.log(src.split("\n")[parseInt(info[0])-1])}}else{console.log("module",frame[2])}}
var proto=Object.getPrototypeOf(self),nb=0
while(!!proto && proto !==Object.prototype && nb++< 10){var descriptors=Object.getOwnPropertyDescriptors(proto)
if(!!descriptors &&
typeof descriptors.hasOwnProperty=="function"){if(descriptors.hasOwnProperty(attr)){if(!descriptors[attr].writable &&
descriptors[attr].set===undefined){warn("Warning: property '"+attr+
"' is not writable. Use element.attrs['"+
attr+"'] instead.")}
break}}else{break}
proto=Object.getPrototypeOf(proto)}
if(self.style && self.style[attr]!==undefined){warn("Warning: '"+attr+"' is a property of element.style")}
self[attr]=value
return _b_.None}}
DOMNode.__setitem__=function(self,key,value){if(typeof key=="number"){self.childNodes[key]=value}else if(typeof key=="string"){if(self.attributes){if(self instanceof SVGElement){self.setAttributeNS(null,key,value)}else if(typeof self.setAttribute=="function"){self.setAttribute(key,value)}}}}
DOMNode.abs_left={__get__:function(self){return $getPosition(self).left},__set__:function(){throw _b_.AttributeError.$factory("'DOMNode' objectattribute "+
"'abs_left' is read-only")}}
DOMNode.abs_top={__get__:function(self){return $getPosition(self).top},__set__:function(){throw _b_.AttributeError.$factory("'DOMNode' objectattribute "+
"'abs_top' is read-only")}}
DOMNode.attach=DOMNode.__le__ 
DOMNode.bind=function(self,event){
var $=$B.args("bind",4,{self:null,event:null,func:null,options:null},["self","event","func","options"],arguments,{func:_b_.None,options:_b_.None},null,null),self=$.self,event=$.event,func=$.func,options=$.options
if(func===_b_.None){
return function(f){return DOMNode.bind(self,event,f)}}
var callback=(function(f){return function(ev){try{return f($DOMEvent(ev))}catch(err){if(err.__class__ !==undefined){$B.handle_error(err)}else{try{$B.$getattr($B.stderr,"write")(err)}
catch(err1){console.log(err)}}}}}
)(func)
callback.$infos=func.$infos
callback.$attrs=func.$attrs ||{}
callback.$func=func
if(typeof options=="boolean"){self.addEventListener(event,callback,options)}else if(options.__class__===_b_.dict){self.addEventListener(event,callback,_b_.dict.$to_obj(options))}else if(options===_b_.None){self.addEventListener(event,callback,false)}
self.$events=self.$events ||{}
self.$events[event]=self.$events[event]||[]
self.$events[event].push([func,callback])
return self}
DOMNode.children=function(self){var res=[]
if(self.nodeType==9){self=self.body}
for(var child of self.children){res.push(DOMNode.$factory(child))}
return res}
DOMNode.child_nodes=function(self){var res=[]
if(self.nodeType==9){self=self.body}
for(child of self.childNodes){res.push(DOMNode.$factory(child))}
return res}
DOMNode.clear=function(self){
var $=$B.args("clear",1,{self:null},["self"],arguments,{},null,null)
if(self.nodeType==9){self=self.body}
while(self.firstChild){self.removeChild(self.firstChild)}}
DOMNode.Class=function(self){if(self.className !==undefined){return self.className}
return _b_.None}
DOMNode.class_name=function(self){return DOMNode.Class(self)}
DOMNode.clone=function(self){var res=DOMNode.$factory(self.cloneNode(true))
var events=self.$events ||{}
for(var event in events){var evt_list=events[event]
evt_list.forEach(function(evt){var func=evt[0]
DOMNode.bind(res,event,func)})}
return res}
DOMNode.closest=function(self,selector){
var $=$B.args("closest",2,{self:null,selector:null},["self","selector"],arguments,{},null,null)
var res=self.closest(selector)
if(res===null){throw _b_.KeyError.$factory("no parent with selector "+selector)}
return DOMNode.$factory(res)}
DOMNode.bindings=function(self){
var res=$B.empty_dict()
for(var key in self.$events){_b_.dict.$setitem(res,key,self.$events[key].map(x=> x[1]))}
return res}
DOMNode.events=function(self,event){self.$events=self.$events ||{}
var evt_list=self.$events[event]=self.$events[event]||[],callbacks=[]
evt_list.forEach(function(evt){callbacks.push(evt[1])})
return callbacks}
function make_list(node_list){var res=[]
for(var i=0;i < node_list.length;i++){res.push(DOMNode.$factory(node_list[i]))}
return res}
DOMNode.get=function(self){
var args=[]
for(var i=1;i < arguments.length;i++){args.push(arguments[i])}
var $ns=$B.args("get",0,{},[],args,{},null,"kw"),$dict={},items=_b_.list.$factory(_b_.dict.items($ns["kw"]))
items.forEach(function(item){$dict[item[0]]=item[1]})
if($dict["name"]!==undefined){if(self.getElementsByName===undefined){throw _b_.TypeError.$factory("DOMNode object doesn't support "+
"selection by name")}
return make_list(self.getElementsByName($dict['name']))}
if($dict["tag"]!==undefined){if(self.getElementsByTagName===undefined){throw _b_.TypeError.$factory("DOMNode object doesn't support "+
"selection by tag name")}
return make_list(self.getElementsByTagName($dict["tag"]))}
if($dict["classname"]!==undefined){if(self.getElementsByClassName===undefined){throw _b_.TypeError.$factory("DOMNode object doesn't support "+
"selection by class name")}
return make_list(self.getElementsByClassName($dict['classname']))}
if($dict["id"]!==undefined){if(self.getElementById===undefined){throw _b_.TypeError.$factory("DOMNode object doesn't support "+
"selection by id")}
var id_res=document.getElementById($dict['id'])
if(! id_res){return[]}
return[DOMNode.$factory(id_res)]}
if($dict["selector"]!==undefined){if(self.querySelectorAll===undefined){throw _b_.TypeError.$factory("DOMNode object doesn't support "+
"selection by selector")}
return make_list(self.querySelectorAll($dict['selector']))}
return res}
DOMNode.getContext=function(self){
if(!("getContext" in self)){throw _b_.AttributeError.$factory("object has no attribute 'getContext'")}
return function(ctx){return $B.JSObj.$factory(self.getContext(ctx))}}
DOMNode.getSelectionRange=function(self){
if(self["getSelectionRange"]!==undefined){return self.getSelectionRange.apply(null,arguments)}}
DOMNode.html=function(self){var res=self.innerHTML
if(res===undefined){if(self.nodeType==9 && self.body){res=self.body.innerHTML}else{res=_b_.None}}
return res}
DOMNode.index=function(self,selector){var items
if(selector===undefined){items=self.parentElement.childNodes}else{items=self.parentElement.querySelectorAll(selector)}
var rank=-1
for(var i=0;i < items.length;i++){if(items[i]===self){rank=i;break}}
return rank}
DOMNode.inside=function(self,other){
var elt=self
while(true){if(other===elt){return true}
elt=elt.parentNode
if(! elt){return false}}}
DOMNode.options=function(self){
return new $OptionsClass(self)}
DOMNode.parent=function(self){if(self.parentElement){return DOMNode.$factory(self.parentElement)}
return _b_.None}
DOMNode.reset=function(self){
return function(){self.reset()}}
DOMNode.scrolled_left={__get__:function(self){return $getPosition(self).left-
document.scrollingElement.scrollLeft},__set__:function(){throw _b_.AttributeError.$factory("'DOMNode' objectattribute "+
"'scrolled_left' is read-only")}}
DOMNode.scrolled_top={__get__:function(self){return $getPosition(self).top-
document.scrollingElement.scrollTop},__set__:function(){throw _b_.AttributeError.$factory("'DOMNode' objectattribute "+
"'scrolled_top' is read-only")}}
DOMNode.select=function(self,selector){
if(self.querySelectorAll===undefined){throw _b_.TypeError.$factory("DOMNode object doesn't support "+
"selection by selector")}
return make_list(self.querySelectorAll(selector))}
DOMNode.select_one=function(self,selector){
if(self.querySelector===undefined){throw _b_.TypeError.$factory("DOMNode object doesn't support "+
"selection by selector")}
var res=self.querySelector(selector)
if(res===null){return _b_.None}
return DOMNode.$factory(res)}
DOMNode.setSelectionRange=function(self){
if(this["setSelectionRange"]!==undefined){return(function(obj){return function(){return obj.setSelectionRange.apply(obj,arguments)}})(this)}else if(this["createTextRange"]!==undefined){return(function(obj){return function(start_pos,end_pos){if(end_pos==undefined){end_pos=start_pos}
var range=obj.createTextRange()
range.collapse(true)
range.moveEnd("character",start_pos)
range.moveStart("character",end_pos)
range.select()}})(this)}}
DOMNode.set_class_name=function(self,arg){self.setAttribute("class",arg)}
DOMNode.set_html=function(self,value){if(self.nodeType==9){self=self.body}
self.innerHTML=_b_.str.$factory(value)}
DOMNode.set_style=function(self,style){
if(typeof style==='string'){self.style=style}else if(!_b_.isinstance(style,_b_.dict)){throw _b_.TypeError.$factory("style must be str or dict, not "+
$B.class_name(style))}
var items=_b_.list.$factory(_b_.dict.items(style))
for(var i=0;i < items.length;i++){var key=items[i][0],value=items[i][1]
if(key.toLowerCase()=="float"){self.style.cssFloat=value
self.style.styleFloat=value}else{switch(key){case "top":
case "left":
case "width":
case "height":
case "borderWidth":
if(_b_.isinstance(value,_b_.int)){value=value+"px"}}
self.style[key]=value}}}
DOMNode.set_text=function(self,value){if(self.nodeType==9){self=self.body}
self.innerText=_b_.str.$factory(value)
self.textContent=_b_.str.$factory(value)}
DOMNode.set_value=function(self,value){self.value=_b_.str.$factory(value)}
DOMNode.submit=function(self){
return function(){self.submit()}}
DOMNode.text=function(self){if(self.nodeType==9){self=self.body}
var res=self.innerText ||self.textContent
if(res===null){res=_b_.None}
return res}
DOMNode.toString=function(self){if(self===undefined){return 'DOMNode'}
return self.nodeName}
DOMNode.trigger=function(self,etype){
if(self.fireEvent){self.fireEvent("on"+etype)}else{var evObj=document.createEvent("Events")
evObj.initEvent(etype,true,false)
self.dispatchEvent(evObj)}}
DOMNode.unbind=function(self,event){
self.$events=self.$events ||{}
if(self.$events==={}){return _b_.None}
if(event===undefined){for(var event in self.$events){DOMNode.unbind(self,event)}
return _b_.None}
if(self.$events[event]===undefined ||
self.$events[event].length==0){return _b_.None}
var events=self.$events[event]
if(arguments.length==2){
for(var i=0;i < events.length;i++){var callback=events[i][1]
self.removeEventListener(event,callback,false)}
self.$events[event]=[]
return _b_.None}
for(var i=2;i < arguments.length;i++){var callback=arguments[i],flag=false,func=callback.$func
if(func===undefined){
var found=false
for(var j=0;j < events.length;j++){if(events[j][0]===callback){var func=callback,found=true
break}}
if(!found){throw _b_.TypeError.$factory("function is not an event callback")}}
for(var j=0;j < events.length;j++){if($B.$getattr(func,'__eq__')(events[j][0])){var callback=events[j][1]
self.removeEventListener(event,callback,false)
events.splice(j,1)
flag=true
break}}
if(!flag){throw _b_.KeyError.$factory('missing callback for event '+event)}}}
$B.set_func_names(DOMNode,"browser")
var Query=$B.make_class("query")
Query.__contains__=function(self,key){return self._keys.indexOf(key)>-1}
Query.__getitem__=function(self,key){
var result=self._values[key]
if(result===undefined){throw _b_.KeyError.$factory(key)}else if(result.length==1){return result[0]}
return result}
var Query_iterator=$B.make_iterator_class("query string iterator")
Query.__iter__=function(self){return Query_iterator.$factory(self._keys)}
Query.__setitem__=function(self,key,value){self._values[key]=[value]
return _b_.None}
Query.__str__=Query.__repr__=function(self){
var elts=[]
for(var key in self._values){for(const val of self._values[key]){elts.push(encodeURIComponent(key)+"="+encodeURIComponent(val))}}
if(elts.length==0){return ""}else{return "?"+elts.join("&")}}
Query.getfirst=function(self,key,_default){
var result=self._values[key]
if(result===undefined){if(_default===undefined){return _b_.None}
return _default}
return result[0]}
Query.getlist=function(self,key){
var result=self._values[key]
if(result===undefined){return[]}
return result}
Query.getvalue=function(self,key,_default){try{return Query.__getitem__(self,key)}
catch(err){if(_default===undefined){return _b_.None}
return _default}}
Query.keys=function(self){return self._keys}
$B.set_func_names(Query,"<dom>")
var TagSum=$B.make_class("TagSum",function(){return{
__class__:TagSum,children:[],toString:function(){return "(TagSum)"}}}
)
TagSum.appendChild=function(self,child){self.children.push(child)}
TagSum.__add__=function(self,other){if($B.get_class(other)===TagSum){self.children=self.children.concat(other.children)}else if(_b_.isinstance(other,[_b_.str,_b_.int,_b_.float,_b_.dict,_b_.set,_b_.list])){self.children=self.children.concat(
DOMNode.$factory(document.createTextNode(other)))}else{self.children.push(other)}
return self}
TagSum.__radd__=function(self,other){var res=TagSum.$factory()
res.children=self.children.concat(
DOMNode.$factory(document.createTextNode(other)))
return res}
TagSum.__repr__=function(self){var res="<object TagSum> "
for(var i=0;i < self.children.length;i++){res+=self.children[i]
if(self.children[i].toString()=="[object Text]"){res+=" ["+self.children[i].textContent+"]\n"}}
return res}
TagSum.__str__=TagSum.toString=TagSum.__repr__
TagSum.clone=function(self){var res=TagSum.$factory()
for(var i=0;i < self.children.length;i++){res.children.push(self.children[i].cloneNode(true))}
return res}
$B.set_func_names(TagSum,"<dom>")
$B.TagSum=TagSum 
var win=$B.JSObj.$factory(_window)
win.get_postMessage=function(msg,targetOrigin){if(_b_.isinstance(msg,dict)){var temp={__class__:"dict"},items=_b_.list.$factory(_b_.dict.items(msg))
items.forEach(function(item){temp[item[0]]=item[1]})
msg=temp}
return _window.postMessage(msg,targetOrigin)}
$B.DOMNode=DOMNode
$B.win=win})(__BRYTHON__)
;

$B.pattern_match=function(subject,pattern){var _b_=$B.builtins,frame=$B.last($B.frames_stack),locals=frame[1]
function bind(pattern,subject){if(pattern.alias){locals[pattern.alias]=subject}}
if(pattern.sequence){
if(_b_.isinstance(subject,[_b_.str,_b_.bytes,_b_.bytearray])){
return false}
var Sequence
if($B.imported['collections.abc']){Sequence=$B.imported['collections.abc'].Sequence}
var deque
if($B.imported['collections']){deque=$B.imported['collections'].deque}
var supported=false
var klass=subject.__class__ ||$B.get_class(subject)
for(var base of[klass].concat(klass.__bases__ ||[])){if(base.$match_sequence_pattern){
supported=true
break}else if(base===Sequence ||base==deque){supported=true
break}}
if((! supported)&& Sequence){
supported=_b_.issubclass(klass,Sequence)}
if(! supported){return false}
if(pattern.sequence.length==1 &&
pattern.sequence[0].capture_starred=='_'){return true}
var subject_length=_b_.len(subject)
var nb_fixed_length=0
for(var item of pattern.sequence){if(! item.capture_starred){nb_fixed_length++}}
if(subject_length < nb_fixed_length){
return false}else if(subject_length==0 && pattern.sequence.length==0){
return true}
var it=_b_.iter(subject),nxt=$B.$getattr(it,'__next__'),store_starred=[],nb_matched_in_subject=0
for(var i=0,len=pattern.sequence.length;i < len;i++){if(pattern.sequence[i].capture_starred){
if(pattern.sequence[i].capture_starred=='_' &&
i==len-1){bind(pattern,subject)
return true}
var starred_match_length=subject_length-
nb_matched_in_subject-len+i+1
for(var j=0;j < starred_match_length;j++){store_starred.push(nxt())}
locals[pattern.sequence[i].capture_starred]=store_starred
nb_matched_in_subject+=starred_match_length}else{var subject_item=nxt()
var m=$B.pattern_match(subject_item,pattern.sequence[i])
if(! m){return false}
nb_matched_in_subject++}}
if(nb_matched_in_subject !=subject_length){return false}
bind(pattern,subject)
return true}
if(pattern.group){if(pattern.group.length==1){
if($B.pattern_match(subject,pattern.group[0])){bind(pattern,subject)
return true}}else{
pattern.sequence=pattern.group
return $B.pattern_match(subject,pattern)}}
if(pattern.or){
for(var item of pattern.or){if($B.pattern_match(subject,item)){bind(pattern,subject)
return true}}
return false}
if(pattern.mapping){
var supported=false
var Mapping
if($B.imported['collections.abc']){Mapping=$B.imported['collections.abc'].Mapping}
var klass=subject.__class__ ||$B.get_class(subject)
for(var base of[klass].concat(klass.__bases__ ||[])){
if(base.$match_mapping_pattern ||base===Mapping){supported=true
break}}
if((! supported)&& Mapping){supported=_b_.issubclass(klass,Mapping)}
if(! supported){return false}
var matched=[],keys=[]
for(var item of pattern.mapping){var key_pattern=item[0],value_pattern=item[1]
if(key_pattern.hasOwnProperty('literal')){var key=key_pattern.literal}else if(key_pattern.hasOwnProperty('value')){var key=key_pattern.value}
if(_b_.list.__contains__(keys,key)){throw _b_.ValueError.$factory('mapping pattern checks '+
'duplicate key ('+
_b_.str.$factory(key)+')')}
keys.push(key)
var missing=$B.make_class('missing',function(){return{
__class__:missing}}
)
try{var v=$B.$call($B.$getattr(subject,"get"))(key,missing)
if(v===missing){
return false}
if(! $B.pattern_match(v,value_pattern)){return false}
matched.push(key)}catch(err){if($B.is_exc(err,[_b_.KeyError])){return false}
throw err}}
if(pattern.rest){var rest=$B.empty_dict(),it=_b_.iter(subject)
while(true){try{var next_key=_b_.next(it)}catch(err){if($B.is_exc(err,[_b_.StopIteration])){locals[pattern.rest]=rest
return true}
throw err}
if(! _b_.list.__contains__(matched,next_key)){_b_.dict.__setitem__(rest,next_key,$B.$getitem(subject,next_key))}}}
return true}
if(pattern.class){var klass=pattern.class
if(! _b_.isinstance(klass,_b_.type)){throw _b_.TypeError.$factory('called match pattern must be a type')}
if(! _b_.isinstance(subject,klass)){return false}
if(pattern.args.length > 0){if([_b_.bool,_b_.bytearray,_b_.bytes,_b_.dict,_b_.float,_b_.frozenset,_b_.int,_b_.list,_b_.set,_b_.str,_b_.tuple].indexOf(klass)>-1){
if(pattern.args.length > 1){throw _b_.TypeError.$factory('for builtin type '+
$B.class_name(subject)+', a single positional '+
'subpattern is accepted')}
return $B.pattern_match(subject,pattern.args[0])}else{
var match_args=$B.$getattr(klass,'__match_args__',$B.fast_tuple([]))
if(! _b_.isinstance(match_args,_b_.tuple)){throw _b_.TypeError.$factory(
'__match_args__() did not return a tuple')}
if(pattern.args.length > match_args.length){throw _b_.TypeError.$factory(
'__match_args__() returns '+match_args.length+
' names but '+pattern.args.length+' positional '+
'arguments were passed')}
for(var i=0,len=pattern.args.length;i < len;i++){
var pattern_arg=pattern.args[i],klass_arg=match_args[i]
if(typeof klass_arg !=="string"){throw _b_.TypeError.$factory('item in __match_args__ '+
'is not a string: '+klass_arg)}
if(pattern.keywords.hasOwnProperty(klass_arg)){throw _b_.TypeError.$factory('__match_arg__ item '+
klass_arg+' was passed as keyword pattern')}
pattern.keywords[klass_arg]=pattern_arg}}}
for(var key in pattern.keywords){var v=$B.$getattr(subject,key,null)
if(v===null){return false}else if(! $B.pattern_match(v,pattern.keywords[key])){return false}}
bind(pattern,subject)
return true}
if(pattern.capture){if(pattern.capture !='_'){
locals[pattern.capture]=subject}
bind(pattern,subject)
return true}else if(pattern.capture_starred){
locals[pattern.capture_starred]=$B.$list(subject)
return true}else if(pattern.hasOwnProperty('literal')){var literal=pattern.literal
if(literal===_b_.None ||literal===_b_.True ||
literal===_b_.False){
return $B.$is(subject,literal)}
if($B.rich_comp('__eq__',subject,literal)){bind(pattern,subject)
return true}
return false}else if(pattern.hasOwnProperty('value')){if($B.rich_comp('__eq__',subject,pattern.value)){bind(pattern,subject)
return true}}else if(subject==pattern){return true}
return false}
;
 ;(function($B){var _b_=$B.builtins
var update=$B.update_obj=function(mod,data){for(attr in data){mod[attr]=data[attr]}}
var _window=self;
var modules={}
var browser={$package:true,$is_package:true,__initialized__:true,__package__:'browser',__file__:$B.brython_path.replace(/\/*$/g,'')+
'/Lib/browser/__init__.py',bind:function(){
var $=$B.args("bind",3,{elt:null,evt:null,options:null},["elt","evt","options"],arguments,{options:_b_.None},null,null)
var options=$.options
if(typeof options=="boolean"){}
else if(options.__class__===_b_.dict){options=options.$string_dict}else{options==false}
return function(callback){if($B.get_class($.elt)===$B.JSObj){
function f(ev){try{return callback($B.JSObj.$factory(ev))}catch(err){$B.handle_error(err)}}
$.elt.addEventListener($.evt,f,options)
return callback}else if(_b_.isinstance($.elt,$B.DOMNode)){
$B.DOMNode.bind($.elt,$.evt,callback,options)
return callback}else if(_b_.isinstance($.elt,_b_.str)){
var items=document.querySelectorAll($.elt)
for(var i=0;i < items.length;i++){$B.DOMNode.bind($B.DOMNode.$factory(items[i]),$.evt,callback,options)}
return callback}
try{var it=$B.$iter($.elt)
while(true){try{var elt=_b_.next(it)
$B.DOMNode.bind(elt,$.evt,callback)}catch(err){if(_b_.isinstance(err,_b_.StopIteration)){break}
throw err}}}catch(err){if(_b_.isinstance(err,_b_.AttributeError)){$B.DOMNode.bind($.elt,$.evt,callback)}
throw err}
return callback}},console:self.console && $B.JSObj.$factory(self.console),self:$B.win,win:$B.win,"window":$B.win,}
browser.__path__=browser.__file__
if($B.isNode){delete browser.window
delete browser.win}else if($B.isWebWorker){browser.is_webworker=true
delete browser.window
delete browser.win
browser.self.send=self.postMessage
browser.document=_b_.property.$factory(
function(){throw _b_.ValueError.$factory(
"'document' is not available in Web Workers")},function(self,value){browser.document=value}
)}else{browser.is_webworker=false
update(browser,{"alert":function(message){window.alert($B.builtins.str.$factory(message ||""))},confirm:$B.JSObj.$factory(window.confirm),"document":$B.DOMNode.$factory(document),doc:$B.DOMNode.$factory(document),
DOMEvent:$B.DOMEvent,DOMNode:$B.DOMNode,load:function(script_url){
var file_obj=$B.builtins.open(script_url)
var content=$B.$getattr(file_obj,'read')()
eval(content)},mouseCoords:function(ev){return $B.JSObj.$factory($mouseCoords(ev))},prompt:function(message,default_value){return $B.JSObj.$factory(window.prompt(message,default_value||''))},reload:function(){
var scripts=document.getElementsByTagName('script'),js_scripts=[]
scripts.forEach(function(script){if(script.type===undefined ||
script.type=='text/javascript'){js_scripts.push(script)
if(script.src){console.log(script.src)}}})
console.log(js_scripts)
for(var mod in $B.imported){if($B.imported[mod].$last_modified){console.log('check',mod,$B.imported[mod].__file__,$B.imported[mod].$last_modified)}else{console.log('no date for mod',mod)}}},run_script:function(){var $=$B.args("run_script",2,{src:null,name:null},["src","name"],arguments,{name:"script_"+$B.UUID()},null,null)
$B.run_script($.src,$.name,$B.script_path,true)},URLParameter:function(name){name=name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
var regex=new RegExp("[\\?&]"+name+"=([^&#]*)"),results=regex.exec(location.search);
results=results===null ? "" :
decodeURIComponent(results[1].replace(/\+/g," "));
return $B.builtins.str.$factory(results);}})
modules['browser.html']=(function($B){var _b_=$B.builtins
var TagSum=$B.TagSum
function makeTagDict(tagName){
var dict={__class__:_b_.type,$infos:{__name__:tagName,__module__:"browser.html",__qualname__:tagName}}
dict.__init__=function(){var $ns=$B.args('pow',1,{self:null},['self'],arguments,{},'args','kw'),self=$ns['self'],args=$ns['args']
if(args.length==1){var first=args[0]
if(_b_.isinstance(first,[_b_.str,_b_.int,_b_.float])){
self.innerHTML=_b_.str.$factory(first)}else if(first.__class__===TagSum){for(var i=0,len=first.children.length;i < len;i++){self.appendChild(first.children[i])}}else{if(_b_.isinstance(first,$B.DOMNode)){self.appendChild(first)}else{try{
var items=_b_.list.$factory(first)
items.forEach(function(item){$B.DOMNode.__le__(self,item)})}catch(err){if($B.debug > 1){console.log(err,err.__class__,err.args)
console.log("first",first)
console.log(arguments)}
throw err}}}}
var items=_b_.list.$factory(_b_.dict.items($ns['kw']))
for(var i=0,len=items.length;i < len;i++){
var arg=items[i][0],value=items[i][1]
if(arg.toLowerCase().substr(0,2)=="on"){
var js='$B.DOMNode.bind(self,"'+
arg.toLowerCase().substr(2)
eval(js+'",function(){'+value+'})')}else if(arg.toLowerCase()=="style"){$B.DOMNode.set_style(self,value)}else{if(value !==false){
try{
arg=$B.imported["browser.html"].
attribute_mapper(arg)
self.setAttribute(arg,value)}catch(err){throw _b_.ValueError.$factory(
"can't set attribute "+arg)}}}}}
dict.__mro__=[$B.DOMNode,$B.builtins.object]
dict.__new__=function(cls){
var res=document.createElement(tagName)
if(cls !==html[tagName]){
res.__class__=cls}
return res}
$B.set_func_names(dict,"browser.html")
return dict}
function makeFactory(klass){
var factory=function(){if(klass.$infos.__name__=='SVG'){var res=$B.DOMNode.$factory(
document.createElementNS("http://www.w3.org/2000/svg","svg"),true)}else{var res=document.createElement(klass.$infos.__name__)}
var init=$B.$getattr(klass,"__init__",null)
if(init !==null){init(res,...arguments)}
return res}
return factory}
var tags=['A','ABBR','ACRONYM','ADDRESS','APPLET','AREA','B','BASE','BASEFONT','BDO','BIG','BLOCKQUOTE','BODY','BR','BUTTON','CAPTION','CENTER','CITE','CODE','COL','COLGROUP','DD','DEL','DFN','DIR','DIV','DL','DT','EM','FIELDSET','FONT','FORM','FRAME','FRAMESET','H1','H2','H3','H4','H5','H6','HEAD','HR','HTML','I','IFRAME','IMG','INPUT','INS','ISINDEX','KBD','LABEL','LEGEND','LI','LINK','MAP','MENU','META','NOFRAMES','NOSCRIPT','OBJECT','OL','OPTGROUP','OPTION','P','PARAM','PRE','Q','S','SAMP','SCRIPT','SELECT','SMALL','SPAN','STRIKE','STRONG','STYLE','SUB','SUP','SVG','TABLE','TBODY','TD','TEXTAREA','TFOOT','TH','THEAD','TITLE','TR','TT','U','UL','VAR',
'ARTICLE','ASIDE','AUDIO','BDI','CANVAS','COMMAND','DATA','DATALIST','EMBED','FIGCAPTION','FIGURE','FOOTER','HEADER','KEYGEN','MAIN','MARK','MATH','METER','NAV','OUTPUT','PROGRESS','RB','RP','RT','RTC','RUBY','SECTION','SOURCE','TEMPLATE','TIME','TRACK','VIDEO','WBR',
'DETAILS','DIALOG','MENUITEM','PICTURE','SUMMARY']
var html={}
html.tags=$B.jsobj_as_pydict.$factory(html,function(attr){return tags.indexOf(attr)==-1}
)
function maketag(tagName){
if(!(typeof tagName=='string')){throw _b_.TypeError.$factory("html.maketag expects a string as argument")}
if(html[tagName]!==undefined){throw _b_.ValueError.$factory("cannot reset class for "
+tagName)}
var klass=makeTagDict(tagName)
klass.$factory=makeFactory(klass)
html[tagName]=klass
return klass}
for(var tagName of tags){maketag(tagName)}
html.maketag=maketag
html.attribute_mapper=function(attr){return attr.replace(/_/g,'-')}
return html})(__BRYTHON__)}
modules['browser']=browser
$B.UndefinedClass=$B.make_class("Undefined",function(){return $B.Undefined}
)
$B.UndefinedClass.__mro__=[_b_.object]
$B.UndefinedClass.__bool__=function(self){return false}
$B.UndefinedClass.__repr__=$B.UndefinedClass.__str__=function(self){return "<Javascript undefined>"}
$B.Undefined={__class__:$B.UndefinedClass}
$B.set_func_names($B.UndefinedClass,"javascript")
var super_class=$B.make_class("JavascriptSuper",function(){
var b_super=_b_.super.$factory(),b_self=b_super.__self_class__,proto=Object.getPrototypeOf(b_self),parent=proto.constructor.$parent
var factory=function(){var p=parent.bind(b_self),res
if(parent.toString().startsWith("class")){res=new p(...arguments)}else{res=p(...arguments)}
for(key in res){b_self[key]=res[key]}
return res}
return{
__class__:super_class,__init__:factory,__self_class__:b_self}}
)
super_class.__getattribute__=function(self,attr){if(attr=="__init__" ||attr=="__call__"){return self.__init__}
return $B.$getattr(self.__self_class__,attr)}
$B.set_func_names(super_class,"javascript")
modules['javascript']={"this":function(){
if($B.js_this===undefined){return $B.builtins.None}
return $B.JSObj.$factory($B.js_this)},"Date":self.Date && $B.JSObj.$factory(self.Date),"extends":function(js_constr){return function(obj){if(obj.$is_class){var factory=function(){var init=$B.$getattr(obj,"__init__",_b_.None)
if(init !==_b_.None){init.bind(this,this).apply(this,arguments)}
return this}
factory.prototype=Object.create(js_constr.prototype)
factory.prototype.constructor=factory
factory.$parent=js_constr.$js_func
factory.$is_class=true 
factory.$infos=obj.$infos
for(var key in obj){if(typeof obj[key]=="function"){factory.prototype[key]=(function(x){return function(){
return obj[x].bind(this,this).apply(this,arguments)}})(key)}}
return factory}}},import_js:function(url,name){
var xhr=new XMLHttpRequest(),result
xhr.open('GET',url,false)
xhr.onreadystatechange=function(){if(this.readyState==4){if(this.status==200){eval(this.responseText)
if(typeof $module !=='undefined'){result=$B.module.$factory(name)
for(var key in $module){result[key]=$B.jsobj2pyobj($module[key])}
result.__file__=url}else{result=_b_.ImportError.$factory('Javascript '+
`module at ${url} doesn't define $module`)}}else{result=_b_.ModuleNotFoundError.$factory(name)}}}
xhr.send()
if(_b_.isinstance(result,_b_.BaseException)){$B.handle_error(result)}else{$B.imported[name]=result}},JSObject:$B.JSObj,JSON:{__class__:$B.make_class("JSON"),parse:function(){return $B.structuredclone2pyobj(
JSON.parse.apply(this,arguments))},stringify:function(obj,replacer,space){return JSON.stringify($B.pyobj2structuredclone(obj,false),$B.JSObj.$factory(replacer),space)}},jsobj2pyobj:function(obj){return $B.jsobj2pyobj(obj)},load:function(script_url){console.log('"javascript.load" is deprecrated. '+
'Use browser.load instead.')
var file_obj=$B.builtins.open(script_url)
var content=$B.$getattr(file_obj,'read')()
eval(content)},"Math":self.Math && $B.JSObj.$factory(self.Math),NULL:null,"Number":self.Number && $B.JSObj.$factory(self.Number),py2js:function(src,module_name){console.log('javascript.py2js',src,module_name)
if(module_name===undefined){module_name='__main__'+$B.UUID()}
var js=$B.py2js(src,module_name,module_name,$B.builtins_scope).to_js()
return $B.format_indent(js,0)},pyobj2jsobj:function(obj){return $B.pyobj2jsobj(obj)},"RegExp":self.RegExp && $B.JSObj.$factory(self.RegExp),"String":self.String && $B.JSObj.$factory(self.String),"super":super_class,UNDEFINED:$B.Undefined,UndefinedType:$B.UndefinedClass}
var arraybuffers=["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array"]
arraybuffers.forEach(function(ab){if(self[ab]!==undefined){modules['javascript'][ab]=$B.JSObj.$factory(self[ab])}})
var _b_=$B.builtins
modules['_sys']={
Getframe :function(){var $=$B.args("_getframe",1,{depth:null},['depth'],arguments,{depth:0},null,null),depth=$.depth
return $B._frame.$factory($B.frames_stack,$B.frames_stack.length-depth-1)},breakpointhook:function(){var hookname=$B.$options.breakpoint,modname,dot,funcname,hook
if(hookname===undefined){hookname="pdb.set_trace"}
[modname,dot,funcname]=_b_.str.rpartition(hookname,'.')
if(dot==""){modname="builtins"}
try{$B.$import(modname)
hook=$B.$getattr($B.imported[modname],funcname)}catch(err){console.warn("cannot import breakpoint",hookname)
return _b_.None}
return $B.$call(hook).apply(null,arguments)},exc_info:function(){for(var i=$B.frames_stack.length-1;i >=0;i--){var frame=$B.frames_stack[i],exc=frame[1].$current_exception
if(exc){return _b_.tuple.$factory([exc.__class__,exc,$B.$getattr(exc,"__traceback__")])}}
return _b_.tuple.$factory([_b_.None,_b_.None,_b_.None])},excepthook:function(exc_class,exc_value,traceback){$B.handle_error(exc_value)},gettrace:function(){return $B.tracefunc ||_b_.None},max_string_length:$B.max_string_length,
modules:_b_.property.$factory(
function(){return $B.obj_dict($B.imported)},function(self,value){throw _b_.TypeError.$factory("Read only property 'sys.modules'")}
),path:_b_.property.$factory(
function(){return $B.path},function(self,value){$B.path=value;}
),meta_path:_b_.property.$factory(
function(){return $B.meta_path},function(self,value){$B.meta_path=value}
),path_hooks:_b_.property.$factory(
function(){return $B.path_hooks},function(self,value){$B.path_hooks=value}
),path_importer_cache:_b_.property.$factory(
function(){return _b_.dict.$factory($B.JSObj.$factory($B.path_importer_cache))},function(self,value){throw _b_.TypeError.$factory("Read only property"+
" 'sys.path_importer_cache'")}
),settrace:function(){var $=$B.args("settrace",1,{tracefunc:null},['tracefunc'],arguments,{},null,null)
$B.tracefunc=$.tracefunc
$B.last($B.frames_stack)[1].$f_trace=$B.tracefunc
$B.tracefunc.$current_frame_id=$B.last($B.frames_stack)[0]
return _b_.None},stderr:_b_.property.$factory(
function(){return $B.stderr},function(self,value){$B.stderr=value}
),stdout:_b_.property.$factory(
function(){return $B.stdout},function(self,value){$B.stdout=value}
),stdin:_b_.property.$factory(
function(){return $B.stdin},function(self,value){$B.stdin=value}
),vfs:_b_.property.$factory(
function(){if($B.hasOwnProperty("VFS")){return $B.obj_dict($B.VFS)}else{return _b_.None}},function(){throw _b_.TypeError.$factory("Read only property 'sys.vfs'")}
)}
modules._sys.__breakpointhook__=modules._sys.breakpointhook
var WarningMessage=$B.make_class("WarningMessage",function(){var $=$B.make_args("WarningMessage",8,{message:null,category:null,filename:null,lineno:null,file:null,line:null,source:null},['message','category','filename','lineno','file','line','source'],arguments,{file:_b_.None,line:_b_.None,source:_b_.None},null,null)
return{
__class__:WarningMessage,message:$.message,category:$.category,filename:$.filename,lineno:$.lineno,file:$.file,line:$.line,source:$.source,_category_name:_b_.bool.$factory($.category)?
$B.$getattr($.category,"__name__"):_b_.None}}
)
modules._warnings={_defaultaction:"default",_filters_mutated:function(){},_onceregistry:$B.empty_dict(),filters:[$B.fast_tuple(['default',_b_.None,_b_.DeprecationWarning,'__main__',0]),$B.fast_tuple(['ignore',_b_.None,_b_.DeprecationWarning,_b_.None,0]),$B.fast_tuple(['ignore',_b_.None,_b_.PendingDeprecationWarning,_b_.None,0]),$B.fast_tuple(['ignore',_b_.None,_b_.ImportWarning,_b_.None,0]),$B.fast_tuple(['ignore',_b_.None,_b_.ResourceWarning,_b_.None,0])
],warn:function(message){
var filters
if($B.imported.warnings){filters=$B.imported.warnings.filters}else{filters=modules._warnings.filters}
if(filters[0][0]=='error'){var syntax_error=_b_.SyntaxError.$factory(message.args[0])
syntax_error.args[1]=[message.filename,message.lineno,message.offset,message.line]
syntax_error.filename=message.filename
syntax_error.lineno=message.lineno
syntax_error.offset=message.offset
syntax_error.line=message.line
throw syntax_error}
var frame=$B.imported._sys.Getframe(),category=message.__class__ ||$B.get_class(message),warning_message={__class__:WarningMessage,message:message,category,filename:message.filename ||frame.f_code.co_filename,lineno:message.lineno ||frame.f_lineno,file:_b_.None,line:_b_.None,source:_b_.None,_category_name:category.__name__}
if($B.imported.warnings){$B.imported.warnings._showwarnmsg_impl(warning_message)}else{var trace=$B.class_name(message)+': '+message.args[0]
$B.$getattr($B.stderr,'write')(trace+'\n')
var flush=$B.$getattr($B.stderr,'flush',_b_.None)
if(flush !==_b_.None){flush()}}},warn_explicit:function(){
console.log("warn_explicit",arguments)}}
function load(name,module_obj){
module_obj.__class__=$B.module
module_obj.__name__=name
$B.imported[name]=module_obj
for(var attr in module_obj){if(typeof module_obj[attr]=='function'){module_obj[attr].$infos={__module__:name,__name__:attr,__qualname__:name+'.'+attr}}}}
for(var attr in modules){load(attr,modules[attr])}
if(!($B.isWebWorker ||$B.isNode)){modules['browser'].html=modules['browser.html']}
var _b_=$B.builtins
_b_.__builtins__=$B.module.$factory('__builtins__','Python builtins')
for(var attr in _b_){_b_.__builtins__[attr]=_b_[attr]
$B.builtins_scope.binding[attr]=true
if(_b_[attr].$is_class){if(_b_[attr].__bases__){_b_[attr].__bases__.__class__=_b_.tuple}else{_b_[attr].__bases__=$B.fast_tuple([_b_.object])}}}
_b_.__builtins__.__setattr__=function(attr,value){_b_[attr]=value}
$B.method_descriptor.__getattribute__=$B.Function.__getattribute__
$B.wrapper_descriptor.__getattribute__=$B.Function.__getattribute__
for(var name in _b_){if(_b_[name].__class__===_b_.type){$B.builtin_classes.push(_b_[name])
for(var key in _b_[name]){var value=_b_[name][key]
if(value===undefined){continue}
else if(value.__class__){continue}
else if(typeof value !="function"){continue}
else if(key=="__new__"){value.__class__=$B.builtin_function}else if(key.startsWith("__")){value.__class__=$B.wrapper_descriptor}else{value.__class__=$B.method_descriptor}
value.__objclass__=_b_[name]}}}
for(var attr in $B){if(Array.isArray($B[attr])){$B[attr].__class__=_b_.list}}
$B.cell=$B.make_class("cell",function(value){return{
__class__:$B.cell,$cell_contents:value}}
)
$B.cell.cell_contents=$B.$call(_b_.property)(
function(self){if(self.$cell_contents===null){throw _b_.ValueError.$factory("empty cell")}
return self.$cell_contents},function(self,value){self.$cell_contents=value}
)
var $comps=Object.values($B.$comps).concat(["eq","ne"])
$comps.forEach(function(comp){var op="__"+comp+"__"
$B.cell[op]=(function(op){return function(self,other){if(! _b_.isinstance(other,$B.cell)){return _b_.NotImplemented}
if(self.$cell_contents===null){if(other.$cell_contents===null){return op=="__eq__"}else{return["__ne__","__lt__","__le__"].indexOf(op)>-1}}else if(other.$cell_contents===null){return["__ne__","__gt__","__ge__"].indexOf(op)>-1}
return $B.rich_comp(op,self.$cell_contents,other.$cell_contents)}})(op)})
$B.set_func_names($B.cell,"builtins")
$B.AST={__class__:_b_.type,__Xgetattr__:function(self,attr){if(self.js_node===undefined){console.log('AST __getattr__',attr,self)}
var res=self.js_node[attr]
if(res===undefined){throw $B.attr_error(attr,self)}
return $B.AST.$convert(res)},__mro__:[_b_.object],$infos:{__qualname__:'AST',__name__:'AST'},$is_class:true,$convert:function(js_node){if(js_node===undefined){return _b_.None}
var constr=js_node.constructor
if(constr && constr.$name){$B.create_python_ast_classes()
return $B.python_ast_classes[constr.$name].$factory(js_node)}else if(Array.isArray(js_node)){return js_node.map($B.AST.$convert)}else if(js_node.type){
switch(js_node.type){case 'int':
var res=parseInt(js_node.value[1],js_node.value[0])
if(res < $B.min_int ||res > $B.max_int){var res=$B.long_int.$factory(js_node.value[1],js_node.value[0])
if(js_node.sign=='-'){res.pos=false}
return res}
return js_node.sign=='-' ?-res :res
case 'float':
return new Number(js_node.value)
case 'imaginary':
return $B.make_complex(0,$B.AST.$convert(js_node.value))
case 'ellipsis':
return _b_.Ellipsis
case 'str':
if(js_node.is_bytes){return _b_.bytes.$factory(js_node.value,'latin-1')}
return js_node.value
case 'id':
if(['False','None','True'].indexOf(js_node.value)>-1){return _b_[js_node.value]}
break}}else if(['string','number'].indexOf(typeof js_node)>-1){return js_node}else if(js_node.$name){
return js_node.$name+'()'}else if([_b_.None,_b_.True,_b_.False].indexOf(js_node)>-1){return js_node}else if(js_node.__class__){return js_node}else{console.log('cannot handle',js_node)
return js_node}}}})(__BRYTHON__)
;
;(function($B){var _b_=$B.builtins
var coroutine=$B.coroutine=$B.make_class("coroutine")
coroutine.close=function(self){}
coroutine.send=function(self){return self.$func.apply(null,self.$args)}
coroutine.__repr__=coroutine.__str__=function(self){if(self.$func.$infos){return "<coroutine "+self.$func.$infos.__name__+">"}else{return "<coroutine object>"}}
$B.set_func_names(coroutine,"builtins")
$B.make_async=func=>{
if(func.$is_genfunc){return func}
var f=function(){var args=arguments,stack=$B.deep_copy($B.frames_stack)
return{
__class__:coroutine,$args:args,$func:func,$stack:stack}}
f.$infos=func.$infos
return f}
$B.promise=function(obj){if(obj.__class__===coroutine){return coroutine.send(obj)}
if(typeof obj=="function"){return obj()}
return obj}})(__BRYTHON__)
;
(function($B){var _b_=$B.builtins
function compiler_error(ast_obj,message){
var exc=_b_.SyntaxError.$factory(message)
exc.filename=state.filename
if(exc.filename !='<string>'){var src=$B.file_cache[exc.filename],lines=src.split('\n'),line=lines[ast_obj.lineno-1]
exc.text=line}else{exc.text=_b_.none}
exc.lineno=ast_obj.lineno
exc.offset=ast_obj.col_offset
exc.end_lineno=ast_obj.end_lineno
exc.end_offset=ast_obj.end_col_offset
exc.args[1]=[exc.filename,exc.lineno,exc.offset,exc.text,exc.end_lineno,exc.end_offset]
throw exc}
$B.set_func_infos=function(func,name,qualname,docstring){func.$is_func=true}
function copy_position(target,origin){target.lineno=origin.lineno
target.col_offset=origin.col_offset
target.end_lineno=origin.end_lineno
target.end_col_offset=origin.end_col_offset}
function last_scope(scopes){var ix=scopes.length-1
while(scopes[ix].parent){ix--}
return scopes[ix]}
function Scope(name,type,ast){this.name=name
this.locals=new Set()
this.globals=new Set()
this.nonlocals=new Set()
this.freevars=new Set()
this.type=type
this.ast=ast}
function copy_scope(scope,ast,id){
var new_scope=new Scope(scope.name,scope.type,ast)
if(id !==undefined){
new_scope.id=id}
new_scope.parent=scope
return new_scope}
function make_local(module_id){return `locals_${module_id.replace(/\./g, '_')}`}
function qualified_scope_name(scopes,scope){
if(scope !==undefined && !(scope instanceof Scope)){console.log('bizarre',scope)
throw Error('scope étrange')}
var _scopes
if(! scope){_scopes=scopes.slice()}else{var ix=scopes.indexOf(scope)
if(ix >-1){_scopes=scopes.slice(0,ix+1)}else{_scopes=scopes.concat(scope)}}
var names=[]
for(var _scope of _scopes){if(! _scope.parent){names.push(_scope.name)}}
return names.join('_').replace(/\./g,'_')}
function make_scope_name(scopes,scope){
if(scope===builtins_scope){return `_b_`}
return 'locals_'+qualified_scope_name(scopes,scope)}
function make_search_namespaces(scopes){var namespaces=[]
for(var scope of scopes.slice().reverse()){if(scope.parent ||scope.type=='class'){continue}else if(scope.is_exec_scope){namespaces.push('$B.exec_scope')}
namespaces.push(make_scope_name(scopes,scope))}
namespaces.push('_b_')
return namespaces}
function mangle(scopes,scope,name){if(name.startsWith('__')&& ! name.endsWith('__')){var ix=scopes.indexOf(scope)
while(ix >=0){if(scopes[ix].ast instanceof $B.ast.ClassDef){var scope_name=scopes[ix].name
while(scope_name.length > 0 && scope_name.startsWith('_')){scope_name=scope_name.substr(1)}
if(scope_name.length==0){
return name}
return '_'+scope_name+name}
ix--}}
return name}
function reference(scopes,scope,name){return make_scope_name(scopes,scope)+'.'+mangle(scopes,scope,name)}
function bind(name,scopes){var scope=$B.last(scopes),up_scope=last_scope(scopes)
name=mangle(scopes,up_scope,name)
if(up_scope.globals && up_scope.globals.has(name)){scope=scopes[0]}else if(up_scope.nonlocals.has(name)){for(var i=scopes.indexOf(up_scope)-1;i >=0;i--){if(scopes[i].locals.has(name)){return scopes[i]}}}
scope.locals.add(name)
return scope}
var CELL=5,FREE=4,LOCAL=1,GLOBAL_EXPLICIT=2,GLOBAL_IMPLICIT=3,SCOPE_MASK=15,SCOPE_OFF=11
var TYPE_CLASS=1,TYPE_FUNCTION=0,TYPE_MODULE=2
var DEF_GLOBAL=1,
DEF_LOCAL=2 ,
DEF_PARAM=2<<1,
DEF_NONLOCAL=2<<2,
USE=2<<3 ,
DEF_FREE=2<<4 ,
DEF_FREE_CLASS=2<<5,
DEF_IMPORT=2<<6,
DEF_ANNOT=2<<7,
DEF_COMP_ITER=2<<8 
function name_reference(name,scopes){var scope=name_scope(name,scopes)
return make_ref(name,scopes,scope)}
function make_ref(name,scopes,scope){if(scope.found){return reference(scopes,scope.found,name)}else if(scope.resolve=='all'){var scope_names=make_search_namespaces(scopes)
return `$B.resolve_in_scopes('${name}', [${scope_names}])`}else if(scope.resolve=='local'){return `$B.resolve_local('${name}')`}else if(scope.resolve=='global'){return `$B.resolve_global('${name}')`}else if(Array.isArray(scope.resolve)){return `$B.resolve_in_scopes('${name}', [${scope.resolve}])`}}
function local_scope(name,scope){
var s=scope
while(true){if(s.locals.has(name)){return{found:true,scope:s}}
if(! s.parent){return{found:false}}
s=s.parent}}
function name_scope(name,scopes){
var test=false 
if(test){console.log('name scope',name,scopes)
alert()}
var flags,block
if(scopes.length==0){
return{found:false,resolve:'all'}}
var scope=$B.last(scopes),up_scope=last_scope(scopes),name=mangle(scopes,scope,name)
if(up_scope.ast===undefined){console.log('no ast',scope)}
block=scopes.symtable.table.blocks.get(_b_.id(up_scope.ast))
if(block===undefined){console.log('no block',scope,scope.ast,'id',_b_.id(up_scope.ast))
console.log('scopes',scopes.slice())
console.log('symtable',scopes.symtable)}
try{flags=block.symbols.$string_dict[name][0]}catch(err){console.log('name',name,'not in symbols of block',block)
return{found:false,resolve:'all'}}
var __scope=(flags >> SCOPE_OFF)& SCOPE_MASK,is_local=[LOCAL,CELL].indexOf(__scope)>-1
if(test){console.log('block',block,'is local',is_local)}
if(name=='__annotations__'){if(block.type==TYPE_CLASS && up_scope.has_annotation){is_local=true}else if(block.type==TYPE_MODULE){is_local=true}}
if(is_local){
var l_scope=local_scope(name,scope)
if(! l_scope.found){if(block.type==TYPE_CLASS){
return{found:false,resolve:'global'}}else if(block.type==TYPE_MODULE){return{found:false,resolve:'global'}}
return{found:false,resolve:'local'}}else{return{found:l_scope.scope}}}else if(scope.globals.has(name)){var global_scope=scopes[0]
if(global_scope.locals.has(name)){return{found:global_scope}}
return{found:false,resolve:'global'}}else if(scope.nonlocals.has(name)){
for(var i=scopes.length-2;i >=0;i--){block=scopes.symtable.table.blocks.get(_b_.id(scopes[i].ast))
if(block && block.symbols.$string_dict[name]){return{found:scopes[i]}}}}
if(scope.has_import_star){return{found:false,resolve:is_local ? 'all' :'global'}}
for(var i=scopes.length-2;i >=0;i--){block=undefined
if(scopes[i].ast){block=scopes.symtable.table.blocks.get(_b_.id(scopes[i].ast))}
if(scopes[i].globals.has(name)){return{found:false,resolve:'global'}}
if(scopes[i].locals.has(name)&& scopes[i].type !='class'){return{found:scopes[i]}}else if(block && block.symbols.$string_dict[name]){flags=block.symbols.$string_dict[name][0]
var __scope=(flags >> SCOPE_OFF)& SCOPE_MASK
if([LOCAL,CELL].indexOf(__scope)>-1){
return{found:false,resolve:'all'}}}
if(scopes[i].has_import_star){return{found:false,resolve:'all'}}}
if(builtins_scope.locals.has(name)){return{found:builtins_scope}}
var scope_names=make_search_namespaces(scopes)
return{found:false,resolve:scope_names}}
function resolve_in_namespace(name,ns){if(! ns.hasOwnProperty){if(ns[name]!==undefined){return{found:true,value:ns[name]}}}else if(ns.hasOwnProperty(name)){return{found:true,value:ns[name]}}else if(ns.$dict){try{return{found:true,value:ns.$getitem(ns.$dict,name)}}catch(err){if(ns.$missing){try{return{
found:true,value:$B.$call(ns.$missing)(ns.$dict,name)}}catch(err){if(! $B.$is_exc(err,[_b_.KeyError])){throw err}}}}}
return{found:false}}
$B.resolve=function(name){if(name=='tzinfo'){console.log('resolve tzinfo',name,$B.frames_stack.slice())}
var checked=new Set(),current_globals
for(var frame of $B.frames_stack.slice().reverse()){if(current_globals===undefined){current_globals=frame[3]}else if(frame[3]!==current_globals){var v=resolve_in_namespace(name,current_globals)
if(v.found){return v.value}
checked.add(current_globals)
current_globals=frame[3]}
var v=resolve_in_namespace(name,frame[1])
if(v.found){return v.value}}
if(! checked.has(frame[3])){var v=resolve_in_namespace(name,frame[3])
if(v.found){return v.value}}
if(builtins_scope.locals.has(name)){return _b_[name]}
throw $B.name_error(name)}
$B.resolve_local=function(name){
var frame=$B.last($B.frames_stack)
if(frame===undefined){console.log('pas de frame, name',name)}
if(frame[1].hasOwnProperty){if(frame[1].hasOwnProperty(name)){return frame[1][name]}}else{var value=frame[1][name]
if(value !==undefined){return value}}
throw _b_.UnboundLocalError.$factory(`local variable '${name}' `+
'referenced before assignment')}
$B.resolve_in_scopes=function(name,namespaces){for(var ns of namespaces){if(ns===$B.exec_scope){var exec_top
for(var frame of $B.frames_stack.slice().reverse()){if(frame.is_exec_top){exec_top=frame
break}}
if(exec_top){for(var ns of[exec_top[1],exec_top[3]]){var v=resolve_in_namespace(name,ns)
if(v.found){return v.value}}}}else{var v=resolve_in_namespace(name,ns)
if(v.found){return v.value}}}
throw $B.name_error(name)}
$B.resolve_global=function(name){
for(var frame of $B.frames_stack.slice().reverse()){var v=resolve_in_namespace(name,frame[3])
if(v.found){return v.value}
if(frame.is_exec_top){break}}
if(builtins_scope.locals.has(name)){return _b_[name]}
throw _b_.NameError.$factory(name)}
var $operators=$B.op2method.subset("all")
var opname2opsign={}
for(var key in $operators){opname2opsign[$operators[key]]=key}
var opclass2dunder={}
for(var op_type of $B.op_types){
for(var operator in op_type){opclass2dunder[op_type[operator]]='__'+$operators[operator]+'__'}}
opclass2dunder['UAdd']='__pos__'
opclass2dunder['USub']='__neg__'
opclass2dunder['Invert']='__invert__'
var builtins_scope=new Scope("__builtins__")
for(var name in $B.builtins){builtins_scope.locals.add(name)}
function mark_parents(node){if(node.body && node.body instanceof Array){for(var child of node.body){child.$parent=node
mark_parents(child)}}else if(node.handlers){
var p={$parent:node,'type':'except_handler'}
for(var child of node.handlers){child.$parent=p
mark_parents(child)}}}
function add_body(body,scopes){var res=''
for(var item of body){js=$B.js_from_ast(item,scopes)
if(js.length > 0){res+=js+'\n'}}
return res.trimRight()}
function init_comprehension(comp){
var comp_id=comp.type+'_'+comp.id,varnames=Object.keys(comp.varnames ||{}).map(x=> `'${x}'`).join(', ')
return `var ${comp.locals_name} = {},\n`+
`locals = ${comp.locals_name}\n`+
`locals.$lineno = ${comp.ast.lineno}\n`+
`locals.$comp_code = {\n`+
`co_argcount: 1,\n`+
`co_firstlineno:${comp.ast.lineno},\n`+
`co_name: "<${comp.type}>",\n`+
`co_flags: ${comp.type == 'genexpr' ? 115 : 83},\n`+
`co_freevars: $B.fast_tuple([]),\n`+
`co_kwonlyargcount: 0,\n`+
`co_posonlyargount: 0,\n`+
`co_varnames: $B.fast_tuple(['.0', ${varnames}])\n`+
`}\n`+
`locals['.0'] = expr\n`+
`var top_frame = ["<${comp.type.toLowerCase()}>", ${comp.locals_name}, `+
`"${comp.module_name}", ${comp.globals_name}]\n`+
`locals.$f_trace = $B.enter_frame(top_frame)\n`}
function make_comp(scopes){
var id=$B.UUID(),type=this.constructor.$name,symtable_block=scopes.symtable.table.blocks.get(_b_.id(this)),varnames=symtable_block.varnames.map(x=> `"${x}"`)
var first_for=this.generators[0],
outmost_expr=$B.js_from_ast(first_for.iter,scopes),nb_paren=1
var comp_scope=new Scope(`${type}_${id}`,'comprehension',this)
scopes.push(comp_scope)
var comp={ast:this,id,type,varnames,module_name:scopes[0].name,locals_name:make_scope_name(scopes),globals_name:make_scope_name(scopes,scopes[0])}
var js=init_comprehension(comp)
if(this instanceof $B.ast.ListComp){js+=`var result_${id} = []\n`}else if(this instanceof $B.ast.SetComp){js+=`var result_${id} = _b_.set.$factory()\n`}else if(this instanceof $B.ast.DictComp){js+=`var result_${id} = $B.empty_dict()\n`}
var first=this.generators[0]
js+=`var next_func_${id} = $B.next_of(expr)\n`+
`while(true){\ntry{\nvar next_${id} = next_func_${id}()\n`+
`}catch(err){\nif($B.is_exc(err, [_b_.StopIteration])){\n`+
`break\n}else{\n$B.leave_frame({locals, value: _b_.None})\n `+
`throw err\n}\n}\n`
var name=new $B.ast.Name(`next_${id}`,new $B.ast.Load())
copy_position(name,first_for.iter)
name.to_js=function(){return `next_${id}`}
var assign=new $B.ast.Assign([first.target],name)
assign.lineno=this.lineno
js+=assign.to_js(scopes)+'\n'
for(var _if of first.ifs){nb_paren++
js+=`if($B.$bool(${$B.js_from_ast(_if, scopes)})){\n`}
for(var comprehension of this.generators.slice(1)){js+=comprehension.to_js(scopes)
nb_paren++
for(var _if of comprehension.ifs){nb_paren++}}
if(this instanceof $B.ast.DictComp){var key=$B.js_from_ast(this.key,scopes),value=$B.js_from_ast(this.value,scopes)}else{var elt=$B.js_from_ast(this.elt,scopes)}
var has_await=comp_scope.has_await
js=`(${has_await ? 'async ' : ''}function(expr){\n`+js
js+=has_await ? 'var save_stack = $B.save_stack();\n' :''
js+=`try{\n`
if(this instanceof $B.ast.ListComp){js+=`result_${id}.push(${elt})\n`}else if(this instanceof $B.ast.SetComp){js+=`_b_.set.add(result_${id}, ${elt})\n`}else if(this instanceof $B.ast.DictComp){js+=`_b_.dict.$setitem(result_${id}, ${key}, ${value})\n`}
js+=`}catch(err){\n`+
(has_await ? '$B.restore_stack(save_stack, locals)\n' :'')+
`$B.leave_frame(locals)\nthrow err\n}`+
(has_await ? '\n$B.restore_stack(save_stack, locals);' :'')
for(var i=0;i < nb_paren;i++){js+='}\n'}
js+=`\n$B.leave_frame({locals, value: _b_.None})`
js+=`\nreturn result_${id}`
js+=`\n}\n)(${outmost_expr})\n`
scopes.pop()
return js}
var exec_num={value:0}
function init_scopes(type,scopes){
var filename=scopes.symtable.table.filename,name=$B.url2name[filename]
if(name){name=name.replace(/-/g,'_')}else if(filename.startsWith('<')&& filename.endsWith('>')){name='exec'}
var top_scope=new Scope(name,`${type}`,this),block=scopes.symtable.table.blocks.get(_b_.id(this))
if(block && block.$has_import_star){top_scope.has_import_star=true}
scopes.push(top_scope)
var namespaces=scopes.namespaces
if(namespaces){top_scope.is_exec_scope=true
for(var key in namespaces.exec_globals){if(! key.startsWith('$')){top_scope.globals.add(key)}}
if(namespaces.exec_locals !==namespaces.exec_globals){for(var key in namespaces.exec_locals){if(! key.startsWith('$')){top_scope.locals.add(key)}}}}
return name}
function compiler_check(obj){var check_func=Object.getPrototypeOf(obj)._check
if(check_func){obj._check()}}
$B.ast.Assert.prototype.to_js=function(scopes){var test=$B.js_from_ast(this.test,scopes),msg=this.msg ? $B.js_from_ast(this.msg,scopes):''
return `if($B.set_lineno(locals, ${this.lineno}) && !$B.$bool(${test})){\n`+
`throw _b_.AssertionError.$factory(${msg})}\n`}
var CO_FUTURE_ANNOTATIONS=0x1000000
function annotation_to_str(obj){var s
if(obj instanceof $B.ast.Name){s=obj.id}else if(obj instanceof $B.ast.BinOp){s=annotation_to_str(obj.left)+'|'+annotation_to_str(obj.right)}else if(obj instanceof $B.ast.Subscript){s=annotation_to_str(obj.value)+'['+
annotation_to_str(obj.slice)+']'}else if(obj instanceof $B.ast.Constant){if(obj.value===_b_.None){s='None'}else{console.log('other constant',obj)}}else{console.log('other annotation',obj)}
return s}
$B.ast.AnnAssign.prototype.to_js=function(scopes){var postpone_annotation=scopes.symtable.table.future.features &
CO_FUTURE_ANNOTATIONS
var scope=last_scope(scopes)
var js=''
if(! scope.has_annotation){js+='locals.__annotations__ = $B.empty_dict()\n'}
scope.has_annotation=true
if(this.target instanceof $B.ast.Name){var ann_value=postpone_annotation ?
`'${annotation_to_str(this.annotation)}'` :
$B.js_from_ast(this.annotation,scopes)}
if(this.value){js+=`var ann = ${$B.js_from_ast(this.value, scopes)}\n`
if(this.target instanceof $B.ast.Name){
var scope=bind(this.target.id,scopes)
js+=`$B.$setitem(locals.__annotations__, `+
`'${this.target.id}', ${ann_value})\n`
var target_ref=name_reference(this.target.id,scopes)
js+=`${target_ref} = ann`}else if(this.target instanceof $B.ast.Attribute){js+=`$B.$setattr(${$B.js_from_ast(this.target.value, scopes)}`+
`, "${this.target.attr}", ann)`}else if(this.target instanceof $B.ast.Subscript){js+=`$B.$setitem(${$B.js_from_ast(this.target.value, scopes)}`+
`, ${$B.js_from_ast(this.target.slice, scopes)}, ann)`}}else{if(this.target instanceof $B.ast.Name){var ann=`'${this.annotation.id}'`
js+=`$B.$setitem(locals.__annotations__, `+
`'${this.target.id}', ${ann_value})`}else{var ann=$B.js_from_ast(this.annotation,scopes)}}
return `$B.set_lineno(locals, ${this.lineno})\n`+js}
$B.ast.Assign.prototype.to_js=function(scopes){compiler_check(this)
var js=this.lineno ? `$B.set_lineno(locals, ${this.lineno})\n` :'',value=$B.js_from_ast(this.value,scopes)
function assign_one(target,value){if(target instanceof $B.ast.Name){return $B.js_from_ast(target,scopes)+' = '+value}else if(target instanceof $B.ast.Starred){return assign_one(target.value,value)}else if(target instanceof $B.ast.Subscript){return `$B.$setitem(${$B.js_from_ast(target.value, scopes)}`+
`, ${$B.js_from_ast(target.slice, scopes)}, ${value})`}else if(target instanceof $B.ast.Attribute){var attr=mangle(scopes,last_scope(scopes),target.attr)
return `$B.$setattr(${$B.js_from_ast(target.value, scopes)}`+
`, "${attr}", ${value})`}}
function assign_many(target,value){var js=''
var nb_targets=target.elts.length,has_starred=false,nb_after_starred
for(var i=0,len=nb_targets;i < len;i++){if(target.elts[i]instanceof $B.ast.Starred){has_starred=true
nb_after_starred=len-i-1
break}}
var id=$B.UUID()
js+=`var it_${id} = $B.unpacker(${value}, ${nb_targets}, `+
`${has_starred}`
if(nb_after_starred !==undefined){js+=`, ${nb_after_starred}`}
js+=`)\n`
var assigns=[]
for(var elt of target.elts){if(elt instanceof $B.ast.Starred){assigns.push(assign_one(elt,`it_${id}.read_rest()`))}else if(elt instanceof $B.ast.List ||
elt instanceof $B.ast.Tuple){assigns.push(assign_many(elt,`it_${id}.read_one()`))}else{assigns.push(assign_one(elt,`it_${id}.read_one()`))}}
js+=assigns.join('\n')
return js}
if(this.targets.length==1){var target=this.targets[0]
if(!(target instanceof $B.ast.Tuple)&&
!(target instanceof $B.ast.List)){return js+assign_one(target,value)}else{return js+assign_many(target,value)}}
var id='v'+$B.UUID()
js+=`var ${id} = ${value}\n`
for(var target of this.targets){js+=assign_one(target,id)+'\n'}
return js}
$B.ast.AsyncFor.prototype.to_js=function(scopes){compiler_check(this)
return $B.ast.For.prototype.to_js.bind(this)(scopes)}
$B.ast.AsyncFunctionDef.prototype.to_js=function(scopes){return $B.ast.FunctionDef.prototype.to_js.bind(this)(scopes)}
$B.ast.AsyncWith.prototype.to_js=function(scopes){
function bind_vars(vars,scopes){if(vars instanceof $B.ast.Name){bind(vars.id,scopes)}else if(vars instanceof $B.ast.Tuple){for(var var_item of vars.elts){bind_vars(var_item,scopes)}}}
function add_item(item,js){var id=$B.UUID()
var s=`var mgr_${id} = `+
$B.js_from_ast(item.context_expr,scopes)+',\n'+
`mgr_type_${id} = _b_.type.$factory(mgr_${id}),\n`+
`aexit_${id} = $B.$getattr(mgr_type_${id}, '__aexit__'),\n`+
`aenter_${id} = $B.$getattr(mgr_type_${id}, '__aenter__'),\n`+
`value_${id} = await $B.promise($B.$call(aenter_${id})(mgr_${id})),\n`+
`exc_${id} = true\n`
if(has_generator){
s+=`locals.$context_managers = locals.$context_managers || []\n`+
`locals.$context_managers.push(mgr_${id})\n`}
s+='try{\ntry{\n'
if(item.optional_vars){
var value={to_js:function(){return `value_${id}`}}
copy_position(value,_with)
var assign=new $B.ast.Assign([item.optional_vars],value)
copy_position(assign,_with)
s+=assign.to_js(scopes)+'\n'}
s+=js
s+=`}catch(err_${id}){\n`+
`locals.$lineno = ${lineno}\n`+
`exc_${id} = false\n`+
`err_${id} = $B.exception(err_${id}, true)\n`+
`var $b = await $B.promise(aexit_${id}(mgr_${id}, err_${id}.__class__, `+
`err_${id}, $B.$getattr(err_${id}, '__traceback__')))\n`+
`if(! $B.$bool($b)){\nthrow err_${id}\n}\n}\n`
s+=`}\nfinally{\n`+
`locals.$lineno = ${lineno}\n`+
`if(exc_${id}){\n`+
`await $B.promise(aexit_${id}(mgr_${id}, _b_.None, _b_.None, _b_.None))\n}\n}\n`
return s}
var _with=this,scope=last_scope(scopes),lineno=this.lineno
delete scope.is_generator
for(var item of this.items.slice().reverse()){if(item.optional_vars){bind_vars(item.optional_vars,scopes)}}
js=add_body(this.body,scopes)+'\n'
var has_generator=scope.is_generator
for(var item of this.items.slice().reverse()){js=add_item(item,js)}
return `$B.set_lineno(locals, ${this.lineno})\n`+js}
$B.ast.Attribute.prototype.to_js=function(scopes){var attr=mangle(scopes,last_scope(scopes),this.attr)
return `$B.$getattr(${$B.js_from_ast(this.value, scopes)}, `+
`'${attr}')`}
$B.ast.AugAssign.prototype.to_js=function(scopes){var js,op_class=this.op.$name ? this.op :this.op.constructor
for(var op in $B.op2ast_class){if($B.op2ast_class[op][1]===op_class){var iop=op+'='
break}}
var value=$B.js_from_ast(this.value,scopes)
if(this.target instanceof $B.ast.Name){var scope=name_scope(this.target.id,scopes)
if(! scope.found){
var left_scope=scope.resolve=='global' ?
make_scope_name(scopes,scopes[0]):'locals'
return `${left_scope}.${this.target.id} = $B.augm_assign(`+
make_ref(this.target.id,scopes,scope)+`, '${iop}', ${value})`}else{var ref=`${make_scope_name(scopes, scope.found)}.${this.target.id}`
if(op=='@' ||op=='//' ||op=='%'){js=`${ref} = $B.augm_assign(${ref}, '${iop}', ${value})`}else{js=ref+` = typeof ${ref} == "number" && `+
`$B.is_safe_int(locals.$result = ${ref} ${op} ${value}) ?\n`+
`locals.$result : $B.augm_assign(${ref}, '${iop}', ${value})`}}}else if(this.target instanceof $B.ast.Subscript){var op=opclass2dunder[this.op.constructor.$name]
js=`$B.$setitem((locals.$tg = ${this.target.value.to_js(scopes)}), `+
`(locals.$key = ${this.target.slice.to_js(scopes)}), `+
`$B.augm_assign($B.$getitem(locals.$tg, locals.$key), '${iop}', ${value}))`}else if(this.target instanceof $B.ast.Attribute){var op=opclass2dunder[this.op.constructor.$name]
js=`$B.$setattr((locals.$tg = ${this.target.value.to_js(scopes)}), `+
`'${this.target.attr}', $B.augm_assign(`+
`$B.$getattr(locals.$tg, '${this.target.attr}'), '${iop}', ${value}))`}else{var target=$B.js_from_ast(this.target,scopes),value=$B.js_from_ast(this.value,scopes)
js=`${target} = $B.augm_assign(${target}, '${iop}', ${value})`}
return `$B.set_lineno(locals, ${this.lineno})\n`+js}
$B.ast.Await.prototype.to_js=function(scopes){var ix=scopes.length-1
while(scopes[ix].parent){ix--}
scopes[ix].has_await=true
return `await $B.promise(${$B.js_from_ast(this.value, scopes)})`}
$B.ast.BinOp.prototype.to_js=function(scopes){
var name=this.op.$name ? this.op.$name :this.op.constructor.$name
var op=opclass2dunder[name]
return `$B.rich_op('${op}', ${$B.js_from_ast(this.left, scopes)}, `+
`${$B.js_from_ast(this.right, scopes)})`}
$B.ast.BoolOp.prototype.to_js=function(scopes){
var op=this.op instanceof $B.ast.And ? '! ' :''
var tests=[]
for(var i=0,len=this.values.length;i < len;i++){var value=this.values[i]
if(i < len-1){tests.push(`${op}$B.$bool(locals.$test = `+
`${$B.js_from_ast(value, scopes)}) ? locals.$test : `)}else{tests.push(`${$B.js_from_ast(value, scopes)}`)}}
return '('+tests.join('')+')'}
function in_loop(scopes){for(var scope of scopes.slice().reverse()){if(scope.ast instanceof $B.ast.For ||
scope.ast instanceof $B.ast.While){return true}}
return false}
$B.ast.Break.prototype.to_js=function(scopes){if(! in_loop(scopes)){compiler_error(this,"'break' outside loop")}
var js=''
for(var scope of scopes.slice().reverse()){if(scope.ast instanceof $B.ast.For){js+=`no_break_${scope.id} = false\n`
break}}
js+=`break`
return js}
$B.ast.Call.prototype.to_js=function(scopes){var kw_names=[]
for(var kw of this.keywords){if(kw.arg && kw_names.indexOf(kw.arg)>-1){compiler_error(kw,`keyword argument repeated: ${kw.arg}`)}else{kw_names.push(kw.arg)}}
var js='$B.$call('+$B.js_from_ast(this.func,scopes)+')'
var args=make_args.bind(this)(scopes)
return js+(args.has_starred ? `.apply(null, ${args.js})` :
`(${args.js})`)}
function make_args(scopes){var js='',named_args=[],named_kwargs=[],starred_kwargs=[],has_starred=false
for(var arg of this.args){if(arg instanceof $B.ast.Starred){arg.$handled=true
has_starred=true}else{named_args.push($B.js_from_ast(arg,scopes))}}
for(var keyword of this.keywords){if(keyword.arg){named_kwargs.push(
`${keyword.arg}: ${$B.js_from_ast(keyword.value, scopes)}`)}else{
starred_kwargs.push($B.js_from_ast(keyword.value,scopes))}}
var args=''
named_args=named_args.join(', ')
if(! has_starred){args+=`${named_args}`}else{var start=true,not_starred=[]
for(var arg of this.args){if(arg instanceof $B.ast.Starred){if(not_starred.length > 0){var arg_list=not_starred.map(x=> $B.js_from_ast(x,scopes))
if(start){args+=`[${arg_list.join(', ')}]`}else{args+=`.concat([${arg_list.join(', ')}])`}
not_starred=[]}else if(args==''){args='[]'}
var starred_arg=$B.js_from_ast(arg.value,scopes)
args+=`.concat(_b_.list.$factory(${starred_arg}))`
start=false}else{not_starred.push(arg)}}
if(not_starred.length > 0){var arg_list=not_starred.map(x=> $B.js_from_ast(x,scopes))
if(start){args+=`[${arg_list.join(', ')}]`
start=false}else{args+=`.concat([${arg_list.join(', ')}])`}}
if(args[0]=='.'){console.log('bizarre',args)}}
if(named_kwargs.length+starred_kwargs.length==0){return{has_starred,js:js+`${args}`}}else{var kw=`{${named_kwargs.join(', ')}}`
for(var starred_kwarg of starred_kwargs){kw+=`, ${starred_kwarg}`}
kw=`{$nat: 'kw', kw:[${kw}]}`
if(args.length > 0){if(has_starred){kw=`.concat([${kw}])`}else{kw=', '+kw}}
return{has_starred,js:js+`${args}${kw}`}}}
$B.ast.ClassDef.prototype.to_js=function(scopes){var enclosing_scope=bind(this.name,scopes)
var class_scope=new Scope(this.name,'class',this)
var js=`$B.set_lineno(locals, ${this.lineno})\n`,locals_name=make_scope_name(scopes,class_scope),ref=this.name+$B.UUID(),glob=scopes[0].name,globals_name=make_scope_name(scopes,scopes[0]),decorators=[],decorated=false
for(var dec of this.decorator_list){decorated=true
var dec_id='decorator'+$B.UUID()
decorators.push(dec_id)
js+=`var ${dec_id} = ${$B.js_from_ast(dec, scopes)}\n`}
var qualname=this.name
var ix=scopes.length-1
while(ix >=0){if(scopes[ix].parent){ix--}else if(scopes[ix].ast instanceof $B.ast.ClassDef){qualname=scopes[ix].name+'.'+qualname
ix--}else{break}}
scopes.push(class_scope)
var docstring='_b_.None'
if(this.body[0]instanceof $B.ast.Expr &&
this.body[0].value instanceof $B.ast.Constant &&
typeof this.body[0].value.value=="string"){docstring=this.body.splice(0,1)[0].to_js(scopes)}
js+=`var ${ref} = (function(){\n`+
`var ${locals_name} = {__annotations__: $B.empty_dict()},\n`+
`locals = ${locals_name}\n`+
`locals.$name = "${this.name}"\n`+
`locals.$qualname = "${qualname}"\n`+
`locals.$is_class = true\n`+
`var top_frame = ["${ref}", locals, "${glob}", ${globals_name}]\n`+
`top_frame.__file__ = '${scopes.filename}'\n`+
`locals.$lineno = ${this.lineno}\n`+
`locals.$f_trace = $B.enter_frame(top_frame)\n`+
`if(locals.$f_trace !== _b_.None){$B.trace_line()}\n`
js+=add_body(this.body,scopes)
scopes.pop()
js+='\nif(locals.$f_trace !== _b_.None){\n'+
'$B.trace_return(_b_.None)\n'+
'}\n'+
'$B.leave_frame({locals})\n'+
'return locals\n})()\n'
var class_ref=reference(scopes,enclosing_scope,this.name)
if(decorated){class_ref=`decorated${$B.UUID()}`
js+='var '}
var bases=this.bases.map(x=> $B.js_from_ast(x,scopes))
var keywords=[]
for(var keyword of this.keywords){keywords.push(`["${keyword.arg}", `+
$B.js_from_ast(keyword.value,scopes)+']')}
js+=`${class_ref} = $B.$class_constructor("${this.name}", ${ref}, `+
`$B.fast_tuple([${bases}]), [], [${keywords.join(', ')}])\n`+
`${class_ref}.__doc__ = ${docstring}\n`
if(decorated){js+=reference(scopes,enclosing_scope,this.name)+' = '
var decorate=class_ref
for(var dec of decorators.reverse()){decorate=`$B.$call(${dec})(${decorate})`}
js+=decorate+'\n'}
return js}
$B.ast.Compare.prototype.to_js=function(scopes){var left=$B.js_from_ast(this.left,scopes),comps=[]
var len=this.ops.length,prefix=len > 1 ? 'locals.$op = ' :''
for(var i=0;i < len;i++){var name=this.ops[i].$name ? this.ops[i].$name :this.ops[i].constructor.$name,op=opclass2dunder[name],right=this.comparators[i]
if(op===undefined){console.log('op undefined',this.ops[i])
alert()}
if(this.ops[i]instanceof $B.ast.In){comps.push(`$B.$is_member(${left}, `+
`${prefix}${$B.js_from_ast(right, scopes)})`)}else if(this.ops[i]instanceof $B.ast.NotIn){comps.push(`! $B.$is_member(${left}, `+
`${prefix}${$B.js_from_ast(right, scopes)})`)}else if(this.ops[i]instanceof $B.ast.Is){comps.push(`$B.$is(${left}, `+
`${prefix}${$B.js_from_ast(right, scopes)})`)}else if(this.ops[i]instanceof $B.ast.IsNot){comps.push(`! $B.$is(${left}, `+
`${prefix}${$B.js_from_ast(right, scopes)})`)}else{comps.push(`$B.rich_comp('${op}', ${left}, `+
`${prefix}${$B.js_from_ast(right, scopes)})`)}
if(len > 1){left='locals.$op'}}
return comps.join(' && ')}
$B.ast.comprehension.prototype.to_js=function(scopes){var id=$B.UUID(),iter=$B.js_from_ast(this.iter,scopes)
var js=`var next_func_${id} = $B.next_of(${iter})\n`+
`while(true){\ntry{\nvar next_${id} = next_func_${id}()\n`+
`}catch(err){\nif($B.is_exc(err, [_b_.StopIteration])){\n`+
`break\n}else{\n$B.leave_frame({locals, value: _b_.None})\n `+
`throw err\n}\n}\n`
var name=new $B.ast.Name(`next_${id}`,new $B.ast.Load())
copy_position(name,this.target)
name.to_js=function(){return `next_${id}`}
var assign=new $B.ast.Assign([this.target],name)
copy_position(assign,this.target)
if(assign.col_offset===undefined){console.log('pas de col offset',assign,'target',this.target)
alert()}
js+=assign.to_js(scopes)+' // assign to target\n'
for(var _if of this.ifs){js+=`if($B.$bool(${$B.js_from_ast(_if, scopes)})){\n`}
return js}
$B.ast.Constant.prototype.to_js=function(scopes){if(this.value===true ||this.value===false){return this.value+''}else if(this.value===_b_.None){return '_b_.None'}else if(typeof this.value=="string"){var type='str',value=this.value}else if(this.value.__class__===_b_.bytes){return `_b_.bytes.$factory([${this.value.source}])`}else{var type=this.value.type,value=this.value.value}
switch(type){case 'int':
var v=parseInt(value[1],value[0])
if(v > $B.min_int && v < $B.max_int){return v+''}else{var v=$B.long_int.$factory(value[1],value[0])
return '$B.fast_long_int("'+v.value+'", '+v.pos+')'}
case 'float':
if(/^\d+$/.exec(value)||/^\d+\.\d*$/.exec(value)){return '(new Number('+value+'))'}
return '_b_.float.$factory('+value+')'
case 'imaginary':
var v=$B.ast.Constant.prototype.to_js.bind({value})(scopes)
return '$B.make_complex(0,'+v+')'
case 'ellipsis':
return `_b_.Ellipsis`
case 'str':
var lines=value.split('\n')
lines=lines.map(line=> line.replace(/\\/g,'\\\\'))
value=lines.join('\\n\\\n')
value=value.replace(new RegExp('\r','g'),'\\r').
replace(new RegExp('\t','g'),'\\t').
replace(new RegExp('\x07','g'),'\\x07')
if(value.indexOf("'")==-1){return `$B.String('${value}')`}else if(value.indexOf('"')==-1){return `$B.String("${value}")`}else{value=value.replace(new RegExp("'","g"),"\\'")
return `$B.String('${value}')`}}
console.log('unknown constant',this,value,value===true)
return '// unknown'}
$B.ast.Continue.prototype.to_js=function(scopes){if(! in_loop(scopes)){compiler_error(this,"'continue' not properly in loop")}
return 'continue'}
$B.ast.Delete.prototype.to_js=function(scopes){compiler_check(this)
var js=''
for(var target of this.targets){if(target instanceof $B.ast.Name){var scope=name_scope(target.id,scopes)
if(scope.found){scope.found.locals.delete(target.id)}
js+=`$B.$delete("${target.id}")\n`}else if(target instanceof $B.ast.Subscript){js+=`$B.$delitem(${$B.js_from_ast(target.value, scopes)}, `+
`${$B.js_from_ast(target.slice, scopes)})\n`}else if(target instanceof $B.ast.Attribute){js+=`_b_.delattr(${$B.js_from_ast(target.value, scopes)}, `+
`'${target.attr}')\n`}}
return `$B.set_lineno(locals, ${this.lineno})\n`+js}
$B.ast.Dict.prototype.to_js=function(scopes){var items=[],keys=this.keys,has_packed=false
function no_key(i){return keys[i]===_b_.None ||keys[i]===undefined}
for(var i=0,len=this.keys.length;i < len;i++){if(no_key(i)){
has_packed=true
items.push('_b_.list.$factory(_b_.dict.items('+
$B.js_from_ast(this.values[i],scopes)+'))')}else{try{items.push(`[${$B.js_from_ast(this.keys[i], scopes)}, `+
`${$B.js_from_ast(this.values[i], scopes)}]`)}catch(err){console.log('error',this.keys[i],this.values[i])
throw err}}}
if(! has_packed){return `_b_.dict.$factory([${items}])`}
var first=no_key(0)? items[0]:`[${items[0]}]`,js='_b_.dict.$factory('+first
for(var i=1,len=items.length;i < len;i++){var arg=no_key(i)? items[i]:`[${items[i]}]`
js+=`.concat(${arg})`}
return js+')'}
$B.ast.DictComp.prototype.to_js=function(scopes){return make_comp.bind(this)(scopes)}
$B.ast.Expr.prototype.to_js=function(scopes){return `$B.set_lineno(locals, ${this.lineno});\n`+
$B.js_from_ast(this.value,scopes)}
$B.ast.Expression.prototype.to_js=function(scopes){init_scopes.bind(this)('expression',scopes)
return $B.js_from_ast(this.body,scopes)}
$B.ast.For.prototype.to_js=function(scopes){
var id=$B.UUID(),iter=$B.js_from_ast(this.iter,scopes),js
var scope=$B.last(scopes),new_scope=copy_scope(scope,this,id)
scopes.push(new_scope)
if(this instanceof $B.ast.AsyncFor){js=`var iter_${id} = ${iter},\n`+
`type_${id} = _b_.type.$factory(iter_${id})\n`+
`iter_${id} = $B.$call($B.$getattr(type_${id}, "__aiter__"))(iter_${id})\n`+
`var next_func_${id} = $B.$call(`+
`$B.$getattr(type_${id}, '__anext__'))\n`+
`while(true){\n`+
`  try{\n`+
`    var next_${id} = await $B.promise(next_func_${id}(iter_${id}))\n`+
`  }catch(err){\n`+
`    if($B.is_exc(err, [_b_.StopAsyncIteration])){\nbreak}\n`+
`    else{\nthrow err}\n`+
`  }\n`}else{js=`var no_break_${id} = true\n`+
`var next_func_${id} = $B.next_of(${iter})\n`+
`while(true){\n`+
`try{\n`+
`$B.set_lineno(locals, ${this.lineno})\n`+
`var next_${id} = next_func_${id}()\n`+
`}catch(err){\n`+
`if($B.is_exc(err, [_b_.StopIteration])){\n`+
`break\n`+
`}else{\n `+
`throw err\n`+
`}\n`+
`}\n`}
var name=new $B.ast.Name(`next_${id}`,new $B.ast.Load())
copy_position(name,this.iter)
name.to_js=function(){return `next_${id}`}
var assign=new $B.ast.Assign([this.target],name)
js+=assign.to_js(scopes)+'\n'
js+=add_body(this.body,scopes)
js+='\n}' 
scopes.pop()
if(this.orelse.length > 0){js+=`\nif(no_break_${id}){\n`+
add_body(this.orelse,scopes)+'}\n'}
return js}
$B.ast.FormattedValue.prototype.to_js=function(scopes){var value=$B.js_from_ast(this.value,scopes)
if(this.conversion==114){value=`_b_.repr(${value})`}else if(this.conversion==115){value=`_b_.str.$factory(${value})`}else if(this.conversion==97){value=`_b_.ascii(${value})`}
if(this.format_spec){value=`_b_.str.format('{0:' + `+
$B.js_from_ast(this.format_spec,scopes)+
` + '}', ${value})`}else if(this.conversion==-1){value=`_b_.str.$factory(${value})`}
return value}
function transform_args(scopes){
var has_posonlyargs=this.args.posonlyargs.length > 0,_defaults=[],nb_defaults=this.args.defaults.length,positional=this.args.posonlyargs.concat(this.args.args),ix=positional.length-nb_defaults,default_names=[]
for(var i=ix;i < positional.length;i++){default_names.push(`defaults.${positional[i].arg}`)
_defaults.push(`${positional[i].arg}: `+
`${$B.js_from_ast(this.args.defaults[i - ix], scopes)}`)}
var ix=0
for(var arg of this.args.kwonlyargs){if(this.args.kw_defaults[ix]===_b_.None){break}
if(this.args.kw_defaults[ix]===undefined){_defaults.push(`${arg.arg}: _b_.None`)}else{_defaults.push(`${arg.arg}: `+
$B.js_from_ast(this.args.kw_defaults[ix],scopes))}
ix++}
var kw_default_names=[]
for(var kw of this.args.kwonlyargs){kw_default_names.push(`defaults.${kw.arg}`)}
var default_str=`{${_defaults.join(', ')}}`
return{default_names,_defaults,positional,has_posonlyargs,kw_default_names,default_str}}
$B.ast.FunctionDef.prototype.to_js=function(scopes){var symtable_block=scopes.symtable.table.blocks.get(_b_.id(this))
var in_class=last_scope(scopes).ast instanceof $B.ast.ClassDef,is_async=this instanceof $B.ast.AsyncFunctionDef
if(in_class){var class_scope=last_scope(scopes)}
var decorators=[],decorated=false,decs=''
for(var dec of this.decorator_list){decorated=true
var dec_id='decorator'+$B.UUID()
decorators.push(dec_id)
decs+=`var ${dec_id} = ${$B.js_from_ast(dec, scopes)} // decorator\n`}
var docstring='_b_.None'
if(this.body[0]instanceof $B.ast.Expr &&
this.body[0].value instanceof $B.ast.Constant &&
typeof this.body[0].value.value=="string"){docstring=this.body.splice(0,1)[0].value.to_js(scopes)}
var parsed_args=transform_args.bind(this)(scopes),default_names=parsed_args.default_names,_defaults=parsed_args._defaults,positional=parsed_args.positional,has_posonlyargs=parsed_args.has_posonlyargs,kw_default_names=parsed_args.kw_default_names,default_str=parsed_args.default_str
var func_scope=new Scope(this.name,'def',this)
scopes.push(func_scope)
var args=positional.concat(this.args.kwonlyargs),parse_args=[`"${this.name}"`,positional.length],slots=[],arg_names=[]
for(var arg of args){slots.push(arg.arg+': null')
bind(arg.arg,scopes)}
for(var arg of this.args.posonlyargs){arg_names.push(`'${arg.arg}'`)}
if(has_posonlyargs){
arg_names.push("'/'")}
for(var arg of this.args.args.concat(this.args.kwonlyargs)){arg_names.push(`'${arg.arg}'`)}
if(this.args.vararg){bind(this.args.vararg.arg,scopes)}
if(this.args.kwarg){bind(this.args.kwarg.arg,scopes)}
if(this.$is_lambda){var _return=new $B.ast.Return(this.body)
copy_position(_return,this.body)
var body=[_return],function_body=add_body(body,scopes)}else{var function_body=add_body(this.body,scopes)}
var is_generator=symtable_block.generator
var id=$B.UUID(),name1=this.name+'$'+id,name2=this.name+id
var js=decs
js+=`var ${name1} = function(defaults){\n`
if(is_async && ! is_generator){js+='async '}
js+=`function ${name2}(){\n`
var locals_name=make_scope_name(scopes,func_scope),gname=scopes[0].name,globals_name=make_scope_name(scopes,scopes[0])
js+=`var ${locals_name},
               locals\n`
parse_args.push('{'+slots.join(', ')+'} , '+
'['+arg_names.join(', ')+'], '+
'arguments, defaults, '+
(this.args.vararg ? `'${this.args.vararg.arg}', ` :
(this.args.kwonlyargs.length > 0 ? "'*', " :'null, '))+
(this.args.kwarg ? `'${this.args.kwarg.arg}'` :'null'))
js+=`${locals_name} = locals = $B.args(${parse_args.join(', ')})\n`
js+=`var $top_frame = ["${this.name}", locals, "${gname}", ${globals_name}, ${name2}]
    locals.$lineno = ${this.lineno}
    locals.$f_trace = $B.enter_frame($top_frame)
    var stack_length = $B.frames_stack.length\n`
if(last_scope(scopes).has_annotation){js+=`locals.__annotations__ = $B.empty_dict()\n`}
if(is_generator){js+=`locals.$is_generator = true\n`
if(is_async){js+=`var gen_${id} = $B.async_generator.$factory(async function*(){\n`}else{js+=`var gen_${id} = $B.generator.$factory(function*(){\n`}}
js+=`try{\n$B.js_this = this\n`
if(in_class){
var ix=scopes.indexOf(class_scope),parent=scopes[ix-1]
var scope_ref=make_scope_name(scopes,parent),class_ref=class_scope.name 
bind("__class__",scopes)
js+=`locals.__class__ = `+
`$B.get_method_class(${scope_ref}, "${class_ref}")\n`}
js+=function_body+'\n'
if((! this.$is_lambda)&& !($B.last(this.body)instanceof $B.ast.Return)){
js+='var result = _b_.None\n'+
'if(locals.$f_trace !== _b_.None){\n'+
'$B.trace_return(_b_.None)\n}\n'+
'$B.leave_frame(locals);return result\n'}
js+=`}catch(err){
    $B.set_exc(err)
    if((! err.$in_trace_func) && locals.$f_trace !== _b_.None){
    ${locals_name}.$f_trace = $B.trace_exception()
    }
    $B.leave_frame(locals);throw err
    }
    }\n`
if(is_generator){js+=`, '${this.name}')\n`+
`var _gen_${id} = gen_${id}()\n`+
`_gen_${id}.$frame = $top_frame\n`+
`$B.leave_frame()\n`+
`return _gen_${id}}\n` }
scopes.pop()
var func_name_scope=bind(this.name,scopes)
var qualname=func_name_scope.type=='class' ?
`${func_name_scope.name}.${this.name}` :this.name
var flags=67
if(this.args.vararg){flags |=4}
if(this.args.kwarg){flags |=8}
if(is_generator){flags |=32}
var parameters=[],locals=[],identifiers=Object.keys(symtable_block.symbols.$string_dict)
var free_vars=[]
for(var ident of identifiers){var flag=symtable_block.symbols.$string_dict[ident][0],_scope=(flag >> SCOPE_OFF)& SCOPE_MASK
if(_scope==FREE){free_vars.push(`'${ident}'`)}
if(flag & DEF_PARAM){parameters.push(`'${ident}'`)}else if(flag & DEF_LOCAL){locals.push(`'${ident}'`)}}
var varnames=parameters.concat(locals)
js+=`${name2}.$is_func = true\n`
if(is_async){js+=`${name2}.$is_async = true\n`}
js+=`${name2}.$infos = {\n`+
`__name__: "${this.name}", __qualname__: "${qualname}",\n`+
`__defaults__: $B.fast_tuple([${default_names}]), `+
`__kwdefaults__: $B.fast_tuple([${kw_default_names}]),\n`+
`__doc__: ${docstring},\n`+
`__code__:{\n`+
`co_argcount: ${positional.length},\n `+
`co_filename: ${make_local(scopes[0].name)}.__file__,\n`+
`co_firstlineno: ${this.lineno},\n`+
`co_flags: ${flags},\n`+
`co_freevars: $B.fast_tuple([${free_vars}]),\n`+
`co_kwonlyargcount: ${this.args.kwonlyargs.length},\n`+
`co_name: '${this.name}',\n`+
`co_nlocals: ${varnames.length},\n`+
`co_posonlyargcount: ${this.args.posonlyargs.length},\n`+
`co_varnames: $B.fast_tuple([${varnames}])\n`+
`}\n}\n`
if(is_async){if(is_generator){js+=`return ${name2}`}else{js+=`return $B.make_async(${name2})`}}else{js+=`return ${name2}`}
js+=`}\n`
var mangled=mangle(scopes,func_name_scope,this.name),func_ref=`${make_scope_name(scopes, func_name_scope)}.${mangled}`
if(decorated){func_ref=`decorated${$B.UUID()}`
js+='var '}
js+=`${func_ref} = ${name1}(${default_str})\n`+
`${func_ref}.$set_defaults = function(value){\n`+
`return ${func_ref} = ${name1}(value)\n}\n`
if(decorated){js+=`${make_scope_name(scopes, func_name_scope)}.${mangled} = `
var decorate=func_ref
for(var dec of decorators.reverse()){decorate=`$B.$call(${dec})(${decorate})`}
js+=decorate}
return `$B.set_lineno(locals, ${this.lineno})\n`+js}
$B.ast.GeneratorExp.prototype.to_js=function(scopes){var id=$B.UUID(),symtable_block=scopes.symtable.table.blocks.get(_b_.id(this)),varnames=symtable_block.varnames.map(x=> `"${x}"`)
var expr=this.elt,first_for=this.generators[0],
outmost_expr=$B.js_from_ast(first_for.iter,scopes),nb_paren=1
var comp_scope=new Scope(`genexpr_${id}`,'comprehension',this)
scopes.push(comp_scope)
var comp={ast:this,id,type:'genexpr',varnames,module_name:scopes[0].name,locals_name:make_scope_name(scopes),globals_name:make_scope_name(scopes,scopes[0])}
var js=init_comprehension(comp)
var first=this.generators[0]
js+=`var next_func_${id} = $B.next_of(expr)\n`+
`while(true){\ntry{\nvar next_${id} = next_func_${id}()\n`+
`}catch(err){\nif($B.is_exc(err, [_b_.StopIteration])){\n`+
`break\n}else{\n$B.leave_frame({locals, value: _b_.None})\n `+
`throw err\n}\n}\n`
var name=new $B.ast.Name(`next_${id}`,new $B.ast.Load())
copy_position(name,first_for.iter)
name.to_js=function(){return `next_${id}`}
var assign=new $B.ast.Assign([first.target],name)
assign.lineno=this.lineno
js+=assign.to_js(scopes)+'\n'
for(var _if of first.ifs){nb_paren++
js+=`if($B.$bool(${$B.js_from_ast(_if, scopes)})){\n`}
for(var comprehension of this.generators.slice(1)){js+=comprehension.to_js(scopes)
nb_paren++
for(var _if of comprehension.ifs){nb_paren++}}
var elt=$B.js_from_ast(this.elt,scopes),has_await=comp_scope.has_await
js=`$B.generator.$factory(${has_await ? 'async ' : ''}function*(expr){\n`+js
js+=has_await ? 'var save_stack = $B.save_stack();\n' :''
js+=`try{\n`+
` yield ${elt}\n`+
`}catch(err){\n`+
(has_await ? '$B.restore_stack(save_stack, locals)\n' :'')+
`$B.leave_frame(locals)\nthrow err\n}\n`+
(has_await ? '\n$B.restore_stack(save_stack, locals);' :'')
for(var i=0;i < nb_paren;i++){js+='}\n'}
js+=`\n$B.leave_frame({locals, value: _b_.None})`+
`}, "<genexpr>")(${outmost_expr})\n`
scopes.pop()
return js}
$B.ast.Global.prototype.to_js=function(scopes){var scope=$B.last(scopes)
for(var name of this.names){scope.globals.add(name)}
return ''}
$B.ast.If.prototype.to_js=function(scopes){var scope=$B.last(scopes),new_scope=copy_scope(scope,this)
var js=`if($B.set_lineno(locals, ${this.lineno}) && `+
`$B.$bool(${$B.js_from_ast(this.test, scopes)})){\n`
scopes.push(new_scope)
js+=add_body(this.body,scopes)+'\n}'
scopes.pop()
if(this.orelse.length > 0){if(this.orelse[0]instanceof $B.ast.If && this.orelse.length==1){js+='else '+$B.js_from_ast(this.orelse[0],scopes)+
add_body(this.orelse.slice(1),scopes)}else{js+='\nelse{\n'+add_body(this.orelse,scopes)+'\n}'}}
return js}
$B.ast.IfExp.prototype.to_js=function(scopes){return '($B.$bool('+$B.js_from_ast(this.test,scopes)+') ? '+
$B.js_from_ast(this.body,scopes)+': '+
$B.js_from_ast(this.orelse,scopes)+')'}
$B.ast.Import.prototype.to_js=function(scopes){var js=`$B.set_lineno(locals, ${this.lineno})\n`
for(var alias of this.names){js+=`$B.$import("${alias.name}", [], `
if(alias.asname){js+=`{'${alias.name}' : '${alias.asname}'}, `
bind(alias.asname,scopes)}else{js+='{}, '
bind(alias.name,scopes)}
var parts=alias.name.split('.')
for(var i=0;i < parts.length;i++){scopes.imports[parts.slice(0,i+1).join(".")]=true}
js+=`locals, true)\n`}
return js.trimRight()}
$B.ast.ImportFrom.prototype.to_js=function(scopes){compiler_check(this)
if(this.level==0){module=this.module}else{var scope=last_scope(scopes),parts=scope.name.split('.')
if(this.level > parts.length){return `throw _b_.ImportError.$factory(`+
`"Parent module '' not loaded, cannot perform relative import")`}
for(var i=0;i < this.level-1;i++){parts.pop()}
var top_module=$B.imported[parts.join('.')]
if(top_module && ! top_module.$is_package){parts.pop()}
var module=parts.join('.')
if(this.module){module+='.'+this.module}}
var js=`$B.set_lineno(locals, ${this.lineno})\n`+
`var module = $B.$import_from("${this.module || ''}", `
var names=this.names.map(x=> `"${x.name}"`).join(', '),aliases=[]
for(var name of this.names){if(name.asname){aliases.push(`${name.name}: '${name.asname}'`)}}
js+=`[${names}], {${aliases.join(', ')}}, ${this.level}, locals);`
for(var alias of this.names){if(alias.asname){bind(alias.asname,scopes)}else if(alias.name=='*'){
last_scope(scopes).blurred=true
js+=`\n$B.import_all(locals, module)`}else{bind(alias.name,scopes)}}
return js}
$B.ast.JoinedStr.prototype.to_js=function(scopes){var items=this.values.map(s=> $B.js_from_ast(s,scopes))
if(items.length==0){return "''"}
return items.join(' + ')}
$B.ast.Lambda.prototype.to_js=function(scopes){
var id=$B.UUID(),name='lambda_'+$B.lambda_magic+'_'+id
var f=new $B.ast.FunctionDef(name,this.args,this.body,[])
f.lineno=this.lineno
f.$id=_b_.id(this)
f.$is_lambda=true
var js=f.to_js(scopes),lambda_ref=reference(scopes,last_scope(scopes),name)
return `(function(){ ${js}\n`+
`return ${lambda_ref}\n})()`}
function list_or_tuple_to_js(func,scopes){if(this.elts.filter(x=> x instanceof $B.ast.Starred).length > 0){var parts=[],simple=[]
for(var elt of this.elts){if(elt instanceof $B.ast.Starred){elt.$handled=true
parts.push(`[${simple.join(', ')}]`)
simple=[]
parts.push(`_b_.list.$factory(${$B.js_from_ast(elt, scopes)})`)}else{simple.push($B.js_from_ast(elt,scopes))}}
if(simple.length > 0){parts.push(`[${simple.join(', ')}]`)}
var js=parts[0]
for(var part of parts.slice(1)){js+=`.concat(${part})`}
return `${func}(${js})`}
var elts=this.elts.map(x=> $B.js_from_ast(x,scopes))
return `${func}([${elts.join(', ')}])`}
$B.ast.List.prototype.to_js=function(scopes){return list_or_tuple_to_js.bind(this)('$B.$list',scopes)}
$B.ast.ListComp.prototype.to_js=function(scopes){compiler_check(this)
return make_comp.bind(this)(scopes)}
$B.ast.match_case.prototype.to_js=function(scopes){var js=`($B.set_lineno(locals, ${this.lineno}) && `+
`$B.pattern_match(subject, {`+
`${$B.js_from_ast(this.pattern, scopes)}})`
if(this.guard){js+=` && $B.$bool(${$B.js_from_ast(this.guard, scopes)})`}
js+=`){\n`
js+=add_body(this.body,scopes)+'\n}'
return js}
function is_irrefutable(pattern){switch(pattern.constructor){case $B.ast.MatchAs:
if(pattern.pattern===undefined){return pattern}else{return is_irrefutable(pattern.pattern)}
case $B.ast.MatchOr:
for(var i=0;i < pattern.patterns.length;i++){if(is_irrefutable(pattern.patterns[i])){if(i==pattern.patterns.length-1){
return pattern}
irrefutable_error(pattern.patterns[i])}}
break}}
function irrefutable_error(pattern){var msg=pattern.name ? `name capture '${pattern.name}'` :'wildcard'
msg+=' makes remaining patterns unreachable'
compiler_error(pattern,msg)}
function pattern_bindings(pattern){var bindings=[]
switch(pattern.constructor){case $B.ast.MatchAs:
if(pattern.name){bindings.push(pattern.name)}
break
case $B.ast.MatchSequence:
for(var p of pattern.patterns){bindings=bindings.concat(pattern_bindings(p))}
break
case $B.ast.MatchOr:
bindings=pattern_bindings(pattern.patterns[0])
err_msg='alternative patterns bind different names'
for(var i=1;i < pattern.patterns.length;i++){var _bindings=pattern_bindings(pattern.patterns[i])
if(_bindings.length !=bindings.length){compiler_error(pattern,err_msg)}else{for(var j=0;j < bindings.length;j++){if(bindings[j]!=_bindings[j]){compiler_error(pattern,err_msg)}}}}
break}
return bindings.sort()}
$B.ast.Match.prototype.to_js=function(scopes){var scope=$B.last(scopes),irrefutable
var js=`var subject = ${$B.js_from_ast(this.subject, scopes)}\n`
first=true
for(var _case of this.cases){if(! _case.guard){if(irrefutable){irrefutable_error(irrefutable)}
irrefutable=is_irrefutable(_case.pattern)}
var case_js=$B.js_from_ast(_case,scopes)
if(first){js+='if'+case_js
first=false}else{js+='else if'+case_js}}
return `$B.set_lineno(locals, ${this.lineno})\n`+js}
$B.ast.MatchAs.prototype.to_js=function(scopes){
var scope=$B.last(scopes)
var name=this.name===undefined ? '_' :this.name,params
if(this.pattern===undefined){params=`capture: '${name}'`}else{var pattern=$B.js_from_ast(this.pattern,scopes)
if(this.pattern instanceof $B.ast.MatchAs && this.pattern.name){
pattern=`group: [{${pattern}}]`}
params=`${pattern}, alias: '${name}'`}
if(scope.bindings){if(scope.bindings.indexOf(name)>-1){compiler_error(this,`multiple assignment to name '${name}' in pattern`)}
scope.bindings.push(name)}
return params}
$B.ast.MatchClass.prototype.to_js=function(scopes){var names=[]
for(var pattern of this.patterns.concat(this.kwd_patterns)){var name=pattern.name
if(name){if(names.indexOf(name)>-1){compiler_error(pattern,`multiple assignment to name '${name}' in pattern`)}
names.push(name)}}
names=[]
for(var i=0;i < this.kwd_attrs.length;i++){var kwd_attr=this.kwd_attrs[i]
if(names.indexOf(kwd_attr)>-1){compiler_error(this.kwd_patterns[i],`attribute name repeated in class pattern: ${kwd_attr}`)}
names.push(kwd_attr)}
var cls=$B.js_from_ast(this.cls,scopes),patterns=this.patterns.map(x=> `{${$B.js_from_ast(x, scopes)}}`)
var kw=[]
for(var i=0,len=this.kwd_patterns.length;i < len;i++){kw.push(this.kwd_attrs[i]+': {'+
$B.js_from_ast(this.kwd_patterns[i],scopes)+'}')}
return `class: ${cls}, args: [${patterns}], keywords: {${kw.join(', ')}}`}
$B.ast.MatchMapping.prototype.to_js=function(scopes){var keys=[]
for(var key of this.keys){if(key instanceof $B.ast.Attribute){continue}else if(key instanceof $B.ast.Constant ||
key instanceof $B.ast.UnaryOp ||
key instanceof $B.ast.BinOp){var value=eval(key.to_js(scopes))
if(_b_.list.__contains__(keys,value)){compiler_error(this,'mapping pattern checks duplicate key '+
`(${_b_.repr(value)})`)}
keys.push(value)}else{compiler_error(key,'mapping pattern keys may only match literals and attribute lookups')}}
var names=[]
for(var pattern of this.patterns){if(pattern instanceof $B.ast.MatchAs && pattern.name){if(names.indexOf(pattern.name)>-1){compiler_error(pattern,`multiple assignments to name '${pattern.name}' in pattern`)}
names.push(pattern.name)}}
var items=[]
for(var i=0,len=this.keys.length;i < len;i++){var key_prefix=this.keys[i]instanceof $B.ast.Constant ?
'literal: ' :'value: '
var key=$B.js_from_ast(this.keys[i],scopes),value=$B.js_from_ast(this.patterns[i],scopes)
items.push(`[{${key_prefix}${key}}, {${value}}]`)}
var js='mapping: ['+items.join(', ')+']'
if(this.rest){js+=`, rest: '${this.rest}'`}
return js}
$B.ast.MatchOr.prototype.to_js=function(scopes){is_irrefutable(this)
pattern_bindings(this)
var items=[]
for(var alt of this.patterns){items.push(`{${$B.js_from_ast(alt, scopes)}}`)}
var js=items.join(', ')
return `or: [${js}]`}
$B.ast.MatchSequence.prototype.to_js=function(scopes){var items=[],names=[]
for(var pattern of this.patterns){if(pattern instanceof $B.ast.MatchAs && pattern.name){if(names.indexOf(pattern.name)>-1){compiler_error(pattern,`multiple assignments to name '${pattern.name}' in pattern`)}
names.push(pattern.name)}
items.push('{'+$B.js_from_ast(pattern,scopes)+'}')}
return `sequence: [${items.join(', ')}]`}
$B.ast.MatchSingleton.prototype.to_js=function(scopes){var value=this.value===true ? '_b_.True' :
this.value===false ? '_b_.False' :
'_b_.None'
return `literal: ${value}`}
$B.ast.MatchStar.prototype.to_js=function(scopes){var name=this.name===undefined ? '_' :this.name
return `capture_starred: '${name}'`}
$B.ast.MatchValue.prototype.to_js=function(scopes){if(this.value instanceof $B.ast.Constant){return `literal: ${$B.js_from_ast(this.value, scopes)}`}else if(this.value instanceof $B.ast.Constant ||
this.value instanceof $B.ast.UnaryOp ||
this.value instanceof $B.ast.BinOp ||
this.value instanceof $B.ast.Attribute){return `value: ${$B.js_from_ast(this.value, scopes)}`}else{compiler_error(this,'patterns may only match literals and attribute lookups')}}
$B.ast.Module.prototype.to_js=function(scopes){mark_parents(this)
var name=init_scopes.bind(this)('module',scopes),namespaces=scopes.namespaces
var module_id=name,global_name=make_scope_name(scopes)
var js=`// Javascript code generated from ast\n`+
`var $B = __BRYTHON__,\n_b_ = $B.builtins,\n`
if(! namespaces){js+=`${global_name} = {},\nlocals = ${global_name},\n`+
`$top_frame = ["${module_id}", locals, "${module_id}", locals]`}else{js+=`locals = ${namespaces.local_name},\n`+
`globals = ${namespaces.global_name},\n`+
`$top_frame = ["${module_id}", locals, "${module_id}_globals", globals]`}
js+=`\nlocals.__file__ = '${scopes.filename || "<string>"}'\n`+
`locals.__name__ = '${name}'\n`+
`locals.__annotations__ = $B.empty_dict()\n`
if(! namespaces){
js+=`locals.$f_trace = $B.enter_frame($top_frame)\n`}
js+=`$B.set_lineno(locals, ${this.lineno})\n`+
`var stack_length = $B.frames_stack.length\n`+
`try{\n`+
add_body(this.body,scopes)+'\n'+
(namespaces ? '' :`$B.leave_frame({locals, value: _b_.None})\n`)+
`}catch(err){\n`+
`$B.set_exc(err)\n`+
`if((! err.$in_trace_func) && locals.$f_trace !== _b_.None){\n`+
`locals.$f_trace = $B.trace_exception()\n`+
`}\n`+
(namespaces ? '' :`$B.leave_frame({locals, value: _b_.None})\n`)+
'throw err\n'+
`}`
scopes.pop()
return js}
$B.ast.Name.prototype.to_js=function(scopes){if(this.ctx instanceof $B.ast.Store){
var scope=bind(this.id,scopes)
if(scope===$B.last(scopes)&& scope.freevars.has(this.id)){
scope.freevars.delete(this.id)}
return reference(scopes,scope,this.id)}else if(this.ctx instanceof $B.ast.Load){var res=name_reference(this.id,scopes)
return res}}
$B.ast.NamedExpr.prototype.to_js=function(scopes){
var i=scopes.length-1
while(scopes[i].type=='comprehension'){i--}
var enclosing_scopes=scopes.slice(0,i+1)
enclosing_scopes.symtable=scopes.symtable
bind(this.target.id,enclosing_scopes)
return '('+$B.js_from_ast(this.target,enclosing_scopes)+' = '+
$B.js_from_ast(this.value,scopes)+')'}
$B.ast.Nonlocal.prototype.to_js=function(scopes){var scope=$B.last(scopes)
for(var name of this.names){scope.nonlocals.add(name)}
return ''}
$B.ast.Pass.prototype.to_js=function(scopes){return `$B.set_lineno(locals, ${this.lineno})\n`+
'void(0)'}
$B.ast.Raise.prototype.to_js=function(scopes){var js=`$B.set_lineno(locals, ${this.lineno})\n`+
'$B.$raise('
if(this.exc){js+=$B.js_from_ast(this.exc,scopes)}
if(this.cause){js+=', '+$B.js_from_ast(this.cause,scopes)}
return js+')'}
$B.ast.Return.prototype.to_js=function(scopes){
compiler_check(this)
var js=`$B.set_lineno(locals, ${this.lineno})\n`+
'var result = '+
(this.value ? $B.js_from_ast(this.value,scopes):' _b_.None')
js+=`\nif(locals.$f_trace !== _b_.None){\n`+
`$B.trace_return(result)\n}\n`+
`$B.leave_frame(locals)\nreturn result\n`
return js}
$B.ast.Set.prototype.to_js=function(scopes){for(var elt of this.elts){if(elt instanceof $B.ast.Starred){elt.$handled=true}}
var call_obj={args:this.elts,keywords:[]}
var call=make_args.bind(call_obj)(scopes),js=call.js
if(! call.has_starred){js=`[${js}]`}
return `_b_.set.$factory(${js})`}
$B.ast.SetComp.prototype.to_js=function(scopes){return make_comp.bind(this)(scopes)}
$B.ast.Slice.prototype.to_js=function(scopes){var lower=this.lower ? $B.js_from_ast(this.lower,scopes):'_b_.None',upper=this.upper ? $B.js_from_ast(this.upper,scopes):'_b_.None',step=this.step ? $B.js_from_ast(this.step,scopes):'_b_.None'
return `_b_.slice.$factory(${lower}, ${upper}, ${step})`}
$B.ast.Starred.prototype.to_js=function(scopes){if(this.$handled){return `_b_.list.$factory(${$B.js_from_ast(this.value, scopes)})`}
if(this.ctx instanceof $B.ast.Store){compiler_error(this,"starred assignment target must be in a list or tuple")}else{compiler_error(this,"can't use starred expression here")}}
$B.ast.Subscript.prototype.to_js=function(scopes){var value=$B.js_from_ast(this.value,scopes),slice=$B.js_from_ast(this.slice,scopes)
if(this.slice instanceof $B.ast.Slice){return `$B.getitem_slice(${value}, ${slice})`}else{return `$B.$getitem(${value}, ${slice})`}}
$B.ast.Try.prototype.to_js=function(scopes){compiler_check(this)
var id=$B.UUID(),has_except_handlers=this.handlers.length > 0,has_else=this.orelse.length > 0,has_finally=this.finalbody.length > 0
var js=`$B.set_lineno(locals, ${this.lineno})\ntry{\n`
js+=`var stack_length_${id} = $B.frames_stack.length\n`
if(has_finally){js+=`var save_stack_${id} = $B.frames_stack.slice()\n`}
if(has_else){js+=`var failed${id} = false\n`}
var try_scope=copy_scope($B.last(scopes))
scopes.push(try_scope)
js+=add_body(this.body,scopes)+'\n'
if(has_except_handlers){var err='err'+id
js+='}\n' 
js+=`catch(${err}){\n`+
`$B.set_exc(${err})\n`+
`if(locals.$f_trace !== _b_.None){\n`+
`locals.$f_trace = $B.trace_exception()}\n`
if(has_else){js+=`failed${id} = true\n`}
var first=true,has_untyped_except=false
for(var handler of this.handlers){if(first){js+='if'
first=false}else{js+='}else if'}
js+=`($B.set_lineno(locals, ${handler.lineno})`
if(handler.type){js+=` && $B.is_exc(${err}, `
if(handler.type instanceof $B.ast.Tuple){js+=`${$B.js_from_ast(handler.type, scopes)}`}else{js+=`[${$B.js_from_ast(handler.type, scopes)}]`}
js+=`)){\n`}else{has_untyped_except=true
js+='){\n'}
if(handler.name){bind(handler.name,scopes)
var mangled=mangle(scopes,try_scope,handler.name)
js+=`locals.${mangled} = ${err}\n`}
js+=add_body(handler.body,scopes)+'\n'
if(!($B.last(handler.body)instanceof $B.ast.Return)){
js+='$B.del_exc()\n'}}
if(! has_untyped_except){
js+=`}else{\nthrow ${err}\n`}
js+='}\n'}
if(has_else ||has_finally){js+='}\n' 
js+='finally{\n'
var finalbody=`var exit = false\n`+
`if($B.frames_stack.length < stack_length_${id}){\n`+
`exit = true\n`+
`$B.frames_stack.push($top_frame)\n`+
`}\n`+
add_body(this.finalbody,scopes)
if(this.finalbody.length > 0 &&
!($B.last(this.finalbody)instanceof $B.ast.Return)){finalbody+=`\nif(exit){\n`+
`$B.leave_frame(locals)\n`+
`}`}
var elsebody=`if($B.frames_stack.length == stack_length_${id} `+
`&& ! failed${id}){\n`+
add_body(this.orelse,scopes)+
'\n}' 
if(has_else && has_finally){js+=`try{\n`+
elsebody+
'\n}\n'+
`finally{\n`+finalbody+'}\n'}else if(has_else && ! has_finally){js+=elsebody}else{js+=finalbody}
js+='\n}\n' }else{js+='}\n' }
scopes.pop()
return js}
$B.ast.Tuple.prototype.to_js=function(scopes){return list_or_tuple_to_js.bind(this)('$B.fast_tuple',scopes)}
$B.ast.UnaryOp.prototype.to_js=function(scopes){var operand=$B.js_from_ast(this.operand,scopes)
if(this.op instanceof $B.ast.Not){return `! $B.$bool(${operand})`}
if(typeof operand=="number" ||operand instanceof Number){if(this.op instanceof $B.ast.UAdd){return operand+''}else if(this.op instanceof $B.ast.USub){return-operand+''}}
var method=opclass2dunder[this.op.constructor.$name]
return `$B.$getattr(${operand}, '${method}')()`}
$B.ast.While.prototype.to_js=function(scopes){var id=$B.UUID()
var scope=$B.last(scopes),new_scope=copy_scope(scope,this)
scopes.push(new_scope)
var js=`var no_break_${id} = true\n`
js+=`while($B.set_lineno(locals, ${this.lineno}) && `+
`$B.$bool(${$B.js_from_ast(this.test, scopes)})){\n`
js+=add_body(this.body,scopes)+'\n}'
scopes.pop()
if(this.orelse.length > 0){js+=`\nif(no_break_${id}){\n`+
add_body(this.orelse,scopes)+'}\n'}
return js}
var with_counter=[0]
$B.ast.With.prototype.to_js=function(scopes){
function add_item(item,js){var id=$B.UUID()
var s=`var mgr_${id} = `+
$B.js_from_ast(item.context_expr,scopes)+',\n'+
`exit_${id} = $B.$getattr(mgr_${id}.__class__, `+
`"__exit__"),\n`+
`value_${id} = $B.$call($B.$getattr(mgr_${id}.__class__, `+
`'__enter__'))(mgr_${id}),\n`+
`exc_${id} = true\n`
if(in_generator){
s+=`locals.$context_managers = locals.$context_managers || []\n`+
`locals.$context_managers.push(mgr_${id})\n`}
s+='try{\ntry{\n'
if(item.optional_vars){var value={to_js:function(){return `value_${id}`}}
copy_position(value,_with)
var assign=new $B.ast.Assign([item.optional_vars],value)
copy_position(assign,_with)
s+=assign.to_js(scopes)+'\n'}
s+=js
s+=`}catch(err_${id}){\n`+
`locals.$lineno = ${lineno}\n`+
`exc_${id} = false\n`+
`err_${id} = $B.exception(err_${id}, true)\n`+
`var $b = exit_${id}(mgr_${id}, err_${id}.__class__, `+
`err_${id}, $B.$getattr(err_${id}, '__traceback__'))\n`+
`if(! $B.$bool($b)){\n`+
`throw err_${id}\n`+
`}\n`+
`}\n`
s+=`}\nfinally{\n`+
`locals.$lineno = ${lineno}\n`+
(in_generator ? `locals.$context_managers.pop()\n` :'')+
`if(exc_${id}){\n`+
`try{\n`+
`exit_${id}(mgr_${id}, _b_.None, _b_.None, _b_.None)\n`+
`}catch(err){\n`+
`if($B.frames_stack.length < stack_length){\n`+
`$B.frames_stack.push($top_frame)\n`+
`}\n`+
`throw err\n`+
`}\n`+
`}\n`+
`}\n`
return s}
var _with=this,scope=last_scope(scopes),lineno=this.lineno
js=add_body(this.body,scopes)+'\n'
var in_generator=scopes.symtable.table.blocks.get(_b_.id(scope.ast)).generator
for(var item of this.items.slice().reverse()){js=add_item(item,js)}
return `$B.set_lineno(locals, ${this.lineno})\n`+js}
$B.ast.Yield.prototype.to_js=function(scopes){
last_scope(scopes).is_generator=true
var value=this.value ? $B.js_from_ast(this.value,scopes):'_b_.None'
return `yield ${value}`}
$B.ast.YieldFrom.prototype.to_js=function(scopes){
last_scope(scopes).is_generator=true
var value=$B.js_from_ast(this.value,scopes)
var n=$B.UUID()
return `yield* (function* f(){
        var _i${n} = _b_.iter(${value}),
                _r${n}
            var failed${n} = false
            try{
                var _y${n} = _b_.next(_i${n})
            }catch(_e){
                $B.set_exc(_e)
                failed${n} = true
                $B.pmframe = $B.last($B.frames_stack)
                _e = $B.exception(_e)
                if(_e.__class__ === _b_.StopIteration){
                    var _r${n} = $B.$getattr(_e, "value")
                }else{
                    throw _e
                }
            }
            if(! failed${n}){
                while(true){
                    var failed1${n} = false
                    try{
                        $B.leave_frame({locals})
                        var _s${n} = yield _y${n}
                        $B.frames_stack.push($top_frame)
                    }catch(_e){
                        if(_e.__class__ === _b_.GeneratorExit){
                            var failed2${n} = false
                            try{
                                var _m${n} = $B.$getattr(_i${n}, "close")
                            }catch(_e1){
                                failed2${n} = true
                                if(_e1.__class__ !== _b_.AttributeError){
                                    throw _e1
                                }
                            }
                            if(! failed2${n}){
                                $B.$call(_m${n})()
                            }
                            throw _e
                        }else if($B.is_exc(_e, [_b_.BaseException])){
                            var sys_module = $B.imported._sys,
                                _x = sys_module.exc_info()
                            var failed3${n} = false
                            try{
                                var _m${n} = $B.$getattr(_i${n}, "throw")
                            }catch(err){
                                failed3${n} = true
                                if($B.is_exc(err, [_b_.AttributeError])){
                                    throw err
                                }
                            }
                            if(! failed3${n}){
                                try{
                                    _y${n} = $B.$call(_m${n}).apply(null,
                                        _b_.list.$factory(_x${n}))
                                }catch(err){
                                    if($B.$is_exc(err, [_b_.StopIteration])){
                                        _r${n} = $B.$getattr(err, "value")
                                        break
                                    }
                                    throw err
                                }
                            }
                        }
                    }
                    if(! failed1${n}){
                        try{
                            if(_s${n} === _b_.None){
                                _y${n} = _b_.next(_i${n})
                            }else{
                                _y${n} = $B.$call($B.$getattr(_i${n}, "send"))(_s${n})
                            }
                        }catch(err){
                            if($B.is_exc(err, [_b_.StopIteration])){
                                _r${n} = $B.$getattr(err, "value")
                                break
                            }
                            throw err
                        }
                    }
                }
            }
            return _r${n}
        })()`}
var state={}
$B.js_from_root=function(ast_root,symtable,filename,namespaces){if($B.show_ast_dump){console.log($B.ast_dump(ast_root))}
if($B.compiler_check){$B.compiler_check(ast_root,symtable)}
var scopes=[]
state.filename=filename
scopes.symtable=symtable
scopes.filename=filename
scopes.namespaces=namespaces
scopes.imports={}
var js=ast_root.to_js(scopes)
return{js,imports:scopes.imports}}
$B.js_from_ast=function(ast,scopes){if(! scopes.symtable){throw Error('perdu symtable')}
var js=''
scopes=scopes ||[]
if(ast.to_js !==undefined){if(ast.col_offset===undefined){var klass=ast.constructor.$name
if(['match_case'].indexOf(klass)==-1){console.log('pas de col offset pour',klass)
console.log(ast)
throw Error('ccc')
alert()}}
return ast.to_js(scopes)}
console.log("unhandled",ast.constructor.$name)
return '// unhandled class ast.'+ast.constructor.$name}})(__BRYTHON__)
;
(function($B){var _b_=$B.builtins
var GLOBAL_PARAM="name '%s' is parameter and global",NONLOCAL_PARAM="name '%s' is parameter and nonlocal",GLOBAL_AFTER_ASSIGN="name '%s' is assigned to before global declaration",NONLOCAL_AFTER_ASSIGN="name '%s' is assigned to before nonlocal declaration",GLOBAL_AFTER_USE="name '%s' is used prior to global declaration",NONLOCAL_AFTER_USE="name '%s' is used prior to nonlocal declaration",GLOBAL_ANNOT="annotated name '%s' can't be global",NONLOCAL_ANNOT="annotated name '%s' can't be nonlocal",IMPORT_STAR_WARNING="import * only allowed at module level",NAMED_EXPR_COMP_IN_CLASS=
"assignment expression within a comprehension cannot be used in a class body",NAMED_EXPR_COMP_CONFLICT=
"assignment expression cannot rebind comprehension iteration variable '%s'",NAMED_EXPR_COMP_INNER_LOOP_CONFLICT=
"comprehension inner loop cannot rebind assignment expression target '%s'",NAMED_EXPR_COMP_ITER_EXPR=
"assignment expression cannot be used in a comprehension iterable expression",ANNOTATION_NOT_ALLOWED=
"'%s' can not be used within an annotation",DUPLICATE_ARGUMENT="duplicate argument '%s' in function definition"
var DEF_GLOBAL=1,
DEF_LOCAL=2 ,
DEF_PARAM=2<<1,
DEF_NONLOCAL=2<<2,
USE=2<<3 ,
DEF_FREE=2<<4 ,
DEF_FREE_CLASS=2<<5,
DEF_IMPORT=2<<6,
DEF_ANNOT=2<<7,
DEF_COMP_ITER=2<<8 
var DEF_BOUND=DEF_LOCAL |DEF_PARAM |DEF_IMPORT
var SCOPE_OFFSET=11,SCOPE_MASK=(DEF_GLOBAL |DEF_LOCAL |DEF_PARAM |DEF_NONLOCAL)
var LOCAL=1,GLOBAL_EXPLICIT=2,GLOBAL_IMPLICIT=3,FREE=4,CELL=5
var GENERATOR=1,GENERATOR_EXPRESSION=2
var CO_FUTURE_ANNOTATIONS=0x1000000 
var TYPE_CLASS=1,TYPE_FUNCTION=0,TYPE_MODULE=2
var NULL=undefined
var ModuleBlock=2,ClassBlock=1,FunctionBlock=0,AnnotationBlock=4
var PyExc_SyntaxError=_b_.SyntaxError
function assert(test){if(! $B.$bool(test)){console.log('test fails',test)
throw Error('test fails')}}
function LOCATION(x){
return[x.lineno,x.col_offset,x.end_lineno,x.end_col_offset]}
function ST_LOCATION(x){
return[x.lineno,x.col_offset,x.end_lineno,x.end_col_offset]}
function _Py_Mangle(privateobj,ident){
var result,nlen,plen,ipriv,maxchar;
if(privateobj==NULL ||! ident.startsWith('__')){return ident;}
nlen=ident.length
plen=privateobj.length
if(ident.endsWith('__')||ident.search(/\./)!=-1){return ident;}
ipriv=0;
while(privateobj[ipriv]=='_')
ipriv++;
if(ipriv==plen){return ident;}
var prefix=privateobj.substr(ipriv)
return '_'+prefix+ident}
var top=NULL,lambda=NULL,genexpr=NULL,listcomp=NULL,setcomp=NULL,dictcomp=NULL,__class__=NULL,_annotation=NULL
var NoComprehension=0,ListComprehension=1,DictComprehension=2,SetComprehension=3,GeneratorExpression=4
var internals={}
function GET_IDENTIFIER(VAR){return VAR}
function Symtable(){this.filename=NULL;
this.stack=[]
this.blocks=new Map()
this.cur=NULL;
this.private=NULL;}
function ste_new(st,name,block,key,lineno,col_offset,end_lineno,end_col_offset){var ste
ste={table:st,id:_b_.id(key),
name:name,directives:NULL,type:block,nested:0,free:0,varargs:0,varkeywords:0,opt_lineno:0,opt_col_offset:0,lineno:lineno,col_offset:col_offset,end_lineno:end_lineno,end_col_offset:end_col_offset}
if(st.cur !=NULL &&
(st.cur.nested ||
st.cur.type==FunctionBlock)){ste.nested=1;}
ste.child_free=0
ste.generator=0
ste.coroutine=0
ste.comprehension=NoComprehension
ste.returns_value=0
ste.needs_class_closure=0
ste.comp_iter_target=0
ste.comp_iter_expr=0
ste.symbols=$B.empty_dict()
ste.varnames=[]
ste.children=[]
st.blocks.set(ste.id,ste)
return ste}
$B._PySymtable_Build=function(mod,filename,future){var st=new Symtable(),seq
st.filename=filename;
st.future=future ||{}
st.type=TYPE_MODULE
if(!symtable_enter_block(st,'top',ModuleBlock,mod,0,0,0,0)){return NULL;}
st.top=st.cur
switch(mod.constructor){case $B.ast.Module:
seq=mod.body
for(var item of seq){symtable_visit_stmt(st,item)}
break
case $B.ast.Expression:
symtable_visit_expr(st,mod.body)
break
case $B.ast.Interactive:
seq=mod.body
for(var item of seq){symtable_visit_stmt(st,item)}
break}
symtable_analyze(st)
return st.top;}
function PySymtable_Lookup(st,key){var v=st.blocks.get(key)
if(v){assert(PySTEntry_Check(v))}
return v}
function _PyST_GetSymbol(ste,name){if(! ste.symbols.$string_dict.hasOwnProperty(name)){return 0}
return ste.symbols.$string_dict[name][0]}
function PyErr_Format(exc_type,message,arg){if(arg){message=_b_.str.__mod__(message,arg)}
return exc_type.$factory(message)}
function PyErr_SetString(exc_type,message){return exc_type.$factory(message)}
function set_exc_info(exc,filename,lineno,offset,end_lineno,end_offset){exc.filename=filename
exc.lineno=lineno
exc.offset=offset
exc.end_lineno=end_lineno
exc.end_offset=end_offset
var src=$B.file_cache[filename]
if(src !==undefined){var lines=src.split('\n')
exc.text=lines[lineno-1]}else{exc.text=''}
exc.args[1]=[filename,lineno,offset,exc.text,end_lineno,end_offset]}
function error_at_directive(exc,ste,name){var data
assert(ste.directives)
for(var data of ste.directives){if(data[0]==name){set_exc_info(exc,ste.table.filename,data[1],data[2],data[3],data[4])
return 0}}
PyErr_SetString(PyExc_RuntimeError,"BUG: internal directive bookkeeping broken")
return 0}
function SET_SCOPE(DICT,NAME,I){$B.$setitem(DICT,NAME,I)}
function analyze_name(ste,scopes,name,flags,bound,local,free,global){if(flags & DEF_GLOBAL){if(flags & DEF_NONLOCAL){var exc=PyErr_Format(_b_.SyntaxError,"name '%s' is nonlocal and global",name)
error_at_directive(exc,ste,name)
throw exc}
SET_SCOPE(scopes,name,GLOBAL_EXPLICIT)
global.add(name)
if(bound){bound.delete(name)}
return 1}
if(flags & DEF_NONLOCAL){if(!bound){var exc=PyErr_Format(_b_.SyntaxError,"nonlocal declaration not allowed at module level");
error_at_directive(exc,ste,name)
throw exc}
if(! bound.has(name)){var exc=PyErr_Format(_b_.SyntaxError,"no binding for nonlocal '%s' found",name)
error_at_directive(exc,ste,name)
throw exc}
SET_SCOPE(scopes,name,FREE)
ste.free=1
free.add(name)
return 1}
if(flags & DEF_BOUND){SET_SCOPE(scopes,name,LOCAL)
local.add(name)
global.delete(name)
return 1}
if(bound && bound.has(name)){SET_SCOPE(scopes,name,FREE)
ste.free=1
free.add(name)
return 1}
if(global && global.has(name)){SET_SCOPE(scopes,name,GLOBAL_IMPLICIT)
return 1}
if(ste.nested){ste.free=1}
SET_SCOPE(scopes,name,GLOBAL_IMPLICIT)
return 1}
var SET_SCOPE
function analyze_cells(scopes,free){var name,v,v_cell;
var success=0,pos=0;
v_cell=CELL;
if(!v_cell){return 0;}
for(var name in scopes){v=scopes[name]
scope=v;
if(scope !=LOCAL){continue;}
if(free.has(name)){continue;}
scopes[name]=v_cell
free.delete(name)}
return 1}
function drop_class_free(ste,free){var res=free.delete('__class__')
if(res){ste.needs_class_closure=1}
return 1}
function update_symbols(symbols,scopes,bound,free,classflag){var name,itr,v,v_scope,v_new,v_free,pos=0
for(var name in symbols.$string_dict){var flags=symbols.$string_dict[name][0]
v_scope=scopes[name]
var scope=v_scope
flags |=(scope << SCOPE_OFFSET)
v_new=flags
if(!v_new){return 0;}
symbols.$string_dict[name][0]=v_new}
v_free=FREE << SCOPE_OFFSET
itr=_b_.iter(free)
var next_func=$B.$getattr(itr,'__next__')
while(true){try{name=next_func()}catch(err){break}
v=symbols.$string_dict[name][0]
if(v){
if(classflag &&
v &(DEF_BOUND |DEF_GLOBAL)){var flags=v |DEF_FREE_CLASS;
v_new=flags;
if(!v_new){return 0;}
symbols.$string_dict[name][0]=v_new}
continue;}
if(bound && !bound.has(name)){continue;}
symbols.$string_dict[name][0]=v_free}
return 1}
function analyze_block(ste,bound,free,global){var name,v,local=NULL,scopes=NULL,newbound=NULL,newglobal=NULL,newfree=NULL,allfree=NULL,temp,i,success=0,pos=0;
local=new Set()
scopes={}
newglobal=new Set()
newfree=new Set()
newbound=new Set()
if(ste.type===ClassBlock){
Set_Union(newglobal,global)
if(bound){Set_Union(newbound,bound)}}
for(var name in ste.symbols.$string_dict){var flags=ste.symbols.$string_dict[name][0]
if(!analyze_name(ste,scopes,name,flags,bound,local,free,global)){return 0}}
if(ste.type !=ClassBlock){
if(ste.type==FunctionBlock){Set_Union(newbound,local);}
if(bound){Set_Union(newbound,bound)}
Set_Union(newglobal,global);}else{
newbound.add('__class__')}
allfree=new Set()
for(var c of ste.children){var entry=c
if(! analyze_child_block(entry,newbound,newfree,newglobal,allfree)){return 0}
if(entry.free ||entry.child_free){ste.child_free=1}}
Set_Union(newfree,allfree)
if(ste.type===FunctionBlock && !analyze_cells(scopes,newfree)){return 0}else if(ste.type===ClassBlock && !drop_class_free(ste,newfree)){return 0}
if(!update_symbols(ste.symbols,scopes,bound,newfree,ste.type===ClassBlock)){return 0}
Set_Union(free,newfree)
success=1
return success}
function PySet_New(arg){if(arg===NULL){return new Set()}
return new Set(arg)}
function Set_Union(setA,setB){for(let elem of setB){setA.add(elem)}}
function analyze_child_block(entry,bound,free,global,child_free){
var temp_bound=PySet_New(bound),temp_free=PySet_New(free),temp_global=PySet_New(global)
if(!analyze_block(entry,temp_bound,temp_free,temp_global)){return 0}
Set_Union(child_free,temp_free);
return 1;}
function symtable_analyze(st){var free=new Set(),global=new Set()
return analyze_block(st.top,NULL,free,global);}
function symtable_exit_block(st){var size=st.stack.length
st.cur=NULL;
if(size){st.stack.pop()
if(--size){st.cur=st.stack[size-1]}}
return 1}
function symtable_enter_block(st,name,block,ast,lineno,col_offset,end_lineno,end_col_offset){var prev
var ste=ste_new(st,name,block,ast,lineno,col_offset,end_lineno,end_col_offset)
st.stack.push(ste)
prev=st.cur
if(prev){ste.comp_iter_expr=prev.comp_iter_expr}
st.cur=ste
if(block===AnnotationBlock){return 1}
if(block===ModuleBlock){st.global=st.cur.symbols}
if(prev){prev.children.push(ste)}
return 1;}
function symtable_lookup(st,name){var mangled=_Py_Mangle(st.private,name)
if(!mangled){return 0;}
var ret=_PyST_GetSymbol(st.cur,mangled)
return ret;}
function symtable_add_def_helper(st,name,flag,ste,_location){var o,dict,val,mangled=_Py_Mangle(st.private,name)
if(!mangled){return 0}
dict=ste.symbols
if(dict.$string_dict.hasOwnProperty(mangled)){o=dict.$string_dict[mangled][0]
val=o
if((flag & DEF_PARAM)&&(val & DEF_PARAM)){
var exc=PyErr_Format(_b_.SyntaxError,DUPLICATE_ARGUMENT,name);
set_exc_info(exc,st.filename,..._location)
throw exc}
val |=flag}else{val=flag}
if(ste.comp_iter_target){
if(val &(DEF_GLOBAL |DEF_NONLOCAL)){var exc=PyErr_Format(_b_.SyntaxError,NAMED_EXPR_COMP_INNER_LOOP_CONFLICT,name);
set_exc_info(exc,st.filename,..._location)
throw exc}
val |=DEF_COMP_ITER}
o=val
if(o==NULL){return 0}
_b_.dict.$setitem(dict,mangled,o)
if(flag & DEF_PARAM){ste.varnames.push(mangled)}else if(flag & DEF_GLOBAL){
val=flag
if(st.global.hasOwnProperty(mangled)){
val |=st.global[mangled]}
o=val
if(o==NULL){return 0}
st.global[mangled]=o}
return 1}
function symtable_add_def(st,name,flag,_location){return symtable_add_def_helper(st,name,flag,st.cur,_location);}
function VISIT_QUIT(ST,X){return X}
function VISIT(ST,TYPE,V){var f=eval(`symtable_visit_${TYPE}`)
if(!f(ST,V)){VISIT_QUIT(ST,0);}}
function VISIT_SEQ(ST,TYPE,SEQ){for(var elt of SEQ){if(! eval(`symtable_visit_${TYPE}`)(ST,elt)){VISIT_QUIT(ST,0)}}}
function VISIT_SEQ_TAIL(ST,TYPE,SEQ,START){for(var i=START,len=SEQ.length;i < len;i++){var elt=SEQ[i];
if(! eval(`symtable_visit_${TYPE}`)((ST),elt)){VISIT_QUIT(ST,0)}}}
function VISIT_SEQ_WITH_NULL(ST,TYPE,SEQ){for(var elt of SEQ){if(! elt){continue }
if(! eval(`symtable_visit_${TYPE}`)(ST,elt)){VISIT_QUIT((ST),0)}}}
function symtable_record_directive(st,name,lineno,col_offset,end_lineno,end_col_offset){var data,mangled,res;
if(!st.cur.directives){st.cur.directives=[]}
mangled=_Py_Mangle(st.private,name);
if(!mangled){return 0;}
data=$B.fast_tuple([mangled,lineno,col_offset,end_lineno,end_col_offset])
st.cur.directives.push(data);
return true}
function symtable_visit_stmt(st,s){switch(s.constructor){case $B.ast.FunctionDef:
if(!symtable_add_def(st,s.name,DEF_LOCAL,LOCATION(s)))
VISIT_QUIT(st,0)
if(s.args.defaults)
VISIT_SEQ(st,expr,s.args.defaults)
if(s.args.kw_defaults)
VISIT_SEQ_WITH_NULL(st,expr,s.args.kw_defaults)
if(!symtable_visit_annotations(st,s,s.args,s.returns))
VISIT_QUIT(st,0)
if(s.decorator_list){VISIT_SEQ(st,expr,s.decorator_list)}
if(!symtable_enter_block(st,s.name,FunctionBlock,s,...LOCATION(s))){VISIT_QUIT(st,0)}
VISIT(st,'arguments',s.args)
VISIT_SEQ(st,stmt,s.body)
if(!symtable_exit_block(st)){VISIT_QUIT(st,0)}
break;
case $B.ast.ClassDef:
var tmp;
if(!symtable_add_def(st,s.name,DEF_LOCAL,LOCATION(s)))
VISIT_QUIT(st,0)
VISIT_SEQ(st,expr,s.bases)
VISIT_SEQ(st,keyword,s.keywords)
if(s.decorator_list)
VISIT_SEQ(st,expr,s.decorator_list);
if(!symtable_enter_block(st,s.name,ClassBlock,s,s.lineno,s.col_offset,s.end_lineno,s.end_col_offset))
VISIT_QUIT(st,0)
tmp=st.private
st.private=s.name
VISIT_SEQ(st,stmt,s.body)
st.private=tmp
if(! symtable_exit_block(st))
VISIT_QUIT(st,0)
break
case $B.ast.Return:
if(s.value){VISIT(st,expr,s.value)
st.cur.returns_value=1}
break
case $B.ast.Delete:
VISIT_SEQ(st,expr,s.targets)
break
case $B.ast.Assign:
VISIT_SEQ(st,expr,s.targets)
VISIT(st,expr,s.value)
break
case $B.ast.AnnAssign:
if(s.target instanceof $B.ast.Name){var e_name=s.target
var cur=symtable_lookup(st,e_name.id)
if(cur < 0){VISIT_QUIT(st,0)}
if((cur &(DEF_GLOBAL |DEF_NONLOCAL))
&&(st.cur.symbols !=st.global)
&& s.simple){var exc=PyErr_Format(_b_.SyntaxError,cur & DEF_GLOBAL ? GLOBAL_ANNOT :NONLOCAL_ANNOT,e_name.id)
exc.args[1]=[st.filename,s.lineno,s.col_offset+1,s.end_lineno,s.end_col_offset+1]
throw exc}
if(s.simple &&
! symtable_add_def(st,e_name.id,DEF_ANNOT |DEF_LOCAL,LOCATION(e_name))){VISIT_QUIT(st,0)}else{if(s.value
&& !symtable_add_def(st,e_name.id,DEF_LOCAL,LOCATION(e_name))){VISIT_QUIT(st,0)}}}else{VISIT(st,expr,s.target)}
if(!symtable_visit_annotation(st,s.annotation)){VISIT_QUIT(st,0)}
if(s.value){VISIT(st,expr,s.value)}
break
case $B.ast.AugAssign:
VISIT(st,expr,s.target)
VISIT(st,expr,s.value)
break
case $B.ast.For:
VISIT(st,expr,s.target)
VISIT(st,expr,s.iter)
VISIT_SEQ(st,stmt,s.body)
if(s.orelse){VISIT_SEQ(st,stmt,s.orelse)}
break
case $B.ast.While:
VISIT(st,expr,s.test)
VISIT_SEQ(st,stmt,s.body)
if(s.orelse){VISIT_SEQ(st,stmt,s.orelse)}
break
case $B.ast.If:
VISIT(st,expr,s.test)
VISIT_SEQ(st,stmt,s.body)
if(s.orelse){VISIT_SEQ(st,stmt,s.orelse)}
break
case $B.ast.Match:
VISIT(st,expr,s.subject)
VISIT_SEQ(st,match_case,s.cases)
break
case $B.ast.Raise:
if(s.exc){VISIT(st,expr,s.exc)
if(s.cause){VISIT(st,expr,s.cause)}}
break
case $B.ast.Try:
VISIT_SEQ(st,stmt,s.body)
VISIT_SEQ(st,stmt,s.orelse)
VISIT_SEQ(st,excepthandler,s.handlers)
VISIT_SEQ(st,stmt,s.finalbody)
break
case $B.ast.TryStar:
VISIT_SEQ(st,stmt,s.body)
VISIT_SEQ(st,stmt,s.orelse)
VISIT_SEQ(st,excepthandler,s.handlers)
VISIT_SEQ(st,stmt,s.finalbody)
break
case $B.ast.Assert:
VISIT(st,expr,s.test)
if(s.msg){VISIT(st,expr,s.msg);}
break
case $B.ast.Import:
VISIT_SEQ(st,alias,s.names)
break
case $B.ast.ImportFrom:
VISIT_SEQ(st,alias,s.names)
break
case $B.ast.Global:
var seq=s.names
for(var name of seq){var cur=symtable_lookup(st,name)
if(cur < 0){VISIT_QUIT(st,0)}
if(cur &(DEF_PARAM |DEF_LOCAL |USE |DEF_ANNOT)){var msg
if(cur & DEF_PARAM){msg=GLOBAL_PARAM}else if(cur & USE){msg=GLOBAL_AFTER_USE}else if(cur & DEF_ANNOT){msg=GLOBAL_ANNOT}else{
msg=GLOBAL_AFTER_ASSIGN}
var exc=PyErr_Format(_b_.SyntaxError,msg,name)
set_exc_info(exc,st.filename,s.lineno,s.col_offset,s.end_lineno,s.end_col_offset)
throw exc}
if(! symtable_add_def(st,name,DEF_GLOBAL,LOCATION(s)))
VISIT_QUIT(st,0)
if(! symtable_record_directive(st,name,s.lineno,s.col_offset,s.end_lineno,s.end_col_offset))
VISIT_QUIT(st,0)}
break
case $B.ast.Nonlocal:
var seq=s.names;
for(var name of seq){var cur=symtable_lookup(st,name)
if(cur < 0){VISIT_QUIT(st,0)}
if(cur &(DEF_PARAM |DEF_LOCAL |USE |DEF_ANNOT)){var msg
if(cur & DEF_PARAM){msg=NONLOCAL_PARAM}else if(cur & USE){msg=NONLOCAL_AFTER_USE}else if(cur & DEF_ANNOT){msg=NONLOCAL_ANNOT}else{
msg=NONLOCAL_AFTER_ASSIGN}
var exc=PyErr_Format(_b_.SyntaxError,msg,name)
set_exc_info(exc,st.filename,s.lineno,s.col_offset,s.end_lineno,s.end_col_offset)
throw exc}
if(!symtable_add_def(st,name,DEF_NONLOCAL,LOCATION(s)))
VISIT_QUIT(st,0)
if(!symtable_record_directive(st,name,s.lineno,s.col_offset,s.end_lineno,s.end_col_offset))
VISIT_QUIT(st,0)}
break
case $B.ast.Expr:
VISIT(st,expr,s.value)
break
case $B.ast.Pass:
case $B.ast.Break:
case $B.ast.Continue:
break
case $B.ast.With:
VISIT_SEQ(st,'withitem',s.items)
VISIT_SEQ(st,stmt,s.body)
break
case $B.ast.AsyncFunctionDef:
if(!symtable_add_def(st,s.name,DEF_LOCAL,LOCATION(s)))
VISIT_QUIT(st,0)
if(s.args.defaults)
VISIT_SEQ(st,expr,s.args.defaults)
if(s.args.kw_defaults)
VISIT_SEQ_WITH_NULL(st,expr,s.args.kw_defaults)
if(!symtable_visit_annotations(st,s,s.args,s.returns))
VISIT_QUIT(st,0)
if(s.decorator_list)
VISIT_SEQ(st,expr,s.decorator_list)
if(!symtable_enter_block(st,s.name,FunctionBlock,s,s.lineno,s.col_offset,s.end_lineno,s.end_col_offset))
VISIT_QUIT(st,0)
st.cur.coroutine=1
VISIT(st,'arguments',s.args)
VISIT_SEQ(st,stmt,s.body)
if(! symtable_exit_block(st))
VISIT_QUIT(st,0)
break
case $B.ast.AsyncWith:
VISIT_SEQ(st,withitem,s.items)
VISIT_SEQ(st,stmt,s.body)
break
case $B.ast.AsyncFor:
VISIT(st,expr,s.target)
VISIT(st,expr,s.iter)
VISIT_SEQ(st,stmt,s.body)
if(s.orelse){VISIT_SEQ(st,stmt,s.orelse)}
break}
VISIT_QUIT(st,1)}
function symtable_extend_namedexpr_scope(st,e){assert(st.stack);
assert(e instanceof $B.ast.Name);
var target_name=e.id;
var i,size,ste;
size=st.stack.length
assert(size);
for(i=size-1;i >=0;i--){ste=st.stack[i]
if(ste.comprehension){var target_in_scope=_PyST_GetSymbol(ste,target_name);
if(target_in_scope & DEF_COMP_ITER){var exc=PyErr_Format(_b_.SyntaxError,NAMED_EXPR_COMP_CONFLICT,target_name);
set_exc_info(exc,st.filename,e.lineno,e.col_offset,e.ed_lineno,e.end_col_offset)
throw exc}
continue;}
if(ste.type==FunctionBlock){var target_in_scope=_PyST_GetSymbol(ste,target_name);
if(target_in_scope & DEF_GLOBAL){if(!symtable_add_def(st,target_name,DEF_GLOBAL,LOCATION(e)))
VISIT_QUIT(st,0);}else{
if(!symtable_add_def(st,target_name,DEF_NONLOCAL,LOCATION(e)))
VISIT_QUIT(st,0);}
if(!symtable_record_directive(st,target_name,LOCATION(e)))
VISIT_QUIT(st,0);
return symtable_add_def_helper(st,target_name,DEF_LOCAL,ste,LOCATION(e));}
if(ste.type==ModuleBlock){if(!symtable_add_def(st,target_name,DEF_GLOBAL,LOCATION(e)))
VISIT_QUIT(st,0);
if(!symtable_record_directive(st,target_name,LOCATION(e)))
VISIT_QUIT(st,0);
return symtable_add_def_helper(st,target_name,DEF_GLOBAL,ste,LOCATION(e));}
if(ste.type==ClassBlock){var exc=PyErr_Format(_b_.SyntaxError,NAMED_EXPR_COMP_IN_CLASS);
set_exc_info(exc,st.filename,e.lineno,e.col_offset,e.end_lineno,e.end_col_offset);
throw exc}}
assert(0);
return 0;}
function symtable_handle_namedexpr(st,e){if(st.cur.comp_iter_expr > 0){
var exc=PyErr_Format(PyExc_SyntaxError,NAMED_EXPR_COMP_ITER_EXPR);
set_exc_info(exc,st.filename,e.lineno,e.col_offset,e.end_lineno,e.end_col_offset);
throw exc}
if(st.cur.comprehension){
if(!symtable_extend_namedexpr_scope(st,e.target))
return 0;}
VISIT(st,expr,e.value);
VISIT(st,expr,e.target);
return 1;}
const alias='alias',comprehension='comprehension',excepthandler='excepthandler',expr='expr',keyword='keyword',match_case='match_case',pattern='pattern',stmt='stmt',withitem='withitem'
function symtable_visit_expr(st,e){switch(e.constructor){case $B.ast.NamedExpr:
if(!symtable_raise_if_annotation_block(st,"named expression",e)){VISIT_QUIT(st,0);}
if(!symtable_handle_namedexpr(st,e))
VISIT_QUIT(st,0);
break;
case $B.ast.BoolOp:
VISIT_SEQ(st,'expr',e.values);
break;
case $B.ast.BinOp:
VISIT(st,'expr',e.left);
VISIT(st,'expr',e.right);
break;
case $B.ast.UnaryOp:
VISIT(st,'expr',e.operand);
break;
case $B.ast.Lambda:{if(!GET_IDENTIFIER('lambda'))
VISIT_QUIT(st,0);
if(e.args.defaults)
VISIT_SEQ(st,'expr',e.args.defaults);
if(e.args.kw_defaults)
VISIT_SEQ_WITH_NULL(st,'expr',e.args.kw_defaults);
if(!symtable_enter_block(st,lambda,FunctionBlock,e,e.lineno,e.col_offset,e.end_lineno,e.end_col_offset))
VISIT_QUIT(st,0);
VISIT(st,'arguments',e.args);
VISIT(st,'expr',e.body);
if(!symtable_exit_block(st))
VISIT_QUIT(st,0);
break;}
case $B.ast.IfExp:
VISIT(st,'expr',e.test);
VISIT(st,'expr',e.body);
VISIT(st,'expr',e.orelse);
break;
case $B.ast.Dict:
VISIT_SEQ_WITH_NULL(st,'expr',e.keys);
VISIT_SEQ(st,'expr',e.values);
break;
case $B.ast.Set:
VISIT_SEQ(st,'expr',e.elts);
break;
case $B.ast.GeneratorExp:
if(!symtable_visit_genexp(st,e))
VISIT_QUIT(st,0);
break;
case $B.ast.ListComp:
if(!symtable_visit_listcomp(st,e))
VISIT_QUIT(st,0);
break;
case $B.ast.SetComp:
if(!symtable_visit_setcomp(st,e))
VISIT_QUIT(st,0);
break;
case $B.ast.DictComp:
if(!symtable_visit_dictcomp(st,e))
VISIT_QUIT(st,0);
break;
case $B.ast.Yield:
if(!symtable_raise_if_annotation_block(st,"yield expression",e)){VISIT_QUIT(st,0);}
if(e.value)
VISIT(st,'expr',e.value);
st.cur.generator=1;
if(st.cur.comprehension){return symtable_raise_if_comprehension_block(st,e);}
break;
case $B.ast.YieldFrom:
if(!symtable_raise_if_annotation_block(st,"yield expression",e)){VISIT_QUIT(st,0);}
VISIT(st,'expr',e.value);
st.cur.generator=1;
if(st.cur.comprehension){return symtable_raise_if_comprehension_block(st,e);}
break;
case $B.ast.Await:
if(!symtable_raise_if_annotation_block(st,"await expression",e)){VISIT_QUIT(st,0);}
VISIT(st,'expr',e.value);
st.cur.coroutine=1;
break;
case $B.ast.Compare:
VISIT(st,'expr',e.left);
VISIT_SEQ(st,'expr',e.comparators);
break;
case $B.ast.Call:
VISIT(st,'expr',e.func);
VISIT_SEQ(st,'expr',e.args);
VISIT_SEQ_WITH_NULL(st,'keyword',e.keywords);
break;
case $B.ast.FormattedValue:
VISIT(st,'expr',e.value);
if(e.format_spec)
VISIT(st,'expr',e.format_spec);
break;
case $B.ast.JoinedStr:
VISIT_SEQ(st,'expr',e.values);
break;
case $B.ast.Constant:
break;
case $B.ast.Attribute:
VISIT(st,'expr',e.value);
break;
case $B.ast.Subscript:
VISIT(st,'expr',e.value);
VISIT(st,'expr',e.slice);
break;
case $B.ast.Starred:
VISIT(st,'expr',e.value);
break;
case $B.ast.Slice:
if(e.lower)
VISIT(st,expr,e.lower)
if(e.upper)
VISIT(st,expr,e.upper)
if(e.step)
VISIT(st,expr,e.step)
break;
case $B.ast.Name:
var flag=e.ctx instanceof $B.ast.Load ? USE :DEF_LOCAL
if(! symtable_add_def(st,e.id,flag,LOCATION(e)))
VISIT_QUIT(st,0);
if(e.ctx instanceof $B.ast.Load &&
st.cur.type===$B.ast.FunctionDef &&
e.id=="super"){if(!GET_IDENTIFIER('__class__')||
!symtable_add_def(st,'__class__',USE,LOCATION(e)))
VISIT_QUIT(st,0);}
break;
case $B.ast.List:
VISIT_SEQ(st,expr,e.elts);
break;
case $B.ast.Tuple:
VISIT_SEQ(st,expr,e.elts);
break;}
VISIT_QUIT(st,1);}
function symtable_visit_pattern(st,p){switch(p.constructor){case $B.ast.MatchValue:
VISIT(st,expr,p.value);
break;
case $B.ast.MatchSingleton:
break;
case $B.ast.MatchSequence:
VISIT_SEQ(st,pattern,p.patterns);
break;
case $B.ast.MatchStar:
if(p.name){symtable_add_def(st,p.name,DEF_LOCAL,LOCATION(p));}
break;
case $B.ast.MatchMapping:
VISIT_SEQ(st,expr,p.keys);
VISIT_SEQ(st,pattern,p.patterns);
if(p.rest){symtable_add_def(st,p.rest,DEF_LOCAL,LOCATION(p));}
break;
case $B.ast.MatchClass:
VISIT(st,expr,p.cls);
VISIT_SEQ(st,pattern,p.patterns);
VISIT_SEQ(st,pattern,p.kwd_patterns);
break;
case $B.ast.MatchAs:
if(p.pattern){VISIT(st,pattern,p.pattern);}
if(p.name){symtable_add_def(st,p.name,DEF_LOCAL,LOCATION(p));}
break;
case $B.ast.MatchOr:
VISIT_SEQ(st,pattern,p.patterns);
break;}
VISIT_QUIT(st,1);}
function symtable_implicit_arg(st,pos){var id='.'+pos
if(!symtable_add_def(st,id,DEF_PARAM,ST_LOCATION(st.cur))){return 0;}
return 1;}
function symtable_visit_params(st,args){var i;
if(!args)
return-1;
for(var arg of args){if(!symtable_add_def(st,arg.arg,DEF_PARAM,LOCATION(arg)))
return 0;}
return 1;}
function symtable_visit_annotation(st,annotation){var future_annotations=st.future.features & CO_FUTURE_ANNOTATIONS;
if(future_annotations &&
!symtable_enter_block(st,'_annotation',AnnotationBlock,annotation,annotation.lineno,annotation.col_offset,annotation.end_lineno,annotation.end_col_offset)){VISIT_QUIT(st,0);}
VISIT(st,expr,annotation);
if(future_annotations && !symtable_exit_block(st)){VISIT_QUIT(st,0);}
return 1;}
function symtable_visit_argannotations(st,args){var i;
if(!args)
return-1;
for(var arg of args){if(arg.annotation)
VISIT(st,expr,arg.annotation);}
return 1;}
function symtable_visit_annotations(st,o,a,returns){var future_annotations=st.future.ff_features & CO_FUTURE_ANNOTATIONS;
if(future_annotations &&
!symtable_enter_block(st,'_annotation',AnnotationBlock,o,o.lineno,o.col_offset,o.end_lineno,o.end_col_offset)){VISIT_QUIT(st,0);}
if(a.posonlyargs && !symtable_visit_argannotations(st,a.posonlyargs))
return 0;
if(a.args && !symtable_visit_argannotations(st,a.args))
return 0;
if(a.vararg && a.vararg.annotation)
VISIT(st,expr,a.vararg.annotation);
if(a.kwarg && a.kwarg.annotation)
VISIT(st,expr,a.kwarg.annotation);
if(a.kwonlyargs && !symtable_visit_argannotations(st,a.kwonlyargs))
return 0;
if(future_annotations && !symtable_exit_block(st)){VISIT_QUIT(st,0);}
if(returns && !symtable_visit_annotation(st,returns)){VISIT_QUIT(st,0);}
return 1;}
function symtable_visit_arguments(st,a){
if(a.posonlyargs && !symtable_visit_params(st,a.posonlyargs))
return 0;
if(a.args && !symtable_visit_params(st,a.args))
return 0;
if(a.kwonlyargs && !symtable_visit_params(st,a.kwonlyargs))
return 0;
if(a.vararg){if(!symtable_add_def(st,a.vararg.arg,DEF_PARAM,LOCATION(a.vararg)))
return 0;
st.cur.varargs=1;}
if(a.kwarg){if(!symtable_add_def(st,a.kwarg.arg,DEF_PARAM,LOCATION(a.kwarg)))
return 0;
st.cur.varkeywords=1;}
return 1;}
function symtable_visit_excepthandler(st,eh){if(eh.type)
VISIT(st,expr,eh.type);
if(eh.name)
if(!symtable_add_def(st,eh.name,DEF_LOCAL,LOCATION(eh)))
return 0;
VISIT_SEQ(st,stmt,eh.body);
return 1;}
function symtable_visit_withitem(st,item){VISIT(st,'expr',item.context_expr);
if(item.optional_vars){VISIT(st,'expr',item.optional_vars);}
return 1;}
function symtable_visit_match_case(st,m){VISIT(st,pattern,m.pattern);
if(m.guard){VISIT(st,expr,m.guard);}
VISIT_SEQ(st,stmt,m.body);
return 1;}
function symtable_visit_alias(st,a){
var store_name,name=(a.asname==NULL)? a.name :a.asname;
var dot=name.search('\\.');
if(dot !=-1){store_name=name.substring(0,dot);
if(!store_name)
return 0;}else{store_name=name;}
if(name !="*"){var r=symtable_add_def(st,store_name,DEF_IMPORT,LOCATION(a));
return r;}else{if(st.cur.type !=ModuleBlock){var lineno=a.lineno,col_offset=a.col_offset,end_lineno=a.end_lineno,end_col_offset=a.end_col_offset;
var exc=PyErr_SetString(PyExc_SyntaxError,IMPORT_STAR_WARNING);
set_exc_info(exc,st.filename,lineno,col_offset,end_lineno,end_col_offset);
throw exc}
st.cur.$has_import_star=true
return 1;}}
function symtable_visit_comprehension(st,lc){st.cur.comp_iter_target=1;
VISIT(st,expr,lc.target);
st.cur.comp_iter_target=0;
st.cur.comp_iter_expr++;
VISIT(st,expr,lc.iter);
st.cur.comp_iter_expr--;
VISIT_SEQ(st,expr,lc.ifs);
if(lc.is_async){st.cur.coroutine=1;}
return 1;}
function symtable_visit_keyword(st,k){VISIT(st,expr,k.value);
return 1;}
function symtable_handle_comprehension(st,e,scope_name,generators,elt,value){var is_generator=(e.constructor===$B.ast.GeneratorExp);
var outermost=generators[0]
st.cur.comp_iter_expr++;
VISIT(st,expr,outermost.iter);
st.cur.comp_iter_expr--;
if(!scope_name ||
!symtable_enter_block(st,scope_name,FunctionBlock,e,e.lineno,e.col_offset,e.end_lineno,e.end_col_offset)){return 0;}
switch(e.constructor){case $B.ast.ListComp:
st.cur.comprehension=ListComprehension;
break;
case $B.ast.SetComp:
st.cur.comprehension=SetComprehension;
break;
case $B.ast.DictComp:
st.cur.comprehension=DictComprehension;
break;
default:
st.cur.comprehension=GeneratorExpression;
break;}
if(outermost.is_async){st.cur.coroutine=1;}
if(!symtable_implicit_arg(st,0)){symtable_exit_block(st);
return 0;}
st.cur.comp_iter_target=1;
VISIT(st,expr,outermost.target);
st.cur.comp_iter_target=0;
VISIT_SEQ(st,expr,outermost.ifs);
VISIT_SEQ_TAIL(st,comprehension,generators,1);
if(value)
VISIT(st,expr,value);
VISIT(st,expr,elt);
st.cur.generator=is_generator;
var is_async=st.cur.coroutine && !is_generator;
if(!symtable_exit_block(st)){return 0;}
if(is_async){st.cur.coroutine=1;}
return 1;}
function symtable_visit_genexp(st,e){return symtable_handle_comprehension(st,e,'genexpr',e.generators,e.elt,NULL);}
function symtable_visit_listcomp(st,e){return symtable_handle_comprehension(st,e,'listcomp',e.generators,e.elt,NULL);}
function symtable_visit_setcomp(st,e){return symtable_handle_comprehension(st,e,'setcomp',e.generators,e.elt,NULL);}
function symtable_visit_dictcomp(st,e){return symtable_handle_comprehension(st,e,'dictcomp',e.generators,e.key,e.value);}
function symtable_raise_if_annotation_block(st,name,e){if(st.cur.type !=AnnotationBlock){return 1;}
var exc=PyErr_Format(PyExc_SyntaxError,ANNOTATION_NOT_ALLOWED,name);
set_exc_info(exc,st.filename,e.lineno,e.col_offset,e.end_lineno,e.end_col_offset);
throw exc}
function symtable_raise_if_comprehension_block(st,e){var type=st.cur.comprehension;
PyErr_SetString(PyExc_SyntaxError,(type==ListComprehension)? "'yield' inside list comprehension" :
(type==SetComprehension)? "'yield' inside set comprehension" :
(type==DictComprehension)? "'yield' inside dict comprehension" :
"'yield' inside generator expression");
PyErr_RangedSyntaxLocationObject(st.filename,e.lineno,e.col_offset+1,e.end_lineno,e.end_col_offset+1);
VISIT_QUIT(st,0);}
function _Py_SymtableStringObjectFlags(str,filename,start,flags){var st,mod,arena;
arena=_PyArena_New();
if(arena==NULL)
return NULL;
mod=_PyParser_ASTFromString(str,filename,start,flags,arena);
if(mod==NULL){_PyArena_Free(arena);
return NULL;}
var future=_PyFuture_FromAST(mod,filename);
if(future==NULL){_PyArena_Free(arena);
return NULL;}
future.features |=flags.cf_flags;
st=_PySymtable_Build(mod,filename,future);
PyObject_Free(future);
_PyArena_Free(arena);
return st;}})(__BRYTHON__)
;
(function($B){var _b_=$B.builtins
var s_escaped='abfnrtvxuU"0123456789'+"'"+'\\',is_escaped={}
for(var i=0;i < s_escaped.length;i++){is_escaped[s_escaped.charAt(i)]=true}
function string_error(token,msg){var a={lineno:token.start[0],col_offset:token.start[1],end_lineno:token.end[0],end_col_offset:token.end[1]}
$B.Parser.RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a,msg)}
function test_escape(token,context,text,string_start,antislash_pos){
var seq_end,mo
mo=/^[0-7]{1,3}/.exec(text.substr(antislash_pos+1))
if(mo){return[String.fromCharCode(parseInt(mo[0],8)),1+mo[0].length]}
switch(text[antislash_pos+1]){case "x":
var mo=/^[0-9A-F]{0,2}/i.exec(text.substr(antislash_pos+2))
if(mo[0].length !=2){seq_end=antislash_pos+mo[0].length+1
$token.value.start[1]=seq_end
string_error(token,["(unicode error) 'unicodeescape' codec can't decode "+
`bytes in position ${antislash_pos}-${seq_end}: truncated `+
"\\xXX escape"])}else{return[String.fromCharCode(parseInt(mo[0],16)),2+mo[0].length]}
case "u":
var mo=/^[0-9A-F]{0,4}/i.exec(text.substr(antislash_pos+2))
if(mo[0].length !=4){seq_end=antislash_pos+mo[0].length+1
$token.value.start[1]=seq_end
string_error(token,["(unicode error) 'unicodeescape' codec can't decode "+
`bytes in position ${antislash_pos}-${seq_end}: truncated `+
"\\uXXXX escape"])}else{return[String.fromCharCode(parseInt(mo[0],16)),2+mo[0].length]}
case "U":
var mo=/^[0-9A-F]{0,8}/i.exec(text.substr(antislash_pos+2))
if(mo[0].length !=8){seq_end=antislash_pos+mo[0].length+1
$token.value.start[1]=seq_end
string_error(token,["(unicode error) 'unicodeescape' codec can't decode "+
`bytes in position ${antislash_pos}-${seq_end}: truncated `+
"\\uXXXX escape"])}else{var value=parseInt(mo[0],16)
if(value > 0x10FFFF){string_error(token,'invalid unicode escape '+mo[0])}else if(value >=0x10000){return[SurrogatePair(value),2+mo[0].length]}else{return[String.fromCharCode(value),2+mo[0].length]}}}}
$B.prepare_string=function(token){var s=token.string,len=s.length,pos=0,string_modifier,_type="string",context={type:'str'}
while(pos < len){if(s[pos]=='"' ||s[pos]=="'"){quote=s[pos]
string_modifier=s.substr(0,pos)
if(s.substr(pos,3)==quote.repeat(3)){_type="triple_string"
inner=s.substring(pos+3,s.length-3)}else{inner=s.substring(pos+quote.length,len-quote.length)}
break}
pos++}
var result={quote}
var mods={r:'raw',f:'fstring',b:'bytes'}
for(var mod of string_modifier){result[mods[mod]]=true}
var raw=context.type=='str' && context.raw,string_start=pos+1,bytes=false,fstring=false,sm_length,
end=null;
if(string_modifier){switch(string_modifier){case 'r':
raw=true
break
case 'u':
break
case 'b':
bytes=true
break
case 'rb':
case 'br':
bytes=true
raw=true
break
case 'f':
fstring=true
sm_length=1
break
case 'fr':
case 'rf':
fstring=true
sm_length=2
raw=true
break}
string_modifier=false}
var escaped=false,zone='',end=0,src=inner
while(end < src.length){if(escaped){if(src.charAt(end)=="a" && ! raw){zone=zone.substr(0,zone.length-1)+"\u0007"}else{zone+=src.charAt(end)
if(raw && src.charAt(end)=='\\'){zone+='\\'}}
escaped=false
end++}else if(src.charAt(end)=="\\"){if(raw){if(end < src.length-1 &&
src.charAt(end+1)==quote){zone+='\\\\'+quote
end+=2}else{zone+='\\\\'
end++}
escaped=true}else{if(src.charAt(end+1)=='\n'){
end+=2}else if(src.substr(end+1,2)=='N{'){
var end_lit=end+3,re=new RegExp("[-a-zA-Z0-9 ]+"),search=re.exec(src.substr(end_lit))
if(search===null){string_error(token,"(unicode error) "+
"malformed \\N character escape",pos)}
var end_lit=end_lit+search[0].length
if(src.charAt(end_lit)!="}"){string_error(token,"(unicode error) "+
"malformed \\N character escape")}
var description=search[0].toUpperCase()
if($B.unicodedb===undefined){var xhr=new XMLHttpRequest
xhr.open("GET",$B.brython_path+"unicode.txt",false)
xhr.onreadystatechange=function(){if(this.readyState==4){if(this.status==200){$B.unicodedb=this.responseText}else{console.log("Warning - could not "+
"load unicode.txt")}}}
xhr.send()}
if($B.unicodedb !==undefined){var re=new RegExp("^([0-9A-F]+);"+
description+";.*$","m")
search=re.exec($B.unicodedb)
if(search===null){string_error(token,"(unicode error) "+
"unknown Unicode character name")}
var cp="0x"+search[1]
zone+=String.fromCodePoint(eval(cp))
end=end_lit+1}else{end++}}else{var esc=test_escape(token,context,src,string_start,end)
if(esc){if(esc[0]=='\\'){zone+='\\\\'}else{zone+=esc[0]}
end+=esc[1]}else{if(end < src.length-1 &&
is_escaped[src.charAt(end+1)]===undefined){zone+='\\'}
zone+='\\'
escaped=true
end++}}}}else if(src.charAt(end)=='\n' && _type !='triple_string'){
console.log(pos,end,src.substring(pos,end))
string_error(token,["EOL while scanning string literal"])}else{zone+=src.charAt(end)
end++}}
var $string=zone,string=''
for(var i=0;i < $string.length;i++){var $car=$string.charAt(i)
if($car==quote){if(raw ||(i==0 ||
$string.charAt(i-1)!='\\')){string+='\\'}else if(_type=="triple_string"){
var j=i-1
while($string.charAt(j)=='\\'){j--}
if((i-j-1)% 2==0){string+='\\'}}}
string+=$car}
if(fstring){try{var re=new RegExp("\\\\"+quote,"g"),string_no_bs=string.replace(re,quote)
var elts=$B.parse_fstring(string_no_bs)}catch(err){string_error(token,err.message)}}
if(bytes){result.value='b'+quote+string+quote}else if(fstring){result.value=elts}else{result.value=quote+string+quote}
context.raw=raw;
return result}})(__BRYTHON__)
;
(function($B){function test_num(num_lit){var len=num_lit.length,pos=0,char,elt=null,subtypes={b:'binary',o:'octal',x:'hexadecimal'},digits_re=/[_\d]/
function error(message){throw SyntaxError(message)}
function check(elt){if(elt.value.length==0){var t=subtypes[elt.subtype]||'decimal'
error("invalid "+t+" literal")}else if(elt.value[elt.value.length-1].match(/[\-+_]/)){var t=subtypes[elt.subtype]||'decimal'
error("invalid "+t+" literal")}else{
elt.value=elt.value.replace(/_/g,"")
elt.length=pos
return elt}}
while(pos < len){var char=num_lit[pos]
if(char.match(digits_re)){if(elt===null){elt={value:char}}else{if(char=='_' && elt.value.match(/[._+\-]$/)){
error('consecutive _ at '+pos)}else if(char=='_' && elt.subtype=='float' &&
elt.value.match(/e$/i)){
error('syntax error')}else if(elt.subtype=='b' && !(char.match(/[01_]/))){error(`invalid digit '${char}' in binary literal`)}else if(elt.subtype=='o' && !(char.match(/[0-7_]/))){error(`invalid digit '${char}' in octal literal`)}else if(elt.subtype===undefined && elt.value.startsWith("0")&&
!char.match(/[0_]/)){error("leading zeros in decimal integer literals are not"+
" permitted; use an 0o prefix for octal integers")}
elt.value+=char}
pos++}else if(char.match(/[oxb]/i)){if(elt.value=="0"){elt.subtype=char.toLowerCase()
if(elt.subtype=="x"){digits_re=/[_\da-fA-F]/}
elt.value=''
pos++}else{error("invalid char "+char)}}else if(char=='.'){if(elt===null){error("invalid char in "+num_lit+" pos "+pos+": "+char)}else if(elt.subtype===undefined){elt.subtype="float"
if(elt.value.endsWith('_')){error("invalid decimal literal")}
elt.value=elt.value.replace(/_/g,"")+char
pos++}else{return check(elt)}}else if(char.match(/e/i)){if(num_lit[pos+1]===undefined){error("nothing after e")}else if(elt && subtypes[elt.subtype]!==undefined){
error("syntax error")}else if(elt && elt.value.endsWith('_')){
error("syntax error")}else if(num_lit[pos+1].match(/[+\-0-9_]/)){if(elt && elt.value){if(elt.exp){elt.length=pos
return elt}
elt.subtype='float'
elt.value+=char
elt.exp=true
pos++}else{error("unexpected e")}}else{return check(elt)}}else if(char.match(/[\+\-]/i)){if(elt===null){elt={value:char}
pos++}else if(elt.value.search(/e$/i)>-1){elt.value+=char
pos++}else{return check(elt)}}else if(char.match(/j/i)){if(elt &&(! elt.subtype ||elt.subtype=="float")){elt.imaginary=true
check(elt)
elt.length++
return elt}else{error("invalid syntax")}}else{break}}
return check(elt)}
$B.prepare_number=function(n){
n=n.replace(/_/g,"")
if(n.startsWith('.')){if(n.endsWith("j")){return{type:'imaginary',value:$B.prepare_number(n.substr(0,n.length-1))}}else{return{type:'float',value:n}}
pos=j}else if(n.startsWith('0')&& n !='0'){
var num=test_num(n),base
if(num.imaginary){return{type:'imaginary',value:$B.prepare_number(num.value)}}
if(num.subtype=='float'){return{type:num.subtype,value:num.value}}
if(num.subtype===undefined){base=10}else{base={'b':2,'o':8,'x':16}[num.subtype]}
if(base !==undefined){return{type:'int',value:[base,num.value]}}}else{var num=test_num(n)
if(num.subtype=="float"){if(num.imaginary){return{
type:'imaginary',value:$B.prepare_number(num.value)}}else{return{
type:'float',value:num.value}}}else{if(num.imaginary){return{
type:'imaginary',value:$B.prepare_number(num.value)}}else{return{
type:'int',value:[10,num.value]}}}}}})(__BRYTHON__)
;

(function($B){var _b_=$B.builtins,NULL=undefined,DOT='.',ELLIPSIS='...',DEL_TARGETS='del_targets'
function EXTRA_EXPR(head,tail){return{
lineno:head.lineno,col_offset:head.col_offset,end_lineno:tail.end_lineno,end_col_offset:tail.end_col_offset}}
function set_list(list,other){for(var item of other){list.push(item)}}
var positions=['lineno','col_offset','end_lineno','end_col_offset']
function set_position_from_list(ast_obj,EXTRA){for(var i=0;i < 4;i++){ast_obj[positions[i]]=EXTRA[i]}}
function set_position_from_token(ast_obj,token){ast_obj.lineno=token.start[0]
ast_obj.col_offset=token.start[1]
ast_obj.end_lineno=token.end[0]
ast_obj.end_col_offset=token.end[1]}
function set_position_from_obj(ast_obj,obj){for(var position of positions){ast_obj[position]=obj[position]}}
function _get_names(p,names_with_defaults){var seq=[]
for(var pair of names_with_defaults){seq.push(pair.arg)}
return seq}
function _get_defaults(p,names_with_defaults){var seq=[]
for(var pair of names_with_defaults){seq.push(pair.value)}
return seq}
function _make_posonlyargs(p,slash_without_default,slash_with_default,posonlyargs){if(slash_without_default !=NULL){set_list(posonlyargs,slash_without_default)}else if(slash_with_default !=NULL){slash_with_default_names=
_get_names(p,slash_with_default.names_with_defaults);
if(!slash_with_default_names){return-1;}
set_list(posonlyargs,$B._PyPegen.join_sequences(
p,slash_with_default.plain_names,slash_with_default_names))}
return posonlyargs==NULL ?-1 :0;}
function _make_posargs(p,plain_names,names_with_default,posargs){if(plain_names !=NULL && names_with_default !=NULL){names_with_default_names=_get_names(p,names_with_default);
if(!names_with_default_names){return-1;}
var seqs=$B._PyPegen.join_sequences(
p,plain_names,names_with_default_names)
set_list(posargs,seqs);}else if(plain_names==NULL && names_with_default !=NULL){set_list(posargs,_get_names(p,names_with_default))}
else if(plain_names !=NULL && names_with_default==NULL){set_list(posargs,plain_names)}
return posargs==NULL ?-1 :0;}
function _make_posdefaults(p,slash_with_default,names_with_default,posdefaults){if(slash_with_default !=NULL && names_with_default !=NULL){var slash_with_default_values=
_get_defaults(p,slash_with_default.names_with_defaults);
if(!slash_with_default_values){return-1;}
var names_with_default_values=_get_defaults(p,names_with_default);
if(!names_with_default_values){return-1;}
set_list(posdefaults,$B._PyPegen.join_sequences(
p,slash_with_default_values,names_with_default_values))}else if(slash_with_default==NULL && names_with_default !=NULL){set_list(posdefaults,_get_defaults(p,names_with_default))}
else if(slash_with_default !=NULL && names_with_default==NULL){set_list(posdefaults,_get_defaults(p,slash_with_default.names_with_defaults))}
return posdefaults==NULL ?-1 :0;}
function _make_kwargs(p,star_etc,kwonlyargs,kwdefaults){if(star_etc !=NULL && star_etc.kwonlyargs !=NULL){set_list(kwonlyargs,_get_names(p,star_etc.kwonlyargs))}else{
set_list(kwonlyargs,[])}
if(kwonlyargs==NULL){return-1;}
if(star_etc !=NULL && star_etc.kwonlyargs !=NULL){set_list(kwdefaults,_get_defaults(p,star_etc.kwonlyargs))}
else{
set_list(kwdefaults,[])}
if(kwdefaults==NULL){return-1;}
return 0;}
function _seq_number_of_starred_exprs(seq){var n=0
for(var k of seq){if(! k.is_keyword){n++;}}
return n}
$B._PyPegen={}
$B._PyPegen.seq_count_dots=function(seq){if(seq===undefined){return 0}
var number_of_dots=0;
for(var current_expr of seq){if(current_expr instanceof $B.ast.Constant){switch(current_expr.value){case ELLIPSIS:
number_of_dots+=3;
break;
case DOT:
number_of_dots+=1;
break;
default:
Py_UNREACHABLE();}}}
return number_of_dots;}
$B._PyPegen.map_names_to_ids=function(p,seq){return seq.map(e=> e.id)}
$B._PyPegen.alias_for_star=function(p,lineno,col_offset,end_lineno,end_col_offset,arena){var str="*"
return $B._PyAST.alias(str,NULL,lineno,col_offset,end_lineno,end_col_offset,arena);}
$B._PyPegen.cmpop_expr_pair=function(p,cmpop,expr){return{cmpop,expr}}
$B._PyPegen.get_cmpops=function(p,seq){var new_seq=[]
for(var pair of seq){new_seq.push(pair.cmpop)}
return new_seq}
$B._PyPegen.get_exprs=function(p,seq){var new_seq=[]
for(var pair of seq){new_seq.push(pair.expr)}
return new_seq}
function _set_seq_context(p,seq,ctx){var new_seq=[]
for(var e of seq){new_seq.push($B._PyPegen.set_expr_context(p,e,ctx))}
return new_seq}
function _set_name_context(p,e,ctx){return $B._PyAST.Name(e.id,ctx,EXTRA_EXPR(e,e))}
function _set_tuple_context(p,e,ctx){return $B._PyAST.Tuple(
_set_seq_context(p,e.elts,ctx),ctx,EXTRA_EXPR(e,e));}
function _set_list_context(p,e,ctx){return $B._PyAST.List(
_set_seq_context(p,e.elts,ctx),ctx,EXTRA_EXPR(e,e));}
function _set_subscript_context(p,e,ctx){return $B._PyAST.Subscript(e.value,e.slice,ctx,EXTRA_EXPR(e,e));}
function _set_attribute_context(p,e,ctx){return $B._PyAST.Attribute(e.value,e.attr,ctx,EXTRA_EXPR(e,e));}
function _set_starred_context(p,e,ctx){return $B._PyAST.Starred($B._PyPegen.set_expr_context(p,e.value,ctx),ctx,EXTRA_EXPR(e,e));}
$B._PyPegen.set_expr_context=function(p,expr,ctx){var _new=NULL;
switch(expr.constructor){case $B.ast.Name:
_new=_set_name_context(p,expr,ctx);
break;
case $B.ast.Tuple:
_new=_set_tuple_context(p,expr,ctx);
break;
case $B.ast.List:
_new=_set_list_context(p,expr,ctx);
break;
case $B.ast.Subscript:
_new=_set_subscript_context(p,expr,ctx);
break;
case $B.ast.Attribute:
_new=_set_attribute_context(p,expr,ctx);
break;
case $B.ast.Starred:
_new=_set_starred_context(p,expr,ctx);
break;
default:
_new=expr;}
return _new;}
$B._PyPegen.key_value_pair=function(p,key,value){return{key,value}}
$B._PyPegen.get_expr_name=function(e){switch(e.constructor.$name){case 'Attribute':
case 'Subscript':
case 'Starred':
case 'Name':
case 'List':
case 'Tuple':
case 'Lambda':
return e.constructor.$name.toLowerCase()
case 'Call':
return "function call"
case 'BoolOp':
case 'BinOp':
case 'UnaryOp':
return "expression"
case 'GeneratorExp':
return "generator expression";
case 'Yield':
case 'YieldFrom':
return "yield expression";
case 'Await':
return "await expression";
case 'ListComp':
return "list comprehension";
case 'SetComp':
return "set comprehension";
case 'DictComp':
return "dict comprehension";
case 'Dict':
return "dict literal";
case 'Set':
return "set display";
case 'JoinedStr':
case 'FormattedValue':
return "f-string expression";
case 'Constant':
var value=e.value
if(value===_b_.None){return "None";}
if(value===false){return "False";}
if(value===true){return "True";}
if(value.type=='ellipsis'){return "ellipsis";}
return "literal";
case 'Compare':
return "comparison";
case 'IfExp':
return "conditional expression";
case 'NamedExpr':
return "named expression";
default:
PyErr_Format(PyExc_SystemError,"unexpected expression in assignment %d (line %d)",e.kind,e.lineno);
return NULL;}}
$B._PyPegen.get_keys=function(p,seq){return seq===undefined ?[]:seq.map(pair=> pair.key)}
$B._PyPegen.get_values=function(p,seq){return seq===undefined ?[]:seq.map(pair=> pair.value)}
$B._PyPegen.key_pattern_pair=function(p,key,pattern){return{key,pattern}}
$B._PyPegen.get_pattern_keys=function(p,seq){return seq===undefined ?[]:seq.map(x=> x.key)}
$B._PyPegen.get_patterns=function(p,seq){return seq===undefined ?[]:seq.map(x=> x.pattern)}
$B._PyPegen.check_legacy_stmt=function(p,name){return["print","exec"].indexOf(name)>-1}
$B._PyPegen.dummy_name=function(p){var cache=NULL;
if(cache !=NULL){return cache;}
var id="",ast_obj=new $B.ast.Name(id,new $B.ast.Load())
set_position_from_list(ast_obj,[1,0,1,0])
return cache;}
$B._PyPegen.add_type_comment_to_arg=function(p,a,tc){if(tc==NULL){return a}
var bytes=_b_.bytes.$factory(tc),tco=$B._PyPegen.new_type_comment(p,bytes);
var ast_obj=$B._PyAST.arg(a.arg,a.annotation,tco,a.lineno,a.col_offset,a.end_lineno,a.end_col_offset,p.arena);
console.log('arg with type comment',ast_obj)
return ast_obj}
$B._PyPegen.check_barry_as_flufl=function(p,t){return false}
$B._PyPegen.empty_arguments=function(p){return $B._PyAST.arguments([],[],NULL,[],[],NULL,[],p.arena)}
$B._PyPegen.augoperator=function(p,kind){return{kind}}
$B._PyPegen.function_def_decorators=function(p,decorators,function_def){var constr=function_def instanceof $B.ast.AsyncFunctionDef ?
$B.ast.AsyncFunctionDef :$B.ast.FunctionDef
var ast_obj=new constr(
function_def.name,function_def.args,function_def.body,decorators,function_def.returns,function_def.type_comment)
for(var position of positions){ast_obj[position]=function_def[position]}
return ast_obj}
$B._PyPegen.class_def_decorators=function(p,decorators,class_def){var ast_obj=$B._PyAST.ClassDef(
class_def.name,class_def.bases,class_def.keywords,class_def.body,decorators)
set_position_from_obj(ast_obj,class_def)
return ast_obj}
$B._PyPegen.keyword_or_starred=function(p,element,is_keyword){return{
element,is_keyword}}
$B._PyPegen.make_arguments=function(p,slash_without_default,slash_with_default,plain_names,names_with_default,star_etc){
var posonlyargs=[]
if(_make_posonlyargs(p,slash_without_default,slash_with_default,posonlyargs)==-1){return NULL;}
var posargs=[]
if(_make_posargs(p,plain_names,names_with_default,posargs)==-1){return NULL;}
var posdefaults=[]
if(_make_posdefaults(p,slash_with_default,names_with_default,posdefaults)==-1){return NULL;}
var vararg=NULL;
if(star_etc !=NULL && star_etc.vararg !=NULL){vararg=star_etc.vararg;}
var kwonlyargs=[],kwdefaults=[];
if(_make_kwargs(p,star_etc,kwonlyargs,kwdefaults)==-1){return NULL;}
var kwarg=NULL;
if(star_etc !=NULL && star_etc.kwarg !=NULL){kwarg=star_etc.kwarg;}
var ast_obj=$B._PyAST.arguments(posonlyargs,posargs,vararg,kwonlyargs,kwdefaults,kwarg,posdefaults,p.arena)
if(ast_obj.posonlyargs===undefined){console.log('pas de posonlyargs',ast_bj)
alert()}
return ast_obj}
$B._PyPegen.name_default_pair=function(p,arg,value,tc){return{
arg:$B._PyPegen.add_type_comment_to_arg(p,arg,tc),value:value}}
$B._PyPegen.raise_error=function(p,errtype,errmsg){if(p.fill==0){var va=[errmsg]
$B._PyPegen.raise_error_known_location(p,errtype,0,0,0,-1,errmsg,va);
return NULL}
var t=p.known_err_token !=NULL ? p.known_err_token :p.tokens[p.fill-1];
var va=errmsg
$B._PyPegen.raise_error_known_location(p,errtype,t.start[0],t.start[1],t.end[0],t.end[1],errmsg,va);}
$B._PyPegen.raise_error_known_location=function(p,errtype,lineno,col_offset,end_lineno,end_col_offset,errmsg,va){var exc=errtype.$factory(errmsg)
exc.filename=p.filename
if(p.knwon_err_token){var token=p.known_err_token
exc.lineno=token.start[0]
exc.offset=token.start[1]
exc.end_lineno=token.end[0]
exc.end_offset=token.end[1]
exc.text=token.line
exc.args[1]=[p.filename,exc.lineno,exc.offset,exc.text,exc.end_lineno,exc.end_offset]}else{exc.lineno=lineno
exc.offset=col_offset
exc.end_lineno=end_lineno
exc.end_offset=end_col_offset
var src=$B.file_cache[p.filename]
if(src !==undefined){var lines=src.split('\n'),line=lines[exc.lineno-1]
exc.text=line+'\n'}else{exc.text=_b_.None}
exc.args[1]=[p.filename,lineno,col_offset,exc.text,end_lineno,end_col_offset]}
throw exc}
$B._PyPegen.seq_delete_starred_exprs=function(p,kwargs){var len=kwargs.length,new_len=len-_seq_number_of_starred_exprs(kwargs)
if(new_len==0){return NULL;}
var new_seq=[]
for(var k of kwargs){if(k.is_keyword){new_seq.push(k.element)}}
return new_seq}
$B._PyPegen.seq_extract_starred_exprs=function(p,kwargs){var new_len=_seq_number_of_starred_exprs(kwargs);
if(new_len==0){return NULL;}
var new_seq=[]
var idx=0;
for(var k of kwargs){if(! k.is_keyword){new_seq[idx++]=k.element}}
return new_seq}
$B._PyPegen.slash_with_default=function(p,plain_names,names_with_defaults){return{plain_names,names_with_defaults}}
$B._PyPegen.star_etc=function(p,vararg,kwonlyargs,kwarg){return{vararg,kwonlyargs,kwarg}}
$B._PyPegen.collect_call_seqs=function(p,a,b,lineno,col_offset,end_lineno,end_col_offset,arena){var args_len=a.length,total_len=args_len;
if(b==NULL){return $B._PyAST.Call($B._PyPegen.dummy_name(p),a,[],lineno,col_offset,end_lineno,end_col_offset,arena);}
var starreds=$B._PyPegen.seq_extract_starred_exprs(p,b),keywords=$B._PyPegen.seq_delete_starred_exprs(p,b);
if(starreds){total_len+=starreds.length}
var args=[]
for(var i=0;i < args_len;i++){args[i]=a[i]}
for(;i < total_len;i++){args[i]=starreds[i-args_len]}
return $B._PyAST.Call($B._PyPegen.dummy_name(p),args,keywords,lineno,col_offset,end_lineno,end_col_offset,arena);}
$B._PyPegen.join_sequences=function(p,a,b){return a.concat(b)}
function make_conversion_code(conv){switch(conv){case null:
return-1
case 'a':
return 97
case 'r':
return 114
case 's':
return 115}}
function make_formatted_value(p,fmt_values){
if(! fmt_values){return}
var seq=[]
for(var item of fmt_values){if(typeof item=='string'){var fmt_ast=new $B.ast.Constant({type:'str',value:item})
set_position_from_obj(fmt_ast,p.arena)}else{var src=item.expression.trimStart()
var _ast=new $B.Parser(src).parse('eval',p.filename)
var raw_value=_ast.body
var fmt_ast=new $B.ast.FormattedValue(raw_value,make_conversion_code(item.conversion),make_formatted_value(p,item.fmt))
set_position_from_obj(fmt_ast,_ast)}
seq.push(fmt_ast)}
var ast_obj=new $B.ast.JoinedStr(seq)
set_position_from_obj(ast_obj,p.arena)
return ast_obj}
$B._PyPegen.concatenate_strings=function(p,strings){
var res='',first=strings[0],last=$B.last(strings),type
var state=NULL,value,values=[]
function error(message){var a={lineno:first.start[0],col_offset:first.start[1],end_lineno :last.end[0],end_col_offset:last.end[1]}
$B.Parser.RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a,message)}
function set_position(ast_obj){ast_obj.lineno=first.start[0]
ast_obj.col_offset=first.start[1]
ast_obj.end_lineno=last.end[0]
ast_obj.end_col_offset=last.end[1]}
var items=[],has_fstring=false,state
for(var token of strings){var s=$B.prepare_string(token),v=s.value
if(Array.isArray(v)){
has_fstring=true
if(state=='bytestring'){error('cannot mix bytes and nonbytes literals')}
for(var fs_item of v){if(typeof fs_item=='string'){fs_item=fs_item.replace(/\\n/g,'\n')
fs_item=fs_item.replace(/\\r/g,'\r')}
items.push(fs_item)}
state='string'}else{if((state=='string' && s.bytes)||
(state=='bytestring' && ! s.bytes)){error('cannot mix bytes and nonbytes literals')}
state=s.bytes ? 'bytestring' :'string'
v=v.replace(/\n/g,'\\n\\\n')
v=v.replace(/\r/g,'\\r\\\r')
try{items.push(s.bytes ? eval(v.substr(1)):eval(v))}catch(err){console.log('error eval',v,'s',s)
throw err}}}
if(state=='bytestring'){
var s=items.join(''),b=_b_.str.encode(s,'iso-8859-1')
var ast_obj=new $B.ast.Constant(b)
set_position(ast_obj)
return ast_obj}
if(! has_fstring){var ast_obj=new $B.ast.Constant(items.join(''))
set_position(ast_obj)
return ast_obj}
var items1=[],has_fstring,i=0
while(i < items.length){if(typeof items[i]!='string'){items1.push(items[i])
i++}else{items1.push(items[i])
i++
while(i < items.length & typeof items[i]=='string'){items1[items1.length-1]+=items[i]
i++}}}
var jstr_values=[]
for(var item of items1){if(typeof item=='string'){var ast_obj=new $B.ast.Constant(item)
set_position_from_token(ast_obj,token)
jstr_values.push(ast_obj)}else{if(item.format !==undefined){var _format=make_formatted_value(p,item.format)}
var src=item.expression.trimStart()
var _ast=new $B.Parser(src).parse('eval',p.filename)
var raw_value=_ast.body
var formatted=new $B.ast.FormattedValue(raw_value,make_conversion_code(item.conversion),_format)
set_position(formatted)
jstr_values.push(formatted)}}
var ast_obj=new $B.ast.JoinedStr(jstr_values)
set_position(ast_obj)
return ast_obj}
$B._PyPegen.ensure_imaginary=function(p,exp){if(!(exp instanceof $B.ast.Constant)||exp.value.type !='imaginary'){$B.Parser.RAISE_SYNTAX_ERROR_KNOWN_LOCATION(exp,"imaginary number required in complex literal");
return NULL}
return exp}
$B._PyPegen.ensure_real=function(p,exp){if(!(exp instanceof $B.ast.Constant)||exp.value.type=='imaginary'){$B.Parser.RAISE_SYNTAX_ERROR_KNOWN_LOCATION(
exp,"real number required in complex literal");
return NULL}
return exp}
$B._PyPegen.set_expr_context=function(p,a,ctx){a.ctx=ctx
return a}
$B._PyPegen.singleton_seq=function(p,a){return[a]}
$B._PyPegen.seq_insert_in_front=function(p,a,seq){return seq ?[a].concat(seq):[a]}
$B._PyPegen.seq_flatten=function(p,seqs){var res=[]
for(var seq of seqs){for(var item of seq){res.push(item)}}
return res}
$B._PyPegen.join_names_with_dot=function(p,first_name,second_name){var str=first_name.id+'.'+second_name.id
return $B._PyAST.Name(str,new $B.ast.Load(),EXTRA_EXPR(first_name,second_name))}
$B._PyPegen.make_module=function(p,a){var res=new $B.ast.Module(a)
return res}
$B._PyPegen.new_type_comment=function(p,s){if(s.length===0){return NULL}
return s}
$B._PyPegen.get_last_comprehension_item=function(comprehension){if(comprehension.ifs==NULL ||comprehension.ifs.length==0){return comprehension.iter;}
return $B.last(comprehension.ifs);}
$B._PyPegen.nonparen_genexp_in_call=function(p,args,comprehensions){
var len=args.args.length
if(len <=1){return NULL;}
var last_comprehension=$B.last(comprehensions);
return $B.Parser.RAISE_SYNTAX_ERROR_KNOWN_RANGE(
args.args[len-1],$B._PyPegen.get_last_comprehension_item(last_comprehension),"Generator expression must be parenthesized"
);}
$B._PyPegen.get_invalid_target=function(e,targets_type){if(e==NULL){return NULL;}
function VISIT_CONTAINER(CONTAINER,TYPE){for(var elt of CONTAINER.elts){var child=$B._PyPegen.get_invalid_target(elt,targets_type);
if(child !=NULL){return child;}}}
switch(e.constructor){case $B.ast.List:
case $B.ast.Tuple:
VISIT_CONTAINER(e,e.constructor);
return NULL;
case $B.ast.Starred:
if(targets_type==DEL_TARGETS){return e;}
return _PyPegen_get_invalid_target(e.value,targets_type);
case $B.ast.Compare:
if(targets_type==FOR_TARGETS){var cmpop=e.ops[0]
if(cmpop==$B.ast.In){return _PyPegen_get_invalid_target(e.left,targets_type);}
return NULL;}
return e;
case $B.ast.Name:
case $B.ast.Subscript:
case $B.ast.Attribute:
return NULL;
default:
return e;}}})(__BRYTHON__)
;

(function($B){var _b_=$B.builtins,debug=0
var p={feature_version:$B.version_info[1]}
var Store=new $B.ast.Store(),Load=new $B.ast.Load(),Del=new $B.ast.Del(),NULL=undefined
for(var op_type of $B.op_types){for(var key in op_type){var klass_name=op_type[key]
eval(`var ${klass_name} = new $B.ast.${klass_name}()`)}}
var alias_ty=$B.ast.alias,keyword_ty=$B.ast.keyword,arguments_ty=$B.ast.arguments,expr_ty=$B.ast.expr,asdl_stmt_seq=Array,asdl_int_seq=Array,asdl_expr_seq=Array,asdl_keyword_seq=Array,asdl_identifier_seq=Array,asdl_pattern_seq=Array,AugOperator=$B.ast.AugAssign,Py_Ellipsis={type:'ellipsis'},Py_False=false,Py_True=true,Py_None=_b_.None,PyExc_SyntaxError=_b_.SyntaxError
var PyPARSE_IGNORE_COOKIE=0x0010,PyPARSE_BARRY_AS_BDFL=0x0020,PyPARSE_TYPE_COMMENTS=0x0040,PyPARSE_ASYNC_HACKS=0x0080,PyPARSE_ALLOW_INCOMPLETE_INPUT=0x0100
var STAR_TARGETS='star_targets',FOR_TARGETS='for_targets',DEL_TARGETS='del_targets'
$B._PyAST={}
var template=`
$B._PyAST.<ast_class> = function(<args><sep>EXTRA){
    var ast_obj = new $B.ast.<ast_class>(<args>)
    set_position_from_EXTRA(ast_obj, EXTRA)
    return ast_obj}
`
for(var ast_class in $B.ast_classes){
var args=$B.ast_classes[ast_class]
if(Array.isArray(args)){continue}
args=args.replace(/\*/g,'').replace(/\?/g,'')
var sep=args.length > 0 ? ', ' :''
var function_code=template.replace(/<ast_class>/g,ast_class)
.replace(/<sep>/,sep)
.replace(/<args>/g,args)
console.log(function_code)
eval(function_code)}
var inf=Number.POSITIVE_INFINITY
var keywords=['and','as','elif','for','yield','while','assert','or','continue','lambda','from','class','in','not','finally','is','except','global','return','raise','break','with','def','try','if','else','del','import','nonlocal','pass'
]
function asdl_seq_LEN(t){return t.length}
function asdl_seq_GET(t,i){return t[i]}
function PyPegen_last_item(seq){return seq[seq.length-1]}
function CHECK(type,obj){if(Array.isArray(type)){var check
for(var t of type){check=CHECK(t,obj)
if(check){return check}}
return undefined}
if(obj instanceof type){return obj}
return undefined}
function CHECK_VERSION(type,version,msg,node){return INVALID_VERSION_CHECK(p,version,msg,node)}
function CHECK_NULL_ALLOWED(type,obj){if(obj !==NULL){if(type instanceof Array){for(var t of type){if(obj instanceof t){return obj}}
return}else{return obj instanceof type ? obj :undefined}}
return obj}
function INVALID_VERSION_CHECK(p,version,msg,node){if(node==NULL){p.error_indicator=1;
return NULL;}
if(p.feature_version < version){p.error_indicator=1;
return RAISE_SYNTAX_ERROR("%s only supported in Python 3.%i and greater",msg,version);}
return node;}
function NEW_TYPE_COMMENT(p,x){return x}
function RAISE_ERROR_KNOWN_LOCATION(p,errtype,lineno,col_offset,end_lineno,end_col_offset,errmsg){var va=[errmsg]
$B._PyPegen.raise_error_known_location(p,errtype,lineno,col_offset,end_lineno,end_col_offset,errmsg,va);
return NULL;}
var RAISE_SYNTAX_ERROR=function(msg){var extra_args=[]
for(var i=1,len=arguments.length;i < len;i++){extra_args.push(arguments[i])}
get_last_token(p)
$B._PyPegen.raise_error(p,_b_.SyntaxError,msg,...extra_args)}
function get_last_token(p){var last_token=p.tokens.last
if(p.tokens.last.type=="ENDMARKER"){var src=$B.file_cache[p.filename]
if(src){for(var token of $B.tokenizer(src)){if(token.type=="ENDMARKER"){break}
if(token.type !="DEDENT"){last_token=token}}}else{last_token=undefined}}
p.known_err_token=last_token}
var RAISE_INDENTATION_ERROR=function(msg,arg){if(arg !==undefined){msg=_b_.str.__mod__(msg,arg)}
var last_token=p.tokens.last
if(p.tokens.last.type=="ENDMARKER"){var src=$B.file_cache[p.filename]
if(src){for(var token of $B.tokenizer(src)){if(token.type=="ENDMARKER"){break}
last_token=token}}}
get_last_token(p)
$B._PyPegen.raise_error(p,_b_.IndentationError,msg)}
var RAISE_SYNTAX_ERROR_KNOWN_LOCATION=function(a,err_msg,arg){if(arg !==undefined){err_msg=_b_.str.__mod__(err_msg,arg)}
RAISE_ERROR_KNOWN_LOCATION(p,_b_.SyntaxError,a.lineno,a.col_offset,a.end_lineno,a.end_col_offset,err_msg)}
function RAISE_SYNTAX_ERROR_KNOWN_RANGE(a,b,msg){var extra_args=arguments[3]
RAISE_ERROR_KNOWN_LOCATION(p,_b_.SyntaxError,a.lineno,a.col_offset,b.end_lineno,b.end_col_offset,msg,extra_args)}
function RAISE_SYNTAX_ERROR_INVALID_TARGET(type,e){return _RAISE_SYNTAX_ERROR_INVALID_TARGET(p,type,e)}
function _RAISE_SYNTAX_ERROR_INVALID_TARGET(p,type,e){var invalid_target=CHECK_NULL_ALLOWED(expr_ty,$B._PyPegen.get_invalid_target(e,type));
if(invalid_target !=NULL){var msg;
if(type==STAR_TARGETS ||type==FOR_TARGETS){msg="cannot assign to %s";}else{msg="cannot delete %s";}
return RAISE_SYNTAX_ERROR_KNOWN_LOCATION(
invalid_target,msg,$B._PyPegen.get_expr_name(invalid_target)
)}
return NULL;}
function set_position_from_EXTRA(ast_obj,EXTRA){for(var key in EXTRA){ast_obj[key]=EXTRA[key]}}
function generator_as_list(generator){return new Proxy(generator,{get:function(target,ix){if(ix=='last'){return $B.last(this.tokens)}
if(this.tokens===undefined){this.tokens=[]}
if(ix >=this.tokens.length){
while(true){var next=target.next()
if(! next.done){var value=next.value
if(['ENCODING','NL','COMMENT'].indexOf(value.type)==-1){this.tokens.push(value)
break}}else{throw Error('tokenizer exhausted')}}}
return this.tokens[ix]}}
)}
var repeater={'?' :[0,1],'*':[0,inf],'+':[1,inf]}
var FAIL={name:'FAIL'},FROZEN_FAIL={name:'FROZEN_FAIL'}
function MemoEntry(match){this.match=match}
function LR(seed,rule){this.seed=seed
this.rule=rule}
function HEAD(rule,involvedSet,evalSet){this.rule=rule
this.involvedSet=involvedSet
this.evalSet=evalSet}
var Parser=$B.Parser=function(src,filename){
src=src.replace(/\r\n/gm,"\n")
if(src.endsWith("\\")&& !src.endsWith("\\\\")){src=src.substr(0,src.length-1)}
var tokenizer=$B.tokenizer(src)
this.tokens=generator_as_list(tokenizer)
this.src=src
this.filename=filename
this.memo={}
if(filename){p.filename=filename}}
Parser.prototype.parse=function(top_rule){
if(this.src.trim().length==0){
return new $B.ast.Module([])}
var rule=$B.grammar[top_rule],match
this.clear_memo()
this.HEADS={}
this.LRStack=[]
this.use_invalid=false
match=this.apply_rule(rule,0)
if(match===FAIL){
this.use_invalid=true
this.clear_memo()
this.HEADS={}
this.LRStack=[]
try{match=this.apply_rule(rule,0)}catch(err){throw err}}
if(match===FAIL){var err_token=this.tokens.last
p.filename=this.filename
RAISE_ERROR_KNOWN_LOCATION(p,_b_.SyntaxError,err_token.start[0],err_token.start[1],err_token.end[0],err_token.end[1],'invalid syntax')}
return make_ast(match,this.tokens)}
Parser.prototype.clear_memo=function(){for(var key in this.memo){delete this.memo[key]}}
Parser.prototype.get_memo=function(rule,position){if(this.memo[rule.name]===undefined ||
this.memo[rule.name][position]===undefined){return null}
var m=this.memo[rule.name][position]
if(m.match===FAIL){return FAIL}
return m}
Parser.prototype.set_memo=function(rule,position,value){this.memo[rule.name]=this.memo[rule.name]||{}
this.memo[rule.name][position]=value}
Parser.prototype.apply_rule=function(rule,position){
var memoized=this.RECALL(rule,position),result
if(memoized===null){var lr=new LR(FAIL,rule)
this.LRStack.push(lr)
var m=new MemoEntry(lr)
this.set_memo(rule,position,m)
var match=this.eval_body(rule,position)
this.LRStack.pop()
m.end=match.end
if(lr.head){lr.seed=match
result=this.LR_ANSWER(rule,position,m)}else{m.match=match
result=match}}else{if(memoized.match instanceof LR){this.SETUP_LR(rule,memoized.match)
result=memoized.match.seed}else{result=memoized===FAIL ? memoized :memoized.match}}
return result}
Parser.prototype.eval_option=function(rule,position){var tokens=this.tokens,result,start=position,join_position=false
if(! rule.repeat){result=this.eval_option_once(rule,position)}else{var matches=[],start=position,repeat=repeater[rule.repeat]
while(matches.length < repeat[1]){var match=this.eval_option_once(rule,position)
if(match===FAIL){if(join_position){result={rule,matches,start,end:join_position-1}
join_position=false
position=join_position-1}else if(matches.length >=repeat[0]){
result={rule,matches,start,end:position}}else{result=FAIL}
break}
matches.push(match)
if(rule.join){if(tokens[match.end][1]==rule.join){position=match.end+1
join_position=position}else{position=match.end
break}}else{join_position=false
position=match.end}}
if(! result){result={rule,start,matches,end:position}}}
if(rule.lookahead){switch(rule.lookahead){case 'positive':
if(result !==FAIL){result.end=result.start }
break
case 'negative':
if(result===FAIL){result={rule,start,end:start}}else{result=FAIL}
break}}
return result}
Parser.prototype.eval_option_once=function(rule,position){var tokens=this.tokens
if(rule.choices){for(var i=0,len=rule.choices.length;i < len;i++){var choice=rule.choices[i],invalid=choice.items && choice.items.length==1 &&
choice.items[0].name &&
choice.items[0].name.startsWith('invalid_')
if(invalid && ! this.use_invalid){continue}
var match=this.eval_option(choice,position)
if(match===FROZEN_FAIL){
return FAIL}else if(match !==FAIL){if(invalid){var _ast=make_ast(match,tokens)
if(_ast===undefined){continue}
match.invalid=true}
match.rank=i
return match}}
return FAIL}else if(rule.items){var start=position,matches=[],frozen_choice=false 
for(var item of rule.items){if(item.type=='COMMIT_CHOICE'){frozen_choice=true}
var match=this.eval_option(item,position)
if(match !==FAIL){matches.push(match)
position=match.end}else{if(frozen_choice){return FROZEN_FAIL}
return FAIL}}
var match={rule,matches,start,end:position}
if(this.use_invalid && rule.parent_rule &&
rule.parent_rule.startsWith('invalid_')){var _ast=make_ast(match,tokens)
if(_ast===undefined){return FAIL}
match.invalid=true}
return match}else if(rule.type=="rule"){return this.apply_rule($B.grammar[rule.name],position)}else if(rule.type=="string"){return tokens[position][1]==rule.value ?
{rule,start:position,end:position+1}:
FAIL}else if(rule.type=='COMMIT_CHOICE'){
return{rule,start:position,end:position}}else if(rule.type=='NAME'){var token=tokens[position],string=token.string,test=token.type==rule.type &&
keywords.indexOf(token.string)==-1 &&
['True','False','None'].indexOf(token.string)==-1 &&
(rule.value===undefined ? true :tokens[position][1]==rule.value)
return test ?{rule,start:position,end:position+1}:FAIL}else if(rule.type=='ASYNC'){var test=tokens[position].type=='NAME' && tokens[position].string=='async'
return test ?{rule,start:position,end:position+1}:FAIL}else if(rule.type=='AWAIT'){var test=tokens[position].type=='NAME' && tokens[position].string=='await'
return test ?{rule,start:position,end:position+1}:FAIL}else{var test=tokens[position][0]==rule.type &&
(rule.value===undefined ? true :tokens[position][1]==rule.value)
return test ?{rule,start:position,end:position+1}:FAIL}}
Parser.prototype.eval_body=function(rule,position){
var start=position
if(rule.choices){for(var i=0,len=rule.choices.length;i < len;i++){var choice=rule.choices[i],invalid=choice.items && choice.items.length==1 &&
choice.items[0].name &&
choice.items[0].name.startsWith('invalid_')
if(invalid && ! this.use_invalid){continue}
var match=this.eval_option(choice,position)
if(match===FROZEN_FAIL){
return FAIL}else if(match !==FAIL){if(invalid){var _ast=make_ast(match,this.tokens)
if(_ast===undefined){
continue}}
match.rank=i
return match}}
return FAIL}else if(rule.items){var matches=[],frozen_choice=false 
for(var item of rule.items){if(item.type=='COMMIT_CHOICE'){frozen_choice=true}
var match=this.eval_option(item,position)
if(match !==FAIL){matches.push(match)
position=match.end}else{return frozen_choice ? FROZEN_FAIL :FAIL}}
var match={rule,matches,start,end:position}
if(this.use_invalid && rule.parent_rule &&
rule.parent_rule.startsWith('invalid_')){make_ast(match,this.tokens)}
return match}}
Parser.prototype.matched_string=function(match){var s=''
for(var i=match.start;i < match.end;i++){s+=this.tokens[i].string}
return s}
Parser.prototype.RECALL=function(R,P){let m=this.get_memo(R,P)
let h=this.HEADS[P]
if(! h){return m}
var set=new Set([h.head])
for(var s of h.involvedSet){set.add(s)}
if((! m)&& ! set.has(R)){return new MemoEntry(FAIL)}
if(h.evalSet.has(R)){h.evalSet.delete(R)
let ans=this.eval_body(R,P)
m.match=ans
m.end=ans===FAIL ? P :ans.end}
return m}
Parser.prototype.SETUP_LR=function(R,L){if(! L.head){L.head=new HEAD(R,new Set(),new Set())}
let ix=this.LRStack.length-1,s=this.LRStack[ix]
while(s && s.head !==L.head){s.head=L.head
L.head.involvedSet.add(s.rule)
ix--
s=this.LRStack[ix]}}
Parser.prototype.LR_ANSWER=function(R,P,M){let h=M.match.head
if(h.rule !=R){return M.match.seed}else{M.match=M.match.seed}
if(M.match===FAIL){return FAIL}else{return this.grow_lr(R,P,M,h)}}
Parser.prototype.grow_lr=function(rule,position,m,H){
this.HEADS[position]=H
while(true){if(H){H.evalSet=new Set(H.involvedSet)}
var match=this.eval_body(rule,position)
if(match===FAIL ||match.end <=m.end){break}
m.match=match
m.end=match.end}
delete this.HEADS[position]
return m.match}
function make_ast(match,tokens){
var rule=match.rule,names={}
p.tokens=tokens
p.mark=match.start
p.fill=match.start
var test=false 
if(test){console.log('make_ast',show_rule(rule,true),'\n    match',match)}
var token=tokens[match.start],EXTRA={lineno:token.start[0],col_offset:token.start[1],end_lineno:token.end[0],end_col_offset:token.end[1]}
p.arena=EXTRA
if(rule.repeat){
var res=[]
if(['STRING','string','NEWLINE'].indexOf(rule.type)>-1){for(var m of match.matches){res.push(tokens[m.start])}
if(rule.alias){eval('var '+rule.alias+' = res')}
if(rule.action){return eval(rule.action)}
return res}else if(rule.type=='NAME'){for(var m of match.matches){res.push(new $B.ast.Name(tokens[m.start].string,new $B.ast.Load()))}
if(rule.alias){eval('var '+rule.alias+' = res')}
if(rule.action){return eval(rule.action)}
return res}
var makes=[]
for(var one_match of match.matches){
if(one_match.rule===rule){var elts=[]
for(var i=0;i < one_match.matches.length;i++){var m=one_match.matches[i]
var _make=make_ast(m,tokens)
if(rule.items[i].alias){eval('var '+rule.items[i].alias+' = _make')}
elts.push(_make)}
if(rule.action){try{makes.push(eval(rule.action))}catch(err){console.log('error eval action of',show_rule(rule),match)
throw err}}else if(elts.length==1){makes.push(elts[0])}else{makes.push(elts)}}else{makes.push(make_ast(one_match,tokens))}}
if(makes.length==0){return}
if(repeater[rule.repeat][1]==1){return makes[0]}
return makes}
if(rule.items){var makes=[],nb_consuming=0,ast,_make
if(match.matches.length > 0){var first=match.matches[0],last=$B.last(match.matches)
EXTRA={lineno:tokens[first.start].start[0],col_offset:tokens[first.start].start[1],end_lineno:tokens[last.end-1].end[0],end_col_offset:tokens[last.end-1].end[1]}
var pos=last.end-1,last_line=tokens[pos].start[0]
if(last_line > tokens[last.end-1].start[0]+1){last_token={type:'NL',start:[last_line-1,0],end:[last_line-1,0],line:'\n'}}else{last_token=tokens[last.end-1]}
p.arena={lineno:last_token.start[0],offset:last_token.start[1],end_lineno:last_token.end[0],end_col_offset:last_token.end[1]}
if(test){console.log('last token',tokens[last.end])
console.log('extra',EXTRA)}}
for(var i=0;i < match.matches.length;i++){var m=match.matches[i]
if(test){console.log('  match',i,m)}
if(m.end > m.start){_make=make_ast(m,tokens)
makes.push(_make)}else{if(m.rule.repeat && repeater[m.rule.repeat][1]> 1){
_make=[]}else{_make=undefined}}
if(rule.items[i].alias){names[rule.items[i].alias]=_make
eval('var '+rule.items[i].alias+' = _make')}
if(! rule.items[i].lookahead){nb_consuming++}}
if(rule.action){try{
ast=eval(rule.action)}catch(err){if($B.debug > 2){var rule_str=show_rule(rule,true)
console.log('error eval action of',rule_str)
console.log('p',p)
console.log($B.frames_stack.slice())
console.log(err.message)
console.log(err.stack)}
throw err}}else if(nb_consuming==1){ast=makes[0]}else{ast=makes}
return ast}else{if(rule.type=='NAME'){var ast_obj=new $B.ast.Name(tokens[match.start].string,new $B.ast.Load())
set_position_from_EXTRA(ast_obj,EXTRA)
return ast_obj}else if(rule.type=='NUMBER'){try{var prepared=$B.prepare_number(token[1])}catch(err){RAISE_SYNTAX_ERROR_KNOWN_LOCATION(p.arena,'wrong number %s',token[1])}
var ast_obj=new $B.ast.Constant(prepared)
ast_obj.type=prepared.type
set_position_from_EXTRA(ast_obj,EXTRA)
return ast_obj}else if(['STRING','string'].indexOf(rule.type)>-1){var ast_obj=new $B.ast.Constant(tokens[match.start].string)
set_position_from_EXTRA(ast_obj,EXTRA)
return ast_obj}}}
function show(match,tokens,level){level=level ||0
var s='',prefix='  '.repeat(level),rule=match.rule
s+=prefix+show_rule(rule)
if(match.matches){s+=' ('+match.matches.length+' matches'
for(var m of match.matches){if(m.rule===rule){s+=' same rule '+show_rule(m.rule)}}
s+=')'}
s+='\n'
if(! match.rule.repeat){level+=1}
if(match.matches){for(var m of match.matches){s+=show(m,tokens,level)}}else{if(match.end > match.start){s+=prefix
if(['NAME','STRING','NUMBER','string'].indexOf(match.rule.type)>-1){s+=match.rule.type+' '+tokens[match.start][1]}else{s+=match.rule.type+' '+(match.rule.value ||'')+
match.start+'-'+match.end}
s+='\n'}}
return s}
function debug_head(n){var signs='|:.',s=''
for(var i=0;i < n;i++){s+='| '}
return s}
function show_rule(rule,show_action){var res=rule.name ||''
if(rule.lookahead=='positive'){res+='&'}else if(rule.lookahead=='negative'){res+='!'}
if(rule.type && rule.type !='rule'){if(rule.type=='string'){res+="'"+rule.value+"'"}else{res+=rule.type}}
if(rule.choices){res+=' ('+rule.choices.map(show_rule).join(' | ')+')'}else if(rule.items){res+=' '+rule.items.map(show_rule).join(' ')}
if(rule.action && show_action){res+=' {'+rule.action+'}'}
if(rule.repeat){if(rule.items && rule.items.length > 1){res='('+res+')'}
res+=rule.repeat}
if(rule.join){res=`'${rule.join}'.`+res}
if(rule.alias){res=(rule.alias+'='+res)}
if(rule.parent_rule){res='<'+rule.parent_rule+' #'+rule.rank+'>'+res}
return res}
$B.Parser.RAISE_SYNTAX_ERROR=RAISE_SYNTAX_ERROR
$B.Parser.RAISE_SYNTAX_ERROR_KNOWN_LOCATION=RAISE_SYNTAX_ERROR_KNOWN_LOCATION
$B.Parser.RAISE_ERROR_KNOWN_LOCATION=RAISE_ERROR_KNOWN_LOCATION
$B.Parser.RAISE_SYNTAX_ERROR_KNOWN_RANGE=RAISE_SYNTAX_ERROR_KNOWN_RANGE})(__BRYTHON__)
;
(function($B){var grammar=$B.grammar={file:
{items:[{items:[{type:'rule',name:'statements'}
],repeat:'?',alias:'a'},{type:'ENDMARKER'}
],action:'$B._PyPegen.make_module(p, a)'},interactive:
{items:[{type:'rule',name:'statement_newline',alias:'a'}
],action:'$B._PyAST.Interactive(a, p.arena)'},eval:
{items:[{type:'rule',name:'expressions',alias:'a'},{type:'NEWLINE',repeat:'*'},{type:'ENDMARKER'}
],action:'$B._PyAST.Expression(a, p.arena)'},func_type:
{items:[{type:'string',value:'('},{items:[{type:'rule',name:'type_expressions'}
],repeat:'?',alias:'a'},{type:'string',value:')'},{type:'string',value:'->'},{type:'rule',name:'expression',alias:'b'},{type:'NEWLINE',repeat:'*'},{type:'ENDMARKER'}
],action:'$B._PyAST.FunctionType(a, b, p.arena)'},fstring:
{items:[{type:'rule',name:'star_expressions'}
]},statements:
{items:[{type:'rule',name:'statement',repeat:'+',alias:'a'}
],action:'$B._PyPegen.seq_flatten(p, a)'},statement:
{choices:[{items:[{type:'rule',name:'compound_stmt',alias:'a'}
],action:'$B._PyPegen.singleton_seq(p, a)'},{items:[{type:'rule',name:'simple_stmts',alias:'a'}
],action:'a'}]},statement_newline:
{choices:[{items:[{type:'rule',name:'compound_stmt',alias:'a'},{type:'NEWLINE'}
],action:'$B._PyPegen.singleton_seq(p, a)'},{items:[{type:'rule',name:'simple_stmts'}
]},{items:[{type:'NEWLINE'}
],action:'$B._PyPegen.singleton_seq(p, CHECK($B.ast.stmt, $B._PyAST.Pass(EXTRA)))'},{items:[{type:'ENDMARKER'}
],action:'$B._PyPegen.interactive_exit(p)'}]},simple_stmts:
{choices:[{items:[{type:'rule',name:'simple_stmt',alias:'a'},{type:'string',value:';',lookahead:'negative'},{type:'NEWLINE'}
],action:'$B._PyPegen.singleton_seq(p, a)'},{items:[{type:'rule',name:'simple_stmt',join:';',alias:'a',repeat:'+'},{items:[{type:'string',value:';'}
],repeat:'?'},{type:'NEWLINE'}
],action:'a'}]},simple_stmt:
{choices:[{items:[{type:'rule',name:'assignment'}
]},{items:[{type:'rule',name:'star_expressions',alias:'e'}
],action:'$B._PyAST.Expr(e, EXTRA)'},{items:[{type:'string',value:'return',lookahead:'positive'},{type:'rule',name:'return_stmt'}
]},{items:[{choices:[{items:[{type:'string',value:'import'}
]},{items:[{type:'string',value:'from'}
]}],lookahead:'positive'},{type:'rule',name:'import_stmt'}
]},{items:[{type:'string',value:'raise',lookahead:'positive'},{type:'rule',name:'raise_stmt'}
]},{items:[{type:'string',value:'pass'}
],action:'$B._PyAST.Pass(EXTRA)'},{items:[{type:'string',value:'del',lookahead:'positive'},{type:'rule',name:'del_stmt'}
]},{items:[{type:'string',value:'yield',lookahead:'positive'},{type:'rule',name:'yield_stmt'}
]},{items:[{type:'string',value:'assert',lookahead:'positive'},{type:'rule',name:'assert_stmt'}
]},{items:[{type:'string',value:'break'}
],action:'$B._PyAST.Break(EXTRA)'},{items:[{type:'string',value:'continue'}
],action:'$B._PyAST.Continue(EXTRA)'},{items:[{type:'string',value:'global',lookahead:'positive'},{type:'rule',name:'global_stmt'}
]},{items:[{type:'string',value:'nonlocal',lookahead:'positive'},{type:'rule',name:'nonlocal_stmt'}
]}]},compound_stmt:
{choices:[{items:[{choices:[{items:[{type:'string',value:'def'}
]},{items:[{type:'string',value:'@'}
]},{items:[{type:'ASYNC'}
]}],lookahead:'positive'},{type:'rule',name:'function_def'}
]},{items:[{type:'string',value:'if',lookahead:'positive'},{type:'rule',name:'if_stmt'}
]},{items:[{choices:[{items:[{type:'string',value:'class'}
]},{items:[{type:'string',value:'@'}
]}],lookahead:'positive'},{type:'rule',name:'class_def'}
]},{items:[{choices:[{items:[{type:'string',value:'with'}
]},{items:[{type:'ASYNC'}
]}],lookahead:'positive'},{type:'rule',name:'with_stmt'}
]},{items:[{choices:[{items:[{type:'string',value:'for'}
]},{items:[{type:'ASYNC'}
]}],lookahead:'positive'},{type:'rule',name:'for_stmt'}
]},{items:[{type:'string',value:'try',lookahead:'positive'},{type:'rule',name:'try_stmt'}
]},{items:[{type:'string',value:'while',lookahead:'positive'},{type:'rule',name:'while_stmt'}
]},{items:[{type:'rule',name:'match_stmt'}
]}]},assignment:
{choices:[{items:[{type:'NAME',alias:'a'},{type:'string',value:':'},{type:'rule',name:'expression',alias:'b'},{items:[{type:'string',value:'='},{type:'rule',name:'annotated_rhs',alias:'d'}
],repeat:'?',alias:'c',action:'d'}
],action:'CHECK_VERSION( $B.ast.stmt, 6, "Variable annotation syntax is", $B._PyAST.AnnAssign(CHECK($B.ast.expr, $B._PyPegen.set_expr_context(p, a, Store)), b, c, 1, EXTRA) )'},{items:[{choices:[{items:[{type:'string',value:'('},{type:'rule',name:'single_target',alias:'b'},{type:'string',value:')'}
],action:'b'},{items:[{type:'rule',name:'single_subscript_attribute_target'}
]}],alias:'a'},{type:'string',value:':'},{type:'rule',name:'expression',alias:'b'},{items:[{type:'string',value:'='},{type:'rule',name:'annotated_rhs',alias:'d'}
],repeat:'?',alias:'c',action:'d'}
],action:'CHECK_VERSION($B.ast.stmt, 6, "Variable annotations syntax is", $B._PyAST.AnnAssign(a, b, c, 0, EXTRA))'},{items:[{items:[{type:'rule',name:'star_targets',alias:'z'},{type:'string',value:'='}
],repeat:'+',alias:'a',action:'z'},{choices:[{items:[{type:'rule',name:'yield_expr'}
]},{items:[{type:'rule',name:'star_expressions'}
]}],alias:'b'},{type:'string',value:'=',lookahead:'negative'},{items:[{type:'TYPE_COMMENT'}
],repeat:'?',alias:'tc'}
],action:'$B._PyAST.Assign(a, b, NEW_TYPE_COMMENT(p, tc), EXTRA)'},{items:[{type:'rule',name:'single_target',alias:'a'},{type:'rule',name:'augassign',alias:'b'},{type:'COMMIT_CHOICE'},{choices:[{items:[{type:'rule',name:'yield_expr'}
]},{items:[{type:'rule',name:'star_expressions'}
]}],alias:'c'}
],action:'$B._PyAST.AugAssign(a, b.kind, c, EXTRA)'},{items:[{type:'rule',name:'invalid_assignment'}
]}]},annotated_rhs:
{choices:[{items:[{type:'rule',name:'yield_expr'}
]},{items:[{type:'rule',name:'star_expressions'}
]}]},augassign:
{choices:[{items:[{type:'string',value:'+='}
],action:'$B._PyPegen.augoperator(p, Add)'},{items:[{type:'string',value:'-='}
],action:'$B._PyPegen.augoperator(p, Sub)'},{items:[{type:'string',value:'*='}
],action:'$B._PyPegen.augoperator(p, Mult)'},{items:[{type:'string',value:'@='}
],action:'CHECK_VERSION(AugOperator, 5, "The \'@\' operator is", $B._PyPegen.augoperator(p, MatMult))'},{items:[{type:'string',value:'/='}
],action:'$B._PyPegen.augoperator(p, Div)'},{items:[{type:'string',value:'%='}
],action:'$B._PyPegen.augoperator(p, Mod)'},{items:[{type:'string',value:'&='}
],action:'$B._PyPegen.augoperator(p, BitAnd)'},{items:[{type:'string',value:'|='}
],action:'$B._PyPegen.augoperator(p, BitOr)'},{items:[{type:'string',value:'^='}
],action:'$B._PyPegen.augoperator(p, BitXor)'},{items:[{type:'string',value:'<<='}
],action:'$B._PyPegen.augoperator(p, LShift)'},{items:[{type:'string',value:'>>='}
],action:'$B._PyPegen.augoperator(p, RShift)'},{items:[{type:'string',value:'**='}
],action:'$B._PyPegen.augoperator(p, Pow)'},{items:[{type:'string',value:'//='}
],action:'$B._PyPegen.augoperator(p, FloorDiv)'}]},return_stmt:
{items:[{type:'string',value:'return'},{items:[{type:'rule',name:'star_expressions'}
],repeat:'?',alias:'a'}
],action:'$B._PyAST.Return(a, EXTRA)'},raise_stmt:
{choices:[{items:[{type:'string',value:'raise'},{type:'rule',name:'expression',alias:'a'},{items:[{type:'string',value:'from'},{type:'rule',name:'expression',alias:'z'}
],repeat:'?',alias:'b',action:'z'}
],action:'$B._PyAST.Raise(a, b, EXTRA)'},{items:[{type:'string',value:'raise'}
],action:'$B._PyAST.Raise(NULL, NULL, EXTRA)'}]},global_stmt:
{items:[{type:'string',value:'global'},{type:'NAME',join:',',alias:'a',repeat:'+'}
],action:'$B._PyAST.Global(CHECK(asdl_identifier_seq, $B._PyPegen.map_names_to_ids(p, a)), EXTRA)'},nonlocal_stmt:
{items:[{type:'string',value:'nonlocal'},{type:'NAME',join:',',alias:'a',repeat:'+'}
],action:'$B._PyAST.Nonlocal(CHECK(asdl_identifier_seq, $B._PyPegen.map_names_to_ids(p, a)), EXTRA)'},del_stmt:
{choices:[{items:[{type:'string',value:'del'},{type:'rule',name:'del_targets',alias:'a'},{choices:[{items:[{type:'string',value:';'}
]},{items:[{type:'NEWLINE'}
]}],lookahead:'positive'}
],action:'$B._PyAST.Delete(a, EXTRA)'},{items:[{type:'rule',name:'invalid_del_stmt'}
]}]},yield_stmt:
{items:[{type:'rule',name:'yield_expr',alias:'y'}
],action:'$B._PyAST.Expr(y, EXTRA)'},assert_stmt:
{items:[{type:'string',value:'assert'},{type:'rule',name:'expression',alias:'a'},{items:[{type:'string',value:','},{type:'rule',name:'expression',alias:'z'}
],repeat:'?',alias:'b',action:'z'}
],action:'$B._PyAST.Assert(a, b, EXTRA)'},import_stmt:
{choices:[{items:[{type:'rule',name:'import_name'}
]},{items:[{type:'rule',name:'import_from'}
]}]},import_name:
{items:[{type:'string',value:'import'},{type:'rule',name:'dotted_as_names',alias:'a'}
],action:'$B._PyAST.Import(a, EXTRA)'},import_from:
{choices:[{items:[{type:'string',value:'from'},{choices:[{items:[{type:'string',value:'.'}
]},{items:[{type:'string',value:'...'}
]}],repeat:'*',alias:'a'},{type:'rule',name:'dotted_name',alias:'b'},{type:'string',value:'import'},{type:'rule',name:'import_from_targets',alias:'c'}
],action:'$B._PyAST.ImportFrom(b.id, c, $B._PyPegen.seq_count_dots(a), EXTRA)'},{items:[{type:'string',value:'from'},{choices:[{items:[{type:'string',value:'.'}
]},{items:[{type:'string',value:'...'}
]}],repeat:'+',alias:'a'},{type:'string',value:'import'},{type:'rule',name:'import_from_targets',alias:'b'}
],action:'$B._PyAST.ImportFrom(NULL, b, $B._PyPegen.seq_count_dots(a), EXTRA)'}]},import_from_targets:
{choices:[{items:[{type:'string',value:'('},{type:'rule',name:'import_from_as_names',alias:'a'},{items:[{type:'string',value:','}
],repeat:'?'},{type:'string',value:')'}
],action:'a'},{items:[{type:'rule',name:'import_from_as_names'},{type:'string',value:',',lookahead:'negative'}
]},{items:[{type:'string',value:'*'}
],action:'$B._PyPegen.singleton_seq(p, CHECK($B.ast.alias, $B._PyPegen.alias_for_star(p, EXTRA)))'},{items:[{type:'rule',name:'invalid_import_from_targets'}
]}]},import_from_as_names:
{items:[{type:'rule',name:'import_from_as_name',join:',',alias:'a',repeat:'+'}
],action:'a'},import_from_as_name:
{items:[{type:'NAME',alias:'a'},{items:[{type:'string',value:'as'},{type:'NAME',alias:'z'}
],repeat:'?',alias:'b',action:'z'}
],action:'$B._PyAST.alias(a.id, (b) ? b.id : NULL, EXTRA)'},dotted_as_names:
{items:[{type:'rule',name:'dotted_as_name',join:',',alias:'a',repeat:'+'}
],action:'a'},dotted_as_name:
{items:[{type:'rule',name:'dotted_name',alias:'a'},{items:[{type:'string',value:'as'},{type:'NAME',alias:'z'}
],repeat:'?',alias:'b',action:'z'}
],action:'$B._PyAST.alias(a.id, (b) ? b.id : NULL, EXTRA)'},dotted_name:
{choices:[{items:[{type:'rule',name:'dotted_name',alias:'a'},{type:'string',value:'.'},{type:'NAME',alias:'b'}
],action:'$B._PyPegen.join_names_with_dot(p, a, b)'},{items:[{type:'NAME'}
]}]},block:
{choices:[{items:[{type:'NEWLINE'},{type:'INDENT'},{type:'rule',name:'statements',alias:'a'},{type:'DEDENT'}
],action:'a'},{items:[{type:'rule',name:'simple_stmts'}
]},{items:[{type:'rule',name:'invalid_block'}
]}]},decorators:
{items:[{items:[{type:'string',value:'@'},{type:'rule',name:'named_expression',alias:'f'},{type:'NEWLINE'}
],repeat:'+',alias:'a',action:'f'}
],action:'a'},class_def:
{choices:[{items:[{type:'rule',name:'decorators',alias:'a'},{type:'rule',name:'class_def_raw',alias:'b'}
],action:'$B._PyPegen.class_def_decorators(p, a, b)'},{items:[{type:'rule',name:'class_def_raw'}
]}]},class_def_raw:
{choices:[{items:[{type:'rule',name:'invalid_class_def_raw'}
]},{items:[{type:'string',value:'class'},{type:'NAME',alias:'a'},{items:[{type:'string',value:'('},{items:[{type:'rule',name:'arguments'}
],repeat:'?',alias:'z'},{type:'string',value:')'}
],repeat:'?',alias:'b',action:'z'},{type:'string',value:':'},{type:'rule',name:'block',alias:'c'}
],action:'$B._PyAST.ClassDef(a.id, (b) ? b.args : NULL, (b) ? b.keywords : NULL, c, NULL, EXTRA)'}]},function_def:
{choices:[{items:[{type:'rule',name:'decorators',alias:'d'},{type:'rule',name:'function_def_raw',alias:'f'}
],action:'$B._PyPegen.function_def_decorators(p, d, f)'},{items:[{type:'rule',name:'function_def_raw'}
]}]},function_def_raw:
{choices:[{items:[{type:'rule',name:'invalid_def_raw'}
]},{items:[{type:'string',value:'def'},{type:'NAME',alias:'n'},{type:'string',value:'('},{items:[{type:'rule',name:'params'}
],repeat:'?',alias:'params'},{type:'string',value:')'},{items:[{type:'string',value:'->'},{type:'rule',name:'expression',alias:'z'}
],repeat:'?',alias:'a',action:'z'},{type:'string',value:':'},{items:[{type:'rule',name:'func_type_comment'}
],repeat:'?',alias:'tc'},{type:'rule',name:'block',alias:'b'}
],action:'$B._PyAST.FunctionDef(n.id, (params) ? params : CHECK($B.ast.arguments, $B._PyPegen.empty_arguments(p)), b, NULL, a, NEW_TYPE_COMMENT(p, tc), EXTRA)'},{items:[{type:'ASYNC'},{type:'string',value:'def'},{type:'NAME',alias:'n'},{type:'string',value:'('},{items:[{type:'rule',name:'params'}
],repeat:'?',alias:'params'},{type:'string',value:')'},{items:[{type:'string',value:'->'},{type:'rule',name:'expression',alias:'z'}
],repeat:'?',alias:'a',action:'z'},{type:'string',value:':'},{items:[{type:'rule',name:'func_type_comment'}
],repeat:'?',alias:'tc'},{type:'rule',name:'block',alias:'b'}
],action:'CHECK_VERSION( $B.ast.stmt, 5, "Async functions are", $B._PyAST.AsyncFunctionDef(n.id, (params) ? params : CHECK($B.ast.arguments, $B._PyPegen.empty_arguments(p)), b, NULL, a, NEW_TYPE_COMMENT(p, tc), EXTRA) )'}]},params:
{choices:[{items:[{type:'rule',name:'invalid_parameters'}
]},{items:[{type:'rule',name:'parameters'}
]}]},parameters:
{choices:[{items:[{type:'rule',name:'slash_no_default',alias:'a'},{type:'rule',name:'param_no_default',repeat:'*',alias:'b'},{type:'rule',name:'param_with_default',repeat:'*',alias:'c'},{items:[{type:'rule',name:'star_etc'}
],repeat:'?',alias:'d'}
],action:'$B._PyPegen.make_arguments(p, a, NULL, b, c, d)'},{items:[{type:'rule',name:'slash_with_default',alias:'a'},{type:'rule',name:'param_with_default',repeat:'*',alias:'b'},{items:[{type:'rule',name:'star_etc'}
],repeat:'?',alias:'c'}
],action:'$B._PyPegen.make_arguments(p, NULL, a, NULL, b, c)'},{items:[{type:'rule',name:'param_no_default',repeat:'+',alias:'a'},{type:'rule',name:'param_with_default',repeat:'*',alias:'b'},{items:[{type:'rule',name:'star_etc'}
],repeat:'?',alias:'c'}
],action:'$B._PyPegen.make_arguments(p, NULL, NULL, a, b, c)'},{items:[{type:'rule',name:'param_with_default',repeat:'+',alias:'a'},{items:[{type:'rule',name:'star_etc'}
],repeat:'?',alias:'b'}
],action:'$B._PyPegen.make_arguments(p, NULL, NULL, NULL, a, b)'},{items:[{type:'rule',name:'star_etc',alias:'a'}
],action:'$B._PyPegen.make_arguments(p, NULL, NULL, NULL, NULL, a)'}]},slash_no_default:
{choices:[{items:[{type:'rule',name:'param_no_default',repeat:'+',alias:'a'},{type:'string',value:'/'},{type:'string',value:','}
],action:'a'},{items:[{type:'rule',name:'param_no_default',repeat:'+',alias:'a'},{type:'string',value:'/'},{type:'string',value:')',lookahead:'positive'}
],action:'a'}]},slash_with_default:
{choices:[{items:[{type:'rule',name:'param_no_default',repeat:'*',alias:'a'},{type:'rule',name:'param_with_default',repeat:'+',alias:'b'},{type:'string',value:'/'},{type:'string',value:','}
],action:'$B._PyPegen.slash_with_default(p, a, b)'},{items:[{type:'rule',name:'param_no_default',repeat:'*',alias:'a'},{type:'rule',name:'param_with_default',repeat:'+',alias:'b'},{type:'string',value:'/'},{type:'string',value:')',lookahead:'positive'}
],action:'$B._PyPegen.slash_with_default(p, a, b)'}]},star_etc:
{choices:[{items:[{type:'rule',name:'invalid_star_etc'}
]},{items:[{type:'string',value:'*'},{type:'rule',name:'param_no_default',alias:'a'},{type:'rule',name:'param_maybe_default',repeat:'*',alias:'b'},{items:[{type:'rule',name:'kwds'}
],repeat:'?',alias:'c'}
],action:'$B._PyPegen.star_etc(p, a, b, c)'},{items:[{type:'string',value:'*'},{type:'rule',name:'param_no_default_star_annotation',alias:'a'},{type:'rule',name:'param_maybe_default',repeat:'*',alias:'b'},{items:[{type:'rule',name:'kwds'}
],repeat:'?',alias:'c'}
],action:'$B._PyPegen.star_etc(p, a, b, c)'},{items:[{type:'string',value:'*'},{type:'string',value:','},{type:'rule',name:'param_maybe_default',repeat:'+',alias:'b'},{items:[{type:'rule',name:'kwds'}
],repeat:'?',alias:'c'}
],action:'$B._PyPegen.star_etc(p, NULL, b, c)'},{items:[{type:'rule',name:'kwds',alias:'a'}
],action:'$B._PyPegen.star_etc(p, NULL, NULL, a)'}]},kwds:
{choices:[{items:[{type:'rule',name:'invalid_kwds'}
]},{items:[{type:'string',value:'**'},{type:'rule',name:'param_no_default',alias:'a'}
],action:'a'}]},param_no_default:
{choices:[{items:[{type:'rule',name:'param',alias:'a'},{type:'string',value:','},{type:'TYPE_COMMENT',repeat:'?',alias:'tc'}
],action:'$B._PyPegen.add_type_comment_to_arg(p, a, tc)'},{items:[{type:'rule',name:'param',alias:'a'},{type:'TYPE_COMMENT',repeat:'?',alias:'tc'},{type:'string',value:')',lookahead:'positive'}
],action:'$B._PyPegen.add_type_comment_to_arg(p, a, tc)'}]},param_no_default_star_annotation:
{choices:[{items:[{type:'rule',name:'param_star_annotation',alias:'a'},{type:'string',value:','},{type:'TYPE_COMMENT',repeat:'?',alias:'tc'}
],action:'$B._PyPegen.add_type_comment_to_arg(p, a, tc)'},{items:[{type:'rule',name:'param_star_annotation',alias:'a'},{type:'TYPE_COMMENT',repeat:'?',alias:'tc'},{type:'string',value:')',lookahead:'positive'}
],action:'$B._PyPegen.add_type_comment_to_arg(p, a, tc)'}]},param_with_default:
{choices:[{items:[{type:'rule',name:'param',alias:'a'},{type:'rule',name:'default',alias:'c'},{type:'string',value:','},{type:'TYPE_COMMENT',repeat:'?',alias:'tc'}
],action:'$B._PyPegen.name_default_pair(p, a, c, tc)'},{items:[{type:'rule',name:'param',alias:'a'},{type:'rule',name:'default',alias:'c'},{type:'TYPE_COMMENT',repeat:'?',alias:'tc'},{type:'string',value:')',lookahead:'positive'}
],action:'$B._PyPegen.name_default_pair(p, a, c, tc)'}]},param_maybe_default:
{choices:[{items:[{type:'rule',name:'param',alias:'a'},{type:'rule',name:'default',repeat:'?',alias:'c'},{type:'string',value:','},{type:'TYPE_COMMENT',repeat:'?',alias:'tc'}
],action:'$B._PyPegen.name_default_pair(p, a, c, tc)'},{items:[{type:'rule',name:'param',alias:'a'},{type:'rule',name:'default',repeat:'?',alias:'c'},{type:'TYPE_COMMENT',repeat:'?',alias:'tc'},{type:'string',value:')',lookahead:'positive'}
],action:'$B._PyPegen.name_default_pair(p, a, c, tc)'}]},param:
{items:[{type:'NAME',alias:'a'},{type:'rule',name:'annotation',repeat:'?',alias:'b'}
],action:'$B._PyAST.arg(a.id, b, NULL, EXTRA)'},param_star_annotation:
{items:[{type:'NAME',alias:'a'},{type:'rule',name:'star_annotation',alias:'b'}
],action:'$B._PyAST.arg(a.id, b, NULL, EXTRA)'},annotation:
{items:[{type:'string',value:':'},{type:'rule',name:'expression',alias:'a'}
],action:'a'},star_annotation:
{items:[{type:'string',value:':'},{type:'rule',name:'star_expression',alias:'a'}
],action:'a'},default:
{choices:[{items:[{type:'string',value:'='},{type:'rule',name:'expression',alias:'a'}
],action:'a'},{items:[{type:'rule',name:'invalid_default'}
]}]},if_stmt:
{choices:[{items:[{type:'rule',name:'invalid_if_stmt'}
]},{items:[{type:'string',value:'if'},{type:'rule',name:'named_expression',alias:'a'},{type:'string',value:':'},{type:'rule',name:'block',alias:'b'},{type:'rule',name:'elif_stmt',alias:'c'}
],action:'$B._PyAST.If(a, b, CHECK(asdl_stmt_seq, $B._PyPegen.singleton_seq(p, c)), EXTRA)'},{items:[{type:'string',value:'if'},{type:'rule',name:'named_expression',alias:'a'},{type:'string',value:':'},{type:'rule',name:'block',alias:'b'},{items:[{type:'rule',name:'else_block'}
],repeat:'?',alias:'c'}
],action:'$B._PyAST.If(a, b, c, EXTRA)'}]},elif_stmt:
{choices:[{items:[{type:'rule',name:'invalid_elif_stmt'}
]},{items:[{type:'string',value:'elif'},{type:'rule',name:'named_expression',alias:'a'},{type:'string',value:':'},{type:'rule',name:'block',alias:'b'},{type:'rule',name:'elif_stmt',alias:'c'}
],action:'$B._PyAST.If(a, b, CHECK(asdl_stmt_seq, $B._PyPegen.singleton_seq(p, c)), EXTRA)'},{items:[{type:'string',value:'elif'},{type:'rule',name:'named_expression',alias:'a'},{type:'string',value:':'},{type:'rule',name:'block',alias:'b'},{items:[{type:'rule',name:'else_block'}
],repeat:'?',alias:'c'}
],action:'$B._PyAST.If(a, b, c, EXTRA)'}]},else_block:
{choices:[{items:[{type:'rule',name:'invalid_else_stmt'}
]},{items:[{type:'string',value:'else'},{type:'string',value:':'},{type:'rule',name:'block',alias:'b'}
],action:'b'}]},while_stmt:
{choices:[{items:[{type:'rule',name:'invalid_while_stmt'}
]},{items:[{type:'string',value:'while'},{type:'rule',name:'named_expression',alias:'a'},{type:'string',value:':'},{type:'rule',name:'block',alias:'b'},{items:[{type:'rule',name:'else_block'}
],repeat:'?',alias:'c'}
],action:'$B._PyAST.While(a, b, c, EXTRA)'}]},for_stmt:
{choices:[{items:[{type:'rule',name:'invalid_for_stmt'}
]},{items:[{type:'string',value:'for'},{type:'rule',name:'star_targets',alias:'t'},{type:'string',value:'in'},{type:'COMMIT_CHOICE'},{type:'rule',name:'star_expressions',alias:'ex'},{type:'string',value:':'},{items:[{type:'TYPE_COMMENT'}
],repeat:'?',alias:'tc'},{type:'rule',name:'block',alias:'b'},{items:[{type:'rule',name:'else_block'}
],repeat:'?',alias:'el'}
],action:'$B._PyAST.For(t, ex, b, el, NEW_TYPE_COMMENT(p, tc), EXTRA)'},{items:[{type:'ASYNC'},{type:'string',value:'for'},{type:'rule',name:'star_targets',alias:'t'},{type:'string',value:'in'},{type:'COMMIT_CHOICE'},{type:'rule',name:'star_expressions',alias:'ex'},{type:'string',value:':'},{items:[{type:'TYPE_COMMENT'}
],repeat:'?',alias:'tc'},{type:'rule',name:'block',alias:'b'},{items:[{type:'rule',name:'else_block'}
],repeat:'?',alias:'el'}
],action:'CHECK_VERSION($B.ast.stmt, 5, "Async for loops are", $B._PyAST.AsyncFor(t, ex, b, el, NEW_TYPE_COMMENT(p, tc), EXTRA))'},{items:[{type:'rule',name:'invalid_for_target'}
]}]},with_stmt:
{choices:[{items:[{type:'rule',name:'invalid_with_stmt_indent'}
]},{items:[{type:'string',value:'with'},{type:'string',value:'('},{type:'rule',name:'with_item',join:',',alias:'a',repeat:'+'},{type:'string',value:',',repeat:'?'},{type:'string',value:')'},{type:'string',value:':'},{type:'rule',name:'block',alias:'b'}
],action:'$B._PyAST.With(a, b, NULL, EXTRA)'},{items:[{type:'string',value:'with'},{type:'rule',name:'with_item',join:',',alias:'a',repeat:'+'},{type:'string',value:':'},{items:[{type:'TYPE_COMMENT'}
],repeat:'?',alias:'tc'},{type:'rule',name:'block',alias:'b'}
],action:'$B._PyAST.With(a, b, NEW_TYPE_COMMENT(p, tc), EXTRA)'},{items:[{type:'ASYNC'},{type:'string',value:'with'},{type:'string',value:'('},{type:'rule',name:'with_item',join:',',alias:'a',repeat:'+'},{type:'string',value:',',repeat:'?'},{type:'string',value:')'},{type:'string',value:':'},{type:'rule',name:'block',alias:'b'}
],action:'CHECK_VERSION($B.ast.stmt, 5, "Async with statements are", $B._PyAST.AsyncWith(a, b, NULL, EXTRA))'},{items:[{type:'ASYNC'},{type:'string',value:'with'},{type:'rule',name:'with_item',join:',',alias:'a',repeat:'+'},{type:'string',value:':'},{items:[{type:'TYPE_COMMENT'}
],repeat:'?',alias:'tc'},{type:'rule',name:'block',alias:'b'}
],action:'CHECK_VERSION($B.ast.stmt, 5, "Async with statements are", $B._PyAST.AsyncWith(a, b, NEW_TYPE_COMMENT(p, tc), EXTRA))'},{items:[{type:'rule',name:'invalid_with_stmt'}
]}]},with_item:
{choices:[{items:[{type:'rule',name:'expression',alias:'e'},{type:'string',value:'as'},{type:'rule',name:'star_target',alias:'t'},{choices:[{items:[{type:'string',value:','}
]},{items:[{type:'string',value:')'}
]},{items:[{type:'string',value:':'}
]}],lookahead:'positive'}
],action:'$B._PyAST.withitem(e, t, p.arena)'},{items:[{type:'rule',name:'invalid_with_item'}
]},{items:[{type:'rule',name:'expression',alias:'e'}
],action:'$B._PyAST.withitem(e, NULL, p.arena)'}]},try_stmt:
{choices:[{items:[{type:'rule',name:'invalid_try_stmt'}
]},{items:[{type:'string',value:'try'},{type:'string',value:':'},{type:'rule',name:'block',alias:'b'},{type:'rule',name:'finally_block',alias:'f'}
],action:'$B._PyAST.Try(b, NULL, NULL, f, EXTRA)'},{items:[{type:'string',value:'try'},{type:'string',value:':'},{type:'rule',name:'block',alias:'b'},{type:'rule',name:'except_block',repeat:'+',alias:'ex'},{items:[{type:'rule',name:'else_block'}
],repeat:'?',alias:'el'},{items:[{type:'rule',name:'finally_block'}
],repeat:'?',alias:'f'}
],action:'$B._PyAST.Try(b, ex, el, f, EXTRA)'},{items:[{type:'string',value:'try'},{type:'string',value:':'},{type:'rule',name:'block',alias:'b'},{type:'rule',name:'except_star_block',repeat:'+',alias:'ex'},{items:[{type:'rule',name:'else_block'}
],repeat:'?',alias:'el'},{items:[{type:'rule',name:'finally_block'}
],repeat:'?',alias:'f'}
],action:'$B._PyAST.TryStar(b, ex, el, f, EXTRA)'}]},except_block:
{choices:[{items:[{type:'rule',name:'invalid_except_stmt_indent'}
]},{items:[{type:'string',value:'except'},{type:'rule',name:'expression',alias:'e'},{items:[{type:'string',value:'as'},{type:'NAME',alias:'z'}
],repeat:'?',alias:'t',action:'z'},{type:'string',value:':'},{type:'rule',name:'block',alias:'b'}
],action:'$B._PyAST.ExceptHandler(e, (t) ? t.id : NULL, b, EXTRA)'},{items:[{type:'string',value:'except'},{type:'string',value:':'},{type:'rule',name:'block',alias:'b'}
],action:'$B._PyAST.ExceptHandler(NULL, NULL, b, EXTRA)'},{items:[{type:'rule',name:'invalid_except_stmt'}
]}]},except_star_block:
{choices:[{items:[{type:'rule',name:'invalid_except_star_stmt_indent'}
]},{items:[{type:'string',value:'except'},{type:'string',value:'*'},{type:'rule',name:'expression',alias:'e'},{items:[{type:'string',value:'as'},{type:'NAME',alias:'z'}
],repeat:'?',alias:'t',action:'z'},{type:'string',value:':'},{type:'rule',name:'block',alias:'b'}
],action:'$B._PyAST.ExceptHandler(e, (t) ? t.id : NULL, b, EXTRA)'},{items:[{type:'rule',name:'invalid_except_stmt'}
]}]},finally_block:
{choices:[{items:[{type:'rule',name:'invalid_finally_stmt'}
]},{items:[{type:'string',value:'finally'},{type:'string',value:':'},{type:'rule',name:'block',alias:'a'}
],action:'a'}]},match_stmt:
{choices:[{items:[{type:'string',value:'match'},{type:'rule',name:'subject_expr',alias:'subject'},{type:'string',value:':'},{type:'NEWLINE'},{type:'INDENT'},{type:'rule',name:'case_block',repeat:'+',alias:'cases'},{type:'DEDENT'}
],action:'CHECK_VERSION($B.ast.stmt, 10, "Pattern matching is", $B._PyAST.Match(subject, cases, EXTRA))'},{items:[{type:'rule',name:'invalid_match_stmt'}
]}]},subject_expr:
{choices:[{items:[{type:'rule',name:'star_named_expression',alias:'value'},{type:'string',value:','},{type:'rule',name:'star_named_expressions',repeat:'?',alias:'values'}
],action:'$B._PyAST.Tuple(CHECK(asdl_expr_seq, $B._PyPegen.seq_insert_in_front(p, value, values)), Load, EXTRA)'},{items:[{type:'rule',name:'named_expression'}
]}]},case_block:
{choices:[{items:[{type:'rule',name:'invalid_case_block'}
]},{items:[{type:'string',value:'case'},{type:'rule',name:'patterns',alias:'pattern'},{type:'rule',name:'guard',repeat:'?',alias:'guard'},{type:'string',value:':'},{type:'rule',name:'block',alias:'body'}
],action:'$B._PyAST.match_case(pattern, guard, body, p.arena)'}]},guard:
{items:[{type:'string',value:'if'},{type:'rule',name:'named_expression',alias:'guard'}
],action:'guard'},patterns:
{choices:[{items:[{type:'rule',name:'open_sequence_pattern',alias:'patterns'}
],action:'$B._PyAST.MatchSequence(patterns, EXTRA)'},{items:[{type:'rule',name:'pattern'}
]}]},pattern:
{choices:[{items:[{type:'rule',name:'as_pattern'}
]},{items:[{type:'rule',name:'or_pattern'}
]}]},as_pattern:
{choices:[{items:[{type:'rule',name:'or_pattern',alias:'pattern'},{type:'string',value:'as'},{type:'rule',name:'pattern_capture_target',alias:'target'}
],action:'$B._PyAST.MatchAs(pattern, target.id, EXTRA)'},{items:[{type:'rule',name:'invalid_as_pattern'}
]}]},or_pattern:
{items:[{type:'rule',name:'closed_pattern',join:'|',alias:'patterns',repeat:'+'}
],action:'asdl_seq_LEN(patterns) == 1 ? asdl_seq_GET(patterns, 0) : $B._PyAST.MatchOr(patterns, EXTRA)'},closed_pattern:
{choices:[{items:[{type:'rule',name:'literal_pattern'}
]},{items:[{type:'rule',name:'capture_pattern'}
]},{items:[{type:'rule',name:'wildcard_pattern'}
]},{items:[{type:'rule',name:'value_pattern'}
]},{items:[{type:'rule',name:'group_pattern'}
]},{items:[{type:'rule',name:'sequence_pattern'}
]},{items:[{type:'rule',name:'mapping_pattern'}
]},{items:[{type:'rule',name:'class_pattern'}
]}]},literal_pattern:
{choices:[{items:[{type:'rule',name:'signed_number',alias:'value'},{choices:[{items:[{type:'string',value:'+'}
]},{items:[{type:'string',value:'-'}
]}],lookahead:'negative'}
],action:'$B._PyAST.MatchValue(value, EXTRA)'},{items:[{type:'rule',name:'complex_number',alias:'value'}
],action:'$B._PyAST.MatchValue(value, EXTRA)'},{items:[{type:'rule',name:'strings',alias:'value'}
],action:'$B._PyAST.MatchValue(value, EXTRA)'},{items:[{type:'string',value:'None'}
],action:'$B._PyAST.MatchSingleton(Py_None, EXTRA)'},{items:[{type:'string',value:'True'}
],action:'$B._PyAST.MatchSingleton(Py_True, EXTRA)'},{items:[{type:'string',value:'False'}
],action:'$B._PyAST.MatchSingleton(Py_False, EXTRA)'}]},literal_expr:
{choices:[{items:[{type:'rule',name:'signed_number'},{choices:[{items:[{type:'string',value:'+'}
]},{items:[{type:'string',value:'-'}
]}],lookahead:'negative'}
]},{items:[{type:'rule',name:'complex_number'}
]},{items:[{type:'rule',name:'strings'}
]},{items:[{type:'string',value:'None'}
],action:'$B._PyAST.Constant(Py_None, NULL, EXTRA)'},{items:[{type:'string',value:'True'}
],action:'$B._PyAST.Constant(Py_True, NULL, EXTRA)'},{items:[{type:'string',value:'False'}
],action:'$B._PyAST.Constant(Py_False, NULL, EXTRA)'}]},complex_number:
{choices:[{items:[{type:'rule',name:'signed_real_number',alias:'real'},{type:'string',value:'+'},{type:'rule',name:'imaginary_number',alias:'imag'}
],action:'$B._PyAST.BinOp(real, Add, imag, EXTRA)'},{items:[{type:'rule',name:'signed_real_number',alias:'real'},{type:'string',value:'-'},{type:'rule',name:'imaginary_number',alias:'imag'}
],action:'$B._PyAST.BinOp(real, Sub, imag, EXTRA)'}]},signed_number:
{choices:[{items:[{type:'NUMBER'}
]},{items:[{type:'string',value:'-'},{type:'NUMBER',alias:'number'}
],action:'$B._PyAST.UnaryOp(USub, number, EXTRA)'}]},signed_real_number:
{choices:[{items:[{type:'rule',name:'real_number'}
]},{items:[{type:'string',value:'-'},{type:'rule',name:'real_number',alias:'real'}
],action:'$B._PyAST.UnaryOp(USub, real, EXTRA)'}]},real_number:
{items:[{type:'NUMBER',alias:'real'}
],action:'$B._PyPegen.ensure_real(p, real)'},imaginary_number:
{items:[{type:'NUMBER',alias:'imag'}
],action:'$B._PyPegen.ensure_imaginary(p, imag)'},capture_pattern:
{items:[{type:'rule',name:'pattern_capture_target',alias:'target'}
],action:'$B._PyAST.MatchAs(NULL, target.id, EXTRA)'},pattern_capture_target:
{items:[{type:'string',value:'_',lookahead:'negative'},{type:'NAME',alias:'name'},{choices:[{items:[{type:'string',value:'.'}
]},{items:[{type:'string',value:'('}
]},{items:[{type:'string',value:'='}
]}],lookahead:'negative'}
],action:'$B._PyPegen.set_expr_context(p, name, Store)'},wildcard_pattern:
{items:[{type:'string',value:'_'}
],action:'$B._PyAST.MatchAs(NULL, NULL, EXTRA)'},value_pattern:
{items:[{type:'rule',name:'attr',alias:'attr'},{choices:[{items:[{type:'string',value:'.'}
]},{items:[{type:'string',value:'('}
]},{items:[{type:'string',value:'='}
]}],lookahead:'negative'}
],action:'$B._PyAST.MatchValue(attr, EXTRA)'},attr:
{items:[{type:'rule',name:'name_or_attr',alias:'value'},{type:'string',value:'.'},{type:'NAME',alias:'attr'}
],action:'$B._PyAST.Attribute(value, attr.id, Load, EXTRA)'},name_or_attr:
{choices:[{items:[{type:'rule',name:'attr'}
]},{items:[{type:'NAME'}
]}]},group_pattern:
{items:[{type:'string',value:'('},{type:'rule',name:'pattern',alias:'pattern'},{type:'string',value:')'}
],action:'pattern'},sequence_pattern:
{choices:[{items:[{type:'string',value:'['},{type:'rule',name:'maybe_sequence_pattern',repeat:'?',alias:'patterns'},{type:'string',value:']'}
],action:'$B._PyAST.MatchSequence(patterns, EXTRA)'},{items:[{type:'string',value:'('},{type:'rule',name:'open_sequence_pattern',repeat:'?',alias:'patterns'},{type:'string',value:')'}
],action:'$B._PyAST.MatchSequence(patterns, EXTRA)'}]},open_sequence_pattern:
{items:[{type:'rule',name:'maybe_star_pattern',alias:'pattern'},{type:'string',value:','},{type:'rule',name:'maybe_sequence_pattern',repeat:'?',alias:'patterns'}
],action:'$B._PyPegen.seq_insert_in_front(p, pattern, patterns)'},maybe_sequence_pattern:
{items:[{type:'rule',name:'maybe_star_pattern',join:',',alias:'patterns',repeat:'+'},{type:'string',value:',',repeat:'?'}
],action:'patterns'},maybe_star_pattern:
{choices:[{items:[{type:'rule',name:'star_pattern'}
]},{items:[{type:'rule',name:'pattern'}
]}]},star_pattern:
{choices:[{items:[{type:'string',value:'*'},{type:'rule',name:'pattern_capture_target',alias:'target'}
],action:'$B._PyAST.MatchStar(target.id, EXTRA)'},{items:[{type:'string',value:'*'},{type:'rule',name:'wildcard_pattern'}
],action:'$B._PyAST.MatchStar(NULL, EXTRA)'}]},mapping_pattern:
{choices:[{items:[{type:'string',value:'{'},{type:'string',value:'}'}
],action:'$B._PyAST.MatchMapping(NULL, NULL, NULL, EXTRA)'},{items:[{type:'string',value:'{'},{type:'rule',name:'double_star_pattern',alias:'rest'},{type:'string',value:',',repeat:'?'},{type:'string',value:'}'}
],action:'$B._PyAST.MatchMapping(NULL, NULL, rest.id, EXTRA)'},{items:[{type:'string',value:'{'},{type:'rule',name:'items_pattern',alias:'items'},{type:'string',value:','},{type:'rule',name:'double_star_pattern',alias:'rest'},{type:'string',value:',',repeat:'?'},{type:'string',value:'}'}
],action:'$B._PyAST.MatchMapping( CHECK(asdl_expr_seq, $B._PyPegen.get_pattern_keys(p, items)), CHECK(asdl_pattern_seq, $B._PyPegen.get_patterns(p, items)), rest.id, EXTRA)'},{items:[{type:'string',value:'{'},{type:'rule',name:'items_pattern',alias:'items'},{type:'string',value:',',repeat:'?'},{type:'string',value:'}'}
],action:'$B._PyAST.MatchMapping( CHECK(asdl_expr_seq, $B._PyPegen.get_pattern_keys(p, items)), CHECK(asdl_pattern_seq, $B._PyPegen.get_patterns(p, items)), NULL, EXTRA)'}]},items_pattern:
{items:[{type:'rule',name:'key_value_pattern',join:',',repeat:'+'}
]},key_value_pattern:
{items:[{choices:[{items:[{type:'rule',name:'literal_expr'}
]},{items:[{type:'rule',name:'attr'}
]}],alias:'key'},{type:'string',value:':'},{type:'rule',name:'pattern',alias:'pattern'}
],action:'$B._PyPegen.key_pattern_pair(p, key, pattern)'},double_star_pattern:
{items:[{type:'string',value:'**'},{type:'rule',name:'pattern_capture_target',alias:'target'}
],action:'target'},class_pattern:
{choices:[{items:[{type:'rule',name:'name_or_attr',alias:'cls'},{type:'string',value:'('},{type:'string',value:')'}
],action:'$B._PyAST.MatchClass(cls, NULL, NULL, NULL, EXTRA)'},{items:[{type:'rule',name:'name_or_attr',alias:'cls'},{type:'string',value:'('},{type:'rule',name:'positional_patterns',alias:'patterns'},{type:'string',value:',',repeat:'?'},{type:'string',value:')'}
],action:'$B._PyAST.MatchClass(cls, patterns, NULL, NULL, EXTRA)'},{items:[{type:'rule',name:'name_or_attr',alias:'cls'},{type:'string',value:'('},{type:'rule',name:'keyword_patterns',alias:'keywords'},{type:'string',value:',',repeat:'?'},{type:'string',value:')'}
],action:'$B._PyAST.MatchClass( cls, NULL, CHECK(asdl_identifier_seq, $B._PyPegen.map_names_to_ids(p, CHECK(asdl_expr_seq, $B._PyPegen.get_pattern_keys(p, keywords)))), CHECK(asdl_pattern_seq, $B._PyPegen.get_patterns(p, keywords)), EXTRA)'},{items:[{type:'rule',name:'name_or_attr',alias:'cls'},{type:'string',value:'('},{type:'rule',name:'positional_patterns',alias:'patterns'},{type:'string',value:','},{type:'rule',name:'keyword_patterns',alias:'keywords'},{type:'string',value:',',repeat:'?'},{type:'string',value:')'}
],action:'$B._PyAST.MatchClass( cls, patterns, CHECK(asdl_identifier_seq, $B._PyPegen.map_names_to_ids(p, CHECK(asdl_expr_seq, $B._PyPegen.get_pattern_keys(p, keywords)))), CHECK(asdl_pattern_seq, $B._PyPegen.get_patterns(p, keywords)), EXTRA)'},{items:[{type:'rule',name:'invalid_class_pattern'}
]}]},positional_patterns:
{items:[{type:'rule',name:'pattern',join:',',alias:'args',repeat:'+'}
],action:'args'},keyword_patterns:
{items:[{type:'rule',name:'keyword_pattern',join:',',repeat:'+'}
]},keyword_pattern:
{items:[{type:'NAME',alias:'arg'},{type:'string',value:'='},{type:'rule',name:'pattern',alias:'value'}
],action:'$B._PyPegen.key_pattern_pair(p, arg, value)'},expressions:
{choices:[{items:[{type:'rule',name:'expression',alias:'a'},{items:[{type:'string',value:','},{type:'rule',name:'expression',alias:'c'}
],repeat:'+',alias:'b',action:'c'},{items:[{type:'string',value:','}
],repeat:'?'}
],action:'$B._PyAST.Tuple(CHECK(asdl_expr_seq, $B._PyPegen.seq_insert_in_front(p, a, b)), Load, EXTRA)'},{items:[{type:'rule',name:'expression',alias:'a'},{type:'string',value:','}
],action:'$B._PyAST.Tuple(CHECK(asdl_expr_seq, $B._PyPegen.singleton_seq(p, a)), Load, EXTRA)'},{items:[{type:'rule',name:'expression'}
]}]},expression:
{choices:[{items:[{type:'rule',name:'invalid_expression'}
]},{items:[{type:'rule',name:'invalid_legacy_expression'}
]},{items:[{type:'rule',name:'disjunction',alias:'a'},{type:'string',value:'if'},{type:'rule',name:'disjunction',alias:'b'},{type:'string',value:'else'},{type:'rule',name:'expression',alias:'c'}
],action:'$B._PyAST.IfExp(b, a, c, EXTRA)'},{items:[{type:'rule',name:'disjunction'}
]},{items:[{type:'rule',name:'lambdef'}
]}]},yield_expr:
{choices:[{items:[{type:'string',value:'yield'},{type:'string',value:'from'},{type:'rule',name:'expression',alias:'a'}
],action:'$B._PyAST.YieldFrom(a, EXTRA)'},{items:[{type:'string',value:'yield'},{items:[{type:'rule',name:'star_expressions'}
],repeat:'?',alias:'a'}
],action:'$B._PyAST.Yield(a, EXTRA)'}]},star_expressions:
{choices:[{items:[{type:'rule',name:'star_expression',alias:'a'},{items:[{type:'string',value:','},{type:'rule',name:'star_expression',alias:'c'}
],repeat:'+',alias:'b',action:'c'},{items:[{type:'string',value:','}
],repeat:'?'}
],action:'$B._PyAST.Tuple(CHECK(asdl_expr_seq, $B._PyPegen.seq_insert_in_front(p, a, b)), Load, EXTRA)'},{items:[{type:'rule',name:'star_expression',alias:'a'},{type:'string',value:','}
],action:'$B._PyAST.Tuple(CHECK(asdl_expr_seq, $B._PyPegen.singleton_seq(p, a)), Load, EXTRA)'},{items:[{type:'rule',name:'star_expression'}
]}]},star_expression:
{choices:[{items:[{type:'string',value:'*'},{type:'rule',name:'bitwise_or',alias:'a'}
],action:'$B._PyAST.Starred(a, Load, EXTRA)'},{items:[{type:'rule',name:'expression'}
]}]},star_named_expressions:
{items:[{type:'rule',name:'star_named_expression',join:',',alias:'a',repeat:'+'},{items:[{type:'string',value:','}
],repeat:'?'}
],action:'a'},star_named_expression:
{choices:[{items:[{type:'string',value:'*'},{type:'rule',name:'bitwise_or',alias:'a'}
],action:'$B._PyAST.Starred(a, Load, EXTRA)'},{items:[{type:'rule',name:'named_expression'}
]}]},assignment_expression:
{items:[{type:'NAME',alias:'a'},{type:'string',value:':='},{type:'COMMIT_CHOICE'},{type:'rule',name:'expression',alias:'b'}
],action:'$B._PyAST.NamedExpr(CHECK($B.ast.expr, $B._PyPegen.set_expr_context(p, a, Store)), b, EXTRA)'},named_expression:
{choices:[{items:[{type:'rule',name:'assignment_expression'}
]},{items:[{type:'rule',name:'invalid_named_expression'}
]},{items:[{type:'rule',name:'expression'},{type:'string',value:':=',lookahead:'negative'}
]}]},disjunction:
{choices:[{items:[{type:'rule',name:'conjunction',alias:'a'},{items:[{type:'string',value:'or'},{type:'rule',name:'conjunction',alias:'c'}
],repeat:'+',alias:'b',action:'c'}
],action:'$B._PyAST.BoolOp( Or, CHECK(asdl_expr_seq, $B._PyPegen.seq_insert_in_front(p, a, b)), EXTRA)'},{items:[{type:'rule',name:'conjunction'}
]}]},conjunction:
{choices:[{items:[{type:'rule',name:'inversion',alias:'a'},{items:[{type:'string',value:'and'},{type:'rule',name:'inversion',alias:'c'}
],repeat:'+',alias:'b',action:'c'}
],action:'$B._PyAST.BoolOp( And, CHECK(asdl_expr_seq, $B._PyPegen.seq_insert_in_front(p, a, b)), EXTRA)'},{items:[{type:'rule',name:'inversion'}
]}]},inversion:
{choices:[{items:[{type:'string',value:'not'},{type:'rule',name:'inversion',alias:'a'}
],action:'$B._PyAST.UnaryOp(Not, a, EXTRA)'},{items:[{type:'rule',name:'comparison'}
]}]},comparison:
{choices:[{items:[{type:'rule',name:'bitwise_or',alias:'a'},{type:'rule',name:'compare_op_bitwise_or_pair',repeat:'+',alias:'b'}
],action:'$B._PyAST.Compare( a, CHECK(asdl_int_seq, $B._PyPegen.get_cmpops(p, b)), CHECK(asdl_expr_seq, $B._PyPegen.get_exprs(p, b)), EXTRA)'},{items:[{type:'rule',name:'bitwise_or'}
]}]},compare_op_bitwise_or_pair:
{choices:[{items:[{type:'rule',name:'eq_bitwise_or'}
]},{items:[{type:'rule',name:'noteq_bitwise_or'}
]},{items:[{type:'rule',name:'lte_bitwise_or'}
]},{items:[{type:'rule',name:'lt_bitwise_or'}
]},{items:[{type:'rule',name:'gte_bitwise_or'}
]},{items:[{type:'rule',name:'gt_bitwise_or'}
]},{items:[{type:'rule',name:'notin_bitwise_or'}
]},{items:[{type:'rule',name:'in_bitwise_or'}
]},{items:[{type:'rule',name:'isnot_bitwise_or'}
]},{items:[{type:'rule',name:'is_bitwise_or'}
]}]},eq_bitwise_or:
{items:[{type:'string',value:'=='},{type:'rule',name:'bitwise_or',alias:'a'}
],action:'$B._PyPegen.cmpop_expr_pair(p, Eq, a)'},noteq_bitwise_or:
{items:[{items:[{type:'string',value:'!=',alias:'tok'}
],action:'$B._PyPegen.check_barry_as_flufl(p, tok) ? NULL : tok'},{type:'rule',name:'bitwise_or',alias:'a'}
],action:'$B._PyPegen.cmpop_expr_pair(p, NotEq, a)'},lte_bitwise_or:
{items:[{type:'string',value:'<='},{type:'rule',name:'bitwise_or',alias:'a'}
],action:'$B._PyPegen.cmpop_expr_pair(p, LtE, a)'},lt_bitwise_or:
{items:[{type:'string',value:'<'},{type:'rule',name:'bitwise_or',alias:'a'}
],action:'$B._PyPegen.cmpop_expr_pair(p, Lt, a)'},gte_bitwise_or:
{items:[{type:'string',value:'>='},{type:'rule',name:'bitwise_or',alias:'a'}
],action:'$B._PyPegen.cmpop_expr_pair(p, GtE, a)'},gt_bitwise_or:
{items:[{type:'string',value:'>'},{type:'rule',name:'bitwise_or',alias:'a'}
],action:'$B._PyPegen.cmpop_expr_pair(p, Gt, a)'},notin_bitwise_or:
{items:[{type:'string',value:'not'},{type:'string',value:'in'},{type:'rule',name:'bitwise_or',alias:'a'}
],action:'$B._PyPegen.cmpop_expr_pair(p, NotIn, a)'},in_bitwise_or:
{items:[{type:'string',value:'in'},{type:'rule',name:'bitwise_or',alias:'a'}
],action:'$B._PyPegen.cmpop_expr_pair(p, In, a)'},isnot_bitwise_or:
{items:[{type:'string',value:'is'},{type:'string',value:'not'},{type:'rule',name:'bitwise_or',alias:'a'}
],action:'$B._PyPegen.cmpop_expr_pair(p, IsNot, a)'},is_bitwise_or:
{items:[{type:'string',value:'is'},{type:'rule',name:'bitwise_or',alias:'a'}
],action:'$B._PyPegen.cmpop_expr_pair(p, Is, a)'},bitwise_or:
{choices:[{items:[{type:'rule',name:'bitwise_or',alias:'a'},{type:'string',value:'|'},{type:'rule',name:'bitwise_xor',alias:'b'}
],action:'$B._PyAST.BinOp(a, BitOr, b, EXTRA)'},{items:[{type:'rule',name:'bitwise_xor'}
]}]},bitwise_xor:
{choices:[{items:[{type:'rule',name:'bitwise_xor',alias:'a'},{type:'string',value:'^'},{type:'rule',name:'bitwise_and',alias:'b'}
],action:'$B._PyAST.BinOp(a, BitXor, b, EXTRA)'},{items:[{type:'rule',name:'bitwise_and'}
]}]},bitwise_and:
{choices:[{items:[{type:'rule',name:'bitwise_and',alias:'a'},{type:'string',value:'&'},{type:'rule',name:'shift_expr',alias:'b'}
],action:'$B._PyAST.BinOp(a, BitAnd, b, EXTRA)'},{items:[{type:'rule',name:'shift_expr'}
]}]},shift_expr:
{choices:[{items:[{type:'rule',name:'shift_expr',alias:'a'},{type:'string',value:'<<'},{type:'rule',name:'sum',alias:'b'}
],action:'$B._PyAST.BinOp(a, LShift, b, EXTRA)'},{items:[{type:'rule',name:'shift_expr',alias:'a'},{type:'string',value:'>>'},{type:'rule',name:'sum',alias:'b'}
],action:'$B._PyAST.BinOp(a, RShift, b, EXTRA)'},{items:[{type:'rule',name:'sum'}
]}]},sum:
{choices:[{items:[{type:'rule',name:'sum',alias:'a'},{type:'string',value:'+'},{type:'rule',name:'term',alias:'b'}
],action:'$B._PyAST.BinOp(a, Add, b, EXTRA)'},{items:[{type:'rule',name:'sum',alias:'a'},{type:'string',value:'-'},{type:'rule',name:'term',alias:'b'}
],action:'$B._PyAST.BinOp(a, Sub, b, EXTRA)'},{items:[{type:'rule',name:'term'}
]}]},term:
{choices:[{items:[{type:'rule',name:'term',alias:'a'},{type:'string',value:'*'},{type:'rule',name:'factor',alias:'b'}
],action:'$B._PyAST.BinOp(a, Mult, b, EXTRA)'},{items:[{type:'rule',name:'term',alias:'a'},{type:'string',value:'/'},{type:'rule',name:'factor',alias:'b'}
],action:'$B._PyAST.BinOp(a, Div, b, EXTRA)'},{items:[{type:'rule',name:'term',alias:'a'},{type:'string',value:'//'},{type:'rule',name:'factor',alias:'b'}
],action:'$B._PyAST.BinOp(a, FloorDiv, b, EXTRA)'},{items:[{type:'rule',name:'term',alias:'a'},{type:'string',value:'%'},{type:'rule',name:'factor',alias:'b'}
],action:'$B._PyAST.BinOp(a, Mod, b, EXTRA)'},{items:[{type:'rule',name:'term',alias:'a'},{type:'string',value:'@'},{type:'rule',name:'factor',alias:'b'}
],action:'CHECK_VERSION($B.ast.expr, 5, "The \'@\' operator is", $B._PyAST.BinOp(a, MatMult, b, EXTRA))'},{items:[{type:'rule',name:'factor'}
]}]},factor:
{choices:[{items:[{type:'string',value:'+'},{type:'rule',name:'factor',alias:'a'}
],action:'$B._PyAST.UnaryOp(UAdd, a, EXTRA)'},{items:[{type:'string',value:'-'},{type:'rule',name:'factor',alias:'a'}
],action:'$B._PyAST.UnaryOp(USub, a, EXTRA)'},{items:[{type:'string',value:'~'},{type:'rule',name:'factor',alias:'a'}
],action:'$B._PyAST.UnaryOp(Invert, a, EXTRA)'},{items:[{type:'rule',name:'power'}
]}]},power:
{choices:[{items:[{type:'rule',name:'await_primary',alias:'a'},{type:'string',value:'**'},{type:'rule',name:'factor',alias:'b'}
],action:'$B._PyAST.BinOp(a, Pow, b, EXTRA)'},{items:[{type:'rule',name:'await_primary'}
]}]},await_primary:
{choices:[{items:[{type:'AWAIT'},{type:'rule',name:'primary',alias:'a'}
],action:'CHECK_VERSION($B.ast.expr, 5, "Await expressions are", $B._PyAST.Await(a, EXTRA))'},{items:[{type:'rule',name:'primary'}
]}]},primary:
{choices:[{items:[{type:'rule',name:'primary',alias:'a'},{type:'string',value:'.'},{type:'NAME',alias:'b'}
],action:'$B._PyAST.Attribute(a, b.id, Load, EXTRA)'},{items:[{type:'rule',name:'primary',alias:'a'},{type:'rule',name:'genexp',alias:'b'}
],action:'$B._PyAST.Call(a, CHECK(asdl_expr_seq, $B._PyPegen.singleton_seq(p, b)), NULL, EXTRA)'},{items:[{type:'rule',name:'primary',alias:'a'},{type:'string',value:'('},{items:[{type:'rule',name:'arguments'}
],repeat:'?',alias:'b'},{type:'string',value:')'}
],action:'$B._PyAST.Call(a, (b) ? b.args : NULL, (b) ? b.keywords : NULL, EXTRA)'},{items:[{type:'rule',name:'primary',alias:'a'},{type:'string',value:'['},{type:'rule',name:'slices',alias:'b'},{type:'string',value:']'}
],action:'$B._PyAST.Subscript(a, b, Load, EXTRA)'},{items:[{type:'rule',name:'atom'}
]}]},slices:
{choices:[{items:[{type:'rule',name:'slice',alias:'a'},{type:'string',value:',',lookahead:'negative'}
],action:'a'},{items:[{choices:[{items:[{type:'rule',name:'slice'}
]},{items:[{type:'rule',name:'starred_expression'}
]}],join:',',alias:'a',repeat:'+'},{items:[{type:'string',value:','}
],repeat:'?'}
],action:'$B._PyAST.Tuple(a, Load, EXTRA)'}]},slice:
{choices:[{items:[{items:[{type:'rule',name:'expression'}
],repeat:'?',alias:'a'},{type:'string',value:':'},{items:[{type:'rule',name:'expression'}
],repeat:'?',alias:'b'},{items:[{type:'string',value:':'},{items:[{type:'rule',name:'expression'}
],repeat:'?',alias:'d'}
],repeat:'?',alias:'c',action:'d'}
],action:'$B._PyAST.Slice(a, b, c, EXTRA)'},{items:[{type:'rule',name:'named_expression',alias:'a'}
],action:'a'}]},atom:
{choices:[{items:[{type:'NAME'}
]},{items:[{type:'string',value:'True'}
],action:'$B._PyAST.Constant(Py_True, NULL, EXTRA)'},{items:[{type:'string',value:'False'}
],action:'$B._PyAST.Constant(Py_False, NULL, EXTRA)'},{items:[{type:'string',value:'None'}
],action:'$B._PyAST.Constant(Py_None, NULL, EXTRA)'},{items:[{type:'STRING',lookahead:'positive'},{type:'rule',name:'strings'}
]},{items:[{type:'NUMBER'}
]},{items:[{type:'string',value:'(',lookahead:'positive'},{choices:[{items:[{type:'rule',name:'tuple'}
]},{items:[{type:'rule',name:'group'}
]},{items:[{type:'rule',name:'genexp'}
]}]}
]},{items:[{type:'string',value:'[',lookahead:'positive'},{choices:[{items:[{type:'rule',name:'list'}
]},{items:[{type:'rule',name:'listcomp'}
]}]}
]},{items:[{type:'string',value:'{',lookahead:'positive'},{choices:[{items:[{type:'rule',name:'dict'}
]},{items:[{type:'rule',name:'set'}
]},{items:[{type:'rule',name:'dictcomp'}
]},{items:[{type:'rule',name:'setcomp'}
]}]}
]},{items:[{type:'string',value:'...'}
],action:'$B._PyAST.Constant(Py_Ellipsis, NULL, EXTRA)'}]},group:
{choices:[{items:[{type:'string',value:'('},{choices:[{items:[{type:'rule',name:'yield_expr'}
]},{items:[{type:'rule',name:'named_expression'}
]}],alias:'a'},{type:'string',value:')'}
],action:'a'},{items:[{type:'rule',name:'invalid_group'}
]}]},lambdef:
{items:[{type:'string',value:'lambda'},{items:[{type:'rule',name:'lambda_params'}
],repeat:'?',alias:'a'},{type:'string',value:':'},{type:'rule',name:'expression',alias:'b'}
],action:'$B._PyAST.Lambda((a) ? a : CHECK($B.ast.arguments, $B._PyPegen.empty_arguments(p)), b, EXTRA)'},lambda_params:
{choices:[{items:[{type:'rule',name:'invalid_lambda_parameters'}
]},{items:[{type:'rule',name:'lambda_parameters'}
]}]},lambda_parameters:
{choices:[{items:[{type:'rule',name:'lambda_slash_no_default',alias:'a'},{type:'rule',name:'lambda_param_no_default',repeat:'*',alias:'b'},{type:'rule',name:'lambda_param_with_default',repeat:'*',alias:'c'},{items:[{type:'rule',name:'lambda_star_etc'}
],repeat:'?',alias:'d'}
],action:'$B._PyPegen.make_arguments(p, a, NULL, b, c, d)'},{items:[{type:'rule',name:'lambda_slash_with_default',alias:'a'},{type:'rule',name:'lambda_param_with_default',repeat:'*',alias:'b'},{items:[{type:'rule',name:'lambda_star_etc'}
],repeat:'?',alias:'c'}
],action:'$B._PyPegen.make_arguments(p, NULL, a, NULL, b, c)'},{items:[{type:'rule',name:'lambda_param_no_default',repeat:'+',alias:'a'},{type:'rule',name:'lambda_param_with_default',repeat:'*',alias:'b'},{items:[{type:'rule',name:'lambda_star_etc'}
],repeat:'?',alias:'c'}
],action:'$B._PyPegen.make_arguments(p, NULL, NULL, a, b, c)'},{items:[{type:'rule',name:'lambda_param_with_default',repeat:'+',alias:'a'},{items:[{type:'rule',name:'lambda_star_etc'}
],repeat:'?',alias:'b'}
],action:'$B._PyPegen.make_arguments(p, NULL, NULL, NULL, a, b)'},{items:[{type:'rule',name:'lambda_star_etc',alias:'a'}
],action:'$B._PyPegen.make_arguments(p, NULL, NULL, NULL, NULL, a)'}]},lambda_slash_no_default:
{choices:[{items:[{type:'rule',name:'lambda_param_no_default',repeat:'+',alias:'a'},{type:'string',value:'/'},{type:'string',value:','}
],action:'a'},{items:[{type:'rule',name:'lambda_param_no_default',repeat:'+',alias:'a'},{type:'string',value:'/'},{type:'string',value:':',lookahead:'positive'}
],action:'a'}]},lambda_slash_with_default:
{choices:[{items:[{type:'rule',name:'lambda_param_no_default',repeat:'*',alias:'a'},{type:'rule',name:'lambda_param_with_default',repeat:'+',alias:'b'},{type:'string',value:'/'},{type:'string',value:','}
],action:'$B._PyPegen.slash_with_default(p, a, b)'},{items:[{type:'rule',name:'lambda_param_no_default',repeat:'*',alias:'a'},{type:'rule',name:'lambda_param_with_default',repeat:'+',alias:'b'},{type:'string',value:'/'},{type:'string',value:':',lookahead:'positive'}
],action:'$B._PyPegen.slash_with_default(p, a, b)'}]},lambda_star_etc:
{choices:[{items:[{type:'rule',name:'invalid_lambda_star_etc'}
]},{items:[{type:'string',value:'*'},{type:'rule',name:'lambda_param_no_default',alias:'a'},{type:'rule',name:'lambda_param_maybe_default',repeat:'*',alias:'b'},{items:[{type:'rule',name:'lambda_kwds'}
],repeat:'?',alias:'c'}
],action:'$B._PyPegen.star_etc(p, a, b, c)'},{items:[{type:'string',value:'*'},{type:'string',value:','},{type:'rule',name:'lambda_param_maybe_default',repeat:'+',alias:'b'},{items:[{type:'rule',name:'lambda_kwds'}
],repeat:'?',alias:'c'}
],action:'$B._PyPegen.star_etc(p, NULL, b, c)'},{items:[{type:'rule',name:'lambda_kwds',alias:'a'}
],action:'$B._PyPegen.star_etc(p, NULL, NULL, a)'}]},lambda_kwds:
{choices:[{items:[{type:'rule',name:'invalid_lambda_kwds'}
]},{items:[{type:'string',value:'**'},{type:'rule',name:'lambda_param_no_default',alias:'a'}
],action:'a'}]},lambda_param_no_default:
{choices:[{items:[{type:'rule',name:'lambda_param',alias:'a'},{type:'string',value:','}
],action:'a'},{items:[{type:'rule',name:'lambda_param',alias:'a'},{type:'string',value:':',lookahead:'positive'}
],action:'a'}]},lambda_param_with_default:
{choices:[{items:[{type:'rule',name:'lambda_param',alias:'a'},{type:'rule',name:'default',alias:'c'},{type:'string',value:','}
],action:'$B._PyPegen.name_default_pair(p, a, c, NULL)'},{items:[{type:'rule',name:'lambda_param',alias:'a'},{type:'rule',name:'default',alias:'c'},{type:'string',value:':',lookahead:'positive'}
],action:'$B._PyPegen.name_default_pair(p, a, c, NULL)'}]},lambda_param_maybe_default:
{choices:[{items:[{type:'rule',name:'lambda_param',alias:'a'},{type:'rule',name:'default',repeat:'?',alias:'c'},{type:'string',value:','}
],action:'$B._PyPegen.name_default_pair(p, a, c, NULL)'},{items:[{type:'rule',name:'lambda_param',alias:'a'},{type:'rule',name:'default',repeat:'?',alias:'c'},{type:'string',value:':',lookahead:'positive'}
],action:'$B._PyPegen.name_default_pair(p, a, c, NULL)'}]},lambda_param:
{items:[{type:'NAME',alias:'a'}
],action:'$B._PyAST.arg(a.id, NULL, NULL, EXTRA)'},strings:
{items:[{type:'STRING',repeat:'+',alias:'a'}
],action:'$B._PyPegen.concatenate_strings(p, a)'},list:
{items:[{type:'string',value:'['},{items:[{type:'rule',name:'star_named_expressions'}
],repeat:'?',alias:'a'},{type:'string',value:']'}
],action:'$B._PyAST.List(a, Load, EXTRA)'},tuple:
{items:[{type:'string',value:'('},{items:[{type:'rule',name:'star_named_expression',alias:'y'},{type:'string',value:','},{items:[{type:'rule',name:'star_named_expressions'}
],repeat:'?',alias:'z'}
],repeat:'?',alias:'a',action:'$B._PyPegen.seq_insert_in_front(p, y, z)'},{type:'string',value:')'}
],action:'$B._PyAST.Tuple(a, Load, EXTRA)'},set:
{items:[{type:'string',value:'{'},{type:'rule',name:'star_named_expressions',alias:'a'},{type:'string',value:'}'}
],action:'$B._PyAST.Set(a, EXTRA)'},dict:
{choices:[{items:[{type:'string',value:'{'},{items:[{type:'rule',name:'double_starred_kvpairs'}
],repeat:'?',alias:'a'},{type:'string',value:'}'}
],action:'$B._PyAST.Dict( CHECK(asdl_expr_seq, $B._PyPegen.get_keys(p, a)), CHECK(asdl_expr_seq, $B._PyPegen.get_values(p, a)), EXTRA)'},{items:[{type:'string',value:'{'},{type:'rule',name:'invalid_double_starred_kvpairs'},{type:'string',value:'}'}
]}]},double_starred_kvpairs:
{items:[{type:'rule',name:'double_starred_kvpair',join:',',alias:'a',repeat:'+'},{items:[{type:'string',value:','}
],repeat:'?'}
],action:'a'},double_starred_kvpair:
{choices:[{items:[{type:'string',value:'**'},{type:'rule',name:'bitwise_or',alias:'a'}
],action:'$B._PyPegen.key_value_pair(p, NULL, a)'},{items:[{type:'rule',name:'kvpair'}
]}]},kvpair:
{items:[{type:'rule',name:'expression',alias:'a'},{type:'string',value:':'},{type:'rule',name:'expression',alias:'b'}
],action:'$B._PyPegen.key_value_pair(p, a, b)'},for_if_clauses:
{items:[{type:'rule',name:'for_if_clause',repeat:'+',alias:'a'}
],action:'a'},for_if_clause:
{choices:[{items:[{type:'ASYNC'},{type:'string',value:'for'},{type:'rule',name:'star_targets',alias:'a'},{type:'string',value:'in'},{type:'COMMIT_CHOICE'},{type:'rule',name:'disjunction',alias:'b'},{items:[{type:'string',value:'if'},{type:'rule',name:'disjunction',alias:'z'}
],repeat:'*',alias:'c',action:'z'}
],action:'CHECK_VERSION($B.ast.comprehension, 6, "Async comprehensions are", $B._PyAST.comprehension(a, b, c, 1, p.arena))'},{items:[{type:'string',value:'for'},{type:'rule',name:'star_targets',alias:'a'},{type:'string',value:'in'},{type:'COMMIT_CHOICE'},{type:'rule',name:'disjunction',alias:'b'},{items:[{type:'string',value:'if'},{type:'rule',name:'disjunction',alias:'z'}
],repeat:'*',alias:'c',action:'z'}
],action:'$B._PyAST.comprehension(a, b, c, 0, p.arena)'},{items:[{type:'rule',name:'invalid_for_target'}
]}]},listcomp:
{choices:[{items:[{type:'string',value:'['},{type:'rule',name:'named_expression',alias:'a'},{type:'rule',name:'for_if_clauses',alias:'b'},{type:'string',value:']'}
],action:'$B._PyAST.ListComp(a, b, EXTRA)'},{items:[{type:'rule',name:'invalid_comprehension'}
]}]},setcomp:
{choices:[{items:[{type:'string',value:'{'},{type:'rule',name:'named_expression',alias:'a'},{type:'rule',name:'for_if_clauses',alias:'b'},{type:'string',value:'}'}
],action:'$B._PyAST.SetComp(a, b, EXTRA)'},{items:[{type:'rule',name:'invalid_comprehension'}
]}]},genexp:
{choices:[{items:[{type:'string',value:'('},{choices:[{items:[{type:'rule',name:'assignment_expression'}
]},{items:[{type:'rule',name:'expression'},{type:'string',value:':=',lookahead:'negative'}
]}],alias:'a'},{type:'rule',name:'for_if_clauses',alias:'b'},{type:'string',value:')'}
],action:'$B._PyAST.GeneratorExp(a, b, EXTRA)'},{items:[{type:'rule',name:'invalid_comprehension'}
]}]},dictcomp:
{choices:[{items:[{type:'string',value:'{'},{type:'rule',name:'kvpair',alias:'a'},{type:'rule',name:'for_if_clauses',alias:'b'},{type:'string',value:'}'}
],action:'$B._PyAST.DictComp(a.key, a.value, b, EXTRA)'},{items:[{type:'rule',name:'invalid_dict_comprehension'}
]}]},arguments:
{choices:[{items:[{type:'rule',name:'args',alias:'a'},{items:[{type:'string',value:','}
],repeat:'?'},{type:'string',value:')',lookahead:'positive'}
],action:'a'},{items:[{type:'rule',name:'invalid_arguments'}
]}]},args:
{choices:[{items:[{choices:[{items:[{type:'rule',name:'starred_expression'}
]},{items:[{choices:[{items:[{type:'rule',name:'assignment_expression'}
]},{items:[{type:'rule',name:'expression'},{type:'string',value:':=',lookahead:'negative'}
]}]},{type:'string',value:'=',lookahead:'negative'}
]}],join:',',alias:'a',repeat:'+'},{items:[{type:'string',value:','},{type:'rule',name:'kwargs',alias:'k'}
],repeat:'?',alias:'b',action:'k'}
],action:'$B._PyPegen.collect_call_seqs(p, a, b, EXTRA)'},{items:[{type:'rule',name:'kwargs',alias:'a'}
],action:'$B._PyAST.Call($B._PyPegen.dummy_name(p), CHECK_NULL_ALLOWED(asdl_expr_seq, $B._PyPegen.seq_extract_starred_exprs(p, a)), CHECK_NULL_ALLOWED(asdl_keyword_seq, $B._PyPegen.seq_delete_starred_exprs(p, a)), EXTRA)'}]},kwargs:
{choices:[{items:[{type:'rule',name:'kwarg_or_starred',join:',',alias:'a',repeat:'+'},{type:'string',value:','},{type:'rule',name:'kwarg_or_double_starred',join:',',alias:'b',repeat:'+'}
],action:'$B._PyPegen.join_sequences(p, a, b)'},{items:[{type:'rule',name:'kwarg_or_starred',join:',',repeat:'+'}
]},{items:[{type:'rule',name:'kwarg_or_double_starred',join:',',repeat:'+'}
]}]},starred_expression:
{items:[{type:'string',value:'*'},{type:'rule',name:'expression',alias:'a'}
],action:'$B._PyAST.Starred(a, Load, EXTRA)'},kwarg_or_starred:
{choices:[{items:[{type:'rule',name:'invalid_kwarg'}
]},{items:[{type:'NAME',alias:'a'},{type:'string',value:'='},{type:'rule',name:'expression',alias:'b'}
],action:'$B._PyPegen.keyword_or_starred(p, CHECK($B.ast.keyword, $B._PyAST.keyword(a.id, b, EXTRA)), 1)'},{items:[{type:'rule',name:'starred_expression',alias:'a'}
],action:'$B._PyPegen.keyword_or_starred(p, a, 0)'}]},kwarg_or_double_starred:
{choices:[{items:[{type:'rule',name:'invalid_kwarg'}
]},{items:[{type:'NAME',alias:'a'},{type:'string',value:'='},{type:'rule',name:'expression',alias:'b'}
],action:'$B._PyPegen.keyword_or_starred(p, CHECK($B.ast.keyword, $B._PyAST.keyword(a.id, b, EXTRA)), 1)'},{items:[{type:'string',value:'**'},{type:'rule',name:'expression',alias:'a'}
],action:'$B._PyPegen.keyword_or_starred(p, CHECK($B.ast.keyword, $B._PyAST.keyword(NULL, a, EXTRA)), 1)'}]},star_targets:
{choices:[{items:[{type:'rule',name:'star_target',alias:'a'},{type:'string',value:',',lookahead:'negative'}
],action:'a'},{items:[{type:'rule',name:'star_target',alias:'a'},{items:[{type:'string',value:','},{type:'rule',name:'star_target',alias:'c'}
],repeat:'*',alias:'b',action:'c'},{items:[{type:'string',value:','}
],repeat:'?'}
],action:'$B._PyAST.Tuple(CHECK(asdl_expr_seq, $B._PyPegen.seq_insert_in_front(p, a, b)), Store, EXTRA)'}]},star_targets_list_seq:
{items:[{type:'rule',name:'star_target',join:',',alias:'a',repeat:'+'},{items:[{type:'string',value:','}
],repeat:'?'}
],action:'a'},star_targets_tuple_seq:
{choices:[{items:[{type:'rule',name:'star_target',alias:'a'},{items:[{type:'string',value:','},{type:'rule',name:'star_target',alias:'c'}
],repeat:'+',alias:'b',action:'c'},{items:[{type:'string',value:','}
],repeat:'?'}
],action:' $B._PyPegen.seq_insert_in_front(p, a, b)'},{items:[{type:'rule',name:'star_target',alias:'a'},{type:'string',value:','}
],action:' $B._PyPegen.singleton_seq(p, a)'}]},star_target:
{choices:[{items:[{type:'string',value:'*'},{items:[{type:'string',value:'*',lookahead:'negative'},{type:'rule',name:'star_target'}
],alias:'a'}
],action:'$B._PyAST.Starred(CHECK($B.ast.expr, $B._PyPegen.set_expr_context(p, a, Store)), Store, EXTRA)'},{items:[{type:'rule',name:'target_with_star_atom'}
]}]},target_with_star_atom:
{choices:[{items:[{type:'rule',name:'t_primary',alias:'a'},{type:'string',value:'.'},{type:'NAME',alias:'b'},{type:'rule',name:'t_lookahead',lookahead:'negative'}
],action:'$B._PyAST.Attribute(a, b.id, Store, EXTRA)'},{items:[{type:'rule',name:'t_primary',alias:'a'},{type:'string',value:'['},{type:'rule',name:'slices',alias:'b'},{type:'string',value:']'},{type:'rule',name:'t_lookahead',lookahead:'negative'}
],action:'$B._PyAST.Subscript(a, b, Store, EXTRA)'},{items:[{type:'rule',name:'star_atom'}
]}]},star_atom:
{choices:[{items:[{type:'NAME',alias:'a'}
],action:'$B._PyPegen.set_expr_context(p, a, Store)'},{items:[{type:'string',value:'('},{type:'rule',name:'target_with_star_atom',alias:'a'},{type:'string',value:')'}
],action:'$B._PyPegen.set_expr_context(p, a, Store)'},{items:[{type:'string',value:'('},{items:[{type:'rule',name:'star_targets_tuple_seq'}
],repeat:'?',alias:'a'},{type:'string',value:')'}
],action:'$B._PyAST.Tuple(a, Store, EXTRA)'},{items:[{type:'string',value:'['},{items:[{type:'rule',name:'star_targets_list_seq'}
],repeat:'?',alias:'a'},{type:'string',value:']'}
],action:'$B._PyAST.List(a, Store, EXTRA)'}]},single_target:
{choices:[{items:[{type:'rule',name:'single_subscript_attribute_target'}
]},{items:[{type:'NAME',alias:'a'}
],action:'$B._PyPegen.set_expr_context(p, a, Store)'},{items:[{type:'string',value:'('},{type:'rule',name:'single_target',alias:'a'},{type:'string',value:')'}
],action:'a'}]},single_subscript_attribute_target:
{choices:[{items:[{type:'rule',name:'t_primary',alias:'a'},{type:'string',value:'.'},{type:'NAME',alias:'b'},{type:'rule',name:'t_lookahead',lookahead:'negative'}
],action:'$B._PyAST.Attribute(a, b.id, Store, EXTRA)'},{items:[{type:'rule',name:'t_primary',alias:'a'},{type:'string',value:'['},{type:'rule',name:'slices',alias:'b'},{type:'string',value:']'},{type:'rule',name:'t_lookahead',lookahead:'negative'}
],action:'$B._PyAST.Subscript(a, b, Store, EXTRA)'}]},t_primary:
{choices:[{items:[{type:'rule',name:'t_primary',alias:'a'},{type:'string',value:'.'},{type:'NAME',alias:'b'},{type:'rule',name:'t_lookahead',lookahead:'positive'}
],action:'$B._PyAST.Attribute(a, b.id, Load, EXTRA)'},{items:[{type:'rule',name:'t_primary',alias:'a'},{type:'string',value:'['},{type:'rule',name:'slices',alias:'b'},{type:'string',value:']'},{type:'rule',name:'t_lookahead',lookahead:'positive'}
],action:'$B._PyAST.Subscript(a, b, Load, EXTRA)'},{items:[{type:'rule',name:'t_primary',alias:'a'},{type:'rule',name:'genexp',alias:'b'},{type:'rule',name:'t_lookahead',lookahead:'positive'}
],action:'$B._PyAST.Call(a, CHECK(asdl_expr_seq, $B._PyPegen.singleton_seq(p, b)), NULL, EXTRA)'},{items:[{type:'rule',name:'t_primary',alias:'a'},{type:'string',value:'('},{items:[{type:'rule',name:'arguments'}
],repeat:'?',alias:'b'},{type:'string',value:')'},{type:'rule',name:'t_lookahead',lookahead:'positive'}
],action:'$B._PyAST.Call(a, (b) ? b.args : NULL, (b) ? b.keywords : NULL, EXTRA)'},{items:[{type:'rule',name:'atom',alias:'a'},{type:'rule',name:'t_lookahead',lookahead:'positive'}
],action:'a'}]},t_lookahead:
{choices:[{items:[{type:'string',value:'('}
]},{items:[{type:'string',value:'['}
]},{items:[{type:'string',value:'.'}
]}]},del_targets:
{items:[{type:'rule',name:'del_target',join:',',alias:'a',repeat:'+'},{items:[{type:'string',value:','}
],repeat:'?'}
],action:'a'},del_target:
{choices:[{items:[{type:'rule',name:'t_primary',alias:'a'},{type:'string',value:'.'},{type:'NAME',alias:'b'},{type:'rule',name:'t_lookahead',lookahead:'negative'}
],action:'$B._PyAST.Attribute(a, b.id, Del, EXTRA)'},{items:[{type:'rule',name:'t_primary',alias:'a'},{type:'string',value:'['},{type:'rule',name:'slices',alias:'b'},{type:'string',value:']'},{type:'rule',name:'t_lookahead',lookahead:'negative'}
],action:'$B._PyAST.Subscript(a, b, Del, EXTRA)'},{items:[{type:'rule',name:'del_t_atom'}
]}]},del_t_atom:
{choices:[{items:[{type:'NAME',alias:'a'}
],action:'$B._PyPegen.set_expr_context(p, a, Del)'},{items:[{type:'string',value:'('},{type:'rule',name:'del_target',alias:'a'},{type:'string',value:')'}
],action:'$B._PyPegen.set_expr_context(p, a, Del)'},{items:[{type:'string',value:'('},{items:[{type:'rule',name:'del_targets'}
],repeat:'?',alias:'a'},{type:'string',value:')'}
],action:'$B._PyAST.Tuple(a, Del, EXTRA)'},{items:[{type:'string',value:'['},{items:[{type:'rule',name:'del_targets'}
],repeat:'?',alias:'a'},{type:'string',value:']'}
],action:'$B._PyAST.List(a, Del, EXTRA)'}]},type_expressions:
{choices:[{items:[{type:'rule',name:'expression',join:',',alias:'a',repeat:'+'},{type:'string',value:','},{type:'string',value:'*'},{type:'rule',name:'expression',alias:'b'},{type:'string',value:','},{type:'string',value:'**'},{type:'rule',name:'expression',alias:'c'}
],action:'$B._PyPegen.seq_append_to_end( p, CHECK(asdl_seq, $B._PyPegen.seq_append_to_end(p, a, b)), c)'},{items:[{type:'rule',name:'expression',join:',',alias:'a',repeat:'+'},{type:'string',value:','},{type:'string',value:'*'},{type:'rule',name:'expression',alias:'b'}
],action:'$B._PyPegen.seq_append_to_end(p, a, b)'},{items:[{type:'rule',name:'expression',join:',',alias:'a',repeat:'+'},{type:'string',value:','},{type:'string',value:'**'},{type:'rule',name:'expression',alias:'b'}
],action:'$B._PyPegen.seq_append_to_end(p, a, b)'},{items:[{type:'string',value:'*'},{type:'rule',name:'expression',alias:'a'},{type:'string',value:','},{type:'string',value:'**'},{type:'rule',name:'expression',alias:'b'}
],action:'$B._PyPegen.seq_append_to_end( p, CHECK(asdl_seq, $B._PyPegen.singleton_seq(p, a)), b)'},{items:[{type:'string',value:'*'},{type:'rule',name:'expression',alias:'a'}
],action:'$B._PyPegen.singleton_seq(p, a)'},{items:[{type:'string',value:'**'},{type:'rule',name:'expression',alias:'a'}
],action:'$B._PyPegen.singleton_seq(p, a)'},{items:[{type:'rule',name:'expression',join:',',alias:'a',repeat:'+'}
],action:'a'}]},func_type_comment:
{choices:[{items:[{type:'NEWLINE'},{type:'TYPE_COMMENT',alias:'t'},{items:[{type:'NEWLINE'},{type:'INDENT'}
],lookahead:'positive'}
],action:'t'},{items:[{type:'rule',name:'invalid_double_type_comments'}
]},{items:[{type:'TYPE_COMMENT'}
]}]},invalid_arguments:
{choices:[{items:[{type:'rule',name:'args',alias:'a'},{type:'string',value:','},{type:'string',value:'*'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "iterable argument unpacking follows keyword argument unpacking")'},{items:[{type:'rule',name:'expression',alias:'a'},{type:'rule',name:'for_if_clauses',alias:'b'},{type:'string',value:','},{choices:[{items:[{type:'rule',name:'args'}
]}],repeat:'?'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_RANGE(a, $B._PyPegen.get_last_comprehension_item(PyPegen_last_item(b, $B.ast.comprehension)), "Generator expression must be parenthesized")'},{items:[{type:'NAME',alias:'a'},{type:'string',value:'=',alias:'b'},{type:'rule',name:'expression'},{type:'rule',name:'for_if_clauses'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_RANGE(a, b, "invalid syntax. Maybe you meant \'==\' or \':=\' instead of \'=\'?")'},{items:[{type:'rule',name:'args',alias:'a'},{type:'rule',name:'for_if_clauses',alias:'b'}
],action:'$B._PyPegen.nonparen_genexp_in_call(p, a, b)'},{items:[{type:'rule',name:'args'},{type:'string',value:','},{type:'rule',name:'expression',alias:'a'},{type:'rule',name:'for_if_clauses',alias:'b'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_RANGE(a, $B._PyPegen.get_last_comprehension_item(PyPegen_last_item(b, $B.ast.comprehension)), "Generator expression must be parenthesized")'},{items:[{type:'rule',name:'args',alias:'a'},{type:'string',value:','},{type:'rule',name:'args'}
],action:'$B._PyPegen.arguments_parsing_error(p, a)'}]},invalid_kwarg:
{choices:[{items:[{choices:[{items:[{type:'string',value:'True'}
]},{items:[{type:'string',value:'False'}
]},{items:[{type:'string',value:'None'}
]}],alias:'a'},{type:'string',value:'=',alias:'b'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_RANGE(a, b, "cannot assign to %s", PyBytes_AS_STRING(a.bytes))'},{items:[{type:'NAME',alias:'a'},{type:'string',value:'=',alias:'b'},{type:'rule',name:'expression'},{type:'rule',name:'for_if_clauses'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_RANGE(a, b, "invalid syntax. Maybe you meant \'==\' or \':=\' instead of \'=\'?")'},{items:[{items:[{type:'NAME'},{type:'string',value:'='}
],lookahead:'negative'},{type:'rule',name:'expression',alias:'a'},{type:'string',value:'=',alias:'b'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_RANGE( a, b, "expression cannot contain assignment, perhaps you meant \"==\"?")'}]},expression_without_invalid:
{choices:[{items:[{type:'rule',name:'disjunction',alias:'a'},{type:'string',value:'if'},{type:'rule',name:'disjunction',alias:'b'},{type:'string',value:'else'},{type:'rule',name:'expression',alias:'c'}
],action:'$B._PyAST.IfExp(b, a, c, EXTRA)'},{items:[{type:'rule',name:'disjunction'}
]},{items:[{type:'rule',name:'lambdef'}
]}]},invalid_legacy_expression:
{items:[{type:'NAME',alias:'a'},{type:'string',value:'(',lookahead:'negative'},{type:'rule',name:'star_expressions',alias:'b'}
],action:'$B._PyPegen.check_legacy_stmt(p, a) ? RAISE_SYNTAX_ERROR_KNOWN_RANGE(a, b, "Missing parentheses in call to \'%U\'. Did you mean %U(...)?", a.id, a.id) : NULL'},invalid_expression:
{choices:[{items:[{choices:[{items:[{type:'NAME'},{type:'STRING'}
]},{items:[{type:'SOFT_KEYWORD'}
]}],lookahead:'negative'},{type:'rule',name:'disjunction',alias:'a'},{type:'rule',name:'expression_without_invalid',alias:'b'}
],action:'$B._PyPegen.check_legacy_stmt(p, a) ? NULL : p.tokens[p.mark-1].level == 0 ? NULL : RAISE_SYNTAX_ERROR_KNOWN_RANGE(a, b, "invalid syntax. Perhaps you forgot a comma?")'},{items:[{type:'rule',name:'disjunction',alias:'a'},{type:'string',value:'if'},{type:'rule',name:'disjunction',alias:'b'},{choices:[{items:[{type:'string',value:'else'}
]},{items:[{type:'string',value:':'}
]}],lookahead:'negative'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_RANGE(a, b, "expected \'else\' after \'if\' expression")'}]},invalid_named_expression:
{choices:[{items:[{type:'rule',name:'expression',alias:'a'},{type:'string',value:':='},{type:'rule',name:'expression'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION( a, "cannot use assignment expressions with %s", $B._PyPegen.get_expr_name(a))'},{items:[{type:'NAME',alias:'a'},{type:'string',value:'='},{type:'rule',name:'bitwise_or',alias:'b'},{choices:[{items:[{type:'string',value:'='}
]},{items:[{type:'string',value:':='}
]}],lookahead:'negative'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_RANGE(a, b, "invalid syntax. Maybe you meant \'==\' or \':=\' instead of \'=\'?")'},{items:[{choices:[{items:[{type:'rule',name:'list'}
]},{items:[{type:'rule',name:'tuple'}
]},{items:[{type:'rule',name:'genexp'}
]},{items:[{type:'string',value:'True'}
]},{items:[{type:'string',value:'None'}
]},{items:[{type:'string',value:'False'}
]}],lookahead:'negative'},{type:'rule',name:'bitwise_or',alias:'a'},{type:'string',value:'=',alias:'b'},{type:'rule',name:'bitwise_or'},{choices:[{items:[{type:'string',value:'='}
]},{items:[{type:'string',value:':='}
]}],lookahead:'negative'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "cannot assign to %s here. Maybe you meant \'==\' instead of \'=\'?", $B._PyPegen.get_expr_name(a))'}]},invalid_assignment:
{choices:[{items:[{type:'rule',name:'invalid_ann_assign_target',alias:'a'},{type:'string',value:':'},{type:'rule',name:'expression'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION( a, "only single target (not %s) can be annotated", $B._PyPegen.get_expr_name(a) )'},{items:[{type:'rule',name:'star_named_expression',alias:'a'},{type:'string',value:','},{type:'rule',name:'star_named_expressions',repeat:'*'},{type:'string',value:':'},{type:'rule',name:'expression'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "only single target (not tuple) can be annotated")'},{items:[{type:'rule',name:'expression',alias:'a'},{type:'string',value:':'},{type:'rule',name:'expression'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "illegal target for annotation")'},{items:[{items:[{type:'rule',name:'star_targets'},{type:'string',value:'='}
],repeat:'*'},{type:'rule',name:'star_expressions',alias:'a'},{type:'string',value:'='}
],action:'RAISE_SYNTAX_ERROR_INVALID_TARGET(STAR_TARGETS, a)'},{items:[{items:[{type:'rule',name:'star_targets'},{type:'string',value:'='}
],repeat:'*'},{type:'rule',name:'yield_expr',alias:'a'},{type:'string',value:'='}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "assignment to yield expression not possible")'},{items:[{type:'rule',name:'star_expressions',alias:'a'},{type:'rule',name:'augassign'},{choices:[{items:[{type:'rule',name:'yield_expr'}
]},{items:[{type:'rule',name:'star_expressions'}
]}]}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION( a, "\'%s\' is an illegal expression for augmented assignment", $B._PyPegen.get_expr_name(a) )'}]},invalid_ann_assign_target:
{choices:[{items:[{type:'rule',name:'list'}
]},{items:[{type:'rule',name:'tuple'}
]},{items:[{type:'string',value:'('},{type:'rule',name:'invalid_ann_assign_target',alias:'a'},{type:'string',value:')'}
],action:'a'}]},invalid_del_stmt:
{items:[{type:'string',value:'del'},{type:'rule',name:'star_expressions',alias:'a'}
],action:'RAISE_SYNTAX_ERROR_INVALID_TARGET(DEL_TARGETS, a)'},invalid_block:
{items:[{type:'NEWLINE'},{type:'INDENT',lookahead:'negative'}
],action:'RAISE_INDENTATION_ERROR("expected an indented block")'},invalid_comprehension:
{choices:[{items:[{choices:[{items:[{type:'string',value:'['}
]},{items:[{type:'string',value:'('}
]},{items:[{type:'string',value:'{'}
]}]},{type:'rule',name:'starred_expression',alias:'a'},{type:'rule',name:'for_if_clauses'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "iterable unpacking cannot be used in comprehension")'},{items:[{choices:[{items:[{type:'string',value:'['}
]},{items:[{type:'string',value:'{'}
]}]},{type:'rule',name:'star_named_expression',alias:'a'},{type:'string',value:','},{type:'rule',name:'star_named_expressions',alias:'b'},{type:'rule',name:'for_if_clauses'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_RANGE(a, PyPegen_last_item(b, $B.ast.expr), "did you forget parentheses around the comprehension target?")'},{items:[{choices:[{items:[{type:'string',value:'['}
]},{items:[{type:'string',value:'{'}
]}]},{type:'rule',name:'star_named_expression',alias:'a'},{type:'string',value:',',alias:'b'},{type:'rule',name:'for_if_clauses'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_RANGE(a, b, "did you forget parentheses around the comprehension target?")'}]},invalid_dict_comprehension:
{items:[{type:'string',value:'{'},{type:'string',value:'**',alias:'a'},{type:'rule',name:'bitwise_or'},{type:'rule',name:'for_if_clauses'},{type:'string',value:'}'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "dict unpacking cannot be used in dict comprehension")'},invalid_parameters:
{choices:[{items:[{type:'rule',name:'param_no_default',repeat:'*'},{type:'rule',name:'invalid_parameters_helper'},{type:'rule',name:'param_no_default',alias:'a'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "non-default argument follows default argument")'},{items:[{type:'rule',name:'param_no_default',repeat:'*'},{type:'string',value:'(',alias:'a'},{type:'rule',name:'param_no_default',repeat:'+'},{type:'string',value:',',repeat:'?'},{type:'string',value:')',alias:'b'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_RANGE(a, b, "Function parameters cannot be parenthesized")'},{items:[{type:'string',value:'/',alias:'a'},{type:'string',value:','}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "at least one argument must precede /")'},{items:[{choices:[{items:[{type:'rule',name:'slash_no_default'}
]},{items:[{type:'rule',name:'slash_with_default'}
]}]},{type:'rule',name:'param_maybe_default',repeat:'*'},{type:'string',value:'/',alias:'a'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "/ may appear only once")'},{items:[{choices:[{items:[{type:'rule',name:'slash_no_default'}
]},{items:[{type:'rule',name:'slash_with_default'}
]}],repeat:'?'},{type:'rule',name:'param_maybe_default',repeat:'*'},{type:'string',value:'*'},{choices:[{items:[{type:'string',value:','}
]},{items:[{type:'rule',name:'param_no_default'}
]}]},{type:'rule',name:'param_maybe_default',repeat:'*'},{type:'string',value:'/',alias:'a'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "/ must be ahead of *")'},{items:[{type:'rule',name:'param_maybe_default',repeat:'+'},{type:'string',value:'/'},{type:'string',value:'*',alias:'a'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "expected comma between / and *")'}]},invalid_default:
{items:[{type:'string',value:'=',alias:'a'},{choices:[{items:[{type:'string',value:')'}
]},{items:[{type:'string',value:','}
]}],lookahead:'positive'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "expected default value expression")'},invalid_star_etc:
{choices:[{items:[{type:'string',value:'*',alias:'a'},{choices:[{items:[{type:'string',value:')'}
]},{items:[{type:'string',value:','},{choices:[{items:[{type:'string',value:')'}
]},{items:[{type:'string',value:'**'}
]}]}
]}]}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "named arguments must follow bare *")'},{items:[{type:'string',value:'*'},{type:'string',value:','},{type:'TYPE_COMMENT'}
],action:'RAISE_SYNTAX_ERROR("bare * has associated type comment")'},{items:[{type:'string',value:'*'},{type:'rule',name:'param'},{type:'string',value:'=',alias:'a'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "var-positional argument cannot have default value")'},{items:[{type:'string',value:'*'},{choices:[{items:[{type:'rule',name:'param_no_default'}
]},{items:[{type:'string',value:','}
]}]},{type:'rule',name:'param_maybe_default',repeat:'*'},{type:'string',value:'*',alias:'a'},{choices:[{items:[{type:'rule',name:'param_no_default'}
]},{items:[{type:'string',value:','}
]}]}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "* argument may appear only once")'}]},invalid_kwds:
{choices:[{items:[{type:'string',value:'**'},{type:'rule',name:'param'},{type:'string',value:'=',alias:'a'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "var-keyword argument cannot have default value")'},{items:[{type:'string',value:'**'},{type:'rule',name:'param'},{type:'string',value:','},{type:'rule',name:'param',alias:'a'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "arguments cannot follow var-keyword argument")'},{items:[{type:'string',value:'**'},{type:'rule',name:'param'},{type:'string',value:','},{choices:[{items:[{type:'string',value:'*'}
]},{items:[{type:'string',value:'**'}
]},{items:[{type:'string',value:'/'}
]}],alias:'a'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "arguments cannot follow var-keyword argument")'}]},invalid_parameters_helper:
{choices:[{items:[{type:'rule',name:'slash_with_default',alias:'a'}
],action:'$B._PyPegen.singleton_seq(p, a)'},{items:[{type:'rule',name:'param_with_default',repeat:'+'}
]}]},invalid_lambda_parameters:
{choices:[{items:[{type:'rule',name:'lambda_param_no_default',repeat:'*'},{type:'rule',name:'invalid_lambda_parameters_helper'},{type:'rule',name:'lambda_param_no_default',alias:'a'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "non-default argument follows default argument")'},{items:[{type:'rule',name:'lambda_param_no_default',repeat:'*'},{type:'string',value:'(',alias:'a'},{type:'rule',name:'lambda_param',join:',',repeat:'+'},{type:'string',value:',',repeat:'?'},{type:'string',value:')',alias:'b'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_RANGE(a, b, "Lambda expression parameters cannot be parenthesized")'},{items:[{type:'string',value:'/',alias:'a'},{type:'string',value:','}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "at least one argument must precede /")'},{items:[{choices:[{items:[{type:'rule',name:'lambda_slash_no_default'}
]},{items:[{type:'rule',name:'lambda_slash_with_default'}
]}]},{type:'rule',name:'lambda_param_maybe_default',repeat:'*'},{type:'string',value:'/',alias:'a'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "/ may appear only once")'},{items:[{choices:[{items:[{type:'rule',name:'lambda_slash_no_default'}
]},{items:[{type:'rule',name:'lambda_slash_with_default'}
]}],repeat:'?'},{type:'rule',name:'lambda_param_maybe_default',repeat:'*'},{type:'string',value:'*'},{choices:[{items:[{type:'string',value:','}
]},{items:[{type:'rule',name:'lambda_param_no_default'}
]}]},{type:'rule',name:'lambda_param_maybe_default',repeat:'*'},{type:'string',value:'/',alias:'a'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "/ must be ahead of *")'},{items:[{type:'rule',name:'lambda_param_maybe_default',repeat:'+'},{type:'string',value:'/'},{type:'string',value:'*',alias:'a'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "expected comma between / and *")'}]},invalid_lambda_parameters_helper:
{choices:[{items:[{type:'rule',name:'lambda_slash_with_default',alias:'a'}
],action:'$B._PyPegen.singleton_seq(p, a)'},{items:[{type:'rule',name:'lambda_param_with_default',repeat:'+'}
]}]},invalid_lambda_star_etc:
{choices:[{items:[{type:'string',value:'*'},{choices:[{items:[{type:'string',value:':'}
]},{items:[{type:'string',value:','},{choices:[{items:[{type:'string',value:':'}
]},{items:[{type:'string',value:'**'}
]}]}
]}]}
],action:'RAISE_SYNTAX_ERROR("named arguments must follow bare *")'},{items:[{type:'string',value:'*'},{type:'rule',name:'lambda_param'},{type:'string',value:'=',alias:'a'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "var-positional argument cannot have default value")'},{items:[{type:'string',value:'*'},{choices:[{items:[{type:'rule',name:'lambda_param_no_default'}
]},{items:[{type:'string',value:','}
]}]},{type:'rule',name:'lambda_param_maybe_default',repeat:'*'},{type:'string',value:'*',alias:'a'},{choices:[{items:[{type:'rule',name:'lambda_param_no_default'}
]},{items:[{type:'string',value:','}
]}]}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "* argument may appear only once")'}]},invalid_lambda_kwds:
{choices:[{items:[{type:'string',value:'**'},{type:'rule',name:'lambda_param'},{type:'string',value:'=',alias:'a'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "var-keyword argument cannot have default value")'},{items:[{type:'string',value:'**'},{type:'rule',name:'lambda_param'},{type:'string',value:','},{type:'rule',name:'lambda_param',alias:'a'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "arguments cannot follow var-keyword argument")'},{items:[{type:'string',value:'**'},{type:'rule',name:'lambda_param'},{type:'string',value:','},{choices:[{items:[{type:'string',value:'*'}
]},{items:[{type:'string',value:'**'}
]},{items:[{type:'string',value:'/'}
]}],alias:'a'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "arguments cannot follow var-keyword argument")'}]},invalid_double_type_comments:
{items:[{type:'TYPE_COMMENT'},{type:'NEWLINE'},{type:'TYPE_COMMENT'},{type:'NEWLINE'},{type:'INDENT'}
],action:'RAISE_SYNTAX_ERROR("Cannot have two type comments on def")'},invalid_with_item:
{items:[{type:'rule',name:'expression'},{type:'string',value:'as'},{type:'rule',name:'expression',alias:'a'},{choices:[{items:[{type:'string',value:','}
]},{items:[{type:'string',value:')'}
]},{items:[{type:'string',value:':'}
]}],lookahead:'positive'}
],action:'RAISE_SYNTAX_ERROR_INVALID_TARGET(STAR_TARGETS, a)'},invalid_for_target:
{items:[{type:'ASYNC',repeat:'?'},{type:'string',value:'for'},{type:'rule',name:'star_expressions',alias:'a'}
],action:'RAISE_SYNTAX_ERROR_INVALID_TARGET(FOR_TARGETS, a)'},invalid_group:
{choices:[{items:[{type:'string',value:'('},{type:'rule',name:'starred_expression',alias:'a'},{type:'string',value:')'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "cannot use starred expression here")'},{items:[{type:'string',value:'('},{type:'string',value:'**',alias:'a'},{type:'rule',name:'expression'},{type:'string',value:')'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "cannot use double starred expression here")'}]},invalid_import_from_targets:
{items:[{type:'rule',name:'import_from_as_names'},{type:'string',value:','},{type:'NEWLINE'}
],action:'RAISE_SYNTAX_ERROR("trailing comma not allowed without surrounding parentheses")'},invalid_with_stmt:
{choices:[{items:[{items:[{type:'ASYNC'}
],repeat:'?'},{type:'string',value:'with'},{items:[{type:'rule',name:'expression'},{items:[{type:'string',value:'as'},{type:'rule',name:'star_target'}
],repeat:'?'}
],join:',',repeat:'+'},{type:'string',value:':'}
]},{items:[{items:[{type:'ASYNC'}
],repeat:'?'},{type:'string',value:'with'},{type:'string',value:'('},{items:[{type:'rule',name:'expressions'},{items:[{type:'string',value:'as'},{type:'rule',name:'star_target'}
],repeat:'?'}
],join:',',repeat:'+'},{type:'string',value:',',repeat:'?'},{type:'string',value:')'},{type:'string',value:':'}
]}]},invalid_with_stmt_indent:
{choices:[{items:[{items:[{type:'ASYNC'}
],repeat:'?'},{type:'string',value:'with',alias:'a'},{items:[{type:'rule',name:'expression'},{items:[{type:'string',value:'as'},{type:'rule',name:'star_target'}
],repeat:'?'}
],join:',',repeat:'+'},{type:'string',value:':'},{type:'NEWLINE'},{type:'INDENT',lookahead:'negative'}
],action:'RAISE_INDENTATION_ERROR("expected an indented block after \'with\' statement on line %d", a.lineno)'},{items:[{items:[{type:'ASYNC'}
],repeat:'?'},{type:'string',value:'with',alias:'a'},{type:'string',value:'('},{items:[{type:'rule',name:'expressions'},{items:[{type:'string',value:'as'},{type:'rule',name:'star_target'}
],repeat:'?'}
],join:',',repeat:'+'},{type:'string',value:',',repeat:'?'},{type:'string',value:')'},{type:'string',value:':'},{type:'NEWLINE'},{type:'INDENT',lookahead:'negative'}
],action:'RAISE_INDENTATION_ERROR("expected an indented block after \'with\' statement on line %d", a.lineno)'}]},invalid_try_stmt:
{choices:[{items:[{type:'string',value:'try',alias:'a'},{type:'string',value:':'},{type:'NEWLINE'},{type:'INDENT',lookahead:'negative'}
],action:'RAISE_INDENTATION_ERROR("expected an indented block after \'try\' statement on line %d", a.lineno)'},{items:[{type:'string',value:'try'},{type:'string',value:':'},{type:'rule',name:'block'},{choices:[{items:[{type:'string',value:'except'}
]},{items:[{type:'string',value:'finally'}
]}],lookahead:'negative'}
],action:'RAISE_SYNTAX_ERROR("expected \'except\' or \'finally\' block")'},{items:[{type:'string',value:'try'},{type:'string',value:':'},{type:'rule',name:'block',repeat:'*'},{choices:[{items:[{items:[{type:'rule',name:'except_block',repeat:'+'},{type:'rule',name:'except_star_block'}
]}
]},{items:[{items:[{type:'rule',name:'except_star_block',repeat:'+'},{type:'rule',name:'except_block'}
]}
]}]},{type:'rule',name:'block',repeat:'*'}
],action:'RAISE_SYNTAX_ERROR("cannot have both \'except\' and \'except\' on the same \'try\'")'}]},invalid_except_stmt:
{choices:[{items:[{type:'string',value:'except'},{type:'string',value:'*',repeat:'?'},{type:'rule',name:'expression',alias:'a'},{type:'string',value:','},{type:'rule',name:'expressions'},{items:[{type:'string',value:'as'},{type:'NAME'}
],repeat:'?'},{type:'string',value:':'}
],action:'RAISE_SYNTAX_ERROR_STARTING_FROM(a, "multiple exception types must be parenthesized")'},{items:[{type:'string',value:'except',alias:'a'},{type:'string',value:'*',repeat:'?'},{type:'rule',name:'expression'},{items:[{type:'string',value:'as'},{type:'NAME'}
],repeat:'?'},{type:'NEWLINE'}
],action:'RAISE_SYNTAX_ERROR("expected \':\'")'},{items:[{type:'string',value:'except',alias:'a'},{type:'NEWLINE'}
],action:'RAISE_SYNTAX_ERROR("expected \':\'")'},{items:[{type:'string',value:'except',alias:'a'},{type:'string',value:'*'},{choices:[{items:[{type:'NEWLINE'}
]},{items:[{type:'string',value:':'}
]}]}
],action:'RAISE_SYNTAX_ERROR("expected one or more exception types")'}]},invalid_finally_stmt:
{items:[{type:'string',value:'finally',alias:'a'},{type:'string',value:':'},{type:'NEWLINE'},{type:'INDENT',lookahead:'negative'}
],action:'RAISE_INDENTATION_ERROR("expected an indented block after \'finally\' statement on line %d", a.lineno)'},invalid_except_stmt_indent:
{choices:[{items:[{type:'string',value:'except',alias:'a'},{type:'rule',name:'expression'},{items:[{type:'string',value:'as'},{type:'NAME'}
],repeat:'?'},{type:'string',value:':'},{type:'NEWLINE'},{type:'INDENT',lookahead:'negative'}
],action:'RAISE_INDENTATION_ERROR("expected an indented block after \'except\' statement on line %d", a.lineno)'},{items:[{type:'string',value:'except',alias:'a'},{type:'string',value:':'},{type:'NEWLINE'},{type:'INDENT',lookahead:'negative'}
],action:'RAISE_INDENTATION_ERROR("expected an indented block after \'except\' statement on line %d", a.lineno)'}]},invalid_except_star_stmt_indent:
{items:[{type:'string',value:'except',alias:'a'},{type:'string',value:'*'},{type:'rule',name:'expression'},{items:[{type:'string',value:'as'},{type:'NAME'}
],repeat:'?'},{type:'string',value:':'},{type:'NEWLINE'},{type:'INDENT',lookahead:'negative'}
],action:'RAISE_INDENTATION_ERROR("expected an indented block after \'except\' statement on line %d", a.lineno)'},invalid_match_stmt:
{choices:[{items:[{type:'string',value:'match'},{type:'rule',name:'subject_expr'},{type:'string',value:':',lookahead:'negative'}
],action:'CHECK_VERSION(void, 10, "Pattern matching is", RAISE_SYNTAX_ERROR("expected \':\'") )'},{items:[{type:'string',value:'match',alias:'a'},{type:'rule',name:'subject_expr',alias:'subject'},{type:'string',value:':'},{type:'NEWLINE'},{type:'INDENT',lookahead:'negative'}
],action:'RAISE_INDENTATION_ERROR("expected an indented block after \'match\' statement on line %d", a.lineno)'}]},invalid_case_block:
{choices:[{items:[{type:'string',value:'case'},{type:'rule',name:'patterns'},{type:'rule',name:'guard',repeat:'?'},{type:'string',value:':',lookahead:'negative'}
],action:'RAISE_SYNTAX_ERROR("expected \':\'")'},{items:[{type:'string',value:'case',alias:'a'},{type:'rule',name:'patterns'},{type:'rule',name:'guard',repeat:'?'},{type:'string',value:':'},{type:'NEWLINE'},{type:'INDENT',lookahead:'negative'}
],action:'RAISE_INDENTATION_ERROR("expected an indented block after \'case\' statement on line %d", a.lineno)'}]},invalid_as_pattern:
{choices:[{items:[{type:'rule',name:'or_pattern'},{type:'string',value:'as'},{type:'string',value:'_',alias:'a'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "cannot use \'_\' as a target")'},{items:[{type:'rule',name:'or_pattern'},{type:'string',value:'as'},{type:'NAME',lookahead:'negative'},{type:'rule',name:'expression',alias:'a'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "invalid pattern target")'}]},invalid_class_pattern:
{items:[{type:'rule',name:'name_or_attr'},{type:'string',value:'('},{type:'rule',name:'invalid_class_argument_pattern',alias:'a'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_RANGE( PyPegen_first_item(a, $B.ast.pattern), PyPegen_last_item(a, $B.ast.pattern), "positional patterns follow keyword patterns")'},invalid_class_argument_pattern:
{items:[{items:[{type:'rule',name:'positional_patterns'},{type:'string',value:','}
],repeat:'?'},{type:'rule',name:'keyword_patterns'},{type:'string',value:','},{type:'rule',name:'positional_patterns',alias:'a'}
],action:'a'},invalid_if_stmt:
{choices:[{items:[{type:'string',value:'if'},{type:'rule',name:'named_expression'},{type:'NEWLINE'}
],action:'RAISE_SYNTAX_ERROR("expected \':\'")'},{items:[{type:'string',value:'if',alias:'a'},{type:'rule',name:'named_expression',alias:'a'},{type:'string',value:':'},{type:'NEWLINE'},{type:'INDENT',lookahead:'negative'}
],action:'RAISE_INDENTATION_ERROR("expected an indented block after \'if\' statement on line %d", a.lineno)'}]},invalid_elif_stmt:
{choices:[{items:[{type:'string',value:'elif'},{type:'rule',name:'named_expression'},{type:'NEWLINE'}
],action:'RAISE_SYNTAX_ERROR("expected \':\'")'},{items:[{type:'string',value:'elif',alias:'a'},{type:'rule',name:'named_expression'},{type:'string',value:':'},{type:'NEWLINE'},{type:'INDENT',lookahead:'negative'}
],action:'RAISE_INDENTATION_ERROR("expected an indented block after \'elif\' statement on line %d", a.lineno)'}]},invalid_else_stmt:
{items:[{type:'string',value:'else',alias:'a'},{type:'string',value:':'},{type:'NEWLINE'},{type:'INDENT',lookahead:'negative'}
],action:'RAISE_INDENTATION_ERROR("expected an indented block after \'else\' statement on line %d", a.lineno)'},invalid_while_stmt:
{choices:[{items:[{type:'string',value:'while'},{type:'rule',name:'named_expression'},{type:'NEWLINE'}
],action:'RAISE_SYNTAX_ERROR("expected \':\'")'},{items:[{type:'string',value:'while',alias:'a'},{type:'rule',name:'named_expression'},{type:'string',value:':'},{type:'NEWLINE'},{type:'INDENT',lookahead:'negative'}
],action:'RAISE_INDENTATION_ERROR("expected an indented block after \'while\' statement on line %d", a.lineno)'}]},invalid_for_stmt:
{items:[{items:[{type:'ASYNC'}
],repeat:'?'},{type:'string',value:'for',alias:'a'},{type:'rule',name:'star_targets'},{type:'string',value:'in'},{type:'rule',name:'star_expressions'},{type:'string',value:':'},{type:'NEWLINE'},{type:'INDENT',lookahead:'negative'}
],action:'RAISE_INDENTATION_ERROR("expected an indented block after \'for\' statement on line %d", a.lineno)'},invalid_def_raw:
{items:[{items:[{type:'ASYNC'}
],repeat:'?'},{type:'string',value:'def',alias:'a'},{type:'NAME'},{type:'string',value:'('},{items:[{type:'rule',name:'params'}
],repeat:'?'},{type:'string',value:')'},{items:[{type:'string',value:'->'},{type:'rule',name:'expression'}
],repeat:'?'},{type:'string',value:':'},{type:'NEWLINE'},{type:'INDENT',lookahead:'negative'}
],action:'RAISE_INDENTATION_ERROR("expected an indented block after function definition on line %d", a.lineno)'},invalid_class_def_raw:
{items:[{type:'string',value:'class',alias:'a'},{type:'NAME'},{items:[{type:'string',value:'('},{items:[{type:'rule',name:'arguments'}
],repeat:'?'},{type:'string',value:')'}
],repeat:'?'},{type:'string',value:':'},{type:'NEWLINE'},{type:'INDENT',lookahead:'negative'}
],action:'RAISE_INDENTATION_ERROR("expected an indented block after class definition on line %d", a.lineno)'},invalid_double_starred_kvpairs:
{choices:[{items:[{type:'rule',name:'double_starred_kvpair',join:',',repeat:'+'},{type:'string',value:','},{type:'rule',name:'invalid_kvpair'}
]},{items:[{type:'rule',name:'expression'},{type:'string',value:':'},{type:'string',value:'*',alias:'a'},{type:'rule',name:'bitwise_or'}
],action:'RAISE_SYNTAX_ERROR_STARTING_FROM(a, "cannot use a starred expression in a dictionary value")'},{items:[{type:'rule',name:'expression'},{type:'string',value:':',alias:'a'},{choices:[{items:[{type:'string',value:'}'}
]},{items:[{type:'string',value:','}
]}],lookahead:'positive'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "expression expected after dictionary key and \':\'")'}]},invalid_kvpair:
{choices:[{items:[{type:'rule',name:'expression',alias:'a'},{items:[{type:'string',value:':'}
],lookahead:'negative'}
],action:'RAISE_ERROR_KNOWN_LOCATION(p, PyExc_SyntaxError, a.lineno, a.end_col_offset - 1, a.end_lineno, -1, "\':\' expected after dictionary key")'},{items:[{type:'rule',name:'expression'},{type:'string',value:':'},{type:'string',value:'*',alias:'a'},{type:'rule',name:'bitwise_or'}
],action:'RAISE_SYNTAX_ERROR_STARTING_FROM(a, "cannot use a starred expression in a dictionary value")'},{items:[{type:'rule',name:'expression'},{type:'string',value:':',alias:'a'}
],action:'RAISE_SYNTAX_ERROR_KNOWN_LOCATION(a, "expression expected after dictionary key and \':\'")'}]},}
for(var rule_name in grammar){grammar[rule_name].name=rule_name
if(grammar[rule_name].choices){grammar[rule_name].choices.forEach(function(item,rank){item.parent_rule=rule_name
item.rank=rank})}}})(__BRYTHON__)
;
