TP1 — Exercise 9 and Exit Questions
Exercise 9 — Visual difference between the emulator and the browser

One visual difference is that the Android emulator looks like a mobile phone, while the browser displays the app inside a web page.

Exit Questions

1. What is the difference between a prop and state?

A prop is data passed from a parent component to a child component. State is data managed inside a component that can change over time and update the screen.

2. Why do we write setItems([newItem, ...items]) instead of items.push(newItem)?

We use setItems([newItem, ...items]) because it creates a new array and tells React to update the screen. items.push(newItem) modifies the existing array directly, so React may not detect the change.

3. Why must every text be inside <Text>?

In React Native, all text must be inside a <Text> component because it does not use HTML elements like a web page. Text written directly inside a <View> causes an error.
