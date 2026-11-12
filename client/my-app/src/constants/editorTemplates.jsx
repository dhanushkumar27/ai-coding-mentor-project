
const EDITOR_TEMPLATES = {
    java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Write your code here...
    }
}



/**
You can describe the problem or add any useful context here.

**/`,

    python: `def solve():
    # Write your code here...
    pass


if __name__ == "__main__":
    solve()



# You can describe the problem or add any useful context here.
#
`,

    cpp: `#include <iostream>
using namespace std;

int main() {
    // Write your code here...
    return 0;
}



/**
You can describe the problem or add any useful context here.

**/`,

    c: `#include <stdio.h>

int main() {
    // Write your code here...
    return 0;
}



/**
You can describe the problem or add any useful context here.

**/`,

    javascript: `function solve() {
    // Write your code here...
}

solve();



/**
You can describe the problem or add any useful context here.

**/`,
};

export default EDITOR_TEMPLATES;

