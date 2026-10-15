# Financial Market Sentiment Analysis — Problem Statement and Viva Q&A

## 1. Project Title
**AI-Powered Financial Market Sentiment Analysis Platform**

## 2. Problem Statement
Investor sentiment influences financial markets, but manually analyzing news articles, financial reports, and public discussions on social media is time-consuming and can be prone to bias. Investors and researchers need accessible tools to understand changing market sentiment and emerging public perceptions about companies and sectors.

The challenge is to develop an AI-powered platform that collects financial news and permitted public discussions, uses Natural Language Processing (NLP) to classify sentiment as **positive, negative, or neutral**, and presents results through interactive visualizations. The platform should support company-wise and sector-wise sentiment analysis, show how sentiment changes over time, compare sentiment trends with historical stock-price movements, and generate alerts when significant sentiment changes occur.

The system supports market research. It must not present sentiment as a guaranteed stock-price prediction or as financial advice.

## 3. Expected Solution
1. **Financial news collection:** Collect headlines and metadata from authorized APIs or permitted datasets.
2. **NLP sentiment classification:** Classify text as positive, negative, or neutral.
3. **Company-wise analysis:** Filter and aggregate sentiment for a company or ticker.
4. **Sector-wise analysis:** Compare sentiment across companies grouped by sector.
5. **Interactive dashboards:** Show sentiment distributions and trends over time.
6. **Stock-price comparison:** Compare sentiment with historical prices using aligned dates and clear chart labels.
7. **Significant-change alerts:** Flag unusual sentiment changes for human review.

## 4. Suggested Technologies

| Technology | Purpose |
|---|---|
| Python | Main programming language |
| Pandas | Data cleaning, processing, and aggregation |
| Scikit-learn | Baseline ML models and evaluation |
| FinBERT | Financial-domain sentiment classification |
| Financial news APIs | News headlines and metadata |
| Streamlit or React.js | User interface |
| Plotly | Interactive visualizations |
| Git and GitHub | Version control and collaboration |

Use only the technologies that are actually part of your implementation.

## 5. Project Objectives
- Reduce the time needed to review financial news.
- Classify financial text into positive, negative, and neutral sentiment.
- Explore sentiment at company and sector levels.
- Visualize sentiment trends over time.
- Compare sentiment with historical stock-price movements.
- Flag unusual sentiment changes for investigation.
- Support research while communicating uncertainty and limitations.

## 6. Complete Questions and Answers for Presentation and Viva

*These are model answers. Adapt implementation details to your actual project. Do not claim a feature is complete or an accuracy score has been achieved unless you have tested it.*

### A. Stock Market Fundamentals

**Q1. What is the stock market?**  
The stock market is a marketplace where investors buy and sell shares and other securities. It helps companies raise capital and gives investors an opportunity to invest in businesses.

**Q2. What is a share?**  
A share represents a unit of ownership in a company. Shareholders may benefit from price appreciation or declared dividends, but they can also lose money.

**Q3. Why do companies issue shares?**  
Companies may issue shares to raise money for expansion, projects, research, or other business needs.

**Q4. What is the primary market?**  
The primary market is where new securities are issued to investors, allowing issuers to raise funds.

**Q5. What is the secondary market?**  
The secondary market is where investors buy and sell existing securities with other investors.

**Q6. What is an IPO?**  
IPO stands for Initial Public Offering. It is an offering through which a company offers shares to public investors for the first time.

**Q7. What are NSE and BSE?**  
NSE stands for National Stock Exchange of India, and BSE is BSE Limited, formerly known as the Bombay Stock Exchange. Both are major Indian stock exchanges.

**Q8. What is SEBI?**  
SEBI stands for Securities and Exchange Board of India. It regulates India's securities market and works to protect investors and promote market development.

**Q9. What are Nifty 50 and Sensex?**  
Nifty 50 is a major index associated with NSE, while Sensex is a major index associated with BSE. They track selected groups of companies and indicate how those groups are performing.

**Q10. What is a bull market?**  
A bull market is a market experiencing a sustained upward trend, generally associated with rising prices and optimistic expectations.

**Q11. What is a bear market?**  
A bear market is a market experiencing a sustained downward trend, often associated with declining prices and pessimism.

**Q12. Why do stock prices rise and fall?**  
Prices change as buyers and sellers place orders. Company earnings, expectations, financial news, interest rates, economic conditions, government policies, and global events can affect demand and supply.

**Q13. What is a stock sector?**  
A sector is a group of companies operating in a similar area of the economy, such as banking, IT, healthcare, automobiles, or energy.

**Q14. What is market capitalization?**  
Market capitalization is the market value of a company's outstanding shares. Formula: `Market Cap = Current Share Price × Outstanding Shares`.

**Q15. What is volatility?**  
Volatility describes how much and how quickly a security's price changes over time.

**Q16. What is a dividend?**  
A dividend is a distribution a company may make to shareholders. It is not guaranteed and depends on the company's decision and applicable rules.

### B. Investor Sentiment

**Q17. What is investor sentiment?**  
Investor sentiment is the overall optimism, pessimism, confidence, or attitude investors express or feel about a company, sector, or market.

**Q18. What is sentiment analysis?**  
Sentiment analysis is an NLP task that analyzes text to identify its tone or expressed opinion. This project classifies text as positive, negative, or neutral.

**Q19. Why is sentiment analysis useful in finance?**  
Financial markets produce large volumes of news and public discussion. Sentiment analysis can summarize this information quickly and help users notice changing perceptions.

**Q20. What is positive sentiment?**  
Positive sentiment means the text expresses a favorable tone. Example: “The company reports record profits and raises its growth forecast.”

**Q21. What is negative sentiment?**  
Negative sentiment means the text expresses an unfavorable tone. Example: “The company reports a major loss and reduces its annual forecast.”

**Q22. What is neutral sentiment?**  
Neutral sentiment means the text is mainly factual or does not clearly express a favorable or unfavorable tone. Example: “The company schedules its annual general meeting.”

**Q23. Does positive sentiment always mean a stock price will rise?**  
No. Sentiment describes the tone of text, not a guaranteed price movement. Prices are affected by expectations, market conditions, other information, and many factors.

**Q24. Can good news cause a stock price to fall?**  
Yes. If investors expected even better results, apparently good news may disappoint them. The information may also already be reflected in the price.

**Q25. What is the difference between sentiment and stock-price prediction?**  
Sentiment analysis classifies text tone. Stock-price prediction estimates a future price or movement. This project analyzes sentiment and compares it with prices; it does not guarantee predictions.

### C. AI, NLP, and Models

**Q26. What is Artificial Intelligence?**  
AI is a field of computing that develops systems capable of tasks such as pattern recognition, language processing, and decision support.

**Q27. What is NLP?**  
Natural Language Processing enables computers to process and analyze human language. It is used in translation, text classification, chatbots, and sentiment analysis.

**Q28. What is FinBERT?**  
FinBERT is a language model adapted to financial text. Depending on the model checkpoint, it can classify financial text into positive, negative, and neutral sentiment.

**Q29. Why use FinBERT instead of keyword matching?**  
Keyword matching can miss context, negation, and mixed meanings. FinBERT uses contextual language representations adapted to financial text, although it can still make errors.

**Q30. What is Scikit-learn used for?**  
Scikit-learn is a Python machine-learning library. It can build baseline text classifiers, split datasets, calculate evaluation metrics, and compare models.

**Q31. What is the difference between Scikit-learn and FinBERT?**  
Scikit-learn is a general machine-learning library containing algorithms such as logistic regression and Naive Bayes. FinBERT is a pretrained transformer model adapted to financial text. They can be evaluated on the same labeled dataset.

**Q32. What is model training?**  
Model training is the process of learning patterns from data. A pretrained FinBERT checkpoint may already be trained; a project can use it directly or fine-tune it with labeled data.

**Q33. What is a confidence score?**  
A confidence score indicates how strongly a model favors a class under its scoring method. It should not be interpreted as the probability that a stock will rise or fall.

**Q34. What is text preprocessing?**  
Text preprocessing prepares text for analysis. It can include handling missing headlines, removing duplicates, normalizing metadata, and applying the model's required tokenizer. Avoid removing meaningful financial context.

**Q35. What is a labeled dataset?**  
A labeled dataset contains examples with known categories. In sentiment analysis, each text item has a label such as positive, negative, or neutral.

**Q36. What is overfitting?**  
Overfitting occurs when a model learns patterns specific to training data and performs poorly on unseen examples. A separate test set helps assess generalization.

### D. Data Collection and Processing

**Q37. What is an API?**  
An Application Programming Interface lets software applications communicate and exchange data. A financial news API may provide headlines, timestamps, source names, and other permitted metadata.

**Q38. How will you collect financial news?**  
A suitable implementation can use an authorized news API or a permitted dataset. The provider's terms, access limits, and data-use rules must be followed.

**Q39. What fields are useful in this project?**  
Useful fields include headline or text, source, publication timestamp, article URL where permitted, company or ticker, sector, sentiment label, model scores, and stock-price data where available.

**Q40. Why is data cleaning important?**  
It helps handle missing values, duplicates, inconsistent timestamps, and incorrect company mappings. Poor-quality data can create misleading trends.

**Q41. Why do timestamps matter?**  
Timestamps allow the system to group news by day or another interval and compare sentiment with prices over aligned periods. Time zones must be handled consistently.

**Q42. How will the system identify the correct company?**  
It can use ticker symbols, source metadata, company-name mappings, and entity-recognition methods. Ambiguous names should be checked to reduce incorrect associations.

**Q43. Can the system analyze social media?**  
It can analyze public discussions when platform terms, API permissions, and applicable privacy rules allow access. Social media data can be noisy, duplicated, manipulated, or unrepresentative.

**Q44. How will you handle duplicate news?**  
The system can detect exact duplicates using normalized text or source identifiers and use similarity checks for near-duplicates. Deduplication rules should be documented.

### E. Dashboard and Calculations

**Q45. Why use Pandas?**  
Pandas handles tabular data. It can clean news records, manage timestamps, group data by company or sector, calculate sentiment percentages, and prepare chart data.

**Q46. Why use Streamlit?**  
Streamlit is a Python framework for interactive data applications. It can create filters, tables, metrics, and charts without building a complete frontend from scratch.

**Q47. Why use Plotly?**  
Plotly creates interactive charts such as line, bar, and pie charts. Users can hover over points and explore trends.

**Q48. What is company-wise sentiment analysis?**  
It filters and summarizes classified news for one company or ticker over a selected period.

**Q49. What is sector-wise sentiment analysis?**  
It combines sentiment results for companies assigned to a sector and helps users compare patterns across industries.

**Q50. How do you calculate sentiment percentages?**  
For each category: `Category Percentage = (Category Count / Total Classified Items) × 100`.

**Q51. What is net sentiment?**  
One possible formula is `Net Sentiment = (Positive Count − Negative Count) / Total Classified Items`. It ranges from −1 to +1 when the total is greater than zero. Neutral items are included in the denominator in this version.

**Q52. Why compare sentiment with stock prices?**  
It helps users explore whether sentiment patterns occur alongside price movements. It can reveal patterns for further investigation but does not prove causation.

**Q53. How will you handle missing price data?**  
The system should show missing periods, avoid inventing values, and align available prices and sentiment by date and time zone. Any filling or interpolation must be documented.

### F. Alerts and Evaluation

**Q54. What are sentiment alerts?**  
Alerts flag unusually large changes in sentiment so users can review the related news. An alert is a prompt for investigation, not a trading instruction.

**Q55. How will you detect a significant change?**  
A basic method compares the latest score with a rolling average or configurable threshold. A more advanced method can consider historical variation. The method should account for small article counts.

**Q56. How will you evaluate the model?**  
Use a labeled test set not used for training. Calculate accuracy, precision, recall, F1-score, and a confusion matrix. Report actual results only after evaluation.

**Q57. What is accuracy?**  
Accuracy is the number of correct predictions divided by the total number of predictions. It can be misleading for imbalanced datasets, so use other metrics too.

**Q58. What are precision and recall?**  
Precision measures how many predictions for a class are correct. Recall measures how many actual examples of that class the model identifies.

**Q59. What is an F1-score?**  
F1-score combines precision and recall using their harmonic mean. It is useful when both false positives and false negatives matter.

**Q60. What are the limitations of this project?**  
News may be incomplete, delayed, or duplicated. Models may misinterpret sarcasm, context, and mixed sentiment. Company matching can fail, and prices are affected by many factors unrelated to analyzed text.

**Q61. How will you avoid misleading users?**  
Clearly label sources, time periods, sentiment calculations, and missing data. Distinguish sentiment from price movements and explain that results are for research, not guaranteed predictions or financial advice.

### G. Project Design and Future Scope

**Q62. Who can use this platform?**  
Students, researchers, analysts, and people interested in exploring financial news sentiment can use it as a research aid. It is not a replacement for professional financial analysis.

**Q63. What makes the project useful?**  
It brings news collection, sentiment classification, company and sector aggregation, trend visualization, and price comparison into one workflow.

**Q64. What are the future enhancements?**  
Possible improvements include scheduled news collection, more sectors and companies, multilingual analysis, improved company recognition, duplicate-news detection, notification delivery, explainability, and deployment.

**Q65. Can this project guarantee profit?**  
No. It does not guarantee profits or future prices. Market sentiment is only one possible source of information and should be combined with independent research and risk assessment.

**Q66. What is the practical impact of this project?**  
It can make large volumes of financial text easier to review, help users observe changing public perceptions, and support more organized market research. Its usefulness depends on data quality, model performance, and responsible interpretation.

## 7. Example Sentiment Calculation

Suppose the system classifies 100 headlines:
- Positive: 55
- Negative: 25
- Neutral: 20

Percentages are 55%, 25%, and 20%, respectively.

Using the stated net-sentiment formula:

`Net Sentiment = (55 − 25) / 100 = +0.30`

Interpretation: positive items outnumber negative items in this sample. It does not mean the share price will rise by 30%, and it does not predict the next day's return.

## 8. Example End-to-End Workflow

1. Collect news through an authorized API or permitted dataset.
2. Validate records and remove duplicates using documented rules.
3. Normalize timestamps and identify companies and sectors.
4. Pass text to the selected NLP model.
5. Store sentiment labels and model scores with permitted metadata.
6. Aggregate results by company, sector, and time period.
7. Load historical stock prices from a permitted source.
8. Align sentiment and price data by date and time zone.
9. Display charts, filters, headline tables, and sentiment alerts.
10. Evaluate model quality and document limitations.

## 9. Suggested Repository Structure

```text
financial-market-sentiment/
├── README.md
├── LICENSE
├── requirements.txt
├── .gitignore
├── .env.example
├── app.py
├── data/
│   └── README.md
├── src/
│   ├── data_collection.py
│   ├── preprocessing.py
│   ├── sentiment.py
│   ├── company_mapping.py
│   ├── analysis.py
│   ├── price_data.py
│   └── alerts.py
├── tests/
└── notebooks/
```

This is a suggested structure. Adjust it to match the files that actually exist in your repository. Never commit API keys, private data, or datasets you do not have permission to redistribute.

## 10. Short Presentation Script

My project is an AI-Powered Financial Market Sentiment Analysis Platform. Financial news and public discussions can be difficult to review manually because of their volume. My project aims to collect permitted financial text and use Natural Language Processing to classify it as positive, negative, or neutral. It then summarizes sentiment by company and sector, visualizes trends over time, compares them with historical stock prices, and flags significant changes for further investigation. The goal is to support faster and more organized market research. It does not guarantee stock-price predictions or provide financial advice.

## 11. Disclaimer

This project is for educational and informational purposes only. It is not investment, trading, legal, or financial advice. Sentiment classifications may be inaccurate or incomplete, and historical patterns do not guarantee future performance. Users should conduct independent research and consult qualified professionals where appropriate.

## 12. Before Your Viva

- Be able to explain every technology you actually use.
- Know your data source, its terms, and the fields collected.
- Demonstrate a working example from headline input to dashboard output.
- Explain how positive, negative, and neutral labels are assigned.
- Report model evaluation results only if you have measured them.
- Be ready to discuss missing data, duplicate news, company matching, and model errors.
- Do not claim the system predicts stock prices or guarantees profit.
