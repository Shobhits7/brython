;(function($B){

var _b_ = $B.builtins

// generic code for class constructor
$B.$class_constructor = function(class_name, class_obj, bases,
        parents_names, kwargs){
    bases = bases || []
    var metaclass

    var module = class_obj.__module__
    if(module === undefined){
        // Get module of current frame
        module = class_obj.__module__ = $B.last($B.frames_stack)[2]
    }

    // check if parents are defined
    for(var i = 0; i < bases.length; i++){
        if(bases[i] === undefined){
            // restore the line of class definition
            $B.line_info = class_obj.$def_line
            throw $B.name_error(parents_names[i])
        }
    }

    // Keyword arguments passed to the class
    var extra_kwargs = {},
        prepare_kwargs = {} // used by __prepare__, includes the metaclass
    if(kwargs){
        for(var  i = 0; i < kwargs.length; i++){
            var key = kwargs[i][0],
                val = kwargs[i][1]
            if(key == "metaclass"){
                // special case for metaclass
                metaclass = val
            }else{
                // other keyword arguments will be passed to __init_subclass__
                extra_kwargs[key] = val
            }
            prepare_kwargs[key] = val
        }
    }

    var mro0 = class_obj

    // A class that overrides __eq__() and does not define __hash__()
    // will have its __hash__() implicitly set to None
    if(class_obj.__eq__ !== undefined && class_obj.__hash__ === undefined){
        class_obj.__hash__ = _b_.None
    }

    // Replace non-class bases that have a __mro_entries__ (PEP 560)
    var orig_bases = bases.slice(),
        use_mro_entries = false
    for(var i = 0; i < bases.length; i++){
        if(bases[i] === undefined ||
                (bases[i].__mro__ === undefined)){
            var mro_entries = $B.$getattr(bases[i], "__mro_entries__",
                _b_.None)
            if(mro_entries !== _b_.None){
                var entries = _b_.list.$factory(mro_entries(bases))
                bases.splice(i, 1, ...entries)
                use_mro_entries = true
                i--
                continue
            }
        }
    }

    // If the metaclass is not explicitely set by passing the keyword
    // argument "metaclass" in the class definition:
    // - if the class has parents, inherit the class of the first parent
    // - otherwise default to type
    if(metaclass === undefined){
        metaclass = meta_from_bases(class_name, module, bases)
    }
    // Use __prepare__ (PEP 3115)
    var prepare = $B.$getattr(metaclass, "__prepare__", _b_.None),
        cl_dict = $B.$call(prepare)(class_name, bases) // dict or dict-like

    if(cl_dict.__class__ !== _b_.dict){
        var set_class_item = $B.$getattr(cl_dict, "__setitem__")
    }else{
        var set_class_item = function(attr, value){
            cl_dict.$string_dict[attr] = [value, cl_dict.$order++]
        }
    }

    // Transform class object into a dictionary
    for(var attr in class_obj){
        if(attr == "__annotations__"){
            if(cl_dict.$string_dict[attr] === undefined){
                cl_dict.$string_dict[attr] = [$B.empty_dict(), cl_dict.$order++]
            }
            for(var key in class_obj[attr].$string_dict){
                $B.$setitem(cl_dict.$string_dict[attr][0], key,
                    class_obj[attr].$string_dict[key][0])
            }
        }else{
            if(attr.charAt(0) != "$"){
                set_class_item(attr, class_obj[attr])
            }
        }
    }

    if(use_mro_entries){
        set_class_item("__orig_bases__", _b_.tuple.$factory(orig_bases))
    }

    // Create the class dictionary
    var class_dict = {
        __bases__: bases,
        __class__: metaclass,
        __dict__: cl_dict
    }
    if(cl_dict.__class__ === _b_.dict){
        for(var key in cl_dict.$string_dict){
            class_dict[key] = cl_dict.$string_dict[key][0]
        }
    }else{
        var get_class_item = $B.$getattr(cl_dict, "__getitem__")
        var it = _b_.iter(cl_dict)
        while(true){
            try{
                var key = _b_.next(it)
                class_dict[key] = get_class_item(key)
            }catch(err){
                break
            }
        }
    }
    class_dict.__mro__ = _b_.type.mro(class_dict).slice(1)


    // Check if at least one method is abstract (cf PEP 3119)
    // If this is the case, the class cannot be instanciated
    var is_instanciable = true,
        non_abstract_methods = {},
        abstract_methods = {},
        mro = [class_dict].concat(class_dict.__mro__)

    for(var i = 0; i < mro.length; i++){
        var kdict = i == 0 ? mro0 : mro[i]
        for(var attr in kdict){
            if(non_abstract_methods[attr]){continue}
            var v = kdict[attr]
            if(typeof v == "function"){
                if(v.__isabstractmethod__ === true ||
                        (v.$attrs && v.$attrs.__isabstractmethod__)){
                    is_instanciable = false
                    abstract_methods[attr] = true
                }else{
                    non_abstract_methods[attr] = true
                }
            }else{
                non_abstract_methods[attr] = true
            }
        }
    }

    // Check if class has __slots__
    var _slots = class_obj.__slots__
    if(_slots !== undefined){
        if(typeof _slots == "string"){
            _slots = [_slots]
        }else{
            _slots = _b_.list.$factory(_slots)
        }
        cl_dict.__slots__ = _slots
    }

    // Check if class has __setattr__ or descriptors
    for(var i = 0; i < mro.length - 1; i++){
        for(var attr in mro[i]){
            if(attr == "__setattr__"){
                cl_dict.$has_setattr = true
                break
            }else if(mro[i][attr]){
                if(mro[i][attr].__get__ || (mro[i][attr].__class__ &&
                        mro[i][attr].__class__.__get__)){ // issue #1204
                    cl_dict.$has_setattr = true
                    break
                }
            }
        }
    }

    // Apply method __new__ of metaclass to create the class object
    var meta_new = _b_.type.__getattribute__(metaclass, "__new__")
    var kls = meta_new(metaclass, class_name, bases, cl_dict,
        {$nat: 'kw', kw: extra_kwargs})
    kls.__module__ = module
    kls.$infos = {
        __module__: module,
        __name__: class_name,
        __qualname__: class_obj.$qualname
    }
    kls.$subclasses = []


    if(kls.__bases__ === undefined || kls.__bases__.length == 0){
        kls.__bases__ = $B.fast_tuple([_b_.object])
    }

    // Set attribute "$class" of functions defined in the class. Used in
    // py_builtin_functions / Function.__setattr__ to reset the function
    // if the attribute __defaults__ is reset.
    for(var attr in class_obj){
        if(attr.charAt(0) != "$"){
            if(typeof class_obj[attr] == "function"){
                class_obj[attr].$infos.$class = kls
            }
        }
    }
    if(kls.__class__ === metaclass){
        // Initialize the class object by a call to metaclass __init__
        var meta_init = _b_.type.__getattribute__(metaclass, "__init__")
        meta_init(kls, class_name, bases, cl_dict)
    }

    // Set new class as subclass of its parents
    for(var i = 0; i < bases.length; i++){
        bases[i].$subclasses  = bases[i].$subclasses || []
        bases[i].$subclasses.push(kls)
    }

    if(!is_instanciable){
        function nofactory(){
            throw _b_.TypeError.$factory("Can't instantiate abstract class " +
                "interface with abstract methods " +
                Object.keys(abstract_methods).join(", "))}
        kls.$factory = nofactory
    }

    kls.__qualname__ = class_name

    return kls
}

function meta_from_bases(class_name, module, bases){
    var metaclass
    if(bases && bases.length > 0){
        metaclass = bases[0].__class__
        if(metaclass === undefined){
            // Might inherit a Javascript constructor
            if(typeof bases[0] == "function"){
                if(bases.length != 1){
                    throw _b_.TypeError.$factory("A Brython class " +
                        "can inherit at most 1 Javascript constructor")
                }
                metaclass = bases[0].__class__ = $B.JSMeta
                $B.set_func_names(bases[0], module)
            }else{
                throw _b_.TypeError.$factory("Argument of " + class_name +
                    "is not a class (type '" + $B.class_name(bases[0]) +
                    "')")
            }
        }
        for(var i = 1; i < bases.length; i++){
            var mc = bases[i].__class__
            if(mc === metaclass || _b_.issubclass(metaclass, mc)){
                // same metaclass or a subclass, do nothing
            }else if(_b_.issubclass(mc, metaclass)){
                metaclass = mc
            }else if(metaclass.__bases__ &&
                    metaclass.__bases__.indexOf(mc) == -1){
                throw _b_.TypeError.$factory("metaclass conflict: the " +
                    "metaclass of a derived class must be a (non-" +
                    "strict) subclass of the metaclasses of all its bases")
            }
        }
    }else{
        metaclass = _b_.type
    }
    return metaclass
}

var type = $B.make_class("type",
    function(obj, bases, cl_dict){
        var len = arguments.length
        if(len == 1){
            if(obj === undefined){
                return $B.UndefinedClass
            }
            return obj.__class__ || $B.get_class(obj)
        }else if(len == 3){
            var module = $B.last($B.frames_stack)[2],
                meta = meta_from_bases(obj, module, bases)
            return type.__new__(meta, obj, bases, cl_dict)
        }else{
            throw _b_.TypeError.$factory('type() takes 1 or 3 arguments')
        }
    }
)

type.__call__ = function(){
    var extra_args = [],
        klass = arguments[0]
    for(var i = 1, len = arguments.length; i < len; i++){
        extra_args.push(arguments[i])
    }
    var new_func = _b_.type.__getattribute__(klass, "__new__")
    
    // create an instance with __new__
    var instance = new_func.apply(null, arguments),
        instance_class = instance.__class__ || $B.get_class(instance)
    if(instance_class === klass){
        // call __init__ with the same parameters
        var init_func = _b_.type.__getattribute__(klass, "__init__")
        if(init_func !== _b_.object.__init__){
            // object.__init__ is not called in this case (it would raise an
            // exception if there are parameters).
            var args = [instance].concat(extra_args)
            init_func.apply(null, args)
        }
    }
    return instance
}

type.__class__ = type

type.__format__ = function(klass, fmt_spec){
    // For classes, format spec is ignored, return str(klass)
    return _b_.str.$factory(klass)
}

type.__getattribute__ = function(klass, attr){
    switch(attr) {
        case "__bases__":
            var res = klass.__bases__ // || _b_.tuple.$factory()
            res.__class__ = _b_.tuple
            if(res.length == 0){
                // res.push(_b_.object)
            }
            return res
        case "__class__":
            return klass.__class__
        case "__doc__":
            return klass.__doc__ || _b_.None
        case "__setattr__":
            if(klass["__setattr__"] !== undefined){
                var func = klass["__setattr__"]
            }else{
                var func = function(obj, key, value){
                    obj[key] = value
                }
            }
            return method_wrapper.$factory(attr, klass, func)
        case "__delattr__":
            if(klass["__delattr__"] !== undefined){
                return klass["__delattr__"]
            }
            return method_wrapper.$factory(attr, klass,
                function(key){delete klass[key]})
    }
    var res = klass[attr]
    var $test = false // attr == "__or__" && klass === _b_.list
    if($test){
        console.log("attr", attr, "of", klass, res, res + "")
    }
    if(res === undefined && klass.__slots__ &&
            klass.__slots__.indexOf(attr) > -1){
        return member_descriptor.$factory(attr, klass)
    }
    if(klass.__class__ &&
            klass.__class__[attr] &&
            klass.__class__[attr].__get__ &&
            klass.__class__[attr].__set__){
        // data descriptor
        if($test){console.log("data descriptor")}
        return klass.__class__[attr].__get__(klass)
    }

    if(res === undefined){
        // search in classes hierarchy, following method resolution order

        var v = klass[attr]
        if(v === undefined){
            var mro = klass.__mro__
            if(mro === undefined){
                console.log("pas de mro pour", klass)
            }
            for(var i = 0; i < mro.length; i++){
                var v = mro[i][attr]
                if(v !== undefined){
                    res = v
                    break
                }
            }
        }else{
            res = v
        }

        if(res === undefined){
            // search in metaclass
            var meta = klass.__class__ || $B.get_class(klass),
                res = meta[attr]
            if($test){console.log("search in meta", meta, res)}
            if(res === undefined){
                var meta_mro = meta.__mro__
                for(var i = 0; i < meta_mro.length; i++){
                    var res = meta_mro[i][attr]
                    if(res !== undefined){break}
                }
            }
            if(res !== undefined){
                if($test){console.log("found in meta", res, typeof res)}
                if(res.__class__ === _b_.property){
                    return res.fget(klass)
                }
                if(typeof res == "function"){
                    // insert klass as first argument
                    var meta_method = res.bind(null, klass)
                    meta_method.__class__ = $B.method
                    meta_method.$infos = {
                        __self__: klass,
                        __func__: res,
                        __name__: attr,
                        __qualname__: klass.$infos.__name__ + "." + attr,
                        __module__: res.$infos ? res.$infos.__module__ : ""
                    }
                    if($test){
                        console.log('return method from meta', meta_method,
                            meta_method + '')
                    }
                    return meta_method
                }
            }
            if(res === undefined){
                // search a method __getattr__ in metaclass
                // (issues #126 and #949)
                var getattr = meta.__getattr__
                if(getattr === undefined){
                    for(var i = 0; i < meta_mro.length; i++){
                        if(meta_mro[i].__getattr__ !== undefined){
                            getattr = meta_mro[i].__getattr__
                            break
                        }
                    }
                }
                if(getattr !== undefined){
                    return getattr(klass, attr)
                }
            }
        }
    }

    if(res !== undefined){
        if($test){console.log("res", res)}
        // If the attribute is a property, return it
        if(res.__class__ === _b_.property){
            return res
        }
        if(res.__get__){
            if(res.__class__ === method){
                var result = res.__get__(res.__func__, klass)
                result.$infos = {
                    __func__: res,
                    __name__: res.$infos.__name__,
                    __qualname__: klass.$infos.__name__ + "." + res.$infos.__name__,
                    __self__: klass
                }
            }else{
                result = res.__get__(klass)
            }
            return result
        }else if(res.__class__ && res.__class__.__get__){
            // issue #1391
            if(!(attr.startsWith("__") && attr.endsWith("__"))){
                return res.__class__.__get__(res, _b_.None, klass)
            }
        }
        if(typeof res == "function"){
            // method
            if(res.$infos === undefined && $B.debug > 1){
                console.log("warning: no attribute $infos for", res,
                    "klass", klass, "attr", attr)
            }
            if($test){console.log("res is function", res)}

            if(attr == "__new__" ||
                    res.__class__ === $B.builtin_function){
                res.$type = "staticmethod"
            }
            if(attr == "__class_getitem__" && res.__class__ !== $B.method){
                res = _b_.classmethod.$factory(res)
            }
            if(attr == "__init_subclass__"){
                res = _b_.classmethod.$factory(res)
            }
            if(res.__class__ === $B.method){
                return res.__get__(null, klass)
            }else{
                if($test){console.log("return res", res)}
                return res
            }
        }else{
            return res
        }

    }
}

type.__hash__ = function(cls){
    return _b_.hash(cls)
}

type.__init__ = function(){
    if(arguments.length == 0){
        throw _b_.TypeError.$factory("descriptor '__init__' of 'type' " +
            "object needs an argument")
    }
}

type.__init_subclass__ = function(){
    // Default implementation only checks that no keyword arguments were passed
    var $ = $B.args("__init_subclass__", 1, {}, [],
        arguments, {}, "args", "kwargs")
    if($.kwargs !== undefined){
        if($.kwargs.__class__ !== _b_.dict ||
                Object.keys($.kwargs.$string_dict).length > 0){
            throw _b_.TypeError.$factory(
                "__init_subclass__() takes no keyword arguments")
        }
    }
    return _b_.None
}

type.__instancecheck__ = function(cls, instance){
    var kl = instance.__class__ || $B.get_class(instance)
    if(kl === cls){return true}
    else{
        for(var i = 0; i < kl.__mro__.length; i++){
            if(kl.__mro__[i] === cls){return true}
        }
    }
    return false
}

type.__instancecheck__.$type = "staticmethod"

// __name__ is a data descriptor
type.__name__ = {
    __get__: function(self){
        return self.$infos.__name__
    },
    __set__: function(self, value){
        self.$infos.__name__ = value
    },
    __str__: function(self){
        return "type"
    },
    __eq__: function(self, other){
        return self.$infos.__name__ == other
    }
}


type.__new__ = function(meta, name, bases, cl_dict, extra_kwargs){
    // Return a new type object. This is essentially a dynamic form of the
    // class statement. The name string is the class name and becomes the
    // __name__ attribute; the bases tuple itemizes the base classes and
    // becomes the __bases__ attribute; and the dict dictionary is the
    // namespace containing definitions for class body and becomes the
    // __dict__ attribute

    // arguments passed as keywords in class defintion
    extra_kwargs = extra_kwargs === undefined ? {$nat: 'kw', kw: {}} :
        extra_kwargs

    // Create the class dictionary
    var module = cl_dict.$string_dict.__module__
    if(module){
        module = module[0]
    }else{
        module = $B.last($B.frames_stack)[2]
    }
    var class_dict = {
        __class__ : meta,
        __bases__ : bases,
        __dict__ : cl_dict,
        $infos:{
            __name__: name,
            __module__: module,
            __qualname__: name
        },
        $is_class: true,
        $has_setattr: cl_dict.$has_setattr
    }

    class_dict.__mro__ = type.mro(class_dict).slice(1)

    // set class attributes for faster lookups
    var items = $B.dict_to_list(cl_dict) // defined in py_dict.js
    for(var i = 0; i < items.length; i++){
        var key = items[i][0],
            v = items[i][1]
        if(key === "__module__"){continue} // already set
        if(v === undefined){continue}
        class_dict[key] = v
        if(v.__class__){
            // cf PEP 487 and issue #1178
            var set_name = $B.$getattr(v.__class__, "__set_name__", _b_.None)
            if(set_name !== _b_.None){
                set_name(v, class_dict, key)
            }
        }
        if(typeof v == "function"){
            if(v.$infos === undefined){
                console.log("type new", v, v + "")
                console.log($B.frames_stack.slice())
            }else{
                v.$infos.$class = class_dict
                v.$infos.__qualname__ = name + '.' + v.$infos.__name__
                if(v.$infos.$defaults){
                    // If the function was set an attribute __defaults__, it is
                    // stored in v.$infos.$defaults (cf. Function.__setattr__ in
                    // py_builtin_functions.js)
                    var $defaults = v.$infos.$defaults
                    $B.Function.__setattr__(v, "__defaults__",
                        $defaults)
                }
            }
        }
    }

    var sup = _b_.super.$factory(class_dict, class_dict)
    var init_subclass = _b_.super.__getattribute__(sup, "__init_subclass__")
    init_subclass(extra_kwargs)

    return class_dict
}

type.__or__ = function(){
    var $ = $B.args('__or__', 2, {cls: null, other: null},  ['cls', 'other'],
                arguments, {}, null, null),
        cls = $.cls,
        other = $.other
    if(other !== _b_.None && ! _b_.isinstance(other, type)){
        return _b_.NotImplemented
    }
    return $B.UnionType.$factory([cls, other])
}

type.__prepare__ = function(){
    return $B.empty_dict()
}

type.__qualname__ = {
    __get__: function(self){
        return self.$infos.__qualname__ || self.$infos.__name__
    },
    __set__: function(self, value){
        self.$infos.__qualname__ = value
    },
    __str__: function(self){
        console.log("type.__qualname__")
    },
    __eq__: function(self, other){
        return self.$infos.__qualname__ == other
    }
}

type.__repr__ = function(kls){
    $B.builtins_repr_check(type, arguments) // in brython_builtins.js
    if(kls.$infos === undefined){
        console.log("no $infos", kls)
    }
    var qualname = kls.$infos.__qualname__
    if(kls.$infos.__module__    &&
            kls.$infos.__module__ != "builtins" &&
            !kls.$infos.__module__.startsWith("$")){
        qualname = kls.$infos.__module__ + "." + qualname
    }
    return "<class '" + qualname + "'>"
}

type.__ror__ = function(){
    var len = arguments.length
    if(len != 1){
        throw _b_.TypeError.$factory(`expected 1 argument, got ${len}`)
    }
    return _b_.NotImplemented
}

type.mro = function(cls){
    // method resolution order
    // copied from http://code.activestate.com/recipes/577748-calculate-the-mro-of-a-class/
    // by Steve d'Aprano
    if(cls === undefined){
        throw _b_.TypeError.$factory(
            'unbound method type.mro() needs an argument')
    }
    var bases = cls.__bases__,
        seqs = [],
        pos1 = 0
    for(var i = 0; i < bases.length; i++){
        // We can't simply push bases[i].__mro__
        // because it would be modified in the algorithm
        var bmro = [],
            pos = 0
        if(bases[i] === undefined ||
                bases[i].__mro__ === undefined){
            if(bases[i].__class__ === undefined){
                // Brython class inherits a Javascript constructor. The
                // constructor is the attribute js_func
                return [_b_.object]
            }else{
                throw _b_.TypeError.$factory(
                    "Object passed as base class is not a class")
            }
        }
        bmro[pos++] = bases[i]
        var _tmp = bases[i].__mro__
        if(_tmp[0] === bases[i]){
            _tmp.splice(0, 1)
        }
        for(var k = 0; k < _tmp.length; k++){
            bmro[pos++] = _tmp[k]
        }
        seqs[pos1++] = bmro
    }

    seqs[pos1++] = bases.slice()

    var mro = [cls],
        mpos = 1
    while(1){
        var non_empty = [],
            pos = 0
        for(var i = 0; i < seqs.length; i++){
            if(seqs[i].length > 0){non_empty[pos++] = seqs[i]}
        }
        if(non_empty.length == 0){break}
        for(var i = 0; i < non_empty.length; i++){
            var seq = non_empty[i],
                candidate = seq[0],
                not_head = [],
                pos = 0
            for(var j = 0; j < non_empty.length; j++){
                var s = non_empty[j]
                if(s.slice(1).indexOf(candidate) > -1){not_head[pos++] = s}
            }
            if(not_head.length > 0){candidate = null}
            else{break}
        }
        if(candidate === null){
            throw _b_.TypeError.$factory(
                "inconsistent hierarchy, no C3 MRO is possible")
        }
        mro[mpos++] = candidate
        for(var i = 0; i < seqs.length;  i++){
            var seq = seqs[i]
            if(seq[0] === candidate){ // remove candidate
                seqs[i].shift()
            }
        }
    }
    if(mro[mro.length - 1] !== _b_.object){
        mro[mpos++] = _b_.object
    }

    return mro
}

type.__subclasscheck__ = function(self, subclass){
    // Is subclass a subclass of self ?
    var klass = self
    if(klass === _b_.str){
        klass = $B.StringSubclass
    }else if(klass === _b_.float){
        klass = $B.FloatSubclass
    }
    if(subclass.__bases__ === undefined){
        return self === _b_.object
    }
    return subclass.__bases__.indexOf(klass) > -1
}

$B.set_func_names(type, "builtins")

_b_.type = type

var wrapper_descriptor = $B.make_class("wrapper_descriptor")

$B.set_func_names(wrapper_descriptor, "builtins")

type.__call__.__class__ = wrapper_descriptor


var $instance_creator = $B.$instance_creator = function(klass){
    // return the function to initalise a class instance
    if(klass.prototype && klass.prototype.constructor == klass){
        // JS constructor
        return function(){
            return new klass(...arguments)
        }
    }

    // The class may not be instanciable if it has at least one abstract method
    if(klass.$instanciable !== undefined){
        return function(){throw _b_.TypeError.$factory(
            "Can't instantiate abstract class interface " +
                "with abstract methods")}
    }
    var metaclass = klass.__class__ || $B.get_class(klass),
        call_func,
        factory
    if(metaclass === _b_.type && (!klass.__bases__ || klass.__bases__.length == 0)){
        if(klass.hasOwnProperty("__new__")){
            if(klass.hasOwnProperty("__init__")){
                factory = function(){
                    // Call __new__ with klass as first argument
                    var obj = klass.__new__.bind(null, klass).
                                            apply(null, arguments)
                    klass.__init__.bind(null, obj).apply(null, arguments)
                    return obj
                }
            }else{
                factory = function(){
                    return klass.__new__.bind(null, klass).
                                         apply(null, arguments)
                }
            }
        }else if(klass.hasOwnProperty("__init__")){
            factory = function(){
                var obj = {
                    __class__: klass,
                    __dict__: $B.empty_dict()
                }
                klass.__init__.bind(null, obj).apply(null, arguments)
                return obj
            }
        }else{
            factory = function(){
                if(arguments.length > 0){
                    if(arguments.length == 1 && arguments[0].$nat &&
                        Object.keys(arguments[0].kw).length == 0){
                    }else{
                        throw _b_.TypeError.$factory("object() takes no parameters")
                    }
                }
                var res = Object.create(null)
                $B.update_obj(res,
                    {__class__: klass, __dict__: $B.empty_dict()})
                return res
            }
        }
    }else{
        call_func = _b_.type.__getattribute__(metaclass, "__call__")
        var factory = function(){
            return call_func.bind(null, klass).apply(null, arguments)
        }
    }
    factory.__class__ = $B.Function
    if(klass.$infos === undefined){
        console.log('no klaas $infos', klass)
        console.log($B.frames_stack.slice())
    }
    factory.$infos = {
        __name__: klass.$infos.__name__,
        __module__: klass.$infos.__module__
    }
    return factory
}

var method_wrapper = $B.method_wrapper = $B.make_class("method_wrapper",
    function(attr, klass, method){
        var f = function(){
            return method.apply(null, arguments)
        }
        f.$infos = {
            __name__: attr,
            __module__: klass.__module__
        }
        return f
    }
)
method_wrapper.__str__ = method_wrapper.__repr__ = function(self){
    return "<method '" + self.$infos.__name__ + "' of function object>"
}

// Used for class members, defined in __slots__
var member_descriptor = $B.make_class("member_descriptor",
    function(attr, cls){
        return{
            __class__: member_descriptor,
            cls: cls,
            attr: attr
        }
    }
)

member_descriptor.__str__ = member_descriptor.__repr__ = function(self){
    return "<member '" + self.attr + "' of '" + self.cls.$infos.__name__ +
        "' objects>"
}

$B.set_func_names(member_descriptor, "builtins")

// used as the factory for method objects

var method = $B.method = $B.make_class("method",
    function(func, cls){
        var f = function(){
            return $B.$call(func).bind(null, cls).apply(null, arguments)
        }
        f.__class__ = method
        f.$infos = func.$infos
        return f
    }
)

method.__eq__ = function(self, other){
    return self.$infos !== undefined &&
           other.$infos !== undefined &&
           self.$infos.__func__ === other.$infos.__func__ &&
           self.$infos.__self__ === other.$infos.__self__
}

method.__ne__ = function(self, other){
    return ! $B.method.__eq__(self, other)
}

method.__get__ = function(self){
    var f = function(){return self(arguments)}
    f.__class__ = $B.method_wrapper
    f.$infos = method.$infos
    return f
}

method.__getattribute__ = function(self, attr){
    // Internal attributes __name__, __func__, __self__ etc.
    // are stored in self.$infos
    var infos = self.$infos
    if(infos && infos[attr]){
        if(attr == "__code__"){
            var res = {__class__: $B.Code}
            for(var attr in infos.__code__){
                res[attr] = infos.__code__[attr]
            }
            return res
        }else{
            return infos[attr]
        }
    }else if(method.hasOwnProperty(attr)){
        return _b_.object.__getattribute__(self, attr)
    }else{ // use attributes of underlying function __func__
        return $B.Function.__getattribute__(self.$infos.__func__, attr)
    }
}

method.__repr__ = method.__str__ = function(self){
    return "<bound method " + self.$infos.__qualname__ +
       " of " + _b_.str.$factory(self.$infos.__self__) + ">"
}

method.__setattr__ = function(self, key, value){
    // Attempting to set an attribute on a method results in an AttributeError
    // being raised.
    if(key == "__class__"){
        throw _b_.TypeError.$factory("__class__ assignment only supported " +
            "for heap types or ModuleType subclasses")
    }
    throw $B.attr_error(attr, self)
}

$B.set_func_names(method, "builtins")

$B.method_descriptor = $B.make_class("method_descriptor")

$B.classmethod_descriptor = $B.make_class("classmethod_descriptor")

// PEP 585
$B.GenericAlias = $B.make_class("GenericAlias",
    function(origin_class, items){
        return {
            __class__: $B.GenericAlias,
            origin_class,
            items
        }
    }
)

$B.GenericAlias.__args__ = {
    __get__: function(self){
        return $B.fast_tuple(self.items)
    }
}

$B.GenericAlias.__call__ = function(self, ...args){
    return self.origin_class.$factory.apply(null, args)
}

$B.GenericAlias.__eq__ = function(self, other){
    if(! _b_.isinstance(other, $B.GenericAlias)){
        return false
    }
    return $B.rich_comp("__eq__", self.origin_class, other.origin_class) &&
        $B.rich_comp("__eq__", self.items, other.items)
}

$B.GenericAlias.__getitem__ = function(self, item){
    throw _b_.TypeError.$factory("descriptor '__getitem__' for '" +
        self.origin_class.$infos.__name__ +"' objects doesn't apply to a '" +
        $B.class_name(item) +"' object")
}

$B.GenericAlias.__or__ = function(self, other){
    var $ = $B.args('__or__', 2, {self: null, other: null}, ['self', 'other'],
                    arguments, {}, null, null)
    return $B.UnionType.$factory([self, other])
}

$B.GenericAlias.__origin__ = {
    __get__: function(self){
        return self.origin_class
    }
}

$B.GenericAlias.__parameters__ = {
    __get__: function(self){
        // In PEP 585 : "a lazily computed tuple (possibly empty) of unique
        // type variables found in __args__", but what are "unique type
        // variables" ?
        return $B.fast_tuple([])
    }
}

$B.GenericAlias.__repr__ = function(self){
    var items = []
    for(var i = 0, len = self.items.length; i < len; i++){
        if(self.items[i] === _b_.Ellipsis){
            items.push('...')
        }else{
            if(self.items[i].$is_class){
                items.push(self.items[i].$infos.__name__)
            }else{
                items.push(_b_.repr(self.items[i]))
            }
        }
    }
    return self.origin_class.$infos.__qualname__ + '[' +
        items.join(", ") + ']'
}

$B.set_func_names($B.GenericAlias, "types")

$B.UnionType = $B.make_class("UnionType",
    function(items){
        return {
            __class__: $B.UnionType,
            items
        }
    }
)

$B.UnionType.__args__ = {
    __get__: function(self){
        return $B.fast_tuple(self.items)
    }
}

$B.UnionType.__parameters__ = {
    __get__: function(){
        return $B.fast_tuple([])
    }
}

$B.UnionType.__repr__ = function(self){
    var t = []
    for(var item of self.items){
        if(item.$is_class){
            t.push(item.$infos.__name__)
        }else{
            t.push(_b_.repr(item))
        }
    }
    return t.join(' | ')
}

$B.set_func_names($B.UnionType, "types")

// this could not be done before $type and $factory are defined
_b_.object.__class__ = type

})(__BRYTHON__)
