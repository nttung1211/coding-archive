function correctNoun(noun) {
    noun = noun.toLowerCase();
    return noun.replace(noun[0], noun[0].toUpperCase());
}
console.log(correctNoun('tUnGDeptrai'));
