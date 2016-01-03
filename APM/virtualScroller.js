/* CONSTANTS */
var HEADER_ROW_BOX_HEIGHT = 100;
var HEADER_COL_BOX_WIDTH = 200;
var PAGE_HEIGHT = 400;
var CELL_BUFFER_COUNT = 4;
var SCROLL_RESOLUTION_MILLISECONDS = 80;

setStandardColTotalHeight(standardIds);
setPartRowTotalWidth(partIds);
setConformanceGridTotalHeight(standardIds);
setConformanceGridTotalWidth(partIds);

populateStandardCol();
populatePartRow();
populateConformanceGrid();

/* EVENT HANDLERS */
var x = 0;
$('.header-row').scrolled(SCROLL_RESOLUTION_MILLISECONDS, function () {
    populatePartRow();
    $('#x-scroll-count').text(x += 1);
});

var gx = 0;
$('.grid').scrolled(SCROLL_RESOLUTION_MILLISECONDS, function () {
    populateConformanceGrid();
    $('#gx-scroll-count').text(x += 1);
});

var y = 0;
$('.header-col').scrolled(SCROLL_RESOLUTION_MILLISECONDS, function () {
    populateStandardCol();
    $('#y-scroll-count').text(y += 1);
});

$(document).keydown(function (e) {
    switch (e.which) {
        case 33: // page up
            console.log('page up');
            var scrollAmount = $('.header-col').scrollTop();
            $('.header-col').scrollTop(scrollAmount - PAGE_HEIGHT);
            break;

        case 34: // page down
            console.log('page down');
            var scrollAmount = $('.header-col').scrollTop();
            $('.header-col').scrollTop(scrollAmount + PAGE_HEIGHT);
            break;

        case 37: // left
            console.log('left');
            var scrollAmount = $('.header-row').scrollLeft();
            $('.header-row').scrollLeft(scrollAmount - HEADER_COL_BOX_WIDTH);
            break;

        case 38: // up
            console.log('up');
            var scrollAmount = $('.header-col').scrollTop();
            $('.header-col').scrollTop(scrollAmount - HEADER_ROW_BOX_HEIGHT);
            break;

        case 39: // right
            console.log('right');
            var scrollAmount = $('.header-row').scrollLeft();
            $('.header-row').scrollLeft(scrollAmount + HEADER_COL_BOX_WIDTH);
            break;

        case 40: // down
            console.log('down');
            var scrollAmount = $('.header-col').scrollTop();
            $('.header-col').scrollTop(scrollAmount + HEADER_ROW_BOX_HEIGHT);
            break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

/* CONFORMANCES */
function setConformanceGridTotalHeight(standardIds) {
    $('.grid .canvas').height(standardIds.length * HEADER_ROW_BOX_HEIGHT);
}

function setConformanceGridTotalWidth(partIds) {
    $('.grid .canvas').width(partIds.length * HEADER_COL_BOX_WIDTH);
}

function populateConformanceGrid() {
    var horizontalScrollAmount = $('.grid').scrollLeft();
    var firstRowCell = Math.floor(horizontalScrollAmount / HEADER_COL_BOX_WIDTH);
    var headerRowWidth = $('.grid').width();
    var numRowCellsShowing = Math.round(headerRowWidth / HEADER_COL_BOX_WIDTH);
    var numRowCellsShowingPlusBuffer = numRowCellsShowing + CELL_BUFFER_COUNT;

    var verticalScrollAmount = $('.grid').scrollTop();
    var firstColCell = Math.floor(verticalScrollAmount / HEADER_ROW_BOX_HEIGHT);
    var headerColHeight = $('.grid').height();
    var numColCellsShowing = Math.round(headerColHeight / HEADER_ROW_BOX_HEIGHT);
    var numColCellsShowingPlusBuffer = numColCellsShowing + CELL_BUFFER_COUNT;

    populateConformanceGridData(partIds, firstRowCell, Math.min(firstRowCell + numRowCellsShowingPlusBuffer + 1, partIds.length), standardIds, firstColCell, Math.min(firstColCell + numColCellsShowingPlusBuffer + 1, standardIds.length), conformancesByPartIdsByStandardId);
}

function populateConformanceGridData(partIds, firstPartId, lastPartId, standardIds, firstStandardId, lastStandardId, conformancesByPartIdsByStandardId) {
    var i, j, html = '';

    for (i = firstStandardId; i < lastStandardId; i++) {
        for (j = firstPartId; j < lastPartId; j++) {
            html += '<div class="grid-box" style="left:' + j * HEADER_COL_BOX_WIDTH + 'px; top:' + i * HEADER_ROW_BOX_HEIGHT + 'px">' + conformancesByPartIdsByStandardId[standardIds[i]][partIds[j]].status + '</div>';
        }
    }

    $('.grid .canvas').html(html);

    for (i = firstStandardId - 1; i >= Math.max(firstStandardId - CELL_BUFFER_COUNT, 0) ; i--) {
        for (j = firstPartId; j < lastPartId; j++) {
            $('.grid .canvas').prepend('<div class="grid-box" style="left:' + j * HEADER_COL_BOX_WIDTH + 'px; top:' + i * HEADER_ROW_BOX_HEIGHT + 'px">' + conformancesByPartIdsByStandardId[standardIds[i]][partIds[j]].status + '</div>');
        }
    }
}

/* STANDARDS */
function setStandardColTotalHeight(standardIds) {
    $('.header-col .canvas').height(standardIds.length * HEADER_ROW_BOX_HEIGHT + +getScrollBarWidth());
}

function populateStandardCol() {
    var scrollAmount = $('.header-col').scrollTop();
    var firstCell = Math.floor(scrollAmount / HEADER_ROW_BOX_HEIGHT);
    var headerColHeight = $('.header-col').height();
    var numCellsShowing = Math.round(headerColHeight / HEADER_ROW_BOX_HEIGHT);
    var numCellsShowingPlusBuffer = numCellsShowing + CELL_BUFFER_COUNT;
    populateStandardData(standardIds, firstCell, Math.min(firstCell + numCellsShowingPlusBuffer + 1, standardIds.length), standardsByStandardId);
}

function populateStandardData(standardIds, first, last, standardsByStandardId) {
    var i, length, html = '';

    for (i = first; i < last; i++) {
        html += '<div class="header-col-box" style="top:' + i * HEADER_ROW_BOX_HEIGHT + 'px">' + standardsByStandardId[standardIds[i]].name + '</div>';
    }

    $('.header-col .canvas').html(html);

    for (i = first - 1; i >= Math.max(first - CELL_BUFFER_COUNT, 0) ; i--) {
        $('.header-col .canvas').prepend('<div class="header-col-box" style="top:' + i * HEADER_ROW_BOX_HEIGHT + 'px">' + standardsByStandardId[standardIds[i]].name + '</div>');
    }
}

/* PARTS */
function setPartRowTotalWidth(partIds) {
    $('.header-row .canvas').width(partIds.length * HEADER_COL_BOX_WIDTH + getScrollBarWidth());
}

function populatePartRow() {
    var scrollAmount = $('.header-row').scrollLeft();
    var firstCell = Math.floor(scrollAmount / HEADER_COL_BOX_WIDTH);
    var headerRowWidth = $('.header-row').width();
    var numCellsShowing = Math.round(headerRowWidth / HEADER_COL_BOX_WIDTH);
    var numCellsShowingPlusBuffer = numCellsShowing + CELL_BUFFER_COUNT;
    populatePartData(partIds, firstCell, Math.min(firstCell + numCellsShowingPlusBuffer + 1, partIds.length), partsByPartId);
}

function populatePartData(partIds, first, last, partsByPartId) {
    var i, length, html = '';

    for (i = first; i < last; i++) {
        html += '<div class="header-row-box" style="left:' + i * HEADER_COL_BOX_WIDTH + 'px">' + partsByPartId[partIds[i]].name + '</div>';
    }

    $('.header-row .canvas').html(html);

    for (i = first - 1; i >= Math.max(first - CELL_BUFFER_COUNT, 0) ; i--) {
        $('.header-row .canvas').prepend('<div class="header-row-box" style="left:' + i * HEADER_COL_BOX_WIDTH + 'px">' + partsByPartId[partIds[i]].name + '</div>');
    }
}

/* HELPERS */
function getScrollBarWidth() {
    var inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";

    var outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild(inner);

    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 == w2) w2 = outer.clientWidth;

    document.body.removeChild(outer);

    return (w1 - w2);
};