const { promises: { readdir, stat} } = require('fs')
const path = require('path')

function tree(stringDir) {
    if (!stringDir || typeof stringDir != 'string') {
        throw new Error('передайте строку, содержащую путь до папки')
    }

    function statAll(pathFrom, pathsContent) {
        return new Promise(function (resolve) {
            let pathsContentsCount = pathsContent.length
            let files = []
            let folders = []

            // empty directory
            if (pathsContent.length === 0) {
                resolve({
                    files: files,
                    folders: folders
                })
                return;
            }

            for (let key in pathsContent) {
                const newPath = path.join(pathFrom, pathsContent[key])
                stat(newPath)
                    .then((stat) => {
                        pathsContentsCount--
                        if (stat.isDirectory()) {
                            folders.push(newPath)
                        } else {
                            files.push(newPath)
                        }
                        if (!pathsContentsCount) {
                            resolve({
                                files: files,
                                folders: folders
                            })
                        }
                    })
            }
        })

    }


    function promiseAllP(items, block) {
        const promises = [];
        items.forEach((item, index) => {
            promises.push( function(item) {
                return new Promise((resolve, reject) => {
                    resolve(block.apply(this, [item, index, resolve, reject]));
                });
            }(item, index))
        });
        return Promise.all(promises);
    }

    return new Promise((resolve) => {
        let promisesCount = 1,
            filesAndfolders = {
                files: [],
                folders: []
            };
        (function loop(stringDir) {
            let foldersCount = 0
            Promise.resolve(stringDir)
                .then(readdir)
                .then(files => statAll(stringDir, files))
                .then(obj => {
                    filesAndfolders = {
                        folders: [...filesAndfolders.folders, ...obj.folders],
                        files: [...filesAndfolders.files, ...obj.files]
                    }
                    promisesCount--
                    foldersCount = obj.folders.length
                    promisesCount += foldersCount
                    return promiseAllP(obj.folders, loop)
                })
                .then(() => {
                    if (promisesCount === 0) {
                        resolve(filesAndfolders)
                    }
                })
                .catch(console.log)
        })(stringDir)
    })
}

tree(process.argv[2])
    .then(data => {
        console.log(data)
    })
