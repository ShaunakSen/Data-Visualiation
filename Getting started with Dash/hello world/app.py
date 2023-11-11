from dash import Dash, html, dash_table, dcc
import pandas as pd
import plotly.express as px


URL = 'https://raw.githubusercontent.com/plotly/datasets/master/gapminder2007.csv'

def generate_bar_plot(df: pd.DataFrame) -> None:
    fig = px.histogram(data_frame=df, x='continent', y='lifeExp', histfunc='avg')
    return fig

def read_data(path: str) -> pd.DataFrame:
    return pd.read_csv(path)


# This line is known as the Dash constructor and is responsible for initializing your app.
app = Dash(__name__)

def setup_app_layout(df: pd.DataFrame):
    # The app layout represents the app components that will be displayed in the web browser, 
    # normally contained within a html.Div. In this example, a single component was added: another html.Div.
    #  The Div has a few properties, such as children, which we use to add text content 
    # to the page: "Hello World".
    app.layout = html.Div(
        children=[
            html.Div(children="Hello World"),
            dash_table.DataTable(data=df.to_dict("records"), page_size=10),
            dcc.Graph(figure=generate_bar_plot(df))
        ]
    )

if __name__ == "__main__":
    df = read_data(URL)
    host = '127.0.0.1'
    port = 8055
    setup_app_layout(df)
    app.run(debug=True, host=host, port=port)