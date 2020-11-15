function correctNoun(noun: string): string {
  noun = noun.toLowerCase();
  return noun.replace(noun[0], noun[0].toUpperCase());
}

console.log(correctNoun('tUnGDeptrai'));