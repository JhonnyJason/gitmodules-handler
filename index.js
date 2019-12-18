const fs = require("fs").promises

const log = (arg) => {
    if(global.testing)
        console.log(arg)
}


const parseModules = (string) => {

    var modules = {}
    
    var stringLines = string.split("\n")
    
    log(" - - ")
    stringLines.forEach(line => log(line))
    log(" - - ")


    var newModule = {}
    var line = ""

    for(var i = 0; i < stringLines.length; i++) {
        
        line = stringLines[i]

        if(line) {
            if(line.indexOf("[submodule \"") == 0) {
                var tokens = line.split("\"")
                newModule.name = tokens[1]
                log("extracted submodule name: " + newModule.name)
            }
            if(line.indexOf("\tpath = ") == 0) {
                newModule.path = line.substr(8)
                log("extracted submodule path: " + newModule.path)
            }
            if(line.indexOf("\turl = ") == 0) {
                newModule.url = line.substr(7)
                log("extracted submodule url: " + newModule.url)
            }
            if(newModule.name && newModule.path && newModule.url) {
                new GitmoduleInfoObject(modules, newModule.name, newModule.url, newModule.path)
                newModule = {}
            }
        }
    }
    

    return modules

}

const createFileString = (modules) => {
    var finalString  = ""
    modules.forEach( module => finalString += module.getPrintString())
    return finalString

}

const checkForNonEmptyString = (string) => {
    var type = typeof string
    if(type != "string")
        throw new Error("The parameter was not a string - type was: " + type + "!")
    if(!string)
        throw new Error("The parameter was an empty string!")
}


class GitmoduleInfoObject {
    constructor(modulesObject, name, url, path) {
        this.allModules = modulesObject
        this.name = name
        this.url = url
        this.path = path
        checkForNonEmptyString(this.name)
        checkForNonEmptyString(this.url)
        checkForNonEmptyString(this.path)

        this.allModules[this.name] = this
    }

    setName(newName) {
        checkForNonEmptyString(newName)
        var newModule = this.allModules[newName]
        if(!newModule) {
            this.remove()
            this.name = newName
            this.allModules[this.name] = this
        } else {
            throw new Error("There has already been a module having the name: " + newName)
        }
    }

    setPath(newPath) {
        checkForNonEmptyString(newPath)
        this.path = newPath
    }

    setURL(newURL) {
        checkForNonEmptyString(newURL)
        this.url = newURL
    }

    remove() {
        delete this.allModules[this.name]
    }

    getPrintString() {
        var printString = "[submodule \"" + this.name + "\"]\n"
        printString += "\tpath = " + this.path + "\n"
        printString += "\turl = " + this.url + "\n"
        return printString
    }

}

//=========================================================================
// this Object is the key Object of being exposed
//=========================================================================
class GitmodulesObject {
    constructor(fileString, path) {        
        this.fileString = fileString
        this.path = path
        this.modules = parseModules(fileString)
        
        log(" -> created GitmodulesObject!")

    }

    createModule(name, url, path) {
        var module = this.modules[name]
        if(module) {
            throw new Error("Module with the name: " + name + " already existed!")
        }

        checkForNonEmptyString(name)
        checkForNonEmptyString(url)
        checkForNonEmptyString(path)

        return new GitmoduleInfoObject(this.modules, name, url, path)
    }

    getModule(name) {
        checkForNonEmptyString(name)
        return this.modules[name]
    }
    getAllModules() {
        return this.modules
    }

    async writeToFile() {
        this.fileString = createFileString(Object.values(this.modules))
        await fs.writeFile(this.path, this.fileString)
    }

}

module.exports = {

    readNewGitmodulesFile: async (path) => {
        var fileString = ""
        checkForNonEmptyString(path)
        try {
            fileString = await fs.readFile(path, "utf-8")
            
            log("File did exist - we read the file!")
            log(fileString)

            return new GitmodulesObject(fileString, path)
        
        } catch (err) {
            if (err.code == 'ENOENT') {
                try {
                    var fileHandle = await fs.open(path, 'w+')
        
                    log("File not exist - created new file!")
        
                    await  fs.close(fileHandle)
        
                    fileString = ""
                    return new GitmodulesObject(fileString, path)
        
                } catch(err2) {
                    log("Error, could not open file: " + path)
                    throw err2                        
                }
            } else {
                log("Error, could not open file: " + path)
                throw err                
            }
        }
    }
}