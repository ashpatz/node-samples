function Node(val) {
    this.data = val;
    this.left = null;
    this.right = null;
}

let maximumVal = 0;

function calculateSumPath(node) {
    if (node != null) {
        const leftSum = calculateSumPath(node.left);
        const rightSum = calculateSumPath(node.right);
        let currentSum;
        if (leftSum < 0 && rightSum < 0) {
            currentSum = node.data;
        } else {
            currentSum = Math.max(leftSum + rightSum + node.data, Math.max(leftSum, rightSum));
        }
        if (maximumVal < currentSum) {
            maximumVal = currentSum;
        }
        return Math.max(leftSum, rightSum) + node.data;
    } else return 0;
}

let root = new Node(-5);
root.left = new Node(1);
root.right = new Node(4);
root.left.left = new Node(-6);
root.left.right = new Node(5);
root.left.right.left = new Node(-2);
root.left.right.right = new Node(3);
root.left.left.left = new Node(9);
root.left.left.right = new Node(10);
root.right.left = new Node(11);
root.right.right = new Node(-2);
root.right.right.right = new Node(-8);
root.right.right.left = new Node(7);
root.right.right.right.left = new Node(1);
root.right.right.right.right = new Node(7);
root.right.right.right.right.left = new Node(12);

console.log(calculateSumPath(root));
console.log(maximumVal);