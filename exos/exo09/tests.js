assert( typeof testPerf((function() {})) == "number" , "Le résultat est un nombre" );

var perf = testPerf(verifEmail_v1);
assert( perf > 200 && perf < 1000 , "L'ordre de grandeur est respecté" );