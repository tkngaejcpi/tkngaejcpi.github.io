---
title: 'Pipe 中流淌的數據與 Operator'
cover: 'https://images.rileycki.com/20240713.webp'
createdDate: 2024-07-19
tags: ['編程']
description: '「在 TypeScript 中怎麼定義 pipe 的類型？」「用多少個參數就 overload 多少次。」'
---

在編程領域，通常談到 `pipe` 都是指這樣一個函數：

```typescript
function pipe<A>(a: A): A;
function pipe<A, B>(a: A, fab: (a: A) => B): B;
function pipe<A, B, C>(a: A, fab: (a: A) => B, fbc: (b: B) => C): C;
/* more and more... */

function pipe(value: unknown, ...fns: Function[]) {
  return fns.reduce((acc, fn) => fn(acc), value);
}
```

它不斷將第一參數外的函數作用於先前的結果（第一次是將第二參數作用於第一參數），並在最後返回所有函數都作用過的結果。

換言之，它允許你將 `f(e(d(c(b(a(input))))))` 寫成 `pipe(input, a, b, c, d, e, f)`。

這種寫法在實際業務中可以很好增加可讀性，比如說：

```typescript
const result = pipe(input, double, plusThree, convertToString);
```

`result` 是怎麼來的就很一目了然。

按照 RxJS 的習慣，我一般會把 `double` 這些叫做 Operator。

拋磚引玉了那麼久，我大概想說的是——在設計函數，尤其是一些基礎設施的時候，最好考慮它在 `pipe` 裡面的調用是怎麼樣的，像：

```typescript
function map<A, B>(fn: (a: A) => B): (a: A[]) => B[];
function filter<A>(fn: (a: A) => boolean): (a: A[]) => A[];
```

這樣的定義就很適合，它 curry 了最後一個實際要操作的數據，我們可以把它看成是一個生成模擬 `Array` 的 `map`、`filter` 操作的 operator 的函數。

我們假想一個場景，我們要篩選成年用戶，獲取它們的姓名，並轉成大寫，用上面定義的 `map` 和 `filter`，大概可以這樣做：

```typescript
const capitalizedAdultUserNames = pipe(
  users,
  map((user) => user.info),
  filter((info) => info.age > 18),
  map((info) => info.name),
  map(capitalize),
);
```

如果我們不採用這種 curry 掉數據參數的函數，只用 `Array` 原生的 `map` 和 `filter`：

```typescript
const capitalizedAdultUserNames = pipe(
  users,
  (users) => users.map((user) => user.info),
  (infos) => infos.filter((info) => info.age > 18),
  (infos) => infos.map((info) => info.name),
  (names) => names.map(capitalize),
);
```

做是可以做，但看起來就很蠢......
