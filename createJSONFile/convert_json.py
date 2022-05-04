import json
from operator import itemgetter 
import os, sys

def open_csv(file):
    data = open(os.path.join(sys.path[0], file), "r")
    return data

def make_dir(data):
    d = {
        "data" : [],
    }
    keys = ["ts","user_hash","x_coordinate","y_coordinate","color"]
    color = [
    	"#FFFFFF",
    	"#E4E4E4",
    	"#888888",
    	"#222222",
    	"#FFA7D1",
    	"#E50000",
    	"#E59500",
    	"#A06A42",
    	"#E5D900",
    	"#94E044",
    	"#02BE01",
    	"#00E5F0",
    	"#0083C7",
    	"#0000EA",
    	"#E04AFF",
    	"#820080",
    ]
    for line in data:
        if "\n" in line:
            line = line[:len(line)-1]
        array = line.split(",")
        temp_dir = {}
        # if int(array[0][9]) != 4:
        for i in range(len(array)):
            if i == 4:
                temp_dir[keys[i]] = color[int(array[i])]
            elif i == 0:
                temp_dir[keys[i]] = array[i][11:len(array[i])-4]
            elif i == 1:
                continue
            else:
                temp_dir[keys[i]] = array[i]
        d["data"].append(temp_dir)
    return d

def sort_dict(array):
    array = sorted(array, key=itemgetter('ts'))
    # for d in array:
    #     d.pop('ts')
    return array

def write_json(d, file):
    with open(os.path.join(sys.path[0], file), "w") as json_file:
        json_file.write(json.dumps(d, indent=4))


def main():
    read = "./place_tiles"
    write = "./all_place_tiles_json.json"
    data = open_csv(read)
    d = make_dir(data)
    d["data"] = sort_dict(d["data"])
    write_json(d, write)

if __name__ == "__main__":
    main()