---
title: "Introduction to MCMC (Markov Chain Monte Carlo)"
createdDate: 2024-12-05
tags: ["primer"]
---

**How do you define a Markov Chain?**

A Markov chain $MC_{S, T}$ depends on:

* State space: $S$
* Transition function: $T: S \times S \mapsto [0, 1]$

In addition, $\forall x \in S, T(x, *)$ is a probability.

---

**How do you apply a Markov chain to a distribution?**

Let $p_t$ be a distribution at moment $t$,
then the distribution at moment $t + 1$ is:

$$
\begin{aligned}
p_{t + 1} (x)
&= MC_{S, T}[p_t](x) \\
&= \int_S p_t(y) T(y, x) dy
\end{aligned}
$$

If $p_t$ is a fixed state,
which $\exist! x_0, p_t(x_0) = 1$,
then:

$$
\begin{aligned}
p_{t + 1}(x)
&= \int_S p_t(y) T(y, x) dy \\
&= T(x_0, x)
\end{aligned}
$$

---

**What is the stationary distribution of a Markov Chain?**

Distribution $p_t$ is the stationary distribution of the Markov chain if only if $p_{t + 1} = p_t$.

Once the distribution becomes a stationary distribution in the Markov chain,
it "stays" in that distribution.

---

**What is the detail balance condition?**

If the detail balance condition holds for a distribution $p$,
it means:

$$
\forall x, y \in S,
p(x) T(x, y) = p(y) T(y, x)
$$

Meanwhile, it is a stationary distribution, because:

$$
\begin{aligned}
p_{t + 1} (x)
&= \int_S p_t(y) T(y, x) dy \\
&= \int_S p_t(x) T(x, y) dy \\
&= p_t(x) \int_S T(x, y) dy \\
&= p_t(x)
\end{aligned}
$$

---

**What is MCMC?**

MCMC is not a concrete method,
it is instead a general idea to sample from distribution.

You have to design a Markov chain,
whose stationary distribution is the distribution we want to sample from.

After serveral steps in the Markov chain,
the distribution will "converge" to the target distribution.

---

**What is the goal of Metropolis-Hasting method?**

The goal is to sample from a distribution $p$,
where we only know $f(x) \propto p(x)$,
and the normalized constant is difficult to calculate.

---
