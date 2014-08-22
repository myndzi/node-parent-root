'use strict';

var shoud = require('should'),
    parentRoot = require('./index');

var packages = {
    '/home/foo/module/package.json':1,
    '/home/foo/module/node_modules/parent-root/package.json':1,
    '/home/foo/module2/package.json':1
};
parentRoot.mockFs({
    existsSync: function (path) {
        return (path in packages);
    }
});

describe('parentRoot', function () {
    it('should return the root of the top level parent package', function () {
        parentRoot.mockModule({
            parent: {
                filename: '/home/foo/module/baz.js'
            }
        });
        
        parentRoot().should.equal('/home/foo/module');
    });
    it('should return the root when the parent module is in a subfolder', function () {
        parentRoot.mockModule({
            parent: {
                filename: '/home/foo/module/lib/baz.js'
            }
        });
        parentRoot().should.equal('/home/foo/module');
    });
    it('should return the folder of the parent module if no package.json was found', function () {
        parentRoot.mockModule({
            parent: {
                filename: '/keke/lar/hai.js'
            }
        });
        parentRoot().should.equal('/keke/lar');
    });
    it('should succeed with deep nesting (>1 parent)', function () {
        parentRoot.mockModule({
            parent: {
                parent: {
                    filename: '/home/foo/module/baz.js'
                }
            }
        });
        parentRoot().should.equal('/home/foo/module');
    });
    it('should succeed with no parent modules', function () {
        parentRoot.mockModule({
            filename: '/home/foo/module/node_modules/parent-root/index.js'
        });
        parentRoot().should.equal('/home/foo/module/node_modules/parent-root');
    });
    it('should succeed if the current module and the parent module do not share a common parent', function () {
        parentRoot.mockModule({
            filename: '/home/foo/module/index.js',
            parent: {
                filename: '/home/foo/module2/index.js'
            }
        });
        parentRoot().should.equal('/home/foo/module2');
    });
});
