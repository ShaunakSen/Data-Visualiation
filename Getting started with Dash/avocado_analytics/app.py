import pandas as pd
from dash import Dash, dcc, html

external_stylesheets = [
    {
        "href": (
            "https://fonts.googleapis.com/css2?"
            "family=Lato:wght@400;700&display=swap"
        ),
        "rel": "stylesheet",
    },
]

fpath = "/Users/shaunaksen/Documents/personal-projects/Data-Visualiation/Getting started with Dash/avocado_analytics/data/avocado.csv"

data = (
    pd.read_csv(fpath)
    .query("type == 'conventional' and region == 'Albany'")
    .assign(Date=lambda data: pd.to_datetime(data["Date"], format="%Y-%m-%d"))
    .sort_values(by="Date")
)

app = Dash(__name__)
app.title = "Avocado Analytics: Understand Your Avocados!"

app.layout = html.Div(
    children=[
        html.Div(
            children=[
                html.P(children="🥑", className="header-emoji"),
                html.H1(
                    children="Avocado Analytics", className="header-title text"
                ),
                html.P(
                    children=(
                        "Analyze the behavior of avocado prices and the number"
                        " of avocados sold in the US between 2015 and 2018"
                    ),
                    className="header-description text",
                ),
            ],
            className="header",
        ),
        
        html.Div(
            children=dcc.Graph(
                id="price-chart",
                    config={"displayModeBar": False}, # remove the floating toolbar that Plotly shows by default.
                    figure={
                        "data": [
                            {
                                "x": data["Date"],
                                "y": data["AveragePrice"],
                                "type": "lines",
                                "hovertemplate": (
                                    "$%{y:.2f}<extra></extra>" # Instead of 2.5, it’ll show as $2.5
                                ),
                            },
                        ],
                        "layout": {
                            "title": {
                                "text": "Average Price of Avocados",
                                "x": 0.05,
                                "xanchor": "left",
                            },
                            "xaxis": {"fixedrange": True},
                            "yaxis": {
                                "tickprefix": "$",
                                "fixedrange": True,
                            },
                            "colorway": ["#17b897"],
                        },
                    },
            ),
            className="card"
        ),

        dcc.Graph(
            figure={
                "data": [
                    {"x": data['Date'], "y": data['Total Volume'], "type": "lines"}
                ],
                "layout": {"title": "Avocados Sold"}
            }
        )
    ]
)
if __name__ == "__main__":
    
    host = '127.0.0.1'
    port = 8055
    app.run(debug=True, host=host, port=port)