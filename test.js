const gitmodulesHandler = require("./index")

global.testing = true

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
            console.log(otherModule.getPrintString())
            otherModule.remove()
            console.log("nomo module should've been removed")
        } else {
            console.log("module named nomo did not exist...")
            testObject1.createModule("nomo", "nomourl", "nomopath")
            console.log("nomo module should've been created!")
        }


        otherModule = testObject1.getModule(sampleName1)
        if(otherModule) {
            console.log(otherModule.getPrintString())
        } else {
            console.log("module named " + sampleName1 + " did not exist...")
        }

        await testObject1.writeToFile()



        console.log("Test run through smoothly!")
    } catch(err) {
        console.log("Error!")
        console.log(err)
    }
} 

runTests()
