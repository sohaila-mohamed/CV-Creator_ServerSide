onload = () => {
    var x1 = 10;
    var x1 = 30;
    console.log(x1);

    //can't be re-declared  
    //error in console
    let x2 = 10;
    let x2 = 30;
    const x3 = 10;
    const x3 = 100;
    console.log(x2);




    function SumVar(x) {

        // console.log(this);
        var x = 5;
        var arr = [];

        //caller is window object
        Add();
        for (var i = 0; i < 3; i++) {

            arr.push((function(i) { return function() { console.log(i) } })(i))
        }

        function Add() {
            console.log(x);
            console.log(this);

        }
        x = 6;
        return arr;
    }

    function SumLet(x) {

        // console.log(this);
        var x = 5;
        var arr = [];

        //caller is window object
        Add();
        for (let i = 0; i < 3; i++) {

            arr.push(function() { console.log("i", i) })
        }

        function Add() {
            console.log(x);
            console.log(this);

        }
        x = 6;
        return arr;
    }
    var res = SumLet(3);
    console.log(res[0]());
    console.log(res[1]());
    console.log(res[2]());

    //every function is seeing on scope or run has run in one execution context
    //so will have the same closure;
    for (var i = 1; i < 4; i++) {
        document.getElementById("div" + i).onclick =
            function() { console.log(i); };
    }
    //with let each for iteration has a local scope  or execution context to run within it 
    //so each function wil have different closure, so different i;

    for (var i = 1; i < 4; i++) {
        document.getElementById("div" + i).onclick =
            function() { console.log(i); };
    }

    let obj = {
        name: "obj",
        func: function() { console.log("obj", this) }
    }
    obj.func();

    var obj2 = {
        name: "obj2",
        func: function() { console.log("obj2", this.name) }
    }
    obj2.func();


}