def adipose(val):

    val2 = val.split("'")
    print(val2)
    
    val3 = ""
    
    for x in range(len(val2)):
        val3 = val3+val2[x]
        if(x < len(val2)-1):
            val3 = val3+"''"
    
    print(val3)

    return val3