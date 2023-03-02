---
description: Learn about Lite XL's class implementation.
---

We've briefly talked about the class implementation used by Lite XL
in the introduction.
In this article, we'll talk about how to use the implementation
efficiently.

!!! note
    Some methods here will be written differently than in
    the source code.
    This is to clarify how the methods _should_ be called.

## Creating classes

Similar to many other languages, all classes extend the `Object` class.
To extend a class, one can use the `Object.extend()` method.

```lua
function Object.extend(base_class: Object): Object end
```

This method accepts one parameter — the class to copy.
This method will create a copy of a `Object` that can
be extended without affecting the original object.

You can now define or override methods and metamethods of this
newly created class.
To initialize a class, you can override the `Object:new()` method.

```lua
-- load the Object class
local Object = require "core.object"
-- since the source class is usually the one you want to copy,
-- we often simplify it to Object:extend().
-- This is equivalent to Object.extend(Object).
local Animal = Object:extend()
-- define a constructor for Animal
function Animal:new()
  self.type = "animal"
end
```

!!! tip
    `Object` implements the `__tostring()` and `__call()` metamethods.
    You can override the `__tostring()` metamethod to return a string
    that suits your class.

## Super class

You can access the super class via `Object.super`.
For instance, to call the constructor of the super class, you can do:

```lua
local Object = require "core.object"
local Animal = Object:extend()
function Animal:new()
  self.type = "animal"
end

local Dog = Animal:extend()
function Dog:new()
  -- call the superclass constructor
  -- note the use of . instead of : and explicitly passing self
  Dog.super.new(self)
end
```

Note that you must call super class methods with `.` instead of `:`
and pass `self` as the first parameter.
If you call the method with `:`, it will call the method with `self`
as `super`, which is **the super class** and not **the instance**.

## Class relationships

The `Object` class also provide utility methods for checking relations
between classes and object.

To check whether an object is strictly an instance of a class
(not an instance of a child class),
use `Object:is()`.
To do the inverse, use `Object:is_class_of()`.

```lua
function Object:is(class: Object): boolean end
function Object.is_class_of(class: Object, instance: Object): boolean end
```

`Object:is()` accepts a parameter — the class to compare it to.
If the object is strictly an instance of the class,
the method returns true.

`Object.is_class_of()` accepts a class and compares it against
an instance of an object.
If the object is a strictly an instance of the class,
the method returns true.

**Example:**

```lua
local Animal = Object:extend()
local Dog = Animal:extend()
local Cat = Animal:extend()
local doggo = Dog()

print(doggo:is(Dog)) -- prints true
print(doggo:is(Cat)) -- prints false
print(doggo:is(Animal)) -- also prints false

-- note that since we're going to pass Dog as the first parameter,
-- we might as well as use the colon notation
print(Dog:is_class_of(doggo)) -- prints true
print(Cat:is_class_of(doggo)) -- prints false
print(Animal:is_class_of(doggo)) -- prints false
```

To check whether an object is an instance of a class
(or an instance of child class), use `Object:extends()`.
To do the inverse, use `Object:is_extended_by()`.

```lua
function Object:extends(class: Object): boolean end
function Object.is_extended_by: Object, instance: Object): boolean end
```

The methods accept the same parameters as `Object:is()`
and `Object:is_class_of()`.

```lua
local Animal = Object:extend()
local Dog = Animal:extend()
local Cat = Animal:extend()
local doggo = Dog()

print(doggo:extends(Dog)) -- prints true
print(doggo:extends(Cat)) -- prints false
print(doggo:extends(Animal)) -- prints true

-- note that since we're going to pass Dog as the first parameter,
-- we might as well as use the colon notation
print(Dog:is_extended_by(doggo)) -- prints true
print(Cat:is_extended_by(doggo)) -- prints false
print(Animal:is_extended_by(doggo)) -- prints true
```