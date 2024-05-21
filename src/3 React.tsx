import { useEffect, useRef, useState } from "react";
import type { Equal, Expect } from "./type-utils";

// Typing components
function Button(props: unknown) {
  return <button className={props.className}></button>;
}

function Parent() {
  return (
    <>
      {/* @ts-expect-error */}
      <Button></Button>

      <Button className="my-class"></Button>
    </>
  );
}

// ---
// ---
// ---

// Typing children

function Button2(props: {}) {
  return <button>{props.children}</button>;
}

function Parent2() {
  return (
    <>
      {/* @ts-expect-error */}
      <Button></Button>
      <Button>Hello world!</Button>
    </>
  );
}

// ---
// ---
// ---

// Typing onclick handlers
interface ButtonProps3 {
  className: string;
  children: React.ReactNode;
}

function Button3({ children, className, onClick }: ButtonProps3) {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}

// ---
// ---
// ---

// HTML props
export const Button4 = ({ className, ...rest }: {}) => {
  return (
    <button {...rest} className={`default-classname ${className}`}></button>
  );
};

const Parent4 = () => {
  return <Button4 onClick={() => {}} type="button"></Button4>;
};

// ---
// ---
// ---

// Extracting Props

// Imagine NavBar is an external library
export const NavBar = (props: {
  title: string;
  links: string[];
  children: React.ReactNode;
}) => {
  return <div>Some content</div>;
};

// Your app:
type NavBarProps = unknown;

type test = Expect<
  Equal<
    NavBarProps,
    {
      title: string;
      links: string[];
      children: React.ReactNode;
    }
  >
>;

// ---
// ---
// ---

// Hooks

// useState
function Tags() {
  const [tags, setTags] = useState([]);
  return (
    <div>
      {tags.map((tag) => {
        return <div key={tag.id}>{tag.value}</div>;
      })}
      <button
        onClick={() => {
          setTags([
            ...tags,
            {
              id: new Date().getTime(),
              value: "New",
            },
          ]);
        }}
      >
        Add Tag
      </button>
    </div>
  );
}

// ---
// ---
// ---

// useState with undefined

interface Data {
  id: number;
  name: string;
}

const fetchData = () => {
  return Promise.resolve({ id: 1, name: "John" });
};

function Component() {
  const [data, setData] = useState();

  useEffect(() => {
    fetchData().then((val) => {
      setData(val);
    });
  }, []);

  type test = [Expect<Equal<typeof data, Data | undefined>>];
}

// ---
// ---
// ---

// Value refs

export const RefComponent = () => {
  const id = useRef();

  useEffect(() => {
    id.current = "Random value!";
  }, []);

  return <div></div>;
};

// ---
// ---
// ---

// Element refs

export const RefComponent2 = () => {
  const ref = useRef();

  return <div ref={ref} />;
};

// Discriminated unions

/**
 * 1. Currently, ModalProps lets you pass in various impossible combinations of props.
 *
 * For instance, you can pass in a `variant` of "title" without passing in a title,
 * or you can pass in a `variant` of "no-title" WITH a title.
 *
 * Try to find a way to express ModalProps so that it's impossible to pass in
 * impossible combinations of props.
 */

type ModalProps = {
  variant: "no-title" | "title";
  title?: string;
};

function Modal(props: ModalProps) {
  if (props.variant === "no-title") {
    return <div>No title</div>;
  } else {
    return <div>Title: {props.title}</div>;
  }
}

function Test() {
  return (
    <div>
      <Modal variant="title" title="Hello" />
      <Modal variant="no-title" />

      {/* @ts-expect-error */}
      <Modal />
      <Modal
        variant="no-title"
        // @ts-expect-error
        title="Oh dear"
      />
    </div>
  );
}
