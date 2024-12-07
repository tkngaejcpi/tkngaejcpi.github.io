---
title: '入門：馬可夫鏈蒙地卡羅'
createdDate: 2024-12-07
tags: ['primer']
---

**前置知識：**

- [入門：馬可夫鏈](./introduction-to-markov-chain)

---

**什麼是馬可夫鏈蒙地卡羅?**

馬可夫鏈蒙地卡羅不是一個具體的算法，
而是一類想法⸺通過設計馬可夫鏈，
使得這個馬可夫鏈的穩態分佈是我們的目標分佈。

如此，
在若干步以後，
初始分佈將會「收斂」於我們想採樣的分佈上。

---

**Metropolis-Hasting 方法適用於什麼場景？**

我們希望對 $p$ 進行採樣，
但只知道它的核心 $f(x) \propto p(x)$。

這種情況下，$f(x)$ 的歸一化常數通常難以計算。

---

**如何利用 Metropolis-Hasting 方法採樣？**

1. 選擇一個可直接生成的分佈 $g(* | x_t)$
2. 指定初始樣本 $x_1$
3. 利用上一個樣本 $x_t$ 生成候選樣本 $y \sim g(*|x_t)$
4. 以 $A(x_t \to y)$ 的概率接受 $x_{t + 1} = y$，否則令 $x_{t + 1} = x_t$
5. 回到 (3) 或者結束

其中，$A(a \to b) = \min \{1,  (f(b) / f(a)) (g(a | b) / g(b | a)) \}$。

此外，如果 $g(* | x_t)$ 是對稱分佈，
比如説 $g(* | x_t) = N(x_t, \sigma^2)$，
那麼 $g(a | b) / g(b | a) = 1$。

---

**如何代碼實現 Metropolis-Hasting 方法？**

利用正態分佈取樣 Cauchy 分佈：

```r
rounds <- 10000
sigma <- 2

x <- numeric(rounds)
u <- runif(rounds)

f <- function(x) {
  return ((x / sigma^2) * exp(- (x ^ 2) / (2 * sigma ^ 2)))
}

x[1] <- rchisq(1, df = 1)

for (i in 2:rounds){
  xt <- x[i - 1]
  y <- rchisq(1, df = xt)

  r <- (f(y) / f(xt)) * (dchisq(xt, df = y) / dchisq(y, df = xt))

  if(u[i] <= r) {
    x[i] <- y
  } else {
    x[i] <- xt
  }
}
```

---

**為什麼 Metropolis-Hasting 方法在數學上成立？**

候選樣本的拒絕概率 $A(a \to b)$ 是被刻意構造的，
使得：

$$
\frac{A(a \to b)}{A(b \to a)}
= \frac{f(b)}{f(a)} \frac{g(a | b)}{g(b | a)}
$$

又因為 $f(x) \propto p(x)$，所以：

$$
p(a) g(b | a) A(a \to b)
= p(b) g(a | b) A(b \to a)
$$

換言之：

$$
p(a) T(a \to b) = p(b) T(b \to a)
$$

即分佈 $p$ 可使馬可夫鏈達到細緻平衡，
所以 $p$ 也是該馬可夫鏈的穩態分佈。
