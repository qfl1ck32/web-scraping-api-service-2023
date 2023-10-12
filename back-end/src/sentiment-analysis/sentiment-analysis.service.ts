import { Injectable } from '@nestjs/common';

import { lexicon, stopwords } from './sentiment-analysis.constants';
import { Sentiment, TokenizedText } from './sentiment-analysis.defs';

@Injectable()
export class SentimentAnalysisService {
  private maxNGramLength: number;

  constructor() {
    this.maxNGramLength = 4;
  }

  private removePunctuation(text: string): string {
    return text.replace(/[.,!?;()]/g, '');
  }

  private basicPreprocess(text: string): string {
    const lower = text.toLowerCase();
    return this.removePunctuation(lower);
  }

  private tokenize(text: string): TokenizedText {
    const regex = /\b\w+\b/g;
    const tokens = [...text.matchAll(regex)];
    return tokens.map((match, index) => ({ token: match[0], index }));
  }

  private preprocessNGrams(text: string): TokenizedText {
    return this.tokenize(this.basicPreprocess(text));
  }

  private preprocessUnigrams(text: string): TokenizedText {
    const tokenized = this.tokenize(this.basicPreprocess(text));
    return tokenized.filter(({ token }) => !stopwords.has(token));
  }

  private calculateNGramsScore(nGramsText: TokenizedText): {
    score: number;
    usedCount: number;
    usedNGrams: TokenizedText[];
  } {
    let score = 0;
    let usedCount = 0;
    const usedNGrams: TokenizedText[] = [];

    let i = 0;
    while (i < nGramsText.length - this.maxNGramLength + 1) {
      let longestMatch = null;

      for (
        let nGramLength = this.maxNGramLength;
        nGramLength > 1;
        nGramLength--
      ) {
        const nGram = nGramsText.slice(i, i + nGramLength);
        const nGramText = nGram.map(({ token }) => token).join(' ');

        if (lexicon[nGramText]) {
          longestMatch = nGram;
          score += lexicon[nGramText];
          usedCount += 1;
          break;
        }
      }

      if (longestMatch) {
        usedNGrams.push(longestMatch);
        i += longestMatch.length;
      } else {
        i++;
      }
    }

    return { score, usedCount, usedNGrams };
  }

  private calculateUniGramsScore(uniGramsText: TokenizedText): {
    score: number;
    usedCount: number;
  } {
    let score = 0;
    let usedCount = 0;

    for (const { token } of uniGramsText) {
      if (lexicon[token]) {
        score += lexicon[token];
        usedCount += 1;
      }
    }

    return { score, usedCount };
  }

  public analyze(text: string): Sentiment {
    const nGramsText = this.preprocessNGrams(text);
    const initialUniGrams = this.preprocessUnigrams(text);

    const {
      score: nGramsScore,
      usedCount: usedNGramsCount,
      usedNGrams,
    } = this.calculateNGramsScore(nGramsText);

    const filteredUniGrams = initialUniGrams.filter(
      ({ index }) =>
        !usedNGrams.some((nGram) =>
          nGram.some((token) => token.index === index),
        ),
    );
    const { score: uniGramsScore, usedCount: usedUniGramsCount } =
      this.calculateUniGramsScore(filteredUniGrams);

    const totalScore = nGramsScore + uniGramsScore;
    const totalCount = usedNGramsCount + usedUniGramsCount;

    const finalScore = totalCount ? totalScore / totalCount : 0;
    const normalizedScore = Math.max(-1, Math.min(finalScore, 1));

    if (normalizedScore > 0.5) {
      return Sentiment.POSITIVE;
    }

    if (normalizedScore < -0.5) {
      return Sentiment.NEGATIVE;
    }

    return Sentiment.NEUTRAL;
  }
}
