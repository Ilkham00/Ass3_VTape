// Part 2 - Individual work - Zholdanova Elnura, group MT2503

// Helper: print to the console and to the page (easier to take a screenshot)
const output = document.getElementById("output");
function show(text) {
  console.log(text);
  output.textContent += text + "\n";
}

// ---------- Task 6. Variables and data types ----------
show("=== Task 6. Variables and data types ===");
const siteName = "VintageTape";   // string
const tapesCount = 24;            // number
const isOnline = true;            // boolean
let age = 19;                     // let, because it will change

show("siteName = " + siteName + ", typeof: " + typeof siteName);
show("tapesCount = " + tapesCount + ", typeof: " + typeof tapesCount);
show("isOnline = " + isOnline + ", typeof: " + typeof isOnline);
show("age before = " + age + ", typeof: " + typeof age);
age = 20; // reassign the let variable
show("age after = " + age + ", typeof: " + typeof age);

// ---------- Task 7. Input and a greeting ----------
show("\n=== Task 7. Input and a greeting ===");
const userName = prompt("Enter your name:", "Elnura");
alert("Hello, " + userName + "!");
const group = "MT2503";
console.log("Hello, " + userName + " from group " + group + "!");
output.textContent += "Hello, " + userName + " from group " + group + "!\n";

// ---------- Task 8. Sum and arithmetic ----------
show("\n=== Task 8. Sum and arithmetic ===");
const a = Number(prompt("Enter the first number:", "12"));
const b = Number(prompt("Enter the second number:", "5"));
show("a = " + a + ", b = " + b);
show("Sum: " + (a + b));
show("Difference: " + (a - b));
show("Product: " + (a * b));
show("Quotient: " + (a / b));
show("Remainder: " + (a % b));

// ---------- Task 9. Strings ----------
show("\n=== Task 9. Strings ===");
const text = "Vintage Tape";
show("Text: " + text);
show("Length: " + text.length);
show("Uppercase: " + text.toUpperCase());
show("Lowercase: " + text.toLowerCase());
show("First three characters: " + text.slice(0, 3));
const part1 = "Cassettes are";
const part2 = "back in style";
show("Joined: " + part1 + " " + part2 + ".");

// ---------- Task 10. Increment and assignment operators ----------
show("\n=== Task 10. Increment and assignment operators ===");
let counter = 10;
show("Start: counter = " + counter);
counter++;
show("counter++  -> " + counter);
counter--;
show("counter--  -> " + counter);
counter += 5;
show("counter += 5 -> " + counter);
counter -= 3;
show("counter -= 3 -> " + counter);
counter *= 2;
show("counter *= 2 -> " + counter);
counter /= 4;
show("counter /= 4 -> " + counter);

// ---------- Task 11. A calculation from the lecture ----------
show("\n=== Task 11. Dog age to human age ===");
function dogToHuman(dogAge) {
  return (dogAge - 2) * 4 + 21;
}
const dogAge1 = 2;
const dogAge2 = 5;
show("dogAge = " + dogAge1 + " -> humanAge = " + dogToHuman(dogAge1));
show("dogAge = " + dogAge2 + " -> humanAge = " + dogToHuman(dogAge2));

// ---------- Task 12. Functions ----------
show("\n=== Task 12. Functions ===");
function greetUser(name) {
  return "Hello, " + name + "!";
}
function calculateSum(a, b) {
  return a + b;
}
function calculateRectangleArea(width, height) {
  return width * height;
}

show("greetUser('Elnura'): " + greetUser("Elnura"));
show("greetUser('Aizada'): " + greetUser("Aizada"));
show("calculateSum(12, 5): " + calculateSum(12, 5));
show("calculateSum(3, 8): " + calculateSum(3, 8));
show("calculateRectangleArea(5, 4): " + calculateRectangleArea(5, 4));
show("calculateRectangleArea(10, 3): " + calculateRectangleArea(10, 3));
