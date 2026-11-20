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

export function computeIdSimilarityScore(inputIdString: string, course: Course): number{
    //negative since a lower distance is better, now a distance of 1 will score better than a distance of 3 since (-1 > -3)
    return -computeLevenshteinDistance(inputIdString, course.id);
}

export function computeNameSimilarityScore(inputNameString: string, course: Course): number{
    inputNameString = inputNameString.toLowerCase().trim();
    const courseName = course.name.toLowerCase().trim();
    const keywords = course.keywords.map(x=>x.toLowerCase().trim());

    //special case for perfect match
    if(inputNameString.replaceAll(/[\s\p{P}]/giu, "") == courseName.replaceAll(/[\s\p{P}]/giu, "")){
        return Infinity;
    }

    let score = 0

    //loop through all words of input and courseName and use the best score found
    //this way inputs like "design" can still get good score for names like "game design"
    //since Levenshtein distance matches only left to right
    let matchScore = Infinity;
    for(const word of inputNameString.split(" ")){
        let bestWordScore = Math.min(...courseName.split(" ").map(x=>computeLevenshteinDistance(word, x)));

        if (bestWordScore < matchScore){
            matchScore = bestWordScore
        };
    }

    let keywordScore = Infinity;
    let exactKeywordMatches = 0;

    for(const word of inputNameString.split(" ")){
        let bestWordScore = Math.min(...keywords.map(x=>computeLevenshteinDistance(word, x)));

        if (bestWordScore == 0) exactKeywordMatches++;
        if (bestWordScore < keywordScore){
            keywordScore = bestWordScore
        };
    }

    //negative since a lower score is better
    score = -Math.min(matchScore, keywordScore) + exactKeywordMatches;
    
    return score;
}