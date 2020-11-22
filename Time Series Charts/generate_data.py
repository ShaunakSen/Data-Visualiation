import numpy as np
import pandas as pd
import pickle
from pandas.core import frame
import plotly
import plotly.express as px
import plotly.graph_objects as go


def read_data():
    """
    Pick out 10 random skus
    set max_wa = 5
    Get data for wa = 1->5 for these skus
    randomize the sales
    randomize the sku ids
    """
    random_sales_data = pd.read_csv('C:\\Users\\shaun\\Documents\\my_projects\\Data-Visualiation\\Time Series Charts\\data\\random_data.csv')

    random_sales_data.drop(columns=['Unnamed: 0'], inplace=True)

    return random_sales_data


random_sales_data = read_data()
stocks_data = px.data.stocks()

"""
date      GOOG      AAPL      AMZN        FB      NFLX      MSFT
0  2018-01-01  1.000000  1.000000  1.000000  1.000000  1.000000  1.000000
1  2018-01-08  1.018172  1.011943  1.061881  0.959968  1.053526  1.015988
"""

# print (stocks_data.head())

### using plotly express
fig = px.line(data_frame=stocks_data, x='date', y='GOOG')
# fig.show()

### using plotly graph objects
apple_data = pd.read_csv('https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv')
# print (apple_data.head())

"""
 Date   AAPL.Open   AAPL.High    AAPL.Low  AAPL.Close  AAPL.Volume  AAPL.Adjusted          dn        mavg          up   direction
0  2015-02-17  127.489998  128.880005  126.919998  127.830002     63152400     122.905254  106.741052  117.927667  129.114281  Increasing
1  2015-02-18  127.629997  128.779999  127.449997  128.720001     44891700     123.760965  107.842423  118.940333  130.038244  Increasing
"""

fig = go.Figure([go.Scatter(x=apple_data['Date'], y=apple_data['AAPL.High'])])
# fig.show()

df = px.data.stocks(indexed=True)
# print (df.head())

fig = px.bar(data_frame = df-1, x=df.index, y='GOOG') ### -1 just to have some -ve values to show in our chart
# fig.show()

### FACETS: Column Facets
df = px.data.tips()

# print (df.head())

"""
 total_bill   tip     sex smoker  day    time  size
0       16.99  1.01  Female     No  Sun  Dinner     2
1       10.34  1.66    Male     No  Sun  Dinner     3
"""

fig = px.scatter(data_frame=df, x='total_bill', y='tip', color='smoker', facet_col='sex')
# fig.show()

### FACETS: Row Facets

fig = px.bar(data_frame=df, x="size", y="total_bill", color="sex", facet_row="smoker")
# fig.show()

### FACETS: Wrapping column Facets
#### When the facet dimension has a large number of unique values, it is possible to wrap columns using the facet_col_wrap argument.

df = px.data.gapminder()
# print (df.head())

"""
country continent  year  lifeExp       pop   gdpPercap iso_alpha  iso_num
0  Afghanistan      Asia  1952   28.801   8425333  779.445314       AFG        4
1  Afghanistan      Asia  1957   30.332   9240934  820.853030       AFG        4
"""

fig = px.scatter(data_frame=df, x='gdpPercap', y='lifeExp', color='continent', size='pop', facet_col='year', facet_col_wrap=3)
# fig.show()

### FACETS: enforcing order
df = px.data.tips()
fig = px.histogram(data_frame=df, x='total_bill', y='tip', color='sex', facet_row='time', facet_col='day', 
                        category_orders={'day': ["Thur", "Fri", "Sat", "Sun"], 'time': ['Lunch', 'Dinner']})

# fig.show()

### Horizontal and Vertical Lines and Rectangles

df = px.data.iris()

print (df.head())

"""
sepal_length  sepal_width  petal_length  petal_width species  species_id
0           5.1          3.5           1.4          0.2  setosa           1
1           4.9          3.0           1.4          0.2  setosa           1
"""

fig = px.scatter(df, x="petal_length", y="petal_width")
fig.add_hline(y=0.9)
fig.add_vrect(x0=0.9, x1=2)
# fig.show()
# print (fig)

#### These shapes can be styled by passing the same arguments as are accepted by add_shape:

fig = px.scatter(df, x="petal_length", y="petal_width")
fig.add_vline(x=2.5, line_width=3, line_dash="dash", line_color="green")
fig.add_hrect(y0=0.9, y1=2.6, line_width=0, fillcolor="red", opacity=0.2)
# fig.show()


### Adding Text Annotations

df = px.data.stocks(indexed=True)

"""
 company         GOOG      AAPL      AMZN        FB      NFLX      MSFT
date
2018-01-01  1.000000  1.000000  1.000000  1.000000  1.000000  1.000000
2018-01-08  1.018172  1.011943  1.061881  0.959968  1.053526  1.015988
"""
print (df.head())

print (df.columns)
fig = px.line(data_frame=df)
fig.add_hline(y=1, line_dash='dot', annotation_text='Jan 1, 2018 baseline', annotation_position = 'bottom right')
fig.add_vrect(x0="2018-09-24", x1="2018-12-18", annotation_text="decline", annotation_position="top left", fillcolor="green", opacity=0.25, line_width=0)
# fig.show()

#### The same line or box can be added to multiple subplots or facets by setting the row and/or col to "all". The default row and col values are "all".

# fig = px.line(data_frame=df, facet_col='company', )