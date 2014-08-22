'use strict';

var PATH = require('path');

var _module = module,
    _fs = require('fs');

function parentRoot() {
    var mod = _module, cycle = [ mod ];
    while (mod.parent) {
        if (cycle.indexOf(mod.parent) > -1) {
            break;
        }
        cycle.push(mod.parent);
        
        mod = mod.parent;
    }
    
    var top = PATH.dirname(mod.filename), prev = '';
    while (top !== prev && !_fs.existsSync(PATH.join(top, 'package.json'))) {
        prev = top;
        top = PATH.dirname(top);
    }
    if (_fs.existsSync(PATH.join(top, 'package.json'))) {
        return top;
    } else {
        return PATH.dirname(mod.filename);
    }
}
parentRoot.mockModule = function (arg) {
    _module = arg;
};
parentRoot.mockFs = function (arg) {
    _fs = arg;
};

module.exports = parentRoot;
