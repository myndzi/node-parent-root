# Parent-Root

This module will locate the package root of the top-level parent in a chain of modules. In other words, from a module that was required into another module (that was, perhaps required into yet *another* module), it enables you to locate the root folder of the actual app being called.

### How it works

Parent-Root will follow the chain of module.parent until there is no further parent. Then it will take the filename of the top level parent and check its directory for a package.json file. If none exists, it will check successively higher level directories until it either finds one or there are no higher directories to check. If it was unable to find a package.json file, it will return the folder that the top level module exists in instead.

### Difference from similar modules

All the modules I encountered were strictly path-based, and so wouldn't work if the required module and its parent(s) did not share a common ancestor in the path hierarchy.

### Installation

`npm install parent-root`

### Usage

    var parentRoot = require('parent-root');
    var root = parentRoot();
