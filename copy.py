from shutil import copyfile

for i in range(5,296,4):
    for j in range(1,5):
        copyfile(str(j) + ".mp3", str(i+j) + ".mp3")
