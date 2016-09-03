// Unit of calculation (Cell)
function Cell() {
  return {
      score: null,
      arrows: []
  };
}

module.exports = (function() {
    'use strict';
    // Utilities
    function formatNumberLength(num, length) {
        var r = "" + num;
        while (r.length < length) {
            r = " " + r;
        }
        return r;
    }

    function printTable(table, withArrow) {
        // console.log('*** Printed table ***');

        // console.log('Table size: ' + table.length + ' X ' + table[0].length);

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

    /**
     * Align two arrays (or strings)
     * @param   {Array}     s1
     * @param   {Array}     s2
     * @return  {Object}    object containing aligned array with key s1 and s2
     */
    function align(s1, s2, params) {
        // Algorithm: Needleman-Wunsch

        //console.log('s1: ' + s1);
        //console.log('s2: ' + s2);

        // Data
        var sRow = s1;
        var sCol = s2;

        // Parameters
        var sMatch = (params && params.sMatch) || 1;
        var sMismatch = (params && params.sMismatch) || -1;
        //var sGapStart = -1;
        var sGapCont = (params && params.sGapCont) || -1;
        var inDelChar = (params && params.inDelChar) || '-';

        // Grid table
        let table = [];

        // Initialize table
        // r: row, c: col
        for (let c = 0; c < sCol.length + 1; c++) {
            table[c] = [];

            for (var r = 0; r < sRow.length + 1; r++) {
                // Column index comes first because it is more human readable when being printed out in console
                table[c][r] = null;

                // Initialize table with Cell instance
                var cell = new Cell();
                if (c === 0 && r === 0) {
                    cell.score = 0;
                } else if (r === 0) {
                    cell.score = c * sGapCont;
                    cell.arrows.push('L');
                } else if (c === 0) {
                    cell.score = r * sGapCont;
                    cell.arrows.push('A');
                }
                table[c][r] = cell;
            }
        }
        // console.log('Table was created: ' + table[0].length + ' X ' + table.length);
        // printTable(table, false);

        // Note that tring index is different from 1 from r and c
        for (let r = 1; r <= sRow.length; r++) {
            for (let c = 1; c <= sCol.length; c++) {
                let cell = table[c][r];

                //console.log(r + ":" + sRow[r-1] + ' , ' + c + ":" + sCol[c-1]);
                var scoreMatch = table[c-1][r-1].score + (sCol[c-1] == sRow[r-1] ? sMatch : sMismatch);
                var scoreLeft = table[c-1][r].score + sGapCont;
                var scoreAbove = table[c][r-1].score + sGapCont;

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

        // console.log(table);
        // printTable(table, true);

        // Track back the arrows to rebuild the aligned strings
        var alignedRow = [];
        var alignedCol = [];

        for (let c = table.length - 1, r = table[0].length - 1; c > 0 || r > 0; ) {
            let arrows = table[c][r].arrows;
            //console.log(arrows);

            switch (arrows[0]) { // TODO: Only supports the first path (diagonal path in priority)
                case 'D':
                    alignedRow.push(sRow[r-1]); // PROBLEM!
                    alignedCol.push(sCol[c-1]);
                    r -= 1;
                    c -= 1;
                    break;

                case 'L':
                    alignedRow.push(inDelChar);
                    alignedCol.push(sCol[c-1]);
                    c -= 1;
                    break;

                case 'A':
                    alignedRow.push(sRow[r-1]);
                    alignedCol.push(inDelChar);
                    r -= 1;
                    break;
                default:
                    console.log();
                    console.error(`Arrow error at idx of c=${c}, r=${r}`);
                    process.exit();
                    break;

            }

        }

        alignedRow.reverse();
        alignedCol.reverse();

        //console.log(alignedRow);
        //console.log(alignedCol);

        return {
            s1: alignedRow,
            s2: alignedCol
        };
    }

    return {
        /* Public methods */
        align: align
    };
}());
