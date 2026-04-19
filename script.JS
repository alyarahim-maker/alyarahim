const screen = document.getElementById('screen');
const storyInput = document.getElementById('storyInput');

function showPanel(type) {
    const calcPanel = document.getElementById('calcPanel');
    const storyPanel = document.getElementById('storyPanel');
    const btnCalc = document.getElementById('btnCalc');
    const btnStory = document.getElementById('btnStory');

    if(type === 'calc'){
        calcPanel.style.display = 'grid';
        storyPanel.style.display = 'none';
        btnCalc.className = 'mode-btn active';
        btnStory.className = 'mode-btn inactive';
    } else {
        calcPanel.style.display = 'none';
        storyPanel.style.display = 'flex';
        btnCalc.className = 'mode-btn inactive';
        btnStory.className = 'mode-btn active';
    }
}

function append(val){
    if(screen.innerText === '0' || screen.innerText.includes("adalah")){
        screen.innerText = val;
    } else {
        screen.innerText += val;
    }
}

function clearScreen(){
    screen.innerText = '0';
}

function calculate(){
    try{
        let result = eval(screen.innerText);
        screen.innerText = result;
    } catch{
        screen.innerText = "Error";
    }
}

function solveStory(){
    const text = storyInput.value.toLowerCase();
    const nums = text.match(/\d+/g);

    if(!nums || nums.length < 2){
        alert("Masukkan minimal 2 angka");
        return;
    }

    if(text.includes("siapa") && text.includes("nama")){
        screen.innerText = "Nama saya Aisyah, Alya, Amaliyah";
        showPanel('calc');
        return;
    }

    let a = parseInt(nums[0]);
    let b = parseInt(nums[1]);
    let hasil = a + b;

    screen.innerText = "Jawaban adalah " + hasil;
    showPanel('calc');
}
