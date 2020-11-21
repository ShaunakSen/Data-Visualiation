import numpy as np
import pandas as pd
import pickle

column_meta_data = {
    'sku_id': {
        'type': 'string'
    },
    'Target': {
        'type': 'float',
        'min': 0,
        'max': 500,
        'mean': 0,
        'std_dev': 7
    },
    'department': {
        'type': 'string'
    },
    'cal_date': {
        'type': 'date'
    },
    'weeks_ahead': 1
}


data_params = {
    'num_skus': 100,
    'FIRST_VALID_DATE': '2020-01-05',
    'max_weeks_ahead': 5

}

"""
X axis : fcdate
y : sales
say we have forecasted for wa = 1,2,3
given date d1, we should have d2, d3 d4, for wa = d1+1, d1+2, d1+3 and the sales for that
Also pred sales for that

"""

print (np.random.normal(loc=100.0, scale=300, size=100))