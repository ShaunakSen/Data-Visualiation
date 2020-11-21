import pandas as pd
import numpy as np
import plotly.express as px

dfb = pd.read_csv('C:\\Users\\shaun\\Documents\\my_projects\Data-Visualiation\\Plotly - Interactive dashboards in python\\data\\bird-window-collision-death.csv')

print (dfb.head())

df = px.data.tips()
fig = px.pie(dfb, values='Deaths', names='Bldg #', color='Side', hole=0.5)
fig.show()

