import json
from pathlib import Path

import numpy as np
import pandas as pd


OUTPUT_DIR = Path(__file__).resolve().parent
OUTPUT_PATH = OUTPUT_DIR / "artifact.json"
DATA_DIR = Path(
    "/Users/mohammad/Downloads/calkilo.com-Performance-on-Search-2026-07-21"
)
GENERATED_AT = "2026-07-21T00:00:00+03:30"


def load_export(name):
    frame = pd.read_csv(DATA_DIR / f"{name}.csv")
    if "CTR" in frame.columns:
        frame["CTR_numeric"] = frame["CTR"].str.rstrip("%").astype(float) / 100
    return frame


chart = load_export("Chart")
countries = load_export("Countries")
devices = load_export("Devices")
pages = load_export("Pages")
queries = load_export("Queries")
chart["Date"] = pd.to_datetime(chart["Date"])


def period_metrics(frame):
    return {
        "clicks": int(frame["Clicks"].sum()),
        "impressions": int(frame["Impressions"].sum()),
        "ctr": float(frame["Clicks"].sum() / frame["Impressions"].sum()),
        "position": float(np.average(frame["Position"], weights=frame["Impressions"])),
    }


first_30 = period_metrics(chart.head(30))
last_30 = period_metrics(chart.tail(30))
period_row = {
    "window": "Last 30 days",
    "clicks": last_30["clicks"],
    "impressions": last_30["impressions"],
    "ctr": last_30["ctr"],
    "position": last_30["position"],
    "first_30_clicks": first_30["clicks"],
    "first_30_impressions": first_30["impressions"],
    "first_30_ctr": first_30["ctr"],
    "first_30_position": first_30["position"],
    "click_change": last_30["clicks"] / first_30["clicks"] - 1,
    "ctr_change": last_30["ctr"] - first_30["ctr"],
}

weekly_source = chart.assign(
    position_x_impressions=chart["Position"] * chart["Impressions"]
).set_index("Date").resample("W-SUN").agg(
    Clicks=("Clicks", "sum"),
    Impressions=("Impressions", "sum"),
    position_x_impressions=("position_x_impressions", "sum"),
)
weekly_source["ctr"] = weekly_source["Clicks"] / weekly_source["Impressions"]
weekly_source["position"] = (
    weekly_source["position_x_impressions"] / weekly_source["Impressions"]
)
weekly_rows = [
    {
        "week": index.date().isoformat(),
        "clicks": int(row["Clicks"]),
        "impressions": int(row["Impressions"]),
        "ctr": float(row["ctr"]),
        "position": float(row["position"]),
    }
    for index, row in weekly_source.iterrows()
]

page_rows = []
page_click_total = int(pages["Clicks"].sum())
for _, row in pages.sort_values("Clicks", ascending=False).head(6).iterrows():
    page_url = row["Top pages"]
    label = page_url.replace("https://calkilo.com", "") or "/"
    page_rows.append(
        {
            "page": label,
            "url": page_url,
            "clicks": int(row["Clicks"]),
            "impressions": int(row["Impressions"]),
            "ctr": float(row["CTR_numeric"]),
            "position": float(row["Position"]),
            "click_share": float(row["Clicks"] / page_click_total),
        }
    )

top_page = page_rows[0]
page_summary_row = {
    "page": top_page["page"],
    "clicks": top_page["clicks"],
    "impressions": top_page["impressions"],
    "ctr": top_page["ctr"],
    "position": top_page["position"],
    "click_share": top_page["click_share"],
}


def scenario_ctr(position):
    if position <= 3:
        return 0.12
    if position <= 5:
        return 0.07
    if position <= 10:
        return 0.035
    if position <= 20:
        return 0.015
    return 0.005


query_opportunities = queries.copy()
query_opportunities["scenario_ctr"] = query_opportunities["Position"].map(scenario_ctr)
query_opportunities["scenario_gain"] = (
    query_opportunities["Impressions"] * query_opportunities["scenario_ctr"]
    - query_opportunities["Clicks"]
).clip(lower=0)
query_opportunities = query_opportunities[
    query_opportunities["Top queries"]
    != "calorie counting recipes for photographers"
]
priority_query_rows = []
for _, row in query_opportunities[
    query_opportunities["Impressions"] >= 100
].sort_values(["scenario_gain", "Impressions"], ascending=False).head(10).iterrows():
    priority_query_rows.append(
        {
            "query": row["Top queries"],
            "clicks": int(row["Clicks"]),
            "impressions": int(row["Impressions"]),
            "ctr": float(row["CTR_numeric"]),
            "position": float(row["Position"]),
            "scenario_ctr": float(row["scenario_ctr"]),
            "scenario_gain": float(row["scenario_gain"]),
        }
    )

generic_terms = ["کالری شمار غذا انلاین", "کالری شمار رایگان", "کالری شمار"]
generic_rows = []
for term in generic_terms:
    row = query_opportunities[query_opportunities["Top queries"] == term].iloc[0]
    generic_rows.append(
        {
            "query": term,
            "clicks": int(row["Clicks"]),
            "impressions": int(row["Impressions"]),
            "ctr": float(row["CTR_numeric"]),
            "position": float(row["Position"]),
            "scenario_ctr": 0.035,
            "scenario_gain": float(max(0, row["Impressions"] * 0.035 - row["Clicks"])),
        }
    )

device_rows = [
    {
        "device": row["Device"],
        "clicks": int(row["Clicks"]),
        "impressions": int(row["Impressions"]),
        "ctr": float(row["CTR_numeric"]),
        "position": float(row["Position"]),
        "click_share": float(row["Clicks"] / devices["Clicks"].sum()),
    }
    for _, row in devices.iterrows()
]

country_rows = [
    {
        "country": row["Country"],
        "clicks": int(row["Clicks"]),
        "impressions": int(row["Impressions"]),
        "ctr": float(row["CTR_numeric"]),
        "position": float(row["Position"]),
        "click_share": float(row["Clicks"] / countries["Clicks"].sum()),
    }
    for _, row in countries.sort_values("Impressions", ascending=False).head(12).iterrows()
]

anomaly_row = queries[
    queries["Top queries"] == "calorie counting recipes for photographers"
].iloc[0]
anomaly_rows = [
    {
        "query": anomaly_row["Top queries"],
        "clicks": int(anomaly_row["Clicks"]),
        "impressions": int(anomaly_row["Impressions"]),
        "ctr": float(anomaly_row["CTR_numeric"]),
        "position": float(anomaly_row["Position"]),
    }
]

source_dir = str(DATA_DIR)
sources = [
    {
        "id": "gsc_bundle",
        "label": "Google Search Console export bundle — July 21, 2026",
        "path": source_dir,
        "query": {
            "engine": "Google Search Console",
            "description": "Web search performance export for Calkilo covering the last three months.",
            "executed_at": GENERATED_AT,
            "filters": ["Search type: Web", "Date: Last 3 months"],
            "tables_used": [
                "Chart.csv",
                "Countries.csv",
                "Devices.csv",
                "Pages.csv",
                "Queries.csv",
                "Search appearance.csv",
                "Filters.csv",
            ],
            "metric_definitions": [
                "CTR = clicks / impressions.",
                "Average position is impression-weighted for aggregated period comparisons.",
                "Query rows are privacy-limited and do not reconcile to top-line totals.",
            ],
        },
    },
    {
        "id": "gsc_chart",
        "label": "Google Search Console daily performance",
        "path": str(DATA_DIR / "Chart.csv"),
        "query": {
            "engine": "Google Search Console",
            "description": "Daily clicks, impressions, CTR, and average position.",
            "executed_at": GENERATED_AT,
            "filters": ["Search type: Web", "April 20–July 19, 2026"],
            "tables_used": ["Chart.csv"],
            "metric_definitions": [
                "Weekly clicks and impressions are sums of daily values.",
                "Weekly CTR = weekly clicks / weekly impressions.",
                "Weekly position is weighted by daily impressions.",
            ],
        },
    },
    {
        "id": "gsc_pages",
        "label": "Google Search Console landing pages",
        "path": str(DATA_DIR / "Pages.csv"),
        "query": {
            "engine": "Google Search Console",
            "description": "Page-level search performance ranked by clicks.",
            "executed_at": GENERATED_AT,
            "filters": ["Search type: Web", "Date: Last 3 months"],
            "tables_used": ["Pages.csv"],
            "metric_definitions": ["Page click share = page clicks / all clicks in Pages.csv."],
        },
    },
    {
        "id": "gsc_queries",
        "label": "Google Search Console visible queries",
        "path": str(DATA_DIR / "Queries.csv"),
        "query": {
            "engine": "Google Search Console",
            "description": "Visible query performance with a rank-band CTR scenario.",
            "executed_at": GENERATED_AT,
            "filters": [
                "Search type: Web",
                "Date: Last 3 months",
                "Suspicious photographer query excluded from opportunity totals",
            ],
            "tables_used": ["Queries.csv"],
            "metric_definitions": [
                "Scenario click gain = max(0, impressions × scenario CTR − clicks).",
                "Scenario CTR bands: 12% for positions 1–3, 7% for 4–5, 3.5% for 6–10, 1.5% for 11–20, and 0.5% thereafter.",
                "The scenario is directional, not a forecast.",
            ],
        },
    },
    {
        "id": "google_title_guidance",
        "label": "Google Search Central — title links",
        "href": "https://developers.google.com/search/docs/appearance/title-link",
    },
    {
        "id": "google_snippet_guidance",
        "label": "Google Search Central — snippets",
        "href": "https://developers.google.com/search/docs/appearance/snippet",
    },
    {
        "id": "google_helpful_content",
        "label": "Google Search Central — helpful, people-first content",
        "href": "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
    },
    {
        "id": "live_english_page",
        "label": "Calkilo English photo calorie calculator page",
        "href": "https://calkilo.com/photo-calorie-calculator/",
    },
]

# File-backed Search Console exports use direct path provenance. Query metadata is
# reserved by the artifact contract for executable SQL-backed sources.
for source in sources:
    if source.get("path"):
        source.pop("query", None)

source_by_id = {source["id"]: source for source in sources}
chart_path = (DATA_DIR / "Chart.csv").as_posix()
pages_path = (DATA_DIR / "Pages.csv").as_posix()
queries_path = (DATA_DIR / "Queries.csv").as_posix()

source_by_id["gsc_bundle"]["query"] = {
    "engine": "DuckDB",
    "language": "sql",
    "executed_at": GENERATED_AT,
    "description": "Reconciles the top-line, page, and visible-query metrics used in the executive summary.",
    "tables_used": ["Chart.csv", "Pages.csv", "Queries.csv"],
    "filters": ["Search type: Web", "April 20–July 19, 2026"],
    "metric_definitions": [
        "CTR = clicks / impressions.",
        "Top-page share uses the Pages.csv click total as its denominator.",
        "Generic-query scenario uses a 3.5% CTR and holds impressions constant.",
    ],
    "sql": f"""WITH
chart AS (SELECT * FROM read_csv_auto('{chart_path}', header=true)),
pages AS (SELECT * FROM read_csv_auto('{pages_path}', header=true)),
queries AS (SELECT * FROM read_csv_auto('{queries_path}', header=true)),
generic AS (
  SELECT SUM(Clicks) AS clicks, SUM(Impressions) AS impressions
  FROM queries
  WHERE \"Top queries\" IN ('کالری شمار غذا انلاین', 'کالری شمار رایگان', 'کالری شمار')
),
top_page AS (
  SELECT Clicks, Impressions, \"Top pages\"
  FROM pages
  ORDER BY Clicks DESC
  LIMIT 1
)
SELECT
  (SELECT SUM(Clicks) FROM chart) AS total_clicks,
  (SELECT SUM(Impressions) FROM chart) AS total_impressions,
  (SELECT Clicks FROM top_page) AS top_page_clicks,
  (SELECT Clicks FROM top_page) / (SELECT SUM(Clicks) FROM pages) AS top_page_click_share,
  (SELECT clicks FROM generic) AS generic_clicks,
  (SELECT impressions FROM generic) AS generic_impressions,
  (SELECT clicks FROM generic) / (SELECT impressions FROM generic) AS generic_ctr,
  (SELECT impressions * 0.035 - clicks FROM generic) AS generic_scenario_gain""",
}

source_by_id["gsc_chart"]["query"] = {
    "engine": "DuckDB",
    "language": "sql",
    "executed_at": GENERATED_AT,
    "description": "Aggregates the daily Search Console export into Monday–Sunday weeks.",
    "tables_used": ["Chart.csv"],
    "filters": ["Search type: Web", "April 20–July 19, 2026"],
    "metric_definitions": [
        "Weekly clicks and impressions are sums of daily values.",
        "Weekly CTR = weekly clicks / weekly impressions.",
        "Weekly position is weighted by daily impressions.",
    ],
    "sql": f"""WITH daily AS (
  SELECT CAST(Date AS DATE) AS date, Clicks, Impressions, Position
  FROM read_csv_auto('{chart_path}', header=true)
)
SELECT
  CAST(date_trunc('week', date) + INTERVAL '6 days' AS DATE) AS week,
  SUM(Clicks) AS clicks,
  SUM(Impressions) AS impressions,
  SUM(Clicks) / SUM(Impressions) AS ctr,
  SUM(Position * Impressions) / SUM(Impressions) AS position
FROM daily
GROUP BY 1
ORDER BY 1""",
}

source_by_id["gsc_pages"]["query"] = {
    "engine": "DuckDB",
    "language": "sql",
    "executed_at": GENERATED_AT,
    "description": "Ranks landing pages by clicks and calculates page-export click share.",
    "tables_used": ["Pages.csv"],
    "filters": ["Search type: Web", "Date: Last 3 months", "Top six pages by clicks"],
    "metric_definitions": ["Page click share = page clicks / all clicks in Pages.csv."],
    "sql": f"""WITH pages AS (
  SELECT * FROM read_csv_auto('{pages_path}', header=true)
)
SELECT
  \"Top pages\" AS page,
  Clicks AS clicks,
  Impressions AS impressions,
  Clicks / Impressions AS ctr,
  Position AS position,
  Clicks / SUM(Clicks) OVER () AS click_share
FROM pages
ORDER BY clicks DESC
LIMIT 6""",
}

source_by_id["gsc_queries"]["query"] = {
    "engine": "DuckDB",
    "language": "sql",
    "executed_at": GENERATED_AT,
    "description": "Ranks visible queries by a conservative rank-band CTR scenario.",
    "tables_used": ["Queries.csv"],
    "filters": [
        "Search type: Web",
        "Date: Last 3 months",
        "At least 100 impressions for the detail table",
        "Suspicious photographer query excluded from opportunity totals",
    ],
    "metric_definitions": [
        "Scenario click gain = max(0, impressions × scenario CTR − clicks).",
        "Scenario CTR bands: 12% for positions 1–3, 7% for 4–5, 3.5% for 6–10, 1.5% for 11–20, and 0.5% thereafter.",
        "The scenario is directional, not a forecast.",
    ],
    "sql": f"""WITH queries AS (
  SELECT *,
    CASE
      WHEN Position <= 3 THEN 0.12
      WHEN Position <= 5 THEN 0.07
      WHEN Position <= 10 THEN 0.035
      WHEN Position <= 20 THEN 0.015
      ELSE 0.005
    END AS scenario_ctr
  FROM read_csv_auto('{queries_path}', header=true)
)
SELECT
  \"Top queries\" AS query,
  Clicks AS clicks,
  Impressions AS impressions,
  Clicks / Impressions AS ctr,
  Position AS position,
  scenario_ctr,
  greatest(0, Impressions * scenario_ctr - Clicks) AS scenario_gain
FROM queries
WHERE Impressions >= 100
  AND \"Top queries\" <> 'calorie counting recipes for photographers'
ORDER BY scenario_gain DESC, impressions DESC""",
}

manifest = {
    "version": 1,
    "surface": "report",
    "title": "Calkilo Search Performance: Where to Focus Next",
    "description": "A decision-ready analysis of Calkilo's Google Search Console performance and the highest-priority SEO actions.",
    "generatedAt": GENERATED_AT,
    "sources": sources,
    "blocks": [
        {
            "id": "title",
            "type": "markdown",
            "body": "# Calkilo Search Performance: Where to Focus Next",
        },
        {
            "id": "executive_summary",
            "type": "markdown",
            "sourceId": "gsc_bundle",
            "body": "## Executive Summary\n\n- **Search visibility is accelerating.** The last 30 days delivered **805 clicks**, up from **109** in the first 30 days, while CTR improved from **3.39% to 4.33%** and weighted position improved from **8.00 to 7.19**.\n- **The fastest safe gain is generic Persian intent.** Three high-volume queries produced **3,787 impressions but only 58 clicks (1.53% CTR)**. Reaching a modest 3.5% CTR at the current rank would add about **75 clicks per 90 days**.\n- **Do not treat every impression as opportunity.** The largest visible query — `calorie counting recipes for photographers` — produced **2,514 impressions and zero clicks** and appears irrelevant. Diagnose it before changing the English landing page.\n- **Concentration is the strategic risk.** `/fa/photo-calorie-calculator/` contributes **64.3%** of page-export clicks. Protect it, then build a second growth engine around generic Persian and Italian intent.",
        },
        {
            "id": "headline_metrics",
            "type": "metric-strip",
            "cardIds": ["last_30_clicks", "last_30_ctr", "top_page_share"],
        },
        {
            "id": "growth_section",
            "type": "markdown",
            "sourceId": "gsc_chart",
            "body": "## Growth is real, but the latest week broadened\n\n**The underlying direction is strongly positive.** Last-30-day clicks were 7.4× the first-30-day level, supported by both more impressions and better CTR. The final week still produced 226 clicks, but impressions rose to 6,075 while CTR fell from 5.07% to 3.72% and weighted position slipped from 6.67 to 7.36.\n\nThis one-week move is not yet a trend. It is consistent with Google showing the site for a broader set of queries — some relevant and some not — so the next monitoring step should separate branded, photo-intent, generic-calorie, and irrelevant queries.",
        },
        {"id": "weekly_chart_block", "type": "chart", "chartId": "weekly_clicks"},
        {
            "id": "concentration_section",
            "type": "markdown",
            "sourceId": "gsc_pages",
            "body": "## One Persian page carries most of the result\n\n**The Persian photo-calorie page is the asset to protect.** It generated 777 clicks and 15,736 impressions at 4.94% CTR and position 6.20. The top three pages together account for 84.4% of page-export clicks.\n\nThat concentration makes large title, heading, or content rewrites risky. Improve the winning page with proof and product clarity, but use a separate, clearly differentiated page to pursue generic `کالری شمار` intent.",
        },
        {"id": "page_chart_block", "type": "chart", "chartId": "top_pages"},
        {
            "id": "query_section",
            "type": "markdown",
            "sourceId": "gsc_queries",
            "body": "## Generic Persian queries are the clearest near-term upside\n\n**The gap is concentrated in three terms:** `کالری شمار غذا انلاین`, `کالری شمار رایگان`, and `کالری شمار`. Together they generate 3,787 impressions, 58 clicks, and 1.53% CTR at average positions between 7.76 and 9.71.\n\nThe 3.5% scenario below is intentionally conservative and assumes no rank improvement. It is an opportunity-sizing device, not a traffic forecast. Before editing pages, export query × page data to confirm which Persian URL owns each term and whether similar landing pages are competing.",
        },
        {"id": "query_chart_block", "type": "chart", "chartId": "generic_query_gain"},
        {"id": "query_table_block", "type": "table", "tableId": "priority_queries"},
        {
            "id": "actions_section",
            "type": "markdown",
            "body": "## Recommended Next Steps\n\n1. **Assign one page to generic Persian calorie-counter intent.** In Search Console, filter the three priority queries and compare pages. If `/fa/`, `/fa/ai-calorie-tracker/`, `/fa/free-photo-calorie-calculator/`, and related pages rotate for the same terms, consolidate overlapping copy, strengthen internal anchors, and keep each page's title/H1 focused on one intent.\n2. **Add real product evidence above the fold.** The live English and Persian calculator pages are mostly explanatory copy. Add a real food photo, the returned calorie and macro estimate, an edit/review state, product screenshots, supported-food examples, and a direct try/download path. This follows Google's emphasis on descriptive titles, query-relevant snippets, and substantial people-first content: [title links](https://developers.google.com/search/docs/appearance/title-link), [snippets](https://developers.google.com/search/docs/appearance/snippet), and [helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).\n3. **Treat the photographer query as a diagnostic, not a keyword target.** Export query × page for that exact phrase and track it weekly. If it is tied to the English photo page and persists, tighten title/H1/body language around *food photo calorie estimation* and remove ambiguous wording; do not create photographer content.\n4. **Improve Italian as the second market.** Italy generated 3,190 impressions and 58 clicks (1.82% CTR) at position 7.92. Strengthen Italian examples, titles, and internal links before expanding into low-click countries.\n5. **Keep mobile first, diagnose desktop by mix.** Mobile generated 94.9% of clicks. Desktop CTR is only 0.88%, but its average position is also worse at 10.60. Compare query × device and country × device before attributing the gap to design or speed.\n6. **Measure qualified SEO outcomes.** Track landing-page engagement, store-link clicks, installs, signups, and paid conversion alongside Search Console clicks. Stop changes that raise low-quality impressions without improving those downstream actions.",
        },
        {
            "id": "questions_section",
            "type": "markdown",
            "body": "## Further Questions\n\n- Which page ranks for the suspicious photographer query, and did those impressions start in one week?\n- Do the overlapping Persian pages compete for the same generic queries, or does each own a distinct cluster?\n- Which countries and devices generate installs or signups, not just clicks?\n- Did any deployment or indexing event precede the early-July traffic acceleration?",
        },
        {
            "id": "caveats_section",
            "type": "markdown",
            "sourceId": "gsc_bundle",
            "body": "## Caveats and Assumptions\n\n- Query rows cover only 55.9% of top-line clicks and 53.3% of impressions because Search Console suppresses some query data for privacy.\n- The Pages export totals 1,209 clicks and 35,420 impressions versus 1,188 and 32,826 in the daily, country, and device exports. Page shares are calculated within the Pages export and should not be mixed with top-line denominators.\n- Search appearance contains no rows. That does not prove structured data is invalid or absent.\n- CTR scenarios are directional and do not control for SERP features, brand, device, country, or true query relevance.\n- Search Console cannot establish conversion quality or causality.",
        },
    ],
    "cards": [
        {
            "id": "last_30_clicks",
            "description": "Google Search clicks in the latest equal 30-day window.",
            "dataset": "period_metrics",
            "sourceId": "gsc_chart",
            "metrics": [
                {"label": "Last 30d clicks", "field": "clicks", "format": "compact"},
                {"label": "vs first 30d", "field": "click_change", "format": "percent", "signed": True},
                {"label": "First 30d", "field": "first_30_clicks", "format": "compact"},
            ],
        },
        {
            "id": "last_30_ctr",
            "description": "Clicks divided by impressions in the latest 30 days.",
            "dataset": "period_metrics",
            "sourceId": "gsc_chart",
            "metrics": [
                {"label": "Last 30d CTR", "field": "ctr", "format": "percent"},
                {"label": "Change", "field": "ctr_change", "format": "percent", "signed": True},
                {"label": "First 30d", "field": "first_30_ctr", "format": "percent"},
            ],
        },
        {
            "id": "top_page_share",
            "description": "Share of page-export clicks from the leading landing page.",
            "dataset": "page_summary",
            "sourceId": "gsc_pages",
            "metrics": [
                {"label": "Top-page click share", "field": "click_share", "format": "percent"},
                {"label": "Clicks", "field": "clicks", "format": "compact"},
            ],
        },
    ],
    "charts": [
        {
            "id": "weekly_clicks",
            "title": "Weekly Google Search clicks",
            "subtitle": "Thirteen complete weeks ending April 26–July 19, 2026",
            "showDescription": True,
            "intent": "trend",
            "question": "How has organic search click volume changed week by week?",
            "rationale": "A line chart shows the acceleration and the final-week pullback across 13 complete weekly observations.",
            "comparisonContext": {
                "grain": "Week ending Sunday",
                "unit": "Clicks",
                "baseline": "Earlier weeks in the same 90-day export",
            },
            "type": "line",
            "dataset": "weekly_performance",
            "sourceId": "gsc_chart",
            "encodings": {
                "x": {"field": "week", "type": "temporal", "label": "Week ending"},
                "y": {"field": "clicks", "type": "quantitative", "label": "Clicks", "format": "compact"},
                "tooltip": [
                    {"field": "impressions", "type": "quantitative", "label": "Impressions", "format": "compact"},
                    {"field": "ctr", "type": "quantitative", "label": "CTR", "format": "percent"},
                    {"field": "position", "type": "quantitative", "label": "Avg. position", "format": "number"},
                ],
            },
            "palette": {"kind": "sequential", "name": "blue"},
            "labels": {"values": "endpoints"},
            "settings": {"showPoints": "always"},
            "layout": "full",
        },
        {
            "id": "top_pages",
            "title": "Clicks by leading landing page",
            "subtitle": "Top six pages in the 90-day page export",
            "showDescription": True,
            "intent": "comparison",
            "question": "Which landing pages contribute the most organic search clicks?",
            "rationale": "Sorted horizontal bars keep long URL labels readable and reveal concentration in the leading Persian page.",
            "comparisonContext": {
                "grain": "Landing page",
                "unit": "Clicks",
                "denominator": "All clicks represented in Pages.csv",
            },
            "type": "horizontalBar",
            "dataset": "top_pages",
            "sourceId": "gsc_pages",
            "encodings": {
                "x": {"field": "page", "type": "nominal", "label": "Landing page"},
                "y": {"field": "clicks", "type": "quantitative", "label": "Clicks", "format": "compact"},
                "tooltip": [
                    {"field": "impressions", "type": "quantitative", "label": "Impressions", "format": "compact"},
                    {"field": "ctr", "type": "quantitative", "label": "CTR", "format": "percent"},
                    {"field": "position", "type": "quantitative", "label": "Avg. position", "format": "number"},
                    {"field": "click_share", "type": "quantitative", "label": "Click share", "format": "percent"},
                ],
            },
            "palette": {"kind": "sequential", "name": "blue"},
            "labels": {"values": "all"},
            "settings": {"sort": "descending", "showValues": True, "categoryLabelPolicy": "wrap"},
            "layout": "full",
        },
        {
            "id": "generic_query_gain",
            "title": "Scenario click gain for priority Persian queries",
            "subtitle": "Additional 90-day clicks at 3.5% CTR, holding impressions constant",
            "showDescription": True,
            "intent": "comparison",
            "question": "Which generic Persian queries have the largest CTR-based upside?",
            "rationale": "A sorted horizontal comparison makes the relative opportunity across three long query labels easy to scan.",
            "comparisonContext": {
                "grain": "Search query",
                "unit": "Incremental clicks per 90-day export",
                "baseline": "Observed clicks",
                "denominator": "Observed impressions",
            },
            "type": "horizontalBar",
            "dataset": "generic_queries",
            "sourceId": "gsc_queries",
            "encodings": {
                "x": {"field": "query", "type": "nominal", "label": "Query"},
                "y": {"field": "scenario_gain", "type": "quantitative", "label": "Scenario click gain", "format": "number"},
                "tooltip": [
                    {"field": "clicks", "type": "quantitative", "label": "Observed clicks", "format": "compact"},
                    {"field": "impressions", "type": "quantitative", "label": "Impressions", "format": "compact"},
                    {"field": "ctr", "type": "quantitative", "label": "Observed CTR", "format": "percent"},
                    {"field": "position", "type": "quantitative", "label": "Avg. position", "format": "number"},
                ],
            },
            "palette": {"kind": "sequential", "name": "orange"},
            "labels": {"values": "all"},
            "settings": {"sort": "descending", "showValues": True, "categoryLabelPolicy": "wrap"},
            "layout": "full",
        },
    ],
    "tables": [
        {
            "id": "priority_queries",
            "title": "Visible query opportunities",
            "subtitle": "Queries with at least 100 impressions; suspicious photographer query excluded",
            "showDescription": True,
            "dataset": "priority_queries",
            "sourceId": "gsc_queries",
            "defaultSort": {"field": "scenario_gain", "direction": "desc"},
            "density": "spacious",
            "layout": "full",
            "columns": [
                {"field": "query", "label": "Query", "type": "text"},
                {"field": "clicks", "label": "Clicks", "format": "number"},
                {"field": "impressions", "label": "Impressions", "format": "compact"},
                {"field": "ctr", "label": "CTR", "format": "percent"},
                {"field": "position", "label": "Avg. position", "format": "number"},
                {"field": "scenario_gain", "label": "Scenario gain", "format": "number"},
            ],
        }
    ],
}

snapshot = {
    "version": 1,
    "generatedAt": GENERATED_AT,
    "status": "ready",
    "datasets": {
        "period_metrics": [period_row],
        "weekly_performance": weekly_rows,
        "top_pages": page_rows,
        "page_summary": [page_summary_row],
        "generic_queries": generic_rows,
        "priority_queries": priority_query_rows,
        "devices": device_rows,
        "countries": country_rows,
        "anomaly": anomaly_rows,
    },
}

artifact = {
    "surface": "report",
    "manifest": manifest,
    "snapshot": snapshot,
    "sources": sources,
}

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
with OUTPUT_PATH.open("w", encoding="utf-8") as output_file:
    json.dump(artifact, output_file, ensure_ascii=False, indent=2)

print(OUTPUT_PATH)
