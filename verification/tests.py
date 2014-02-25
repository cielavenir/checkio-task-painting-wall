"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
	"input" -- input data for user function
	"answer" -- your right answer
	"explanation" -- not necessary key, it's using for additional info in animation.
"""


TESTS = {
	"Example": [
		{
			"input": [5,[[1,5],[11,15],[2,14],[21,25]]],
			"answer": 1
		},
		{
			"input": [6,[[1,5],[11,15],[2,14],[21,25]]],
			"answer": 2
		},
		{
			"input": [11,[[1,5],[11,15],[2,14],[21,25]]],
			"answer": 3
		},
		{
			"input": [16,[[1,5],[11,15],[2,14],[21,25]]],
			"answer": 4
		},
		{
			"input": [21,[[1,5],[11,15],[2,14],[21,25]]],
			"answer": -1
		},
	],
	"Short By Hand 1": [
		{
			"input": [0,[[1,2],[20,30],[25,28],[5,10],[4,21],[1,6]]],
			"answer": 0
		},
		{
			"input": [5,[[1,2],[20,30],[25,28],[5,10],[4,21],[1,6]]],
			"answer": 2
		},
		{
			"input": [15,[[1,2],[20,30],[25,28],[5,10],[4,21],[1,6]]],
			"answer": 3
		},
		{
			"input": [20,[[1,2],[20,30],[25,28],[5,10],[4,21],[1,6]]],
			"answer": 4
		},
		{
			"input": [30,[[1,2],[20,30],[25,28],[5,10],[4,21],[1,6]]],
			"answer": 6
		},
		{
			"input": [35,[[1,2],[20,30],[25,28],[5,10],[4,21],[1,6]]],
			"answer": -1
		},
	],
	"Short By Hand 2": [
	],
	"Short Generated 1": [
	],
	"Short Generated 2": [
	],
	"Large By Hand": [
	],
	"Large Generated 1": [
	],
	"Large Generated 2": [
	],
}
