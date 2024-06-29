const HandleSong = {
    next: (index: number, list: Array<any>) => {
        if (index >= list.length - 1) return 0
        return index + 1
    },
    prev: (index: number, list: Array<any>) => {
        if (index <= 0) return list.length - 1
        return index - 1
    },
    shuffle: (list: Array<any>) => shuffle(list)

}

function shuffle(array: Array<any>) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array
}

export { HandleSong }