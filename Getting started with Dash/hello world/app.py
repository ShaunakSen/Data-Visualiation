# https://dash.plotly.com/tutorial
from dash import Dash, html, dash_table, dcc, callback, Output, Input
import pandas as pd
import plotly.express as px


URL = 'https://raw.githubusercontent.com/plotly/datasets/master/gapminder2007.csv'

def read_data(path: str) -> pd.DataFrame:
    return pd.read_csv(path)

df = read_data(URL)
# This line is known as the Dash constructor and is responsible for initializing your app.
external_stylesheets = ['https://codepen.io/chriddyp/pen/bWLwgP.css']
app = Dash(__name__, external_stylesheets=external_stylesheets)


# App layout
app.layout = html.Div([
    html.Div(className='row', children='My First App with Data, Graph, and Controls',
             style={'textAlign': 'center', 'color': 'blue', 'fontSize': 30}),

    html.Div(className='row', children=[
        dcc.RadioItems(options=['pop', 'lifeExp', 'gdpPercap'],
                       value='lifeExp',
                       inline=True,
                       id='controls-and-radio-item')
    ]),

    html.Div(className='row', children=[
        html.Div(className='six columns', children=[
            dash_table.DataTable(data=df.to_dict('records'), page_size=11, style_table={'overflowX': 'auto'})
        ]),
        html.Div(className='six columns', children=[
            dcc.Graph(figure={}, id='controls-and-graph')
        ])
    ])
])
# Add controls to build the interaction


@callback(
    Output(component_id="controls-and-graph", component_property="figure"),
    Input(component_id="controls-and-radio-item", component_property="value")
)
def generate_bar_plot(chosen_col: str) -> None:
    fig = px.histogram(data_frame=df, x='continent', y=chosen_col, histfunc='avg')
    return fig


if __name__ == "__main__":
    
    host = '127.0.0.1'
    port = 8055
    app.run(debug=True, host=host, port=port)