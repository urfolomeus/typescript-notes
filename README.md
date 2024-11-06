# Learning TypeScript

My notes from learning TypeScript.

Each learning source has its own folder and there is a root [notes.ipynb](notes.ipynb) file with my overall summary and cheatsheet, i.e.

```
sources
| execute_program
| | typescript_basics
| | | <etc>
|
| other
| | etc
|
notes.ipynb
```

## Setup

I use Jupyter notebooks to write interactive notes. In order to use these for TypeScript, I'm using [Deno](https://docs.deno.com/runtime/) and then leaning on VSCode's Jupyter extension to run in the IDE. See the Deno [docs on Jupyter integration](https://docs.deno.com/runtime/reference/cli/jupyter/) for more info.

## Running

1. Open the notebook you want to review in VSCode or another Jupyter server.
2. Run the notebook.

## Starting a new notebook

When starting a new notebook we need to select the kernel to use. See the [Deno Jupyter notes](https://docs.deno.com/runtime/reference/cli/jupyter/#vs-code) for more info.

## Some helpers

Because Jupyter notebooks are runtime environments and TypeScript does its type checking at compile time by default, it was not possible at the time of writing to have just-in-time type checking done as we're running cells in the notebook. As such, the best workaround I found was to use `.ts` files and Deno's CLI `deno check <file.ts>` command. There is a utility function in `utils/typechecker.ts` that can be imported into a notebook and used to check types. It writes the given code to a temporary file, runs the Deno checker and returns the result as a string so that errors don't block the running of the notebook.

Example:

```typescript
import { checkTypeScript } from './utils/typechecker.ts';

await checkTypeScript(`let sum: number = 1 + 2;`);
// Types are correct.

await checkTypeScript(`let sum: number = 'any' + 'thing';`);
// error: TS2322 [ERROR]: Type 'string' is not assignable to type 'number'.
// let sum: number = 'any' + 'thing';
//    ~~~
//    at file:///var/folders/zf/zz1ks5y12dq092v3_0j1rcg00000gn/T/7a5620a660541232.ts:1:5
```

I also created a `runTypeScript` function that works in a similar way to the `checkTypeScript` function, but that uses the `deno run <file.ts>` command instead. This attempts to build the file and can be used when we want to check for syntax errors rather than type errors. See [04_syntax_vs_type_checking.ipynb](./sources/execute_program/typescript_basics/level_2/04_syntax_vs_type_checking.ipynb) notebook in the Execute Program typescript basics course notes.
