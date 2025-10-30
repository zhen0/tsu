export function greet(name: string, uppercase?: boolean): void {
  let greeting = `Hello, ${name}!`;

  if (uppercase) {
    greeting = greeting.toUpperCase();
  }

  console.log(greeting);
}
