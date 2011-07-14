# typecheck

typecheck is a type checker for JavaScript.

# How to use

typecheck gives a singleton instance, which have the two methods: 'check' and 'assert'.

    var tc = require('typecheck').getInstance();
    var s = "abc";  
    tc.check(s, "string"); // return true  
    tc.check(s, "number"); // return false  
    tc.assert(s, "function"); // throw TypeError  

# Types

typecheck suports the following types.

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
{x: x is a number, x % 1 == 0}

+ int32  
{x: x is a integer, x >= -2147483648, x < 2147483648}

+ uint32    
{x: x is a integer, x >= 0, x < 4294967296}

+ even  
{x: x is a integer, x % 2 == 0}

+ odd  
{x: x is a integer, x % 2 == 1}

+ true  
{x: x ? true : false}

+ false  
{x: x ? false : true}

+ i..j%k (integer range)  
{x: x is a integer, x >= i, x <= j, x - i % k == 0}

