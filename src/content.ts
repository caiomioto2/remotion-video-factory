// Sample content for component demonstrations

export const sampleTypeScript = `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));
`;

export const sampleHighlightedTypeScript = `interface User {
  id: number;
  name: string;
  email: string;
}

function createUser(name: string, email: string): User {
  return {
    id: Math.random(),
    name,
    email,
  };
}

const user = createUser("John Doe", "john@example.com");
console.log(user);
`;

export const sampleD2Diagram = `direction: right

user: User {
  shape: person
}

api: API Server {
  shape: cloud
}

db: Database {
  shape: cylinder
}

user -> api: HTTP Request
api -> db: SQL Query
db -> api: Data
api -> user: JSON Response
`;
