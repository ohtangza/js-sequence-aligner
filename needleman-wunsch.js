var stem = require('stem-porter');

var s1 = "GCATGCU";
var s2 = "GATTACA";

/*
s1 = ['I', 'AM', 'HONORED', 'TO', 'BE', 'WITH', 'YOU', 'TODAY', 'AT', 'YOUR', 'GRADUATION'];
s2 = ['I', 'AM', 'VERY', 'HAPPY', 'TO', 'STAY', 'WITH', 'ME', 'AT', 'YOUR', 'COMMENCEMENT'];
// 순서가 중요하다!

s2 = "About a year ago I was diagnosed with cancer. I had a scan at 7:30 in the morning, and it clearly showed a tumor on my pancreas. I didn’t even know what a pancreas was. The doctors told me this was almost certainly a type of cancer that is incurable, and that I should expect to live no longer than three to six months. My doctor advised me to go home and get my affairs in order, which is doctor’s code for prepare to die. It means to try to tell your kids everything you thought you’d have the next 10 years to tell them in just a few months. It means to make sure everything is buttoned up so that it will be as easy as possible for your family. It means to say your goodbyes. I lived with that diagnosis all day. Later that evening I had a biopsy, where they stuck an endoscope down my throat, through my stomach and into my intestines, put a needle into my pancreas and got a few cells from the tumor. I was sedated, but my wife, who was there, told me that when they viewed the cells under a microscope the doctors started crying because it turned out to be a very rare form of pancreatic cancer that is curable with surgery. I had the surgery and I’m fine now.";
s2 = s2.toLowerCase().replace('.', '').replace(',', '').split(' ');
//console.log(s1);
s1 = 'doctor told me that this was almost certainly a type of cancer that is incurable'.split(' ');

s2 = s2.map((word) => { return stem(word); });
s1 = s1.map((word) => { return stem(word); });
//console.log(s1);
//console.log(s2);
*/

function Cell() {
  return {
      score: null,
      arrow: []
  };
}

Cell.prototype.toString = function() {
  return "" + this.score;
}

// Origianl string data
var sRow = s1;
var sCol = s2;

// Scores for cases
var sMatch = 1;
var sMismatch = -1;
//var sGapStart = -1;
var sGapCont = -1;

var blankChar = '-';

/*
    s1 is at row, s2 is at column
*/
var table = [];

// Initialize table
// r: row, c: col
for (var c = 0; c < sCol.length + 1; c++) {
    table[c] = [];

    for (var r = 0; r < sRow.length + 1; r++) {
        table[c][r] = null; // This index order makes more proper print-out in console

        var cell = new Cell();
        if (c === 0 && r === 0) {
            cell.score = 0;
            table[c][r] = cell;
        } else if (r === 0) {
            cell.score = c * sGapCont;
            table[c][r] = cell;
        } else if (c === 0) {
            cell.score = r * sGapCont;
            table[c][r] = cell;
        } else {
            table[c][r] = cell;
        }
    }
}

//console.log(table);
printTable(table);

// Note that tring index is different from 1 from r and c
for (var r = 1; r <= sRow.length; r++) {
    for (var c = 1; c <= sCol.length; c++) {
        //console.log(r + ":" + sRow[r-1] + ' , ' + c + ":" + sCol[c-1]);
        var scoreMatch = table[c-1][r-1].score + (sCol[c-1] == sRow[r-1] ? sMatch : sMismatch);
        var scoreInsert = table[c-1][r].score + sGapCont;
        var scoreDelete = table[c][r-1].score + sGapCont; // TODO: Insert and Delete might be changed

        // TODO: Implement the panelty for InDel continuted!
        //console.log(scoreMatch + ' / ' + scoreDelete + ' / ' + scoreInsert + '\n');
        table[c][r].score = Math.max(scoreMatch, scoreInsert, scoreDelete);
        //console.log(table[c][r]);
    }
}

console.log('New');
//console.log(table);
printTable(table);

var alignedRow = '';
var alignedCol = '';

for (var r = alignedRow.length; r > 0; r--) {
    for (var c = alignedCol.length; c >0; c--) {

        var diagonal = table[c-1][r-1];
        var above = table[c][r-1];
        var left = table[c-1][r];


    }
}

function formatNumberLength(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = " " + r;
    }
    return r;
}

function printTable(table) {
    for (var r = 0; r < table.length; r++) {
        var cols = table[r];
        var colsString = '';
        for (var c = 0; c < table.length; c++) {
            colsString += formatNumberLength(cols[c].score, 5) + ',';
        }
        console.log(colsString);
    }
}

// TODO:
// 1. 입력을 배열로 바꾸기
// 2. 뒤로 감을 때를 대비해서 화살표를 미리 입력해두기 (매우 중요한데, 왜냐하면 나는 패널티 방식이 더 복잡한 것을 지원해야 함))

//return ;


var sp = 1; // match bonus
var gp = -1; // gap panelty
var gc = "-";
// Gap open cost, cap cont'd cost

//generate grid array
var arr = [];

for(var i=0;i<=s2.length;i++) {
    arr[i] = [];

    for(var j=0;j<=s1.length;j++) {
        arr[i][j] = null;
    }
}

arr[0][0] = 0;

for(var i=1;i<=s2.length;i++) {
    arr[0][i] = arr[i][0] = -1 * i;
}

for(var i=1;i<=s2.length;i++) {
    for(var j=1;j<=s1.length;j++) {
        arr[i][j] = Math.max(
            arr[i-1][j-1] + (s2[i-1] === s1[j-1] ? sp : gp),
            arr[i-1][j] + gp,
            arr[i][j-1] + gp
        );
    }
}

var as1 = "";
var as2 = "";

//console.log(arr);

var i = s2.length;
var j = s1.length;
var sq1 = [];
var sq2 = [];

do {
    var t = arr[i-1][j];
    var d = arr[i-1][j-1];
    var l = arr[i][j-1];
    var max = Math.max(t, d, l);

    switch(max) {
        case t:
            i--;
            sq1.push(gc);
            sq2.push(s2[i]);
            break;
        case d:
            j--;
            i--;
            sq1.push(s1[j]);
            sq2.push(s2[i]);
            break;
        case l:
            j--;
            sq1.push(s1[j]);
            sq2.push(gc);
            break;
    }

} while(i>0 && j>0);
console.log('Old');
console.log(arr);

console.log(sq1.reverse());
console.log(sq2.reverse());
