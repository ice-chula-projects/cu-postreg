import type { Course } from "./courses";

//https://medium.com/@ethannam/understanding-the-levenshtein-distance-equation-for-beginners-c4285a5604f0
export function computeLevenshteinDistance(stringA: string, stringB: string): number{
    stringA = stringA.trim();
    stringB = stringB.trim();
    const length = Math.max(stringA.length, stringB.length);

    stringA = stringA.padEnd(length, " ");
    stringB = stringB.padEnd(length, " ");
    
    const levenshteinMatrix: number[][] = [];

    for(let i = 0; i <= length; i++){
        levenshteinMatrix[i] = [];
        for(let j = 0; j <= length; j++){
            let levenshteinDistance: number;
            if(Math.min(i,j) == 0) levenshteinDistance = Math.max(i,j);
            else {
                const leftLevenshteinDistance = levenshteinMatrix[i-1]![j]! + 1;
                const upLevenshteinDistance = levenshteinMatrix[i]![j-1]! + 1;
                const diagonalLevenshteinDistance = levenshteinMatrix[i-1]![j-1]! + (stringA[i - 1] == stringB[j - 1]? 0 : 1);
                levenshteinDistance = Math.min(leftLevenshteinDistance, upLevenshteinDistance, diagonalLevenshteinDistance);
            }

            levenshteinMatrix[i]![j] = levenshteinDistance;
        }
    }
    return levenshteinMatrix[length]![length]!;
}

export function computeIdSimilarityScore(inputIdString: string, course: Course){
    //negative since a lower distance is better, now a distance of 1 will score better than a distance of 3 since (-1 > -3)
    return -computeLevenshteinDistance(inputIdString, course.id);
}