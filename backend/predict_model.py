# -*- coding: utf-8 -*-
"""
Created on Tue Nov 17 21:51:19 2020

@author: win10
"""
from pydantic import BaseModel
# 2. Class which describes Bank Notes measurements
class Predict(BaseModel):
    Access: int|None = None
    Facility: str|None= None 
    Date:  str|None= None 
    Day: str|None= None 
    Lunch: int|None = None

class InputData(BaseModel):
    param1: str
    param2: str
