const hashFiles = require("hash-files");
const fs = require("fs");

const files = getArgs("files");
if(!files || files.length === 0) {
    console.error("missing --files parameter please specify one or more files/globs!");
    process.exit(-1);
}
const hashFile = getArg("hash-file");
if(!hashFile) {
    console.error("missing --hash-file parameter please specify a hash-file to read to and write from!");
    process.exit(-1);
}

hashFiles({
	files: getArgs("files")
}, (/** @type {any} */ error, /** @type {string} */ hash) => {
	if(error) throw error;
	console.log(hash);
	
	if(!fs.existsSync(hashFile)) {
		console.log("no hash yet");
		fs.writeFileSync(hashFile, hash);
        process.exit(-1);
    }
    
    const fileContent = fs.readFileSync(hashFile).toString();
    if(fileContent !== hash) {
        console.log("hash changed!");
        fs.writeFileSync(hashFile, hash);
        process.exit(-1);
    }
    
    console.log("hash equal!");
    process.exit(0);
});

/**
 * @param {string} argName
 */
function getArgs(argName){
    /**
     * @type {string[]}
     */
    const ret = [];
    let i = process.argv.indexOf("--" + argName) + 1;
    if(i === 0) return null; // does not have the arg.

    while(process.argv[i] !== undefined && !process.argv[i].startsWith("--")){
        ret.push(process.argv[i]);
        i++;
    }
    return ret.map(v => v.endsWith(",")? v.slice(0, -1) : v);
}
/**
 * @param {string} argName
 */
function getArg(argName){
    const args = getArgs(argName);
    if(args === null) return null;
    return args[0];
}