function main() {
    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var cursor = {
        "x": 0,
        "y": 0,
    };
    var scrollY = 0;
    var clicked = false;

    var trackMouse = function(e) {
        cursor.x = e.pageX;
        cursor.y = e.pageY;
        console.log("tracking!");
    };

    var scrolling = function(e) {
        console.log("scrolling!");
        var delta = 0;

        if (!e) e = window.e;
        
        e.preventDefault();

        //normalize the delta
        if (e.wheelDelta) { //means its IE or Opera
            delta = e.wheelDelta / 60;
        }
        else if (e.detail) { //means it's W3C
            delta = -e.detail / 2;
        }

        scrollY -= delta*10;
    };

    this.onclick = function (e) {
        clicked = !clicked;
        if (clicked){
            canvas.addEventListener('mousemove', trackMouse, false);
            canvas.addEventListener('mousewheel', scrolling, false);
            canvas.addEventListener('DOMMouseScroll', scrolling, false);
        }
        else {
            canvas.removeEventListener('mousemove', trackMouse);
            canvas.removeEventListener('mousewheel', scrolling);
            canvas.removeEventListener('DOMMouseScroll', scrolling);
        }
    };

    function render() {
        var context = canvas.getContext('2d');
        context.clearRect(0,0,canvas.width, canvas.height)
        context.fillRect(0,0,canvas.width, canvas.height);
        context.strokeStyle = "#9CFF00"; //bright green?
        context.save();
        context.translate(canvas.width/2, canvas.height/2);
        // input1 = (cursor.x + canvas.width/2)/5;
        // input2 = (-cursor.y + canvas.height/2)/5;
        input3 = (cursor.x/4);
        input2 = -(cursor.y/4);
        input1 = scrollY/6;
        drawSpirograph(context,input1,input2,input3);
        context.restore();

        requestAnimationFrame(render);
    }

    function drawSpirograph(context, R, r, O){
        var x1 = R - O; //what?
        var y1 = 0;
        var i = 1;

        context.beginPath();
        context.moveTo(x1, y1);
        do {
            if (i>20000) break; //probably endless loop, cut it out
            var x2 = (R+r)*Math.cos(i*Math.PI/72) - (r+O)*Math.cos(((R+r)/r)*(i*(Math.PI/72)));
            var y2 = (R+r)*Math.sin(i*Math.PI/72) - (r+O)*Math.sin(((R+r)/r)*(i*(Math.PI/72))); // no idea what this equation actually is
            context.lineTo(x2, y2);

            x1 = x2;
            y1 = y2;

            i++;
        } while (x2 != R-0 && y2 != 0); // repeat until you hit starting point

        context.stroke();
    }

    render();
}
