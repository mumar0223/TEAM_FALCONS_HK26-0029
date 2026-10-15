# ArthaDrishti

 <p align="center">
  <img src="./public/ArthaDrishti Visionary Markets Logo.png" alt="ArthaDrishti Logo" width="500" />
</p>

<p align="center">
  An AI-powered stock market sentiment tracker that connects financial news, public sentiment, and historical market movements to help users understand market trends.
</p>

---

## About the Project

**ArthaDrishti** is an AI-powered market intelligence platform designed to analyze financial news sentiment and compare it with observed stock market movements.

It helps users understand how financial news and public discussions relate to market sentiment through interactive visualizations, company insights, news analysis, and AI-powered explanations.

Our goal is to make market sentiment easier to understand through data-driven insights—not to predict stock prices with certainty.

## Key Features

- **AI-Powered Sentiment Analysis:** Classifies financial headlines as Positive, Negative, or Neutral.
- **Market Sentiment Dashboard:** Displays sentiment distribution and historical trends.
- **News Intelligence:** Collects financial headlines with source links and publication timestamps.
- **Price vs. Sentiment Analysis:** Compares historical stock prices with sentiment trends on a common timeline.
- **Company Comparison:** Compares sentiment across selected companies.
- **Sector Insights:** Provides a sector-level overview of market sentiment.
- **Watchlist:** Tracks sentiment for selected companies.
- **Sentiment Alerts:** Highlights unusual changes or spikes in sentiment.
- **AI Market Briefings:** Summarizes relevant news and explains the factors contributing to sentiment.
- **Text and Voice AI Agents:** Enables users to explore market insights through conversational interfaces.
- **Data Transparency:** Identifies whether information is live, delayed, cached, or demo data.

## How It Works

1. **Collect:** Gather financial news and permitted public discussion data from supported sources.
2. **Process:** Clean the collected data and remove duplicate headlines.
3. **Analyze:** Use a financial sentiment model such as FinBERT to classify headlines.
4. **Visualize:** Present sentiment distributions, historical trends, and market price comparisons.
5. **Explain:** Generate evidence-based summaries using relevant headlines and market metrics.
6. **Monitor:** Track selected companies and highlight significant sentiment changes.

## Initial Companies

The initial dashboard may include:

- Reliance Industries
- Tata Consultancy Services (TCS)
- Infosys
- HDFC Bank

Company coverage will depend on the availability and permissions of the selected data sources.

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | Streamlit or React |
| Backend | Python, FastAPI |
| Data Processing | Pandas |
| Sentiment Analysis | FinBERT |
| Visualizations | Plotly |
| Database | SQLite or PostgreSQL |
| AI Agents | Existing text and voice agents |
| Data Sources | Permitted financial news and market data APIs |

*The final stack may vary depending on implementation requirements.*

## Getting Started

### Prerequisites

- Python 3.10 or later
- Git
- API credentials for the selected data providers, if required

### Installation

**1. Clone the repository**

```bash
git clone <YOUR_REPOSITORY_URL>
cd ArthaDrishti
```

**2. Create a virtual environment**

```bash
python -m venv .venv
```

**3. Activate the environment**

Windows:

```bash
.venv\Scripts\activate
```

macOS/Linux:

```bash
source .venv/bin/activate
```

**4. Install dependencies**

If your repository includes a `requirements.txt` file:

```bash
pip install -r requirements.txt
```

**5. Configure environment variables**

Create a `.env` file in the project root and add the API keys required by your implementation.

```env
NEWS_API_KEY=your_news_api_key
MARKET_DATA_API_KEY=your_market_data_api_key
```

Use only the variables required by your chosen providers. Never commit real API keys or secrets to GitHub.

**6. Run the application**

For a Streamlit implementation:

```bash
streamlit run app.py
```

For a FastAPI backend:

```bash
uvicorn main:app --reload
```

Follow your project's actual entry points and configuration when running the application.

## Project Structure

```text
ArthaDrishti/
├── assets/
│   └── logo.png
├── frontend/
├── backend/
├── data/
├── models/
├── tests/
├── .env.example
├── .gitignore
├── requirements.txt
└── README.md
```

This is a suggested structure; folders can be adjusted to match the implementation.

## Data Transparency and Responsible Use

- Clearly label demo, cached, delayed, and live data.
- Display source links and publication timestamps wherever available.
- Show sentiment confidence as model confidence, not as the probability of a stock price increasing or decreasing.
- Explain that sentiment and stock price movements may not have a direct or causal relationship.
- Do not present AI-generated insights as guaranteed financial predictions.

## Project Scope

ArthaDrishti focuses on financial news sentiment, market movement comparisons, company insights, and AI-assisted explanations.

Automated trading, guaranteed price forecasting, portfolio management, subscription systems, and custom model training are outside the initial project scope.

## Future Enhancements

- Broader company and sector coverage
- Improved regional and multilingual financial news support
- Customizable sentiment alerts
- More advanced historical analysis
- Explainable AI insights with supporting evidence
- Enhanced text and voice interactions

## Disclaimer

ArthaDrishti is an informational and educational market intelligence project. It does not provide personalized investment advice, guarantee stock market outcomes, or recommend buying or selling securities. Market sentiment is not a reliable standalone predictor of future prices. Always conduct independent research before making financial decisions.

## Acknowledgements

Built as an AI and data-driven project exploring the relationship between financial news sentiment and market movements.

## License

A license has not yet been specified. Add a `LICENSE` file and update this section when the project license is decided.

---

<p align="center">
  <strong>ArthaDrishti — Markets Move. We Decode Why.</strong>
</p>
