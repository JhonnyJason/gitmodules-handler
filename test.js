const gitmodulesHandler = require("./index")
const c = require("chalk")

const testPath = ".gitmodules"

var testObject1 = null
var testObject2 = null
var testObject3 = null

const sampleName1 = "samplemodule"
const sampleURL1 = "https://github.com/JhonnyJason/samplemodule.git"
const samplePath1 = "samplemodule"

const sampleName2 = "specialmodule"
const sampleURL2 = "https://github.com/JhonnyJason/specialmodule.git"
const samplePath2 = "suprise"


const runTests = async () => {
    try {
        testObject1 = await gitmodulesHandler.readNewGitmodulesFile(testPath)
                
        
        var otherModule = testObject1.getModule("nomo")
        if(otherModule) {
            console.log(c.yellow(otherModule.getPrintString()))
        } else {
            console.log(c.red("module named nomo did not exist..."))
        }


        otherModule = testObject1.getModule(sampleName1)
        if(otherModule) {
            console.log(c.yellow(otherModule.getPrintString()))
        } else {
            console.log(c.red("module named " + sampleName1 + " did not exist..."))
        }

        await testObject1.writeToFile()



        console.log(c.green("Test run through smoothly!"))
    } catch(err) {
        console.log(c.red("Error!"))
        console.log(err)
    }
} 

runTests()
