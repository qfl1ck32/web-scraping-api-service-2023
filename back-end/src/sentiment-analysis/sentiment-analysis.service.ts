import { Injectable } from '@nestjs/common';

import { lexicon, stopwords } from './sentiment-analysis.constants';
import { Sentiment, TokenizedText } from './sentiment-analysis.defs';

@Injectable()
export class SentimentAnalysisService {
  private maxNGramLength: number;

  constructor() {
    this.maxNGramLength = 4;
  }

  /**
   * Removes punctuation from the given text.
   * @param text - The input text from which punctuation should be removed.
   * @returns The text without punctuation marks.
   */
  private removePunctuation(text: string): string {
    return text.replace(/[.,!?;()]/g, '');
  }

  /**
   * Performs basic preprocessing tasks: converting text to lowercase and removing punctuation.
   * @param text - The input text to preprocess.
   * @returns The preprocessed text.
   */
  private basicPreprocess(text: string): string {
    const lower = text.toLowerCase();
    return this.removePunctuation(lower);
  }

  /**
   * Tokenizes the given text into words and tracks their position/index.
   * @param text - The input text to tokenize.
   * @returns An array of tokenized words with their respective positions.
   */
  private tokenize(text: string): TokenizedText {
    const regex = /\b\w+\b/g;
    const tokens = [...text.matchAll(regex)];
    return tokens.map((match, index) => ({ token: match[0], index }));
  }

  /**
   * Preprocesses the text in preparation for n-gram sentiment analysis.
   * @param text - The input text to preprocess.
   * @returns An array of tokenized n-grams.
   */
  private preprocessNGrams(text: string): TokenizedText {
    return this.tokenize(this.basicPreprocess(text));
  }

  /**
   * Preprocesses the text for unigram sentiment analysis, filtering out stopwords.
   * @param text - The input text to preprocess.
   * @returns An array of tokenized unigrams after removing stopwords.
   */
  private preprocessUnigrams(text: string): TokenizedText {
    const tokenized = this.tokenize(this.basicPreprocess(text));
    return tokenized.filter(({ token }) => !stopwords.has(token));
  }

  /**
   * Calculates the sentiment score for n-grams found in the given text.
   * @param nGramsText - The tokenized text containing n-grams.
   * @returns An object containing the score, count of used n-grams, and the used n-grams themselves.
   */
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

  /**
   * Calculates the sentiment score for unigrams found in the given text.
   * @param uniGramsText - The tokenized text containing unigrams.
   * @returns An object containing the score and count of used unigrams.
   */
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

  /**
   * Analyzes the sentiment of the given text based on predefined lexicons.
   * @param text - The input text for sentiment analysis.
   * @returns The determined sentiment of the text (POSITIVE, NEGATIVE, NEUTRAL).
   */
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
