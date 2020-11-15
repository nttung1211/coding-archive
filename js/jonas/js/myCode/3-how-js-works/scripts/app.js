/* Scope chain */
var a = 1;
first();

function first() {
    var b = 2;
    second();

    function second() {
        var c = 3;
        third();
    }
}

function third() {
    var d = 4;
    // console.log(c); // c can not be access here
}

var john = {
    name: 'John',
    yearOfBirth: 1990,
    calculateAge: function() {
        console.log(this);
        console.log(2016 - this.yearOfBirth);
        
        function innerFunction() {
            console.log(this); // as Jonas said : if a function is not a method of an object its this will be the window object
        }
        innerFunction();
    }
}

john.calculateAge();
var mike = {
    name: 'Mike',
    yearOfBirth: 1984
};

mike.calculateAge = john.calculateAge;
mike.calculateAge();