export default function apostrophe(val) {
    let val2 = val.split('{apostrophe}');
    let val3;

    for (let i = 0; i < val2.length; i++) {
        val3 = val3+val2[i];

        if(i < val2.length-1) {
            val3 = val3+"'";
        }
    }

    return val3;
}