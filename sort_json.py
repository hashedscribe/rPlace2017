import json 
import os, sys

def open_file(file):
    with open(os.path.join(sys.path[0], file), "r") as json_file:
        data = json.load(json_file)

sorted(d.items(), key=lambda x: x[1])