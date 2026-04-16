/* script.js - Final Version for Amaliyah Ramadhani */

// 1. Inisialisasi Elemen
const screen = document.getElementById('screen');
const storyInput = document.getElementById('storyInput');

// 2. Fungsi Navigasi Tab
function showPanel(type) {
    const calcPanel = document.getElementById('calcPanel');
    const storyPanel = document.getElementById('storyPanel');
    const btnCalc = document.getElementById('btnCalc');
    const btnStory = document.getElementById('btnStory');

    if (type === 'calc') {
        calcPanel.style.display = 'grid';
        storyPanel.style.display = 'none';
        btnCalc.className = 'mode-btn active';
        btnStory.className = 'mode-btn inactive';
        // Reset ukuran font ke default kalkulator
        screen.style.fontSize = "60px";
    } else {
        calcPanel.style.display = 'none';
        storyPanel.style.display = 'flex';
        btnCalc.className = 'mode-btn inactive';
        btnStory.className = 'mode-btn active';
    }
}

// 3. Fungsi Kalkulator (Tetap Stabil)
function append(val) {
    // Jika layar sedang menampilkan kalimat, bersihkan dulu saat angka ditekan
    if (screen.innerText.includes("ame adalah") || screen.innerText === '0') {
        screen.innerText = val;
        screen.style.fontSize = "60px";
    } else {
        screen.innerText += val;
    }
}

function clearScreen() { 
    screen.innerText = '0'; 
    screen.style.fontSize = "60px";
}

function calculate() {
    try {
        let res = eval(screen.innerText.replace('×', '*').replace('÷', '/'));
        screen.innerText = Number.isInteger(res) ? res : res.toFixed(2);
    } catch {
        screen.innerText = "Error";
        setTimeout(clearScreen, 1500);
    }
}

// 4. Logika NLP (Pusat Perbaikan Jawaban)
function solveStory() {
    const text = storyInput.value.toLowerCase();
    const nums = text.match(/\d+(\.\d+)?/g);

    if (!nums || nums.length < 2) {
        alert("Harap masukkan minimal 2 angka agar alyaaa bisa menghitungnya!");
        return;
    }

    const a = parseFloat(nums[0]);
    const b = parseFloat(nums[1]);
    let result = 0;
    let kataBenda = "buku"; // Default jika tidak terdeteksi

    // Logika mengambil kata benda otomatis (kata setelah angka kedua)
    const words = text.split(/\s+/);
    const secondNumStr = nums[1];
    const index = words.findIndex(w => w.includes(secondNumStr));
    if (index !== -1 && words[index + 1]) {
        kataBenda = words[index + 1].replace(/[?.!,]/g, "");
    }

    // Kecilkan font agar kalimat panjang muat di satu baris layar
    screen.style.fontSize = "22px";

    // Hitung & Format Jawaban sesuai permintaan: "Sisa [benda] ame adalah [angka] [benda]"
    if (text.includes("tambah") || text.includes("dan") || text.includes("beli") || text.includes("total")) {
        result = a + b;
        screen.innerText = `Total ${kataBenda} ame adalah ${result} ${kataBenda}`;
    } else if (text.includes("kurang") || text.includes("sisa") || text.includes("makan") || text.includes("kasih") || text.includes("berikan")) {
        result = a - b;
        screen.innerText = `Sisa ${kataBenda} ame adalah ${result} ${kataBenda}`;
    } else if (text.includes("kali")) {
        result = a * b;
        screen.innerText = `Hasil kali ${kataBenda} ame adalah ${result} ${kataBenda}`;
    } else {
        result = a + b; // Default penjumlahan
        screen.innerText = `Hasilnya adalah ${result} ${kataBenda}`;
    }

    showPanel('calc'); // Kembali ke layar utama untuk melihat kalimat jawaban
}