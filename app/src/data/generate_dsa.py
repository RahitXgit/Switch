import os

output_path = r"c:\Users\Rahit\Downloads\Kimi_Agent_Career Switch Roadmap\app\src\data\dsaProblems.ts"

content = """export interface DSAProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  month: number;
  leetcode?: string;
  notes?: string;
}

export interface DSAProgress {
  [problemId: string]: {
    solved: boolean;
    solvedDate?: string;
    timeTaken?: string;
    withoutHint: boolean;
    notes?: string;
    revisionDate1?: string;
    revisionDate2?: string;
  };
}

export const dsaTopics = [
  'Arrays & Strings',
  'HashMaps & Sets',
  'Two Pointers & Sliding Window',
  'Stacks',
  'Binary Search',
  'Linked List',
  'Queues',
  'Trees & BST',
  'Heap & Priority Queue',
  'Backtracking & Tries',
  'Graphs & Union Find'
];

export const dsaProblems: DSAProblem[] = [
"""

# Month 1: Arrays & Strings + HashMaps (35 problems)
m1_problems = [
    # Key examples
    ("1", "Two Sum", "Easy", "HashMaps & Sets", 1, "1"),
    ("2", "Best Time to Buy Stock", "Easy", "Arrays & Strings", 1, "121"),
    ("3", "Contains Duplicate", "Easy", "HashMaps & Sets", 1, "217"),
    ("4", "Product Except Self", "Medium", "Arrays & Strings", 1, "238"),
    ("5", "Majority Element", "Easy", "Arrays & Strings", 1, "169"),
    ("6", "Group Anagrams", "Medium", "HashMaps & Sets", 1, "49"),
    ("7", "Valid Anagram", "Easy", "HashMaps & Sets", 1, "242"),
    ("8", "Longest Substring Without Repeating Chars", "Medium", "Arrays & Strings", 1, "3"),
    # Fillers to reach 35
    ("9", "Longest Common Prefix", "Easy", "Arrays & Strings", 1, "14"),
    ("10", "Roman to Integer", "Easy", "Arrays & Strings", 1, "13"),
    ("11", "Integer to Roman", "Medium", "Arrays & Strings", 1, "12"),
    ("12", "Length of Last Word", "Easy", "Arrays & Strings", 1, "58"),
    ("13", "Find index of first occurrence", "Easy", "Arrays & Strings", 1, "28"),
    ("14", "First Unique Character in a String", "Easy", "HashMaps & Sets", 1, "387"),
    ("15", "Reverse String", "Easy", "Arrays & Strings", 1, "344"),
    ("16", "Reverse Words in a String", "Medium", "Arrays & Strings", 1, "151"),
    ("17", "Count and Say", "Medium", "Arrays & Strings", 1, "38"),
    ("18", "String to Integer (atoi)", "Medium", "Arrays & Strings", 1, "8"),
    ("19", "Remove Duplicates from Sorted Array", "Easy", "Arrays & Strings", 1, "26"),
    ("20", "Remove Element", "Easy", "Arrays & Strings", 1, "27"),
    ("21", "Search Insert Position", "Easy", "Arrays & Strings", 1, "35"),
    ("22", "Plus One", "Easy", "Arrays & Strings", 1, "66"),
    ("23", "Merge Sorted Array", "Easy", "Arrays & Strings", 1, "88"),
    ("24", "Pascal's Triangle", "Easy", "Arrays & Strings", 1, "118"),
    ("25", "Pascal's Triangle II", "Easy", "Arrays & Strings", 1, "119"),
    ("26", "Rotate Array", "Medium", "Arrays & Strings", 1, "189"),
    ("27", "First Missing Positive", "Hard", "Arrays & Strings", 1, "41"),
    ("28", "Rotate Image", "Medium", "Arrays & Strings", 1, "48"),
    ("29", "Spiral Matrix", "Medium", "Arrays & Strings", 1, "54"),
    ("30", "Set Matrix Zeroes", "Medium", "Arrays & Strings", 1, "73"),
    ("31", "Find Duplicate Number", "Medium", "HashMaps & Sets", 1, "287"),
    ("32", "Missing Number", "Easy", "HashMaps & Sets", 1, "268"),
    ("33", "Longest Consecutive Sequence", "Medium", "HashMaps & Sets", 1, "128"),
    ("34", "Intersection of Two Arrays", "Easy", "HashMaps & Sets", 1, "349"),
    ("35", "Intersection of Two Arrays II", "Easy", "HashMaps & Sets", 1, "350"),
]

# Month 2: Two Pointers + Sliding Window + Stacks (35 problems)
m2_problems = [
    # Key examples
    ("36", "3Sum", "Medium", "Two Pointers & Sliding Window", 2, "15"),
    ("37", "Container With Most Water", "Medium", "Two Pointers & Sliding Window", 2, "11"),
    ("38", "Trapping Rain Water", "Hard", "Two Pointers & Sliding Window", 2, "42"),
    ("39", "Valid Parentheses", "Easy", "Stacks", 2, "20"),
    ("40", "Daily Temperatures", "Medium", "Stacks", 2, "739"),
    ("41", "Min Stack", "Medium", "Stacks", 2, "155"),
    ("42", "Longest Repeating Character Replacement", "Medium", "Two Pointers & Sliding Window", 2, "424"),
    # Fillers to reach 35
    ("43", "Valid Palindrome", "Easy", "Two Pointers & Sliding Window", 2, "125"),
    ("44", "Two Sum II", "Medium", "Two Pointers & Sliding Window", 2, "167"),
    ("45", "Repeated DNA Sequences", "Medium", "Two Pointers & Sliding Window", 2, "187"),
    ("46", "Minimum Size Subarray Sum", "Medium", "Two Pointers & Sliding Window", 2, "209"),
    ("47", "Sliding Window Maximum", "Hard", "Two Pointers & Sliding Window", 2, "239"),
    ("48", "Permutation in String", "Medium", "Two Pointers & Sliding Window", 2, "567"),
    ("49", "Minimum Window Substring", "Hard", "Two Pointers & Sliding Window", 2, "76"),
    ("50", "Find All Anagrams in String", "Medium", "Two Pointers & Sliding Window", 2, "438"),
    ("51", "Decode String", "Medium", "Stacks", 2, "394"),
    ("52", "Evaluate Reverse Polish Notation", "Medium", "Stacks", 2, "150"),
    ("53", "Largest Rectangle in Histogram", "Hard", "Stacks", 2, "84"),
    ("54", "Longest Valid Parentheses", "Hard", "Stacks", 2, "32"),
    ("55", "Simplify Path", "Medium", "Stacks", 2, "71"),
    ("56", "Basic Calculator", "Hard", "Stacks", 2, "224"),
    ("57", "Make The String Great", "Easy", "Stacks", 2, "1544"),
    ("58", "Remove All Adjacent Duplicates In String", "Easy", "Stacks", 2, "1047"),
    ("59", "Validate Stack Sequences", "Medium", "Stacks", 2, "946"),
    ("60", "Car Fleet", "Medium", "Stacks", 2, "853"),
    ("61", "Next Greater Element II", "Medium", "Stacks", 2, "503"),
    ("62", "Next Greater Element I", "Easy", "Stacks", 2, "496"),
    ("63", "Implement Queue using Stacks", "Easy", "Stacks", 2, "232"),
    ("64", "Implement Stack using Queues", "Easy", "Stacks", 2, "225"),
    ("65", "Flatten Nested List Iterator", "Medium", "Stacks", 2, "341"),
    ("66", "Online Stock Span", "Medium", "Stacks", 2, "901"),
    ("67", "Remove Duplicate Letters", "Medium", "Stacks", 2, "316"),
    ("68", "Backspace String Compare", "Easy", "Two Pointers & Sliding Window", 2, "844"),
    ("69", "Valid Palindrome II", "Easy", "Two Pointers & Sliding Window", 2, "680"),
    ("70", "Squares of a Sorted Array", "Easy", "Two Pointers & Sliding Window", 2, "977"),
]

# Month 3: Binary Search + Linked List + Queues (30 problems)
m3_problems = [
    # Key examples
    ("71", "Search Rotated Sorted Array", "Medium", "Binary Search", 3, "33"),
    ("72", "Find Minimum in Rotated Sorted Array", "Medium", "Binary Search", 3, "153"),
    ("73", "Merge Two Sorted Lists", "Easy", "Linked List", 3, "21"),
    ("74", "LRU Cache", "Medium", "Linked List", 3, "146"),
    ("75", "Reorder List", "Medium", "Linked List", 3, "143"),
    ("76", "Design Circular Queue", "Medium", "Queues", 3, "622"),
    # Fillers to reach 30
    ("77", "Binary Search", "Easy", "Binary Search", 3, "704"),
    ("78", "Search a 2D Matrix", "Medium", "Binary Search", 3, "74"),
    ("79", "Koko Eating Bananas", "Medium", "Binary Search", 3, "875"),
    ("80", "Median of Two Sorted Arrays", "Hard", "Binary Search", 3, "4"),
    ("81", "Linked List Cycle", "Easy", "Linked List", 3, "141"),
    ("82", "Reverse Linked List", "Easy", "Linked List", 3, "206"),
    ("83", "Remove Nth Node From End", "Medium", "Linked List", 3, "19"),
    ("84", "Add Two Numbers", "Medium", "Linked List", 3, "2"),
    ("85", "Copy List with Random Pointer", "Medium", "Linked List", 3, "138"),
    ("86", "Find First and Last Position", "Medium", "Binary Search", 3, "34"),
    ("87", "Capacity To Ship Packages", "Medium", "Binary Search", 3, "1011"),
    ("88", "Split Array Largest Sum", "Hard", "Binary Search", 3, "410"),
    ("89", "Remove Linked List Elements", "Easy", "Linked List", 3, "203"),
    ("90", "Odd Even Linked List", "Medium", "Linked List", 3, "328"),
    ("91", "Palindrome Linked List", "Easy", "Linked List", 3, "234"),
    ("92", "Linked List Cycle II", "Medium", "Linked List", 3, "142"),
    ("93", "Intersection of Two Linked Lists", "Easy", "Linked List", 3, "160"),
    ("94", "Partition List", "Medium", "Linked List", 3, "86"),
    ("95", "Reverse Linked List II", "Medium", "Linked List", 3, "92"),
    ("96", "Reverse Nodes in k-Group", "Hard", "Linked List", 3, "25"),
    ("97", "Rotate List", "Medium", "Linked List", 3, "61"),
    ("98", "Find Peak Element", "Medium", "Binary Search", 3, "162"),
    ("99", "First Bad Version", "Easy", "Binary Search", 3, "278"),
    ("100", "Sort List", "Medium", "Linked List", 3, "148"),
]

# Month 4: Trees (BST) + DFS/BFS (35 problems)
m4_problems = [
    # Key examples
    ("101", "Invert Binary Tree", "Easy", "Trees & BST", 4, "226"),
    ("102", "Max Depth of Binary Tree", "Easy", "Trees & BST", 4, "104"),
    ("103", "Same Tree", "Easy", "Trees & BST", 4, "100"),
    ("104", "Subtree of Another Tree", "Easy", "Trees & BST", 4, "572"),
    ("105", "Lowest Common Ancestor of BST", "Medium", "Trees & BST", 4, "235"),
    ("106", "Serialize/Deserialize Binary Tree", "Hard", "Trees & BST", 4, "297"),
    ("107", "Level Order Traversal", "Medium", "Trees & BST", 4, "102"),
    # Fillers to reach 35
    ("108", "Validate Binary Search Tree", "Medium", "Trees & BST", 4, "98"),
    ("109", "Binary Tree Right Side View", "Medium", "Trees & BST", 4, "199"),
    ("110", "Construct BT from Preorder & Inorder", "Medium", "Trees & BST", 4, "105"),
    ("111", "Path Sum III", "Medium", "Trees & BST", 4, "437"),
    ("112", "Kth Smallest Element in BST", "Medium", "Trees & BST", 4, "230"),
    ("113", "Flatten Binary Tree to Linked List", "Medium", "Trees & BST", 4, "114"),
    ("114", "Populating Next Right Pointers", "Medium", "Trees & BST", 4, "116"),
    ("115", "Diameter of Binary Tree", "Easy", "Trees & BST", 4, "543"),
    ("116", "Balanced Binary Tree", "Easy", "Trees & BST", 4, "110"),
    ("117", "Binary Tree Maximum Path Sum", "Hard", "Trees & BST", 4, "124"),
    ("118", "Sum Root to Leaf Numbers", "Medium", "Trees & BST", 4, "129"),
    ("119", "Symmetric Tree", "Easy", "Trees & BST", 4, "101"),
    ("120", "Path Sum", "Easy", "Trees & BST", 4, "112"),
    ("121", "Path Sum II", "Medium", "Trees & BST", 4, "113"),
    ("122", "Convert Sorted Array to BST", "Easy", "Trees & BST", 4, "108"),
    ("123", "Convert Sorted List to BST", "Medium", "Trees & BST", 4, "109"),
    ("124", "BST Iterator", "Medium", "Trees & BST", 4, "173"),
    ("125", "Lowest Common Ancestor of BT", "Medium", "Trees & BST", 4, "236"),
    ("126", "Delete Node in a BST", "Medium", "Trees & BST", 4, "450"),
    ("127", "Search in a BST", "Easy", "Trees & BST", 4, "700"),
    ("128", "Insert into a BST", "Medium", "Trees & BST", 4, "701"),
    ("129", "Recover Binary Search Tree", "Hard", "Trees & BST", 4, "99"),
    ("130", "Binary Tree Zigzag Level Order", "Medium", "Trees & BST", 4, "103"),
    ("131", "Construct BT from Inorder & Postorder", "Medium", "Trees & BST", 4, "106"),
    ("132", "Binary Tree Level Order II", "Medium", "Trees & BST", 4, "107"),
    ("133", "Minimum Depth of Binary Tree", "Easy", "Trees & BST", 4, "111"),
    ("134", "Binary Tree Preorder Traversal", "Easy", "Trees & BST", 4, "144"),
    ("135", "Binary Tree Postorder Traversal", "Easy", "Trees & BST", 4, "145"),
]

# Month 5: Heap + Backtracking + Tries (30 problems)
m5_problems = [
    # Key examples
    ("136", "Top K Frequent Elements", "Medium", "Heap & Priority Queue", 5, "347"),
    ("137", "Merge K Sorted Lists", "Hard", "Heap & Priority Queue", 5, "23"),
    ("138", "Word Search", "Medium", "Backtracking & Tries", 5, "79"),
    ("139", "Combination Sum", "Medium", "Backtracking & Tries", 5, "39"),
    ("140", "Implement Trie", "Medium", "Backtracking & Tries", 5, "208"),
    ("141", "Word Search II", "Hard", "Backtracking & Tries", 5, "212"),
    # Fillers to reach 30
    ("142", "Kth Largest Element in Array", "Medium", "Heap & Priority Queue", 5, "215"),
    ("143", "Find Median from Data Stream", "Hard", "Heap & Priority Queue", 5, "295"),
    ("144", "Task Scheduler", "Medium", "Heap & Priority Queue", 5, "621"),
    ("145", "Design Twitter", "Medium", "Heap & Priority Queue", 5, "355"),
    ("146", "Permutations", "Medium", "Backtracking & Tries", 5, "46"),
    ("147", "N-Queens", "Hard", "Backtracking & Tries", 5, "51"),
    ("148", "Subsets", "Medium", "Backtracking & Tries", 5, "78"),
    ("149", "Palindrome Partitioning", "Medium", "Backtracking & Tries", 5, "131"),
    ("150", "Letter Combinations of Phone", "Medium", "Backtracking & Tries", 5, "17"),
    ("151", "Generate Parentheses", "Medium", "Backtracking & Tries", 5, "22"),
    ("152", "Sudoku Solver", "Hard", "Backtracking & Tries", 5, "37"),
    ("153", "Course Schedule III", "Hard", "Heap & Priority Queue", 5, "630"),
    ("154", "Word Break", "Medium", "Backtracking & Tries", 5, "139"),
    ("155", "Combination Sum II", "Medium", "Backtracking & Tries", 5, "40"),
    ("156", "Combinations", "Medium", "Backtracking & Tries", 5, "77"),
    ("157", "Subsets II", "Medium", "Backtracking & Tries", 5, "90"),
    ("158", "Design Add and Search Words", "Medium", "Backtracking & Tries", 5, "211"),
    ("159", "Maximum XOR of Two Numbers", "Medium", "Backtracking & Tries", 5, "421"),
    ("160", "Replace Words", "Medium", "Backtracking & Tries", 5, "648"),
    ("161", "Map Sum Pairs", "Medium", "Backtracking & Tries", 5, "677"),
    ("162", "Kth Largest Element in a Stream", "Easy", "Heap & Priority Queue", 5, "703"),
    ("163", "K Closest Points to Origin", "Medium", "Heap & Priority Queue", 5, "973"),
    ("164", "Sort Characters By Frequency", "Medium", "Heap & Priority Queue", 5, "451"),
    ("165", "Kth Smallest Element in Sorted Matrix", "Medium", "Heap & Priority Queue", 5, "378"),
]

# Month 6: Graphs (BFS/DFS) + Union Find (25 problems)
m6_problems = [
    # Key examples
    ("166", "Number of Islands", "Medium", "Graphs & Union Find", 6, "200"),
    ("167", "Clone Graph", "Medium", "Graphs & Union Find", 6, "133"),
    ("168", "Course Schedule", "Medium", "Graphs & Union Find", 6, "207"),
    ("169", "Pacific Atlantic Water Flow", "Medium", "Graphs & Union Find", 6, "417"),
    ("170", "Rotting Oranges", "Medium", "Graphs & Union Find", 6, "994"),
    ("171", "Graph Valid Tree", "Medium", "Graphs & Union Find", 6, "261"),
    # Fillers to reach 25
    ("172", "Word Ladder", "Hard", "Graphs & Union Find", 6, "127"),
    ("173", "Alien Dictionary", "Hard", "Graphs & Union Find", 6, "269"),
    ("174", "Network Delay Time", "Medium", "Graphs & Union Find", 6, "743"),
    ("175", "Cheapest Flights Within K Stops", "Medium", "Graphs & Union Find", 6, "787"),
    ("176", "Redundant Connection", "Medium", "Graphs & Union Find", 6, "684"),
    ("177", "Surrounded Regions", "Medium", "Graphs & Union Find", 6, "130"),
    ("178", "Walls and Gates", "Medium", "Graphs & Union Find", 6, "286"),
    ("179", "Evaluate Division", "Medium", "Graphs & Union Find", 6, "399"),
    ("180", "Find Eventual Safe States", "Medium", "Graphs & Union Find", 6, "802"),
    ("181", "Shortest Path in Binary Matrix", "Medium", "Graphs & Union Find", 6, "1091"),
    ("182", "Reconstruct Itinerary", "Hard", "Graphs & Union Find", 6, "332"),
    ("183", "Longest Increasing Path in Matrix", "Hard", "Graphs & Union Find", 6, "329"),
    ("184", "Number of Provinces", "Medium", "Graphs & Union Find", 6, "547"),
    ("185", "Satisfiability of Equality Equations", "Medium", "Graphs & Union Find", 6, "990"),
    ("186", "Number of Connected Components", "Medium", "Graphs & Union Find", 6, "323"),
    ("187", "Course Schedule II", "Medium", "Graphs & Union Find", 6, "210"),
    ("188", "Min Cost to Connect All Points", "Medium", "Graphs & Union Find", 6, "1584"),
    ("189", "Is Graph Bipartite?", "Medium", "Graphs & Union Find", 6, "785"),
    ("190", "Making A Large Island", "Hard", "Graphs & Union Find", 6, "827"),
]

all_problems = m1_problems + m2_problems + m3_problems + m4_problems + m5_problems + m6_problems

for id_, title, diff, topic, month, leetcode in all_problems:
    content += f'  {{ id: "{id_}", title: "{title}", difficulty: "{diff}", topic: "{topic}", month: {month}, leetcode: "{leetcode}" }},\n'

content += """];

export const getProblemsByTopic = (topic: string) => dsaProblems.filter(p => p.topic === topic);
export const getProblemsByDifficulty = (difficulty: string) => dsaProblems.filter(p => p.difficulty === difficulty);
export const getSolvedCount = (progress: DSAProgress) => Object.values(progress).filter(p => p.solved).length;
export const getTopicProgress = (topic: string, progress: DSAProgress) => {
  const problems = getProblemsByTopic(topic);
  if (problems.length === 0) return { total: 0, solved: 0, percent: 0 };
  const solved = problems.filter(p => progress[p.id]?.solved).length;
  return { total: problems.length, solved, percent: Math.round((solved / problems.length) * 100) };
};

export const getProblemsByMonth = (month: number) => dsaProblems.filter(p => p.month === month);
export const getMonthProgress = (month: number, progress: DSAProgress) => {
  const problems = getProblemsByMonth(month);
  if (problems.length === 0) return { total: 0, solved: 0, percent: 0 };
  const solved = problems.filter(p => progress[p.id]?.solved).length;
  return { total: problems.length, solved, percent: Math.round((solved / problems.length) * 100) };
};
"""

with open(output_path, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Generated {len(all_problems)} problems in {output_path}")
