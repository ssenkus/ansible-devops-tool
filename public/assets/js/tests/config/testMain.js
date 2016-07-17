var tests = [];
for (var f in window.__karma__.files) {
    if (f.substring(f.length - 8, f.length) === '.spec.js') {
        tests.push("\n" +f);
    }
}
console.log(tests.toString());