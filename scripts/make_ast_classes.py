"""Build src/py_ast.js from the documentation of Python ast module."""

import os
import re
import json

import version
vnum = '.'.join(str(num) for num in version.version[:2])

import urllib.request

ast_url = f"https://raw.githubusercontent.com/python/cpython/{vnum}/Parser/Python.asdl"
f = urllib.request.urlopen(ast_url)


with open('Python.asdl', 'wb') as out:
    out.write(f.read())


f = open('Python.asdl', encoding='utf-8')
type_def = False
ast_types = {}
ast_type = None

for line in f:
    line = line.strip()
    if line.startswith('--'):
        continue
    elif '=' in line:
        if not type_def:
            type_def = True
        elif ast_type and ast_type not in ast_types:
            ast_types[ast_type] = {'options': ast_options}
        parts = [x.strip() for x in line.split('=')]
        ast_type = parts[0]
        ast_options = [x.strip() for x in parts[1].split('|')]
    elif line.startswith('|'):
        ast_options += [x.strip() for x in line[1:].strip().split('|')]
    elif line.startswith('}'):
        ast_types[ast_type] = {'options': ast_options}
        break
    elif type_def:
        if line.startswith('attributes'):
            ast_types[ast_type] = {'options': ast_options,
                'attributes': line[len('attributes'):]}
        else:
            ast_options[-1] += line
    else:
        if type_def:
            ast_types[ast_type] = {'options': ast_options}


def parse_arguments(arg_string):
    args = [x.strip() for x in arg_string.split(',')]
    arg_dict = {}
    for arg in args:
        arg_type, arg_name = arg.split()
        if arg_type[-1] == '*':
            arg_name += '*'
        elif arg_type[-1] == '?':
            arg_name += '?'
        arg_dict[arg_name] = arg_type
    return arg_dict

classes = {}

for ast_type in ast_types:
    names = []
    for option in ast_types[ast_type]['options']:
        if '(' not in option:
            classes[option] = ''
            names.append(option)
        elif option.startswith('('):
            classes[ast_type] = ','.join(parse_arguments(option[1:-1]))
        else:
            mo = re.match(r'(.*)\((.*)\)', option)
            name, arguments = mo.groups()
            names.append(name)
            classes[name] = ','.join(parse_arguments(arguments))
    if names:
        classes[ast_type] = names

keys = sorted(list(classes))

lines = []
for key in keys:
    lines.append(f"{key}:{classes[key]!r}".replace(' ', ''))

code = """
// binary operator tokens
var binary_ops = {
    '+': 'Add', '-': 'Sub', '*': 'Mult', '/': 'Div', '//': 'FloorDiv',
    '%': 'Mod', '**': 'Pow', '<<': 'LShift', '>>': 'RShift', '|': 'BitOr',
    '^': 'BitXor', '&': 'BitAnd', '@': 'MatMult'
    }

// boolean operator tokens
var boolean_ops = {'and': 'And', 'or': 'Or'}

// comparison operator tokens
var comparison_ops = {
    '==': 'Eq', '!=': 'NotEq', '<': 'Lt', '<=': 'LtE', '>': 'Gt', '>=': 'GtE',
    'is': 'Is', 'is_not': 'IsNot', 'in': 'In', 'not_in': 'NotIn'}

var unary_ops = {unary_inv: 'Invert', unary_pos: 'UAdd', unary_neg: 'USub'}

var op_types = $B.op_types = [binary_ops, boolean_ops, comparison_ops, unary_ops]

var _b_ = $B.builtins

var ast = $B.ast = {}

for(var kl in $B.ast_classes){
    var args = $B.ast_classes[kl],
        js = ''
    if(typeof args == "string"){
        js = `ast.${kl} = function(${args.replace(/[*?]/g, '')}){\n`
        if(args.length > 0){
            for(var arg of args.split(',')){
                if(arg.endsWith('*')){
                   arg = arg.substr(0, arg.length - 1)
                   js += ` this.${arg} = ${arg} === undefined ? [] : ${arg}\n`
                }else if(arg.endsWith('?')){
                   arg = arg.substr(0, arg.length - 1)
                   js += ` this.${arg} = ${arg}\n`
                }else{
                    js += ` this.${arg} = ${arg}\n`
                }
            }
        }
        js += '}'
    }else{
        js = `ast.${kl} = [${args.map(x => 'ast.' + x).join(',')}]\n`
    }
    try{
        eval(js)
    }catch(err){
        console.log('error', js)
        throw err
    }
    ast[kl].$name = kl
    if(typeof args == "string"){
        ast[kl]._fields = args.split(',')
    }
}

// Function that creates Python classes for ast classes.
function ast_js_to_py(obj){
    if(obj === undefined){
        return _b_.None
    }else if(Array.isArray(obj)){
        return obj.map(ast_js_to_py)
    }else{
        var class_name = obj.constructor.$name,
            py_class = $B.python_ast_classes[class_name],
            res = {
                __class__: py_class
            }
        if(py_class === undefined){
            return obj
        }
        for(var field of py_class._fields){
            res[field] = ast_js_to_py(obj[field])
        }
        return res
    }
}

$B.create_python_ast_classes = function(){
    if($B.python_ast_classes){
        return
    }
    $B.python_ast_classes = {}
    for(var klass in $B.ast_classes){
        $B.python_ast_classes[klass] = (function(kl){
            var _fields,
                raw_fields
            if(typeof $B.ast_classes[kl] == "string"){
                if($B.ast_classes[kl] == ''){
                    _fields = []
                }else{
                    var raw_fields = $B.ast_classes[kl].split(',')
                    _fields = raw_fields.map(x =>
                        (x.endsWith('*') || x.endsWith('?')) ?
                        x.substr(0, x.length - 1) : x)
                }
            }
            var cls = $B.make_class(kl, ast_js_to_py)
            if(_fields){
                cls._fields = _fields
            }
            if(raw_fields){
                for(var field of raw_fields){
                    if(field.endsWith('?')){
                        cls[field.substr(0, field.length - 1)] = _b_.None
                    }
                }
            }
            cls.__mro__ = [$B.AST, _b_.object]
            return cls
        })(klass)
    }
}

// Map operators to ast type (BinOp, etc.) and name (Add, etc.)
var op2ast_class = $B.op2ast_class = {},
    ast_types = [ast.BinOp, ast.BoolOp, ast.Compare, ast.UnaryOp]
for(var i = 0; i < 4; i++){
    for(var op in op_types[i]){
        op2ast_class[op] = [ast_types[i], ast[op_types[i][op]]]
    }
}

"""

dest_dir = os.path.join(os.path.dirname(os.getcwd()), "www", "src")
with open(os.path.join(dest_dir, 'py_ast.js'), 'w', encoding='utf-8') as out:
    out.write(";(function($B){\n")
    out.write('$B.ast_classes = {\n' + ',\n'.join(lines) + '\n}\n')
    out.write(code)
    out.write('})(__BRYTHON__)\n')
