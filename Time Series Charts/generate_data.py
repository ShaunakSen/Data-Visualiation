import numpy as np
import pandas as pd
import pickle


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
