# ArthaDrishti AI
### See Beyond the Market.

**ArthaDrishti AI** is an AI-powered stock market sentiment and financial intelligence platform designed to help users understand financial news, analyze market sentiment, and compare sentiment trends with observed stock-price movements.

The name combines **Artha** (wealth, finance, or economic value) with **Drishti** (vision or perspective), reflecting our goal of bringing clarity to complex financial information.

---

## 📌 Overview

Financial markets are influenced by company announcements, earnings reports, economic developments, regulatory changes, and public discussion. Understanding these factors across multiple sources can be challenging.

ArthaDrishti AI brings financial news, Natural Language Processing (NLP), sentiment analytics, and historical market data together in one platform.

**Our mission:** Transform complex financial information into clearer, evidence-based insights using AI.

## 🎯 Problem Statement

Financial information is distributed across multiple sources, making it difficult to:

- Understand the overall sentiment surrounding a company.
- Identify positive, negative, and neutral financial news.
- Track changes in sentiment over time.
- Compare news sentiment with stock-price movements.
- Identify unusual changes in financial news coverage.
- Distinguish live, delayed, cached, and sample data.

## 💡 Our Solution

ArthaDrishti AI uses AI-powered sentiment analysis and interactive visualizations to help users explore financial news and market trends.

The platform aims to:

1. Collect financial headlines from reliable sources.
2. Classify headlines as Positive, Negative, or Neutral.
3. Calculate sentiment distributions and trends.
4. Compare sentiment trends with historical stock prices.
5. Identify unusual increases in positive or negative news coverage.
6. Generate evidence-based AI market briefings.
7. Integrate existing voice and chat agents to answer questions about displayed information.

## 🚀 Key Features

### 📊 1. AI-Powered Sentiment Analysis
Analyze financial headlines using NLP models such as FinBERT to classify sentiment as:
- 🟢 Positive
- 🔴 Negative
- ⚪ Neutral

### 📈 2. Sentiment Dashboard
Display sentiment distributions, headline counts, and sentiment trends for selected companies and time periods.

### 📉 3. Stock Price vs. Sentiment Analysis
Compare historical stock prices with news sentiment on a shared timeline using clearly labelled charts.

### 📰 4. Financial News Explorer
Explore financial headlines with:
- Original article links
- Publisher information
- Publication timestamps
- Associated company
- Sentiment classification

### 👀 5. Company Watchlist
Track multiple companies and review their latest available market changes and sentiment summaries.

### 🚨 6. Sentiment Spike Alerts
Identify unusual increases in positive or negative news coverage and provide supporting headlines.

### ⚖️ 7. Company Comparison
Compare sentiment distributions for multiple companies over the same period.

### 🏭 8. Sector Sentiment Analysis
Explore sentiment across sectors such as:
- Information Technology
- Banking and Finance
- Automobiles
- Energy
- Pharmaceuticals

Sector insights depend on available and sufficiently mapped data.

### 🤖 9. AI Market Briefings
Generate concise summaries of notable financial developments using available headlines and supporting evidence.

### 🔍 10. Explainable Sentiment
Provide understandable explanations for sentiment classifications, grounded in the available headline or article text.

### 🎙️ 11. Voice and Chat Agent Integration
Integrate existing voice and chat agents to answer questions using the selected company, dashboard metrics, and supporting headlines.

### 🔄 12. Data Freshness Monitoring
Clearly indicate whether displayed information is live, delayed, cached, or demonstration data.

## ⚙️ How It Works

1. **Company Selection:** The user selects a company or supported sector.
2. **Data Collection:** The system retrieves financial news and historical market data.
3. **Data Processing:** Headlines are normalized, mapped to companies, and deduplicated where practical.
4. **Sentiment Classification:** An NLP model classifies headlines as positive, negative, or neutral.
5. **Analytics:** The system calculates sentiment distributions, trends, and comparisons.
6. **Visualization:** Interactive dashboards display market data and supporting news.
7. **AI Assistance:** Existing voice and chat agents can explain the displayed evidence where integration is available.

## 🛠️ Technology Stack

| Component | Proposed Technology |
|---|---|
| Programming Language | Python |
| Data Processing | Pandas |
| Sentiment Analysis | FinBERT |
| Data Visualization | Plotly |
| Dashboard | Streamlit or React |
| Backend API | FastAPI, if required |
| News Data | Permitted financial news APIs |
| Market Data | Suitable stock market data provider |
| Database | SQLite or PostgreSQL |
| AI Integration | Existing voice and chat agents |

*The final technology stack will depend on the implementation. Listing a technology here does not mean that its integration is already complete.*

## 🏗️ Project Architecture

```text
                 ArthaDrishti AI
                        |
             Company / Sector Selection
                        |
             +----------+----------+
             |                     |
       Financial News          Market Data
             |                     |
             +----------+----------+
                        |
                  Data Processing
                        |
              AI Sentiment Analysis
                        |
                 Analytics Engine
                        |
             +----------+----------+
             |                     |
       Interactive Dashboard   AI Briefings
             |
      News & Market Insights
             |
       Existing Voice / Chat Agents
```

## 📂 Getting Started

### Prerequisites

- Python 3.10 or a compatible version for the selected dependencies
- Git
- API keys for the selected news and market-data providers, if required

### Installation

Clone the repository:

```bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_REPOSITORY_DIRECTORY>
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it.

**Windows PowerShell:**

```powershell
.venv\Scripts\Activate.ps1
```

**macOS / Linux:**

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

If the application uses Streamlit with `app.py` as its entry point, launch it with:

```bash
streamlit run app.py
```

*Adjust these commands to match the actual repository structure and application entry point.*

## 🔐 Environment Configuration

Store API keys in environment variables or a local `.env` file.

Example `.env.example`:

```env
NEWS_API_KEY=
MARKET_DATA_API_KEY=
```

Add `.env` to `.gitignore` and never upload real API keys, access tokens, or private credentials to GitHub.

## 🗺️ Development Roadmap

- [ ] Develop the dashboard and company selector.
- [ ] Integrate financial news sources.
- [ ] Implement AI-based sentiment classification.
- [ ] Build sentiment distribution cards.
- [ ] Develop sentiment trend charts.
- [ ] Integrate historical stock-price data.
- [ ] Build price-versus-sentiment comparisons.
- [ ] Add news source links and timestamps.
- [ ] Implement watchlists and company comparisons.
- [ ] Develop sentiment spike alerts.
- [ ] Add evidence-based AI market briefings.
- [ ] Implement explainable sentiment analysis.
- [ ] Develop sector sentiment visualization.
- [ ] Integrate existing voice and chat agents.
- [ ] Add testing, deployment, and monitoring.

## 🛡️ Responsible AI and Disclaimer

ArthaDrishti AI is an informational and analytical platform, not a financial adviser.

- Sentiment classifications may be inaccurate.
- Model confidence is not the probability of a stock price rising or falling.
- Correlation between sentiment and price movement does not establish causation.
- Market data may be delayed, incomplete, or unavailable.
- The platform does not guarantee stock-price predictions or provide assured buy/sell signals.
- Users should independently verify information before making financial decisions.

## 🤝 Contributing

Contributions, suggestions, bug reports, and feature ideas are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Implement and test your changes.
4. Submit a pull request describing your contribution.

Please do not commit API keys or other sensitive information.

## 🌟 Acknowledgement

**ArthaDrishti AI — See Beyond the Market.**

Our vision is to use artificial intelligence responsibly to make complex financial information easier to understand and explore.

Through this project, we aim to combine innovation, data-driven thinking, and accessible technology to provide a clearer perspective on financial markets.

## 📄 License

Choose a license before distributing the project publicly. If you select an open-source license, add the corresponding `LICENSE` file to the repository.

---

*Built with AI, data, and a vision for smarter financial intelligence.*
