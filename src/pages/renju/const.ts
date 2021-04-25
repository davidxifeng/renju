const boardScale = Math.min(window.innerWidth, window.innerHeight) / 375


// 棋盘大小
export const BOARD_ROW_COUNT = 15
export const BOARD_COLUMN_COUNT = 15

// 棋盘显示大小
export const STAGE_WIDTH = Math.max(window.innerWidth, 375)
export const STAGE_HEIGHT = Math.max(window.innerHeight, 375)

// 棋盘格子宽度
export const GRID_GAP = 24 * boardScale

// 棋盘标记用格子宽度
export const TAG_RADIUS = 6 * boardScale

// 棋子半径
export const CHESS_RADIUS = 11 * boardScale

// 棋子上的文本宽度
export const ChessTextWidth = 30 * boardScale

// 棋子上的文本字体大小
export const ChessTextFontSize = 14 * boardScale