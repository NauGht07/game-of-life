let a; // grid size

var grid = []; // grid currently
let ngrid = []; // grid on the next tick


// booleans for input
let draw;
let remove;

// div that contains the grid
const container = document.querySelector('.container');

// create the grid
function populate(size)
{
    container.innerHTML = '';
    container.style.setProperty('--size', size)
    for (let i = 0; i < size * size; i++) {
        let div = document.createElement('div');
        div.classList.add('pixel');

        div.addEventListener('mouseover', function() {
            if (remove) div.style.backgroundColor = 'rgba(128, 128, 128, 0.286)';
            else if (draw) div.style.backgroundColor = 'white';
            else return;
        })

        container.appendChild(div);
    }
}

// simulate the game of lfie
function simulate() {
    input();
    let ngrid = structuredClone(grid);
    var count = 0;
    for (var i = 0; i < a; i++)
    {
        for (var j = 0; j < a; j++)
        {
            if (i > 0 && i < a-1 && j > 0 && j < a-1)
            {
                for (var k = i-1; k <= i+1; k++)
                {
                    for (var l = j-1; l <= j+1; l++)
                    {
                        if (k == i && l == j) continue;
                        if (grid[k][l] == 1) ++count; // count number of live neighbouring cells
                    }
                }
            }
            if (count == 2 && ngrid[i][j] == 1) ngrid[i][j] = 1;
            else if (count == 3) ngrid[i][j] = 1;
            else ngrid[i][j] = 0;
            console.log("i, j" + i + j + "\n" + count);
            count = 0;
        }
    }
    
    console.log(ngrid);
    output(ngrid);
}

function autoSimulate() {
    var isGenerating = false;
    var s;
    return () => {
        if (isGenerating) {
            clearInterval(s);
            isGenerating = false;
        } else {
            s = setInterval(simulate, 500);
            isGenerating = true;
        }
    }
}

simulator = autoSimulate();

// fetch the grid with its input
function input()
{
    const pixels = document.getElementsByClassName('pixel');
    a = Math.sqrt(pixels.length);
    for (var i = 0; i < a; i++)
    {
        grid[i] = [];
        for (var j = 0; j < a; j++)
        {
            grid[i][j] = pixels[(i * a) + j].style.backgroundColor == 'white' ? 1 : 0; // set value based on color of current tick
        }
    }
}

// edit the grid to display the output
function output(ngrid)
{
    const pixels = document.getElementsByClassName('pixel'); // all pixels
    a = Math.sqrt(pixels.length);
    for (var i = 0; i < a; i++)
    {
        grid[i] = [];
        for (var j = 0; j < a; j++)
        {
            pixels[(i * a) + j].style.backgroundColor = ngrid[i][j] == 1 ? 'white' : 'rgba(128, 128, 128, 0.286'; // set color based on the next tick
        }
    }
}

// listen for start of input
window.addEventListener('mousedown', function()
{
    if (this.event.button == 0) draw = true; // left mouse button
    else if (this.event.button == 2) remove = true; // right mouse button
})

// listen for end of input
window.addEventListener('mouseup', function() {
    if (this.event.button == 0) draw = false; // left mouse button
    else if (this.event.button == 2) remove = false; // right mouse button
})