# gitmodules-file-handler
Module to help read and write to .gitmodules file.

This module takes a path to a .gitmodules file, then it provides the abilities to remove, add and alter the submodule sections therein.

Usage
---

```javascript
const gitmodulesHandler = require("gitmodules-file-handler")

const gitmodulesPath = "/your/path/to/.gitmodules/"

const handlerObject = await gitmodulesHandler.readNewGitmodulesFile(gitmodulesPath)

// remove module
let moduly = handlerObject.getModule("supermodule")

if(moduly) moduly.remove()

//create module
moduly = handlerObject.createModule("moduleName", "url", "pathToSubmodule")

//don't forget to write the file!
await handlerObject.writeToFile()

```
---

The Interfaces
---
Most important is the `GitmodulesObject` it is being returned on the `readNewGitmodulesFile(path)` call.
```javascript
class GitmodulesObject {

    createModule(name, url, path) {...}

    getModule(name) {...}

    getAllModules() {...}

    async writeToFile() {...}

}
```
Both the `createModule` function and the `getModule` function will most likely return a `GitmoduleInfoObject`. This object is used to handle the entries for a specific submodule. 

```javascript
class GitmoduleInfoObject {

    setName(newName) {...}

    setPath(newPath) {...}

    setURL(newURL) {...}

    remove() {...}

    getPrintString() {...}

}
```
---
Results
---

When writing the file each submodule will look like
```.gitmodules
[submodule "submoduleName"]
	path = submodulePath
	url = submoduleURL
```
I have noticed that when using git to add a submodule then usually the `submoduleName` = `submodulePath`.

---

# License

## The Unlicense JhonnyJason style

- Information has no ownership.
- Information only has memory to reside in and relations to be meaningful.
- Information cannot be stolen. Only shared or destroyed.

And you wish it has been shared before it is destroyed.

The one claiming copyright or intellectual property either is really evil or probably has some insecurity issues which makes him blind to the fact that he also just connected information which was freely available to him.

The value is not in him who "created" the information the value is what is being done with the information.
So the restriction and friction of the informations' usage is exclusively reducing value overall.

The only preceived "value" gained due to restriction is actually very similar to the concept of blackmail (power gradient, control and dependency).

The real problems to solve are all in the "reward/credit" system and not the information distribution. Too much value is wasted because of not solving the right problem.

I can only contribute in that way - none of the information is "mine" everything I "learned" I actually also copied.
I only connect things to have something I feel is missing and share what I consider useful. So please use it without any second thought and please also share whatever could be useful for others. 

I also could give credits to all my sources - instead I use the freedom and moment of creativity which lives therein to declare my opinion on the situation. 

*Unity through Intelligence.*

We cannot subordinate us to the suboptimal dynamic we are spawned in, just because power is actually driving all things around us.
In the end a distributed network of intelligence where all information is transparently shared in the way that everyone has direct access to what he needs right now is more powerful than any brute power lever.

The same for our programs as for us.

It also is peaceful, helpful, friendly - decent. How it should be, because it's the most optimal solution for us human beings to learn, to connect to develop and evolve - not being excluded, let hanging and destroy oneself or others.

If we really manage to build an real AI which is far superior to us it will unify with this network of intelligence.
We never have to fear superior intelligence, because it's just the better engine connecting information to be most understandable/usable for the other part of the intelligence network.

The only thing to fear is a disconnected unit without a sufficient network of intelligence on its own, filled with fear, hate or hunger while being very powerful. That unit needs to learn and connect to develop and evolve then.

We can always just give information and hints :-) The unit needs to learn by and connect itself.

Have a nice day! :D