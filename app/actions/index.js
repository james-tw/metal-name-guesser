
export const SELECT_WORD = 'SELECT_WORD'
export const DESELECT_WORD = 'DESELECT_WORD'

export function selectWord(word) {
    return {
        type: SELECT_WORD,
        word
    }
}

export function deselectWord(index) {
    return {
        type: DESELECT_WORD,
        index
    }
}



// const boundSelectWord = word => dispatch(selectWord(word));