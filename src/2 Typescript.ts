import type { Equal, Expect } from "./type-utils";

// Typing parameters
function addTwoNumbers(a, b) {
  return a + b;
}

// ---
// ---
// ---

// Typing object parameters
function addTwoNumbersParams(params) {
  return params.first + params.second;
}

// ---
// ---
// ---

// Optional parameters
function getName(params: { first: string; last: string }) {
  if (params.last) {
    return `${params.first} ${params.last}`;
  }
  return params.first;
}

getName({ first: "Dan", last: "Wood" });
getName({ first: "Dan" });

// ---
// ---
// ---

// Assigning types to variables

interface User {
  id: number;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

/**
 * How do we ensure that assignedUser is of type User
 * at THIS LINE - not further down in the code?
 */
const assignedUser = {};

const getUserId = (user: User) => {
  return user.id;
};

getUserId(assignedUser);

// ---
// ---
// ---

// Union types
interface User {
  id: number;
  firstName: string;
  lastName: string;
  /**
   * How do we ensure that role is only one of:
   * - 'admin'
   * - 'user'
   * - 'super-admin'
   */
  role: string;
}

const defaultUser: User = {
  id: 1,
  firstName: "Dan",
  lastName: "Wood",
  // @ts-expect-error
  role: "I_SHOULD_NOT_BE_ALLOWED",
};

// ---
// ---
// ---

// Arrays

interface ArraysUser {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  posts: Post;
}

interface Post {
  id: number;
  title: string;
}

const arraysUser: ArraysUser = {
  id: 1,
  firstName: "Matt",
  lastName: "Pocock",
  role: "admin",
  posts: [
    {
      id: 1,
      title: "How I eat so much cheese",
    },
    {
      id: 2,
      title: "Why I don't eat more vegetables",
    },
  ],
};

// ---
// ---
// ---

// Function return types
interface ReturnUser {
  id: number;
  firstName: string;
  lastName: string;
  role: "admin" | "user" | "super-admin";
  posts: Array<Post>;
}

interface Post {
  id: number;
  title: string;
}

/**
 * How do we ensure that makeUser ALWAYS
 * returns a user?
 */
const makeUser = () => {
  return {};
};

// ---
// ---
// ---

// Promises
interface LukeSkywalker {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

export const fetchLukeSkywalker = async (): LukeSkywalker => {
  const data = await fetch("https://swapi.dev/api/people/1").then((res) => {
    return res.json();
  });

  return data;
};

// ---
// ---
// ---

// Typng records
const createCache = () => {
  const cache = {};

  const add = (id: string, value: number) => {
    cache[id] = value;
  };

  const remove = (id: string) => {
    delete cache[id];
  };

  return {
    cache,
    add,
    remove,
  };
};

// ---
// ---
// ---

// Type narrowing
const coerceAmount = (amount: number | { amount: number }) => {
  // Return the amount here as a number
};

// ---
// ---
// ---

// Extend interfaces

/**
 * Here, the id property is shared between all three
 * interfaces. Can you find a way to refactor this to
 * make it more DRY?
 */
interface ExtendsUser {
  id: string;
  firstName: string;
  lastName: string;
}

interface ExtendsPost {
  id: string;
  title: string;
  body: string;
}

interface ExtendsComment {
  id: string;
  comment: string;
}

type tests = [
  Expect<
    Equal<ExtendsUser, { id: string; firstName: string; lastName: string }>
  >,
  Expect<Equal<ExtendsPost, { id: string; title: string; body: string }>>,
  Expect<Equal<ExtendsComment, { id: string; comment: string }>>
];

// ---
// ---
// ---

// Intersection

interface IntersectionUser {
  id: string;
  firstName: string;
  lastName: string;
}

interface IntersectionPost {
  id: string;
  title: string;
  body: string;
}

/**
 * How do we type this return statement so it's both
 * User AND { posts: Post[] }
 */
export const getDefaultUserAndPosts = (): unknown => {
  return {
    id: "1",
    firstName: "Dan",
    lastName: "Wood",
    posts: [
      {
        id: "1",
        title: "Teaching TypeScript",
        body: "It's pretty cool",
      },
    ],
  };
};

const userAndPosts = getDefaultUserAndPosts();

console.log(userAndPosts.posts[0]);

// ---
// ---
// ---

// Omit and Pick
interface OmitPickUser {
  id: string;
  firstName: string;
  lastName: string;
}

/**
 * How do we create a new object type with _only_ the
 * firstName and lastName properties of User?
 */
type MyType = unknown;

type tests2 = [Expect<Equal<MyType, { firstName: string; lastName: string }>>];

// ---
// ---
// ---

// Function types

/**
 * How do we type onFocusChange?
 */
const addListener = (onFocusChange: unknown) => {
  window.addEventListener("focus", () => {
    onFocusChange(true);
  });

  window.addEventListener("blur", () => {
    onFocusChange(false);
  });
};

addListener((isFocused) => {
  console.log({ isFocused });

  type tests3 = [Expect<Equal<typeof isFocused, boolean>>];
});

// ---
// ---
// ---

// Function types with promises
interface PromiseUser {
  id: string;
  firstName: string;
  lastName: string;
}

const createThenGetUser = async (
  createUser: unknown,
  getUser: unknown
): Promise<PromiseUser> => {
  const userId: string = await createUser();

  const user = await getUser(userId);

  return user;
};

// ---
// ---
// ---

// typeof

const defaultChart = {
  type: "Line",
  name: "Bank Balance",
  actualsEndDate: "2024-05",
  showBudgets: true,
  showAxis: true,
  data: [
    {
      date: "2024-04",
      value: 100,
    },
    {
      date: "2024-05",
      value: 200,
    },
    {
      date: "2024-06",
      value: 300,
    },
  ],
};

// How do we type this?
type ChartData = unknown;

const chartData: ChartData = [
  {
    date: "2024-05",
    value: 2000,
  },
];

chartData[0].date;
//            ^?

// ---
// ---
// ---

// keyof
const defaultColor = {
  red: 128,
  green: 256,
  blue: 0,
};

// How do we extract the keys of this object
// without explictly typing them?
type ColorKeys = unknown;
type tests4 = Expect<Equal<ColorKeys, "red" | "green" | "blue">>;

// ---
// ---
// ---

// as const
const defaultChart2 = {
  type: "Line",
  name: "Bank Balance",
  actualsEndDate: "2024-05",
  showBudgets: true,
  showAxis: true,
  data: [
    {
      date: "2024-04",
      value: 100,
    },
    {
      date: "2024-05",
      value: 200,
    },
    {
      date: "2024-06",
      value: 300,
    },
  ],
};

type tests5 = Expect<Equal<typeof defaultChart2.type, "Line">>;

// ---
// ---
// ---

// "as"
