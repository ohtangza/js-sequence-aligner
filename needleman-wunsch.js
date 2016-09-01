var stem = require('stem-porter');

var stopWords = "a,able,about,above,abst,accordance,according,accordingly,across,act,actually,added,adj,\
affected,affecting,affects,after,afterwards,again,against,ah,all,almost,alone,along,already,also,although,\
always,am,among,amongst,an,and,announce,another,any,anybody,anyhow,anymore,anyone,anything,anyway,anyways,\
anywhere,apparently,approximately,are,aren,arent,arise,around,as,aside,ask,asking,at,auth,available,away,awfully,\
b,back,be,became,because,become,becomes,becoming,been,before,beforehand,begin,beginning,beginnings,begins,behind,\
being,believe,below,beside,besides,between,beyond,biol,both,brief,briefly,but,by,c,ca,came,can,cannot,can't,cause,causes,\
certain,certainly,co,com,come,comes,contain,containing,contains,could,couldnt,d,date,did,didn't,different,do,does,doesn't,\
doing,done,don't,down,downwards,due,during,e,each,ed,edu,effect,eg,eight,eighty,either,else,elsewhere,end,ending,enough,\
especially,et,et-al,etc,even,ever,every,everybody,everyone,everything,everywhere,ex,except,f,far,few,ff,fifth,first,five,fix,\
followed,following,follows,for,former,formerly,forth,found,four,from,further,furthermore,g,gave,get,gets,getting,give,given,gives,\
giving,go,goes,gone,got,gotten,h,had,happens,hardly,has,hasn't,have,haven't,having,he,hed,hence,her,here,hereafter,hereby,herein,\
heres,hereupon,hers,herself,hes,hi,hid,him,himself,his,hither,home,how,howbeit,however,hundred,i,id,ie,if,i'll,im,immediate,\
immediately,importance,important,in,inc,indeed,index,information,instead,into,invention,inward,is,isn't,it,itd,it'll,its,itself,\
i've,j,just,k,keep,keeps,kept,kg,km,know,known,knows,l,largely,last,lately,later,latter,latterly,least,less,lest,let,lets,like,\
liked,likely,line,little,'ll,look,looking,looks,ltd,m,made,mainly,make,makes,many,may,maybe,me,mean,means,meantime,meanwhile,\
merely,mg,might,million,miss,ml,more,moreover,most,mostly,mr,mrs,much,mug,must,my,myself,n,na,name,namely,nay,nd,near,nearly,\
necessarily,necessary,need,needs,neither,never,nevertheless,new,next,nine,ninety,no,nobody,non,none,nonetheless,noone,nor,\
normally,nos,not,noted,nothing,now,nowhere,o,obtain,obtained,obviously,of,off,often,oh,ok,okay,old,omitted,on,once,one,ones,\
only,onto,or,ord,other,others,otherwise,ought,our,ours,ourselves,out,outside,over,overall,owing,own,p,page,pages,part,\
particular,particularly,past,per,perhaps,placed,please,plus,poorly,possible,possibly,potentially,pp,predominantly,present,\
previously,primarily,probably,promptly,proud,provides,put,q,que,quickly,quite,qv,r,ran,rather,rd,re,readily,really,recent,\
recently,ref,refs,regarding,regardless,regards,related,relatively,research,respectively,resulted,resulting,results,right,run,s,\
said,same,saw,say,saying,says,sec,section,see,seeing,seem,seemed,seeming,seems,seen,self,selves,sent,seven,several,shall,she,shed,\
she'll,shes,should,shouldn't,show,showed,shown,showns,shows,significant,significantly,similar,similarly,since,six,slightly,so,\
some,somebody,somehow,someone,somethan,something,sometime,sometimes,somewhat,somewhere,soon,sorry,specifically,specified,specify,\
specifying,still,stop,strongly,sub,substantially,successfully,such,sufficiently,suggest,sup,sure,t,take,taken,taking,tell,tends,\
th,than,thank,thanks,thanx,that,that'll,thats,that've,the,their,theirs,them,themselves,then,thence,there,thereafter,thereby,\
thered,therefore,therein,there'll,thereof,therere,theres,thereto,thereupon,there've,these,they,theyd,they'll,theyre,they've,\
think,this,those,thou,though,thoughh,thousand,throug,through,throughout,thru,thus,til,tip,to,together,too,took,toward,towards,\
tried,tries,truly,try,trying,ts,twice,two,u,un,under,unfortunately,unless,unlike,unlikely,until,unto,up,upon,ups,us,use,used,\
useful,usefully,usefulness,uses,using,usually,v,value,various,'ve,very,via,viz,vol,vols,vs,w,want,wants,was,wasn't,way,we,wed,\
welcome,we'll,went,were,weren't,we've,what,whatever,what'll,whats,when,whence,whenever,where,whereafter,whereas,whereby,wherein,\
wheres,whereupon,wherever,whether,which,while,whim,whither,who,whod,whoever,whole,who'll,whom,whomever,whos,whose,why,widely,\
willing,wish,with,within,without,won't,words,world,would,wouldn't,www,x,y,yes,yet,you,youd,you'll,your,youre,yours,yourself,\
yourselves,you've,z,zero".split(',');

/*
var s1 = "GCATGCU";
var s2 = "GATTACA";

s1 = "CGTGAATTCAT";
s2 = "GACTTAC";
*/

var s2 = 'doctor told me that this was almost certainly a type of cancer that is incurable';
var s1 = "About a year ago I was diagnosed with cancer. I had a scan at 7:30 in the morning, and it clearly showed a tumor on my pancreas. I didn’t even know what a pancreas was. The doctors told me this was almost certainly a type of cancer that is incurable, and that I should expect to live no longer than three to six months. My doctor advised me to go home and get my affairs in order, which is doctor’s code for prepare to die. It means to try to tell your kids everything you thought you’d have the next 10 years to tell them in just a few months. It means to make sure everything is buttoned up so that it will be as easy as possible for your family. It means to say your goodbyes. I lived with that diagnosis all day. Later that evening I had a biopsy, where they stuck an endoscope down my throat, through my stomach and into my intestines, put a needle into my pancreas and got a few cells from the tumor. I was sedated, but my wife, who was there, told me that when they viewed the cells under a microscope the doctors started crying because it turned out to be a very rare form of pancreatic cancer that is curable with surgery. I had the surgery and I’m fine now.";

function preProcessing(str) {
    return str
        .toLowerCase()
        .replace(/\./g, '').replace(/\,/g, '')
        .split(' ')
        .map((word) => { return stem(word.trim()); })
        .filter((word) => { return stopWords.indexOf(word) == -1; });
}

s1 = preProcessing(s1);
s2 = preProcessing(s2);


// Base componence (Cell)
function Cell() {
  return {
      score: null,
      arrows: []
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
var sGapCont = -2;

var inDelChar = '-';

/*
    s1 is at row, s2 is at column
*/
var table = [];

// Utilities
function formatNumberLength(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = " " + r;
    }
    return r;
}

function printTable(table, withArrow) {
    console.log('*** Printed table ***');

    console.log('Table size: ' + table.length + ' X ' + table[0].length);

    for (var r = 0; r < table[0].length; r++) {
        var line = '';
        for (var c = 0; c < table.length; c++) {

            var cell = table[c][r];

            line += formatNumberLength(cell.score, 5);
            if (withArrow) {
                line += ' [' + formatNumberLength(cell.arrows, 5) + ']';
            }

            if (c < table.length - 1) {
                line += ',';
            }
        }
        console.log(line);
    }

}

// Initialize table
// r: row, c: col
for (var c = 0; c < sCol.length + 1; c++) {
    table[c] = [];

    for (var r = 0; r < sRow.length + 1; r++) {
        table[c][r] = null; // This index order makes more proper print-out in console

        var cell = new Cell();
        if (c === 0 && r === 0) {
            cell.score = 0;
        } else if (r === 0) {
            cell.score = c * sGapCont;
            cell.arrows.push('L')
        } else if (c === 0) {
            cell.score = r * sGapCont;
            cell.arrows.push('A');
        }
        table[c][r] = cell
    }
}
console.log('Table was created: ' + table[0].length + ' X ' + table.length);

printTable(table, false);

// Note that tring index is different from 1 from r and c
for (var r = 1; r <= sRow.length; r++) {
    for (var c = 1; c <= sCol.length; c++) {
        var cell = table[c][r];

        //console.log(r + ":" + sRow[r-1] + ' , ' + c + ":" + sCol[c-1]);
        var scoreMatch = table[c-1][r-1].score + (sCol[c-1] == sRow[r-1] ? sMatch : sMismatch);
        var scoreLeft = table[c-1][r].score + sGapCont;
        var scoreAbove = table[c][r-1].score + sGapCont; // TODO: Insert and Delete might be changed

        // TODO: Implement the panelty for InDel continuted!
        var updatedScore = Math.max(scoreMatch, scoreLeft, scoreAbove);
        cell.score = updatedScore;

        if (updatedScore == scoreMatch) {
            cell.arrows.push('D'); // diagonal
        }

        if (updatedScore == scoreLeft) {
            cell.arrows.push('L'); // left
        }

        if (updatedScore == scoreAbove) {
            cell.arrows.push('A'); // above
        }

        //console.log(table[c][r]);
    }
}

//console.log(table);

console.log('New');
printTable(table, true);

// Track back the arrows to rebuild the aligned strings
var alignedRow = [];
var alignedCol = [];

for (var c = table.length - 1, r = table[0].length - 1; c > 0 || r > 0; ) {
    var arrows = table[c][r].arrows;
    //console.log(arrows);

    switch (arrows[0]) { // TODO: Only supports the first path (diagonal path in priority)
        case 'D':
            alignedRow.push(sRow[r-1]); // PROBLEM!
            alignedCol.push(sCol[c-1]);
            r -= 1;
            c -= 1;
            break;

        case 'L':
            alignedRow.push('-');
            alignedCol.push(sCol[c-1]);
            c -= 1;
            break;

        case 'A':
            alignedRow.push(sRow[r-1]);
            alignedCol.push('-');
            r -= 1;
            break;

        default:
            console.log(c + " , " + r);
            console.error('Arrow error!');
            process.exit();
            break;

    }

}

alignedRow.reverse();
alignedCol.reverse();

//console.log(alignedRow);
//console.log(alignedCol);

for (var i = 0; i < Math.max(alignedRow.length, alignedCol.length); i++) {
    console.log(alignedRow[i] + ' \t ' + alignedCol[i]);
}

return ;

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
