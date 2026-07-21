from contextlib import redirect_stdout
from io import StringIO
import json
from pathlib import Path


class _NotebookV4:
    @staticmethod
    def new_notebook():
        return {
            "cells": [],
            "metadata": {},
            "nbformat": 4,
            "nbformat_minor": 5,
        }

    @staticmethod
    def new_markdown_cell(source):
        return {"cell_type": "markdown", "metadata": {}, "source": source}

    @staticmethod
    def new_code_cell(source):
        return {
            "cell_type": "code",
            "execution_count": None,
            "metadata": {},
            "outputs": [],
            "source": source,
        }


class _NotebookFormat:
    v4 = _NotebookV4()


nbf = _NotebookFormat()


OUTPUT_DIR = Path(__file__).resolve().parent
NOTEBOOK_PATH = OUTPUT_DIR / "calkilo-gsc-analysis.ipynb"
DATA_DIR = Path(
    "/Users/mohammad/Downloads/calkilo.com-Performance-on-Search-2026-07-21"
)


notebook = nbf.v4.new_notebook()
notebook["metadata"] = {
    "kernelspec": {
        "display_name": "Python 3",
        "language": "python",
        "name": "python3",
    },
    "language_info": {"name": "python", "version": "3"},
}

notebook["cells"] = [
    nbf.v4.new_markdown_cell(
        """# Calkilo Google Search Console analysis

## tl;dr

- Organic search accelerated sharply: the last 30 days produced **805 clicks from 18,589 impressions**, versus **109 clicks from 3,216 impressions** in the first 30 days. CTR rose from **3.39% to 4.33%**, while impression-weighted position improved from **8.00 to 7.19**.
- Performance is concentrated: `/fa/photo-calorie-calculator/` generated **777 clicks**, or **64.3%** of page-export clicks. Protecting this page matters, but the site needs a second source of growth.
- Three high-volume Persian generic queries generated **3,787 impressions but only 58 clicks (1.53% CTR)**. A scenario of 3.5% CTR at their current rank would add about **75 clicks per 90 days**.
- One suspicious query, `calorie counting recipes for photographers`, produced **2,514 impressions, average position 7.56, and zero clicks**. It is excluded from the opportunity scenario because it appears irrelevant and may distort English-page CTR.
- Mobile drives **94.9% of clicks**. Desktop's lower CTR coincides with a much worse average position (10.60 versus 6.66), so query/country mix should be checked before attributing the gap to UX.
"""
    ),
    nbf.v4.new_markdown_cell(
        """## Context & Methods

This notebook analyzes the Google Search Console Web search export dated July 21, 2026, covering April 20 through July 19, 2026. The decision is where to focus SEO work to grow qualified organic clicks.

### Key Assumptions

- Clicks, impressions, CTR, and average position use Google Search Console definitions.
- Period comparisons use equal-length windows from the daily chart export.
- CTR opportunity is a scenario, not a forecast. It applies a modest rank-band target and excludes the suspicious photographer query.
- Exported query rows are privacy-limited and do not reconcile to top-line totals; query-level conclusions therefore describe the visible query set only.
- Search Console does not include conversions, so traffic quality must be validated with analytics or app-install events.
"""
    ),
    nbf.v4.new_markdown_cell("## Data\n\n### 1. Load and normalize the exports"),
    nbf.v4.new_code_cell(
        f"""from pathlib import Path
import numpy as np
import pandas as pd

DATA_DIR = Path({str(DATA_DIR)!r})

def load_export(name):
    frame = pd.read_csv(DATA_DIR / f"{{name}}.csv")
    if "CTR" in frame.columns:
        frame["CTR_numeric"] = frame["CTR"].str.rstrip("%").astype(float) / 100
    return frame

chart = load_export("Chart")
countries = load_export("Countries")
devices = load_export("Devices")
pages = load_export("Pages")
queries = load_export("Queries")
search_appearance = load_export("Search appearance")
filters = load_export("Filters")

chart["Date"] = pd.to_datetime(chart["Date"])
print("Date range:", chart["Date"].min().date(), "to", chart["Date"].max().date())
print("Filters:")
display(filters)
"""
    ),
    nbf.v4.new_markdown_cell("### 2. Validate grain, completeness, and reconciliation"),
    nbf.v4.new_code_cell(
        """exports = {
    "Chart": chart,
    "Countries": countries,
    "Devices": devices,
    "Pages": pages,
    "Queries": queries,
    "Search appearance": search_appearance,
}

quality_rows = []
for name, frame in exports.items():
    row = {
        "export": name,
        "rows": len(frame),
        "duplicate_rows": int(frame.duplicated().sum()),
        "null_cells": int(frame.isna().sum().sum()),
    }
    if "Clicks" in frame.columns and len(frame):
        row.update(
            clicks=int(frame["Clicks"].sum()),
            impressions=int(frame["Impressions"].sum()),
            weighted_ctr=frame["Clicks"].sum() / frame["Impressions"].sum(),
        )
    quality_rows.append(row)

quality = pd.DataFrame(quality_rows)
display(quality)
print(
    "Visible query coverage:",
    f"{queries['Clicks'].sum() / chart['Clicks'].sum():.1%} of clicks and "
    f"{queries['Impressions'].sum() / chart['Impressions'].sum():.1%} of impressions",
)
"""
    ),
    nbf.v4.new_markdown_cell("## Results\n\n### 3. Compare equal 30-day windows"),
    nbf.v4.new_code_cell(
        """def summarize_period(frame):
    return pd.Series(
        {
            "clicks": int(frame["Clicks"].sum()),
            "impressions": int(frame["Impressions"].sum()),
            "ctr": frame["Clicks"].sum() / frame["Impressions"].sum(),
            "weighted_position": np.average(frame["Position"], weights=frame["Impressions"]),
            "clicks_per_day": frame["Clicks"].mean(),
        }
    )

period_comparison = pd.DataFrame(
    {
        "first_30_days": summarize_period(chart.head(30)),
        "last_30_days": summarize_period(chart.tail(30)),
    }
).T
display(period_comparison)
"""
    ),
    nbf.v4.new_markdown_cell("### 4. Plot weekly search momentum"),
    nbf.v4.new_code_cell(
        """weekly = chart.assign(position_x_impressions=chart["Position"] * chart["Impressions"]).set_index("Date").resample("W-SUN").agg(
    Clicks=("Clicks", "sum"),
    Impressions=("Impressions", "sum"),
    position_x_impressions=("position_x_impressions", "sum"),
)
weekly["CTR"] = weekly["Clicks"] / weekly["Impressions"]
weekly["Position"] = weekly["position_x_impressions"] / weekly["Impressions"]
display(weekly[["Clicks", "Impressions", "CTR", "Position"]])

"""
    ),
    nbf.v4.new_markdown_cell("### 5. Size concentration and segment performance"),
    nbf.v4.new_code_cell(
        """pages_ranked = pages.sort_values("Clicks", ascending=False).copy()
concentration = pd.Series(
    {
        "top_page_click_share": pages_ranked.iloc[:1]["Clicks"].sum() / pages_ranked["Clicks"].sum(),
        "top_3_page_click_share": pages_ranked.iloc[:3]["Clicks"].sum() / pages_ranked["Clicks"].sum(),
        "top_10_page_click_share": pages_ranked.iloc[:10]["Clicks"].sum() / pages_ranked["Clicks"].sum(),
    }
)
display(concentration.to_frame("share"))
display(pages_ranked.head(10)[["Top pages", "Clicks", "Impressions", "CTR_numeric", "Position"]])

device_summary = devices.copy()
device_summary["click_share"] = device_summary["Clicks"] / device_summary["Clicks"].sum()
device_summary["impression_share"] = device_summary["Impressions"] / device_summary["Impressions"].sum()
display(device_summary[["Device", "Clicks", "Impressions", "CTR_numeric", "Position", "click_share", "impression_share"]])

country_summary = countries.sort_values("Impressions", ascending=False).head(12).copy()
country_summary["click_share"] = country_summary["Clicks"] / countries["Clicks"].sum()
country_summary["impression_share"] = country_summary["Impressions"] / countries["Impressions"].sum()
display(country_summary[["Country", "Clicks", "Impressions", "CTR_numeric", "Position", "click_share", "impression_share"]])
"""
    ),
    nbf.v4.new_markdown_cell("### 6. Rank visible query opportunities without treating irrelevant impressions as upside"),
    nbf.v4.new_code_cell(
        """def scenario_ctr(position):
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
query_opportunities["scenario_click_gain"] = (
    query_opportunities["Impressions"] * query_opportunities["scenario_ctr"]
    - query_opportunities["Clicks"]
).clip(lower=0)
query_opportunities["is_suspicious"] = query_opportunities["Top queries"].eq(
    "calorie counting recipes for photographers"
)

priority_queries = query_opportunities[
    (~query_opportunities["is_suspicious"])
    & (query_opportunities["Impressions"] >= 100)
].sort_values(["scenario_click_gain", "Impressions"], ascending=False)

display(
    priority_queries.head(15)[
        ["Top queries", "Clicks", "Impressions", "CTR_numeric", "Position", "scenario_ctr", "scenario_click_gain"]
    ]
)
print("Scenario gain for non-suspicious queries with >=100 impressions:", round(priority_queries["scenario_click_gain"].sum()))

generic_terms = ["کالری شمار غذا انلاین", "کالری شمار رایگان", "کالری شمار"]
generic_cluster = queries[queries["Top queries"].isin(generic_terms)]
generic_clicks = generic_cluster["Clicks"].sum()
generic_impressions = generic_cluster["Impressions"].sum()
print(
    "Generic Persian cluster:",
    int(generic_clicks), "clicks,",
    int(generic_impressions), "impressions,",
    f"{generic_clicks / generic_impressions:.2%} CTR,",
    f"{generic_impressions * 0.035 - generic_clicks:.0f} clicks to a 3.5% scenario",
)
"""
    ),
    nbf.v4.new_markdown_cell(
        """## Takeaways

1. **Protect the Persian photo-calorie winner.** It supplies nearly two-thirds of page-export clicks, and its strongest query already earns 11.96% CTR at position 4.90. Avoid broad rewrites that weaken that intent.
2. **Create one clear owner for generic Persian calorie-counter intent.** The three largest generic queries have 3,787 impressions and only 1.53% CTR. Confirm query-to-page overlap in Search Console, then consolidate or differentiate overlapping Persian pages.
3. **Investigate the photographer query before optimizing the English page.** It is the largest visible query by impressions but appears unrelated. A query-by-page export is needed to identify the ranking URL and determine whether the signal is transient, spam-like, or caused by ambiguous page language.
4. **Add product proof, not more generic copy.** The live calculator pages should show a real food-photo example, the returned calorie/macro result, edit flow, screenshots, limitations, and a visible path to try the product.
5. **Prioritize mobile and Persian, then improve Italian.** Mobile supplies 94.9% of clicks; Iran supplies 84.9%. Italy is the clearest secondary market with 3,190 impressions and 58 clicks.
6. **Measure qualified outcomes.** Pair Search Console with landing-page engagement, store-click, install, and signup events. Search clicks alone cannot determine whether an SEO change improves business performance.
"""
    ),
]

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

execution_namespace = {}

def display(value):
    if hasattr(value, "to_string"):
        print(value.to_string())
    else:
        print(value)

execution_namespace["display"] = display
execution_count = 0
for cell in notebook["cells"]:
    if cell["cell_type"] != "code":
        continue
    execution_count += 1
    output_buffer = StringIO()
    try:
        with redirect_stdout(output_buffer):
            exec(compile(cell["source"], f"notebook-cell-{execution_count}", "exec"), execution_namespace)
    except Exception as error:
        cell["execution_count"] = execution_count
        cell["outputs"] = [
            {
                "output_type": "error",
                "ename": type(error).__name__,
                "evalue": str(error),
                "traceback": [],
            }
        ]
        raise
    cell["execution_count"] = execution_count
    captured_output = output_buffer.getvalue()
    if captured_output:
        cell["outputs"] = [
            {
                "output_type": "stream",
                "name": "stdout",
                "text": captured_output,
            }
        ]

with NOTEBOOK_PATH.open("w", encoding="utf-8") as notebook_file:
    json.dump(notebook, notebook_file, ensure_ascii=False, indent=1)
print(NOTEBOOK_PATH)
