# typecheck

typecheck is a type checker for JavaScript.

# How to use

typecheck gives a singleton instance, which have the two methods: 'check' and 'assert'.

```js
var tc = require('typecheck').getInstance();

var s = "abc";
tc.check(s, "string"); // return true 
tc.check(s, "number"); // return false
tc.assert(s, "function"); // throw TypeError
```
# Methods

+ check(v, t)  
if the type of v is t, this method returns true. otherwise it returns false.

+ check([v0, v1, v2, ...], t)  
if the types of v0, v1, v2, ... are all the same as t, this method returns true. otherwise it returns false.

+ assert(v, t)  
if check(v, t) returns false, this method throws TypeError.

+ assert([v0, v1, v2, ...], t)  
if check([v0, v1, v2, ...], t) returns false, this method throws TypeError.

# Supported types

+ undefined  
{x: typeof x == "undefined"}

+ boolean  
{x: typeof x == "boolean"}

+ number  
{x: typeof x == "number"}

+ string  
{x: typeof x == "string"}

+ function  
{x: typeof x == "function"}

+ object  
{x: typeof x == "object"}

+ null  
{x: x === null}

+ array  
{x: x instanceof Array}

+ integer  
{x: check(x, "number"), x % 1 == 0}

+ int32  
{x: check(x, "integer"), x >= -2147483648, x < 2147483648}

+ uint32    
{x: check(x, "integer"), x >= 0, x < 4294967296}

+ even  
{x: check(x, "integer"), x % 2 == 0}

+ odd  
{x: check(x, "integer"), x % 2 == 1}

+ true  
{x: x ? true : false}

+ false  
{x: x ? false : true}

+ i..  
{x: check(x, "integer"), x >= i} ({i: check(i, "integer")})

+ ..j  
{x: check(x, "integer"), x <= j} ({j: check(j, "integer)})

+ i..j  
{x: check(x, "integer"), x >= i, x <= j} ({i,j: check([i,j] "integer")})

+ i..%k  
{x: check(x, "integer"), x>= i, x - i % k == 0} ({i,k: check([i,k], "integer"), k > 0})

+ ..j%k  
{x: check(x, "integer"), x <= j, j - x % k == 0} ({j,k: check(([j,k], "integer"), k > 0})

+ i..j%k  
{x: check(x, "integer"), x >= i, x <= j, x - i % k == 0} ({i,j,k: check([i,j,k], "integer"), k >0})

+ function object 'f'  
{x: x instanceof f} ({f: check(f, "function")})

+ [t0, t1, t2, ...]  
{x: check(x, t0) or check(x, t1) or x check(x, t2) or ...}

