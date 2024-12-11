---
title: 'Introduction to MCMC (Markov Chain Monte Carlo)'
createdDate: 2024-12-07
tags: ['primer']
---

**Prerequisite:**

- [Introduction to Markov Chain](/posts/introduction-to-markov-chain)

---

**What is MCMC?**

MCMC is not a concrete algorithm,
but a general framework for sampling.

In MCMC,
you construct a Markov chain,
whose stationary distribution is exactly the target distribution you want to sample from.

If certain conditions are met,
the distribution of the state will eventually "converage" to the target distribution,
after running the chain for enough steps.

---

**When should you use Metropolis-Hasting sampler?**

You can use Metropolis-Hasting sampler,
when you want to sample from a distribution $p$,
but you only know its kernel $f(x) \propto p(x)$.

The sampler allows you to sample from $p$,
using only the information of $f$.

---

**How does Metropolis-Hasting sampler work?**

1. choose a proposal distribution $g(* | x_t)$ that you can directly generate its samples.
2. assign first sample $x_1$.
3. generate a candidate sample $y \sim g(* | x_t)$ using last sample $x_t$.
4. accept the candidate with a probability of $A(x_t \to y)$, otherwise reject it.
5. goto (3) or exit

The accepting probability $A(a \to b) = \min \{1,  (f(b) / f(a)) (g(a | b) / g(b | a)) \}$.

---

**Implement Metropolis-Hasting sampler with R**

<details>

<summary>An example of sampling Cauchy distribution with normal distribution</summary>

```r
rounds <- 10000
sigma <- 2

x <- numeric(rounds)
u <- runif(rounds)

f <- function(x) {
  return ((x / sigma^2) * exp(- (x ^ 2) / (2 * sigma ^ 2)))
}

x[1] <- rnorm(1)

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

</details>

---

**Why does Metropolis-Hasting sampler work mathematically?**

The accepting probability is intentionally constructed s.t.:

$$
\frac{A(a \to b)}{A(b \to a)}
= \frac{f(b)}{f(a)} \frac{g(a | b)}{g(b | a)}
$$

Since $f(x) \propto p(x)$, we have:

$$
p(a) g(b | a) A(a \to b)
= p(b) g(a | b) A(b \to a)
$$

Equivalently:

$$
p(a) T(a \to b)
= p(b) T(b \to a)
$$

It shows that,
the detailed balance condition holds for distribution $p$ in the chain,
which implies $p$ is a stationary distribution of the chain.
