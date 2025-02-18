let cpuMode = 'normal'; // 初期状態は「普通のCPU」
let playerScore = 0;
let computerScore = 0;
let drawCount = 0;

function setCpuMode(mode){
    cpuMode = mode;
    alert(`CPUの強さを「${mode === 'weak' ? '弱い' : mode === 'strong' ? '強い' : '普通'}」に変更しました！`);
}

//画像のパスを設定
const choiceImage = {
    rock: 'img/rock.png',
    scissors: 'img/scissors.png',
    paper: 'img/paper.png'
}

function getComputerChoice(userChoice) {
    const choices = ['rock', 'scissors', 'paper'];

    if (cpuMode === 'weak') {
        // プレイヤーに負けやすい（60%の確率で負ける）
        if (userChoice === 'rock') return Math.random() < 0.6 ? 'scissors' : choices[Math.floor(Math.random() * 3)];
        if (userChoice === 'scissors') return Math.random() < 0.6 ? 'paper' : choices[Math.floor(Math.random() * 3)];
        if (userChoice === 'paper') return Math.random() < 0.6 ? 'rock' : choices[Math.floor(Math.random() * 3)];
    } else if (cpuMode === 'strong') {
        // プレイヤーに勝ちやすい（60%の確率で勝つ）
        if (userChoice === 'rock') return Math.random() < 0.6 ? 'paper' : choices[Math.floor(Math.random() * 3)];
        if (userChoice === 'scissors') return Math.random() < 0.6 ? 'rock' : choices[Math.floor(Math.random() * 3)];
        if (userChoice === 'paper') return Math.random() < 0.6 ? 'scissors' : choices[Math.floor(Math.random() * 3)];
    } else {
        // 普通のCPU（ランダム）
        return choices[Math.floor(Math.random() * 3)];
    }
}

function play(userChoice) {
    const computerChoice = getComputerChoice(userChoice); 

    let result = '';
    if (userChoice === computerChoice) {
        result = '引き分け';
        drawCount++; //引き分けのカウント＋１
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'scissors' && computerChoice === 'paper') ||
        (userChoice === 'paper' && computerChoice === 'rock')
    ) {
        result = 'あなたの勝ち!';
        playerScore++; //勝ち数を＋１増やす
    } else {
        result = 'あなたの負け!';
        computerScore++; //負け数＋１増やす（コンピュータが勝つ）
    }

    // 画像を更新する
    if (document.getElementById('yourChoiceImg')) {
        document.getElementById('yourChoiceImg').src = choiceImage[userChoice];
    } else {
        console.log("エラー: yourChoiceImg が見つからない");
    }

    if (document.getElementById('computerChoiceImg')) {
        document.getElementById('computerChoiceImg').src = choiceImage[computerChoice];
    } else {
        console.log("エラー: computerChoiceImg が見つからない");
    }

    //スコアを更新してHTMLに表示を行う
    if (document.getElementById('scoreboard')) {
        document.getElementById('scoreboard').innerText = `勝ち: ${playerScore} | 負け: ${computerScore} | 引き分け: ${drawCount}`;
    }


    alert(result);
}
