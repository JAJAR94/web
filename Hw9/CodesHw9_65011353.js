document.addEventListener('keyup', (event) => {
    let numstack = document.getElementById("result").innerHTML;
    if (event.key >= 0) { 
        if (numstack == 0){numstack = "";}
        document.getElementById("result").innerHTML = numstack + event.key;
    } 
    else if (event.key == "+") {
        document.getElementById("result").innerHTML = numstack + "+";
    }
    else if (event.key == "-") {
        document.getElementById("result").innerHTML = numstack + "-";
    }
    else if (event.key == "*") {
        document.getElementById("result").innerHTML = numstack + "*";
    }
    else if (event.key == "/") {
        document.getElementById("result").innerHTML = numstack + "/";
    }
    else if (event.key == "=") {
        document.getElementById("result").innerHTML = eval(numstack);
    }
    else if (event.key == "C") {
        document.getElementById("result").innerHTML = "";
    }
    else if (event.key == "<") {
        document.getElementById("result").innerHTML = document.getElementById("result").innerText.slice(0, -1);
    }
});

document.addEventListener('click', (event) => {
    const element = event.target;
    let click = element.id;
    let numstack = document.getElementById("result").innerHTML;

    if (click == "sin") {
        if(numstack==""){numstack=0;}
        document.getElementById("result").innerHTML = Math.sin(eval(numstack)*(Math.PI/180)).toFixed(10);
    }
    else if (click == "cos") {
        if(numstack==""){numstack=0;}
        document.getElementById("result").innerHTML = Math.cos(eval(numstack)*(Math.PI/180)).toFixed(10);
    }
    else if (click == "tan") {
        if(numstack==""){numstack=0;}
        document.getElementById("result").innerHTML = Math.tan(eval(numstack)*(Math.PI/180)).toFixed(10);
    }
    else if (click == "pi") {
        document.getElementById("result").innerHTML = numstack.replace(/\d+$/, Math.PI);
    }
    else if (click == "sqrt") {
        document.getElementById("result").innerHTML = Math.sqrt(numstack);
    }
    else if (click == "square") {
        document.getElementById("result").innerHTML = eval(numstack) * eval(numstack);
    }
    else if (click == "1/x") {
        document.getElementById("result").innerHTML = 1 / eval(numstack);
    }
    else if (click == "factorial") {
        document.getElementById("result").innerHTML = factorial(eval(numstack).toFixed(0));
    }
    else if (click == "mc") {
        localStorage.setItem("memory",0);
    }
    else if (click == "m+") {
        // if (numstack == ""){numstack = 0};
        // if (localStorage.getItem("memory") == ""){localStorage.setItem("memory",0)};
        let num = eval(numstack) + parseFloat(localStorage.getItem("memory"));
        alert(num);
        localStorage.setItem("memory",num);
    }
    else if (click == "m-") {
        const save_memory = localStorage.getItem("memory");
        document.getElementById("result").innerHTML = numstack - save_memory;
    }
    else if (click == "mr") {
        const save_memory = localStorage.getItem("memory");
        document.getElementById("result").innerHTML = numstack + save_memory;
        
    }


});

function factorial(num) {
    let answer = 1;
    if (num == 0 || num == 1) {
        return answer;
    }
    else if (num > 1) {
        for (var i = num; i >= 1; i--) {
            answer = answer * i;
        }
        return answer;
    }
    else {
        return "Error";
    }
}

