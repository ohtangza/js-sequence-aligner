var aligner = require('./sequence-aligner.js');
var utils = require('./utils.js');

/*
var s1 = "GCATGCU";
var s2 = "GATTACA";

s1 = "CGTGAATTCAT";
s2 = "GACTTAC";
*/

var s1 = 'doctor told me that this was almost certainly a type of cancer that is incurable';
var s1 = "About a year ago I was diagnosed with cancer. I had a scan 730 in the morning clearly showed it to Morrow my pancreas. I didn't know what the pancreas what's. I talked to told me this was almost a year type of cancer that is incurable. And I should expect to leave no longer than 3 to 6 months. My doctor told me to go home and get my affairs in order.";
var s2 = "About a year ago I was diagnosed with cancer. I had a scan at 7:30 in the morning, and it clearly showed a tumor on my pancreas. I didn’t even know what a pancreas was. The doctors told me this was almost certainly a type of cancer that is incurable, and that I should expect to live no longer than three to six months. My doctor advised me to go home and get my affairs in order, which is doctor’s code for prepare to die. It means to try to tell your kids everything you thought you’d have the next 10 years to tell them in just a few months. It means to make sure everything is buttoned up so that it will be as easy as possible for your family. It means to say your goodbyes. I lived with that diagnosis all day. Later that evening I had a biopsy, where they stuck an endoscope down my throat, through my stomach and into my intestines, put a needle into my pancreas and got a few cells from the tumor. I was sedated, but my wife, who was there, told me that when they viewed the cells under a microscope the doctors started crying because it turned out to be a very rare form of pancreatic cancer that is curable with surgery. I had the surgery and I’m fine now.";

s1 = utils.preProcess(s1);
s2 = utils.preProcess(s2);

var result = aligner.align(s1, s2, {inDelChar: '-'});
//var result = aligner.alignment(s1, s2, {inDelChar: '-'});

// Print the result in vertical way
for (var i = 0; i < Math.max(result.s1.length, result.s2.length); i++) {
    console.log(result.s1[i] + ' \t ' + result.s2[i]);
}
