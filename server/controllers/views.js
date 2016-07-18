exports.index = function (req, res) {
    fs.createReadStream('./public/index.html').pipe(res)
}
