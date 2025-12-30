export function shuffleArray<T>(array: T[]): T[] {
    if (array.length < 2) return array;
    let newArray = [...array];
    let currentIndex: number = array.length;
    let randomIndex: number = 0;

    while (currentIndex > 0) {
        currentIndex--;
        randomIndex = Math.floor(Math.random() * (currentIndex + 1));
        [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex]!, newArray[currentIndex]!];
    }
    
    return newArray;
}